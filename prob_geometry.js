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
                    answer = 'right angle triangle'
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

                let svg = new SVG(150, 150)
                svg.stroke(0, 0, 0, 1.5)
                svg.line(75, 75, p1.x, p1.y)
                svg.line(75, 75, p2.x, p2.y)
                svg.line(75, 75, p3.x, p3.y)

                svg.arc(75, 75, 25, start_angle, fa1)
                svg.arc(75, 75, 30, fa1, fa2)
                svg.arc(75, 75, 15, fa2, fa3)

                svg.text(l1pos.x, l1pos.y, a1 + "&deg;")
                svg.text(l2pos.x, l2pos.y, a2+ "&deg;")
                svg.text(l3pos.x, l3pos.y, '?')                

                let line = "<table><tr><td>Find the value of unknown angle:</td><td class='op_b' bgcolor='#efefef'>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>"

                root.innerHTML = 
                    "<table>"+ 
                        "<tr>" + 
                            "<td valign='top'>" + 
                                line+ 
                            "</td>" + 
                            "<td>" + 
                                svg.html + 
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


var category_areaAndPremimeter = 
[
    {
        name: "Find an area of a rectangle with possible rectangular cuts", 
        max_count: 2,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let shape = null
                let answer = null 
                let width = randIntRange(4, 30)
                let height = randIntRange(4, 30)
                let unit = ['cm', 'm', 'mm'].pickRandom()

                if (width / height > 2 || height / width > 2)
                {
                    continue
                }

                let scale = (width > height) ? (100 / width ) : (100 / height )

                switch ([0, 1, 2, 3].pickRandom())
                {
                case 0: // primitive, no cuts 
                {
                    let svg = new SVG(190, 150)
                    shape = svg.squareWithLabels(1, 30, width*scale, height*scale, width + unit, height + unit).html
                    answer = '' + (width * height) + unit + '<sup>2</sup>'
                    break;
                }
                case 1: // one btm cut
                {
                    let svg = new SVG(230, 200)
                                        
                    for (;;)
                    {
                        let cw = randIntRange(1, width-1)
                        let ch = randIntRange(1, height-1)
                        if (cw / ch > 2 || ch / cw > 2)
                            continue

                        if (width / cw > 5 || height / ch > 5)
                            continue

                        if (width - cw < width / 4 || height -ch < height / 4)
                            continue

                        if (randValue(true, false))
                        {
                            shape = svg.squareWithLeftCutAndLabels(60, 30, width*scale, height*scale,
                                cw*scale, ch* scale, width + unit, height + unit, cw + unit, (height - ch) + unit).html
                        }
                        else 
                        {
                            shape = svg.squareWithRightCutAndLabels(60, 30, width*scale, height*scale,
                                cw*scale, ch* scale, width + unit, height + unit, cw + unit, (height - ch) + unit).html
                        }

                        answer = '' + (width * height - cw * ch) + unit + '<sup>2</sup>'
                        break
                    }
                    break;
                }
                case 2: // two btm cuts
                {
                    let svg = new SVG(230, 200)
                    unit = '' // with units it is going to be a mess 
                                        
                    for (;;)
                    {
                        let cw1 = randIntRange(1, width-1)
                        let ch1 = randIntRange(1, height-1)
                        let cw2 = randIntRange(1, width-1)
                        let ch2 = randIntRange(1, height-1)
                        if (cw1 / ch1 > 2 || ch1 / cw1 > 2 ||  cw2 / ch2 > 2 || ch2 / cw2 > 2)
                            continue

                        if (width - cw1 - cw2 < width /3)
                            continue

                        if (width / cw1 > 5 || height / ch1 > 5)
                            continue
                        if (width / cw2 > 5 || height / ch2 > 5)
                            continue

                        shape = svg.squareWithLeftAndRightCutsAndLabels(60, 30, width*scale, height*scale,                            
                                cw1*scale, ch1*scale,
                                cw2*scale, ch2*scale,
                                width + unit,       // xlabel 
                                (height-ch1) + unit,    // ylabelExRCut
                                (width - cw1 - cw2) + unit, // wcutWExLeftRightLabel, 
                                ch1 + unit, // hCutLeftLabel,
                                cw2 + unit,// wcutRightLabel, 
                                (height - ch2) + unit // hExCutRightLabel                                
                                ).html

                        answer = '' + (width * height - cw1 * ch1 - cw2 * ch2)
                        break
                    }
                    break;
                }
                default: // one top, one btm cuts
                {
                    let svg = new SVG(230, 200)
                    unit = '' // with units it is going to be a mess 
                                        
                    for (;;)
                    {
                        let cw1 = randIntRange(1, width-1)
                        let ch1 = randIntRange(1, height-1)
                        let cw2 = randIntRange(1, width-1)
                        let ch2 = randIntRange(1, height-1)
                        if (cw1 / ch1 > 2 || ch1 / cw1 > 2 ||  cw2 / ch2 > 2 || ch2 / cw2 > 2)
                            continue

                        if (width - cw1 - cw2 < width /3)
                            continue
                        if (height - ch1 - ch2 < height /3)
                            continue

                        if (width / cw1 > 5 || height / ch1 > 5)
                            continue
                        if (width / cw2 > 5 || height / ch2 > 5)
                            continue

                        shape = svg.squareWithLeftAndRightTopCutsAndLabels(60, 30, width*scale, height*scale,                            
                                cw1*scale, ch1*scale,
                                cw2*scale, ch2*scale,
                                (width - cw2) + unit,       // xlabel 

                                (height - ch1) + unit, // ylabelExLHCut, 
                                cw2 + unit, // withMinusRCut,
                                ch1 + unit,// hCutLeftLabel,
                                cw1 + unit,// wCutLeftLabel,
                                ch2 + unit// hCutRightLabel
                                ).html

                        answer = '' + (width * height - cw1 * ch1 - cw2 * ch2)
                        break
                    }
                    break;
                }
                }

                if (!shape || !answer)
                {
                    continue
                }
        
                root.innerHTML = 
                    "<table>"+ 
                        "<tr>" + 
                            "<td valign='top'>" + 
                                'What is the area of this shape?' + 
                            "</td>" + 
                        '</tr><tr>' + 
                            "<td>" + 
                                shape + 
                            "</td>" + 
                        "</tr>" + 
                        "</table>"
        
                ansRoot.innerHTML = answer
                break;
            }
            // svgNGone
        },         
    },

    {
        name: "Find perimeter of a rectangle with possible rectangular cuts", 
        max_count: 2,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let shape = null
                let answer = null 
                let width = randIntRange(4, 30)
                let height = randIntRange(4, 30)
                let unit = ['cm', 'm', 'mm'].pickRandom()

                if (width / height > 2 || height / width > 2)
                {
                    continue
                }

                let scale = (width > height) ? (100 / width ) : (100 / height )

                switch ([0, 1, 2, 3].pickRandom())
                {
                case 0: // primitive, no cuts 
                {
                    let svg = new SVG(190, 150)
                    shape = svg.squareWithLabels(1, 30, width*scale, height*scale, width + unit, height + unit).html
                    answer = '' + (2*width + 2*height) + unit 
                    break;
                }
                case 1: // one btm cut
                {
                    let svg = new SVG(230, 200)
                                        
                    for (;;)
                    {
                        let cw = randIntRange(1, width-1)
                        let ch = randIntRange(1, height-1)
                        if (cw / ch > 2 || ch / cw > 2)
                            continue

                        if (width / cw > 5 || height / ch > 5)
                            continue

                        if (width - cw < width / 4 || height -ch < height / 4)
                            continue

                        if (randValue(true, false))
                        {
                            shape = svg.squareWithLeftCutAndLabels(60, 30, width*scale, height*scale,
                                cw*scale, ch* scale, width + unit, height + unit, cw + unit, (height - ch) + unit).html
                        }
                        else 
                        {
                            shape = svg.squareWithRightCutAndLabels(60, 30, width*scale, height*scale,
                                cw*scale, ch* scale, width + unit, height + unit, cw + unit, (height - ch) + unit).html
                        }

                        answer = '' + (2*width + 2*height) + unit 
                        break
                    }
                    break;
                }
                case 2: // two btm cuts
                {
                    let svg = new SVG(230, 200)
                    unit = '' // with units it is going to be a mess 
                                        
                    for (;;)
                    {
                        let cw1 = randIntRange(1, width-1)
                        let ch1 = randIntRange(1, height-1)
                        let cw2 = randIntRange(1, width-1)
                        let ch2 = randIntRange(1, height-1)
                        if (cw1 / ch1 > 2 || ch1 / cw1 > 2 ||  cw2 / ch2 > 2 || ch2 / cw2 > 2)
                            continue

                        if (width - cw1 - cw2 < width /3)
                            continue

                        if (width / cw1 > 5 || height / ch1 > 5)
                            continue
                        if (width / cw2 > 5 || height / ch2 > 5)
                            continue

                        shape = svg.squareWithLeftAndRightCutsAndLabels(60, 30, width*scale, height*scale,                            
                                cw1*scale, ch1*scale,
                                cw2*scale, ch2*scale,
                                width + unit,       // xlabel 
                                (height-ch1) + unit,    // ylabelExRCut
                                (width - cw1 - cw2) + unit, // wcutWExLeftRightLabel, 
                                ch1 + unit, // hCutLeftLabel,
                                cw2 + unit,// wcutRightLabel, 
                                (height - ch2) + unit // hExCutRightLabel                                
                                ).html

                                answer = '' + (2*width + 2*height) + unit 
                        break
                    }
                    break;
                }
                default: // one top, one btm cuts
                {
                    let svg = new SVG(230, 200)
                    unit = '' // with units it is going to be a mess 
                                        
                    for (;;)
                    {
                        let cw1 = randIntRange(1, width-1)
                        let ch1 = randIntRange(1, height-1)
                        let cw2 = randIntRange(1, width-1)
                        let ch2 = randIntRange(1, height-1)
                        if (cw1 / ch1 > 2 || ch1 / cw1 > 2 ||  cw2 / ch2 > 2 || ch2 / cw2 > 2)
                            continue

                        if (width - cw1 - cw2 < width /3)
                            continue
                        if (height - ch1 - ch2 < height /3)
                            continue

                        if (width / cw1 > 5 || height / ch1 > 5)
                            continue
                        if (width / cw2 > 5 || height / ch2 > 5)
                            continue

                        shape = svg.squareWithLeftAndRightTopCutsAndLabels(60, 30, width*scale, height*scale,                            
                                cw1*scale, ch1*scale,
                                cw2*scale, ch2*scale,
                                (width - cw2) + unit,       // xlabel 

                                (height - ch1) + unit, // ylabelExLHCut, 
                                cw2 + unit, // withMinusRCut,
                                ch1 + unit,// hCutLeftLabel,
                                cw1 + unit,// wCutLeftLabel,
                                ch2 + unit// hCutRightLabel
                                ).html

                                answer = '' + (2*width + 2*height) + unit 
                        break
                    }
                    break;
                }
                }

                if (!shape || !answer)
                {
                    continue
                }
        
                root.innerHTML = 
                    "<table>"+ 
                        "<tr>" + 
                            "<td valign='top'>" + 
                                'What is the perimeter of this shape?' + 
                            "</td>" + 
                        '</tr><tr>' + 
                            "<td>" + 
                                shape + 
                            "</td>" + 
                        "</tr>" + 
                        "</table>"
        
                ansRoot.innerHTML = answer
                break;
            }
            // svgNGone
        },         
    },

    {
        name: "Area from perimiter and vice versa", 
        max_count: 2,
        fun: function (root, ansRoot, difficulty)
        {
            let unit = randValue('cm', 'mm', 'm')

            for (;;)
            {

                switch (randValue(1, 2, 3, 4, 5, 6))
                {
                case 1: 
                {
                    let w = randIntRange(3, 10 + 2 * difficulty)
                    let h = randIntRange(3, 10 + 2 * difficulty)
                    let area = w * h 
                    let perim = (2*w + 2*h)
                    let side = randValue('width', 'length')

                    root.innerHTML = "The perimeter of a rectangle is " + perim + unit + ". If its " + side + " is " + w + unit + ", find its area."
                    ansRoot.innerHTML = area + unit + "<sup>2</sup>"

                    break;
                }
                case 2: 
                {
                    let w = randIntRange(3, 10 + 2 * difficulty)
                    let h = randIntRange(3, 10 + 2 * difficulty)
                    let area = w * h 
                    let perim = (2*w + 2*h)
                    let side = randValue('width', 'length')

                    root.innerHTML = "The area of a rectangle is " + area + unit + "<sup>2</sup>. If its " + side + " is " + w + unit + ", find its perimeter."
                    ansRoot.innerHTML = perim + unit
                    break;
                }
                case 3: 
                {
                    let w = randIntRange(3, 10 + 2 * difficulty)
                    let area = w * w
                    let perim = (4*w)

                    root.innerHTML = "The perimiter of a square is " + perim +unit + ", find its area."
                    ansRoot.innerHTML = area + unit + "<sup>2</sup>"
                    break;
                }
                case 4: 
                {
                    let w = randIntRange(3, 5 + difficulty)
                    let area = w * w
                    let perim = (4*w)

                    root.innerHTML = "The area of a square is " + area  + unit + "<sup>2</sup>, find its perimeter."
                    ansRoot.innerHTML = perim + unit 
                    break;
                }
                case 5: 
                {
                    let w = randIntRange(3, 5 + difficulty)
                    let shape = ngoneshapes.pickRandom()
                    let perim = w * shape.sides 

                    root.innerHTML = "The perimiter of a " + shape.name +  " is " + perim + unit + ", what is the length of one side?"
                    ansRoot.innerHTML = w + unit 

                    break;
                }
                default: 
                {
                    let w = randIntRange(3, 5 + difficulty)
                    let shape = ngoneshapes.pickRandom()
                    let perim = w * shape.sides 

                    root.innerHTML = "The side of a " + shape.name +  " is " + w + unit + ", what is the perimeter?"
                    ansRoot.innerHTML = perim + unit 

                    break;
                }
                }

                
                break;
            }
            // svgNGone
        },         
    },

    {
        name: "Square with fraction side - area ", 
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            let unit = randValue('cm', 'mm', 'm')

            for (;;)
            {
                let intPart = randIntRange(1, 5)
                let denom = randIntRange(2, 2 + difficulty)

                let f = new Fraction(1 + intPart * denom, denom)

                let area = f.multiply(f)

                root.innerHTML = "<table><tr><td>Find the area of a square with a side of</td><td>" + f.asMixedNumberHtmlTable + "</td><td>" + unit + "</td></tr></table>"                
                ansRoot.innerHTML = "<table><tr><td>" + area.asMixedNumberHtmlTable + "</td><td>" + unit + "<sup>2</sup></td></tr></table>"
            
                break;
            }
        },         
    },


]
