-- FTP Lua Server: concept
--
-- FTP port listen 2121
-- FTP data port set 45001 - 450999

-- require 'SWE'
SWE.SetDebug(true)

local version = "LuaFTP 01"

local function ToInt(x)
    local integral, fractal = math.modf(x)
    return integral
end

local function StringSplit(str, sep)
   local result = {}
   local regex = ("([^%s]+)"):format(sep)
   for each in str:gmatch(regex) do
      table.insert(result, each)
   end
   return result
end

function FixedPath(path)
    local dirsep = "/"
    local t = StringSplit(path, dirsep)
    local r = {}
    for i = 1,#t do
        if t[i] ~= "." and t[i] ~= ".." then
            table.insert(r, t[i])
        elseif t[i] == ".." then
            table.remove(r)
        end
    end
    if 0 < #t then
        return table.concat(r, dirsep)
    else
        return ""
    end
end

function FtpCommands(client)

    local ftp = {}

    ftp.banner = version
    ftp.client = client
    ftp.user = "anonymous"
    ftp.exit = false
    ftp.login = false
    ftp.root = "/var/tmp/"
    ftp.pwd = "/"
    ftp.ascii = true
    ftp.net = SWE.NetStream()

    if SWE.SystemMobileOs() == "wince" then
	ftp.root = "/"
    end

    ftp.data = {}
    ftp.data.pasv = false
    ftp.data.ipaddr = ""
    ftp.data.port = 0
    ftp.data.sock = nil
    ftp.debug = print

    ftp.cmdUSER = function(user)
	ftp.client:SendString("331 please specify the password\r\n")
    end

    ftp.cmdPASS = function(pass)
	ftp.client:SendString("230 login successful\r\n")
	ftp.login = true
    end

    ftp.cmdACCT = function()
	ftp.client:SendString("502 acct not implemented\r\n")
    end

    ftp.cmdSYST = function()
	ftp.client:SendString("215 unix type: L8\r\n")
    end

    ftp.cmdQUIT = function()
	ftp.client:SendString("221 goodbye\r\n")
	ftp.exit = true
    end

    ftp.cmdOPT = function()
	ftp.client:SendString("501 options not implemented\r\n")
    end

    ftp.cmdSTAT = function()
        ftp.client:SendString("211-ftp server status\r\n")
        ftp.client:SendString("\tconnected to " .. ftp.client.address .. "\r\n")
        ftp.client:SendString("\tlogged in as " .. ftp.user .. "\r\n")
        ftp.client:SendString("\t" .. ftp.banner .. ", memory usage " .. ToInt(SWE.SystemMemoryUsage() / 1052672) .. "M\r\n")
        ftp.client:SendString("211 end of status\r\n")
    end

    ftp.cmdHELP = function()
        ftp.client:SendString("214-the following commands are recognized\r\n")
        ftp.client:SendString("\tABOR ACCT CDUP  CWD FEAT LIST MDTM  MKD\r\n")
        ftp.client:SendString("\tNLST  NOP  OPT PASS PASV PORT  PWD QUIT\r\n")
        ftp.client:SendString("\tRETR SIZE STAT STOR SYST TYPE USER\r\n")
        ftp.client:SendString("214 help ok\r\n")
    end

    ftp.cmdCDUP = function()
	ftp.pwd = "/"
        ftp.client:SendString("250 directory successfully changed\r\n")
    end

    ftp.cmdPWD = function()
	ftp.client:SendString("257 \"" .. ftp.pwd .."\"\r\n")
    end

    ftp.cmdCWD = function(name)
	local dir = ftp.root .. FixedPath(name)
	local stat = SWE.SystemFileStat(dir)
	if stat ~= nil and stat.isdir then
	    ftp.pwd = name
	    ftp.client:SendString("250 directory successfully changed\r\n")
        else
	    ftp.client:SendString("550 failed to change directory\r\n")
	end
    end

    ftp.cmdMKD = function(name)
	local dir = ftp.root .. FixedPath(name)
	ftp.client:SendString("550 permission denied\r\n")
    end

    ftp.cmdNLST = function()
	if (ftp.data.pasv and ftp.data.sock == nil) or
	    (not ftp.data.pasv and (string.len(ftp.data.ipaddr) == 0 or ftp.data.port == 0)) then
            ftp.client:SendString("425 Use port or pasv first\r\n")
	    return
	end

        if not ftp.data.pasv then
	    ftp.data.sock = SWE.NetStream()
	    if not ftp.data.sock:Connect(ftp.data.ipaddr, ftp.data.port) then
		ftp.data.sock = nil
            end
	end

	if ftp.data.sock == nil then
            ftp.client:SendString("425 failed to established connection\r\n")
            return
	end
            
        ftp.client:SendString("150 here comes the directory listing\r\n")

	local names = SWE.SystemReadDirectory(ftp.root .. FixedPath(ftp.pwd))
	for k,v in pairs(names) do
	    local dirname,basename = SWE.SystemDirnameBasename(k)
	    ftp.data.sock:SendString(basename .. "\r\n")
        end

        ftp.client:SendString("226 directory send ok\r\n")
	ftp.data.sock:Close()
	ftp.data.sock = nil
    end

    ftp.cmdLIST = function()
	if (ftp.data.pasv and ftp.data.sock == nil) or
	    (not ftp.data.pasv and (string.len(ftp.data.ipaddr) == 0 or ftp.data.port == 0)) then
            ftp.client:SendString("425 Use port or pasv first\r\n")
	    return
	end

        if not ftp.data.pasv then
	    ftp.data.sock = SWE.NetStream()
	    if not ftp.data.sock:Connect(ftp.data.ipaddr, ftp.data.port) then
		ftp.data.sock = nil
            end
	end

	if ftp.data.sock == nil then
            ftp.client:SendString("425 failed to established connection\r\n")
            return
	end
            
        ftp.client:SendString("150 here comes the directory listing\r\n")

	local names = SWE.SystemReadDirectory(ftp.root .. FixedPath(ftp.pwd))
	for k,v in pairs(names) do
	    local stat = SWE.SystemFileStat(k)
	    local dirname,basename = SWE.SystemDirnameBasename(k)
	    ftp.data.sock:SendString(stat.access .. " " .. stat.nlink .. " " .. stat.uid .. " " .. stat.gid .. " " .. 
		    stat.size .. " " .. os.date("%b %d %Y", stat.ctime) .. " " .. basename .. "\r\n")
        end

        ftp.client:SendString("226 directory send ok\r\n")
	ftp.data.sock:Close()
	ftp.data.sock = nil
    end

    ftp.cmdABOR = function()
	if ftp.data.sock ~= nil then
	    ftp.data.sock:Close()
	    ftp.data.sock = nil
    	    ftp.client:SendString("226 abor complete\r\n")
        else
	    ftp.client:SendString("225 no transfer to abor\r\n")
	end
    end

    ftp.cmdRETR = function(name)
	if (ftp.data.pasv and ftp.data.sock == nil) or
	    (not ftp.data.pasv and (string.len(ftp.data.ipaddr) == 0 or ftp.data.port == 0)) then
            ftp.client:SendString("425 Use port or pasv first\r\n")
	    return
	end

        if not ftp.data.pasv then
	    ftp.data.sock = SWE.NetStream()
	    if not ftp.data.sock:Connect(ftp.data.ipaddr, ftp.data.port) then
		ftp.data.sock = nil
            end
	end

	if ftp.data.sock == nil then
            ftp.client:SendString("425 failed to established connection\r\n")
            return
	end

	-- send file
	local file = ftp.root .. FixedPath(name)

	local offset = 0
	local block = 64 * 1024
	local stat = SWE.SystemFileStat(file)
	local buf = SWE.BinaryBuf()
	if stat ~= nil then
	    ftp.client:SendString("150 ok to send data\r\n")
	    while offset < stat.size do
		buf:ReadFromFile(file, offset, block)
		if 0 < buf.size then
		    ftp.data.sock:SendBytes(buf)
    		    offset = offset + buf.size
		else
		    SWE.Debug("swe.binarybuf read error",file,offset)
		    break
		end
		buf:Clear()
	    end
	    if offset < stat.size then
		ftp.client:SendString("550 failed to read file\r\n")
	    else
		ftp.client:SendString("226 transfer complete\r\n")
	    end
	else
	    ftp.client:SendString("550 failed to open file\r\n")
	end

	ftp.data.sock:Close()
	ftp.data.sock = nil
    end

    ftp.cmdSTOR = function(name)
	if (ftp.data.pasv and ftp.data.sock == nil) or
	    (not ftp.data.pasv and (string.len(ftp.data.ipaddr) == 0 or ftp.data.port == 0)) then
            ftp.client:SendString("425 Use port or pasv first\r\n")
	    return
	end

        if not ftp.data.pasv then
	    ftp.data.sock = SWE.NetStream()
	    if not ftp.data.sock:Connect(ftp.data.ipaddr, ftp.data.port) then
		ftp.data.sock = nil
            end
	end

	if ftp.data.sock == nil then
            ftp.client:SendString("425 failed to established connection\r\n")
            return
	end

	-- recv file
	local file = ftp.root .. FixedPath(name)
	-- check write
	local fh = io.open(file, "w")
	if fh ~= nil then
	    fh:close()
	else
	    ftp.client:SendString("550 failed to open file\r\n")
	    return
	end

	local size = 0
	local continue = true
	ftp.client:SendString("150 ok to recv data\r\n")
	while continue do
	    local buf = ftp.data.sock:RecvBytes(buf, 64 * 1024)
	    if buf ~= nil and buf.size > 0 then
		buf:SaveToFile(file, -1)
		size = size + buf.size
	    else
		continue = false
	    end
	end

	ftp.client:SendString("226 transfer complete (size " .. tostring(size) .. ")\r\n")
	ftp.data.sock:Close()
	ftp.data.sock = nil
    end


    ftp.cmdSIZE = function(name)
	local file = ftp.root .. FixedPath(name)
	local stat = SWE.SystemFileStat(file)
	if stat ~= nil then
    	    ftp.client:SendString("213 " .. stat.size .. "\r\n")
	else
    	    ftp.client:SendString("550 could not get file size\r\n")
	end
    end

    ftp.cmdMDTM = function(name)
	local file = ftp.root .. FixedPath(name)
	local stat = SWE.SystemFileStat(file)
	if stat ~= nil then
    	    ftp.client:SendString("213 " .. os.date("%Y%m%d%H%M%S", stat.ctime) .. "\r\n")
	else
    	    ftp.client:SendString("550 could not get file size\r\n")
	end
    end

    ftp.cmdFEAT = function(mode)
	ftp.client:SendString("221-features:\r\n")
        ftp.client:SendString("PASV\r\n")
        ftp.client:SendString("MDTM\r\n")
        ftp.client:SendString("SIZE\r\n")
        ftp.client:SendString("211 end\r\n")
    end

    ftp.cmdTYPE = function(mode)
	if string.lower(tostring(mode)) == "a" then
    	    ftp.client:SendString("200 switching to ascii mode\r\n")
	    ftp.ascii = true
	elseif string.lower(tostring(mode)) == "i" then
            ftp.client:SendString("200 switching to binary mode\r\n")
	    ftp.ascii = false
	else
    	    ftp.client:SendString("500 unrecognised type command\r\n")
	end
    end

    ftp.cmdPASV = function()
	ftp.data.sock = nil
	ftp.data.pasv = true
	ftp.data.port = math.random(45001, 45999)

	local res = ftp.net:Listen(ftp.data.port)

	if res then
	    local ipaddr = "127.0.0.1"

	    if ftp.client.address ~= "127.0.0.1" then
		for k,v in pairs( {SWE.NetStream.LocalAddresses()} ) do
		    if v ~= "127.0.0.1" then
			ipaddr = v
			break
		    end
		end
	    end

	    ftp.debug("data port:", ipaddr, ftp.data.port)

	    local octets = StringSplit(ipaddr, "%.")
	    local p1 = ToInt(ftp.data.port / 256)
	    local p2 = ftp.data.port - p1 * 256
	    local mode = tostring(octets[1]) .. "," .. tostring(octets[2]) .. "," .. 
			tostring(octets[3]) .. "," .. tostring(octets[4]) .. "," .. tostring(p1) .. "," .. tostring(p2)

	    ftp.client:SendString("227 entering passive mode (" .. mode .. ")\r\n")
	    ftp.data.sock = ftp.net:WaitAccept()
	else
	    ftp.client:SendString("425 failed to listen port\r\n")
	end
    end

    ftp.cmdPORT = function(info)
	local a1,a2,a3,a4,p1,p2 = table.unpack(StringSplit(tostring(info), ","))
	ftp.data.ipaddr = tostring(a1) .. "." .. tostring(a2) .. "." .. tostring(a3) .. "." .. tostring(a4)
	ftp.data.port = p1 * 256 + p2 
	ftp.data.sock = nil
	ftp.data.pasv = false
        ftp.client:SendString("200 port command successful\r\n")

	ftp.debug("data port:", ftp.data.ipaddr, ftp.data.port)
    end

    ftp.cmdUNKNOWN = function()
	if ftp.login then
	    ftp.client:SendString("500 unknown command\r\n")
	else
	    ftp.client:SendString("530 please login with user and pass\r\n")
	end
    end

    ftp.parse = function()
        ftp.client:SendString("220 " .. ftp.banner .. "\r\n")
	-- wait commands
	while not ftp.exit do
	    local str = ftp.client:RecvString(0x0A)
	    if 0 < string.len(str) then

		--local buf = SWE.BinaryBuf(str)
		--SWE.Debug("BINARY:", buf:ToJson())

		-- chomp string
		str = string.gsub(str, "[\r\n]+", "")

		-- slit command, args
		local i1, i2, cmd, argv = string.find(str,"(%a+)%s*(.*)")
		cmd = string.upper(cmd)

		local func = "cmd" .. cmd
		local info = "FTP recv: " .. cmd

		if argv ~= nil then
		    ftp.debug(info, argv)
		else
		    ftp.debug(info)
		end

		local answer = false

		for k,v in pairs(ftp) do
		    if k == func and type(v) == "function" then
			ftp[func](argv)
			answer = true
			break
		    end
		end

		if not answer then
		    ftp.cmdUNKNOWN()
		end
	    else
		SWE.SystemSleep(500)
		ftp.debug("empty data")
	    end
	end
    end

    return ftp
end

-- reset locale time (for LIST cmd)
os.setlocale("C", "time")

local net = SWE.NetStream()
local res = net:Listen(2121)

if res then
    -- single thread mode
    local client = net:WaitAccept()
    if client ~= nil then
        FtpCommands(client):parse()
    end
else
    print("error: res false")
end
