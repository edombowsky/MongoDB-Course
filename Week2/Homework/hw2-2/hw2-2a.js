db.grades.aggregate(
    {$match: {type: "homework"}},
    {$sort: { student_id:1, score:1}},
    {$group: {
        _id: "$student_id",    //unnecessary
        low: {$min: "$score"}, //unnecessary
        did: {$first: "$_id"}
    }})
    .result.forEach( function(e) {
            db.grades.remove( {_id: e.did});
        }
    );
