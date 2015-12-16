Meteor.publish('List', function () {
    return List.find()
});

Meteor.publish('Remove', function () {
    return Remove.find();
});