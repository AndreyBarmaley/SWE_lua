# makefile
#

TARGET		:= SWE_lua.bin
LIBENGINE	:= ../$(ENGINEDIR)/libengine.a
LIBSWE		:= ../src/SWE.a
LIBS		:= $(LIBENGINE) $(LIBS)
CFLAGS		:= $(CFLAGS) -I../$(ENGINEDIR)

all: $(TARGET)

$(TARGET): $(patsubst %.cpp, %.o, $(wildcard ./*.cpp)) $(LIBENGINE) $(LIBSWE)
	$(CXX) $(LDFLAGS) $^ $(LIBS) -o $@

%.o: %.cpp
	$(CXX) -c -MD $< $(CFLAGS)

include $(wildcard *.d)

.PHONY: clean

clean:
	rm -f *.o *.d $(TARGET)
