-- require 'SWE'

local fullscreen = false

SWE.SetDebug(true)

local win = SWE.DisplayInit("Lua SWE", 640, 480, fullscreen)

SWE.CursorHide()
local txcur = SWE.Texture.Image("cursor16.png")
SWE.CursorLoad(txcur)

local area = SWE.Window(100, 100, 100, 50)
area.bgcolor = SWE.Color.MidnightBlue
area:SetToolTip("Area color: " .. SWE.Color.ToString(area.bgcolor))

local butn = SWE.Window(300, 70, 86, 46)
butn.tx1 = SWE.Texture.Image("buttons.png", 172, 0, 86, 46, 0xffd2d2)
butn.tx2 = SWE.Texture.Image("buttons.png", 258, 0, 86, 46, 0xffd2d2)
butn.pressed = false

function butn.MousePressEvent(x, y, btn)
    butn.pressed = true
    SWE.DisplayDirty()
    SWE.Audio.SoundPlay("click.ogg")
    return true
end

function butn.MouseReleaseEvent(x, y, btn)
    butn.pressed = false
    SWE.DisplayDirty()
    SWE.PushEvent(3333, nil, area)
    return true
end

function butn.RenderWindow()
    if butn.pressed then
	butn:RenderTexture(butn.tx2, 0, 0)
    else
	butn:RenderTexture(butn.tx1, 0, 0)
    end
    return true
end

function area.RenderWindow()
    area:RenderClear(area.bgcolor)
    area:RenderRect(SWE.Color.Yellow, 0, 0, area.width, area.height)
    return true
end

function area.SystemUserEvent(a,b)
    if a == 3333 then
	if area.bgcolor == SWE.Color.MidnightBlue then
	    area.bgcolor = SWE.Color.DarkGreen
	else
	    area.bgcolor = SWE.Color.MidnightBlue
	end
	area:SetToolTip("Area color: " .. SWE.Color.ToString(area.bgcolor))
	SWE.DisplayDirty()
	return true
    end
    return false
end

function win.RenderWindow()
    win:RenderClear(SWE.Color.Silver)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    return true
end

function win.KeyPressEvent(key)
    if SWE.Key.ESCAPE == key then
	-- close scene, see SWE.Loop
	win:SetVisible(false)
	return true
    end
    return false
end

SWE.MainLoop(win)
