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
#include "display_scene.h"

#include "SWE_keys.h"
#include "SWE_tools.h"
#include "SWE_audio.h"
#include "SWE_color.h"
#include "SWE_window.h"
#include "SWE_texture.h"
#include "SWE_binarybuf.h"
#include "SWE_fontrender.h"

#define SWE_LUA_VERSION 20190802

int SWE_window_create(lua_State*);

int SWE_init(lua_State* L)
{
    // params: string title, int width, int height, bool fullscreen, bool debug
    LuaState ll(L);

    // check also initialized
    if(! Display::size().isEmpty())
    {
	// return display window
	SWE_Window* win = SWE_Scene::window_getindex(ll, 1);
	SWE_Scene::window_push(ll, win);
	return 1;
    }

    int params = ll.stackSize();
    if(3 > params || ! ll.isStringIndex(1) ||
	! ll.isIntegerIndex(2) || ! ll.isIntegerIndex(3))
    {
        ERROR("require minimum params: " << "string title, int width, int height, <bool fullscreen, bool debug>");
	ll.pushNil();
        return 1;
    }

    std::string title = ll.toStringIndex(1);
    int width = ll.toIntegerIndex(2);
    int height = ll.toIntegerIndex(3);
    bool fullscreen = 4 > params ? false : ll.toBooleanIndex(4);
    bool debug = 5 > params ? true : ll.toBooleanIndex(5);

    Engine::setDebugMode(debug);

    bool res = Display::init(title, Size(width, height), fullscreen);
    if(res)
    {
	const Size & dsz = Display::size();
	ll.stackClear();
	ll.pushTable().pushInteger(0).pushInteger(0).pushInteger(dsz.w).pushInteger(dsz.h).pushNil();

	SWE_window_create(L);
    }
    else
    {
    	ERROR("display init failed");
	ll.pushNil();
    }

    return 1;
}

int SWE_quit(lua_State* L)
{
    // params: none
    DEBUG("the end");
    Engine::quit();

    return 0;
}

int SWE_display_window(lua_State* L)
{
    // params: none
    LuaState ll(L);

    SWE_Window* win = SWE_Scene::window_getindex(ll, 1);
    SWE_Scene::window_push(ll, win);

    return 1;
}

int SWE_display_dirty(lua_State* L)
{
    // params: none
    DisplayScene::setDirty(true);

    return 0;
}

