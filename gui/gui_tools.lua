function ToInt(x)
    local integral, fractal = math.modf(x)
    return integral
end

function StringSplit(str, sep)
   local result = {}
   local regex = ("([^%s]+)"):format(sep)
   for each in str:gmatch(regex) do
      table.insert(result, each)
   end
   return result
end
