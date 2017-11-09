// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var TaskSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId, default: mongoose.Types.ObjectId()},
    name : String,
    description: {type: String, default: "no description"},
    deadline : Date,
    completed: {type: Boolean, default: false},
    assignedUser: {type: String, default: ""},
    assignedUserName : {type: String, default: "unassigned"},
    dateCreated: {type: Date, default: new Date()}
});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema,'Task');
