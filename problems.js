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
                let nd = randValue(10, 100, 1000)
                let number = nd * (randInt(200) + 1) + randInt(nd)
        
                if (number % nd == 0)
                    continue
        
                let problemHtml = "Round " + formatInt(number) + " to the nearest " + formatInt(nd)
                let answerHtml = formatInt(Math.round(number / nd) * nd)
        
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

                let inner1 = generateTableOperationHTML(formatInt(ab1[0]), formatInt(ab1[1]), op1) 
                let inner2 = generateTableOperationHTML(formatInt(ab2[0]), formatInt(ab2[1]), op2) 
                let ans1 = formatInt(op1 == '+' ? ab1[0] + ab1[1] : ab1[0] - ab1[1])
                let ans2 = formatInt(op2 == '+' ? ab2[0] + ab2[1] : ab2[0] - ab2[1])

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
        
                let inner1 = generateTableOperationHTML(formatFloat(ab1[0], 1), formatFloat(ab1[1], 1), op1) 
                let inner2 = generateTableOperationHTML(formatFloat(ab2[0], 1), formatFloat(ab2[1], 1), op2) 
                let ans1 = formatFloat(op1 == '+' ? ab1[0] + ab1[1] : ab1[0] - ab1[1], 1)
                let ans2 = formatFloat(op2 == '+' ? ab2[0] + ab2[1] : ab2[0] - ab2[1], 1)
        
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

                let answer = formatFloat(a * b / c, 1)

                root.innerHTML = "(" + formatFloat(a, 1) + " &#215; " + b + ") &#247; " + c + " = "
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

                root.innerHTML = "(" + formatFloat(a, 1) + " &#215; " + b + ") " + directionSym + " " + c + " = "
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
                    let answer = formatFloat(a * b, 2)    
                    root.innerHTML = formatFloat(a, 1) + " &#215; " + formatFloat(b, 1) + " = "
                    ansRoot.innerHTML = answer
                }
                else if (difficulty <= 7)
                {
                    let a = randIntRange(2, 100) / 100
                    let b = randIntRange(2, 10) / 10
                    let answer = formatFloat(a * b, 3)
                    root.innerHTML = formatFloat(a, 2) + " &#215; " + formatFloat(b, 1) + " = "
                    ansRoot.innerHTML = answer
                }
                else
                {
                    let a = randIntRange(2, 100) / 100
                    let b = randIntRange(2, 100) / 100
                    let answer = formatFloat(a * b, 4)
                    root.innerHTML = formatFloat(a, 2) + " &#215; " + formatFloat(b, 2) + " = "
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
                let problemHtml = '<table><tr><td class="div_left">' + formatInt(a) + '</td><td class="div_right">' + formatInt(c) + '</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>'

                for (let i = 0; i < ('' + b).length; ++ i)
                    problemHtml += '<br>'

                let answerHtml = formatInt(b)
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
                let problemHtml = formatInt(b) + " &#247; " + formatInt(a) + " = "
                let answerHtml = formatFloat(b / a, numDgts)
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
                let answerHtml = formatFloat(a * b, 1)
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
                let answerHtml = formatFloat(a * b, 1)
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
]

