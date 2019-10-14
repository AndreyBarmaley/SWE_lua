-- require 'SWE'

SWE.SetDebug(false)
SWE.LuaRegisterDirectory("gui")
require 'gui_commander'
require 'gui_dialog'

local frs = {}

local function ReadCommanderConfig()
    local sharedir = SWE.SystemShareDirectories()
    if sharedir ~= nil then
        local buf = SWE.BinaryBuf()
        local file = SWE.SystemConcatePath(sharedir, "commander.json")
        SWE.Debug("check config:", file)
        if buf:ReadFromFile(file) then
            local config = SWE.JsonParse(buf:ToString())
            if config ~= nil then
                return config.cwd, config.fsz
            end
        end
    end

    local cwd = SWE.SystemCurrentDirectory()
    -- calculate font size
    local dw,dh,df = SWE.DisplaySize()
    local fsz = ToInt(dw / 320 * 12)

    return cwd,fsz
end

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

    local cwd,fsz = ReadCommanderConfig()

    if frs.font == nil or frs.size ~= fsz then
        frs = SWE.FontRender("terminus.ttf", fsz, false)
    end

    local cmd = CommanderInit(win, frs, cwd)
    cmd.Start()

    if cmd.exit then
	break
    elseif type(cmd.start) == "string" then
	SWE.Debug("dofile", cmd.start)
	cmd:clear()
	-- run script
	local res, err = pcall(dofile, cmd.start)
	-- show error dialog
	if not res then
	    local dirname, basename = SWE.SystemDirnameBasename(cmd.start)
	    local pos1, pos2 = string.find(err, basename)
	    local pos3 = string.find(err,"%s", pos2)
	    local hdr = "error - " .. string.sub(err, pos1, pos3 - 2)
	    local msg = string.sub(err, pos3 + 1)
	    DialogInform(win, frs, hdr, msg)
	end
    end
end
