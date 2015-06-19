/**
 * Created by saschaaeppli on 19.06.15.
 */

var Note = require("./model");

var repo = {};

repo.getAll = function() {
    return Note.find().exec();
};

repo.getOne = function(id) {
    return Note.findById(id);
};

repo.delete = function(id) {
    return Note.findByIdAndRemove(id);
};

repo.create = function(note) {
    return new Note(note).save();
};

repo.update = function(id, data) {
    return Note.findByIdAndUpdate(id, data);
};

module.exports = repo;