require 'SWE'

local fullscreen = false
local dbgmsg = false

local win = SWE.DisplayInit("Lua SWE Commander", 240, 320, fullscreen, dbgmsg)

if not win then
    print("SWE init error")
    os.exit(-1)
else
    SWE.CursorHide()
end

local start = nil
local frs14 = SWE.FontRender("terminus.ttf", 14, true)
local exit = SWE.Window(220, 0, 20, 20)
local list = SWE.Window(20, 20, 200, 280)
list.items = {}

function ToInt(x)
    local integral, fractal = math.modf(x)
    return integral
end

function win.RenderWindow()
    win:RenderClear(SWE.Color.Silver)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    return true
end

function win.KeyPressEvent(key)
    if SWE.Key.ESCAPE == key then
        -- close scene, see SWE.MainLoop
        win:SetVisible(false)
        return true
    end
    return false
end

function exit.RenderWindow()
    exit:RenderClear(SWE.Color.DimGray)
    exit:RenderRect(SWE.Color.Red, 0, 0, exit.width, exit.height)
    exit:RenderText(frs14, "X", SWE.Color.Yellow, exit.width / 2, exit.height / 2, SWE.Align.Center, SWE.Align.Center)
    return true
end

function exit.MouseClickEvent(x,y,btn)
    win:SetVisible(false)
    return true
end

function CreateListItem(x, y, w, h, parent, label, isdir)
    local item = SWE.Window(x, y, w, h, parent)
    local dirname, basename = SWE.SystemDirnameBasename(label)
    item.label = basename
    item.isdir = isdir
    item.iscur = false

    item.RenderWindow = function()
        item:RenderClear(SWE.Color.MidnightBlue)
	if item.isdir then
	    if item.iscur then
    		item:RenderClear(SWE.Color.Yellow)
    		item:RenderText(frs14, "/" .. item.label, SWE.Color.MidnightBlue, 10, item.height / 2, SWE.Align.Left, SWE.Align.Center)
	    else
    		item:RenderText(frs14, "/" .. item.label, SWE.Color.White, 10, item.height / 2, SWE.Align.Left, SWE.Align.Center)
	    end
	else
	    if item.iscur then
    		item:RenderClear(SWE.Color.Yellow)
    		item:RenderText(frs14, item.label, SWE.Color.MidnightBlue, 10, item.height / 2, SWE.Align.Left, SWE.Align.Center)
	    else
    		item:RenderText(frs14, item.label, SWE.Color.Yellow, 10, item.height / 2, SWE.Align.Left, SWE.Align.Center)
	    end
	end
        return true
    end

    item.MouseClickEvent = function(x,y,btn)
	if item.iscur then
	    list.ItemSelectedAction(item)
	else
	    list.SetItemSelected(item)
	end
        return true
    end

    item.SystemUserEvent = function(a,b)
	if a == 3331 then
	    item.iscur = false
	end
	if a == 3332 then
	    item.iscur = true
	    list.current = item.label
	    -- send: list redraw
	    SWE.PushEvent(3334, nil, list)
	end
    end

    return item
end

function GetDirsFiles(cwd)
    local names = SWE.SystemReadDirectory(cwd)
    local dirs = {}
    local files = {}

    for k,v in pairs(names) do
	if v == "file" then
	    if not string.find(k, "start%.lua") and
		string.find(k, "%.lua$") then
		table.insert(files, k)
	    end
	else
	    table.insert(dirs, k)
	end
    end

    return dirs, files
end

function list.SetItemSelected(val)
    if type(val) == "number" then
        if 0 < val and val <= #list.items then
	    -- send: remove all selected
	    SWE.PushEvent(3331, nil, nil)
	    -- send: item only selected
	    SWE.PushEvent(3332, nil, list.items[val])
	    list.selIndex = val
	end
    elseif type(val) == "table" then
	-- send: remove all selected
	SWE.PushEvent(3331, nil, nil)
	-- send: item only selected
	SWE.PushEvent(3332, nil, val)

	for k,v in pairs(list.items) do
	    if val.label == v.label then
		list.selIndex = k
		break
	    end
	end
    end
end

