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
    "url": "SWE.CursorLoad(table,number,number)",
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
    "type": "create display window object",
    "url": "SWE.DisplayInit(string,number,number,boolean,boolean)",
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
            "description": "<p>display window title</p>"
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
            "field": "debug",
            "description": "<p>debug mode, (default true)</p>"
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
        "content": "local win = SWE.DisplayInit(\"SWE Text\",640,480)\n-- see also SWE.DisplayWindow\n\nlocal result = SWE.MainLoop(win)",
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
    "type": "parse json string",
    "url": "SWE.JsonParse(string)",
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
    "url": "SWE.MainLoop(table)",
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
        "content": "local win = SWE.DisplayInit(\"Lua SWE\", 640, 480)\nwin.SetResult(123)\n\n......\nwin.KeyPressEvent = function(k)\n    if k == SWE.Key.ESCAPE then\n        win:SetVisible(false)\n    end\n    return true\nend\n......\n\nprint(SWE.MainLoop(win))",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "push custom event to window object",
    "url": "SWE.PushEvent(number,userdata,table)",
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
            "description": "<p>code event</p>"
          },
          {
            "group": "Parameter",
            "type": "userdata",
            "optional": false,
            "field": "pointer",
            "description": "<p>userdata event</p>"
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
        "content": "    local win = SWE.DisplayInit(\"Lua SWE\", 640, 480)\n    local win2 = SWE.Window(50, 50, 200, 100)\n\n    ......\n    win.KeyPressEvent = function(k)\n        if k == SWE.Key.ESCAPE then\n            win:SetVisible(false)\n\t    return true\n\telseif k == SWE.Key.RETURN then\n\t    SWE.PushEvent(3333, nil, win2)\n\t    return true\n        end\n        return false\n    end\n\n    win1.SystemUserEvent = function(c,d)\n\tif c == 3333 then\n\t    print(\"SUCCESS\")\n\tend\n    end\n    ......\n\n    SWE.MainLoop(win)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "display scene render to screenshot",
    "url": "SWE.RenderScreenshot(string)",
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
    "url": "SWE.SystemDirnameBasename(string)",
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
        "content": "local dirname,basename = SWE.SystemDirnameBasename(\"/var/tmp/screenshot.png\")\nprint(dirname,basename)\n\n... console\n\"var/tmp\"    \"screenshot.png\"",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_swe.js",
    "groupTitle": "SWE"
  },
  {
    "type": "stat info for directory/file",
    "url": "SWE.SystemFileStat(string)",
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
        "content": "local stat = SWE.SystemFileInfo(\"/var/tmp/screenshot.png\")\n\n.... dump stat\n| mode  | 33204      | \n| gid   | 1000       | \n| atime | 1565677681 | \n| uid   | 1000       | \n| nlink | 1          | \n| size  | 404930     | \n| mtime | 1565677681 | \n| ctime | 1565677681 | \n| isdir | false      |",
        "type": "json"
      }
    ],
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
    "type": "read directory",
    "url": "SWE.SystemReadDirectory(string)",
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
            "description": "<p>table result, name, type</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local names = SWE.SystemReadDirectory(\"/var/tmp\")\n\n.... dump names\n| \"world.log\" | \"file\"      |\n| \"hello.log\" | \"file\"      |\n| \"mc-root\"   | \"directory\" |",
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
    "url": "SWE.Audio.MixerVolume(number)",
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
    "url": "SWE.Audio.MusicPlay(string)",
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
    "url": "SWE.Audio.MusicPlayBuf(table)",
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
    "url": "SWE.Audio.SoundPlay(string)",
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
    "url": "SWE.Audio.SoundPlayBuf(table)",
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
    "type": "base64 decode",
    "url": "SWE.BinaryBuf.Base64Decode(table),(string)",
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
    "url": "SWE.BinaryBuf.Base64Encode(table)",
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
    "type": "binarybuf constructor",
    "url": "SWE.BinaryBuf(),(string),(userdata,number)",
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
        "content": "local buf = SWE.BinaryBuf(\"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\")\nlocal zip = buf:ZlibCompress()\nlocal base64 = zip:Base64Encode()\nprint(base64)",
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
    "type": "get byte value",
    "url": "SWE.BinaryBuf.GetByte(table,number)",
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
            "field": "inputbuf",
            "description": "<p>binarybuf raw data</p>"
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
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "get byte values",
    "url": "SWE.BinaryBuf.GetBytes(table,number,number)",
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
            "field": "inputbuf",
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
            "field": "count",
            "description": "<p>count data</p>"
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
    "url": "SWE.BinaryBuf.GetCRC32b(table)",
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
    "type": "read from file",
    "url": "SWE.BinaryBuf.ReadFromFile(string)",
    "title": "SWE.BinaryBuf.ReadFromFile",
    "group": "SWE_BinaryBuf",
    "name": "ReadFromFile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>path to filename</p>"
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
    "version": "0.0.0",
    "filename": "./api/apidoc_binarybuf.js",
    "groupTitle": "SWE_BinaryBuf"
  },
  {
    "type": "save to file",
    "url": "SWE.BinaryBuf.SaveToFile(string)",
    "title": "SWE.BinaryBuf.SaveToFile",
    "group": "SWE_BinaryBuf",
    "name": "SaveTiFile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>filename</p>"
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
    "url": "SWE.BinaryBuf.SetByte(table,number,number)",
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
            "field": "outputbuf",
            "description": "<p>binarybuf</p>"
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
    "type": "set byte values",
    "url": "SWE.BinaryBuf.SetBytes(table,number,table,number,number)",
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
            "field": "inputbuf",
            "description": "<p>binarybuf input values</p>"
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
            "field": "outputbuf",
            "description": "<p>binarybuf output values</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count data</p>"
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
    "type": "convert binarybuf to string",
    "url": "SWE.BinaryBuf.ToString(table)",
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
    "url": "SWE.BinaryBuf.ZlibCompress(table)",
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
    "url": "SWE.BinaryBuf.ZlibDecompress(table)",
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
    "type": "get color string",
    "url": "SWE.Color.ToString(number)",
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
            "field": "color",
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
            "field": "color",
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
    "url": "SWE.FontRender(string,number,boolean,number,number)",
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
            "type": "boolean",
            "optional": false,
            "field": "blend",
            "description": "<p>blended mode</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "style",
            "description": "<p>style enum, see SWE.Font</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hinting",
            "description": "<p>hinting enum, see SWE.Font</p>"
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
        "content": "| font    | string  |\n| size    | number  |\n| blended | boolean |\n| style   | number  |\n| hinting | number  |\n\n| fixedWidth | number | for fixed font return SymbolAdvance(0x20)\n| lineHeight | number | skip line height",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_fontrender.js",
    "groupTitle": "SWE_FontRender"
  },
  {
    "type": "get symbol advance value",
    "url": "SWE.FontRender.SymbolAdvance(table,number)",
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
            "field": "frs",
            "description": "<p>fontrender object</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sym",
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
    "url": "SWE.Key.Lower(number)",
    "title": "SWE.Key.Lower",
    "group": "SWE_Key",
    "name": "Lower",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "key1",
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
            "field": "key2",
            "description": "<p>key enum</p>"
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
    "url": "SWE.Key.ToString(number)",
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
    "url": "SWE.Key.ToKey(string)",
    "title": "SWE.Key.ToKey",
    "group": "SWE_Key",
    "name": "ToKey",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>key name</p>"
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
            "field": "key",
            "description": "<p>key enum</p>"
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
    "url": "SWE.Key.ToString(number)",
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
    "type": "get color string",
    "url": "SWE.Key.Upper(number)",
    "title": "SWE.Key.Upper",
    "group": "SWE_Key",
    "name": "Upper",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "key1",
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
            "field": "key2",
            "description": "<p>key enum</p>"
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
    "type": "texture constructor",
    "url": "SWE.Texture(),(number,number)",
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
    "type": "texture clear",
    "url": "SWE.Texture.RenderClear(table,number)",
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
            "field": "texture",
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
    "url": "SWE.Texture.RenderCyrcle(table,number,number,number,number,boolean)",
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
            "field": "texture",
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
    "url": "SWE.Texture.RenderLine(table,number,number,number,number,number)",
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
            "field": "texture",
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
    "url": "SWE.Texture.RenderPoint(table,number,number,number)",
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
            "field": "texture",
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
            "field": "posx",
            "description": "<p>point position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posy",
            "description": "<p>point position</p>"
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
    "url": "SWE.Texture.RenderRect(table,number,number,number,number,number,number,boolean)",
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
            "field": "texture",
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
            "field": "rectx",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "recty",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rectw",
            "description": "<p>rect size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "recth",
            "description": "<p>rect size</p>"
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
    "url": "SWE.Texture.RenderText(table,table,number,number,number,number,number,boolean)",
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
            "field": "texture",
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
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local frs = SWE.FontRender(\"dejavusans.ttf\", 24)\nlocal image1 = SWE.Texture.Image(\"logo.png\")\nimage1:RenderText(frs,SWE.Color.Red,\"APPROVED\",image1.width/2,image1.height/2,SWE.Align.Center,SWE.Align.Center)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture render texture",
    "url": "SWE.Texture.RenderTexture(table,table,number,number,number,number,number,number,number,number)",
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
            "field": "texture",
            "description": "<p>texture object</p>"
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
          }
        ]
      }
    },
    "examples": [
      {
        "title": "usage",
        "content": "local image1 = SWE.Texture.Image(\"logo.png\")\nlocal image2 = image.Texture(200,100)\n-- copy texture area(50, 50, 50, 50) from image1 to texture image2 dst pos(100, 50)\nimage2:RenderTexture(image1,50,50,50,50,100,50)\nprint(image2.width,image2.height)",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_texture.js",
    "groupTitle": "SWE_Texture"
  },
  {
    "type": "texture constructor",
    "url": "SWE.Texture.Image(string,number,number)",
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
            "description": "<p>sdl color key value</p>"
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
    "url": "SWE.TextureRect(number,number,number,number,number)",
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
    "url": "SWE.Texture.Text(table,string,number,number)",
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
            "field": "colrt",
            "description": "<p>text color, SWE.Color</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "colbg",
            "description": "<p>fill backgroung color, SWE.Color</p>"
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
    "type": "window constructor",
    "url": "SWE.Window(number,number,number,number,<table>)",
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
        "content": "| posx     | number  | window position\n| posy     | number  | window position\n| width    | number  | window size\n| height   | number  | window size\n| visible  | boolean | window is visible",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window"
  },
  {
    "type": "window clear",
    "url": "SWE.Window.RenderClear(table,number)",
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
            "field": "window",
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
    "url": "SWE.Window.RenderCyrcle(table,number,number,number,number,boolean)",
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
            "field": "window",
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
    "url": "SWE.Window.RenderLine(table,number,number,number,number,number)",
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
            "field": "window",
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
    "url": "SWE.Window.RenderPoint(table,number,number,number)",
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
            "field": "window",
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
    "url": "SWE.Window.RenderRect(table,number,number,number,number,number,number,boolean)",
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
            "field": "window",
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
            "field": "rectx",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "recty",
            "description": "<p>rect position</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rectw",
            "description": "<p>rect size</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "recth",
            "description": "<p>rect size</p>"
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
    "url": "SWE.Window.RenderText(table,table,number,number,number,number,number,boolean)",
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
            "field": "window",
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
    "url": "SWE.Window.RenderTexture(table,table,number,number,number,number,number,number,number,number)",
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
            "field": "window",
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
    "url": "SWE.Window.SetPosition(table,number,number)",
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
            "field": "window",
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
    "url": "SWE.Window.SetResult(table,number)",
    "title": "SWE.Window.SetResult",
    "group": "SWE_Window",
    "name": "SetResult",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "SWE.Window",
            "optional": false,
            "field": "window",
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
    "type": "window set visible mode",
    "url": "SWE.Window.SetVisible(table,boolean)",
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
            "field": "window",
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
    "type": "window event: key event",
    "url": "SWE.Window.KeyPressEvent(key)",
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
        "content": "    win.KeyPressEvent = function(k)\n\tif k == SWE.Key.ESCAPE then\n\t    win:SetVisible(false)\n\t    print(\"hide window\")\n\tend\n\treturn true\n    end",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./api/apidoc_window.js",
    "groupTitle": "SWE_Window_Events"
  },
  {
    "type": "window event: key event",
    "url": "SWE.Window.KeyReleaseEvent(key)",
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
            "description": "<p>SDL mouse press buttons</p>"
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
            "description": "<p>SDL mouse release buttons</p>"
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
    "type": "window event: single event constructor",
    "url": "SWE.Window.WindowCreate()",
    "title": "SWE.Window.WindowCreate",
    "group": "SWE_Window_Events",
    "name": "MouseFocusEvent",
    "examples": [
      {
        "title": "usage",
        "content": "    win.WindowCreateEvent = function(f)\n\tprint(\"win created\")\n    end",
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
            "field": "buttons",
            "description": "<p>SDL mouse buttons</p>"
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
            "field": "buttons",
            "description": "<p>SDL mouse buttons</p>"
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
            "field": "buttons",
            "description": "<p>SDL mouse buttons</p>"
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
            "description": "<p>user code, see SWE.pushEvent</p>"
          },
          {
            "group": "Parameter",
            "type": "userdata",
            "optional": false,
            "field": "lightuserdata",
            "description": "<p>user data</p>"
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
        "content": "    win.SystemUserEvent = function(code,data)\n\tprint(\"code:\",code)\n    end",
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
    "filename": "./doc/main.js",
    "group": "_opt_svn_my_projects_SDL_projects_luaSWE_doc_main_js",
    "groupTitle": "_opt_svn_my_projects_SDL_projects_luaSWE_doc_main_js",
    "name": ""
  }
] });
