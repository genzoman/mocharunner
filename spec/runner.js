var Mocha = require("mocha"),
  fs = require("fs"),
  path = require("path");
var Promise = require("bluebird");


module.exports = doMocha;
function doMocha(file) {


  return new Promise(resolve => {
    var mocha = new Mocha();
    mocha.addFile(file)
    var failures = [];
    mocha.run(function (failures) {
      console.log("failures: ", failures)
    })
      .on('fail', function (test, err) {
        failures.push({
          test: test.err,
          file: test.file
        });
      })
      .on('end', function (results) {
        console.log("DONE")
        mocha = null;
        resolve(Object.assign({}, failures));
      });
  }, reject => {
    reject("error somewhere");
  });
}

