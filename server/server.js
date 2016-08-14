"use strict";
// import * as express from "express";
// let app = express();
// app.get("/",(req, res)=>{
//   res.send("hello world");
// });
// app.listen(9999,()=>{
//   console.log("listening on port 9999");
// });
var Promise = require("bluebird");
var express = require("express");
var path = require("path");
var app = express();
var sqlite = require("sqlite3");
var db = new sqlite.Database(':memory:');
var fs_ = require("fs");
var fs = Promise.promisifyAll(fs_);
var runner = require("../spec/runner");
app.use(express.static('build'));
var bodyParser = require("body-parser");
var App = require("../app");
db.serialize(function () {
    db.run("create table myTable(info TEXT)");
    var stmt = db.prepare("INSERT INTO myTable VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.get("/api/data", function (req, res) {
    runner()
        .then(function (data) {
        res.send(data);
    });
});
app.get("/tests", function (req, res) {
    fs.readdirAsync("./spec")
        .then(function (files) { return res.send(files); });
});
app.get("/", function (req, res) {
    res.sendFile(path.resolve("index.html"));
});
app.post("/tests", function (req, res) {
    runner("./spec/" + req.body.test)
        .then(function (data) {
        res.send(data);
    });
});
app.listen(9999, function () {
    console.log("listening...");
});
