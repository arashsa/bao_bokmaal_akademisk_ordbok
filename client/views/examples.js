Session.setDefaultPersistent('feedback', true);
Session.setDefaultPersistent('first', true);

var setNewExample = function () {
    var currentWord = List.findOne({word: Session.get('word')[0]});
    var returnExample = Math.floor((Math.random() * currentWord.examples.length));
    Session.setPersistent('word', [currentWord.word, returnExample])
};

Template.examples.events({
    'click #yes': function (event) {
        event.preventDefault();
        Session.setPersistent('feedback', false);
        console.log(Session.get('word'));
        //MaterializeModal.close();
    },
    'click #no': function (event) {
        event.preventDefault();

        // remove sentence from examples
        var currentWord = Session.get('word')[0];
        var index = Session.get('word')[1];

        Meteor.call('addToRemoveList', currentWord, index);
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
                Meteor.call('removeExample', currentWord, newExamples, toRemove)
            }
        }

        Session.setPersistent('feedback', false);
        setNewExample();
        //MaterializeModal.close();
    },
    'click #next': function (event) {
        event.preventDefault();
        Session.setPersistent('first', false);
        Session.setPersistent('feedback', true);
        setNewExample();
    }
});

Template.examples.helpers({
    'showFeedback': function () {
        return Session.get('feedback');
    },
    'first': function () {
        return Session.get('first');
    },
    'example_': function () {
        return List.findOne({word: Session.get('word')[0]}).examples[Session.get('word')[1]];
    }
});