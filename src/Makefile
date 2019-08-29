# makefile
#

TARGET		:= SWE
LIBENGINE	:= ../$(ENGINEDIR)/libengine.a
LIBS		:= $(LIBENGINE) $(LIBS)
CFLAGS		:= $(CFLAGS) -I../$(ENGINEDIR)

all: $(TARGET).so $(TARGET).a

$(TARGET).a: $(patsubst %.cpp, %.o, $(wildcard *.cpp))
	$(AR) crvs $@ $^

$(TARGET).so: $(patsubst %.cpp, %.o, $(wildcard ./*.cpp)) $(LIBENGINE)
	$(CXX) -shared $^ $(LIBS) -o $@ $(LDFLAGS)

%.o: %.cpp
	$(CXX) -c -MD $< $(CFLAGS)

include $(wildcard *.d)

.PHONY: clean

clean:
	rm -f *.o *.d $(TARGET).*
