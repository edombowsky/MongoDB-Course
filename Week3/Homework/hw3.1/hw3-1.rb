require 'rubygems'
require 'mongo'

include Mongo

@client = MongoClient.new('localhost', 27017)
@db     = @client['school']
@coll   = @db['students']

@coll.find().each { |doc|

  # Finds the lowest scores id
  d = nil
  doc['scores'].each_index { |i|
    d = i if doc['scores'][i]['type'] == 'homework' && (d.nil? || doc['scores'][i]['score'] < doc['scores'][d]['score'])
  }

  # Removes the lowest score
  doc['scores'].delete_at(d) if !d.nil?

  # Updates the scores array
  @coll.update({_id: doc['_id']}, {'$set' => {scores: doc['scores']}})

}
