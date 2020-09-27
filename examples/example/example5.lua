-- require 'SWE'
SWE.SetDebug(true)

local frs = SWE.FontRender("terminus.ttf", 14, SWE.Font.RenderSolid)
local cols = 40
local rows = 30

local term = SWE.TerminalInit("LuaFileBrowser", frs, cols, rows)
if not term then
    print("SWE init error")
    os.exit(-1)
end

function ToInt(x)
    local integral, fractal = math.modf(x)
    return integral
end

function ShrinkLongName(name, smax)
    local len = string.len(name)
    if len > smax then
        local rem = len - (smax + 1)
        local left = ToInt((len - rem) / 2)
        local right = smax - (left + 1)
        return string.sub(name, 1, left) .. "~" .. string.sub(name, len - right)
    end
    return name
end

function PrettySize(sz)

    local szlen = string.len(tostring(sz))
    if szlen > 11 then
        return tostring(ToInt(sz / 1073741824)) .. "G"
    elseif szlen > 8 then
        return tostring(ToInt(sz / 1048576)) .. "M"
    elseif szlen > 5 then
        return tostring(ToInt(sz / 1024)) .. "K"
    end
    return tostring(sz)
end

function GetDirsFiles(cwd)
    local names = SWE.SystemReadDirectory(cwd)
    local dirs = {}
    local files = {}
    local dotIndex = nil

    for k,v in pairs(names) do
        if v == "file" then
            if not string.find(k, "start%.lua") and
                string.find(k, "%.lua$") then
                table.insert(files, k)
            end
        elseif v == "directory" then
            table.insert(dirs, k)
            if string.find(k, "%.%.") then
                dotIndex = #dirs
            end
        end
    end

    if not dotIndex then
        table.insert(dirs, 1, SWE.SystemConcatePath(cwd, ".."))
    end

    return dirs, files
end

function term.SetCurrentDirectory(self, cwd)
    term.cwd = cwd
    local dirs, files = GetDirsFiles(cwd)

    table.sort(dirs)
    table.sort(files)

    term.dirs = dirs
    term.files = files
    term.skipline = 0
    term.selected = 1
end

function term.EndLine(self,num)
    return term:CursorMoveDown(num or 1):CursorMoveFirst()
end

function term.DrawDirectoryLine(self, path, selected)
    if selected then
        term:SetColors(SWE.Color.Navy, SWE.Color.Yellow)
    else
        term:SetColors(SWE.Color.White, SWE.Color.Navy)
    end

    local dirname, basename = SWE.SystemDirnameBasename(path)
    local stat = SWE.SystemFileStat(path)
    local label = "<DIR>"
    local name = "/" .. ShrinkLongName(basename, term.cols - (string.len(label) + 2))

    term:DrawText(name)

    if selected then
        term:DrawHLine(cols - string.len(name), 0x20)
    end

    term:CursorMoveLast():CursorMoveLeft(string.len(label)):DrawText(label)

    if selected then
        local curx, cury = term:CursorPosition()
        term:DrawSelectedStat(basename, stat)
        term:CursorPosition(curx, cury)
    end

    return term
end

function term.DrawFileLine(self, path, selected)
    if selected then
        term:SetColors(SWE.Color.Navy,SWE.Color.Yellow)
    else
        term:SetColors(SWE.Color.Silver,SWE.Color.Navy)
    end

    local dirname, basename = SWE.SystemDirnameBasename(path)
    local stat = SWE.SystemFileStat(path)
    local label = PrettySize(stat.size)
    local name = ShrinkLongName(basename, term.cols - (string.len(label) + 4))

    term:DrawText(name)

    if selected then
        term:DrawHLine(cols - string.len(name), 0x20)
    end

    term:CursorMoveLast():CursorMoveLeft(string.len(label)):DrawText(label)

    if selected then
        local curx, cury = term:CursorPosition()
        term:DrawSelectedStat(basename, stat)
        term:CursorPosition(curx, cury)
    end

    return term
end

function term.DrawSelectedStat(self, name, stat)
    if stat.isdir then
        term:SetColors(SWE.Color.White, SWE.Color.Navy)
    else
        term:SetColors(SWE.Color.Silver,SWE.Color.Navy)
    end
    term:CursorPosition(1, term.rows - 2):DrawText(ShrinkLongName(name, term.cols - (string.len(stat.access) + 5)))
    term:CursorMoveLast():CursorMoveLeft(string.len(stat.access) + 1):DrawText(stat.access)
end

function term.RenderWindow()
    term:CursorPosition(0, 0):FillColors(SWE.Color.Silver, SWE.Color.Navy, term.cols, term.rows)
    term:CursorPosition(0, 0):FillProperty(frs.blended, frs.style, frs.hinting, term.cols, term.rows)
    term:CursorPosition(0, 0):FillCharset(0x20, term.cols, term.rows)

    term:CursorPosition(0, 1)
    local rows = term.rows - 4

    for i = 1, #term.dirs do
        local index = i
        if term.skipline < index and index <= term.skipline + rows then
            term:CursorMoveRight():DrawDirectoryLine(term.dirs[i], term.selected == index):EndLine()
        end
    end

    for i = 1, #term.files do
        local index = i + #term.dirs
        if term.skipline < index and index <= term.skipline + rows then
            term:CursorMoveRight()
            term:DrawFileLine(term.files[i], term.selected == index)
            term:EndLine()
        end
    end

    local line = SWE.Line.Thin
    term:CursorPosition(0, 0):SetColors(SWE.Color.White, SWE.Color.Navy):DrawRect(term.cols, term.rows, line)
    term:CursorPosition(0, term.rows - 3):DrawChar(SWE.Char.LTee(line)):DrawHLine(term.cols - 2, SWE.Char.HLine(line)):DrawChar(SWE.Char.RTee(line))
    term:SetFlush()

    return true
end

function term.KeyPressEvent(key)
    if SWE.Key.RETURN == key then
        if term.selected == 1 then
            local dirname, basename = SWE.SystemDirnameBasename(term.dirs[term.selected])
            local dirname2, basename2 = SWE.SystemDirnameBasename(dirname)
            term:SetCurrentDirectory(dirname2)
        elseif term.selected <= #term.dirs then
            term:SetCurrentDirectory(term.dirs[term.selected])
        end
        SWE.DisplayDirty()
    elseif SWE.Key.UP == key and 1 < term.selected then
        term.selected = term.selected - 1
        if term.selected == term.skipline then
            term.skipline = term.skipline - 1
        end
        SWE.DisplayDirty()
    elseif SWE.Key.LEFT == key and 1 < term.selected then
        term.selected = 1
        term.skipline = 0
        SWE.DisplayDirty()
    elseif SWE.Key.DOWN == key and term.selected < #term.dirs + #term.files then
        term.selected = term.selected + 1
        if term.selected > term.skipline + (term.rows - 4) then
            term.skipline = term.skipline + 1
        end
        SWE.DisplayDirty()
    elseif SWE.Key.RIGHT == key and term.selected < #term.dirs + #term.files then
        term.selected = #term.dirs + #term.files
        term.skipline = math.max(0, #term.dirs + #term.files - (term.rows - 4))
        SWE.DisplayDirty()
    elseif SWE.Key.ESCAPE == key then
        -- close scene, see SWE.MainLoop
        term:SetVisible(false)
        return true
    end
    return false
end

term:SetCurrentDirectory(SWE.SystemCurrentDirectory())

SWE.MainLoop(term)
