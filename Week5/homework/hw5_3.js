use grades

// Your task is to calculate the class with the best average student performance.
// This involves calculating an average for each student in each class of all
// non-quiz assessments and then averaging those numbers to get a class average.
// To be clear, each student's average includes only exams and homework grades.
// Don't include their quiz scores in the calculation.
//
// What is the class_id which has the highest average student perfomance?

// Hint/Strategy: You need to group twice to solve this problem. You must figure
// out the GPA that each student has achieved in a class and then average those
// numbers to get a class average. After that, you just need to sort. The
// hardest class is class_id=2. Those students achieved a class average of 37.6

//
// 1. Getting all record other than quiz records.
// 2. Getting average score of each student in each class
// 3. Getting average score of each class
//

db.assessments.aggregate([
  {$unwind:"$scores"},
  {$match:
    {"scores.type":{$in:["homework", "exam"]}}
  },
  {$group:
    {
      _id:{class_id:"$class_id", student_id:'$student_id'},
      individualGPA:{$avg:"$scores.score"}
    }
  },
  {$project:
    {
      _id:0,
      class_id:"$_id.class_id",
      individualGPA:1
    }
  },
  {$group:
    {
      _id:{class_id:"$class_id"},
      classGPA:{$avg:"$individualGPA"}
    }
  },
  {$sort:{classGPA:1}},
])
