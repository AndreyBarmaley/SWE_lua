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

#include "SWE_tools.h"

std::string SWE_Tools::convertEncoding(LuaState & ll, const std::string & str)
{
    if(! ll.pushTable("SWE").isTopTable())
    {
        ERROR("table not found" << ": " << "swe");
	ll.stackPop();
	return str;
    }

    if(! ll.getFieldTableIndex("encoding", -1, false).isTopString())
    {
	ll.stackPop();
	return str;
    }

    std::string charset = ll.getTopString();
    std::string res = Tools::stringEncode(str, charset.c_str());

    ll.stackPop(2);
    return res;
}

std::string SWE_Tools::toFullFileName(LuaState & ll, const std::string & file)
{
    std::string res = file;
    if(0 == Systems::dirname(file).compare("./"))
    {
        ll.pushTable("SWE.ARGS");
        ll.getFieldTableIndex("0", -1, false);
	if(ll.isTopString())
    	    res = Systems::concatePath(Systems::dirname(ll.getTopString()), file);
        ll.stackPop(2);
    }
    return res;
}

int SWE_Tools::pushJsonValue(LuaState & ll, const JsonValue* jv)
{
    if(jv)
    {
	switch(jv->getType())
	{
	    case JsonType::TypeNull:	ll.pushNil(); break;
	    case JsonType::TypeInteger:	ll.pushInteger(jv->getInteger()); break;
	    case JsonType::TypeDouble:	ll.pushNumber(jv->getDouble()); break;
	    case JsonType::TypeString:	ll.pushString(jv->getString()); break;
	    case JsonType::TypeBoolean:	ll.pushBoolean(jv->getBoolean()); break;

	    case JsonType::TypeArray:	return pushJsonArray(ll, static_cast<const JsonArray*>(jv));
	    case JsonType::TypeObject:	return pushJsonObject(ll, static_cast<const JsonObject*>(jv));

	    default: ERROR("unknown type: " << jv->getType()); return 0;
	}
    }

    return 1;
}

int SWE_Tools::pushJsonArray(LuaState & ll, const JsonArray* ja)
{
    if(ja)
    {
	ll.pushTable();

	for(int ii = 0; ii < ja->count(); ++ii)
	{
	    ll.pushInteger(ii + 1);
	    int offset = pushJsonValue(ll, ja->getValue(ii));
	    ll.setTableIndex(-2 - offset);
	}

	return 1;
    }

    return 0;
}

int SWE_Tools::pushJsonObject(LuaState & ll, const JsonObject* jo)
{
    if(jo)
    {
	ll.pushTable();
	StringList keys = jo->keys();

	for(auto it = keys.begin(); it != keys.end(); ++it)
	{
	    int offset = pushJsonValue(ll, jo->getValue(*it));
	    ll.setFieldTableIndex(*it, -1 - offset);
	}

	return 1;
    }

    return 0;
}
