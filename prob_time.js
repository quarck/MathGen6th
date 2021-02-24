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

var category_time = 
[
    {
        name: "Weekly income", 
        max_count: 1,
        fun: function (root, ansRoot, difficulty)
        {
            for (;;)
            {
                let person = personNames.pickRandom()
                let hrRate = [20, 25, 30, 35, 40].pickRandom()
                let startHr = [7, 8, 9, 10].pickRandom()
                let startMin = randIntRange(0, 12) * 5

                let endHr = [16, 17, 18].pickRandom()
                let endMin = randIntRange(0, 12) * 5

                let lunchDurationMins = [30, 45, 60].pickRandom()
                let daysAWeek = [4, 5].pickRandom()

                let startTimeTotalMins = 60 * startHr + startMin 
                let endTImeTotalMins = 60 * endHr + endMin
                let workMinutesTotalADay = endTImeTotalMins - startTimeTotalMins - lunchDurationMins


                let workMinutesTotalAWeek = daysAWeek * workMinutesTotalADay

                if ((workMinutesTotalAWeek * hrRate) % 60 != 0) 
                    continue

                let workHoursAWeek = workMinutesTotalAWeek / 60
                let weeklyIncome = workHoursAWeek * hrRate 
                
                root.innerHTML = person.name + " works " + daysAWeek + " days a week, " + 
                                person.pronoun  + " starts working at " + 
                                (new Digital24hClock(20, startHr, startMin)).html + 
                                ", finishes at " +
                                (new Digital24hClock(20, endHr, endMin)).html + 
                                " while having  " + lunchDurationMins + " minutes break in between. " + 
                                person.name + "'s hourly rate is &#8364;" + hrRate + ". What is " + person.possessive + " weekly income?"

                ansRoot.innerHTML = '&#8364;' + weeklyIncome.formatFlex(4) +
                                 " (total working hours per day: " +  Math.floor(workMinutesTotalADay / 60) + " hours, " + (workMinutesTotalADay % 60).pad(2) + " minutes"+
                                 "; per week: " + Math.floor(workMinutesTotalAWeek / 60) + " hours, " + (workMinutesTotalAWeek % 60).pad(2) + " minutes)"
                break;
            }
        },
    },
]

