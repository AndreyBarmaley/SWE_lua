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
#include "SWE_streambuf.h"

int SWE_streambuf_create(lua_State*);
int SWE_streambuf_destroy(lua_State*);

SWE_StreamBuf* SWE_StreamBuf::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.streambuf"))
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

    auto ptr = static_cast<SWE_StreamBuf**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////////////////////////////////////
int SWE_streambuf_get_byte(lua_State* L)
{
    // params: swe_streambuf

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
        int byte = buf->get8();
	ll.pushInteger(byte);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_get_be16(lua_State* L)
{
    // params: swe_streambuf

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
        int res = buf->getBE16();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_get_be32(lua_State* L)
{
    // params: swe_streambuf

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
        int res = buf->getBE32();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_get_be64(lua_State* L)
{
    // params: swe_streambuf

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
        double res = buf->getBE64();
	ll.pushNumber(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_get_le16(lua_State* L)
{
    // params: swe_streambuf

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
        int res = buf->getLE16();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_get_le32(lua_State* L)
{
    // params: swe_streambuf

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
        int res = buf->getLE32();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_get_le64(lua_State* L)
{
    // params: swe_streambuf

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
        double res = buf->getLE64();
	ll.pushNumber(res);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_get_bytes(lua_State* L)
{
    // params: swe_streambuf, size

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	int size = ll.toIntegerIndex(2);
        BinaryBuf res = static_cast<StreamBufRW*>(buf)->get(size);

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

int SWE_streambuf_put_bytes(lua_State* L)
{
    // params: swe_streambuf, swe_binarybuf

    LuaState ll(L);

    SWE_StreamBuf* stream = SWE_StreamBuf::get(ll, 1, __FUNCTION__);
    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 2, __FUNCTION__);

    if(stream && buf)
    {
        stream->put(reinterpret_cast<const char*>(buf->data()), buf->size());
	ll.pushString("size").pushInteger(stream->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_put_byte(lua_State* L)
{
    // params: swe_streambuf, number

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	int byte = ll.toIntegerIndex(2);
        buf->put8(byte);
	ll.pushString("size").pushInteger(buf->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_put_be16(lua_State* L)
{
    // params: swe_streambuf, number

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	int res = ll.toIntegerIndex(2);
        buf->putBE16(res);
	ll.pushString("size").pushInteger(buf->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_put_be32(lua_State* L)
{
    // params: swe_streambuf, number

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	int res = ll.toIntegerIndex(2);
        buf->putBE32(res);
	ll.pushString("size").pushInteger(buf->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_put_be64(lua_State* L)
{
    // params: swe_streambuf, number

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	double res = ll.toNumberIndex(2);
        buf->putBE64(res);
	ll.pushString("size").pushInteger(buf->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_put_le16(lua_State* L)
{
    // params: swe_streambuf, number

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	int res = ll.toIntegerIndex(2);
        buf->putLE16(res);
	ll.pushString("size").pushInteger(buf->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_put_le32(lua_State* L)
{
    // params: swe_streambuf, number

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	int res = ll.toIntegerIndex(2);
        buf->putLE32(res);
	ll.pushString("size").pushInteger(buf->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_put_le64(lua_State* L)
{
    // params: swe_streambuf, number

    LuaState ll(L);
    SWE_StreamBuf* buf = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	double res = ll.toNumberIndex(2);
        buf->putLE64(res);
	ll.pushString("size").pushInteger(buf->size()).setTableIndex(1);
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_streambuf_to_json(lua_State* L)
{   
    // params: swe_streambuf
    LuaState ll(L);
    StreamBufRW* stream = SWE_StreamBuf::get(ll, 1, __FUNCTION__);

    if(stream)
    {
        size_t tellg = stream->tellg();
	stream->seekg(0);
	std::string data = stream->get().toHexString(",", true);
	stream->seekg(tellg);

        std::string str = StringFormat("{\"type\":\"swe.streambuf\",\"tellg\":%1,\"tellp\":%2,\"binary\":[%3]}").
            arg(stream->tellg()).arg(stream->tellp()).arg(data);

        ll.pushString(str);
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

const struct luaL_Reg SWE_streambuf_functions[] = {
    { "GetByte", SWE_streambuf_get_byte },		// [int], swe_streambuf
    { "GetBE16", SWE_streambuf_get_be16 },		// [int], swe_streambuf
    { "GetBE32", SWE_streambuf_get_be32 },		// [int], swe_streambuf
    { "GetBE64", SWE_streambuf_get_be64 },		// [number], swe_streambuf
    { "GetLE16", SWE_streambuf_get_le16 },		// [int], swe_streambuf
    { "GetLE32", SWE_streambuf_get_le32 },		// [int], swe_streambuf
    { "GetLE64", SWE_streambuf_get_le64 },		// [number], swe_streambuf
    { "GetBytes", SWE_streambuf_get_bytes }, 		// [swe_binarybuf], swe_streambuf, number size
    { "PutByte", SWE_streambuf_put_byte }, 		// [void], swe_streambuf, int
    { "PutBE16", SWE_streambuf_put_be16 },		// [void], swe_streambuf, int
    { "PutBE32", SWE_streambuf_put_be32 },		// [void], swe_streambuf, int
    { "PutBE64", SWE_streambuf_put_be64 },		// [void], swe_streambuf, number
    { "PutLE16", SWE_streambuf_put_le16 },		// [void], swe_streambuf, int
    { "PutLE32", SWE_streambuf_put_le32 },		// [void], swe_streambuf, int
    { "PutLE64", SWE_streambuf_put_le64 },		// [void], swe_streambuf, number
    { "PutBytes", SWE_streambuf_put_bytes }, 		// [void], swe_streambuf, swe_binarybuf
//    { "Seek", SWE_streambuf_seek }, 			// [bool], swe_streambuf, int, int
//    { "Tell", SWE_streambuf_tell },			// [int], swe_streambuf
//    { "Open", SWE_streambuf_open }, 			// [bool], swe_streambuf, string, string
//    { "Close", SWE_streambuf_close }, 		// [swe_streambuf], swe_streambuf
//    { "ToJson", SWE_streambuf_to_json },		// [string], swe_streambuf
    { NULL, NULL }
};

int SWE_streambuf_create(lua_State* L)
{
    // empty params
    LuaState ll(L);
    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_StreamBuf**>(ll.pushUserData(sizeof(SWE_StreamBuf*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_streambuf_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    if(ll.isTableIndex(2))
    {
	SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 2, __FUNCTION__);

	if(buf)
	{
	    // SWE_StreamBuf: BinaryBuf
	    SWE_StreamBuf* stream = new SWE_StreamBuf(*buf);
	    *ptr = stream;

	    // add values
	    ll.pushString("__type").pushString("swe.streambuf").setTableIndex(-3);
	}
	else
	{
	    *ptr = new SWE_StreamBuf();

	    // add values
	    ll.pushString("__type").pushString("swe.streambuf").setTableIndex(-3);

    	    ERROR("userdata empty");
	}
    }
    else
    {
	// SWE_StreamBuf()
	*ptr = new SWE_StreamBuf();

	// add values
	ll.pushString("__type").pushString("swe.streambuf").setTableIndex(-3);
    }

    // set functions
    ll.setFunctionsTableIndex(SWE_streambuf_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

    return 1;
}

int SWE_streambuf_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_StreamBuf**>(ll.getTopUserData());
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

void SWE_StreamBuf::registers(LuaState & ll)
{
    // SWE.StreamBuf
    ll.pushTable("SWE.StreamBuf");

    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_streambuf_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();

    ll.stackPop();
}