function list.ItemSelectedAction(item)
    if type(item) == "table" then
	if item.isdir then
	    if list.current == ".." then
		local dirname, basename = SWE.SystemDirnameBasename(list.cwd)
		list.FillItems(dirname)
	    else
		list.FillItems(SWE.SystemConcatePath(list.cwd, list.current))
	    end
    	    SWE.DisplayDirty()
	else
	    start = SWE.SystemConcatePath(list.cwd, list.current)
	    win:SetVisible(false)
	end
    end
end

function list.FillItems(cwd)
    local itemHeight = frs14.lineHeight + 4
    list.cwd = cwd

    local dirs, files = GetDirsFiles(list.cwd)

    table.sort(dirs)
    table.sort(files)

    for i = 1, #list.items do
	list.items[i]:SetVisible(false)
	list.items[i] = nil
    end

    if #dirs == 0 or dirs[1] ~= ".." then
	table.insert(dirs, 1, "..")
    end

    for i = 1, #dirs do
	local item = CreateListItem(0, 0, list.width - 2, itemHeight, list, dirs[i], true)
	item:SetVisible(false)
	table.insert(list.items, item)
    end

    for i = 1, #files do
	local item = CreateListItem(0, 0, list.width - 2, itemHeight, list, files[i], false)
	item:SetVisible(false)
	table.insert(list.items, item)
    end

    collectgarbage()

    list.topIndex = 1
    list.maxItems = math.min(ToInt((list.height - 20) / itemHeight), #list.items)
    list.lastIndex = #list.items - list.maxItems + 1
    list.SetItemSelected(1)

    if list.lastIndex < 1 then
	list.lastIndex = 1
    end
end

function list.ItemsDisposition()
    local itemHeight = frs14.lineHeight + 4
    local itemPosY = 20

    for i = 1, #list.items do
	list.items[i]:SetVisible(false)
    end

    for i = list.topIndex, list.topIndex + list.maxItems - 1 do
	list.items[i]:SetPosition(1, itemPosY)
	list.items[i]:SetVisible(true)
	itemPosY = itemPosY + itemHeight
    end
end

function list.KeyPressEvent(key)
    if SWE.Key.LEFT == key then
    	SWE.DisplayDirty()
	return true
    elseif SWE.Key.UP == key and 1 < list.selIndex then
	list.SetItemSelected(list.selIndex - 1)
	if list.selIndex < list.topIndex then
	    list.topIndex = list.topIndex - 1
	end
	list:RenderWindow()
	return true
    elseif SWE.Key.DOWN == key and list.selIndex < #list.items then
	list.SetItemSelected(list.selIndex + 1)
	if list.selIndex > list.topIndex + list.maxItems - 1 then
	    list.topIndex = list.topIndex + 1
	end
	list:RenderWindow()
	return true
    elseif SWE.Key.RETURN == key then
	list.ItemSelectedAction(list.items[list.selIndex])
	return true
    end
    return false
end

function list.ScrollUpEvent(x,y)
    if 1 < list.topIndex then
	list.topIndex = list.topIndex - 1
	list:RenderWindow()
    end
    return true
end

function list.ScrollDownEvent(x,y)
    if list.topIndex < list.lastIndex then
	list.topIndex = list.topIndex + 1
	list:RenderWindow()
    end
    return true
end

function list.SystemUserEvent(a,b)
    if a == 3334 then
    	SWE.DisplayDirty()
    end
end

function ShrinkLongName(name, smax)
    local len = string.len(name)
    if len > smax then
	local rem = len - (smax + 1)
	local left = ToInt((len - rem) / 2)
	local right = smax - (left + 1)
	return string.sub(name, 1, left) .. "~" .. string.sub(name, len - right)
    end
    return name
end

function list.RenderWindow()
    list:RenderClear(SWE.Color.MidnightBlue)
    local shrink = "[ " .. ShrinkLongName(list.cwd, ToInt((list.width - 45) / frs14.fixedWidth)) .. " ]"
    list:RenderText(frs14, shrink, SWE.Color.Yellow, 5, 10, SWE.Align.Left, SWE.Align.Center)
    list:RenderRect(SWE.Color.Red, 0, 0, list.width, list.height)
    list:ItemsDisposition()
    return true
end

list.FillItems(SWE.SystemCurrentDirectory())
SWE.MainLoop(win)

if type(start) == "string" then
    dofile(start)
end
