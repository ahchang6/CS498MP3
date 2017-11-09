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
    var where ={};
    if(req.query.where){
        where = req.query.where;
    }
    var query = User.find(where);
    if(req.query.sort){
        query = query.find(req.query.sort);
    }
    if(req.query.select){
        query = query.find(req.query.select);
    }
    if(req.query.skip){
        query = query.find(req.query.skip);
    }
    if(req.query.limit){
        query = query.find(req.query.limit);
    }
    query.find(function(err, users) {
        if (err) res.status(500).json(createResponse(notFound,{}));
        else if (users===null) res.status(404).json(createResponse(notFound,{}));
        else {
            // object of all the users
            if(req.query.count){
                res.json(createResponse("OK", users.length));
            }
            else {
                res.json(createResponse("OK", users));
            }
        }
    });
};
exports.create_a_user = function(req, res) {
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email'))
        res.status(500).send("Name or Email not filled!");

    else{
        var new_user = new User(req.body);
        User.findOne({"email":req.body.email},function(err, user){
            // if null then there are no duplicates of emails
            if(user !== null)
            res.status(500).json(createResponse("already has user with email",{}));
            else {
                // creates the user
                new_user.save(function (err, user) {
                    if (err)
                        res.status(500).json(createResponse(errFive, {}));
                    else {
                        res.status(201).json(createResponse("created user", user));
                    }
                });
            }

        });

    }
};



exports.update_a_user = function(req, res){
    var user_id = req.params.id;
    var updated = req.body;
    console.log(user_id);
    try {
        User.findByIdAndUpdate(user_id, updated, {new: true}, function (err, result) {
            if (err) res.status(500).json(createResponse(errFive,{}));
            else if(result === null) res.status(404).json(createResponse("404", {}));
            else {
                res.json(createResponse("OK", result));
            }
        });
    }
    catch(err){
        res.status(500).json(createResponse("500", {}));
    }

};

exports.get_a_user = function(req, res){
    var user_id = req.params.id;
    console.log(user_id);
    try {
        User.findById(user_id, function (err, user) {
            if (err) res.status(500).json(createResponse(errFive,{}));
            else if(user === null) res.status(404).json(createResponse("404", {}));
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
            else if(user === null) res.status(404).json(createResponse("404", {}));
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


function queryBuilder(query){
    console.log(query);
    var combined_where = {};
    var where_query = JSON.parse(query.where[0]);
    for(var i = 0;i<where_query.length;i++){
        combined_where = Object.assign(combined_where, where_query[i])
    }
    return combined_where;

}
