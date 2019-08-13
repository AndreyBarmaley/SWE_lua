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

#include "SWE_keys.h"

int SWE_key_lower(lua_State* L)
{
    // params: int key
    LuaState ll(L);
    
    if(! ll.isTopInteger())
    {
        ERROR("integer not found");
        return 0;
    }

    int res = Key::lower(ll.getTopInteger());
    ll.pushInteger(res);

    return 1;
}

int SWE_key_upper(lua_State* L)
{
    // params: int key
    LuaState ll(L);
    
    if(! ll.isTopInteger())
    {
        ERROR("integer not found");
        return 0;
    }

    int res = Key::upper(ll.getTopInteger());
    ll.pushInteger(res);

    return 1;
}

int SWE_key_tochar(lua_State* L)
{
    // params: int key
    LuaState ll(L);
    
    if(! ll.isTopInteger())
    {
        ERROR("integer not found");
        return 0;
    }

    int res = Key::toChar(ll.getTopInteger());
    ll.pushInteger(res);

    return 1;
}

int SWE_key_tostring(lua_State* L)
{
    // params: int key
    LuaState ll(L);
    
    if(! ll.isTopInteger())
    {
        ERROR("integer not found");
        return 0;
    }

    std::string res = Key::toName(ll.getTopInteger());
    ll.pushString(res);

    return 1;
}

int SWE_key_tokey(lua_State* L)
{
    // params: string keyname
    LuaState ll(L);
    
    if(! ll.isTopString())
    {
        ERROR("string not found");
        return 0;
    }

    int res = Key::toKey(ll.getTopString());
    ll.pushInteger(res);

    return 1;
}

const struct luaL_Reg SWE_keys_functions[] = {
    { "Lower", SWE_key_lower },		// [int key], int key
    { "Upper", SWE_key_upper },		// [int key], int key
    { "ToChar", SWE_key_tochar },	// [int char], int key
    { "ToString", SWE_key_tostring },	// [string name], int key
    { "ToKey", SWE_key_tokey },		// [int key], string name
    { NULL, NULL }
};

void SWE_Key::registers(LuaState & ll)
{
    // SWE.Key
    ll.pushTable("SWE.Key");
    ll.setFunctionsTableIndex(SWE_keys_functions, -1);

    // SWE.Key: insert values
    for(auto it = Key::allKeys(); (*it).name; ++it)
        ll.pushInteger((*it).key).setFieldTableIndex((*it).name, -2);
    ll.stackPop();
}
