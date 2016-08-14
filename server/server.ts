// import * as express from "express";
// let app = express();
// app.get("/",(req, res)=>{
//   res.send("hello world");
// });
// app.listen(9999,()=>{
//   console.log("listening on port 9999");
// });
import * as Promise from "bluebird"
import * as express from "express";
var path = require("path");
import * as ReactDOM from "react-dom";
let app = express();
import * as sqlite from "sqlite3";
let db = new sqlite.Database(':memory:');
import * as fs_ from "fs";
const fs = Promise.promisifyAll(fs_);
import * as request from "request";
var runner = require("../spec/runner");
app.use(express.static('build'));
var bodyParser = require("body-parser");
var App = require("../app");
db.serialize(() => {
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

app.get("/api/data", (req, res) => {
  runner()
    .then(data => {
      res.send(data);
    });
});

app.get("/tests", (req, res) => {
   fs.readdirAsync("./spec")
    .then(files => res.send(files));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));

});

app.post("/tests",(req,res)=>{
  runner("./spec/" + req.body.test)
    .then(data=>{
      res.send(data);
    })
});

app.listen(9999, () => {
  console.log("listening...");
});