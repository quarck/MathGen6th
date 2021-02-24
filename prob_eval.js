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


function generateTableOperationHTML(a, b, op)
{
    let html = 
        '<table class="op_a">' + 
            '<tr>' + 
                '<td class="op_a" rowspan="2">' + op + '</td>' +         
                '<td class="op_a" align="end">' + a + '</td>' +
            '</tr>' + 
            '<tr>' + 
                '<td class="op_b" align="end">' + b + '</td>' + 
            '</tr>' + 
            '<tr><td class="op_c">&nbsp;</td></tr>' + 
        '</table>'

    return html
}

function splitDigitsForMul(a)
{
    if (a < 0)
    {
        let tmp = splitDigitsForMul(-a)
        tmp.unshift('-')
        return tmp
    }

    let ret = []
    for (let c of ('' + a))
    {
        if (c == '.')
            ret.push(ret.pop() + '.')
        else 
            ret.push(c)
    }

    return ret
}
function genMulTdRow(digits, delta)
{
    let ret = ""

    if (delta > 0)
        ret += "<td colspan=\"" + delta + "\"></td>"
    
    for (let d of digits)
    {
        ret += "<td class='op_m'>" + d + "</td>"
    }

    return ret
}

/*Note: a and b must be strings, so we don't have to worry about
 caring how many fraction digits to keep*/
function generateMultiplicationHtml(a, b)
{
    let dg_a = splitDigitsForMul(a)
    let dg_b = splitDigitsForMul(b)

    if (dg_a.length < dg_b.length)
        return generateMultiplicationHtml(b, a)

    let delta_len = dg_a.length - dg_b.length
    
    let html = 
        '<table>' + 
            '<tr>' + 
                '<td class="op_a">&nbsp;' + '</td>' + genMulTdRow(dg_a, 0) +
            '</tr>' + 
            '<tr>' + 
                '<td class="op_a" align="end">&#215;</td>' + genMulTdRow(dg_b, delta_len) + 
            '</tr>'
    for (let i = 0; i < dg_b.length; ++ i)
    {
        if (i == 0)
            html += '<tr><td class="op_mb" colspan=' + (dg_a.length +1)+ '>&nbsp;</td></tr>'
        else 
            html += '<tr><td class="op_a">&nbsp;</td></tr>'
    }
    
    html += '</table>'

    return html
}


