var expect = require("chai").expect;
var assert = require("assert");
describe("mocha test", function () {
  it("should a", function () {
    expect(1).to.be.equal(1);
  });
  it("should b", function () {
    expect(1).to.be.equal(2);
  });
  it("should c", function () {
    expect(1).to.be.equal(2);
  });
});
