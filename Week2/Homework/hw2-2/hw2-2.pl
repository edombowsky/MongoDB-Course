#!/usr/bin/perl
use MongoX (host => 'mongodb://127.0.0.1');
use Tie::IxHash;

with_context {
    my $student_id_last = -1;
    my $grades = context_collection
                    ->find({type => 'homework'})
                    ->sort(Tie::IxHash->new(student_id => 1, score => 1));
    while(my $grade = $grades->next()) {
        if($student_id_last != $grade->{student_id}){
            $student_id_last = $grade->{student_id};
            context_collection->remove($grade);
        }
    }
} db => 'students', collection => 'grades';
