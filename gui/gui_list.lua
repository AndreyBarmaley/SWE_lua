-- usage:
--
-- function ItemRenderWindow(item)
--     ...
--     return true
-- end
--
-- local list = ListCreate(20, 20, 200, 280, win)
--
-- set hotkeys:
-- list.hotkeys { GotoFirst, GotoLast, GotoUp, GotoDown, Action, PageUp, PageDown }
--
-- function ListFillItems()
--     local item1 = ListCreateItem(list, 0, 0, 50, 10, ItemRenderWindow)
--     ...
--     list.InsertItems(item1, item2, ...)
-- end
--
-- list.ItemSelectedAction = function(item)
--     ...
-- end
--
-- list.RenderWindow = function()
--     ...
--     list:ItemsDisposition()
--     return true
-- end
--
-- ListFillItems(list)
--

require 'gui_tools'
require 'gui_action'

function ListSetItemSelected(list, val)
    if type(val) == "number" then
        if 1 < val and val < #list.items then
	    list.selIndex = val
	elseif val <= 1 then
	    list.selIndex = 1
	elseif val >= #list.items then
	    list.selIndex = #list.items
	end
	SWE.PushEvent(SWE.Action.ListItemSelected, list.items[list.selIndex], list)
    elseif type(val) == "table" then
	for k,v in pairs(list.items) do
	    if v.label == val.label then
		-- send: item only selected
	        SWE.PushEvent(SWE.Action.ListItemSelected, v, list)
		list.selIndex = k
		break
	    end
	end
	-- out of visible
	if list.selIndex < list.topIndex or
	    list.selIndex > list.topIndex + list.maxItems - 1then
	    list.topIndex = 1
	    -- find top index
	    while list.selIndex > list.topIndex + list.maxItems - 1 do
		list.topIndex = list.topIndex + list.maxItems
	    end
	    if list.topIndex > #list.items - list.maxItems then
		list.topIndex = #list.items - list.maxItems + 1
	    end
	end
    elseif type(val) == "string" then
	for k,v in pairs(list.items) do
	    if v.label == val then
		-- send: item only selected
	        SWE.PushEvent(SWE.Action.ListItemSelected, v, list)
		list.selIndex = k
		break
	    end
	end
	-- out of visible
	if list.selIndex < list.topIndex or
	    list.selIndex > list.topIndex + list.maxItems - 1 then
	    list.topIndex = 1
	    -- find top index
	    while list.selIndex > list.topIndex + list.maxItems - 1 do
		list.topIndex = list.topIndex + list.maxItems
	    end
	    if list.topIndex > #list.items - list.maxItems then
		list.topIndex = #list.items - list.maxItems + 1
	    end
	end
    end
end

function ListCreateItem(list, x, y, w, h, renderItemFunc)
    local item = SWE.Window(x, y, w, h, list)
    item.iscur = false

    item.RenderWindow = function()
	return renderItemFunc(item)
    end

    item.MouseClickEvent = function(x,y,btn)
	if item.iscur then
	    list.ItemSelectedAction(item)
	else
	    ListSetItemSelected(list, item)
	end
        return true
    end

    item.SystemUserEvent = function(a,b)
	-- list events
	if a == SWE.Action.ListClearSelected then
	    item.iscur = false
	    return true
	elseif a == SWE.Action.ListItemSelected then
	    item.iscur = true
	    -- send: list dirty
	    SWE.PushEvent(SWE.Action.ListDirty, nil, list)
	    return true
	end
	return false
    end

    item.IsCurrent = function()
	return item.iscur
    end

    return item
end

