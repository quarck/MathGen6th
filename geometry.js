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

function randFillColor()
{
    return randValue(
        'rgb(127,255,255)', 
        'rgb(255,192,255)', 
        'rgb(255,255,64)',  
        'rgb(232,168,255)', 
        'rgb(158,232,255)', 
        'rgb(192,255,128)', 
        'rgb(128,255,192)',
        'rgb(255,192,128)',
        'rgb(255,128,192)'
    )
}

function svgRectangle(w, h, fill, stroke)
{
    fill = fill ? fill : randFillColor()
    stroke = stroke ? stroke : "rgb(0,0,0)"

    return '<svg width="' + w + '" height="' + h + '">' + 
        '<rect width="' + w + '" height="' + w + '" style="fill:' + fill + ';stroke-width:2;stroke:' + stroke + '" />' + 
        'Sorry, your browser does not support inline SVG. ' + 
        '</svg>'
}

function svgNGone(w, h, n, fill, stroke)
{
    if (n < 3)
        return null

    fill = fill ? fill : randFillColor()
    stroke = stroke ? stroke : "rgb(0,0,0)"

    let angle_step = 2.0 * Math.PI / n    
    let points = ""
    let start_angle = (n % 2 == 0) ? 0 : -Math.PI/2.0
    if (n == 4 || n == 8)
        start_angle = -Math.PI / n

    let y_offs = (n == 3) ? 0.2 : 0.01

    for (let i = 0; i < n; ++ i) 
    {
        let angleFrom = angle_step * i + start_angle
        let xFrom = w/2 * (1.0  + 0.95 * Math.cos(angleFrom))
        let yFrom = h/2 * (1.0 + y_offs + 0.95 * Math.sin(angleFrom))
        if (i == 0)
            points = "" + xFrom + "," + yFrom 
        else 
            points = points + " " + xFrom + "," + yFrom 
    }

    return '<svg width="' + w + '" height="' + h + '">' + 
        '<polygon points="' + points + '" style="fill:' + fill + ';;stroke:' + stroke + ';stroke-width:2;fill-rule:nonzero;"/>' + 
        'Sorry, your browser does not support inline SVG.' + 
        '</svg>'
}

function svgTriangle(w, h, a, b, c, fill, stroke)
{
    if (a == 0 || b == 0 || c == 0)
        return null
    if (a + b < c || a + c < b || b + c < a)
        return null

    fill = fill ? fill : randFillColor()
    stroke = stroke ? stroke : "rgb(0,0,0)"

    let x1 = 0
    let y1 = 0
    let x2 = a 
    let y2 = 0
    let x3 = (a*a + b*b - c*c) / 2.0 / a
    let y3 = Math.sqrt(b*b - x3*x3)

    let dy = max(0, (h - y3)/2.0)
    let dx = max(0, (w - a) / 2.0)

    y1 = h - dy - y1
    y2 = h - dy - y2
    y3 = h - dy - y3
    x1 = x1 + dx
    x2 = x2 + dx
    x3 = x3 + dx
    
    points = "" + x1 + "," + y1 + " " + 
                  x2 + "," + y2 + " " + 
                  x3 + "," + y3 
    
    return '<svg width="' + w + '" height="' + h + '">' + 
        '<polygon points="' + points + '" style="fill:' + fill + ';;stroke:' + stroke + ';stroke-width:2;fill-rule:nonzero;"/>' + 
        'Sorry, your browser does not support inline SVG.' + 
        '</svg>'
}

