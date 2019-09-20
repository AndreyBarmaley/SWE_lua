/***************************************************************************
 *   Copyright (C) 2019 by SWE team <sdl.window.engine@gmail.com>          *
 *                                                                         *
 *   Part of the SWE Lua:                                                  *
 *   https://github.com/AndreyBarmaley/SWE_lua                             *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 3 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/

#include "SWE_binarybuf.h"
#include "SWE_netstream.h"

int SWE_netstream_create(lua_State*);
int SWE_netstream_destroy(lua_State*);

SWE_NetStream* SWE_NetStream::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.netstream"))
    {
        ERROR(funcName << ": " << "table not found, index: " << tableIndex);
        return NULL;
    }

    if(! ll.getFieldTableIndex("userdata", tableIndex).isTopUserData())
    {
        ERROR(funcName << ": " << "not userdata, index: " << tableIndex << ", " << ll.getTopTypeName());
	ll.stackPop();
        return NULL;
    }

    auto ptr = static_cast<SWE_NetStream**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////////////////////////////////////
int SWE_netstream_recv_byte(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        int byte = net->get8();
	ll.pushInteger(byte);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_recv_be16(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        int res = net->getBE16();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_recv_be32(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        int res = net->getBE32();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_recv_be64(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        double res = net->getBE64();
	ll.pushNumber(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_recv_le16(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        int res = net->getLE16();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_recv_le32(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        int res = net->getLE32();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_recv_le64(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        double res = net->getLE64();
	ll.pushNumber(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_recv_bytes(lua_State* L)
{
    // params: swe_netstream, size

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int size = ll.toIntegerIndex(2);
        BinaryBuf res = static_cast<StreamNetwork*>(net)->get(size);

        ll.stackClear();
        ll.pushTable();
        SWE_binarybuf_create(L);

        SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, -1, __FUNCTION__);
        buf->swap(res);

        ll.pushString("size").pushInteger(buf->size()).setTableIndex(-3);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_netstream_recv_string(lua_State* L)
{
    // params: swe_netstream, int endl

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	std::string res;
	int endl = ll.toIntegerIndex(2);
	int byte = 0;

	while(net->isEnabled())
	{
	    if(net->ready())
	    {
		byte = net->get8();
		if(byte) res.append(1, byte);
		if(byte == endl) break;
	    }
	    else
	    {
		if(! Display::handleEvents())
        	{
            	    ERROR("break events");
            	    break;
        	}

    	        Display::redraw();
        	Tools::delay(1000);
		DEBUG("not data ready");
	    }
	}

	ll.pushString(res);
	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_bytes(lua_State* L)
{
    // params: swe_netstream, swe_binarybuf

    LuaState ll(L);

    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);
    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 2, __FUNCTION__);

    if(net && buf)
    {
        net->put(reinterpret_cast<const char*>(buf->data()), buf->size());
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_string(lua_State* L)
{
    // params: swe_netstream, string

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	std::string str = ll.toStringIndex(2);
        net->put(str.data(), str.size());
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_byte(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int byte = ll.toIntegerIndex(2);
        net->put8(byte);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_be16(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int res = ll.toIntegerIndex(2);
        net->putBE16(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_be32(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int res = ll.toIntegerIndex(2);
        net->putBE32(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_be64(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	double res = ll.toNumberIndex(2);
        net->putBE64(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_le16(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int res = ll.toIntegerIndex(2);
        net->putLE16(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_le32(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int res = ll.toIntegerIndex(2);
        net->putLE32(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_send_le64(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	double res = ll.toNumberIndex(2);
        net->putLE64(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_setready_timeout(lua_State* L)
{
    // params: swe_netstream, number

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int msTimeout = ll.toNumberIndex(2);
	net->setReadyTimeout(msTimeout);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_wait_string(lua_State* L)
{
    // params: swe_netstream, string

    LuaState ll(L);

    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);
    std::string str = ll.toStringIndex(2);

    if(net && str.size())
    {
	bool res = net->wait(str);
	ll.pushBoolean(res);
	return 1;
    }
    else
    if(str.empty())
    {
        ERROR("string empty");
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_connect(lua_State* L)
{
    // params: swe_netstream, string, int port

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	std::string server = ll.toStringIndex(2);
	int port = ll.toIntegerIndex(3);
	bool res = net->connect(server, port);

	ll.pushString("address").pushString(server).setTableIndex(1);
	ll.pushString("port").pushInteger(port).setTableIndex(1);

	ll.pushBoolean(res);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_netstream_data_ready(lua_State* L)
{
    // params: swe_netstream, int port

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	bool res = net->ready();
	ll.pushBoolean(res);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_netstream_listen(lua_State* L)
{
    // params: swe_netstream, int port

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	int port = ll.toIntegerIndex(2);
	bool res = net->listen(port);

	ll.pushString("address").pushString("0.0.0.0").setTableIndex(1);
	ll.pushString("port").pushInteger(port).setTableIndex(1);

	ll.pushBoolean(res);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_netstream_wait_accept(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	TCPsocket sock = NULL;

	while(net->isEnabled())
	{
	    sock = net->accept();
	    if(sock) break;

	    if(! Display::handleEvents())
	    {
    		ERROR("break events");
		break;
	    }

    	    Display::redraw();
    	    Tools::delay(10);
	}

	if(sock)
	{

    	    ll.stackClear();
    	    ll.pushTable();
    	    SWE_netstream_create(L);

    	    SWE_NetStream* net2 = SWE_NetStream::get(ll, -1, __FUNCTION__);

	    if(net2->open(sock))
	    {
		std::pair<std::string, int> info = StreamNetwork::peerAddress(sock);
    		ll.pushString("address").pushString(info.first).setTableIndex(-3);
		ll.pushString("port").pushInteger(info.second).setTableIndex(-3);
	    }

	    return 1;
	}
	else
	{
    	    ERROR("accept faled");
	}
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_disable(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	bool enabled = ll.toBooleanIndex(2);
	net->setDisable(enabled);
	ll.pushString("enabled").pushBoolean(enabled).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_close(lua_State* L)
{
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
	net->close();
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_netstream_to_json(lua_State* L)
{   
    // params: swe_netstream

    LuaState ll(L);
    SWE_NetStream* net = SWE_NetStream::get(ll, 1, __FUNCTION__);

    if(net)
    {
        std::string address = ll.getFieldTableIndex("address", 1).getTopString();
        int port = ll.getFieldTableIndex("port", 1).getTopInteger();

        ll.stackPop(2);
        std::string str = StringFormat("{\"type\":\"swe.netstream\",\"address\":\"%1\",\"port\":%2}").
            arg(address).arg(port);

        ll.pushString(str);
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

const struct luaL_Reg SWE_netstream_functions[] = {
    { "RecvByte", SWE_netstream_recv_byte },		// [int], swe_netstream
    { "RecvBE16", SWE_netstream_recv_be16 },		// [int], swe_netstream
    { "RecvBE32", SWE_netstream_recv_be32 },		// [int], swe_netstream
    { "RecvBE64", SWE_netstream_recv_be64 },		// [number], swe_netstream
    { "RecvLE16", SWE_netstream_recv_le16 },		// [int], swe_netstream
    { "RecvLE32", SWE_netstream_recv_le32 },		// [int], swe_netstream
    { "RecvLE64", SWE_netstream_recv_le64 },		// [number], swe_netstream
    { "RecvBytes", SWE_netstream_recv_bytes }, 		// [swe_binarybuf], swe_netstream, number size
    { "RecvString", SWE_netstream_recv_string },	// [string], swe_netstream, int endl
    { "SendByte", SWE_netstream_send_byte }, 		// [void], swe_netstream, int
    { "SendBE16", SWE_netstream_send_be16 },		// [void], swe_netstream, int
    { "SendBE32", SWE_netstream_send_be32 },		// [void], swe_netstream, int
    { "SendBE64", SWE_netstream_send_be64 },		// [void], swe_netstream, number
    { "SendLE16", SWE_netstream_send_le16 },		// [void], swe_netstream, int
    { "SendLE32", SWE_netstream_send_le32 },		// [void], swe_netstream, int
    { "SendLE64", SWE_netstream_send_le64 },		// [void], swe_netstream, number
    { "SendBytes", SWE_netstream_send_bytes }, 		// [void], swe_netstream, swe_binarybuf
    { "SendString", SWE_netstream_send_string },	// [void], swe_netstream, string
    { "SetReadyTimeout",SWE_netstream_setready_timeout},// [void], swe_netstream, number ms
    { "WaitString", SWE_netstream_wait_string },	// [bool], swe_netstream, string
    { "Connect", SWE_netstream_connect },		// [bool], swe_netstream, string, int port
    { "Listen", SWE_netstream_listen },			// [bool], swe_netstream, int port
    { "SetDisable", SWE_netstream_disable },		// [void], swe_netstream, bool
    { "DataReady", SWE_netstream_data_ready },		// [bool], swe_netstream
    { "WaitAccept", SWE_netstream_wait_accept }, 	// [swe_netstream], swe_netstream
    { "Close", SWE_netstream_close }, 			// [swe_netstream], swe_netstream
    { "ToJson", SWE_netstream_to_json },		// [string], swe_netstream
    { NULL, NULL }
};

int SWE_netstream_create(lua_State* L)
{
    // empty params
    LuaState ll(L);
    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_NetStream**>(ll.pushUserData(sizeof(SWE_NetStream*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_netstream_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    if(ll.isStringIndex(2) && ll.isIntegerIndex(3))
    {
	std::string server = ll.toStringIndex(2);
	int port = ll.toIntegerIndex(3);

	// SWE_NetStream: server, port
	*ptr = new SWE_NetStream(server, port);

	// add values
	ll.pushString("__type").pushString("swe.netstream").setTableIndex(-3);
	ll.pushString("address").pushString(server).setTableIndex(-3);
	ll.pushString("port").pushInteger(port).setTableIndex(-3);
	ll.pushString("enabled").pushBoolean(true).setTableIndex(-3);
    }
    else
    {
	// SWE_NetStream()
	*ptr = new SWE_NetStream();

	// add values
	ll.pushString("__type").pushString("swe.netstream").setTableIndex(-3);
    }

    // set functions
    ll.setFunctionsTableIndex(SWE_netstream_functions, -1);

    DEBUG(String::hex64(reinterpret_cast<u64>(ptr)) << ": [" << String::hex64(reinterpret_cast<u64>(*ptr)) << "]");

    return 1;
}

int SWE_netstream_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_NetStream**>(ll.getTopUserData());
        if(ptr && *ptr)
        {
            DEBUG(String::hex64(reinterpret_cast<u64>(ptr)) << ": [" << String::hex64(reinterpret_cast<u64>(*ptr)) << "]");

	    delete *ptr;
            *ptr = NULL;
        }
        else
        {
            ERROR("userdata empty");
        }
    }
    else
    {
        ERROR("not userdata");
    }

    return 0;
}

int SWE_netstream_local_addresses(lua_State* L)
{
    LuaState ll(L);

    StringList addrs = StreamNetwork::localAddresses();
    for(auto it = addrs.begin(); it != addrs.end(); ++it)
	ll.pushString(*it);

    return addrs.size();
}

const struct luaL_Reg SWE_netstream_functions2[] = {
    { "LocalAddresses", SWE_netstream_local_addresses },
    { NULL, NULL }
};

void SWE_NetStream::registers(LuaState & ll)
{
    // SWE.NetStream
    ll.pushTable("SWE.NetStream");
    ll.setFunctionsTableIndex(SWE_netstream_functions2, -1);

    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_netstream_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
