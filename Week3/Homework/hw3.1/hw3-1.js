db.students.find().forEach(
  function(student) {
    tmp_score = {type: 'homework', score: 0};
    new_scores = [];
    for(y=0; y<student.scores.length; y++) {
      if (student.scores[y].type == 'homework' && student.scores[y].score > tmp_score.score) {
        tmp_score = student.scores[y];
      }
      else if (student.scores[y].type != 'homework') {
        new_scores.push(student.scores[y]);
      }
    }
    new_scores.push(tmp_score);
    db.students.update({_id:student._id}, {$set: {scores: new_scores}});
  }
)
