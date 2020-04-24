-- require 'SWE'

SWE.LuaRegisterDirectory("gui")
require 'gui_tools'
require 'gui_button'
require 'gui_action'

SWE.Action.EditorCursorPositionChanged	= 336001

local frs = {}

local function ConvertStyle(t)
    local style = 0
    if t ~= nil then
	for i = 1, #t do
	    if string.lower(t[i]) == "normal" then
		style = style + SWE.Property.StyleNormal
	    elseif string.lower(t[i]) == "bold" then
		style = style + SWE.Property.StyleBold
	    elseif string.lower(t[i]) == "italic" then
		style = style + SWE.Property.StyleItalic
	    elseif string.lower(t[i]) == "underline" then
		style = style + SWE.Property.StyleUnderLine
	    elseif string.lower(t[i]) == "strikethrough" then
		style = style + SWE.Property.StyleStrikeThrough
	    end
	end
    end
    return style
end

local function TableFindValue(t, val)
    for k,v in pairs(t) do
	if v == val then
	    return true
	end
    end
    return false
end

local function GetObjectParent(str)
    local t = StringSplit(str, ".")
    local obj = _G
    local parent = nil
    for i=1,#t do
        parent = obj
        obj = obj[ t[i] ]
    end
    return obj,parent
end

local function GetObjectFields(obj, stype)
    local t = {}
    if type(obj) == "table" then
        for k,v in pairs(obj) do
            if stype == nil then
                table.insert(t, k)
            elseif stype == type(v) then
                table.insert(t, k)
            end
        end
    end
    return t
end

local function UnicodeStringIsComments(ustr, spos)
    if 2 < ustr.size then
	local last = math.min(spos, ustr.size - 1)
	for pos = 0, last do
	    -- first minus
	    if ustr:GetChar(pos) == 0x2D then
		-- second minus
		if pos + 1 < last and  ustr:GetChar(pos + 1) == 0x2D then
		    return true
		end
	    end
	end
    end
    return false
end

local function UnicodeStringCharsOnly(ustr, char)
    for pos = 0, ustr.size - 1 do
	if char ~= ustr:GetChar(pos) then
	    return false
	end
    end
    return true
end

local function TermStyleColor(term, str, posx, length, skip, params)
    term:CursorMoveFirst()
    term:CursorMoveRight(posx - skip)
    if params.background ~= nil then
	term:FillBGColor(SWE.Color[params.background], length)
	term:CursorMoveLeft(length)
    end
    if params.color ~= nil then
	term:FillFGColor(SWE.Color[params.color], length)
	term:CursorMoveLeft(length)
    end
    local style = ConvertStyle(params.style)
    if style ~= 0 then
	term:FillProperty(frs.blended, style, frs.hinting, length)
	term:CursorMoveLeft(length)
    end
end

local function TermCheckSyntax(term, str, posx, length, skip, params)
    -- check syntax object
    if params.checkobject then
	local obj, parent = GetObjectParent(str)
	if obj == nil then
	    term:FillBGColor(term.colors.syntaxerror, length)
	    term:CursorMoveLeft(length)
	end
    end
end

local function UnicodeStringFind(ustr, pattern, bs)
    -- FIXME convert to ASCII string
    local str = ustr:ToUtf8String()
    return string.find(str, pattern, bs)
end

local function DrawLineColored(term, ustr, skip, vals)
    --
    term:CursorMoveFirst()
    if 0 < ustr.size and skip < ustr.size then
	if 0 < skip then
	    term:DrawText(ustr:SubString(skip))
	else
	    term:DrawText(ustr)
	end
    end

    -- mark space string
    if UnicodeStringCharsOnly(ustr, 0x20) then
	term:CursorMoveFirst()
	term:FillBGColor(term.colors.spacemarker, ustr.size)
	return true
    end

    local iscomments = UnicodeStringIsComments(ustr, 255)

    for i = 1, #vals do
	local t = vals[i]

	if t.pattern ~= nil then
	    local bs = 1
	    while bs ~= nil do
		local fs, ls, ss = UnicodeStringFind(ustr, t.pattern, bs)
		if ls ~= nil then
		    if t.tokens == nil or #t.tokens == 0 or TableFindValue(t.tokens, ss) then
			-- apply style pattern
			TermStyleColor(term, ss, fs - 1, ls - fs + 1, skip, t)
			-- check err syntax highlight
			if not iscomments then
			    TermCheckSyntax(term, ss, fs - 1, ls - fs + 1, skip, t)
			end
		    end
		    bs = ls + 1
		else
		    bs = nil
		end
	    end
	end
    end

    return true
