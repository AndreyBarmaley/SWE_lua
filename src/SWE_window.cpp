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

#include <sstream>
#include <algorithm>

#include "SWE_rect.h"
#include "SWE_tools.h"
#include "SWE_texture.h"
#include "SWE_fontrender.h"
#include "SWE_window.h"

int SWE_polygon_create(lua_State*);
int SWE_polygon_destroy(lua_State*);

void SWE_window_render(LuaState & ll, Window & win)
{
    bool extrender = false;

    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("RenderWindow", -1, false).isTopFunction())
	{
	    extrender = ll.callFunction(0, 1).getTopBoolean();
	    ll.stackPop();
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    if(! extrender && Engine::debugMode())
    {
	win.renderClear(Color::LightGreen);
	for(int yy = 0; yy < win.height(); yy += 16)
	{
	    for(int xx = 0; xx < win.width(); xx += 32)
	    {
		win.renderColor(Color::Gray, Rect(0 == (yy % 32) ? xx + 16 : xx, yy, 16, 16));
	    }
	}
	win.renderRect(Color::RoyalBlue, win.rect());
    }
}

bool SWE_mouse_press_event(LuaState & ll, Window & win, const ButtonEvent & be)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("MousePressEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(be.position().x).pushInteger(be.position().y).pushInteger(be.button());
	    bool res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

bool SWE_mouse_release_event(LuaState & ll, Window & win, const ButtonEvent & be)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("MouseReleaseEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(be.position().x).pushInteger(be.position().y).pushInteger(be.button());
	    bool res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

bool SWE_mouse_motion_event(LuaState & ll, Window & win, const Point & pos, u32 buttons)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("MouseMotionEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(pos.x).pushInteger(pos.y).pushInteger(buttons);
	    bool res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

void SWE_mouse_tracking_event(LuaState & ll, Window & win, const Point & pos, u32 buttons)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("MouseTrackingEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(pos.x).pushInteger(pos.y).pushInteger(buttons);
	    ll.callFunction(3, 0);
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }
}

bool SWE_mouse_click_event(LuaState & ll, Window & win, const ButtonsEvent & be)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("MouseClickEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(be.press().position().x).pushInteger(be.press().position().y).pushInteger(be.press().button());
	    ll.pushInteger(be.release().position().x).pushInteger(be.release().position().y).pushInteger(be.release().button());
	    bool res = ll.callFunction(6, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

void SWE_mouse_focus_event(LuaState & ll, Window & win)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("MouseFocusEvent", -1, false).isTopFunction())
	{
	    ll.pushBoolean(true).callFunction(1, 0);
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }
}

void SWE_mouse_leave_event(LuaState & ll, Window & win)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("MouseFocusEvent", -1, false).isTopFunction())
	{
	    ll.pushBoolean(false).callFunction(1, 0);
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }
}

void SWE_window_create_event(LuaState & ll, Window & win)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("WindowCreateEvent", -1, false).isTopFunction())
	{
	    ll.callFunction(0, 0);
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }
}

void SWE_texture_invalid_event(LuaState & ll, Window & win)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("TextureInvalidEvent", -1, false).isTopFunction())
	{
	    ll.callFunction(0, 0);
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }
}

void SWE_display_resize_event(LuaState & ll, Window & win, const Size & winsz, bool fromsdl)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("DisplayResizeEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(winsz.w).pushInteger(winsz.h).pushBoolean(fromsdl).callFunction(3, 0);
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }
}

