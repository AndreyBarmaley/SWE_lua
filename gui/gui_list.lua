-- usage:
--
-- function ItemRenderWindow(item)
--     ...
--     return true
-- end
--
-- local list = ListCreate(20, 20, 200, 280, win)
--    public interface:
--    item = list:GetItemSelected()
--    list:SetItemSelected(val)
--    list:SetItemSelectedLast()
--    list:SetItemTop(val)
--    list:SetItemTopLast()
--    list:ItemsDisposition()
--    list:AssignItems(item1, item2, ...)
--    list:AppendItems(item1, item2, ...)
--
-- set hotkeys:
-- list.hotkeys { GotoFirst, GotoLast, GotoUp, GotoDown, Action, PageUp, PageDown }
--
-- function ListFillItems()
--     local item1 = ListCreateItem(list, 0, 0, 50, 10, ItemRenderWindow)
--     item1.label = uniq
--     ...
--     list:AssignItems(item1, item2, ...)
-- end
--
-- list.ItemSelectedAction = function(list, item)
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

local function ListSetItemSelected(list, val)
    if type(val) == "number" then
	if val < 1 then
	    list.selIndex = 1
	elseif val > #list.items then
	    list.selIndex = #list.items
        else
	    list.selIndex = val
	end
	if 0 < list.selIndex then
	    SWE.PushEvent(SWE.Action.ItemSelected, list.items[list.selIndex], list)
	else
	    SWE.PushEvent(SWE.Action.ItemSelected, nil, list)
	end
    elseif type(val) == "table" then
	for k,v in pairs(list.items) do
	    if v.label == val.label then
		-- send: item only selected
	        SWE.PushEvent(SWE.Action.ItemSelected, v, list)
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
    elseif type(val) == "string" then
	for k,v in pairs(list.items) do
	    if v.label == val then
		-- send: item only selected
	        SWE.PushEvent(SWE.Action.ItemSelected, v, list)
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

    item.IsSelected = function()
	return item.iscur
    end

    item.RenderWindow = function()
	return renderItemFunc(item)
    end

    item.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	if item:IsSelected() then
	    -- value item only
	    list:ItemSelectedAction(item)
	else
	    list:SetItemSelected(item)
	end
        return true
    end

    item.SystemUserEvent = function(a,b)
	-- list events
	if a == SWE.Action.ResetSelected then
	    item.iscur = false
	    return true
	elseif a == SWE.Action.ItemSelected then
	    item.iscur = true
	    -- send: list dirty
	    SWE.PushEvent(SWE.Action.ObjectDirty, nil, list)
	    return true
	end
	return false
    end

    return item
end