end

local function AreaHighLightCoords(term, termcol, termrow, pattern)
    local bs = 1
    while bs ~= nil do
	local fs,ls,ss = UnicodeStringFind(term.content[termrow], pattern, bs)

	if ls ~= nil then
	    -- focused word
	    if fs <= termcol and termcol <= ls then
		term.highlight.first = fs - term.skipcols
		term.highlight.last = ls - term.skipcols
		term.highlight.row = termrow - term.skiprows
		term.highlight.word = ss
		term.highlight.valid = true
		-- fix border
		if term.highlight.first < 1 then
		    term.highlight.first = 1
		end
		if term.highlight.last > term.cols - 2 then
		    term.highlight.last = term.cols - 2
		end
		return true
	    end

	    bs = ls + 1
	else
	    bs = nil
	end
    end
    return false
end

local function AreaFindHighLightWord(term,termcx,termcy)
    local cols = term.cols - 2
    local rows = math.min(term.rows - 2, #term.content)

    -- check border
    if 0 < termcx and termcx <= cols and 0 < termcy and termcy <= rows then
	local textcol = termcx + term.skipcols
    	local textrow = termcy + term.skiprows

	-- check is comment
	if UnicodeStringIsComments(term.content[textrow], textcol - 1) then
	    return false
	end

	for i = 1, #term.settings.highlighting do
	    local t = term.settings.highlighting[i]
	    if t.pattern ~= nil and t.focushighlight and
		AreaHighLightCoords(term, textcol, textrow, t.pattern) then
		SWE.DisplayDirty()
		return true
	    end
	end
    end

    if term.highlight.valid then
        term.highlight.valid = false
        SWE.DisplayDirty()
    end

    return false
end

local function AreaScrollUp(area, skip)
    if 0 < area.skiprows then
	area.skiprows = area.skiprows - skip
	if 0 > area.skiprows then
	    area.skiprows = 0
	end
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif 1 < area.cursory then
	area.cursory = 1
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    end
    return false
end

local function AreaScrollDown(area, skip)
    if area.skiprows + area.rows - 2 < #area.content then
    	area.skiprows = area.skiprows + skip
	if area.skiprows + area.rows - 2 > #area.content then
	    area.skiprows = #area.content - area.rows + 2
	end
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif area.rows - 2 > #area.content then
	area.cursory = #area.content
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif area.cursory < area.rows - 2 then
	area.cursory = area.rows - 2
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    end
    return false
end

local function AreaScrollLeft(area, skip)
    if 0 < area.skipcols then
    	area.skipcols = area.skipcols - skip
	if 0 > area.skipcols then
	    area.skipcols = 0
	end
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif 1 < area.cursorx then
	area.cursorx = 1
	area.virtualx = area.cursorx + area.skipcols
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    end
    return false
end

local function AreaScrollRight(area, skip)
    if area.skipcols + area.cols - 2 < area.maxlen - 1 then
    	area.skipcols = area.skipcols + skip
	if area.skipcols + area.cols - 2 > area.maxlen - 1 then
	    area.skipcols = area.maxlen - area.cols + 1
	end
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif area.cursorx < area.cols - 2 then
	area.cursorx = area.cols - 2
	area.virtualx = area.cursorx + area.skipcols
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    end
    return false
end

local function AreaLineHome(area)
    if 1 < area.cursorx or 0 < area.skipcols then
	area.skipcols = 0
	area.cursorx = 1
	area.virtualx = area.cursorx + area.skipcols
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    end
    return false
end

local function AreaGotoLineEnd(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    local ustr = area.content[textrow]
    if ustr ~= nil then
	if area.cols - 3 < ustr.size then
	    area.skipcols = ustr.size - area.cols + 3
	    area.cursorx = area.cols - 2
	else
	    area.skipcols = 0
	    area.cursorx = ustr.size + 1
	end
	area.virtualx = area.cursorx + area.skipcols
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    end
    return false
end

local function AreaVirtualLineEnd(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    local ustr = area.content[textrow]
    if ustr ~= nil then
	if ustr.size < area.virtualx then
	    area.skipcols = 0
	    area.cursorx = ustr.size + 1
	else
	    area.skipcols = 0
	    area.cursorx = area.virtualx
	end
	if area.cursorx > area.cols - 2 then
	    area.skipcols = area.cursorx - area.cols + 2
	    area.cursorx = area.cols - 2
	end
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
        return true
    end
    return false
end

local function AreaKeyReturn(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols

    if 1 < textcol and textcol - 1 < area.content[textrow].size then
	local ustr2 = area.content[textrow]:SubString(textcol - 1)
	area.content[textrow]:Resize(textcol - 1)
	table.insert(area.content, textrow + 1, ustr2)
    else
	table.insert(area.content, textrow + 1, SWE.UnicodeString(""))
    end
    area.status.modify = true
    area.cursorx = 1
    area.virtualx = area.cursorx + area.skipcols
    area.skipcols = 0
    if area.cursory < area.rows - 2 then
	area.cursory = area.cursory + 1
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    end
    return AreaScrollDown(area, 1)
end

local function AreaKeyBackspace(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    if 1 < area.cursorx then
	area.content[textrow]:Erase(textcol - 2, 1)
	area.cursorx = area.cursorx - 1
	area.virtualx = area.cursorx + area.skipcols
	area.status.modify = true
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif AreaScrollLeft(area, 1) then
	local textrow = area.cursory + area.skiprows
	local textcol = area.cursorx + area.skipcols
	area.content[textrow]:Erase(textcol - 1, 1)
	area.status.modify = true
	SWE.DisplayDirty()
	return true
    end

    -- move up
    if 1 < area.cursory then
	local textrow1 = area.cursory + area.skiprows - 1
	local textrow2 = area.cursory + area.skiprows
	area.cursory = area.cursory - 1
	AreaGotoLineEnd(area)
	local ustr = area.content[textrow1]
	ustr:Insert(ustr.size, area.content[textrow2])
	table.remove(area.content, textrow2)
	area.status.modify = true
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif AreaScrollUp(area, 1) then
	local textrow1 = area.cursory + area.skiprows
	local textrow2 = area.cursory + area.skiprows + 1
	AreaGotoLineEnd(area)
	local ustr = area.content[textrow1]
	ustr:Insert(ustr.size, area.content[textrow2])
	table.remove(area.content, textrow2)
	area.status.modify = true
	SWE.DisplayDirty()
	return true
    end

    return false
end

local function AreaKeyUp(area)
    if 1 < area.cursory then
	area.cursory = area.cursory - 1
	if not AreaVirtualLineEnd(area) then
	    SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	end
	return true
    end
    return AreaScrollUp(area, 1)
end

local function AreaKeyDown(area)
    if area.cursory < area.rows - 2 then
	area.cursory = area.cursory + 1
	if not AreaVirtualLineEnd(area) then
	    SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	end
	return true
    end
    return AreaScrollDown(area, 1)
end

local function AreaKeyLeft(area)
    if 1 < area.cursorx then
	area.cursorx = area.cursorx - 1
	area.virtualx = area.cursorx + area.skipcols
	SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	return true
    elseif AreaScrollLeft(area, 1) then
	return true
    end

    -- move up
    if 1 < area.cursory then
	area.cursory = area.cursory - 1
	if not AreaGotoLineEnd(area) then
	    SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	end
	return true
    elseif AreaScrollUp(area, 1) then
	return AreaGotoLineEnd(area)
    end

    return false
end

local function AreaKeyRight(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    local ustr = area.content[textrow]

    if textcol <= ustr.size then
	if area.cursorx < area.cols - 2 then
	    area.cursorx = area.cursorx + 1
	    area.virtualx = area.cursorx + area.skipcols
	    SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	    return true
	elseif AreaScrollRight(area, 1) then
	    return true
	end
    end

    -- move down
    if area.cursory < area.rows - 2 then
	area.cursory = area.cursory + 1
	if not AreaLineHome(area) then
	    SWE.PushEvent(SWE.Action.EditorCursorPositionChanged, nil, area)
	end
	return true
    elseif AreaScrollDown(area, 1) then
	return AreaLineHome(area)
    end

    return false
end

function AreaSetVisibleChar(area, key, mod)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    local ustr = area.content[textrow]

    if area.insmode then
	ustr:Insert(textcol - 1, 1, key)
    else
	ustr:SetChar(textcol - 1, key)
    end

    area.cursorx = area.cursorx + 1
    area.virtualx = area.cursorx + area.skipcols
    area.status.modify = true
    SWE.DisplayDirty()
    return true
end

local function AreaKeyTab(area)
    local tabs = area.settings.tabs
    if tabs == nil then
	tabs = 4
    end
    for i = 1,tabs do
	AreaSetVisibleChar(area, 0x20)
    end
end

function EditorInit(win, frs2, filename)

    local settings = nil
    frs = frs2

    -- load local config
    local sharedir = SWE.SystemShareDirectories()
    if sharedir ~= nil then
        local buf = SWE.BinaryBuf()
        local file = SWE.SystemConcatePath(sharedir, "editor.json")
        SWE.Debug("check config:", file)
        if buf:ReadFromFile(file) then
            settings = SWE.JsonParse(buf:ToString())
	    if settings ~= nil then
		settings.global = false
	    end
        end
    end

    -- local global config
    if settings == nil then
	settings = SWE.JsonParse(SWE.BinaryBuf.ReadFromFile("editor.json"):ToString())
    end

    local termcols = ToInt(win.width / frs.fixedWidth)
    local termrows = ToInt(win.height / frs.lineHeight)
    local area = SWE.Terminal(frs, termcols, termrows)

    area:SetKeyHandle(true)
    area:SetModality(true)

    area.settings = settings
    area.settings.finger_scroll = 1
    area.cursorx = 1
    area.virtualx = 1
    area.cursory = 1
    area.skipcols = 0
    area.skiprows = 0
    area.maxlen = 0
    area.insmode = true
    area.status = { modify = false }
    area.highlight = { valid = false }
    area.content = {}
    area.colors = { back = SWE.Color.MidnightBlue, text = SWE.Color.Silver, highlight = SWE.Color.MediumBlue, syntaxerror = SWE.Color.FireBrick,
	cursormarker = SWE.Color.LawnGreen, scrollmarker = SWE.Color.LawnGreen, spacemarker = SWE.Color.RoyalBlue }

    area.keyb = TermLabelActionCreate("KEYB", frs, 1, area.rows - 1, area)
    area.close = TermLabelActionCreate("CLOSE", frs, area.cols - 8, area.rows - 1, area)

    -- keyb event: mouse click
    area.keyb.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	SWE.DisplayKeyboard(true)
	return true
    end

    -- close event: mouse click
    area.close.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	area:SetVisible(false)
	return true
    end

    -- load config colors
    if type(area.settings.colors) == "table" then
	for k,v in pairs(area.colors) do
	    if area.settings.colors[k] ~= nil then
		area.colors[k] = SWE.Color[ area.settings.colors[k] ]
	    end
	end
    end

    area.LoadFile = function(area, filename)
	area.content = {}
	local fd = io.open(filename, "r")
	if fd ~= nil then
	    local dirname, basename = SWE.SystemDirnameBasename(filename)
	    area.basename = basename
	    area.filename = filename
	    for c in fd:lines() do
		local str = string.gsub(c, "\t", string.rep(" ", 8))
		table.insert(area.content, SWE.UnicodeString(str))
	    end
	    table.insert(area.content, SWE.UnicodeString())
	    fd:close()
	    area.status.modify = false
	    return true
	end
	return false
    end

    area.NewFile = function(area)
	area:LoadFile("template.lua")
	area.basename = "newfile"
	area.filename = ""
    end

    -- window event: scroll up
    area.ScrollUpEvent = function(x,y)
	return AreaScrollUp(area, area.rows - 2)
    end

    -- window event: scroll down
    area.ScrollDownEvent = function(x,y)
	return AreaScrollDown(area, area.rows - 2)
    end

    -- window event: mouse click
    area.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	area.cursorx = ToInt(px * area.cols / area.width)
	area.cursory = ToInt(py / frs.lineHeight)
	-- check border
	if area.cursorx < 1 then
	    area.cursorx = 1
	elseif area.cursorx > area.cols - 2 then
	    area.cursorx = area.cols - 2
	end
	if area.cursory < 1 then
	    area.cursory = 1
	elseif area.cursory > area.rows - 2 then
	    area.cursory = area.rows - 2
	end
	area.virtualx = area.cursorx + area.skipcols

	-- highlight
	if area.highlight.valid then
	    local obj,parent = GetObjectParent(area.highlight.word)
	    if obj ~= nil then
		local t = GetObjectFields(parent,type(obj))
		for i=1,#t do
		    print(t[i])
		end
	    end
        end

	AreaVirtualLineEnd(area)

	SWE.DisplayDirty()
	return true
    end

    -- window event: mouse motion
    area.MouseMotionEvent = function(cx,cy,btn)
	local termcx = ToInt(cx * area.cols / area.width)
	local termcy = ToInt(cy / frs.lineHeight)
	AreaFindHighLightWord(area,termcx,termcy)
	return true
    end

    -- window event: key press
    area.KeyPressEvent = function(key,mod,scancode)
	-- reset highlight
	if area.highlight.valid then
	    area.highlight.valid = false
	    SWE.DisplayDirty()
	end

	if SWE.Key.ESCAPE == key then
    	    win:SetVisible(false)
	    return true
	-- android back key
	elseif key == 0x4000010e then
    	    win:SetVisible(false)
	    return true
	elseif SWE.Key.RETURN == key then	return AreaKeyReturn(area)
	elseif SWE.Key.BACKSPACE == key then	return AreaKeyBackspace(area)
	elseif SWE.Key.HOME == key then		return AreaLineHome(area)
	elseif SWE.Key.END == key then		return AreaGotoLineEnd(area)
	elseif SWE.Key.PAGEUP == key then	return AreaScrollUp(area, area.rows - 2)
	elseif SWE.Key.PAGEDOWN == key then	return AreaScrollDown(area, area.rows - 2)
	elseif SWE.Key.UP == key then		return AreaKeyUp(area)
	elseif SWE.Key.DOWN == key then		return AreaKeyDown(area)
	elseif SWE.Key.LEFT == key then		return AreaKeyLeft(area)
	elseif SWE.Key.RIGHT == key then	return AreaKeyRight(area)
	elseif SWE.Key.TAB == key then		return AreaKeyTab(area)
	end

	if 0x20 <= key and key < 0xFEFF then
	    return AreaSetVisibleChar(area, key, mod)
	end

	print(key, string.format("0x%x", mod))

	return false
    end

    -- window event: system user
    area.SystemUserEvent = function(a,b)
	-- system signal
	if a == SWE.Signal.FingerMoveUp then
    	    return AreaScrollDown(area, area.settings.finger_scroll)
	elseif a == SWE.Signal.FingerMoveDown then
    	    return AreaScrollUp(area, area.settings.finger_scroll)
	elseif a == SWE.Signal.FingerMoveLeft then
    	    return AreaScrollRight(area, area.settings.finger_scroll)
	elseif a == SWE.Signal.FingerMoveRight then
    	    return AreaScrollLeft(area, area.settings.finger_scroll)
	elseif a == SWE.Action.EditorCursorPositionChanged then
	    AreaFindHighLightWord(area,area.cursorx,area.cursory)
	    SWE.DisplayDirty()
	end
	return false
    end

    area.WindowCloseEvent = function()
        local sharedir = SWE.SystemShareDirectories()
        if sharedir ~= nil then
            SWE.SystemMakeDirectory(sharedir)
            local filename = SWE.SystemConcatePath(sharedir, "editor.json")
            -- json format
	    local buf = SWE.BinaryBuf(SWE.TableToJson(area.settings))
            buf:SaveToFile(filename)
            SWE.Debug("save config:", filename)
        end
    end

    -- window virtual: render window
    area.RenderWindow = function()
	area:ResetPadding()
	area:CursorTopLeft():FillColors(area.colors.text, area.colors.back, area.cols, area.rows)
	area:CursorTopLeft():FillProperty(frs.blended, frs.style, frs.hinting, area.cols, area.rows)
	area:CursorTopLeft():FillCharset(0, area.cols, area.rows)
	area:CursorTopLeft():DrawRect(area.cols, area.rows, SWE.Line.Thin)
	area:SetPadding(1,1,1,1):CursorTopLeft()
	area.maxlen = 0

	for i=1,#area.content do
	    if i > area.skiprows and i < area.skiprows + area.rows - 1 then
		DrawLineColored(area, area.content[i], area.skipcols, area.settings.highlighting)
		area:CursorMoveDown()
		area:CursorMoveFirst()
		local size = area.content[i].size
		-- calc maxlen
		if size > area.maxlen then
		    area.maxlen = size
		end
	    end
	end
	area:ResetPadding()

	-- render highlight words
	if area.highlight.valid then
	    area:CursorPosition(area.highlight.first, area.highlight.row)
	    area:FillBGColor(area.colors.highlight, area.highlight.last - area.highlight.first + 1, 1)
	end

	-- render header
	area:CursorPosition(2, 0):FillFGColor(SWE.Color.SkyBlue, string.len(area.basename))
	area:CursorPosition(1, 0):DrawChar(SWE.Char.RTee(SWE.Line.Thin)):DrawText(area.basename):DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	area:CursorMoveRight(2):DrawChar(SWE.Char.RTee(SWE.Line.Thin)):DrawText(tostring(area.skipcols + area.cursorx - 1)):DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	area:CursorMoveRight(1):DrawChar(SWE.Char.RTee(SWE.Line.Thin)):DrawText(tostring(area.skiprows + area.cursory) .. ":" .. tostring(#area.content)):DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	area:CursorPosition(area.cols - 5, 0):DrawChar(SWE.Char.RTee(SWE.Line.Thin))
	if area.status.modify then
	    area:DrawText("*")
	else
	    area:DrawText("-")
	end
	area:DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	-- render footer
	-- 
	-- render cursor marker
	area:CursorPosition(0, area.cursory):FillFGColor(area.colors.cursormarker):CursorMoveLeft():DrawChar(SWE.Char.VLine(SWE.Line.Bold))
	-- render cursor
	local t = area:CursorPosition(area.cursorx, area.cursory):CharsetInfo()
	if t ~= nil then
	    area:FillColors(SWE.Color[t.bgcolor], SWE.Color[t.fgcolor])
	    -- SWE.Dump(t)
	end
	-- render vscroll
	if area.rows - 2 < #area.content then
	    local bary = ToInt((area.skiprows + area.cursory - 1) * (area.rows - 2) / #area.content)
	    local barh = ToInt((area.rows - 2) * (area.rows - 2) / #area.content)
	    if bary > (area.rows - 2) - barh then
		bary = (area.rows - 2) - barh
    	    end
	    area:CursorPosition(area.cols - 1, bary + 1):DrawVLine(barh,SWE.Char.VLine(SWE.Line.Double),area.colors.scrollmarker)
	end
	-- sync changes
	area:SetFlush()
	return true
    end

    if filename ~= nil then
	local t = SWE.SystemFileStat(filename)
	if not t or t.type ~= "file" or not area:LoadFile(filename) then
	    area:NewFile()
	end
    else
	area:NewFile()
    end

    SWE.DisplayKeyboard(true)
    return area
end
