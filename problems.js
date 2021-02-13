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
        '<table border=1>' + 
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
        name: "prob_rounding_one", 
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
        name: "prob_addsub_int", 
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
        name: "prob_addsub_fract",
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


var category_advEval = 
[
    {
        name: "prob_advEval_OpAPlusBClDivC", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let c = randIntRange(5, 30)
                let aPlusB = c * randIntRange(5, 10)
                let a = randIntRange(1, aPlusB)
                let b = aPlusB - a                    
        
                let problemHtml = "(" + a + " + " + b + ") &#247; " + c + " = "
                let answerHtml = Math.round((a + b ) / c)
        
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }            
        },         
    },
    {
        name: "prob_advEval_Pow2MinusPow2", 
        fun: function (root, ansRoot, difficulty)
        {
        
            for (;;)
            {
                let a = randIntRange(4, 20)
                let b = randIntRange(4, 20)
                if (a <= b)
                    continue
        
                let problemHtml = "" + a + "&#178; - " + b + "&#178;" + " = "
                let answerHtml = Math.pow(a, 2) - Math.pow(b, 2)
        
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        
        },         
    },
    {
        name: "prob_advEval_OpATimesBClMinusC",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(10, 30)
                let b = randIntRange(2, 10)
                let c = randIntRange(5, 30)
                
                if (a * b <= c)
                    continue
        
                let problemHtml = "(" + a + " &#215; " + b + ") - " + c + " = "
                let answerHtml = Math.round(a * b - c)
        
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }            
        },         
    },
]



var category_divmul = 
[
    {
        name: "prob_divmul_div", 
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
        name: "prob_divmul_divMultOfTen", 
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
        name: "prob_divmul_mulNoFractions", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let a = randIntRange(20 * difficulty, 100 * difficulty)
                let b = randIntRange(3, 10 * difficulty)

                let problemHtml = generateMultiplicationHtml("" + a, "" + b)
                let answerHtml = a * b
                root.innerHTML = problemHtml
                ansRoot.innerHTML = answerHtml
                break;
            }
        },         
    },
    {
        name: "prob_divmul_mulWithFractions", 
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
        name: "prob_divmul_mulWithFractions2", 
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

var category_fractions = 
[
    {
        name: "prob_fractions_divideInProportion", 
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



let used_triangle_types = []
var category_triangles = 
[
    {
        name: "prob_triangles_sumOfAngles", 
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
        name: "prob_triangles_triangle_type", 
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
]



let used_shape_names = []
var category_shapes = 
[
    {
        name: "prob_shapes_shapeProps", 
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
        name: "prob_eqs_prob1a",         
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
        name: "prob_eqs_prob1b", 
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
        name: "prob_eqs_prob2", 
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
        name: "prob_eqs_prob3", 
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
        name: "prob_eqs_prob4", 
        fun: function (root, ansRoot, difficulty) // Int* x + Float = Float
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
                root.innerHTML = formatFloatUnlessInt(a, 1) + name + " + " + c + " = " + formatFloatUnlessInt(b + c, 1) + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name + " = " + formatFloatUnlessInt(b / a, 0)
                break;
            }
        },         
    },
    {
        name: "prob_eqs_prob5", 
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
        name: "prob_primes_prob1a",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let from = randIntRange(1, 10) * 10 + randValue(0, 5)
                let to = from + 10 + difficulty
                root.innerHTML = "Make a list of prime numbers between " + from + " and " + to
                ansRoot.innerHTML = primes_in_range(from, to).map(x => '' + x).reduce((a, x) => a + ' ' + x)
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