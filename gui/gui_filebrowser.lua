-- usage:
--
-- local fb = FileBrowserInit(win, frs, path, { params })
--
-- win: parent window
-- frs: font render
-- path: filesystem path
--
-- params.cols: preffered columns
-- params.rows: preffered rows
-- params.include: include filter
-- params.exclude: exclude filter
--
-- virtual functions:
-- fb.ActionFile = function(self, path, stat)
-- ...
-- end
--
-- return: fb.result selected item, (filesystem path)
--

require 'gui_tools'
require 'gui_list'
require 'gui_action'
require 'gui_button'

local function ShrinkLongName(name, smax)
    local len = 0
    if name ~= nil then
        len = string.len(name)
    end
    if len > smax then
        local rem = len - (smax + 1)
        local left = ToInt((len - rem) / 2)
        local right = smax - (left + 2)
        return string.sub(name, 1, left) .. "~" .. string.sub(name, len - right)
    end
    return name
end

local function DialogSelectCwd(posx, posy, width, frs, cwd, parent)

    local dirname, basename = SWE.SystemDirnameBasename(cwd)
    if dirname == cwd then
        return cwd
    end

    local dirs = {}
    table.insert(dirs, cwd)
    table.insert(dirs, dirname)

    local continue = true
    while continue do
        dirname, basename = SWE.SystemDirnameBasename(dirname)
        if dirname ~= dirs[#dirs] then
            table.insert(dirs, dirname)
        else
            continue = false
        end
    end

    local res = cwd
    local list = ListCreate(posx, posy, width, frs.lineHeight * #dirs, parent)
    list:SetModality(true)

    local function ItemRenderWindow(item)
        if item:IsSelected() then
            item:RenderClear(SWE.Color.DarkSlateGray)
        else
            item:RenderClear(SWE.Color.Black)
        end
        local shrink = "[" .. ShrinkLongName(item.label, ToInt((item.width - 45) / frs.fixedWidth)) .. "]"
        item:RenderText(frs, shrink, SWE.Color.White, 4, item.height / 2, SWE.Align.Left, SWE.Align.Center)
        return true
    end

    list.ItemSelectedAction = function(list, item)
        res = item.label
        list:SetVisible(false)
    end

    list.KeyPressEvent = function(key)
        if SWE.Key.ESCAPE == key then
            list:SetVisible(false)
            return true
        end
        return false
    end

    list.RenderWindow = function()
        list:RenderClear(SWE.Color.Black)
        list:ItemsDisposition()
        return true
    end

    list.MouseClickEvent = function(px,py,pb,rx,ry,rb)
        -- click outside, hide list
        if not list:PointInArea(px, py) then
            list:SetVisible(false)
        end
    end

    local function ListFillItems(dirs)
        items = {}

        for i = 1,#dirs do
            local item = ListCreateItem(list, 0, 0, list.width, frs.lineHeight, ItemRenderWindow)
            item.label = dirs[i]
            table.insert(items, item)
        end

        list:AssignItems(table.unpack(items))
    end

    ListFillItems(dirs)
    list:SetItemSelected(1)

    SWE.MainLoop(list)
    return res
end

local function PrettySize(sz)
    local str = tostring(sz)
    local szlen = string.len(str)
    if szlen > 11 then
        return tostring(ToInt(sz / 1073741824)) .. "G"
    elseif szlen > 8 then
        return tostring(ToInt(sz / 1048576)) .. "M"
    elseif szlen > 5 then
        return tostring(ToInt(sz / 1024)) .. "K"
    end
    return str
end

local function SortFileNames(a,b)
    local len = math.min(string.len(a), string.len(b))
    for i=1,len do
	local ab = string.byte(a, i)
	local bb = string.byte(b, i)
	if ab ~= bb then
	    return ab < bb
	end
    end
    return string.len(a) < string.len(b)
end

local function SortStatItems(a,b)
    if a.isdir and not b.isdir then
	return true
    end

    if not a.isdir and b.isdir then
	return false
    end

    return SortFileNames(a.path, b.path)
end

local function FindFilter(str, filter)
    if type(filter) == "table" then
	for i=1,#filter do
	    if string.find(str, tostring(filter[i])) then
		return true
	    end
	end
    end
    return string.find(str, tostring(filter))
end

local function ReadDirectory(cwd, include, exclude)
    local names = SWE.SystemReadDirectory(cwd)
    local res = {}
    local dotIndex = nil

    for k,v in pairs(names) do
        if v == "file" then
            if not include or FindFilter(k, include) then
        	if not exclude or not FindFilter(k, exclude) then
            	    table.insert(res, SWE.SystemFileStat(k))
		end
            end
        elseif v == "directory" then
            table.insert(res, SWE.SystemFileStat(k))
            if string.find(k, "%.%.$") then
                dotIndex = #res
            end
        end
    end

    table.sort(res, SortStatItems)

    if not dotIndex and cwd ~= "/" then
        table.insert(res, 1, SWE.SystemFileStat(SWE.SystemConcatePath(cwd, "..")))
    end

    return res
end

local function TermRenderStatItem(term, item, index)
    local dirn,basen = SWE.SystemDirnameBasename(item.path)
    local sz = PrettySize(item.size)

    local namcol = SWE.Color.Yellow
    local name = basen
    local suffix = sz

    if item.isdir then
	col = SWE.Color.White
	name = "/" .. basen
	namcol = SWE.Color.White
	suffix = "<DIR>"
    end

    if term.selitem == index then
	term:SetColors(term.colors.back, SWE.Color.Yellow)
    else
	term:SetColors(namcol, term.colors.back)
    end

    name = ShrinkLongName(name, term.cols - string.len(suffix) - 4)
    term:CursorMoveRight(1):DrawText(name)

    local space = term.cols - string.len(name) - string.len(suffix) - 2
    term:DrawHLine(space, 0x20):DrawText(suffix)
    term:ResetColors()
end

local function TermScrollUp(term, num)
    local page = term.rows - 2

    if term.skipitems == 0 and term.selitem == 1 then
	return false
    end

    local skip = num or page

    if 1 < term.skipitems - 2 * skip then
	term.skipitems = term.skipitems - skip
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    elseif #term.items < page then
	term.skipitems = 0
	term.selitem = 1
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    else
	term.skipitems = 0
	term.selitem = 1
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    end
    return false
end

local function TermScrollDown(term, num)
    local page = term.rows - 2

    if term.skipitems == #term.items - page and term.selitem == page then
	return false
    end

    local skip = num or page

    if term.skipitems + 2 * skip < #term.items then
	term.skipitems = term.skipitems + skip
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    elseif #term.items < page then
	term.skipitems = 0
	term.selitem = #term.items
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    else
	term.skipitems = #term.items - page
	term.selitem = page
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    end
    return false
end

local function TermSelectedUp(term)
    if term.selitem > 1 then
	term.selitem = term.selitem - 1
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    elseif term.skipitems > 0 then
	term.skipitems = term.skipitems - 1
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    end
    return false
end

local function TermSelectedDown(term)
    local page = term.rows - 2
    local items = math.min(#term.items, page)

    if term.selitem < items then
	term.selitem = term.selitem + 1
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    elseif #term.items > term.skipitems + page then
	term.skipitems = term.skipitems + 1
	SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	SWE.DisplayDirty()
	return true
    end
    return false
end

local function TermSelectedFirst(term)
    term.skipitems = 0
    term.selitem = 1
    SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
    SWE.DisplayDirty()
    return true
end

local function TermSelectedLast(term)
    local page = term.rows - 2
    term.skipitems = 0
    term.selitem = math.min(#term.items, page)
    if #term.items > page then
	term.skipitems = #term.items - page
    end
    SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
    SWE.DisplayDirty()
    return true
end

local function TermSelectName(term, name)
    if name then
	for i=1,#term.items do
	    local dirn,basen = SWE.SystemDirnameBasename(term.items[i].path)
	    local page = term.rows - 2
	    if name == basen then
		if i > page then
		    term.skipitems = i - page
		    term.selitem = page
		else
		    term.skipitems = 0
		    term.selitem = i
		end
		SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
		return true
	    end
	end
    end
    return false
end

local function TermCreateHeader(term)
    local hdr = ShrinkLongName(term.cwd, term.cols - 4)
    if term.header then
	term.header:SetVisible(false)
    end

    term.header = TermLabelActionCreate(hdr, term.frs, (term.cols - string.len(hdr)) / 2 - 1, 0, term, SWE.Color.Yellow, SWE.Color.DarkSlateGray)

    term.header.MouseClickEvent = 
	function(px,py,pb,rx,ry,rb)
	    local cwd = DialogSelectCwd(term.header.posx + term.frs.fixedWidth, term.header.posy, term.header.width - term.frs.fixedWidth * 2, term.frs, term.cwd, term)
	    if cwd ~= term.cwd then
		SWE.PushEvent(SWE.Action.ChangeValue, cwd, term)
	    end
	    return true
	end
end

local function TermFillItems(term, path)
    term.cwd = path
    term.items = ReadDirectory(term.cwd, term.include, term.exclude)
    term.skipitems = 0
    term.selitem = 1
    SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
    TermCreateHeader(term)
end

local function TermSelectedAction(term)
    local item = term.items[term.skipitems + term.selitem]
    if not item then
	return false
    end
    if item.isdir then
	term:ActionDirectory(item.path, item)
    else
	term:ActionFile(item.path, item)
    end
    return true
end

function FileBrowserInit(win, frs, path, params)
    local cols = params.cols or ToInt(win.width / frs.fixedWidth)
    local rows = params.rows or ToInt(win.height / frs.lineHeight)

    local term = SWE.Terminal(frs, cols, rows, win)

    SWE.Debug("create terminal: " .. tostring(cols) .. "x" .. tostring(rows),
		"window: (" .. tostring(term.width) .. "x" .. tostring(term.height) .. ")",
		"font size: (" .. tostring(frs.size) .. "," .. tostring(frs.fixedWidth) .. "x" .. tostring(frs.lineHeight) .. ")")

    term:SetModality(true)

    term.colors = { back = SWE.Color.MidnightBlue, text = SWE.Color.Silver, highlight = SWE.Color.MediumBlue, syntaxerror = SWE.Color.FireBrick,
        cursormarker = SWE.Color.LawnGreen, scrollmarker = SWE.Color.LawnGreen, spacemarker = SWE.Color.RoyalBlue }
    term.frs = frs
    term.include = params.include
    term.exclude = params.exclude
    term.button1 = TermLabelActionCreate("SELECT", term.frs, 3, term.rows - 1, term, SWE.Color.White)
    term.button1.disable = true
    term.button2 = TermLabelActionCreate("CANCEL", term.frs, term.cols - 10, term.rows - 1, term, SWE.Color.White)
    TermFillItems(term, path)

    term.button1.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	if term.term.button1.disable then
	    return false
	end
	term:SetVisible(false)
        return true
    end

    term.button2.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	if term.term.button2.disable then
	    return false
	end
	term.result = nil
	term:SetVisible(false)
        return true
    end

    term.ActionFile = function(self, path, item)
	term:SetVisible(false)
    end

    term.ActionDirectory = function(self, path, item)
	local dirn,basen = SWE.SystemDirnameBasename(path)
	if basen == ".." then
	    local dirn2,basen2 = SWE.SystemDirnameBasename(dirn)
	    TermFillItems(term, dirn2)
	    TermSelectName(term, basen2)
	else
	    TermFillItems(term, path)
	end
	SWE.DisplayDirty()
    end

    term.RenderWindow = function()
        term:CursorPosition(0, 0):FillColors(term.colors.text, term.colors.back, term.cols, term.rows)
        term:CursorPosition(0, 0):FillProperty(frs.blended, frs.style, frs.hinting, term.cols, term.rows)
        term:CursorPosition(0, 0):FillCharset(0, term.cols, term.rows)
        term:CursorPosition(0, 0):DrawRect(term.cols, term.rows, SWE.Line.Thin)
    	term:CursorPosition(0, 1)

	local page = term.rows - 2

	-- content
	for i=1, #term.items do
	    if i > term.skipitems then
		TermRenderStatItem(term, term.items[i], i - term.skipitems)
		term:CursorMoveDown(1):CursorMoveFirst()
	    end

	    if i - term.skipitems > page - 1 then
		break
	    end
	end

	-- render vscroll
	if page < #term.items then
    	    local bary = ToInt((term.skipitems + term.selitem - 1) * page / #term.items)
    	    local barh = ToInt(page * page / #term.items)
    	    if bary > page - barh then
        	bary = page - barh
    	    end
	    term:CursorPosition(term.cols - 1, bary + 1):DrawVLine(barh,SWE.Char.VLine(SWE.Line.Double),term.colors.scrollmarker)
	end

        -- sync changes
        term:SetFlush()
        return true
    end

    term.DisplayResizeEvent = function(w,h)
        local cols = ToInt(w / term.frs.fixedWidth)
        local rows = ToInt(h / term.frs.lineHeight)
        term:SetTermSize(cols,rows)
        if w ~= term.width or h ~= term.height then
            term:SetPosition((w - term.width)/2, (h - term.height)/2)
        end
    end

    term.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	local cols = ToInt(px / frs.fixedWidth)
	local rows = ToInt(py / frs.lineHeight)
	if 0 < cols and cols < term.cols - 1 and 0 < rows and rows < term.rows - 1 then
	    if term.selitem == rows then
		return TermSelectedAction(term)
	    end
	    if rows > #term.items then
		term.selitem = #term.items
	    else
		term.selitem = rows
	    end
	    SWE.PushEvent(SWE.Action.ItemSelected, term.items[term.skipitems + term.selitem], term)
	end
	return true
    end

    term.KeyPressEvent = function(key,mod,scancode)
	if key == SWE.Key.UP then
	    return TermSelectedUp(term)
	elseif key == SWE.Key.DOWN then
	    return TermSelectedDown(term)
	elseif key == SWE.Key.LEFT then
	    return TermSelectedFirst(term)
	elseif key == SWE.Key.RIGHT then
	    return TermSelectedLast(term)
	elseif key == SWE.Key.PAGEUP then
	    return TermScrollUp(term)
	elseif key == SWE.Key.PAGEDOWN then
	    return TermScrollDown(term)
	elseif key == SWE.Key.RETURN then
	    return TermSelectedAction(term)
	elseif key == SWE.Key.ESCAPE then
	    term.result = nil
	    term:SetVisible(false)
	    return true
	-- android back
	elseif key == 0x4000010e then
	    term.result = nil
	    term:SetVisible(false)
	    return true
	end

	return false
    end

    term.LocalUserEvent = function(self, event, obj)
        return false
    end

    term.SystemUserEvent = function(event,obj)
        if event == SWE.Signal.FingerMoveUp then
            return TermScrollDown(term)
        elseif event == SWE.Signal.FingerMoveDown then
            return TermScrollUp(term)
        elseif event == SWE.Action.ItemSelected then
	    if term.button1 then
		term.button1.disable = obj.isdir
	    end
	    if obj.isdir then
		term.result = nil
	    else
		term.result = term.items[term.skipitems + term.selitem].path
	    end
	    SWE.DisplayDirty()
        elseif event == SWE.Action.ChangeValue then
    	    TermFillItems(term, obj)
	end

        return term:LocalUserEvent(event, obj)
    end

    term.WindowCloseEvent = function()
	-- SWE.Dump(term)
    end

    return term
end
