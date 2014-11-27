use m101

// Calculates the average population of cities in California (abbreviation CA)
// and New York (NY) (taken together) with populations over 25,000.
//
// For this problem, assume that a city name that appears in more than one state
// represents two separate cities.

//
// 1. Match on CA or NY to get all cities in both states
// 2. Group by state and city and total the population of each city as some cityies
//    have more than one zip code and are thus mentioned more than once in the collection
// 3. Match on total population > 25000
// 4. Average the population of all the cities in both states
//

db.zips.aggregate([
  {$match:
    {
      $or:[{state:"CA"}, {state:"NY"}],
    }
  },
  {$group:
    {
      _id:{state:"$state", city:"$city"},
      totalPop:{$sum:"$pop"}
    }
  },
  {$match:
    {
      totalPop:{$gt:25000}
    }
  },
  {$group:
    {
      _id:null,
      avg:{$avg:"$totalPop"}
    }
  }
])
