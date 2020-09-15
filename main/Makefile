# makefile
#

TARGET		:= SWE_lua
LIBSWE		:= ../$(LIBSWEDIR)/libswe.a
LIBLUASWE	:= ../src/luaSWE.a
LIBS		:= $(LIBSWE) $(LIBS)
CFLAGS		:= $(CFLAGS) -I../$(LIBSWEDIR)

RES		:= SWE_lua.res
ICOFILE		:= ../swe_lua.ico

all: $(TARGET)$(EXT)

$(TARGET)$(EXT): $(patsubst %.cpp, %.o, $(wildcard ./*.cpp)) $(LIBSWE) $(LIBLUASWE) $(RESICON)
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
