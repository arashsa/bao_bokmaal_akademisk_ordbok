Session.setDefaultPersistent('feedback', true);
Session.setDefaultPersistent('first', true);
Session.setDefaultPersistent('removed', false);

var setNewExample = function () {
    var currentWord = List.findOne({word: Session.get('word')[0]});
    var currentVal = Session.get('word')[1];

    var returnExample = Math.floor((Math.random() * currentWord.examples.length));
    if (currentVal != returnExample)
        Session.setPersistent('word', [currentWord.word, returnExample]);
    else if (currentWord.examples.length > 1)
        setNewExample();

    Session.setPersistent('first', false);
    Session.setPersistent('feedback', true);
};

Template.examples.events({
    'click #yes': function (event) {
        event.preventDefault();
        Session.setPersistent('feedback', false);
        //MaterializeModal.close();

        Meteor.call('increaseSentenceValue', Session.get('word')[0], Session.get('word')[1]);
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
                Meteor.call('removeExample', currentWord, newExamples, toRemove);
                Session.set('removed', true);
            }
        }

        Session.setPersistent('feedback', false);
        //setNewExample();
        //MaterializeModal.close();
    },
    'click #next': function (event) {
        event.preventDefault();
        Session.setPersistent('feedback', false);
        Session.set('removed', false);
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
        if (Session.get('removed')) {
            return 'Takk for tilbakemelding! Setningen er nå fjernet fra eksempler.'
        }
        return List.findOne({word: Session.get('word')[0]}).examples[Session.get('word')[1]];
    },
    'color': function () {
        if (Session.get('removed'))
            return 'red-text text-lighten-2';
    }
});