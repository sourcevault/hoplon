// Generated by LiveScript 1.6.0
(function(){
  var reg, com, verify, z, R, V, betterTypeof, num, try_matching, map_fname;
  reg = require("./registry");
  com = reg.com, verify = reg.verify;
  z = com.z, R = com.R;
  V = verify;
  betterTypeof = function(x){
    var type;
    type = typeof x;
    if (type === 'object') {
      if (Array.isArray(x)) {
        return 'array';
      } else {
        return 'object';
      }
    } else {
      return type;
    }
  };
  V.def = function(args){
    if (args.length > 1) {
      return ['fault', 'many_args'];
    }
    if (args.length === 0) {
      return ['fault', 'few_args'];
    }
    switch (betterTypeof(args[0])) {
    case 'function':
      return ['f', args];
    default:
      return ['s', args];
    }
  };
  V.ma = function(args){
    if (args.length > 1) {
      return ['fault', 'many_args'];
    }
    if (args.length === 0) {
      return ['fault', 'few_args'];
    }
    switch (betterTypeof(args[0])) {
    case 'function':
      return ['f', args];
    default:
      return ['fault', 'first'];
    }
  };
  num = function(args){
    var i$, ref$, len$, i, v;
    if (typeof args[0] === 'number') {
      args[0] = [args[0]];
      return ['ok'];
    } else if (Array.isArray(args[0])) {
      for (i$ = 0, len$ = (ref$ = args[0]).length; i$ < len$; ++i$) {
        i = i$;
        v = ref$[i$];
        if (!(typeof v === 'number')) {
          return ['fault', 'array'];
        }
        return ['ok'];
      }
    } else {
      return ['fault', 'num'];
    }
  };
  V.ar = function(args){
    var ref$, cont, type;
    if (args.length > 2) {
      return ['fault', 'many_args'];
    }
    if (args.length < 2) {
      return ['fault', 'few_args'];
    }
    ref$ = num(args), cont = ref$[0], type = ref$[1];
    switch (cont) {
    case 'fault':
      return ['fault', type, 'ar'];
    }
    switch (betterTypeof(args[1])) {
    case 'function':
      return ['f', args, 'ar'];
    case 'array':
      return ['s', args, 'ar'];
    default:
      return ['fault', 'second'];
    }
  };
  V.wh = function(args){
    if (args.length > 2) {
      return ['fault', 'many_args'];
    }
    if (args.length < 2) {
      return ['fault', 'few_args'];
    }
    if (!(typeof args[0] === 'function')) {
      return ['fault', 'first'];
    }
    switch (betterTypeof(args[1])) {
    case 'function':
      return ['f', args, 'wh'];
    case 'array':
      return ['s', args, 'wh'];
    default:
      return ['fault', 'second'];
    }
  };
  V.arwh = function(args){
    var ref$, cont, type;
    if (args.length > 3) {
      return ['fault', 'many_args'];
    }
    if (args.length < 3) {
      return ['fault', 'few_args'];
    }
    ref$ = num(args), cont = ref$[0], type = ref$[1];
    switch (cont) {
    case 'fault':
      return ['fault', type, 'arwh'];
    }
    if (!(typeof args[1] === 'function')) {
      return ['fault', 'second'];
    }
    switch (betterTypeof(args[2])) {
    case 'function':
      return ['f', args, 'arwh'];
    case 'array':
      return ['s', args, 'arwh'];
    default:
      return ['fault', 'third'];
    }
  };
  try_matching = R.pipe(function(x){
    return [x];
  }, R.ap([V.ar, V.wh, V.arwh]), R.reject(function(arg$){
    var state;
    state = arg$[0];
    return state === 'fault';
  }));
  map_fname = function(fname){
    var shorthand, validator;
    shorthand = (function(){
      switch (fname) {
      case 'wh':
      case 'when':
        return 'wh';
      case 'ma':
      case 'match':
        return 'ma';
      case 'whn':
      case 'when_not':
        return 'whn';
      case 'ar':
      case 'arg':
      case 'args':
        return 'ar';
      case 'arn':
      case 'arg_not':
      case 'args_not':
        return 'arn';
      case 'arwh':
      case 'arg_when':
      case 'args_when':
        return 'arwh';
      case 'arwhn':
      case 'arg_when_not':
      case 'args_when_not':
        return 'arwhn';
      case 'arnwhn':
      case 'arg_not_when_not':
      case 'args_not_when_not':
        return 'arnwhn';
      case 'def':
      case 'default':
        return 'def';
      default:
        return 'fault';
      }
    }());
    switch (shorthand) {
    case 'fault':
      return ['fault', ['path', 'api_not_defined', fname]];
    }
    validator = (function(){
      switch (shorthand) {
      case 'ma':
        return V.ma;
      case 'wh':
        return V.wh;
      case 'whn':
        return V.wh;
      case 'ar':
        return V.ar;
      case 'arn':
        return V.ar;
      case 'arwh':
        return V.arwh;
      case 'arwhn':
        return V.arwh;
      case 'arnwhn':
        return V.arwh;
      case 'def':
        return V.def;
      }
    }());
    return [shorthand, validator];
  };
  verify.main = function(path, args, data){
    var rets, ref$, type, fname, ret, validator;
    switch (path.length) {
    case 0:
      if (data.fns.length === 0 && data.def === null) {
        rets = try_matching(args);
        switch (rets.length) {
        case 0:
          return ['fault', ['path', 'all_match_fail', 'direct call']];
        default:
          ref$ = rets[0], type = ref$[0], args = ref$[1], fname = ref$[2];
          return ['chain', [fname, type, args]];
        }
      } else {
        return ['re', args];
      }
    case 1:
      switch (path[0]) {
      case 'apply':
      case 'call':
        return ['re', args[1]];
      }
      ret = map_fname(path[0]);
      fname = ret[0], validator = ret[1];
      switch (fname) {
      case 'fault':
        return ret;
      }
      ret = validator(args);
      type = ret[0], data = ret[1];
      switch (type) {
      case 'fault':
        return ['fault', ['input', fname, data]];
      }
      switch (fname) {
      case 'def':
        switch (data.ldef) {
        case true:
          return ['fault', ['path', 'def_is_defined']];
        }
      }
      return ['chain', [fname, type, data]];
    default:
      return ['fault', ['path', 'path_too_long', path]];
    }
  };
}).call(this);
