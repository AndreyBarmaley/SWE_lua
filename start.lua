-- require 'SWE'

SWE.LuaRegisterDirectory("gui")
require 'gui_tools'
require 'gui_dialog'
require 'gui_android'
require 'gui_filebrowser'

SWE.SetDebug(true)

local function ReadCommanderConfig()
    local sharedir = SWE.SystemShareDirectories()
    if sharedir ~= nil then
        local file = SWE.SystemConcatePath(sharedir, "commander.json")
        SWE.Debug("check config:", file)
	local buf = SWE.BinaryBuf.ReadFromFile(file)
        if buf then
            local cfg = SWE.JsonParse(buf:ToString())
            if cfg then
                return cfg.cwd, cfg.fsz
            end
        end
    end

    local cwd = SWE.SystemCurrentDirectory()
    -- calculate font size
    local dw,dh,df = SWE.DisplaySize()
    local fsz = ToInt(dw / 320 * 12)

    return cwd,fsz
end

local function ShowError(win, frs, err, start)
    local dirn, basen = SWE.SystemDirnameBasename(start)
    local pos1, pos2 = string.find(err, basen)

    print(res)

    if pos1 ~= nil then
	local pos3 = string.find(err, "%s", pos2)
        hdr = "error - " .. string.sub(err, pos1, pos3 - 2)
        local msg = string.sub(err, pos3 + 1)

        DialogInform(win, frs, hdr, msg)
    else
        DialogInform(win, frs, "error", err)
    end
end

local function DumpFingerEvents(event, obj)
    if event == SWE.Signal.GestureFingerUp then
	print("gesture finger up")
    elseif event == SWE.Signal.GestureFingerDown then
	print("gesture finger down")
    elseif event == SWE.Signal.GestureFingerLeft then
	print("gesture finger left")
    elseif event == SWE.Signal.GestureFingerRight then
	print("gesture finger right")
    elseif event == SWE.Signal.FingerMoveUp then
	print("finger move up")
    elseif event == SWE.Signal.FingerMoveDown then
	print("finger move down")
    elseif event == SWE.Signal.FingerMoveLeft then
	print("finger move left")
    elseif event == SWE.Signal.FingerMoveRight then
	print("finger move right")
    end
end

local function CommanderInit(win, frs, cwd)
    local cols = ToInt(win.width / frs.fixedWidth)
    local rows = ToInt(win.height / frs.lineHeight)

    local term = FileBrowserInit(win, frs, cwd,
		{ cols = cols, rows = rows, include = "%.lua$", exclude = { "start%.lua", "template%.lua" } })

    -- remove system buttons
    term.button1:SetVisible(false)
    term.button2:SetVisible(false)
    SWE.Scene.Remove(term.button1)
    SWE.Scene.Remove(term.button2)
    term.button1 = nil
    term.button2 = nil

    -- add new buttons
    term.bzo = TermLabelActionCreate("F-", frs, 1, term.rows - 1, term, SWE.Color.White)
    term.bzi = TermLabelActionCreate("F+", frs, term.cols - 5, term.rows - 1, term, SWE.Color.White)

    term.bzo.MouseClickEvent = function(px,py,pb,rx,ry,rb)
        local fsz = frs.size - 2
        if fsz > 10 then
	    SWE.PushEvent(SWE.Action.FontChanged, fsz, win)
	end
	return true
    end

    term.bzi.MouseClickEvent = function(px,py,pb,rx,ry,rb)
        local fsz = frs.size + 2
        SWE.PushEvent(SWE.Action.FontChanged, fsz, win)
	return true
    end

    term.LocalUserEvent = function(self, event, obj)
	if event == SWE.Signal.GestureFingerLeft then
	    if term.log then
		return false
	    end

	    term.log = CatLogInit(win, term.frs, {})
	    SWE.MainLoop(term.log)

	    SWE.Scene.Remove(term.log)
	    term.log = nil

	    return true
	end
        return false
    end

    return term
end

local win = {}
local frs = {}

while true do
    local cwd,fsz = ReadCommanderConfig()

    if SWE.SystemMobileOs() ~= nil then
        win = SWE.DisplayInit("Lua SWE: Commander", false)
    else
        win = SWE.DisplayInit("Lua SWE: Commander", 640, 480, false)
    end

    if not win then
        print("SWE init error")
        os.exit(-1)
    end

    if frs == nil or frs.font == nil or frs.size ~= fsz then
	frs = SWE.FontRender("terminus.ttf", fsz, false)
    end

    win.RenderWindow = function()
	win:RenderClear(SWE.Color.MidnightBlue)
	return true
    end

    win.SystemUserEvent = function(event, obj)
        if event == SWE.Action.FontChanged then
    	    frs = SWE.FontRender("terminus.ttf", tonumber(obj), false)
	    if win.cmd then
		win.cmd:SetVisible(false)
		-- font changed result
		win.cmd.result = 0x123456
		cwd = win.cmd.cwd
	    end
	    return true
	end
	return false
    end

    win.WindowCloseEvent = function()
	if win.cmd then
    	    local sharedir = SWE.SystemShareDirectories()
    	    if sharedir ~= nil then
        	SWE.SystemMakeDirectory(sharedir)
        	local config = SWE.SystemConcatePath(sharedir, "commander.json")
        	-- json format
        	local buf = SWE.BinaryBuf("{" .. "\"fsz\":" .. frs.size .. ",\"cwd\":" .. "\"" .. win.cmd.cwd .. "\"}")
        	buf:SaveToFile(config)
        	SWE.Debug("save config:", config)
    	    end
	end
    end

    win.TextureInvalidEvent = function()
	print("Invalid texture event!")
    end

    win.DisplayResizeEvent = function(w,h)
        win:SetSize(w, h)
        SWE.DisplayDirty()
    end


    ::RunCommander::
    SWE.Debug("run commander")

    win.cmd = CommanderInit(win, frs, cwd)
    -- fixed position
    if win.width ~= win.cmd.width or win.height ~= win.cmd.height then
	win.cmd:SetPosition((win.width-win.cmd.width)/2, (win.height-win.cmd.height)/2)
    end
    SWE.MainLoop(win.cmd)

    if not win.cmd.result then
	win:SetVisible(false)
        break
    elseif type(win.cmd.result) == "number" then
	-- font changed
	if win.cmd.result == 0x123456 then
	    goto RunCommander
	end
    elseif type(win.cmd.result) == "string" then
	local start = win.cmd.result
	local backrun = SWE.runfile

	win.cmd:SetVisible(false)
	SWE.Scene.Remove(win.cmd)
	win.cmd = nil

        SWE.Debug("dofile", start)
	-- fixed running directory: scan resource
	SWE.runfile = start

        -- run script
        local res, err = pcall(dofile, start)

        -- show error dialog
        if not res then
	    ShowError(win, frs, err, start)
        end

	SWE.runfile = backrun
	frs = nil
    end
end
