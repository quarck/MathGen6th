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



class SVG
{
    constructor(width, height) 
    {
        this._width = width
        this._height = height        
        this._stroke = this.rgb(0,0,0)
        this._strokeWidth = 2
        this._items = []
        this._strokesStack = []
        this._fillsStack = []
        this._fontSize = 15
        this._fontFace = 'sans-serif'
        this.randFill()
    }

    max(a, b) { return a > b ? a : b }
    min(a, b) { return a > b ? b : a }
    cap(v, l, h) { return (v < l) ? l : (v > h ? h : v) }

    capColor(value)  { return this.cap(value | 0, 0, 255) }
    rgb(r, g, b) { return 'rgb(' + [ this.capColor(r), this.capColor(g), this.capColor(b) ].join(',') + ')' }

    fill(r, g, b) { this._fill = this.rgb(r, g, b) }

    randFill()
    {
        this._fill = randValue(
            this.rgb(127,255,255), 
            this.rgb(255,192,255), 
            this.rgb(255,255,64),  
            this.rgb(232,168,255), 
            this.rgb(158,232,255), 
            this.rgb(192,255,128), 
            this.rgb(128,255,192),
            this.rgb(255,192,128),
            this.rgb(255,128,192)
        )
    }

    stroke(r, g, b, width)
    {
        this._stroke = this.rgb(r, g, b)
        this._strokeWidth = width ? width : this._strokeWidth        
    }

    pushStroke() { this._strokesStack.push({s: this._stroke, w: this._strokeWidth}) }
    popStroke() { let item = this._strokesStack.pop() ;this._stroke = item.s; this._strokeWidth = item.w }

    pushFill() { this._fillsStack.push(this._fill) }
    popFill() { this._fill = this._fillsStack.pop() }

    set fontSize(value) { this._fontSize = value }

    set fontFace(value) { this._fontFace = value }

    style(extra) { return 'fill:' + this._fill + ';stroke-width:' + this._strokeWidth + ';stroke:' + this._stroke + ';' + (extra ? extra : '') }

    // without 'fill' attribute
    lineStyle(extra) { return 'stroke-width:' + this._strokeWidth + ';stroke:' + this._stroke  + ';' + (extra ? extra : '') }

    get html()
    {
        return '<svg width="' + this._width + '" height="' + this._height + '">' + 
            this._items.join('') + 
            'Sorry, your browser does not support inline SVG. ' + 
        '</svg>'    
    }

    tagWithAttrs(tag, dict) 
    { 
        let attrsHtml =
            Object.keys(dict)
                .map(key => key + '="' + dict[key] + '"')
                .join(' ')
        return '<' + tag + ' ' + attrsHtml + ' />'
    }

    rect(x, y, width, height)
    {
        this._items.push(
            this.tagWithAttrs(
                'rect',
                {
                    x: x, 
                    y: y, 
                    width: width, 
                    height: height, 
                    style: this.style()
                })
        )
    }

    nGone(x, y, width, height, n)
    {
        if (n < 3)
            return null

        let angle_step = 2.0 * Math.PI / n    
        let points = ""
        let start_angle = (n % 2 == 0) ? 0 : -Math.PI/2.0
        if (n == 4 || n == 8)
            start_angle = -Math.PI / n

        let y_offs = (n == 3) ? 0.2 : 0.01

        for (let i = 0; i < n; ++ i) 
        {
            let angleFrom = angle_step * i + start_angle
            let xFrom = width/2 * (1.0  + 0.95 * Math.cos(angleFrom)) + x
            let yFrom = height/2 * (1.0 + y_offs + 0.95 * Math.sin(angleFrom)) + y
            if (i == 0)
                points = "" + xFrom + "," + yFrom 
            else 
                points = points + " " + xFrom + "," + yFrom 
        }

        this._items.push(
            this.tagWithAttrs(
                'polygon',
                {
                    x: x, 
                    y: y, 
                    width: width, 
                    height: height, 
                    points: points, 
                    style: this.style('fill-rule:nonzero;')
                })
        )
    }

    triangle(x, y, w, h, a, b, c)
    {
        if (a <= 0 || b <= 0 || c <= 0 ||
            a + b < c || a + c < b || b + c < a)
        {
            console.error("Trying to draw invalid triangle: ", a, b, c)
            return
        }

        let x1 = 0
        let y1 = 0
        let x2 = a 
        let y2 = 0
        let x3 = (a*a + b*b - c*c) / 2.0 / a
        let y3 = Math.sqrt(b*b - x3*x3)

        let dy = max(0, (h - y3)/2.0)
        let dx = max(0, (w - a) / 2.0)

        y1 = y + h - dy - y1
        y2 = y + h - dy - y2
        y3 = y + h - dy - y3
        x1 = y + x1 + dx
        x2 = y + x2 + dx
        x3 = y + x3 + dx
        
        let points = "" + x1 + "," + y1 + " " + 
                    x2 + "," + y2 + " " + 
                    x3 + "," + y3 
        
        this._items.push(
            this.tagWithAttrs(
                'polygon',
                {
                    x: x, 
                    y: y, 
                    width: w, 
                    height: h, 
                    points: points, 
                    style: this.style('fill-rule:nonzero;')
                })
        )

        return {x1: x1, x2: x2, x3: x3, y1: y1, y2: y2, y3: y3}
    }

