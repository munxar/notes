/**
 * Created by saschaaeppli on 19.06.15.
 */

var Note = require("./model");
var mongoose = require("mongoose");
var lodash = require("lodash");

var repo = {};

repo.getAll = function() {
    return Note.find().exec();
};

repo.getOne = function(id) {
    return mongoose.Types.ObjectId.isValid(id) ? Note.findById(id) : new mongoose.Promise();
};

repo.delete = function(id) {
    return Note.findByIdAndRemove(id);
};

repo.create = function(data) {
    return Note.create(data);
};

repo.update = function(id, data) {
    console.log(id);
    return Note.findByIdAndUpdate(id, data);
};

module.exports = repo;