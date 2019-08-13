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

#ifndef _SWE_LUA_TEXTURE_
#define _SWE_LUA_TEXTURE_

#include "engine.h"

struct lua_State;

class SWE_Texture : public Texture
{
protected:
    LuaState	ll;

public:
    SWE_Texture(lua_State*);
    SWE_Texture(lua_State*, const Texture &);

    static SWE_Texture renderRect(lua_State*, const ARGB & rectCol, const ARGB & fillCol, const Size &, int thickness);
    static SWE_Texture renderText(lua_State*, const FontRender &, const UnicodeString &, const ARGB & textCol, const ARGB & backCol);
    static SWE_Texture renderText(lua_State*, const FontRender &, const UCString &);

    static SWE_Texture* get(LuaState &, int tableIndex, const char* funcName);

    static void registers(LuaState & ll);
};

#endif
