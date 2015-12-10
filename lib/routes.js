Router.configure({
    layoutTemplate: 'home',
    notFoundTemplate: 'notFound'
});

Router.route('/', function () {
    this.render('list')
});

Router.route('/academic', function () {
    this.render('academic');
});

Router.route('/about', function () {
    this.render('about');
});