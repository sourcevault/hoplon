// Generated by LiveScript 1.6.0
(function(){
  var jsRender, R, SI, reg, l, z, noop, j, main;
  jsRender = require('json-stringify-pretty-compact');
  R = require("ramda");
  SI = require("seamless-immutable");
  reg = require("./registry");
  l = console.log;
  z = l;
  noop = function(){};
  j = function(json){
    l(jsRender(json));
  };
  main = {
    j: j,
    z: z,
    R: R,
    l: l,
    SI: SI,
    reg: reg,
    noop: noop
  };
  module.exports = main;
}).call(this);
