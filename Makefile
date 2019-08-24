# makefile
#

ifdef OLDENGINE
ENGINEVER := ver12
else
ENGINEVER := ver20
endif


ifeq ($(PLATFORM),mingw32ce)
ENGINEVER := ver12
endif

TARGET := SWE
ENGINEDIR := ../../engine

include Makefile.$(ENGINEVER)

CFLAGS          := $(CFLAGS) -fPIC -std=c++0x -O0 -g -Wall -Werror -Wno-sign-compare
CFLAGS          := $(CFLAGS) $(ENGINE_CFLAGS) -DDISABLE_TERMGUI -DBUILD_DEBUG_MESSAGES -DWITH_LUA -DWITH_JSON
LIBS            := $(LIBS) $(ENGINE_LIBS) -lz

LUA_VERSION	:= $(shell pkg-config lua --modversion)

ifeq (5.1.,$(findstring 5.1.,$(LUA_VERSION)))
LUASRC		:= $(CURDIR)/lua52/src
endif

ifdef LUASRC
CFLAGS          := -I$(LUASRC) $(CFLAGS)
LIBS            := $(LIBS) $(LUASRC)/liblua.a -ldl
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

ifeq ($(OS),Windows_NT)
PLATFORM	:= mingw
LUADST		:= mingw
endif
ifeq ($(OS),FreeBSD)
PLATFORM	:= bsd
LUADST		:= freebsd
endif
ifeq ($(OS),Darwin)
PLATFORM	:= osx
LUADST		:= macosx
endif
ifeq ($(OS),Linux)
PLATFORM	:= all
LUADST		:= linux
endif
endif

include Makefile.$(PLATFORM)

export ENGINEDIR CXX AR LINK WINDRES LDFLAGS CFLAGS LIBS PLATFORM LUASRC

.PHONY: clean

all:
ifdef LUASRC
	$(MAKE) -C $(LUASRC) $(LUADST)
endif
	$(MAKE) -C $(ENGINEDIR)
	$(MAKE) -C src
	$(MAKE) -C main
	cp -f main/$(TARGET)_lua.bin .
	cp -f src/$(TARGET).so .

clean:
ifdef LUASRC
	$(MAKE) -C $(LUASRC) clean
endif
	$(MAKE) -C $(ENGINEDIR) clean
	$(MAKE) -C main clean
	$(MAKE) -C src clean
	rm -f $(TARGET)_lua.bin $(TARGET).so