var category_proportions = 
[
    {
        name: "Divide in proportions", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let unit = randIntRange(5, 15*difficulty)
                let num = randValue(2, 3)
                let parts = []
        
                for (let i = 0; i < num; ++ i)
                {
                    if (difficulty > 7)
                        parts.push(randIntRange(1, 15)) 
                    else if (difficulty >= 5)
                        parts.push(randIntRange(1, 10)) 
                    else 
                        parts.push(randIntRange(1, 5)) 
                }
                parts.sort((a, b) => (a|0) - (b|0))
        
                let sp_str = ""
                let parts_str = ""
                let asn_str = ""
                let all_eq = true
                let sum = 0
                for (let i = 0; i < num; ++ i) 
                {
                    all_eq = all_eq && (parts[i] == parts[0])
                    sum += parts[i]
                    if (i == 0)
                    {
                        parts_str = "" + parts[i]
                        ans_str = "" + (unit * parts[i])
                        sp_str = "<td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;</td>"
                    }
                    else 
                    {
                        parts_str = parts_str + ":" + parts[i]
                        ans_str = ans_str + ":" + (unit * parts[i])
                        sp_str = sp_str + "<td>:</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;</td>"
                    }
                }
        
                if (all_eq) 
                    continue 
            
                let problemHtml = 
                    "<table><tr>" + 
                        "<td>Divide " + (sum * unit) + " in the ratio " + parts_str + ".&nbsp;&nbsp;</td>" + 
                        sp_str +
                        "</tr></table>"
                let answerHtml = ans_str
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
]

var category_fractions = 
[
    {
        name: "Natural fraction - addition / substraction", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let denom1 = randIntRange(2, 10 + 2*difficulty)
                let nom1 = randIntRange(1, 8*denom1)

                let denom2 = randIntRange(2, 10 + 2*difficulty)
                let nom2 = randIntRange(1, 8*denom2)

                if (nom1 % denom1 == 0)
                    continue
                if (nom2 % denom2 == 0)
                    continue

                let f1 = new Fraction(nom1, denom1).simplify()
                let f2 = new Fraction(nom2, denom2).simplify()
    
                if (f1.denom == f2.denom)
                    continue

                if (difficulty < 5)
                {
                    if (lcm(f1.denom, f2.denom) >= 16)
                        continue
                }
                else if (difficulty < 7)
                {
                    if (lcm(f1.denom, f2.denom) >= 40)
                        continue
                }

                let direction = randValue('+', '-')

                if (direction == '-' && f1.asDecimal < f2.asDecimal)
                {
                    let tmp = f1 
                    f1 = f2
                    f2 = tmp
                }

                let ans = f1.addmul(f2, direction == '+' ? 1 : -1).simplify()

                let f1Str = f1.asMixedNumberHtmlTable
                let f2Str = f2.asMixedNumberHtmlTable
                let ansStr1 = ans.asMixedNumberHtmlTable
                let ansStr2 = ans.asImproperFractionHtmlTable

                let problemHtml = '<table><tr><td>' + f1Str + '</td>' +
                                '<td>&nbsp;&nbsp;' + direction + '&nbsp;&nbsp;</td><td>' + f2Str + '</td>' + 
                                '<td>' + '&nbsp;=&nbsp;' + '</td>' + 
                                '<td  class="op_b" bgcolor="#efefef">&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>' 
                
                let answerHtml = '<table><tr><td>' + ansStr1 +
                                 '</td><td>&nbsp; or  &nbsp;</td><td>' + ansStr2 + '</td></tr></table>' 

                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },

    {
        name: "Fraction - convertion between mixed and improper", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let denom = randIntRange(2, 10 + 2*difficulty)
                let nom = randIntRange(2*denom, 9*denom)

                if (nom % denom == 0)
                    continue

                let fraction = new Fraction(nom, denom)
                let mixed = fraction.asMixedNumberHtmlTable
                let improper = fraction.asImproperFractionHtmlTable

                let problemHtml = ""
                let answerHtml = ""

                if (randValue(true, false))
                {
                    problemHtml = '<table><tr><td>Write&nbsp;</td><td>' + improper + '</td><td>&nbsp; as a mixed number: &nbsp;</td>' + 
                                    '<td  class="op_b" bgcolor="#efefef">&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>' 
                    answerHtml = mixed
                }
                else
                {
                    problemHtml = '<table><tr><td>Write&nbsp;</td><td>' + mixed + '</td><td>&nbsp; as an improper fraction: &nbsp;</td>' + 
                                    '<td  class="op_b" bgcolor="#efefef">&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>' 
                    answerHtml = improper 
                }

                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
]



let used_triangle_types = []
var category_trianglesAndAngles = 
[
    {
        name: "Triangle - find unknown angle", 
        max_count: 1, // nore more than 1 occurance of this problem type ever!
        fun: function (root, ansRoot, difficulty) 
        {
            for (;;)
            {
                let alpha = randIntRange(60, 90)
                let beta = randIntRange(50, 90)
                let gamma = 180 - alpha - beta
        
                if (gamma < 40)
                    continue
        
                let alphaStr = '' + alpha + '&deg;'
                let betaStr = '' + beta + '&deg;'
                let gammaStr = '' + gamma + '&deg;'
        
                let probSvg = ""
                let answer = -1
        
                switch (randValue(1, 2, 3))
                {
                case 1: 
                    probSvg = svgTriangleByAnglesWithAngleMarks(200, 200, 195, alpha, beta, alphaStr, betaStr, '?')
                    answer = gamma 
                    break;
                case 2: 
                    probSvg = svgTriangleByAnglesWithAngleMarks(200, 200, 195, alpha, beta, alphaStr, '?', gammaStr)
                    answer = beta
                    break;
                default: 
                    probSvg = svgTriangleByAnglesWithAngleMarks(200, 200, 195, alpha, beta, '?', betaStr, gammaStr)
                    answer = alpha 
                    break;
                }
                
                root.innerHTML = 
                    "<table><tr><td valign='top'>" + 
                        "<table><tr><td>What is the value of unknown angle?</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;</td></tr></table>" + 
                        "</td><td>" + 
                        probSvg + 
                        "</td></tr></table>"
        
                ansRoot.innerHTML = '' + answer + '&deg;'
                break;
            }
        },         
    },

    {
        name: "Type of triangle", 
        max_count: 2, // nore more than 1 occurance of this problem type ever!
        fun: function (root, ansRoot, difficulty) 
        {
            for (;;)
            {
                let probSvg = ""
                let answer = ""

                let type = randValue(1, 2, 3, 4)
                if (used_triangle_types.includes(type))
                    continue
                used_triangle_types.push(type)

                switch (type)
                {
                case 1: 
                    probSvg = svgTriangleWithMarks(200, 200, 160, 160, 160, 2, 2, 2)
                    answer = 'equilateral triangle'
                    break;
                case 2:                
                    probSvg = svgTriangleWithMarks(200, 200, 140, 170, 170, 0, 2, 2)
                    answer = 'isosceles triangle'
                    break;
                case 3:
                    probSvg = svgTriangleWithMarks(200, 200, 160, 120, 170, 1, 2, 3)
                    answer = 'scalene triangle'
                    break;
                default:
                    probSvg = svgRightTriangleWithMark(200, 200, 160, 110)
                    answer = 'right triangle'
                    break;
                }
                
                root.innerHTML = 
                    "<table><tr><td valign='top'>" + 
                        "<table><tr><td>Name this triangle type</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>" + 
                        "</td><td>" + 
                        probSvg + 
                        "</td></tr></table>"
        
                ansRoot.innerHTML = answer
                break;
            }
        },         
    },

    {
        name: "Find unknown angle in the 360 deg sweep", 
        max_count: 1, 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a1 = randIntRange(40, 160)
                let a2 = randIntRange(40, 160)
                let a3 = 360 - a1 - a2

                if (a3 > 160)
                    continue
                
                let start_angle = randIntRange(0, 180)

                let fa1 = start_angle + a1
                let fa2 = fa1 + a2
                let fa3 = fa2 + a3

                let p1 = polarToDecart(75, 75, 70, fa1)
                let p2 = polarToDecart(75, 75, 70, fa2)
                let p3 = polarToDecart(75, 75, 70, fa3)

                let l1pos = polarToDecart(75, 75, 50, (fa1+start_angle)/2)
                let l2pos = polarToDecart(75, 75, 50, (fa2+fa1)/2)
                let l3pos = polarToDecart(75, 75, 50, (fa3+fa2)/2)

                let svg = '<svg width="' + 150 + '" height="' + 150 + '">' + 
                    '<line x1="75" y1="75" x2="' + p1.x + '" y2="' + p1.y + '" style="stroke:black;stroke-width:1.5" />'  + 
                    svgArcPath(75, 75, 25, start_angle, fa1) + 
                    '<g font-size="15" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle"><text x="' + l1pos.x + '" y="' + l1pos.y + '">' + a1 + '&deg;</text></g>' + 

                    '<line x1="75" y1="75" x2="' + p2.x + '" y2="' + p2.y + '" style="stroke:black;stroke-width:1.5" />'  + 
                    svgArcPath(75, 75, 30, fa1, fa2) + 
                    '<g font-size="15" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle"><text x="' + l2pos.x + '" y="' + l2pos.y + '">' + a2 + '&deg;</text></g>' + 

                    '<line x1="75" y1="75" x2="' + p3.x + '" y2="' + p3.y + '" style="stroke:black;stroke-width:1.5" />'  + 
                    svgArcPath(75, 75, 15, fa2, fa3) + 
                    '<g font-size="15" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle"><text x="' + l3pos.x + '" y="' + l3pos.y + '">' + '?' + '</text></g>' + 

                'Sorry, your browser does not support inline SVG.' + 
                '</svg>'

                let line = "<table><tr><td>Find the value of unknown angle:</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>"

                root.innerHTML = 
                    "<table>"+ 
                        "<tr>" + 
                            "<td valign='top'>" + 
                                line+ 
                            "</td>" + 
                            "<td>" + 
                                svg + 
                            "</td>" + 
                        "</tr>" + 
                        "</table>"                                

                ansRoot.innerHTML = "" + a3 + "&deg;"
                break;
            }           
        }
    }
]



