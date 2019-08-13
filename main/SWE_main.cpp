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

#include "engine.h"

extern "C" {
    int luaopen_SWE(lua_State* L);
}

int main(int argc, char** argv)
{
    Systems::setLocale(LC_ALL, "");
    Systems::setLocale(LC_NUMERIC, "C"); // decimal point

#ifndef ANDROID
    try
#endif
    {
	LogWrapper::init("SWE_test", argv[0]);

	const char* start = 1 < argc ? argv[1] : Systems::environment("SWE_START");
	if(! start) start = "start.lua";

	std::string file = ! Systems::isFile(start) ?
		Systems::concatePath(Systems::dirname(argv[0]), start) : start;

	// check params
	if(! Systems::isFile(file))
	{
	    ERROR("file not found: " << file);
	    return EXIT_FAILURE;
	}

        LuaState ll = LuaState::newState();
	ll.registerDirectory(Systems::dirname(argv[0]));

        luaopen_SWE(ll.L());

	ll.pushTable("SWE.ARGS");
	for(int it = 0; it < argc; ++it) if(argv[it])
	    ll.pushString(argv[it]).setFieldTableIndex(String::number(it), -2);

	ll.stackPop();
        ll.doFile(file);

        if(ll.isTopString())
            ERROR(ll.getTopString());

        LuaState::closeState(ll);
    }
#ifndef ANDROID
    catch(Engine::exception &)
    {
    }
#endif

    return EXIT_SUCCESS;
}
