-- require 'SWE'

SWE.LuaRegisterDirectory("gui")
require 'gui_commander'

while true do
    local cmd = CommanderInit()
    cmd.Start()

    if cmd.exit then
	break
    elseif type(cmd.start) == "string" then
	dofile(cmd.start)
    end
end
