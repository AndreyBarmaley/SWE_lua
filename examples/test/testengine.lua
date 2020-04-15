-- require 'SWE'

SWE.SetDebug(false)

function test_json()
    local str = '[{"id":"2","name":"Яблоко","item_name":"minecraft:apple","item_meta":"0","nbt":"{Some NBT Tags}","cost_uu":"0.01","stat":"1","test_number":771,"total_sales":"152","mods":"Vanilla"}]'
    local json = SWE.JsonParse(str)
    if type(json) ~= "table" or type(json[1]) ~= "table" or json[1]['test_number'] ~= 771 then
	error("SWE.JsonParse FAILED")
    end
    SWE.Dump(json[1])
    print("SWE.JsonParse PASSED")
end

function test_color()
    for k,v in pairs(SWE.Color) do
        if type(v) == "number" then
	    if tostring(k) ~= SWE.Color.ToString(v) then
		error("SWE.Color FAILED")
	    end
	end
    end
    print("SWE.Color PASSED")
end

function test_binarybuf()
    -- check SWE.BinaryBuf(string)
    local str1 = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    local buf1 = SWE.BinaryBuf(str1)

    if buf1.size ~= string.len(str1) then
	error("SWE.BinaryBuf(string) FAILED")
    end

    local crc1 = SWE.BinaryBuf.GetCRC32b(buf1)
    local zip1 = SWE.BinaryBuf.ZlibCompress(buf1)

    if 0 == zip1.size then
	error("SWE.BinaryBuf.ZlibCompress FAILED")
    end

    buf1 = nil

    local base64 = SWE.BinaryBuf.Base64Encode(zip1)

    if 0 == base64.size then
	error("SWE.BinaryBuf.Base64Encode FAILED")
    end

    if not SWE.BinaryBuf.SaveToFile(SWE.BinaryBuf(base64), "/tmp/swe.test") then
	error("SWE.BinaryBuf.SaveToFile FAILED")
    end

    zip1 = nil
    base64 = SWE.BinaryBuf.ReadFromFile("/tmp/swe.test")

    if base64 == nil or base64.size == nil or base64.size < 1 then
	error("SWE.BinaryBuf.ReadFromFile FAILED")
    end

    os.remove("/tmp/swe.test")

    local zip2 = SWE.BinaryBuf.Base64Decode(base64)

    if 0 == zip2.size then
	error("SWE.BinaryBuf.Base64Decode FAILED")
    end

    base64 = nil

    local buf2 = SWE.BinaryBuf.ZlibDecompress(zip2)

    if 0 == buf2.size then
	error("SWE.BinaryBuf.ZlibDecompress FAILED")
    end

    local str2 = SWE.BinaryBuf.ToString(buf2)

    if buf2.size ~= string.len(str2) then
	error("SWE.BinaryBuf from string FAILED")
    end

    local crc2 = SWE.BinaryBuf.GetCRC32b(buf2)
    buf2 = nil

    collectgarbage()

    if crc1 ~= crc2 then
	error("SWE.BinaryBuf library FAILED")
    end

    -- check SWE.BinaryBuf()
    buf1 = SWE.BinaryBuf()
    for it=1,string.len(str1) do
	SWE.BinaryBuf.SetByte(buf1, buf1.size, string.byte(str1, it, it))
    end

    local crc3 = SWE.BinaryBuf.GetCRC32b(buf1)

    if crc1 ~= crc3 then
	error("SWE.BinaryBuf.SetByte FAILED")
    end

    for it=0,buf1.size-1 do
	if SWE.BinaryBuf.GetByte(buf1, it) ~= string.byte(str1, it+1, it+1) then
	    error("SWE.BinaryBuf.GetByte FAILED")
	end
    end

    buf1 = nil

    -- check SWE.BinaryBuf(size)
    buf1 = SWE.BinaryBuf(100, 123)

    if buf1.size ~= 100 then
	error("SWE.BinaryBuf(size) FAILED")
    end

    buf2 = SWE.BinaryBuf()
    for it=1,100 do
	SWE.BinaryBuf.SetByte(buf2, buf2.size, it)
    end

    -- table binarybuf, int offset, table binarybuf, int offset, int size
    SWE.BinaryBuf.SetBytes(buf1, 50, buf2, 50, 50)
    SWE.BinaryBuf.SetBytes(buf2, 0, buf1, 0, 50)

    crc1 = SWE.BinaryBuf.GetCRC32b(buf1)
    crc2 = SWE.BinaryBuf.GetCRC32b(buf2)

    if crc1 ~= crc2 then
	error("SWE.BinaryBuf.SetBytes FAILED")
    end

    local buf3 = SWE.BinaryBuf.GetBytes(buf1, 30, 30)
    local buf4 = SWE.BinaryBuf.GetBytes(buf2, 30, 30)

    crc1 = SWE.BinaryBuf.GetCRC32b(buf3)
    crc2 = SWE.BinaryBuf.GetCRC32b(buf4)

    buf1 = nil
    buf2 = nil
    collectgarbage()

    if crc1 ~= crc2 then
	error("SWE.BinaryBuf.GetBytes FAILED")
    end

    print("SWE.BinaryBuf PASSED")
end

test_binarybuf()
test_color()
test_json()

local pt = SWE.Point(101, 102)
local sz = SWE.Size(103, 104)
local rt = SWE.Rect(101, 102, 103, 104)

SWE.Dump(pt)
SWE.Dump(sz)
SWE.Dump(rt)

print(pt:ToJson())
print(sz:ToJson())
print(rt:ToJson())

print(pt:Unpack())
print(sz:Unpack())
print(rt:Unpack())

local rt1 = SWE.Rect(10,20,100, 200)
print("rect1",rt1:ToJson())
local rt2 = SWE.Rect(50,80,100, 200)
print("rect2",rt2:ToJson())

local res1 = rt1:HasIntersection(rt2)
print("has intersection",res1)

local res2 = rt1:GetIntersectRect(rt2)
print("intersect rects",res2:ToJson())
print("tostring: ", res2)

local hit = SWE.RandomHit(33)
print(hit:ToJson())

for i = 1,100 do
    local check = hit:Check()
end

local check = hit:Check()
print(hit:ToJson())

for i = 2,100 do
    local check = hit:Check()
end

local check = hit:Check()
print(hit:ToJson())

for i = 2,100 do
    local check = hit:Check()
end

local utf81 = "ПриветБармалей1234567890qwerty"
local ustr1 = SWE.UnicodeString(utf81)
local ustr2 = ustr1:SubString(6,8)
if ustr2.size ~= 8 then
    error("SWE.UnicodeString(string) FAILED")
end
SWE.Dump(ustr2)
--print(ustr2:ToString())

local utf82 = "Привет Бармалей!"
local ustr3 = SWE.UnicodeString(utf82)
print(ustr3:ToJson())
