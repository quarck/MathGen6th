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

    get asMixedNumberHtmlTable()
    {
        let modulo = this.nom % this.denom 
        let intPart = Math.round(this.nom - modulo)  / this.denom 
        return "<table>" + 
                    "<tr>" +
                        "<td rowspan='2' align='center'>" + intPart + "</td>" + 
                        "<td class='fraction_nom' align='center'>" + modulo + "</td>" + 
                    "</tr>" + 
                    "<tr>" + 
                        "<td class='fraction_denom' align='center'>" + this.denom + "</td>" + 
                    "</tr>" +
                "</table>"
    }

    get asPureFractionHtmlTable() 
    {
        return "<table>" + 
                    "<tr>" +                        
                        "<td class='fraction_nom' align='center'>" + this.nom + "</td>" + 
                    "</tr>" + 
                    "<tr>" + 
                        "<td class='fraction_denom' align='center'>" + this.denom + "</td>" + 
                    "</tr>" +
                "</table>"
    }

    toString() 
    {
        return this.nom + "/" + this.denom
    }

    multiply(other) {
        return new Fraction( this.nom * other.nom, this.denom * other.denom )
    }

    divide(other) {
        return new Fraction( this.nom * other.denom, this.denom * other.nom )
    }

    
}

l = new Fraction(10, 3)
console.log(l.asMixedNumberHtmlTable)
console.log('----')
console.log(l.asPureFractionHtmlTable)