bool SWE_key_press_event(LuaState & ll, Window & win, const KeySym & key)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("KeyPressEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(key.keycode()).pushInteger(key.keymod().mod).pushInteger(key.scancode());
	    bool res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

bool SWE_key_release_event(LuaState & ll, Window & win, const KeySym & key)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("KeyReleaseEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(key.keycode()).pushInteger(key.keymod().mod).pushInteger(key.scancode());
	    bool res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

bool SWE_scroll_up_event(LuaState & ll, Window & win)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("ScrollUpEvent", -1, false).isTopFunction())
	{
	    const Point & pos = Display::mouseCursorPosition();
	    ll.pushInteger(pos.x).pushInteger(pos.y);
	    bool res = ll.callFunction(2, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

bool SWE_scroll_down_event(LuaState & ll, Window & win)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("ScrollDownEvent", -1, false).isTopFunction())
	{
	    const Point & pos = Display::mouseCursorPosition();
	    ll.pushInteger(pos.x).pushInteger(pos.y);
	    bool res = ll.callFunction(2, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

bool SWE_system_user_event(LuaState & ll, Window & win, int code, void* data)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("SystemUserEvent", -1, false).isTopFunction())
	{
	    // unref data
	    if(code == Signal::LuaUnrefAction)
	    {
		if(data)
		{
		    int objRef = reinterpret_cast<intptr_t>(data);
		    luaL_unref(ll.L(), LUA_REGISTRYINDEX, objRef);
		    DEBUG("object unref: " << String::hex(objRef));
		}

		// remove function, table
		ll.stackPop(2);
		return true;
	    }

	    ll.pushInteger(code);
	    if(data)
	    {
		int objRef = reinterpret_cast<intptr_t>(data);
		lua_rawgeti(ll.L(), LUA_REGISTRYINDEX, objRef);
	    }
	    else
	    {
		ll.pushNil();
	    }

	    bool res = ll.callFunction(2, 1).getTopBoolean();

	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }

    return false;
}

void SWE_system_tick_event(LuaState & ll, Window & win, u32 ms)
{
    if(SWE_Scene::window_pushtop(ll, win))
    {
	if(ll.getFieldTableIndex("SystemTickEvent", -1, false).isTopFunction())
	{
	    ll.pushInteger(ms);
	    ll.callFunction(1, 0);
	}
	else
	{
	    ll.stackPop();
	}

	ll.stackPop();
    }
}

SWE_Window::SWE_Window(lua_State* L, Window* parent)
    : WindowToolTipArea(parent), ll(L)
{
    setState(FlagModality, ! parent);
}

SWE_Window::SWE_Window(lua_State* L, const Point & pos, const Size & winsz, Window* parent)
    : WindowToolTipArea(pos, winsz, parent), ll(L)
{
    setState(FlagModality, ! parent);
    setVisible(true);
}

Window* SWE_Window::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(ll.isTableIndex(tableIndex))
    {
	const std::string type = ll.popFieldTableIndex("__type", tableIndex);

	if(0 != type.compare("swe.window") &&
	    0 != type.compare("swe.terminal") && 0 != type.compare("swe.polygon"))
	{
    	    ERROR(funcName << ": " << "table not found, index: " << tableIndex);
    	    return NULL;
	}
    }
    else
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

    auto ptr = static_cast<Window**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

Window* SWE_Polygon::get(LuaState & ll, int tableIndex, const char* funcName)
{
    return SWE_Window::get(ll, tableIndex, funcName);
}

/////////////////////////////////////// 
/*
int NULL(lua_State* L)
{
    lua_pushboolean(L, 0);
    return 1;
}
*/

int SWE_window_set_position(lua_State* L)
{
    // params: swe_window, posx, posy

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	int posx = ll.toIntegerIndex(2);
	int posy = ll.toIntegerIndex(3);

	win->setPosition(Point(posx, posy));

	// userdata, posy, posx, swe_window...
	ll.pushInteger(posx).setFieldTableIndex("posx", 1);
	ll.pushInteger(posy).setFieldTableIndex("posy", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_set_size(lua_State* L)
{
    // params: swe_window, width, height

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	int width = ll.toIntegerIndex(2);
	int height = ll.toIntegerIndex(3);

	win->setSize(Size(width, height));

	// userdata, posy, posx, swe_window...
	ll.pushInteger(width).setFieldTableIndex("width", 1);
	ll.pushInteger(height).setFieldTableIndex("height", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_set_result(lua_State* L)
{
    // params: swe_window, int

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	bool result = ll.toIntegerIndex(2);
	win->setResultCode(result);

	// userdata, bool, swe_window...
	ll.pushInteger(result).setFieldTableIndex("result", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_set_visible(lua_State* L)
{
    // params: swe_window, bool

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	bool flag = ll.toBooleanIndex(2);
	win->setVisible(flag);
	ll.pushBoolean(flag).setFieldTableIndex("visible", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_set_modality(lua_State* L)
{
    // params: swe_window, bool

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	bool flag = ll.toBooleanIndex(2);
	WindowProtect::setState(win, FlagModality, flag);
	ll.pushBoolean(flag).setFieldTableIndex("modality", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_set_keyhandle(lua_State* L)
{
    // params: swe_window, bool

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	bool flag = ll.toBooleanIndex(2);
	WindowProtect::setState(win, FlagKeyHandle, flag);
	ll.pushBoolean(flag).setFieldTableIndex("keyhandle", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_set_mousetrack(lua_State* L)
{
    // params: swe_window, bool

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	bool flag = ll.toBooleanIndex(2);
	WindowProtect::setState(win, FlagMouseTracking, flag);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_render_clear(lua_State* L)
{
    // params: swe_window, color

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	ARGB argb = ll.toIntegerIndex(2);
	win->renderClear(Color(argb));
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_render_rect(lua_State* L)
{
    // params: swe_window, color, posx, posy, width, height, bool
    // params: swe_window, color, rect, bool

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);
    
    if(win)
    {
        ARGB argb = ll.toIntegerIndex(2);
	int filled = false;
	Rect rt;

	if(ll.isTableIndex(3))
	{
	    rt = SWE_Rect::get(ll, 3, __FUNCTION__);

	    if(ll.isBooleanIndex(4))
		filled = ll.toBooleanIndex(4);
	}
	else
	{
	    rt.x = ll.toIntegerIndex(3);
    	    rt.y = ll.toIntegerIndex(4);
	    rt.w = ll.toIntegerIndex(5);
    	    rt.h = ll.toIntegerIndex(6);

	    if(ll.isBooleanIndex(7))
		filled = ll.toBooleanIndex(7);
	}

	if(filled)
	    win->renderColor(Color(argb), rt);
	else
	    win->renderRect(Color(argb), rt);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_render_point(lua_State* L)
{
    // params: swe_window, color, posx. posy
    // params: swe_window, color, point

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);
    
    if(win)
    {
	ARGB argb = ll.toIntegerIndex(2);
	Point pt;

	if(ll.isTableIndex(3))
	    pt = SWE_Point::get(ll, 3, __FUNCTION__);
	else
	{
    	    pt.x = ll.toIntegerIndex(3);
	    pt.y = ll.toIntegerIndex(4);
	}

	win->renderPoint(Color(argb), pt);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_render_line(lua_State* L)
{
    // params: swe_window, color, pt1x, pt1y, pt2x, pt2y
    // params: swe_window, color, point1, point2

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);
    
    if(win)
    {
	ARGB argb = ll.toIntegerIndex(2);
	Point pt1, pt2;

	if(ll.isTableIndex(3))
	{
	    pt1 = SWE_Point::get(ll, 3, __FUNCTION__);

	    if(ll.isTableIndex(4))
		pt2 = SWE_Point::get(ll, 4, __FUNCTION__);
	    else
	    {
		pt2.x = ll.toIntegerIndex(4);
    		pt2.y = ll.toIntegerIndex(5);
	    }
	}
	else
	{
    	    pt1.x = ll.toIntegerIndex(3);
    	    pt1.y = ll.toIntegerIndex(4);
	    pt2.x = ll.toIntegerIndex(5);
    	    pt2.y = ll.toIntegerIndex(6);
	}

	win->renderLine(Color(argb), pt1, pt2);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_render_cyrcle(lua_State* L)
{
    // params: swe_window, color, px, py, int radius, bool filled
    // params: swe_window, color, point center, int radius, bool filled

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);
    
    if(win)
    {
        ARGB argb = ll.toIntegerIndex(2);
	Point center;
        int radius = 0;
        bool filled = false;
        int params = ll.stackSize();

	if(ll.isTableIndex(3))
	{
	    center = SWE_Point::get(ll, 3, __FUNCTION__);
    	    radius = ll.toIntegerIndex(4);
    	    if(4 < params) filled = ll.toBooleanIndex(5);
	}
	else
	{
    	    center.x = ll.toIntegerIndex(3);
    	    center.y = ll.toIntegerIndex(4);
    	    radius = ll.toIntegerIndex(5);
    	    if(5 < params) filled = ll.toBooleanIndex(6);
	}

	Points points = Tools::renderCircle(center, radius, filled);

	for(auto it = points.begin(); it != points.end(); ++it)
	    win->renderPoint(Color(argb), *it);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_render_texture(lua_State* L)
{
    // params: swe_window, swe_texture, [srcx, srcy, srcw, srch], [dstx, dsty]
    // params: swe_window, swe_texture, [dstx, dsty]
    // params: swe_window, swe_texture, rect src, point dst
    // params: swe_window, swe_texture, point dst

    LuaState ll(L);

    auto win = SWE_Window::get(ll, 1, __FUNCTION__);
    SWE_Texture* ptr = SWE_Texture::get(ll, 2, __FUNCTION__);
    
    if(win && ptr)
    {
	Rect src;
	Point dst;
        int params = ll.stackSize();

	if(ll.isTableIndex(3))
	{
	    src = SWE_Rect::get(ll, 3, __FUNCTION__);

	    if(ll.isTableIndex(4))
	    {
		dst = SWE_Point::get(ll, 4, __FUNCTION__);
	    }
	    else
	    {
    		dst = src;
		src = ptr->rect();
	    }
	}
	else
	{
	    if(4 < params)
    	    {
		src.x = ll.toIntegerIndex(3);
    		src.y = ll.toIntegerIndex(4);
		src.w = ll.toIntegerIndex(5);
    		src.h = ll.toIntegerIndex(6);
    		dst.x = ll.toIntegerIndex(7);
    		dst.y = ll.toIntegerIndex(8);
	    }
	    else
	    {
    		dst.x = ll.toIntegerIndex(3);
    		dst.y = ll.toIntegerIndex(4);
		src = ptr->rect();
	    }
	}

	win->renderTexture(*ptr, src, dst);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_render_text(lua_State* L)
{
    // params: swe_window, swe_fontrender, string, color, dstx, dsty, int halign, int valign, boolean horizontal
    // params: swe_window, swe_fontrender, string, color, point dst, int halign, int valign, boolean horizontal

    LuaState ll(L);

    auto win = SWE_Window::get(ll, 1, __FUNCTION__);
    SWE_FontRender* frs = SWE_FontRender::get(ll, 2, __FUNCTION__);

    if(win && frs)
    {
	int params = ll.stackSize();
	std::string text = SWE_Tools::convertEncoding(ll, ll.toStringIndex(3));
	ARGB argb = ll.toIntegerIndex(4);
	Point dst;
	int halign = AlignLeft;
	int valign = AlignTop;
	bool horizontal = true;

	if(ll.isTableIndex(5))
	{
	    dst = SWE_Point::get(ll, 5, __FUNCTION__);

	    if(5 < params)
		halign = ll.toIntegerIndex(6);
	    if(6 < params)
		valign = ll.toIntegerIndex(7);
	    if(7 < params)
		horizontal = ll.toBooleanIndex(8);
	}
	else
	{
	    dst.x = ll.toIntegerIndex(5);
	    dst.y = ll.toIntegerIndex(6);

	    if(6 < params)
		halign = ll.toIntegerIndex(7);
	    if(7 < params)
		valign = ll.toIntegerIndex(8);
	    if(8 < params)
		horizontal = ll.toBooleanIndex(9);
	}

	Rect area = win->renderText(*frs, text, Color(argb), dst, halign, valign, horizontal);

	ll.pushInteger(area.x).pushInteger(area.y).pushInteger(area.w).pushInteger(area.h);
	return 4;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_window_to_json(lua_State* L)
{
    // params: swe_window

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
        bool visible = ll.getFieldTableIndex("visible", 1).getTopBoolean();
        bool modality = ll.getFieldTableIndex("modality", 1).getTopBoolean();
        bool keyhandle = ll.getFieldTableIndex("keyhandle", 1).getTopBoolean();
        int posx = ll.getFieldTableIndex("posx", 1).getTopInteger();
        int posy = ll.getFieldTableIndex("posy", 1).getTopInteger();
        int width = ll.getFieldTableIndex("width", 1).getTopInteger();
        int height = ll.getFieldTableIndex("height", 1).getTopInteger();
        ll.stackPop(8);

        std::string str = StringFormat("{\"type\":\"swe.window\",\"posx\":%1,\"posy\":%2,\"width\":%3,\"height\":%4,\"visible\":%5,\"modality\":%6,\"keyhandle\":%7}").
            arg(posx).arg(posy).arg(width).arg(height).arg(visible).arg(modality).arg(keyhandle);

        ll.pushString(str);
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_window_point_inarea(lua_State* L)
{
    // params: swe_window, ptx, pty
    // params: swe_window, point

    LuaState ll(L);
    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    if(win)
    {
	Point pt;

	// params: swe_window, point
	if(ll.isTableIndex(2))
	    pt = SWE_Point::get(ll, 2, __FUNCTION__);
	else
	{
    	    pt.x = ll.toIntegerIndex(2);
    	    pt.y = ll.toIntegerIndex(3);
	}

	bool res = win->isAreaPoint(pt);
        ll.pushBoolean(res);

        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_window_set_tooltip(lua_State* L)
{
    // params: swe_window, string, fontrender, color, color, color

    LuaState ll(L);

    if(! ll.isStringIndex(2))
    {
        ERROR("string not found");
	return 0;
    }

    auto win = static_cast<SWE_Window*>(SWE_Window::get(ll, 1, __FUNCTION__));

    if(! win)
    {
	ERROR("userdata empty");
	return 0;
    }

    std::string text = ll.toStringIndex(2);

    if(ll.isTableIndex(3))
    {
	SWE_FontRender* frs = SWE_FontRender::get(ll, 3, __FUNCTION__);
	if(frs)
	{
	    ARGB colorFn = ll.toIntegerIndex(4);
	    ARGB colorBg = ll.toIntegerIndex(5);
	    ARGB colorRt = ll.toIntegerIndex(6);
	    win->renderToolTip(text, *frs, Color(colorFn), Color(colorBg), Color(colorRt));
	}
	else
	{
	    ERROR("userdata empty");
	}
    }
    else
    {
	win->setToolTip(text);
    }

    return 0;
}

int SWE_window_childrens(lua_State* L)
{
    // params: swe_window
    LuaState ll(L);

    auto win = SWE_Window::get(ll, 1, __FUNCTION__);

    // add result: table
    ll.pushTable();

    if(! win)
    {
	ERROR("userdata empty");
	return 1;
    }

    if(! ll.pushTable("SWE.Scene.Windows").isTopTable())
    {
	ERROR("table not found" << ": " << "swe.scene");
	return 1;
    }

    // iterate SWE.Scene.Windows
    ll.pushNil();
    int index = 1;

    while(ll.nextTableIndex(-2))
    {
	// stack: swe_window, table result, SWE.Scene.Windows, key, value(swe_window)
	auto child = SWE_Window::get(ll, -1, __FUNCTION__);
	if(child && child->parent() == win)
	{
	    // add value to table result
	    ll.pushInteger(index++).pushValueIndex(-2).setTableIndex(-6);
	}

	// pop value
	ll.stackPop();
    }

    // stack: swe_window, table result, SWE.Scene.Windows
    ll.stackPop();

    // stack: swe_window, table result
    return 1;
}

/// remove swe_window from stack
int SWE_scene_removetop(lua_State* L)
{
    // stack: ..., swe_window
    LuaState ll(L);

    if(! ll.isTopTable())
    {
	ERROR("table not found" << ": " << "swe.window");
	ll.pushBoolean(false);
	return 1;
    }

    auto win = SWE_Window::get(ll, -1, __FUNCTION__);
    if(! win)
    {
	ERROR("userdata empty");
	ll.pushBoolean(false);
	return 1;
    }

    if(! ll.pushTable("SWE.Scene.Windows").isTopTable())
    {
	ERROR("table not found" << ": " << "swe.scene.windows");
	ll.stackPop();
	ll.pushBoolean(false);
	return 1;
    }

    win->setVisible(false);
    std::string hexid = String::hex(win->id());

    ll.pushNil().setFieldTableIndex(hexid, -2);
    ll.stackPop();

    // SWE.Scene.Windows mode: weak values
    DisplayScene::removeItem(*win);
    ll.garbageCollect();

    ll.pushBoolean(true);
    return 1;
}

/* SWE_Scene */
/// find swe_window and push top stack
bool SWE_Scene::window_pushtop(LuaState & ll, const Window & win)
{
    // stack: ..., swe_window
    if(! ll.pushTable("SWE.Scene.Windows").isTopTable())
    {
	ERROR("table not found" << ": " << "swe.scene.windows");
	ll.stackPop();
	return false;
    }

    std::string label = String::hex(win.id());
    ll.getFieldTableIndex(label, -1, false);

    if(ll.isTopNil())
    {
	// ERROR("window not found" << ": " << label);
	ll.stackPop(2);
	return false;
    }

    // stack: ..., SWE.Scene.Windows, swe_window
    ll.stackRemoveIndex(-2);
    return true;
}

/// push top stack swe_window to scene
bool SWE_Scene::window_add(LuaState & ll, const std::string & label, bool isroot)
{
    // stack: swe_window...
    if(! ll.pushTable("SWE.Scene.Windows").isTopTable())
    {
	ERROR("table not found" << ": " << "swe.scene.windows");
	ll.stackPop();
	return false;
    }

    if(isroot)
    {
	// save ref: to SWE.Scene.display
	if(ll.pushTable("SWE.Scene").isTopTable())
	{
	    // stack: swe_window, SWE.Scene.Windows, SWE.Scene
	    if(ll.getFieldTableIndex("display", -1, false).isTopTable())
	    {
		// remove old display from SWE.Scene.Window
		std::string hexid = ll.popFieldTableIndex("hexid", -1);
		ll.pushNil().setFieldTableIndex(hexid, -4);
		DEBUG("display ref: " << "remove");
	    }
	    ll.stackPop();

	    // set swe_window to SWE.Scene.display
	    ll.pushValueIndex(-3).setFieldTableIndex("display", -2);
	    DEBUG("display ref: " << "set" << ": " << label);

	    // clean old display references
	    ll.garbageCollect();
	}

	// remove SWE.Scene
	ll.stackPop();
    }

    // add swe_window to SWE.Scene.Windows[label]
    ll.pushValueIndex(-2).setFieldTableIndex(label, -2);

    // remove SWE.Scene.Windows
    ll.stackPop();

    DEBUG("add window" << ": " << label << (isroot ? " (display)" : ""));
    return true;
}

void SWE_Scene::clean(LuaState & ll, bool saveDisplay)
{
    DisplayScene::sceneDestroy();

    if(ll.pushTable("SWE.Scene.Windows").isTopTable())
    {
	// iterate SWE.Scene.Windows: remove all items
	ll.pushNil();
	while(ll.nextTableIndex(-2))
	{
	    std::string hexid = ll.toStringIndex(-2);

	    // pop value
	    ll.stackPop();
	    DEBUG("window id: " << hexid);

	    // stack: ..., SWE.Scene.Window, key,
	    ll.pushNil().setFieldTableIndex(hexid, -3);
	}

	if(ll.pushTable("SWE.Scene").isTopTable())
	{
	    // remove SWE.Scene.display
	    if(! saveDisplay)
	    {
		DEBUG("display ref: " << "remove");
		// remove old display from SWE.Scene
		ll.pushNil().setFieldTableIndex("display", -2);
	    }
	    else
	    {
		// add SWE.Scene.display to SWE.Scene.Windows
		if(ll.getFieldTableIndex("display", -1).isTopTable())
		{
		    auto win = SWE_Window::get(ll, -1, __FUNCTION__);
		    if(win)
		    {
			DisplayScene::addItem(*win);
			// add SWE.Scene.Window hexid
			std::string hexid = String::hex(win->id());
			ll.setFieldTableIndex(hexid, -3);
			DEBUG("display ref: " << "set" << ": " << hexid);
		    }
		    else
		    {
			ll.stackPop();
			ERROR("userdata empty");
		    }
		}
		else
	        {
		    ll.stackPop();
		}
	    }
	}
	else
	{
	    ERROR("table not found" << ": " << "swe.scene");
	}

	// SWE.Scene
	ll.stackPop();

	// SWE.Scene.Windows mode: weak values
	ll.garbageCollect();
    }
    else
    {
	ERROR("table not found" << ": " << "swe.scene.windows");
    }

    // SWE.Scene.Windows
    ll.stackPop();
}

const struct luaL_Reg SWE_window_functions[] = {
    { "SetVisible",     SWE_window_set_visible },      // [void], table window, bool flag
    { "SetResultCode",  SWE_window_set_result },       // [void], table window, int code
    { "SetModality",    SWE_window_set_modality },     // [void], table window, int code
    { "SetKeyHandle",   SWE_window_set_keyhandle },    // [void], table window, int code
    { "SetMouseTracking", SWE_window_set_mousetrack }, // [void], table window, int code
    { "SetPosition",    SWE_window_set_position },     // [void], table window. point pos
    { "SetSize",        SWE_window_set_size },         // [void], table window. size win
    { "SetToolTip",	SWE_window_set_tooltip },      // [void], table window, string, fontrender, color, color, color
    { "RenderClear",    SWE_window_render_clear },     // [void], table window, enum: color
    { "RenderRect",     SWE_window_render_rect },      // [void], table window, enum: color, rect, bool
    { "RenderLine",     SWE_window_render_line },      // [void], table window, enum: color, point, point
    { "RenderCyrcle",   SWE_window_render_cyrcle },    // [void], table window, enum: color, point, int, bool
    { "RenderPoint",    SWE_window_render_point },     // [void], table window, enum: color, point
    { "RenderTexture",  SWE_window_render_texture },   // [void]. table window, table texture, rect, point
    { "RenderText",     SWE_window_render_text },      // [rect coords], table window, table fontrender, string, color, point
    { "PointInArea",	SWE_window_point_inarea },     // [bool], table window, int, int
    { "GetChildrens",	SWE_window_childrens },        // [table], table window
    { "ToJson",		SWE_window_to_json },          // [string], table window
    // virtual
    { "TextureInvalidEvent",NULL },
    { "WindowCreateEvent", NULL },
    { "WindowCloseEvent",  NULL },
    { "DisplayResizeEvent",NULL },
    { "MousePressEvent",   NULL },
    { "MouseReleaseEvent", NULL },
    { "MouseClickEvent",   NULL },
    { "MouseFocusEvent",   NULL },
    { "MouseMotionEvent",  NULL },
    { "KeyPressEvent",     NULL },
    { "KeyReleaseEvent",   NULL },
    { "ScrollUpEvent",     NULL },
    { "ScrollDownEvent",   NULL },
    { "SystemUserEvent",   NULL },
    { "SystemTickEvent",   NULL },
    { "RenderWindow",      NULL },
    { NULL, NULL }
};

int SWE_window_create(lua_State* L)
{
    // SWE.Window(self, x, y, w, h, parent)
    LuaState ll(L);

    int posx = ll.toIntegerIndex(2);
    int posy = ll.toIntegerIndex(3);
    int width = ll.toIntegerIndex(4);
    int height = ll.toIntegerIndex(5);
    Window* parent = NULL;

    // get parent
    if(ll.isTopTable())
	parent = SWE_Window::get(ll, -1, __FUNCTION__);
    else
    // set parent DisplayWindow
	parent = DisplayScene::rootWindow();

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_Window**>(ll.pushUserData(sizeof(SWE_Window*)));
    *ptr = new SWE_Window(L, Point(posx, posy), Size(width, height), parent);
    ll.setTableIndex(-3);
    // set metatable: __gc to table
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_window_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2);

    const std::string hexid = String::hex((*ptr)->id());

    // add values
    ll.pushString("__type").pushString("swe.window").setTableIndex(-3);
    ll.pushString("posx").pushInteger((*ptr)->position().x).setTableIndex(-3);
    ll.pushString("posy").pushInteger((*ptr)->position().y).setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("visible").pushBoolean((*ptr)->isVisible()).setTableIndex(-3);
    ll.pushString("modality").pushBoolean(false).setTableIndex(-3);
    ll.pushString("keyhandle").pushBoolean(false).setTableIndex(-3);
    ll.pushString("hexid").pushString(hexid).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_window_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << (*ptr)->toString() << "]");
    SWE_Scene::window_add(ll, hexid, !parent);

    return 1;
}

int SWE_window_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopTable())
    {
	SWE_Window** ptr = NULL;

	if(ll.getFieldTableIndex("userdata", -1).isTopUserData())
	    ptr = static_cast<SWE_Window**>(ll.getTopUserData());

	// stack: swe_window, userdata
	ll.stackPop();

	if(ptr && *ptr)
	{
	    // stack: swe_window
	    if(ll.getFieldTableIndex("WindowCloseEvent", -1, false).isTopFunction())
	    {
		ll.callFunction(0, 0);
	    }
	    else
	    {
		ll.stackPop();
	    }

	    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");
	    // SWE.Scene.Windows mode: weak value
	    // auto remove SWE_Scene::window_remove(ll, *ptr);

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

// SWE_Polygon
int SWE_polygon_to_json(lua_State* L)
{
    // params: swe_polygon

    LuaState ll(L);

    auto poly = static_cast<SWE_Polygon*>(SWE_Polygon::get(ll, 1, __FUNCTION__));
    if(poly)
    {
	if(SWE_window_to_json(ll.L()))
	{
	    std::string window = ll.getTopString();
	    ll.stackPop(1);

	    std::ostringstream os;
    	    os << "{\"type\":\"swe.polygon\",\"window\":" << window << ",\"points\":" <<
		JsonPack::points(poly->getPoints()).toString() << "}";

	    ll.pushString(os.str());
    	    return 1;
	}
    }

    ERROR("userdata empty");
    return 0;
}

const struct luaL_Reg SWE_polygon_functions[] = {
    // window func
    { "SetVisible",     SWE_window_set_visible },      // [void], table window, bool flag
    { "SetResultCode",  SWE_window_set_result },       // [void], table window, int code
    { "SetModality",    SWE_window_set_modality },     // [void], table window, int code
    { "SetKeyHandle",   SWE_window_set_keyhandle },    // [void], table window, int code
    { "SetMouseTracking", SWE_window_set_mousetrack }, // [void], table window, int code
    { "SetPosition",    SWE_window_set_position },     // [void], table window. point pos
    { "SetSize",        SWE_window_set_size },         // [void], table window. size win
    { "SetToolTip",	SWE_window_set_tooltip },      // [void], table window, string, fontrender, color, color, color
    { "RenderClear",    SWE_window_render_clear },     // [void], table window, enum: color
    { "RenderRect",     SWE_window_render_rect },      // [void], table window, enum: color, rect, bool
    { "RenderLine",     SWE_window_render_line },      // [void], table window, enum: color, point, point
    { "RenderCyrcle",   SWE_window_render_cyrcle },    // [void], table window, enum: color, point, int, bool
    { "RenderPoint",    SWE_window_render_point },     // [void], table window, enum: color, point
    { "RenderTexture",  SWE_window_render_texture },   // [void]. table window, table texture, rect, rect
    { "RenderText",     SWE_window_render_text },      // [rect coords], table window, table fontrender, string, color, point
    { "PointInArea",	SWE_window_point_inarea },     // [bool], table window, int, int
    { "ToJson",		SWE_polygon_to_json },          // [string], table polygon
    // window virtual
    { "TextureInvalidEvent",NULL },
    { "WindowCreateEvent", NULL },
    { "WindowCloseEvent",  NULL },
    { "DisplayResizeEvent",NULL },
    { "MousePressEvent",   NULL },
    { "MouseReleaseEvent", NULL },
    { "MouseClickEvent",   NULL },
    { "MouseFocusEvent",   NULL },
    { "MouseMotionEvent",  NULL },
    { "KeyPressEvent",     NULL },
    { "KeyReleaseEvent",   NULL },
    { "ScrollUpEvent",     NULL },
    { "ScrollDownEvent",   NULL },
    { "SystemUserEvent",   NULL },
    { "SystemTickEvent",   NULL },
    { "RenderWindow",      NULL },
    // polygon func
    { NULL, NULL }
};

SWE_Polygon::SWE_Polygon(lua_State* L, const Points & pts, Window* parent)
    : SWE_Window(L, parent)
{
    Polygon poly(pts);
    Rect area = poly.around();

    setSize(area);
    setPosition(area);

    fillPoints(poly);
    setVisible(true);
}

enum { StatusNew = 0, StatusOpen = 1, StatusClosed = 2 };

/// \cond StatusPoint
struct StatusPoint
{
    int val;

    StatusPoint(int v = StatusNew) : val(v) {}

    bool checkOpen(void) const { return val == StatusOpen; }
    void setOpen(void) { val = StatusOpen; }
    void setClosed(void) { val = StatusClosed; }
};

/// \cond PointHasher
struct PointHasher
{
    size_t operator() (const Point & pt) const
    {
        return std::hash<u32>()((pt.y << 16) | pt.x);
    }
};

void SWE_Polygon::fillPoints(const Polygon & poly)
{
    const Rect & area = Window::area();
    Point pt = Point(area.x + area.w / 2, area.y + area.h / 2);

    std::unordered_map<Point, StatusPoint, PointHasher> status;
    for(auto it = poly.begin(); it != poly.end(); ++it)
	status[*it].setClosed();

    if(poly & pt)
    {
	Points arounds;
	status[pt].setOpen();
	bool loop = true;

	while(loop)
	{
	    for(auto it = status.begin(); it != status.end(); ++it)
		if((*it).second.checkOpen())
	    {
		const Point & cpt = (*it).first;
		(*it).second = StatusPoint(StatusClosed);

		Point npt;
		int direction = 0;

		// top
		npt = cpt + Point(0, -1);
		if(status.end() == status.find(npt)) { direction |= 0x01; arounds.push_back(npt); }
		// left
		npt = cpt + Point(1, 0);
		if(status.end() == status.find(npt)) { direction |= 0x02; arounds.push_back(npt); }
		// bottom
		npt = cpt + Point(0, 1);
		if(status.end() == status.find(npt)) { direction |= 0x04; arounds.push_back(npt); }
		// right
		npt = cpt + Point(-1, 0);
		if(status.end() == status.find(npt)) { direction |= 0x08; arounds.push_back(npt); }

		// top left
		npt = cpt + Point(1, -1);
		if(0x03 == (direction & 0x03) && status.end() == status.find(npt))
		    arounds.push_back(npt);

		// top right
		npt = cpt + Point(-1, -1);
		if(0x09 == (direction & 0x09) && status.end() == status.find(npt))
		    arounds.push_back(npt);
		
		// bottom left
		npt = cpt + Point(1, 1);
		if(0x06 == (direction & 0x06) && status.end() == status.find(npt))
		    arounds.push_back(npt);

		// top right
		npt = cpt + Point(-1, 1);
		if(0x0c == (direction & 0x0c) && status.end() == status.find(npt))
		    arounds.push_back(npt);
	    }

	    loop = false;
	    for(auto at = arounds.begin(); at != arounds.end(); ++at)
	    {
		status[*at].setOpen();
		loop = true;
	    }
    
	    arounds.clear();
	}
    }
    else
    {
	FIXME("start point not found...");
    }

    for(auto it = status.begin(); it != status.end(); ++it)
	if(! (*it).second.checkOpen()) points.insert((*it).first - position());
}

void SWE_Polygon::renderClear(const Color & col)
{
    for(auto it = points.begin(); it != points.end(); ++it)
	renderPoint(col, *it);
}

void SWE_Polygon::renderWindow(void)
{
    bool extrender = false;

    if(SWE_Scene::window_pushtop(ll, *this))
    {
        if(ll.getFieldTableIndex("RenderWindow", -1).isTopFunction())
        {
            extrender = ll.callFunction(0, 1).getTopBoolean();
            ll.stackPop();
        }
        else
        {
            ll.stackPop();
        }
 
        ll.stackPop();
    }

    if(! extrender && Engine::debugMode())
    {
        for(auto it = points.begin(); it != points.end(); ++it)
	    renderPoint(Color::Red, *it);
    }
}

bool SWE_Polygon::isAreaPoint(const Point & pos) const
{
    if(Window::isAreaPoint(pos))
	return points.end() != points.find(pos - position());

    return false;
}

Points SWE_Polygon::getPoints(void) const
{
    Points res;

    for(auto it = points.begin(); it != points.end(); ++it)
	res.push_back(*it + position());

    return res;
}

void SWE_Polygon::includeRegion(const Points & pts)
{
    Rect area1 = pts.around();
    Point offset = area1.toPoint() - position();

    for(auto it = pts.begin(); it != pts.end(); ++it)
	points.insert(*it + offset);

    Rect area2 = getPoints().around();

    setSize(area2);
    setPosition(area2);
}

void SWE_Polygon::excludeRegion(const Points & pts)
{
    Rect area1 = pts.around();
    Point offset = area1.toPoint() - position();

    for(auto it = pts.begin(); it != pts.end(); ++it)
	points.erase(*it + offset);

    Rect area2 = getPoints().around();

    setSize(area2);
    setPosition(area2);
}

int SWE_polygon_create(lua_State* L)
{
    // SWE.Polygon(self, x1, y1, x2, y2, ... [xN, yN], table parent)
    LuaState ll(L);
    
    int params = ll.stackSize();
    Window* parent = NULL;

    // get parent
    if(ll.isTopTable())
	parent = SWE_Window::get(ll, -1, __FUNCTION__);
    else
    // set parent DisplayWindow
	parent = DisplayScene::rootWindow();

    Points points;
    for(int it = 2; it < params; it += 2)
    {
	int px = ll.toIntegerIndex(it);
	int py = ll.toIntegerIndex(it + 1);
	points.push_back(Point(px, py));
    }

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_Polygon**>(ll.pushUserData(sizeof(SWE_Polygon*)));
    *ptr = new SWE_Polygon(L, points, parent);

    ll.setTableIndex(-3);
    // set metatable: __gc to table
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_polygon_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2);

    const std::string hexid = String::hex((*ptr)->id());

    ll.pushString("__type").pushString("swe.polygon").setTableIndex(-3);
    ll.pushString("posx").pushInteger((*ptr)->position().x).setTableIndex(-3);
    ll.pushString("posy").pushInteger((*ptr)->position().y).setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("visible").pushBoolean((*ptr)->isVisible()).setTableIndex(-3);
    ll.pushString("modality").pushBoolean(false).setTableIndex(-3);
    ll.pushString("keyhandle").pushBoolean(false).setTableIndex(-3);
    ll.pushString("hexid").pushString(hexid).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_polygon_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");
    SWE_Scene::window_add(ll,  hexid, !parent);

    return 1;
}

int SWE_polygon_destroy(lua_State* L)
{
    return SWE_window_destroy(L);
}

void SWE_Scene::registers(LuaState & ll)
{
    // SWE.Scene
    ll.pushTable("SWE.Scene");
    ll.pushFunction(SWE_scene_removetop).setFieldTableIndex("Remove", -2);

    // SWE.Scene.Windows
    ll.pushTable("SWE.Scene.Windows");
    // set metatable: weak mode
    ll.pushTable(0, 1).pushString("v").setFieldTableIndex("__mode", -2);
    ll.setMetaTableIndex(-2).stackPop();

    ll.stackPop();
}

void SWE_Window::registers(LuaState & ll)
{
    // SWE.Window
    ll.pushTable("SWE.Window");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_window_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();

    // SWE.Button constants
    ll.pushTable("SWE.MouseButton");
    ll.pushInteger(SDL_BUTTON(SDL_BUTTON_LEFT)).setFieldTableIndex("Left", -2);
    ll.pushInteger(SDL_BUTTON(SDL_BUTTON_MIDDLE)).setFieldTableIndex("Middle", -2);
    ll.pushInteger(SDL_BUTTON(SDL_BUTTON_RIGHT)).setFieldTableIndex("Right", -2);
    ll.pushInteger(SDL_BUTTON(SDL_BUTTON_X1)).setFieldTableIndex("X1", -2);
    ll.pushInteger(SDL_BUTTON(SDL_BUTTON_X2)).setFieldTableIndex("X2", -2);
    ll.stackPop();
}

void SWE_Polygon::registers(LuaState & ll)
{
    // SWE.Polygon
    ll.pushTable("SWE.Polygon");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_polygon_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
