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

#include <algorithm>

#include "SWE_rect.h"
#include "SWE_tools.h"
#include "SWE_texture.h"
#include "SWE_fontrender.h"
#include "SWE_window.h"
#include "SWE_terminal.h"

int SWE_terminal_create(lua_State*);
int SWE_terminal_destroy(lua_State*);

SWE_Terminal::SWE_Terminal(lua_State* L, const FontRender & frs, Window & parent) : TermWindow(frs, parent), ll(L)
{
    resetState(FlagModality);
    setVisible(false);
}

SWE_Terminal::SWE_Terminal(lua_State* L, const FontRender & frs, int cols, int rows, Window & parent) : TermWindow(frs, parent), ll(L)
{
    resetState(FlagModality);
    setTermSize(TermSize(cols, rows));
    setVisible(true);
}

void SWE_Terminal::renderWindow(void)
{
    bool extrender = false;

    if(SWE_Scene::window_push(ll, this))
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
    }
    ll.stackPop();

    if(! extrender && Engine::debugMode())
    {
	renderClear(Color::LightGreen);
	for(int yy = 0; yy < height(); yy += 16)
	{
	    for(int xx = 0; xx < width(); xx += 32)
	    {
		renderColor(Color::Gray, Rect(0 == (yy % 32) ? xx + 16 : xx, yy, 16, 16));
	    }
	}
	renderRect(Color::RoyalBlue, rect());
    }
}

bool SWE_Terminal::mousePressEvent(const ButtonEvent & be)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("MousePressEvent", -1).isTopFunction())
	{
	    ll.pushInteger(be.position().x).pushInteger(be.position().y).pushInteger(be.button());
	    int res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

bool SWE_Terminal::mouseReleaseEvent(const ButtonEvent & be)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("MouseReleaseEvent", -1).isTopFunction())
	{
	    ll.pushInteger(be.position().x).pushInteger(be.position().y).pushInteger(be.button());
	    int res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

bool SWE_Terminal::mouseMotionEvent(const Point & pos, u32 buttons)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("MouseMotionEvent", -1).isTopFunction())
	{
	    ll.pushInteger(pos.x).pushInteger(pos.y).pushInteger(buttons);
	    int res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

bool SWE_Terminal::mouseClickEvent(const ButtonsEvent & be)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("MouseClickEvent", -1).isTopFunction())
	{
	    ll.pushInteger(be.press().position().x).pushInteger(be.press().position().y).pushInteger(be.press().button());
	    ll.pushInteger(be.release().position().x).pushInteger(be.release().position().y).pushInteger(be.release().button());
	    int res = ll.callFunction(6, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop();
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

void SWE_Terminal::mouseFocusEvent(void)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("MouseFocusEvent", -1).isTopFunction())
	{
	    ll.pushBoolean(true).callFunction(1, 0);
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();
}

void SWE_Terminal::mouseLeaveEvent(void)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("MouseFocusEvent", -1).isTopFunction())
	{
	    ll.pushBoolean(false).callFunction(1, 0);
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();
}

void SWE_Terminal::windowCloseEvent(void)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("WindowCloseEvent", -1, false).isTopFunction())
	{
	    ll.callFunction(0, 0);
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();
}

void SWE_Terminal::windowCreateEvent(void)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("WindowCreateEvent", -1).isTopFunction())
	{
	    ll.callFunction(0, 0);
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();
}

void SWE_Terminal::textureInvalidEvent(void)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("TextureInvalidEvent", -1).isTopFunction())
	{
	    ll.callFunction(0, 0);
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();
}

void SWE_Terminal::displayResizeEvent(const Size & winsz, bool fromsdl)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("DisplayResizeEvent", -1).isTopFunction())
	{
	    ll.pushInteger(winsz.w).pushInteger(winsz.h).pushBoolean(fromsdl).callFunction(3, 0);
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();
}

