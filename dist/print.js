// Generated by LiveScript 1.6.0
(function(){
  var l, reg, printE, packageJ;
  l = require("./common").l;
  reg = require("./registry");
  printE = reg.printE;
  packageJ = reg.packageJ;
  reg.printE.fail = function(filename){
    return function(){
      l("[TEST ERROR] originating from module", "[" + packageJ.name + "]", "\n\n- 'npm test' failed at " + filename + ":");
      process.exitCode = 1;
    };
  };
  module.exports = reg.printE;
}).call(this);
