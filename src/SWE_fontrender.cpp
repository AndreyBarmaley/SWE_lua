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
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.fontrender"))
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

    auto ptr = static_cast<SWE_FontRender**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

/////////////////////////////////////////////////////////////////////
int SWE_fontrender_to_json(lua_State* L)
{
    // params: swe_fontrender

    LuaState ll(L);
    SWE_FontRender* frs = SWE_FontRender::get(ll, 1, __FUNCTION__);

    if(frs)
    {
	std::string font = ll.getFieldTableIndex("font", 1).getTopString();
	if(font == "system")
	{
	    ll.stackPop(1);

    	    std::string str = StringFormat("{\"type\":\"%1\",\"font\":\"%2\"}").arg("swe.fontrender").arg(font);
    	    ll.pushString(str);
	}
	else
	{
	    int size = ll.getFieldTableIndex("size", 1).getTopInteger();
	    std::string blended = ll.getFieldTableIndex("blended", 1).getTopString();
	    int style = ll.getFieldTableIndex("style", 1).getTopInteger();
	    int hinting = ll.getFieldTableIndex("hinting", 1).getTopInteger();

	    ll.stackPop(5);

    	    std::string str = StringFormat("{\"type\":\"%1\",\"font\":\"%2\",\"size\":%3,\"blended\":%4,\"style\":%5,\"hinting\":%6}").
		arg("swe.fontrender").arg(font).arg(size).arg(blended).arg(style).arg(hinting);
    	    ll.pushString(str);
	}
	
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_fontrender_tostring(lua_State* L)
{
    // params: swe_fontrender

    LuaState ll(L);
    SWE_FontRender* frs = SWE_FontRender::get(ll, 1, __FUNCTION__);

    if(frs)
    {
	std::string font = ll.getFieldTableIndex("font", 1).getTopString();
	if(font == "system")
	{
	    // remove field
	    ll.stackPop(1);
    	    ll.pushString(StringFormat("%1[%2]").arg("swe.fontrender").arg(font));
	}
	else
	{
	    int size = ll.getFieldTableIndex("size", 1).getTopInteger();
	    std::string blended = ll.getFieldTableIndex("blended", 1).getTopString();
	    int style = ll.getFieldTableIndex("style", 1).getTopInteger();
	    int hinting = ll.getFieldTableIndex("hinting", 1).getTopInteger();

	    ll.stackPop(5);
    	    ll.pushString(StringFormat("%1[%2,%3,%4,%5,%6]").arg("swe.fontrender").arg(font).arg(size).arg(blended).arg(style).arg(hinting));
	}
	
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_fontrender_symbol_advance(lua_State* L)
{
    // params: swe_fontrender, symbol int

    LuaState ll(L);
    SWE_FontRender* frs = SWE_FontRender::get(ll, 1, __FUNCTION__);

    if(frs)
    {
	int symbol = ll.toIntegerIndex(2);
        int width = frs->symbolAdvance(symbol);

	// width
	ll.pushInteger(width);
	return 1;
    }

    ERROR("userdata empty");
    return 0;
}

int SWE_fontrender_split_stringwidth(lua_State* L)
{
    // params: swe_fontrender, int width

    LuaState ll(L);
    SWE_FontRender* frs = SWE_FontRender::get(ll, 1, __FUNCTION__);

    if(frs)
    {
	std::string str = ll.toStringIndex(2);
	int width = ll.toIntegerIndex(3);

	StringList list = frs->splitStringWidth(str, width);
	for(auto it = list.begin(); it != list.end(); ++it)
	    ll.pushString(*it);

	return list.size();
    }

    ERROR("userdata empty");
    return 0;
}

const struct luaL_Reg SWE_fontrender_functions[] = {
    { "ToJson", SWE_fontrender_to_json },		      // [string], swe_fontrender
    { "SymbolAdvance", SWE_fontrender_symbol_advance },       // [int], swe_fontrender, symbol integer
    { "SplitStringWidth", SWE_fontrender_split_stringwidth }, // [list string], swe_fontrender, string, int width
    { NULL, NULL }
};

int SWE_fontrender_create_ttf(lua_State* L)
{
    // SWE.FontRender(self, string, int fsz, int render, int style, int hinting)
    LuaState ll(L);
    int params = ll.stackSize();

    if(3 > params || ! ll.isStringIndex(2) || ! ll.isNumberIndex(3))
    {
	ERROR("require minimum params: " << "string font, int size");
	ll.pushNil();
	return 1;
    }

    ll.pushTable();

    // set: tostring
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_tostring).setFieldTableIndex("__tostring", -2);
    ll.setMetaTableIndex(-2);

    // set userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_FontRender**>(ll.pushUserData(sizeof(SWE_FontRender*)));

    // set metatable: __gc to userdata
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    std::string font = ll.toStringIndex(2);

    if(! Systems::isFile(font))
    {
	std::string font2 = SWE_Tools::toCurrentPath(ll, font);
	if(Systems::isFile(font2)) std::swap(font, font2);
    }

    if(! Systems::isFile(font))
    {
	std::string font2 = SWE_Tools::toRunningPath(ll, font);
	if(Systems::isFile(font2)) std::swap(font, font2);
    }

    if(Systems::isFile(font))
    {
	DEBUG(font);

	int fontsz = ll.toIntegerIndex(3);
	auto blended = static_cast<CharRender>(4 > params ? RenderBlended : ll.toIntegerIndex(4));
	int style = 5 > params ? StyleNormal : ll.toIntegerIndex(5);
	auto hinting = static_cast<CharHinting>(6 > params ? HintingNormal : ll.toIntegerIndex(6));

	// SWE_FontRender: font, size, blend, style, hinting
	const FontRender* frs = new FontRenderTTF(font, fontsz, blended, style, hinting);

	if(frs->isValid())
	{
	    // add values
	    ll.pushString("__type").pushString("swe.fontrender").setTableIndex(-3);
	    ll.pushString("font").pushString(font).setTableIndex(-3);
	    ll.pushString("size").pushInteger(fontsz).setTableIndex(-3);
	    ll.pushString("blended").pushInteger(blended).setTableIndex(-3);
	    ll.pushString("style").pushInteger(style).setTableIndex(-3);
	    ll.pushString("hinting").pushInteger(hinting).setTableIndex(-3);
	}
	else
	{
	    delete frs;
	    frs = & systemFont();
	    DEBUG("used system font: FontAltC8x16");

	    // add values
	    ll.pushString("__type").pushString("swe.fontrender").setTableIndex(-3);
	    ll.pushString("font").pushString("system").setTableIndex(-3);
	}

	*ptr = (SWE_FontRender*) frs;
    }
    else
    {
	ERROR("file not found: " << font);

	// SWE_FontRender: system
	const FontRender* frs = & systemFont();
	*ptr = (SWE_FontRender*) frs;

	// add values
	ll.pushString("__type").pushString("swe.fontrender").setTableIndex(-3);
	ll.pushString("font").pushString("system").setTableIndex(-3);
    }

    ll.pushString("fixedWidth").pushInteger((*ptr)->symbolAdvance(0x20)).setTableIndex(-3);
    ll.pushString("lineHeight").pushInteger((*ptr)->lineSkipHeight()).setTableIndex(-3);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]" << ", " << "fontId: " << String::hex((*ptr)->id().value(), 4));

    // set functions
    ll.setFunctionsTableIndex(SWE_fontrender_functions, -1);

    return 1;
}

int SWE_fontrender_create_psf(lua_State* L)
{
    // empty params
    LuaState ll(L);
    int params = ll.stackSize();

    if(4 > params || ! ll.isStringIndex(2) || ! ll.isNumberIndex(3) || ! ll.isNumberIndex(4))
    {
	ERROR("require minimum params: " << "string font, int width, int height");
	ll.pushNil();
	return 1;
    }

    ll.pushTable();

    // set: tostring
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_tostring).setFieldTableIndex("__tostring", -2);
    ll.setMetaTableIndex(-2);

    // set userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_FontRender**>(ll.pushUserData(sizeof(SWE_FontRender*)));

    // set metatable: __gc to userdata
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    std::string font = ll.toStringIndex(2);

    if(! Systems::isFile(font))
    {
	std::string font2 = SWE_Tools::toCurrentPath(ll, font);
	if(Systems::isFile(font2)) std::swap(font, font2);
    }

    if(! Systems::isFile(font))
    {
	std::string font2 = SWE_Tools::toRunningPath(ll, font);
	if(Systems::isFile(font2)) std::swap(font, font2);
    }

    if(Systems::isFile(font))
    {
	DEBUG(font);

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
	ll.pushString("__type").pushString("swe.fontrender").setTableIndex(-3);
	ll.pushString("font").pushString(font).setTableIndex(-3);
    }
    else
    {
	ERROR("file not found: " << font);

	// SWE_FontRender: system
	const FontRender* frs = & systemFont();
	*ptr = (SWE_FontRender*) frs;

	// add values
	ll.pushString("__type").pushString("swe.fontrender").setTableIndex(-3);
	ll.pushString("font").pushString("system").setTableIndex(-3);
    }

    ll.pushString("fixedWidth").pushInteger((*ptr)->symbolAdvance(0x20)).setTableIndex(-3);
    ll.pushString("lineHeight").pushInteger((*ptr)->lineSkipHeight()).setTableIndex(-3);


    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]" << ", " << "fontId: " << String::hex((*ptr)->id().value(), 4));

    // set functions
    ll.setFunctionsTableIndex(SWE_fontrender_functions, -1);

    return 1;
}

