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

#include "SWE_fontrender.h"
#include "SWE_tools.h"
#include "SWE_texture.h"

int SWE_texture_create_rect(lua_State*);
int SWE_texture_create_text(lua_State*);

SWE_Texture* SWE_Texture::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex))
    {
        ERROR("table not found, index: " << tableIndex);
        return NULL;
    }

    if(! ll.getFieldTableIndex("userdata", tableIndex).isTopUserData())
    {
        ERROR(funcName << ": " << "not userdata, index: " << tableIndex << ", " << ll.getTopTypeName());
        return NULL;
    }
    
    auto ptr = static_cast<SWE_Texture**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

////////////////
int SWE_texture_save_tofile(lua_State* L)
{
    LuaState ll(L);

    bool res = false;
    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);

    if(tx)
    {
	std::string file = ll.toStringIndex(2);
	res = tx->save(file);
    }
    else
    {
	ERROR("userdata empty");
    }

    ll.pushBoolean(res);
    return 1;
}

int SWE_texture_render_clear(lua_State* L)
{
    // params: swe_texture, color

    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found" << ", " << "swe.texture");
        return 0;
    }

    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);

    if(tx)
    {
	ARGB argb = ll.toIntegerIndex(2);
	Display::renderClear(Color(argb), *tx);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_render_rect(lua_State* L)
{
    // params: swe_texture, color, posx, posy, width, height, bool

    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found" << ", " << "swe.texture");
        return 0;
    }

    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
    {
	int params = ll.stackSize();

	ARGB argb = ll.toIntegerIndex(2);
	int posx = ll.toIntegerIndex(3);
	int posy = ll.toIntegerIndex(4);
	int width = ll.toIntegerIndex(5);
	int height = ll.toIntegerIndex(6);
	int filled = 7 > params ? false : ll.toBooleanIndex(7);

	if(filled)
	    Display::renderColor(Color(argb), *tx, Rect(posx, posy, width, height));
	else
	    Display::renderRect(Color(argb), *tx, Rect(posx, posy, width, height));
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_render_point(lua_State* L)
{
    // params: swe_texture, color, posx. posy

    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found" << ", " << "swe.texture");
        return 0;
    }

    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
    {
	ARGB argb = ll.toIntegerIndex(2);
	int posx = ll.toIntegerIndex(3);
	int posy = ll.toIntegerIndex(4);

	Display::renderPoint(Color(argb), *tx, Point(posx, posy));
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_render_line(lua_State* L)
{
    // params: swe_texture, color, pt1x, pt1y, pt2x, pt2y

    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found" << ", " << "swe.texture");
        return 0;
    }

    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
    {
	ARGB argb = ll.toIntegerIndex(2);
	int posx1 = ll.toIntegerIndex(3);
	int posy1 = ll.toIntegerIndex(4);
	int posx2 = ll.toIntegerIndex(5);
	int posy2 = ll.toIntegerIndex(6);

	Display::renderLine(Color(argb), *tx, Point(posx1, posy1), Point(posx2, posy2));
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_render_cyrcle(lua_State* L)
{
    // params: swe_texture, color, px, py, int radius, bool filled

    LuaState ll(L);

    if(! ll.isTableIndex(1))
    {
        ERROR("table not found" << ", " << "swe.texture");
        return 0;
    }

    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
    {
	int params = ll.stackSize();

	ARGB argb = ll.toIntegerIndex(2);
	int posx = ll.toIntegerIndex(3);
	int posy = ll.toIntegerIndex(4);
	int radius = ll.toIntegerIndex(5);
	bool filled = 6 > params ? false : ll.toBooleanIndex(6);

	Points points = Tools::renderCircle(Point(posx, posy), radius, filled);

	for(auto it = points.begin(); it != points.end(); ++it)
	    Display::renderPoint(Color(argb), *tx, *it);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_render_texture(lua_State* L)
{
    // params: swe_texture, swe_texture, [srcx, srcy, srcw, srch], [dstx, dsty, dstw, dsth]

    LuaState ll(L);

    if(! ll.isTableIndex(1) || ! ll.isTableIndex(2))
    {
        ERROR("table not found" << ", " << "swe.texture");
        return 0;
    }

    SWE_Texture* tx1 = SWE_Texture::get(ll, 1, __FUNCTION__);
    SWE_Texture* tx2 = SWE_Texture::get(ll, 2, __FUNCTION__);
    
    if(tx1 && tx2)
    {
	int params = ll.stackSize();

	int srcx = ll.toIntegerIndex(3);
	int srcy = ll.toIntegerIndex(4);
	int srcw = ll.toIntegerIndex(5);
	int srch = ll.toIntegerIndex(6);
	int dstx = ll.toIntegerIndex(7);
	int dsty = ll.toIntegerIndex(8);
	int dstw = 9 > params ? srcw : ll.toIntegerIndex(9);
	int dsth = 9 > params ? srch : ll.toIntegerIndex(10);

	Display::renderTexture(*tx2, Rect(srcx, srcy, srcw, srch), *tx1, Rect(dstx, dsty, dstw, dsth));
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_render_text(lua_State* L)
{
    // params: swe_texture, swe_fontrender, string, color, dstx, dsty, int halign, int valign, boolean horizontal

    LuaState ll(L);
    int params = ll.stackSize();

    if(6 > params || ! ll.isTableIndex(1) || ! ll.isTableIndex(2) || ! ll.isStringIndex(3) ||
	! ll.isIntegerIndex(4) || ! ll.isNumberIndex(5) || ! ll.isNumberIndex(6))
    {
        ERROR("require minimum params: " << "table window, table fontrender, string, int color, int dstx, int dsty");
        return 0;
    }

    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    SWE_FontRender* frs = SWE_FontRender::get(ll, 2, __FUNCTION__);

    if(tx && frs)
    {
	std::string text = SWE_Tools::convertEncoding(ll, ll.toStringIndex(3));
	ARGB argb = ll.toIntegerIndex(4);
	int dstx = ll.toIntegerIndex(5);
	int dsty = ll.toIntegerIndex(6);
	int halign = 7 > params ? AlignLeft : ll.toIntegerIndex(7);
	int valign = 8 > params ? AlignTop : ll.toIntegerIndex(8);
	bool horizontal = 9 > params ? true : ll.toBooleanIndex(9);

	Rect area = Display::renderText(*frs, text, Color(argb), *tx, Point(dstx, dsty), halign, valign, horizontal);

	ll.pushInteger(area.x).pushInteger(area.y);
	ll.pushInteger(area.w).pushInteger(area.h);

	return 4;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

const struct luaL_Reg SWE_texture_functions[] = {
    { "SaveToFile",     SWE_texture_save_tofile },   	// [boolean], table: texture, string
    { "RenderClear",    SWE_texture_render_clear },     // table: texture, enum: color
    { "RenderRect",     SWE_texture_render_rect },      // table: texture, enum: color, rect, bool
    { "RenderLine",     SWE_texture_render_line },      // table: texture, enum: color, point, point
    { "RenderCyrcle",   SWE_texture_render_cyrcle },    // table: texture, enum: color, point, int, bool
    { "RenderPoint",    SWE_texture_render_point },     // table: texture, enum: color, point
    { "RenderTexture",  SWE_texture_render_texture },   // table: texture, table: texture, rect, rect
    { "RenderText",     SWE_texture_render_text },      // table: texture, table: fontrender, color, point
    { NULL, NULL }
};

///////////////////////////////////////////////////////////
int SWE_texture_create_rect(lua_State* L)
{
    // SWE.Texture(self, color, color, size, int)
    LuaState ll(L);

    int params = ll.stackSize();

    if(5 > params || ! ll.isIntegerIndex(2) || ! ll.isIntegerIndex(3) || 
	! ll.isNumberIndex(4) || ! ll.isNumberIndex(5))
    {
        ERROR("require minimum params: " << "int color, int color, int width, int height");
        return 0;
    }

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_Texture**>(ll.pushUserData(sizeof(SWE_Texture*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_texture_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    // SWE_Texture init
    ARGB colorRect = ll.toIntegerIndex(2);
    ARGB colorFill = ll.toIntegerIndex(3);
    int width = ll.toIntegerIndex(4);
    int height = ll.toIntegerIndex(5);
    int thickness = 6 > params ? 1 : ll.toIntegerIndex(6);

    *ptr = new SWE_Texture(Display::renderRect(Color(colorRect), Color(colorFill), Size(width, height), thickness));

    // add values
    ll.pushString("__type").pushString("swe.texture").setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("alpha").pushInteger((*ptr)->alphaMod()).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    return 1;
}

int SWE_texture_create_text(lua_State* L)
{
    // SWE.Texture(self, fontrender, string, color, color)
    LuaState ll(L);

    int params = ll.stackSize();

    if(4 > params || ! ll.isTableIndex(2) || ! ll.isStringIndex(3) || ! ll.isIntegerIndex(4))
    {
        ERROR("require minimum params: " << "table fontrender, string, int color");
        return 0;
    }

    SWE_FontRender* frs = SWE_FontRender::get(ll, 2, __FUNCTION__);
    std::string text = SWE_Tools::convertEncoding(ll, ll.toStringIndex(3));
    ARGB colorText = ll.toIntegerIndex(4);
    ARGB colorBack = 5 > params ? Color(Color::Transparent).getARGB() : ll.toIntegerIndex(5);

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_Texture**>(ll.pushUserData(sizeof(SWE_Texture*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_texture_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    // SWE_Texture init
    *ptr = new SWE_Texture(Display::renderText(*frs, text, Color(colorText), Color(colorBack)));

    // add values
    ll.pushString("__type").pushString("swe.texture").setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("alpha").pushInteger((*ptr)->alphaMod()).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    return 1;
}

int SWE_texture_create_image(lua_State* L)
{
    // SWE.Texture(self, string, crop, colorkey)
    LuaState ll(L);

    int params = ll.stackSize();

    if(! ll.isStringIndex(2))
    {
        ERROR("require minimum params: " << "string (image file)");
        return 0;
    }

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_Texture**>(ll.pushUserData(sizeof(SWE_Texture*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_texture_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    std::string filename = SWE_Tools::toFullFileName(ll, ll.toStringIndex(2));

    // SWE_Texture: string (file image)
    if(2 < params)
    {
	int cropx = ll.toIntegerIndex(3);
	int cropy = ll.toIntegerIndex(4);
	int cropw = ll.toIntegerIndex(5);
	int croph = ll.toIntegerIndex(6);
	Surface sf(filename);

	if(0 == cropw || 0 == croph)
	    ERROR("crop size empty");

	if(sf.isValid())
	{
	    Surface crop(Size(cropw, croph));

	    if(7 > params)
	    {
		ARGB argb = ll.toIntegerIndex(7);
		crop.setColorKey(Color(argb));
	    }

	    sf.blit(Rect(cropx, cropy, cropw, croph), crop.rect(), crop);
	    *ptr = new SWE_Texture(Display::createTexture(crop));
	}
	else
	    *ptr = new SWE_Texture();
    }
    else
	*ptr = new SWE_Texture(Display::createTexture(filename));

    // add values
    ll.pushString("__type").pushString("swe.texture").setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("alpha").pushInteger((*ptr)->alphaMod()).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    if(ptr && *ptr)
        DEBUG(String::hex64(reinterpret_cast<u64>(ptr)) << ": [" << String::hex64(reinterpret_cast<u64>(*ptr)) << "]");

    return 1;
}

int SWE_texture_create(lua_State* L)
{
    // SWE.Texture(self, w, h)
    LuaState ll(L);

    ll.pushTable();

    // userdata
    ll.pushString("userdata");
    auto ptr = static_cast<SWE_Texture**>(ll.pushUserData(sizeof(SWE_Texture*)));

    // set metatable: __gc
    ll.pushTable(0, 1);
    ll.pushFunction(SWE_texture_destroy).setFieldTableIndex("__gc", -2);
    ll.setMetaTableIndex(-2).setTableIndex(-3);

    // SWE_Texture: size
    if(ll.isIntegerIndex(2) && ll.isIntegerIndex(3))
    {
	int tw = ll.toIntegerIndex(2);
	int th = ll.toIntegerIndex(3);

	*ptr = new SWE_Texture(Display::createTexture(Size(tw, th)));
    }
    else
    // SWE_Texture: empty
    {
	*ptr = new SWE_Texture();
    }

    // add values
    ll.pushString("__type").pushString("swe.texture").setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("alpha").pushInteger((*ptr)->alphaMod()).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    if(ptr && *ptr)
        DEBUG(String::hex64(reinterpret_cast<u64>(ptr)) << ": [" << String::hex64(reinterpret_cast<u64>(*ptr)) << "]");

    return 1;
}

int SWE_texture_destroy(lua_State* L)
{
    LuaState ll(L);

    if(ll.isTopUserData())
    {
        auto ptr = static_cast<SWE_Texture**>(ll.getTopUserData());
        if(ptr && *ptr)
        {
            DEBUG(String::hex64(reinterpret_cast<u64>(ptr)) << ": [" << String::hex64(reinterpret_cast<u64>(*ptr)) << "]");

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

void SWE_Texture::registers(LuaState & ll)
{
    // SWE.Texture
    ll.pushTable("SWE.Texture");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_texture_create).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();

    ll.pushTable("SWE.Texture.Rect");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_texture_create_rect).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();

    ll.pushTable("SWE.Texture.Text");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_texture_create_text).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();

    ll.pushTable("SWE.Texture.Image");
    // set metatable: __call
    ll.pushTable(0, 1).pushFunction(SWE_texture_create_image).setFieldTableIndex("__call", -2);
    ll.setMetaTableIndex(-2).stackPop();
}
