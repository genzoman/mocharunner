var Mocha = require("mocha"),
  fs = require("fs"),
  path = require("path");
var Promise = require("bluebird");

var mocha = new Mocha();

module.exports = doMocha;
function doMocha(file) {
  mocha.addFile(file)
  var failures = [];

  return new Promise(resolve => {
    mocha.run()
      .on('test', function (test) {

      })
      .on('test end', function (test) {

      })
      .on('pass', function (test) {

      })
      .on('fail', function (test, err) {
        failures.push({
          test: test.err,
          file: test.file
        });
      })
      .on('end', function (results) {
        console.log("DONE")
        resolve(Object.assign({},failures));
      });
  });
}
