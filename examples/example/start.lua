require 'SWE'

local fullscreen = false
local debug = true

local win = SWE.Init("Lua SWE", 640, 480, fullscreen, debug)

if not win then
    print("SWE init error")
    os.exit(-1)
else
    SWE.CursorHide()
end

-- virtual functions
-- ["WindowCreateEvent"] = (void)
-- ["MousePressEvent"] = (x,y,btn)
-- ["MouseReleaseEvent"] = (x,y,btn)
-- ["MouseMotionEvent"] = (x,y,btn)
-- ["MouseClickEvent"] = press(x,y,btn), release(x,y,btn)
-- ["MouseFocusEvent"] = (bool)
-- ["KeyPressEvent"] = (int)
-- ["KeyReleaseEvent"] = (int)
-- ["ScrollUpEvent"] = (x,y)
-- ["ScrollDownEvent"] = (x,y)
-- ["SystemUserEvent"] = (int, void*)
-- ["SystemTickEvent"] = (int ms)
-- ["SystemSignalEvent"] = (int ms)
--
-- functions
-- ["SetVisible"] = (true)
-- ["SetPosition"] = (x,y)


local win1 = SWE.Window(300, 70, 86, 46)
local win2 = SWE.Window(100, 100, 100, 50)
local win3 = SWE.Window(200, 100, 200, 110)
local poly = SWE.Polygon(350, 250, 370, 200, 370, 200, 390, 250, 
		    390, 250, 440, 270, 440, 270, 390, 290,
		    390, 290, 370, 340, 370, 340, 350, 290,
		    350, 290, 300, 270, 300, 270, 350, 250)

local txcur = SWE.Texture.Image("cursor16.png")


SWE.CursorLoad(txcur)

local frs = SWE.FontRender("terminus.ttf", 14, true)

-- WIN1
win1.but1 = SWE.Texture.Image("buttons.png", 172, 0, 86, 46, 0xffd2d2)
win1.but2 = SWE.Texture.Image("buttons.png", 258, 0, 86, 46, 0xffd2d2)
win1.click = SWE.BinaryBuf.ReadFromFile("click.ogg")
win1.pressed = false

function win1.MousePressEvent(x, y, btn)
    win1.pressed = true
    SWE.DisplayDirty()
    SWE.Audio.SoundPlayBuf(win1.click)
    return true
end

function win1.MouseReleaseEvent(x, y, btn)
    win1.pressed = false
    SWE.DisplayDirty()
    SWE.PushEvent(333, win1.userdata, win2)
    return true
end

function win1.MouseFocusEvent(f)
    print("focus: ", f)
end

function win1.RenderWindow()
    if win1.pressed then
	win1:RenderTexture(win1.but2, 0, 0, win1.but1.width, win1.but1.height, 0, 0, win1.but1.width, win1.but1.height)
    else
	win1:RenderTexture(win1.but1, 0, 0, win1.but1.width, win1.but1.height, 0, 0, win1.but1.width, win1.but1.height)
    end
    return true
end

-- WIN2
function win2.RenderWindow()
    win2:RenderClear(SWE.Color.MidnightBlue)
    win2:RenderText(frs, "Привет TEST", SWE.Color.White, win2.width / 2, win2.height / 2, SWE.Align.Center, SWE.Align.Center)
    return true
end

function win2.SystemUserEvent(a,b)
    print(a,b)
end

-- WIN
function win.RenderWindow()
    win:RenderClear(SWE.Color.Silver)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    win:RenderCyrcle(SWE.Color.Purple, 200, 200, 30)
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

function poly.MouseFocusEvent(f)
    print("poly focus: ", f)
end

function poly.MouseClickEvent(x,y,btn)
    SWE.RenderScreenshot("test.png")
    print("make screenshot")
end

-- check garbage
win3 = nil
collectgarbage()

SWE.Loop(win)
