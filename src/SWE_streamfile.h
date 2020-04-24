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

#ifndef _SWE_LUA_STREAMFILE_
#define _SWE_LUA_STREAMFILE_

#include "SWE_global.h"

struct lua_State;

int SWE_streamfile_create(lua_State*);
int SWE_streamfile_destroy(lua_State*);

class SWE_StreamFile : public StreamFile
{
public:
    SWE_StreamFile() {}
    SWE_StreamFile(const std::string & file, const std::string & mode) : StreamFile(file, mode.c_str()) {}

    static SWE_StreamFile* get(LuaState &, int tableIndex, const char* funcName);
    static void registers(LuaState &);
};

#endif
