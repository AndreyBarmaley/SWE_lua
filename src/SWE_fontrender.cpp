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
#include "SWE_fontrender.h"

int SWE_fontrender_create_psf(lua_State*);
int SWE_fontrender_create_ttf(lua_State*);
int SWE_fontrender_destroy(lua_State*);

SWE_FontRender* SWE_FontRender::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex))
    {
        ERROR("table not found" << ": " << tableIndex);
        return NULL;
    }

    if(! ll.getFieldTableIndex("userdata", tableIndex).isTopUserData())
    {
        ERROR(funcName << ": " << "not userdata: " << ll.getTopTypeName());
        return NULL;
    }

    auto ptr = static_cast<SWE_FontRender**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////////////////////////////////////
int SWE_fontrender_symbol_advance(lua_State* L)
{
    // params: swe_fontrender, symbol int

    LuaState ll(L);
    int symbol = ll.toIntegerIndex(2);

    SWE_FontRender* frs = SWE_FontRender::get(ll, 1, __FUNCTION__);

    if(frs)
    {
        int width = frs->symbolAdvance(symbol);

	// userdata, width
	ll.stackPop().pushInteger(width);
	return 1;
    }
    else
    {
        ERROR("userdata empty");
    }

    return 0;
}


int SWE_fontrender_create_ttf(lua_State* L)
{
    // SWE.FontRender(self, string, int, boolean, int, int)
    LuaState ll(L);
    int params = ll.stackSize();

    if(3 > params || ! ll.isStringIndex(2) || ! ll.isIntegerIndex(3))
    {
	ERROR("require minimum params: " << "string font, int size");
	ll.pushNil();
	return 1;
    }

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_FontRender**>(ll.pushUserData(sizeof(SWE_FontRender*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    std::string font = SWE_Tools::toFullFileName(ll, ll.toStringIndex(2));
    int fontsz = ll.toIntegerIndex(3);
    bool blended = 4 > params ? false : ll.toBooleanIndex(4);
    int style = 5 > params ? StyleNormal : ll.toIntegerIndex(5);
    int hinting = 6 > params ? HintingNormal : ll.toIntegerIndex(6);

    // SWE_FontRender: font, size, blend, style, hinting
    const FontRender* frs = new FontRenderTTF(font, fontsz, blended, style, hinting);
    if(! frs->isValid())
    {
	delete frs;
	frs = & systemFont();
	DEBUG("used system font: FontAltC8x16");
    }

    *ptr = (SWE_FontRender*) frs;

    // add values
    ll.pushString("font").pushString(font).setTableIndex(-3);
    ll.pushString("size").pushInteger(fontsz).setTableIndex(-3);
    ll.pushString("blended").pushBoolean(blended).setTableIndex(-3);
    ll.pushString("style").pushInteger(style).setTableIndex(-3);
    ll.pushString("hinting").pushInteger(hinting).setTableIndex(-3);

    ll.pushString("fixedWidth").pushInteger((*ptr)->symbolAdvance(0x20)).setTableIndex(-3);
    ll.pushString("lineHeight").pushInteger((*ptr)->lineSkipHeight()).setTableIndex(-3);

    // set functions
    ll.pushFunction(SWE_fontrender_symbol_advance).setFieldTableIndex("SymbolAdvance", -2);

    return 1;
}

int SWE_fontrender_create_psf(lua_State* L)
{
    // empty params
    LuaState ll(L);
    int params = ll.stackSize();

    if(4 > params || ! ll.isStringIndex(2) || ! ll.isIntegerIndex(3) || ! ll.isIntegerIndex(4))
    {
	ERROR("require minimum params: " << "string font, int width, int height");
	ll.pushNil();
	return 1;
    }

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_FontRender**>(ll.pushUserData(sizeof(SWE_FontRender*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    std::string font = SWE_Tools::toFullFileName(ll, ll.toStringIndex(2));
    int fsw = ll.toIntegerIndex(3);
    int fsh = ll.toIntegerIndex(4);

    // SWE_FontRender: font, size
    const FontRender* frs = new FontRenderPSF(font, Size(fsw, fsh));
    if(! frs->isValid())
    {
	delete frs;
	frs = & systemFont();
	DEBUG("used system font: FontAltC8x16");
    }

    *ptr = (SWE_FontRender*) frs;

    // add values
    ll.pushString("font").pushString(font).setTableIndex(-3);

    ll.pushString("fixedWidth").pushInteger((*ptr)->symbolAdvance(0x20)).setTableIndex(-3);
    ll.pushString("lineHeight").pushInteger((*ptr)->lineSkipHeight()).setTableIndex(-3);

    // set functions
    ll.pushFunction(SWE_fontrender_symbol_advance).setFieldTableIndex("SymbolAdvance", -2);

    return 1;
}

int SWE_fontrender_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_FontRender**>(ll.getTopUserData());
        if(ptr && *ptr)
        {
            DEBUG(String::hex64(reinterpret_cast<u64>(ptr)) << ": [" << String::hex64(reinterpret_cast<u64>(*ptr)) << "]");

	    if((FontRender*) *ptr != (FontRender*) & systemFont())
	    {
		if((*ptr)->isTTF())
        	{
		    delete (FontRenderTTF*) *ptr;
		}
        	else
		{
		    delete (FontRenderPSF*) *ptr;
		}
	    }

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

void SWE_FontRender::registers(LuaState & ll)
{
    // SWE.Align constants
    ll.pushTable("SWE.Align");
    ll.pushInteger(AlignLeft).setFieldTableIndex("Left", -2);
    ll.pushInteger(AlignRight).setFieldTableIndex("Right", -2);
    ll.pushInteger(AlignTop).setFieldTableIndex("Top", -2);
    ll.pushInteger(AlignBottom).setFieldTableIndex("Bottom", -2);
    ll.pushInteger(AlignCenter).setFieldTableIndex("Center", -2);
    ll.stackPop();
    
    // SWE.Font constants
    ll.pushTable("SWE.Font");
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

    // SWE.FontRender
    ll.pushTable("SWE.FontRender");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_fontrender_create_ttf).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
