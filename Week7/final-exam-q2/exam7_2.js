use enron

// For this question you will use the aggregation framework to figure out pairs
// of people that tend to communicate a lot. To do this, you will need to unwind
// the To list for each message.
//
// This problem is a little tricky because a recipient may appear more than once
// in the To list for a message. You will need to fix that in a stage of the
// aggregation before doing your grouping and counting of (sender, recipient)
// pairs.

// Taken from http://mosolov.wordpress.com/2012/12/12/mongodb-for-developers-final-exam-question-2-my-answer/
db.messages.aggregate([
  {$project: {from: "$headers.From",to: "$headers.To"}},
  {$unwind: "$to"},
  {$group : { _id : { _id: "$_id", from: "$from", to: "$to" }}},
  {$group : { _id : { from: "$_id.from", to: "$_id.to" }, count: {$sum :1}}},
  {$sort : {count:-1}},
  {$limit: 5}
])

// This is for the small_message database created for testing
use test
db.messages.aggregate([
  {$unwind: "$to"},
  {$group : { _id : { _id: "$_id", from: "$from", to: "$to" }}},
  {$group : { _id : { from: "$_id.from", to: "$_id.to" }, count: {$sum :1}}},
  {$sort : {count:-1}},
])


