'use strict';


var mongoose = require('mongoose'), Task = mongoose.model('Task');

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
exports.list_all_tasks = function(req, res) {
    var where ={};
    if(req.query.where){
        where = req.query.where;
    }
    var query = Task.find(where);
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
    if(req.query.count){
        query = query.find(req.query.count);
    }
    query.find(function(err, tasks) {
        if (err) res.status(404).json(createResponse(notFound,{}));
        else {
            // object of all the users
            res.json(createResponse("OK", tasks));
        }
    });
};
exports.create_a_task = function(req, res) {
    console.log(req.body);
    console.log(req.body.hasOwnProperty('name'));
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('deadline'))
        res.status(500).send("Name or Email not filled!");

    else{
        var new_task = new Task(req.body);
        new_task.save(function(err, task) {
            if (err)
                res.status(500).json(createResponse(errFive,{}));
            else {
                res.status(201).json(createResponse("created task", task));

            }
        });
    }
};

exports.update_a_task = function(req, res) {
    var task_id = req.params.id;
    var updated = req.body;
    console.log(task_id);
    try {
        Task.findByIdAndUpdate(task_id, updated, function (err, result) {
            if (err) res.status(500).json(createResponse(errFive,{}));
            else if(result === null) res.json(createResponse("404", {}));
            else {
                res.json(createResponse("OK", result));
            }
        });
    }
    catch(err){
        res.status(500).json(createResponse("500", {}));
    }
};

exports.get_a_task = function(req, res){
    var task_id = req.params.id;
    console.log(task_id);
    try {
        Task.findById(task_id, function (err, task) {
            if (err) res.status(500).json(createResponse(errFive,{}));
            else if(task === null) res.json(createResponse("404", {}));
            else {
                res.json(createResponse("OK", task));
            }

        });
    }
    catch(err){
        res.status(500).json(createResponse("500", {}));
    }

};

exports.remove_a_task = function(req, res){
    var task_id = req.params.id;
    console.log(task_id);
    try {
        Task.findById(task_id, function (err, task) {
            if (err) res.status(500).json(createResponse(errFive,{}));
            else if(task === null) res.json(createResponse("404", {}));
            else {
                task.remove();
                res.json(createResponse("OK", task));
            }
        });
    }
    catch(err){
        res.status(500).json(createResponse("Parsing error", {}));
    }

};

