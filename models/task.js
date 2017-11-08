// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var TaskSchema = mongoose.Schema({
    name : String,
    description: String,
    deadline : Date,
    completed: Boolean,
    assignedUser: {type: String, default: ""},
    assignedUserName : {type: String, default: "unassigned"},
    dateCreated: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema,'Task');
