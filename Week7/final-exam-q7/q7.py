#
# > mongoimport --drop --db exam_q7 --collection images <images.json
#
# 1. image docs before processing:
#
# db.images.count()
# 42415
#
# 2. Number of images tagged with 'kittens' before processing:
#
# grep -c kittens images.jettison
# 40455
#
# db.images.aggregate (
#     {$unwind: "$tags"},
#     {$group:
#         {
#             _id: '$tags',
#             count: {$sum: 1}
#         }
#     }
# )
#
# {
#   "result": [
#     {
#       "_id": "sunrises",
#       "count": 40464
#     },
#     {
#       "_id": "dogs",
#       "count": 40444
#     },
#     {
#       "_id": "work",
#       "count": 40208
#     },
#     {
#       "_id": "cats",
#       "count": 40388
#     },
#     {
#       "_id": "travel",
#       "count": 40585
#     },
#     {
#       "_id": "vacation",
#       "count": 40377
#     },
#     {
#       "_id": "kittens",
#       "count": 40455
#     }
#   ],
#   "ok": 1
# }

import sys

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.exam_q7
images = db.images
albums = db.albums
images_to_be_deleted = []

# for image in images:
#     if albums.findOne({ 'images._id': 'image._id' }) == null:
#         images.remove({ '_id': 'image._id' })

try:
    iter = images.find(timeout=False)

except:
    print "Unexpected error:", sys.exc_info()[0]

for image in iter:
    # print image
    image_id = image['_id']
    # print 'Looking for image_id: ', image_id
    num_image_references_found = albums.find({ 'images': {'$in': [image_id] } }).count()
    # print 'Found '+  str(num_image_references_found)
    if num_image_references_found == 0:
         # print 'remove image id: ' + str(image_id)
         images_to_be_deleted.append(image_id)
         images.remove({'_id': image_id})

print images_to_be_deleted
