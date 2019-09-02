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

#include "SWE_signal.h"

int SWE_signal_index(lua_State* L)
{
    // params: table, string name
    LuaState ll(L);

    std::string signal = String::toLower(ll.getTopString());
    return ll.getFieldTableIndex(signal, 1).isTopNil() ? 0 : 1;
}

int SWE_signal_tostring(lua_State* L)
{
    // params: int key
    LuaState ll(L);

    if(! ll.isTopInteger())
    {
        ERROR("signal not found");
        return 0;
    }

    int signal = ll.getTopInteger();
    switch(signal)
    {
	case Signal::GestureFingerUp:	ll.pushString("GestureFingerUp"); break;
	case Signal::GestureFingerDown:	ll.pushString("GestureFingerDown"); break;
	case Signal::GestureFingerLeft: ll.pushString("GestureFingerLeft"); break;
	case Signal::GestureFingerRight:ll.pushString("GestureFingerRight"); break;
	case Signal::FingerMoveUp:	ll.pushString("FingerMoveUp"); break;
	case Signal::FingerMoveDown:	ll.pushString("FingerMoveDown"); break;
	case Signal::FingerMoveLeft:	ll.pushString("FingerMoveLeft"); break;
	case Signal::FingerMoveRight:	ll.pushString("FingerMoveRight"); break;
	default:ll.pushString("UnknownSignal"); break;
    }

    return 1;
}

const struct luaL_Reg SWE_signals_functions[] = {
    { "ToString", SWE_signal_tostring },	// [string], int key
    { NULL, NULL }
};

void SWE_Signal::registers(LuaState & ll)
{
    // SWE.Signal
    ll.pushTable("SWE.Signal");
    ll.setFunctionsTableIndex(SWE_signals_functions, -1);

    // SWE.Signal: insert values
    ll.pushInteger(Signal::GestureFingerUp).setFieldTableIndex("gesturefingerup", -2);
    ll.pushInteger(Signal::GestureFingerDown).setFieldTableIndex("gesturefingerdown", -2);
    ll.pushInteger(Signal::GestureFingerLeft).setFieldTableIndex("gesturefingerleft", -2);
    ll.pushInteger(Signal::GestureFingerRight).setFieldTableIndex("gesturefingerright", -2);
    ll.pushInteger(Signal::FingerMoveUp).setFieldTableIndex("fingermoveup", -2);
    ll.pushInteger(Signal::FingerMoveDown).setFieldTableIndex("fingermovedown", -2);
    ll.pushInteger(Signal::FingerMoveLeft).setFieldTableIndex("fingermoveleft", -2);
    ll.pushInteger(Signal::FingerMoveRight).setFieldTableIndex("fingermoveright", -2);

    // SWE.Signal: set metatable: __index
    ll.pushTable(0, 1).pushFunction(SWE_signal_index).setFieldTableIndex("__index", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
