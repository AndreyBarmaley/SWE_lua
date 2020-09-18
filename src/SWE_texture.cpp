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

#include "SWE_rect.h"
#include "SWE_tools.h"
#include "SWE_fontrender.h"
#include "SWE_texture.h"

int SWE_texture_create_rect(lua_State*);
int SWE_texture_create_text(lua_State*);

SWE_Texture* SWE_Texture::get(LuaState & ll, int tableIndex, const char* funcName)
{
    if(! ll.isTableIndex(tableIndex) ||
	0 != ll.popFieldTableIndex("__type", tableIndex).compare("swe.texture"))
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
    
    auto ptr = static_cast<SWE_Texture**>(ll.getTopUserData());
    ll.stackPop();

    return ptr ? *ptr : NULL;
}

////////////////
int SWE_texture_save_tofile(lua_State* L)
{
    LuaState ll(L);
    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);

    if(tx)
    {
	std::string file = ll.toStringIndex(2);
	bool res = tx->save(file);
	ll.pushBoolean(res);
    }
    else
    {
	ERROR("userdata empty");
	ll.pushBoolean(false);
    }

    return 1;
}

int SWE_texture_render_clear(lua_State* L)
{
    // params: swe_texture, color

    LuaState ll(L);
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
    // params: swe_texture, color, rtx, rty, rtw, rth, bool
    // params: swe_texture, color, rect, bool

    LuaState ll(L);
    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
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
	    Display::renderColor(Color(argb), *tx, rt);
	else
	    Display::renderRect(Color(argb), *tx, rt);
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
    // params: swe_texture, color, point

    LuaState ll(L);
    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
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

	Display::renderPoint(Color(argb), *tx, pt);
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
    // params: swe_texture, color, point1, point2

    LuaState ll(L);
    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
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

	Display::renderLine(Color(argb), *tx, pt1, pt2);
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
    // params: swe_texture, color, point center, int radius, bool filled

    LuaState ll(L);
    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    
    if(tx)
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
    // params: swe_texture, swe_texture, rect src, rect dst


    LuaState ll(L);

    // dst texture
    SWE_Texture* txd = SWE_Texture::get(ll, 1, __FUNCTION__);

    // src texture
    SWE_Texture* txs = SWE_Texture::get(ll, 2, __FUNCTION__);
    
    if(txs && txd)
    {
	Rect src, dst;
        int params = ll.stackSize();

	if(3 > params)
	{
	    src = txs->rect();
	    dst = txd->rect();
	}
	else
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

	Display::renderTexture(*txs, src, *txd, dst);
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_render_text(lua_State* L)
{
    // params: swe_texture, swe_fontrender, string, color, dstx, dsty, int halign, int valign, boolean horizontal, int render, int style, int hinting
    // params: swe_texture, swe_fontrender, string, color, point dst, int halign, int valign, boolean horizontal, int render, int style, int hinting

    LuaState ll(L);

    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);
    SWE_FontRender* frs = SWE_FontRender::get(ll, 2, __FUNCTION__);

    if(tx && frs)
    {
	int params = ll.stackSize();
	std::string text = SWE_Tools::convertEncoding(ll, ll.toStringIndex(3));
	ARGB argb = ll.toIntegerIndex(4);
	Point dst;
	auto halign = AlignLeft;
	auto valign = AlignTop;
	bool horizontal = true;
	auto render = RenderDefault;
	int  style = StyleDefault;
	auto hinting = HintingDefault;

	if(ll.isTableIndex(5))
	{
    	    dst = SWE_Point::get(ll, 5, __FUNCTION__);

    	    if(5 < params)
		halign = static_cast<AlignType>(ll.toIntegerIndex(6));
    	    if(6 < params)
		valign = static_cast<AlignType>(ll.toIntegerIndex(7));
    	    if(7 < params)
		horizontal = ll.toBooleanIndex(8);

    	    if(8 < params)
		render = static_cast<CharRender>(ll.toIntegerIndex(9));
    	    if(9 < params)
		style = ll.toIntegerIndex(10);
    	    if(10 < params)
		hinting = static_cast<CharHinting>(ll.toBooleanIndex(11));
	}
	else
	{
    	    dst.x = ll.toIntegerIndex(5);
    	    dst.y = ll.toIntegerIndex(6);

    	    if(6 < params)
		halign = static_cast<AlignType>(ll.toIntegerIndex(7));
    	    if(7 < params)
		valign = static_cast<AlignType>(ll.toIntegerIndex(8));
    	    if(8 < params)
		horizontal = ll.toBooleanIndex(9);

    	    if(9 < params)
		render = static_cast<CharRender>(ll.toIntegerIndex(10));
    	    if(10 < params)
		style = ll.toIntegerIndex(11);
    	    if(111 < params)
		hinting = static_cast<CharHinting>(ll.toBooleanIndex(12));
	}

	Rect area = Display::renderText(*frs, text, Color(argb), *tx, dst, halign, valign, horizontal, render, style, hinting);

	ll.pushInteger(area.x).pushInteger(area.y).pushInteger(area.w).pushInteger(area.h);
	return 4;
    }
    else
    {
	ERROR("userdata empty");
    }

    return 0;
}

int SWE_texture_to_json(lua_State* L)
{
    // params: swe_texture

    LuaState ll(L);
    SWE_Texture* tx = SWE_Texture::get(ll, 1, __FUNCTION__);

    if(tx)
    {
        int alpha = ll.getFieldTableIndex("alpha", 1).getTopInteger();
        int width = ll.getFieldTableIndex("width", 1).getTopInteger();
        int height = ll.getFieldTableIndex("height", 1).getTopInteger();
        std::string _class = ll.getFieldTableIndex("class", 1).getTopString();
        ll.stackPop(4);

        std::string str = StringFormat("{\"type\":\"%1\",\"width\":%2,\"height\":%3,\"alpha\":%4,\"class\":%5}").
            arg("swe.texture").arg(width).arg(height).arg(alpha).arg(_class);

        ll.pushString(str);
        return 1;
    }

    ERROR("userdata empty");
    return 0;
}

const struct luaL_Reg SWE_texture_functions[] = {
    { "SaveToFile",     SWE_texture_save_tofile },   	// [boolean], table texture, string
    { "RenderClear",    SWE_texture_render_clear },     // [void], table texture, enum: color
    { "RenderRect",     SWE_texture_render_rect },      // [void], table texture, enum: color, rect, bool
    { "RenderLine",     SWE_texture_render_line },      // [void], table texture, enum: color, point, point
    { "RenderCyrcle",   SWE_texture_render_cyrcle },    // [void], table texture, enum: color, point, int, bool
    { "RenderPoint",    SWE_texture_render_point },     // [void], table texture, enum: color, point
    { "RenderTexture",  SWE_texture_render_texture },   // [void], table texture, table texture, rect, rect
    { "RenderText",     SWE_texture_render_text },      // [rect coords], table texture, table fontrender, color, point, halign, valign, horizontal, render, style, hinting
    { "ToJson",         SWE_texture_to_json },          // [void], table texture
    { NULL, NULL }
};

///////////////////////////////////////////////////////////
int SWE_texture_create_rect(lua_State* L)
{
    // SWE.Texture(self, color, color, size, int)
    LuaState ll(L);

    int params = ll.stackSize();

    if(5 > params || ! ll.isNumberIndex(2) || ! ll.isNumberIndex(3) || 
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
    std::string _class = StringFormat("{\"type\":\"%1\",\"color\":%2,\"fill\":%3,\"thickness\":%4}").arg("rect").arg(colorRect.getARGB()).arg(colorFill.getARGB()).arg(thickness);
    ll.pushString("class").pushString(_class).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

    return 1;
}

int SWE_texture_create_text(lua_State* L)
{
    // SWE.Texture(self, fontrender, string, color, color)
    LuaState ll(L);

    int params = ll.stackSize();

    if(4 > params || ! ll.isTableIndex(2) || ! ll.isStringIndex(3) || ! ll.isNumberIndex(4))
    {
        ERROR("require minimum params: " << "table fontrender, string, int color");
        return 0;
    }

    SWE_FontRender* frs = SWE_FontRender::get(ll, 2, __FUNCTION__);
    std::string frsJson = SWE_Tools::toJsonString(ll, 2);

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

    std::string _class = StringFormat("{\"type\":\"%1\",\"color\":%2,\"back\":%3,\"text\":\"%4\",\"frs\":%5}").arg("text").arg(colorText.getARGB()).arg(colorBack.getARGB()).arg(text).arg(frsJson);
    ll.pushString("class").pushString(_class).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

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

    std::string filename = ll.toStringIndex(2);

    if(! Systems::isFile(filename))
    {
	std::string filename2 = SWE_Tools::toCurrentPath(ll, filename);
	if(Systems::isFile(filename2)) std::swap(filename, filename2);
    }

    if(! Systems::isFile(filename))
    {
	std::string filename2 = SWE_Tools::toRunningPath(ll, filename);
	if(Systems::isFile(filename2)) std::swap(filename, filename2);
    }

    // SWE_Texture: string (file image)
    if(Systems::isFile(filename))
    {
	DEBUG(filename);

	Rect croprt;
	croprt.x = ll.toIntegerIndex(3);
	croprt.y = ll.toIntegerIndex(4);
	croprt.w = ll.toIntegerIndex(5);
	croprt.h = ll.toIntegerIndex(6);
	Surface sf(filename);

	if(sf.isValid())
	{
	    // empty crop
	    if(0 == croprt.w || 0 == croprt.h)
	    {
		*ptr = new SWE_Texture(Display::createTexture(sf));
	    }
	    else
	    {
		Surface cropsf(croprt.toSize());

		if(7 > params)
		{
		    ARGB argb = ll.toIntegerIndex(7);
		    cropsf.setColorKey(Color(argb));
		}

		sf.blit(croprt, cropsf.rect(), cropsf);
		*ptr = new SWE_Texture(Display::createTexture(cropsf));
	    }
	}
	else
	    *ptr = new SWE_Texture();
    
	std::string _class = croprt.isEmpty() ? StringFormat("{\"type\":\"%1\",\"file\":\"%2\"}").arg("image").arg(filename) :
			StringFormat("{\"type\":\"%1\",\"file\":\"%2\",\"crop\":[%3,%4,%5,%6]}").arg("image").arg(filename).arg(croprt.x).arg(croprt.y).arg(croprt.w).arg(croprt.h);
	ll.pushString("class").pushString(_class).setTableIndex(-3);
    }
    else
    {
	ERROR("file not found: " << filename);
	*ptr = new SWE_Texture(Display::createTexture(filename));
    }

    // add values
    ll.pushString("__type").pushString("swe.texture").setTableIndex(-3);
    ll.pushString("width").pushInteger((*ptr)->width()).setTableIndex(-3);
    ll.pushString("height").pushInteger((*ptr)->height()).setTableIndex(-3);
    ll.pushString("alpha").pushInteger((*ptr)->alphaMod()).setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

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
    if(ll.isNumberIndex(2) && ll.isNumberIndex(3))
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
    ll.pushString("class").pushString("").setTableIndex(-3);

    // set functions
    ll.setFunctionsTableIndex(SWE_texture_functions, -1);

    DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

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
            DEBUG(String::pointer(ptr) << ": [" << String::pointer(*ptr) << "]");

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
