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

// returns hash map, where key is the category name 
// and value is the list of problems in the category
function getGeneratorsRaw()
{
    let generators = []

    let names = Object.keys( window ).filter(x => x.startsWith("category_"))

    for (let name of names)
    {
        let category = { name: name, data: eval(name) }
        assignCdfFlatWeights(category.data)

        generators.push(category)
    }
    assignCdfFlatWeights(generators)

    return generators
}

function createProbGenerator ()
{
    let generators = getGeneratorsRaw()

    return function() 
    {
        for (;;)
        {
            let category = weightedRandomValue(generators)
            let problem = weightedRandomValue(category.data)

            console.log("CAT: " + category.name + ", PROB: " + problem.name)

            if (Object.keys(problem).includes("max_count"))
            {
                if (problem.max_count <= 0)
                {
                    category.data = category.data.filter(x => x != problem)
                    if (category.data.length > 0)
                    {
                        normalizeWeights(category.data)
	                    calculateCdfRanges(category.data)
                    }
                    else 
                    {
                        generators = generators.filter(x => x != category)
                        normalizeWeights(generators)
	                    calculateCdfRanges(generators)
                    }
                    console.log("Max use count reached on " + category.name + ", problem " + problem.name + " - retrying")
                    continue
                }
                problem.max_count -= 1
            }

            // reduce probability of this category showing up again untill all others are used too
            scaleCdfWeight(category, 0.1, generators)
            // same for this particular problem type
            scaleCdfWeight(problem, 0.1, category.data)
            
            return problem 
        }
    }
}