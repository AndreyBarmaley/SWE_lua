-- require 'SWE'

SWE.SetDebug(true)
SWE.LuaRegisterDirectory("gui")
require 'gui_commander'

while true do
    local win = {}

    if SWE.SystemMobileOs() ~= nil then
	win = SWE.DisplayInit("Lua SWE Commander", false)
    else
	win = SWE.DisplayInit("Lua SWE Commander", 320, 480)
    end

    if not win then
        print("SWE init error")
        os.exit(-1)
    end

    local cmd = CommanderInit(win)
    cmd.Start()

    if cmd.exit then
	break
    elseif type(cmd.start) == "string" then
	SWE.Debug("dofile", cmd.start)
	dofile(cmd.start)
    end
end
