Template.home.events({
    'click #academic': function () {
        Session.setPersistent('evaluate', true);
        Session.setPersistent('text', '');
        Session.setPersistent('currentText', '');
    }
});

Template.home.onRendered(function () {
    $(".button-collapse").sideNav();
});