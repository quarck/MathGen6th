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



class Digital24hClock
{
    constructor(height, hr, min) 
    {
        this.height = height 
        this.width = height * 2.5

        this.seg_w = this.width / 7.6
        this.seg_w_sp = this.width / 14
        this.seg_w_margin = this.width  / 10

        this.seg_h = height / 3
        this.seg_h_margin = height / 5

        this.seg_sm_w = this.seg_w / 17
        this.seg_sm_h = this.seg_h / 17

        this.hr = hr
        this.min = min 
    }

    segment(svg, pos, s)
    {
        let x1 = 0, x2 = 0, y1 = 0, y2 = 0
        
        switch (s)
        {
        case 0: // a
            x1 = this.seg_sm_w
            y1 = 0            
            x2 = this.seg_w - this.seg_sm_w
            y2 = 0
            break;

        case 1: // b
            x1 = this.seg_w 
            y1 = this.seg_sm_h
            x2 = this.seg_w 
            y2 = this.seg_h - this.seg_sm_h          
            break;

        case 2: // c
            x1 = this.seg_w
            y1 = this.seg_h + this.seg_sm_h
            x2 = this.seg_w
            y2 = 2 * this.seg_h - this.seg_sm_h
            break;

        case 3: // d 
            x1 = this.seg_sm_w
            y1 = 2 * this.seg_h
            x2 = this.seg_w - this.seg_sm_w
            y2 = 2 * this.seg_h 
            break;

        case 4: // e 
            x1 = 0
            y1 = 2 * this.seg_h - this.seg_sm_h 
            x2 = 0
            y2 = this.seg_h + this.seg_sm_h
            break;

        case 5: // f
            x1 = 0
            y1 = this.seg_h - this.seg_sm_h
            x2 = 0
            y2 = this.seg_sm_h
            break;

        case 6: // g
            x1 = this.seg_sm_w
            y1 = this.seg_h             
            x2 = this.seg_w -this.seg_sm_w
            y2 = this.seg_h 
            break;
    
    
    
    
        }

        let hr_min_offset = pos >= 2 ? this.seg_w/2 : 0
        let x_offset = pos * (this.seg_w + this.seg_w_sp)

        x1 += this.seg_w_margin + x_offset + hr_min_offset
        x2 += this.seg_w_margin + x_offset + hr_min_offset
        y1 += this.seg_h_margin
        y2 += this.seg_h_margin 

        svg.line(x1, y1, x2, y2)
    }


    digit(svg, pos, d)
    {
        switch (d)
        {
        case 0: 
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 2)
            this.segment(svg, pos, 3)
            this.segment(svg, pos, 4)
            this.segment(svg, pos, 5)
            break;
        case 1: 
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 2)
            break;
        case 2: 
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 3)
            this.segment(svg, pos, 4)
            this.segment(svg, pos, 6)
            break;
        case 3: 
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 2)
            this.segment(svg, pos, 3)
            this.segment(svg, pos, 6)
            break;
        case 4: 
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 2)
            this.segment(svg, pos, 5)           
            this.segment(svg, pos, 6)
            break;
        case 5: 
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 2)
            this.segment(svg, pos, 3)
            this.segment(svg, pos, 5)           
            this.segment(svg, pos, 6)
            break;
        case 6: 
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 2)
            this.segment(svg, pos, 3)
            this.segment(svg, pos, 4)
            this.segment(svg, pos, 5)           
            this.segment(svg, pos, 6)
            break;
        case 7: 
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 2)
            break;
        case 8: 
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 2)
            this.segment(svg, pos, 3)
            this.segment(svg, pos, 4)
            this.segment(svg, pos, 5)           
            this.segment(svg, pos, 6)
            break;
        case 9:             
            this.segment(svg, pos, 0)
            this.segment(svg, pos, 1)
            this.segment(svg, pos, 2)
            this.segment(svg, pos, 3)
            this.segment(svg, pos, 5)           
            this.segment(svg, pos, 6)
            break;
        }
    }

    render(svg) 
    {
        svg.stroke(0, 0, 0, this.height / 30)

        svg.rect(0, 0, this.width, this.height)

        svg.stroke(0, 0, 0, this.height / 12)

        svg.pushFill()
        svg.fill(0, 0, 0)

        let rv =this.width / 192

        svg.rect(this.width / 2 - rv, this.height / 2 - rv - this.seg_h/3, 2*rv, 2*rv)
        svg.rect(this.width / 2 - rv, this.height / 2 - rv + this.seg_h/3, 2*rv, 2*rv)

        svg.popFill()

        this.digit(svg, 0, Math.floor(this.hr / 10))
        this.digit(svg, 1, this.hr % 10)
        this.digit(svg, 2, Math.floor(this.min / 10))
        this.digit(svg, 3, this.min % 10)
    }

    get html()
    {
        let svg = new SVG(this.width, this.height)
        this.render(svg)
        return svg.html
    }

}