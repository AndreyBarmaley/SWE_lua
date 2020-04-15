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

#include "SWE_unicodestring.h"

SWE_UnicodeString* SWE_UnicodeString::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.unicodestring"))
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
    
    auto ptr = static_cast<SWE_UnicodeString**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

///////////////////////////////////////////////////////////
int SWE_unicodestring_pushback(lua_State* L)
{
    // params: table unicodestring, int char,int char .. int char
    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
	int params = ll.stackSize();

	for(int ii = 2; ii <= params; ++ii)
	{
	    int ch = ll.toIntegerIndex(ii);
	    ustr->push_back(ch);
	}

	ll.pushInteger(ustr->size()).setFieldTableIndex("size", 1);
	ll.pushBoolean(true);

	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_unicodestring_setchar(lua_State* L)
{
    // params: table unicodestring, int pos, int char, int char ... int char
    LuaState ll(L);
    int params = ll.stackSize();
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
        int pos = ll.toIntegerIndex(2);

        if(0 <= pos && pos <= ustr->size())
        {
            for(int ii = 3; ii <= params; ++ii)
            {
                int ch = ll.toIntegerIndex(ii);
                if(pos < ustr->size())
                    ustr->operator[](pos) = ch;
                else
                    ustr->push_back(ch);
                pos += 1;
            }

            ll.pushInteger(ustr->size()).setFieldTableIndex("size", 1);
            ll.pushBoolean(true);
        }
        else
        {
            ERROR("out of range");
            ll.pushBoolean(false);
        }
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_unicodestring_getchar(lua_State* L)
{
    // params: table unicodestring, int pos
    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
	int pos = ll.toIntegerIndex(2);

	if(0 <= pos && pos < ustr->size())
	{
	    ll.pushInteger(ustr->operator[](pos));
	}
	else
	{
    	    ERROR("out of range");
	    ll.pushInteger(0);
	}

	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_unicodestring_insert(lua_State* L)
{
    // params: table unicodestring, int pos, (unicodestring, subpos, sublen), (int count, int char)
    LuaState ll(L);

    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
	int pos = ll.toIntegerIndex(2);

        if(0 > pos || pos > ustr->size())
        {
            ERROR("out of range");
            ll.pushBoolean(false);
        }
        else
	// params: int count, int char
	if(ll.isNumberIndex(3))
	{
	    int count = ll.toIntegerIndex(3);
	    int ch = ll.toIntegerIndex(4);

	    ustr->insert(pos, count, ch);
	    ll.pushInteger(ustr->size()).setFieldTableIndex("size", 1);
	    ll.pushBoolean(true);
	}
	else
	// params: table unicodestring, int subpos, int sublen
	if(ll.isTableIndex(3))
	{
	    SWE_UnicodeString* ustr2 = SWE_UnicodeString::get(ll, 3, __FUNCTION__);
	    if(ustr2)
	    {
		int params = ll.stackSize();
		if(3 < params)
		{
		    int subpos = ll.toIntegerIndex(4);
		    int sublen = ll.toIntegerIndex(5);

		    if(0 <= subpos && subpos < ustr2->size())
		    {
			if(sublen <= 0 || subpos + sublen > ustr2->size())
			    sublen = ustr2->size() - subpos;

			ustr->insert(pos, *ustr2, subpos, sublen);
			ll.pushInteger(ustr->size()).setFieldTableIndex("size", 1);
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
		    ustr->insert(pos, *ustr2);
		    ll.pushInteger(ustr->size()).setFieldTableIndex("size", 1);
		    ll.pushBoolean(true);
		}
	    }
	    else
	    {
		ERROR("table not found" << ": " << "swe.unicodestring");
		ll.pushBoolean(false);
	    }
	}

	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_unicodestring_substring(lua_State* L)
{
    // params: table unicodestring, int pos, int len
    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
	int pos = ll.toIntegerIndex(2);
	int len = ll.toIntegerIndex(3);

	if(0 <= pos && pos < ustr->size())
	{
	    if(len <= 0 || pos + len > ustr->size())
		len = ustr->size() - pos;

	    ll.stackClear();
    	    ll.pushTable();
	    SWE_unicodestring_create(L);

	    SWE_UnicodeString* res = SWE_UnicodeString::get(ll, -1, __FUNCTION__);
	    res->assign(ustr->begin() + pos, ustr->begin() + pos + len);

	    ll.pushString("size").pushInteger(res->size()).setTableIndex(-3);
	}
	else
	{
    	    ERROR("out of range" << ", " << pos << ", " << ustr->size());
	    ll.pushNil();
	}

	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_unicodestring_erase(lua_State* L)
{
    // params: table unicodestring, int size, int val
    LuaState ll(L);
    int params = ll.stackSize();
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
	int pos = ll.toIntegerIndex(2);
	int count = 3 > params ? 1 : ll.toIntegerIndex(3);

	if(0 <= pos && pos < ustr->size() && 0 < count && pos + count <= ustr->size())
	{
	    if(1 == count)
		ustr->erase(ustr->begin() + pos);
	    else
		ustr->erase(ustr->begin() + pos, ustr->begin() + pos + count);

	    ll.pushString("size").pushInteger(ustr->size()).setTableIndex(1);
	    ll.pushBoolean(true);
	}
	else
	{
    	    ERROR("out of range" << ", " << pos << ", " << ustr->size());
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

int SWE_unicodestring_resize(lua_State* L)
{
    // params: table unicodestring, int size, int val
    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
	int size = ll.toIntegerIndex(2);

	if(0 < size)
	{
	    int val = ll.toIntegerIndex(3);
	    ustr->resize(size, val);
	    ll.pushString("size").pushInteger(ustr->size()).setTableIndex(1);
	    ll.pushBoolean(true);
	}
	else
	if(0 == size)
	{
	    ustr->clear();
	    ll.pushString("size").pushInteger(ustr->size()).setTableIndex(1);
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

int SWE_unicodestring_to_cstring(lua_State* L)
{
    // params: table unicodestring
    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
        ll.pushString(ustr->toString());
        return 1;
    }
    
    ERROR("userdata empty");
    return 0;
}

int SWE_unicodestring_clear(lua_State* L)
{
    // params: table unicodestring, int pos
    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr && 0 < ustr->size())
    {
	ustr->clear();
	ll.pushInteger(0).setFieldTableIndex("size", -2);
    }
    else
    {
	ERROR("userdata empty");
    }
    return 0;
}

int SWE_unicodestring_to_json(lua_State* L)
{
    // params: swe_unicodestring

    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
        std::string json = StringFormat("[%1]").arg(ustr->toHexString(",", true));
        ll.pushString(json);

        return 1;
    }
    
    ERROR("userdata empty");
    return 0;
}           

int SWE_unicodestring_tostring(lua_State* L)
{
    // params: swe_unicodestring

    LuaState ll(L);
    SWE_UnicodeString* ustr = SWE_UnicodeString::get(ll, 1, __FUNCTION__);

    if(ustr)
    {
        std::string str = StringFormat("%1[%2]").arg("swe.unicodestring").arg(ustr->toHexString(",", true));
        ll.pushString(str);

        return 1;
    }
    
    ERROR("userdata empty");
    return 0;
}           

const struct luaL_Reg SWE_unicodestring_functions[] = {
    { "PushBack", SWE_unicodestring_pushback },		// [bool], table unicodestring, int char, int char .. int char
    { "SetChar", SWE_unicodestring_setchar },		// [bool], table unicodestring, int pos, int char, int char .. int char
    { "GetChar", SWE_unicodestring_getchar },		// [int char], table unicodestring, int pos
    { "Insert", SWE_unicodestring_insert },		// [bool], table unicodestring, int pos, (unicodestring), (int count, int char)
    { "SubString", SWE_unicodestring_substring },	// [table unicodestring], table unicodestring, int pos, int len
    { "ToUtf8String", SWE_unicodestring_to_cstring },   // [string], table unicodestring
    { "ToJson", SWE_unicodestring_to_json },		// [string], table unicodestring
    { "Clear", SWE_unicodestring_clear },		// [void], table unicodestring
    { "Resize", SWE_unicodestring_resize },		// [bool], table unicodestring, int size, int val
    { "Erase", SWE_unicodestring_erase },		// [bool], table unicodestring, int pos, int count
    { NULL, NULL }
};

void SWE_UnicodeString::registers(LuaState & ll)
{
    // SWE.UnicodeString
    ll.pushTable("SWE.UnicodeString");
    ll.setFunctionsTableIndex(SWE_unicodestring_functions, -1);

    // set metatable: __call
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_unicodestring_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}

int SWE_unicodestring_create(lua_State* L)
{
    // SWE.UnicodeString(self, string)
    LuaState ll(L);

    ll.pushTable();

    // set: tostring
    //ll.pushTable(0, 1);
    //ll.pushFunction(SWE_unicodestring_tostring).setFieldTableIndex("__tostring", -2);
    //ll.setMetaTableIndex(-2);

    // set userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_UnicodeString**>(ll.pushUserData(sizeof(SWE_UnicodeString*)));

    // set metatable: __gc to userdata
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_unicodestring_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_unicodestring_functions, -1);

    // SWE_UnicodeString: length, fill value
    if(ll.isNumberIndex(2) && ll.isNumberIndex(3))
    {
	int bsz = ll.toIntegerIndex(2);
	int bvl = ll.toIntegerIndex(3);

	*ptr = new SWE_UnicodeString(bsz, bvl);
    }
    else
    // SWE_UnicodeString: string
    if(ll.isStringIndex(2))
    {
	std::string str = ll.toStringIndex(2);
	*ptr = new SWE_UnicodeString(str);
    }
    else
    // SWE_UnicodeString: empty
    {
	*ptr = new SWE_UnicodeString();
    }

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

    ll.pushString("__type").pushString("swe.unicodestring").setTableIndex(-3);
    ll.pushString("size").pushInteger((*ptr)->size()).setTableIndex(-3);

    return 1;
}

int SWE_unicodestring_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_UnicodeString**>(ll.getTopUserData());
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

