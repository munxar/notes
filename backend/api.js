/**
 * Created by saschademirovic on 14.06.15.
 */

var express = require("express");
var ctrl = require("./controller");

var api = new express.Router();

api.get("/", ctrl.info);
api.get("/notes", ctrl.getAll);
api.post("/notes", ctrl.create);
api.param("noteId", ctrl.getNote);
api.get("/notes/:noteId", ctrl.getOne);
api.delete("/notes/:noteId", ctrl.delete);
api.put("/notes/:noteId", ctrl.update);

module.exports = api;