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


var category_percents = 
[
    {
        name: "Increase Money PCT", 
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let pct = difficulty >= 7 ? randIntRange(5, 41) : randIntRange(1, 9) * 5
                let amount = randIntRange(5, 15) * 100

                root.innerHTML = "Increase &#8364;" + amount + " by " + pct + "&#37;"
                ansRoot.innerHTML = "&#8364;" + (amount + amount*pct/100)
                break;
            }
        },
    },
    {
        name: "Decrease Money PCT",
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let pct = difficulty >= 7 ? randIntRange(5, 41) : randIntRange(1, 9) * 5
                let amount = randIntRange(5, 15) * 100

                root.innerHTML = "Decrease &#8364;" + amount + " by " + pct + "&#37;"
                ansRoot.innerHTML = "&#8364;" + (amount - amount*pct/100)
                break;
            }
        },         
    },
]