let used_shape_names = []
var category_shapes = 
[
    {
        name: "Name the shape and num of axes of symmetry", 
        max_count: 2,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let shape = ngoneshapes[randInt(ngoneshapes.length)]
                if (used_shape_names.includes(shape.name))
                {
                    continue
                }
                used_shape_names.push(shape.name)
               
                let line1 = ""
                let line2 = ""
                let ans = ""
        
                if (shape.guess_name)
                {
                    line1 = "<table><tr><td>Name this shape</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>"
                    line2 = "<table><tr><td>How many axes of symmetry it has?</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>"
                    ans = shape.name + "; " + shape.symmetry_axes
                }
                else 
                {
                    line1 = "<table><tr><td>How many axes of symmetry " + shape.name + " has?</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>"
                    ans = "" + shape.symmetry_axes
                }        
        
                root.innerHTML = 
                    "<table>"+ 
                        "<tr>" + 
                            "<td valign='top'>" + 
                                line1 + line2 +                         
                            "</td>" + 
                            "<td>" + 
                                shape.svg(150, 150) + 
                            "</td>" + 
                        "</tr>" + 
                        "</table>"
        
                ansRoot.innerHTML = ans
                break;
            }
            // svgNGone
        },         
    },
]





var category_eqs = 
[
    {
        name: "Equation: Num + x = Num - Num",         
        fun: function (root, ansRoot, difficulty) // Num + x = Num - Num
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randIntRange(10, 100)
                if (a == 0)
                    continue;
                let b = randIntRange(10, 200)
                let c = randIntRange(10, 50)
        
                if (b-c-a <= 0)
                    continue
                if (b < c)
                    continue
                if (b == c)
                    continue
        
                if (randValue(true, false))
                    root.innerHTML = a + " + " + name + " = " + b + " - " + c + ". &nbsp;&nbsp; What is " + name + "?"
                else
                    root.innerHTML =  name + " + " + a + " = " + b + " - " + c + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name +" = " + (b-c-a)
                break;
            }
        },         
    },
    {
        name: "Equation: Num - x = Num + Num", 
        fun: function (root, ansRoot, difficulty) // Num - x = Num + Num
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randIntRange(10, 100)
                if (a == 0)
                    continue;
                let b = randIntRange(10, 200)
                let c = randIntRange(10, 50)
                if (a -b -c <= 0)
                    continue
                if (b == c)
                    continue

                root.innerHTML = a + " - " + name + " = " + b + " + " + c + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name +" = " + (a-b-c)
                break;
            }
        },         
    },
    {
        name: "Equation: Float + x = Float", 
        fun: function (root, ansRoot, difficulty) // Float + x = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(4, 20, 2)
                if (Math.abs(a) < 0.0001)
                    continue
                let b = randFixFloat(1, 20, 2)
        
                if (b - a <= 1.0)
                    continue
        
                if (randValue(true, false))
                    root.innerHTML = formatFloatUnlessInt(a, 2) + " + " + name + " = " + formatFloatUnlessInt(b, 2) + ". &nbsp;&nbsp; What is " + name + "?"
                else
                    root.innerHTML = name + " + " + formatFloatUnlessInt(a, 2) + " = " + formatFloatUnlessInt(b, 2) + ". &nbsp;&nbsp; What is " + name + "?"
        
                ansRoot.innerHTML = name + " = " + formatFloatUnlessInt(b - a, 2)
                break;
            }
        }
        ,         
    },
    {
        name: "Equation: Float* x = Float", 
        fun: function (root, ansRoot, difficulty) // Float* x = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(1, 10, 0)
                let b = (randInt(50)) * a        
                let c = (randInt(20))                
                b -= c
                if (b <= 2)
                    continue
                if (Math.abs(a) < 0.1)
                    continue;
                if (Math.abs(a) == 1)
                    continue;
                root.innerHTML = formatFloatUnlessInt(a, 1) + name + " = " + formatFloatUnlessInt(b, 1) + " + " +  formatFloatUnlessInt(c, 1) + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name + " = " + formatFloatUnlessInt((b + c) / a, 0)
                break;
            }
        },         
    },
    {
        name: "Equation: Int* x + Float = Float", 
        fun: function (root, ansRoot, difficulty) // Int* x + Float = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(1, 10, 0)
                let b = randIntRange(2, 50) * a
                let c = randFixFloat(1, 30, 1)
                if (Math.abs(a) < 0.1)
                    continue;
                if (Math.abs(a) == 1)
                    continue;
                root.innerHTML = formatFloatUnlessInt(a, 1) + name + " + " + c + " = " + formatFloatUnlessInt(b + c, 1) + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name + " = " + formatFloatUnlessInt(b / a, 0)
                break;
            }
        },         
    },
    {
        name: "Equation: Int* x - Float = Float", 
        fun: function (root, ansRoot, difficulty) // Int* x - Float = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(1, 10, 0)
                let b = (randInt(50)) * a
                let c = randFixFloat(1, 30, 1)
                if (Math.abs(a) < 0.1)
                    continue;
                if (Math.abs(a) == 1)
                    continue;
                if (b - c < 1)
                    continue
                root.innerHTML = formatFloatUnlessInt(a, 1) + name + " - " + c + " = " + formatFloatUnlessInt(b - c, 1) + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name + " = " + formatFloatUnlessInt(b / a, 0)
                break;
            }
        }
        ,         
    },

]

