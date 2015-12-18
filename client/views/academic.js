// For evaluation
Session.setDefaultPersistent('evaluate', true);

// For getting text
Session.setDefault('currentText', '');
Session.setDefault('text', '');

Template.academic.helpers({
    'text': function () {
        return new Spacebars.SafeString(Session.get('text'));
    },
    'evaluate': function () {
        return Session.get('evaluate');
    },
    'evalTop': function () {
        var text = Session.get('currentText');
        return text.length > 500;
    }
});

Template.academic.events({
    'keyup #textarea1': function (event) {
        var text = event.target.value;
        Session.set('currentText', text)
    },
    'click #evaluate': function (event) {
        // evaluates and creates the color coding

        // how many characters to evaluate at once
        var evaluate = 1000;

        event.preventDefault();

        Session.setPersistent('evaluate', false);
        var text = Session.get('currentText');

        for (var i = 0; i < text.length; i += evaluate) {
            Meteor.call('getColors', text.substring(i, i+evaluate-1), function (error, response) {
                Session.set('text', Session.get('text') + response);
            });
        }
    },
    'click #back': function (event) {
        event.preventDefault();
        Session.set('text', '');
        Session.set('currentText', '');
        Session.setPersistent('evaluate', true)
    },
    'click #example': function (event) {
        var cWord = List.findOne({word: event.target.innerHTML
            .toLowerCase().replace(/[.,-\/#!?$%\^&\*;:{}=\-_`~()\n]/g,"")});
        //console.log(cWord);
        showExampleModal(cWord.word, cWord.examples);
    }
});