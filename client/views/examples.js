Session.setDefaultPersistent('feedback', true);

Template.examples.events({
    'click #yes': function (event) {
        event.preventDefault();
        Session.setPersistent('feedback', false);
        //MaterializeModal.close();
    },
    'click #no': function (event) {
        event.preventDefault();

        // remove sentence from examples
        var current_word = Session.get('word')[0];
        var index = Session.get('word')[1];

        Meteor.call('addToRemoveList', current_word, index);
        var remove = Remove.findOne({word: current_word, index: index});
        if (remove)
            remove = remove.negatives;

        // If it gets more than 2 negative reviews, remove word
        if (remove > 1) {
            if (index > -1) {
                var newExamples = List.findOne({word: current_word}).examples;
                var toRemove = newExamples[index];

                // remove the examples from array
                newExamples.splice(index, 1);
                // Remove
                Meteor.call('removeExample', current_word, newExamples, toRemove)
            }
        }

        Session.setPersistent('feedback', false);
        MaterializeModal.close();
    }
});

Template.examples.helpers({
    'showFeedback': function () {
        return Session.get('feedback');
    }
});