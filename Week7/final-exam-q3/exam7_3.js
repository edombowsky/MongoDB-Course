use enron

db.messages.update(
  {"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"},
  { $push: { "headers.To": "mrpotatohead@10gen.com" } }
)

// Welcome to the Final Exam, Problem 3 Checker. My job is to make sure you updated the doc correctly
// Tests Passed for Final 3. Your Final 3 validation code is 897h6723ghf25gd87gh28

// This from http://mosolov.wordpress.com/2012/12/12/mongodb-for-developers-final-exam-question-3-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5/
// may also work

// db.messages.update(
//   {"headers.Message-ID":"<8147308.1075851042335.JavaMail.evans@thyme>"},
//   {$addToSet: {"headers.To": "mrpotatohead@10gen.com"}},
//   {multi: 1}
// )
