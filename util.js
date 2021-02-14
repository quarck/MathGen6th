// 
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
//
//
//
//   This code was written by a person with very little Web/JS knowledge, don't judge. 
//   https://github.com/quarck/MathGen6th/issues for reporting any issues 
//


function max(a, b) 
{
     return a > b ? a : b 
}

function min(a, b) 
{
     return a > b ? b : a 
}

/*
 * Various random helpers 
 */

function random()
{
    return Math.random()
}
function randomRaw()
{
    return (Math.random() * 1024 * 1024) | 0
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

function randomUniqSelection(collection, numItems)
{
    if (collection.length <= numItems) 
        return null    
    let ret = []
    let collectionCopy = [...collection]

    for (let i = 0; i < numItems; ++ i)
    {
        let pos = randInt(collectionCopy.length)
        let item = collectionCopy[pos]
        collectionCopy.splice(pos, 1)        
        ret.push(item)
    }
    return ret
}

function randomNonUniqSelection(collection, numItems)
{
    let ret = []
    for (let i = 0; i < numItems; ++ i)
    {
        ret.push(collection[randInt(collection.length)])
    }
    return ret
}

/*
 * Primes
 */

function isPrime(x)
{
    for (let i = 2; i < x; ++ i)
    {
        if (x % i == 0)
            return false
    }
    return true
}

function primesInRange(from, to)
{
    let ret = []
    for (let i = max(2, from); i<= to; ++ i)
    {
        if (isPrime(i))
            ret.push(i)
    }
    return ret
}


/* GCD, LCM helpers */
function gcd(a, b)
{
    if (a == 0 || b == 0)
        return 1
    while (a != b)
    {
        if (a > b)
            a -= b 
        else 
            b -= a
    }
    return a
}

function gcd3(a, b, c)
{
    return gcd(a, gcd(b, c))
}

function lcm(a, b)
{
    return a * b / gcd(a, b)
}

function lcm3(a, b, c)
{
    return lcm(a, lcm(b, c))
}

/*
 * formatting functions 
 */

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
