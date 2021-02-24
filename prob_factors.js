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



var category_factors = 
[
    {
        name: "LCM",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numPrimes = difficulty >= 7 ? 5 : 4
                let commonPrimes = primesInRange(1, difficulty >= 7 ? 20 : 10).randomNonUniqSelection(numPrimes)

                let numNumbers = randValue(2, 3)
                let numbers = []

                console.log("\t\tLCM, common primes: ", commonPrimes)

                for (let iter = 0; numbers.length < numNumbers && iter < 10; ++ iter)
                {
                    let iterPrimes = commonPrimes.randomUniqSelection(randIntRange(1, numPrimes-1))
                    let num = iterPrimes.reduce((a, b) => a * b, 1)
                    if (!numbers.includes(num))
                    {
                        console.log("\t\tLCM, iter primes: ", iterPrimes)
                        numbers.push(num)
                    } 
                }
                if (numbers.length != numNumbers)
                    continue

                let ans = numNumbers == 2 ? lcm(numbers[0], numbers[1]) : lcm3(numbers[0], numbers[1], numbers[2]) 
                if (ans > 1500)
                    continue 
                
                // check that LCM is not equal to any of the numbers
                if (numbers.map(x => x == ans).reduce((acc, b) => (acc || b), false))
                    continue

                numbers.sort((a, b) => (a|0) - (b|0))
    
                if (numbers[0] == 2)
                    continue

                let common = numNumbers == 2 ? gcd(numbers[0], numbers[1]) : gcd3(numbers[0], numbers[1], numbers[2]) 
                if (common == 1)
                    continue


                root.innerHTML = "Find LCM of " + numbers.map(x => '' + x).reduce((a, b) => a + ',&nbsp; ' + b)
                ansRoot.innerHTML = ans
                break;
            }
        },         
    },
    {
        name: "GCD",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let numPrimes = difficulty >= 7 ? 5 : 4
                let commonPrimes = primesInRange(1, difficulty >= 7 ? 20 : 15).randomNonUniqSelection(numPrimes)

                let numNumbers = randValue(2, 3)
                let numbers = []

                console.log("\t\tGCD, common primes: ", commonPrimes)

                for (let iter = 0; numbers.length < numNumbers && iter < 10; ++ iter)
                {
                    let iterPrimes = commonPrimes.randomUniqSelection(numPrimes-2)
                    let num = iterPrimes.reduce((a, b) => a * b, 1)
                    if (!numbers.includes(num))
                    {
                        console.log("\t\tGCD, iter primes: ", iterPrimes)
                        numbers.push(num)
                    } 
                }
                if (numbers.length != numNumbers)
                    continue

                let common = numNumbers == 2 ? gcd(numbers[0], numbers[1]) : gcd3(numbers[0], numbers[1], numbers[2]) 
                if (common == 1 || common == 2)
                    continue
                if (numbers.includes(common))
                    continue
    
                numbers.sort((a, b) => (a|0) - (b|0))

                root.innerHTML = "Find HCF of " + numbers.map(x => '' + x).reduce((a, b) => a + ',&nbsp; ' + b)  + "<br><small style='color:#666'>(HCF is also known as GCD)</small>"
                ansRoot.innerHTML = common
                break;
            }
        },         
    },
    {
        name: "List factors of N",         
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let n = randIntRange(10, 20*difficulty)
                
                let factors = []
                for (let i = 2; i < n; ++ i)
                {
                    if (n % i == 0)
                        factors.push(i)
                }

                if (factors.length < 3) 
                    continue
                if (factors.length > 8)
                    continue

                root.innerHTML = "List the factors of " + n + "&nbsp;:<br>"
                ansRoot.innerHTML = factors.join(' ')
                break;
            }
        }, 
    },
]