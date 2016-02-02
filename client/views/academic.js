// For evaluation
Session.setDefaultPersistent('evaluate', true);

// For getting text
Session.setDefault('currentText', '');
Session.setDefault('text', '');

// when loading subscribe to Forms
//Template.academic.onCreated(function () {
//    this.subscribe('Forms');
//});

Template.academic.helpers({
    'text': function () {
        return new Spacebars.SafeString(Session.get('text'));
    },
    'evaluate': function () {
        return Session.get('evaluate');
    },
    'evalTop': function () {
        var text = Session.get('currentText');
        return text.length > 1000;
    }
});

Template.academic.events({
    'keyup #textarea1': function (event) {
        var text = event.target.value;
        Session.set('currentText', text)
    },
    'click #evaluate': function (event) {
        // evaluates and creates the color coding

        // how many words
        var evaluate = 100;

        event.preventDefault();

        Session.setPersistent('evaluate', false);
        var text = Session.get('currentText');
        text = text.split(' ');
        Session.set('text', '<p>');

        for (var i = 0; i < text.length; i += evaluate) {
            Meteor.call('getColors', text.slice(i, i + evaluate), function (error, response) {
                Session.set('text', Session.get('text') + response);
            });
        }

        Session.set('text', Session.get('text') + '</p>');
    },
    'click #back': function (event) {
        event.preventDefault();
        Session.set('text', '');
        Session.set('currentText', '');
        Session.setPersistent('evaluate', true)
    },
    'click #example': function (event) {
        var currWord = event.target.innerHTML.toLowerCase().replace(/[.,-\/#!?$%\^&\*;:{}=\-_`~()\n]/g,"");
        var cWord = List.findOne({word: currWord});

        if (cWord) {
            showExampleModal(cWord.word, cWord.examples);
        }
        else {
            Meteor.call('getForm', currWord, function (error, response) {
                cWord = response;
                if (cWord) {
                    showExampleModal(cWord, List.findOne({word: cWord}).examples)
                }
            });
        }
    }
});