int SWE_loop(lua_State* L)
{
    // params: swe_window
    LuaState ll(L);

    SWE_Window* win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	int res = win->exec();
	ll.pushInteger(res);

	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_dump(lua_State* L)
{
    // params: none
    LuaState(L).stackDump();
    return 0;
}

int SWE_cursor_show(lua_State* L)
{
    // params: none
    Display::hardwareCursorShow();
    return 0;
}

int SWE_cursor_hide(lua_State* L)
{
    // params: none
    Display::hardwareCursorHide();
    return 0;
}

int SWE_cursor_load(lua_State* L)
{
    // params: table texture, int offsetx, int offsety
    LuaState ll(L);

    int params = ll.stackSize();
    int offx = 2 > params ? 0 : ll.toIntegerIndex(2);
    int offy = 3 > params ? 0 : ll.toIntegerIndex(3);

    SWE_Texture* ptr = SWE_Texture::get(ll, 1, __FUNCTION__);

    if(ptr)
    {
	DisplayScene::setCursor(*ptr, Point(offx, offy));
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_cursor_info(lua_State* L)
{
    // params: none
    LuaState ll(L);

    ll.pushTable();

    Point pos = Display::mouseCursorPosition();
    u32 btn = Display::mouseButtonState();

    ll.pushInteger(pos.x).setFieldTableIndex("posx", -3);
    ll.pushInteger(pos.y).setFieldTableIndex("posy", -3);
    ll.pushInteger(btn).setFieldTableIndex("buttons", -3);

    return 1;
}

int SWE_register_directory(lua_State* L)
{
    // params: string directory
    LuaState ll(L);

    if(! ll.isTopString())
    {
	ERROR("string not found");
	return 0;
    }

    std::string name = ll.getTopString();

    if(! Systems::isDirectory(name))
	name = SWE_Tools::toFullFileName(ll, name);

    bool res = ll.registerDirectory(name);
    ll.pushBoolean(res);

    return 1;
}

int SWE_system_memory_usage(lua_State* L)
{
    // params: none
    LuaState ll(L);

    ll.pushInteger(Systems::memoryUsage());
    return 1;
}

int SWE_system_read_directory(lua_State* L)
{
    // params: string directory
    LuaState ll(L);

    if(! ll.isTopString())
    {
	ERROR("string not found");
	return 0;
    }

    std::string dirpath = ll.getTopString();

    if(! Systems::isDirectory(dirpath))
	dirpath = SWE_Tools::toFullFileName(ll, dirpath);

    StringList res = Systems::readDir(dirpath, true);

    ll.pushTable();
    for(auto it = res.begin(); it != res.end(); ++it)
    {
	if(Systems::isDirectory(*it))
	    ll.pushString("directory");
	else
	if(Systems::isFile(*it))
	    ll.pushString("file");
	else
	    ll.pushString("unknown");
	ll.setFieldTableIndex(*it, -2);
    }

    return 1;
}

int SWE_render_screenshot(lua_State* L)
{
    // params: string filename
    LuaState ll(L);

    if(! ll.isTopString())
    {
	ERROR("string not found");
	return 0;
    }

    bool res = Display::renderScreenshot(SWE_Tools::toFullFileName(ll, ll.getTopString()));
    ll.pushBoolean(res);

    return 1;
}

int SWE_string_encode_utf8(lua_State* L)
{
    // params: string str, string charset
    LuaState ll(L);
    int params = ll.stackSize();

    if(2 > params || ! ll.isStringIndex(1) || ! ll.isStringIndex(2))
    {
        ERROR("require minimum params: " << "string content, string charset");
        return 0;
    }

    std::string content = ll.toStringIndex(1);
    std::string charset = ll.toStringIndex(2);

    ll.pushString(Tools::stringEncode(content, charset.c_str()));
    return 1;
}

int SWE_json_parse(lua_State* L)
{
    // params: string json
    LuaState ll(L);

    if(! ll.isTopString())
    {
	ERROR("string not found");
	return 0;
    }

    JsonContentString jcs(ll.getTopString());

    if(jcs.isArray())
    {
	JsonArray ja = jcs.toArray();
	SWE_Tools::pushJsonArray(ll, & ja);
    }
    else
    if(jcs.isObject())
    {
	JsonObject jo = jcs.toObject();
	SWE_Tools::pushJsonObject(ll, & jo);
    }
    else
    {
	ERROR("bad json");
	ll.pushNil();
    }

    return 1;
}

int SWE_push_event(lua_State* L)
{
    // params: int code, pointer data, table window
    LuaState ll(L);

    int params = ll.stackSize();

    int code = ll.toIntegerIndex(1);
    const void* data = 2 > params ? NULL : ll.toPointerIndex(2);
    SWE_Window* win = 3 > params ? NULL : SWE_Window::get(ll, 3, __FUNCTION__);

    DisplayScene::pushEvent(win, code, const_cast<void*>(data));

    return 0;
}

int SWE_set_debug(lua_State* L)
{
    // params: bool
    LuaState ll(L);

    Engine::setDebugMode(ll.toBooleanIndex(1));

    return 0;
}

// library interface
const struct luaL_Reg SWE_functions[] = {
    { "Init", SWE_init }, 		// [table swe_window], string title, int width, int height
    { "Dump", SWE_dump }, 		// [void], void or object
    { "Loop", SWE_loop }, 		// [int winresult], table: window
    { "CursorShow", SWE_cursor_show },	// [void], void
    { "CursorHide", SWE_cursor_hide },	// [void], void
    { "CursorLoad", SWE_cursor_load },	// [void], table swe_texture, int offsetx, int offsety
    { "CursorInfo", SWE_cursor_info },	// [table cursor], void
    { "JsonParse", SWE_json_parse },	// [table], string json
    { "PushEvent", SWE_push_event },	// [void], int code, pointer data, table window
    { "SetDebug", SWE_set_debug }, 	// [void], bool
    { "DisplayWindow", SWE_display_window }, 			// [table swe_window], void
    { "DisplayDirty", SWE_display_dirty }, 			// [void], void
    { "RenderScreenshot", SWE_render_screenshot }, 		// [bool], string filename
    { "LuaRegisterDirectory", SWE_register_directory }, 	// [bool], string directory
    { "SystemReadDirectory", SWE_system_read_directory },	// [table list], string directory
    { "SystemMemoryUsage", SWE_system_memory_usage },		// [integer memoryusage], void
    { "StringEncodeToUTF8", SWE_string_encode_utf8 },		// [ string], string str, string from charset
    { NULL, NULL }
};

extern "C" {
 //name of this function is not flexible
 int luaopen_SWE(lua_State* L)
 {
    LuaState ll(L);

    ll.pushTable("SWE");
    ll.getFieldTableIndex("version", -1, false);

    if(ll.getTopNumber() == SWE_LUA_VERSION)
    {
	// SWE also loaded
	ll.stackPop();
	return 1;
    }

    ll.stackPop();

    // set version
    ll.pushInteger(SWE_LUA_VERSION).setFieldTableIndex("version", -2);
    // set functions
    ll.setFunctionsTableIndex(SWE_functions, -1);
    // set metatable: __gc
    ll.pushTable(0, 1).pushFunction(SWE_quit).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2);

    // SWE.Audio
    SWE_Audio::registers(ll);
    // SWE.Color
    SWE_Color::registers(ll);
    // SWE.Key
    SWE_Key::registers(ll);
    // SWE.FontRender
    SWE_FontRender::registers(ll);
    // SWE.Scene
    SWE_Scene::registers(ll);
    // SWE.Texture
    SWE_Texture::registers(ll);
    // SWE.BinaryBuf
    SWE_BinaryBuf::registers(ll);

    bool res = Engine::init();
    if(! res) ERROR("engine init failed");

    return 1;
 }
}
