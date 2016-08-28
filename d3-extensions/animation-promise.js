var d3 = require("d3");

var body = d3.select("body");
var svg = body.select("svg");



function attach(fn){
  var event = [null,null,null];
  event[0] = fn;
  attach.to = function (el) {
    event[1] = el;
    return attach;
  }
  attach.on = function (event) {
    event[2] = event;
    document.addEventListener(event[1],event[0])
    return attach;
  }
  attach.destory = function (){
    document.getElementById(event[1]).removeEventListener(event[2]);
  }
  return attach;
}
class X {
  run(){
    console.log("x is running");
  }  
}
var x = new X();

var events = attach(x.run).to("div").on("click");

events.destory();

