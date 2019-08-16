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

#include "SWE_tools.h"
#include "SWE_binarybuf.h"

int SWE_binarybuf_create(lua_State*);
int SWE_binarybuf_destroy(lua_State*);

SWE_BinaryBuf::SWE_BinaryBuf(lua_State* L, size_t sz, int val)
    : BinaryBuf(sz, val), ll(L)
{
}

SWE_BinaryBuf::SWE_BinaryBuf(lua_State* L, const u8* ptr, size_t sz)
    : BinaryBuf(ptr, sz), ll(L)
{
}

SWE_BinaryBuf::SWE_BinaryBuf(lua_State* L, const std::string & str)
    : BinaryBuf(reinterpret_cast<const u8*>(str.data()), str.size()), ll(L)
{
}

SWE_BinaryBuf* SWE_BinaryBuf::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex))
    {
        ERROR("table not found" << ": " << tableIndex);
        return NULL;
    }

    if(! ll.getFieldTableIndex("userdata", tableIndex).isTopUserData())
    {
        ERROR(funcName << ": " << "not userdata: " << ll.getTopTypeName());
        return NULL;
    }
    
    auto ptr = static_cast<SWE_BinaryBuf**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

///////////////////////////////////////////////////////////
int SWE_binarybuf_zlib_compress(lua_State* L)
{
    // params: table binarybuf
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
	ll.pushNil();
	return 1;
    }

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	BinaryBuf res = Tools::zlibCompress(buf->data(), buf->size());

        ll.stackClear();
        ll.pushTable();
	SWE_binarybuf_create(L);

	buf = SWE_BinaryBuf::get(ll, -1, __FUNCTION__);
	buf->swap(res);

	ll.pushString("size").pushInteger(buf->size()).setTableIndex(-3);
    }
    else
    { 
        ERROR("userdata empty");
        ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_zlib_decompress(lua_State* L)
{
    // params: table binarybuf
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
	ll.pushNil();
	return 1;
    }

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	BinaryBuf res = Tools::zlibUncompress(buf->data(), buf->size());

        ll.stackClear();
        ll.pushTable();
	SWE_binarybuf_create(L);

	buf = SWE_BinaryBuf::get(ll, -1, __FUNCTION__);
	buf->swap(res);

	ll.pushString("size").pushInteger(buf->size()).setTableIndex(-3);
    }
    else
    { 
        ERROR("userdata empty");
        ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_base64_encode(lua_State* L)
{
    // params: table binarybuf
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
	ll.pushNil();
	return 1;
    }

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	BinaryBuf res = Tools::base64Encode(buf->data(), buf->size());

	ll.pushString(res.toString());
    }
    else
    { 
        ERROR("userdata empty");
        ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_base64_decode1(lua_State* L)
{
    // params: table binarybuf
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
	ll.pushNil();
	return 1;
    }

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	BinaryBuf res = Tools::base64Decode(buf->data(), buf->size());

        ll.stackClear();
        ll.pushTable();
	SWE_binarybuf_create(L);

	SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, -1, __FUNCTION__);
	buf->swap(res);

	ll.pushString("size").pushInteger(buf->size()).setTableIndex(-3);
    }
    else
    { 
        ERROR("userdata empty");
        ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_base64_decode2(lua_State* L)
{
    // params: string bas64
    LuaState ll(L);

    if(! ll.isStringIndex(1))
    {
        ERROR("string not found");
	ll.pushNil();
	return 1;
    }

    std::string base64 = ll.toStringIndex(1);

    if(base64.size())
    {
	BinaryBuf res = Tools::base64Decode(base64.c_str());

        ll.stackClear();
        ll.pushTable();
	SWE_binarybuf_create(L);

	SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, -1, __FUNCTION__);
	buf->swap(res);

	ll.pushString("size").pushInteger(buf->size()).setTableIndex(-3);
    }
    else
    { 
        ERROR("userdata empty");
        ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_base64_decode(lua_State* L)
{
    // params: table binarybuf or string bas64
    LuaState ll(L);

    if(ll.isTableIndex(1))
	return SWE_binarybuf_base64_decode1(L);
    else
    if(ll.isStringIndex(1))
	return SWE_binarybuf_base64_decode2(L);

    ERROR("unknown params");
    ll.pushNil();

    return 1;
}

int SWE_binarybuf_readfile1(lua_State* L)
{
    // params: table binarybuf, string
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
	ll.pushBoolean(false);
	return 1;
    }

    std::string filename = ll.toStringIndex(2);

    if(! Systems::isFile(filename))
	filename = SWE_Tools::toFullFileName(ll, filename);

    if(! Systems::isFile(filename))
    { 
        ERROR("file not found: " << filename);
	ll.pushBoolean(false);
	return 1;
    }

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	BinaryBuf res = Systems::readFile(filename);
	buf->swap(res);

	ll.pushInteger(buf->size()).setFieldTableIndex("size", 1);
	ll.pushBoolean(buf->size());
    }
    else
    { 
        ERROR("userdata empty");
	ll.pushBoolean(false);
    }

    return 1;
}

