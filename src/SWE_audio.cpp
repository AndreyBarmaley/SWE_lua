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
#include "SWE_binarybuf.h"
#include "SWE_audio.h"

int SWE_mixer_volume(lua_State* L)
{
    // params: int volume (255 max)
    LuaState ll(L);

    if(! ll.isTopNumber())
    {
        ERROR("number not found");
        return 0;
    }

    int volume = ll.getTopNumber();

    int res = Music::volume(volume);
    ll.pushInteger(res);

    return 1;
}

int SWE_mixer_reset(lua_State* L)
{
    // params: none

    Music::reset();
    return 0;
}

int SWE_music_isplaying(lua_State* L)
{
    // params: none
    LuaState ll(L);

    bool res = Music::isPlaying();
    ll.pushBoolean(res);

    return 1;
}

int SWE_music_pause(lua_State* L)
{
    // params: none

    Music::pause();
    return 0;
}

int SWE_music_resume(lua_State* L)
{
    // params: none

    Music::resume();
    return 0;
}

int SWE_music_playbuf(lua_State* L)
{
    // params: table binarybuf
    LuaState ll(L);

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	bool res = Music::play(*buf);
        ll.pushBoolean(res);
    }
    else
    {
        ERROR("userdata empty");
        ll.pushBoolean(false);
    }

    return 1;
}

int SWE_music_play(lua_State* L)
{
    // params: string filename
    LuaState ll(L);

    if(! ll.isTopString())
    {
        ERROR("string not found");
        return 0;
    }

    std::string filename = ll.getTopString();

    if(! Systems::isFile(filename))
    {
        std::string filename2 = SWE_Tools::toCurrentPath(ll, filename);
	if(Systems::isFile(filename2)) std::swap(filename, filename2);
    }

    if(Systems::isFile(filename))
    {
	DEBUG(filename);
	bool res = Music::play(filename);
	ll.pushBoolean(res);
    }
    else
    {
	ERROR("file not found: " << filename);
	ll.pushBoolean(false);
    }

    return 1;
}

int SWE_sound_isplaying(lua_State* L)
{
    // params: none
    LuaState ll(L);

    bool res = Sound::isPlaying();
    ll.pushBoolean(res);

    return 1;
}

int SWE_sound_playbuf(lua_State* L)
{
    // params: table binarybuf
    LuaState ll(L);

    SWE_BinaryBuf* buf = SWE_BinaryBuf::get(ll, 1, __FUNCTION__);

    if(buf)
    {
	bool res = Sound::play(*buf);
        ll.pushBoolean(res);
    }
    else
    {
        ERROR("userdata empty");
        ll.pushBoolean(false);
    }

    return 1;
}

int SWE_sound_play(lua_State* L)
{
    // params: string filename
    LuaState ll(L);

    if(! ll.isTopString())
    {
        ERROR("string not found");
        return 0;
    }

    std::string filename = ll.getTopString();

    if(! Systems::isFile(filename))
    {
        std::string filename2 = SWE_Tools::toCurrentPath(ll, filename);
	if(Systems::isFile(filename2)) std::swap(filename, filename2);
    }

    if(Systems::isFile(filename))
    {
	DEBUG(filename);
	bool res = Sound::play(filename);
	ll.pushBoolean(res);
    }
    else
    {
	ERROR("file not found: " << filename);
	ll.pushBoolean(false);
    }

    return 1;
}

const struct luaL_Reg SWE_audio_functions[] = {
    { "MixerVolume", SWE_mixer_volume },       // [int], int volume
    { "MixerReset", SWE_mixer_reset },         // [void], void
    { "MusicIsPlaying", SWE_music_isplaying }, // [bool], void
    { "MusicPause", SWE_music_pause },         // [void], void
    { "MusicResume", SWE_music_resume },       // [void], void
    { "MusicPlay", SWE_music_play },           // [bool], string file
    { "MusicPlayBuf", SWE_music_playbuf },     // [bool], table binarybuf
    { "SoundIsPlaying", SWE_sound_isplaying }, // [bool], void
    { "SoundPlay", SWE_sound_play },           // [bool], string file
    { "SoundPlayBuf", SWE_sound_playbuf },     // [bool], table binarybuf
    { NULL, NULL }
};

void SWE_Audio::registers(LuaState & ll)
{
    ll.pushTable("SWE.Audio");
    // set functions
    ll.setFunctionsTableIndex(SWE_audio_functions, -1);
    ll.stackPop();
}
