/**
 * Created by saschademirovic on 14.06.15.
 */
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var config = require("./config");
var api = require("./api");

// try to open db connection
mongoose.connect(config.db, main);

// main server setup
function main(err, connection) {
    // throw error if connection was unsuccessful
    if(err) throw new Error(err + "! IS YOUR LOCAL MONGODB RUNNING?");

    // create express app
    var app = express();

    // serve static files
    app.use(express.static(path.join(__dirname, config.webdir)));
    // logger
    app.use(morgan("dev"));
    // json body parser
    app.use(bodyParser.json());
    // mount api
    app.use("/api", api);

    // start webserver
    app.listen(config.port);
}