int SWE_binarybuf_readfile2(lua_State* L)
{
    // params: string
    LuaState ll(L);

    std::string filename = ll.toStringIndex(1);

    if(! Systems::isFile(filename))
	filename = SWE_Tools::toFullFileName(ll, filename);

    if(Systems::isFile(filename))
    {
	BinaryBuf res = Systems::readFile(filename);

        ll.stackClear();
        ll.pushTable();
	SWE_binarybuf_create(L);

	SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, -1, __FUNCTION__);
	buf->swap(res);

	ll.pushString("size").pushInteger(buf->size()).setTableIndex(-3);
    }
    else
    { 
        ERROR("file not found: " << filename);
	ll.pushBoolean(false);
    }

    return 1;
}

int SWE_binarybuf_readfile(lua_State* L)
{
    // params: table binarybuf or string
    LuaState ll(L);

    if(ll.isTableIndex(1))
	return SWE_binarybuf_readfile1(L);
    else
    if(ll.isStringIndex(1))
	return SWE_binarybuf_readfile2(L);
        
    ERROR("unknown params");
    ll.pushNil();

    return 1;
}

int SWE_binarybuf_savefile(lua_State* L)
{
    // params: table binarybuf, string
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
	ll.pushBoolean(false);
	return 1;
    }

    if(! ll.isStringIndex(2))
    {
        ERROR("string not found");
	ll.pushBoolean(false);
	return 1;
    }

    std::string filename = ll.toStringIndex(2);
    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	bool res = Systems::saveFile(*buf, SWE_Tools::toFullFileName(ll, filename));
	ll.pushBoolean(res);
    }
    else
    { 
        ERROR("userdata empty");
	ll.pushBoolean(false);
    }

    return 1;
}

int SWE_binarybuf_tostring(lua_State* L)
{
    // params: table binarybuf
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
	ll.pushNil();
	return 1;
    }

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	ll.pushString(buf->toString());
    }
    else
    { 
        ERROR("userdata empty");
        ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_setbyte(lua_State* L)
{
    // params: table binarybuf, int offset, int byte
    LuaState ll(L);
    int params = ll.stackSize();

    if(3 > params || ! ll.isTableIndex(1) || ! ll.isIntegerIndex(2) || ! ll.isIntegerIndex(3))
    {
        ERROR("require minimum params: " << "table binarybuf, int offset, int byte");
        return 0;
    }

    int offset = ll.toIntegerIndex(2);
    int byte = ll.toIntegerIndex(3);
    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	if(offset < buf->size())
	{
	    buf->operator[](offset) = byte;
	    ll.pushBoolean(true);
	}
	else
	if(offset == buf->size())
	{
	    buf->push_back(byte);
	    ll.pushInteger(buf->size()).setFieldTableIndex("size", 1);
	    ll.pushBoolean(true);
	}
	else
	{
    	    ERROR("out of range");
	    ll.pushBoolean(false);
	}
    }
    else
    { 
        ERROR("userdata empty");
	ll.pushBoolean(false);
    }

    return 1;
}

int SWE_binarybuf_getbyte(lua_State* L)
{
    // params: table binarybuf, int offset
    LuaState ll(L);
    int params = ll.stackSize();

    if(2 > params || ! ll.isTableIndex(1) || ! ll.isIntegerIndex(2))
    {
        ERROR("require minimum params: " << "table binarybuf, int offset");
	ll.pushNil();
        return 1;
    }

    int offset = ll.toIntegerIndex(2);
    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	if(offset < buf->size())
	{
	    ll.pushInteger(buf->operator[](offset));
	}
	else
	{
    	    ERROR("out of range");
	    ll.pushNil();
	}
    }
    else
    { 
        ERROR("userdata empty");
	ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_getbytes(lua_State* L)
{
    // params: table binarybuf, int offset, int size
    LuaState ll(L);
    int params = ll.stackSize();

    if(3 > params || ! ll.isTableIndex(1) || ! ll.isIntegerIndex(2) || ! ll.isIntegerIndex(2))
    {
        ERROR("require minimum params: " << "table binarybuf, int offset, int size");
	ll.pushNil();
        return 1;
    }

    int offset = ll.toIntegerIndex(2);
    int size = ll.toIntegerIndex(3);

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	if(offset + size < buf->size() + 1)
	{
	    ll.stackClear();
    	    ll.pushTable();
	    SWE_binarybuf_create(L);

	    SWE_BinaryBuf* res = SWE_BinaryBuf::get(ll, -1, __FUNCTION__);
	    res->assign(buf->data() + offset, buf->data() + offset + size);

	    ll.pushString("size").pushInteger(buf->size()).setTableIndex(-3);
	}
	else
	{
    	    ERROR("out of range");
	    ll.pushNil();
	}

    }
    else
    { 
        ERROR("userdata empty");
        ll.pushNil();
    }

    return 1;
}

