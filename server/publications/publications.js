Meteor.publish('List', function () {
    return List.find()
});

Meteor.publish('Remove', function () {
    return Remove.find();
});

//Meteor.publish('Forms', function () {
//    return Forms.find();
//});