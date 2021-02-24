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

