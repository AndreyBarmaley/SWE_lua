require 'gui_tools'
require 'gui_action'

function TextButtonCreate(posx, posy, text, frs, parent)

    local cl1 = SWE.Color.White
    local cl2 = SWE.Color.Yellow
    local tx1 = SWE.Texture.Text(frs, text, cl1)
    local tx2 = SWE.Texture.Text(frs, text, cl2)

    local btn = SWE.Window(posx, posy, tx1.width + 6, tx1.height + 6, parent)

    btn.text = text
    btn.frs = frs
    btn.cl1 = cl1
    btn.cl2 = cl2
    btn.tx1 = tx1
    btn.tx2 = tx2
    btn.focused = false
    btn.disabled = false

    btn.MouseFocusEvent = function(f)
	btn.focused = f
	SWE.PushEvent(SWE.Action.ObjectDirty, nil, btn)
    end

    btn.TextureInvalidEvent = function()
	btn.tx1 = SWE.Texture.Text(btn.frs, btn.text, btn.cl1)
	btn.tx2 = SWE.Texture.Text(btn.frs, btn.text, btn.cl2)
    end

    btn.RenderWindow = function()
	if btn.disabled then
	    btn:RenderClear(SWE.Color.LightSlateGray)
	    btn:RenderRect(SWE.Color.Black, 0, 0, btn.width, btn.height)
	    btn:RenderTexture(btn.tx1, 0, 0, btn.tx1.width, btn.tx1.height, 3, 3)
	elseif btn.focused then
	    btn:RenderClear(SWE.Color.DimGray)
	    btn:RenderRect(SWE.Color.Black, 0, 0, btn.width, btn.height)
	    btn:RenderTexture(btn.tx2, 0, 0, btn.tx2.width, btn.tx2.height, 3, 3)
	else
	    btn:RenderClear(SWE.Color.LightSlateGray)
	    btn:RenderRect(SWE.Color.Black, 0, 0, btn.width, btn.height)
	    btn:RenderTexture(btn.tx1, 0, 0, btn.tx1.width, btn.tx1.height, 3, 3)
	end
	return true
    end

    btn.SystemUserEvent = function(a,b)
        -- button dirty
        if a == SWE.Action.ObjectDirty then
            SWE.DisplayDirty()
	    return true
        elseif a == SWE.Action.FontChanged then
	    btn.frs = b
	    btn.tx1 = SWE.Texture.Text(btn.frs, btn.text, btn.cl1)
	    btn.tx2 = SWE.Texture.Text(btn.frs, btn.text, btn.cl2)
	    btn:SetSize(btn.tx1.width + 6, btn.tx1.height + 6)
	    return true
        end
	return false
    end

    return btn
end

function TermLabelActionCreate(str, frs, tpx, tpy, parent, fgcol, bgcol)
    local term = SWE.Terminal(frs, string.len(str) + 2, 1, parent)
    term.label = str
    term.fgcol = fgcol or SWE.Color.Yellow
    term.bgcol = bgcol or parent.colors.back or SWE.Color.Black
    term.brcol1 = parent.colors.text or SWE.Color.White
    term.brcol2 = parent.colors.back or SWE.Color.Black
    term.focus = false
    term.disable = false
    term:SetPosition(tpx * frs.fixedWidth, tpy * frs.lineHeight)

    term.MouseFocusEvent = function(f)
	if not term.disable then
    	    term.focus = f
    	    SWE.DisplayDirty()
    	    return true
	end
	return false
    end

    term.RenderWindow = function()
        term:CursorTopLeft():FillColors(term.brcol1, term.brcol2, 1, 1)
	if not term.disable then
    	    if term.focus then
        	term:FillColors(term.bgcol, term.fgcol, term.cols - 2, term.rows)
    	    else
        	term:FillColors(term.fgcol, term.bgcol, term.cols - 2, term.rows)
    	    end
	else
    	    term:FillColors(SWE.Color.Black, SWE.Color.Gray, term.cols - 2, term.rows)
	end
        term:FillColors(term.brcol1, term.brcol2, 1, 1)
        term:CursorTopLeft():DrawChar("["):DrawText(term.label):DrawChar("]")
        term:SetFlush()
        return true
    end

    return term
end