    line(x1, y1, x2, y2)
    {
        this._items.push(
            this.tagWithAttrs(
                'line',
                {
                    x1: x1, 
                    y1: y1, 
                    x2: x2, 
                    y2: y2, 
                    style: this.lineStyle()
                })
        )
    }

    text(x, y, text)
    {
        this._items.push(
            '<g font-size="' + this._fontSize + '" font-family="' + this._fontFace +
             '" fill="black" stroke="none" text-anchor="middle"><text x="' + x + '" y="' + y + '">' + text + '</text></g>'
        )
    }

    markSegment(x1, y1, x2, y2, mark)
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
            // I
            this.line(mn2[0], mn2[1], mn2[2], mn2[3])
            break

        case 2: 
            // II
            this.line(mn1[0], mn1[1], mn1[2], mn1[3])
            this.line(mn3[0], mn3[1], mn3[2], mn3[3])
            break

        case 3: 
            // III
            this.line(mn1[0], mn1[1], mn1[2], mn1[3])
            this.line(mn2[0], mn2[1], mn2[2], mn2[3])
            this.line(mn3[0], mn3[1], mn3[2], mn3[3])
            break

        case 4: 
            // X
            this.line(mn1[0], mn1[1], mn3[2], mn3[3])
            this.line(mn3[0], mn3[1], mn1[2], mn1[3])
        }
    }

    triangleWithMarks(x, y, w, h, a, b, c, ma, mb, mc)
    {
        let t = this.triangle(x, y, w, h, a, b, c)
        this.markSegment(t.x1, t.y1, t.x2, t.y2, ma)
        this.markSegment(t.x1, t.y1, t.x3, t.y3, mb)  
        this.markSegment(t.x2, t.y2, t.x3, t.y3, mc) 
    }

    rightTriangleWithMark(x, y, w, h, a, b)
    {
        let x1 = 0
        let y1 = 0
        let x2 = a     
        let y2 = 0
        let x3 = 0
        let y3 = b

        let dy = max(0, (h - y3)/2.0)
        let dx = max(0, (w - a) / 2.0)

        y1 = y + h - dy - y1
        y2 = y + h - dy - y2
        y3 = y + h - dy - y3
        x1 = x + x1 + dx
        x2 = x + x2 + dx
        x3 = x + x3 + dx

        this._items.push(
            this.tagWithAttrs(
                'polygon',
                {
                    x: x, 
                    y: y, 
                    width: w, 
                    height: h, 
                    points: "" + x1 + "," + y1 + " " +  x2 + "," + y2 + " " +  x3 + "," + y3 , 
                    style: this.style('fill-rule:nonzero;')
                })
        )

        this.line(x1, (y1-h*0.1), (x1+w*0.1), (y1-h*0.1))
        this.line((x1+w*0.1), y1, (x1+w*0.1), (y1-h*0.1))

        return {x1: x1, x2: x2, x3: x3, y1: y1, y2: y2, y3: y3}
    }

    markAngle(x1, y1, x2, y2, x3, y3, label)
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

        this._items.push(
            this.tagWithAttrs(
                'path',
                {
                    d: ['M', psX, psY, 'q', dpmX, dpmY, dpeX, dpeY].join(' '), 
                    stroke: this._stroke, 
                    'stroke-width': this._strokeWidth,
                    'stroke-dasharray': "3,3",
                    fill: 'none'
                })        
        )

        this.text(textX, textY, label)
    }

    triangleByAnglesWithAngleMarks(x, y, w, h, a, alpha, beta, malpha, mbeta, mgamma)
    {
        let gamma = 180 - alpha - beta 

        alpha *= Math.PI/ 180
        beta *= Math.PI/ 180
        gamma *= Math.PI/ 180

        // Law_of_sines: 
        // a / sin(alpha) = b / sin(beta) = c / sin(gamma)

        let b = a * Math.sin(beta) / Math.sin(alpha)
        let c = a * Math.sin(gamma) / Math.sin(alpha)
        
        let t = this.triangle(x, y, w, h, a, b, c)

        this.markAngle(t.x1, t.y1, t.x2, t.y2, t.x3, t.y3, mgamma)
        this.markAngle(t.x2, t.y2, t.x1, t.y1, t.x3, t.y3, mbeta) 
        this.markAngle(t.x3, t.y3, t.x1, t.y1, t.x2, t.y2, malpha)
    }

    polarToDecart(cx, cy, r, angleDeg) 
    {
        var angle = angleDeg * Math.PI / 180.0
        return {
            x: cx + (r * Math.cos(angle)), 
            y: cy + (r * Math.sin(angle))
        }
    }

    arc(x, y, r, startAngle, endAngle)
    {  
        var start = this.polarToDecart(x, y, r, endAngle)
        var end = this.polarToDecart(x, y, r, startAngle)
    
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1"

        this._items.push(
            this.tagWithAttrs(
                'path',
                {
                    d: ["M", start.x, start.y,  "A", r, r, 0, arcSweep, 0, end.x, end.y, ].join(" "),
                    stroke: this._stroke, 
                    'stroke-width': this._strokeWidth,
                    fill: 'transparent'
                })        
        )
    }
}
