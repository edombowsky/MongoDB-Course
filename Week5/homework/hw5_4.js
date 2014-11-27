use m101

// Using the aggregation framework, calculate the sum total of people who are
// living in a zip code where the city starts with a digit.
//
// 1. Match on cities starting with a digit [0-9]
// 2. Group by all ciries summing up the population
// 3. Make things nice by remoing thr _id
//

db.zips.aggregate([
  {$match:
    {
      city:{$regex:"^[0-9].*"}
    }
  },
  {$group:
    {
      _id:null,
      totalPop:{$sum:"$pop"}
    }
  },
  {$project:
    {
      _id:0,
      totalPop:1
    }
  }
])
