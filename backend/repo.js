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

repo.delete = function(note) {
    return note.remove();
};

repo.create = function(note) {
    return new Note(note).save();
};

repo.update = function(note, data) {
    lodash.extend(note, data);
    return note.save();
};

module.exports = repo;