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
#include "SWE_streamnet.h"

int SWE_streamnet_create(lua_State*);
int SWE_streamnet_destroy(lua_State*);

SWE_StreamNet* SWE_StreamNet::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.streamnet"))
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

    auto ptr = static_cast<SWE_StreamNet**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////////////////////////////////////
int SWE_streamnet_recv_byte(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
	return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        int byte = stream->get8();
	ll.pushInteger(byte);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_recv_be16(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        int res = stream->getBE16();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_recv_be32(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        int res = stream->getBE32();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_recv_be64(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        double res = stream->getBE64();
	ll.pushNumber(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_recv_le16(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        int res = stream->getLE16();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_recv_le32(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        int res = stream->getLE32();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_recv_le64(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        double res = stream->getLE64();
	ll.pushNumber(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_recv_bytes(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, size
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	int size = ll.toIntegerIndex(2);
        BinaryBuf res = static_cast<StreamNetwork*>(stream)->get(size);

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
#endif
}

int SWE_streamnet_recv_string(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, int endl, int wait ms
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	std::string res;
	int endl = ll.toIntegerIndex(2);
	int wait = ll.isNumberIndex(3) ? ll.toIntegerIndex(3) : 2000; // default: 2000 ms
	bool forcebr = ll.isBooleanIndex(4) ? ll.toBooleanIndex(4) : false;
	u32 start = Tools::ticks();
	int byte = 0;

	while(stream->isEnabled() && !stream->fail())
	{
	    if(stream->ready(0))
	    {
		byte = stream->get8();
		if(byte) res.append(1, byte);
		if(byte == endl) break;
	    }
	    else
	    {
    	        DisplayScene::handleEvents(300);
		// DEBUG("wait string data");
	    }
    
	    if(0 < wait && start + wait < Tools::ticks())
	    {
		// empty data or force break
		if(res.empty() || forcebr)
        	    break;
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
#endif
}

int SWE_streamnet_send_bytes(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, swe_binarybuf
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 2, __FUNCTION__);

    if(stream && buf)
    {
        stream->put(reinterpret_cast<const char*>(buf->data()), buf->size());
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_string(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, string
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	std::string str = ll.toStringIndex(2);
        stream->put(str.data(), str.size());
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_byte(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, number
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	int byte = ll.toIntegerIndex(2);
        stream->put8(byte);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_be16(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, number
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	int res = ll.toIntegerIndex(2);
        stream->putBE16(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_be32(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, number
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	int res = ll.toIntegerIndex(2);
        stream->putBE32(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_be64(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, number
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	double res = ll.toNumberIndex(2);
        stream->putBE64(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_le16(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, number
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	int res = ll.toIntegerIndex(2);
        stream->putLE16(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_le32(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, number
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	int res = ll.toIntegerIndex(2);
        stream->putLE32(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_send_le64(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, number
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	double res = ll.toNumberIndex(2);
        stream->putLE64(res);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_wait_string(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, string
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    std::string str = ll.toStringIndex(2);

    if(stream && str.size())
    {
	bool res = stream->wait(str);
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
#endif
}

int SWE_streamnet_connect(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, string, int port
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	std::string server = ll.toStringIndex(2);
	int port = ll.toIntegerIndex(3);
	bool res = stream->connect(server, port);

	if(res)
	{
	    ll.pushString("address").pushString(server).setTableIndex(1);
	    ll.pushString("port").pushInteger(port).setTableIndex(1);
	}

	ll.pushBoolean(res);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
#endif
}

int SWE_streamnet_data_ready(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, int port
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	bool res = stream->ready();
	ll.pushBoolean(res);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
#endif
}

int SWE_streamnet_listen(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet, int port
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	int port = ll.toIntegerIndex(2);
	bool res = stream->listen(port);

	if(res)
	{
	    ll.pushString("address").pushString("0.0.0.0").setTableIndex(1);
	    ll.pushString("port").pushInteger(port).setTableIndex(1);
	}

	ll.pushBoolean(res);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
#endif
}

int SWE_streamnet_wait_accept(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	TCPsocket sock = NULL;

	while(stream->isEnabled() && !stream->fail())
	{
	    sock = stream->accept();
	    if(sock) break;

    	    DisplayScene::handleEvents(20);
	}

	if(sock)
	{
    	    ll.stackClear();
    	    ll.pushTable();
    	    SWE_streamnet_create(L);

    	    SWE_StreamNet* stream2 = SWE_StreamNet::get(ll, -1, __FUNCTION__);

	    if(stream2->open(sock))
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
#endif
}

int SWE_streamnet_disable(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	bool enabled = ll.toBooleanIndex(2);
	stream->setDisable(enabled);
	ll.pushString("enabled").pushBoolean(enabled).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_close(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
	stream->close();
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
#endif
}

int SWE_streamnet_to_json(lua_State* L)
{   
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    // params: swe_streamnet
    LuaState ll(L);

    SWE_StreamNet* stream = SWE_StreamNet::get(ll, 1, __FUNCTION__);
    if(stream)
    {
        std::string address = ll.getFieldTableIndex("address", 1).getTopString();
        int port = ll.getFieldTableIndex("port", 1).getTopInteger();

        ll.stackPop(2);
        std::string str = StringFormat("{\"type\":\"%1\",\"address\":\"%2\",\"port\":%3}").
            arg("swe.streamnet").arg(address).arg(port);

        ll.pushString(str);
        return 1;
    }

    ERROR("userdata empty");
    return 0;
#endif
}

const struct luaL_Reg SWE_streamnet_functions[] = {
    { "RecvByte", SWE_streamnet_recv_byte },		// [int], swe_streamnet
    { "RecvBE16", SWE_streamnet_recv_be16 },		// [int], swe_streamnet
    { "RecvBE32", SWE_streamnet_recv_be32 },		// [int], swe_streamnet
    { "RecvBE64", SWE_streamnet_recv_be64 },		// [number], swe_streamnet
    { "RecvLE16", SWE_streamnet_recv_le16 },		// [int], swe_streamnet
    { "RecvLE32", SWE_streamnet_recv_le32 },		// [int], swe_streamnet
    { "RecvLE64", SWE_streamnet_recv_le64 },		// [number], swe_streamnet
    { "RecvBytes", SWE_streamnet_recv_bytes }, 		// [swe_binarybuf], swe_streamnet, number size
    { "RecvString", SWE_streamnet_recv_string },	// [string], swe_streamnet, int endl
    { "SendByte", SWE_streamnet_send_byte }, 		// [void], swe_streamnet, int
    { "SendBE16", SWE_streamnet_send_be16 },		// [void], swe_streamnet, int
    { "SendBE32", SWE_streamnet_send_be32 },		// [void], swe_streamnet, int
    { "SendBE64", SWE_streamnet_send_be64 },		// [void], swe_streamnet, number
    { "SendLE16", SWE_streamnet_send_le16 },		// [void], swe_streamnet, int
    { "SendLE32", SWE_streamnet_send_le32 },		// [void], swe_streamnet, int
    { "SendLE64", SWE_streamnet_send_le64 },		// [void], swe_streamnet, number
    { "SendBytes", SWE_streamnet_send_bytes }, 		// [void], swe_streamnet, swe_binarybuf
    { "SendString", SWE_streamnet_send_string },	// [void], swe_streamnet, string
    { "WaitString", SWE_streamnet_wait_string },	// [bool], swe_streamnet, string
    { "Connect", SWE_streamnet_connect },		// [bool], swe_streamnet, string, int port
    { "Listen", SWE_streamnet_listen },			// [bool], swe_streamnet, int port
    { "SetDisable", SWE_streamnet_disable },		// [void], swe_streamnet, bool
    { "DataReady", SWE_streamnet_data_ready },		// [bool], swe_streamnet
    { "WaitAccept", SWE_streamnet_wait_accept }, 	// [swe_streamnet], swe_streamnet
    { "Close", SWE_streamnet_close }, 			// [swe_streamnet], swe_streamnet
    { "ToJson", SWE_streamnet_to_json },		// [string], swe_streamnet
    { NULL, NULL }
};

int SWE_streamnet_create(lua_State* L)
{
    // empty params
    LuaState ll(L);
    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_StreamNet**>(ll.pushUserData(sizeof(SWE_StreamNet*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_streamnet_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    if(ll.isStringIndex(2) && ll.isNumberIndex(3))
    {
	std::string server = ll.toStringIndex(2);
	int port = ll.toIntegerIndex(3);

	// SWE_StreamNet: server, port
	*ptr = new SWE_StreamNet(server, port);

	// add values
	ll.pushString("__type").pushString("swe.streamnet").setTableIndex(-3);
	ll.pushString("address").pushString(server).setTableIndex(-3);
	ll.pushString("port").pushInteger(port).setTableIndex(-3);
	ll.pushString("enabled").pushBoolean(true).setTableIndex(-3);
    }
    else
    {
	// SWE_StreamNet()
	*ptr = new SWE_StreamNet();

	// add values
	ll.pushString("__type").pushString("swe.streamnet").setTableIndex(-3);
    }

    // set functions
    ll.setFunctionsTableIndex(SWE_streamnet_functions, -1);
    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

    return 1;
}

int SWE_streamnet_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_StreamNet**>(ll.getTopUserData());
        if(ptr && *ptr)
        {
            DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

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

int SWE_streamnet_local_addresses(lua_State* L)
{
#ifdef SWE_DISABLE_NETWORK
        ERROR("not supported module: " << "swe.streamnet");
        return 0;
#else
    LuaState ll(L);

    StringList addrs = StreamNetwork::localAddresses();
    for(auto it = addrs.begin(); it != addrs.end(); ++it)
	ll.pushString(*it);

    return addrs.size();
#endif
}

const struct luaL_Reg SWE_streamnet_functions2[] = {
    { "LocalAddresses", SWE_streamnet_local_addresses },
    { NULL, NULL }
};

void SWE_StreamNet::registers(LuaState & ll)
{
    // SWE.StreamNet
    ll.pushTable("SWE.StreamNet");
    ll.setFunctionsTableIndex(SWE_streamnet_functions2, -1);

    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_streamnet_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
