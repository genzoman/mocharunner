"use strict";
var d3 = require("d3");
d3.select('div')
  .on("click", function () {
    d3.request("/")
      .header("Conten-Type", "application/json")
      .post("never gonna change" + Math.random());
  });