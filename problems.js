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

/*
 * IMPORTANT: 
 * Every problem name should be of the following format: 
 * prob_categoryName_problemName
 * there should be only two underscores in the whole name
 * 
 * Each problem generator accepts three argument: 
 * root - div element where the problem text should be inserted into
 * ansRoot - div element where the answer text should be inserted into
 */

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

/*Note: a and b must be strings, so we don't have to worry about
 caring how many fraction digits to keep*/
function generateMultiplicationHtml(a, b)
{
    let html = 
        '<table class="op_a">' + 
            '<tr>' + 
                '<td class="op_a">&nbsp;</td><td class="op_a" align="end">' + a + '</td>' +
            '</tr>' + 
            '<tr>' + 
                '<td class="op_a" align="end">&#215;</td><td class="op_b" align="end">' + b + '</td>' + 
            '</tr>'
    for (let i = 0; i < b.length; ++ i)
        html += '<tr><td class="op_a">&nbsp;</td></tr>'
    
    html += '</table>'

    return html
}



/*
function prob_xxx_yyy(root, ansRoot)
{
    for (;;)
    {
        // generate here

        let problemHtml = "This is a template problem"
        let answerHtml = "This is an answer for a template problem"

        root.innerHTML = problemHtml
        ansRoot.innerHTML = answerHtml
        break;
    }
} */

function prob_rounding_one(root, ansRoot)
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
}

function prob_addsub_int(root, ansRoot)
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
}

function prob_addsub_fract(root, ansRoot)
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
}

function prob_advEval_OpAPlusBClDivC(root, ansRoot)
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
}

function prob_advEval_OpATimesBClMinusC(root, ansRoot)
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
}

function prob_divmul_div(root, ansRoot)
{
    for (;;)
    {
        let a = randIntRange(5, 10)
        let b = randIntRange(100, 300)
        let c = a * b                
        let problemHtml = '<table><tr><td class="div_left">' + formatInt(a) + '</td><td class="div_right">' + formatInt(c) + '</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>'
        let answerHtml = formatInt(b)
        root.innerHTML = problemHtml
        ansRoot.innerHTML = answerHtml
        break;
    }
}

function prob_divmul_divMultOfTen(root, ansRoot)
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
}

function prob_divmul_mulNoFractions(root, ansRoot)
{
    for (;;)
    {
        let a = randIntRange(100, 300)
        let b = randIntRange(2, 10)
        let problemHtml = generateMultiplicationHtml("" + a, "" + b)
        let answerHtml = a * b
        root.innerHTML = problemHtml
        ansRoot.innerHTML = answerHtml
        break;
    }
}

function prob_divmul_mulWithFractions(root, ansRoot)
{
    for (;;)
    {
        let a = randIntRange(100, 300)
        let b = randIntRange(3, 10)

        if (a % 10 == 0)
            continue
        a /= 10.0

        let problemHtml = generateMultiplicationHtml("" + a, "" + b)
        let answerHtml = formatFloat(a * b, 1)
        root.innerHTML = problemHtml
        ansRoot.innerHTML = answerHtml
        break;
    }
}

