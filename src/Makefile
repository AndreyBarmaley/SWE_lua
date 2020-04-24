# makefile
#

TARGET		:= SWE
LIBENGINE	:= ../$(LIBSWEDIR)/libswe.a
LIBS		:= $(LIBENGINE) $(LIBS)
CFLAGS		:= $(CFLAGS) -I../$(LIBSWEDIR)

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
