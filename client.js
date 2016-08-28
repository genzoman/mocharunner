var d3 = require("d3");
var request = require("request");
var body = d3.select("body")
window.d3 = d3;
d3.select('div')
  .on("click", function () {
    // var test = "./spec/spec.js"
    // getTest(test);
    getTestNames()
      .then(data => {
        var fileNames = JSON.parse(data.response);
        d3.selectAll("div")
          .data(fileNames)
          .enter()
          .append("div")
          .attr("class", "tests")
          .text((d, i) => {
            return d;
          });
        attachClickHandlers();
      });
  });

var runTest = function (test) {
  return new Promise(resolve => {
    request({
      method: 'POST',
      preambleCRLF: true,
      postambleCRLF: true,
      url: "http://localhost:9999/tests",
      json: {
        "test": test
      }
    },
      function (error, response, body) {
        if (error) {
          return console.error('upload failed:', error);
        }
        resolve(body);
      });
  })
}
function attachClickHandlers() {
  d3.selectAll(".tests").on("click", function () {
    let test = d3.select(this).text();
    runTest(test)
      .then(tests => {
        printFailures(tests);
      });
  });
}
[
  {
    file: "desktop/file.js",
    onClick: function(){
      console.log("hello");
    }
  },
  {
    file: "some place else",
    
      
  }  
]

var printFailures = function (failures) {
  var failureArray = Object.keys(failures)
    .map(key=>failures[key]);
  
  body.selectAll("div")
    .data(failureArray,function(d){ return d;})
    .enter()
      .append("div")
      .text(function(d,i){
        debugger;
        return d.file;
      });

}
var getTest = function (test) {
  request({
    method: 'POST',
    preambleCRLF: true,
    postambleCRLF: true,
    url: "http://localhost:9999/tests",
    prox: {
      host: "http://localhost/",
      port: 9999
    },
    json: {
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
var getTestNames = function () {
  return new Promise(resolve => {
    d3.request("/tests")
      .get(function (err, data) {
        resolve(data);
      });
  });
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