var category_rounding = 
[
    {
        name: "Rounding", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let nd = [10, 100, 1000].pickRandom()
                let number = nd * (randInt(200) + 1) + randInt(nd)
        
                if (number % nd == 0)
                    continue
        
                let problemHtml = "Round " + number.formatInt() + " to the nearest " + nd.formatInt()
                let answerHtml = (Math.round(number / nd) * nd).formatInt()
        
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
]

var category_addsub = 
[
    {
        name: "Add/Substract", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a1 = randIntRange(1000, 10000)
                let b1 = randIntRange(100, 1000)
                let a2 = randIntRange(1000, 10000)
                let b2 = randIntRange(100, 1000)

                if (a1 == b1 || a2 == b2 || a1 == a2 || b1 == b2) 
                    continue

                let ab1 = [max(a1, b1), min(a1, b1)]
                let ab2 = [max(a2, b2), min(a2, b2)]

                let op1 = randValue('+', '-')
                let op2 = randValue('+', '-')

                let inner1 = generateTableOperationHTML(ab1[0].formatInt(), ab1[1].formatInt(), op1) 
                let inner2 = generateTableOperationHTML(ab2[0].formatInt(), ab2[1].formatInt(), op2) 
                let ans1 = (op1 == '+' ? ab1[0] + ab1[1] : ab1[0] - ab1[1]).formatInt()
                let ans2 = (op2 == '+' ? ab2[0] + ab2[1] : ab2[0] - ab2[1]).formatInt()

                let problemHtml = "<table><tr> <td valign='top'><i>a.</i></td><td class='sm_v'>" + inner1 + "</td> <td valign='top'><i>b.</i></td> <td class='sm_v'>" + inner2 + "</td> </tr></table>"
                let answerHtml = "<table><tr> <td valign='top'><i>a.</i></td> <td class='sm_v'>" + ans1 + "</td> <td valign='top'><i>b.</i></td> <td class='sm_v'>" + ans2 + "</td> </tr></table>"

                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
    {
        name: "Add/Substract with fractions",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a1 = randIntRange(1000, 10000)
                let b1 = randIntRange(100, 1000)
                let a2 = randIntRange(1000, 10000)
                let b2 = randIntRange(100, 1000)
        
                if (a1 == b1 || a2 == b2 || a1 == a2 || b1 == b2) 
                    continue
        
                if (a1 % 10 == 0 || a2 % 10 == 0 || b1 % 10 == 0 || b2 % 10 == 0)
                    continue
        
                a1 /= 10.0
                a2 /= 10.0
                b1 /= 10.0
                b2 /= 10.0
        
                let ab1 = [max(a1, b1), min(a1, b1)]
                let ab2 = [max(a2, b2), min(a2, b2)]
        
                let op1 = randValue('+', '-')
                let op2 = randValue('+', '-')
        
                let inner1 = generateTableOperationHTML(ab1[0].formatFixed(1), ab1[1].formatFixed(1), op1) 
                let inner2 = generateTableOperationHTML(ab2[0].formatFixed(1), ab2[1].formatFixed(1), op2) 
                let ans1 = (op1 == '+' ? ab1[0] + ab1[1] : ab1[0] - ab1[1]).formatFixed(1)
                let ans2 = (op2 == '+' ? ab2[0] + ab2[1] : ab2[0] - ab2[1]).formatFixed(1)
        
                let problemHtml = "<table><tr> <td valign='top'><i>a.</i></td><td class='sm_v'>" + inner1 + "</td> <td valign='top'><i>b.</i></td> <td class='sm_v'>" + inner2 + "</td> </tr></table>"
                let answerHtml = "<table><tr> <td valign='top'><i>a.</i></td> <td class='sm_v'>" + ans1 + "</td> <td valign='top'><i>b.</i></td> <td class='sm_v'>" + ans2 + "</td> </tr></table>"
        
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },

]

var category_evaluations = 
[
    {
        name: "Evaluate a^b (capped), integers", 
        fun: function (root, ansRoot, difficulty)
        {
        
            for (;;)
            {
                let a = randIntRange(2, 7)
                let b = randIntRange(3, 8)
                let ans = Math.pow(a, b)
                if (difficulty < 5)
                {
                    if (ans > 150)
                        continue
                }
                else if (difficulty < 7)
                {
                    if (ans > 400)
                        continue
                }
                else 
                {
                    if (ans < 150)
                        continue
                    if (ans > 900)
                        continue
                }
                root.innerHTML = "" + a + "<sup>" + b + "</sup>" + " = "
                ansRoot.innerHTML = ans
                break;
            }
        
        },         
    },
    {
        name: "Evaluate a^2 - b^2, integers, non negative", 
        fun: function (root, ansRoot, difficulty)
        {
        
            for (;;)
            {
                let a = randIntRange(4, 20)
                let b = randIntRange(4, 20)
                if (a <= b)
                    continue
        
                let problemHtml = "" + a + "<sup>2</sup> - " + b + "<sup>2</sup>" + " = "
                let answerHtml = Math.pow(a, 2) - Math.pow(b, 2)
        
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        
        },         
    },
    {
        name: "Evaluate (a +|- b) / c, integers", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let c = randIntRange(5, 20 + 2*difficulty)
                let ab = c * randIntRange(5, 5 + difficulty)
                let direction = randValue(1, -1)
                let directionSym = (direction > 0) ? '+' : '-'

                let b = randIntRange(1, ab)
                let a = direction > 0 ? (ab - b) : (ab + b)

                let answer = Math.round((a + direction * b ) / c)
                if (answer < 0)
                    continue

                root.innerHTML = "(" + a + " " + directionSym + " " + b + ") &#247; " + c + " = "
                ansRoot.innerHTML = answer
                break;
            }            
        },         
    }, 
    {
        name: "Evaluate (a / b) +|- (c / d), integers", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let b = randIntRange(5, 10 + difficulty)
                let a = b * randIntRange(6, 6 + difficulty)

                let d = randIntRange(5, 10 + difficulty)
                let c = d * randIntRange(5, 5 + difficulty)

                let direction = randValue(1, -1)
                let directionSym = (direction > 0) ? '+' : '-'

                let answer = Math.round((a / b) + direction*(c / d))
                if (answer <= difficulty)
                    continue

                root.innerHTML = "(" + a + " &#247; " + b + ")  " + directionSym + " (" + c + " &#247; " + d + ")  = "
                ansRoot.innerHTML = answer
                break;
            }            
        },         
    },   
    {
        name: "Evaluate (a * b) +|- c, integers",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(10, 10 + 2*difficulty)
                let b = randIntRange(2, 5 + difficulty)
                let c = randIntRange(5, 20 + 2*difficulty)
                
                let direction = randValue(1, -1)
                let directionSym = (direction > 0) ? '+' : '-'

                let ans = Math.round(a * b + direction * c)
                if (ans < 0) 
                {
                    continue
                }
        
                root.innerHTML =  "(" + a + " &#215; " + b + ") " + directionSym + " " + c + " = "
                ansRoot.innerHTML = ans
                break;
            }            
        },         
    },
    {
        name: "Evaluate (a +|- b) +|- c, integers", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let ab = randIntRange(50, 40*difficulty)
                let abDirection = randValue(1, -1)
                let abDirectionSym = (abDirection > 0) ? '+' : '-'
                let b = randIntRange(1, Math.round(ab/3))
                let a = abDirection > 0 ? (ab - b) : (ab + b)

                let c = randIntRange(10, 10+3*difficulty)

                if (a < difficulty || b < difficulty || c < difficulty)
                    continue

                let abcDirection = randValue(1, -1)
                let abcDirectionSym = (abcDirection > 0) ? '+' : '-'

                let answer = Math.round( a + abDirection* b + abcDirection * c)
                if (answer < 0)
                    continue
                if ( a + abDirection* b < 0)
                    continue

                root.innerHTML = "(" + a + " " + abDirectionSym + " " + b + ") " + abcDirectionSym + " " + c + " = "
                ansRoot.innerHTML = answer
                break;
            }            
        },         
    },   
    {
        name: "Evaluate (a.a * b) / c",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(5, 40 + 10*difficulty)
                if (a % 10 == 0)
                    continue
                a = a / 10
                let c = randIntRange(5, 5 + difficulty)
                let b = c * randIntRange(2, 10)

                let answer = (a * b / c).formatFixed(1)

                root.innerHTML = "(" + a.formatFixed(1) + " &#215; " + b + ") &#247; " + c + " = "
                ansRoot.innerHTML = answer
                break;
            }            
        },         
    },
    {
        name: "Evaluate (a.a * 100|1000) +|- c",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(5, 40 + 10*difficulty)
                if (a % 10 == 0)
                    continue
                a = a / 10
                let b = randValue(100, 1000)
                let c = randIntRange(5, 5 + 3*difficulty)

                let direction = randValue(1, -1)
                let directionSym = (direction > 0) ? '+' : '-'

                let answer = Math.round(a * b + direction * c)
                if (answer < 0)
                    continue

                root.innerHTML = "(" + a.formatFixed(1) + " &#215; " + b + ") " + directionSym + " " + c + " = "
                ansRoot.innerHTML = answer
                break;
            }            
        },         
    },
    {
        name: "Evaluate 0.a * 0.b",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                if (difficulty <= 5)
                {
                    let a = randIntRange(2, 10) / 10
                    let b = randIntRange(2, 10) / 10
                    let answer = (a * b).formatFixed(2)    
                    root.innerHTML = a.formatFixed(1) + " &#215; " + b.formatFixed(1) + " = "
                    ansRoot.innerHTML = answer
                }
                else if (difficulty <= 7)
                {
                    let a = randIntRange(2, 100) / 100
                    let b = randIntRange(2, 10) / 10
                    let answer = (a * b).formatFixed(3)
                    root.innerHTML = a.formatFixed(2) + " &#215; " + b.formatFixed(1) + " = "
                    ansRoot.innerHTML = answer
                }
                else
                {
                    let a = randIntRange(2, 100) / 100
                    let b = randIntRange(2, 100) / 100
                    let answer = (a * b).formatFixed(4)
                    root.innerHTML = a.formatFixed(2) + " &#215; " + b.formatFixed(2) + " = "
                    ansRoot.innerHTML = answer
                }
                break;
            }            
        },         
    },
]



