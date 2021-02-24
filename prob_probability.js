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

var category_probability = 
[
    {
        name: "Bag picking prob", 
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            let items = 
            [
                ['orange', 'apple', 'pear'],
                ['red ball', 'green ball', 'blue ball'],
                ['science book', 'english book', 'scifi book'],
                ['yellow sweet', 'green sweet', 'orange sweet'],
                ['blue card', 'green card', 'black card'],
            ]

            for (;;)
            {
                let kind = items.pickRandom()
                let n = [randIntRange(1, 1 + 5 * difficulty), randIntRange(1, 1 + 5 * difficulty), randIntRange(1, 1 + 5 * difficulty)]
                let i = randIntRange(0, 3)
                

                root.innerHTML = "In the bag of " + n[0] + " " + kind[0] + n[0].pluralSuffix() + ", " +
                                                    n[1] + " " + kind[1] + n[1].pluralSuffix() + " and " + 
                                                    n[2] + " " + kind[2] + n[2].pluralSuffix() + ", " + 
                                "what is the chance of picking " + kind[i].indefiniteArticle() + " " + kind[i] + "?<br><br><br>_______ in _______"
                let nom = n[i]
                let denom = n[0] + n[1] + n[2]
                let g = gcd(nom, denom)
                if (g == 1)
                {
                    ansRoot.innerHTML = nom + " in " + denom
                }
                else 
                {
                    ansRoot.innerHTML = nom + " in " + denom + " &nbsp; or &nbsp; " + (nom / g).toInt() + " in " + (denom / g).toInt()
                }
                break;
            }
        },
    },
]

