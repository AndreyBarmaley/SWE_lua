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

#include <unistd.h>
#include <functional>
#include "engine.h"

extern "C" {
    int luaopen_SWE(lua_State* L);
}

bool findStorage(const std::string & str)
{
    return 0 == str.compare(0, 8, "/storage");
}

int main(int argc, char** argv)
{
    Systems::setLocale(LC_ALL, "");
    Systems::setLocale(LC_NUMERIC, "C"); // decimal point

#ifndef ANDROID
    try
#endif
    {
	const char* app = "SWE_lua";
	std::string cwd = Systems::dirname(argv[0]);

	LogWrapper::init(app, argv[0]);
	Engine::setDebugMode(true);

#if defined (_GNU_SOURCE) && ! defined (ANDROID) && ! defined(__MINGW32CE__)
	if(cwd == ".")
	{
	    char* ptr = get_current_dir_name();
	    if(ptr)
	    {
		cwd = ptr;
		free(ptr);
	    }
	}
#endif

	const char* start = 1 < argc ? argv[1] : Systems::environment("SWE_START");
	if(! start) start = "start.lua";

	std::string runfile;
	StringList dirs = Systems::shareDirectories(app);

#ifdef ANDROID
	Systems::assetsInit();

	// sync assets
	for(auto it = dirs.rbegin(); it != dirs.rend(); ++it)
	{
	    if(0 == ((*it).compare(0, 8, "/storage")))
	    {
		const std::string & swedir = *it;
		if(! Systems::isDirectory(swedir)) Systems::makeDirectory(swedir);
		if(! Systems::isDirectory(swedir)) continue;

		const StringList & assets = Systems::assetsList();
		for(auto as = assets.begin(); as != assets.end(); ++as)
		{
		    if((*as).substr((*as).size() - 4, 4) != ".lua") continue;

		    std::string body;
		    if(Systems::readFile2String(*as, body))
		    {
			std::string dstfile = Systems::concatePath(*it, *as);
			std::string dstdir = Systems::dirname(dstfile);

			if(! Systems::isDirectory(dstdir)) Systems::makeDirectory(dstdir);
			if(*as == start) runfile = dstfile;

			Systems::saveString2File(body, dstfile);
			DEBUG("sync: " << *as << " => " << dstfile);
		    }
		}
		break;
	    }
	}
#else
	if(Systems::isFile(start))
	    runfile = start;

	if(cwd.size()) 
	    dirs.push_back(cwd);
#endif

	for(auto it = dirs.begin(); it != dirs.end(); ++it)
	{
	    DEBUG("shares: " << *it);

	    if(runfile.empty())
	    {
		std::string check = Systems::concatePath(*it, start);
		if(Systems::isFile(check))
		{
		    DEBUG("start found: " << check);
		    runfile = check;
		    break;
		}
	    }
	}

	// check params
	if(runfile.empty())
	{
	    ERROR("file not found runfile");
	    return EXIT_FAILURE;
	}

#if defined ANDROID
	cwd = Systems::dirname(runfile);
	if(cwd.size()) chdir(cwd.c_str());
#endif

        LuaState ll = LuaState::newState();

	if(cwd.size())
	    ll.registerDirectory(cwd);

        luaopen_SWE(ll.L());

	if(cwd.size())
	{
	    // set SWE.getcwd
	    if(ll.pushTable("SWE").isTopTable())
	    {
		DEBUG("SWE.getcwd: " << cwd);
		ll.pushString(cwd);
		ll.setFieldTableIndex("getcwd", -2);
	    }
    	    ll.stackPop();
	}

        ll.doFile(runfile);

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
