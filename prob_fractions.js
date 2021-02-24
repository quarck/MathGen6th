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

                if (f1.denom == 1)
                    continue
                if (f2.denom == 1)
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
                
                let answerHtml = '<table><tr><td>' + ansStr1 + '</td>' + 
                                 ((ansStr1 != ansStr2) ? '<td>&nbsp; or  &nbsp;</td><td>' + ansStr2 + '</td>' : '') +
                                  '</tr></table>' 

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

                let fraction = new Fraction(nom, denom).simplify()
                let mixed = fraction.asMixedNumberHtmlTable
                let improper = fraction.asImproperFractionHtmlTable

                if (fraction.denom == 1)
                    continue

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

    {
        name: "Fraction - compare", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let denom1 = randIntRange(2, 10 + 2*difficulty)
                let nom1 = randIntRange(1, denom1)

                let denom2 = randIntRange(2, 10 + 2*difficulty)
                let nom2 = randIntRange(1, denom2)
                
                let fraction1 = new Fraction(nom1, denom1).simplify()
                let fraction2 = new Fraction(nom2, denom2).simplify()
                if (fraction1.denom == 1)
                    continue
                if (fraction2.denom == 1)
                    continue

                if (fraction1.nom == fraction2.nom)
                    continue
                if (fraction1.denom == fraction2.denom)
                    continue
                    
                let direction = randValue('>', '<')

                root.innerHTML = '<table><tr>' +
                        '<td>' + fraction1.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp;' + direction + '&nbsp;</td>' + 
                        '<td>' + fraction2.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp;&nbsp;&nbsp; true or false ? (circle)</td>'
                        '</tr></table>' 
                ansRoot.innerHTML = (direction == '>' ? (fraction1.asDecimal > fraction2.asDecimal ) : (fraction1.asDecimal < fraction2.asDecimal ) ) ? 'true' : 'false'
                break;
            }
        },         
    },

    {
        name: "Fraction - multiply", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let denom1 = randIntRange(2, 10 + 2*difficulty)
                let nom1 = randIntRange(1, 3*denom1)

                let denom2 = randIntRange(2, 10 + 2*difficulty)
                let nom2 = randIntRange(1, 3*denom2)
                
                let fraction1 = new Fraction(nom1, denom1).simplify()
                let fraction2 = new Fraction(nom2, denom2).simplify()

                if (fraction1.denom == 1)
                    continue
                if (fraction2.denom == 1)
                    continue

                if (gcd(fraction1.denom, fraction2.nom) == 1 && gcd(fraction1.nom, fraction2.denom) == 1) // at least something has to be common
                    continue

                if (fraction1.denom == fraction2.nom || fraction2.denom == fraction1.nom) // too simple 
                    continue

                root.innerHTML = '<table><tr>' +
                        '<td>' + fraction1.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp;&times;&nbsp;</td>' + 
                        '<td>' + fraction2.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp;= </td>'
                        '</tr></table>' 
                let ansValue = fraction1.multiply(fraction2).simplify()

                if (ansValue.denom == 1)
                    continue

                if (ansValue.nom > ansValue.denom)
                {
                    ansRoot.innerHTML = '<table><tr>' +
                            '<td>' + ansValue.asImproperFractionHtmlTable + '</td>' + 
                            '<td>&nbsp; or &nbsp;</td>' + 
                            '<td>' + ansValue.asMixedNumberHtmlTable + '</td>' + 
                            '</tr></table>' 
                }
                else 
                {
                    ansRoot.innerHTML =  ansValue.asImproperFractionHtmlTable
                }
                break;
            }
        },         
    },

    {
        name: "Fraction - divide", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let denom1 = randIntRange(2, 10 + 2*difficulty)
                let nom1 = randIntRange(1, 3*denom1)

                let denom2 = randIntRange(2, 10 + 2*difficulty)
                let nom2 = randIntRange(1, 3*denom2)
                
                let fraction1 = new Fraction(nom1, denom1).simplify()
                let fraction2 = new Fraction(nom2, denom2).simplify()

                if (fraction1.denom == 1)
                    continue
                if (fraction2.denom == 1)
                    continue

                if (gcd(fraction1.denom, fraction2.denom) == 1 && gcd(fraction1.nom, fraction2.nom) == 1) // at least something has to be common
                    continue

                if (fraction1.denom == fraction2.denom || fraction2.nom == fraction1.nom) // too simple 
                    continue


                root.innerHTML = '<table><tr>' +
                        '<td>' + fraction1.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp;&#247;&nbsp;</td>' + 
                        '<td>' + fraction2.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp;= </td>'
                        '</tr></table>' 
                let ansValue = fraction1.divide(fraction2).simplify()
                if (ansValue.denom == 1)
                    continue

                if (ansValue.nom > ansValue.denom)
                {
                    ansRoot.innerHTML = '<table><tr>' +
                        '<td>' + ansValue.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp; or &nbsp;</td>' + 
                        '<td>' + ansValue.asMixedNumberHtmlTable + '</td>' + 
                        '</tr></table>' 
                }
                else 
                {
                    ansRoot.innerHTML =  ansValue.asImproperFractionHtmlTable
                }
                break;
            }
        },         
    },

    {
        name: "Fraction - simplify", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let denom1 = randIntRange(2, 10 + 2*difficulty)
                let nom1 = randIntRange(1, denom1)
                let num = randIntRange(2, 10)

                if (nom1 % denom1  == 0)
                    continue

                let fraction1 = new Fraction(nom1 * num, denom1 * num)


                root.innerHTML = '<table><tr>' +
                        '<td>Simplify: &nbsp;&nbsp;</td>' + 
                        '<td>' + fraction1.asImproperFractionHtmlTable + '</td>' + 
                        '<td>&nbsp;= </td>'
                        '</tr></table>' 

                ansRoot.innerHTML =  fraction1.simplify().asImproperFractionHtmlTable
                break;
            }
        },         
    },
]

