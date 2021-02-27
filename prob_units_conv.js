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



var category_units_conv = 
[
    {
        name: "Plain units conversion",
        fun: function (root, ansRoot, difficulty) 
        {
            for (;;)
            {
                let pair = unit_conv_pairs.pickRandom()
                if (pair.min_difficulty && pair.min_difficulty > difficulty)
                {
                    continue
                }

                let from = pair.f
                let to = pair.t 

                let useWords = difficulty < 5 ? true : (difficulty < 7 ? randValue(true, false): false)

                if (from.scale > to.scale) // for ex: kg to g
                {
                    let factor = from.scale / to.scale 
                    let digits = (Math.log(factor + 1)/Math.log(10)).toInt()

                    let dst_val = randIntRange((factor/10).toInt(), (factor <= 10 ? 90 : 10)*factor)
                    let src_val = dst_val / factor 

                    switch (randValue(0, 1, 2))
                    {
                        case 0: // as it is 
                        {
                            if (useWords)
                                root.innerHTML = "Write " + src_val.formatFlex(digits) + "&nbsp;" + from.code + " as " + to.name + ". ___________" + to.code
                            else
                                root.innerHTML = src_val.formatFlex(digits) + "&nbsp;" + from.code + "&nbsp; = &nbsp;___________&nbsp;" + to.code
                            break;
                        }

                        case 1: // split sub-unit and unit
                        {
                            let src_intPart = Math.floor(dst_val / factor)
                            let src_fract = dst_val % factor 

                            if (useWords)
                                root.innerHTML = "Write " +
                                                 src_intPart + "&nbsp;" + from.code  +  "&nbsp;&nbsp;" + 
                                                 src_fract  + "&nbsp;" + to.code  + "&nbsp; as " + to.name + ". ___________" + to.code
                            else
                                root.innerHTML = src_intPart + "&nbsp;" + from.code  + "&nbsp;&nbsp;" + 
                                                  src_fract  + "&nbsp;" + to.code  + "&nbsp; = &nbsp;___________&nbsp;" + to.code
                            break;
                        }

                        default: // represent src as a fraction
                        {
                            // re-do 
                            for (;;)
                            {
                                if (difficulty <= 7)
                                    dst_val = randIntRange(1, 10) * factor + (factor/10).toInt() * randIntRange(1, 10)
                                else 
                                    dst_val = randIntRange(1, 10) * factor + (factor/100 * randIntRange(1, 100)).toInt()
                                src_val = new Fraction(dst_val, factor).simplify()
                                if (src_val.denom == 100 || src_val.nom == 0)
                                    continue
                                break
                            }

                            if (useWords)
                                root.innerHTML = "<table><tr><td>Write </td><td>" + src_val.asMixedNumberHtmlTable + "</td><td>&nbsp;" + from.code + " as " + to.name + ". ___________" + to.code + "</td></tr></table>"
                            else
                                root.innerHTML = "<table><tr><td>Write </td><td>" + src_val.asMixedNumberHtmlTable + "</td><td>&nbsp;" + from.code + "&nbsp; = &nbsp;___________&nbsp;" + to.code + "</td></tr></table>"
                            break;
                        }
                    }

                    ansRoot.innerHTML = dst_val.formatFlex(digits) + ' ' + to.code 
                }
                else // opposite: g to kg
                {
                    let inv_factor = to.scale / from.scale 
                    let digits = (Math.log(inv_factor + 1)/Math.log(10)).toInt()

                    let src_val = randIntRange((inv_factor/10).toInt(), (inv_factor <= 10 ? 90 : 10)*inv_factor)
                    let dst_val = src_val / inv_factor 

                    if (useWords)
                        root.innerHTML = "Write " + src_val.formatFlex(digits) + "&nbsp;" + from.code + " as " + to.name + " using a decimal point. ___________" + to.code
                    else 
                        root.innerHTML = src_val.formatFlex(digits) + "&nbsp;" + from.code + "&nbsp; = &nbsp;___________&nbsp;" + to.code

                    ansRoot.innerHTML = dst_val.formatFlex(digits) + ' ' + to.code 
                }

                break;
            }
        },         
    },
]