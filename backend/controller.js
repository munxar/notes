/**
 * Created by saschaaeppli on 19.06.15.
 */
var repo = require("./repo");

var ctrl = {};

ctrl.info = function(req, res) {
    res.json({});
};

ctrl.getAll = function(req, res) {
    repo.getAll().then(function(notes) {
        res.json(notes);
    }, onError(res));
};

ctrl.getNote = function(req, res, next) {
    repo.getOne(req.params.noteId).then(function(note) {
        if(note) {
            req.note = note;
            next();
        } else {
            res.status(404).json({ error: "Not Found"});
        }
    }, onError(res));
};

ctrl.getOne = function(req, res) {
    res.json(req.note);
};

ctrl.delete = function(req, res) {
    repo.delete(req.note).then(function(note) {
        res.json(note);
    }, onError(res));
};

ctrl.create = function(req, res) {
    repo.create(req.body).then(function(note) {
        res.json(note);
    }, onError(res));
};

ctrl.update = function(req, res) {
    repo.update(req.note, req.body).then(function(note) {
        res.json(note);
    }, onError(res));
};

function onError(res) {
    return function(err) { res.json({ error: err }); }
}

module.exports = ctrl;