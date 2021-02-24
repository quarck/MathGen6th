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



var category_eqs = 
[
    {
        name: "Equation: Num + x = Num - Num",         
        fun: function (root, ansRoot, difficulty) // Num + x = Num - Num
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randIntRange(10, 100)
                if (a == 0)
                    continue;
                let b = randIntRange(10, 200)
                let c = randIntRange(10, 50)
        
                if (b-c-a <= 0)
                    continue
                if (b < c)
                    continue
                if (b == c)
                    continue
        
                if (randValue(true, false))
                    root.innerHTML = a + " + " + name + " = " + b + " - " + c + ". &nbsp;&nbsp; What is " + name + "?"
                else
                    root.innerHTML =  name + " + " + a + " = " + b + " - " + c + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name +" = " + (b-c-a)
                break;
            }
        },         
    },
    {
        name: "Equation: Num - x = Num + Num", 
        fun: function (root, ansRoot, difficulty) // Num - x = Num + Num
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randIntRange(10, 100)
                if (a == 0)
                    continue;
                let b = randIntRange(10, 200)
                let c = randIntRange(10, 50)
                if (a -b -c <= 0)
                    continue
                if (b == c)
                    continue

                root.innerHTML = a + " - " + name + " = " + b + " + " + c + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name +" = " + (a-b-c)
                break;
            }
        },         
    },
    {
        name: "Equation: Float + x = Float", 
        fun: function (root, ansRoot, difficulty) // Float + x = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(4, 20, 2)
                if (Math.abs(a) < 0.0001)
                    continue
                let b = randFixFloat(1, 20, 2)
        
                if (b - a <= 1.0)
                    continue
        
                if (randValue(true, false))
                    root.innerHTML = a.formatFlex(2) + " + " + name + " = " + b.formatFlex(2) + ". &nbsp;&nbsp; What is " + name + "?"
                else
                    root.innerHTML = name + " + " + a.formatFlex(2) + " = " + b.formatFlex(2) + ". &nbsp;&nbsp; What is " + name + "?"
        
                ansRoot.innerHTML = name + " = " + (b - a).formatFlex(2)
                break;
            }
        }
        ,         
    },
    {
        name: "Equation: Float* x = Float", 
        fun: function (root, ansRoot, difficulty) // Float* x = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(1, 10, 0)
                let b = (randInt(50)) * a        
                let c = (randInt(20))                
                b -= c
                if (b <= 2)
                    continue
                if (Math.abs(a) < 0.1)
                    continue;
                if (Math.abs(a) == 1)
                    continue;
                if (b == 0 || c == 0)
                    continue

                root.innerHTML = a.formatFlex(1) + name + " = " + b.formatFlex(1) + " + " +  c.formatFlex(1) + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name + " = " + ((b + c) / a).formatFlex(0)
                break;
            }
        },         
    },
    {
        name: "Equation: Int* x + Float = Float", 
        fun: function (root, ansRoot, difficulty) // Int* x + Float = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(1, 10, 0)
                let b = randIntRange(2, 50) * a
                let c = randFixFloat(1, 30, 1)
                if (Math.abs(a) < 0.1)
                    continue;
                if (Math.abs(a) == 1)
                    continue;
                root.innerHTML = a.formatFlex(1) + name + " + " + c + " = " + (b+c).formatFlex(1) + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name + " = " + (b / a).formatFlex(0)
                break;
            }
        },         
    },
    {
        name: "Equation: Int* x - Float = Float", 
        fun: function (root, ansRoot, difficulty) // Int* x - Float = Float
        {
            for (;;)
            {
                let name = randomName('x', 'y')
                let a = randFixFloat(1, 10, 0)
                let b = (randInt(50)) * a
                let c = randFixFloat(1, 30, 1)
                if (Math.abs(a) < 0.1)
                    continue;
                if (Math.abs(a) == 1)
                    continue;
                if (b - c < 1)
                    continue
                root.innerHTML = a.formatFlex(1) + name + " - " + c + " = " + (b - c).formatFlex(1) + ". &nbsp;&nbsp; What is " + name + "?"
                ansRoot.innerHTML = name + " = " + (b / a).formatFlex(0)
                break;
            }
        }
        ,         
    },

]
