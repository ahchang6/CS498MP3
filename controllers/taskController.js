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
    Task.find({}, function(err, tasks) {
        if (err) res.status(404).json(createResponse(notFound,{}));
        else {
            // object of all the tasks
            res.json(createResponse("OK", tasks));
        }
    });
};
exports.create_a_task = function(req, res) {
    console.log(req.body);
    console.log(req.body.hasOwnProperty('name'));
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email'))
        res.status(500).send("Name or Email not filled!");

    else{
        var new_task = new Task(req.body);
        new_task.save(function(err, task) {
            if (err)
                res.status(500).json(createResponse(errFive,{}));
            else {
                res.json(createResponse("created task", task));

            }
        });
    }
};
exports.get_a_task = function(req, res) {
    Task.find({}, function(err, tasks) {
        if (err) res.status(500).json(createResponse(errFive,{}));
        else if(task === null) res.json(createResponse("404", {}));
        else {
            // object of all the tasks
            res.json(createResponse("OK", tasks));
        }
    });
};

exports.update_a_task = function(req, res){
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

