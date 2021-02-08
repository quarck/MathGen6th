
let personNames = [
    "Elon", 
    "Nikola", 
    "Albert", 
    "Richard", 
    "Lucy",
    "Mary", 
    "Elza"
]

function svgRectangle(w, h, fill, stroke)
{
    fill = fill ? fill : "rgb(0,0,255)"
    stroke = stroke ? stroke : "rgb(0,0,0)"

    return '<svg width="' + w + '" height="' + h + '">' + 
        '<rect width="' + w + '" height="' + w + '" style="fill:' + fill + ';stroke-width:3;stroke:' + stroke + '" />' + 
        'Sorry, your browser does not support inline SVG. ' + 
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


let shapes = [
    { name: 'square', svg: "", }
]