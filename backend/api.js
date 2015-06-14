/**
 * Created by saschademirovic on 14.06.15.
 */

var express = require("express");

var api = new express.Router();

api.get("/notes", function(req, res) { res.json([]); });
api.get("/notes/:id", function(req, res) { res.json({}); });
api.delete("/notes/:id", function(req, res) { res.json({}); });
api.put("/notes/:id", function(req, res) { res.json({}); });
api.post("/notes", function(req, res) { res.json({}); });

module.exports = api;