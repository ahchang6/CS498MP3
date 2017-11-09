'use strict';


// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
        _id: {type: mongoose.Schema.ObjectId, default: mongoose.Types.ObjectId()},
        name : String,
        email : String,
        pendingTasks: [String],
        dateCreated: {type: Date, default: new Date()}
    }
);

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema, 'User');


