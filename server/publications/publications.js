Meteor.publish('List', function () {
    return List.find()
});

List.remove({});
console.log("done");