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

function svgNGone(w, h, n)
{
    let svg = new SVG(w, h)
    svg.nGone(0, 0, w, h, n)
    return svg.html
}

function svgTriangle(w, h, a, b, c)
{
    let svg = new SVG(w, h)
    svg.triangle(0, 0, a, b, c)
    return svg.html
}

function svgTriangleWithMarks(w, h, a, b, c, ma, mb, mc)
{
    let svg = new SVG(w, h)
    svg.triangleWithMarks(0, 0, w, h, a, b, c, ma, mb, mc)
    return svg.html
}

function svgRightTriangleWithMark(w, h, a, b)
{
    let svg = new SVG(w, h)
    svg.rightTriangleWithMark(0, 0, w, h, a, b,)
    return svg.html
}

// 
function svgTriangleByAnglesWithAngleMarks(w, h, a, alpha, beta, malpha, mbeta, mgamma)
{
    let svg = new SVG(w, h)
    svg.triangleByAnglesWithAngleMarks(0, 0, w, h, a, alpha, beta, malpha, mbeta, mgamma)
    return svg.html
}

function polarToDecart(cx, cy, r, angleDeg) 
{
    var angle = angleDeg * Math.PI / 180.0
    return {
        x: cx + (r * Math.cos(angle)), 
        y: cy + (r * Math.sin(angle))
    }
}
  