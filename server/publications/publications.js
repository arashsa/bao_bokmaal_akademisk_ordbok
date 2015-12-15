Meteor.publish('List', function () {
    return List.find()
});

Meteor.publish('Remove', function () {
    return Remove.find();
});

// TODO: comment out after testing
// To reset list
List.remove({});
console.log("deleted");