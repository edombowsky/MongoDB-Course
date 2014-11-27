use blog
db.posts.aggregate([
  {"$unwind":"$comments"},
  {$group:
    {
      _id:"$comments.author",
      commentsByAuthor:{$sum:1},
    }
  },
  {$sort:{commentsByAuthor:1}}
])