function prob_fractions_divideInProportion(root, ansRoot)
{
    for (;;)
    {
        let unit = randIntRange(5, 15)
        let num = randValue(2, 3)
        let parts = []

        for (let i = 0; i < num; ++ i)
        {
            parts.push(randIntRange(1, 5))                    
        }
        parts.sort()

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
}

function prob_triangles_sumOfAngles(root, ansRoot) 
{
    for (;;)
    {
        let alpha = randIntRange(60, 90)
        let beta = randIntRange(50, 60)
        let answer = 180 - alpha - beta

        let alphaStr = '' + alpha + '&deg;'
        let betaStr = '' + beta + '&deg;'


        
        let problemHtml = 
            "<table><tr><td valign='top'>" + 
                "<table><tr><td>What is the value of unknown angle?</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;</td></tr></table>" + 
                "</td><td>" + 
                svgTriangleByAnglesWithAngleMarks(200, 200, 195, alpha, beta, alphaStr, betaStr, '?') + 
                "</td></tr></table>"

        let answerHtml = '' + answer + '&deg;'
        root.innerHTML = problemHtml
        ansRoot.innerHTML = answerHtml
        break;
    }

}


// Num + x = Num - Num
function prob_eqs_prob1a(root, ansRoot)
{
    for (;;)
    {
        let name = randomName('x', 'y')
        let a = randInt(100)
        if (a == 0)
            continue;
        let b = randInt(200)
        let c = randInt(50)

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
}

// Num - x = Num + Num
function prob_eqs_prob1b(root, ansRoot)
{
    for (;;)
    {
        let name = randomName('x', 'y')
        let a = randInt(100)
        if (a == 0)
            continue;
        let b = randInt(200)
        let c = randInt(50)
        if (a -b -c <= 0)
            continue
        if (b == c)
            continue

        root.innerHTML = a + " - " + name + " = " + b + " + " + c + ". &nbsp;&nbsp; What is " + name + "?"
        ansRoot.innerHTML = name +" = " + (a-b-c)
        break;
    }
}

// Float + x = Float
function prob_eqs_prob2(root, ansRoot)
{
    for (;;)
    {
        let name = randomName('x', 'y')
        let a = randFixFloat(1, 20, 2)
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

// Fl* x = Fl
function prob_eqs_prob3(root, ansRoot)
{
    for (;;)
    {
        let name = randomName('x', 'y')
        let a = randFixFloat(1, 10, 1)
        let b = (randInt(50)) * a
        if (Math.abs(a) < 0.1)
            continue;
        if (Math.abs(a) == 1)
            continue;
        root.innerHTML = formatFloatUnlessInt(a, 1) + name + " = " + formatFloatUnlessInt(b, 1) + ". &nbsp;&nbsp; What is " + name + "?"
        ansRoot.innerHTML = name + " = " + formatFloatUnlessInt(b / a, 0)
        break;
    }
}

// Fl* x + Fl= Fl
function prob_eqs_prob4(root, ansRoot)
{
    for (;;)
    {
        let name = randomName('x', 'y')
        let a = randFixFloat(1, 10, 1)
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
}

// Fl* x - Fl= Fl
function prob_eqs_prob5(root, ansRoot)
{
    for (;;)
    {
        let name = randomName('x', 'y')
        let a = randFixFloat(1, 10, 1)
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






//

/*

function prob_xxx_yyy1(root, ansRoot)
{
    for (;;)
    {
        // generate here

        let problemHtml = "This is a template problem"
        let answerHtml = "This is an answer for a template problem"

        root.innerHTML = problemHtml
        ansRoot.innerHTML = answerHtml
        break;
    }
}

function prob_xxx_yyy2(root, ansRoot)
{
    for (;;)
    {
        // generate here

        let problemHtml = "This is a template problem"
        let answerHtml = "This is an answer for a template problem"

        root.innerHTML = problemHtml
        ansRoot.innerHTML = answerHtml
        break;
    }
}


*/

// returns hash map, where key is the category name 
// and value is the list of problems in the category
function getGenerators()
{
    let generators = {}

    let names = Object.keys( window ).filter(x => x.startsWith("prob_"))
    for (let name of names)
    {
        let parts = name.split('_')
        if (parts.length != 3)
        {
            console.error("name " + name + " is not a valid function name for generator")
            continue
        }

        let cat = parts[1]
        let probName = parts[2] // don't really need that one!, but just for consistency

        if (!generators[cat])
        {
            generators[cat] = []
        }

        generators[cat].push({
            fun: eval("(root, ansRoot) => " + name + "(root, ansRoot)"), 
            name: name
        })
    }

    return generators
}

function getMaxProbEntries()
{
    return {'prob_triangles_sumOfAngles': 2 }
}