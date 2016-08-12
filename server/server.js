"use strict";
// import * as express from "express";
// let app = express();
// app.get("/",(req, res)=>{
//   res.send("hello world");
// });
// app.listen(9999,()=>{
//   console.log("listening on port 9999");
// });
var express = require("express");
var app = express();
var sqlite = require("sqlite3");
var db = new sqlite.Database(':memory:');
var fs = require("fs");
var json = function (str) { return JSON.stringify(str, null, 2); };
app.get("/index.html", function (req, res) {
    db.serialize(function () {
        db.run("create table myTable(info TEXT)");
        try {
            for (var i = 0; i < 10; i++) {
                stmt.run("Ipsum " + i);
            }
            stmt.finalize();
        }
        catch (e) {
        }
        var stmt = db.prepare("INSERT INTO myTable VALUES (?)");
        db.all("select * from myTable", function (err, data) {
            var json = JSON.stringify(data, null, 2);
            fs.writeFile("./results.txt", json);
            res.send(json);
        });
    });
});
app.post("/", function (req, res) {
    console.log("hello world", json(req));
    fs.writeFile("./posts.txt", json(req));
});
app.listen(9999, function () {
    console.log("listening...");
});