function ListCreate(x, y, w, h, parent)
    local list = SWE.Window(x, y, w, h, parent)

    list.items = {}
    list.selIndex = 0
    list.topIndex = 0
    list.maxItems = 0
    list.lastIndex = 0
    list.ItemSelectedAction = function(list, item) end
    list.hotkeys = {}
    -- list.hotkeys { GotoFirst, GotoLast, GotoUp, GotoDown, Action, PageUp, PageDown }

    list.GetItemSelected = function(list)
	if 0 < #list.items then
	    for i = 1, #list.items do
		if list.items[i]:IsSelected() then
		    return list.items[i]
		end
	    end
	end
	return nil
    end

    list.SetItemSelected = function(list, val)
	ListSetItemSelected(list, val)
    end

    list.SetItemSelectedLast = function(list)
	ListSetItemSelected(list, #list.items)
    end

    list.SetItemTop = function(list, val)
	list.topIndex = val
	if list.topIndex < 1 then
	    list.topIndex = 1
	end
	if list.topIndex > list.lastIndex then
	    list.topIndex = list.lastIndex
	end
    end

    list.SetItemTopLast = function(list)
	list.topIndex = list.lastIndex
    end

    list.AssignItems = function(list, ...)
	local itemHeight = 0

	for i = 1, #list.items do
	    list.items[i]:SetVisible(false)
	    list.items[i] = nil
	end

	list.items = { select(1, ...) }

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

	    list:SetItemSelected(1)
	end
    end

    list.AppendItems = function(list, ...)
	local itemHeight = 0
	local argc = select('#', ...)

	for i = 1, argc do
	    local item = select(i, ...)
	    table.insert(list.items, item)
	    itemHeight = item.height
	end

	if 0 < #list.items then
	    list.topIndex = 1
	    list.maxItems = math.min(ToInt(list.height / itemHeight), #list.items)
	    list.lastIndex = #list.items - list.maxItems + 1

	    if list.lastIndex < 1 then
		list.lastIndex = 1
	    end
	    list:SetItemSelected(1)
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
	    list:SetItemSelected(1)
	    list:SetItemTop(1)
	    SWE.DisplayDirty()
	    return true
	-- goto last
	elseif list.hotkeys.GotoLast ~= nil and list.hotkeys.GotoLast == key and list.selIndex < #list.items then
	    list:SetItemSelected(#list.items)
	    list:SetItemTop(#list.items - list.maxItems + 1)
	    SWE.DisplayDirty()
	    return true
	-- goto up
	elseif list.hotkeys.GotoUp ~= nil and list.hotkeys.GotoUp == key and 1 < list.selIndex then
	    list:SetItemSelected(list.selIndex - 1)
	    if list.selIndex < list.topIndex then
		list:SetItemTop(list.topIndex - 1)
	    end
	    SWE.DisplayDirty()
	    return true
	-- goto down
	elseif list.hotkeys.GotoDown ~= nil and list.hotkeys.GotoDown == key and list.selIndex < #list.items then
	    list:SetItemSelected(list.selIndex + 1)
	    if list.selIndex > list.topIndex + list.maxItems - 1 then
		list:SetItemTop(list.topIndex + 1)
	    end
	    SWE.DisplayDirty()
	    return true
	-- action
	elseif list.hotkeys.Action ~= nil and list.hotkeys.Action == key then
	    -- value item only
	    list:ItemSelectedAction(list.items[list.selIndex])
	    return true
	-- page up
	elseif list.hotkeys.PageUp ~= nil and list.hotkeys.PageUp == key and 1 < list.selIndex then
	    list:SetItemTop(list.topIndex - list.maxItems)
	    local index = list.selIndex - list.maxItems
	    if index < 1 then
		index = 1
	    end
	    list:SetItemSelected(index)
	    SWE.DisplayDirty()
	    return true
	-- page down
	elseif list.hotkeys.PageDown ~= nil and list.hotkeys.PageDown == key and list.selIndex < #list.items then
	    list:SetItemTop(list.topIndex + list.maxItems)
	    list:SetItemSelected(list.selIndex + list.maxItems)
	    SWE.DisplayDirty()
	    return true
	end
        return false
    end

    -- ScrollUpEvent
    list.ScrollUpEvent = function(x,y)
	if 1 < list.topIndex then
	    list:SetItemTop(list.topIndex - 1)
	    SWE.DisplayDirty()
	end
	return true
    end

    -- ScrollDownEvent
    list.ScrollDownEvent = function(x,y)
	if list.topIndex < list.lastIndex then
	    list:SetItemTop(list.topIndex + 1)
	    SWE.DisplayDirty()
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
	if a == SWE.Action.ItemSelected then
	    for i = 1, #list.items do
		SWE.PushEvent(SWE.Action.ResetSelected, nil, list.items[i])
	    end
	    if b ~= nil then
		SWE.PushEvent(SWE.Action.ItemSelected, nil, b)
	    end
	    return true
	-- list dirty
	elseif a == SWE.Action.ObjectDirty then
    	    SWE.DisplayDirty()
	    return true
	elseif a == SWE.Action.FontChanged then
	    list:FontChanged(b)
	    return true
	-- system signal
	elseif a == SWE.Signal.FingerMoveUp then
	    return list:ScrollDownEvent()
	elseif a == SWE.Signal.FingerMoveDown then
	    return list:ScrollUpEvent()
	end
	return false
    end

    return list
end
