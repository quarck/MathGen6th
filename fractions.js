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

class Fraction 
{
    constructor(nom, denom) 
    {
        this.nom = nom
        this.denom = denom
    }

    get asDecimal() 
    {
        return this.nom / this.denom
    }

    threeItemTable(a, n, d)
    {
        return "<table>" + 
                    "<tr>" +
                        "<td rowspan='2' align='center'>" + a + "</td>" + 
                        "<td class='fraction_nom' align='center'>" + n + "</td>" + 
                    "</tr>" + 
                    "<tr>" + 
                        "<td class='fraction_denom' align='center'>" + d + "</td>" + 
                    "</tr>" +
                "</table>"
    }


    twoItemTable(n, d)
    {
        return "<table>" + 
                    "<tr>" +                        
                        "<td class='fraction_nom' align='center'>" + n + "</td>" + 
                    "</tr>" + 
                    "<tr>" + 
                        "<td class='fraction_denom' align='center'>" + d + "</td>" + 
                    "</tr>" +
                "</table>"
    }

    get asPureFractionHtmlTable() 
    {
        if (this.nom < 0)
            return this.threeItemTable('-', -this.nom, this.denom)
        else 
            return this.twoItemTable(this.nom, this.denom)
    }


    get asMixedNumberHtmlTable()
    {
        
        let n = Math.abs(this.nom)
        let d = this.denom         
        let s = this.nom < 0 ? '-' : ''        
        let i =  Math.floor(n / d)
        if (i == 0)
            return this.asPureFractionHtmlTable
        return this.threeItemTable(s + Math.floor(n / d), n % d, d)
    }

    toString() { return this.nom + "/" + this.denom }

    multiply(other)  { return new Fraction( this.nom * other.nom, this.denom * other.denom ) }

    divide(other)  { return new Fraction( this.nom * other.denom, this.denom * other.nom ) }

    // I already have one in 'utils.js', but I want 'fractions.js' to be more self-contained 
    gcd(a, b)
    {
        if (a == 0 || b == 0)
            return 1
        while (a != b)
        {
            if (a > b)
                a -= b 
            else 
                b -= a
        }
        return a
    }

    // ret = this + other*factor 
    addmul(other, factor)
    {
        let ourGcd = this.gcd(this.denom, other.denom)
        let commonDenom = this.denom * other.denom / ourGcd
        let myScale = other.denom / ourGcd
        let otherScale = this.denom / ourGcd
        return new Fraction(this.nom * myScale + other.nom * otherScale * factor, commonDenom)
    }

    add(other) { return this.addmul(other, 1) }

    sub(other) { return this.addmul(other, -1) }

    simplify() 
    {
        let mygcd = this.gcd(this.nom, this.denom)
        return new Fraction(this.nom / mygcd, this.denom / mygcd)
    }
}

