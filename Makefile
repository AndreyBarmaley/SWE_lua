# makefile
#

DEBUG := 1

ifdef OLDENGINE
ENGINEVER := ver12
else
ENGINEVER := ver20
endif
DISABLE_FIREWARE := 1

ifeq ($(PLATFORM),mingw32ce)
DISABLE_FFMPEG	 := 1
DISABLE_FIREWARE := 1
export DISABLE_FFMPEG DISABLE_FIREWARE
ENGINEVER := ver12
endif

ifeq ($(PLATFORM),mingw32)
DISABLE_FIREWARE := 1
export DISABLE_FFMPEG DISABLE_FIREWARE
endif

TARGET := SWE
ENGINEDIR := ../../engine

include Makefile.$(ENGINEVER)

ifdef DEBUG
CFLAGS          := $(CFLAGS) -std=c++11 -O0 -g -Wall -Werror -Wno-sign-compare
else
CFLAGS          := $(CFLAGS) -std=c++11 -O2 -Wall -Wno-sign-compare
endif

CFLAGS          := $(CFLAGS) $(ENGINE_CFLAGS) -DBUILD_DEBUG_MESSAGES -DWITH_LUA -DWITH_JSON
LIBS            := $(LIBS) $(ENGINE_LIBS) -lz

LUA_VERSION	:= $(shell pkg-config lua --modversion)

ifdef LUA52
LUASRC		:= $(CURDIR)/lua52/src
else
ifeq (5.1.,$(findstring 5.1.,$(LUA_VERSION)))
LUASRC		:= $(CURDIR)/lua52/src
endif
endif

ifdef LUASRC
CFLAGS          := -I$(LUASRC) $(CFLAGS)
LIBS            := $(LIBS) $(LUASRC)/liblua.a
LUADST		:= generic
else
LUA_CFLAGS	:= $(shell pkg-config lua --cflags)
LUA_LIBS	:= $(shell pkg-config lua --libs)

CFLAGS          := $(CFLAGS) $(LUA_CFLAGS)
LIBS            := $(LIBS) $(LUA_LIBS)
endif

# platform specific flags
ifndef PLATFORM
ifndef OS
OS		:= $(shell uname)
endif

ifeq ($(OS),Linux)
PLATFORM	:= all
endif
endif

ifeq ($(PLATFORM),all)
LUADST		:= linux
ifdef LUASRC
LIBS            := $(LIBS) $(LUASRC)/liblua.a -ldl
endif
endif

ifeq ($(PLATFORM),mingw32)
LUADST		:= mingw
ifdef LUASRC
LIBS            := $(LIBS) $(LUASRC)/liblua.a
endif
endif

include Makefile.$(PLATFORM)

export ENGINEDIR EXT CXX AR LINK WINDRES LDFLAGS CFLAGS LIBS PLATFORM LUASRC IDICON RESICON

.PHONY: clean

all:
ifdef LUASRC
	$(MAKE) -C $(LUASRC) $(LUADST)
endif
	$(MAKE) -C $(ENGINEDIR) libengine.a
	$(MAKE) -C src SWE.a
	$(MAKE) -C main
	cp -f main/$(TARGET)_lua$(EXT) .
ifdef STRIP
	$(STRIP) $(TARGET)_lua$(EXT)
endif

clean:
ifdef LUASRC
	$(MAKE) -C $(LUASRC) clean
endif
	$(MAKE) -C $(ENGINEDIR) clean
	$(MAKE) -C main clean
	$(MAKE) -C src clean
