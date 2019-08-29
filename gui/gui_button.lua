require 'gui_tools'
require 'gui_action'

function TextButtonCreate(posx, posy, text, frs, parent)

    local cl1 = SWE.Color.White
    local cl2 = SWE.Color.Yellow
    local tx1 = SWE.Texture.Text(frs, text, cl1)
    local tx2 = SWE.Texture.Text(frs, text, cl2)

    local btn = SWE.Window(posx, posy, tx1.width + 6, tx1.height + 6, parent)

    btn.text = text
    btn.cl1 = cl1
    btn.cl2 = cl2
    btn.tx1 = tx1
    btn.tx2 = tx2
    btn.focused = false

    btn.MouseFocusEvent = function(f)
	btn.focused = f
	SWE.PushEvent(SWE.Action.ButtonDirty, nil, btn)
    end

    btn.RenderWindow = function()
	if btn.focused then
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
        if a == SWE.Action.ButtonDirty then
            btn:RenderWindow()
	    return true
        elseif a == SWE.Action.FontChanged then
	    btn.tx1 = SWE.Texture.Text(b, btn.text, btn.cl1)
	    btn.tx2 = SWE.Texture.Text(b, btn.text, btn.cl2)
	    btn:SetSize(btn.tx1.width + 6, btn.tx1.height + 6)
	    return true
        end
	return false
    end

    return btn
end