var category_divmul = 
[
    {
        name: "Division", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(3, 4*difficulty)
                let b = randIntRange(10*difficulty, 35*difficulty)
                let c = a * b                
                let problemHtml = '<table><tr><td class="div_left">' + a.formatInt() + '</td><td class="div_right">' + c.formatInt() + '</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>'

                for (let i = 0; i < ('' + b).length; ++ i)
                    problemHtml += '<br>'

                let answerHtml = b.formatInt()
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
    {
        name: "Division by multiples of 10", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let b = randIntRange(1000, 10000)
                let numDgts = randInt(4) // 1, 2 or 3
                let a = Math.pow(10, numDgts)
        
                if (a >= b)
                    continue
                if (b % a == 0)
                    continue
        
                let c = a * b
                let problemHtml = b.formatInt() + " &#247; " + a.formatInt() + " = "
                let answerHtml = (b / a).formatFixed(numDgts)
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
    {
        name: "Multiplication", 
        fun: function (root, ansRoot, difficulty)
        {
            let mutiplesOfTen = [10, 100, 1000]

            for (;;)
            {
                let a = randIntRange(20 * difficulty, 100 * difficulty)
                let b = randIntRange(3, 10 * difficulty)

                if (mutiplesOfTen.includes(a) || mutiplesOfTen.includes(b)) // that is too simple 
                    continue

                let problemHtml = generateMultiplicationHtml("" + a, "" + b)
                let answerHtml = a * b
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
    {
        name: "Multiplication with fractions", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(20 * difficulty, 100 * difficulty)
                let b = randIntRange(3, 10 * difficulty)
        
                if (a % 10 == 0)
                    continue
                a /= 10.0
        
                let problemHtml = generateMultiplicationHtml("" + a, "" + b)
                let answerHtml = (a * b).formatFixed(1)
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
    {
        name: "Multiplication with fractions (bigger bottom part)", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(10 * difficulty, 400 * difficulty)
                let b = randIntRange(11, 40 * difficulty)
        
                if (b % 10 == 0)
                    continue
                b /= 10.0
        
                let problemHtml = generateMultiplicationHtml("" + a, "" + b)
                let answerHtml = (a * b).formatFixed(1)
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
]