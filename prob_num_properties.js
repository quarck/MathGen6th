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



var category_number_properties = 
[
    {
        name: "Primes in range",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let from = randIntRange(2, 90)
                let to = from + 5 + difficulty
                let primes = range(from, to+1).filter(x => x.isPrime())
                if (primes.length == 0)
                    continue

                if (primes[0] == from)
                    from -= 1
                if (primes[primes.length-1] == to)
                    to += 1

                root.innerHTML = "Make a list of prime numbers between " + from + " and " + to 
                ansRoot.innerHTML = primes.map(x => '' + x).reduce((a, x) => a + ' ' + x)
                break;
            }
        },         
    },
    {
        name: "Squares in range",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let from = randIntRange(1, 65)
                let to = from + 5 + difficulty*Math.sqrt(from).toInt()
                let squares = range(from, to+1).filter(x => x.isSquare())
                if (squares.length == 0)
                    continue
                if (squares[0] == from)
                    from -= 1
                if (squares[squares.length-1] == to)
                    to += 1

                root.innerHTML = "What are the square numbers between " + from + " and " + to
                ansRoot.innerHTML = squares.map(x => '' + x).reduce((a, x) => a + ' ' + x)
                break;
            }
        },         
    },
    {
        name: "Composites in range",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numPrimes = (difficulty >= 9) ? 4 : (difficulty > 5 ? 3 : 2)
                let manyPrimes = range(10, 100).filter(x => x.isPrime())
                let aMix = manyPrimes.randomUniqSelection(numPrimes)
                let someLikelyNotPrimes = (aMix.map(x => x + 2)).concat(aMix.map(x => x - 2))
                aMix = aMix.concat(someLikelyNotPrimes)

                let composites = aMix.filter(x => !x.isPrime())

                if (composites.length == 0)
                    continue
                if (composites.length == aMix.length) // all primes?? 
                    continue 

                root.innerHTML = "Circle the composite numbers in the list: <br>" + aMix.sort().join(' ') 
                ansRoot.innerHTML = composites.sort().join(' ')
                break;
            }
        },         
    },
]
