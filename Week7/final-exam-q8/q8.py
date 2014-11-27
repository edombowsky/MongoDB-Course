import sys

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.test
animals = db.animals
animals.drop()

def dump_collection(message):
    try:
        cursor = animals.find()

    except:
        print "Unexpected error:", sys.exc_info()[0]

    print message
    for doc in cursor:
        print doc

doc = {'animal': 'monkey'}

dump_collection('Before first insert...')
animals.insert(doc)
dump_collection('After first insert...')
del doc['animal']
dump_collection('After first delete...')

doc['animal'] = 'cat'
animals.insert(doc)
dump_collection('After second insert...')
del doc['animal']
dump_collection('After second delete...')
doc['animal'] = 'lion'
animals.insert(doc)
dump_collection('After third insert...')
