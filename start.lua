-- require 'SWE'

SWE.SetDebug(true)
SWE.LuaRegisterDirectory("gui")
require 'gui_commander'

local width = 320
local height = 480

if SWE.SystemMobileOs() ~= nil then
    local modes = { SWE.DisplayVideoModes() }

    for i=1,#modes do
	SWE.Debug("videomodes:", modes[i].width, modes[i].height)
    end

    if 0 < #modes then
	local t = modes[#modes]
	if t.width > t.height then
	    height = t.width
	    width = t.height
	else
	    height = t.height
	    width = t.width
	end
    end
end

while true do
    if SWE.SystemMobileOs() ~= nil then
	local dw,dh = SWE.DisplaySize()
	SWE.Debug("display size:", dw, dh)
	if 0 < dw and 0 < dh then
	    width = dw
	    height = dh
	end
    end

    local win = SWE.DisplayInit("Lua SWE Commander", width, height, fullscreen)

    if not win then
        print("SWE init error")
        os.exit(-1)
    end

    local cmd = CommanderInit(win)
    cmd.Start()

    if cmd.exit then
	break
    elseif type(cmd.start) == "string" then
	dofile(cmd.start)
    end
end
