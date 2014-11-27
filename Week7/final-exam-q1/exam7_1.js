use enron

// Construct a query to calculate the number of messages sent by Andrew Fastow,
// CFO, to Jeff Skilling, the president. Andrew Fastow's email addess was
// andrew.fastow@enron.com. Jeff Skilling's email was jeff.skilling@enron.com.
//
// For reference, the number of email messages from Andrew Fastow to
// John Lavorato (john.lavorato@enron.com) was 1.
//
// The answer is 3.

db.messages.aggregate([
  {$match:
    {
      "headers.From": "andrew.fastow@enron.com"
    }
  },
  {$unwind: "$headers.To" },
  {$match:
    {
      "headers.To": "jeff.skilling@enron.com" //john.lavorato@enron.com"
    }
  },
  {$group:
    {
      _id: null,
      totalFromAndrew: { $sum: 1 }
    }
  },
])


// The following taken from
//
//     http://mosolov.wordpress.com/2012/12/12/mongodb-for-developers-final-exam-question-1/
//
// also works and is much, much quicker
db.messages.find({"headers.From":"andrew.fastow@enron.com","headers.To":"jeff.skilling@enron.com"}).count()
