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

#include "SWE_texture.h"
#include "SWE_videocam.h"
#include "SWE_videocam_ffmpeg.h"

SWE_VideoCam::SWE_VideoCam(const JsonObject & params) : context(NULL)
{
#ifdef WITH_VIDEOCAM_FFMPEG
    context = new FFmpegContext();
#endif
    if(context && ! context->init(params))
    {
	context->quit();
	delete context;
	context = NULL;
    }
}

SWE_VideoCam::~SWE_VideoCam()
{
    if(context) context->quit();
    delete context;
}

bool SWE_VideoCam::contextCapture(void)
{
    return context ? context->capture() : false;
}

const Texture* SWE_VideoCam::contextFrame(void) const
{
    return context ? context->frame() : NULL;
}

SWE_VideoCam* SWE_VideoCam::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.videocam"))
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

    auto ptr = static_cast<SWE_VideoCam**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////////////////////////////////////

int SWE_videocam_get_frame(lua_State* L)
{
    // params: swe_videocam

    LuaState ll(L);
    SWE_VideoCam* cam = SWE_VideoCam::get(ll, 1, __FUNCTION__);

    if(cam)
    {
	const Texture* tx1 = cam->contextCapture() ? cam->contextFrame() : NULL;

	if(tx1)
	{
    	    ll.pushTable();

    	    SWE_texture_create(L);
    	    SWE_Texture* tx2 = SWE_Texture::get(ll, -1, __FUNCTION__);

    	    if(tx2)
	    {
		const_cast<Texture*>(tx1)->swap(*tx2);

		ll.pushString("width").pushInteger(tx2->width()).setTableIndex(-3);
		ll.pushString("height").pushInteger(tx2->height()).setTableIndex(-3);
		ll.pushString("alpha").pushInteger(tx2->alphaMod()).setTableIndex(-3);
	        ll.pushString("class").pushString("capture").setTableIndex(-3);
	    }

	    return 1;
	}
	else
	{
	    // ERROR("error context");
	}
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_videocam_to_json(lua_State* L)
{
    // params: swe_videocam

    LuaState ll(L);
    SWE_VideoCam* cam = SWE_VideoCam::get(ll, 1, __FUNCTION__);

    if(cam)
    {
	std::string params;

	ll.pushNil();
	while(ll.nextTableIndex(1))
        {
	    if(ll.isStringIndex(-1))
	    {
		std::string key = ll.toStringIndex(-2);
		std::string val = ll.toStringIndex(-1);
		if(key != "__type")
		    params.append(",\"").append(key).append("\":").append("\"").append(val).append("\"");
	    }
	    ll.stackPop();
	}

        std::string str("{\"type\":\"swe.videocam\"");
	if(params.size()) str.append(params);
	str.append("}");
        ll.pushString(str);

	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

const struct luaL_Reg SWE_videocam_functions[] = {
    { "ToJson", SWE_videocam_to_json }, 	// [string], swe_videocam
    { "GetFrame", SWE_videocam_get_frame },	// [texture], swe_videocam
    { NULL, NULL }
};

int SWE_videocam_create(lua_State* L)
{
    // empty params
    LuaState ll(L);

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_VideoCam**>(ll.pushUserData(sizeof(SWE_VideoCam*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_videocam_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    // other key/value params
    JsonObject params = ll.isTableIndex(2) ? ll.toJsonObjectTableIndex(2) : JsonObject();

    // SWE_VideoCam: chance
    *ptr = new SWE_VideoCam(params);

    // add values
    ll.pushString("__type").pushString("swe.videocam").setTableIndex(-3);

    // add params
    StringList keys = params.keys();
    for(auto it = keys.begin(); it != keys.end(); ++it)
	ll.pushString(*it).pushString(params.getString(*it)).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_videocam_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

    return 1;
}

int SWE_videocam_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_VideoCam**>(ll.getTopUserData());
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

void SWE_VideoCam::registers(LuaState & ll)
{
    // SWE.VideoCam
    ll.pushTable("SWE.VideoCam");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_videocam_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
