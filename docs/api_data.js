define({ "api": [
  {
    "type": "hide hardware cursor",
    "url": "SWE.CursorHide()",
    "title": "SWE.CursorHide",
    "group": "SWE",
    "name": "CursorHide",
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "set custom cursor",
    "url": "SWE.CursorLoad(texture,offsetx,offsety)",
    "title": "SWE.CursorLoad",
    "group": "SWE",
    "name": "CursorLoad",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "texture",
            "description": "<p>image, see SWE.Texture</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offsetx",
            "description": "<p>offset position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offsety",
            "description": "<p>offset position</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local win = SWE.DisplayInit(\"Lua SWE\", 640, 480)\n\nSWE.CursorHide()\nlocal txcur = SWE.Texture.Image(\"arrow.png\")\nSWE.CursorLoad(txcur)\n\n....\n\nlocal result = SWE.MainLoop(win)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "hide hardware cursor",
    "url": "SWE.CursorShow()",
    "title": "SWE.CursorShow",
    "group": "SWE",
    "name": "CursorShow",
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "set display scene dirty mode",
    "url": "SWE.DisplayDirty()",
    "title": "SWE.DisplayDirty",
    "group": "SWE",
    "name": "DisplayDirty",
    "description": "<p>sometimes it’s necessary to tell the display scene update</p>",
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "handle events intervals",
    "url": "SWE.DisplayHandleEvents(interval)",
    "title": "SWE.DisplayHandleEvents",
    "group": "SWE",
    "name": "DisplayHandleEvents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "interval",
            "description": "<p>handle events loop for interval (ms)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "create display window object",
    "url": "SWE.DisplayInit(title,width,height,fullscreen)(title,landscape)(table)",
    "title": "SWE.DisplayInit",
    "group": "SWE",
    "name": "DisplayInit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>display title</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>display size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>display size</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "fullscreen",
            "description": "<p>fullscreen mode, (default false)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "landscape",
            "description": "<p>init landscape of portrait mode (mobile os)</p>"
          },
          {
            "group": "Parameter",
            "type": "table",
            "optional": false,
            "field": "params",
            "description": "<p>params: { &quot;title&quot;:string, &quot;window&quot;:size, &quot;render&quot;:size, &quot;fullscreen&quot;:bool, &quot;accel&quot;:bool, &quot;resized&quot;:bool }</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Window",
            "optional": false,
            "field": "result",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local win = SWE.DisplayInit(\"SWE Window\",640,480)\n-- see also SWE.DisplayWindow\n\nlocal result = SWE.MainLoop(win)",
        "type": "json"
      },
      {
        "title": "usage",
        "content": "local landscape = false\nlocal win = SWE.DisplayInit(\"SWE init: Portrait modes\",landscape)\nprint(win.width,win.height)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get display size",
    "url": "SWE.DisplaySize()",
    "title": "SWE.DisplaySize",
    "group": "SWE",
    "name": "DisplaySize",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "result",
            "description": "<p>display size</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local w,h,fullscreen = SWE.DisplaySize();\nprint(\"display size:\", w, h, fullscreen)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get display mode list",
    "url": "SWE.DisplayVideoModes(landscape)",
    "title": "SWE.DisplayVideoModes",
    "group": "SWE",
    "name": "DisplayVideoModes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "landscape",
            "description": "<p>landscape (default) or portrait modes</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "result",
            "description": "<p>modes list</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local modes = { SWE.DisplayVideoModes() }\n    for i=1,#modes do\n\tprint(\"videomodes:\", modes[i].width, modes[i].height)\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get display window object",
    "url": "SWE.DisplayWindow()",
    "title": "SWE.DisplayWindow",
    "group": "SWE",
    "name": "DisplayWindow",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Window",
            "optional": false,
            "field": "result",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local win1 = SWE.DisplayInit(\"SWE Text\",640,480)\n\n....\n\n-- win1 and win2 the same object\nwin2 = SWE.DisplayWindow()\n\nlocal result = SWE.MainLoop(win2)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "find filename from resource dirs",
    "url": "SWE.FindResource(resource)",
    "title": "SWE.FindResource",
    "group": "SWE",
    "name": "FindResource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "resource",
            "description": "<p>file name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>full path or nil</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "-- data/images/image1.png\n\nSWE.RegisterResourceDirectory(SWE.SystemConcatePath(\"data\", \"images\"))\nlocal filename = SWE.FindResource(\"image1.png\")\nprint(filename)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get api version",
    "url": "SWE.GetVersion()",
    "title": "SWE.GetVersion",
    "group": "SWE",
    "name": "GetVersion",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>version</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "parse json string",
    "url": "SWE.JsonParse(json)",
    "title": "SWE.JsonParse",
    "group": "SWE",
    "name": "JsonParse",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "json",
            "description": "<p>json value string</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "table",
            "optional": false,
            "field": "result",
            "description": "<p>json object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local str = \"{\\\"hello\\\": 123,\\\"world\\\":[1,2,3,4,5]}\"\nlocal json = SWE.JsonParse(str)\n\n.... dump json\n| \"hello\" | number:123 |\n| \"world\" | table      |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "main loop events processing",
    "url": "SWE.MainLoop(window)",
    "title": "SWE.MainLoop",
    "group": "SWE",
    "name": "MainLoop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "window",
            "description": "<p>only this window will be checked for a visible</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>window result</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local win = SWE.DisplayInit(\"Lua SWE\", 640, 480)\nwin.SetResult(123)\n\n......\nwin.KeyPressEvent = function(k,m,s)\n    if k == SWE.Key.ESCAPE then\n        win:SetVisible(false)\n    end\n    return true\nend\n......\n\nprint(SWE.MainLoop(win))",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "push custom event to window object",
    "url": "SWE.PushEvent(code,object,window)",
    "title": "SWE.PushEvent",
    "group": "SWE",
    "name": "PushEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>code event (0x00FFFFFF max value)</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>any Lua object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "window",
            "description": "<p>if nil to broadcast event, otherwise unicast to window</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local win = SWE.DisplayInit(\"Lua SWE\", 640, 480)\n    local win2 = SWE.Window(50, 50, 200, 100)\n\n    ......\n    win.KeyPressEvent = function(k,m,s)\n        if k == SWE.Key.ESCAPE then\n            win:SetVisible(false)\n\t    return true\n\telseif k == SWE.Key.RETURN then\n\t    SWE.PushEvent(3333, nil, win2)\n\t    return true\n        end\n        return false\n    end\n\n    win1.SystemUserEvent = function(c,d)\n\tif c == 3333 then\n\t    print(\"SUCCESS\")\n\tend\n    end\n    ......\n\n    SWE.MainLoop(win)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "register directory for lua modules",
    "url": "SWE.RegisterLuaDirectory(directory)",
    "title": "SWE.RegisterLuaDirectory",
    "group": "SWE",
    "name": "RegisterLuaDirectory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "path",
            "description": "<p>directory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>result: success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "register directory for ext resources",
    "url": "SWE.RegisterResourceDirectory(directory)",
    "title": "SWE.RegisterResourceDirectory",
    "group": "SWE",
    "name": "RegisterResourceDirectory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "path",
            "description": "<p>directory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>result: success</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "-- data/images/image1.png\n-- data/font.ttf\n-- data/sound.wav\n\n-- variant 1\nlocal tx1 = SWE.Texture.Image(\"data/images/image1.png\")\nlocal frs = SWE.FontRender(\"data/font.ttf\", 14, SWE.Font.RenderSolid)\nSWE.SoundPlay(\"data/sound.wav\")\n\n-- variant 2\nSWE.RegisterResourceDirectory(\"data\")\nlocal tx2 = SWE.Texture.Image(\"images/image1.png\")\nlocal frs = SWE.FontRender(\"font.ttf\", 14, SWE.Font.RenderSolid)\nSWE.SoundPlay(\"sound.wav\")\n\n-- variant 3\nSWE.RegisterResourceDirectory(SWE.SystemConcatePath(\"data\", \"images\"))\nlocal tx3 = SWE.Texture.Image(\"image1.png\")",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "display scene render to screenshot",
    "url": "SWE.RenderScreenshot(filename)",
    "title": "SWE.RenderScreenshot",
    "group": "SWE",
    "name": "RenderScreenshot",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>save to filename (png or jpg extension)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "set debug mode",
    "url": "SWE.SetDebug(debug)",
    "title": "SWE.SetDebug",
    "group": "SWE",
    "name": "SetDebug",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "debug",
            "description": "<p>debug mode</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "concate filesystem names",
    "url": "SWE.SystemConcatePath(item1,item2,itemN)",
    "title": "SWE.SystemConcatePath",
    "group": "SWE",
    "name": "SystemConcatePath",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "item1",
            "description": "<p>name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "item2",
            "description": "<p>name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemN",
            "description": "<p>name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "path",
            "description": "<p>result: filesystem path</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get current directory",
    "url": "SWE.SystemCurrentDirectory()",
    "title": "SWE.SystemCurrentDirectory",
    "group": "SWE",
    "name": "SystemCurrentDirectory",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "directory",
            "description": "<p>directory, where does the program run</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "parse to dirname/basename",
    "url": "SWE.SystemDirnameBasename(path)",
    "title": "SWE.SystemDirnameBasename",
    "group": "SWE",
    "name": "SystemDirnameBasename",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "path",
            "description": "<p>path to object (file or directory)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "dirname",
            "description": "<p>dirname object</p>"
          },
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "basename",
            "description": "<p>basename object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local dirname,basename = SWE.SystemDirnameBasename(\"/var/tmp/screenshot.png\")\nprint(dirname,basename)\n\n... console\n\"/var/tmp\"    \"screenshot.png\"",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "stat info for directory/file",
    "url": "SWE.SystemFileStat(path)",
    "title": "SWE.SystemFileStat",
    "group": "SWE",
    "name": "SystemFileStat",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "path",
            "description": "<p>path to object (file or directory)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "table",
            "optional": false,
            "field": "stat",
            "description": "<p>table stat info</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local stat = SWE.SystemFileStat(\"/var/tmp/screenshot.png\")\n\n.... dump stat\n| mode  | 33204                   | \n| gid   | 1000                    | \n| uid   | 1000                    | \n| nlink | 1                       | \n| size  | 404930                  | \n| atime | 1565677681              | \n| mtime | 1565677681              | \n| ctime | 1565677681              | \n| isdir | false                   |\n| type  | file                    | \"sock\",\"link\",\"block\",\"char\",\"fifo\",\"dir\",\"file\"\n| path  | /var/tmp/screenshot.png |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "make directory",
    "url": "SWE.SystemMakeDirectory(directory)",
    "title": "SWE.SystemMakeDirectory",
    "group": "SWE",
    "name": "SystemMakeDirectory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "directory",
            "description": "<p>path to directory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success or present</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get memory usage",
    "url": "SWE.SystemMemoryUsage()",
    "title": "SWE.SystemMemoryUsage",
    "group": "SWE",
    "name": "SystemMemoryUsage",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>memory usage</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get mobile os name",
    "url": "SWE.SystemMobileOs()",
    "title": "SWE.SystemMobileOs",
    "group": "SWE",
    "name": "SystemMobileOs",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>mobile os name: android, wince, symbian</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "read directory",
    "url": "SWE.SystemReadDirectory(directory)",
    "title": "SWE.SystemReadDirectory",
    "group": "SWE",
    "name": "SystemReadDirectory",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "directory",
            "description": "<p>path to directory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "table",
            "optional": false,
            "field": "result",
            "description": "<p>table result, full path name, type</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local names = SWE.SystemReadDirectory(\"/var/tmp\")\n\n.... dump names\n| \"/var/tmp/world.log\" | \"file\"      |\n| \"/var/tmp/hello.log\" | \"file\"      |\n| \"/var/tmp/mc-root\"   | \"directory\" |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "run command, get result outputs",
    "url": "SWE.SystemRunCommand(cmd,param1,param2,paramN)",
    "title": "SWE.SystemRunCommand",
    "group": "SWE",
    "name": "SystemRunCommand",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cmd",
            "description": "<p>command binary</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "param1",
            "description": "<p>command arguments</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "param2",
            "description": "<p>command arguments</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "paramN",
            "description": "<p>command arguments</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "table",
            "optional": false,
            "field": "result",
            "description": "<p>result: output strings</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local out = SWE.SystemRunCommand(\"getent\", \"passwd\")\n\n.... dump output table\n| root:x:0:0:root:/root:/bin/bash         |\n| bin:x:1:1:bin:/bin:/sbin/nologin        |\n| daemon:x:2:2:daemon:/sbin:/sbin/nologin |\n| adm:x:3:4:adm:/var/adm:/sbin/nologin    |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get current directory",
    "url": "SWE.SystemShareDirectories()",
    "title": "SWE.SystemShareDirectories",
    "group": "SWE",
    "name": "SystemShareDirectories",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "directories",
            "description": "<p>local writable directories list</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "sleep ms",
    "url": "SWE.SystemSleep(delay)",
    "title": "SWE.SystemSleep",
    "group": "SWE",
    "name": "SystemSleep",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "delay",
            "description": "<p>sleep delay ms</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "get system counter",
    "url": "SWE.SystemTick()",
    "title": "SWE.SystemTick",
    "group": "SWE",
    "name": "SystemTick",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "counter",
            "description": "<p>constantly counter (milliseconds) from the starting</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "convert table object to json string",
    "url": "SWE.TableToJson(table)",
    "title": "SWE.TableToJson",
    "group": "SWE",
    "name": "TableToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "table",
            "optional": false,
            "field": "table",
            "description": "<p>table object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "json",
            "description": "<p>result: json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "create display terminal object",
    "url": "SWE.TerminalInit(title,frs,cols,rows)",
    "title": "SWE.TerminalInit",
    "group": "SWE",
    "name": "TerminalInit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>display title</p>"
          },
          {
            "group": "Parameter",
            "type": "table",
            "optional": false,
            "field": "frs",
            "description": "<p>font render, (SWE.FontRender object)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>terminal object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local frs = SWE.FontRender.System()\nlocal term = SWE.TerminalInit(\"SWE Terminal\",frs,80,25)\n\n-- render terminal\nfunction term.RenderWindow()\n    term:CursorPosition(0, 0):FillColors(SWE.Color.Silver, SWE.Color.Black, term.cols, term.rows)\n    term:CursorPosition(0, 0):FillProperty(frs.blended, frs.style, frs.hinting, term.cols, term.rows)\n    term:CursorPosition(0, 0):FillCharset(0x33, term.cols, term.rows)\n    term:CursorPosition(0, 0):DrawRect(term.cols, term.rows, SWE.Line.Thin)\n    term:SetFlush()\n    return true\nend\n\n-- dump SWE.Terminal\nSWE.Dump(term)\n\nlocal result = SWE.MainLoop(term)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "reset mixer",
    "url": "SWE.Audio.MixerReset()",
    "title": "SWE.Audio.MixerReset",
    "group": "SWE_Audio",
    "name": "MixerReset",
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "set mixer volume",
    "url": "SWE.Audio.MixerVolume(volume)",
    "title": "SWE.Audio.MixerVolume",
    "group": "SWE_Audio",
    "name": "MixerVolume",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "volume",
            "description": "<p>new volume setting, 128 max</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "volume",
            "description": "<p>previous volume setting</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "check mixer is playing music",
    "url": "SWE.Audio.MusicIsPlaying()",
    "title": "SWE.Audio.MusicIsPlaying",
    "group": "SWE_Audio",
    "name": "MusicIsPlaying",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if playing</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "set pause",
    "url": "SWE.Audio.MusicPause()",
    "title": "SWE.Audio.MusicPause",
    "group": "SWE_Audio",
    "name": "MusicPause",
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "play music from filename",
    "url": "SWE.Audio.MusicPlay(filename)",
    "title": "SWE.Audio.MusicPlay",
    "group": "SWE_Audio",
    "name": "MusicPlay",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>filename music format</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if playing</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "play music from binarybuf",
    "url": "SWE.Audio.MusicPlayBuf(inputbuf)",
    "title": "SWE.Audio.MusicPlayBuf",
    "group": "SWE_Audio",
    "name": "MusicPlayBuf",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf music format</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if playing</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "resume play music",
    "url": "SWE.Audio.MusicResume()",
    "title": "SWE.Audio.MusicResume",
    "group": "SWE_Audio",
    "name": "MusicResume",
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "check mixer is playing sound",
    "url": "SWE.Audio.SoundIsPlaying()",
    "title": "SWE.Audio.SoundIsPlaying",
    "group": "SWE_Audio",
    "name": "SoundIsPlaying",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if playing</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "play sound from filename",
    "url": "SWE.Audio.SoundPlay(filename)",
    "title": "SWE.Audio.SoundPlay",
    "group": "SWE_Audio",
    "name": "SoundPlay",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>filename sound format</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if playing</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "play sound from binarybuf",
    "url": "SWE.Audio.SoundPlayBuf(inputbuf)",
    "title": "SWE.Audio.SoundPlayBuf",
    "group": "SWE_Audio",
    "name": "SoundPlayBuf",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf sound format</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if playing</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_audio.js",
    "groupTitle": "SWE_Audio"
  },
  {
    "type": "assign buf",
    "url": "SWE.BinaryBuf.Assign(self,size,value)",
    "title": "SWE.BinaryBuf.Assign",
    "group": "SWE_BinaryBuf",
    "name": "Assign",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "size",
            "description": "<p>new size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>assign content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>bynarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "base64 decode",
    "url": "SWE.BinaryBuf.Base64Decode(inputbuf),(inputstr)",
    "title": "SWE.BinaryBuf.Base64Decode",
    "group": "SWE_BinaryBuf",
    "name": "Base64Decode",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf base64 data</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inputstr",
            "description": "<p>base64 data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>binarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "base64 encode",
    "url": "SWE.BinaryBuf.Base64Encode(inputbuf)",
    "title": "SWE.BinaryBuf.Base64Encode",
    "group": "SWE_BinaryBuf",
    "name": "Base64Encode",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf raw data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>base64 data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "binarybuf clear",
    "url": "SWE.BinaryBuf.Clear(self)",
    "title": "SWE.BinaryBuf.Clear",
    "group": "SWE_BinaryBuf",
    "name": "Clear",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "compare bytes",
    "url": "SWE.BinaryBuf.CompareBytes(self,offset,value...value)",
    "title": "SWE.BinaryBuf.CompareBytes",
    "group": "SWE_BinaryBuf",
    "name": "CompareBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>byte value (list)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "binarybuf constructor",
    "url": "SWE.BinaryBuf(),(inputstr),(length),(inputptr,length)",
    "title": "SWE.BinaryBuf",
    "group": "SWE_BinaryBuf",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inputstr",
            "description": "<p>string data</p>"
          },
          {
            "group": "Parameter",
            "type": "userdata",
            "optional": false,
            "field": "inputptr",
            "description": "<p>pointer data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>binarybuf data</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local buf = SWE.BinaryBuf(\"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\")\n    local zip = buf:ZlibCompress()\n    local base64 = zip:Base64Encode()\n    print(base64)\n\n    local size1 = buf.size\n    local size2 = #buf\n    if size1 == size2 then\n\tprint(\"equivalent\")\n    end\n\n    -- start index is zero!\n    local byte1 = buf:GetByte(5)\n    local byte2 = buf[5]\n    if byte1 == byte2 then\n\tprint(\"equivalent\")\n    end",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| size    | number  | binarybuf length",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "erase element",
    "url": "SWE.BinaryBuf.Erase(self,pos,count)",
    "title": "SWE.BinaryBuf.Erase",
    "group": "SWE_BinaryBuf",
    "name": "Erase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pos",
            "description": "<p>position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count erase</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>bynarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "get byte value",
    "url": "SWE.BinaryBuf.GetByte(self,offset1,offset2)",
    "title": "SWE.BinaryBuf.GetByte",
    "group": "SWE_BinaryBuf",
    "name": "GetByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset1",
            "description": "<p>first data offset</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset2",
            "description": "<p>last data offset (default: nil)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "result",
            "description": "<p>bytes list values</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local buf = SWE.BinaryBuf(\"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\")\n    -- start index is zero!\n    local byte1 = buf:GetByte(5)\n    local byte2 = buf[5]\n    if byte1 == byte2 then\n\tprint(\"equivalent\")\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "get byte values",
    "url": "SWE.BinaryBuf.GetBytes(self,offset,length)",
    "title": "SWE.BinaryBuf.GetBytes",
    "group": "SWE_BinaryBuf",
    "name": "GetBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>bynarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "calculate crc32b sum",
    "url": "SWE.BinaryBuf.GetCRC32b(inputbuf)SWE.BinaryBuf.GetCRC32b(inputbuf,magic)",
    "title": "SWE.BinaryBuf.GetCRC32b",
    "group": "SWE_BinaryBuf",
    "name": "GetCRC32b",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "magic",
            "description": "<p>default value (0xEDB88320)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>crc32b code</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "insert byte values",
    "url": "SWE.BinaryBuf.Insert(self,offset,inputbuf,offset,length)(offset,count,value)",
    "title": "SWE.BinaryBuf.Insert",
    "group": "SWE_BinaryBuf",
    "name": "Insert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf input data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>value counts</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>byte value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "push back byte value",
    "url": "SWE.BinaryBuf.PushBack(self,offset,value...value)",
    "title": "SWE.BinaryBuf.PushBack",
    "group": "SWE_BinaryBuf",
    "name": "PushBack",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>byte value (list)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "read from file",
    "url": "SWE.BinaryBuf.ReadFromFile(self,filename,offset,length)(filename,offset,length)",
    "title": "SWE.BinaryBuf.ReadFromFile",
    "group": "SWE_BinaryBuf",
    "name": "ReadFromFile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>path to filename</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset read (default 0)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>block size read (default file size)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>read success</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage variant1",
        "content": "local buf = SWE.BinaryBuf()\nbuf:ReadFromFile(\"/var/tmp/test.bin\")\nif buf ~= nil then\n    print(buf:ToJson())\nend",
        "type": "json"
      },
      {
        "title": "usage variant2",
        "content": "local file = \"/var/tmp/2gis.log\"\nlocal buf = SWE.BinaryBuf.ReadFromFile(file)\nif buf ~= nil then\n    print(buf:ToJson())\nend",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "resize buf",
    "url": "SWE.BinaryBuf.Resize(self,size,value)",
    "title": "SWE.BinaryBuf.Resize",
    "group": "SWE_BinaryBuf",
    "name": "Resize",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "size",
            "description": "<p>new size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>default value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>bynarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "save to file",
    "url": "SWE.BinaryBuf.SaveToFile(self,filename,offset)",
    "title": "SWE.BinaryBuf.SaveToFile",
    "group": "SWE_BinaryBuf",
    "name": "SaveTiFile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>filename</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset read (default 0, endpos: -1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>write success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "set byte value",
    "url": "SWE.BinaryBuf.SetByte(self,offset,value...value)",
    "title": "SWE.BinaryBuf.SetByte",
    "group": "SWE_BinaryBuf",
    "name": "SetByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>byte value (list)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "set byte values",
    "url": "SWE.BinaryBuf.SetBytes(self,offset,binarybuf,offset,length)",
    "title": "SWE.BinaryBuf.SetBytes",
    "group": "SWE_BinaryBuf",
    "name": "SetBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "self",
            "description": "<p>binarybuf raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf input data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "convert binarybuf to json string",
    "url": "SWE.BinaryBuf.ToJson(inputbuf)",
    "title": "SWE.BinaryBuf.ToJson",
    "group": "SWE_BinaryBuf",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf raw data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json array string</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local buf = SWE.BinaryBuf(\"012345678\")\nprint(buf:ToJson())\n....\n'[0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38]'",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "convert binarybuf to string",
    "url": "SWE.BinaryBuf.ToString(inputbuf)",
    "title": "SWE.BinaryBuf.ToString",
    "group": "SWE_BinaryBuf",
    "name": "ToString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf raw data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>string data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "compress binarybuf",
    "url": "SWE.BinaryBuf.ZlibCompress(inputbuf)",
    "title": "SWE.BinaryBuf.ZlibCompress",
    "group": "SWE_BinaryBuf",
    "name": "ZlibCompress",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf raw data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>binarybuf zip data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "decompress binarybuf",
    "url": "SWE.BinaryBuf.ZlibDecompress(inputbuf)",
    "title": "SWE.BinaryBuf.ZlibDecompress",
    "group": "SWE_BinaryBuf",
    "name": "ZlibDecompress",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf zip data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>binarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "unicode box drawings: up and horizontal",
    "url": "SWE.Char.BTee(line)",
    "title": "SWE.Char.BTee",
    "group": "SWE_Char",
    "name": "BTee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: horizontal",
    "url": "SWE.Char.HLine(line)",
    "title": "SWE.Char.HLine",
    "group": "SWE_Char",
    "name": "HLine",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: up and right",
    "url": "SWE.Char.LLCorner(line)",
    "title": "SWE.Char.LLCorner",
    "group": "SWE_Char",
    "name": "LLCorner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: up and left",
    "url": "SWE.Char.LRCorner(line)",
    "title": "SWE.Char.LRCorner",
    "group": "SWE_Char",
    "name": "LRCorner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: vertical and right",
    "url": "SWE.Char.LTee(line)",
    "title": "SWE.Char.LTee",
    "group": "SWE_Char",
    "name": "LTee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: vertical and horizontal",
    "url": "SWE.Char.Plus(line)",
    "title": "SWE.Char.Plus",
    "group": "SWE_Char",
    "name": "Plus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: vertical and left",
    "url": "SWE.Char.RTee(line)",
    "title": "SWE.Char.RTee",
    "group": "SWE_Char",
    "name": "RTee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: down and horizontal",
    "url": "SWE.Char.TTee(line)",
    "title": "SWE.Char.TTee",
    "group": "SWE_Char",
    "name": "TTee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: down and right",
    "url": "SWE.Char.ULCorner(line)",
    "title": "SWE.Char.ULCorner",
    "group": "SWE_Char",
    "name": "ULCorner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: down and left",
    "url": "SWE.Char.URCorner(line)",
    "title": "SWE.Char.URCorner",
    "group": "SWE_Char",
    "name": "URCorner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "unicode box drawings: vertical",
    "url": "SWE.Char.VLine(line)",
    "title": "SWE.Char.VLine",
    "group": "SWE_Char",
    "name": "VLine",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>line type, (SWE.Line enum)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>unicode code</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Char"
  },
  {
    "type": "get color string",
    "url": "SWE.Color.ToString(colval)",
    "title": "SWE.Color.ToString",
    "group": "SWE_Color",
    "name": "ToString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colval",
            "description": "<p>color enum or RGB hex value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "colname",
            "description": "<p>color name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_color.js",
    "groupTitle": "SWE_Color"
  },
  {
    "type": "color enums",
    "url": "SWE.Color.<EnumConstant>",
    "title": "SWE.Color.<EnumConstant>",
    "group": "SWE_Color",
    "name": "_EnumConstant_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Black",
            "description": "<p>Color Black</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Navy",
            "description": "<p>Color Navy</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkBlue",
            "description": "<p>Color DarkBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumBlue",
            "description": "<p>Color MediumBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Blue",
            "description": "<p>Color Blue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkGreen",
            "description": "<p>Color DarkGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Green",
            "description": "<p>Color Green</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Teal",
            "description": "<p>Color Teal</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkCyan",
            "description": "<p>Color DarkCyan</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DeepSkyBlue",
            "description": "<p>Color DeepSkyBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkTurquoise",
            "description": "<p>Color DarkTurquoise</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumSpringGreen",
            "description": "<p>Color MediumSpringGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Lime",
            "description": "<p>Color Lime</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SpringGreen",
            "description": "<p>Color SpringGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Aqua",
            "description": "<p>Color Aqua</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Cyan",
            "description": "<p>Color Cyan</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MidnightBlue",
            "description": "<p>Color MidnightBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DodgerBlue",
            "description": "<p>Color DodgerBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightSeaGreen",
            "description": "<p>Color LightSeaGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ForestGreen",
            "description": "<p>Color ForestGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SeaGreen",
            "description": "<p>Color SeaGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkSlateGray",
            "description": "<p>Color DarkSlateGray</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LimeGreen",
            "description": "<p>Color LimeGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumSeaGreen",
            "description": "<p>Color MediumSeaGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Turquoise",
            "description": "<p>Color Turquoise</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RoyalBlue",
            "description": "<p>Color RoyalBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SteelBlue",
            "description": "<p>Color SteelBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkSlateBlue",
            "description": "<p>Color DarkSlateBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumTurquoise",
            "description": "<p>Color MediumTurquoise</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Indigo",
            "description": "<p>Color Indigo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkOliveGreen",
            "description": "<p>Color DarkOliveGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "CadetBlue",
            "description": "<p>Color CadetBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "CornflowerBlue",
            "description": "<p>Color CornflowerBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumAquamarine",
            "description": "<p>Color MediumAquamarine</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DimGray",
            "description": "<p>Color DimGray</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SlateBlue",
            "description": "<p>Color SlateBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "OliveDrab",
            "description": "<p>Color OliveDrab</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SlateGray",
            "description": "<p>Color SlateGray</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightSlateGray",
            "description": "<p>Color LightSlateGray</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumSlateBlue",
            "description": "<p>Color MediumSlateBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LawnGreen",
            "description": "<p>Color LawnGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Chartreuse",
            "description": "<p>Color Chartreuse</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Aquamarine",
            "description": "<p>Color Aquamarine</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Maroon",
            "description": "<p>Color Maroon</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Purple",
            "description": "<p>Color Purple</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Olive",
            "description": "<p>Color Olive</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Gray",
            "description": "<p>Color Gray</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SkyBlue",
            "description": "<p>Color SkyBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightSkyBlue",
            "description": "<p>Color LightSkyBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "BlueViolet",
            "description": "<p>Color BlueViolet</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkRed",
            "description": "<p>Color DarkRed</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkMagenta",
            "description": "<p>Color DarkMagenta</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SaddleBrown",
            "description": "<p>Color SaddleBrown</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkSeaGreen",
            "description": "<p>Color DarkSeaGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightGreen",
            "description": "<p>Color LightGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumPurple",
            "description": "<p>Color MediumPurple</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkViolet",
            "description": "<p>Color DarkViolet</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PaleGreen",
            "description": "<p>Color PaleGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkOrchid",
            "description": "<p>Color DarkOrchid</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Amethyst",
            "description": "<p>Color Amethyst</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "YellowGreen",
            "description": "<p>Color YellowGreen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Sienna",
            "description": "<p>Color Sienna</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Brown",
            "description": "<p>Color Brown</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkGray",
            "description": "<p>Color DarkGray</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightBlue",
            "description": "<p>Color LightBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "GreenYellow",
            "description": "<p>Color GreenYellow</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PaleTurquoise",
            "description": "<p>Color PaleTurquoise</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightSteelBlue",
            "description": "<p>Color LightSteelBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PowderBlue",
            "description": "<p>Color PowderBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "FireBrick",
            "description": "<p>Color FireBrick</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkGoldenrod",
            "description": "<p>Color DarkGoldenrod</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumOrchid",
            "description": "<p>Color MediumOrchid</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RosyBrown",
            "description": "<p>Color RosyBrown</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkKhaki",
            "description": "<p>Color DarkKhaki</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Silver",
            "description": "<p>Color Silver</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MediumVioletRed",
            "description": "<p>Color MediumVioletRed</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "IndianRed",
            "description": "<p>Color IndianRed</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Peru",
            "description": "<p>Color Peru</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Chocolate",
            "description": "<p>Color Chocolate</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Tan",
            "description": "<p>Color Tan</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightGrey",
            "description": "<p>Color LightGrey</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Thistle",
            "description": "<p>Color Thistle</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Orchid",
            "description": "<p>Color Orchid</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Goldenrod",
            "description": "<p>Color Goldenrod</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PaleVioletRed",
            "description": "<p>Color PaleVioletRed</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Crimson",
            "description": "<p>Color Crimson</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Gainsboro",
            "description": "<p>Color Gainsboro</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Plum",
            "description": "<p>Color Plum</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "BurlyWood",
            "description": "<p>Color BurlyWood</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightCyan",
            "description": "<p>Color LightCyan</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Lavender",
            "description": "<p>Color Lavender</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkSalmon",
            "description": "<p>Color DarkSalmon</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Violet",
            "description": "<p>Color Violet</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PaleGoldenrod",
            "description": "<p>Color PaleGoldenrod</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightCoral",
            "description": "<p>Color LightCoral</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Khaki",
            "description": "<p>Color Khaki</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "AliceBlue",
            "description": "<p>Color AliceBlue</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Honeydew",
            "description": "<p>Color Honeydew</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Azure",
            "description": "<p>Color Azure</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SandyBrown",
            "description": "<p>Color SandyBrown</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Wheat",
            "description": "<p>Color Wheat</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Beige",
            "description": "<p>Color Beige</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "WhiteSmoke",
            "description": "<p>Color WhiteSmoke</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MintCream",
            "description": "<p>Color MintCream</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "GhostWhite",
            "description": "<p>Color GhostWhite</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Salmon",
            "description": "<p>Color Salmon</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "AntiqueWhite",
            "description": "<p>Color AntiqueWhite</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Linen",
            "description": "<p>Color Linen</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightGoldenrodYellow",
            "description": "<p>Color LightGoldenrodYellow</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "OldLace",
            "description": "<p>Color OldLace</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Red",
            "description": "<p>Color Red</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Fuchsia",
            "description": "<p>Color Fuchsia</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Magenta",
            "description": "<p>Color Magenta</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DeepPink",
            "description": "<p>Color DeepPink</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "OrangeRed",
            "description": "<p>Color OrangeRed</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Tomato",
            "description": "<p>Color Tomato</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HotPink",
            "description": "<p>Color HotPink</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Coral",
            "description": "<p>Color Coral</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DarkOrange",
            "description": "<p>Color DarkOrange</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightSalmon",
            "description": "<p>Color LightSalmon</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Orange",
            "description": "<p>Color Orange</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightPink",
            "description": "<p>Color LightPink</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Pink",
            "description": "<p>Color Pink</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Gold",
            "description": "<p>Color Gold</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PeachPuff",
            "description": "<p>Color PeachPuff</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "NavajoWhite",
            "description": "<p>Color NavajoWhite</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Moccasin",
            "description": "<p>Color Moccasin</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Bisque",
            "description": "<p>Color Bisque</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MistyRose",
            "description": "<p>Color MistyRose</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "BlanchedAlmond",
            "description": "<p>Color BlanchedAlmond</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PapayaWhip",
            "description": "<p>Color PapayaWhip</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LavenderBlush",
            "description": "<p>Color LavenderBlush</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Seashell",
            "description": "<p>Color Seashell</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Cornsilk",
            "description": "<p>Color Cornsilk</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LemonChiffon",
            "description": "<p>Color LemonChiffon</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "FloralWhite",
            "description": "<p>Color FloralWhite</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Snow",
            "description": "<p>Color Snow</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Yellow",
            "description": "<p>Color Yellow</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LightYellow",
            "description": "<p>Color LightYellow</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Ivory",
            "description": "<p>Color Ivory</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "White",
            "description": "<p>Color White</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Transparent",
            "description": "<p>Color Transparent</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_color.js",
    "groupTitle": "SWE_Color"
  },
  {
    "type": "fontrender constructor",
    "url": "SWE.FontRender(filename,size,blended,style,hinting)",
    "title": "SWE.FontRender",
    "group": "SWE_FontRender",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>ttf font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "size",
            "description": "<p>font size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "blended",
            "description": "<p>blended mode (default: RenderBlended), see SWE.Font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "style",
            "description": "<p>style enum, (default: StyleNormal), see SWE.Font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hinting",
            "description": "<p>hinting enum, (default: HintingNormal), see SWE.Font</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "result",
            "description": "<p>fontrender object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local frs = SWE.FontRender(\"dejavusans.ttf\", 14)\nprint(frs.font,frs.size)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| font    | string  |\n| size    | number  |\n| blended | number  |\n| style   | number  |\n| hinting | number  |\n\n| fixedWidth | number | for fixed font return SymbolAdvance(0x20)\n| lineHeight | number | skip line height",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_fontrender.js",
    "groupTitle": "SWE_FontRender"
  },
  {
    "type": "list: split string width",
    "url": "SWE.FontRender.SplitStringWidth(self,content,width)",
    "title": "SWE.FontRender.SplitStringWidth",
    "group": "SWE_FontRender",
    "name": "SplitStringWidth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "self",
            "description": "<p>fontrender object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>string content</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>width</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "result",
            "description": "<p>string list result</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_fontrender.js",
    "groupTitle": "SWE_FontRender"
  },
  {
    "type": "get symbol advance value",
    "url": "SWE.FontRender.SymbolAdvance(self,symbol)",
    "title": "SWE.FontRender.SymbolAdvance",
    "group": "SWE_FontRender",
    "name": "SymbolAdvance",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "self",
            "description": "<p>fontrender object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "symbol",
            "description": "<p>symbol chars</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>advance value</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_fontrender.js",
    "groupTitle": "SWE_FontRender"
  },
  {
    "type": "convert fontrender to json string",
    "url": "SWE.FontRender.ToJson(self)",
    "title": "SWE.FontRender.ToJson",
    "group": "SWE_FontRender",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "self",
            "description": "<p>fontrender object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_fontrender.js",
    "groupTitle": "SWE_FontRender"
  },
  {
    "type": "fontrender system constructor",
    "url": "SWE.FontRender.System()",
    "title": "SWE.FontRender.System",
    "group": "SWE_FontRender_System",
    "name": "Constructor",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "result",
            "description": "<p>fontrender object internal generated from &quot;alt-8x16.psf&quot;</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local frs = SWE.FontRender.System()\nprint(frs.font,frs.size)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| font    | string  | system |\n\n| fixedWidth | number | for fixed font return SymbolAdvance(0x20)\n| lineHeight | number | skip line height",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_fontrender.js",
    "groupTitle": "SWE_FontRender_System"
  },
  {
    "type": "color enums",
    "url": "SWE.Font.<EnumConstant>",
    "title": "SWE.Font.<EnumConstant>",
    "group": "SWE_Font",
    "name": "_EnumConstant_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RenderSolid",
            "description": "<p>font render: solid</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RenderBlended",
            "description": "<p>font render: blended</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RenderShaded",
            "description": "<p>font render: shaded</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleNormal",
            "description": "<p>font style: normal</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleBold",
            "description": "<p>font style: bold</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleItalic",
            "description": "<p>font style: italic</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleUnderLine",
            "description": "<p>font style: under line</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleStrikeThrough",
            "description": "<p>font style: strike through</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingNormal",
            "description": "<p>font hinting: normal</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingLight",
            "description": "<p>font hinting: light</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingMono",
            "description": "<p>font hinting: mono</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingNone",
            "description": "<p>font hinting: none</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_fontrender.js",
    "groupTitle": "SWE_Font"
  },
  {
    "type": "get color string",
    "url": "SWE.Key.ToString(key)",
    "title": "SWE.Key.ToChar",
    "group": "SWE_Key",
    "name": "ToChar",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "key",
            "description": "<p>key enum</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "char",
            "description": "<p>key charset</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_key.js",
    "groupTitle": "SWE_Key"
  },
  {
    "type": "get color string",
    "url": "SWE.Key.ToString(key)",
    "title": "SWE.Key.ToString",
    "group": "SWE_Key",
    "name": "ToString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "key",
            "description": "<p>key enum</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>key name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_key.js",
    "groupTitle": "SWE_Key"
  },
  {
    "type": "key enums",
    "url": "SWE.Key.<EnumConstant>",
    "title": "SWE.Key.<EnumConstant>",
    "group": "SWE_Key",
    "name": "_EnumConstant_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "NONE",
            "description": "<p>key NONE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ESCAPE",
            "description": "<p>key ESCAPE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F1",
            "description": "<p>key F1</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F2",
            "description": "<p>key F2</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F3",
            "description": "<p>key F3</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F4",
            "description": "<p>key F4</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F5",
            "description": "<p>key F5</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F6",
            "description": "<p>key F6</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F7",
            "description": "<p>key F7</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F8",
            "description": "<p>key F8</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F9",
            "description": "<p>key F9</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F10",
            "description": "<p>key F10</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F11",
            "description": "<p>key F11</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F12",
            "description": "<p>key F12</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "INSERT",
            "description": "<p>key INSERT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HOME",
            "description": "<p>key HOME</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "END",
            "description": "<p>key END</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DELETE",
            "description": "<p>key DELETE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PAGEUP",
            "description": "<p>key PAGEUP</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PAGEDOWN",
            "description": "<p>key PAGEDOWN</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LEFT",
            "description": "<p>key LEFT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RIGHT",
            "description": "<p>key RIGHT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "UP",
            "description": "<p>key UP</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DOWN",
            "description": "<p>key DOWN</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RETURN",
            "description": "<p>key RETURN</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "BACKQUOTE",
            "description": "<p>key BACKQUOTE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K1",
            "description": "<p>key K1</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K2",
            "description": "<p>key K2</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K3",
            "description": "<p>key K3</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K4",
            "description": "<p>key K4</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K5",
            "description": "<p>key K5</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K6",
            "description": "<p>key K6</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K7",
            "description": "<p>key K7</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K8",
            "description": "<p>key K8</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K9",
            "description": "<p>key K9</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K0",
            "description": "<p>key K0</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MINUS",
            "description": "<p>key MINUS</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "EQUALS",
            "description": "<p>key EQUALS</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "BACKSPACE",
            "description": "<p>key BACKSPACE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "TAB",
            "description": "<p>key TAB</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LEFTBRACKET",
            "description": "<p>key LEFTBRACKET</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RIGHTBRACKET",
            "description": "<p>key RIGHTBRACKET</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "BACKSLASH",
            "description": "<p>key BACKSLASH</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SEMICOLON",
            "description": "<p>key SEMICOLON</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "QUOTE",
            "description": "<p>key QUOTE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "COMMA",
            "description": "<p>key COMMA</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PERIOD",
            "description": "<p>key PERIOD</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SLASH",
            "description": "<p>key SLASH</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SPACE",
            "description": "<p>key SPACE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "a",
            "description": "<p>key a</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "b",
            "description": "<p>key b</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "c",
            "description": "<p>key c</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "d",
            "description": "<p>key d</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "e",
            "description": "<p>key e</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "f",
            "description": "<p>key f</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "g",
            "description": "<p>key g</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "h",
            "description": "<p>key h</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "i",
            "description": "<p>key i</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "j",
            "description": "<p>key j</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "k",
            "description": "<p>key k</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "l",
            "description": "<p>key l</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "m",
            "description": "<p>key m</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "n",
            "description": "<p>key n</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "o",
            "description": "<p>key o</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "p",
            "description": "<p>key p</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "q",
            "description": "<p>key q</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "r",
            "description": "<p>key r</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "s",
            "description": "<p>key s</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "t",
            "description": "<p>key t</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "u",
            "description": "<p>key u</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "v",
            "description": "<p>key v</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "w",
            "description": "<p>key w</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "x",
            "description": "<p>key x</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "y",
            "description": "<p>key y</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "z",
            "description": "<p>key z</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "CTRL",
            "description": "<p>key CTRL</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ALT",
            "description": "<p>key ALT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SHIFT",
            "description": "<p>key SHIFT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "TILDE",
            "description": "<p>key TILDE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "EXCLAIM",
            "description": "<p>key EXCLAIM</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "AT",
            "description": "<p>key AT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HASH",
            "description": "<p>key HASH</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "DOLLAR",
            "description": "<p>key DOLLAR</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PERCENT",
            "description": "<p>key PERCENT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "CARET",
            "description": "<p>key CARET</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "AMPERSAND",
            "description": "<p>key AMPERSAND</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ASTERISK",
            "description": "<p>key ASTERISK</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LEFTPAREN",
            "description": "<p>key LEFTPAREN</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RIGHTPAREN",
            "description": "<p>key RIGHTPAREN</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "UNDERSCORE",
            "description": "<p>key UNDERSCORE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PLUS",
            "description": "<p>key PLUS</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LEFTCURLY",
            "description": "<p>key LEFTCURLY</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RIGHTCURLY",
            "description": "<p>key RIGHTCURLY</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "VERTLINE",
            "description": "<p>key VERTLINE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "COLON",
            "description": "<p>key COLON</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "QUOTEDBL",
            "description": "<p>key QUOTEDBL</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LESS",
            "description": "<p>key LESS</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "GREATER",
            "description": "<p>key GREATER</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "QUESTION",
            "description": "<p>key QUESTION</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "A",
            "description": "<p>key A</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "B",
            "description": "<p>key B</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "C",
            "description": "<p>key C</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "D",
            "description": "<p>key D</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "E",
            "description": "<p>key E</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "F",
            "description": "<p>key F</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "G",
            "description": "<p>key G</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "H",
            "description": "<p>key H</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "I",
            "description": "<p>key I</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "J",
            "description": "<p>key J</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "K",
            "description": "<p>key K</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "L",
            "description": "<p>key L</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "M",
            "description": "<p>key M</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "N",
            "description": "<p>key N</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "O",
            "description": "<p>key O</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "P",
            "description": "<p>key P</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Q",
            "description": "<p>key Q</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "R",
            "description": "<p>key R</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "S",
            "description": "<p>key S</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "T",
            "description": "<p>key T</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "U",
            "description": "<p>key U</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "V",
            "description": "<p>key V</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "W",
            "description": "<p>key W</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "X",
            "description": "<p>key X</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Y",
            "description": "<p>key Y</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Z",
            "description": "<p>key Z</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "CAPSLOCK",
            "description": "<p>key CAPSLOCK</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SCROLLOCK",
            "description": "<p>key SCROLLOCK</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RSHIFT",
            "description": "<p>key RSHIFT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LSHIFT",
            "description": "<p>key LSHIFT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RCTRL",
            "description": "<p>key RCTRL</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LCTRL",
            "description": "<p>key LCTRL</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RALT",
            "description": "<p>key RALT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LALT",
            "description": "<p>key LALT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RMETA",
            "description": "<p>key RMETA</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LMETA",
            "description": "<p>key LMETA</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "LSUPER",
            "description": "<p>key LSUPER</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RSUPER",
            "description": "<p>key RSUPER</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MODE",
            "description": "<p>key MODE</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HELP",
            "description": "<p>key HELP</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "PRINT",
            "description": "<p>key PRINT</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "SYSREQ",
            "description": "<p>key SYSREQ</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "MENU",
            "description": "<p>key MENU</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "POWER",
            "description": "<p>key POWER</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "UNDO",
            "description": "<p>key UNDO</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_key.js",
    "groupTitle": "SWE_Key"
  },
  {
    "type": "line enums",
    "url": "SWE.Line.<EnumConstant>",
    "title": "SWE.Line.<EnumConstant>",
    "group": "SWE_Line",
    "name": "_EnumConstant_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Ascii",
            "description": "<p>line ascii code</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Thin",
            "description": "<p>line thin utf16</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Bold",
            "description": "<p>line bold utf16</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Double",
            "description": "<p>line double utf16</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- draw box\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Line"
  },
  {
    "type": "MouseButton enums",
    "url": "SWE.MouseButton.<EnumConstant>",
    "title": "SWE.MouseButton.<EnumConstant>",
    "group": "SWE_MouseButton",
    "name": "_EnumConstant_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Left",
            "description": "<p>mouse button left</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Right",
            "description": "<p>mouse button right</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "Middle",
            "description": "<p>mouse button middle</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "X1",
            "description": "<p>mouse button x1</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "X2",
            "description": "<p>mouse button x2</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_MouseButton"
  },
  {
    "type": "point constructor",
    "url": "SWE.Point(posx,posy)SWE.Point(string)",
    "title": "SWE.Point",
    "group": "SWE_Point",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>position</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "string",
            "description": "<p>parse string (delimiter: any non digital)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Point",
            "optional": false,
            "field": "result",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local pt = SWE.Point(100, 200)\nprint(pt.posx,pt.posy)",
        "type": "json"
      },
      {
        "title": "ext table fields (read write)",
        "content": "| posx    | number  |\n| posy    | number  |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Point"
  },
  {
    "type": "convert point to json string",
    "url": "SWE.Point.ToJson(self)",
    "title": "SWE.Point.ToJson",
    "group": "SWE_Point",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "self",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local pt = SWE.Point(10, 20)\nprint(pt:ToJson())\n.....\n'{\"posx\":10,\"posy\":20}'",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Point"
  },
  {
    "type": "get list point fields",
    "url": "SWE.Point.Unpack(self)",
    "title": "SWE.Point.Unpack",
    "group": "SWE_Point",
    "name": "Unpack",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "self",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "values",
            "description": "<p>coord values (posx, posy)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local pt = SWE.Point(10, 20)\nprint(pt:Unpack())\n.....\n10    20",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Point"
  },
  {
    "type": "terminal char property enums",
    "url": "SWE.Property.<EnumConstant>",
    "title": "SWE.Property.<EnumConstant>",
    "group": "SWE_Property",
    "name": "_EnumConstant_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RenderSolid",
            "description": "<p>SDL ttf render constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RenderBlended",
            "description": "<p>SDL ttf render constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "RenderShaded",
            "description": "<p>SDL ttf render constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleNormal",
            "description": "<p>SDL ttf style constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleBold",
            "description": "<p>SDL ttf style constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleItalic",
            "description": "<p>SDL ttf style constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleUnderLine",
            "description": "<p>SDL ttf style constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "StyleStrikeThrough",
            "description": "<p>SDL ttf style constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingNormal",
            "description": "<p>SDL ttf hinting constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingLight",
            "description": "<p>SDL ttf hinting constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingMono",
            "description": "<p>SDL ttf hinting constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "HintingNone",
            "description": "<p>SDL ttf hinting constant</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Property"
  },
  {
    "type": "check iteration hits",
    "url": "SWE.RandomHit.Check(self)",
    "title": "SWE.RandomHit.Check",
    "group": "SWE_RandomHit",
    "name": "Check",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.RandomHit",
            "optional": false,
            "field": "self",
            "description": "<p>randomhit object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if hit</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_randomhit.js",
    "groupTitle": "SWE_RandomHit"
  },
  {
    "type": "randomhit constructor",
    "url": "SWE.RandomHit(chance)",
    "title": "SWE.RandomHit",
    "group": "SWE_RandomHit",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "chance",
            "description": "<p>hit chance (1 - 99)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.RandomHit",
            "optional": false,
            "field": "result",
            "description": "<p>randomhit object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local hit = SWE.RandomHit(33)\n    print(hit:ToJson())\n\n    for i = 1,100 do\n\tlocal check = hit:Check()\n    end\n\n    local check = hit:Check()\n    print(hit:ToJson())\n\n    for i = 2,100 do\n\tlocal check = hit:Check()\n    end\n\n    local check = hit:Check()\n    print(hit:ToJson())\n\n    for i = 2,100 do\n\tlocal check = hit:Check()\n    end",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| chance  | number  |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_randomhit.js",
    "groupTitle": "SWE_RandomHit"
  },
  {
    "type": "get last checked",
    "url": "SWE.RandomHit.Last(self)",
    "title": "SWE.RandomHit.Last",
    "group": "SWE_RandomHit",
    "name": "Last",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.RandomHit",
            "optional": false,
            "field": "self",
            "description": "<p>randomhit object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "result",
            "description": "<p>last check value</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_randomhit.js",
    "groupTitle": "SWE_RandomHit"
  },
  {
    "type": "convert randomhit to json string",
    "url": "SWE.RandomHit.ToJson(self)",
    "title": "SWE.RandomHit.ToJson",
    "group": "SWE_RandomHit",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.RandomHit",
            "optional": false,
            "field": "self",
            "description": "<p>randomhit object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_randomhit.js",
    "groupTitle": "SWE_RandomHit"
  },
  {
    "type": "rect constructor",
    "url": "SWE.Rect(posx,posy,width,height)SWE.Rect(string)",
    "title": "SWE.Rect",
    "group": "SWE_Rect",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>size</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "string",
            "description": "<p>parse string (delimiter: any non digital)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Rect",
            "optional": false,
            "field": "result",
            "description": "<p>rect object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local rt = SWE.Rect(10, 20, 100, 200)\nprint(rt.posx,rt.posy,rt.width,rt.height)",
        "type": "json"
      },
      {
        "title": "ext table fields (read write)",
        "content": "| posx    | number  |\n| posy    | number  |\n| width   | number  |\n| height  | number  |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Rect"
  },
  {
    "type": "get intersect rects",
    "url": "SWE.Rect.GetIntersectRect(rect1,rect2)",
    "title": "SWE.Rect.GetIntersectRect",
    "group": "SWE_Rect",
    "name": "GetIntersectRect",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect1",
            "description": "<p>rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect2",
            "description": "<p>rect object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Rect",
            "optional": false,
            "field": "result",
            "description": "<p>rect intersect</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local rt1 = SWE.Rect(10,20,100, 200)\nlocal rt2 = SWE.Rect(50,80,100, 200)\nlocal res = rt1:GetIntersectRect(rt2)\nprint(\"intersect rect\",res.ToJson())",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Rect"
  },
  {
    "type": "check has intersection rects",
    "url": "SWE.Rect.HasIntersection(rect1,rect2)",
    "title": "SWE.Rect.HasIntersection",
    "group": "SWE_Rect",
    "name": "HasIntersection",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect1",
            "description": "<p>rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect2",
            "description": "<p>rect object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if there is an intersection</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local rt1 = SWE.Rect(10,20,100, 200)\nlocal rt2 = SWE.Rect(50,80,100, 200)\nlocal res = rt1:HasIntersection(rt2)\nprint(\"has intersection\",res)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Rect"
  },
  {
    "type": "check point in rect",
    "url": "SWE.Rect.PointInRect(self,point)SWE.Rect.PointInRect(self,px,py)",
    "title": "SWE.Rect.PointInRect",
    "group": "SWE_Rect",
    "name": "PointInRect",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "self",
            "description": "<p>rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point",
            "description": "<p>point object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "px",
            "description": "<p>point value</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "py",
            "description": "<p>point value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if point resides inside rectangle</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local rt = SWE.Rect(10,20,100, 200)\nlocal pt = SWE.Point(150, 150)\nlocal res = rt:PointInRect(pt)\nprint(\"point in rect\",res)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Rect"
  },
  {
    "type": "check rect equals",
    "url": "SWE.Rect.RectEquals(rect1,rect2)",
    "title": "SWE.Rect.RectEquals",
    "group": "SWE_Rect",
    "name": "RectEquals",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect1",
            "description": "<p>rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect2",
            "description": "<p>rect object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if the two rectangles are exactly the same</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Rect"
  },
  {
    "type": "convert rect to json string",
    "url": "SWE.Rect.ToJson(self)",
    "title": "SWE.Rect.ToJson",
    "group": "SWE_Rect",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "self",
            "description": "<p>rect object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local rt = SWE.Rect(10, 20, 100, 200)\nprint(rt:ToJson())\n.....\n'{\"posx\":10,\"posy\":20,\"width\":100,\"height\":200}'",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Rect"
  },
  {
    "type": "get list rect fields",
    "url": "SWE.Rect.Unpack(self)",
    "title": "SWE.Rect.Unpack",
    "group": "SWE_Rect",
    "name": "Unpack",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "self",
            "description": "<p>rect object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "values",
            "description": "<p>rect values (posx,posy,width, height)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Rect"
  },
  {
    "type": "scene: move window to top layer",
    "url": "SWE.Scene.MoveTop(win)",
    "title": "SWE.Scene.MoveTop",
    "group": "SWE_Scene",
    "name": "MoveTop",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "win",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success operation</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Scene"
  },
  {
    "type": "scene: remove window",
    "url": "SWE.Scene.Remove(win)",
    "title": "SWE.Scene.Remove",
    "group": "SWE_Scene",
    "name": "Remove",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "win",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success operation</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Scene"
  },
  {
    "type": "get signal string",
    "url": "SWE.Signal.ToString(signal)",
    "title": "SWE.Signal.ToString",
    "group": "SWE_Signal",
    "name": "ToString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "signal",
            "description": "<p>signal enum</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>signal name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_signal.js",
    "groupTitle": "SWE_Signal"
  },
  {
    "type": "signal enums",
    "url": "SWE.Signal.<EnumConstant>",
    "title": "SWE.Signal.<EnumConstant>",
    "group": "SWE_Signal",
    "name": "_EnumConstant_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "GestureFingerUp",
            "description": "<p>gesture signal: finger up</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "GestureFingerDown",
            "description": "<p>gesture signal: finger down</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "GestureFingerLeft",
            "description": "<p>gesture signal: finger left</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "GestureFingerRight",
            "description": "<p>gesture signal: finger right</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "FingerMoveUp",
            "description": "<p>finger signal: move up</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "FingerMoveDown",
            "description": "<p>finger signal: move down</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "FingerMoveLeft",
            "description": "<p>finger signal: move left</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "FingerMoveRight",
            "description": "<p>finger signal: move right</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local landscape = false\n    local win = SWE.DisplayInit(\"GestureTest\", landscape)\n\n    win.SystemUserEvent = function(a,b)\n        if a == SWE.Signal.GestureFingerUp then\n            SWE.Debug(\"GestureFingerUp\")\n\t    return true\n        elseif a == SWE.Signal.GestureFingerDown then\n            SWE.Debug(\"GestureFingerDown\")\n\t    return true\n        elseif a == SWE.Signal.GestureFingerLeft then\n            SWE.Debug(\"GestureFingerLeft\")\n\t    return true\n        elseif a == SWE.Signal.GestureFingerRight then\n            SWE.Debug(\"GestureFingerRight\")\n\t    return true\n        elseif a == SWE.Signal.FingerMoveUp then\n            SWE.Debug(\"FingerMoveUp\")\n\t    return true\n        elseif a == SWE.Signal.FingerMoveDown then\n            SWE.Debug(\"FingerMoveDown\")\n\t    return true\n        elseif a == SWE.Signal.FingerMoveLeft then\n            SWE.Debug(\"FingerMoveLeft\")\n\t    return true\n        elseif a == SWE.Signal.FingerMoveRight then\n            SWE.Debug(\"FingerMoveRight\")\n\t    return true\n        end\n\treturn false\n    end\n\n    SWE.MainLoop(win)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_signal.js",
    "groupTitle": "SWE_Signal"
  },
  {
    "type": "size constructor",
    "url": "SWE.Size(width,height)SWE.Size(string)",
    "title": "SWE.Size",
    "group": "SWE_Size",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>size value</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>size value</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "string",
            "description": "<p>parse string (delimiter: any non digital)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Size",
            "optional": false,
            "field": "result",
            "description": "<p>size object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local sz = SWE.Size(100, 200)\nprint(sz.width,sz.height)",
        "type": "json"
      },
      {
        "title": "ext table fields (read write)",
        "content": "| width   | number  |\n| height  | number  |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Size"
  },
  {
    "type": "convert size to json string",
    "url": "SWE.Size.ToJson(self)",
    "title": "SWE.Size.ToJson",
    "group": "SWE_Size",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Size",
            "optional": false,
            "field": "self",
            "description": "<p>size object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local sz = SWE.Size(100, 200)\nprint(sz:ToJson())\n.....\n'{\"width\":100,\"height\":200}'",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Size"
  },
  {
    "type": "get list size fields",
    "url": "SWE.Size.Unpack(self)",
    "title": "SWE.Size.Unpack",
    "group": "SWE_Size",
    "name": "Unpack",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Size",
            "optional": false,
            "field": "self",
            "description": "<p>size object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "values",
            "description": "<p>size values (width, height)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_rect.js",
    "groupTitle": "SWE_Size"
  },
  {
    "type": "streambuf constructor",
    "url": "SWE.StreamBuf(),(buf)",
    "title": "SWE.StreamBuf",
    "group": "SWE_StreamBuf",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "buf",
            "description": "<p>initial buffer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "result",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get 16 bit value",
    "url": "SWE.StreamBuf.GetBE16(self)",
    "title": "SWE.StreamBuf.GetBE16",
    "group": "SWE_StreamBuf",
    "name": "GetBE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>16 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get 32 bit value",
    "url": "SWE.StreamBuf.GetBE32(self)",
    "title": "SWE.StreamBuf.GetBE32",
    "group": "SWE_StreamBuf",
    "name": "GetBE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>32 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get 64 bit value",
    "url": "SWE.StreamBuf.GetBE64(self)",
    "title": "SWE.StreamBuf.GetBE64",
    "group": "SWE_StreamBuf",
    "name": "GetBE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>64 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get 8 bit value",
    "url": "SWE.StreamBuf.GetByte(self)",
    "title": "SWE.StreamBuf.GetByte",
    "group": "SWE_StreamBuf",
    "name": "GetByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "owner",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>8 bit value</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get bytes",
    "url": "SWE.StreamBuf.GetBytes(self,length)",
    "title": "SWE.StreamBuf.GetBytes",
    "group": "SWE_StreamBuf",
    "name": "GetBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>binarybuf object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get 16 bit value",
    "url": "SWE.StreamBuf.GetLE16(self)",
    "title": "SWE.StreamBuf.GetLE16",
    "group": "SWE_StreamBuf",
    "name": "GetLE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>16 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get 32 bit value",
    "url": "SWE.StreamBuf.GetLE32(self)",
    "title": "SWE.StreamBuf.GetLE32",
    "group": "SWE_StreamBuf",
    "name": "GetLE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>32 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get 64 bit value",
    "url": "SWE.StreamBuf.GetLE64(self)",
    "title": "SWE.StreamBuf.GetLE64",
    "group": "SWE_StreamBuf",
    "name": "GetLE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>64 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf get string",
    "url": "SWE.StreamBuf.GetString(self,length)",
    "title": "SWE.StreamBuf.GetString",
    "group": "SWE_StreamBuf",
    "name": "GetString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>string data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put 16 bit value",
    "url": "SWE.StreamBuf.PutBE16(self,value)",
    "title": "SWE.StreamBuf.PutBE16",
    "group": "SWE_StreamBuf",
    "name": "PutBE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>16 bit value put (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put 32 bit value",
    "url": "SWE.StreamBuf.PutBE32(self,value)",
    "title": "SWE.StreamBuf.PutBE32",
    "group": "SWE_StreamBuf",
    "name": "PutBE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>32 bit value put (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put 64 bit value",
    "url": "SWE.StreamBuf.PutBE64(self,value)",
    "title": "SWE.StreamBuf.PutBE64",
    "group": "SWE_StreamBuf",
    "name": "PutBE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>64 bit value put (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put 8 bit value",
    "url": "SWE.StreamBuf.PutByte(self,value)",
    "title": "SWE.StreamBuf.PutByte",
    "group": "SWE_StreamBuf",
    "name": "PutByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>8 bit value put</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put bytes",
    "url": "SWE.StreamBuf.PutBytes(self,inputbuf)",
    "title": "SWE.StreamBuf.PutBytes",
    "group": "SWE_StreamBuf",
    "name": "PutBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put 16 bit value",
    "url": "SWE.StreamBuf.PutLE16(self,value)",
    "title": "SWE.StreamBuf.PutLE16",
    "group": "SWE_StreamBuf",
    "name": "PutLE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>16 bit value put (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put 32 bit value",
    "url": "SWE.StreamBuf.PutLE32(self,value)",
    "title": "SWE.StreamBuf.PutLE32",
    "group": "SWE_StreamBuf",
    "name": "PutLE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>32 bit value put (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streambuf put 64 bit value",
    "url": "SWE.StreamBuf.PutLE64(self,value)",
    "title": "SWE.StreamBuf.PutLE64",
    "group": "SWE_StreamBuf",
    "name": "PutLE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>64 bit value put (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "convert streambuf to json string",
    "url": "SWE.StreamBuf.ToJson(self)",
    "title": "SWE.StreamBuf.ToJson",
    "group": "SWE_StreamBuf",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamBuf",
            "optional": false,
            "field": "self",
            "description": "<p>streambuf object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streambuf.js",
    "groupTitle": "SWE_StreamBuf"
  },
  {
    "type": "streamfile close stream",
    "url": "SWE.StreamFile.Close(self)",
    "title": "SWE.StreamFile.Close",
    "group": "SWE_StreamFile",
    "name": "Close",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile constructor",
    "url": "SWE.StreamFile(),(name,mode)",
    "title": "SWE.StreamFile",
    "group": "SWE_StreamFile",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>filename</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mode",
            "description": "<p>open mode</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "result",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local file = SWE.StreamFile(\"/tmp/test.dump\",\"rb\")\n    if file then\n        local id1 = file:ReadBE16()\n        local id2 = file:ReadBE16()\n        local id3 = file:ReadBE16()\n\tfile:Seek(12, SWE.RW.SeekSet)\n        local id4 = file:ReadBE32()\n        print(id1,id2,id3,id4)\n    end",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| filename | string  |\n| openmode | string  |\n| size     | number  |\n| valid    | boolean |",
        "type": "json"
      },
      {
        "title": "open modes",
        "content": "r  Open a file for reading. The file must exist.\nw  Create an empty file for writing.\n   If a file with the same name already exists its content is erased and the file is treated as a new empty file.\na  Append to a file.\n   Writing operations append data at the end of the file.\n   The file is created if it does not exist.\nr+ Open a file for update both reading and writing.\n   The file must exist.\nw+ Create an empty file for both reading and writing.\n   If a file with the same name already exists its content is erased and the file is treated as a new empty file.\na+ Open a file for reading and appending.\n   All writing operations are performed at the end of the file, protecting the previous content to be overwritten.\n   You can reposition (fseek, rewind) the internal pointer to anywhere in the file for reading, but writing operations will move it back to the end of file.\n   The file is created if it does not exist.\n\nIn order to open a file as a binary file, a \"b\" character has to be included in the mode string.\nThis additional \"b\" character can either be appended at the end of the string\n(thus making the following compound modes: \"rb\", \"wb\", \"ab\", \"r+b\", \"w+b\", \"a+b\") or be inserted between the letter and\nthe \"+\" sign for the mixed modes (\"rb+\", \"wb+\", \"ab+\").\nAdditional characters may follow the sequence, although they should have no effect.\nFor example, \"t\" is sometimes appended to make explicit the file is a text file.",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile open stream",
    "url": "SWE.StreamFile.Open(self,name,mode)",
    "title": "SWE.StreamFile.Open",
    "group": "SWE_StreamFile",
    "name": "Open",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>filename</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mode",
            "description": "<p>open mode</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "open modes",
        "content": "r  Open a file for reading. The file must exist.\nw  Create an empty file for writing.\n   If a file with the same name already exists its content is erased and the file is treated as a new empty file.\na  Append to a file.\n   Writing operations append data at the end of the file.\n   The file is created if it does not exist.\nr+ Open a file for update both reading and writing.\n   The file must exist.\nw+ Create an empty file for both reading and writing.\n   If a file with the same name already exists its content is erased and the file is treated as a new empty file.\na+ Open a file for reading and appending.\n   All writing operations are performed at the end of the file, protecting the previous content to be overwritten.\n   You can reposition (fseek, rewind) the internal pointer to anywhere in the file for reading, but writing operations will move it back to the end of file.\n   The file is created if it does not exist.\n\nIn order to open a file as a binary file, a \"b\" character has to be included in the mode string.\nThis additional \"b\" character can either be appended at the end of the string\n(thus making the following compound modes: \"rb\", \"wb\", \"ab\", \"r+b\", \"w+b\", \"a+b\") or be inserted between the letter and\nthe \"+\" sign for the mixed modes (\"rb+\", \"wb+\", \"ab+\").\nAdditional characters may follow the sequence, although they should have no effect.\nFor example, \"t\" is sometimes appended to make explicit the file is a text file.",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read 16 bit value",
    "url": "SWE.StreamFile.ReadBE16(self)",
    "title": "SWE.StreamFile.ReadBE16",
    "group": "SWE_StreamFile",
    "name": "ReadBE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>16 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read 32 bit value",
    "url": "SWE.StreamFile.ReadBE32(self)",
    "title": "SWE.StreamFile.ReadBE32",
    "group": "SWE_StreamFile",
    "name": "ReadBE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>32 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read 64 bit value",
    "url": "SWE.StreamFile.ReadBE64(self)",
    "title": "SWE.StreamFile.ReadBE64",
    "group": "SWE_StreamFile",
    "name": "ReadBE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>64 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read 8 bit value",
    "url": "SWE.StreamFile.ReadByte(self)",
    "title": "SWE.StreamFile.ReadByte",
    "group": "SWE_StreamFile",
    "name": "ReadByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "owner",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>8 bit value</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read bytes",
    "url": "SWE.StreamFile.ReadBytes(self,length)",
    "title": "SWE.StreamFile.ReadBytes",
    "group": "SWE_StreamFile",
    "name": "ReadBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>binarybuf object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read 16 bit value",
    "url": "SWE.StreamFile.ReadLE16(self)",
    "title": "SWE.StreamFile.ReadLE16",
    "group": "SWE_StreamFile",
    "name": "ReadLE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>16 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read 32 bit value",
    "url": "SWE.StreamFile.ReadLE32(self)",
    "title": "SWE.StreamFile.ReadLE32",
    "group": "SWE_StreamFile",
    "name": "ReadLE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>32 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read 64 bit value",
    "url": "SWE.StreamFile.ReadLE64(self)",
    "title": "SWE.StreamFile.ReadLE64",
    "group": "SWE_StreamFile",
    "name": "ReadLE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>64 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile read string",
    "url": "SWE.StreamFile.ReadString(self,length)",
    "title": "SWE.StreamFile.ReadString",
    "group": "SWE_StreamFile",
    "name": "ReadString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>string data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile seek pos",
    "url": "SWE.StreamFile.Seek(self,offset,whence)",
    "title": "SWE.StreamFile.Seek",
    "group": "SWE_StreamFile",
    "name": "Seek",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>seek position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "whence",
            "description": "<p>SWE.RW {Seek.Set, SeekCur, SeekEnd}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile tell pos",
    "url": "SWE.StreamFile.Tell(self)",
    "title": "SWE.StreamFile.Tell",
    "group": "SWE_StreamFile",
    "name": "Tell",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>tell position</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "convert streamfile to json string",
    "url": "SWE.StreamFile.ToJson(self)",
    "title": "SWE.StreamFile.ToJson",
    "group": "SWE_StreamFile",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write 16 bit value",
    "url": "SWE.StreamFile.WriteBE16(self,value)",
    "title": "SWE.StreamFile.WriteBE16",
    "group": "SWE_StreamFile",
    "name": "WriteBE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>16 bit value write (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write 32 bit value",
    "url": "SWE.StreamFile.WriteBE32(self,value)",
    "title": "SWE.StreamFile.WriteBE32",
    "group": "SWE_StreamFile",
    "name": "WriteBE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>32 bit value write (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write 64 bit value",
    "url": "SWE.StreamFile.WriteBE64(self,value)",
    "title": "SWE.StreamFile.WriteBE64",
    "group": "SWE_StreamFile",
    "name": "WriteBE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>64 bit value write (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write 8 bit value",
    "url": "SWE.StreamFile.WriteByte(self,value)",
    "title": "SWE.StreamFile.WriteByte",
    "group": "SWE_StreamFile",
    "name": "WriteByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>8 bit value write</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write bytes",
    "url": "SWE.StreamFile.WriteBytes(self,inputbuf)",
    "title": "SWE.StreamFile.WriteBytes",
    "group": "SWE_StreamFile",
    "name": "WriteBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write 16 bit value",
    "url": "SWE.StreamFile.WriteLE16(self,value)",
    "title": "SWE.StreamFile.WriteLE16",
    "group": "SWE_StreamFile",
    "name": "WriteLE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>16 bit value write (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write 32 bit value",
    "url": "SWE.StreamFile.WriteLE32(self,value)",
    "title": "SWE.StreamFile.WriteLE32",
    "group": "SWE_StreamFile",
    "name": "WriteLE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>32 bit value write (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamfile write 64 bit value",
    "url": "SWE.StreamFile.WriteLE64(self,value)",
    "title": "SWE.StreamFile.WriteLE64",
    "group": "SWE_StreamFile",
    "name": "WriteLE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamFile",
            "optional": false,
            "field": "self",
            "description": "<p>streamfile object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>64 bit value write (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamfile.js",
    "groupTitle": "SWE_StreamFile"
  },
  {
    "type": "streamnet close connect",
    "url": "SWE.StreamNet.Close(self)",
    "title": "SWE.StreamNet.Close",
    "group": "SWE_StreamNet",
    "name": "Close",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet connect",
    "url": "SWE.StreamNet.Connect(self,server,port)",
    "title": "SWE.StreamNet.Connect",
    "group": "SWE_StreamNet",
    "name": "Connect",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "server",
            "description": "<p>network connect</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "port",
            "description": "<p>network port</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet constructor",
    "url": "SWE.StreamNet(),(server,port)",
    "title": "SWE.StreamNet",
    "group": "SWE_StreamNet",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "server",
            "description": "<p>network connect</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "port",
            "description": "<p>network port</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "result",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local net = SWE.StreamNet()\nlocal res = net:Connect(\"127.0.0.1\", 22)\nif res then\n    local info = net:RecvString(0x0A)\n    net:SendString(\"quit\\r\\n\")\n    print(info)\nelse\n    print(\"connect false\")\nend\n\n.... may be output\n.... SSH-2.0-OpenSSH_5.3",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| address | string  |\n| port    | number  |",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet data ready",
    "url": "SWE.StreamNet.DataReady(self)",
    "title": "SWE.StreamNet.DataReady",
    "group": "SWE_StreamNet",
    "name": "DataReady",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if data ready</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet listen port",
    "url": "SWE.StreamNet.Listen(self,port)",
    "title": "SWE.StreamNet.Listen",
    "group": "SWE_StreamNet",
    "name": "Listen",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "port",
            "description": "<p>network port</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "return local addresses",
    "url": "SWE.StreamNet.LocalAddresses()",
    "title": "SWE.StreamNet.LocalAddresses",
    "group": "SWE_StreamNet",
    "name": "LocalAddresses",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "table",
            "optional": false,
            "field": "result",
            "description": "<p>local addresses list</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local addrs = SWE.StreamNet.LocalAddresses()\nfor i=1,#addrs do\n    print(\"ip address\" .. addrs[i])\nend",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv 16 bit value",
    "url": "SWE.StreamNet.RecvBE16(self)",
    "title": "SWE.StreamNet.RecvBE16",
    "group": "SWE_StreamNet",
    "name": "RecvBE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>16 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv 32 bit value",
    "url": "SWE.StreamNet.RecvBE32(self)",
    "title": "SWE.StreamNet.RecvBE32",
    "group": "SWE_StreamNet",
    "name": "RecvBE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>32 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv 64 bit value",
    "url": "SWE.StreamNet.RecvBE64(self)",
    "title": "SWE.StreamNet.RecvBE64",
    "group": "SWE_StreamNet",
    "name": "RecvBE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>64 bit value (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv 8 bit value",
    "url": "SWE.StreamNet.RecvByte(self)",
    "title": "SWE.StreamNet.RecvByte",
    "group": "SWE_StreamNet",
    "name": "RecvByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "owner",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>8 bit value</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv bytes",
    "url": "SWE.StreamNet.RecvBytes(self,length)",
    "title": "SWE.StreamNet.RecvBytes",
    "group": "SWE_StreamNet",
    "name": "RecvBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "result",
            "description": "<p>binarybuf object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv 16 bit value",
    "url": "SWE.StreamNet.RecvLE16(self)",
    "title": "SWE.StreamNet.RecvLE16",
    "group": "SWE_StreamNet",
    "name": "RecvLE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>16 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv 32 bit value",
    "url": "SWE.StreamNet.RecvLE32(self)",
    "title": "SWE.StreamNet.RecvLE32",
    "group": "SWE_StreamNet",
    "name": "RecvLE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>32 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv 64 bit value",
    "url": "SWE.StreamNet.RecvLE64(self)",
    "title": "SWE.StreamNet.RecvLE64",
    "group": "SWE_StreamNet",
    "name": "RecvLE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>64 bit value (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet recv string",
    "url": "SWE.StreamNet.RecvString(self,endl,waitms,forcebr)",
    "title": "SWE.StreamNet.RecvString",
    "group": "SWE_StreamNet",
    "name": "RecvString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "owner",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "endl",
            "description": "<p>eol byte (default: 0)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "waitms",
            "description": "<p>wait ms (default: 300)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "forcebr",
            "description": "<p>force break without recv eol bite (default: false)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>string result</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    -- echo service\n    local net = SWE.StreamNet()\n    local res = net:Listen(2121)\n    if res then\n\tlocal client = net:WaitAccept()\n\tif client ~= nil then\n    \t    client:SendString(\"echo service\\r\\n\")\n    \t    local echo = client:RecvString(0x0A)\n    \t    client:SendString(echo)\n\tend\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send 16 bit value",
    "url": "SWE.StreamNet.SendBE16(self,value)",
    "title": "SWE.StreamNet.SendBE16",
    "group": "SWE_StreamNet",
    "name": "SendBE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>16 bit value send (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send 32 bit value",
    "url": "SWE.StreamNet.SendBE32(self,value)",
    "title": "SWE.StreamNet.SendBE32",
    "group": "SWE_StreamNet",
    "name": "SendBE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>32 bit value send (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send 64 bit value",
    "url": "SWE.StreamNet.SendBE64(self,value)",
    "title": "SWE.StreamNet.SendBE64",
    "group": "SWE_StreamNet",
    "name": "SendBE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>64 bit value send (big endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send 8 bit value",
    "url": "SWE.StreamNet.SendByte(self,value)",
    "title": "SWE.StreamNet.SendByte",
    "group": "SWE_StreamNet",
    "name": "SendByte",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>8 bit value send</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send bytes",
    "url": "SWE.StreamNet.SendBytes(self,inputbuf)",
    "title": "SWE.StreamNet.SendBytes",
    "group": "SWE_StreamNet",
    "name": "SendBytes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>binarybuf object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send 16 bit value",
    "url": "SWE.StreamNet.SendLE16(self,value)",
    "title": "SWE.StreamNet.SendLE16",
    "group": "SWE_StreamNet",
    "name": "SendLE16",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>16 bit value send (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send 32 bit value",
    "url": "SWE.StreamNet.SendLE32(self,value)",
    "title": "SWE.StreamNet.SendLE32",
    "group": "SWE_StreamNet",
    "name": "SendLE32",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>32 bit value send (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send 64 bit value",
    "url": "SWE.StreamNet.SendLE64(self,value)",
    "title": "SWE.StreamNet.SendLE64",
    "group": "SWE_StreamNet",
    "name": "SendLE64",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>64 bit value send (little endian)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet send string",
    "url": "SWE.StreamNet.SendString(self,string)",
    "title": "SWE.StreamNet.SendString",
    "group": "SWE_StreamNet",
    "name": "SendString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "string",
            "description": "<p>string data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "convert streamnet to json string",
    "url": "SWE.StreamNet.ToJson(self)",
    "title": "SWE.StreamNet.ToJson",
    "group": "SWE_StreamNet",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet wait accept",
    "url": "SWE.StreamNet.WaitAccept(self)",
    "title": "SWE.StreamNet.WaitAccept",
    "group": "SWE_StreamNet",
    "name": "WaitAccept",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>streamnet object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local net = SWE.StreamNet()\nlocal res = net:Listen(22222)\nif res then\n    local client = net:WaitAccept()\n    if client ~= nil then\n        client:SendString(\"hello world!\\r\\n\")\n    end\nelse\n    print(\"listen false\")\nend",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "streamnet wait string marker",
    "url": "SWE.StreamNet.WaitString(self,string)",
    "title": "SWE.StreamNet.WaitString",
    "group": "SWE_StreamNet",
    "name": "WaitString",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.StreamNet",
            "optional": false,
            "field": "self",
            "description": "<p>streamnet object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "string",
            "description": "<p>wait this marker</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success, or false timeout</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local net = SWE.StreamNet()\n    -- connect to www.com\n    local res = net:Connect(\"69.172.201.208\", 80)\n    if res then\n\tlocal request = \"GET / HTTP/1.1\\r\\nAccept: *\" .. \"/\" .. \"*\\r\\n\\r\\n\"\n\tnet:SendString(request)\n\tif net:WaitString(\"<html xmlns=\\\"http://www.w3.org/1999/xhtml\\\">\\r\\n\") then\n    \t    local html = net:RecvString()\n    \t    print(html)\n\tend\n    else\n\tprint(\"error: res false\")\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_streamnet.js",
    "groupTitle": "SWE_StreamNet"
  },
  {
    "type": "terminal func: get charset info",
    "url": "SWE.Terminal.CharsetInfo(self)",
    "title": "SWE.Terminal.CharsetInfo",
    "group": "SWE_Terminal",
    "name": "CharsetInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "table",
            "optional": false,
            "field": "result",
            "description": "<p>table info</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "term:CursorPosition(2,3)\nlocal t = term:CharsetInfo()\nSWE.Dump(t)\n...\n-- console output\n[`unicode'] = string(`0x002d')\n[`blended'] = integer(0)\n[`style'] = integer(2)\n[`bgcolor'] = string(`MidnightBlue')\n[`hinting'] = integer(0)\n[`fgcolor'] = string(`RosyBrown')",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal constructor",
    "url": "SWE.Terminal(frs,cols,rows,parent)",
    "title": "SWE.Terminal",
    "group": "SWE_Terminal",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "frs",
            "description": "<p>fontrender object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "parent",
            "description": "<p>parent object, (default display scene)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>terminal object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local term = SWE.Terminal(frs,20,10)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| posx      | number  | window position\n| posy      | number  | window position\n| width     | number  | window size\n| height    | number  | window size\n| cols      | number  | terminal size\n| rows      | number  | terminal size\n| visible   | boolean | window is visible (defalut false)\n| modality  | boolean | window is modality (defalut false)\n| keyhangle | boolean | window is global key handle (defalut false)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor bottom left area position",
    "url": "SWE.Terminal.CursorBottomLeft(self)",
    "title": "SWE.Terminal.CursorBottomLeft",
    "group": "SWE_Terminal",
    "name": "CursorBottomLeft",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor bottom right area position",
    "url": "SWE.Terminal.CursorBottomRight(self)",
    "title": "SWE.Terminal.CursorBottomRight",
    "group": "SWE_Terminal",
    "name": "CursorBottomRight",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor move down position",
    "url": "SWE.Terminal.CursorMoveDown(self,count)",
    "title": "SWE.Terminal.CursorMoveDown",
    "group": "SWE_Terminal",
    "name": "CursorMoveDown",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>step count (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor move first line position",
    "url": "SWE.Terminal.CursorMoveFirst(self)",
    "title": "SWE.Terminal.CursorMoveFirst",
    "group": "SWE_Terminal",
    "name": "CursorMoveFirst",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor move last line position",
    "url": "SWE.Terminal.CursorMoveLast(self)",
    "title": "SWE.Terminal.CursorMoveLast",
    "group": "SWE_Terminal",
    "name": "CursorMoveLast",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor move left position",
    "url": "SWE.Terminal.CursorMoveLeft(self,count)",
    "title": "SWE.Terminal.CursorMoveLeft",
    "group": "SWE_Terminal",
    "name": "CursorMoveLeft",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>step count (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor move right position",
    "url": "SWE.Terminal.CursorMoveRight(self,count)",
    "title": "SWE.Terminal.CursorMoveRight",
    "group": "SWE_Terminal",
    "name": "CursorMoveRight",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>step count (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor move up position",
    "url": "SWE.Terminal.CursorMoveUp(self,count)",
    "title": "SWE.Terminal.CursorMoveUp",
    "group": "SWE_Terminal",
    "name": "CursorMoveUp",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>step count (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set/get cursor position",
    "url": "SWE.Terminal.CursorPosition(self,curx,cury)(self)",
    "title": "SWE.Terminal.CursorPosition",
    "group": "SWE_Terminal",
    "name": "CursorPosition",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "curx",
            "description": "<p>set cursor position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cury",
            "description": "<p>set cursor position</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "coord",
            "description": "<p>current cursor position (posx, posy)</p>"
          },
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local area = SWE.Terminal(frs, cols, rows)\nlocal line = SWE.Line.Thin\n...\n-- set cursor position, dump area (terminal object)\nSWE.Dump(area:CursorPosition(0, 0))\n-- get cursor position, dump cursor position\nSWE.Debug(area:CursorPosition())\n\n-- draw box and set cursor position\narea:CursorPosition(0, 0):DrawChar(SWE.Char.ULCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.URCorner(line))\narea:CursorPosition(0, 1):DrawChar(SWE.Char.VLine(line)):CursorMoveRight(1):DrawChar(SWE.Char.VLine(line))\narea:CursorPosition(0, 2):DrawChar(SWE.Char.LLCorner(line)):DrawChar(SWE.Char.HLine(line)):DrawChar(SWE.Char.LRCorner(line))\narea:SetFlush()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor top left area position",
    "url": "SWE.Terminal.CursorTopLeft(self)",
    "title": "SWE.Terminal.CursorTopLeft",
    "group": "SWE_Terminal",
    "name": "CursorTopLeft",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: cursor top right area position",
    "url": "SWE.Terminal.CursorTopRight(self)",
    "title": "SWE.Terminal.CursorTopRight",
    "group": "SWE_Terminal",
    "name": "CursorTopRight",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: draw chars list",
    "url": "SWE.Terminal.DrawChar(self,char,char,char)",
    "title": "SWE.Terminal.DrawChar",
    "group": "SWE_Terminal",
    "name": "DrawChar",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "char",
            "description": "<p>unicode char (utf16)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: draw hline chars",
    "url": "SWE.Terminal.DrawHLine(self,length,char,fgcol,bgcol)",
    "title": "SWE.Terminal.DrawHLine",
    "group": "SWE_Terminal",
    "name": "DrawHLine",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>line length</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "char",
            "description": "<p>line symbol</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "fgcol",
            "description": "<p>SWE.Color (foreground color)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "bgcol",
            "description": "<p>SWE.Color (background color)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: draw rectangle",
    "url": "SWE.Terminal.DrawRect(self,width,height,line)",
    "title": "SWE.Terminal.DrawRect",
    "group": "SWE_Terminal",
    "name": "DrawRect",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>rect width</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>rect height</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "line",
            "description": "<p>SWE.Line type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: draw text list",
    "url": "SWE.Terminal.DrawText(self,text,text,text)",
    "title": "SWE.Terminal.DrawText",
    "group": "SWE_Terminal",
    "name": "DrawText",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>utf8 string</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: draw vline chars",
    "url": "SWE.Terminal.DrawVLine(self,length,char,fgcol,bgcol)",
    "title": "SWE.Terminal.DrawVLine",
    "group": "SWE_Terminal",
    "name": "DrawVLine",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>line length</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "char",
            "description": "<p>line symbol</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "fgcol",
            "description": "<p>SWE.Color (foreground color)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "bgcol",
            "description": "<p>SWE.Color (background color)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: fill bg color",
    "url": "SWE.Terminal.FillBGColor(self,color,cols,rows)",
    "title": "SWE.Terminal.FillBGColor",
    "group": "SWE_Terminal",
    "name": "FillBGColor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size area (default: 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size area (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: fill charset area",
    "url": "SWE.Terminal.FillCharset(self,symbol,cols,rows)",
    "title": "SWE.Terminal.FillCharset",
    "group": "SWE_Terminal",
    "name": "FillCharset",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "symbol",
            "description": "<p>symbol charset</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size area (default: 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size area (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: fill fg/bg colors",
    "url": "SWE.Terminal.FillColors(self,fgcolor,bgcolor,cols,rows)",
    "title": "SWE.Terminal.FillColors",
    "group": "SWE_Terminal",
    "name": "FillColors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "fgcolor",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "bgcolor",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size area (default: 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size area (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: fill fg color",
    "url": "SWE.Terminal.FillFGColor(self,color,cols,rows)",
    "title": "SWE.Terminal.FillFGColor",
    "group": "SWE_Terminal",
    "name": "FillFGColor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size area (default: 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size area (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: fill charset property area",
    "url": "SWE.Terminal.FillProperty(self,blend,style,hinting,cols,rows)",
    "title": "SWE.Terminal.FillProperty",
    "group": "SWE_Terminal",
    "name": "FillProperty",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "blend",
            "description": "<p>SDL TTF render type: SWE.Property.[RenderSolid,RenderBlended]</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "style",
            "description": "<p>SDL TTF style type: SWE.Property.[StyleNormal,StyleBold,StyleItalic,StyleUnderLine,StyleStrikeThrough]</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hinting",
            "description": "<p>SDL TTF hinting type: SWE.Property.[HintingNormal,HintingLight,HintingMono,HintingNone]</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size area (default: 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size area (default: 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local frs = SWE.FontRender(\"dejavusans.ttf\", 14)\n    local area = SWE.Terminal(frs, cols, rows)\n\n    area.RenderWindow = function()\n\tarea:CursorMoveTopLeft():FillFGColor(SWE.Color.Silver, area.cols, area.rows)\n\tarea:CursorMoveTopLeft():area:FillProperty(SWE.Property.RenderBlended, SWE.Property.StyleNormal, SWE.Property.HintingNormal, area.cols, 1)\n\tarea:CursorMoveFirst():DrawText(\"Simple Text Style: Normal\"):CursorMoveDown()\n\tarea:CursorMoveFirst():FillProperty(SWE.Property.RenderBlended, SWE.Property.StyleBold, SWE.Property.HintingNormal, area.cols, 1)\n\tarea:CursorMoveFirst():DrawText(\"Simple Text Style: Bold\"):CursorMoveDown()\n\tarea:CursorMoveFirst():FillProperty(SWE.Property.RenderBlended, SWE.Property.StyleItalic, SWE.Property.HintingNormal, area.cols, 1)\n\tarea:CursorMoveFirst():DrawText(\"Simple Text Style: Italic\"):CursorMoveDown()\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset alpha mode",
    "url": "SWE.Terminal.ResetAlpha(self)",
    "title": "SWE.Terminal.ResetAlpha",
    "group": "SWE_Terminal",
    "name": "ResetAlpha",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset default bg color to transparent",
    "url": "SWE.Terminal.ResetBGColor(self)",
    "title": "SWE.Terminal.ResetBGColor",
    "group": "SWE_Terminal",
    "name": "ResetBGColor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset blink mode",
    "url": "SWE.Terminal.ResetBlink(self)",
    "title": "SWE.Terminal.ResetBlink",
    "group": "SWE_Terminal",
    "name": "ResetBlink",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset fg/bg colors",
    "url": "SWE.Terminal.ResetColors(self)",
    "title": "SWE.Terminal.ResetColors",
    "group": "SWE_Terminal",
    "name": "ResetColors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset default fg color to transparent",
    "url": "SWE.Terminal.ResetFGColor(self)",
    "title": "SWE.Terminal.ResetFGColor",
    "group": "SWE_Terminal",
    "name": "ResetFGColor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset flip mode",
    "url": "SWE.Terminal.ResetFlip(self)",
    "title": "SWE.Terminal.ResetFlip",
    "group": "SWE_Terminal",
    "name": "ResetFlip",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset invert mode",
    "url": "SWE.Terminal.ResetInvert(self)",
    "title": "SWE.Terminal.ResetInvert",
    "group": "SWE_Terminal",
    "name": "ResetInvert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset padding",
    "url": "SWE.Terminal.ResetPadding(self)",
    "title": "SWE.Terminal.ResetPadding",
    "group": "SWE_Terminal",
    "name": "ResetPadding",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset property: render/style/hinting",
    "url": "SWE.Terminal.ResetProperty(self)",
    "title": "SWE.Terminal.ResetProperty",
    "group": "SWE_Terminal",
    "name": "ResetProperty",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: reset wrap mode",
    "url": "SWE.Terminal.ResetWrap(self)",
    "title": "SWE.Terminal.ResetWrap",
    "group": "SWE_Terminal",
    "name": "ResetWrap",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set alpha mode",
    "url": "SWE.Terminal.SetAlpha(self,alpha)",
    "title": "SWE.Terminal.SetAlpha",
    "group": "SWE_Terminal",
    "name": "SetAlpha",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "alpha",
            "description": "<p>alpha value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set bg color default",
    "url": "SWE.Terminal.SetBGColor(self,color)",
    "title": "SWE.Terminal.SetBGColor",
    "group": "SWE_Terminal",
    "name": "SetBGColor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set blink mode",
    "url": "SWE.Terminal.SetBlink(self)",
    "title": "SWE.Terminal.SetBlink",
    "group": "SWE_Terminal",
    "name": "SetBlink",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set fg/bg colors default",
    "url": "SWE.Terminal.SetColors(self,fgcolor,bgcolor)",
    "title": "SWE.Terminal.SetColors",
    "group": "SWE_Terminal",
    "name": "SetColors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "fgcolor",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "bgcolor",
            "description": "<p>SWE.Color</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set fg color default",
    "url": "SWE.Terminal.SetFGColor(self,color)",
    "title": "SWE.Terminal.SetFGColor",
    "group": "SWE_Terminal",
    "name": "SetFGColor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set flip horizontal mode",
    "url": "SWE.Terminal.SetFlipHorizontal(self)",
    "title": "SWE.Terminal.SetFlipHorizontal",
    "group": "SWE_Terminal",
    "name": "SetFlipHorizontal",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set flip vertical mode",
    "url": "SWE.Terminal.SetFlipVertical(self)",
    "title": "SWE.Terminal.SetFlipVertical",
    "group": "SWE_Terminal",
    "name": "SetFlipVertical",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set flush",
    "url": "SWE.Terminal.SetFlush(self)",
    "title": "SWE.Terminal.SetFlush",
    "group": "SWE_Terminal",
    "name": "SetFlush",
    "description": "<p>commit all changes to display</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set invert mode",
    "url": "SWE.Terminal.SetInvert(self)",
    "title": "SWE.Terminal.SetInvert",
    "group": "SWE_Terminal",
    "name": "SetInvert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set padding space",
    "url": "SWE.Terminal.SetPadding(self,left,right,top,bottom)",
    "title": "SWE.Terminal.SetPadding",
    "group": "SWE_Terminal",
    "name": "SetPadding",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "left",
            "description": "<p>left padding</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "right",
            "description": "<p>right padding</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "top",
            "description": "<p>top padding</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "bottom",
            "description": "<p>bottom padding</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set property render/style/hinting default",
    "url": "SWE.Terminal.SetProperty(self,render,style,hinting)",
    "title": "SWE.Terminal.SetProperty",
    "group": "SWE_Terminal",
    "name": "SetProperty",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "render",
            "description": "<p>SWE.Property constants</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "style",
            "description": "<p>SWE.Property constants</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hinting",
            "description": "<p>SWE.Property constants</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal set size",
    "url": "SWE.Terminal.SetTermSize(self,cols,rows)",
    "title": "SWE.Terminal.SetSize",
    "group": "SWE_Terminal",
    "name": "SetSize",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cols",
            "description": "<p>terminal size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rows",
            "description": "<p>terminal size</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal func: set wrap mode",
    "url": "SWE.Terminal.SetWrap(self)",
    "title": "SWE.Terminal.SetWrap",
    "group": "SWE_Terminal",
    "name": "SetWrap",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>SWE.Terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "result",
            "description": "<p>this object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "convert terminal to json string",
    "url": "SWE.Terminal.ToJson(self)",
    "title": "SWE.Terminal.ToJson",
    "group": "SWE_Terminal",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal"
  },
  {
    "type": "terminal event: resize terminal font",
    "url": "SWE.Terminal.FontResizeEvent()",
    "title": "SWE.Terminal.FontResizeEvent",
    "group": "SWE_Terminal_Events",
    "name": "FontResizeEvent",
    "examples": [
      {
        "title": "usage",
        "content": "term.FontResizeEvent = function()\n    print(\"font resized\")\nend",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: key event",
    "url": "SWE.Terminal.KeyPressEvent(keycode,keymod,scancode)",
    "title": "SWE.Terminal.KeyPressEvent",
    "group": "SWE_Terminal_Events",
    "name": "KeyPressEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keycode",
            "description": "<p>SWE.Key constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keymod",
            "description": "<p>key mod SDL_Keymod</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "scancode",
            "description": "<p>key scancode</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.KeyPressEvent = function(k,m,s)\n\tif k == SWE.Key.ESCAPE then\n\t    win:SetVisible(false)\n\t    print(\"hide terminal\")\n\tend\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: key event",
    "url": "SWE.Terminal.KeyReleaseEvent(keycode,keymod,scancode)",
    "title": "SWE.Terminal.KeyReleaseEvent",
    "group": "SWE_Terminal_Events",
    "name": "KeyReleaseEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keycode",
            "description": "<p>SWE.Key constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keymod",
            "description": "<p>key mod SDL_Keymod</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "scancode",
            "description": "<p>key scancode</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.KeyReleaseEvent = function(k,m,s)\n\tif k == SWE.Key.ESCAPE then\n\t    win:SetVisible(false)\n\t    print(\"hide terminal\")\n\tend\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: mouse click",
    "url": "SWE.Terminal.MouseClickEvent(press_x,press_y,press_btns,release_x,release_y,release_btns)",
    "title": "SWE.Terminal.MouseClickEvent",
    "group": "SWE_Terminal_Events",
    "name": "MouseClickEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "press_x",
            "description": "<p>mouse press position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "press_y",
            "description": "<p>mouse press position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "press_btns",
            "description": "<p>SWE.Button constant (press state)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "release_x",
            "description": "<p>mouse release position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "release_y",
            "description": "<p>mouse release position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "release_btns",
            "description": "<p>SWE.Button constant (release state)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseClickEvent = function(px,py,pbtn,rx,ry,rbtn)\n\tprint(px,py,rx,ry)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: gain focus of leave",
    "url": "SWE.Terminal.MouseFocusEvent(focus)",
    "title": "SWE.Terminal.MouseFocusEvent",
    "group": "SWE_Terminal_Events",
    "name": "MouseFocusEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "focus",
            "description": "<p>terminal if focused/leaved</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseFocusEvent = function(f)\n\tprint(\"focus:\",f)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: mouse motion",
    "url": "SWE.Terminal.MouseMotionEvent(posx,posy,buttons)",
    "title": "SWE.Terminal.MouseMotionEvent",
    "group": "SWE_Terminal_Events",
    "name": "MouseMotionEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "buttons",
            "description": "<p>SWE.Button constant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseMotionEvent = function(x,y,btn)\n\tprint(x,y,btn)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: mouse press",
    "url": "SWE.Terminal.MousePressEvent(posx,posy,buttons)",
    "title": "SWE.Terminal.MousePressEvent",
    "group": "SWE_Terminal_Events",
    "name": "MousePressEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "buttons",
            "description": "<p>SWE.Button constant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MousePressEvent = function(x,y,btn)\n\tprint(x,y,btn)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: mouse release",
    "url": "SWE.Terminal.MouseReleaseEvent(posx,posy,buttons)",
    "title": "SWE.Terminal.MouseReleaseEvent",
    "group": "SWE_Terminal_Events",
    "name": "MouseReleaseEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "buttons",
            "description": "<p>SWE.Button constant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseReleaseEvent = function(x,y,btn)\n\tprint(x,y,btn)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: scroll event",
    "url": "SWE.Terminal.ScrollDownEvent(posx,posy)",
    "title": "SWE.Terminal.ScrollDownEvent",
    "group": "SWE_Terminal_Events",
    "name": "ScrollDownEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.ScrollDownEvent = function(x,y)\n\tprint(x,y)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: scroll event",
    "url": "SWE.Terminal.ScrollUpEvent(posx,posy)",
    "title": "SWE.Terminal.ScrollUpEvent",
    "group": "SWE_Terminal_Events",
    "name": "ScrollUpEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.ScrollUpEvent = function(x,y)\n\tprint(x,y)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: system tick",
    "url": "SWE.Terminal.SystemTickEvent(tick)",
    "title": "SWE.Terminal.SystemTickEvent",
    "group": "SWE_Terminal_Events",
    "name": "SystemTickEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "tick",
            "description": "<p>constantly increasing counter (SWE.MainLoop cycle), in milliseconds, from the starting</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.SystemTickEvent = function(tick)\n\tprint(\"tick:\",tick)\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: system user event",
    "url": "SWE.Terminal.SystemUserEvent(code,lightuserdata)",
    "title": "SWE.Terminal.SystemUserEvent",
    "group": "SWE_Terminal_Events",
    "name": "SystemUserEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>user code (0x00FFFFFF max value), see SWE.pushEvent</p>"
          },
          {
            "group": "Parameter",
            "type": "table",
            "optional": false,
            "field": "object",
            "description": "<p>any Lua object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.SystemUserEvent = function(code,data)\n\tprint(\"code:\",code,type(data))\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: resize terminal window",
    "url": "SWE.Terminal.TerminalResizeEvent()",
    "title": "SWE.Terminal.TerminalResizeEvent",
    "group": "SWE_Terminal_Events",
    "name": "TerminalResizeEvent",
    "examples": [
      {
        "title": "usage",
        "content": "term.TerminalResizeEvent = function()\n    print(\"term resized\")\nend",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: invalid texture",
    "url": "SWE.Terminal.TextureInvalidEvent()",
    "title": "SWE.Terminal.TextureInvalidEvent",
    "group": "SWE_Terminal_Events",
    "name": "TextureInvalidEvent",
    "description": "<p>after resizing the display or rotate (for mobile os), all textures (if used) must be reinitialized, because the internal SDL render is changed</p>",
    "examples": [
      {
        "title": "usage",
        "content": "    win.tx1 = SWE.Texture.Text(frs, text, SWE.Color.Red)\n    ...\n    win.TextureInvalidEvent = function()\n\twin.tx1 = SWE.Texture.Text(frs, text, SWE.Color.Red)\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: destroy object",
    "url": "SWE.Terminal.WindowCloseEvent()",
    "title": "SWE.Terminal.WindowCloseEvent",
    "group": "SWE_Terminal_Events",
    "name": "WindowCloseEvent",
    "examples": [
      {
        "title": "usage",
        "content": "    win.WindowCloseEvent = function()\n\tprint(\"win closed\")\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "terminal event: single event constructor",
    "url": "SWE.Terminal.WindowCreateEvent()",
    "title": "SWE.Terminal.WindowCreateEvent",
    "group": "SWE_Terminal_Events",
    "name": "WindowCreateEvent",
    "examples": [
      {
        "title": "usage",
        "content": "    win.WindowCreateEvent = function()\n\tprint(\"win created\")\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Events"
  },
  {
    "type": "render terminal code",
    "url": "SWE.Terminal.RenderWindow()",
    "title": "SWE.Terminal.RenderWindow",
    "group": "SWE_Terminal_Virtual",
    "name": "RenderWindow",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>always true</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.RenderWindow = function()\n\t-- terminal render code\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Virtual"
  },
  {
    "type": "terminal default: fg/bg colors",
    "url": "SWE.Terminal.TerminalDefaultColors()",
    "title": "SWE.Terminal.TerminalDefaultColors",
    "group": "SWE_Terminal_Virtual",
    "name": "TerminalDefaultColors",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "result",
            "description": "<p>default colors, (fbcolor, bgcolor)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Virtual"
  },
  {
    "type": "terminal default: property render/style/hinting",
    "url": "SWE.Terminal.TerminalDefaultProperty()",
    "title": "SWE.Terminal.TerminalDefaultProperty",
    "group": "SWE_Terminal_Virtual",
    "name": "TerminalDefaultProperty",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "list",
            "optional": false,
            "field": "result",
            "description": "<p>default property, (render, style, hinting), see SWE.Property</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Virtual"
  },
  {
    "type": "point in terminal area",
    "url": "SWE.Terminal.PointInArea(self,ptx,pty)(self,point)",
    "title": "SWE.Terminal.PointInArea",
    "group": "SWE_Terminal_Window",
    "name": "PointInArea",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ptx",
            "description": "<p>point coord</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pty",
            "description": "<p>point coord</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Window"
  },
  {
    "type": "terminal render texture",
    "url": "SWE.Terminal.RenderTexture(self,texture,srcx,srcy,srcw,srch,dstx,dsty)(self,texture,src_rt,dst_pt)(self,texture,dstx,dsty)(self,texture,dst_pt)",
    "title": "SWE.Terminal.RenderTexture",
    "group": "SWE_Terminal_Window",
    "name": "RenderTexture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "texture",
            "description": "<p>texture source object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcx",
            "description": "<p>src position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcy",
            "description": "<p>src position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcw",
            "description": "<p>src size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srch",
            "description": "<p>src size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dstx",
            "description": "<p>dst position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dsty",
            "description": "<p>dst position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "src_rt",
            "description": "<p>src rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "dst_pt",
            "description": "<p>dst point object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Window"
  },
  {
    "type": "terminal set global key handle mode",
    "url": "SWE.Terminal.SetKeyHandle(self,handle)",
    "title": "SWE.Terminal.SetKeyHandle",
    "group": "SWE_Terminal_Window",
    "name": "SetKeyHandle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "handle",
            "description": "<p>flag key handle</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Window"
  },
  {
    "type": "terminal set modality mode",
    "url": "SWE.Terminal.SetModality(self,modality)",
    "title": "SWE.Terminal.SetModality",
    "group": "SWE_Terminal_Window",
    "name": "SetModality",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "modality",
            "description": "<p>flag modality</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Window"
  },
  {
    "type": "terminal set position",
    "url": "SWE.Terminal.SetPosition(self,posx,posy)",
    "title": "SWE.Terminal.SetPosition",
    "group": "SWE_Terminal_Window",
    "name": "SetPosition",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>window position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>window position</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Window"
  },
  {
    "type": "terminal set result code",
    "url": "SWE.Terminal.SetResultCode(self,code)",
    "title": "SWE.Terminal.SetResultCode",
    "group": "SWE_Terminal_Window",
    "name": "SetResultCode",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>set result code, see SWE.MainLoop</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Window"
  },
  {
    "type": "terminal set visible mode",
    "url": "SWE.Terminal.SetVisible(self,visible)",
    "title": "SWE.Terminal.SetVisible",
    "group": "SWE_Terminal_Window",
    "name": "SetVisible",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Terminal",
            "optional": false,
            "field": "self",
            "description": "<p>terminal object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "visible",
            "description": "<p>flag visible</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_terminal.js",
    "groupTitle": "SWE_Terminal_Window"
  },
  {
    "type": "texture constructor",
    "url": "SWE.Texture(),(width,height)",
    "title": "SWE.Texture",
    "group": "SWE_Texture",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>texture size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>texture size</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Texture",
            "optional": false,
            "field": "result",
            "description": "<p>texture object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local tx = SWE.Texture(200, 100)\ntx:RenderClear(SWE.Color.Red);\nprint(tx.width,tx.height)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| width    | number  | texture size\n| height   | number  | texture size",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture crop to texture",
    "url": "SWE.Texture.CropImage(self,cx,cy,cw,ch)SWE.Texture.CropImage(self,rect)",
    "title": "SWE.Texture.CropImage",
    "group": "SWE_Texture",
    "name": "CropImage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cx",
            "description": "<p>crop area</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cy",
            "description": "<p>crop area</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cw",
            "description": "<p>crop area</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ch",
            "description": "<p>crop area</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect",
            "description": "<p>crop area</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Texture",
            "optional": false,
            "field": "result",
            "description": "<p>texture object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture flip",
    "url": "SWE.Texture.FlipImage(self,flip)",
    "title": "SWE.Texture.FlipImage",
    "group": "SWE_Texture",
    "name": "FlipImage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "flip",
            "description": "<p>possible value: SWE.Texture.FlipVertical or SWE.Texture.FlipHorizontal or combined</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Texture",
            "optional": false,
            "field": "result",
            "description": "<p>texture object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture clear",
    "url": "SWE.Texture.RenderClear(self,color)",
    "title": "SWE.Texture.RenderClear",
    "group": "SWE_Texture",
    "name": "RenderClear",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture render cyrcle",
    "url": "SWE.Texture.RenderCyrcle(self,color,centerx,centery,radius,filled)(self,color,point_center,radius,filled)",
    "title": "SWE.Texture.RenderCyrcle",
    "group": "SWE_Texture",
    "name": "RenderCyrcle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "centerx",
            "description": "<p>center position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "centery",
            "description": "<p>center position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point_center",
            "description": "<p>point object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "radius",
            "description": "<p>radius value</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "filled",
            "description": "<p>fill mode (default false)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture render line",
    "url": "SWE.Texture.RenderLine(self,color,px1,py1,px2,py2)(self,color,point1,point2)",
    "title": "SWE.Texture.RenderLine",
    "group": "SWE_Texture",
    "name": "RenderLine",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "px1",
            "description": "<p>point1 position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "py1",
            "description": "<p>point1 position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "px2",
            "description": "<p>point2 position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "py2",
            "description": "<p>point2 position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point1",
            "description": "<p>point object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point2",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture render point",
    "url": "SWE.Texture.RenderPoint(self,color,ptx,pty)(self,color,point)",
    "title": "SWE.Texture.RenderPoint",
    "group": "SWE_Texture",
    "name": "RenderPoint",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ptx",
            "description": "<p>point position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pty",
            "description": "<p>point position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture render rect",
    "url": "SWE.Texture.RenderRect(self,color,rtx,rty,rtw,rth,filled)(self,color,rect,filled)",
    "title": "SWE.Texture.RenderRect",
    "group": "SWE_Texture",
    "name": "RenderRect",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rtx",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rty",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rtw",
            "description": "<p>rect size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rth",
            "description": "<p>rect size</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect",
            "description": "<p>rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "filled",
            "description": "<p>fill mode (default false)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture render text",
    "url": "SWE.Texture.RenderText(self,frs,color,posx,posy,halign,valign,horizontal)(self,frs,color,point,halign,valign,horizontal,render,style,hinting)",
    "title": "SWE.Texture.RenderText",
    "group": "SWE_Texture",
    "name": "RenderText",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "frs",
            "description": "<p>fontrender object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>text position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>text position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point",
            "description": "<p>point object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "halign",
            "description": "<p>align text (default SWE.Align.Left)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "valign",
            "description": "<p>align text (default SWE.Align.Top)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "horizontal",
            "description": "<p>text orientation, default true</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "render",
            "description": "<p>text render (default RenderDefault, used from FontRender), see SWE.Font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "style",
            "description": "<p>text style (default StyleDefault, used from FontRender), see SWE.Font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hinting",
            "description": "<p>text hinting (default HintingDefault, used from FontRender) see SWE.Font</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "object",
            "optional": false,
            "field": "result",
            "description": "<p>SWE.Rect text position</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local frs = SWE.FontRender(\"dejavusans.ttf\", 24)\nlocal image1 = SWE.Texture.Image(\"logo.png\")\nlocal pos = image1:RenderText(frs,SWE.Color.Red,\"APPROVED\",image1.width/2,image1.height/2,SWE.Align.Center,SWE.Align.Center)\nprint(\"texture position:\",pos)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture scaled render to texture",
    "url": "SWE.Texture.RenderTexture(self,texture),(self,texture,srcx,srcy,srcw,srch,dstx,dsty,dstw,dsth)(self,texture,rect_src,rect_dst)",
    "title": "SWE.Texture.RenderTexture",
    "group": "SWE_Texture",
    "name": "RenderTexture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>dst texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "texture",
            "description": "<p>src texture object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcx",
            "description": "<p>src position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcy",
            "description": "<p>src position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcw",
            "description": "<p>src size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srch",
            "description": "<p>src size</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect_src",
            "description": "<p>src rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dstx",
            "description": "<p>dst position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dsty",
            "description": "<p>dst position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dstw",
            "description": "<p>dst size (default srcw)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dsth",
            "description": "<p>dst size (default srch)</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect_dst",
            "description": "<p>dst rect object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local image1 = SWE.Texture.Image(\"logo.png\")\nlocal image2 = SWE.Texture.Texture(200,100)\n-- copy texture area(50, 50, 50, 50) from image1 to texture image2 dst pos(100, 50)\nimage2:RenderTexture(image1,50,50,50,50,100,50)\nprint(image2.width,image2.height)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture save to file",
    "url": "SWE.Texture.SaveToFile(filename)",
    "title": "SWE.Texture.SaveToFile",
    "group": "SWE_Texture",
    "name": "SaveToFile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>save to filename</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>if success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "convert texture to json string",
    "url": "SWE.Texture.ToJson(self)",
    "title": "SWE.Texture.ToJson",
    "group": "SWE_Texture",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "self",
            "description": "<p>texture object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture constructor",
    "url": "SWE.Texture.Image(filename,cropx,cropy,cropw,croph,colorkey)",
    "title": "SWE.Texture.Image",
    "group": "SWE_Texture_Image",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>filename image format</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cropx",
            "description": "<p>crop size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cropy",
            "description": "<p>crop size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cropw",
            "description": "<p>crop size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "croph",
            "description": "<p>crop size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colorkey",
            "description": "<p>sdl color key value (if defined)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Texture",
            "optional": false,
            "field": "result",
            "description": "<p>texture object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local image1 = SWE.Texture.Image(\"image.png\")\nlocal image2 = SWE.Texture.Image(\"image.png\",10,10,40,20)\nprint(image2.width,image2.height)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| width    | number  | texture size\n| height   | number  | texture size",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture_Image"
  },
  {
    "type": "texture constructor",
    "url": "SWE.TextureRect(colrt,colbg,width,height,thickness)",
    "title": "SWE.Texture.Rect",
    "group": "SWE_Texture_Rect",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colrt",
            "description": "<p>rect color, SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colbg",
            "description": "<p>fill color, SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>texture size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>texture size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "thickness",
            "description": "<p>line thickness (default 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Texture",
            "optional": false,
            "field": "result",
            "description": "<p>texture object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local tx = SWE.Texture.Rect(SWE.Color.Red,SWE.Color.Blue,200,100)\nprint(tx.width,tx.height)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| width    | number  | texture size\n| height   | number  | texture size",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture_Rect"
  },
  {
    "type": "texture constructor",
    "url": "SWE.Texture.Text(frs,text,coltx,colbg)",
    "title": "SWE.Texture.Text",
    "group": "SWE_Texture_Text",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "frs",
            "description": "<p>fontrender object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>text string</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "coltx",
            "description": "<p>text color, SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colbg",
            "description": "<p>fill backgroung color, SWE.Color (default Transparent)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Texture",
            "optional": false,
            "field": "result",
            "description": "<p>texture object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local frs = SWE.FontRender(\"dejavusans.ttf\", 14)\nlocal tx = SWE.Texture.Text(frs,\"Hello World!\"SWE.Color.Red,SWE.Color.Blue)\nprint(tx.width,tx.height)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| width    | number  | texture size\n| height   | number  | texture size",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture_Text"
  },
  {
    "type": "translation: bind domain",
    "url": "SWE.Translation.BindDomain(domain,filename)(domain,binarybuf)",
    "title": "SWE.Translation.BindDomain",
    "group": "SWE_Translation",
    "name": "BindDomain",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "domain",
            "description": "<p>translation domain</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>filename, mo format</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.BinaryBuf",
            "optional": false,
            "field": "binarybuf",
            "description": "<p>binarybuf, mo format</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if bind domain</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local res = SWE.Translation.BindDomain(\"test1\", \"ru.mo\")\n    if res then\n\tSWE.Translation.SetDomain(\"test1\")\n\tSWE.Translation.SetStripContext('|')\n\tprint(SWE.Translation.GetText(\"Color|Red\"))\n\tprint(SWE.Translation.GetText(\"Color|Green\"))\n\tprint(SWE.Translation.GetText(\"Color|Blue\"))\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_translation.js",
    "groupTitle": "SWE_Translation"
  },
  {
    "type": "translation: same as dgettext",
    "url": "SWE.Translation.DGetText(domain,text)",
    "title": "SWE.Translation.DGetText",
    "group": "SWE_Translation",
    "name": "DGetText",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "domain",
            "description": "<p>translation domain</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>translation string</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>result string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_translation.js",
    "groupTitle": "SWE_Translation"
  },
  {
    "type": "translation: same as dngettext",
    "url": "SWE.Translation.DNGetText(domain,text,plural,count)",
    "title": "SWE.Translation.DNGetText",
    "group": "SWE_Translation",
    "name": "DNGetText",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "domain",
            "description": "<p>translation domain</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>translation string</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "plural",
            "description": "<p>translation plural form</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>translation plural count</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>result string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_translation.js",
    "groupTitle": "SWE_Translation"
  },
  {
    "type": "translation: same as gettext",
    "url": "SWE.Translation.GetText(text)",
    "title": "SWE.Translation.GetText",
    "group": "SWE_Translation",
    "name": "GetText",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>translation string</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>result string</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local res = SWE.Translation.BindDomain(\"test1\", \"ru.mo\")\n    if res then\n\tSWE.Translation.SetDomain(\"test1\")\n\tSWE.Translation.SetStripContext('|')\n\tprint(SWE.Translation.GetText(\"Color|Red\"))\n\tprint(SWE.Translation.GetText(\"Color|Green\"))\n\tprint(SWE.Translation.GetText(\"Color|Blue\"))\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_translation.js",
    "groupTitle": "SWE_Translation"
  },
  {
    "type": "translation: same as ngettext",
    "url": "SWE.Translation.NGetText(text,plural,count)",
    "title": "SWE.Translation.NGetText",
    "group": "SWE_Translation",
    "name": "NGetText",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>translation string</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "plural",
            "description": "<p>translation plural form</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>translation plural count</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>result string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_translation.js",
    "groupTitle": "SWE_Translation"
  },
  {
    "type": "translation: set domain",
    "url": "SWE.Translation.SetDomain(domain)",
    "title": "SWE.Translation.SetDomain",
    "group": "SWE_Translation",
    "name": "SetDomain",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "domain",
            "description": "<p>translation domain</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if set domain</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local res = SWE.Translation.BindDomain(\"test1\", \"ru.mo\")\n    if res then\n\tSWE.Translation.SetDomain(\"test1\")\n\tSWE.Translation.SetStripContext('|')\n\tprint(SWE.Translation.GetText(\"Color|Red\"))\n\tprint(SWE.Translation.GetText(\"Color|Green\"))\n\tprint(SWE.Translation.GetText(\"Color|Blue\"))\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_translation.js",
    "groupTitle": "SWE_Translation"
  },
  {
    "type": "translation: set strip context",
    "url": "SWE.Translation.SetStripContext(context)",
    "title": "SWE.Translation.SetStripContext",
    "group": "SWE_Translation",
    "name": "SetStripContext",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "context",
            "description": "<p>translation strip context symbol</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local res = SWE.Translation.BindDomain(\"test1\", \"ru.mo\")\n    if res then\n\tSWE.Translation.SetDomain(\"test1\")\n\tSWE.Translation.SetStripContext('|')\n\tprint(SWE.Translation.GetText(\"Color|Red\"))\n\tprint(SWE.Translation.GetText(\"Color|Green\"))\n\tprint(SWE.Translation.GetText(\"Color|Blue\"))\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_translation.js",
    "groupTitle": "SWE_Translation"
  },
  {
    "type": "unicodestring clear",
    "url": "SWE.UnicodeString.Clear(self)",
    "title": "SWE.UnicodeString.Clear",
    "group": "SWE_UnicodeString",
    "name": "Clear",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>unicodestring raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "unicodestring constructor",
    "url": "SWE.UnicodeString(),(inputstr),(length,value)",
    "title": "SWE.UnicodeString",
    "group": "SWE_UnicodeString",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inputstr",
            "description": "<p>string data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>default value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "result",
            "description": "<p>unicodestring data</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "ext table fields (read only)",
        "content": "| size    | number  | unicodestring length\n\n-- also method __concat, __index and __len worked",
        "type": "json"
      },
      {
        "title": "usage",
        "content": "local ucs1 = SWE.UnicodeString(\"Привет123\")\nlocal ucs2 = SWE.UnicodeString(\"Привет321\")\nlocal ucs3 = ucs1 .. ucs2\nprint(ucs3:ToJson())",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "erase element",
    "url": "SWE.UnicodeString.Erase(self,pos,count)",
    "title": "SWE.UnicodeString.Erase",
    "group": "SWE_UnicodeString",
    "name": "Erase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>unicodestring raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pos",
            "description": "<p>position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count erase</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "result",
            "description": "<p>bynarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "get char value",
    "url": "SWE.UnicodeString.GetChar(self,offset)",
    "title": "SWE.UnicodeString.GetChar",
    "group": "SWE_UnicodeString",
    "name": "GetChar",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>unicodestring raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "number",
            "optional": false,
            "field": "result",
            "description": "<p>byte value</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "insert byte values",
    "url": "SWE.UnicodeString.Insert(self,offset,inputbuf,offset,length)(offset,count,value)",
    "title": "SWE.UnicodeString.Insert",
    "group": "SWE_UnicodeString",
    "name": "Insert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>unicodestring raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>unicodestring input data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "length",
            "description": "<p>length data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>value counts</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>byte value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "push back byte value",
    "url": "SWE.UnicodeString.PushBack(self,offset,value...value)",
    "title": "SWE.UnicodeString.PushBack",
    "group": "SWE_UnicodeString",
    "name": "PushBack",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>unicodestring raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>byte value (list)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "resize buf",
    "url": "SWE.UnicodeString.Resize(self,size,value)",
    "title": "SWE.UnicodeString.Resize",
    "group": "SWE_UnicodeString",
    "name": "Resize",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>unicodestring raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "size",
            "description": "<p>new size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>default value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "result",
            "description": "<p>bynarybuf raw data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "set char value",
    "url": "SWE.UnicodeString.SetChar(self,offset,value...value)",
    "title": "SWE.UnicodeString.SetChar",
    "group": "SWE_UnicodeString",
    "name": "SetChar",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>unicodestring raw data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset data</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>byte value (list)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "convert UnicodeString to json string",
    "url": "SWE.UnicodeString.ToJson(inputbuf)",
    "title": "SWE.UnicodeString.ToJson",
    "group": "SWE_UnicodeString",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "self",
            "description": "<p>UnicodeString raw data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json array string</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local ucs = SWE.UnicodeString(\"Привет Бармалей!\")\nprint(ucs:ToJson())\n....\n'[0x041F,0x0440,0x0438,0x0432,0x0435,0x0442,0x0020,0x0411,0x0430,0x0440,0x043C,0x0430,0x043B,0x0435,0x0439,0x0021]'",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "convert unicodestring to utf8 string",
    "url": "SWE.UnicodeString.ToUtf8String(inputbuf)",
    "title": "SWE.UnicodeString.ToUtf8String",
    "group": "SWE_UnicodeString",
    "name": "ToUtf8String",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.UnicodeString",
            "optional": false,
            "field": "inputbuf",
            "description": "<p>unicodestring raw data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>utf8 cstring data</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_unicodestring.js",
    "groupTitle": "SWE_UnicodeString"
  },
  {
    "type": "videocam constructor",
    "url": "SWE.VideoCam(params)",
    "title": "SWE.VideoCam",
    "group": "SWE_VideoCam",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "table",
            "optional": false,
            "field": "params",
            "description": "<p>ffmpeg init params</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.VideoCam",
            "optional": false,
            "field": "result",
            "description": "<p>videocam object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local win = SWE.DisplayInit(\"VideoCam Example\", 640, 480, fullscreen)\n\n    -- init videocam object\n    local params = { format = \"v4l2\", device = \"/dev/video0\", debug = true, video_standard = \"pal\", video_size = \"640x480\" }\n    local cam = SWE.VideoCam(params)\n\n    function win.RenderWindow()\n\tlocal frame = cam:GetFrame()\n\tif frame ~= nil then\n    \t    win:RenderTexture(frame, 0, 0, frame.width, frame.height, 0, 0, win.width, win.height)\n\telse\n\t    -- no signal\n    \t    win:RenderClear(SWE.Color.Blue)\n\tend\n\treturn true\n    end\n\n    function win.SystemTickEvent()\n\t-- repeat redraw scene\n\tSWE.DisplayDirty()\n\treturn true\n    end\n\n    function win.KeyPressEvent(key,mod,scancode)\n\tif SWE.Key.ESCAPE == key then\n    \t    -- close scene, see SWE.MainLoop\n    \t    win:SetVisible(false)\n    \t    return true\n\tend\n\treturn false\n    end\n\n    SWE.MainLoop(win)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_videocam.js",
    "groupTitle": "SWE_VideoCam"
  },
  {
    "type": "capture frame",
    "url": "SWE.VideoCam.GetFrame(self)",
    "title": "SWE.VideoCam.GetFrame",
    "group": "SWE_VideoCam",
    "name": "GetFrame",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.VideoCam",
            "optional": false,
            "field": "self",
            "description": "<p>videocam object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Texture",
            "optional": false,
            "field": "result",
            "description": "<p>capture texture frame</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_videocam.js",
    "groupTitle": "SWE_VideoCam"
  },
  {
    "type": "convert videocam to json string",
    "url": "SWE.VideoCam.ToJson(self)",
    "title": "SWE.VideoCam.ToJson",
    "group": "SWE_VideoCam",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.VideoCam",
            "optional": false,
            "field": "self",
            "description": "<p>videocam object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_videocam.js",
    "groupTitle": "SWE_VideoCam"
  },
  {
    "type": "window constructor",
    "url": "SWE.Window(posx,posy,width,height,parent)",
    "title": "SWE.Window",
    "group": "SWE_Window",
    "name": "Constructor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>window position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>window position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>window size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>window size</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "parent",
            "description": "<p>parent object, (default display scene)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Window",
            "optional": false,
            "field": "result",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "-- create window area(30,30,200,100) on display scene\nlocal win2 = SWE.Window(30,30,200,100)",
        "type": "json"
      },
      {
        "title": "ext table fields (read only)",
        "content": "| posx      | number  | window position\n| posy      | number  | window position\n| width     | number  | window size\n| height    | number  | window size\n| visible   | boolean | window is visible (defalut false)\n| modality  | boolean | window is modality (defalut false)\n| keyhangle | boolean | window is global key handle (defalut false)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "get children windows",
    "url": "SWE.Window.GetChildrens(self)",
    "title": "SWE.Window.GetChildrens",
    "group": "SWE_Window",
    "name": "GetChildrens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "table",
            "optional": false,
            "field": "result",
            "description": "<p>children windows list</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    local childs = win:GeChildrens()\n    for i = 1,#childs do\n\tSWE.Dump(childs[i])\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window is visible",
    "url": "SWE.Window.IsVisible()",
    "title": "SWE.Window.IsVisible",
    "group": "SWE_Window",
    "name": "IsVisible",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if visible</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window mark will be destroyed",
    "url": "SWE.Window.MarkDestroyed(self)",
    "title": "SWE.Window.MarkDestroyed",
    "group": "SWE_Window",
    "name": "MarkDestroyed",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "-- create window area(30,30,200,100) on display scene\nlocal win2 = SWE.Window(30,30,200,100)\n\n....\nwin2:MarkDestroyed()\n\n-- equivalent to:\nwin2 = nil\ncollectgarbage()",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "point in window area",
    "url": "SWE.Window.PointInArea(self,ptx,pty)(self,point)",
    "title": "SWE.Window.PointInArea",
    "group": "SWE_Window",
    "name": "PointInArea",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ptx",
            "description": "<p>point coord</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pty",
            "description": "<p>point coord</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>true if success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window clear",
    "url": "SWE.Window.RenderClear(self,color)",
    "title": "SWE.Window.RenderClear",
    "group": "SWE_Window",
    "name": "RenderClear",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window render cyrcle",
    "url": "SWE.Window.RenderCyrcle(self,color,centerx,centery,radius,filled)(self,color,center,radius,filled)",
    "title": "SWE.Window.RenderCyrcle",
    "group": "SWE_Window",
    "name": "RenderCyrcle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "centerx",
            "description": "<p>center position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "centery",
            "description": "<p>center position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "center",
            "description": "<p>point object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "radius",
            "description": "<p>radius value</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "filled",
            "description": "<p>fill mode (default false)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window render line",
    "url": "SWE.Window.RenderLine(self,color,px1,py1,px2,py2)(self,color,point1,point2)",
    "title": "SWE.Window.RenderLine",
    "group": "SWE_Window",
    "name": "RenderLine",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "px1",
            "description": "<p>point1 position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "py1",
            "description": "<p>point1 position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "px2",
            "description": "<p>point2 position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "py2",
            "description": "<p>point2 position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point1",
            "description": "<p>point object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point2",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window render point",
    "url": "SWE.Window.RenderPoint(self,color,posx,posy)(self,color,point)",
    "title": "SWE.Window.RenderPoint",
    "group": "SWE_Window",
    "name": "RenderPoint",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>point position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>point position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point",
            "description": "<p>point object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window render rect",
    "url": "SWE.Window.RenderRect(self,color,rtx,rty,rtw,rth,filled)(self,color,rect,filled)",
    "title": "SWE.Window.RenderRect",
    "group": "SWE_Window",
    "name": "RenderRect",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rtx",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rty",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rtw",
            "description": "<p>rect size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rth",
            "description": "<p>rect size</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "rect",
            "description": "<p>rect object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "filled",
            "description": "<p>fill mode (default false)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window render text",
    "url": "SWE.Window.RenderText(self,frs,color,posx,posy,halign,valign,horizontal)(self,frs,color,point,halign,valign,horizontal,render,style,hinting)",
    "title": "SWE.Window.RenderText",
    "group": "SWE_Window",
    "name": "RenderText",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "frs",
            "description": "<p>fontrender object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "color",
            "description": "<p>SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>text position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>text position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "point",
            "description": "<p>point object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "halign",
            "description": "<p>align text (default SWE.Align.Left)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "valign",
            "description": "<p>align text (default SWE.Align.Top)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "horizontal",
            "description": "<p>text orientation vertical or horizontal (default)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "render",
            "description": "<p>text render (default RenderDefault, used from FontRender), see SWE.Font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "style",
            "description": "<p>text style (default RenderDefault, used from FontRender), see SWE.Font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hinting",
            "description": "<p>text hinting (default RenderDefault, used from FontRender) see SWE.Font</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "SWE.Rect",
            "optional": false,
            "field": "result",
            "description": "<p>SWE.Rect text position</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window render texture",
    "url": "SWE.Window.RenderTexture(self,texture,srcx,srcy,srcw,srch,dstx,dsty,flip)(self,texture,srcrt,dstpt,flip)(self,texture,dstx,dsty,flip)(self,texture,dstpt,flip)",
    "title": "SWE.Window.RenderTexture",
    "group": "SWE_Window",
    "name": "RenderTexture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Texture",
            "optional": false,
            "field": "texture",
            "description": "<p>texture source object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcx",
            "description": "<p>src position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcy",
            "description": "<p>src position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srcw",
            "description": "<p>src size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "srch",
            "description": "<p>src size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dstx",
            "description": "<p>dst position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dsty",
            "description": "<p>dst position</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Rect",
            "optional": false,
            "field": "srcrt",
            "description": "<p>SWE.Rect object or table</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.Point",
            "optional": false,
            "field": "dstpt",
            "description": "<p>SWE.Point object or table</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "flip",
            "description": "<p>possible value: SWE.Texture.FlipVertical or SWE.Texture.FlipHorizontal or combined</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window set global key handle mode",
    "url": "SWE.Window.SetKeyHandle(self,handle)",
    "title": "SWE.Window.SetKeyHandle",
    "group": "SWE_Window",
    "name": "SetKeyHandle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "handle",
            "description": "<p>flag key handle</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window set modality mode",
    "url": "SWE.Window.SetModality(self,modality)",
    "title": "SWE.Window.SetModality",
    "group": "SWE_Window",
    "name": "SetModality",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "modality",
            "description": "<p>flag modality</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window set position",
    "url": "SWE.Window.SetPosition(self,posx,posy)",
    "title": "SWE.Window.SetPosition",
    "group": "SWE_Window",
    "name": "SetPosition",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>window position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>window position</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window set result code",
    "url": "SWE.Window.SetResultCode(self,code)",
    "title": "SWE.Window.SetResultCode",
    "group": "SWE_Window",
    "name": "SetResultCode",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>set result code, see SWE.MainLoop</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window set size",
    "url": "SWE.Window.SetSize(self,width,height)",
    "title": "SWE.Window.SetSize",
    "group": "SWE_Window",
    "name": "SetSize",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>window size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>window size</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "set tooltip info",
    "url": "SWE.Window.SetToolTip(self,text,frs,colorFn,colorBg,colorRt)",
    "title": "SWE.Window.SetToolTip",
    "group": "SWE_Window",
    "name": "SetToolTip",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>tooltip text</p>"
          },
          {
            "group": "Parameter",
            "type": "SWE.FontRender",
            "optional": false,
            "field": "frs",
            "description": "<p>fontrender object (default: system)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colorFn",
            "description": "<p>SWE.Color constant, (default: black)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colorBg",
            "description": "<p>SWE.Color constant, (default: wheat)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colorRt",
            "description": "<p>SWE.Color constant, (default: midnightblue)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "win:SetToolTip(\"Hello World!\")",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window set visible mode",
    "url": "SWE.Window.SetVisible(self,visible)",
    "title": "SWE.Window.SetVisible",
    "group": "SWE_Window",
    "name": "SetVisible",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "visible",
            "description": "<p>flag visible</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "convert window to json string",
    "url": "SWE.Window.ToJson(self)",
    "title": "SWE.Window.ToJson",
    "group": "SWE_Window",
    "name": "ToJson",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "self",
            "description": "<p>window object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "string",
            "optional": false,
            "field": "result",
            "description": "<p>json string</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window event: win size changed",
    "url": "SWE.Window.DisplayResizeEvent(width,height)",
    "title": "SWE.Window.DisplayResizeEvent",
    "group": "SWE_Window_Events",
    "name": "DisplayResizeEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "width",
            "description": "<p>window size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "height",
            "description": "<p>window size</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.DisplayResizeEvent = function(w,h)\n\tprint(\"new win size\",w,h)\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: key event",
    "url": "SWE.Window.KeyPressEvent(keycode,keymod,scancode)",
    "title": "SWE.Window.KeyPressEvent",
    "group": "SWE_Window_Events",
    "name": "KeyPressEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keycode",
            "description": "<p>SWE.Key constant</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keymod",
            "description": "<p>key mod SDL_Keymod</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "scancode",
            "description": "<p>key scancode</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.KeyPressEvent = function(k,m,s)\n\tif k == SWE.Key.ESCAPE then\n\t    win:SetVisible(false)\n\t    print(\"hide window\")\n\tend\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: key event",
    "url": "SWE.Window.KeyReleaseEvent(keycode)",
    "title": "SWE.Window.KeyReleaseEvent",
    "group": "SWE_Window_Events",
    "name": "KeyReleaseEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keycode",
            "description": "<p>SWE.Key constant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.KeyReleaseEvent = function(k)\n\tif k == SWE.Key.ESCAPE then\n\t    win:SetVisible(false)\n\t    print(\"hide window\")\n\tend\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: mouse click",
    "url": "SWE.Window.MouseClickEvent(press_x,press_y,press_btns,release_x,release_y,release_btns)",
    "title": "SWE.Window.MouseClickEvent",
    "group": "SWE_Window_Events",
    "name": "MouseClickEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "press_x",
            "description": "<p>mouse press position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "press_y",
            "description": "<p>mouse press position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "press_btns",
            "description": "<p>SWE.Button constant (press state)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "release_x",
            "description": "<p>mouse release position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "release_y",
            "description": "<p>mouse release position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "release_btns",
            "description": "<p>SWE.Button constant (release state)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseClickEvent = function(px,py,pbtn,rx,ry,rbtn)\n\tprint(px,py,rx,ry)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: gain focus of leave",
    "url": "SWE.Window.MouseFocusEvent(focus)",
    "title": "SWE.Window.MouseFocusEvent",
    "group": "SWE_Window_Events",
    "name": "MouseFocusEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "focus",
            "description": "<p>window if focused/leaved</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseFocusEvent = function(f)\n\tprint(\"focus:\",f)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: mouse motion",
    "url": "SWE.Window.MouseMotionEvent(posx,posy,buttons)",
    "title": "SWE.Window.MouseMotionEvent",
    "group": "SWE_Window_Events",
    "name": "MouseMotionEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "buttons",
            "description": "<p>SWE.Button constant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseMotionEvent = function(x,y,btn)\n\tprint(x,y,btn)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: mouse press",
    "url": "SWE.Window.MousePressEvent(posx,posy,buttons)",
    "title": "SWE.Window.MousePressEvent",
    "group": "SWE_Window_Events",
    "name": "MousePressEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "buttons",
            "description": "<p>SWE.Button constant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MousePressEvent = function(x,y,btn)\n\tprint(x,y,btn)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: mouse release",
    "url": "SWE.Window.MouseReleaseEvent(posx,posy,buttons)",
    "title": "SWE.Window.MouseReleaseEvent",
    "group": "SWE_Window_Events",
    "name": "MouseReleaseEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "buttons",
            "description": "<p>SWE.Button constant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.MouseReleaseEvent = function(x,y,btn)\n\tprint(x,y,btn)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: scroll event",
    "url": "SWE.Window.ScrollDownEvent(posx,posy)",
    "title": "SWE.Window.ScrollDownEvent",
    "group": "SWE_Window_Events",
    "name": "ScrollDownEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.ScrollDownEvent = function(x,y)\n\tprint(x,y)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: scroll event",
    "url": "SWE.Window.ScrollUpEvent(posx,posy)",
    "title": "SWE.Window.ScrollUpEvent",
    "group": "SWE_Window_Events",
    "name": "ScrollUpEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posx",
            "description": "<p>mouse position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>mouse position</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.ScrollUpEvent = function(x,y)\n\tprint(x,y)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: render compete event",
    "url": "SWE.Window.SystemRenderEvent(ms)",
    "title": "SWE.Window.SystemRenderEvent",
    "group": "SWE_Window_Events",
    "name": "SystemRenderEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ms",
            "description": "<p>render work milliseconds</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: system tick",
    "url": "SWE.Window.SystemTickEvent(tick)",
    "title": "SWE.Window.SystemTickEvent",
    "group": "SWE_Window_Events",
    "name": "SystemTickEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "tick",
            "description": "<p>constantly increasing counter (SWE.MainLoop cycle), in milliseconds, from the starting</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.SystemTickEvent = function(tick)\n\tprint(\"tick:\",tick)\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: system user event",
    "url": "SWE.Window.SystemUserEvent(code,lightuserdata)",
    "title": "SWE.Window.SystemUserEvent",
    "group": "SWE_Window_Events",
    "name": "SystemUserEvent",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>user code (0x00FFFFFF max value), see SWE.pushEvent</p>"
          },
          {
            "group": "Parameter",
            "type": "table",
            "optional": false,
            "field": "object",
            "description": "<p>any Lua object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>success if processing</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.SystemUserEvent = function(code,data)\n\tprint(\"code:\",code,type(data))\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: invalid texture",
    "url": "SWE.Window.TextureInvalidEvent()",
    "title": "SWE.Window.TextureInvalidEvent",
    "group": "SWE_Window_Events",
    "name": "TextureInvalidEvent",
    "description": "<p>after resizing the display or rotate (for mobile os), all textures (if used) must be reinitialized, because the internal SDL render is changed</p>",
    "examples": [
      {
        "title": "usage",
        "content": "    win.tx1 = SWE.Texture.Text(frs, text, SWE.Color.Red)\n    ...\n    win.TextureInvalidEvent = function()\n\twin.tx1 = SWE.Texture.Text(frs, text, SWE.Color.Red)\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: destroy object",
    "url": "SWE.Window.WindowCloseEvent()",
    "title": "SWE.Window.WindowCloseEvent",
    "group": "SWE_Window_Events",
    "name": "WindowCloseEvent",
    "examples": [
      {
        "title": "usage",
        "content": "    win.WindowCloseEvent = function()\n\tprint(\"win closed\")\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: single event constructor",
    "url": "SWE.Window.WindowCreateEvent()",
    "title": "SWE.Window.WindowCreateEvent",
    "group": "SWE_Window_Events",
    "name": "WindowCreateEvent",
    "examples": [
      {
        "title": "usage",
        "content": "    win.WindowCreateEvent = function()\n\tprint(\"win created\")\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "render window code",
    "url": "SWE.Window.RenderWindow()",
    "title": "SWE.Window.RenderWindow",
    "group": "SWE_Window_Virtual",
    "name": "RenderWindow",
    "success": {
      "fields": {
        "Return": [
          {
            "group": "Return",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>always true</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "    win.RenderWindow = function()\n\twin:RenderClear(SWE.Color.Silver)\n\twin:RenderRect(SWE.Color.Blue,0,0,win.width,win.height)\n\twin:RenderText(frs,\"Hello World!\",SWE.Color.Red,win.width/2,win.height/2,SWE.Align.Center,SWE.Align.Center)\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Virtual"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "_opt_svn_my_projects_SDL_engine_lua_docs_main_js",
    "groupTitle": "_opt_svn_my_projects_SDL_engine_lua_docs_main_js",
    "name": ""
  }
] });
