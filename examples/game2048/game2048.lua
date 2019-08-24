require 'SWE'

local fullscreen = false
local debug = false

local win = SWE.DisplayInit("Game2048", 320, 240, fullscreen, debug)

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
local animation = {}
local moveDirect = 0
local stackTurn = false
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

    -- fill area
    for i = 1, 16 do
	local t = orders[i]
	win:RenderRect(SWE.Color.LightYellow, t.posx, t.posy, bitRect, bitRect, true)
	win:RenderRect(SWE.Color.Khaki, t.posx, t.posy, bitRect, bitRect, false)
    end

    win:RenderRect(SWE.Color.Navy, orders[1].posx - 1, orders[1].posy - 2, 2 + bitRect * 4, 2 + bitRect * 4, false)
    win:RenderTexture(txMUK, 0, 0, txMUK.width, txMUK.height, win.width - txMUK.width - 5,
    			    win.height - txMUK.height - 2, txMUK.width, txMUK.height)

    -- free texture
    txMUK = nil
    collectgarbage()

    return true
end

function win.KeyPressEvent(key)
    if key == SWE.Key.ESCAPE then
	-- close scene, see SWE.Loop
	win:SetVisible(false)
	return true
    end

    if 0 < #animation then
	return false
    end

    if key == SWE.Key.LEFT then
	MoveNumbers(1)
	return true

    elseif key == SWE.Key.RIGHT then
	MoveNumbers(2)
	return true

    elseif key == SWE.Key.UP then
	MoveNumbers(3)
	return true

    elseif key == SWE.Key.DOWN then
	MoveNumbers(4)
	return true
    end

    return false
end

function win.SystemTickEvent(ms)
    -- check if move animation
    if 0 < #animation then
	MoveAnimationItem()
	--end turn
	if 0 == #animation then
	    if not stackTurn then
		StackNumbers()
	    end

	    if CheckWins() then
		print("game wins")
	    end

	    CreateNumber( GetFreePosVal() )

	    if CheckLoss() then
		print("game loss")
	    end
	end
    else
	-- check if need move item: insert to animation
	for i = 1, 16 do
	    if orders[i].item ~= nil and orders[i].item.move ~= nil then
		table.insert(animation, orders[i].item)
		orders[i].item = nil
	    end
	end
    end
end

function MoveAnimationItem()
    for k,v in pairs(animation) do
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
	    table.remove(animation,k)
	end
    end
end

function MoveNumbers(dir)
    moveDirect = dir
    stackTurn = false

    -- left
    if dir == 1 then
	MoveRow( 1, 2, 3, 4)
	MoveRow( 5, 6, 7, 8)
	MoveRow( 9,10,11,12)
	MoveRow(13,14,15,16)
    -- right
    elseif dir == 2 then
	MoveRow( 4, 3, 2, 1)
	MoveRow( 8, 7, 6, 5)
	MoveRow(12,11,10, 9)
	MoveRow(16,15,14,13)
    -- up
    elseif dir == 3 then
	MoveCol( 1, 5, 9,13)
	MoveCol( 2, 6,10,14)
	MoveCol( 3, 7,11,15)
	MoveCol( 4, 8,12,16)
    -- down
    elseif dir == 4 then
	MoveCol(13, 9, 5, 1)
	MoveCol(14,10, 6, 2)
	MoveCol(15,11, 7, 3)
	MoveCol(16,12, 8, 4)
    end
end

function MoveRow(...)
    local space = 0
    local res = 0
    local argc = select('#', ...)
    local toleft = select(1, ...) < select(argc, ...)
    local iter = 1

    if not toleft then
	iter = -1
    end

    for i = 1, argc do
	local arg = select(i, ...)

	if orders[arg].item ~= nil then
	    if (toleft and orders[arg].left ~= nil) or
		(not toleft and orders[arg].right ~= nil) then

		if space > 0 then
		    orders[arg].item.move = select(i - space, ...)
		    res = res + 1
		end
	    end
	else
	    space = space + 1
	end
    end

    return res > 0
end

function MoveCol(...)
    local space = 0
    local res = 0
    local argc = select('#', ...)
    local toup = select(1, ...) < select(argc, ...)
    local iter = 1

    if not toup then
	iter = -1
    end

    for i = 1, argc do
	local arg = select(i, ...)

	if orders[arg].item ~= nil then
	    if (toup and orders[arg].up ~= nil) or
		(not toup and orders[arg].down ~= nil) then

		if space > 0 then
		    orders[arg].item.move = select(i - space, ...)
		    res = res + 1
		end
	    end
	else
	    space = space + 1
	end
    end

    return res > 0
end

function StackNumbers()
    -- left
    if moveDirect == 1 then
	StackRow( 2, 3, 4)
	StackRow( 6, 7, 8)
	StackRow(10,11,12)
	StackRow(14,15,16)
    -- right
    elseif moveDirect == 2 then
	StackRow( 3, 2, 1)
	StackRow( 7, 6, 5)
	StackRow(11,10, 9)
	StackRow(15,14,13)
    -- up
    elseif moveDirect == 3 then
	StackCol( 5, 9,13)
	StackCol( 6,10,14)
	StackCol( 7,11,15)
	StackCol( 8,12,16)
    -- down
    elseif moveDirect == 4 then
	StackCol( 9, 5, 1)
	StackCol(10, 6, 2)
	StackCol(11, 7, 3)
	StackCol(12, 8, 4)
    end

    stackTurn = true
end

function StackRow(...)
    local argc = select('#', ...)
    local toleft = select(1, ...) < select(argc, ...)

    for i = 1, argc do
	local i1 = select(i, ...)

	if orders[i1].item ~= nil then
	    local i2 = 0
	    local nextmove = 0

	    if toleft then
		i2 = orders[i1].left
	    else
		i2 = orders[i1].right
	    end

	    if orders[i2].item == nil then
		orders[i1].item.move = i2
		nextmove = i1
	    elseif orders[i2].item.value == orders[i1].item.value then
		orders[i2].item.value = orders[i2].item.value * 2
		orders[i1].item = nil
	    elseif nextmove > 0 then
		orders[i1].item.move = nextmove
		nextmove = i1
	    end
	else
	    break
	end
    end
end

function StackCol(...)
    local argc = select('#', ...)
    local toup = select(1, ...) < select(argc, ...)

    for i = 1, argc do
	local i1 = select(i, ...)

	if orders[i1].item ~= nil then
	    local i2 = 0
	    local nextmove = 0

	    if toup then
		i2 = orders[i1].up
	    else
		i2 = orders[i1].down
	    end

	    if orders[i2].item == nil then
		orders[i1].item.move = i2
		nextmove = i1
	    elseif orders[i2].item.value == orders[i1].item.value then
		orders[i2].item.value = orders[i2].item.value * 2
		orders[i1].item = nil
	    elseif nextmove > 0 then
		orders[i1].item.move = nextmove
		nextmove = i1
	    end
	else
	    break
	end
    end
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
