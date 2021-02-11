
let personNames = [
    "Elon", 
    "Nikola", 
    "Albert", 
    "Richard", 
    "Lucy",
    "Mary", 
    "Elza"
]



let shapes = [
    { name: 'square', svg: "", }
]

let ngoneshapes = [
    { name: 'pentagon', svg: (w, h)=> svgNGone(w, h, 5), symmetry_axes: 10},
    { name: 'hexagon', svg: (w, h)=> svgNGone(w, h, 6), symmetry_axes: 12},
    { name: 'heptagon (or septagon)', svg: (w, h)=> svgNGone(w, h, 7), symmetry_axes: 14},
    { name: 'octagon', svg: (w, h)=> svgNGone(w, h, 8), symmetry_axes: 16},
    { name: 'nonagon (or enneagon)', svg: (w, h)=> svgNGone(w, h, 9), symmetry_axes: 18},
    { name: 'decagon', svg: (w, h)=> svgNGone(w, h, 10), symmetry_axes: 20},
    //{ name: 'hendecagon (or undecagon, or endecagon)', svg: (w, h)=> svgNGone(w, h, 11), },
    //{ name: 'dodecagon', svg: (w, h)=> svgNGone(w, h, 12), },
    //{ name: 'tridecagon (or triskaidecagon)', svg: (w, h)=> svgNGone(w, h, 13), },

]