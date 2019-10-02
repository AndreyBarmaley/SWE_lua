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

struct lua_State;

int SWE_terminal_create(lua_State*);
int SWE_terminal_destroy(lua_State*);

class SWE_Terminal : public TermWindow
{
protected:
    LuaState    ll;

    void        windowCreateEvent(void) override;
    void        textureInvalidEvent(void) override;
    void        displayResizeEvent(const Size &, bool) override;
    bool        mousePressEvent(const ButtonEvent &) override;
    bool        mouseReleaseEvent(const ButtonEvent &) override;
    bool        mouseMotionEvent(const Point &, u32 buttons) override;
    bool        mouseClickEvent(const ButtonsEvent &) override;
    void        mouseFocusEvent(void) override;
    void        mouseLeaveEvent(void) override;
    bool        keyPressEvent(const KeySym &) override;
    bool        keyReleaseEvent(const KeySym &) override;
    bool        scrollUpEvent(const Point &) override;
    bool        scrollDownEvent(const Point &) override;
    bool        userEvent(int, void*) override;
    void        tickEvent(u32 ms) override;

public:
    SWE_Terminal(lua_State*, const FontRender &, Window &);
    SWE_Terminal(lua_State*, const FontRender &, int cols, int rows, Window &);

    void        renderWindow(void) override;
    void        windowCloseEvent(void);

    static SWE_Terminal* get(LuaState &, int tableIndex, const char* funcName);
    static void registers(LuaState &);
};

#endif