function svgMarkSegment(x1, y1, x2, y2, mark)
{
    let ma_x = (x1 + x2) / 2.0    
    let ma_y = (y1 + y2) / 2.0
    let r = 3
    let len = 4

    if (mark == 2 || mark == 4)
    {
        r = 1.7
    }

    // locate the marks 
    let divider = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2))
    let dx = (x1 - x2) / divider 
    let dy = (y1 - y2) / divider

    // our 3 calculated mark positions on the line. We won't always need all of these, but it makes 
    // life easier to just always calculate here. This is not a high-performance code that runs in the hot path
    let m1 = [r*dx + ma_x, r*dy + ma_y]
    let m2 = [ma_x, ma_y]
    let m3 = [-r*dx + ma_x, -r*dy + ma_y]
    let norm = [len* dy, -len*dx, -len*dy, len*dx]

    // just calculate all all the time, but we won't always need these. 
    // this is not a HPC code, don't care about a bit of inefficiency
    let mn1 = [norm[0] + m1[0], norm[1] + m1[1], norm[2] + m1[0], norm[3] + m1[1]]
    let mn2 = [norm[0] + m2[0], norm[1] + m2[1], norm[2] + m2[0], norm[3] + m2[1]]
    let mn3 = [norm[0] + m3[0], norm[1] + m3[1], norm[2] + m3[0], norm[3] + m3[1]]

    switch (mark)
    {
    case 1: 
        return '<line x1="' + mn2[0] + '" y1="' + mn2[1] + '" x2="' + mn2[2] + '" y2="' + mn2[3] + '" style="stroke:black;stroke-width:1.5" />' 
    case 2:
        return '<line x1="' + mn1[0] + '" y1="' + mn1[1] + '" x2="' + mn1[2] + '" y2="' + mn1[3] + '" style="stroke:black;stroke-width:1.5" />' + 
               '<line x1="' + mn3[0] + '" y1="' + mn3[1] + '" x2="' + mn3[2] + '" y2="' + mn3[3] + '" style="stroke:black;stroke-width:1.5" />'       
    case 3: 
        return '<line x1="' + mn1[0] + '" y1="' + mn1[1] + '" x2="' + mn1[2] + '" y2="' + mn1[3] + '" style="stroke:black;stroke-width:1.5" />' + 
               '<line x1="' + mn2[0] + '" y1="' + mn2[1] + '" x2="' + mn2[2] + '" y2="' + mn2[3] + '" style="stroke:black;stroke-width:1.5" />' +
               '<line x1="' + mn3[0] + '" y1="' + mn3[1] + '" x2="' + mn3[2] + '" y2="' + mn3[3] + '" style="stroke:black;stroke-width:1.5" />'       
    case 4:   
        return '<line x1="' + mn1[0] + '" y1="' + mn1[1] + '" x2="' + mn3[2] + '" y2="' + mn3[3] + '" style="stroke:black;stroke-width:1.5" />' + 
               '<line x1="' + mn3[0] + '" y1="' + mn3[1] + '" x2="' + mn1[2] + '" y2="' + mn1[3] + '" style="stroke:black;stroke-width:1.5" />' 
    }

    return ''
}

function svgTriangleWithMarks(w, h, a, b, c, ma, mb, mc, fill, stroke)
{
    if (a == 0 || b == 0 || c == 0)
        return null
    if (a + b < c || a + c < b || b + c < a)
        return null

    fill = fill ? fill : randFillColor()
    stroke = stroke ? stroke : "rgb(0,0,0)"

    let x1 = 0
    let y1 = 0
    let x2 = a 
    let y2 = 0
    let x3 = (a*a + b*b - c*c) / 2.0 / a
    let y3 = Math.sqrt(b*b - x3*x3)

    let dy = max(0, (h - y3)/2.0)
    let dx = max(0, (w - a) / 2.0)

    y1 = h - dy - y1
    y2 = h - dy - y2
    y3 = h - dy - y3
    x1 = x1 + dx
    x2 = x2 + dx
    x3 = x3 + dx

    points = "" + x1 + "," + y1 + " " + 
                  x2 + "," + y2 + " " + 
                  x3 + "," + y3 
    
    return '<svg width="' + w + '" height="' + h + '">' + 
        '<polygon points="' + points + '" style="fill:' + fill + ';;stroke:' + stroke + ';stroke-width:2;fill-rule:nonzero;"/>' + 
        svgMarkSegment(x1, y1, x2, y2, ma) + 
        svgMarkSegment(x1, y1, x3, y3, mb) + 
        svgMarkSegment(x2, y2, x3, y3, mc) + 
        'Sorry, your browser does not support inline SVG.' + 
        '</svg>'
}

