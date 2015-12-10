Router.configure({
    layoutTemplate: 'home'
});

Router.route('/', function () {
    this.render('list')
});