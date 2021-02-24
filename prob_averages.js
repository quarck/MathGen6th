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

function randRangeForDifficulty(numItems, difficulty)
{
    let items = null 
                
    if (difficulty <= 3)
    {
        items = range(1, 10).randomUniqSelection(numItems)
    }
    else if (difficulty <= 5)
    {
        items = range(1, 10).randomUniqSelection(numItems).map(x => x * 5)
    }
    else if (difficulty <= 7)
    {
        items = range(1, 50).randomUniqSelection(numItems)
    }
    else
    {
        items = range(1, 150).randomUniqSelection(numItems)
    }

    return items
}

var category_averages = 
[
    {
        name: "Averages - Integer items", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numItems = difficulty <= 7 ? 4 : 5
                let items = randRangeForDifficulty(numItems, difficulty) 

                let sum = items.reduce((a,b) => a + b)

                let intResult = randValue(true, false)

                if (intResult)
                {
                    while (sum % numItems != 0)
                    {
                        items[randInt(numItems)]++
                        sum = items.reduce((a,b) => a + b)
                    }
                }

                root.innerHTML = "What is the average of:<br>" + items.join(',&nbsp; ') + '?' + "<br><br>_______"
                ansRoot.innerHTML = (sum / numItems).formatFlex(5)
                break;
            }
        },
    },

    {
        name: "Averages - simple decimal fractions", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numItems = difficulty <= 5 ? 4 : 5
                let items = randRangeForDifficulty(numItems, difficulty) 

                let sum = items.reduce((a,b) => a + b)

                while (sum % numItems != 0)
                {
                    items[randInt(numItems)]++
                    sum = items.reduce((a,b) => a + b)
                }

                let divide_by = difficulty < 3 ? 4 : randValue(4, 10)


                items = items.map(x => x / divide_by)
                sum /= divide_by


                root.innerHTML = "What is the average of:<br>" + items.map(x => x.formatFlex(4)).join(',&nbsp; ') + '?' + "<br><br>_______"
                ansRoot.innerHTML = (sum / numItems).formatFlex(5)
                break;
            }
        },
    },

    {
        name: "Averages - mixed fractions", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numItems = difficulty <= 5 ? 4 : 5
                let items = randRangeForDifficulty(numItems, difficulty) 

                let sum = items.reduce((a,b) => a + b)

                while (sum % numItems != 0)
                {
                    items[randInt(numItems)]++
                    sum = items.reduce((a,b) => a + b)
                }

                let divide_by = 4

                let randomPositions = range(0, numItems).randomUniqSelection(2)

                if (items[randomPositions[0]] % divide_by == 0 || items[randomPositions[1]] % divide_by == 0)
                    continue

                items = items.map(x => new Fraction(x, divide_by).simplify())
                sum /= divide_by

                let text = ''
                for (let idx = 0; idx < numItems; ++ idx)
                {   
                    if (idx > 0)                 
                        text += '<td>,&nbsp;&nbsp;</td>'
                    if (idx == randomPositions[0] || idx == randomPositions[1])
                    {
                        text += '<td>' + items[idx].asMixedNumberHtmlTable + '</td>'
                    }
                    else
                    {
                        text += '<td>' + items[idx].asDecimal.formatFlex(4) + '</td>'
                    }                      

                }


                root.innerHTML = "What is the average of:<br>" + 
                                '<table><tr>' + text + '<td>?</td></tr></table>' + 
                                 "<br>_______"
                ansRoot.innerHTML = (sum / numItems).formatFlex(5)
                break;
            }
        },
    },

    {
        name: "Averages - Missing int", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numItems = difficulty <= 7 ? 4 : 5
                let items = randRangeForDifficulty(numItems, difficulty) 

                let sum = items.reduce((a,b) => a + b)
                while (sum % numItems != 0)
                {
                    items[randInt(numItems)]++
                    sum = items.reduce((a,b) => a + b)
                }            

                root.innerHTML = "The average of " + numItems + " numbers is " + (sum / numItems).formatFlex(5) + ".<br>" + 
                 "The first " + (numItems -1) + " numbers are: <br>" + items.splice(0, numItems-1).join(',&nbsp; ') + "<br>What is the other number?<br><br>_______"
                ansRoot.innerHTML = items[0]
                break;
            }
        },
    },

]

