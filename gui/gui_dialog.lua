-- require 'gui_button'

function DialogInform(parent, frs, header, message)

    local list = { frs:SplitStringWidth(message, parent.width) }
    local height = (#list + 3) * frs.lineHeight
    local area = SWE.Window(0, (parent.height - height) / 2, parent.width, height, parent)
    area:SetModality(true)


    area.RenderWindow = function()
	area:RenderClear(SWE.Color.Black)
	area:RenderRect(SWE.Color.Red, 0, 0, area.width, area.height)
	area:RenderText(frs, header, SWE.Color.Red, area.width / 2, 5, SWE.Align.Center, SWE.Align.Top)
	local posy = (frs.lineHeight * 2) - 5
	for i=1,#list do
	    area:RenderText(frs, list[i], SWE.Color.Yellow, area.width / 2, posy, SWE.Align.Center, SWE.Align.Top)
	    posy = posy + frs.lineHeight
	end
	return true
    end

    area.MouseClickEvent = function(px,py,pb,rx,ry,rb)
	area:SetVisible(false)
	return true
    end

    area.KeyPressEvent = function(key)
        if SWE.Key.ESCAPE == key then
            area:SetVisible(false)
            return true
        end
        return false
    end

    SWE.MainLoop(area)
end
