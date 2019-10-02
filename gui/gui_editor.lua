-- require 'SWE'

SWE.LuaRegisterDirectory("gui")
require 'gui_tools'

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
    -- check syntax object
    if params.checkobject then
	local obj,parent = GetObjectParent(str)
	if obj == nil then
	    term:FillBGColor(term.colors.syntaxerror, length)
	    term:CursorMoveLeft(length)
	end
    end
end

local function DrawLineColored(term, str, skip, vals)
    term:CursorMoveFirst()
    term:DrawText(string.sub(str, skip + 1))

    for i = 1, #vals do
	local t = vals[i]

	if t.pattern ~= nil then
	    local bs = 1
	    while bs ~= nil do
		local fs,ls,ss = string.find(str, t.pattern, bs)
		if ls ~= nil then
		    if t.tokens == nil or #t.tokens == 0 or TableFindValue(t.tokens, ss) then
			TermStyleColor(term, ss, fs - 1, ls - fs + 1, skip, t)
		    end
		    bs = ls + 1
		else
		    bs = nil
		end
	    end
	end
    end
end

local function AreaHighLightCoords(term, termcol, termrow, pattern)
    local bs = 1
    while bs ~= nil do
	local fs,ls,ss = string.find(term.content[termrow], pattern, bs)

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
	SWE.DisplayDirty()
	return true
    elseif 1 < area.cursory then
	area.cursory = 1
	SWE.DisplayDirty()
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
	SWE.DisplayDirty()
	return true
    elseif area.cursory < area.rows - 2 then
	area.cursory = area.rows - 2
	SWE.DisplayDirty()
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
	SWE.DisplayDirty()
	return true
    elseif 1 < area.cursorx then
	area.cursorx = 1
	area.virtualx = area.cursorx + area.skipcols
	SWE.DisplayDirty()
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
	SWE.DisplayDirty()
	return true
    elseif area.cursorx < area.cols - 2 then
	area.cursorx = area.cols - 2
	area.virtualx = area.cursorx + area.skipcols
	SWE.DisplayDirty()
	return true
    end
    return false
end

local function AreaLineHome(area)
    if 1 < area.cursorx or 0 < area.skipcols then
	area.skipcols = 0
	area.cursorx = 1
	area.virtualx = area.cursorx + area.skipcols
	SWE.DisplayDirty()
	return true
    end
    return false
end

