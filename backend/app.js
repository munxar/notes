/**
 * Created by saschademirovic on 14.06.15.
 */
var express = require("express");
var path = require("path");
var config = require("./config");
var api = require("./api");

var app = express();

app.use(express.static(path.join(__dirname, config.webdir)));
app.use("/api", api);

app.listen(config.port);
