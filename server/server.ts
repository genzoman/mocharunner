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
app.use(express.static('build'));
app.get("/api/data", (req, res) => {
  db.serialize(() => {
    db.run("create table myTable(info TEXT)");
    var stmt = db.prepare("INSERT INTO myTable VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();
    db.all("select * from myTable", (err, data) => {
      let json = JSON.stringify(data,null,2);
      fs.writeFile("./results.txt",json);
      res.send(json);
    })
  })
  
});
app.get("/",(req,res)=>{
  res.sendFile(path.resolve("index.html"));
  
});

app.listen(9999, () => {
  console.log("listening...");
});