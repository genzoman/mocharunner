var d3 = require("d3");
d3.select('div')
  .on("click", function () {
    
  });
  
  var runTests = function () {
    d3.request("/api/data")
      .get(function (err, data) {
        var res = JSON.parse(data.response);
        var fileNames = Object.keys(res).map(x => {
          return res[x].file;
        });
        d3.selectAll("div")
          .data(fileNames)
          .enter()
          .append("div")
          .text(function (d, i) {
            return d;
          });
      });
  }