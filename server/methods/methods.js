// List methods
Meteor.methods({
    // Remove current example from list
    'removeExample': function (w, sentences, toRemove) {
        // updates the list of examples
        Match.test(w, String);
        Match.test(sentences, [String]);
        List.update({word: w}, {$set: {examples: sentences}});

        Removed.insert({word: w, sentence:toRemove});
        //console.log(Removed.find().fetch());
        //console.log("Removed sentence from examples: " + toRemove);
    },

    // Add current example to count, if over x negatives remove word
    'addToRemoveList': function (w, i) {
        Match.test(w, String);
        Match.test(i, [String]);

        var exists = Remove.findOne({word: w, index: i});

        if (exists)
            Remove.update({word: w, index: i}, {$inc: {negatives: 1}});
        else
            Remove.upsert({word: w, index: i}, {$set: {negatives: 1}});

    },
    'increaseSentenceValue': function (w, i) {
        var exists = Remove.findOne({word: w, index: i});

        if (exists)
            Remove.update({word: w, index: i}, {$inc: {negatives: -1}});
        else
            Remove.upsert({word: w, index: i}, {$set: {negatives: 0}});
    },
    'checkAndRemove': function (currentWord, index) {
        var remove = Remove.findOne({word: currentWord, index: index});
        if (remove)
            remove = remove.negatives;

        // If it gets more than 2 negative reviews, remove word
        if (remove > 1) {
            if (index > -1) {
                var newExamples = List.findOne({word: currentWord}).examples;
                var toRemove = newExamples[index];

                // remove the examples from array
                newExamples.splice(index, 1);
                // Remove
                Meteor.call('removeExample', currentWord, newExamples, toRemove);
                return true;
            }
        }

        return false;
    }
});

// Testing academic text methods
Meteor.methods({
    'getForm': function (test) {
        var getWord = Forms.findOne({form: test});
        if (getWord)
            return getWord.main
    }
});
