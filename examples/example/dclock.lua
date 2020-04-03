-- require 'SWE'

SWE.SetDebug(false)
local win = SWE.DisplayInit("Lua SWE Clock", 320, 240, false)

if not win then
    print("SWE init error")
    os.exit(-1)
end

win.frs54 = SWE.FontRender("terminus.ttf", 54, false)
win.frs24 = SWE.FontRender("terminus.ttf", 24, false)
win.last = 0
win.time = nil
win.date = nil

function win.SystemTickEvent(tick)
    if win.last == 0 or tick >= win.last + 1000 then
	win.time = SWE.Texture.Text(win.frs54, os.date("%H:%M:%S",os.time()), SWE.Color.Yellow)
	win.date = SWE.Texture.Text(win.frs24, os.date("%Y/%m/%d, %A",os.time()), SWE.Color.Yellow)
	win.last = tick
	win.half = 1
	SWE.DisplayDirty()
    elseif win.half == 1 and tick >= win.last + 500 then
	local str = os.date("%H %M %S",os.time())
	win.time = SWE.Texture.Text(win.frs54, str, SWE.Color.Yellow)
	win.half = 0
	SWE.DisplayDirty()
    end
end

function win.MouseClickEvent(px, py, pbtn, rx, ry, rbtn)
    win:SetVisible(false)
    return true
end

function win.RenderWindow()
    -- clear area
    win:RenderClear(SWE.Color.Black)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)

    if win.time then
	-- render time
	win:RenderTexture(win.time, 0, 0, win.time.width, win.time.height,
			(win.width - win.time.width) / 2, (win.height - win.time.height) / 2 )
	-- render date
	win:RenderTexture(win.date, 0, 0, win.date.width, win.date.height,
			(win.width - win.date.width) / 2, win.height - win.date.height - 10)
    end

    return true
end

SWE.MainLoop(win)
