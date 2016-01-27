// The actual word list
List = new Mongo.Collection('List');

// The added forms
Forms = new Mongo.Collection('Forms');

// Sentences to remove
Remove = new Mongo.Collection('Remove');

// Server side collection to add removed sentences
Removed = new Mongo.Collection('Removed');