Session.setDefault('currentText', '');
Session.setDefault('text', '');

Template.academic.helpers({
    'text': function () {
        return new Spacebars.SafeString(Session.get('text'));
    }
});

Template.academic.events({
    'keyup #textarea1': function (event) {
        //event.preventDefault();

        // enter: add line break
        var text = event.target.value;
        Session.set('currentText', text)
    },
    'click #evaluate': function (event) {
        // evaluates and creates the color coding
        event.preventDefault();
        getAcademicColorScheme(Session.get('currentText'));
    },
    'click #example': function (event) {
        var cWord = List.findOne({word: event.target.innerHTML
            .toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()\n]/g,"")});
        //console.log(cWord);
        showExampleModal(cWord.word, cWord.examples);
    }
});