var category_primes = 
[
    {
        name: "Primes in range",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let from = randIntRange(1, 90)
                let to = from + 5 + difficulty
                let primes = primesInRange(from, to)
                if (primes.length == 0)
                    continue

                root.innerHTML = "Make a list of prime numbers between " + from + " and " + to
                ansRoot.innerHTML = primes.map(x => '' + x).reduce((a, x) => a + ' ' + x)
                break;
            }
        },         
    },
]

var category_lcmgcd = 
[
    {
        name: "LCM",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numPrimes = difficulty >= 7 ? 5 : 4
                let commonPrimes = randomNonUniqSelection(primesInRange(1, difficulty >= 7 ? 20 : 10), numPrimes)

                let numNumbers = randValue(2, 3)
                let numbers = []

                console.log("\t\tLCM, common primes: ", commonPrimes)

                for (let iter = 0; numbers.length < numNumbers && iter < 10; ++ iter)
                {
                    let iterPrimes = randomUniqSelection(commonPrimes, randIntRange(1, numPrimes-1))
                    let num = iterPrimes.reduce((a, b) => a * b, 1)
                    if (!numbers.includes(num))
                    {
                        console.log("\t\tLCM, iter primes: ", iterPrimes)
                        numbers.push(num)
                    } 
                }
                if (numbers.length != numNumbers)
                    continue

                let ans = numNumbers == 2 ? lcm(numbers[0], numbers[1]) : lcm3(numbers[0], numbers[1], numbers[2]) 
                if (ans > 1500)
                    continue 
                
                // check that LCM is not equal to any of the numbers
                if (numbers.map(x => x == ans).reduce((acc, b) => (acc || b), false))
                    continue

                numbers.sort((a, b) => (a|0) - (b|0))
    
                if (numbers[0] == 2)
                    continue

                let common = numNumbers == 2 ? gcd(numbers[0], numbers[1]) : gcd3(numbers[0], numbers[1], numbers[2]) 
                if (common == 1)
                    continue


                root.innerHTML = "Find LCM of " + numbers.map(x => '' + x).reduce((a, b) => a + ',&nbsp; ' + b)
                ansRoot.innerHTML = ans
                break;
            }
        },         
    },
    {
        name: "GCD",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numPrimes = difficulty >= 7 ? 5 : 4
                let commonPrimes = randomNonUniqSelection(primesInRange(1, difficulty >= 7 ? 20 : 15), numPrimes)

                let numNumbers = randValue(2, 3)
                let numbers = []

                console.log("\t\tGCD, common primes: ", commonPrimes)

                for (let iter = 0; numbers.length < numNumbers && iter < 10; ++ iter)
                {
                    let iterPrimes = randomUniqSelection(commonPrimes, numPrimes-2)
                    let num = iterPrimes.reduce((a, b) => a * b, 1)
                    if (!numbers.includes(num))
                    {
                        console.log("\t\tGCD, iter primes: ", iterPrimes)
                        numbers.push(num)
                    } 
                }
                if (numbers.length != numNumbers)
                    continue

                let common = numNumbers == 2 ? gcd(numbers[0], numbers[1]) : gcd3(numbers[0], numbers[1], numbers[2]) 
                if (common == 1 || common == 2)
                    continue
                if (numbers.includes(common))
                    continue
    
                numbers.sort((a, b) => (a|0) - (b|0))

                root.innerHTML = "Find HCF of " + numbers.map(x => '' + x).reduce((a, b) => a + ',&nbsp; ' + b)  + "<br><small style='color:#666'>(HCF is also known as GCD)</small>"
                ansRoot.innerHTML = common
                break;
            }
        },         
    },
]

