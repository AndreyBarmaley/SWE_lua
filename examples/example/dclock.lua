-- require 'SWE'

SWE.SetDebug(true)
local win = SWE.DisplayInit("Lua SWE Clock", 320, 240, false)

if not win then
    print("SWE init error")
    os.exit(-1)
end

win.frs54 = SWE.FontRender("terminus.ttf", 54, false)
win.frs24 = SWE.FontRender("terminus.ttf", 24, false)
win.last = 0
win.date = SWE.Texture.Text(win.frs24, os.date("%Y/%m/%d, %A", os.time()), SWE.Color.Yellow)
win.time = SWE.Texture.Text(win.frs54, os.date("%H:%M:%S",os.time()), SWE.Color.Yellow)

function win.SystemTickEvent(tick)
    if win.last == 0 or tick >= win.last + 1000 then
	local time = os.date("%H:%M:%S",os.time())
	win.time = SWE.Texture.Text(win.frs54, time, SWE.Color.Yellow)
	if time == "00:00:00" then
	    win.date = SWE.Texture.Text(win.frs24, os.date("%Y/%m/%d, %A",os.time()), SWE.Color.Yellow)
	end
	win.last = tick
	win.half = 1
	SWE.DisplayDirty()
    elseif win.half == 1 and tick >= win.last + 500 then
	local str = os.date("%H %M %S",os.time())
	win.time = SWE.Texture.Text(win.frs54, str, SWE.Color.Yellow)
	win.half = 0
	SWE.DisplayDirty()
    end
    collectgarbage()
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
	win:RenderTexture(win.time, (win.width - win.time.width) / 2, (win.height - win.time.height) / 2 )
	-- render date
	win:RenderTexture(win.date, (win.width - win.date.width) / 2, win.height - win.date.height - 10)
    end

    return true
end

SWE.MainLoop(win)
