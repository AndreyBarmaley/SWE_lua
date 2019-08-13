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
CFLAGS          := $(CFLAGS) $(ENGINE_CFLAGS) -DDISABLE_NETWORK -DDISABLE_TERMGUI -DBUILD_DEBUG_MESSAGES -DWITH_LUA -DWITH_JSON
LIBS            := $(LIBS) $(ENGINE_LIBS) -lz -llua

# platform specific flags
ifndef PLATFORM
ifndef OS
OS := $(shell uname)
endif

ifeq ($(OS),Windows_NT)
PLATFORM := mingw
endif
ifeq ($(OS),FreeBSD)
PLATFORM := bsd
endif
ifeq ($(OS),Darwin)
PLATFORM := osx
endif
ifeq ($(OS),Linux)
PLATFORM := all
endif
endif

include Makefile.$(PLATFORM)

export ENGINEDIR CXX AR LINK WINDRES LDFLAGS CFLAGS LIBS PLATFORM

.PHONY: clean

all:
	$(MAKE) -C $(ENGINEDIR)
	$(MAKE) -C src
	$(MAKE) -C main
	mv main/$(TARGET)_lua.bin .
	mv src/$(TARGET).so .

clean:
	$(MAKE) -C $(ENGINEDIR) clean
	$(MAKE) -C main clean
	$(MAKE) -C src clean
	rm -f $(TARGET)_lua.bin $(TARGET).so
