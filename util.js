/* 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

/* This code was written by a person with very little Web/JS knowledge, don't judge. 
 * Send bug reports to: mathgeneratorfeedback@qrck.org */






function xoshiro128ss(a, b, c, d) 
{
    return function() 
    {
        let t = b << 9, r = a * 5
        r = (r << 7 | r >>> 25) * 9
        c ^= a
        d ^= b
        b ^= c
        a ^= d
        c ^= t
        d = d << 11 | d >>> 21
        return (r >>> 0)
    }
}

let _rng = null 
function rng()
{
    if (_rng == null)
    {
        let now = Date.now()
        let upper = now >>> 16
        let lower = now & 0xffff
        upper = (upper << 12) ^ upper 
        lower = (lower << 13) ^ lower 

        _rng = xoshiro128ss(lower, upper, ~lower ^ upper, lower ^ upper)
    }
    return _rng
}

function random()
{
    //return rng()() / 4294967296
    return Math.random()
}
function randomRaw()
{
    //return rng()() 
    return (Math.random() * 1024 * 1024) | 0
}

function max(a, b) 
{
     return a > b ? a : b 
}

function min(a, b) 
{
     return a > b ? b : a 
}

function formatDigits(s)
{
    let r = ""
    let l = s.length

    if (s.includes('e'))
        return s

    for (let i = 0; i < l/3; ++ i)
    {
        let start = l - i * 3 - 3
        let end = l - i * 3        
        start = start > 0 ? start : 0
        if (i == 0)
            r = s.substring(start)
        else 
            r = s.substring(start, end) + ',' + r
    }

    return r
}

function formatInt(v)
{   
    if (v < 0)
        return "-" + formatInt(-v)
    let s = "" + v
    if (s.includes('.')) 
        return s // failback, should be never used
    return formatDigits(s)
}

function formatFloat(v, numDigits)
{
    if (v < 0)
        return "-" + formatFloat(-v, numDigits)
    let fs = v.toFixed(numDigits)
    if (fs.includes('e'))
        return fs
    let s = fs.split('.')
    if (s.length != 2)
        return formatDigits(fs)
    return formatDigits(s[0]) + '.' + s[1]
}

function formatFloatUnlessInt(v, numDigits)
{
    if (v < 0)
        return "-" + formatFloatUnlessInt(-v, numDigits)

    let fs = v.toFixed(numDigits)
    if (fs.includes('e'))
        return fs
    let s = fs.split('.')
    if (s.length != 2)
        return formatDigits(fs)
    if (parseInt(s[1]) == 0)
        return formatDigits(s[0])
    return formatDigits(s[0]) + '.' + s[1]
}


function randInt(max)
{
    return randomRaw() % max;
}

function randIntRange(min, max)
{
    return randInt(max - min) + min;
}

function randFixFloat(min, max, numDigits)
{
    let v = random()
    let scaled = (max - min) * v + min
    let p = Math.pow(10, numDigits)
    return Math.round(scaled * p) / p
}

function randValue()
{
    return arguments[randInt(arguments.length)]
}

function randomName()
{
    return arguments[randInt(arguments.length)]
}

function getNumDigits(number)
{
    let num = number > 0 ? number : -number
    let ret = []
    while (num > 0)
    {
        ret.unshift(num % 10)
        num = Math.floor(num/ 10)
    }
    if (ret.length == 0)
        ret.push('0')
    return ret
}
