require 'gui_tools'

local function MaxStringsLen(t)
    local res = 0
    for i=1,#t do
	res = math.max(res, string.len(t[i]))
    end
    return res
end

function CatLogInit(win, frs, params)
    local cols = ToInt(win.width / frs.fixedWidth)
    local rows = ToInt(win.height / frs.lineHeight)

    local term = SWE.Terminal(frs, cols, rows, win)
    term:SetModality(true)

    if win.width ~= term.width or win.height ~= term.height then
        term:SetPosition((win.width-term.width)/2, (win.height-term.height)/2)
    end

    local page = term.rows - 2
    term.frs = frs
    term.items = {}

    if SWE.SystemMobileOs() == "android" then
	local t = SWE.SystemRunCommand("logcat", "-d", "-s SWE_lua")
	-- shrink logcat string
	--
	-- 04-16 20:06:09.303 30062 30098 I SWE_lua : 20:06:09: [PRINT]	SWE.Signal.FingerMoveLeft
	--
	for i=1,#t do
	    local first, last = string.find(t[i], "%d+:%d+:%d+:%s")
	    if first then
		table.insert(term.items, string.sub(t[i], first))
	    end
	end
    else
	term.items = SWE.SystemRunCommand("getent", "passwd")
    end

    term.skipcols = 0
    term.skipitems = 0

    if #term.items > page then
	term.skipitems = #term.items - page
    end

    term.RenderWindow = function()
	local header = "CatLog"
        term:CursorPosition(0, 0):FillColors(SWE.Color.Silver, SWE.Color.MidnightBlue, term.cols, term.rows)
        term:CursorPosition(0, 0):FillProperty(frs.blended, frs.style, frs.hinting, term.cols, term.rows)
        term:CursorPosition(0, 0):FillCharset(0, term.cols, term.rows)
	term:CursorPosition(0, 0):DrawRect(term.cols, term.rows, SWE.Line.Thin)
	term:CursorPosition((term.cols - string.len(header)) / 2 - 1, 0):DrawChar(SWE.Char.RTee(SWE.Line.Thin)):DrawText(header):DrawChar(SWE.Char.LTee(SWE.Line.Thin))
	term:SetPadding(1,1,1,1)
        term:CursorPosition(0, 0)

        for i=1, #term.items do
            if i - term.skipitems > page - 1 then
                break
            end

            if i > term.skipitems then
		if term.skipcols == 0 then
		    term:DrawText(term.items[i])
		elseif term.skipcols < string.len(term.items[i]) then
		    term:DrawText(string.sub(term.items[i], term.skipcols))
                end
		term:CursorMoveDown(1):CursorMoveFirst()
            end
        end

        -- sync changes
	term:ResetPadding()
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

    term.KeyPressEvent = function(key,mod,scancode)
        if key == SWE.Key.ESCAPE then
            term:SetVisible(false)
            return true
        -- android back
        elseif key == 0x4000010e then
            term:SetVisible(false)
            return true
	end

	return false
    end

    term.SystemUserEvent = function(event,obj)
        if event == SWE.Signal.FingerMoveUp then
	    local page = term.rows - 2
	    if term.skipitems < #term.items - page then
		term.skipitems = term.skipitems + 1
		SWE.DisplayDirty()
	    end
	    return true
        elseif event == SWE.Signal.FingerMoveDown then
	    if 0 < term.skipitems then
		term.skipitems = term.skipitems - 1
		SWE.DisplayDirty()
	    end
	    return true
        elseif event == SWE.Signal.FingerMoveLeft then
	    if term.skipcols + term.cols - 2 < MaxStringsLen(term.items) then
		term.skipcols = term.skipcols + 1
		SWE.DisplayDirty()
	    end
	    return true
        elseif event == SWE.Signal.FingerMoveRight then
	    if 0 < term.skipcols then
		term.skipcols = term.skipcols - 1
		SWE.DisplayDirty()
	    end
	    return true
        end

--        if event == SWE.Signal.GestureFingerRight then
--            term:SetVisible(false)
--            return true
--        end

	return false
    end

    return term
end
