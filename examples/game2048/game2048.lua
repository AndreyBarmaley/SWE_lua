-- require 'SWE'

local fullscreen = false

SWE.SetDebug(true)
local win = SWE.DisplayInit("Game2048", 320, 240, fullscreen)

if not win then
    print("SWE init error")
    os.exit(-1)
end

math.randomseed(os.time())

local bitRect = 55
local orders = SWE.JsonParse(SWE.BinaryBuf.ReadFromFile("game2048.json"):ToString())
local frs14 = SWE.FontRender("terminus.ttf", 14, true)
local frs28 = SWE.FontRender("terminus.ttf", 22, true)
local colors = {}
local animationMove = {}
local animationStack = {}
local directoMove = 0
local keyHandle = true
local number4Hit = SWE.RandomHit(10)

local sndTada = SWE.BinaryBuf.ReadFromFile("tada.ogg")
local sndClick = SWE.BinaryBuf.ReadFromFile("click.ogg")

colors[2] = SWE.Color.PeachPuff
colors[4] = SWE.Color.Pink
colors[8] = SWE.Color.SandyBrown
colors[16] = SWE.Color.HotPink
colors[32] = SWE.Color.DeepPink
colors[64] = SWE.Color.Crimson
colors[128] = SWE.Color.IndianRed
colors[256] = SWE.Color.Tomato
colors[512] = SWE.Color.Fuchsia
colors[1024] = SWE.Color.MediumOrchid
colors[2048] = SWE.Color.Purple

function CreateNumber(pos, val)

    if pos == 0 then
	error("end game")
    end

    local t = orders[pos]

    if t.item ~= nil then
	error("room closed", pos)
    end

    local bit = SWE.Window(t.posx, t.posy, bitRect, bitRect, win)

    bit.value = val
    bit.order = pos

    bit.MoveBit = function(self, n)
	if 0 < n and n < 17 then
	    local t = orders[n]
	    bit:SetPosition(t.posx, t.posy)
	    bit.order = n
	end
    end
    
    bit.RenderWindow = function()
	bit:RenderClear(colors[bit.value])
	bit:RenderRect(SWE.Color.MediumSlateBlue, 0, 0, bit.width, bit.height)
	bit:RenderText(frs28, tostring(bit.value), SWE.Color.Navy, bit.width / 2, bit.height / 2, SWE.Align.Center, SWE.Align.Center)
	return true
    end

    bit.MouseClickEvent = function(x,y,btn)
	return true
    end

    t.item = bit
end

function FillAnimations(animations)
    -- check if need move item: insert to animationMove
    for i = 1, 16 do
	if orders[i].item ~= nil and orders[i].item.move ~= nil then
	    table.insert(animations, orders[i].item)
	    orders[i].item = nil
	end
    end
end

local btnX = SWE.Window(275, 10, 36, 36, win)

btnX.RenderWindow = function()
    btnX:RenderClear(SWE.Color.DimGray)
    btnX:RenderRect(SWE.Color.Red, 0, 0, btnX.width, btnX.height)
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
    ResetGame()
end

-- WIN
function win.DisplayResizeEvent(w,h)
end

function win.RenderWindow()
    win:RenderClear(SWE.Color.Silver)
    win:RenderRect(SWE.Color.Red, 0, 0, win.width, win.height)

    -- fill area
    for i = 1, 16 do
	local t = orders[i]
	win:RenderRect(SWE.Color.LightYellow, t.posx, t.posy, bitRect, bitRect, true)
	win:RenderRect(SWE.Color.Khaki, t.posx, t.posy, bitRect, bitRect, false)
    end

    win:RenderRect(SWE.Color.Navy, orders[1].posx - 1, orders[1].posy - 2, 2 + bitRect * 4, 2 + bitRect * 4, false)
    return true
end

function win.SystemUserEvent(a,b)
    if a == SWE.Signal.GestureFingerUp then
	return win.KeyPressEvent(SWE.Key.UP)
    elseif a == SWE.Signal.GestureFingerDown then
	return win.KeyPressEvent(SWE.Key.DOWN)
    elseif a == SWE.Signal.GestureFingerLeft then
	return win.KeyPressEvent(SWE.Key.LEFT)
    elseif a == SWE.Signal.GestureFingerRight then
	return win.KeyPressEvent(SWE.Key.RIGHT)
    end
    return false
end

function win.KeyPressEvent(key)
    if key == SWE.Key.ESCAPE then
	-- close scene, see SWE.Loop
	win:SetVisible(false)
	return true
    end

    if not keyHandle then
	return false
    end

    if key == SWE.Key.LEFT then
	directMove = 1
    elseif key == SWE.Key.RIGHT then
	directMove = 2
    elseif key == SWE.Key.UP then
	directMove = 3
    elseif key == SWE.Key.DOWN then
	directMove = 4
    end

    keyHandle = false

    if 0 < directMove then
	local move = MoveToDirect(directMove)

	if move then
	    FillAnimations(animationMove)
	else
	    if StackToDirect(directMove) then
		CreateNumber( GetFreePosVal() )
	    end
	end

	return true
    end

    return false
end

function win.SystemTickEvent(ms)
    -- check if animationMove
    if 0 < #animationMove then

	MoveAnimationItem(animationMove)

	--end animationMove
	if 0 == #animationMove then
	    StackToDirect(directMove)
	    CreateNumber( GetFreePosVal() )
	end
    end
    if 0 < #animationStack then

	MoveAnimationItem(animationStack)
    end
end

