# makefile
#

TARGET		:= SWE_lua
LIBENGINE	:= ../$(ENGINEDIR)/libengine.a
LIBSWE		:= ../src/SWE.a
LIBS		:= $(LIBENGINE) $(LIBS)
CFLAGS		:= $(CFLAGS) -I../$(ENGINEDIR)

RES		:= SWE_lua.res
ICOFILE		:= ../swe_lua.ico

all: $(TARGET)$(EXT)

$(TARGET)$(EXT): $(patsubst %.cpp, %.o, $(wildcard ./*.cpp)) $(LIBENGINE) $(LIBSWE) $(RESICON)
	$(CXX) $(LDFLAGS) $^ $(LIBS) -o $@

$(RES): $(ICOFILE)
	@echo "gen: $(RESICON)"
	@echo "$(IDICON) ICON \"$(ICOFILE)\"" > $(TARGET).rc
	$(WINDRES) $(TARGET).rc -O coff -o $(RESICON)

%.o: %.cpp
	$(CXX) -c -MD $< $(CFLAGS)

include $(wildcard *.d)

.PHONY: clean

clean:
	rm -f *.o *.d $(TARGET)*
