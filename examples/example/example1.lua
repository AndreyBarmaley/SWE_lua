-- require 'SWE'

local fullscreen = false

SWE.SetDebug(true)

local win = SWE.DisplayInit("Lua SWE", 640, 480, fullscreen)
local area = SWE.Window(100, 100, 100, 50)
local frs = SWE.FontRender("terminus.ttf", 14, true)

function win.RenderWindow()
    win:RenderClear(SWE.Color.Silver)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    return true
end

function win.KeyPressEvent(key)
    if SWE.Key.F1 == key then
	return true
    elseif SWE.Key.ESCAPE == key then
        -- close scene, see SWE.MainLoop
        win:SetVisible(false)
        return true
    end
    return false
end

function area.MouseClickEvent(px, py, pbtn, rx, ry, rbtn)
    print("mouse click: ", px, py, pbtn, rx, ry, rbtn)
    return true
end

function area.MouseFocusEvent(f)
    print("focus: ", f)
end

function area.RenderWindow()
    area:RenderClear(SWE.Color.MidnightBlue)
    area:RenderRect(SWE.Color.Yellow, 0, 0, win.width, win.height)
    area:RenderText(frs, "Hello World!", SWE.Color.White, area.width / 2, area.height / 2, SWE.Align.Center, SWE.Align.Center)
    return true
end

SWE.MainLoop(win)
