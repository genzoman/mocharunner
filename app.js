module.exports = app;
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
function app(){
  app.tests = function(){
    return fs.readDirAsync("./spec");
  }
}