int SWE_binarybuf_setbytes(lua_State* L)
{
    // params: table binarybuf, int offset, table binarybuf, int offset, int size

    LuaState ll(L);
    int params = ll.stackSize();

    if(5 > params || ! ll.isTableIndex(1) || ! ll.isIntegerIndex(2) ||
	! ll.isTableIndex(3) || ! ll.isIntegerIndex(4) || ! ll.isIntegerIndex(5))
    {
        ERROR("require minimum params: " << "table binarybuf, int offset, table binarybuf, int offset, int size");
	ll.pushBoolean(false);
        return 1;
    }

    SWE_BinaryBuf* buf1 = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);
    SWE_BinaryBuf* buf2 = SWE_BinaryBuf::get(ll, 3, __FUNCTION__);

    int offset1 = ll.toIntegerIndex(2);
    int offset2 = ll.toIntegerIndex(4);
    int size = ll.toIntegerIndex(5);

    if(buf1 && buf2)
    {
	if(offset2 + size < buf2->size() + 1 &&
	    offset1 < buf1->size() + 1)
	{
	    for(int pos = 0; pos < size; ++pos)
	    {
		if(offset1 + pos < buf1->size() + 1)
		    buf1->operator[](offset1 + pos) = buf2->operator[](offset2 + pos);
		else
		    buf1->push_back(buf2->operator[](offset2 + pos));
	    }

	    ll.pushInteger(buf1->size()).setFieldTableIndex("size", 1);
	    ll.pushBoolean(true);
	}
	else
	{
    	    ERROR("out of range");
	    ll.pushBoolean(false);
	}
    }
    else
    { 
        ERROR("userdata empty");
	ll.pushBoolean(false);
    }

    return 1;
}

int SWE_binarybuf_getcrc32b(lua_State* L)
{
    // params: table binarybuf, int offset
    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found");
        return 0;
    }

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	ll.pushInteger(buf->crc32b());
	return 1;
    }
    else
    { 
        ERROR("userdata empty");
    }

    return 0;
}

const struct luaL_Reg SWE_binarybuf_functions[] = {
    { "ZlibCompress", SWE_binarybuf_zlib_compress },	// [table binarybuf], table binarybuf
    { "ZlibDecompress", SWE_binarybuf_zlib_decompress },// [table binarybuf], table binarybuf
    { "Base64Decode", SWE_binarybuf_base64_decode },	// [table binarybuf], table binarybuf | string base64
    { "Base64Encode", SWE_binarybuf_base64_encode },	// [string base64], table binarybuf
    { "ReadFromFile", SWE_binarybuf_readfile },		// [bool], table binarybuf, string filename
    { "SaveToFile", SWE_binarybuf_savefile },		// [bool], table binarybuf, string filename
    { "ToString", SWE_binarybuf_tostring },		// [string base64], table binarybuf
    { "SetByte", SWE_binarybuf_setbyte },		// [bool], table binarybuf, int offset, int byte
    { "GetByte", SWE_binarybuf_getbyte },		// [int byte], table binarybuf, int offset
    { "SetBytes", SWE_binarybuf_setbytes },		// [bool], table binarybuf, int offset, table binarybuf, int offset, int size
    { "GetBytes", SWE_binarybuf_getbytes },		// [table binarybuf], table binarybuf, int offset, int size
    { "GetCRC32b", SWE_binarybuf_getcrc32b },		// [int crc], table binarybuf
    { NULL, NULL }
};

void SWE_BinaryBuf::registers(LuaState & ll)
{
    // SWE.BinaryBuf
    ll.pushTable("SWE.BinaryBuf");
    ll.setFunctionsTableIndex(SWE_binarybuf_functions, -1);

    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_binarybuf_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}

int SWE_binarybuf_create(lua_State* L)
{
    // SWE.BinaryBuf(self, string)
    LuaState ll(L);

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_BinaryBuf**>(ll.pushUserData(sizeof(SWE_BinaryBuf*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_binarybuf_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_binarybuf_functions, -1);

    // SWE_BinaryBuf: length, fill value
    if(ll.isIntegerIndex(2) && ll.isIntegerIndex(3))
    {
	int bsz = ll.toIntegerIndex(2);
	int bvl = ll.toIntegerIndex(3);

	*ptr = new SWE_BinaryBuf(L, bsz, bvl);
    }
    else
    // SWE_BinaryBuf: string
    if(ll.isStringIndex(2))
    {
	*ptr = new SWE_BinaryBuf(L, ll.toStringIndex(2));
    }
    else
    // SWE_BinaryBuf: pointer, size
    if((ll.isUserDataIndex(2) || ll.isLightUserDataIndex(2)) && ll.isIntegerIndex(3))
    {
	void* buf = ll.toUserDataIndex(2);
	int bsz = ll.toIntegerIndex(3);

	*ptr = new SWE_BinaryBuf(L, reinterpret_cast<const u8*>(buf), bsz);
    }
    else
    // SWE_BinaryBuf: empty
    {
	*ptr = new SWE_BinaryBuf(L);
    }

    if(ptr && *ptr)
	DEBUG(String::hex64(reinterpret_cast<u64>(ptr)) << ": [" << String::hex64(reinterpret_cast<u64>(*ptr)) << "]");

    ll.pushString("size").pushInteger((*ptr)->size()).setTableIndex(-3);

    return 1;
}

int SWE_binarybuf_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_BinaryBuf**>(ll.getTopUserData());
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

