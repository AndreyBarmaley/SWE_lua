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

#include "SWE_binarybuf.h"
#include "SWE_translation.h"

int SWE_translation_bindomain(lua_State* L)
{
    // params: swe_translation
    LuaState ll(L);

    std::string domain = ll.toStringIndex(1);
    bool res = false;

    if(ll.isTableIndex(2))
    {
	SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 2, __FUNCTION__);
	if(buf)
	{
    	    res = Translation::bindDomain(domain, *buf);
	}
	else
	{
	    ERROR("table not found: " << "swe.binarybuf");
	}
    }
    else
    if(ll.isStringIndex(2))
    {
	std::string filemo = ll.toStringIndex(2);

	if(Systems::isFile(filemo))
	{
    	    res = Translation::bindDomain(domain, filemo);
	}
	else
	{
	    ERROR("file not found: " << filemo);
	}
    }

    ll.pushBoolean(res);
    return 1;
}

int SWE_translation_setdomain(lua_State* L)
{
    // params: swe_translation
    LuaState ll(L);

    std::string domain = ll.toStringIndex(1);
    bool res = Translation::setDomain(domain);
    ll.pushBoolean(res);

    return 1;
}

int SWE_translation_setstrip(lua_State* L)
{
    // params: swe_translation
    LuaState ll(L);

    int strip = ll.toIntegerIndex(1);
    if(strip) Translation::setStripContext(strip);

    return 0;
}

int SWE_translation_gettext(lua_State* L)
{
    // params: swe_translation
    LuaState ll(L);

    std::string text = ll.toStringIndex(1);
    const char* res  = Translation::gettext(text.c_str());
    ll.pushString(res);

    return 1;
}

int SWE_translation_dgettext(lua_State* L)
{
    // params: swe_translation
    LuaState ll(L);

    std::string domain = ll.toStringIndex(1);
    std::string text = ll.toStringIndex(2);
    const char* res  = Translation::dgettext(domain.c_str(), text.c_str());
    ll.pushString(res);

    return 1;
}

int SWE_translation_ngettext(lua_State* L)
{
    // params: swe_translation
    LuaState ll(L);

    std::string text = ll.toStringIndex(1);
    std::string plural = ll.toStringIndex(2);
    int number = ll.toIntegerIndex(3);
    const char* res  = Translation::ngettext(text.c_str(), plural.c_str(), number);
    ll.pushString(res);

    return 1;
}

int SWE_translation_dngettext(lua_State* L)
{
    // params: swe_translation
    LuaState ll(L);

    std::string domain = ll.toStringIndex(1);
    std::string text = ll.toStringIndex(2);
    std::string plural = ll.toStringIndex(3);
    int number = ll.toIntegerIndex(4);
    const char* res  = Translation::dngettext(domain.c_str(), text.c_str(), plural.c_str(), number);
    ll.pushString(res);

    return 1;
}

const struct luaL_Reg SWE_translation_functions[] = {
    { "BindDomain", SWE_translation_bindomain },	// [bool], string, string
    { "SetDomain", SWE_translation_setdomain },		// [bool], string,
    { "SetStripContext", SWE_translation_setstrip }, 	// [void], int
    { "GetText", SWE_translation_gettext }, 		// [string], string
    { "DGetText", SWE_translation_dgettext }, 		// [string], string, string
    { "NGetText", SWE_translation_ngettext }, 		// [string], string, string, integer
    { "DNGetText", SWE_translation_dngettext },		// [string], string, string, string, integer
    { NULL, NULL }
};

void SWE_Translation::registers(LuaState & ll)
{
    // SWE.Translation
    ll.pushTable("SWE.Translation");
    ll.setFunctionsTableIndex(SWE_translation_functions, -1);
}
