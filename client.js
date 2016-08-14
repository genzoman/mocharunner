var d3 = require("d3");
var request = require("request");

d3.select('div')
  .on("click", function () {
    var test = "./spec/spec.js"
    getTest(test);
  });

var getTest = function (test) {
 request({
    method: 'POST',
    preambleCRLF: true,
    postambleCRLF: true,
    url: "http://localhost:9999/tests",
    prox:{
      host: "http://localhost/",
      port: 9999
    },
    json:{
      "file": JSON.stringify(test)
    }
  },
  function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Upload successful!  Server responded with:', body);
  })


}
var runTests = function () {
  return new Promise(resolve => {
    d3.request("/api/data")
      .get(function (err, data) {
        var res = JSON.parse(data.response);
        var fileNames = Object.keys(res).map(x => {
          return res[x].file;
        });
        resolve(fileNames);
      });
  })

}
