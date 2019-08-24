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

#include "SWE_rect.h"

int SWE_point_create(lua_State*);
int SWE_size_create(lua_State*);
int SWE_rect_create(lua_State*);

/////////////////////////////////////////////////////////////////////
int SWE_rect_tostring(lua_State* L)
{
    // params: swe_rect

    LuaState ll(L);

    if(ll.isTableIndex(1) && 0 == ll.popFieldTableIndex("__type", 1).compare("swe.rect"))
    {
	int rx = ll.getFieldTableIndex("posx", 1).getTopInteger();
	int ry = ll.getFieldTableIndex("posy", 1).getTopInteger();
	int rw = ll.getFieldTableIndex("width", 1).getTopInteger();
	int rh = ll.getFieldTableIndex("height", 1).getTopInteger();
	ll.stackPop(4);

	std::string str = StringFormat("{ \"posx\": %1, \"posy\": %2, \"width\": %3, \"height\": %4 }").arg(rx).arg(ry).arg(rw).arg(rh);
	ll.pushString(str);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_rect_unpack(lua_State* L)
{
    // params: swe_rect

    LuaState ll(L);

    if(ll.isTableIndex(1) && 0 == ll.popFieldTableIndex("__type", 1).compare("swe.rect"))
    {
	int rx = ll.getFieldTableIndex("posx", 1).getTopInteger();
	int ry = ll.getFieldTableIndex("posy", 1).getTopInteger();
	int rw = ll.getFieldTableIndex("width", 1).getTopInteger();
	int rh = ll.getFieldTableIndex("height", 1).getTopInteger();
	ll.stackPop(4);

	ll.pushInteger(rx);
	ll.pushInteger(ry);
	ll.pushInteger(rw);
	ll.pushInteger(rh);

	return 4;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

const struct luaL_Reg SWE_rect_functions[] = {
    { "ToString", SWE_rect_tostring }, 		// [string], swe_rect
    { "Unpack", SWE_rect_unpack }, 		// [list int], swe_rect
    { NULL, NULL }
};

int SWE_rect_create(lua_State* L)
{
    // empty params
    LuaState ll(L);

    int rx = ll.toIntegerIndex(2);
    int ry = ll.toIntegerIndex(3);
    int rw = ll.toIntegerIndex(4);
    int rh = ll.toIntegerIndex(5);

    ll.pushTable();
    ll.pushString("swe.rect").setFieldTableIndex("__type", -2);
    ll.pushInteger(rx).setFieldTableIndex("posx", -2);
    ll.pushInteger(ry).setFieldTableIndex("posy", -2);
    ll.pushInteger(rw).setFieldTableIndex("width", -2);
    ll.pushInteger(rh).setFieldTableIndex("height", -2);

    // set functions
    ll.setFunctionsTableIndex(SWE_rect_functions, -1);

    return 1;
}

void SWE_Rect::registers(LuaState & ll)
{
    // SWE.Rect
    ll.pushTable("SWE.Rect");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_rect_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}

/////////////////////////////////////////////////////////////////////
int SWE_point_tostring(lua_State* L)
{
    // params: swe_point

    LuaState ll(L);

    if(ll.isTableIndex(1) && 0 == ll.popFieldTableIndex("__type", 1).compare("swe.point"))
    {
	int px = ll.getFieldTableIndex("posx", 1).getTopInteger();
	int py = ll.getFieldTableIndex("posy", 1).getTopInteger();
	ll.stackPop(4);

	std::string str = StringFormat("{ \"posx\": %1, \"posy\": %2 }").arg(px).arg(py);
	ll.pushString(str);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_point_unpack(lua_State* L)
{
    // params: swe_point

    LuaState ll(L);

    if(ll.isTableIndex(1) && 0 == ll.popFieldTableIndex("__type", 1).compare("swe.point"))
    {
	int px = ll.getFieldTableIndex("posx", 1).getTopInteger();
	int py = ll.getFieldTableIndex("posy", 1).getTopInteger();
	ll.stackPop(2);

	ll.pushInteger(px);
	ll.pushInteger(py);

	return 2;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

const struct luaL_Reg SWE_point_functions[] = {
    { "ToString", SWE_point_tostring }, 	// [string], swe_point
    { "Unpack", SWE_point_unpack }, 		// [list int], swe_point
    { NULL, NULL }
};

int SWE_point_create(lua_State* L)
{
    // empty params
    LuaState ll(L);

    int px = ll.toIntegerIndex(2);
    int py = ll.toIntegerIndex(3);

    ll.pushTable();
    ll.pushString("swe.point").setFieldTableIndex("__type", -2);
    ll.pushInteger(px).setFieldTableIndex("posx", -2);
    ll.pushInteger(py).setFieldTableIndex("posy", -2);

    // set functions
    ll.setFunctionsTableIndex(SWE_point_functions, -1);

    return 1;
}

void SWE_Point::registers(LuaState & ll)
{
    // SWE.Point
    ll.pushTable("SWE.Point");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_point_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}

/////////////////////////////////////////////////////////////////////
int SWE_size_tostring(lua_State* L)
{
    // params: swe_size

    LuaState ll(L);

    if(ll.isTableIndex(1) && 0 == ll.popFieldTableIndex("__type", 1).compare("swe.size"))
    {
	int sw = ll.getFieldTableIndex("width", 1).getTopInteger();
	int sh = ll.getFieldTableIndex("height", 1).getTopInteger();
	ll.stackPop(2);

	std::string str = StringFormat("{ \"width\": %1, \"height\": %2 }").arg(sw).arg(sh);
	ll.pushString(str);

	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

int SWE_size_unpack(lua_State* L)
{
    // params: swe_size

    LuaState ll(L);

    if(ll.isTableIndex(1) && 0 == ll.popFieldTableIndex("__type", 1).compare("swe.size"))
    {
	int sw = ll.getFieldTableIndex("width", 1).getTopInteger();
	int sh = ll.getFieldTableIndex("height", 1).getTopInteger();
	ll.stackPop(2);

	ll.pushInteger(sw);
	ll.pushInteger(sh);

	return 2;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}

const struct luaL_Reg SWE_size_functions[] = {
    { "ToString", SWE_size_tostring }, 		// [string], swe_size
    { "Unpack", SWE_size_unpack }, 		// [list int], swe_size
    { NULL, NULL }
};

int SWE_size_create(lua_State* L)
{
    // empty params
    LuaState ll(L);

    int sw = ll.toIntegerIndex(2);
    int sh = ll.toIntegerIndex(3);

    ll.pushTable();
    ll.pushString("swe.size").setFieldTableIndex("__type", -2);
    ll.pushInteger(sw).setFieldTableIndex("width", -2);
    ll.pushInteger(sh).setFieldTableIndex("height", -2);

    // set functions
    ll.setFunctionsTableIndex(SWE_size_functions, -1);

    return 1;
}

void SWE_Size::registers(LuaState & ll)
{
    // SWE.Rect
    ll.pushTable("SWE.Size");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_size_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
