// The actual word list
List = new Mongo.Collection('List');

// Sentences to remove
Remove = new Mongo.Collection('Remove');

// Server side collection to add removed sentences
Removed = new Mongo.Collection('Removed');