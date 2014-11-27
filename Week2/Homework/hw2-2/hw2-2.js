student_ids = db.grades.distinct('student_id');
for (var i=0; i<student_ids.length; i++) {
  homework = db.grades.find({student_id: student_ids[i],type:'homework'}).sort({score:1}).limit(1);
  db.grades.remove({_id: homework[0]._id});
}
