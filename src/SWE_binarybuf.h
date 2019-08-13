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

#ifndef _SWE_LUA_BINARYBUF_
#define _SWE_LUA_BINARYBUF_

#include "engine.h"

struct lua_State;

class SWE_BinaryBuf : public BinaryBuf
{
protected:
    LuaState	ll;


public:
    SWE_BinaryBuf(lua_State* L) : ll(L) {}
    SWE_BinaryBuf(lua_State*, const std::string &);
    SWE_BinaryBuf(lua_State*, size_t, int);
    SWE_BinaryBuf(lua_State*, const u8*, size_t);

    static SWE_BinaryBuf* get(LuaState &, int tableIndex, const char* funcName);

    static void registers(LuaState & ll);
};

#endif
