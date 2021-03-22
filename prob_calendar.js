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



var category_calendar = 
[
    {
        name: "Total days in two months", 
        max_count: 1, 
        fun: function (root, ansRoot, difficulty) 
        {
            let monthDetails = 
            [
                {name: "January", days: 31}, 
                {name: "March", days: 31}, 
                {name: "February", days: 28},
                {name: "April", days: 30}, 
                {name: "May", days: 31}, 
                {name: "June", days: 30}, 
                {name: "July", days: 31}, 
                {name: "August", days: 31}, 
                {name: "September", days: 30}, 
                {name: "October", days: 31}, 
                {name: "November", days: 30}, 
                {name: "December", days: 31}, 
            ]

            for (;;)
            {
                let months = monthDetails.randomUniqSelection(2)

                let problem = "How many days in " + months[0].name + " and " + months[1].name + " alltogether?"
                let answer = months[0].days + months[1].days

                if (months.find(x => x.name == 'February'))
                {
                    if (randValue(true, false))
                    {
                        problem += " (leap year)"
                        answer += 1
                    }
                    else 
                    {
                        problem += " (common year)"
                    }
                }
                

                root.innerHTML = problem + " ___________"                    
                ansRoot.innerHTML = answer
                break;
            }
        },         
    },


    {
        name: "Someone was born in...", 
        max_count: 1, 
        fun: function (root, ansRoot, difficulty) 
        {
            for (;;)
            {
                let born = randIntRange(1950, 1995)
                let upto = randIntRange(2000, 2020)
                let person = personNames.pickRandom().name

                root.innerHTML = person + " was born in " + born + ". How many years before the year " + upto + " was that? ______"
                ansRoot.innerHTML = upto - born
                break;
            }
        },         
    },



]
