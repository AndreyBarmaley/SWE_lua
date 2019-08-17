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

#include "SWE_color.h"

int SWE_color_index(lua_State* L)
{
    // params: table, string name
    LuaState ll(L);

    std::string color = String::toLower(ll.getTopString());
    return ll.getFieldTableIndex(color, 1).isTopNil() ? 0 : 1;
}

int SWE_color_tostring(lua_State* L)
{
    // params: int key
    LuaState ll(L);

    if(! ll.isTopInteger())
    {
        ERROR("color not found");
        return 0;
    }

    ARGB color = ll.getTopInteger();
    ll.pushString(Color(color).toString());

    return 1;
}

const struct luaL_Reg SWE_colors_functions[] = {
    { "ToString", SWE_color_tostring },	// [string], int key
    { NULL, NULL }
};

void SWE_Color::registers(LuaState & ll)
{
    // SWE.Color
    ll.pushTable("SWE.Color");
    ll.setFunctionsTableIndex(SWE_colors_functions, -1);

    // SWE.Color: insert values
    for(int col = Color::Black; col <= Color::Transparent; ++col)
        ll.pushInteger(Color(col).getARGB()).setFieldTableIndex(Color::name(static_cast<Color::color_t>(col)), -2);

    // SWE.Color: set metatable: __index
    ll.pushTable(0, 1).pushFunction(SWE_color_index).setFieldTableIndex("__index", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
