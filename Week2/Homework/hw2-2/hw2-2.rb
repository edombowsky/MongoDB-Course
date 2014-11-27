require 'rubygems'
require 'mongo'

include Mongo

@client = MongoClient.new('localhost', 27017)
@db     = @client['students']
@coll   = @db['grades']

puts "There were #{@coll.count} records..."

# Initiates the current_id to nil
current_id = nil;

# Note that the dictionary in Ruby stays in the given order
# making the sort implementation simpler
@coll.find({type:'homework'}).sort({student_id:1, score:1}).each { |doc|

  # Checks for a student_id change
  if current_id != doc['student_id'] then
    # Keeps the new student_id
    current_id = doc['student_id']

    # Displays the current document
    puts doc.inspect

    # Removes the current document
    @coll.remove(doc)
  end
}

puts "And now there are #{@coll.count} records."

#  Alternative way to iterate through collection
# @coll.find({type:'homework'}).sort({student_id:1, score:1}).inject do |student_memo, student|
#   @coll.remove(student_memo) if student['student_id'] == student_memo['student_id'] && student['score'] > student_memo['score']
#   student
# end
