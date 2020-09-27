-- require 'SWE'
SWE.SetDebug(true)

local frs = SWE.FontRender("DejaVuSansMono.ttf", 14, SWE.Font.RenderBlended)
local cols = 80
local rows= 25

local term = SWE.TerminalInit("LuaTerminal", frs, cols, rows)

if not term then
    print("SWE init error")
    os.exit(-1)
end

function term.EndLine(self,num)
    return term:CursorMoveDown(num or 1):CursorMoveFirst()
end

function term.Comment(self,str)
    return term:SetFGColor(SWE.Color.Peru):DrawText(str):ResetFGColor():EndLine()
end

function term.RenderWindow()
    term:CursorPosition(0, 0):FillColors(SWE.Color.Silver, SWE.Color.Black, term.cols, term.rows)
    term:CursorPosition(0, 0):FillProperty(frs.blended, frs.style, frs.hinting, term.cols, term.rows)
    term:CursorPosition(0, 0):FillCharset(0x20, term.cols, term.rows)

    term:CursorPosition(0, 0)
    term:DrawText("SimpleText"):EndLine()
    -- colored text
    term:SetFGColor(SWE.Color.Blue):DrawText("Colored"):SetFGColor(SWE.Color.Red):DrawText("Text"):ResetColors():EndLine()
    -- background colored text
    term:SetColors(SWE.Color.MidnightBlue,SWE.Color.LightSalmon):DrawText("Background"):
            SetColors(SWE.Color.Gold,SWE.Color.Blue):DrawText("Colored"):
            SetColors(SWE.Color.Yellow,SWE.Color.Navy):DrawText("Text"):ResetColors():EndLine(2)

    -- charset property
    term:DrawText("Char property Render:"):EndLine()
    term:SetColors(SWE.Color.Yellow,SWE.Color.Navy):
        SetProperty(SWE.Font.RenderSolid,SWE.Font.StyleDefault,SWE.Font.HintingDefault):DrawText("RenderSolid" ):
        SetProperty(SWE.Font.RenderBlended,SWE.Font.StyleDefault,SWE.Font.HintingDefault):DrawText("RenderBlended "):
        SetProperty(SWE.Font.RenderShaded,SWE.Font.StyleDefault,SWE.Font.HintingDefault):DrawText("RenderShaded"):
        ResetProperty():ResetColors():EndLine()

    term:DrawText("Char property Style:"):EndLine()
    term:SetColors(SWE.Color.Yellow,SWE.Color.Navy):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleNormal,SWE.Font.HintingDefault):DrawText("StyleNormal "):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleBold,SWE.Font.HintingDefault):DrawText("StyleBold "):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleItalic,SWE.Font.HintingDefault):DrawText("StyleItalic "):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleUnderLine,SWE.Font.HintingDefault):DrawText("StyleUnderLine "):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleStrikeThrough,SWE.Font.HintingDefault):DrawText("StyleStrikeThrough"):
        ResetProperty():ResetColors():EndLine()

    term:DrawText("Char property Hinting:"):EndLine()
    term:SetColors(SWE.Color.Yellow,SWE.Color.Navy):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleDefault,SWE.Font.HintingNormal):DrawText("HintingNormal "):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleDefault,SWE.Font.HintingLight):DrawText("HintingLight "):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleDefault,SWE.Font.HintingMono):DrawText("HintingMono "):
        SetProperty(SWE.Font.RenderDefault,SWE.Font.StyleDefault,SWE.Font.HintingNone):DrawText("HintingNone"):
        ResetProperty():ResetColors():EndLine(2)

    -- charset state
    term:DrawText("Char state SetInvert:"):EndLine()
    term:SetColors(SWE.Color.Yellow,SWE.Color.Navy):DrawText("ColoredText"):SetInvert():DrawText("ColoredText"):ResetInvert():ResetColors():EndLine()
    term:DrawText("Char state SetBlink:"):EndLine()
    term:SetColors(SWE.Color.Yellow,SWE.Color.Navy):SetBlink():DrawText("ColoredText"):ResetBlink():ResetColors():EndLine()
    term:DrawText("Char state SetFlipHorizontal:"):EndLine()
    term:SetColors(SWE.Color.Yellow,SWE.Color.Navy):SetFlipHorizontal():DrawText("ColoredText"):ResetFlip():ResetColors():EndLine()
    term:DrawText("Char state SetFlipVertical:"):EndLine()
    term:SetColors(SWE.Color.Yellow,SWE.Color.Navy):SetFlipVertical():DrawText("ColoredText"):ResetFlip():ResetColors():EndLine()
    term:DrawText("Char state SetAlpha:"):EndLine()
    term:SetColors(SWE.Color.Red,SWE.Color.Black):DrawText("ColoredText"):
    SetAlpha(200):DrawText("ColoredText"):
    SetAlpha(150):DrawText("ColoredText"):
    SetAlpha(100):DrawText("ColoredText"):
    SetAlpha(50):DrawText("ColoredText"):
    ResetAlpha():ResetColors():EndLine()

    term:SetFlush()
    return true
end

function term.KeyPressEvent(key)
    if SWE.Key.ESCAPE == key then
        -- close scene, see SWE.MainLoop
        term:SetVisible(false)
        return true
    end
    return false
end

SWE.MainLoop(term)