bool SWE_Terminal::keyPressEvent(const KeySym & key)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("KeyPressEvent", -1).isTopFunction())
	{
	    ll.pushInteger(key.keycode()).pushInteger(key.keymod()).pushInteger(key.scancode());
	    int res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

bool SWE_Terminal::keyReleaseEvent(const KeySym & key)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("KeyReleaseEvent", -1).isTopFunction())
	{
	    ll.pushInteger(key.keycode()).pushInteger(key.keymod()).pushInteger(key.scancode());
	    int res = ll.callFunction(3, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

bool SWE_Terminal::scrollUpEvent(const Point & pos)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("ScrollUpEvent", -1).isTopFunction())
	{
	    ll.pushInteger(pos.x).pushInteger(pos.y);
	    int res = ll.callFunction(2, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

bool SWE_Terminal::scrollDownEvent(const Point & pos)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("ScrollDownEvent", -1).isTopFunction())
	{
	    ll.pushInteger(pos.x).pushInteger(pos.y);
	    int res = ll.callFunction(2, 1).getTopBoolean();
	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

bool SWE_Terminal::userEvent(int code, void* data)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("SystemUserEvent", -1).isTopFunction())
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

	    int res = ll.callFunction(2, 1).getTopBoolean();

	    // remove boolean, table
	    ll.stackPop(2);
	    return res;
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();

    return false;
}

void SWE_Terminal::tickEvent(u32 ms)
{
    if(SWE_Scene::window_push(ll, this))
    {
	if(ll.getFieldTableIndex("SystemTickEvent", -1).isTopFunction())
	{
	    ll.pushInteger(ms);
	    ll.callFunction(1, 0);
	}
	else
	{
	    ll.stackPop();
	}
    }
    ll.stackPop();
}

SWE_Terminal* SWE_Terminal::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.terminal"))
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

    auto ptr = static_cast<SWE_Terminal**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////// 
int SWE_terminal_empty(lua_State* L)
{
    lua_pushboolean(L, 0);
    return 1;
}

int SWE_terminal_set_position(lua_State* L)
{
    // params: swe_terminal, posx, posy

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int posx = ll.toIntegerIndex(2);
	int posy = ll.toIntegerIndex(3);

	term->setPosition(Point(posx, posy));

	// userdata, posy, posx, swe_terminal...
	ll.pushInteger(posx).setFieldTableIndex("posx", 1);
	ll.pushInteger(posy).setFieldTableIndex("posy", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_termsize(lua_State* L)
{
    // params: swe_terminal, cols, rows

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int cols = ll.toIntegerIndex(2);
	int rows = ll.toIntegerIndex(3);

	term->setTermSize(TermSize(cols, rows));

	// userdata, posy, posx, swe_terminal...
	ll.pushInteger(cols).setFieldTableIndex("cols", 1);
	ll.pushInteger(rows).setFieldTableIndex("rows", 1);
	ll.pushInteger(term->width()).setFieldTableIndex("width", 1);
	ll.pushInteger(term->height()).setFieldTableIndex("height", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_result(lua_State* L)
{
    // params: swe_terminal, int

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	bool result = ll.toIntegerIndex(2);

	term->setResultCode(result);

	// userdata, bool, swe_terminal...
	ll.pushInteger(result).setFieldTableIndex("result", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_visible(lua_State* L)
{
    // params: swe_terminal, bool

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	bool visible = ll.toBooleanIndex(2);

	term->setVisible(visible);

	// userdata, bool, swe_terminal...
	ll.pushBoolean(visible).setFieldTableIndex("visible", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_modality(lua_State* L)
{
    // params: swe_terminal, bool

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	bool modality = ll.toBooleanIndex(2);
	term->setState(FlagModality, modality);

	ll.pushBoolean(modality).setFieldTableIndex("modality", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}
int SWE_terminal_set_keyhandle(lua_State* L)
{
    // params: swe_terminal, bool

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	bool keyhandle = ll.toBooleanIndex(2);
	term->setState(FlagKeyHandle, keyhandle);

	ll.pushBoolean(keyhandle).setFieldTableIndex("keyhandle", 1);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_render_texture(lua_State* L)
{
    // params: swe_terminal, swe_texture, [srcx, srcy, srcw, srch], [dstx, dsty, dstw, dsth]
    // params: swe_terminal, swe_texture, rect src, rect dst

    LuaState ll(L);

    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);
    SWE_Texture* ptr = SWE_Texture::get(ll, 2, __FUNCTION__);
    
    if(term && ptr)
    {
	Rect src, dst;
        int params = ll.stackSize();

	if(ll.isTableIndex(3))
	{
	    src = SWE_Rect::get(ll, 3, __FUNCTION__);

	    if(ll.isTableIndex(4))
	    {
		dst = SWE_Rect::get(ll, 4, __FUNCTION__);
	    }
	    else
	    {
    		dst.x = ll.toIntegerIndex(4);
    		dst.y = ll.toIntegerIndex(5);
    		dst.w = 6 > params ? src.w : ll.toIntegerIndex(6);
    		dst.h = 6 > params ? src.h : ll.toIntegerIndex(7);
	    }
	}
	else
	{
    	    src.x = ll.toIntegerIndex(3);
    	    src.y = ll.toIntegerIndex(4);
	    src.w = ll.toIntegerIndex(5);
    	    src.h = ll.toIntegerIndex(6);
    	    dst.x = ll.toIntegerIndex(7);
    	    dst.y = ll.toIntegerIndex(8);
    	    dst.w = 9 > params ? src.w : ll.toIntegerIndex(9);
    	    dst.h = 9 > params ? src.h : ll.toIntegerIndex(10);
	}

	term->renderTexture(*ptr, src, dst);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_to_json(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
        bool visible = ll.getFieldTableIndex("visible", 1).getTopBoolean();
        bool modality = ll.getFieldTableIndex("modality", 1).getTopBoolean();
        bool keyhandle = ll.getFieldTableIndex("keyhandle", 1).getTopBoolean();
        int result = ll.getFieldTableIndex("result", 1).getTopInteger();
        int posx = ll.getFieldTableIndex("posx", 1).getTopInteger();
        int posy = ll.getFieldTableIndex("posy", 1).getTopInteger();
        int width = ll.getFieldTableIndex("width", 1).getTopInteger();
        int height = ll.getFieldTableIndex("height", 1).getTopInteger();
        int cols = ll.getFieldTableIndex("cols", 1).getTopInteger();
        int rows = ll.getFieldTableIndex("rows", 1).getTopInteger();
        ll.stackPop(10);

        std::string str = StringFormat("{\"type\":\"swe.terminal\",\"posx\":%1,\"posy\":%2,\"width\":%3,\"height\":%4,\"visible\":%5,\"modality\":%6,\"keyhandle\":%7,\"result\":%8,\"cols\":%9,\"rows\":%10}").
            arg(posx).arg(posy).arg(width).arg(height).arg(visible).arg(modality).arg(keyhandle).arg(result).arg(cols).arg(rows);

        ll.pushString(str);
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_terminal_point_inarea(lua_State* L)
{
    // params: swe_terminal, ptx, pty
    // params: swe_terminal, point

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	Point pt;

	// params: swe_terminal, point
	if(ll.isTableIndex(2))
	    pt = SWE_Point::get(ll, 2, __FUNCTION__);
	else
	{
    	    pt.x = ll.toIntegerIndex(2);
    	    pt.y = ll.toIntegerIndex(3);
	}

	bool res = term->isAreaPoint(pt);
        ll.pushBoolean(res);

        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

////// terminal functions
int SWE_terminal_fill_fgcolor(lua_State* L)
{
    // params: swe_terminal, color, cols, rows

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	ARGB colorFg = ll.toIntegerIndex(2);
	int cols = 3 > params ? 1 : ll.toIntegerIndex(3);
	int rows = 4 > params ? 1 : ll.toIntegerIndex(4);

	*term << fill::fgcolor(Color(colorFg).toColorIndex(), TermSize(cols, rows));

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_fill_bgcolor(lua_State* L)
{
    // params: swe_terminal, color, cols, rows

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	ARGB colorBg = ll.toIntegerIndex(2);
	int cols = 3 > params ? 1 : ll.toIntegerIndex(3);
	int rows = 4 > params ? 1 : ll.toIntegerIndex(4);

	*term << fill::bgcolor(Color(colorBg).toColorIndex(), TermSize(cols, rows));

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_fill_colors(lua_State* L)
{
    // params: swe_terminal, color, color, cols, rows

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	ARGB colorFg = ll.toIntegerIndex(2);
	ARGB colorBg = 3 > params ? Color::Transparent : ll.toIntegerIndex(3);
	int cols = 4 > params ? 1 : ll.toIntegerIndex(4);
	int rows = 5 > params ? 1 : ll.toIntegerIndex(5);

	*term << fill::colors(Color(colorFg).toColorIndex(), Color(colorBg).toColorIndex(), TermSize(cols, rows));

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_fill_property(lua_State* L)
{
    // params: swe_terminal, blended, style, hinting, cols, rows

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	int blended = ll.toIntegerIndex(2);
	int style = ll.toIntegerIndex(3);
	int hinting = ll.toIntegerIndex(4);
	int cols = 5 > params ? 1 : ll.toIntegerIndex(5);
	int rows = 6 > params ? 1 : ll.toIntegerIndex(6);

	*term << fill::property(CharsetProperty(blended, style, hinting), TermSize(cols, rows));

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_fill_charset(lua_State* L)
{
    // params: swe_terminal, charset, cols, rows

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	int charset = ll.toIntegerIndex(2);
	int cols = 3 > params ? 1 : ll.toIntegerIndex(3);
	int rows = 4 > params ? 1 : ll.toIntegerIndex(4);

	*term << fill::charset(charset, TermSize(cols, rows));

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_fgcolor(lua_State* L)
{
    // params: swe_terminal, color

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	ARGB colorFg = ll.toIntegerIndex(2);
	*term << set::fgcolor(Color(colorFg).toColorIndex());

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_bgcolor(lua_State* L)
{
    // params: swe_terminal, color

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	ARGB colorBg = ll.toIntegerIndex(2);
	*term << set::bgcolor(Color(colorBg).toColorIndex());

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_colors(lua_State* L)
{
    // params: swe_terminal, color, color

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	ARGB colorFg = ll.toIntegerIndex(2);
	ARGB colorBg = 3 > params ? Color::Transparent : ll.toIntegerIndex(3);

	*term << set::colors(Color(colorFg).toColorIndex(), Color(colorBg).toColorIndex());

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_wrap(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << set::wrap();

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_padding(lua_State* L)
{
    // params: swe_terminal, left, right, top, bottom

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int left   = ll.toIntegerIndex(2);
	int right  = ll.toIntegerIndex(3);
	int top    = ll.toIntegerIndex(4);
	int bottom = ll.toIntegerIndex(5);

	*term << set::padding(left, right, top, bottom);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_reset_colors(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << reset::colors();

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_reset_fgcolor(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << reset::fgcolor();

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_reset_bgcolor(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << reset::bgcolor();

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_reset_padding(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << reset::padding();

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_reset_wrap(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << reset::wrap();

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_position(lua_State* L)
{
    // params: swe_terminal, posx, posy

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	if(2 > params)
	{
	    const TermPos & tp = term->cursor();
	    ll.pushInteger(tp.posx());
	    ll.pushInteger(tp.posy());
	    return 2;
	}

	int posx = ll.toIntegerIndex(2);
	int posy = ll.toIntegerIndex(3);

	*term << cursor::set(posx, posy);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_topleft(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << cursor::set(0, 0);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_topright(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << cursor::set(term->cols() - 1, 0);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_bottomleft(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << cursor::set(0, term->rows() - 1);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_bottomright(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << cursor::set(term->cols() - 1, term->rows() - 1);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_moveup(lua_State* L)
{
    // params: swe_terminal, count

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();
	int counts = 2 > params ? 1 : ll.toIntegerIndex(2);
	*term << cursor::up(counts);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_movedown(lua_State* L)
{
    // params: swe_terminal, count

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();
	int counts = 2 > params ? 1 : ll.toIntegerIndex(2);
	*term << cursor::down(counts);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_moveleft(lua_State* L)
{
    // params: swe_terminal, count

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();
	int counts = 2 > params ? 1 : ll.toIntegerIndex(2);
	*term << cursor::left(counts);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_moveright(lua_State* L)
{
    // params: swe_terminal, count

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();
	int counts = 2 > params ? 1 : ll.toIntegerIndex(2);
	*term << cursor::right(counts);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_movefirst(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << cursor::move(MoveFirst);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_cursor_movelast(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << cursor::move(MoveLast);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_set_flush(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	*term << set::flush();
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_draw_hline(lua_State* L)
{
    // params: swe_terminal, length, line

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();
	int length = ll.toIntegerIndex(2);
	int symbol = 3 > params ? acs::hline(LineThin) : ll.toIntegerIndex(3);

	// fg/bg color
	if(3 < params)
	{
	    ARGB argb1 = ll.toIntegerIndex(4);
	    if(4 < params)
	    {
		ARGB argb2 = ll.toIntegerIndex(5);
		*term << fill::colors(Color(argb1).toColorIndex(), Color(argb2).toColorIndex(), TermSize(length, 1)) << cursor::left(length);
	    }
	    else
	    {
		*term << fill::fgcolor(Color(argb1).toColorIndex(), TermSize(length, 1)) << cursor::left(length);
	    }
	}

	*term << draw::hline(length, symbol);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_draw_vline(lua_State* L)
{
    // params: swe_terminal, length, line

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();
	int length = ll.toIntegerIndex(2);
	int symbol = 3 > params ? acs::vline(LineThin) : ll.toIntegerIndex(3);

	// fg/bg color
	if(3 < params)
	{
	    ARGB argb1 = ll.toIntegerIndex(4);
	    if(4 < params)
	    {
		ARGB argb2 = ll.toIntegerIndex(5);
		*term << fill::colors(Color(argb1).toColorIndex(), Color(argb2).toColorIndex(), TermSize(1, length)) << cursor::left() << cursor::up(length-1);
	    }
	    else
	    {
		*term << fill::fgcolor(Color(argb1).toColorIndex(), TermSize(1, length)) << cursor::left() << cursor::up(length-1);
	    }
	}
	*term << draw::vline(length, symbol);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_draw_rect(lua_State* L)
{
    // params: swe_terminal, rtw, rth, line

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();
	int rtw = 2 > params ? term->cols() : ll.toIntegerIndex(2);
	int rth = 3 > params ? term->rows() : ll.toIntegerIndex(3);
	line_t line = LineThin;

	if(3 < params)
	{
	    int type = ll.toIntegerIndex(4);
	    switch(type)
	    {
		case LineAscii:
		case LineThin:
		case LineBold:
		case LineDouble:
		    line = static_cast<line_t>(type);
		    break;

		default:
		    ERROR("unknown line type: " << type);
		    break;
	    }
	}

	const TermPos & tp = term->cursor();
	*term << draw::rect(tp.posx(), tp.posy(), rtw, rth, line);

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_draw_text(lua_State* L)
{
    // params: swe_terminal, text, .. text

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	for(int ii = 2; ii <= params; ++ii)
	{
	    std::string text = ll.toStringIndex(ii);
	    if(text.size()) *term << text;
	}

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_draw_char(lua_State* L)
{
    // params: swe_terminal, char, .. char

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	int params = ll.stackSize();

	for(int ii = 2; ii <= params; ++ii)
	{
	    if(ll.isNumberIndex(ii))
	    {
		int ch = ll.toNumberIndex(ii);
		*term << ch;
	    }
	    else
	    if(ll.isStringIndex(ii))
	    {
		std::string text = ll.toStringIndex(ii);
		if(text.size()) *term << text.front();
	    }
	    else
	    {
		ERROR("unknown type: " << ll.getTypeName(ll.getTypeIndex(ii)));
	    }
	}

	ll.pushValueIndex(1);
	return 1;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_terminal_charset_info(lua_State* L)
{
    // params: swe_terminal

    LuaState ll(L);
    SWE_Terminal* term = SWE_Terminal::get(ll, 1, __FUNCTION__);

    if(term)
    {
	const TermCharset* tc = term->charset();
	if(tc)
	{
	    ll.pushTable();

	    const UnicodeColor & uc = tc->charset();
	    const CharsetProperty & cp = tc->property();

	    ll.pushString(String::hex(uc.unicode(), 4)).setFieldTableIndex("unicode", -2);
	    ll.pushString(uc.fgcolor().toString()).setFieldTableIndex("fgcolor", -2);
	    ll.pushString(uc.bgcolor().toString()).setFieldTableIndex("bgcolor", -2);
	    ll.pushInteger(cp.render()).setFieldTableIndex("blended", -2);
	    ll.pushInteger(cp.style()).setFieldTableIndex("style", -2);
	    ll.pushInteger(cp.hinting()).setFieldTableIndex("hinting", -2);

	    return 1;
	}
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

const struct luaL_Reg SWE_terminal_functions[] = {
    { "SetVisible",     SWE_terminal_set_visible },      // [void], table terminal, bool flag
    { "SetResult",      SWE_terminal_set_result },       // [void], table terminal, int code
    { "SetModality",    SWE_terminal_set_modality },     // [void], table terminal, int code
    { "SetKeyHandle",   SWE_terminal_set_keyhandle },    // [void], table terminal, int code
    { "SetPosition",    SWE_terminal_set_position },     // [void], table window. point pos
    { "SetTermSize",    SWE_terminal_set_termsize },     // [void], table window. int cols, int rows
    { "RenderTexture",  SWE_terminal_render_texture },   // [void]. table terminal, table texture, rect, rect
    { "PointInArea",	SWE_terminal_point_inarea },     // [bool], table terminal, int, int
    { "ToJson",		SWE_terminal_to_json },          // [string], table terminal
    // 
    { "FillFGColor",	SWE_terminal_fill_fgcolor },	// [swe_terminal], table terminal, color, cols, rows
    { "FillBGColor",	SWE_terminal_fill_bgcolor },	// [swe_terminal], table terminal, color, cols, rows
    { "FillColors",	SWE_terminal_fill_colors },	// [swe_terminal], table terminal, color, color, cols, rows
    { "FillCharset",	SWE_terminal_fill_charset },	// [swe_terminal], table terminal, charset, cols, rows
    { "FillProperty",	SWE_terminal_fill_property },	// [swe_terminal], table terminal, blended, style, hinting, cols, rows
    { "CursorPosition",	SWE_terminal_cursor_position },	// [swe_terminal], table terminal, posx, posy
    { "CursorTopLeft",	SWE_terminal_cursor_topleft },	// [swe_terminal], table terminal
    { "CursorTopRight",	SWE_terminal_cursor_topright },	// [swe_terminal], table terminal
    { "CursorBottomLeft", SWE_terminal_cursor_bottomleft },   // [swe_terminal], table terminal
    { "CursorBottomRight", SWE_terminal_cursor_bottomright }, // [swe_terminal], table terminal
    { "CursorMoveUp",	SWE_terminal_cursor_moveup },	// [swe_terminal], table terminal, int count
    { "CursorMoveDown",	SWE_terminal_cursor_movedown },	// [swe_terminal], table terminal, int count
    { "CursorMoveLeft",	SWE_terminal_cursor_moveleft },	// [swe_terminal], table terminal, int count
    { "CursorMoveRight", SWE_terminal_cursor_moveright }, // [swe_terminal], table terminal, int count
    { "CursorMoveFirst", SWE_terminal_cursor_movefirst }, // [swe_terminal], table terminal
    { "CursorMoveLast", SWE_terminal_cursor_movelast }, // [swe_terminal], table terminal
    { "ResetFGColor",	SWE_terminal_reset_fgcolor },	// [swe_terminal], table terminal
    { "ResetBGColor",	SWE_terminal_reset_bgcolor },	// [swe_terminal], table terminal
    { "ResetColors",	SWE_terminal_reset_colors },	// [swe_terminal], table terminal
    { "ResetPadding",	SWE_terminal_reset_padding },	// [swe_terminal], table terminal
    { "ResetWrap",	SWE_terminal_reset_wrap },	// [swe_terminal], table terminal
    { "SetFGColor",	SWE_terminal_set_fgcolor },	// [swe_terminal], table terminal, color
    { "SetBGColor",	SWE_terminal_set_bgcolor },	// [swe_terminal], table terminal, color
    { "SetColors",	SWE_terminal_set_colors },	// [swe_terminal], table terminal, color, color
    { "SetWrap",	SWE_terminal_set_wrap },	// [swe_terminal], table terminal
    { "SetPadding",	SWE_terminal_set_padding },	// [swe_terminal], table terminal, int left, int right, int top, int bottom
    { "SetFlush",	SWE_terminal_set_flush },	// [void], table terminal
    { "DrawHLine",	SWE_terminal_draw_hline },	// [swe_terminal], table terminal, int length, int line, fgcolor, bgcolor
    { "DrawVLine",	SWE_terminal_draw_vline },	// [swe_terminal], table terminal, int length, int line, fgcolor, bgcolor
    { "DrawRect",	SWE_terminal_draw_rect },	// [swe_terminal], table terminal, width, height, int line
    { "DrawText",	SWE_terminal_draw_text },	// [swe_terminal], table terminal, text, ..., text
    { "DrawChar",	SWE_terminal_draw_char },	// [swe_terminal], table terminal, char, ..., char
    { "CharsetInfo",	SWE_terminal_charset_info },	// [table], table terminal
    // virtual
    { "TextureInvalidEvent",SWE_terminal_empty },
    { "WindowCreateEvent", SWE_terminal_empty },
    { "WindowCloseEvent",  SWE_terminal_empty },
    { "DisplayResizeEvent",SWE_terminal_empty },
    { "MousePressEvent",   SWE_terminal_empty },
    { "MouseReleaseEvent", SWE_terminal_empty },
    { "MouseClickEvent",   SWE_terminal_empty },
    { "MouseFocusEvent",   SWE_terminal_empty },
    { "MouseMotionEvent",  SWE_terminal_empty },
    { "KeyPressEvent",     SWE_terminal_empty },
    { "KeyReleaseEvent",   SWE_terminal_empty },
    { "ScrollUpEvent",     SWE_terminal_empty },
    { "ScrollDownEvent",   SWE_terminal_empty },
    { "SystemUserEvent",   SWE_terminal_empty },
    { "SystemTickEvent",   SWE_terminal_empty },
    { "RenderWindow",      SWE_terminal_empty },
    { NULL, NULL }
};

int SWE_terminal_create(lua_State* L)
{
    // SWE.Terminal(self, fontrender, cols, rows, table parent)
    LuaState ll(L);

    SWE_FontRender* frs = SWE_FontRender::get(ll, 2, __FUNCTION__);
    Window* parent = NULL;

    // get parent
    if(ll.isTopTable())
	parent = SWE_Terminal::get(ll, -1, __FUNCTION__);
    else
    // set parent DisplayWindow
	parent = SWE_Scene::window_getindex(ll, 1);

    //
    ll.pushTable();
    int cols = 0;
    int rows = 0;

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_Terminal**>(ll.pushUserData(sizeof(SWE_Terminal*)));

    if(frs)
    {
	cols = ll.toIntegerIndex(3);
	rows = ll.toIntegerIndex(4);
	*ptr = new SWE_Terminal(L, *frs, cols, rows, *parent);
    }
    else
    {
	*ptr = new SWE_Terminal(L, systemFont(), *parent);
    }

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_terminal_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    ll.pushString("__type").pushString("swe.terminal").setTableIndex(-3);
    ll.pushString("visible").pushBoolean((*ptr)->isVisible()).setTableIndex(-3);
    ll.pushString("modality").pushBoolean(false).setTableIndex(-3);
    ll.pushString("keyhandle").pushBoolean(false).setTableIndex(-3);
    ll.pushString("result").pushInteger(0).setTableIndex(-3);
    ll.pushString("posx").pushInteger((*ptr)->position().x).setTableIndex(-3);
    ll.pushString("posy").pushInteger((*ptr)->position().y).setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("cols").pushInteger(cols).setTableIndex(-3);
    ll.pushString("rows").pushInteger(rows).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_terminal_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

    SWE_Scene::window_add(ll);

    return 1;
}

int SWE_terminal_destroy(lua_State* L)
{
    LuaState ll(L);
        
    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_Terminal**>(ll.getTopUserData());
        if(ptr && *ptr)
        {
            DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");
	    // auto remove SWE_Scene::window_remove(ll, *ptr);

	    (*ptr)->windowCloseEvent();

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

int SWE_char_ltee(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::ltee(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_rtee(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::rtee(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_ttee(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::ttee(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_btee(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::btee(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_ulcorner(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::ulcorner(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_urcorner(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::urcorner(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_llcorner(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::llcorner(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_lrcorner(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::lrcorner(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_hline(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::hline(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_vline(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::vline(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

int SWE_char_plus(lua_State* L)
{
    // params: line

    LuaState ll(L);
    int type = ll.toIntegerIndex(1);

    switch(type)
    {
	case LineAscii:
	case LineThin:
	case LineBold:
	case LineDouble:
	    ll.pushInteger(acs::plus(static_cast<line_t>(type)));
	    return 1;

	default:
	    ERROR("unknown line type: " << type);
	    break;
    }
    return 0;
}

const struct luaL_Reg SWE_char_functions[] = {
    { "LTee",     SWE_char_ltee },               // [int], int line
    { "RTee",     SWE_char_rtee },               // [int], int line
    { "TTee",     SWE_char_ttee },               // [int], int line
    { "BTee",     SWE_char_btee },               // [int], int line
    { "ULCorner",     SWE_char_ulcorner },       // [int], int line
    { "URCorner",     SWE_char_urcorner },       // [int], int line
    { "LLCorner",     SWE_char_llcorner },       // [int], int line
    { "LRCorner",     SWE_char_lrcorner },       // [int], int line
    { "VLine",     SWE_char_vline },             // [int], int line
    { "HLine",     SWE_char_hline },             // [int], int line
    { "Plus",     SWE_char_plus },               // [int], int line
    { NULL, NULL }
};

void SWE_Terminal::registers(LuaState & ll)
{
    // SWE.Terminal
    ll.pushTable("SWE.Terminal");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_terminal_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();

    // SWE.Property constants
    ll.pushTable("SWE.Property");
    ll.pushInteger(RenderSolid).setFieldTableIndex("RenderSolid", -2);
    ll.pushInteger(RenderBlended).setFieldTableIndex("RenderBlended", -2);
    ll.pushInteger(RenderShaded).setFieldTableIndex("RenderShaded", -2);
    ll.pushInteger(StyleNormal).setFieldTableIndex("StyleNormal", -2);
    ll.pushInteger(StyleBold).setFieldTableIndex("StyleBold", -2);
    ll.pushInteger(StyleItalic).setFieldTableIndex("StyleItalic", -2);
    ll.pushInteger(StyleUnderLine).setFieldTableIndex("StyleUnderLine", -2);
    ll.pushInteger(StyleStrikeThrough).setFieldTableIndex("StyleStrikeThrough", -2);
    ll.pushInteger(HintingNormal).setFieldTableIndex("HintingNormal", -2);
    ll.pushInteger(HintingLight).setFieldTableIndex("HintingLight", -2);
    ll.pushInteger(HintingMono).setFieldTableIndex("HintingMono", -2);
    ll.pushInteger(HintingNone).setFieldTableIndex("HintingNone", -2);
    ll.stackPop();

    // SWE.Line constants
    ll.pushTable("SWE.Line");
    ll.pushInteger(LineAscii).setFieldTableIndex("Ascii", -2);
    ll.pushInteger(LineThin).setFieldTableIndex("Thin", -2);
    ll.pushInteger(LineBold).setFieldTableIndex("Bold", -2);
    ll.pushInteger(LineDouble).setFieldTableIndex("Double", -2);
    ll.stackPop();

    // SWE.Char constants
    ll.pushTable("SWE.Char");
    ll.setFunctionsTableIndex(SWE_char_functions, -1);
    ll.stackPop();
}
