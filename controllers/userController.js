'use strict';


var mongoose = require('mongoose'), User = mongoose.model('User');

// helper
function createResponse(message, data){
    var responseObject = {};
    responseObject['message'] = message;
    responseObject['data'] = data;
    return responseObject;
}
var notFound = "request could not be found";
var errFive = "request could not be processed";
//
exports.list_all_users = function(req, res) {
    User.find({}, function(err, users) {
        if (err) res.status(404).json(createResponse(notFound,{}));
        else {
            // object of all the users
            res.json(createResponse("OK", users));
        }
    });
};
exports.create_a_user = function(req, res) {
    console.log(req.body);
    console.log(req.body.hasOwnProperty('name'));
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email'))
        res.status(500).send("Name or Email not filled!");

    else{
        var new_user = new User(req.body);
        User.findOne({"email":req.body.email},function(err, user){
            // if not found then there are no duplicates of emails
            if(user !== null)
            res.status(500).json(createResponse("already has user with email",{}));
            else {
                new_user.save(function (err, user) {
                    if (err)
                        res.status(500).json(createResponse(errFive, {}));
                    else {
                        res.json(createResponse("created user", user));
                    }
                });
            }

        });

    }
};
exports.get_a_user = function(req, res) {
    User.find({}, function(err, users) {
        if (err) res.status(500).json(createResponse(errFive,{}));
            else if(user === null) res.json(createResponse("404", {}));
        else {
            // object of all the users
            res.json(createResponse("OK", users));
        }
    });
};

exports.update_a_user = function(req, res){
    var user_id = req.params.id;
    console.log(user_id);
    try {
        User.findById(user_id, function (err, user) {
            if (err) res.status(500).json(createResponse(errFive,{}));
            else if(user === null) res.json(createResponse("404", {}));
            else {
                res.json(createResponse("OK", user));
            }

        });
    }
    catch(err){
       res.status(500).json(createResponse("500", {}));
    }

};

exports.remove_a_user = function(req, res){
    var user_id = req.params.id;
    console.log(user_id);
    try {
        User.findById(user_id, function (err, user) {
            if (err) res.status(500).json(createResponse(errFive,{}));
            else if(user === null) res.json(createResponse("404", {}));
            else {
                user.remove();
                res.json(createResponse("OK", user));
            }
        });
    }
    catch(err){
        res.status(500).json(createResponse("Parsing error", {}));
    }

};
