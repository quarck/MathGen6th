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


let personNames = [
    {name: "Jack", pronoun: "he", possessive: "his"}, 
    {name: "Eoin", pronoun: "he", possessive: "his"}, 
    {name: "Albert", pronoun: "he", possessive: "his"}, 
    {name: "Richard", pronoun: "he", possessive: "his"}, 
    {name: "David", pronoun: "he", possessive: "his"}, 
    {name: "Lucy", pronoun: "she", possessive: "her"}, 
    {name: "Mary", pronoun: "she", possessive: "her"}, 
    {name: "Elza", pronoun: "she", possessive: "her"}, 
    {name: "Jenny", pronoun: "she", possessive: "her"}, 
    {name: "Michelle", pronoun: "she", possessive: "her"}, 
]

let shapes = [
    { name: 'square', svg: "", }
]

let ngoneshapes = [
    { name: 'square', svg: (w, h)=> svgNGone(w, h, 4), symmetry_axes: 4, guess_name: false},
    { name: 'pentagon', svg: (w, h)=> svgNGone(w, h, 5), symmetry_axes: 5, guess_name: true},
    { name: 'hexagon', svg: (w, h)=> svgNGone(w, h, 6), symmetry_axes: 6, guess_name: true},
    { name: 'heptagon (or septagon)', svg: (w, h)=> svgNGone(w, h, 7), symmetry_axes: 7, guess_name: true},
    { name: 'octagon', svg: (w, h)=> svgNGone(w, h, 8), symmetry_axes: 8, guess_name: true},
    { name: 'nonagon (or enneagon)', svg: (w, h)=> svgNGone(w, h, 9), symmetry_axes: 9, guess_name: true},
    { name: 'decagon', svg: (w, h)=> svgNGone(w, h, 10), symmetry_axes: 10, guess_name: true},
    //{ name: 'hendecagon (or undecagon, or endecagon)', svg: (w, h)=> svgNGone(w, h, 11), symmetry_axes: 11, guess_name: false },
    //{ name: 'dodecagon', svg: (w, h)=> svgNGone(w, h, 12), symmetry_axes: 12, guess_name: false },
    //{ name: 'tridecagon (or triskaidecagon)', svg: (w, h)=> svgNGone(w, h, 13), symmetry_axes: 13, guess_name: false },
]