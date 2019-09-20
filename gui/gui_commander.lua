require 'gui_list'
require 'gui_tools'
require 'gui_button'

local frs = {}

local function ShrinkLongName(name, smax)
    local len = 0
    if name ~= nil then
	len = string.len(name)
    end
    if len > smax then
	local rem = len - (smax + 1)
	local left = ToInt((len - rem) / 2)
	local right = smax - (left + 1)
	return string.sub(name, 1, left) .. "~" .. string.sub(name, len - right)
    end
    return name
end

local function DialogSelectCwd(posx, posy, width, height, cwd, parent)

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
    local list = ListCreate(posx, posy, width, height * #dirs, parent)
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
	    local item = ListCreateItem(list, 0, 0, list.width, height, ItemRenderWindow)
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

    local szlen= string.len(tostring(sz))
    if szlen > 11 then
	return tostring(ToInt(sz / 1073741824)) .. "G"
    elseif szlen > 8 then
	return tostring(ToInt(sz / 1048576)) .. "M"
    elseif szlen > 5 then
	return tostring(ToInt(sz / 1024)) .. "K"
    end
    return tostring(sz)
end

local function GetDirsFiles(cwd)
    local names = SWE.SystemReadDirectory(cwd)
    local dirs = {}
    local files = {}
    local dotIndex = nil

    for k,v in pairs(names) do
	if v == "file" then
	    local skip = false
	    if not skip and string.find(k, "start%.lua") then
		skip = true
	    end
	    if not skip and string.find(k, "%.lua$") then
		table.insert(files, k)
	    end
	elseif v == "directory" then
	    table.insert(dirs, k)
	    if string.find(k, "%.%.") then
		dotIndex = #dirs
	    end
	end
    end

    if not dotIndex and cwd ~= "/" then
	table.insert(dirs, 1, SWE.SystemConcatePath(cwd, ".."))
    end

    return dirs, files
end

local function ItemRenderWindow(item)
    item:RenderClear(SWE.Color.MidnightBlue)
    local str = ShrinkLongName(item.label, ToInt(item.width / frs.fixedWidth) - 8)
    local color = nil
    local info = nil
    if item.isdir then
        str = "/" .. str
        info = "<DIR>"
        if item:IsSelected() then
            item:RenderClear(SWE.Color.Yellow)
            color = SWE.Color.MidnightBlue
        else
            color = SWE.Color.White
        end
    else
        local stat = SWE.SystemFileStat(item.path)
        info = PrettySize(stat.size)
        if item:IsSelected() then
            item:RenderClear(SWE.Color.Yellow)
            color = SWE.Color.MidnightBlue
        else
            color = SWE.Color.Yellow
        end
    end
    item:RenderText(frs, str, color, 5, item.height / 2, SWE.Align.Left, SWE.Align.Center)
    item:RenderText(frs, info, color, item.width - 2, item.height / 2, SWE.Align.Right, SWE.Align.Center)
    return true
end

local function ListFillItems(list,cwd,old)
    local dirs, files = GetDirsFiles(cwd)
    local itemHeight = frs.lineHeight + 4
    local items = {}

    table.sort(dirs)
    table.sort(files)

    for i = 1, #dirs do
	local item = ListCreateItem(list, 0, 0, list.width - 2, itemHeight, ItemRenderWindow)
	local dirname, basename = SWE.SystemDirnameBasename(dirs[i])
	item.label = basename
	item.path = dirs[i]
	item.isdir = true
        item:SetVisible(false)
        table.insert(items, item)
    end

    for i = 1, #files do
	local item = ListCreateItem(list, 0, 0, list.width - 2, itemHeight, ItemRenderWindow)
	local dirname, basename = SWE.SystemDirnameBasename(files[i])
	item.label = basename
	item.path = files[i]
	item.isdir = false
        item:SetVisible(false)
        table.insert(items, item)
    end

    list:AssignItems(table.unpack(items))
    list.cwd = cwd

    if old ~= nil then
        list:SetItemSelected(old)
    end
end

function CommanderInit(win)
    local cmd = {}

    local cfgfsz = 0
    local cfgcwd = SWE.SystemCurrentDirectory()

    cmd.win = win
    cmd.start = nil
    cmd.exit = false

    -- check config
    local sharedir = SWE.SystemShareDirectories()
    if sharedir ~= nil then
	local buf = SWE.BinaryBuf()
	local file = SWE.SystemConcatePath(sharedir, "commander.json")
	SWE.Debug("check config:", file)
	if buf:ReadFromFile(file) then
	    local config = SWE.JsonParse(buf:ToString())
	    if config ~= nil then
		cfgfsz = config.fsz
		cfgcwd = config.cwd
	    end
	end
    end

    -- init frs
    if frs.fixeWidth == nil then
	if cfgfsz == 0 then
	    local dw,dh,df = SWE.DisplaySize()
	    -- calculate font size
	    local fsz = ToInt(dw / 320 * 12)
	    frs = SWE.FontRender("terminus.ttf", fsz, false)
	    SWE.Debug("set font size", fsz)
	else
	    frs = SWE.FontRender("terminus.ttf", cfgfsz, true)
	end
    end

    cmd.btnx = TextButtonCreate(0, 0, "CLOSE", frs, cmd.win)
    cmd.btnx:SetPosition((cmd.win.width - cmd.btnx.width) / 2, cmd.win.height - cmd.btnx.height - 4)

    cmd.btnzo = TextButtonCreate(0, 0, "Z-", frs, cmd.win)
    cmd.btnzo:SetPosition(4, cmd.win.height - cmd.btnzo.height - 4)

    cmd.btnzi = TextButtonCreate(0, 0, "Z+", frs, cmd.win)
    cmd.btnzi:SetPosition(cmd.win.width - cmd.btnzi.width - 4, cmd.win.height - cmd.btnzi.height - 4)

    local posx = 10
    local posy = cmd.btnx.height + 5
    cmd.list = ListCreate(posx, posy, cmd.win.width - posx - 6, cmd.win.height - posy - cmd.btnx.height - 6, cmd.win)
    cmd.list.cwd = cfgcwd
    cmd.list.hotkeys.GotoFirst = SWE.Key.LEFT
    cmd.list.hotkeys.GotoLast = SWE.Key.RIGHT
    cmd.list.hotkeys.GotoUp = SWE.Key.UP
    cmd.list.hotkeys.GotoDown = SWE.Key.DOWN
    cmd.list.hotkeys.Action = SWE.Key.RETURN
    cmd.list.hotkeys.PageUp = SWE.Key.PAGEUP
    cmd.list.hotkeys.PageDown = SWE.Key.PAGEDOWN
    cmd.list:SetKeyHandle(true)

    cmd.scroll = SWE.Window(cmd.list.posx + cmd.list.width, cmd.list.posy, 5, cmd.list.height, cmd.win)
    cmd.cwd = SWE.Window(cmd.list.posx, 3, cmd.list.width, cmd.btnx.height, cmd.win)

    cmd.clear = function(cmd)
	cmd.cwd = nil
	cmd.list = nil
	cmd.btnzi = nil
	cmd.btnzo = nil
	cmd.btnx = nil
	cmd.win = nil
    end

    cmd.scroll.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	local maxh = #cmd.list.items * frs.lineHeight
	local posh = maxh * py / cmd.scroll.height
	cmd.list:SetItemTop(ToInt(posh / frs.lineHeight, cmd.list.lastIndex))
	SWE.DisplayDirty()
	return true
    end

    cmd.scroll.RenderWindow = function()
	cmd.scroll:RenderClear(SWE.Color.LightCyan)
	local maxh = #cmd.list.items * frs.lineHeight
	if 0 < maxh then
	    local curh = ToInt((cmd.list.height - 2) * cmd.list.maxItems * frs.lineHeight / maxh)
	    local cury = ToInt((cmd.list.topIndex - 1) * frs.lineHeight * (cmd.list.height - 2) / maxh)
	    cmd.scroll:RenderRect(SWE.Color.Sienna, 0, cury, cmd.scroll.width, curh, true)
	end
	return true
    end

    cmd.cwd.RenderWindow = function()
	cmd.cwd:RenderClear(SWE.Color.DarkSlateGray)
	local shrink = "[" .. ShrinkLongName(cmd.list.cwd, ToInt((cmd.list.width - 45) / frs.fixedWidth)) .. "]"
	cmd.cwd:RenderText(frs, shrink, SWE.Color.Yellow, cmd.cwd.width / 2, cmd.cwd.height / 2, SWE.Align.Center, SWE.Align.Center)
	return true
    end

    cmd.cwd.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	local cwd = DialogSelectCwd(cmd.cwd.posx, cmd.cwd.posy, cmd.cwd.width, cmd.btnx.height, cmd.list.cwd, cmd.win)

	if cwd ~= cmd.list.cwd then
	    ListFillItems(cmd.list, cwd)
	end
    end

    cmd.win.RenderWindow = function()
	cmd.win:RenderClear(SWE.Color.Silver)
	cmd.win:RenderRect(SWE.Color.Red, 0, 0, cmd.win.width, cmd.win.height)
	return true
    end

    cmd.win.KeyPressEvent = function(key)
	if SWE.Key.ESCAPE == key then
    	    -- close scene, see SWE.MainLoop
    	    cmd.win:SetVisible(false)
	    cmd.exit = true
    	    return true
	end
	return false
    end

    cmd.btnx.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	cmd.win:SetVisible(false)
	cmd.exit = true
	return true
    end

    cmd.btnzo.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	local fsz = tonumber(frs.size) - 2
	if fsz > 10 then
	    frs = SWE.FontRender("terminus.ttf", fsz, true)
	    ListFillItems(cmd.list, cmd.list.cwd)
	    SWE.PushEvent(SWE.Action.FontChanged, frs, nil)
	    SWE.DisplayDirty()
	end
    end

    cmd.btnzi.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	local fsz = tonumber(frs.size) + 2
	frs = SWE.FontRender("terminus.ttf", fsz, true)
	ListFillItems(cmd.list, cmd.list.cwd)
	SWE.PushEvent(SWE.Action.FontChanged, frs, nil)
	SWE.DisplayDirty()
    end

    cmd.list.ItemSelectedAction = function(list, item)
	local selitem = cmd.list:GetItemSelected()
	if selitem ~= nil then
	    local current =  selitem.label
	    if selitem.isdir then
    		if current == ".." then
        	    local dirname, basename = SWE.SystemDirnameBasename(cmd.list.cwd)
        	    ListFillItems(cmd.list, dirname, basename)
    		else
    		    ListFillItems(cmd.list, SWE.SystemConcatePath(cmd.list.cwd, current))
    		end
	    else
    		cmd.start = SWE.SystemConcatePath(cmd.list.cwd, current)
    		cmd.win:SetVisible(false)
	    end
	end
    end

    cmd.list.RenderWindow = function()
	cmd.list:RenderClear(SWE.Color.MidnightBlue)
	cmd.list:RenderRect(SWE.Color.Red, 0, 0, cmd.list.width, cmd.list.height)
	cmd.list:ItemsDisposition()
	return true
    end

    cmd.win.DisplayResizeEvent = function(w,h)
	cmd.win:SetSize(w, h)

	cmd.btnx:SetPosition((cmd.win.width - cmd.btnx.width) / 2, cmd.win.height - cmd.btnx.height - 4)
	cmd.btnzo:SetPosition(4, cmd.win.height - cmd.btnzo.height - 4)
	cmd.btnzi:SetPosition(cmd.win.width - cmd.btnzi.width - 4, cmd.win.height - cmd.btnzi.height - 4)

	local posx = 10
	local posy = cmd.btnx.height + 5
	cmd.list:SetPosition(posx, posy)
	cmd.list:SetSize(cmd.win.width - cmd.list.posx * 2, cmd.win.height - cmd.list.posy - cmd.btnx.height - 6)
	cmd.cwd:SetSize(cmd.list.width, cmd.btnx.height)
	cmd.scroll:SetPosition(cmd.list.posx + cmd.list.width, cmd.list.posy)
	cmd.scroll:SetSize(5, cmd.list.height)

	ListFillItems(cmd.list, cmd.list.cwd)
        SWE.DisplayDirty()
    end

    cmd.list.FontChanged = function(frs)
	cmd.btnx:SetPosition((cmd.win.width - cmd.btnx.width) / 2, cmd.win.height - cmd.btnx.height - 4)
	cmd.btnzo:SetPosition(4, cmd.win.height - cmd.btnzo.height - 4)
	cmd.btnzi:SetPosition(cmd.win.width - cmd.btnzi.width - 4, cmd.win.height - cmd.btnzi.height - 4)
	local posx = 10
	local posy = cmd.btnx.height + 5
	cmd.list:SetPosition(posx, posy)
	cmd.list:SetSize(cmd.win.width - cmd.list.posx * 2, cmd.win.height - cmd.list.posy - cmd.btnx.height - 6)
	cmd.cwd:SetSize(cmd.list.width, cmd.btnx.height)
	cmd.scroll:SetPosition(cmd.list.posx + cmd.list.width, cmd.list.posy)
	cmd.scroll:SetSize(5, cmd.list.height)
    end

    cmd.list.WindowCloseEvent = function()
	local sharedir = SWE.SystemShareDirectories()
	if sharedir ~= nil then
	    SWE.SystemMakeDirectory(sharedir)
	    config = SWE.SystemConcatePath(sharedir, "commander.json")
	    -- json format
	    local buf = SWE.BinaryBuf("{" .. "\"fsz\":" .. frs.size .. ",\"cwd\":" .. "\"" .. cmd.list.cwd .. "\"}")
	    buf:SaveToFile(config)
	    SWE.Debug("save config:", config)
	end
    end

    cmd.Start = function()
	ListFillItems(cmd.list, cmd.list.cwd)
	SWE.MainLoop(cmd.win)
    end

    return cmd
end