function svgMarkAngle(x1, y1, x2, y2, x3, y3, label)
{
    let r = 45

    let divider1 = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
    let dx1 = (x2 - x1) / divider1 
    let dy1 = (y2 - y1) / divider1

    let divider2 = Math.sqrt(Math.pow(x3-x1, 2) + Math.pow(y3-y1, 2))
    let dx2 = (x3 - x1) / divider2
    let dy2 = (y3 - y1) / divider2

    let divider3 = Math.sqrt(Math.pow((x2+x3)/2-x1, 2) + Math.pow((y2+y3)/2-y1, 2))
    let dx3 = ((x2 + x3)/2 - x1) / divider3
    let dy3 = ((y2 + y3)/2 - y1) / divider3

    let psX = x1 + dx1*r
    let psY = y1 + dy1*r
    let dpmX = x1 + dx3*r - psX
    let dpmY = y1 + dy3*r - psY
    let dpeX = x1 + dx2*r - psX
    let dpeY = y1 + dy2*r - psY

    let textX = x1 + dx3*r/1.65 + 2
    let textY = y1 + dy3*r/1.65 + 5

    return '<path d="M ' + psX + ' ' + psY + ' q ' + dpmX + ' ' + dpmY + ' ' + dpeX + ' ' + dpeY + '" ' + 
                'stroke="black" stroke-width="1.5" stroke-dasharray="3,3" fill="none" />' + 
                '<g font-size="15" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle"><text x="' + textX + '" y="' + textY + '">' + label + '</text></g>'
}

// 
function svgTriangleByAnglesWithAngleMarks(w, h, a, alpha, beta, malpha, mbeta, mgamma, fill, stroke)
{
    fill = fill ? fill : randFillColor()
    stroke = stroke ? stroke : "rgb(0,0,0)"

    let gamma = 180 - alpha - beta 

    alpha *= Math.PI/ 180
    beta *= Math.PI/ 180
    gamma *= Math.PI/ 180

    // Law_of_sines: 
    // a / sin(alpha) = b / sin(beta) = c / sin(gamma)

    let b = a * Math.sin(beta) / Math.sin(alpha)
    let c = a * Math.sin(gamma) / Math.sin(alpha)
    
    let x1 = 0
    let y1 = 0
    let x2 = a 
    let y2 = 0
    let x3 = (a*a + b*b - c*c) / 2.0 / a
    let y3 = Math.sqrt(b*b - x3*x3)

    let dy = max(0, (h - y3)/2.0)
    let dx = max(0, (w - a) / 2.0)

    y1 = h - dy - y1
    y2 = h - dy - y2
    y3 = h - dy - y3
    x1 = x1 + dx
    x2 = x2 + dx
    x3 = x3 + dx

    points = "" + x1 + "," + y1 + " " + 
                  x2 + "," + y2 + " " + 
                  x3 + "," + y3 

    
    
    return '<svg width="' + w + '" height="' + h + '">' + 
        '<polygon points="' + points + '" style="fill:' + fill + ';;stroke:' + stroke + ';stroke-width:2;fill-rule:nonzero;"/>' +         
        svgMarkAngle(x1, y1, x2, y2, x3, y3, mgamma) + 
        svgMarkAngle(x2, y2, x1, y1, x3, y3, mbeta) + 
        svgMarkAngle(x3, y3, x1, y1, x2, y2, malpha) + 
        'Sorry, your browser does not support inline SVG.' + 
        '</svg>'

  /* <svg height="400" width="450">

  <path d="M 100 350 q 150 -100 300 0" stroke="black" stroke-width="5" stroke-dasharray="5,5"
  fill="none" />

<g font-size="30" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
    <text x="100" y="350" dx="-30">A</text>
    <text x="250" y="50" dy="-10">B</text>
    <text x="400" y="350" dx="30">C</text>
  </g>
  Sorry, your browser does not support inline SVG.
</svg> */

}

/**
  * https://www.w3schools.com/graphics/svg_examples.asp
  */
