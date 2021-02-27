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


class Unit
{
    constructor(code, scale, name)
    {
        this.code = code
        this.scale = scale 
        this.name = name 
    }
}

let units = 
{
    length: {
        km:     new Unit('km', 1000, 'kilometres'),
        m:      new Unit('m', 1, 'metres'),
        cm:     new Unit('cm', 1/100, 'centimetres'),
        mm:     new Unit('mm', 1/1000, 'millimetres'),
    },

    mass: {
        g:      new Unit('g', 1, 'gramms'),
        kg:     new Unit('kg', 1000, 'kgs'),
        t:      new Unit('tonnes', 1000*1000, 'tonnes'),
    },

    volume: {
        m3:     new Unit('m<sup>3</sup>', 1000, 'cubic metres'),
        l:      new Unit('l', 1, 'litres'),
        ml:     new Unit('ml', 1/1000, 'millilitres'),
    },

    non_metric_area: {
        hectare:    new Unit('hectares', 100*100, 'hectares'), // 100x100 meters square 
        are:        new Unit('ares', 10*10, 'ares'), // 10x10 meters square 
    },

    area: {
        km2:        new Unit('km<sup>2</sup>', 1000*1000, 'square kilometres'),
        m2:         new Unit('m<sup>2</sup>', 1, 'square metres'),
        cm2:        new Unit('cm<sup>2</sup>', 1/100/100, 'square centimetres'),
        mm2:        new Unit('mm<sup>2</sup>', 1/1000/1000, 'square millilitres'),        
    }

}

// custom combinations of units, to exclude craziness like converting km to mm - kids won't handle it yet :) 

let unit_conv_pairs = [
    // length 
    {f: units.length.km, t: units.length.m }, 
    {f: units.length.m, t: units.length.km }, 

    {f: units.length.m, t: units.length.cm }, 
    {f: units.length.cm, t: units.length.m }, 

    {f: units.length.m, t: units.length.mm, min_difficulty: 7 }, 
    {f: units.length.mm, t: units.length.m, min_difficulty: 7 }, 

    {f: units.length.cm, t: units.length.mm }, 
    {f: units.length.mm, t: units.length.cm }, 

    // mass
    {f: units.mass.g, t: units.mass.kg }, 
    {f: units.mass.kg, t: units.mass.g }, 

    {f: units.mass.kg, t: units.mass.t }, 
    {f: units.mass.t, t: units.mass.kg }, 

    // volume 
    {f: units.volume.l, t: units.volume.ml }, 
    {f: units.volume.ml, t: units.volume.l }, 

    {f: units.volume.l, t: units.volume.m3, min_difficulty: 7 }, 
    {f: units.volume.m3, t: units.volume.l, min_difficulty: 7 }, 

    // areas (still multiple of metric, so not toooo bad)
    {f: units.non_metric_area.hectare, t: units.non_metric_area.are }, 
    {f: units.non_metric_area.are, t: units.non_metric_area.hectare }, 

    {f: units.non_metric_area.are, t: units.area.m2, min_difficulty: 10 }, 
    {f: units.non_metric_area.are, t: units.area.km2, min_difficulty: 10 }, 
    {f: units.non_metric_area.hectare, t: units.area.m2, min_difficulty: 10 }, 
    {f: units.non_metric_area.hectare, t: units.area.km2, min_difficulty: 10 }, 
    {t: units.non_metric_area.are, f: units.area.m2, min_difficulty: 10 }, 
    {t: units.non_metric_area.are, f: units.area.km2, min_difficulty: 10 }, 
    {t: units.non_metric_area.hectare, f: units.area.m2, min_difficulty: 10 }, 
    {t: units.non_metric_area.hectare, f: units.area.km2, min_difficulty: 10 }, 

    {f: units.area.m2, t: units.area.cm2, min_difficulty: 7 }, 
    {f: units.area.cm2, t: units.area.m2, min_difficulty: 7 },

    {f: units.area.m2, t: units.area.km2, min_difficulty: 7 }, 
    {f: units.area.km2, t: units.area.m2, min_difficulty: 7 }, 
]