function MoveAnimationItem(animations)
    for k,v in pairs(animations) do
	local dst = v.move

	if v.posx ~= orders[dst].posx then
	    local iter = 5
	    if v.posx > orders[dst].posx then
		iter = -5
	    end
	    v:SetPosition(v.posx + iter, orders[dst].posy)
	elseif v.posy ~= orders[dst].posy then
	    local iter = 5
	    if v.posy > orders[dst].posy then
		iter = -5
	    end
	    v:SetPosition(orders[dst].posx, v.posy + iter)
	else
	    v.move = nil
	    orders[dst].item = v
	    table.remove(animations,k)
	end
    end
end

function MoveToDirect(dir)
    local res1, res2, res3, res4 = false, false, false, false
    -- left
    if dir == 1 then
	res1 = MoveNumbers( 1, 2, 3, 4)
	res2 = MoveNumbers( 5, 6, 7, 8)
	res3 = MoveNumbers( 9,10,11,12)
	res4 = MoveNumbers(13,14,15,16)
    -- right
    elseif dir == 2 then
	res1 = MoveNumbers( 4, 3, 2, 1)
	res2 = MoveNumbers( 8, 7, 6, 5)
	res3 = MoveNumbers(12,11,10, 9)
	res4 = MoveNumbers(16,15,14,13)
    -- up
    elseif dir == 3 then
	res1 = MoveNumbers( 1, 5, 9,13)
	res2 = MoveNumbers( 2, 6,10,14)
	res3 = MoveNumbers( 3, 7,11,15)
	res4 = MoveNumbers( 4, 8,12,16)
    -- down
    elseif dir == 4 then
	res1 = MoveNumbers(13, 9, 5, 1)
	res2 = MoveNumbers(14,10, 6, 2)
	res3 = MoveNumbers(15,11, 7, 3)
	res4 = MoveNumbers(16,12, 8, 4)
    else
	print("unknown direct")
	return false
    end

    return res1 or res2 or res3 or res4
end

function MoveNumbers(...)
    local space = 0
    local res = 0
    local argc = select('#', ...)

    for i = 1, argc do
	local i1 = select(i, ...)

	if orders[i1].item ~= nil then
	    if i > 1 and space > 0 then
		local i2 = select(i - space, ...)
		orders[i1].item.move = i2
		res = res + 1
	    end
	else
	    space = space + 1
	end
    end

    return res > 0
end

function StackToDirect(dir)
    local res1, res2, res3, res4 = false, false, false, false
    -- left
    if dir == 1 then
	res1 = StackNumbers( 1, 2, 3, 4)
	res2 = StackNumbers( 5, 6, 7, 8)
	res3 = StackNumbers( 9,10,11,12)
	res4 = StackNumbers(13,14,15,16)
    -- right
    elseif dir == 2 then
	res1 = StackNumbers( 4, 3, 2, 1)
	res2 = StackNumbers( 8, 7, 6, 5)
	res3 = StackNumbers(12,11,10, 9)
	res4 = StackNumbers(16,15,14,13)
    -- up
    elseif dir == 3 then
	res1 = StackNumbers( 1, 5, 9,13)
	res2 = StackNumbers( 2, 6,10,14)
	res3 = StackNumbers( 3, 7,11,15)
	res4 = StackNumbers( 4, 8,12,16)
    -- down
    elseif dir == 4 then
	res1 = StackNumbers(13, 9, 5, 1)
	res2 = StackNumbers(14,10, 6, 2)
	res3 = StackNumbers(15,11, 7, 3)
	res4 = StackNumbers(16,12, 8, 4)
    else
	print("unknown direct")
	return false
    end

    FillAnimations(animationStack)

    local stack = res1 or res2 or res3 or res4
    local res = false

    if stack then
        if sndClick ~= nil then
	    SWE.Audio.SoundPlayBuf(sndClick)
        end
	keyHandle = true
	res = true
    else
	if CheckWins() then
	    print("game wins")
	    if sndTada ~= nil then
		SWE.Audio.SoundPlayBuf(sndTada)
	    end
	elseif CheckLoss() then
	    print("game loss")
	else
	    keyHandle = true
	end
    end

    collectgarbage()

    return res
end

function StackNumbers(...)
    local argc = select('#', ...)
    local res = false

    for i = 2, argc do
	local i1 = select(i, ...)

	if orders[i1].item ~= nil then
	    local i2 = select(i - 1, ...)
	    local nextmove = 0

	    if orders[i2].item == nil then
		orders[i1].item.move = i2
		nextmove = i1
	    elseif orders[i2].item.value == orders[i1].item.value then
		orders[i2].item.value = orders[i2].item.value * 2
		orders[i1].item:SetVisible(false) -- don't rely: collect garbage
		orders[i1].item = nil
		res = true
	    elseif nextmove == i2 then
		orders[i1].item.move = nextmove
		nextmove = i1
	    end
	else
	    break
	end
    end

    return res
end

function CheckWins()
    for i = 1, 16 do
	if orders[i].item ~= nil and
	    orders[i].item.value == 2048 then
	    return true
	end
    end

    return false
end

function CheckLoss()
    for i = 1, 16 do
	if orders[i].item == nil then
	    return false
	end
    end

    return true
end

function ResetGame()
    for i = 1, 16 do
	if orders[i].item ~= nil then
	    orders[i].item:SetVisible(false)
	end
	orders[i].item = nil
    end
    CreateNumber( GetFreePosVal() )
    CreateNumber( GetFreePosVal() )
end

function GetFreePosVal()
    local val = 2
    local pos = 0

    if number4Hit:Check() then
	val = 4
    end
    
    local free = {}

    for i = 1, 16 do
	if orders[i].item == nil then
	    table.insert(free, i)
	end
    end

    if 0 < #free then
	local index = math.random(1, #free)
	pos = free[index]
    end

    return pos, val
end

ResetGame()
SWE.MainLoop(win)
