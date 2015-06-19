/**
 * Created by saschademirovic on 14.06.15.
 */

var express = require("express");
var ctrl = require("./controller");

var api = new express.Router();

api.get("/", ctrl.info);
api.get("/notes", ctrl.getAll);
api.post("/notes", ctrl.create);
api.get("/notes/:id", ctrl.getOne);
api.delete("/notes/:id", ctrl.delete);
api.put("/notes/:id", ctrl.update);

module.exports = api;