/**
 * Created by saschaaeppli on 19.06.15.
 */
var repo = require("./repository");

// controller layer
var ctrl = {};

ctrl.getAll = function(req, res) {
    repo.getAll().then(function(notes) {
        res.json(notes);
    }, onError(res));
};

ctrl.getOne = function(req, res) {
    repo.getOne(req.params.id).then(onSuccess(res), onError(res));
};

ctrl.delete = function(req, res) {
    repo.delete(req.params.id).then(onSuccess(res), onError(res));
};

ctrl.create = function(req, res) {
    repo.create(req.body).then(onSuccess(res), onError(res));
};

ctrl.update = function(req, res) {
    repo.update(req.params.id, req.body).then(onSuccess(res), onError(res));
};

ctrl.onError = function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
};

function onSuccess(res) {
    return function(note) {
        if(!note) return res.status(404).json();
        res.json(note);
    };
}

function onError(res) {
    return function(err) { res.status(500).json({ error: err }); };
}

module.exports = ctrl;