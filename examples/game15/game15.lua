require 'SWE'

local fullscreen = false
local debug = false

local win = SWE.Init("Game15", 320, 240, fullscreen, debug)
-- SWE.Dump()

if not win then
    print("SWE init error")
    os.exit(-1)
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
--
-- functions
-- ["SetVisible"] = (true)
-- ["SetPosition"] = (x,y)

local orders = SWE.JsonParse(SWE.BinaryBuf.ReadFromFile("game15.json"):ToString())
local frs14 = SWE.FontRender("terminus.ttf", 14, true)
local frs28 = SWE.FontRender("terminus.ttf", 28, true)
local bits = {}
local shuffleMode = 0
local score = 0
local scoreAllow = false

local sndTada = SWE.BinaryBuf.ReadFromFile("tada.ogg")
local sndClick = SWE.BinaryBuf.ReadFromFile("click.ogg")

function CheckOpenBit(n)
    if n ~= nil then
	local open = true
	for num = 1, 15 do
	    local b = bits[num]
	    if b.order == n then
		open = false
		break
	    end
	end
	return open
    end
    return false
end

function CheckWins()
    for num = 1, 15 do
	local b = bits[num]
	if b.order ~= num then
	    return false
	end
    end

    return true
end

function BitsCanMove()
    local keys = {}
    for num = 1, 15 do
	local b = bits[num]
	local t = orders[b.order]
	if CheckOpenBit(t.left) then
	    table.insert(keys, num)
	elseif CheckOpenBit(t.right) then
	    table.insert(keys, num)
	elseif CheckOpenBit(t.up) then
	    table.insert(keys, num)
	elseif CheckOpenBit(t.down) then
	    table.insert(keys, num)
	end
    end
    return keys
end

function CreateBit(x, y, w, h, order)
    local bit = SWE.Window(x, y, w, h, win)
    bit.label = tostring(order)
    bit.order = order

    bit.MoveBit = function(self, n)
	if 0 < n and n < 17 then
	    local t = orders[n]
	    bit:SetPosition(t.posx, t.posy)
	    bit.order = n
	end
    end
    
    bit.RenderWindow = function()
	bit:RenderClear(SWE.Color.DarkGray)
	bit:RenderRect(SWE.Color.Black, 0, 0, bit.width, bit.height)
	bit:RenderText(frs28, bit.label, SWE.Color.Yellow, bit.width / 2, bit.height / 2, SWE.Align.Center, SWE.Align.Center)
	return true
    end

    bit.MouseClickEvent = function(x,y,btn)
	local t = orders[bit.order]

	if CheckOpenBit(t.left) then
	    bit:MoveBit(t.left)
	elseif CheckOpenBit(t.right) then
	    bit:MoveBit(t.right)
	elseif CheckOpenBit(t.up) then
	    bit:MoveBit(t.up)
	elseif CheckOpenBit(t.down) then
	    bit:MoveBit(t.down)
	end

	if CheckWins() and scoreAllow then
	    score = score + 1
	    scoreAllow = false
	    SWE.Audio.SoundPlayBuf(sndTada)
	else
	    SWE.Audio.SoundPlayBuf(sndClick)
	end
	return true
    end

    return bit
end

function BitsReset()
    for i = 1, 15 do
	bits[i]:MoveBit(i)
    end
end

local btnX = SWE.Window(275, 10, 36, 36, win)

btnX.RenderWindow = function()
    btnX:RenderClear(SWE.Color.DimGray)
    btnX:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    btnX:RenderText(frs28, "X", SWE.Color.Yellow, btnX.width / 2, btnX.height / 2, SWE.Align.Center, SWE.Align.Center)
    return true
end

btnX.MouseClickEvent = function(x,y,btn)
    win:SetVisible(false)
end

local btnS = SWE.Window(275, 56, 36, 36, win)

btnS.RenderWindow = function()
    btnS:RenderClear(SWE.Color.DimGray)
    btnS:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    btnS:RenderText(frs28, "S", SWE.Color.Yellow, btnS.width / 2, btnS.height / 2, SWE.Align.Center, SWE.Align.Center)
    return true
end

btnS.MouseClickEvent = function(x,y,btn)
    BitsReset()
    shuffleMode = 100
    scoreAllow = true
end

function tointeger(x)
    local integral, fractal = math.modf(x)
    return integral
end

-- WIN
function win.RenderWindow()
    local memusage = tointeger(SWE.SystemMemoryUsage() / 1024)
    local txMUK = SWE.Texture.Text(frs14, "mem: " .. tostring(memusage) .. "K", SWE.Color.Blue)

    win:RenderClear(SWE.Color.Silver)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)
    win:RenderText(frs28, tostring(score), SWE.Color.Red, 292, 115, SWE.Align.Center, SWE.Align.Center)

    win:RenderTexture(txMUK, 0, 0, txMUK.width, txMUK.height, win.width - txMUK.width - 10,
			    win.height - txMUK.height - 10, txMUK.width, txMUK.height)

    -- free texture
    txMUK = nil
    collectgarbage()
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

function win.SystemTickEvent(ms)
    if 0 < shuffleMode then
	local keys = BitsCanMove()
	local rnd = math.random(1, #keys)

	local target = keys[rnd]
	local bit = bits[target]
	local t = orders[bit.order]

	if CheckOpenBit(t.left) then
	    bit:MoveBit(t.left)
	elseif CheckOpenBit(t.right) then
	    bit:MoveBit(t.right)
	elseif CheckOpenBit(t.up) then
	    bit:MoveBit(t.up)
	elseif CheckOpenBit(t.down) then
	    bit:MoveBit(t.down)
	end

	shuffleMode = shuffleMode - 1
    end
end

-- fill bits
for i = 1, 15 do
    local t = orders[i]
    bits[i] = CreateBit(t.posx, t.posy, 55, 55, i)
end

SWE.Loop(win)
