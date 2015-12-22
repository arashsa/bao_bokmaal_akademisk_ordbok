Router.configure({
    layoutTemplate: 'home',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    loadingTemplate: 'loading',
    waitOn: function () {
        return Meteor.subscribe('List');
    },
    action: function () {
        this.render('list');
    },
    cache: true
}
    //this.render('list')
);

Router.route('/academic', function () {
    this.render('academic');
});

Router.route('/about', function () {
    this.render('about');
});

Router.route('/aboutEnglish', function () {
    this.render('aboutEnglish');
});