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

repo.delete = function(note) {
    console.log(note);
    return note.delete();
};

repo.create = function(note) {
    return new Note(note).save();
};

repo.update = function(note, data) {
    console.log(data);
    note.name = data.name;
    return note.save();
};

module.exports = repo;