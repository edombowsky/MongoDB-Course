use exam_q7

db.images.aggregate (
     {$unwind: "$tags"},
     {$group:
         {
             _id: '$tags',
             count: {$sum: 1}
         }
     }
 )
