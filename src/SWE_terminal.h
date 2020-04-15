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

#ifndef _SWE_LUA_TERMINAL_
#define _SWE_LUA_TERMINAL_

#include "engine.h"
#include "SWE_window.h"

struct lua_State;

int SWE_terminal_create(lua_State*);
int SWE_terminal_destroy(lua_State*);

class SWE_Terminal : public TermWindow
{
protected:
    LuaState    ll;

    void        windowCreateEvent(void) override { SWE_window_create_event(ll, *this); }
    void        textureInvalidEvent(void) override { SWE_texture_invalid_event(ll, *this); }
    void        displayResizeEvent(const Size & sz, bool sdl) override { SWE_display_resize_event(ll, *this, sz, sdl); }
    bool        mousePressEvent(const ButtonEvent & be) override { return SWE_mouse_press_event(ll, *this, be); }
    bool        mouseReleaseEvent(const ButtonEvent & be) override { return SWE_mouse_release_event(ll, *this, be); }
    bool        mouseMotionEvent(const Point & pos, u32 buttons) override { return SWE_mouse_motion_event(ll, *this, pos, buttons); }
    void        mouseTrackingEvent(const Point & pos, u32 buttons) override { SWE_mouse_tracking_event(ll, *this, pos, buttons); }
    bool        mouseClickEvent(const ButtonsEvent & be) override { return SWE_mouse_click_event(ll, *this, be); }
    void        mouseFocusEvent(void) override { SWE_mouse_focus_event(ll, *this); }
    void        mouseLeaveEvent(void) override { SWE_mouse_leave_event(ll, *this); }
    bool        keyPressEvent(const KeySym & ks) override { return SWE_key_press_event(ll, *this, ks); }
    bool        keyReleaseEvent(const KeySym & ks) override { return SWE_key_release_event(ll, *this, ks); }
    bool        scrollUpEvent(const Point & pos) override { return SWE_scroll_up_event(ll, *this, pos); }
    bool        scrollDownEvent(const Point & pos) override { return SWE_scroll_down_event(ll, *this, pos); }
    bool        userEvent(int code, void* data) override { return SWE_system_user_event(ll, *this, code, data); }
    void        tickEvent(u32 ms) override { SWE_system_tick_event(ll, *this, ms); }

public:
    SWE_Terminal(lua_State*, const FontRender &, Window &);
    SWE_Terminal(lua_State*, const FontRender &, int cols, int rows, Window &);

    void        renderWindow(void) override { SWE_window_render(ll, *this); }

    static TermWindow* get(LuaState &, int tableIndex, const char* funcName);
    static void registers(LuaState &);
};

#endif
