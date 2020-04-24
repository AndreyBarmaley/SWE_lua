-- require 'SWE'

local fullscreen = false

SWE.SetDebug(false)

local win = SWE.DisplayInit("Lua SWE Commander", 240, 320, fullscreen)

if not win then
    print("SWE init error")
    os.exit(-1)
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
    local memusage = ToInt(SWE.SystemMemoryUsage() / 1024)
    local txMUK = SWE.Texture.Text(frs14, "mem: " .. tostring(memusage) .. "K", SWE.Color.Blue)

    win:RenderClear(SWE.Color.Silver)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    win:RenderTexture(txMUK, (win.width - txMUK.width) / 2, win.height - txMUK.height - 3)

    -- force free texture
    txMUK = nil
    collectgarbage()

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

function PrettySize(sz)

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

function CreateListItem(x, y, w, h, parent, path, isdir)
    local item = SWE.Window(x, y, w, h, parent)
    local dirname, basename = SWE.SystemDirnameBasename(path)
    item.label = basename
    item.isdir = isdir
    item.iscur = false

    item.RenderWindow = function()
        item:RenderClear(SWE.Color.MidnightBlue)
	local str = ShrinkLongName(item.label, ToInt(item.width / frs14.fixedWidth) - 8)
	local color = nil
	local info = nil
	if item.isdir then
	    str = "/" .. str
	    info = "<DIR>"
	    if item.iscur then
    		item:RenderClear(SWE.Color.Yellow)
    		color = SWE.Color.MidnightBlue
	    else
    		color = SWE.Color.White
	    end
	else
	    local stat = SWE.SystemFileStat(path)
	    info = PrettySize(stat.size)
	    if item.iscur then
    		item:RenderClear(SWE.Color.Yellow)
    		color = SWE.Color.MidnightBlue
	    else
    		color = SWE.Color.Yellow
	    end
	end
    	item:RenderText(frs14, str, color, 5, item.height / 2, SWE.Align.Left, SWE.Align.Center)
    	item:RenderText(frs14, info, color, item.width - 2, item.height / 2, SWE.Align.Right, SWE.Align.Center)
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
	    return true
	elseif a == 3332 then
	    item.iscur = true
	    -- send: list redraw
	    SWE.PushEvent(3334, nil, list)
	    return true
	end
	return false
    end

    return item
end

function GetDirsFiles(cwd)
    local names = SWE.SystemReadDirectory(cwd)
    local dirs = {}
    local files = {}
    local dotIndex = nil

    for k,v in pairs(names) do
	if v == "file" then
	    if not string.find(k, "start%.lua") and
		string.find(k, "%.lua$") then
		table.insert(files, k)
	    end
	elseif v == "directory" then
	    table.insert(dirs, k)
	    if string.find(k, "%.%.") then
		dotIndex = #dirs
	    end
	end
    end

    if not dotIndex then
	table.insert(dirs, 1, SWE.SystemConcatePath(cwd, ".."))
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

	for k,v in pairs(list.items) do
	    if v.label == val.label then
		-- send: item only selected
	        SWE.PushEvent(3332, nil, v)
		list.selIndex = k
		break
	    end
	end
    elseif type(val) == "string" then
	-- send: remove all selected
	SWE.PushEvent(3331, nil, nil)

	for k,v in pairs(list.items) do
	    if v.label == val then
		-- send: item only selected
	        SWE.PushEvent(3332, nil, v)
		list.selIndex = k
		break
	    end
	end
    end
end

function list.ItemSelectedAction(item)
    if type(item) == "table" then
	local current = list.items[list.selIndex].label
	if item.isdir then
	    if current == ".." then
		local dirname, basename = SWE.SystemDirnameBasename(list.cwd)
		list.FillItems(dirname,basename)
	    else
		list.FillItems(SWE.SystemConcatePath(list.cwd, current))
	    end
	else
	    start = SWE.SystemConcatePath(list.cwd, current)
	    win:SetVisible(false)
	end
    end
end

function list.FillItems(cwd,old)
    local itemHeight = frs14.lineHeight + 4

    list.cwd = cwd
    local dirs, files = GetDirsFiles(list.cwd)

    table.sort(dirs)
    table.sort(files)

    for i = 1, #list.items do
	list.items[i]:SetVisible(false)
	list.items[i] = nil
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

    if old ~= nil then
	list.SetItemSelected(old)
    else
	list.SetItemSelected(1)
    end

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
    -- goto first
    if SWE.Key.LEFT == key and 1 < list.selIndex then
	list.SetItemSelected(1)
	list.topIndex = 1
	list:RenderWindow()
	return true
    -- goto last
    elseif SWE.Key.RIGHT == key and list.selIndex < #list.items then
	list.SetItemSelected(#list.items)
	list.topIndex = #list.items - list.maxItems + 1
	if list.topIndex < 1 then
	    list.topIndex = 1
	end
	list:RenderWindow()
	return true
    -- goto up
    elseif SWE.Key.UP == key and 1 < list.selIndex then
	list.SetItemSelected(list.selIndex - 1)
	if list.selIndex < list.topIndex then
	    list.topIndex = list.topIndex - 1
	end
	list:RenderWindow()
	return true
    -- goto down
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
	return true
    end
    return false
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
