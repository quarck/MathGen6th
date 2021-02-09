
function randFillColor()
{
    return randValue(
        'rgb(0,0,255)',
        'rgb(0,255,0)',
        'rgb(0,255,255)',
        'rgb(255,0,0)',
        'rgb(255,0,255)',
        'rgb(255,255,0)',
        'rgb(127,0,255)',
        'rgb(0,127,255)',
        'rgb(127,255,0)',
        'rgb(0,255,127)',
        'rgb(255,127,0)',
        'rgb(255,0,127)'
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
    if (n == 4)
        start_angle = -Math.PI / 4

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

function markSegment(x1, y1, x2, y2, mark)
{
    let ma_x = (x1 + x2) / 2.0    
    let ma_y = (y1 + y2) / 2.0
    let r = 3
    let len = 4

    mark = mark.toLowerCase()
    if (mark == 'x' || mark == 'ii' || mark == 'll')
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

    if (mark == 'i' || mark == 'l') // single 
    {
        return '<line x1="' + mn2[0] + '" y1="' + mn2[1] + '" x2="' + mn2[2] + '" y2="' + mn2[3] + '" style="stroke:black;stroke-width:1.5" />' 
    }
    else if (mark == 'ii' || mark == 'll')
    {
        return '<line x1="' + mn1[0] + '" y1="' + mn1[1] + '" x2="' + mn1[2] + '" y2="' + mn1[3] + '" style="stroke:black;stroke-width:1.5" />' + 
               '<line x1="' + mn3[0] + '" y1="' + mn3[1] + '" x2="' + mn3[2] + '" y2="' + mn3[3] + '" style="stroke:black;stroke-width:1.5" />'       
    }
    else if (mark == 'iii' || mark == 'lll')
    {
        return '<line x1="' + mn1[0] + '" y1="' + mn1[1] + '" x2="' + mn1[2] + '" y2="' + mn1[3] + '" style="stroke:black;stroke-width:1.5" />' + 
               '<line x1="' + mn2[0] + '" y1="' + mn2[1] + '" x2="' + mn2[2] + '" y2="' + mn2[3] + '" style="stroke:black;stroke-width:1.5" />' +
               '<line x1="' + mn3[0] + '" y1="' + mn3[1] + '" x2="' + mn3[2] + '" y2="' + mn3[3] + '" style="stroke:black;stroke-width:1.5" />'       
    }
    else if (mark == 'x')
    {
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
        markSegment(x1, y1, x2, y2, ma) + 
        markSegment(x1, y1, x3, y3, mb) + 
        markSegment(x2, y2, x3, y3, mc) + 
        'Sorry, your browser does not support inline SVG.' + 
        '</svg>'
}

/**
 * https://www.w3schools.com/graphics/svg_examples.asp
 
 // circle
 <svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  Sorry, your browser does not support inline SVG.  
</svg> 
 

// ellipse 
<svg height="140" width="500">
  <ellipse cx="200" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2" />
  Sorry, your browser does not support inline SVG.  
</svg>

// three ellipses 
<svg height="150" width="500">
  <ellipse cx="240" cy="100" rx="220" ry="30" style="fill:purple" />
  <ellipse cx="220" cy="70" rx="190" ry="20" style="fill:lime" />
  <ellipse cx="210" cy="45" rx="170" ry="15" style="fill:yellow" />
  Sorry, your browser does not support inline SVG. 
</svg>


// line 
<svg height="210" width="500">
  <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
  Sorry, your browser does not support inline SVG.
</svg>


// poligon (triangle)
<svg height="210" width="500">
  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg>

<svg height="250" width="500">
  <polygon points="220,10 300,210 170,250 123,234" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg>

// Star 
<svg height="210" width="500">
  <polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;"/>
  Sorry, your browser does not support inline SVG.
</svg>

// polyline
<svg height="200" width="500">
  <polyline points="20,20 40,25 60,40 80,120 120,140 200,180" style="fill:none;stroke:black;stroke-width:3" />
  Sorry, your browser does not support inline SVG.
</svg>
<svg height="180" width="500">
  <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" style="fill:white;stroke:red;stroke-width:4" />
  Sorry, your browser does not support inline SVG.
</svg>


// path 
<svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
  Sorry, your browser does not support inline SVG.
</svg>

// label examples 
<svg height="400" width="450">
<path id="lineAB" d="M 100 350 l 150 -300" stroke="red" stroke-width="3" fill="none" />
  <path id="lineBC" d="M 250 50 l 150 300" stroke="red" stroke-width="3" fill="none" />
  <path d="M 175 200 l 150 0" stroke="green" stroke-width="3" fill="none" />
  <path d="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="5" fill="none" />
  <!-- Mark relevant points -->
  <g stroke="black" stroke-width="3" fill="black">
    <circle id="pointA" cx="100" cy="350" r="3" />
    <circle id="pointB" cx="250" cy="50" r="3" />
    <circle id="pointC" cx="400" cy="350" r="3" />
  </g>
  <!-- Label the points -->
  <g font-size="30" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
    <text x="100" y="350" dx="-30">A</text>
    <text x="250" y="50" dy="-10">B</text>
    <text x="400" y="350" dx="30">C</text>
  </g>
  Sorry, your browser does not support inline SVG.
</svg>


<svg height="30" width="200">
  <text x="0" y="15" fill="red">I love SVG!</text>
  Sorry, your browser does not support inline SVG.
</svg>
 
<svg height="60" width="200">
  <text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG</text>
  Sorry, your browser does not support inline SVG.
</svg>

<svg height="90" width="200">
  <text x="10" y="20" style="fill:red;">Several lines:
    <tspan x="10" y="45">First line.</tspan>
    <tspan x="10" y="70">Second line.</tspan>
  </text>
  Sorry, your browser does not support inline SVG.
</svg>
 
// strokes 
<svg height="80" width="300">
  <g fill="none" stroke="black" stroke-width="4">
    <path stroke-dasharray="5,5" d="M5 20 l215 0" />
    <path stroke-dasharray="10,10" d="M5 40 l215 0" />
    <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
  </g>
  Sorry, your browser does not support inline SVG.
</svg>

<svg height="80" width="300">
  <g fill="none" stroke="black" stroke-width="6">
    <path stroke-linecap="butt" d="M5 20 l215 0" />
    <path stroke-linecap="round" d="M5 40 l215 0" />
    <path stroke-linecap="square" d="M5 60 l215 0" />
  </g>
  Sorry, your browser does not support inline SVG.
</svg>
 
<svg height="80" width="300">
  <g fill="none" stroke="black">
    <path stroke-width="2" d="M5 20 l215 0" />
    <path stroke-width="4" d="M5 40 l215 0" />
    <path stroke-width="6" d="M5 60 l215 0" />
  </g>
  Sorry, your browser does not support inline SVG.
</svg>


 */
