-- require 'SWE'

local fullscreen = false
SWE.SetDebug(false)

local win = SWE.DisplayInit("Lua SWE", 640, 480, fullscreen)
local params = { format = "v4l2", device = "/dev/video0", debug = false, video_standard = "pal", video_size = "320x240" }
local frs = SWE.FontRender("terminus.ttf", 14, false)
local cam = SWE.VideoCam(params)

function win.RenderWindow()
    win:RenderClear(SWE.Color.MidnightBlue)
    return true
end

function win.KeyPressEvent(key)
    if SWE.Key.ESCAPE == key then
        win:SetVisible(false)
        return true
    end
    return false
end

function win.SystemTickEvent(tick)
    win.frame = cam:GetFrame()
    SWE.DisplayDirty()
    return true
end

function CreateSimpleColorWindow(color, str, posx, posy, parent)
    local win = SWE.Window(posx, posy, 240, 196, parent)

    win.colbg = color
    win.colbr = SWE.Color.Silver
    win.rtbar = SWE.Rect(1, 1, win.width - 2, 16)
    win.ptmov = nil
    win.stbar = false
    win.focus = false
    win.text  = SWE.Texture.Text(frs, str, SWE.Color.Black)
    win.parent = parent
    win:SetMouseTracking(true)

    win.RenderWindow = function()
	win:RenderClear(win.colbg)
	win:RenderRect(win.colbr, win.rtbar, true)
	win:RenderTexture(win.text, (win.width - win.text.width) / 2, 2)
	if win.focus and win.parent.frame ~= nil then
	    --win:RenderTexture(win.parent.frame, 10, 26)
	    local small = SWE.Texture(128, 96)
	    small:RenderTexture(win.parent.frame)
	    win:RenderTexture(small, 10, 26)
	    --win:RenderTexture(win.parent.frame, 10, 26, 128, 96)
	else
	    win:RenderRect(SWE.Color.Blue, 10, 26, 128, 96, true)
	end
	return true
    end

    win.MouseFocusEvent = function(focus)
	if focus then
	    win.colbr = SWE.Color.DimGray
	else
	    win.colbr = SWE.Color.Silver
	end
	win.focus = focus
	SWE.DisplayDirty()
    end

    win.MousePressEvent = function(x, y, btn)
	local pt = SWE.Point(x, y)
	if win.rtbar:PointInRect(pt) and btn == 1 then
	    win.ptmov = pt
	    win.stbar = true
	    return true
	end
	return false
    end

    win.MouseReleaseEvent = function(x, y, btn)
	if win.stbar then
	    win.stbar = false
	    return true
	end
	return true
    end

    win.MouseMotionEvent = function(x, y, btn)
	if btn == SWE.MouseButton.Left and win.stbar then
	    return true
	end
	return false
    end

    win.MouseTrackingEvent = function(x, y, btn)
	if btn == SWE.MouseButton.Left and win.stbar then
	    local posx = x - win.ptmov.posx
	    local posy = y - win.ptmov.posy
	    win:SetPosition(posx, posy)
	    return true
	end
	return false
    end

    return win
end

area1 = CreateSimpleColorWindow(SWE.Color.DarkSeaGreen, "Color Window1", 100, 100, win)
area2 = CreateSimpleColorWindow(SWE.Color.Plum, "Color Window2", 150, 150, win)

SWE.MainLoop(win)
