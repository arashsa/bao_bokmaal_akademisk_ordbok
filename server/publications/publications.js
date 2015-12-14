Meteor.publish('List', function () {
    return List.find()
});

// TODO: comment out after testing
// To reset list
//List.remove({});
//console.log("deleted");