local function AreaGotoLineEnd(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    local str = area.content[textrow]
    if str ~= nil then
	if area.cols - 3 < string.len(str) then
	    area.skipcols = string.len(str) - area.cols + 3
	    area.cursorx = area.cols - 2
	else
	    area.skipcols = 0
	    area.cursorx = string.len(str) + 1
	end
	area.virtualx = area.cursorx + area.skipcols
	SWE.DisplayDirty()
	return true
    end
    return false
end

local function AreaVirtualLineEnd(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    local str = area.content[textrow]
    if str ~= nil then
	if string.len(str) < area.virtualx then
	    area.skipcols = 0
	    area.cursorx = string.len(str) + 1
	else
	    area.skipcols = 0
	    area.cursorx = area.virtualx
	end
	if area.cursorx > area.cols - 2 then
	    area.skipcols = area.cursorx - area.cols + 2
	    area.cursorx = area.cols - 2
	end
        return true
    end
    return false
end

local function AreaKeyReturn(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    local str1 = string.sub(area.content[textrow], 1, textcol - 1)
    local str2 = string.sub(area.content[textrow], textcol)
    area.content[textrow] = str1
    table.insert(area.content, textrow + 1, str2)
    area.status.modify = true
    area.cursorx = 1
    area.virtualx = area.cursorx + area.skipcols
    area.skipcols = 0
    if area.cursory < area.rows - 2 then
	area.cursory = area.cursory + 1
	SWE.DisplayDirty()
	return true
    end
    return AreaScrollDown(area, 1)
end

local function AreaKeyBackspace(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols
    if 1 < area.cursorx then
	local str1 = string.sub(area.content[textrow], 1, textcol - 2)
	local str2 = string.sub(area.content[textrow], textcol)
	area.content[textrow] = str1 .. str2
	area.cursorx = area.cursorx - 1
	area.virtualx = area.cursorx + area.skipcols
	area.status.modify = true
	SWE.DisplayDirty()
	return true
    elseif AreaScrollLeft(area, 1) then
	local textrow = area.cursory + area.skiprows
	local textcol = area.cursorx + area.skipcols
	local str1 = string.sub(area.content[textrow], 1, textcol - 1)
	local str2 = string.sub(area.content[textrow], textcol + 1)
	area.content[textrow] = str1 .. str2
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
	area.content[textrow1] = area.content[textrow1] .. area.content[textrow2]
	table.remove(area.content, textrow2)
	area.status.modify = true
	SWE.DisplayDirty()
	return true
    elseif AreaScrollUp(area, 1) then
	local textrow1 = area.cursory + area.skiprows
	local textrow2 = area.cursory + area.skiprows + 1
	AreaGotoLineEnd(area)
	area.content[textrow1] = area.content[textrow1] .. area.content[textrow2]
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
	AreaVirtualLineEnd(area)
	SWE.DisplayDirty()
	return true
    end
    return AreaScrollUp(area, 1)
end

local function AreaKeyDown(area)
    if area.cursory < area.rows - 2 then
	area.cursory = area.cursory + 1
	AreaVirtualLineEnd(area)
	SWE.DisplayDirty()
	return true
    end
    return AreaScrollDown(area, 1)
end

local function AreaKeyLeft(area)
    if 1 < area.cursorx then
	area.cursorx = area.cursorx - 1
	area.virtualx = area.cursorx + area.skipcols
	AreaFindHighLightWord(area,area.cursorx,area.cursory)
	SWE.DisplayDirty()
	return true
    elseif AreaScrollLeft(area, 1) then
	return true
    end

    -- move up
    if 1 < area.cursory then
	area.cursory = area.cursory - 1
	AreaGotoLineEnd(area)
	SWE.DisplayDirty()
	return true
    elseif AreaScrollUp(area, 1) then
	return AreaGotoLineEnd(area)
    end

    return false
end

local function AreaKeyRight(area)
    local textrow = area.cursory + area.skiprows
    local textcol = area.cursorx + area.skipcols

    if textcol <= string.len(area.content[textrow]) then
	if area.cursorx < area.cols - 2 then
	    area.cursorx = area.cursorx + 1
	    area.virtualx = area.cursorx + area.skipcols
	    AreaFindHighLightWord(area,area.cursorx,area.cursory)
	    SWE.DisplayDirty()
	    return true
	elseif AreaScrollRight(area, 1) then
	    return true
	end
    end

    -- move down
    if area.cursory < area.rows - 2 then
	area.cursory = area.cursory + 1
	AreaLineHome(area)
	SWE.DisplayDirty()
	return true
    elseif AreaScrollDown(area, 1) then
	return AreaLineHome(area)
    end

    return false
end

function EditorInit(win)

    local settings = nil

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

    -- init frs
    if frs.fixedWidth == nil then
	-- mobile os first start: calculate font size
        if not settings.global and SWE.SystemMobileOs() ~= nil then
            local dw,dh,df = SWE.DisplaySize()
            local fsz = ToInt(dw / 320 * 12)
	    settings.font.size = fsz
            SWE.Debug("set font size", fsz)
        end
	-- load font
        frs = SWE.FontRender(settings.font.file, settings.font.size, settings.font.blended)
    end

    local termcols = ToInt(win.width / frs.fixedWidth)
    local termrows = ToInt(win.height / frs.lineHeight)
    local area = SWE.Terminal(frs, termcols, termrows)

    area:SetKeyHandle(true)
    area.settings = settings
    area.cursorx = 1
    area.virtualx = 1
    area.cursory = 1
    area.skipcols = 0
    area.skiprows = 0
    area.maxlen = 0
    area.status = { modify = false }
    area.highlight = { valid = false }
    area.content = {}
    area.colors = { back = SWE.Color.MidnightBlue, text = SWE.Color.Silver, highlight = SWE.Color.MediumBlue, syntaxerror = SWE.Color.FireBrick,
	cursormarker = SWE.Color.LawnGreen, scrollmarker = SWE.Color.LawnGreen }

    -- load config colors
    if type(area.settings.colors) == "table" then
	for k,v in pairs(area.colors) do
	    if area.settings.colors[k] ~= nil then
		area.colors[k] = SWE.Color[ area.settings.colors[k] ]
	    end
	end
    end

    area.LoadFile = function(area, filename)
	local dirname, basename = SWE.SystemDirnameBasename(filename)
	area.content = {}
	area.filename = basename
	local fd = io.open(filename, "r")
	if fd ~= nil then
	    for c in fd:lines() do
		local str = string.gsub(c, "\t", string.rep(" ", 8))
		table.insert(area.content, str)
	    end
	    table.insert(area.content, "")
	    fd:close()
	    area.status.modify = false
	    return true
	end
	return false
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
    area.KeyPressEvent = function(key)
	-- reset highlight
	if area.highlight.valid then
	    area.highlight.valid = false
	    SWE.DisplayDirty()
	end

	if SWE.Key.ESCAPE == key then
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
	end

	print(key)

	return false
    end

    -- window event: system user
    area.SystemUserEvent = function(a,b)
	-- system signal
	if a == SWE.Signal.FingerMoveUp then
    	    return AreaScrollDown(area, ToInt((area.rows - 2) / 2))
	elseif a == SWE.Signal.FingerMoveDown then
    	    return AreaScrollUp(area, ToInt((area.rows - 2) / 2))
	elseif a == SWE.Signal.FingerMoveLeft then
    	    return AreaScrollLeft(area, ToInt((area.cols - 2) / 2))
	elseif a == SWE.Signal.FingerMoveRight then
    	    return AreaScrollRight(area, ToInt((area.cols - 2) / 2))
	end
	return false
    end

    area.WindowCloseEvent = function()
        local sharedir = SWE.SystemShareDirectories()
        if sharedir ~= nil then
            SWE.SystemMakeDirectory(sharedir)
            filename = SWE.SystemConcatePath(sharedir, "editor.json")
            -- json format
	    local buf = SWE.BinaryBuf(SWE.ToJson(area.settings))
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
		-- calc maxlen
		if string.len(area.content[i]) > area.maxlen then
		    area.maxlen = string.len(area.content[i])
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
	area:CursorPosition(1, 0):DrawChar(SWE.Char.RTee(SWE.Line.Thin)):DrawText(area.filename):DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	area:CursorMoveRight(2):DrawChar(SWE.Char.RTee(SWE.Line.Thin)):DrawText(tostring(area.skipcols + area.cursorx - 1)):DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	area:CursorMoveRight(1):DrawChar(SWE.Char.RTee(SWE.Line.Thin)):DrawText(tostring(area.skiprows + area.cursory) .. ":" .. tostring(#area.content)):DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	area:CursorPosition(area.cols - 5, 0):DrawChar(SWE.Char.RTee(SWE.Line.Thin))
	if area.status.modify then
	    area:DrawText("*")
	else
	    area:DrawText("-")
	end
	area:DrawChar(SWE.Char.LTee(SWE.Line.Thin))
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

    SWE.DisplayKeyboard(true)
    return area
end
