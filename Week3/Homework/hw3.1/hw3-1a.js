db=connect("school"); //use school
var cur = db.students.find({}, {_id:1, scores:1});
while(cur.hasNext())
{
  var doc=cur.next();
  var minScore = null;
  for each(var score in doc.scores)
  {
    if(score.type == "homework")
    {
      if(minScore == null || minScore.score > score.score)
        minScore = score;
    }
  }
  if(minScore)
  {
    db.students.update({_id:doc._id}, {$pull: {scores:minScore}});
    //print("Delete: "); printjson(minScore)
  }
}
