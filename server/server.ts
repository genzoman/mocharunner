import * as express from "express";
let app = express();
app.get("/",(req, res)=>{
  res.send("hello world");
});
app.listen(9999,()=>{
  console.log("listening on port 9999");
});