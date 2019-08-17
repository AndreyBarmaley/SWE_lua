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

#ifndef _SWE_LUA_WINDOW_
#define _SWE_LUA_WINDOW_

#include <set>
#include "engine.h"

struct lua_State;

class SWE_Window : public Window
{
protected:
    LuaState	ll;

    void	windowCreateEvent(void) override;
    bool	mousePressEvent(const ButtonEvent &) override;
    bool	mouseReleaseEvent(const ButtonEvent &) override;
    bool	mouseMotionEvent(const Point &, u32 buttons) override;
    bool	mouseClickEvent(const ButtonsEvent &) override;
    void        mouseFocusEvent(void) override;
    void        mouseLeaveEvent(void) override;
    bool	keyPressEvent(int) override;
    bool	keyReleaseEvent(int) override;
    bool        scrollUpEvent(const Point &) override;
    bool        scrollDownEvent(const Point &) override;
    bool        userEvent(int, void*) override;
    void        tickEvent(u32 ms) override;
    void        signalReceive(int, const SignalMember*) override;

public:
    SWE_Window(lua_State*, Window* parent);
    SWE_Window(lua_State*, const Point &, const Size &, Window* parent);

    void        renderWindow(void) override;

    static SWE_Window* get(LuaState &, int tableIndex, const char* funcName);
};

/// \cond PointComp
struct PointComp
{
    bool operator() (const Point & lhs, const Point & rhs) const
    {
	return lhs.y < rhs.y || (lhs.y == rhs.y && (lhs.x < rhs.x));
    }
};

class SWE_Polygon : public SWE_Window
{
protected:
    std::set<Point, PointComp> points;

    void	fillPoints(const Polygon &);
    Rect	aroundArea(void) const;

public:
    SWE_Polygon(lua_State*, const Points &, Window* parent);

    void        renderWindow(void) override;
    void        renderClear(const Color &) const override;
    bool        isAreaPoint(const Point &) const override;

    Points	getPoints(void) const;

    void	includeRegion(const Points &);
    void	excludeRegion(const Points &);
};

namespace SWE_Scene
{
    int		window_add(LuaState &);
    bool	window_push(LuaState &, SWE_Window*);
    bool	window_remove(LuaState &, SWE_Window*);
    SWE_Window* window_getindex(LuaState &, int);

    void	clean(LuaState &);
    void	registers(LuaState &);
}

#endif
