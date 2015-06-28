/**
 * Created by saschademirovic on 14.06.15.
 */

var express = require("express");
var ctrl = require("./controller");

// create router
var api = new express.Router();

// map routes to controller functions
api.get("/notes", ctrl.getAll);
api.post("/notes", ctrl.create);
api.get("/notes/:id", ctrl.getOne);
api.put("/notes/:id", ctrl.update);
api.delete("/notes/:id", ctrl.delete);
api.use(ctrl.onError);

module.exports = api;