var category_percents = 
[
    {
        name: "Increase Money PCT", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let pct = difficulty >= 7 ? randIntRange(5, 41) : randIntRange(1, 9) * 5
                let amount = randIntRange(5, 15) * 100

                root.innerHTML = "Increase &#8364;" + amount + " by " + pct + "&#37;"
                ansRoot.innerHTML = "&#8364;" + (amount + amount*pct/100)
                break;
            }
        },
    },
    {
        name: "Decrease Money PCT",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let pct = difficulty >= 7 ? randIntRange(5, 41) : randIntRange(1, 9) * 5
                let amount = randIntRange(5, 15) * 100

                root.innerHTML = "Decrease &#8364;" + amount + " by " + pct + "&#37;"
                ansRoot.innerHTML = "&#8364;" + (amount - amount*pct/100)
                break;
            }
        },         
    },
]

// returns hash map, where key is the category name 
// and value is the list of problems in the category
function getGeneratorsRaw()
{
    let generators = []

    let names = Object.keys( window ).filter(x => x.startsWith("category_"))

    for (let name of names)
    {
        let category = { name: name, data: eval(name) }
        assignCdfFlatWeights(category.data)

        generators.push(category)
    }
    assignCdfFlatWeights(generators)

    return generators
}

function createProbGenerator ()
{
    let generators = getGeneratorsRaw()

    return function() 
    {
        for (;;)
        {
            let category = weightedRandomValue(generators)
            let problem = weightedRandomValue(category.data)

            console.log("CAT: " + category.name + ", PROB: " + problem.name)

            if (Object.keys(problem).includes("max_count"))
            {
                if (problem.max_count <= 0)
                {
                    category.data = category.data.filter(x => x != problem)
                    if (category.data.length > 0)
                    {
                        normalizeWeights(category.data)
	                    calculateCdfRanges(category.data)
                    }
                    else 
                    {
                        generators = generators.filter(x => x != category)
                        normalizeWeights(generators)
	                    calculateCdfRanges(generators)
                    }
                    console.log("Max use count reached on " + category.name + ", problem " + problem.name + " - retrying")
                    continue
                }
                problem.max_count -= 1
            }

            // reduce probability of this category showing up again untill all others are used too
            scaleCdfWeight(category, 0.1, generators)
            // same for this particular problem type
            scaleCdfWeight(problem, 0.1, category.data)
            
            return problem 
        }
    }
}