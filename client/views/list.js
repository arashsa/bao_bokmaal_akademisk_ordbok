var size = 12;
Session.setDefaultPersistent('nr', size);

// 0 = numeric
// 1 = alphabetic
Session.setDefaultPersistent('sort', 0);

// current word for examples and the number of examples taken
Session.setDefaultPersistent('word', ['', 0]);

// for returning alphabetic lists
var l = '';

Meteor.startup(function () {
    l = List.find({}, {sort: {word: 1}}).fetch();
});

var setOrder = function (academic_word) {
    // sort by nr
    if (Session.get('sort') === 0) {
        if (academic_word.nr + size - 1 <= size)
            Session.setPersistent('nr', size);
        else
            Session.setPersistent('nr', academic_word.nr + size - 1);

    // sort alphabetically
    } else if (Session.get('sort') === 1) {
        var index = 0;
        for (var i = 0; i < l.length; i++) {
            if (l[i].word === academic_word.word) {
                index = i;
                break;
            }
        }
        Session.setPersistent('nr', index);
    }
};

Template.list.helpers({
    'words': function () {
        if (Session.get('sort') === 0) {
            return List.find({$and: [{nr: {$lte: Session.get('nr')}}, {nr: {$gte: Session.get('nr') - size + 1}}]},
                {sort: {nr: 1}});
        } else if (Session.get('sort') === 1) {
            return List.find({}, {sort: {word: 1}}).fetch().slice(Session.get('nr'), Session.get('nr') + size)
        }
    }
});

Template.list.events({
    // Getting examples
    'click #example': function (event) {
        showExampleModal(this.word, this.examples);
    },
    'click #nr': function (event) {
        event.preventDefault();
        Session.setPersistent('sort', 0);
        Session.setPersistent('nr', size);
    },
    'click #word': function (event) {
        event.preventDefault();
        Session.setPersistent('sort', 1);
        Session.setPersistent('nr', 0);
    },
    'click #start': function (event) {
        event.preventDefault();
        if (Session.get('sort') === 0)
            Session.setPersistent('nr', size);
        else if (Session.get('sort') === 1)
            Session.setPersistent('nr', 0);
    },
    'click #end': function (event) {
        event.preventDefault();
        if (Session.get('sort') === 0)
            Session.setPersistent('nr', List.find().count());
        else if (Session.get('sort') === 1)
            Session.setPersistent('nr', List.find().count() - size);
    },
    'click #back': function (event) {
        event.preventDefault();
        var cur = Session.get('nr');

        if (Session.get('sort') === 0) {
            if (cur > size * 2)
                Session.setPersistent('nr', cur - size);
            else
                Session.setPersistent('nr', size);
        } else if (Session.get('sort') === 1) {
            if (cur > size)
                Session.setPersistent('nr', cur - size);
            else
                Session.setPersistent('nr', 0);
        }
    },
    'click #next': function (event) {
        event.preventDefault();
        var cur = Session.get('nr');

        if (Session.get('sort') === 0) {
            if (cur < List.find().count())
                Session.setPersistent('nr', cur + size);
        } else if ((Session.get('sort') === 1)) {
            if (cur < List.find().count() - size)
                Session.setPersistent('nr', cur + size);
        }

    },
    // Search
    'keyup .validate': function (event) {
        //event.preventDefault();
        var text = event.target.value;

        if (text.length > 0) {
            // search exact match first
            var regex = new RegExp('^' + text + '$');
            var academic_word = List.findOne({word: {'$regex': regex}});
            if (academic_word) {
                setOrder(academic_word)
            } else {
                // get approximate match (start of word)
                regex = new RegExp('^' + text);
                academic_word = List.findOne({word: {'$regex': regex}});
                if (academic_word) {
                    setOrder(academic_word)
                }
            }
        }
    },
    'blur .validate': function (event) {
        event.target.value = '';
    }
});

Template.home.events({
    'click #list': function () {
        if (Session.get('sort') === 0)
            Session.setPersistent('nr', size);
        else if (Session.get('sort') === 1)
            Session.setPersistent('nr', 0);
    }
});