int SWE_fontrender_create_sys(lua_State* L)
{
    // empty params
    LuaState ll(L);

    ll.pushTable();

    // set: tostring
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_tostring).setFieldTableIndex("__tostring", -2);
    ll.setMetaTableIndex(-2);

    // set userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_FontRender**>(ll.pushUserData(sizeof(SWE_FontRender*)));

    // set metatable: __gc to userdata
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_fontrender_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    // SWE_FontRender: system
    const FontRender* frs = & systemFont();
    *ptr = (SWE_FontRender*) frs;

    // add values
    ll.pushString("__type").pushString("swe.fontrender").setTableIndex(-3);
    ll.pushString("font").pushString("system").setTableIndex(-3);

    ll.pushString("fixedWidth").pushInteger((*ptr)->symbolAdvance(0x20)).setTableIndex(-3);
    ll.pushString("lineHeight").pushInteger((*ptr)->lineSkipHeight()).setTableIndex(-3);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]" << ", " << "fontId: " << String::hex((*ptr)->id().value(), 4));

    // set functions
    ll.setFunctionsTableIndex(SWE_fontrender_functions, -1);

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
            DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

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

    // SWE.FontRender
    ll.pushTable("SWE.FontRender");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_fontrender_create_ttf).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();

    ll.pushTable("SWE.FontRender.System");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_fontrender_create_sys).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
