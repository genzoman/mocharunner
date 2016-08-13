// import * as express from "express";
// let app = express();
// app.get("/",(req, res)=>{
//   res.send("hello world");
// });
// app.listen(9999,()=>{
//   console.log("listening on port 9999");
// });
import * as express from "express";
var path = require("path");
import * as ReactDOM from "react-dom";
let app = express();
import * as sqlite from "sqlite3";
let db = new sqlite.Database(':memory:');
import * as fs from "fs";
import * as request from "request";
var runner = require("../spec/runner");
app.use(express.static('build'));

db.serialize(() => {
  db.run("create table myTable(info TEXT)");
  var stmt = db.prepare("INSERT INTO myTable VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();
});

app.get("/api/data", (req, res) => {
  runner()
    .then(data=>{
      res.send(data);
    });
});

app.get("/tests",(req,res)=>{
  res.send("hello world");
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));

});

app.listen(9999, () => {
  console.log("listening...");
});