function ListCreate(x, y, w, h, parent)
    local list = SWE.Window(x, y, w, h, parent)

    list.items = {}
    list.setIndex = 0
    list.topIndex = 0
    list.maxItems = 0
    list.lastIndex = 0
    list.ItemSelectedAction = function(item) end
    list.hotkeys = {}
    -- list.hotkeys { GotoFirst, GotoLast, GotoUp, GotoDown, Action, PageUp, PageDown }

    list.InsertItems = function(...)
	local itemHeight = 0

	for i = 1, #list.items do
	    list.items[i]:SetVisible(false)
	    list.items[i] = nil
	end

	list.items = { select(1, ...) }

	collectgarbage()

	if 0 < #list.items then
	    for i = 1, #list.items do
		list.items[i]:SetVisible(false)
		itemHeight = list.items[i].height
	    end

	    list.topIndex = 1
	    list.maxItems = math.min(ToInt(list.height / itemHeight), #list.items)
	    list.lastIndex = #list.items - list.maxItems + 1

	    if list.lastIndex < 1 then
		list.lastIndex = 1
	    end

	    ListSetItemSelected(list, 1)
	end
    end

    list.ItemsDisposition = function(list, offy)
	local itemPosY = 0

	if offy ~= nil then
	    itemPosY = offy
	end

	for i = 1, #list.items do
	    list.items[i]:SetVisible(false)
	end

	for i = list.topIndex, list.topIndex + list.maxItems - 1 do
	    local offx = ToInt((list.width - list.items[i].width) / 2)
	    list.items[i]:SetPosition(offx, itemPosY)
	    list.items[i]:SetVisible(true)
	    itemPosY = itemPosY + list.items[i].height
	end
    end

    -- KeyPressEvent
    list.KeyPressEvent = function(key)
	-- goto first
	if list.hotkeys.GotoFirst ~= nil and list.hotkeys.GotoFirst == key and 1 < list.selIndex then
	    ListSetItemSelected(list, 1)
	    list.topIndex = 1
	    list:RenderWindow()
	    return true
	-- goto last
	elseif list.hotkeys.GotoLast ~= nil and list.hotkeys.GotoLast == key and list.selIndex < #list.items then
	    ListSetItemSelected(list, #list.items)
	    list.topIndex = #list.items - list.maxItems + 1
	    if list.topIndex < 1 then
		list.topIndex = 1
	    end
	    list:RenderWindow()
	    return true
	-- goto up
	elseif list.hotkeys.GotoUp ~= nil and list.hotkeys.GotoUp == key and 1 < list.selIndex then
	    ListSetItemSelected(list, list.selIndex - 1)
	    if list.selIndex < list.topIndex then
		list.topIndex = list.topIndex - 1
	    end
	    list:RenderWindow()
	    return true
	-- goto down
	elseif list.hotkeys.GotoDown ~= nil and list.hotkeys.GotoDown == key and list.selIndex < #list.items then
	    ListSetItemSelected(list, list.selIndex + 1)
	    if list.selIndex > list.topIndex + list.maxItems - 1 then
		list.topIndex = list.topIndex + 1
	    end
	    list:RenderWindow()
	    return true
	-- action
	elseif list.hotkeys.Action ~= nil and list.hotkeys.Action == key then
	    list.ItemSelectedAction(list.items[list.selIndex])
	    return true
	-- page up
	elseif list.hotkeys.PageUp ~= nil and list.hotkeys.PageUp == key and 1 < list.selIndex then
	    list.topIndex = list.topIndex - list.maxItems
	    if list.topIndex < 1 then
		list.topIndex = 1
	    end
	    ListSetItemSelected(list, list.selIndex - list.maxItems)
	    list:RenderWindow()
	    return true
	-- page down
	elseif list.hotkeys.PageDown ~= nil and list.hotkeys.PageDown == key and list.selIndex < #list.items then
	    list.topIndex = list.topIndex + list.maxItems
	    if list.topIndex > list.lastIndex then
		list.topIndex = list.lastIndex
	    end
	    ListSetItemSelected(list, list.selIndex + list.maxItems)
	    list:RenderWindow()
	    return true
	end
        return false
    end

    -- ScrollUpEvent
    list.ScrollUpEvent = function(x,y)
	if 1 < list.topIndex then
	    list.topIndex = list.topIndex - 1
	    list:RenderWindow()
	end
	return true
    end

    -- ScrollDownEvent
    list.ScrollDownEvent = function(x,y)
	if list.topIndex < list.lastIndex then
	    list.topIndex = list.topIndex + 1
	    list:RenderWindow()
	end
	return true
    end

    -- FontChanged
    list.FontChanged = function(frs)
	-- empty template
    end

    -- SystemUserEvent
    list.SystemUserEvent = function(a,b)
	-- list items
	if a == SWE.Action.ListItemSelected then
	    for i = 1, #list.items do
		SWE.PushEvent(SWE.Action.ListClearSelected, nil, list.items[i])
	    end
	    SWE.PushEvent(SWE.Action.ListItemSelected, nil, b)
	    return true
	-- list dirty
	elseif a == SWE.Action.ListDirty then
    	    list:RenderWindow()
	    return true
	elseif a == SWE.Action.FontChanged then
	    list:FontChanged(b)
	end
	return false
    end

    return list
end
