
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
    { name: 'equilateral triangle', svg: (w, h)=> svgNGone(w, h, 3), symmetry_axes: 6, guess_name: false},
    { name: 'square', svg: (w, h)=> svgNGone(w, h, 4), symmetry_axes: 8, guess_name: false},

    { name: 'pentagon', svg: (w, h)=> svgNGone(w, h, 5), symmetry_axes: 10, guess_name: true},
    { name: 'hexagon', svg: (w, h)=> svgNGone(w, h, 6), symmetry_axes: 12, guess_name: true},
    { name: 'heptagon (or septagon)', svg: (w, h)=> svgNGone(w, h, 7), symmetry_axes: 14, guess_name: true},
    { name: 'octagon', svg: (w, h)=> svgNGone(w, h, 8), symmetry_axes: 16, guess_name: true},
    { name: 'nonagon (or enneagon)', svg: (w, h)=> svgNGone(w, h, 9), symmetry_axes: 18, guess_name: true},
    { name: 'decagon', svg: (w, h)=> svgNGone(w, h, 10), symmetry_axes: 20, guess_name: true},
    //{ name: 'hendecagon (or undecagon, or endecagon)', svg: (w, h)=> svgNGone(w, h, 11), },
    //{ name: 'dodecagon', svg: (w, h)=> svgNGone(w, h, 12), },
    //{ name: 'tridecagon (or triskaidecagon)', svg: (w, h)=> svgNGone(w, h, 13), },

]