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

#include "SWE_randomhit.h"

int SWE_randomhit_create(lua_State*);
int SWE_randomhit_destroy(lua_State*);

SWE_RandomHit* SWE_RandomHit::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.randomhit"))
    {
        ERROR(funcName << ": " << "table not found, index: " << tableIndex);
        return NULL;
    }

    if(! ll.getFieldTableIndex("userdata", tableIndex).isTopUserData())
    {
        ERROR(funcName << ": " << "not userdata, index: " << tableIndex << ", " << ll.getTopTypeName());
	ll.stackPop();
        return NULL;
    }

    auto ptr = static_cast<SWE_RandomHit**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////////////////////////////////////

int SWE_randomhit_last(lua_State* L)
{
    // params: swe_randomhit

    LuaState ll(L);
    SWE_RandomHit* hit = SWE_RandomHit::get(ll, 1, __FUNCTION__);

    if(hit)
    {
        bool res = hit->last();
        ll.pushBoolean(res);
    }
    else
    {
	ll.pushBoolean(false);
        ERROR("userdata empty");
    }

    return 1;
}

int SWE_randomhit_check(lua_State* L)
{
    // params: swe_randomhit

    LuaState ll(L);
    SWE_RandomHit* hit = SWE_RandomHit::get(ll, 1, __FUNCTION__);

    if(hit)
    {
        bool res = hit->check();
        ll.pushBoolean(res);
    }
    else
    {
	ll.pushBoolean(false);
        ERROR("userdata empty");
    }

    return 1;
}

int SWE_randomhit_to_json(lua_State* L)
{
    // params: swe_randomhit

    LuaState ll(L);
    SWE_RandomHit* hit = SWE_RandomHit::get(ll, 1, __FUNCTION__);

    if(hit)
    {
        int chance = ll.getFieldTableIndex("chance", 1).getTopInteger();
        ll.stackPop(1);

        std::string str = StringFormat("{\"type\":\"%1\",\"chance\":%2,\"order\":\"%3\"}").
            arg("swe.randomhit").arg(chance).arg(hit->toString());

        ll.pushString(str);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_randomhit_tostring(lua_State* L)
{
    // params: swe_randomhit

    LuaState ll(L);
    SWE_RandomHit* hit = SWE_RandomHit::get(ll, 1, __FUNCTION__);

    if(hit)
    {
        int chance = ll.getFieldTableIndex("chance", 1).getTopInteger();
        ll.stackPop(1);

        ll.pushString(StringFormat("%1[%2,%3]").arg("swe.randomhit").arg(chance).arg(hit->toString()));
	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

const struct luaL_Reg SWE_randomhit_functions[] = {
    { "Last", SWE_randomhit_last },		// [bool], swe_randomhit
    { "Check", SWE_randomhit_check },		// [bool], swe_randomhit
    { "ToJson", SWE_randomhit_to_json }, 	// [string], swe_randomhit
    { NULL, NULL }
};

int SWE_randomhit_create(lua_State* L)
{
    // empty params
    LuaState ll(L);

    ll.pushTable();

    // set: tostring
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_randomhit_tostring).setFieldTableIndex("__tostring", -2);
    ll.setMetaTableIndex(-2);

    // set userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_RandomHit**>(ll.pushUserData(sizeof(SWE_RandomHit*)));

    // set metatable: __gc to userdata
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_randomhit_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    int chance = ll.toIntegerIndex(2);

    // SWE_RandomHit: chance
    *ptr = new SWE_RandomHit(chance);

    // add values
    ll.pushString("__type").pushString("swe.randomhit").setTableIndex(-3);
    ll.pushString("chance").pushInteger((*ptr)->getChance()).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_randomhit_functions, -1);


    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

    return 1;
}

int SWE_randomhit_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_RandomHit**>(ll.getTopUserData());
        if(ptr && *ptr)
        {
            DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

	    delete *ptr;
            *ptr = NULL;
        }
        else
        {
            ERROR("userdata empty");
        }
    }
    else
    {
        ERROR("not userdata");
    }

    return 0;
}

void SWE_RandomHit::registers(LuaState & ll)
{
    // SWE.RandomHit
    ll.pushTable("SWE.RandomHit");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_randomhit_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
