(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RGUI"] = factory();
	else
		root["RGUI"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(35).Component;
	var template = __webpack_require__(34);
	var _ = __webpack_require__(35)._;

	var component = new Component({
	    template: template,
	    config: function() {
	        _.extend(this.data, {
	            tools: [
	                {name: 'Button'},
	                {name: 'DatePicker'},
	                {name: 'Pager'}
	            ]
	        });
	    }
	}).$inject('#view');

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var env =  __webpack_require__(3);
	var config = __webpack_require__(9); 
	var Regular = module.exports = __webpack_require__(10);
	var Parser = Regular.Parser;
	var Lexer = Regular.Lexer;

	if(env.browser){
	    __webpack_require__(25);
	    __webpack_require__(29);
	    __webpack_require__(30);
	    Regular.dom = __webpack_require__(16);
	}
	Regular.env = env;
	Regular.util = __webpack_require__(4);
	Regular.parse = function(str, options){
	  options = options || {};

	  if(options.BEGIN || options.END){
	    if(options.BEGIN) config.BEGIN = options.BEGIN;
	    if(options.END) config.END = options.END;
	    Lexer.setup();
	  }
	  var ast = new Parser(str).parse();
	  return !options.stringify? ast : JSON.stringify(ast);
	}



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// some fixture test;
	// ---------------
	var _ = __webpack_require__(4);
	exports.svg = (function(){
	  return typeof document !== "undefined" && document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
	})();


	exports.browser = typeof document !== "undefined" && document.nodeType;
	// whether have component in initializing
	exports.exprCache = _.cache(1000);
	exports.isRunning = false;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, setImmediate) {__webpack_require__(7)();
	var _  = module.exports;
	var entities = __webpack_require__(8);
	var slice = [].slice;
	var o2str = ({}).toString;
	var win = typeof window !=='undefined'? window: global;


	_.noop = function(){};
	_.uid = (function(){
	  var _uid=0;
	  return function(){
	    return _uid++;
	  }
	})();

	_.extend = function( o1, o2, override ){
	  // if(_.typeOf(override) === 'array'){
	  //  for(var i = 0, len = override.length; i < len; i++ ){
	  //   var key = override[i];
	  //   o1[key] = o2[key];
	  //  } 
	  // }else{
	  for(var i in o2){
	    if( typeof o1[i] === "undefined" || override === true ){
	      o1[i] = o2[i]
	    }
	  }
	  // }
	  return o1;
	}

	_.keys = function(obj){
	  if(Object.keys) return Object.keys(obj);
	  var res = [];
	  for(var i in obj) if(obj.hasOwnProperty(i)){
	    res.push(i);
	  }
	  return res;
	}

	_.varName = 'd';
	_.setName = 'p_';
	_.ctxName = 'c';
	_.extName = 'e';

	_.rWord = /^[\$\w]+$/;
	_.rSimpleAccessor = /^[\$\w]+(\.[\$\w]+)*$/;

	_.nextTick = typeof setImmediate === 'function'? 
	  setImmediate.bind(win) : 
	  function(callback) {
	    setTimeout(callback, 0) 
	  }



	_.prefix = "var " + _.varName + "=" + _.ctxName + ".data;" +  _.extName  + "=" + _.extName + "||'';";


	_.slice = function(obj, start, end){
	  var res = [];
	  for(var i = start || 0, len = end || obj.length; i < len; i++){
	    var item = obj[i];
	    res.push(item)
	  }
	  return res;
	}

	_.typeOf = function (o) {
	  return o == null ? String(o) :o2str.call(o).slice(8, -1).toLowerCase();
	}


	_.makePredicate = function makePredicate(words, prefix) {
	    if (typeof words === "string") {
	        words = words.split(" ");
	    }
	    var f = "",
	    cats = [];
	    out: for (var i = 0; i < words.length; ++i) {
	        for (var j = 0; j < cats.length; ++j){
	          if (cats[j][0].length === words[i].length) {
	              cats[j].push(words[i]);
	              continue out;
	          }
	        }
	        cats.push([words[i]]);
	    }
	    function compareTo(arr) {
	        if (arr.length === 1) return f += "return str === '" + arr[0] + "';";
	        f += "switch(str){";
	        for (var i = 0; i < arr.length; ++i){
	           f += "case '" + arr[i] + "':";
	        }
	        f += "return true}return false;";
	    }

	    // When there are more than three length categories, an outer
	    // switch first dispatches on the lengths, to save on comparisons.
	    if (cats.length > 3) {
	        cats.sort(function(a, b) {
	            return b.length - a.length;
	        });
	        f += "switch(str.length){";
	        for (var i = 0; i < cats.length; ++i) {
	            var cat = cats[i];
	            f += "case " + cat[0].length + ":";
	            compareTo(cat);
	        }
	        f += "}";

	        // Otherwise, simply generate a flat `switch` statement.
	    } else {
	        compareTo(words);
	    }
	    return new Function("str", f);
	}


	_.trackErrorPos = (function (){
	  // linebreak
	  var lb = /\r\n|[\n\r\u2028\u2029]/g;
	  var minRange = 20, maxRange = 20;
	  function findLine(lines, pos){
	    var tmpLen = 0;
	    for(var i = 0,len = lines.length; i < len; i++){
	      var lineLen = (lines[i] || "").length;

	      if(tmpLen + lineLen > pos) {
	        return {num: i, line: lines[i], start: pos - i - tmpLen , prev:lines[i-1], next: lines[i+1] };
	      }
	      // 1 is for the linebreak
	      tmpLen = tmpLen + lineLen ;
	    }
	  }
	  function formatLine(str,  start, num, target){
	    var len = str.length;
	    var min = start - minRange;
	    if(min < 0) min = 0;
	    var max = start + maxRange;
	    if(max > len) max = len;

	    var remain = str.slice(min, max);
	    var prefix = "[" +(num+1) + "] " + (min > 0? ".." : "")
	    var postfix = max < len ? "..": "";
	    var res = prefix + remain + postfix;
	    if(target) res += "\n" + new Array(start-min + prefix.length + 1).join(" ") + "^^^";
	    return res;
	  }
	  return function(input, pos){
	    if(pos > input.length-1) pos = input.length-1;
	    lb.lastIndex = 0;
	    var lines = input.split(lb);
	    var line = findLine(lines,pos);
	    var start = line.start, num = line.num;

	    return (line.prev? formatLine(line.prev, start, num-1 ) + '\n': '' ) + 
	      formatLine(line.line, start, num, true) + '\n' + 
	      (line.next? formatLine(line.next, start, num+1 ) + '\n': '' );

	  }
	})();


	var ignoredRef = /\((\?\!|\?\:|\?\=)/g;
	_.findSubCapture = function (regStr) {
	  var left = 0,
	    right = 0,
	    len = regStr.length,
	    ignored = regStr.match(ignoredRef); // ignored uncapture
	  if(ignored) ignored = ignored.length
	  else ignored = 0;
	  for (; len--;) {
	    var letter = regStr.charAt(len);
	    if (len === 0 || regStr.charAt(len - 1) !== "\\" ) { 
	      if (letter === "(") left++;
	      if (letter === ")") right++;
	    }
	  }
	  if (left !== right) throw "RegExp: "+ regStr + "'s bracket is not marched";
	  else return left - ignored;
	};


	_.escapeRegExp = function( str){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
	  return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
	    return '\\' + match;
	  });
	};


	var rEntity = new RegExp("&(" + _.keys(entities).join('|') + ');', 'gi');

	_.convertEntity = function(chr){

	  return ("" + chr).replace(rEntity, function(all, capture){
	    return String.fromCharCode(entities[capture])
	  });

	}


	// simple get accessor

	_.createObject = function(o, props){
	    function Foo() {}
	    Foo.prototype = o;
	    var res = new Foo;
	    if(props) _.extend(res, props);
	    return res;
	}

	_.createProto = function(fn, o){
	    function Foo() { this.constructor = fn;}
	    Foo.prototype = o;
	    return (fn.prototype = new Foo());
	}



	/**
	clone
	*/
	_.clone = function clone(obj){
	    var type = _.typeOf(obj);
	    if(type === 'array'){
	      var cloned = [];
	      for(var i=0,len = obj.length; i< len;i++){
	        cloned[i] = obj[i]
	      }
	      return cloned;
	    }
	    if(type === 'object'){
	      var cloned = {};
	      for(var i in obj) if(obj.hasOwnProperty(i)){
	        cloned[i] = obj[i];
	      }
	      return cloned;
	    }
	    return obj;
	  }

	_.equals = function(now, old){
	  var type = typeof now;
	  if(type === 'number' && typeof old === 'number'&& isNaN(now) && isNaN(old)) return true
	  return now === old;
	}

	var dash = /-([a-z])/g;
	_.camelCase = function(str){
	  return str.replace(dash, function(all, capture){
	    return capture.toUpperCase();
	  })
	}



	_.throttle = function throttle(func, wait){
	  var wait = wait || 100;
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  var later = function() {
	    previous = +new Date;
	    timeout = null;
	    result = func.apply(context, args);
	    context = args = null;
	  };
	  return function() {
	    var now = + new Date;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      clearTimeout(timeout);
	      timeout = null;
	      previous = now;
	      result = func.apply(context, args);
	      context = args = null;
	    } else if (!timeout) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};

	// hogan escape
	// ==============
	_.escape = (function(){
	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;

	  return function(str) {
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }
	})();

	_.cache = function(max){
	  max = max || 1000;
	  var keys = [],
	      cache = {};
	  return {
	    set: function(key, value) {
	      if (keys.length > this.max) {
	        cache[keys.shift()] = undefined;
	      }
	      // 
	      if(cache[key] === undefined){
	        keys.push(key);
	      }
	      cache[key] = value;
	      return value;
	    },
	    get: function(key) {
	      if (key === undefined) return cache;
	      return cache[key];
	    },
	    max: max,
	    len:function(){
	      return keys.length;
	    }
	  };
	}

	// // setup the raw Expression
	// _.touchExpression = function(expr){
	//   if(expr.type === 'expression'){
	//   }
	//   return expr;
	// }


	// handle the same logic on component's `on-*` and element's `on-*`
	// return the fire object
	_.handleEvent = function(value, type ){
	  var self = this, evaluate;
	  if(value.type === 'expression'){ // if is expression, go evaluated way
	    evaluate = value.get;
	  }
	  if(evaluate){
	    return function fire(obj){
	      self.data.$event = obj;
	      var res = evaluate(self);
	      if(res === false && obj && obj.preventDefault) obj.preventDefault();
	      self.data.$event = undefined;
	      self.$update();
	    }
	  }else{
	    return function fire(){
	      var args = slice.call(arguments)      
	      args.unshift(value);
	      self.$emit.apply(self, args);
	      self.$update();
	    }
	  }
	}

	// only call once
	_.once = function(fn){
	  var time = 0;
	  return function(){
	    if( time++ === 0) fn.apply(this, arguments);
	  }
	}

	_.fixObjStr = function(str){
	  if(str.trim().indexOf('{') !== 0){
	    return '{' + str + '}';
	  }
	  return str;
	}



	_.log = function(msg, type){
	  if(typeof console !== "undefined")  console[type || "log"](msg);
	}




	//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
	_.isVoidTag = _.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content");
	_.isBooleanAttr = _.makePredicate('selected checked disabled readonly required open autofocus controls autoplay compact loop defer multiple');

	_.isFalse - function(){return false}
	_.isTrue - function(){return true}

	_.isExpr = function(expr){
	  return expr && expr.type === 'expression';
	}
	// @TODO: make it more strict
	_.isGroup = function(group){
	  return group.inject || group.$inject;
	}

	_.getCompileFn = function(source, ctx, options){
	  return ctx.$compile.bind(ctx,source, options)
	}



	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(5).setImmediate))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for es5
	var slice = [].slice;
	var tstr = ({}).toString;

	function extend(o1, o2 ){
	  for(var i in o2) if( o1[i] === undefined){
	    o1[i] = o2[i]
	  }
	  return o2;
	}

	module.exports = function(){
	  // String proto ;
	  extend(String.prototype, {
	    trim: function(){
	      return this.replace(/^\s+|\s+$/g, '');
	    }
	  });


	  // Array proto;
	  extend(Array.prototype, {
	    indexOf: function(obj, from){
	      from = from || 0;
	      for (var i = from, len = this.length; i < len; i++) {
	        if (this[i] === obj) return i;
	      }
	      return -1;
	    },
	    forEach: function(callback, context){
	      for (var i = 0, len = this.length; i < len; i++) {
	        callback.call(context, this[i], i, this);
	      }
	    },
	    filter: function(callback, context){
	      var res = [];
	      for (var i = 0, length = this.length; i < length; i++) {
	        var pass = callback.call(context, this[i], i, this);
	        if(pass) res.push(this[i]);
	      }
	      return res;
	    },
	    map: function(callback, context){
	      var res = [];
	      for (var i = 0, length = this.length; i < length; i++) {
	        res.push(callback.call(context, this[i], i, this));
	      }
	      return res;
	    }
	  });

	  // Function proto;
	  extend(Function.prototype, {
	    bind: function(context){
	      var fn = this;
	      var preArgs = slice.call(arguments, 1);
	      return function(){
	        var args = preArgs.concat(slice.call(arguments));
	        return fn.apply(context, args);
	      }
	    }
	  })
	  
	  // Array
	  extend(Array, {
	    isArray: function(arr){
	      return tstr.call(arr) === "[object Array]";
	    }
	  })
	}



/***/ },
/* 8 */
/***/ function(module, exports) {

	// http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
	var entities = {
	  'quot':34, 
	  'amp':38, 
	  'apos':39, 
	  'lt':60, 
	  'gt':62, 
	  'nbsp':160, 
	  'iexcl':161, 
	  'cent':162, 
	  'pound':163, 
	  'curren':164, 
	  'yen':165, 
	  'brvbar':166, 
	  'sect':167, 
	  'uml':168, 
	  'copy':169, 
	  'ordf':170, 
	  'laquo':171, 
	  'not':172, 
	  'shy':173, 
	  'reg':174, 
	  'macr':175, 
	  'deg':176, 
	  'plusmn':177, 
	  'sup2':178, 
	  'sup3':179, 
	  'acute':180, 
	  'micro':181, 
	  'para':182, 
	  'middot':183, 
	  'cedil':184, 
	  'sup1':185, 
	  'ordm':186, 
	  'raquo':187, 
	  'frac14':188, 
	  'frac12':189, 
	  'frac34':190, 
	  'iquest':191, 
	  'Agrave':192, 
	  'Aacute':193, 
	  'Acirc':194, 
	  'Atilde':195, 
	  'Auml':196, 
	  'Aring':197, 
	  'AElig':198, 
	  'Ccedil':199, 
	  'Egrave':200, 
	  'Eacute':201, 
	  'Ecirc':202, 
	  'Euml':203, 
	  'Igrave':204, 
	  'Iacute':205, 
	  'Icirc':206, 
	  'Iuml':207, 
	  'ETH':208, 
	  'Ntilde':209, 
	  'Ograve':210, 
	  'Oacute':211, 
	  'Ocirc':212, 
	  'Otilde':213, 
	  'Ouml':214, 
	  'times':215, 
	  'Oslash':216, 
	  'Ugrave':217, 
	  'Uacute':218, 
	  'Ucirc':219, 
	  'Uuml':220, 
	  'Yacute':221, 
	  'THORN':222, 
	  'szlig':223, 
	  'agrave':224, 
	  'aacute':225, 
	  'acirc':226, 
	  'atilde':227, 
	  'auml':228, 
	  'aring':229, 
	  'aelig':230, 
	  'ccedil':231, 
	  'egrave':232, 
	  'eacute':233, 
	  'ecirc':234, 
	  'euml':235, 
	  'igrave':236, 
	  'iacute':237, 
	  'icirc':238, 
	  'iuml':239, 
	  'eth':240, 
	  'ntilde':241, 
	  'ograve':242, 
	  'oacute':243, 
	  'ocirc':244, 
	  'otilde':245, 
	  'ouml':246, 
	  'divide':247, 
	  'oslash':248, 
	  'ugrave':249, 
	  'uacute':250, 
	  'ucirc':251, 
	  'uuml':252, 
	  'yacute':253, 
	  'thorn':254, 
	  'yuml':255, 
	  'fnof':402, 
	  'Alpha':913, 
	  'Beta':914, 
	  'Gamma':915, 
	  'Delta':916, 
	  'Epsilon':917, 
	  'Zeta':918, 
	  'Eta':919, 
	  'Theta':920, 
	  'Iota':921, 
	  'Kappa':922, 
	  'Lambda':923, 
	  'Mu':924, 
	  'Nu':925, 
	  'Xi':926, 
	  'Omicron':927, 
	  'Pi':928, 
	  'Rho':929, 
	  'Sigma':931, 
	  'Tau':932, 
	  'Upsilon':933, 
	  'Phi':934, 
	  'Chi':935, 
	  'Psi':936, 
	  'Omega':937, 
	  'alpha':945, 
	  'beta':946, 
	  'gamma':947, 
	  'delta':948, 
	  'epsilon':949, 
	  'zeta':950, 
	  'eta':951, 
	  'theta':952, 
	  'iota':953, 
	  'kappa':954, 
	  'lambda':955, 
	  'mu':956, 
	  'nu':957, 
	  'xi':958, 
	  'omicron':959, 
	  'pi':960, 
	  'rho':961, 
	  'sigmaf':962, 
	  'sigma':963, 
	  'tau':964, 
	  'upsilon':965, 
	  'phi':966, 
	  'chi':967, 
	  'psi':968, 
	  'omega':969, 
	  'thetasym':977, 
	  'upsih':978, 
	  'piv':982, 
	  'bull':8226, 
	  'hellip':8230, 
	  'prime':8242, 
	  'Prime':8243, 
	  'oline':8254, 
	  'frasl':8260, 
	  'weierp':8472, 
	  'image':8465, 
	  'real':8476, 
	  'trade':8482, 
	  'alefsym':8501, 
	  'larr':8592, 
	  'uarr':8593, 
	  'rarr':8594, 
	  'darr':8595, 
	  'harr':8596, 
	  'crarr':8629, 
	  'lArr':8656, 
	  'uArr':8657, 
	  'rArr':8658, 
	  'dArr':8659, 
	  'hArr':8660, 
	  'forall':8704, 
	  'part':8706, 
	  'exist':8707, 
	  'empty':8709, 
	  'nabla':8711, 
	  'isin':8712, 
	  'notin':8713, 
	  'ni':8715, 
	  'prod':8719, 
	  'sum':8721, 
	  'minus':8722, 
	  'lowast':8727, 
	  'radic':8730, 
	  'prop':8733, 
	  'infin':8734, 
	  'ang':8736, 
	  'and':8743, 
	  'or':8744, 
	  'cap':8745, 
	  'cup':8746, 
	  'int':8747, 
	  'there4':8756, 
	  'sim':8764, 
	  'cong':8773, 
	  'asymp':8776, 
	  'ne':8800, 
	  'equiv':8801, 
	  'le':8804, 
	  'ge':8805, 
	  'sub':8834, 
	  'sup':8835, 
	  'nsub':8836, 
	  'sube':8838, 
	  'supe':8839, 
	  'oplus':8853, 
	  'otimes':8855, 
	  'perp':8869, 
	  'sdot':8901, 
	  'lceil':8968, 
	  'rceil':8969, 
	  'lfloor':8970, 
	  'rfloor':8971, 
	  'lang':9001, 
	  'rang':9002, 
	  'loz':9674, 
	  'spades':9824, 
	  'clubs':9827, 
	  'hearts':9829, 
	  'diams':9830, 
	  'OElig':338, 
	  'oelig':339, 
	  'Scaron':352, 
	  'scaron':353, 
	  'Yuml':376, 
	  'circ':710, 
	  'tilde':732, 
	  'ensp':8194, 
	  'emsp':8195, 
	  'thinsp':8201, 
	  'zwnj':8204, 
	  'zwj':8205, 
	  'lrm':8206, 
	  'rlm':8207, 
	  'ndash':8211, 
	  'mdash':8212, 
	  'lsquo':8216, 
	  'rsquo':8217, 
	  'sbquo':8218, 
	  'ldquo':8220, 
	  'rdquo':8221, 
	  'bdquo':8222, 
	  'dagger':8224, 
	  'Dagger':8225, 
	  'permil':8240, 
	  'lsaquo':8249, 
	  'rsaquo':8250, 
	  'euro':8364
	}



	module.exports  = entities;

/***/ },
/* 9 */
/***/ function(module, exports) {

	
	module.exports = {
	  'BEGIN': '{',
	  'END': '}'
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	var env = __webpack_require__(3);
	var Lexer = __webpack_require__(11);
	var Parser = __webpack_require__(12);
	var config = __webpack_require__(9);
	var _ = __webpack_require__(4);
	var extend = __webpack_require__(14);
	if(env.browser){
	  var combine = __webpack_require__(15);
	  var dom = __webpack_require__(16);
	  var walkers = __webpack_require__(18);
	  var Group = __webpack_require__(20);
	}
	var events = __webpack_require__(21);
	var Watcher = __webpack_require__(22);
	var parse = __webpack_require__(23);
	var filter = __webpack_require__(24);
	var doc = dom.doc;


	/**
	* `Regular` is regularjs's NameSpace and BaseClass. Every Component is inherited from it
	* 
	* @class Regular
	* @module Regular
	* @constructor
	* @param {Object} options specification of the component
	*/
	var Regular = function(definition, options){
	  var prevRunning = env.isRunning;
	  env.isRunning = true;
	  var node, template;

	  definition = definition || {};
	  options = options || {};

	  definition.data = definition.data || {};
	  definition.computed = definition.computed || {};
	  definition.events = definition.events || {};
	  if(this.data) _.extend(definition.data, this.data);
	  if(this.computed) _.extend(definition.computed, this.computed);
	  if(this.events) _.extend(definition.events, this.events);

	  _.extend(this, definition, true);
	  if(this.$parent){
	     this.$parent._append(this);
	  }
	  this._children = [];
	  this.$refs = {};

	  template = this.template;

	  // template is a string (len < 16). we will find it container first
	  if((typeof template === 'string' && template.length < 16) && (node = dom.find(template))) {
	    template = node.innerHTML;
	  }
	  // if template is a xml
	  if(template && template.nodeType) template = template.innerHTML;
	  if(typeof template === 'string') this.template = new Parser(template).parse();

	  this.computed = handleComputed(this.computed);
	  this.$root = this.$root || this;
	  // if have events
	  if(this.events){
	    this.$on(this.events);
	  }
	  this.$emit("$config");
	  this.config && this.config(this.data);
	  if(this._body && this._body.length){
	    this.$body = _.getCompileFn(this._body, this.$parent, {
	      outer: this,
	      namespace: options.namespace,
	      extra: options.extra,
	      record: true
	    })
	    this._body = null;
	  }
	  // handle computed
	  if(template){
	    this.group = this.$compile(this.template, {namespace: options.namespace});
	    combine.node(this);
	  }


	  if(!this.$parent) this.$update();
	  this.$ready = true;
	  this.$emit("$init");
	  if( this.init ) this.init(this.data);

	  // @TODO: remove, maybe , there is no need to update after init; 
	  // if(this.$root === this) this.$update();
	  env.isRunning = prevRunning;

	  // children is not required;
	}


	walkers && (walkers.Regular = Regular);


	// description
	// -------------------------
	// 1. Regular and derived Class use same filter
	_.extend(Regular, {
	  // private data stuff
	  _directives: { __regexp__:[] },
	  _plugins: {},
	  _protoInheritCache: [ 'directive', 'use'] ,
	  __after__: function(supr, o) {

	    var template;
	    this.__after__ = supr.__after__;

	    // use name make the component global.
	    if(o.name) Regular.component(o.name, this);
	    // this.prototype.template = dom.initTemplate(o)
	    if(template = o.template){
	      var node, name;
	      if( typeof template === 'string' && template.length < 16 && ( node = dom.find( template )) ){
	        template = node.innerHTML;
	        if(name = dom.attr(node, 'name')) Regular.component(name, this);
	      }

	      if(template.nodeType) template = template.innerHTML;

	      if(typeof template === 'string'){
	        this.prototype.template = new Parser(template).parse();
	      }
	    }

	    if(o.computed) this.prototype.computed = handleComputed(o.computed);
	    // inherit directive and other config from supr
	    Regular._inheritConfig(this, supr);

	  },
	  /**
	   * Define a directive
	   *
	   * @method directive
	   * @return {Object} Copy of ...
	   */  
	  directive: function(name, cfg){

	    if(_.typeOf(name) === "object"){
	      for(var k in name){
	        if(name.hasOwnProperty(k)) this.directive(k, name[k]);
	      }
	      return this;
	    }
	    var type = _.typeOf(name);
	    var directives = this._directives, directive;
	    if(cfg == null){
	      if( type === "string" && (directive = directives[name]) ) return directive;
	      else{
	        var regexp = directives.__regexp__;
	        for(var i = 0, len = regexp.length; i < len ; i++){
	          directive = regexp[i];
	          var test = directive.regexp.test(name);
	          if(test) return directive;
	        }
	      }
	      return undefined;
	    }
	    if(typeof cfg === 'function') cfg = { link: cfg } 
	    if(type === 'string') directives[name] = cfg;
	    else if(type === 'regexp'){
	      cfg.regexp = name;
	      directives.__regexp__.push(cfg)
	    }
	    return this
	  },
	  plugin: function(name, fn){
	    var plugins = this._plugins;
	    if(fn == null) return plugins[name];
	    plugins[name] = fn;
	    return this;
	  },
	  use: function(fn){
	    if(typeof fn === "string") fn = Regular.plugin(fn);
	    if(typeof fn !== "function") return this;
	    fn(this, Regular);
	    return this;
	  },
	  // config the Regularjs's global
	  config: function(name, value){
	    var needGenLexer = false;
	    if(typeof name === "object"){
	      for(var i in name){
	        // if you config
	        if( i ==="END" || i==='BEGIN' )  needGenLexer = true;
	        config[i] = name[i];
	      }
	    }
	    if(needGenLexer) Lexer.setup();
	  },
	  expression: parse.expression,
	  Parser: Parser,
	  Lexer: Lexer,
	  _addProtoInheritCache: function(name, transform){
	    if( Array.isArray( name ) ){
	      return name.forEach(Regular._addProtoInheritCache);
	    }
	    var cacheKey = "_" + name + "s"
	    Regular._protoInheritCache.push(name)
	    Regular[cacheKey] = {};
	    if(Regular[name]) return;
	    Regular[name] = function(key, cfg){
	      var cache = this[cacheKey];

	      if(typeof key === "object"){
	        for(var i in key){
	          if(key.hasOwnProperty(i)) this[name](i, key[i]);
	        }
	        return this;
	      }
	      if(cfg == null) return cache[key];
	      cache[key] = transform? transform(cfg) : cfg;
	      return this;
	    }
	  },
	  _inheritConfig: function(self, supr){

	    // prototype inherit some Regular property
	    // so every Component will have own container to serve directive, filter etc..
	    var defs = Regular._protoInheritCache;
	    var keys = _.slice(defs);
	    keys.forEach(function(key){
	      self[key] = supr[key];
	      var cacheKey = '_' + key + 's';
	      if(supr[cacheKey]) self[cacheKey] = _.createObject(supr[cacheKey]);
	    })
	    return self;
	  }

	});

	extend(Regular);

	Regular._addProtoInheritCache("component")

	Regular._addProtoInheritCache("filter", function(cfg){
	  return typeof cfg === "function"? {get: cfg}: cfg;
	})


	events.mixTo(Regular);
	Watcher.mixTo(Regular);

	Regular.implement({
	  init: function(){},
	  config: function(){},
	  destroy: function(){
	    // destroy event wont propgation;
	    this.$emit("$destroy");
	    this.group && this.group.destroy(true);
	    this.group = null;
	    this.parentNode = null;
	    this._watchers = null;
	    this._children = [];
	    var parent = this.$parent;
	    if(parent){
	      var index = parent._children.indexOf(this);
	      parent._children.splice(index,1);
	    }
	    this.$parent = null;
	    this.$root = null;
	    this._handles = null;
	    this.$refs = null;
	  },

	  /**
	   * compile a block ast ; return a group;
	   * @param  {Array} parsed ast
	   * @param  {[type]} record
	   * @return {[type]}
	   */
	  $compile: function(ast, options){
	    options = options || {};
	    if(typeof ast === 'string'){
	      ast = new Parser(ast).parse()
	    }
	    var preExt = this.__ext__,
	      record = options.record, 
	      records;

	    if(options.extra) this.__ext__ = options.extra;

	    if(record) this._record();
	    var group = this._walk(ast, options);
	    if(record){
	      records = this._release();
	      var self = this;
	      if(records.length){
	        // auto destroy all wather;
	        group.ondestroy = function(){ self.$unwatch(records); }
	      }
	    }
	    if(options.extra) this.__ext__ = preExt;
	    return group;
	  },


	  /**
	   * create two-way binding with another component;
	   * *warn*: 
	   *   expr1 and expr2 must can operate set&get, for example: the 'a.b' or 'a[b + 1]' is set-able, but 'a.b + 1' is not, 
	   *   beacuse Regular dont know how to inverse set through the expression;
	   *   
	   *   if before $bind, two component's state is not sync, the component(passed param) will sync with the called component;
	   *
	   * *example: *
	   *
	   * ```javascript
	   * // in this example, we need to link two pager component
	   * var pager = new Pager({}) // pager compoennt
	   * var pager2 = new Pager({}) // another pager component
	   * pager.$bind(pager2, 'current'); // two way bind throw two component
	   * pager.$bind(pager2, 'total');   // 
	   * // or just
	   * pager.$bind(pager2, {"current": "current", "total": "total"}) 
	   * ```
	   * 
	   * @param  {Regular} component the
	   * @param  {String|Expression} expr1     required, self expr1 to operate binding
	   * @param  {String|Expression} expr2     optional, other component's expr to bind with, if not passed, the expr2 will use the expr1;
	   * @return          this;
	   */
	  $bind: function(component, expr1, expr2){
	    var type = _.typeOf(expr1);
	    if( expr1.type === 'expression' || type === 'string' ){
	      this._bind(component, expr1, expr2)
	    }else if( type === "array" ){ // multiply same path binding through array
	      for(var i = 0, len = expr1.length; i < len; i++){
	        this._bind(component, expr1[i]);
	      }
	    }else if(type === "object"){
	      for(var i in expr1) if(expr1.hasOwnProperty(i)){
	        this._bind(component, i, expr1[i]);
	      }
	    }
	    // digest
	    component.$update();
	    return this;
	  },
	  /**
	   * unbind one component( see $bind also)
	   *
	   * unbind will unbind all relation between two component
	   * 
	   * @param  {Regular} component [descriptionegular
	   * @return {This}    this
	   */
	  $unbind: function(){
	    // todo
	  },
	  $inject: combine.inject,
	  $mute: function(isMute){

	    isMute = !!isMute;

	    var needupdate = isMute === false && this._mute;

	    this._mute = !!isMute;

	    if(needupdate) this.$update();
	    return this;
	  },
	  // private bind logic
	  _bind: function(component, expr1, expr2){

	    var self = this;
	    // basic binding

	    if(!component || !(component instanceof Regular)) throw "$bind() should pass Regular component as first argument";
	    if(!expr1) throw "$bind() should  pass as least one expression to bind";

	    if(!expr2) expr2 = expr1;

	    expr1 = parse.expression( expr1 );
	    expr2 = parse.expression( expr2 );

	    // set is need to operate setting ;
	    if(expr2.set){
	      var wid1 = this.$watch( expr1, function(value){
	        component.$update(expr2, value)
	      });
	      component.$on('$destroy', function(){
	        self.$unwatch(wid1)
	      })
	    }
	    if(expr1.set){
	      var wid2 = component.$watch(expr2, function(value){
	        self.$update(expr1, value)
	      });
	      // when brother destroy, we unlink this watcher
	      this.$on('$destroy', component.$unwatch.bind(component,wid2))
	    }
	    // sync the component's state to called's state
	    expr2.set(component, expr1.get(this));
	  },
	  _walk: function(ast, arg1){
	    if( _.typeOf(ast) === 'array' ){
	      var res = [];

	      for(var i = 0, len = ast.length; i < len; i++){
	        res.push( this._walk(ast[i], arg1) );
	      }

	      return new Group(res);
	    }
	    if(typeof ast === 'string') return doc.createTextNode(ast)
	    return walkers[ast.type || "default"].call(this, ast, arg1);
	  },
	  _append: function(component){
	    this._children.push(component);
	    component.$parent = this;
	  },
	  _handleEvent: function(elem, type, value, attrs){
	    var Component = this.constructor,
	      fire = typeof value !== "function"? _.handleEvent.call( this, value, type ) : value,
	      handler = Component.event(type), destroy;

	    if ( handler ) {
	      destroy = handler.call(this, elem, fire, attrs);
	    } else {
	      dom.on(elem, type, fire);
	    }
	    return handler ? destroy : function() {
	      dom.off(elem, type, fire);
	    }
	  },
	  // 1. 用来处理exprBody -> Function
	  // 2. list里的循环
	  _touchExpr: function(expr){
	    var  rawget, ext = this.__ext__, touched = {};
	    if(expr.type !== 'expression' || expr.touched) return expr;
	    rawget = expr.get || (expr.get = new Function(_.ctxName, _.extName , _.prefix+ "return (" + expr.body + ")"));
	    touched.get = !ext? rawget: function(context){
	      return rawget(context, ext)
	    }

	    if(expr.setbody && !expr.set){
	      var setbody = expr.setbody;
	      expr.set = function(ctx, value, ext){
	        expr.set = new Function(_.ctxName, _.setName , _.extName, _.prefix + setbody);          
	        return expr.set(ctx, value, ext);
	      }
	      expr.setbody = null;
	    }
	    if(expr.set){
	      touched.set = !ext? expr.set : function(ctx, value){
	        return expr.set(ctx, value, ext);
	      }
	    }
	    _.extend(touched, {
	      type: 'expression',
	      touched: true,
	      once: expr.once || expr.constant
	    })
	    return touched
	  },
	  // find filter
	  _f_: function(name){
	    var Component = this.constructor;
	    var filter = Component.filter(name);
	    if(!filter) throw Error('filter ' + name + ' is undefined');
	    return filter;
	  },
	  // simple accessor get
	  _sg_:function(path, defaults, ext){
	    if(typeof ext !== 'undefined'){
	      // if(path === "demos")  debugger
	      var computed = this.computed,
	        computedProperty = computed[path];
	      if(computedProperty){
	        if(computedProperty.type==='expression' && !computedProperty.get) this._touchExpr(computedProperty);
	        if(computedProperty.get)  return computedProperty.get(this);
	        else _.log("the computed '" + path + "' don't define the get function,  get data."+path + " altnately", "warn")
	      }
	  }
	    if(typeof defaults === "undefined" || typeof path == "undefined" ){
	      return undefined;
	    }
	    return (ext && typeof ext[path] !== 'undefined')? ext[path]: defaults[path];

	  },
	  // simple accessor set
	  _ss_:function(path, value, data , op, computed){
	    var computed = this.computed,
	      op = op || "=", prev, 
	      computedProperty = computed? computed[path]:null;

	    if(op !== '='){
	      prev = computedProperty? computedProperty.get(this): data[path];
	      switch(op){
	        case "+=":
	          value = prev + value;
	          break;
	        case "-=":
	          value = prev - value;
	          break;
	        case "*=":
	          value = prev * value;
	          break;
	        case "/=":
	          value = prev / value;
	          break;
	        case "%=":
	          value = prev % value;
	          break;
	      }
	    }
	    if(computedProperty) {
	      if(computedProperty.set) return computedProperty.set(this, value);
	      else _.log("the computed '" + path + "' don't define the set function,  assign data."+path + " altnately", "warn" )
	    }
	    data[path] = value;
	    return value;
	  }
	});

	Regular.prototype.inject = function(){
	  _.log("use $inject instead of inject", "error");
	  return this.$inject.apply(this, arguments);
	}


	// only one builtin filter

	Regular.filter(filter);

	module.exports = Regular;



	var handleComputed = (function(){
	  // wrap the computed getter;
	  function wrapGet(get){
	    return function(context){
	      return get.call(context, context.data );
	    }
	  }
	  // wrap the computed setter;
	  function wrapSet(set){
	    return function(context, value){
	      set.call( context, value, context.data );
	      return value;
	    }
	  }

	  return function(computed){
	    if(!computed) return;
	    var parsedComputed = {}, handle, pair, type;
	    for(var i in computed){
	      handle = computed[i]
	      type = typeof handle;

	      if(handle.type === 'expression'){
	        parsedComputed[i] = handle;
	        continue;
	      }
	      if( type === "string" ){
	        parsedComputed[i] = parse.expression(handle)
	      }else{
	        pair = parsedComputed[i] = {type: 'expression'};
	        if(type === "function" ){
	          pair.get = wrapGet(handle);
	        }else{
	          if(handle.get) pair.get = wrapGet(handle.get);
	          if(handle.set) pair.set = wrapSet(handle.set);
	        }
	      } 
	    }
	    return parsedComputed;
	  }
	})();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var config = __webpack_require__(9);

	// some custom tag  will conflict with the Lexer progress
	var conflictTag = {"}": "{", "]": "["}, map1, map2;
	// some macro for lexer
	var macro = {
	  'NAME': /(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,
	  'IDENT': /[\$_A-Za-z][_0-9A-Za-z\$]*/,
	  'SPACE': /[\r\n\f ]/
	}


	var test = /a|(b)/.exec("a");
	var testSubCapure = test && test[1] === undefined? 
	  function(str){ return str !== undefined }
	  :function(str){return !!str};

	function wrapHander(handler){
	  return function(all){
	    return {type: handler, value: all }
	  }
	}

	function Lexer(input, opts){
	  if(conflictTag[config.END]){
	    this.markStart = conflictTag[config.END];
	    this.markEnd = config.END;
	  }

	  this.input = (input||"").trim();
	  this.opts = opts || {};
	  this.map = this.opts.mode !== 2?  map1: map2;
	  this.states = ["INIT"];
	  if(opts && opts.expression){
	     this.states.push("JST");
	     this.expression = true;
	  }
	}

	var lo = Lexer.prototype


	lo.lex = function(str){
	  str = (str || this.input).trim();
	  var tokens = [], split, test,mlen, token, state;
	  this.input = str, 
	  this.marks = 0;
	  // init the pos index
	  this.index=0;
	  var i = 0;
	  while(str){
	    i++
	    state = this.state();
	    split = this.map[state] 
	    test = split.TRUNK.exec(str);
	    if(!test){
	      this.error('Unrecoginized Token');
	    }
	    mlen = test[0].length;
	    str = str.slice(mlen)
	    token = this._process.call(this, test, split, str)
	    if(token) tokens.push(token)
	    this.index += mlen;
	    // if(state == 'TAG' || state == 'JST') str = this.skipspace(str);
	  }

	  tokens.push({type: 'EOF'});

	  return tokens;
	}

	lo.error = function(msg){
	  throw  Error("Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, this.index));
	}

	lo._process = function(args, split,str){
	  // console.log(args.join(","), this.state())
	  var links = split.links, marched = false, token;

	  for(var len = links.length, i=0;i<len ;i++){
	    var link = links[i],
	      handler = link[2],
	      index = link[0];
	    // if(args[6] === '>' && index === 6) console.log('haha')
	    if(testSubCapure(args[index])) {
	      marched = true;
	      if(handler){
	        token = handler.apply(this, args.slice(index, index + link[1]))
	        if(token)  token.pos = this.index;
	      }
	      break;
	    }
	  }
	  if(!marched){ // in ie lt8 . sub capture is "" but ont 
	    switch(str.charAt(0)){
	      case "<":
	        this.enter("TAG");
	        break;
	      default:
	        this.enter("JST");
	        break;
	    }
	  }
	  return token;
	}
	lo.enter = function(state){
	  this.states.push(state)
	  return this;
	}

	lo.state = function(){
	  var states = this.states;
	  return states[states.length-1];
	}

	lo.leave = function(state){
	  var states = this.states;
	  if(!state || states[states.length-1] === state) states.pop()
	}


	Lexer.setup = function(){
	  macro.END = config.END;
	  macro.BEGIN = config.BEGIN;
	  //
	  map1 = genMap([
	    // INIT
	    rules.ENTER_JST,
	    rules.ENTER_TAG,
	    rules.TEXT,

	    //TAG
	    rules.TAG_NAME,
	    rules.TAG_OPEN,
	    rules.TAG_CLOSE,
	    rules.TAG_PUNCHOR,
	    rules.TAG_ENTER_JST,
	    rules.TAG_UNQ_VALUE,
	    rules.TAG_STRING,
	    rules.TAG_SPACE,
	    rules.TAG_COMMENT,

	    // JST
	    rules.JST_OPEN,
	    rules.JST_CLOSE,
	    rules.JST_COMMENT,
	    rules.JST_EXPR_OPEN,
	    rules.JST_IDENT,
	    rules.JST_SPACE,
	    rules.JST_LEAVE,
	    rules.JST_NUMBER,
	    rules.JST_PUNCHOR,
	    rules.JST_STRING,
	    rules.JST_COMMENT
	    ])

	  // ignored the tag-relative token
	  map2 = genMap([
	    // INIT no < restrict
	    rules.ENTER_JST2,
	    rules.TEXT,
	    // JST
	    rules.JST_COMMENT,
	    rules.JST_OPEN,
	    rules.JST_CLOSE,
	    rules.JST_EXPR_OPEN,
	    rules.JST_IDENT,
	    rules.JST_SPACE,
	    rules.JST_LEAVE,
	    rules.JST_NUMBER,
	    rules.JST_PUNCHOR,
	    rules.JST_STRING,
	    rules.JST_COMMENT
	    ])
	}


	function genMap(rules){
	  var rule, map = {}, sign;
	  for(var i = 0, len = rules.length; i < len ; i++){
	    rule = rules[i];
	    sign = rule[2] || 'INIT';
	    ( map[sign] || (map[sign] = {rules:[], links:[]}) ).rules.push(rule);
	  }
	  return setup(map);
	}

	function setup(map){
	  var split, rules, trunks, handler, reg, retain, rule;
	  function replaceFn(all, one){
	    return typeof macro[one] === 'string'? 
	      _.escapeRegExp(macro[one]) 
	      : String(macro[one]).slice(1,-1);
	  }

	  for(var i in map){

	    split = map[i];
	    split.curIndex = 1;
	    rules = split.rules;
	    trunks = [];

	    for(var j = 0,len = rules.length; j<len; j++){
	      rule = rules[j]; 
	      reg = rule[0];
	      handler = rule[1];

	      if(typeof handler === 'string'){
	        handler = wrapHander(handler);
	      }
	      if(_.typeOf(reg) === 'regexp') reg = reg.toString().slice(1, -1);

	      reg = reg.replace(/\{(\w+)\}/g, replaceFn)
	      retain = _.findSubCapture(reg) + 1; 
	      split.links.push([split.curIndex, retain, handler]); 
	      split.curIndex += retain;
	      trunks.push(reg);
	    }
	    split.TRUNK = new RegExp("^(?:(" + trunks.join(")|(") + "))")
	  }
	  return map;
	}

	var rules = {

	  // 1. INIT
	  // ---------------

	  // mode1's JST ENTER RULE
	  ENTER_JST: [/[^\x00<]*?(?={BEGIN})/, function(all){
	    this.enter('JST');
	    if(all) return {type: 'TEXT', value: all}
	  }],

	  // mode2's JST ENTER RULE
	  ENTER_JST2: [/[^\x00]*?(?={BEGIN})/, function(all){
	    this.enter('JST');
	    if(all) return {type: 'TEXT', value: all}
	  }],

	  ENTER_TAG: [/[^\x00]*?(?=<[\w\/\!])/, function(all){ 
	    this.enter('TAG');
	    if(all) return {type: 'TEXT', value: all}
	  }],

	  TEXT: [/[^\x00]+/, 'TEXT' ],

	  // 2. TAG
	  // --------------------
	  TAG_NAME: [/{NAME}/, 'NAME', 'TAG'],
	  TAG_UNQ_VALUE: [/[^\{}&"'=><`\r\n\f ]+/, 'UNQ', 'TAG'],

	  TAG_OPEN: [/<({NAME})\s*/, function(all, one){ //"
	    return {type: 'TAG_OPEN', value: one}
	  }, 'TAG'],
	  TAG_CLOSE: [/<\/({NAME})[\r\n\f ]*>/, function(all, one){
	    this.leave();
	    return {type: 'TAG_CLOSE', value: one }
	  }, 'TAG'],

	    // mode2's JST ENTER RULE
	  TAG_ENTER_JST: [/(?={BEGIN})/, function(){
	    this.enter('JST');
	  }, 'TAG'],


	  TAG_PUNCHOR: [/[\>\/=&]/, function(all){
	    if(all === '>') this.leave();
	    return {type: all, value: all }
	  }, 'TAG'],
	  TAG_STRING:  [ /'([^']*)'|"([^"]*)\"/, /*'*/  function(all, one, two){ 
	    var value = one || two || "";

	    return {type: 'STRING', value: value}
	  }, 'TAG'],

	  TAG_SPACE: [/{SPACE}+/, null, 'TAG'],
	  TAG_COMMENT: [/<\!--([^\x00]*?)--\>/, function(all){
	    this.leave()
	    // this.leave('TAG')
	  } ,'TAG'],

	  // 3. JST
	  // -------------------

	  JST_OPEN: ['{BEGIN}#{SPACE}*({IDENT})', function(all, name){
	    return {
	      type: 'OPEN',
	      value: name
	    }
	  }, 'JST'],
	  JST_LEAVE: [/{END}/, function(all){
	    if(this.markEnd === all && this.expression) return {type: this.markEnd, value: this.markEnd};
	    if(!this.markEnd || !this.marks ){
	      this.firstEnterStart = false;
	      this.leave('JST');
	      return {type: 'END'}
	    }else{
	      this.marks--;
	      return {type: this.markEnd, value: this.markEnd}
	    }
	  }, 'JST'],
	  JST_CLOSE: [/{BEGIN}\s*\/({IDENT})\s*{END}/, function(all, one){
	    this.leave('JST');
	    return {
	      type: 'CLOSE',
	      value: one
	    }
	  }, 'JST'],
	  JST_COMMENT: [/{BEGIN}\!([^\x00]*?)\!{END}/, function(){
	    this.leave();
	  }, 'JST'],
	  JST_EXPR_OPEN: ['{BEGIN}',function(all, one){
	    if(all === this.markStart){
	      if(this.expression) return { type: this.markStart, value: this.markStart };
	      if(this.firstEnterStart || this.marks){
	        this.marks++
	        this.firstEnterStart = false;
	        return { type: this.markStart, value: this.markStart };
	      }else{
	        this.firstEnterStart = true;
	      }
	    }
	    return {
	      type: 'EXPR_OPEN',
	      escape: false
	    }

	  }, 'JST'],
	  JST_IDENT: ['{IDENT}', 'IDENT', 'JST'],
	  JST_SPACE: [/[ \r\n\f]+/, null, 'JST'],
	  JST_PUNCHOR: [/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/, function(all){
	    return { type: all, value: all }
	  },'JST'],

	  JST_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
	    return {type: 'STRING', value: one || two || ""}
	  }, 'JST'],
	  JST_NUMBER: [/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/, function(all){
	    return {type: 'NUMBER', value: parseFloat(all, 10)};
	  }, 'JST']
	}


	// setup when first config
	Lexer.setup();



	module.exports = Lexer;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);

	var config = __webpack_require__(9);
	var node = __webpack_require__(13);
	var Lexer = __webpack_require__(11);
	var varName = _.varName;
	var ctxName = _.ctxName;
	var extName = _.extName;
	var isPath = _.makePredicate("STRING IDENT NUMBER");
	var isKeyWord = _.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object");




	function Parser(input, opts){
	  opts = opts || {};

	  this.input = input;
	  this.tokens = new Lexer(input, opts).lex();
	  this.pos = 0;
	  this.length = this.tokens.length;
	}


	var op = Parser.prototype;


	op.parse = function(){
	  this.pos = 0;
	  var res= this.program();
	  if(this.ll().type === 'TAG_CLOSE'){
	    this.error("You may got a unclosed Tag")
	  }
	  return res;
	}

	op.ll =  function(k){
	  k = k || 1;
	  if(k < 0) k = k + 1;
	  var pos = this.pos + k - 1;
	  if(pos > this.length - 1){
	      return this.tokens[this.length-1];
	  }
	  return this.tokens[pos];
	}
	  // lookahead
	op.la = function(k){
	  return (this.ll(k) || '').type;
	}

	op.match = function(type, value){
	  var ll;
	  if(!(ll = this.eat(type, value))){
	    ll  = this.ll();
	    this.error('expect [' + type + (value == null? '':':'+ value) + ']" -> got "[' + ll.type + (value==null? '':':'+ll.value) + ']', ll.pos)
	  }else{
	    return ll;
	  }
	}

	op.error = function(msg, pos){
	  msg =  "\n【 parse failed 】 " + msg +  ':\n\n' + _.trackErrorPos(this.input, typeof pos === 'number'? pos: this.ll().pos||0);
	  throw new Error(msg);
	}

	op.next = function(k){
	  k = k || 1;
	  this.pos += k;
	}
	op.eat = function(type, value){
	  var ll = this.ll();
	  if(typeof type !== 'string'){
	    for(var len = type.length ; len--;){
	      if(ll.type === type[len]) {
	        this.next();
	        return ll;
	      }
	    }
	  }else{
	    if( ll.type === type && (typeof value === 'undefined' || ll.value === value) ){
	       this.next();
	       return ll;
	    }
	  }
	  return false;
	}

	// program
	//  :EOF
	//  | (statement)* EOF
	op.program = function(){
	  var statements = [],  ll = this.ll();
	  while(ll.type !== 'EOF' && ll.type !=='TAG_CLOSE'){

	    statements.push(this.statement());
	    ll = this.ll();
	  }
	  // if(ll.type === 'TAG_CLOSE') this.error("You may have unmatched Tag")
	  return statements;
	}

	// statement
	//  : xml
	//  | jst
	//  | text
	op.statement = function(){
	  var ll = this.ll();
	  switch(ll.type){
	    case 'NAME':
	    case 'TEXT':
	      var text = ll.value;
	      this.next();
	      while(ll = this.eat(['NAME', 'TEXT'])){
	        text += ll.value;
	      }
	      return node.text(text);
	    case 'TAG_OPEN':
	      return this.xml();
	    case 'OPEN': 
	      return this.directive();
	    case 'EXPR_OPEN':
	      return this.interplation();
	    default:
	      this.error('Unexpected token: '+ this.la())
	  }
	}

	// xml 
	// stag statement* TAG_CLOSE?(if self-closed tag)
	op.xml = function(){
	  var name, attrs, children, selfClosed;
	  name = this.match('TAG_OPEN').value;
	  attrs = this.attrs();
	  selfClosed = this.eat('/')
	  this.match('>');
	  if( !selfClosed && !_.isVoidTag(name) ){
	    children = this.program();
	    if(!this.eat('TAG_CLOSE', name)) this.error('expect </'+name+'> got'+ 'no matched closeTag')
	  }
	  return node.element(name, attrs, children);
	}

	// xentity
	//  -rule(wrap attribute)
	//  -attribute
	//
	// __example__
	//  name = 1 |  
	//  ng-hide |
	//  on-click={{}} | 
	//  {{#if name}}on-click={{xx}}{{#else}}on-tap={{}}{{/if}}

	op.xentity = function(ll){
	  var name = ll.value, value, modifier;
	  if(ll.type === 'NAME'){
	    //@ only for test
	    if(~name.indexOf('.')){
	      var tmp = name.split('.');
	      name = tmp[0];
	      modifier = tmp[1]

	    }
	    if( this.eat("=") ) value = this.attvalue(modifier);
	    return node.attribute( name, value, modifier );
	  }else{
	    if( name !== 'if') this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #" + name + ' is invalid');
	    return this['if'](true);
	  }

	}

	// stag     ::=    '<' Name (S attr)* S? '>'  
	// attr    ::=     Name Eq attvalue
	op.attrs = function(isAttribute){
	  var eat
	  if(!isAttribute){
	    eat = ["NAME", "OPEN"]
	  }else{
	    eat = ["NAME"]
	  }

	  var attrs = [], ll;
	  while (ll = this.eat(eat)){
	    attrs.push(this.xentity( ll ))
	  }
	  return attrs;
	}

	// attvalue
	//  : STRING  
	//  | NAME
	op.attvalue = function(mdf){
	  var ll = this.ll();
	  switch(ll.type){
	    case "NAME":
	    case "UNQ":
	    case "STRING":
	      this.next();
	      var value = ll.value;
	      if(~value.indexOf(config.BEGIN) && ~value.indexOf(config.END) && mdf!=='cmpl'){
	        var constant = true;
	        var parsed = new Parser(value, { mode: 2 }).parse();
	        if(parsed.length === 1 && parsed[0].type === 'expression') return parsed[0];
	        var body = [];
	        parsed.forEach(function(item){
	          if(!item.constant) constant=false;
	          // silent the mutiple inteplation
	            body.push(item.body || "'" + item.text.replace(/'/g, "\\'") + "'");        
	        });
	        body = "[" + body.join(",") + "].join('')";
	        value = node.expression(body, null, constant);
	      }
	      return value;
	    case "EXPR_OPEN":
	      return this.interplation();
	    // case "OPEN":
	    //   if(ll.value === 'inc' || ll.value === 'include'){
	    //     this.next();
	    //     return this.inc();
	    //   }else{
	    //     this.error('attribute value only support inteplation and {#inc} statement')
	    //   }
	    //   break;
	    default:
	      this.error('Unexpected token: '+ this.la())
	  }
	}


	// {{#}}
	op.directive = function(){
	  var name = this.ll().value;
	  this.next();
	  if(typeof this[name] === 'function'){
	    return this[name]()
	  }else{
	    this.error('Undefined directive['+ name +']');
	  }
	}


	// {{}}
	op.interplation = function(){
	  this.match('EXPR_OPEN');
	  var res = this.expression(true);
	  this.match('END');
	  return res;
	}

	// {{~}}
	op.inc = op.include = function(){
	  var content = this.expression();
	  this.match('END');
	  return node.template(content);
	}

	// {{#if}}
	op["if"] = function(tag){
	  var test = this.expression();
	  var consequent = [], alternate=[];

	  var container = consequent;
	  var statement = !tag? "statement" : "attrs";

	  this.match('END');

	  var ll, close;
	  while( ! (close = this.eat('CLOSE')) ){
	    ll = this.ll();
	    if( ll.type === 'OPEN' ){
	      switch( ll.value ){
	        case 'else':
	          container = alternate;
	          this.next();
	          this.match( 'END' );
	          break;
	        case 'elseif':
	          this.next();
	          alternate.push( this["if"](tag) );
	          return node['if']( test, consequent, alternate );
	        default:
	          container.push( this[statement](true) );
	      }
	    }else{
	      container.push(this[statement](true));
	    }
	  }
	  // if statement not matched
	  if(close.value !== "if") this.error('Unmatched if directive')
	  return node["if"](test, consequent, alternate);
	}


	// @mark   mustache syntax have natrure dis, canot with expression
	// {{#list}}
	op.list = function(){
	  // sequence can be a list or hash
	  var sequence = this.expression(), variable, ll, track;
	  var consequent = [], alternate=[];
	  var container = consequent;

	  this.match('IDENT', 'as');

	  variable = this.match('IDENT').value;

	  if(this.eat('IDENT', 'by')){
	    if(this.eat('IDENT',variable + '_index')){
	      track = true;
	    }else{
	      track = this.expression();
	      if(track.constant){
	        // true is means constant, we handle it just like xxx_index.
	        track = true;
	      }
	    }
	  }

	  this.match('END');

	  while( !(ll = this.eat('CLOSE')) ){
	    if(this.eat('OPEN', 'else')){
	      container =  alternate;
	      this.match('END');
	    }else{
	      container.push(this.statement());
	    }
	  }
	  
	  if(ll.value !== 'list') this.error('expect ' + 'list got ' + '/' + ll.value + ' ', ll.pos );
	  return node.list(sequence, variable, consequent, alternate, track);
	}


	op.expression = function(){
	  var expression;
	  if(this.eat('@(')){ //once bind
	    expression = this.expr();
	    expression.once = true;
	    this.match(')')
	  }else{
	    expression = this.expr();
	  }
	  return expression;
	}

	op.expr = function(){
	  this.depend = [];

	  var buffer = this.filter()

	  var body = buffer.get || buffer;
	  var setbody = buffer.set;
	  return node.expression(body, setbody, !this.depend.length);
	}


	// filter
	// assign ('|' filtername[':' args]) * 
	op.filter = function(){
	  var left = this.assign();
	  var ll = this.eat('|');
	  var buffer = [], setBuffer, prefix,
	    attr = "t", 
	    set = left.set, get, 
	    tmp = "";

	  if(ll){
	    if(set) setBuffer = [];

	    prefix = "(function(" + attr + "){";

	    do{
	      tmp = attr + " = " + ctxName + "._f_('" + this.match('IDENT').value+ "' ).get.call( "+_.ctxName +"," + attr ;
	      if(this.eat(':')){
	        tmp +=", "+ this.arguments("|").join(",") + ");"
	      }else{
	        tmp += ');'
	      }
	      buffer.push(tmp);
	      setBuffer && setBuffer.unshift( tmp.replace(" ).get.call", " ).set.call") );

	    }while(ll = this.eat('|'));
	    buffer.push("return " + attr );
	    setBuffer && setBuffer.push("return " + attr);

	    get =  prefix + buffer.join("") + "})("+left.get+")";
	    // we call back to value.
	    if(setBuffer){
	      // change _ss__(name, _p_) to _s__(name, filterFn(_p_));
	      set = set.replace(_.setName, 
	        prefix + setBuffer.join("") + "})("+　_.setName　+")" );

	    }
	    // the set function is depend on the filter definition. if it have set method, the set will work
	    return this.getset(get, set);
	  }
	  return left;
	}

	// assign
	// left-hand-expr = condition
	op.assign = function(){
	  var left = this.condition(), ll;
	  if(ll = this.eat(['=', '+=', '-=', '*=', '/=', '%='])){
	    if(!left.set) this.error('invalid lefthand expression in assignment expression');
	    return this.getset( left.set.replace( "," + _.setName, "," + this.condition().get ).replace("'='", "'"+ll.type+"'"), left.set);
	    // return this.getset('(' + left.get + ll.type  + this.condition().get + ')', left.set);
	  }
	  return left;
	}

	// or
	// or ? assign : assign
	op.condition = function(){

	  var test = this.or();
	  if(this.eat('?')){
	    return this.getset([test.get + "?", 
	      this.assign().get, 
	      this.match(":").type, 
	      this.assign().get].join(""));
	  }

	  return test;
	}

	// and
	// and && or
	op.or = function(){

	  var left = this.and();

	  if(this.eat('||')){
	    return this.getset(left.get + '||' + this.or().get);
	  }

	  return left;
	}
	// equal
	// equal && and
	op.and = function(){

	  var left = this.equal();

	  if(this.eat('&&')){
	    return this.getset(left.get + '&&' + this.and().get);
	  }
	  return left;
	}
	// relation
	// 
	// equal == relation
	// equal != relation
	// equal === relation
	// equal !== relation
	op.equal = function(){
	  var left = this.relation(), ll;
	  // @perf;
	  if( ll = this.eat(['==','!=', '===', '!=='])){
	    return this.getset(left.get + ll.type + this.equal().get);
	  }
	  return left
	}
	// relation < additive
	// relation > additive
	// relation <= additive
	// relation >= additive
	// relation in additive
	op.relation = function(){
	  var left = this.additive(), ll;
	  // @perf
	  if(ll = (this.eat(['<', '>', '>=', '<=']) || this.eat('IDENT', 'in') )){
	    return this.getset(left.get + ll.value + this.relation().get);
	  }
	  return left
	}
	// additive :
	// multive
	// additive + multive
	// additive - multive
	op.additive = function(){
	  var left = this.multive() ,ll;
	  if(ll= this.eat(['+','-']) ){
	    return this.getset(left.get + ll.value + this.additive().get);
	  }
	  return left
	}
	// multive :
	// unary
	// multive * unary
	// multive / unary
	// multive % unary
	op.multive = function(){
	  var left = this.range() ,ll;
	  if( ll = this.eat(['*', '/' ,'%']) ){
	    return this.getset(left.get + ll.type + this.multive().get);
	  }
	  return left;
	}

	op.range = function(){
	  var left = this.unary(), ll, right;

	  if(ll = this.eat('..')){
	    right = this.unary();
	    var body = 
	      "(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+left.get+","+right.get+")"
	    return this.getset(body);
	  }

	  return left;
	}



	// lefthand
	// + unary
	// - unary
	// ~ unary
	// ! unary
	op.unary = function(){
	  var ll;
	  if(ll = this.eat(['+','-','~', '!'])){
	    return this.getset('(' + ll.type + this.unary().get + ')') ;
	  }else{
	    return this.member()
	  }
	}

	// call[lefthand] :
	// member args
	// member [ expression ]
	// member . ident  

	op.member = function(base, last, pathes, prevBase){
	  var ll, path, extValue;


	  var onlySimpleAccessor = false;
	  if(!base){ //first
	    path = this.primary();
	    var type = typeof path;
	    if(type === 'string'){ 
	      pathes = [];
	      pathes.push( path );
	      last = path;
	      extValue = extName + "." + path
	      base = ctxName + "._sg_('" + path + "', " + varName + ", " + extName + ")";
	      onlySimpleAccessor = true;
	    }else{ //Primative Type
	      if(path.get === 'this'){
	        base = ctxName;
	        pathes = ['this'];
	      }else{
	        pathes = null;
	        base = path.get;
	      }
	    }
	  }else{ // not first enter
	    if(typeof last === 'string' && isPath( last) ){ // is valid path
	      pathes.push(last);
	    }else{
	      if(pathes && pathes.length) this.depend.push(pathes);
	      pathes = null;
	    }
	  }
	  if(ll = this.eat(['[', '.', '('])){
	    switch(ll.type){
	      case '.':
	          // member(object, property, computed)
	        var tmpName = this.match('IDENT').value;
	        prevBase = base;
	        if( this.la() !== "(" ){ 
	          base = ctxName + "._sg_('" + tmpName + "', " + base + ")";
	        }else{
	          base += "['" + tmpName + "']";
	        }
	        return this.member( base, tmpName, pathes,  prevBase);
	      case '[':
	          // member(object, property, computed)
	        path = this.assign();
	        prevBase = base;
	        if( this.la() !== "(" ){ 
	        // means function call, we need throw undefined error when call function
	        // and confirm that the function call wont lose its context
	          base = ctxName + "._sg_(" + path.get + ", " + base + ")";
	        }else{
	          base += "[" + path.get + "]";
	        }
	        this.match(']')
	        return this.member(base, path, pathes, prevBase);
	      case '(':
	        // call(callee, args)
	        var args = this.arguments().join(',');
	        base =  base+"(" + args +")";
	        this.match(')')
	        return this.member(base, null, pathes);
	    }
	  }
	  if( pathes && pathes.length ) this.depend.push( pathes );
	  var res =  {get: base};
	  if(last){
	    res.set = ctxName + "._ss_(" + 
	        (last.get? last.get : "'"+ last + "'") + 
	        ","+ _.setName + ","+ 
	        (prevBase?prevBase:_.varName) + 
	        ", '=', "+ ( onlySimpleAccessor? 1 : 0 ) + ")";
	  
	  }
	  return res;
	}

	/**
	 * 
	 */
	op.arguments = function(end){
	  end = end || ')'
	  var args = [];
	  do{
	    if(this.la() !== end){
	      args.push(this.assign().get)
	    }
	  }while( this.eat(','));
	  return args
	}


	// primary :
	// this 
	// ident
	// literal
	// array
	// object
	// ( expression )

	op.primary = function(){
	  var ll = this.ll();
	  switch(ll.type){
	    case "{":
	      return this.object();
	    case "[":
	      return this.array();
	    case "(":
	      return this.paren();
	    // literal or ident
	    case 'STRING':
	      this.next();
	      return this.getset("'" + ll.value + "'")
	    case 'NUMBER':
	      this.next();
	      return this.getset(""+ll.value);
	    case "IDENT":
	      this.next();
	      if(isKeyWord(ll.value)){
	        return this.getset( ll.value );
	      }
	      return ll.value;
	    default: 
	      this.error('Unexpected Token: ' + ll.type);
	  }
	}

	// object
	//  {propAssign [, propAssign] * [,]}

	// propAssign
	//  prop : assign

	// prop
	//  STRING
	//  IDENT
	//  NUMBER

	op.object = function(){
	  var code = [this.match('{').type];

	  var ll = this.eat( ['STRING', 'IDENT', 'NUMBER'] );
	  while(ll){
	    code.push("'" + ll.value + "'" + this.match(':').type);
	    var get = this.assign().get;
	    code.push(get);
	    ll = null;
	    if(this.eat(",") && (ll = this.eat(['STRING', 'IDENT', 'NUMBER'])) ) code.push(",");
	  }
	  code.push(this.match('}').type);
	  return {get: code.join("")}
	}

	// array
	// [ assign[,assign]*]
	op.array = function(){
	  var code = [this.match('[').type], item;
	  if( this.eat("]") ){

	     code.push("]");
	  } else {
	    while(item = this.assign()){
	      code.push(item.get);
	      if(this.eat(',')) code.push(",");
	      else break;
	    }
	    code.push(this.match(']').type);
	  }
	  return {get: code.join("")};
	}

	// '(' expression ')'
	op.paren = function(){
	  this.match('(');
	  var res = this.filter()
	  res.get = '(' + res.get + ')';
	  this.match(')');
	  return res;
	}

	op.getset = function(get, set){
	  return {
	    get: get,
	    set: set
	  }
	}



	module.exports = Parser;


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
	  element: function(name, attrs, children){
	    return {
	      type: 'element',
	      tag: name,
	      attrs: attrs,
	      children: children
	    }
	  },
	  attribute: function(name, value, mdf){
	    return {
	      type: 'attribute',
	      name: name,
	      value: value,
	      mdf: mdf
	    }
	  },
	  "if": function(test, consequent, alternate){
	    return {
	      type: 'if',
	      test: test,
	      consequent: consequent,
	      alternate: alternate
	    }
	  },
	  list: function(sequence, variable, body, alternate, track){
	    return {
	      type: 'list',
	      sequence: sequence,
	      alternate: alternate,
	      variable: variable,
	      body: body,
	      track: track
	    }
	  },
	  expression: function( body, setbody, constant ){
	    return {
	      type: "expression",
	      body: body,
	      constant: constant || false,
	      setbody: setbody || false
	    }
	  },
	  text: function(text){
	    return {
	      type: "text",
	      text: text
	    }
	  },
	  template: function(template){
	    return {
	      type: 'template',
	      content: template
	    }
	  }
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	// Backbone may be freely distributed under the MIT license.
	// For all details and documentation:
	// http://backbonejs.org

	// klass: a classical JS OOP façade
	// https://github.com/ded/klass
	// License MIT (c) Dustin Diaz 2014
	  
	// inspired by backbone's extend and klass
	var _ = __webpack_require__(4),
	  fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
	  isFn = function(o){return typeof o === "function"};


	function wrap(k, fn, supro) {
	  return function () {
	    var tmp = this.supr;
	    this.supr = supro[k];
	    var ret = fn.apply(this, arguments);
	    this.supr = tmp;
	    return ret;
	  }
	}

	function process( what, o, supro ) {
	  for ( var k in o ) {
	    if (o.hasOwnProperty(k)) {

	      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
	        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
	    }
	  }
	}

	// if the property is ["events", "data", "computed"] , we should merge them
	var merged = ["events", "data", "computed"], mlen = merged.length;
	module.exports = function extend(o){
	  o = o || {};
	  var supr = this, proto,
	    supro = supr && supr.prototype || {};

	  if(typeof o === 'function'){
	    proto = o.prototype;
	    o.implement = implement;
	    o.extend = extend;
	    return o;
	  } 
	  
	  function fn() {
	    supr.apply(this, arguments);
	  }

	  proto = _.createProto(fn, supro);

	  function implement(o){
	    // we need merge the merged property
	    var len = mlen;
	    for(;len--;){
	      var prop = merged[len];
	      if(o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
	        _.extend(proto[prop], o[prop], true) 
	        delete o[prop];
	      }
	    }


	    process(proto, o, supro); 
	    return this;
	  }



	  fn.implement = implement
	  fn.implement(o)
	  if(supr.__after__) supr.__after__.call(fn, supr, o);
	  fn.extend = extend;
	  return fn;
	}



/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// some nested  operation in ast 
	// --------------------------------

	var dom = __webpack_require__(16);
	var animate = __webpack_require__(17);

	var combine = module.exports = {

	  // get the initial dom in object
	  node: function(item){
	    var children,node, nodes;
	    if(!item) return;
	    if(item.element) return item.element;
	    if(typeof item.node === "function") return item.node();
	    if(typeof item.nodeType === "number") return item;
	    if(item.group) return combine.node(item.group)
	    if(children = item.children){
	      if(children.length === 1){
	        return combine.node(children[0]);
	      }
	      nodes = [];
	      for(var i = 0, len = children.length; i < len; i++ ){
	        node = combine.node(children[i]);
	        if(Array.isArray(node)){
	          nodes.push.apply(nodes, node)
	        }else if(node) {
	          nodes.push(node)
	        }
	      }
	      return nodes;
	    }
	  },
	  // @TODO remove _gragContainer
	  inject: function(node, pos ){
	    var group = this;
	    var fragment = combine.node(group.group || group);
	    if(node === false) {
	      animate.remove(fragment)
	      return group;
	    }else{
	      if(!fragment) return group;
	      if(typeof node === 'string') node = dom.find(node);
	      if(!node) throw Error('injected node is not found');
	      // use animate to animate firstchildren
	      animate.inject(fragment, node, pos);
	    }
	    // if it is a component
	    if(group.$emit) {
	      group.$emit("$inject", node, pos);
	      group.parentNode = (pos ==='after' || pos === 'before')? node.parentNode : node;
	    }
	    return group;
	  },

	  // get the last dom in object(for insertion operation)
	  last: function(item){
	    var children = item.children;

	    if(typeof item.last === "function") return item.last();
	    if(typeof item.nodeType === "number") return item;

	    if(children && children.length) return combine.last(children[children.length - 1]);
	    if(item.group) return combine.last(item.group);

	  },

	  destroy: function(item, first){
	    if(!item) return;
	    if(Array.isArray(item)){
	      for(var i = 0, len = item.length; i < len; i++ ){
	        combine.destroy(item[i], first);
	      }
	    }
	    var children = item.children;
	    if(typeof item.destroy === "function") return item.destroy(first);
	    if(typeof item.nodeType === "number" && first)  dom.remove(item);
	    if(children && children.length){
	      combine.destroy(children, true);
	      item.children = null;
	    }
	  }

	}


	// @TODO: need move to dom.js
	dom.element = function( component, all ){
	  if(!component) return !all? null: [];
	  var nodes = combine.node( component );
	  if( nodes.nodeType === 1 ) return all? [nodes]: nodes;
	  var elements = [];
	  for(var i = 0; i<nodes.length ;i++){
	    var node = nodes[i];
	    if( node && node.nodeType === 1){
	      if(!all) return node;
	      elements.push(node);
	    } 
	  }
	  return elements
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	// thanks for angular && mootools for some concise&cross-platform  implemention
	// =====================================

	// The MIT License
	// Copyright (c) 2010-2014 Google, Inc. http://angularjs.org

	// ---
	// license: MIT-style license. http://mootools.net


	var dom = module.exports;
	var env = __webpack_require__(3);
	var _ = __webpack_require__(4);
	var tNode = document.createElement('div')
	var addEvent, removeEvent;
	var noop = function(){}

	var namespaces = {
	  html: "http://www.w3.org/1999/xhtml",
	  svg: "http://www.w3.org/2000/svg"
	}

	dom.body = document.body;

	dom.doc = document;

	// camelCase
	function camelCase(str){
	  return ("" + str).replace(/-\D/g, function(match){
	    return match.charAt(1).toUpperCase();
	  });
	}


	dom.tNode = tNode;

	if(tNode.addEventListener){
	  addEvent = function(node, type, fn) {
	    node.addEventListener(type, fn, false);
	  }
	  removeEvent = function(node, type, fn) {
	    node.removeEventListener(type, fn, false) 
	  }
	}else{
	  addEvent = function(node, type, fn) {
	    node.attachEvent('on' + type, fn);
	  }
	  removeEvent = function(node, type, fn) {
	    node.detachEvent('on' + type, fn); 
	  }
	}


	dom.msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
	if (isNaN(dom.msie)) {
	  dom.msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
	}

	dom.find = function(sl){
	  if(document.querySelector) {
	    try{
	      return document.querySelector(sl);
	    }catch(e){

	    }
	  }
	  if(sl.indexOf('#')!==-1) return document.getElementById( sl.slice(1) );
	}


	dom.inject = function(node, refer, position){

	  position = position || 'bottom';
	  if(!node) return ;
	  if(Array.isArray(node)){
	    var tmp = node;
	    node = dom.fragment();
	    for(var i = 0,len = tmp.length; i < len ;i++){
	      node.appendChild(tmp[i])
	    }
	  }

	  var firstChild, next;
	  switch(position){
	    case 'bottom':
	      refer.appendChild( node );
	      break;
	    case 'top':
	      if( firstChild = refer.firstChild ){
	        refer.insertBefore( node, refer.firstChild );
	      }else{
	        refer.appendChild( node );
	      }
	      break;
	    case 'after':
	      if( next = refer.nextSibling ){
	        next.parentNode.insertBefore( node, next );
	      }else{
	        refer.parentNode.appendChild( node );
	      }
	      break;
	    case 'before':
	      refer.parentNode.insertBefore( node, refer );
	  }
	}


	dom.id = function(id){
	  return document.getElementById(id);
	}

	// createElement 
	dom.create = function(type, ns, attrs){
	  if(ns === 'svg'){
	    if(!env.svg) throw Error('the env need svg support')
	    ns = namespaces.svg;
	  }
	  return !ns? document.createElement(type): document.createElementNS(ns, type);
	}

	// documentFragment
	dom.fragment = function(){
	  return document.createDocumentFragment();
	}



	var specialAttr = {
	  'class': function(node, value){
	    ('className' in node && (node.namespaceURI === namespaces.html || !node.namespaceURI)) ?
	      node.className = (value || '') : node.setAttribute('class', value);
	  },
	  'for': function(node, value){
	    ('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
	  },
	  'style': function(node, value){
	    (node.style) ? node.style.cssText = value : node.setAttribute('style', value);
	  },
	  'value': function(node, value){
	    node.value = (value != null) ? value : '';
	  }
	}


	// attribute Setter & Getter
	dom.attr = function(node, name, value){
	  if (_.isBooleanAttr(name)) {
	    if (typeof value !== 'undefined') {
	      if (!!value) {
	        node[name] = true;
	        node.setAttribute(name, name);
	        // lt ie7 . the javascript checked setting is in valid
	        //http://bytes.com/topic/javascript/insights/799167-browser-quirk-dynamically-appended-checked-checkbox-does-not-appear-checked-ie
	        if(dom.msie && dom.msie <=7 ) node.defaultChecked = true
	      } else {
	        node[name] = false;
	        node.removeAttribute(name);
	      }
	    } else {
	      return (node[name] ||
	               (node.attributes.getNamedItem(name)|| noop).specified) ? name : undefined;
	    }
	  } else if (typeof (value) !== 'undefined') {
	    // if in specialAttr;
	    if(specialAttr[name]) specialAttr[name](node, value);
	    else if(value === null) node.removeAttribute(name)
	    else node.setAttribute(name, value);
	  } else if (node.getAttribute) {
	    // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
	    // some elements (e.g. Document) don't have get attribute, so return undefined
	    var ret = node.getAttribute(name, 2);
	    // normalize non-existing attributes to undefined (as jQuery)
	    return ret === null ? undefined : ret;
	  }
	}


	dom.on = function(node, type, handler){
	  var types = type.split(' ');
	  handler.real = function(ev){
	    var $event = new Event(ev);
	    $event.origin = node;
	    handler.call(node, $event);
	  }
	  types.forEach(function(type){
	    type = fixEventName(node, type);
	    addEvent(node, type, handler.real);
	  });
	}
	dom.off = function(node, type, handler){
	  var types = type.split(' ');
	  handler = handler.real || handler;
	  types.forEach(function(type){
	    type = fixEventName(node, type);
	    removeEvent(node, type, handler);
	  })
	}


	dom.text = (function (){
	  var map = {};
	  if (dom.msie && dom.msie < 9) {
	    map[1] = 'innerText';    
	    map[3] = 'nodeValue';    
	  } else {
	    map[1] = map[3] = 'textContent';
	  }
	  
	  return function (node, value) {
	    var textProp = map[node.nodeType];
	    if (value == null) {
	      return textProp ? node[textProp] : '';
	    }
	    node[textProp] = value;
	  }
	})();


	dom.html = function( node, html ){
	  if(typeof html === "undefined"){
	    return node.innerHTML;
	  }else{
	    node.innerHTML = html;
	  }
	}

	dom.replace = function(node, replaced){
	  if(replaced.parentNode) replaced.parentNode.replaceChild(node, replaced);
	}

	dom.remove = function(node){
	  if(node.parentNode) node.parentNode.removeChild(node);
	}

	// css Settle & Getter from angular
	// =================================
	// it isnt computed style 
	dom.css = function(node, name, value){
	  if( _.typeOf(name) === "object" ){
	    for(var i in name){
	      if( name.hasOwnProperty(i) ){
	        dom.css( node, i, name[i] );
	      }
	    }
	    return;
	  }
	  if ( typeof value !== "undefined" ) {

	    name = camelCase(name);
	    if(name) node.style[name] = value;

	  } else {

	    var val;
	    if (dom.msie <= 8) {
	      // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
	      val = node.currentStyle && node.currentStyle[name];
	      if (val === '') val = 'auto';
	    }
	    val = val || node.style[name];
	    if (dom.msie <= 8) {
	      val = val === '' ? undefined : val;
	    }
	    return  val;
	  }
	}

	dom.addClass = function(node, className){
	  var current = node.className || "";
	  if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
	    node.className = current? ( current + " " + className ) : className;
	  }
	}

	dom.delClass = function(node, className){
	  var current = node.className || "";
	  node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
	}

	dom.hasClass = function(node, className){
	  var current = node.className || "";
	  return (" " + current + " ").indexOf(" " + className + " ") !== -1;
	}



	// simple Event wrap

	//http://stackoverflow.com/questions/11068196/ie8-ie7-onchange-event-is-emited-only-after-repeated-selection
	function fixEventName(elem, name){
	  return (name === 'change'  &&  dom.msie < 9 && 
	      (elem && elem.tagName && elem.tagName.toLowerCase()==='input' && 
	        (elem.type === 'checkbox' || elem.type === 'radio')
	      )
	    )? 'click': name;
	}

	var rMouseEvent = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/
	var doc = document;
	doc = (!doc.compatMode || doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
	function Event(ev){
	  ev = ev || window.event;
	  if(ev._fixed) return ev;
	  this.event = ev;
	  this.target = ev.target || ev.srcElement;

	  var type = this.type = ev.type;
	  var button = this.button = ev.button;

	  // if is mouse event patch pageX
	  if(rMouseEvent.test(type)){ //fix pageX
	    this.pageX = (ev.pageX != null) ? ev.pageX : ev.clientX + doc.scrollLeft;
	    this.pageY = (ev.pageX != null) ? ev.pageY : ev.clientY + doc.scrollTop;
	    if (type === 'mouseover' || type === 'mouseout'){// fix relatedTarget
	      var related = ev.relatedTarget || ev[(type === 'mouseover' ? 'from' : 'to') + 'Element'];
	      while (related && related.nodeType === 3) related = related.parentNode;
	      this.relatedTarget = related;
	    }
	  }
	  // if is mousescroll
	  if (type === 'DOMMouseScroll' || type === 'mousewheel'){
	    // ff ev.detail: 3    other ev.wheelDelta: -120
	    this.wheelDelta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
	  }
	  
	  // fix which
	  this.which = ev.which || ev.keyCode;
	  if( !this.which && button !== undefined){
	    // http://api.jquery.com/event.which/ use which
	    this.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
	  }
	  this._fixed = true;
	}

	_.extend(Event.prototype, {
	  immediateStop: _.isFalse,
	  stop: function(){
	    this.preventDefault().stopPropagation();
	  },
	  preventDefault: function(){
	    if (this.event.preventDefault) this.event.preventDefault();
	    else this.event.returnValue = false;
	    return this;
	  },
	  stopPropagation: function(){
	    if (this.event.stopPropagation) this.event.stopPropagation();
	    else this.event.cancelBubble = true;
	    return this;
	  },
	  stopImmediatePropagation: function(){
	    if(this.event.stopImmediatePropagation) this.event.stopImmediatePropagation();
	  }
	})


	dom.nextFrame = (function(){
	    var request = window.requestAnimationFrame ||
	                  window.webkitRequestAnimationFrame ||
	                  window.mozRequestAnimationFrame|| 
	                  function(callback){
	                    setTimeout(callback, 16)
	                  }

	    var cancel = window.cancelAnimationFrame ||
	                 window.webkitCancelAnimationFrame ||
	                 window.mozCancelAnimationFrame ||
	                 window.webkitCancelRequestAnimationFrame ||
	                 function(tid){
	                    clearTimeout(tid)
	                 }
	  
	  return function(callback){
	    var id = request(callback);
	    return function(){ cancel(id); }
	  }
	})();

	// 3ks for angular's raf  service
	var k;
	dom.nextReflow = dom.msie? function(callback){
	  return dom.nextFrame(function(){
	    k = document.body.offsetWidth;
	    callback();
	  })
	}: dom.nextFrame;





/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var dom  = __webpack_require__(16);
	var animate = {};
	var env = __webpack_require__(3);


	var 
	  transitionEnd = 'transitionend', 
	  animationEnd = 'animationend', 
	  transitionProperty = 'transition', 
	  animationProperty = 'animation';

	if(!('ontransitionend' in window)){
	  if('onwebkittransitionend' in window) {
	    
	    // Chrome/Saf (+ Mobile Saf)/Android
	    transitionEnd += ' webkitTransitionEnd';
	    transitionProperty = 'webkitTransition'
	  } else if('onotransitionend' in dom.tNode || navigator.appName === 'Opera') {

	    // Opera
	    transitionEnd += ' oTransitionEnd';
	    transitionProperty = 'oTransition';
	  }
	}
	if(!('onanimationend' in window)){
	  if ('onwebkitanimationend' in window){
	    // Chrome/Saf (+ Mobile Saf)/Android
	    animationEnd += ' webkitAnimationEnd';
	    animationProperty = 'webkitAnimation';

	  }else if ('onoanimationend' in dom.tNode){
	    // Opera
	    animationEnd += ' oAnimationEnd';
	    animationProperty = 'oAnimation';
	  }
	}

	/**
	 * inject node with animation
	 * @param  {[type]} node      [description]
	 * @param  {[type]} refer     [description]
	 * @param  {[type]} direction [description]
	 * @return {[type]}           [description]
	 */
	animate.inject = function( node, refer ,direction, callback ){
	  callback = callback || _.noop;
	  if( Array.isArray(node) ){
	    var fragment = dom.fragment();
	    var count=0;

	    for(var i = 0,len = node.length;i < len; i++ ){
	      fragment.appendChild(node[i]); 
	    }
	    dom.inject(fragment, refer, direction);

	    // if all nodes is done, we call the callback
	    var enterCallback = function (){
	      count++;
	      if( count === len ) callback();
	    }
	    if(len === count) callback();
	    for( i = 0; i < len; i++ ){
	      if(node[i].onenter){
	        node[i].onenter(enterCallback);
	      }else{
	        enterCallback();
	      }
	    }
	  }else{
	    dom.inject( node, refer, direction );
	    if(node.onenter){
	      node.onenter(callback)
	    }else{
	      callback();
	    }
	  }
	}

	/**
	 * remove node with animation
	 * @param  {[type]}   node     [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	animate.remove = function(node, callback){
	  if(!node) return;
	  var count = 0;
	  function loop(){
	    count++;
	    if(count === len) callback && callback()
	  }
	  if(Array.isArray(node)){
	    for(var i = 0, len = node.length; i < len ; i++){
	      animate.remove(node[i], loop)
	    }
	    return node;
	  }
	  if(node.onleave){
	    node.onleave(function(){
	      removeDone(node, callback)
	    })
	  }else{
	    removeDone(node, callback)
	  }
	}

	var removeDone = function (node, callback){
	    dom.remove(node);
	    callback && callback();
	}



	animate.startClassAnimate = function ( node, className,  callback, mode ){
	  var activeClassName, timeout, tid, onceAnim;
	  if( (!animationEnd && !transitionEnd) || env.isRunning ){
	    return callback();
	  }

	  if(mode !== 4){
	    onceAnim = _.once(function onAnimateEnd(){
	      if(tid) clearTimeout(tid);

	      if(mode === 2) {
	        dom.delClass(node, activeClassName);
	      }
	      if(mode !== 3){ // mode hold the class
	        dom.delClass(node, className);
	      }
	      dom.off(node, animationEnd, onceAnim)
	      dom.off(node, transitionEnd, onceAnim)

	      callback();

	    });
	  }else{
	    onceAnim = _.once(function onAnimateEnd(){
	      if(tid) clearTimeout(tid);
	      callback();
	    });
	  }
	  if(mode === 2){ // auto removed
	    dom.addClass( node, className );

	    activeClassName = className.split(/\s+/).map(function(name){
	       return name + '-active';
	    }).join(" ");

	    dom.nextReflow(function(){
	      dom.addClass( node, activeClassName );
	      timeout = getMaxTimeout( node );
	      tid = setTimeout( onceAnim, timeout );
	    });

	  }else if(mode===4){
	    dom.nextReflow(function(){
	      dom.delClass( node, className );
	      timeout = getMaxTimeout( node );
	      tid = setTimeout( onceAnim, timeout );
	    });

	  }else{
	    dom.nextReflow(function(){
	      dom.addClass( node, className );
	      timeout = getMaxTimeout( node );
	      tid = setTimeout( onceAnim, timeout );
	    });
	  }



	  dom.on( node, animationEnd, onceAnim )
	  dom.on( node, transitionEnd, onceAnim )
	  return onceAnim;
	}


	animate.startStyleAnimate = function(node, styles, callback){
	  var timeout, onceAnim, tid;

	  dom.nextReflow(function(){
	    dom.css( node, styles );
	    timeout = getMaxTimeout( node );
	    tid = setTimeout( onceAnim, timeout );
	  });


	  onceAnim = _.once(function onAnimateEnd(){
	    if(tid) clearTimeout(tid);

	    dom.off(node, animationEnd, onceAnim)
	    dom.off(node, transitionEnd, onceAnim)

	    callback();

	  });

	  dom.on( node, animationEnd, onceAnim )
	  dom.on( node, transitionEnd, onceAnim )

	  return onceAnim;
	}


	/**
	 * get maxtimeout
	 * @param  {Node} node 
	 * @return {[type]}   [description]
	 */
	function getMaxTimeout(node){
	  var timeout = 0,
	    tDuration = 0,
	    tDelay = 0,
	    aDuration = 0,
	    aDelay = 0,
	    ratio = 5 / 3,
	    styles ;

	  if(window.getComputedStyle){

	    styles = window.getComputedStyle(node),
	    tDuration = getMaxTime( styles[transitionProperty + 'Duration']) || tDuration;
	    tDelay = getMaxTime( styles[transitionProperty + 'Delay']) || tDelay;
	    aDuration = getMaxTime( styles[animationProperty + 'Duration']) || aDuration;
	    aDelay = getMaxTime( styles[animationProperty + 'Delay']) || aDelay;
	    timeout = Math.max( tDuration+tDelay, aDuration + aDelay );

	  }
	  return timeout * 1000 * ratio;
	}

	function getMaxTime(str){

	  var maxTimeout = 0, time;

	  if(!str) return 0;

	  str.split(",").forEach(function(str){

	    time = parseFloat(str);
	    if( time > maxTimeout ) maxTimeout = time;

	  });

	  return maxTimeout;
	}

	module.exports = animate;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var diffArray = __webpack_require__(19);
	var combine = __webpack_require__(15);
	var animate = __webpack_require__(17);
	var node = __webpack_require__(13);
	var Group = __webpack_require__(20);
	var dom = __webpack_require__(16);
	var _ = __webpack_require__(4);


	var walkers = module.exports = {};

	walkers.list = function(ast, options){

	  var Regular = walkers.Regular;  
	  var placeholder = document.createComment("Regular list"),
	    namespace = options.namespace,
	    extra = options.extra;
	  var self = this;
	  var group = new Group([placeholder]);
	  var indexName = ast.variable + '_index';
	  var variable = ast.variable;
	  var alternate = ast.alternate;
	  var track = ast.track, keyOf, extraObj;
	  if( track && track !== true ){
	    track = this._touchExpr(track);
	    extraObj = _.createObject(extra);
	    keyOf = function( item, index ){
	      extraObj[ variable ] = item;
	      extraObj[ indexName ] = index;
	      return track.get( self, extraObj );
	    }
	  }
	  function removeRange(index, rlen){
	    for(var j = 0; j< rlen; j++){ //removed
	      var removed = group.children.splice( index + 1, 1)[0];
	      if(removed) removed.destroy(true);
	    }
	  }
	  function addRange(index, end, newValue){
	    for(var o = index; o < end; o++){ //add
	      // prototype inherit
	      var item = newValue[o];
	      var data = {};
	      data[indexName] = o;
	      data[variable] = item;

	      data = _.createObject(extra, data);
	      var section = self.$compile(ast.body, {
	        extra: data,
	        namespace:namespace,
	        record: true,
	        outer: options.outer
	      })
	      section.data = data;
	      // autolink
	      var insert =  combine.last(group.get(o));
	      if(insert.parentNode){
	        animate.inject(combine.node(section),insert, 'after');
	      }
	      // insert.parentNode.insertBefore(combine.node(section), insert.nextSibling);
	      group.children.splice( o + 1 , 0, section);
	    }
	  }

	  function updateRange(start, end, newValue){
	    for(var k = start; k < end; k++){ // no change
	      var sect = group.get( k + 1 );
	      sect.data[ indexName ] = k;
	      sect.data[ variable ] = newValue[k];
	    }
	  }

	  function updateLD(newValue, oldValue, splices){
	    if(!oldValue) oldValue = [];
	    if(!newValue) newValue = [];


	    var cur = placeholder;
	    var m = 0, len = newValue.length;

	    if(!splices && (len !==0 || oldValue.length !==0)  ){
	      splices = diffArray(newValue, oldValue);
	    }

	    if(!splices || !splices.length) return;
	      
	    for(var i = 0; i < splices.length; i++){ //init
	      var splice = splices[i];
	      var index = splice.index; // beacuse we use a comment for placeholder
	      var removed = splice.removed;
	      var add = splice.add;
	      var rlen = removed.length;
	      // for track
	      if( track && rlen && add ){
	        var minar = Math.min(rlen, add);
	        var tIndex = 0;
	        while(tIndex < minar){
	          if( keyOf(newValue[index], index) !== keyOf( removed[0], index ) ){
	            removeRange(index, 1)
	            addRange(index, index+1, newValue)
	          }
	          removed.shift();
	          add--;
	          index++;
	          tIndex++;
	        }
	        rlen = removed.length;
	      }
	      // update
	      updateRange(m, index, newValue);
	      removeRange( index ,rlen)

	      addRange(index, index+add, newValue)

	      m = index + add - rlen;
	      m  = m < 0? 0 : m;

	    }
	    if(m < len){
	      for(var i = m; i < len; i++){
	        var pair = group.get(i + 1);
	        pair.data[indexName] = i;
	      }
	    }
	  }

	  // if the track is constant test.
	  function updateSimple(newValue, oldValue){
	    newValue = newValue || [];
	    oldValue  = oldValue || [];

	    var nlen = newValue.length || 0;
	    var olen = oldValue.length || 0;
	    var mlen = Math.min(nlen, olen);


	    updateRange(0, mlen, newValue)
	    if(nlen < olen){ //need add
	      removeRange(nlen, olen-nlen);
	    }else if(nlen > olen){
	      addRange(olen, nlen, newValue);
	    }
	  }

	  function update(newValue, oldValue, splices){
	    var nlen = newValue && newValue.length;
	    var olen = oldValue && oldValue.length;
	    if( !olen && nlen && group.get(1)){
	      var altGroup = group.children.pop();
	      if(altGroup.destroy)  altGroup.destroy(true);
	    }

	    if(track === true){
	      updateSimple(newValue, oldValue, splices)
	    }else{
	      updateLD(newValue, oldValue, splices)
	    }

	    // @ {#list} {#else}
	    if( !nlen && alternate && alternate.length){
	      var section = self.$compile(alternate, {
	        extra: extra,
	        record: true,
	        outer: options.outer,
	        namespace: namespace
	      })
	      group.children.push(section);
	      if(placeholder.parentNode){
	        animate.inject(combine.node(section), placeholder, 'after');
	      }
	    }
	  }
	  this.$watch(ast.sequence, update, { init: true, indexTrack: track === true });
	  return group;
	}
	// {#include } or {#inc template}
	walkers.template = function(ast, options){
	  var content = ast.content, compiled;
	  var placeholder = document.createComment('inlcude');
	  var compiled, namespace = options.namespace, extra = options.extra;
	  var group = new Group([placeholder]);
	  if(content){
	    var self = this;
	    this.$watch(content, function(value){
	      var removed = group.get(1), type= typeof value;
	      if( removed){
	        removed.destroy(true); 
	        group.children.pop();
	      }
	      if(!value) return;
	      group.push( compiled = (typeof value === 'function') ? value(): self.$compile(value, {record: true, outer: options.outer,namespace: namespace, extra: extra}) ); 
	      if(placeholder.parentNode) {
	        compiled.$inject(placeholder, 'before')
	      }
	    }, {
	      init: true
	    });
	  }
	  return group;
	};


	// how to resolve this problem
	var ii = 0;
	walkers['if'] = function(ast, options){
	  var self = this, consequent, alternate, extra = options.extra;
	  if(options && options.element){ // attribute inteplation
	    var update = function(nvalue){
	      if(!!nvalue){
	        if(alternate) combine.destroy(alternate)
	        if(ast.consequent) consequent = self.$compile(ast.consequent, {record: true, element: options.element , extra:extra});
	      }else{
	        if(consequent) combine.destroy(consequent)
	        if(ast.alternate) alternate = self.$compile(ast.alternate, {record: true, element: options.element, extra: extra});
	      }
	    }
	    this.$watch(ast.test, update, { force: true });
	    return {
	      destroy: function(){
	        if(consequent) combine.destroy(consequent);
	        else if(alternate) combine.destroy(alternate);
	      }
	    }
	  }

	  var test, consequent, alternate, node;
	  var placeholder = document.createComment("Regular if" + ii++);
	  var group = new Group();
	  group.push(placeholder);
	  var preValue = null, namespace= options.namespace;


	  var update = function (nvalue, old){
	    var value = !!nvalue;
	    if(value === preValue) return;
	    preValue = value;
	    if(group.children[1]){
	      group.children[1].destroy(true);
	      group.children.pop();
	    }
	    if(value){ //true
	      if(ast.consequent && ast.consequent.length){
	        consequent = self.$compile( ast.consequent , {record:true, outer: options.outer,namespace: namespace, extra:extra })
	        // placeholder.parentNode && placeholder.parentNode.insertBefore( node, placeholder );
	        group.push(consequent);
	        if(placeholder.parentNode){
	          animate.inject(combine.node(consequent), placeholder, 'before');
	        }
	      }
	    }else{ //false
	      if(ast.alternate && ast.alternate.length){
	        alternate = self.$compile(ast.alternate, {record:true, outer: options.outer,namespace: namespace, extra:extra});
	        group.push(alternate);
	        if(placeholder.parentNode){
	          animate.inject(combine.node(alternate), placeholder, 'before');
	        }
	      }
	    }
	  }
	  this.$watch(ast.test, update, {force: true, init: true});

	  return group;
	}


	walkers.expression = function(ast, options){
	  var node = document.createTextNode("");
	  this.$watch(ast, function(newval){
	    dom.text(node, "" + (newval == null? "": "" + newval) );
	  })
	  return node;
	}
	walkers.text = function(ast, options){
	  var node = document.createTextNode(_.convertEntity(ast.text));
	  return node;
	}



	var eventReg = /^on-(.+)$/

	/**
	 * walkers element (contains component)
	 */
	walkers.element = function(ast, options){
	  var attrs = ast.attrs, self = this,
	    Constructor = this.constructor,
	    children = ast.children,
	    namespace = options.namespace, 
	    extra = options.extra,
	    tag = ast.tag,
	    Component = Constructor.component(tag),
	    ref, group, element;

	  if( tag === 'r-content' ){
	    _.log('r-content is deprecated, use {#inc this.$body} instead (`{#include}` as same)', 'warn');
	    return this.$body && this.$body();
	  } 

	  if(Component || tag === 'r-component'){
	    options.Component = Component;
	    return walkers.component.call(this, ast, options)
	  }

	  if(tag === 'svg') namespace = "svg";
	  // @Deprecated: may be removed in next version, use {#inc } instead
	  
	  if( children && children.length ){
	    group = this.$compile(children, {outer: options.outer,namespace: namespace, extra: extra });
	  }

	  element = dom.create(tag, namespace, attrs);

	  if(group && !_.isVoidTag(tag)){
	    dom.inject( combine.node(group) , element)
	  }

	  // sort before
	  if(!ast.touched){
	    attrs.sort(function(a1, a2){
	      var d1 = Constructor.directive(a1.name),
	        d2 = Constructor.directive(a2.name);
	      if( d1 && d2 ) return (d2.priority || 1) - (d1.priority || 1);
	      if(d1) return 1;
	      if(d2) return -1;
	      if(a2.name === "type") return 1;
	      return -1;
	    })
	    ast.touched = true;
	  }
	  // may distinct with if else
	  var destroies = walkAttributes.call(this, attrs, element, extra);

	  return {
	    type: "element",
	    group: group,
	    node: function(){
	      return element;
	    },
	    last: function(){
	      return element;
	    },
	    destroy: function(first){
	      if( first ){
	        animate.remove( element, group? group.destroy.bind( group ): _.noop );
	      }else if(group) {
	        group.destroy();
	      }
	      // destroy ref
	      if( destroies.length ) {
	        destroies.forEach(function( destroy ){
	          if( destroy ){
	            if( typeof destroy.destroy === 'function' ){
	              destroy.destroy()
	            }else{
	              destroy();
	            }
	          }
	        })
	      }
	    }
	  }
	}

	walkers.component = function(ast, options){
	  var attrs = ast.attrs, 
	    Component = options.Component,
	    Constructor = this.constructor,
	    isolate, 
	    extra = options.extra,
	    namespace = options.namespace,
	    ref, self = this, is;

	  var data = {}, events;

	  for(var i = 0, len = attrs.length; i < len; i++){
	    var attr = attrs[i];
	    // consider disabled   equlasto  disabled={true}
	    var value = this._touchExpr(attr.value === undefined? true: attr.value);
	    if(value.constant) value = attr.value = value.get(this);
	    if(attr.value && attr.value.constant === true){
	      value = value.get(this);
	    }
	    var name = attr.name;
	    if(!attr.event){
	      var etest = name.match(eventReg);
	      // event: 'nav'
	      if(etest) attr.event = etest[1];
	    }

	    // @compile modifier
	    if(attr.mdf === 'cmpl'){
	      value = _.getCompileFn(value, this, {
	        record: true, 
	        namespace:namespace, 
	        extra: extra, 
	        outer: options.outer
	      })
	    }
	    
	    // @if is r-component . we need to find the target Component
	    if(name === 'is' && !Component){
	      is = value;
	      var componentName = this.$get(value, true);
	      Component = Constructor.component(componentName)
	      if(typeof Component !== 'function') throw new Error("component " + componentName + " has not registed!");
	    }
	    // bind event proxy
	    var eventName;
	    if(eventName = attr.event){
	      events = events || {};
	      events[eventName] = _.handleEvent.call(this, value, eventName);
	      continue;
	    }else {
	      name = attr.name = _.camelCase(name);
	    }

	    if(value.type !== 'expression'){
	      data[name] = value;
	    }else{
	      data[name] = value.get(self); 
	    }
	    if( name === 'ref'  && value != null){
	      ref = value
	    }
	    if( name === 'isolate'){
	      // 1: stop: composite -> parent
	      // 2. stop: composite <- parent
	      // 3. stop 1 and 2: composite <-> parent
	      // 0. stop nothing (defualt)
	      isolate = value.type === 'expression'? value.get(self): parseInt(value === true? 3: value, 10);
	      data.isolate = isolate;
	    }
	  }

	  var definition = { 
	    data: data, 
	    events: events, 
	    $parent: (isolate & 2)? null: this,
	    $root: this.$root,
	    $outer: options.outer,
	    _body: ast.children
	  }
	  var options = {
	    namespace: namespace, 
	    extra: options.extra
	  }


	  var component = new Component(definition, options), reflink;


	  if(ref && this.$refs){
	    reflink = Component.directive('ref').link
	    this.$on('$destroy', reflink.call(this, component, ref) )
	  }
	  if(ref &&  self.$refs) self.$refs[ref] = component;
	  for(var i = 0, len = attrs.length; i < len; i++){
	    var attr = attrs[i];
	    var value = attr.value||true;
	    var name = attr.name;
	    // need compiled
	    if(value.type === 'expression' && !attr.event){
	      value = self._touchExpr(value);
	      // use bit operate to control scope
	      if( !(isolate & 2) ) 
	        this.$watch(value, (function(name, val){
	          this.data[name] = val;
	        }).bind(component, name))
	      if( value.set && !(isolate & 1 ) ) 
	        // sync the data. it force the component don't trigger attr.name's first dirty echeck
	        component.$watch(name, self.$update.bind(self, value), {sync: true});
	    }
	  }
	  if(is && is.type === 'expression'  ){
	    var group = new Group();
	    group.push(component);
	    this.$watch(is, function(value){
	      // found the new component
	      var Component = Constructor.component(value);
	      if(!Component) throw new Error("component " + value + " has not registed!");
	      var ncomponent = new Component(definition);
	      var component = group.children.pop();
	      group.push(ncomponent);
	      ncomponent.$inject(combine.last(component), 'after')
	      component.destroy();
	      // @TODO  if component changed , we need update ref
	      if(ref){
	        self.$refs[ref] = ncomponent;
	      }
	    }, {sync: true})
	    return group;
	  }
	  return component;
	}

	function walkAttributes(attrs, element, extra){
	  var bindings = []
	  for(var i = 0, len = attrs.length; i < len; i++){
	    var binding = this._walk(attrs[i], {element: element, fromElement: true, attrs: attrs, extra: extra})
	    if(binding) bindings.push(binding);
	  }
	  return bindings;
	}

	walkers.attribute = function(ast ,options){

	  var attr = ast;
	  var name = attr.name;
	  var value = attr.value || "";
	  var constant = value.constant;
	  var Component = this.constructor;
	  var directive = Component.directive(name);
	  var element = options.element;
	  var self = this;


	  value = this._touchExpr(value);

	  if(constant) value = value.get(this);

	  if(directive && directive.link){
	    var binding = directive.link.call(self, element, value, name, options.attrs);
	    if(typeof binding === 'function') binding = {destroy: binding}; 
	    return binding;
	  } else{
	    if(value.type === 'expression' ){
	      this.$watch(value, function(nvalue, old){
	        dom.attr(element, name, nvalue);
	      }, {init: true});
	    }else{
	      if(_.isBooleanAttr(name)){
	        dom.attr(element, name, true);
	      }else{
	        dom.attr(element, name, value);
	      }
	    }
	    if(!options.fromElement){
	      return {
	        destroy: function(){
	          dom.attr(element, name, null);
	        }
	      }
	    }
	  }

	}



/***/ },
/* 19 */
/***/ function(module, exports) {

	
	function simpleDiff(now, old){
	  var nlen = now.length;
	  var olen = old.length;
	  if(nlen !== olen){
	    return true;
	  }
	  for(var i = 0; i < nlen ; i++){
	    if(now[i] !== old[i]) return  true;
	  }
	  return false

	}

	function equals(a,b){
	  return a === b;
	}
	function ld(array1, array2){
	  var n = array1.length;
	  var m = array2.length;
	  var matrix = [];
	  for(var i = 0; i <= n; i++){
	    matrix.push([i]);
	  }
	  for(var j=1;j<=m;j++){
	    matrix[0][j]=j;
	  }
	  for(var i = 1; i <= n; i++){
	    for(var j = 1; j <= m; j++){
	      if(equals(array1[i-1], array2[j-1])){
	        matrix[i][j] = matrix[i-1][j-1];
	      }else{
	        matrix[i][j] = Math.min(
	          matrix[i-1][j]+1, //delete
	          matrix[i][j-1]+1//add
	          )
	      }
	    }
	  }
	  return matrix;
	}
	function whole(arr2, arr1, indexTrack) {
	  if(indexTrack) return simpleDiff(arr2, arr1);
	  var matrix = ld(arr1, arr2)
	  var n = arr1.length;
	  var i = n;
	  var m = arr2.length;
	  var j = m;
	  var edits = [];
	  var current = matrix[i][j];
	  while(i>0 || j>0){
	  // the last line
	    if (i === 0) {
	      edits.unshift(3);
	      j--;
	      continue;
	    }
	    // the last col
	    if (j === 0) {
	      edits.unshift(2);
	      i--;
	      continue;
	    }
	    var northWest = matrix[i - 1][j - 1];
	    var west = matrix[i - 1][j];
	    var north = matrix[i][j - 1];

	    var min = Math.min(north, west, northWest);

	    if (min === west) {
	      edits.unshift(2); //delete
	      i--;
	      current = west;
	    } else if (min === northWest ) {
	      if (northWest === current) {
	        edits.unshift(0); //no change
	      } else {
	        edits.unshift(1); //update
	        current = northWest;
	      }
	      i--;
	      j--;
	    } else {
	      edits.unshift(3); //add
	      j--;
	      current = north;
	    }
	  }
	  var LEAVE = 0;
	  var ADD = 3;
	  var DELELE = 2;
	  var UPDATE = 1;
	  var n = 0;m=0;
	  var steps = [];
	  var step = {index: null, add:0, removed:[]};

	  for(var i=0;i<edits.length;i++){
	    if(edits[i] > 0 ){ // NOT LEAVE
	      if(step.index === null){
	        step.index = m;
	      }
	    } else { //LEAVE
	      if(step.index != null){
	        steps.push(step)
	        step = {index: null, add:0, removed:[]};
	      }
	    }
	    switch(edits[i]){
	      case LEAVE:
	        n++;
	        m++;
	        break;
	      case ADD:
	        step.add++;
	        m++;
	        break;
	      case DELELE:
	        step.removed.push(arr1[n])
	        n++;
	        break;
	      case UPDATE:
	        step.add++;
	        step.removed.push(arr1[n])
	        n++;
	        m++;
	        break;
	    }
	  }
	  if(step.index != null){
	    steps.push(step)
	  }
	  return steps
	}
	module.exports = whole;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var combine = __webpack_require__(15)

	function Group(list){
	  this.children = list || [];
	}


	var o = _.extend(Group.prototype, {
	  destroy: function(first){
	    combine.destroy(this.children, first);
	    if(this.ondestroy) this.ondestroy();
	    this.children = null;
	  },
	  get: function(i){
	    return this.children[i]
	  },
	  push: function(item){
	    this.children.push( item );
	  }
	})
	o.inject = o.$inject = combine.inject



	module.exports = Group;




/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// simplest event emitter 60 lines
	// ===============================
	var slice = [].slice, _ = __webpack_require__(4);
	var API = {
	  $on: function(event, fn) {
	    if(typeof event === "object"){
	      for (var i in event) {
	        this.$on(i, event[i]);
	      }
	    }else{
	      // @patch: for list
	      var context = this;
	      var handles = context._handles || (context._handles = {}),
	        calls = handles[event] || (handles[event] = []);
	      calls.push(fn);
	    }
	    return this;
	  },
	  $off: function(event, fn) {
	    var context = this;
	    if(!context._handles) return;
	    if(!event) this._handles = {};
	    var handles = context._handles,
	      calls;

	    if (calls = handles[event]) {
	      if (!fn) {
	        handles[event] = [];
	        return context;
	      }
	      for (var i = 0, len = calls.length; i < len; i++) {
	        if (fn === calls[i]) {
	          calls.splice(i, 1);
	          return context;
	        }
	      }
	    }
	    return context;
	  },
	  // bubble event
	  $emit: function(event){
	    // @patch: for list
	    var context = this;
	    var handles = context._handles, calls, args, type;
	    if(!event) return;
	    var args = slice.call(arguments, 1);
	    var type = event;

	    if(!handles) return context;
	    if(calls = handles[type.slice(1)]){
	      for (var j = 0, len = calls.length; j < len; j++) {
	        calls[j].apply(context, args)
	      }
	    }
	    if (!(calls = handles[type])) return context;
	    for (var i = 0, len = calls.length; i < len; i++) {
	      calls[i].apply(context, args)
	    }
	    // if(calls.length) context.$update();
	    return context;
	  },
	  // capture  event
	  $one: function(){
	    
	}
	}
	// container class
	function Event() {}
	_.extend(Event.prototype, API)

	Event.mixTo = function(obj){
	  obj = typeof obj === "function" ? obj.prototype : obj;
	  _.extend(obj, API)
	}
	module.exports = Event;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var parseExpression = __webpack_require__(23).expression;
	var diffArray = __webpack_require__(19);

	function Watcher(){}

	var methods = {
	  $watch: function(expr, fn, options){
	    var get, once, test, rlen, extra = this.__ext__; //records length
	    if(!this._watchers) this._watchers = [];

	    options = options || {};
	    if(options === true){
	       options = { deep: true }
	    }
	    var uid = _.uid('w_');
	    if(Array.isArray(expr)){
	      var tests = [];
	      for(var i = 0,len = expr.length; i < len; i++){
	          tests.push(this.$expression(expr[i]).get)
	      }
	      var prev = [];
	      test = function(context){
	        var equal = true;
	        for(var i =0, len = tests.length; i < len; i++){
	          var splice = tests[i](context, extra);
	          if(!_.equals(splice, prev[i])){
	             equal = false;
	             prev[i] = _.clone(splice);
	          }
	        }
	        return equal? false: prev;
	      }
	    }else{
	      if(typeof expr === 'function'){
	        get = expr.bind(this);      
	      }else{
	        expr = this._touchExpr( parseExpression(expr) );
	        get = expr.get;
	        once = expr.once;
	      }
	    }

	    var watcher = {
	      id: uid, 
	      get: get, 
	      fn: fn, 
	      once: once, 
	      force: options.force,
	      // don't use ld to resolve array diff
	      notld: options.indexTrack,
	      test: test,
	      deep: options.deep,
	      last: options.sync? get(this): options.last
	    }
	    
	    this._watchers.push( watcher );

	    rlen = this._records && this._records.length;
	    if(rlen) this._records[rlen-1].push(uid)
	    // init state.
	    if(options.init === true){
	      var prephase = this.$phase;
	      this.$phase = 'digest';
	      this._checkSingleWatch( watcher, this._watchers.length-1 );
	      this.$phase = prephase;
	    }
	    return watcher;
	  },
	  $unwatch: function(uid){
	    uid = uid.uid || uid;
	    if(!this._watchers) this._watchers = [];
	    if(Array.isArray(uid)){
	      for(var i =0, len = uid.length; i < len; i++){
	        this.$unwatch(uid[i]);
	      }
	    }else{
	      var watchers = this._watchers, watcher, wlen;
	      if(!uid || !watchers || !(wlen = watchers.length)) return;
	      for(;wlen--;){
	        watcher = watchers[wlen];
	        if(watcher && watcher.id === uid ){
	          watchers.splice(wlen, 1);
	        }
	      }
	    }
	  },
	  $expression: function(value){
	    return this._touchExpr(parseExpression(value))
	  },
	  /**
	   * the whole digest loop ,just like angular, it just a dirty-check loop;
	   * @param  {String} path  now regular process a pure dirty-check loop, but in parse phase, 
	   *                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
	   * @return {Void}   
	   */

	  $digest: function(){
	    if(this.$phase === 'digest' || this._mute) return;
	    this.$phase = 'digest';
	    var dirty = false, n =0;
	    while(dirty = this._digest()){

	      if((++n) > 20){ // max loop
	        throw Error('there may a circular dependencies reaches')
	      }
	    }
	    if( n > 0 && this.$emit) this.$emit("$update");
	    this.$phase = null;
	  },
	  // private digest logic
	  _digest: function(){

	    var watchers = this._watchers;
	    var dirty = false, children, watcher, watcherDirty;
	    if(watchers && watchers.length){
	      for(var i = 0, len = watchers.length;i < len; i++){
	        watcher = watchers[i];
	        watcherDirty = this._checkSingleWatch(watcher, i);
	        if(watcherDirty) dirty = true;
	      }
	    }
	    // check children's dirty.
	    children = this._children;
	    if(children && children.length){
	      for(var m = 0, mlen = children.length; m < mlen; m++){
	        var child = children[m];
	        
	        if(child && child._digest()) dirty = true;
	      }
	    }
	    return dirty;
	  },
	  // check a single one watcher 
	  _checkSingleWatch: function(watcher, i){
	    var dirty = false;
	    if(!watcher) return;

	    var now, last, tlast, tnow,  eq, diff;

	    if(!watcher.test){

	      now = watcher.get(this);
	      last = watcher.last;
	      tlast = _.typeOf(last);
	      tnow = _.typeOf(now);
	      eq = true, diff;

	      // !Object
	      if( !(tnow === 'object' && tlast==='object' && watcher.deep) ){
	        // Array
	        if( tnow === 'array' && ( tlast=='undefined' || tlast === 'array') ){
	          diff = diffArray(now, watcher.last || [], watcher.notld)
	          if( tlast !== 'array' || diff === true || diff.length ) dirty = true;
	        }else{
	          eq = _.equals( now, last );
	          if( !eq || watcher.force ){
	            watcher.force = null;
	            dirty = true; 
	          }
	        }
	      }else{
	        for(var j in now){
	          if(last[j] !== now[j]){
	            dirty = true;
	            break;
	          }
	        }
	        if(dirty !== true){
	          for(var n in last){
	            if(last[n] !== now[n]){
	              dirty = true;
	              break;
	            }
	          }
	        }
	      }
	    } else{
	      // @TODO 是否把多重改掉
	      var result = watcher.test(this);
	      if(result){
	        dirty = true;
	        watcher.fn.apply(this, result)
	      }
	    }
	    if(dirty && !watcher.test){
	      if(tnow === 'object' && watcher.deep || tnow === 'array'){
	        watcher.last = _.clone(now);
	      }else{
	        watcher.last = now;
	      }
	      watcher.fn.call(this, now, last, diff)
	      if(watcher.once) this._watchers.splice(i, 1);
	    }

	    return dirty;
	  },

	  /**
	   * **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
	   * 
	   * @param  {Function|String|Expression} path  
	   * @param  {Whatever} value optional, when path is Function, the value is ignored
	   * @return {this}     this 
	   */
	  $set: function(path, value){
	    if(path != null){
	      var type = _.typeOf(path);
	      if( type === 'string' || path.type === 'expression' ){
	        path = this.$expression(path);
	        path.set(this, value);
	      }else if(type === 'function'){
	        path.call(this, this.data);
	      }else{
	        for(var i in path) {
	          this.$set(i, path[i])
	        }
	      }
	    }
	  },
	  // 1. expr canbe string or a Expression
	  // 2. detect: if true, if expr is a string will directly return;
	  $get: function(expr, detect)  {
	    if(detect && typeof expr === 'string') return expr;
	    return this.$expression(expr).get(this);
	  },
	  $update: function(){
	    this.$set.apply(this, arguments);
	    var rootParent = this;

	    do{
	      if(rootParent.data.isolate || !rootParent.$parent) break;
	      rootParent = rootParent.$parent;
	    } while(rootParent)

	    rootParent.$digest();
	  },
	  // auto collect watchers for logic-control.
	  _record: function(){
	    if(!this._records) this._records = [];
	    this._records.push([]);
	  },
	  _release: function(){
	    return this._records.pop();
	  }
	}


	_.extend(Watcher.prototype, methods)


	Watcher.mixTo = function(obj){
	  obj = typeof obj === "function" ? obj.prototype : obj;
	  return _.extend(obj, methods)
	}

	module.exports = Watcher;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var exprCache = __webpack_require__(3).exprCache;
	var _ = __webpack_require__(4);
	var Parser = __webpack_require__(12);
	module.exports = {
	  expression: function(expr, simple){
	    // @TODO cache
	    if( typeof expr === 'string' && ( expr = expr.trim() ) ){
	      expr = exprCache.get( expr ) || exprCache.set( expr, new Parser( expr, { mode: 2, expression: true } ).expression() )
	    }
	    if(expr) return expr;
	  },
	  parse: function(template){
	    return new Parser(template).parse();
	  }
	}



/***/ },
/* 24 */
/***/ function(module, exports) {

	
	var f = module.exports = {};

	// json:  two way 
	//  - get: JSON.stringify
	//  - set: JSON.parse
	//  - example: `{ title|json }`
	f.json = {
	  get: function( value ){
	    return typeof JSON !== 'undefined'? JSON.stringify(value): value;
	  },
	  set: function( value ){
	    return typeof JSON !== 'undefined'? JSON.parse(value) : value;
	  }
	}

	// last: one-way
	//  - get: return the last item in list
	//  - example: `{ list|last }`
	f.last = function(arr){
	  return arr && arr[arr.length - 1];
	}

	// average: one-way
	//  - get: copute the average of the list
	//  - example: `{ list| average: "score" }`
	f.average = function(array, key){
	  array = array || [];
	  return array.length? f.total(array, key)/ array.length : 0;
	}


	// total: one-way
	//  - get: copute the total of the list
	//  - example: `{ list| average: "score" }`
	f.total = function(array, key){
	  var total = 0;
	  if(!array) return;
	  array.forEach(function( item ){
	    total += key? item[key] : item;
	  })
	  return total;
	}

	// var basicSortFn = function(a, b){return b - a}

	// f.sort = function(array, key, reverse){
	//   var type = typeof key, sortFn; 
	//   switch(type){
	//     case 'function': sortFn = key; break;
	//     case 'string': sortFn = function(a, b){};break;
	//     default:
	//       sortFn = basicSortFn;
	//   }
	//   // need other refernce.
	//   return array.slice().sort(function(a,b){
	//     return reverse? -sortFn(a, b): sortFn(a, b);
	//   })
	//   return array
	// }




/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Regular
	var _ = __webpack_require__(4);
	var dom = __webpack_require__(16);
	var animate = __webpack_require__(17);
	var Regular = __webpack_require__(10);
	var consts = __webpack_require__(26);



	__webpack_require__(27);
	__webpack_require__(28);


	module.exports = {
	// **warn**: class inteplation will override this directive 
	  'r-class': function(elem, value){
	    if(typeof value=== 'string'){
	      value = _.fixObjStr(value)
	    }
	    this.$watch(value, function(nvalue){
	      var className = ' '+ elem.className.replace(/\s+/g, ' ') +' ';
	      for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
	        className = className.replace(' ' + i + ' ',' ');
	        if(nvalue[i] === true){
	          className += i+' ';
	        }
	      }
	      elem.className = className.trim();
	    },true);
	  },
	  // **warn**: style inteplation will override this directive 
	  'r-style': function(elem, value){
	    if(typeof value=== 'string'){
	      value = _.fixObjStr(value)
	    }
	    this.$watch(value, function(nvalue){
	      for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
	        dom.css(elem, i, nvalue[i]);
	      }
	    },true);
	  },
	  // when expression is evaluate to true, the elem will add display:none
	  // Example: <div r-hide={{items.length > 0}}></div>
	  'r-hide': function(elem, value){
	    var preBool = null, compelete;
	    this.$watch(value, function(nvalue){
	      var bool = !!nvalue;
	      if(bool === preBool) return; 
	      preBool = bool;
	      if(bool){
	        if(elem.onleave){
	          compelete = elem.onleave(function(){
	            elem.style.display = "none"
	            compelete = null;
	          })
	        }else{
	          elem.style.display = "none"
	        }
	        
	      }else{
	        if(compelete) compelete();
	        elem.style.display = "";
	        if(elem.onenter){
	          elem.onenter();
	        }
	      }
	    });
	  },
	  'r-html': function(elem, value){
	    this.$watch(value, function(nvalue){
	      nvalue = nvalue || "";
	      dom.html(elem, nvalue)
	    }, {force: true});
	  },
	  'ref': {
	    accept: consts.COMPONENT_TYPE + consts.ELEMENT_TYPE,
	    link: function( elem, value ){
	      var refs = this.$refs || (this.$refs = {});
	      var cval;
	      if(_.isExpr(value)){
	        this.$watch(value, function(nval, oval){
	          cval = nval;
	          if(refs[oval] === elem) refs[oval] = null;
	          if(cval) refs[cval] = elem;
	        })
	      }else{
	        refs[cval = value] = elem;
	      }
	      return function(){
	        refs[cval] = null;
	      }
	    }
	  }
	}

	Regular.directive(module.exports);












/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = {
	  'COMPONENT_TYPE': 1,
	  'ELEMENT_TYPE': 2
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * event directive  bundle
	 *
	 */
	var _ = __webpack_require__(4);
	var dom = __webpack_require__(16);
	var Regular = __webpack_require__(10);

	Regular._addProtoInheritCache("event");

	Regular.directive( /^on-\w+$/, function( elem, value, name , attrs) {
	  if ( !name || !value ) return;
	  var type = name.split("-")[1];
	  return this._handleEvent( elem, type, value, attrs );
	});
	// TODO.
	/**
	- $('dx').delegate()
	*/
	Regular.directive( /^(delegate|de)-\w+$/, function( elem, value, name ) {
	  var root = this.$root;
	  var _delegates = root._delegates || ( root._delegates = {} );
	  if ( !name || !value ) return;
	  var type = name.split("-")[1];
	  var fire = _.handleEvent.call(this, value, type);

	  function delegateEvent(ev){
	    matchParent(ev, _delegates[type], root.parentNode);
	  }

	  if( !_delegates[type] ){
	    _delegates[type] = [];

	    if(root.parentNode){
	      dom.on(root.parentNode, type, delegateEvent);
	    }else{
	      root.$on( "$inject", function( newParent ){
	        var preParent = this.parentNode;
	        if( preParent ){
	          dom.off(preParent, type, delegateEvent);
	        }
	        dom.on(newParent, type, delegateEvent);
	      })
	    }
	    root.$on("$destroy", function(){
	      if(root.parentNode) dom.off(root.parentNode, type, delegateEvent)
	      _delegates[type] = null;
	    })
	  }
	  var delegate = {
	    element: elem,
	    fire: fire
	  }
	  _delegates[type].push( delegate );

	  return function(){
	    var delegates = _delegates[type];
	    if(!delegates || !delegates.length) return;
	    for( var i = 0, len = delegates.length; i < len; i++ ){
	      if( delegates[i] === delegate ) delegates.splice(i, 1);
	    }
	  }

	});


	function matchParent(ev , delegates, stop){
	  if(!stop) return;
	  var target = ev.target, pair;
	  while(target && target !== stop){
	    for( var i = 0, len = delegates.length; i < len; i++ ){
	      pair = delegates[i];
	      if(pair && pair.element === target){
	        pair.fire(ev)
	      }
	    }
	    target = target.parentNode;
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Regular
	var _ = __webpack_require__(4);
	var dom = __webpack_require__(16);
	var Regular = __webpack_require__(10);

	var modelHandlers = {
	  "text": initText,
	  "select": initSelect,
	  "checkbox": initCheckBox,
	  "radio": initRadio
	}


	// @TODO


	// two-way binding with r-model
	// works on input, textarea, checkbox, radio, select

	Regular.directive("r-model", function(elem, value){
	  var tag = elem.tagName.toLowerCase();
	  var sign = tag;
	  if(sign === "input") sign = elem.type || "text";
	  else if(sign === "textarea") sign = "text";
	  if(typeof value === "string") value = this.$expression(value);

	  if( modelHandlers[sign] ) return modelHandlers[sign].call(this, elem, value);
	  else if(tag === "input"){
	    return modelHandlers.text.call(this, elem, value);
	  }
	});



	// binding <select>

	function initSelect( elem, parsed){
	  var self = this;
	  var wc =this.$watch(parsed, function(newValue){
	    var children = _.slice(elem.getElementsByTagName('option'))
	    children.forEach(function(node, index){
	      if(node.value == newValue){
	        elem.selectedIndex = index;
	      }
	    })
	  });

	  function handler(){
	    parsed.set(self, this.value);
	    wc.last = this.value;
	    self.$update();
	  }

	  dom.on(elem, "change", handler);
	  
	  if(parsed.get(self) === undefined && elem.value){
	     parsed.set(self, elem.value);
	  }
	  return function destroy(){
	    dom.off(elem, "change", handler);
	  }
	}

	// input,textarea binding

	function initText(elem, parsed){
	  var self = this;
	  var wc = this.$watch(parsed, function(newValue){
	    if(elem.value !== newValue) elem.value = newValue == null? "": "" + newValue;
	  });

	  // @TODO to fixed event
	  var handler = function (ev){
	    var that = this;
	    if(ev.type==='cut' || ev.type==='paste'){
	      _.nextTick(function(){
	        var value = that.value
	        parsed.set(self, value);
	        wc.last = value;
	        self.$update();
	      })
	    }else{
	        var value = that.value
	        parsed.set(self, value);
	        wc.last = value;
	        self.$update();
	    }
	  };

	  if(dom.msie !== 9 && "oninput" in dom.tNode ){
	    elem.addEventListener("input", handler );
	  }else{
	    dom.on(elem, "paste", handler)
	    dom.on(elem, "keyup", handler)
	    dom.on(elem, "cut", handler)
	    dom.on(elem, "change", handler)
	  }
	  if(parsed.get(self) === undefined && elem.value){
	     parsed.set(self, elem.value);
	  }
	  return function (){
	    if(dom.msie !== 9 && "oninput" in dom.tNode ){
	      elem.removeEventListener("input", handler );
	    }else{
	      dom.off(elem, "paste", handler)
	      dom.off(elem, "keyup", handler)
	      dom.off(elem, "cut", handler)
	      dom.off(elem, "change", handler)
	    }
	  }
	}


	// input:checkbox  binding

	function initCheckBox(elem, parsed){
	  var self = this;
	  var watcher = this.$watch(parsed, function(newValue){
	    dom.attr(elem, 'checked', !!newValue);
	  });

	  var handler = function handler(){
	    var value = this.checked;
	    parsed.set(self, value);
	    watcher.last = value;
	    self.$update();
	  }
	  if(parsed.set) dom.on(elem, "change", handler)

	  if(parsed.get(self) === undefined){
	    parsed.set(self, !!elem.checked);
	  }

	  return function destroy(){
	    if(parsed.set) dom.off(elem, "change", handler)
	  }
	}


	// input:radio binding

	function initRadio(elem, parsed){
	  var self = this;
	  var wc = this.$watch(parsed, function( newValue ){
	    if(newValue == elem.value) elem.checked = true;
	    else elem.checked = false;
	  });


	  var handler = function handler(){
	    var value = this.value;
	    parsed.set(self, value);
	    self.$update();
	  }
	  if(parsed.set) dom.on(elem, "change", handler)
	  // beacuse only after compile(init), the dom structrue is exsit. 
	  if(parsed.get(self) === undefined){
	    if(elem.checked) {
	      parsed.set(self, elem.value);
	    }
	  }

	  return function destroy(){
	    if(parsed.set) dom.off(elem, "change", handler)
	  }
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var // packages
	  _ = __webpack_require__(4),
	 animate = __webpack_require__(17),
	 dom = __webpack_require__(16),
	 Regular = __webpack_require__(10);


	var // variables
	  rClassName = /^[-\w]+(\s[-\w]+)*$/,
	  rCommaSep = /[\r\n\f ]*,[\r\n\f ]*(?=\w+\:)/, //  dont split comma in  Expression
	  rStyles = /^\{.*\}$/, //  for Simpilfy
	  rSpace = /\s+/, //  for Simpilfy
	  WHEN_COMMAND = "when",
	  EVENT_COMMAND = "on",
	  THEN_COMMAND = "then";

	/**
	 * Animation Plugin
	 * @param {Component} Component 
	 */


	function createSeed(type){

	  var steps = [], current = 0, callback = _.noop;
	  var key;

	  var out = {
	    type: type,
	    start: function(cb){
	      key = _.uid();
	      if(typeof cb === "function") callback = cb;
	      if(current> 0 ){
	        current = 0 ;
	      }else{
	        out.step();
	      }
	      return out.compelete;
	    },
	    compelete: function(){
	      key = null;
	      callback && callback();
	      callback = _.noop;
	      current = 0;
	    },
	    step: function(){
	      if(steps[current]) steps[current ]( out.done.bind(out, key) );
	    },
	    done: function(pkey){
	      if(pkey !== key) return; // means the loop is down
	      if( current < steps.length - 1 ) {
	        current++;
	        out.step();
	      }else{
	        out.compelete();
	      }
	    },
	    push: function(step){
	      steps.push(step)
	    }
	  }

	  return out;
	}

	Regular._addProtoInheritCache("animation")


	// builtin animation
	Regular.animation({
	  "wait": function( step ){
	    var timeout = parseInt( step.param ) || 0
	    return function(done){
	      // _.log("delay " + timeout)
	      setTimeout( done, timeout );
	    }
	  },
	  "class": function(step){
	    var tmp = step.param.split(","),
	      className = tmp[0] || "",
	      mode = parseInt(tmp[1]) || 1;

	    return function(done){
	      // _.log(className)
	      animate.startClassAnimate( step.element, className , done, mode );
	    }
	  },
	  "call": function(step){
	    var fn = this.$expression(step.param).get, self = this;
	    return function(done){
	      // _.log(step.param, 'call')
	      fn(self);
	      self.$update();
	      done()
	    }
	  },
	  "emit": function(step){
	    var param = step.param;
	    var tmp = param.split(","),
	      evt = tmp[0] || "",
	      args = tmp[1]? this.$expression(tmp[1]).get: null;

	    if(!evt) throw Error("you shoud specified a eventname in emit command");

	    var self = this;
	    return function(done){
	      self.$emit(evt, args? args(self) : undefined);
	      done();
	    }
	  },
	  // style: left {10}px,
	  style: function(step){
	    var styles = {}, 
	      param = step.param,
	      pairs = param.split(","), valid;
	    pairs.forEach(function(pair){
	      pair = pair.trim();
	      if(pair){
	        var tmp = pair.split( rSpace ),
	          name = tmp.shift(),
	          value = tmp.join(" ");

	        if( !name || !value ) throw Error("invalid style in command: style");
	        styles[name] = value;
	        valid = true;
	      }
	    })

	    return function(done){
	      if(valid){
	        animate.startStyleAnimate(step.element, styles, done);
	      }else{
	        done();
	      }
	    }
	  }
	})



	// hancdle the r-animation directive
	// el : the element to process
	// value: the directive value
	function processAnimate( element, value ){
	  var Component = this.constructor;
	  value = value.trim();

	  var composites = value.split(";"), 
	    composite, context = this, seeds = [], seed, destroies = [], destroy,
	    command, param , current = 0, tmp, animator, self = this;

	  function reset( type ){
	    seed && seeds.push( seed )
	    seed = createSeed( type );
	  }

	  function whenCallback(start, value){
	    if( !!value ) start()
	  }

	  function animationDestroy(element){
	    return function(){
	      delete element.onenter;
	      delete element.onleave;
	    } 
	  }

	  for( var i = 0, len = composites.length; i < len; i++ ){

	    composite = composites[i];
	    tmp = composite.split(":");
	    command = tmp[0] && tmp[0].trim();
	    param = tmp[1] && tmp[1].trim();

	    if( !command ) continue;

	    if( command === WHEN_COMMAND ){
	      reset("when");
	      this.$watch(param, whenCallback.bind( this, seed.start ) );
	      continue;
	    }

	    if( command === EVENT_COMMAND){
	      reset(param);
	      if( param === "leave" ){
	        element.onleave = seed.start;
	        destroies.push( animationDestroy(element) );
	      }else if( param === "enter" ){
	        element.onenter = seed.start;
	        destroies.push( animationDestroy(element) );
	      }else{
	        if( ("on" + param) in element){ // if dom have the event , we use dom event
	          destroies.push(this._handleEvent( element, param, seed.start ));
	        }else{ // otherwise, we use component event
	          this.$on(param, seed.start);
	          destroies.push(this.$off.bind(this, param, seed.start));
	        }
	      }
	      continue
	    }

	    var animator =  Component.animation(command) 
	    if( animator && seed ){
	      seed.push(
	        animator.call(this,{
	          element: element,
	          done: seed.done,
	          param: param 
	        })
	      )
	    }else{
	      throw Error( animator? "you should start with `on` or `event` in animation" : ("undefined animator 【" + command +"】" ));
	    }
	  }

	  if(destroies.length){
	    return function(){
	      destroies.forEach(function(destroy){
	        destroy();
	      })
	    }
	  }
	}


	Regular.directive( "r-animation", processAnimate)
	Regular.directive( "r-anim", processAnimate)



/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var Regular = __webpack_require__(10);

	/**
	 * Timeout Module
	 * @param {Component} Component 
	 */
	function TimeoutModule(Component){

	  Component.implement({
	    /**
	     * just like setTimeout, but will enter digest automately
	     * @param  {Function} fn    
	     * @param  {Number}   delay 
	     * @return {Number}   timeoutid
	     */
	    $timeout: function(fn, delay){
	      delay = delay || 0;
	      return setTimeout(function(){
	        fn.call(this);
	        this.$update(); //enter digest
	      }.bind(this), delay);
	    },
	    /**
	     * just like setInterval, but will enter digest automately
	     * @param  {Function} fn    
	     * @param  {Number}   interval 
	     * @return {Number}   intervalid
	     */
	    $interval: function(fn, interval){
	      interval = interval || 1000/60;
	      return setInterval(function(){
	        fn.call(this);
	        this.$update(); //enter digest
	      }.bind(this), interval);
	    }
	  });
	}


	Regular.plugin('timeout', TimeoutModule);
	Regular.plugin('$timeout', TimeoutModule);

/***/ },
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div class=\"g-top\">Regular UI Builder</div>\n<div class=\"g-lsd\">\n    <listView source={tools} />\n</div>\n<div class=\"g-rsd\"></div>\n<div class=\"g-mn\">\n    <div class=\"g-paper\">\n    <button class=\"u-btn\">Button</button>\n    </div>\n</div>"

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e(__webpack_require__(2)):"function"==typeof define&&define.amd?define(["Regular"],e):"object"==typeof exports?exports.RGUI=e(require("regularjs")):t.RGUI=e(t.Regular)}(this,function(__WEBPACK_EXTERNAL_MODULE_1__){return function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";e.Regular=i(1),e.Component=i(2),e.SourceComponent=i(5),e._=i(3),e.ajax=i(6),e.Dropdown=i(11),e.Menu=i(13),e.Input2=i(16),e.NumberInput=i(20),e.Check2=i(22),e.CheckGroup=i(24),e.Check2Group=i(26),e.RadioGroup=i(28),e.Radio2Group=i(30),e.Select2=i(32),e.Select2Group=i(34),e.TreeSelect=i(36),e.Suggest=i(41),e.Uploader=i(43),e.DatePicker=i(45),e.TimePicker=i(49),e.DateTimePicker=i(51),e.Progress=i(53),e.Loading=i(55),e.Gotop=i(57),e.Tabs=i(59),e.Collapse=i(61),e.Pager=i(64),e.Notify=i(9),e.Modal=i(66),e.ListView=i(68),e.TreeView=i(38),e.Calendar=i(47),e.Editor=i(70),e.HTMLEditor=i(72),e.MarkEditor=i(74),e.Validation=i(18)},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_1__},function(t,e,i){"use strict";var n=i(1),s=i(3),a=i(4),r=n.extend({config:function(){s.extend(this.data,{readonly:!1,disabled:!1,visible:!0,"class":"",console:console}),this.supr()},reset:function(){this.data={},this.config()}}).filter(a).directive({"r-show":function(t,e){this.$watch(e,function(e,i){!e!=!i&&(t.style.display=e?"block":"")})},"r-autofocus":function(t,e){setTimeout(function(){t.focus()},0)}});Array.prototype.find||(Array.prototype.find=function(t){if(null===this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var e,i=Object(this),n=i.length>>>0,s=arguments[1],a=0;n>a;a++)if(e=i[a],t.call(s,e,a,i))return e;return void 0}),t.exports=r},function(t,e,i){"use strict";var n=i(1),s={extend:function(t,e,i){for(var n in e)e.hasOwnProperty(n)&&(i||void 0===t[n])&&(t[n]=e[n]);return t},dom:n.dom,multiline:function(t){var e=/^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;return e.exec(t)[1]}};t.exports=s},function(t,e){"use strict";var i={};i.format=function(){function t(t){return t=""+(String(t)||""),t.length<=1?"0"+t:t}var e={yyyy:function(t){return t.getFullYear()},MM:function(e){return t(e.getMonth()+1)},dd:function(e){return t(e.getDate())},HH:function(e){return t(e.getHours())},mm:function(e){return t(e.getMinutes())},ss:function(e){return t(e.getSeconds())}},i=new RegExp(Object.keys(e).join("|"),"g");return function(t,n){return t?(n=n||"yyyy-MM-dd HH:mm",t=new Date(t),n.replace(i,function(i){return e[i]?e[i](t):""})):""}}(),i.average=function(t,e){return t=t||[],t.length?i.total(t,e)/t.length:0},i.total=function(t,e){var i=0;if(t)return t.forEach(function(t){i+=e?t[e]:t}),i},i.filter=function(t,e){return t&&t.length?t.filter(function(t,i){return e(t,i)}):void 0},t.exports=i},function(t,e,i){"use strict";var n=i(2),s=i(3),a=n.extend({service:null,config:function(){s.extend(this.data,{source:[],updateAuto:!0}),this.data.service&&(this.service=this.data.service),this.service&&this.data.updateAuto&&this.$updateSource(),this.supr()},getParams:function(){return{}},$updateSource:function(){return this.service.getList(this.getParams(),function(t){this.$update("source",t)}.bind(this)),this}});t.exports=a},function(t,e,i){"use strict";var n=i(7),s={},a=i(9);s.request=function(t){var e=function(){},i=t.error||e,s=t.success||e,r=t.complete||e;t.data=t.data||{},!t.contentType&&t.method&&"get"!==t.method.toLowerCase()?t.contentType="application/json":t.data.timestamp=+new Date,"application/json"===t.contentType&&(t.data=JSON.stringify(t.data)),t.success=function(t){return t.success?void s(t.result,t):(a.error(t.message),void i(t.result,t))},t.error=function(t){i(t.result,t)},t.complete=function(t){r(t.result,t)},n(t)},s.get=function(t,e){s.request({url:t,method:"get",success:e})},s.post=function(t,e,i){s.request({url:t,method:"post",type:"json",success:i})},t.exports=s},function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(t,e,i){"undefined"!=typeof module&&module.exports?module.exports=i():(__WEBPACK_AMD_DEFINE_FACTORY__=i,__WEBPACK_AMD_DEFINE_RESULT__="function"==typeof __WEBPACK_AMD_DEFINE_FACTORY__?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,!(void 0!==__WEBPACK_AMD_DEFINE_RESULT__&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}("reqwest",this,function(){function succeed(t){var e=protocolRe.exec(t.url);return e=e&&e[1]||context.location.protocol,httpsRe.test(e)?twoHundo.test(t.request.status):!!t.request.response}function handleReadyState(t,e,i){return function(){return t._aborted?i(t.request):t._timedOut?i(t.request,"Request is aborted: timeout"):void(t.request&&4==t.request[readyState]&&(t.request.onreadystatechange=noop,succeed(t)?e(t.request):i(t.request)))}}function setHeaders(t,e){var i,n=e.headers||{};n.Accept=n.Accept||defaultHeaders.accept[e.type]||defaultHeaders.accept["*"];var s="undefined"!=typeof FormData&&e.data instanceof FormData;e.crossOrigin||n[requestedWith]||(n[requestedWith]=defaultHeaders.requestedWith),n[contentType]||s||(n[contentType]=e.contentType||defaultHeaders.contentType);for(i in n)n.hasOwnProperty(i)&&"setRequestHeader"in t&&t.setRequestHeader(i,n[i])}function setCredentials(t,e){"undefined"!=typeof e.withCredentials&&"undefined"!=typeof t.withCredentials&&(t.withCredentials=!!e.withCredentials)}function generalCallback(t){lastValue=t}function urlappend(t,e){return t+(/\?/.test(t)?"&":"?")+e}function handleJsonp(t,e,i,n){var s=uniqid++,a=t.jsonpCallback||"callback",r=t.jsonpCallbackName||reqwest.getcallbackPrefix(s),o=new RegExp("((^|\\?|&)"+a+")=([^&]+)"),l=n.match(o),c=doc.createElement("script"),d=0,u=-1!==navigator.userAgent.indexOf("MSIE 10.0");return l?"?"===l[3]?n=n.replace(o,"$1="+r):r=l[3]:n=urlappend(n,a+"="+r),context[r]=generalCallback,c.type="text/javascript",c.src=n,c.async=!0,"undefined"==typeof c.onreadystatechange||u||(c.htmlFor=c.id="_reqwest_"+s),c.onload=c.onreadystatechange=function(){return c[readyState]&&"complete"!==c[readyState]&&"loaded"!==c[readyState]||d?!1:(c.onload=c.onreadystatechange=null,c.onclick&&c.onclick(),e(lastValue),lastValue=void 0,head.removeChild(c),void(d=1))},head.appendChild(c),{abort:function(){c.onload=c.onreadystatechange=null,i({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(c),d=1}}}function getRequest(t,e){var i,n=this.o,s=(n.method||"GET").toUpperCase(),a="string"==typeof n?n:n.url,r=n.processData!==!1&&n.data&&"string"!=typeof n.data?reqwest.toQueryString(n.data):n.data||null,o=!1;return"jsonp"!=n.type&&"GET"!=s||!r||(a=urlappend(a,r),r=null),"jsonp"==n.type?handleJsonp(n,t,e,a):(i=n.xhr&&n.xhr(n)||xhr(n),i.open(s,a,n.async===!1?!1:!0),setHeaders(i,n),setCredentials(i,n),context[xDomainRequest]&&i instanceof context[xDomainRequest]?(i.onload=t,i.onerror=e,i.onprogress=function(){},o=!0):i.onreadystatechange=handleReadyState(this,t,e),n.before&&n.before(i),o?setTimeout(function(){i.send(r)},200):i.send(r),i)}function Reqwest(t,e){this.o=t,this.fn=e,init.apply(this,arguments)}function setType(t){return null===t?void 0:t.match("json")?"json":t.match("javascript")?"js":t.match("text")?"html":t.match("xml")?"xml":void 0}function init(o,fn){function complete(t){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(t)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=context.JSON?context.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(t,e,i){for(t=self.request,self._responseArgs.resp=t,self._responseArgs.msg=e,self._responseArgs.t=i,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(t,e,i);complete(t)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(t,e){return new Reqwest(t,e)}function normalize(t){return t?t.replace(/\r?\n/g,"\r\n"):""}function serial(t,e){var i,n,s,a,r=t.name,o=t.tagName.toLowerCase(),l=function(t){t&&!t.disabled&&e(r,normalize(t.attributes.value&&t.attributes.value.specified?t.value:t.text))};if(!t.disabled&&r)switch(o){case"input":/reset|button|image|file/i.test(t.type)||(i=/checkbox/i.test(t.type),n=/radio/i.test(t.type),s=t.value,(!(i||n)||t.checked)&&e(r,normalize(i&&""===s?"on":s)));break;case"textarea":e(r,normalize(t.value));break;case"select":if("select-one"===t.type.toLowerCase())l(t.selectedIndex>=0?t.options[t.selectedIndex]:null);else for(a=0;t.length&&a<t.length;a++)t.options[a].selected&&l(t.options[a])}}function eachFormElement(){var t,e,i=this,n=function(t,e){var n,s,a;for(n=0;n<e.length;n++)for(a=t[byTag](e[n]),s=0;s<a.length;s++)serial(a[s],i)};for(e=0;e<arguments.length;e++)t=arguments[e],/input|select|textarea/i.test(t.tagName)&&serial(t,i),n(t,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var t={};return eachFormElement.apply(function(e,i){e in t?(t[e]&&!isArray(t[e])&&(t[e]=[t[e]]),t[e].push(i)):t[e]=i},arguments),t}function buildParams(t,e,i,n){var s,a,r,o=/\[\]$/;if(isArray(e))for(a=0;e&&a<e.length;a++)r=e[a],i||o.test(t)?n(t,r):buildParams(t+"["+("object"==typeof r?a:"")+"]",r,i,n);else if(e&&"[object Object]"===e.toString())for(s in e)buildParams(t+"["+s+"]",e[s],i,n);else n(t,e)}var context=this;if("window"in context)var doc=document,byTag="getElementsByTagName",head=doc[byTag]("head")[0];else{var XHR2;try{XHR2=__webpack_require__(8)}catch(ex){throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")}}var httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(t){return t instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(t){if(t.crossOrigin===!0){var e=context[xmlHttpRequest]?new XMLHttpRequest:null;if(e&&"withCredentials"in e)return e;if(context[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return context[xmlHttpRequest]?new XMLHttpRequest:XHR2?new XHR2:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(t){return t}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(t,e){return t=t||function(){},e=e||function(){},this._fulfilled?this._responseArgs.resp=t(this._responseArgs.resp):this._erred?e(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(t),this._errorHandlers.push(e)),this},always:function(t){return this._fulfilled||this._erred?t(this._responseArgs.resp):this._completeHandlers.push(t),this},fail:function(t){return this._erred?t(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(t),this},"catch":function(t){return this.fail(t)}},reqwest.serializeArray=function(){var t=[];return eachFormElement.apply(function(e,i){t.push({name:e,value:i})},arguments),t},reqwest.serialize=function(){if(0===arguments.length)return"";var t,e,i=Array.prototype.slice.call(arguments,0);return t=i.pop(),t&&t.nodeType&&i.push(t)&&(t=null),t&&(t=t.type),e="map"==t?serializeHash:"array"==t?reqwest.serializeArray:serializeQueryString,e.apply(null,i)},reqwest.toQueryString=function(t,e){var i,n,s=e||!1,a=[],r=encodeURIComponent,o=function(t,e){e="function"==typeof e?e():null==e?"":e,a[a.length]=r(t)+"="+r(e)};if(isArray(t))for(n=0;t&&n<t.length;n++)o(t[n].name,t[n].value);else for(i in t)t.hasOwnProperty(i)&&buildParams(i,t[i],s,o);return a.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(t,e){return t&&(t.type&&(t.method=t.type)&&delete t.type,t.dataType&&(t.type=t.dataType),t.jsonpCallback&&(t.jsonpCallbackName=t.jsonpCallback)&&delete t.jsonpCallback,t.jsonp&&(t.jsonpCallback=t.jsonp)),new Reqwest(t,e)},reqwest.ajaxSetup=function(t){t=t||{};for(var e in t)globalSetupOptions[e]=t[e]},reqwest})},function(t,e){},function(t,e,i){"use strict";var n=i(2),s=i(10),a=i(3),r=n.extend({name:"notify",template:s,config:function(){a.extend(this.data,{messages:[],position:"topcenter",duration:2e3}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},show:function(t,e,i){var n={text:t,state:e,duration:i>=0?i:this.data.duration};this.data.messages.unshift(n),this.$update(),+n.duration&&this.$timeout(this.close.bind(this,n),+n.duration),this.$emit("show",{message:n})},close:function(t){var e=this.data.messages.indexOf(t);this.data.messages.splice(e,1),this.$update(),this.$emit("close",{message:t})},closeAll:function(){this.$update("messages",[])}}).use("$timeout"),o=new r;r.notify=o,r.show=function(){o.show.apply(o,arguments)};var l=["success","warning","info","error"];l.forEach(function(t){r[t]=function(e){r.show(e,t)}}),r.close=function(){o.close.apply(o,arguments)},r.closeAll=function(){o.closeAll.apply(o,arguments)},t.exports=r},function(t,e){t.exports='<div class="m-notify m-notify-{@(position)} {class}" r-hide={!visible}>\n    {#list messages as message}\n    <div class="u-message u-message-{@(message.state)}" r-animation="on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;">\n        <a class="message_close" on-click={this.close(message)}><i class="u-icon u-icon-close"></i></a>\n        <i class="message_icon u-icon u-icon-{@(message.state)}-circle" r-hide={@(!message.state)}></i>\n        {@(message.text)}\n    </div>\n    {/list}\n</div>'},function(t,e,i){var n=i(5),s=i(12),a=i(3),r=n.extend({name:"dropdown",template:s,config:function(){a.extend(this.data,{itemTemplate:null,open:!1}),this.supr()},toggle:function(t){if(!this.data.disabled){this.data.open=t;var e=r.opens.indexOf(this);t&&0>e?r.opens.push(this):!t&&e>=0&&r.opens.splice(e,1),this.$emit("toggle",{open:t})}},select:function(t){this.data.disabled||t&&(t.disabled||t.divider)||(this.$emit("select",{selected:t}),this.toggle(!1))}});r.opens=[],a.dom.on(document.body,"click",function(t){r.opens.forEach(function(e,i){if(!e.$refs)return r.opens.splice(i,1);for(var n=e.$refs.element,s=t.target;s;){if(n==s)return;s=s.parentElement}e.toggle(!1),e.$update()})}),t.exports=r},function(t,e){t.exports='<div class="u-dropdown {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" on-click={this.toggle(!open)}>\n        {#if this.$body}\n            {#inc this.$body}\n        {#else}\n            <a class="u-btn" title={title || \'下拉菜单\'}>{title || \'下拉菜单\'} <i class="u-icon u-icon-caret-down"></i></a>\n        {/if}\n    </div>\n    <div class="dropdown_bd" r-show={open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <ul class="m-listview">\n            {#list source as item}\n            <li r-class={ {\'z-dis\': item.disabled, \'dropdown_divider\': item.divider} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#inc @(itemTemplate)}{#else}{item.name}{/if}</li>\n            {/list}\n        </ul>\n    </div>\n</div>'},function(t,e,i){var n=i(11),s=i(5),a=i(14),r=i(15),o=i(3),l=n.extend({name:"menu",template:a,config:function(){o.extend(this.data,{open:!1}),this.supr(),this.$ancestor=this}});s.extend({name:"menuList",template:r,config:function(){o.extend(this.data,{itemTemplate:null}),this.supr(),this.$ancestor=this.$parent.$ancestor,this.service=this.$ancestor.service,this.data.itemTemplate=this.$ancestor.data.itemTemplate},select:function(t){this.$ancestor.data.disabled||t.disabled||t.divider||this.$ancestor.select(t)},toggle:function(t){this.$ancestor.data.disabled||(t.open=!t.open,this.$ancestor.$emit("toggle",{item:t,open:t.open}))}});t.exports=l},function(t,e){t.exports='<div class="u-dropdown u-menu {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" on-click={this.toggle(!open)}>\n        {#if this.$body}\n            {#inc this.$body}\n        {#else}\n            <a class="u-btn" title={title || \'下拉菜单\'}>{title || \'多级菜单\'} <i class="u-icon u-icon-caret-down"></i></a>\n        {/if}\n    </div>\n    <div class="dropdown_bd" r-show={open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <menuList source={source} visible={true} />\n    </div>\n</div>'},function(t,e){t.exports='<ul class="m-listview menu_list" r-hide={!visible}>\n    {#list source as item}\n    <li r-class={ {\'z-dis\': item.disabled, \'dropdown_divider\': item.divider} }>\n        <div class="menu_item">\n            {#if item.childrenCount || (item.children && item.children.length)}\n            <i class="u-icon u-icon-caret-right"></i>\n            {/if}\n            <div class="menu_itemname" title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#inc @(itemTemplate)}{#else}{item.name}{/if}</div>\n        </div>\n        {#if item.childrenCount || (item.children && item.children.length)}<menuList source={item.children} visible={item.open} parent={item} />{/if}\n    </li>\n    {/list}\n</ul>'},function(t,e,i){var n=i(2),s=i(17),a=i(3),r=i(18),o=n.extend({name:"input2",template:s,config:function(){a.extend(this.data,{value:"",state:"",unit:"",placeholder:"",rules:[],validating:!1}),this.supr();var t=this.$outer;t&&t instanceof r&&(t.controls.push(this),this.$on("destroy",function(){var e=t.controls.indexOf(this);t.controls.splice(e,1)}))},validate:function(){var t=this.data.value,e=this.data.rules,i=r.validate(t,e);return this.data.state=i.success?"success":"error",this.data.tip=i.message,i}});t.exports=o},function(t,e){t.exports='<label class="u-input2 {class}" r-hide={!visible}>\n    <input class="u-input u-input-{state} u-input-{size} u-input-{width}"\n        type={type} placeholder={placeholder} maxlength={maxlength} readonly={readonly} disabled={disabled}\n        r-model={value} {#if validating}on-keyup={this.validate(value, rules)}{/if}>\n    {#if unit}<span class="input2_unit">{unit}</span>{/if}\n</label>\n{#if tip}<span class="u-tip u-tip-{state}">{tip}</span>{/if}'},function(t,e,i){"use strict";var n=i(2),s=i(3),a=i(19),r=n.extend({name:"validation",template:"{#inc this.$body}",config:function(){this.controls=[],s.extend(this.data,{}),this.supr()},validate:function(){var t={results:[],success:!0,message:""};return this.controls.forEach(function(e){var i=e.validate();t.results.push(i),i.success||(t.success=!1,t.message=t.message||i.message)}),t}});r.validate=function(t,e){var i={success:!0,message:""};return e.forEach(function(e){e.success=!0,"is"===e.type?e.success=e.reg.test(t):"isRequired"===e.type?e.success=!!a.toString(t):"isFilled"===e.type?e.success=!!a.toString(t).trim():"isEmail"===e.type?e.success=a.isEmail(t):"isMobilePhone"===e.type?e.success=a.isMobilePhone(t,"zh-CN"):"isURL"===e.type?e.success=a.isURL(t):"isNumber"===e.type?e.success=a.isInt(t):"isInt"===e.type?e.success=a.isInt(t):"isFloat"===e.type?e.success=a.isFloat(t):"isLength"===e.type?e.success=a.isLength(t,e.min,e.max):e.success=e.method(t),!e.success&&i.success&&(i.success=!1,i.message=e.message)}),i},t.exports=r},function(t,e,i){!function(e,i){t.exports=i()}("validator",function(t){"use strict";function e(t){var e=t.match(C);if(!e)return(new Date).getTimezoneOffset();var i=e[21];if(!i||"z"===i||"Z"===i)return 0;var n,s,a=e[22];return-1!==i.indexOf(":")?(n=parseInt(e[23]),s=parseInt(e[24])):(n=0,s=parseInt(e[23])),(60*n+s)*("-"===a?1:-1)}function i(t,e){t=t||{};for(var i in e)"undefined"==typeof t[i]&&(t[i]=e[i]);return t}function n(t){var e="(\\"+t.symbol.replace(/\./g,"\\.")+")"+(t.require_symbol?"":"?"),i="-?",n="[1-9]\\d*",s="[1-9]\\d{0,2}(\\"+t.thousands_separator+"\\d{3})*",a=["0",n,s],r="("+a.join("|")+")?",o="(\\"+t.decimal_separator+"\\d{2})?",l=r+o;return t.allow_negatives&&!t.parens_for_negatives&&(t.negative_sign_after_digits?l+=i:t.negative_sign_before_digits&&(l=i+l)),t.allow_negative_sign_placeholder?l="( (?!\\-))?"+l:t.allow_space_after_symbol?l=" ?"+l:t.allow_space_after_digits&&(l+="( (?!$))?"),t.symbol_after_digits?l+=e:l=e+l,t.allow_negatives&&(t.parens_for_negatives?l="(\\("+l+"\\)|"+l+")":t.negative_sign_before_digits||t.negative_sign_after_digits||(l=i+l)),new RegExp("^(?!-? )(?=.*\\d)"+l+"$")}t={version:"4.2.0"};var s=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,a=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,r=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,o=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i,l=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i,c=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,d=/^[A-Z]{2}[0-9A-Z]{9}[0-9]$/,u=/^(?:[0-9]{9}X|[0-9]{10})$/,h=/^(?:[0-9]{13})$/,p=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,f=/^[0-9A-F]{1,4}$/i,m={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i},g=/^[A-Z]+$/i,v=/^[0-9A-Z]+$/i,x=/^[-+]?[0-9]+$/,b=/^(?:[-+]?(?:0|[1-9][0-9]*))$/,y=/^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,_=/^[0-9A-F]+$/i,w=/^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,k=/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,$=/^[\x00-\x7F]+$/,D=/[^\x00-\x7F]/,F=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,A=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,E=/[\uD800-\uDBFF][\uDC00-\uDFFF]/,S=/^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i,T={"zh-CN":/^(\+?0?86\-?)?1[345789]\d{9}$/,"zh-TW":/^(\+?886\-?|0)?9\d{8}$/,"en-ZA":/^(\+?27|0)\d{9}$/,"en-AU":/^(\+?61|0)4\d{8}$/,"en-HK":/^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,"fr-FR":/^(\+?33|0)[67]\d{8}$/,"pt-PT":/^(\+351)?9[1236]\d{7}$/,"el-GR":/^(\+30)?((2\d{9})|(69\d{8}))$/,"en-GB":/^(\+?44|0)7\d{9}$/,"en-US":/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,"en-ZM":/^(\+26)?09[567]\d{7}$/,"ru-RU":/^(\+?7|8)?9\d{9}$/,"nb-NO":/^(\+?47)?[49]\d{7}$/,"nn-NO":/^(\+?47)?[49]\d{7}$/},C=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;t.extend=function(e,i){t[e]=function(){var e=Array.prototype.slice.call(arguments);return e[0]=t.toString(e[0]),i.apply(t,e)}},t.init=function(){for(var e in t)"function"==typeof t[e]&&"toString"!==e&&"toDate"!==e&&"extend"!==e&&"init"!==e&&t.extend(e,t[e])},t.toString=function(t){return"object"==typeof t&&null!==t&&t.toString?t=t.toString():(null===t||"undefined"==typeof t||isNaN(t)&&!t.length)&&(t=""),""+t},t.toDate=function(t){return"[object Date]"===Object.prototype.toString.call(t)?t:(t=Date.parse(t),isNaN(t)?null:new Date(t))},t.toFloat=function(t){return parseFloat(t)},t.toInt=function(t,e){return parseInt(t,e||10)},t.toBoolean=function(t,e){return e?"1"===t||"true"===t:"0"!==t&&"false"!==t&&""!==t},t.equals=function(e,i){return e===t.toString(i)},t.contains=function(e,i){return e.indexOf(t.toString(i))>=0},t.matches=function(t,e,i){return"[object RegExp]"!==Object.prototype.toString.call(e)&&(e=new RegExp(e,i)),e.test(t)};var R={allow_display_name:!1,allow_utf8_local_part:!0,require_tld:!0};t.isEmail=function(e,n){if(n=i(n,R),n.allow_display_name){var c=e.match(l);c&&(e=c[1])}var d=e.split("@"),u=d.pop(),h=d.join("@"),p=u.toLowerCase();if(("gmail.com"===p||"googlemail.com"===p)&&(h=h.replace(/\./g,"").toLowerCase()),!t.isByteLength(h,0,64)||!t.isByteLength(u,0,256))return!1;if(!t.isFQDN(u,{require_tld:n.require_tld}))return!1;if('"'===h[0])return h=h.slice(1,h.length-1),n.allow_utf8_local_part?o.test(h):a.test(h);for(var f=n.allow_utf8_local_part?r:s,m=h.split("."),g=0;g<m.length;g++)if(!f.test(m[g]))return!1;return!0};var O={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,require_valid_protocol:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_protocol_relative_urls:!1};t.isURL=function(e,n){if(!e||e.length>=2083||/\s/.test(e))return!1;if(0===e.indexOf("mailto:"))return!1;n=i(n,O);var s,a,r,o,l,c,d;if(d=e.split("://"),d.length>1){if(s=d.shift(),n.require_valid_protocol&&-1===n.protocols.indexOf(s))return!1}else{if(n.require_protocol)return!1;n.allow_protocol_relative_urls&&"//"===e.substr(0,2)&&(d[0]=e.substr(2))}return e=d.join("://"),d=e.split("#"),e=d.shift(),d=e.split("?"),e=d.shift(),d=e.split("/"),e=d.shift(),d=e.split("@"),d.length>1&&(a=d.shift(),a.indexOf(":")>=0&&a.split(":").length>2)?!1:(o=d.join("@"),d=o.split(":"),r=d.shift(),d.length&&(c=d.join(":"),l=parseInt(c,10),!/^[0-9]+$/.test(c)||0>=l||l>65535)?!1:t.isIP(r)||t.isFQDN(r,n)||"localhost"===r?n.host_whitelist&&-1===n.host_whitelist.indexOf(r)?!1:n.host_blacklist&&-1!==n.host_blacklist.indexOf(r)?!1:!0:!1)},t.isIP=function(e,i){if(i=t.toString(i),!i)return t.isIP(e,4)||t.isIP(e,6);if("4"===i){if(!p.test(e))return!1;var n=e.split(".").sort(function(t,e){return t-e});return n[3]<=255}if("6"===i){var s=e.split(":"),a=!1,r=t.isIP(s[s.length-1],4),o=r?7:8;if(s.length>o)return!1;if("::"===e)return!0;"::"===e.substr(0,2)?(s.shift(),s.shift(),a=!0):"::"===e.substr(e.length-2)&&(s.pop(),s.pop(),a=!0);for(var l=0;l<s.length;++l)if(""===s[l]&&l>0&&l<s.length-1){if(a)return!1;a=!0}else if(r&&l==s.length-1);else if(!f.test(s[l]))return!1;return a?s.length>=1:s.length===o}return!1};var q={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1};t.isFQDN=function(t,e){e=i(e,q),e.allow_trailing_dot&&"."===t[t.length-1]&&(t=t.substring(0,t.length-1));var n=t.split(".");if(e.require_tld){var s=n.pop();if(!n.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(s))return!1}for(var a,r=0;r<n.length;r++){if(a=n[r],e.allow_underscores){if(a.indexOf("__")>=0)return!1;a=a.replace(/_/g,"")}if(!/^[a-z\u00a1-\uffff0-9-]+$/i.test(a))return!1;if(/[\uff01-\uff5e]/.test(a))return!1;if("-"===a[0]||"-"===a[a.length-1]||a.indexOf("---")>=0)return!1}return!0},t.isBoolean=function(t){return["true","false","1","0"].indexOf(t)>=0},t.isAlpha=function(t){return g.test(t)},t.isAlphanumeric=function(t){return v.test(t)},t.isNumeric=function(t){return x.test(t)},t.isDecimal=function(t){return""!==t&&w.test(t)},t.isHexadecimal=function(t){return _.test(t)},t.isHexColor=function(t){return k.test(t)},t.isLowercase=function(t){return t===t.toLowerCase()},t.isUppercase=function(t){return t===t.toUpperCase()},t.isInt=function(t,e){return e=e||{},b.test(t)&&(!e.hasOwnProperty("min")||t>=e.min)&&(!e.hasOwnProperty("max")||t<=e.max)},t.isFloat=function(t,e){return e=e||{},""===t||"."===t?!1:y.test(t)&&(!e.hasOwnProperty("min")||t>=e.min)&&(!e.hasOwnProperty("max")||t<=e.max)},t.isDivisibleBy=function(e,i){return t.toFloat(e)%t.toInt(i)===0},t.isNull=function(t){return 0===t.length},t.isLength=function(t,e,i){var n=t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[],s=t.length-n.length;return s>=e&&("undefined"==typeof i||i>=s)},t.isByteLength=function(t,e,i){var n=encodeURI(t).split(/%..|./).length-1;return n>=e&&("undefined"==typeof i||i>=n)},t.isUUID=function(t,e){var i=m[e?e:"all"];return i&&i.test(t)},t.isDate=function(t){var i=new Date(new Date(t).toUTCString()),n=String(i.getUTCDate()),s=i.getTimezoneOffset()-e(t);i=new Date(i.getTime()+6e4*s);var a,r,o,l=String(i.getDate());return isNaN(Date.parse(i))?!1:(r=t.match(/(^|[^:\d])[23]\d([^:\d]|$)/g))?(a=r.map(function(t){return t.match(/\d+/g)[0]}).join("/"),o=String(i.getFullYear()).slice(-2),a===l||a===n||a===o?!0:a===l+"/"+o||a===o+"/"+l?!0:a===n+"/"+o||a===o+"/"+n?!0:!1):!0},t.isAfter=function(e,i){var n=t.toDate(i||new Date),s=t.toDate(e);return!!(s&&n&&s>n)},t.isBefore=function(e,i){var n=t.toDate(i||new Date),s=t.toDate(e);return!!(s&&n&&n>s)},t.isIn=function(e,i){var n;if("[object Array]"===Object.prototype.toString.call(i)){var s=[];for(n in i)s[n]=t.toString(i[n]);return s.indexOf(e)>=0}return"object"==typeof i?i.hasOwnProperty(e):i&&"function"==typeof i.indexOf?i.indexOf(e)>=0:!1},t.isCreditCard=function(t){var e=t.replace(/[^0-9]+/g,"");if(!c.test(e))return!1;for(var i,n,s,a=0,r=e.length-1;r>=0;r--)i=e.substring(r,r+1),n=parseInt(i,10),s?(n*=2,a+=n>=10?n%10+1:n):a+=n,s=!s;return!!(a%10===0?e:!1)},t.isISIN=function(t){if(!d.test(t))return!1;for(var e,i,n=t.replace(/[A-Z]/g,function(t){return parseInt(t,36)}),s=0,a=!0,r=n.length-2;r>=0;r--)e=n.substring(r,r+1),i=parseInt(e,10),a?(i*=2,s+=i>=10?i+1:i):s+=i,a=!a;return parseInt(t.substr(t.length-1),10)===(1e4-s)%10},t.isISBN=function(e,i){if(i=t.toString(i),!i)return t.isISBN(e,10)||t.isISBN(e,13);var n,s=e.replace(/[\s-]+/g,""),a=0;if("10"===i){if(!u.test(s))return!1;for(n=0;9>n;n++)a+=(n+1)*s.charAt(n);if(a+="X"===s.charAt(9)?100:10*s.charAt(9),a%11===0)return!!s}else if("13"===i){if(!h.test(s))return!1;var r=[1,3];for(n=0;12>n;n++)a+=r[n%2]*s.charAt(n);if(s.charAt(12)-(10-a%10)%10===0)return!!s}return!1},t.isMobilePhone=function(t,e){return e in T?T[e].test(t):!1};var P={symbol:"$",require_symbol:!1,allow_space_after_symbol:!1,symbol_after_digits:!1,allow_negatives:!0,parens_for_negatives:!1,negative_sign_before_digits:!1,negative_sign_after_digits:!1,allow_negative_sign_placeholder:!1,thousands_separator:",",decimal_separator:".",allow_space_after_digits:!1};t.isCurrency=function(t,e){return e=i(e,P),n(e).test(t)},t.isJSON=function(t){try{var e=JSON.parse(t);return!!e&&"object"==typeof e}catch(i){}return!1},t.isMultibyte=function(t){return D.test(t);
	},t.isAscii=function(t){return $.test(t)},t.isFullWidth=function(t){return F.test(t)},t.isHalfWidth=function(t){return A.test(t)},t.isVariableWidth=function(t){return F.test(t)&&A.test(t)},t.isSurrogatePair=function(t){return E.test(t)},t.isBase64=function(t){return S.test(t)},t.isMongoId=function(e){return t.isHexadecimal(e)&&24===e.length},t.isISO8601=function(t){return C.test(t)},t.ltrim=function(t,e){var i=e?new RegExp("^["+e+"]+","g"):/^\s+/g;return t.replace(i,"")},t.rtrim=function(t,e){var i=e?new RegExp("["+e+"]+$","g"):/\s+$/g;return t.replace(i,"")},t.trim=function(t,e){var i=e?new RegExp("^["+e+"]+|["+e+"]+$","g"):/^\s+|\s+$/g;return t.replace(i,"")},t.escape=function(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\//g,"&#x2F;").replace(/\`/g,"&#96;")},t.stripLow=function(e,i){var n=i?"\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F":"\\x00-\\x1F\\x7F";return t.blacklist(e,n)},t.whitelist=function(t,e){return t.replace(new RegExp("[^"+e+"]+","g"),"")},t.blacklist=function(t,e){return t.replace(new RegExp("["+e+"]+","g"),"")};var z={lowercase:!0};return t.normalizeEmail=function(e,n){if(n=i(n,z),!t.isEmail(e))return!1;var s=e.split("@",2);if(s[1]=s[1].toLowerCase(),"gmail.com"===s[1]||"googlemail.com"===s[1]){if(s[0]=s[0].toLowerCase().replace(/\./g,""),"+"===s[0][0])return!1;s[0]=s[0].split("+")[0],s[1]="gmail.com"}else n.lowercase&&(s[0]=s[0].toLowerCase());return s.join("@")},t.init(),t})},function(t,e,i){var n=i(16),s=i(21),a=i(3),r=n.extend({name:"numberInput",template:s,config:function(){a.extend(this.data,{value:0,min:void 0,max:void 0}),this.supr(),this.$watch("value",function(t,e){if("string"==typeof t)return this.data.value=+t;var i=this.isOutOfRange(t);return i!==!1?this.data.value=i:void this.$emit("change",{value:t})}),this.$watch(["min","max"],function(t,e){if(!isNaN(t)&&!isNaN(e)&&t-e>0)throw new r.NumberRangeException(t,e);var i=this.isOutOfRange(this.data.value);return i!==!1?this.data.value=i:void 0})},add:function(t){return this.data.readonly||this.data.disabled||!t?void 0:this.data.value+=t},isOutOfRange:function(t){var e=+this.data.min,i=+this.data.max;return!isNaN(e)&&e>t?e:!isNaN(i)&&t>i?i:!1}}).filter({number:{get:function(t){return t=""+(t||0),this.data.format?this.data.format.replace(new RegExp("\\d{0,"+t.length+"}$"),t):t},set:function(t){return+t}}});r.NumberRangeException=function(t,e){this.type="NumberRangeException",this.message="Wrong Number Range where `min` is "+t+" and `max` is "+e+"!"},r.NumberRangeException.prototype.toString=function(){return this.message},t.exports=r},function(t,e){t.exports='<label class="u-input2 u-numberinput {class}" r-hide={!visible}>\n    <input class="u-input u-input-{type}" r-model={value | number} placeholder={placeholder} readonly={readonly} disabled={disabled}>\n    <a class="u-btn" r-class={ {\'z-dis\': disabled} } on-click={this.add(1)}><i class="u-icon u-icon-caret-up"></i></a>\n    <a class="u-btn" r-class={ {\'z-dis\': disabled} } on-click={this.add(-1)}><i class="u-icon u-icon-caret-down"></i></a>\n</label>\n{#if tip}<span class="u-tip u-tip-{type}">{tip}</span>{/if}'},function(t,e,i){"use strict";var n=i(2),s=i(23),a=i(3),r=n.extend({name:"check2",template:s,config:function(){a.extend(this.data,{name:"",checked:!1,block:!1}),this.supr()},check:function(t){this.data.readonly||this.data.disabled||(this.data.checked=t,this.$emit("check",{checked:t}))}});t.exports=r},function(t,e){t.exports="<label class=\"u-check2 {class}\" r-class={ {'z-dis': disabled, 'z-chk': checked, 'z-part': checked === null, 'u-check2-block': block} } r-hide={!visible} title={name} on-click={this.check(!checked)}><div class=\"check2_box\"><i class=\"u-icon u-icon-check\"></i></div> {name}</label>"},function(t,e,i){"use strict";var n=i(5),s=i(25),a=i(3),r=n.extend({name:"checkGroup",template:s,config:function(){a.extend(this.data,{block:!1}),this.supr()}});t.exports=r},function(t,e){t.exports='<div class="u-unitgroup {class}" r-hide={!visible}>\n    {#list source as item}\n    <label class="u-check2" r-class={ {\'z-dis\': disabled, \'u-check2-block\': block} } title={item.name}><input type="checkbox" class="u-check" r-model={item.checked} disabled={disabled}> {item.name}</label>\n    {/list}\n</div>'},function(t,e,i){"use strict";var n=i(24),s=i(27),a=(i(3),i(22),n.extend({name:"check2Group",template:s}));t.exports=a},function(t,e){t.exports='<div class="u-unitgroup {class}" r-hide={!visible}>\n    {#list source as item}\n    <check2 name={item.name} checked={item.checked} disabled={disabled} block={block} />\n    {/list}\n</div>'},function(t,e,i){"use strict";var n=i(5),s=i(29),a=i(3),r=n.extend({name:"radioGroup",template:s,config:function(){a.extend(this.data,{selected:null,_radioGroupId:new Date}),this.supr()},select:function(t){this.data.readonly||this.data.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))}});t.exports=r},function(t,e){t.exports='<div class="u-unitgroup {class}" r-hide={!visible}>\n    {#list source as item}\n    <label class="u-radio2" r-class={ {\'z-dis\': disabled, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><input type="radio" class="u-radio" name={_radioGroupId} disabled={disabled}> {item.name}</label>\n    {/list}\n</div>'},function(t,e,i){"use strict";var n=i(28),s=i(31),a=(i(3),n.extend({name:"radio2Group",template:s}));t.exports=a},function(t,e){t.exports='<div class="u-unitgroup {class}" r-hide={!visible}>\n    {#list source as item}\n    <label class="u-radio2" r-class={ {\'z-dis\': disabled, \'z-sel\': item === selected, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><div class="radio2_box"><i class="u-icon u-icon-radio"></i></div> {item.name}</label>\n    {/list}\n</div>'},function(t,e,i){"use strict";var n=i(11),s=i(33),a=i(3),r=n.extend({name:"select2",template:s,config:function(){a.extend(this.data,{selected:void 0,key:"id",value:void 0,placeholder:"请选择"}),this.supr(),this.$watch("selected",function(t,e){this.data.value=t?t[this.data.key]:t,this.$emit("change",{selected:t,key:this.data.key,value:this.data.value})}),this.$watch("value",function(t,e){return void 0===t||null===t?this.data.selected=t:void(this.data.source&&(this.data.selected&&this.data.selected[this.data.key]===t||(this.data.selected=this.data.source.find(function(e){return e[this.data.key]==t},this))))}),this.$watch("source",function(t,e){return t?!t.length||"string"!=typeof t[0]&&"number"!=typeof t[0]?(void 0!==this.data.value&&null!==this.data.value?this.data.selected=t.find(function(t){return t[this.data.key]==this.data.value},this):this.data.selected&&t.indexOf(this.data.selected)<0&&(this.data.selected=void 0),void(this.data.placeholder||this.data.selected||(this.data.selected=t[0]))):this.data.source=t.map(function(t,e){return{id:e,name:t}}):this.data.selected=t})},select:function(t){this.data.readonly||this.data.disabled||t&&(t.disabled||t.divider)||(this.data.selected=t,this.$emit("select",{selected:t}),this.toggle(!1))}});t.exports=r},function(t,e){t.exports='<div class="u-dropdown u-select2 {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" title={selected ? selected.name : placeholder} on-click={this.toggle(!open)}>\n        <i class="u-icon u-icon-caret-down"></i>\n        <span>{selected ? selected.name : placeholder}</span>\n    </div>\n    <div class="dropdown_bd" r-show={open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <ul class="m-listview">\n            {#if placeholder}<li r-class={ {\'z-sel\': !selected} } on-click={this.select(null)}>{placeholder}</li>{/if}\n            {#list source as item}\n            <li r-class={ {\'z-sel\': selected === item, \'z-dis\': item.disabled} } title={item.name} on-click={this.select(item)}>{item.name}</li>\n            {/list}\n        </ul>\n    </div>\n</div>'},function(t,e,i){"use strict";var n=i(2),s=i(35),a=i(3),r=n.extend({name:"select2Group",template:s,config:function(){a.extend(this.data,{depth:1,sources:[],selected:null,selectedItems:[],placeholders:[]}),this.supr(),this.$watch("selected",function(t,e){this.$emit("change",{selected:t,selectedItems:this.data.selectedItems})}),this.data.sources[0]=this.data.source},select:function(t,e){if(!(this.data.readonly||this.data.disabled||t&&(t.disabled||t.divider))){this.data.sources[e+1]=t?t.children:void 0;for(var i=e+2;i<this.data.depth;i++)this.data.sources[i]=void 0;this.$emit("select",{selected:t,level:e})}},change:function(t,e){e===this.data.depth-1&&(this.data.selected=t),this.data.selectedItems[e]=t}});t.exports=r},function(t,e){t.exports="<div class=\"u-select2Group {class}\" r-hide={!visible}>\n    {#list 0..(depth - 1) as i}\n    <select2 source={sources[i]} readonly={readonly} disabled={disabled} placeholder={placeholders[i] || '请选择'} on-select={this.select($event.selected, i)} on-change={this.change($event.selected, i)} />\n    {/list}\n</div>"},function(t,e,i){"use strict";var n=i(32),s=i(37),a=i(3),r=(i(38),n.extend({name:"treeSelect",template:s,config:function(){a.extend(this.data,{hierarchical:!1,updateAuto:!1}),this.supr()}}));t.exports=r},function(t,e){t.exports='<div class="u-dropdown u-select2 {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" title={selected ? selected.name : placeholder} on-click={this.toggle(!open)}>\n        <i class="u-icon u-icon-caret-down"></i>\n        <span>{selected ? selected.name : placeholder}</span>\n    </div>\n    <div class="dropdown_bd" r-show={open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <treeView source={source} hierarchical={hierarchical} service={service} on-select={this.select($event.selected)} />\n    </div>\n</div>'},function(t,e,i){"use strict";var n=i(5),s=i(39),a=i(40),r=i(3),o=n.extend({name:"treeView",template:s,config:function(){r.extend(this.data,{selected:null,multiple:!1,hierarchical:!1}),this.supr(),this.$ancestor=this},select:function(t){this.data.readonly||this.data.disabled||t.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))},toggle:function(t){this.data.readonly||this.data.disabled||t.disabled||(t.open=!t.open,this.$emit("toggle",{item:t,open:t.open}))}});n.extend({name:"treeViewList",template:a,config:function(){r.extend(this.data,{itemTemplate:null,visible:!1}),this.supr(),this.$ancestor=this.$parent.$ancestor,this.service=this.$ancestor.service,this.data.itemTemplate=this.$ancestor.data.itemTemplate,this.data.hierarchical=this.$ancestor.data.hierarchical,this.$watch("visible",function(t){this.data.hierarchical&&t&&"treeViewList"===this.$parent.name&&this.$updateSource(function(){this.data.hierarchical=!1})})},getParams:function(){return this.data.parent?r.extend({parentId:this.data.parent.id},this.$ancestor.getParams()):void 0},$updateSource:function(){return this.service.getList(this.getParams(),function(t){t.forEach(function(t){t.parent=this.data.parent}.bind(this)),this.$update("source",t),this.$emit("updateSource",{result:t})}.bind(this)),this},select:function(t){this.$ancestor.select(t)},toggle:function(t){this.$ancestor.toggle(t)}});t.exports=o},function(t,e){t.exports="<div class=\"m-treeview {class}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <treeViewList source={source} visible={true} />\n</div>"},function(t,e){t.exports="<ul class=\"treeview_list\" r-hide={!visible}>\n    {#list source as item}\n    <li>\n        <div class=\"treeview_item\">\n            {#if item.childrenCount || (item.children && item.children.length)}\n            <i class=\"u-icon\" r-class={ {'u-icon-caret-right': !item.open, 'u-icon-caret-down': item.open}} on-click={this.toggle(item)}></i>\n            {/if}\n            <div class=\"treeview_itemname\" r-class={ {'z-sel': this.$ancestor.data.selected === item, 'z-dis': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#inc @(itemTemplate)}{#else}{item.name}{/if}</div>\n        </div>\n        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}\n    </li>\n    {/list}\n</ul>"},function(t,e,i){"use strict";var n=i(11),s=i(42),a=i(3),r=n.extend({name:"suggest",template:s,config:function(){a.extend(this.data,{selected:null,value:"",placeholder:"请输入",minLength:0,delay:300,matchType:"all",strict:!1}),this.supr()},select:function(t){this.$update("selected",t),this.data.value=t.name,this.$emit("select",{selected:t}),this.toggle(!1)},toggle:function(t,e){if(!this.data.readonly&&!this.data.disabled){this.data.open=t,this.$emit("toggle",{open:t});var i=n.opens.indexOf(this);t&&0>i?n.opens.push(this):!t&&i>=0&&(n.opens.splice(i,1),!e&&this.data.strict&&(this.data.value=this.data.selected?this.data.selected.name:""))}},input:function(t){var e=this.data.value;e.length>=this.data.minLength?(this.toggle(!0),this.service&&this.$updateSource()):this.toggle(!1,!0)},uninput:function(t){},getParams:function(){return{value:this.data.value}},filter:function(t){var e=this.data.value;return!e&&this.data.minLength?!1:"all"===this.data.matchType?t.name.indexOf(e)>=0:"start"===this.data.matchType?t.name.slice(0,e.length)===e:"end"===this.data.matchType?t.name.slice(-e.length)===e:void 0}});t.exports=r},function(t,e){t.exports='<div class="u-dropdown u-suggest {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd">\n        <input class="u-input u-input-full" placeholder={placeholder} r-model={value} on-focus={this.input($event)} on-keyup={this.input($event)} on-blur={this.uninput($event)} ref="input" readonly={readonly} disabled={disabled}>\n    </div>\n    <div class="dropdown_bd" r-show={open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <ul class="m-listview">\n            {#list source as item}\n            {#if this.filter(item)}\n                <li title={item.name} on-click={this.select(item)}>{item.name}</li>\n            {/if}\n            {/list}\n        </ul>\n    </div>\n</div>'},function(t,e,i){"use strict";var n=i(2),s=i(44),a=i(3),r=n.extend({name:"uploader",template:s,config:function(){a.extend(this.data,{title:"",url:"",contentType:"multipart/form-data",dataType:"json",data:{},name:"file",extensions:null,_id:(new Date).getTime()}),this.supr()},upload:function(){this.data.disabled||this.$refs.file.click()},submit:function(){if(this.data.extensions){var t=this.$refs.file.value,e=t.substring(t.lastIndexOf(".")+1,t.length).toLowerCase(),i=this.data.extensions;if("string"==typeof i&&(i=i.split(",")),-1===i.indexOf(e))return this.$emit("error",{message:this.extensionError()})}this.$emit("sending",this.data.data),this.$refs.form.submit()},cbUpload:function(){function t(t,e){var i="xml"!=e&&e?t.responseText:t.responseXML;if("json"===e)try{i=JSON.parse(i)}catch(n){var s=/<pre.*?>(.*?)<\/pre>/.exec(i);s=s?s[1]:i,i=JSON.parse(s)}return i}var e=this.$refs.iframe,i={};try{e.contentWindow?(i.responseText=e.contentWindow.document.body?e.contentWindow.document.body.innerHTML:null,i.responseXML=e.contentWindow.document.XMLDocument?e.contentWindow.document.XMLDocument:e.contentWindow.document):e.contentDocument&&(i.responseText=e.contentDocument.document.body?e.contentDocument.document.body.innerHTML:null,i.responseXML=e.contentDocument.document.XMLDocument?e.contentDocument.document.XMLDocument:e.contentDocument.document)}catch(n){this.$emit("error",n)}return i.responseText?(this.$emit("success",t(i,this.data.dataType)),this.$emit("complete",i),void(this.$refs.file.value="")):this.$emit("error",{message:"No responseText!"})},extensionError:function(){return"只能上传"+this.data.extensions.join(", ")+"类型的文件！"}});t.exports=r},function(t,e){t.exports='<div class="u-uploader {class}" r-hide={!visible}>\n    <div on-click={this.upload()}>\n        {#if this.$body}\n            {#inc this.$body}\n        {#else}\n            <a class="u-btn">{title || \'上传\'}</a>\n        {/if}\n    </div>\n    <form method="POST" action={url} target="iframe{_id}" enctype={contentType} ref="form">\n        <input type="file" name={name} ref="file" on-change={this.submit()}>\n        {#list Object.keys(data) as key}\n        <input type="hidden" name={key} value={data[key]}>\n        {/list}\n    </form>\n    <iframe name="iframe{_id}" on-load={this.cbUpload()} ref="iframe">\n    </iframe>\n</div>'},function(t,e,i){var n=i(11),s=i(46),a=i(3),r=i(4),o=i(47),l=864e5,c=n.extend({name:"datePicker",template:s,config:function(){a.extend(this.data,{minDate:null,maxDate:null,placeholder:"请输入",date:null,_date:void 0}),this.supr(),this.$watch("date",function(t,e){if("string"==typeof t)return this.data.date=new Date(t);if("Invalid Date"==t)return this.data.date=null;if(t){var i=this.isOutOfRange(t);if(i)return this.data.date=i}!t||this.data._date&&this.data._date.toDateString()===t.toDateString()||(this.data._date=new Date(t)),this.$emit("change",{date:t})}),this.$watch("minDate",function(t,e){return t?"string"==typeof t?this.data.minDate=new Date(t):"Invalid Date"==t?this.data.minDate=null:void 0:void 0}),this.$watch("maxDate",function(t,e){return t?"string"==typeof t?this.data.maxDate=new Date(t):"Invalid Date"==t?this.data.maxDate=null:void 0:void 0}),this.$watch(["minDate","maxDate"],function(t,e){if(t&&t instanceof Date||e&&e instanceof Date){if(t&&e&&t/l>>0>e/l>>0)throw new o.DateRangeException(t,e);if(this.data.date){var i=this.isOutOfRange(this.data.date);if(i)return this.data.date=i}}})},select:function(t){this.data.readonly||this.data.disabled||this.isOutOfRange(t)||(this.data.date=t,this.$emit("select",{date:t}),this.toggle(!1))},_input:function(t){var e=t.target.value,i=e?new Date(e):null;"Invalid Date"!=i?this.data.date=i:t.target.value=r.format(this.data.date,"yyyy-MM-dd")},isOutOfRange:function(t){var e=this.data.minDate,i=this.data.maxDate,e=e&&new Date((e/l>>0)*l),i=i&&new Date((i/l>>0)*l);return e&&e>t&&e||i&&t>i&&i}});t.exports=c},function(t,e){t.exports='<div class="u-dropdown u-datepicker {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element" on-blur={this.toggle(false)}>\n    <div class="dropdown_hd">\n        <input class="u-input u-input-full" placeholder={placeholder} value={date | format: \'yyyy-MM-dd\'} on-focus={this.toggle(true)} on-change={this._input($event)} ref="input" readonly={readonly} disabled={disabled}>\n    </div>\n    <div class="dropdown_bd" r-show={open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <calendar date={_date} minDate={minDate} maxDate={maxDate} on-select={this.select($event.date)} />\n    </div>\n</div>'},function(t,e,i){"use strict";var n=i(2),s=i(48),a=i(3),r=864e5,o=n.extend({name:"calendar",template:s,config:function(){a.extend(this.data,{date:null,minDate:null,maxDate:null,_days:[]}),this.supr(),this.$watch("date",function(t,e){if("string"==typeof t)return this.data.date=new Date(t);if(!t||"Invalid Date"==t)return this.data.date=new Date((new Date/r>>0)*r);var i=this.isOutOfRange(t);return i?(this.data.date=i,void this._update()):(e&&e.getFullYear?(t.getFullYear()!==e.getFullYear()||t.getMonth()!==e.getMonth())&&this._update():this._update(),void this.$emit("change",{date:t}))}),this.$watch("minDate",function(t,e){return t?"string"==typeof t?this.data.minDate=new Date(t):"Invalid Date"==t?this.data.minDate=null:void 0:void 0}),this.$watch("maxDate",function(t,e){return t?"string"==typeof t?this.data.maxDate=new Date(t):"Invalid Date"==t?this.data.maxDate=null:void 0:void 0}),this.$watch(["minDate","maxDate"],function(t,e){if(t&&t instanceof Date||e&&e instanceof Date){if(t&&e&&t/r>>0>e/r>>0)throw new o.DateRangeException(t,e);var i=this.isOutOfRange(this.data.date);i&&(this.data.date=i)}})},_update:function(){this.data._days=[];var t=this.data.date,e=t.getMonth(),i=new Date(t);i.setDate(1);var n=+i,s=new Date(i);s.setMonth(e+1),s.setDate(1);var a,o,l=+s,c=l+((7-s.getDay())%7-1)*r,d=-i.getDay();do a=n+d++*r,o=new Date(a),this.data._days.push(o);while(c>a)},addYear:function(t){if(!this.data.readonly&&!this.data.disabled&&t){var e=new Date(this.data.date),i=e.getMonth();return e.setFullYear(e.getFullYear()+t),e.getMonth()!=i&&e.setDate(0),this.data.date=e}},addMonth:function(t){if(!this.data.readonly&&!this.data.disabled&&t){var e=new Date(this.data.date),i=e.getMonth()+t;return e.setMonth(i),(e.getMonth()-i)%12&&e.setDate(0),this.data.date=e}},select:function(t){this.data.readonly||this.data.disabled||this.isOutOfRange(t)||(this.data.date=new Date(t),this.$emit("select",{date:t}))},goToday:function(){this.data.readonly||this.data.disabled||(this.data.date=new Date((new Date/r>>0)*r))},isOutOfRange:function(t){var e=this.data.minDate,i=this.data.maxDate,e=e&&new Date((e/r>>0)*r),i=i&&new Date((i/r>>0)*r);return e&&e>t&&e||i&&t>i&&i}});o.DateRangeException=function(t,e){this.type="DateRangeException",this.message="Wrong Date Range where `minDate` is "+t+" and `maxDate` is "+e+"!"},o.DateRangeException.prototype.toString=function(){return this.message},t.exports=o},function(t,e){t.exports='<div class="u-calendar {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>\n    <div class="calendar_hd">\n        <span class="calendar_prev">\n            <span class="calendar_item" on-click={this.addYear(-1)}><i class="u-icon u-icon-angle-double-left"></i></span>\n            <span class="calendar_item" on-click={this.addMonth(-1)}><i class="u-icon u-icon-angle-left"></i></span>\n        </span>\n        <span>{date | format: \'yyyy-MM\'}</span>\n        <span class="calendar_next">\n            <span class="calendar_item" on-click={this.addMonth(1)}><i class="u-icon u-icon-angle-right"></i></span>\n            <span class="calendar_item" on-click={this.addYear(1)}><i class="u-icon u-icon-angle-double-right"></i></span>\n        </span>\n    </div>\n    <div class="calendar_bd">\n        <div class="calendar_week"><span class="calendar_item">日</span><span class="calendar_item">一</span><span class="calendar_item">二</span><span class="calendar_item">三</span><span class="calendar_item">四</span><span class="calendar_item">五</span><span class="calendar_item">六</span></div>\n        <div class="calendar_day">{#list _days as day}<span class="calendar_item" r-class={ {\'z-sel\': date.toDateString() === day.toDateString(), \'z-muted\': date.getMonth() !== day.getMonth(), \'z-dis\': !!this.isOutOfRange(day)} } on-click={this.select(day)}>{day | format: \'dd\'}</span>{/list}</div>\n        {#inc this.$body}\n    </div>\n</div>'},function(t,e,i){var n=i(2),s=i(50),a=i(3),r=(i(20),n.extend({name:"timePicker",template:s,config:function(){a.extend(this.data,{time:"00:00",hour:0,minute:0,minTime:"00:00",maxTime:"23:59"}),this.supr(),this.$watch("time",function(t,e){if(!t)throw new r.TimeFormatException(t);var i=this.isOutOfRange(t);return i?this.data.time=i:(time=t.split(":"),this.data.hour=+time[0],this.data.minute=+time[1],void this.$emit("change",{time:t}))}),this.$watch(["hour","minute"],function(t,e){t+="",e+="",this.data.time=(t.length>1?t:"0"+t)+":"+(e.length>1?e:"0"+e)}),this.$watch(["minTime","maxTime"],function(t,e){if(!t)throw new r.TimeFormatException(t);if(!e)throw new r.TimeFormatException(e);if(t>e)throw new r.TimeRangeException(t,e);var i=this.isOutOfRange(this.data.time);i&&(this.data.time=i)})},isOutOfRange:function(t){var e=this.data.minTime,i=this.data.maxTime;return e&&e>t&&e||i&&t>i&&i}}));r.TimeFormatException=function(t){this.message="Wrong Time Format: "+t+"!"},r.TimeFormatException.prototype.toString=function(){return this.message},r.TimeRangeException=function(t,e){this.type="TimeRangeException",this.message="Wrong Time Range where `minTime` is "+t+" and `maxTime` is "+e+"!"},r.TimeRangeException.prototype.toString=function(){return this.message},t.exports=r},function(t,e){t.exports='<span class="u-timepicker {class}" r-hide={!visible}>\n	<numberInput min="0" max="23" format="00" value={hour} readonly={readonly} disabled={disabled} />\n	<span>:</span>\n	<numberInput min="0" max="59" format="00" value={minute} readonly={readonly} disabled={disabled} />\n</span>'},function(t,e,i){var n=i(11),s=(i(45),i(52)),a=i(3),r=i(4),o=i(47),l=(i(49),n.extend({name:"dateTimePicker",template:s,config:function(){a.extend(this.data,{minDate:null,maxDate:null,placeholder:"请输入",date:null,_date:void 0,_time:void 0}),this.supr(),this.$watch("date",function(t,e){if("string"==typeof t)return this.data.date=new Date(t);if("Invalid Date"==t)return this.data.date=null;if(t){var i=this.isOutOfRange(t);if(i)return this.data.date=i}t&&t-e!==0&&(this.data.date.setSeconds(0),this.data.date.setMilliseconds(0),this.data._date=new Date(t),this.data._time=r.format(t,"HH:mm")),this.$emit("change",{date:t})}),this.$watch("minDate",function(t,e){return t?"string"==typeof t?this.data.minDate=new Date(t):"Invalid Date"==t?this.data.minDate=null:void 0:void 0}),this.$watch("maxDate",function(t,e){return t?"string"==typeof t?this.data.maxDate=new Date(t):"Invalid Date"==t?this.data.maxDate=null:void 0:void 0}),this.$watch(["minDate","maxDate"],function(t,e){if(t&&t instanceof Date||e&&e instanceof Date){if(t&&e&&t-e>0)throw new o.DateRangeException(t,e);if(this.data.date){var i=this.isOutOfRange(this.data.date);if(i)return this.data.date=i}}})},_update:function(t,e){return e?(t=new Date(t),e=e.split(":"),t.setHours(e[0]),t.setMinutes(e[1]),void(this.data.date=t)):this.data._time="00:00"},select:function(){},_input:function(t){var e=t.target.value,i=e?new Date(e):null;"Invalid Date"!=i?this.data.date=i:t.target.value=r.format(this.data.date,"yyyy-MM-dd HH:mm")},isOutOfRange:function(t){var e=this.data.minDate,i=this.data.maxDate;return e&&e>t&&e||i&&t>i&&i}}));t.exports=l},function(t,e){t.exports='<div class="u-dropdown u-datetimepicker {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd">\n        <input class="u-input u-input-full" placeholder={placeholder} value={date | format: \'yyyy-MM-dd HH:mm\'} on-focus={this.toggle(true)} on-change={this._input($event)} ref="input" readonly={readonly} disabled={disabled}>\n    </div>\n    <div class="dropdown_bd" r-show={open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <calendar minDate={minDate} maxDate={maxDate} date={_date} on-select={this._update($event.date, _time)}>\n            <timePicker time={_time} on-change={this._update(_date, _time)} />\n        </calendar>\n    </div>\n</div>'},function(t,e,i){"use strict";var n=i(2),s=i(54),a=i(3),r=n.extend({name:"progress",template:s,config:function(){a.extend(this.data,{percent:36,text:!0,size:null,state:null,striped:!1,active:!1}),this.supr()}});t.exports=r},function(t,e){t.exports="<div class=\"u-progress u-progress-{@(size)} u-progress-{@(state)} {class}\" r-class={ {'u-progress-striped': striped, 'z-act': active} } r-hide={!visible}>\n    <div class=\"progress_bar\" style=\"width: {percent}%;\">{text ? (text === true ? percent + '%' : text) : ''}</div>\n</div>"},function(t,e,i){"use strict";var n=i(2),s=i(56),a=i(3),r=n.extend({name:"loading",template:s,config:function(){a.extend(this.data,{"static":!1,visible:!1}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},show:function(){this.data.disabled||(this.data.visible=!0,this.$update())},hide:function(){this.data.disabled||(this.data.visible=!1,this.$update())}}),o=new r;r.loading=o,r.show=function(){o.show()},r.hide=function(){o.hide()},t.exports=r},function(t,e){t.exports='<div class="u-loading {class}" r-class={ {\'u-loading-static\': static} } r-hide={!visible}>\n    {#if this.$body}\n        {#inc this.$body}\n    {#else}\n        <i class="u-icon u-icon-spinner u-icon-spin"></i>\n    {/if}\n</div>'},function(t,e,i){"use strict";var n=i(2),s=i(58),a=i(3),r=n.extend({name:"gotop",template:s,config:function(){a.extend(this.data,{position:"bottomright"}),this.supr()},gotop:function(){this.data.disabled||(document.body.scrollTop=0)}});t.exports=r},function(t,e){t.exports='<a class="u-gotop u-gotop-{position} {class}" r-hide={!visible} on-click={this.gotop()}>\n    {#if this.$body}\n        {#inc this.$body}\n    {#else}\n        <i class="u-icon u-icon-arrow-up"></i>\n    {/if}\n</a>'},function(t,e,i){"use strict";var n=i(2),s=i(60),a=i(3),r=n.extend({name:"tabs",template:s,config:function(){a.extend(this.data,{tabs:[],selected:null}),this.supr()},select:function(t){this.data.readonly||this.data.disabled||t.data.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))}});n.extend({name:"tab",template:"<div r-hide={this.$outer.data.selected !== this}>{#inc this.$body}</div>",config:function(){a.extend(this.data,{title:""}),this.supr(),this.$outer&&this.$outer.data.tabs.push(this),this.$outer.data.selected||(this.$outer.data.selected=this)}});t.exports=r},function(t,e){t.exports="<div class=\"m-tabs {class}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <ul class=\"tabs_hd\">\n        {#list tabs as item}\n        <li r-class={ {'z-crt': item == selected, 'z-dis': item.data.disabled} } on-click={this.select(item)}>{item.data.title}</li>\n        {/list}\n    </ul>\n    <div class=\"tabs_bd\">\n        {#inc this.$body}\n    </div>\n</div>"},function(t,e,i){"use strict";var n=i(2),s=i(62),a=i(63),r=i(3),o=n.extend({name:"collapse",template:s,config:function(){r.extend(this.data,{panels:[],accordion:!1}),this.supr()}});n.extend({name:"panel",template:a,config:function(){r.extend(this.data,{title:"",open:!1}),this.supr(),this.$outer&&this.$outer.data.panels.push(this)},toggle:function(t){t&&this.$outer.data.accordion&&this.$outer.data.panels.forEach(function(t){t.data.open=!1}),this.data.open=t}});t.exports=o},function(t,e){t.exports="<div class=\"m-collapse {class}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    {#inc this.$body}\n</div>"},function(t,e){t.exports='<div class="m-panel {class}" r-hide={!visible}>\n    <div class="panel_hd" on-click={this.toggle(!open)}>{title}</div>\n    <div r-hide={!open} style="overflow: hidden" r-animation="on: enter; class: animated slideInY; on: leave; class: animated slideOutY;">\n        <div class="panel_bd">\n            {#inc this.$body}\n        </div>\n    </div>\n</div>'},function(t,e,i){var n=i(2),s=i(65),a=i(3),r=n.extend({name:"pager",template:s,config:function(){a.extend(this.data,{current:1,total:11,position:"center",middle:5,side:2,_start:1,_end:5}),this.supr(),this.$watch(["current","total"],function(t,e){this.data.current=t=+t,this.data.total=e=+e;var i=this.data.middle>>1,n=this.data.side;this.data._start=t-i,this.data._end=t+i,this.data._start<n+1&&(this.data._start=n+1),this.data._end>e-n&&(this.data._end=e-n),t-this.data._start<i&&(this.data._end+=this.data._start-t+i),this.data._end-t<i&&(this.data._start+=this.data._end-t-i)}),this.$watch(["middle","side"],function(t,e){this.data.middle=+t,this.data.side=+e})},select:function(t){this.data.readonly||this.data.disabled||1>t||t>this.data.total||t!=this.data.current&&(this.data.current=t,this.$emit("select",{current:this.data.current}))}});t.exports=r},function(t,e){t.exports="<ul class=\"m-pager m-pager-{@(position)} {class}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <li class=\"pager_prev\" r-class={ {'z-dis' : current <= 1} } on-click={this.select(current - 1)}><a>上一页</a></li>\n    {#if total - middle > side * 2 + 1}\n        {#list 1..side as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n        {#if _start > side + 1}<li><span>...</span></li>{/if}\n        {#list _start.._end as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n        {#if _end < total - side}<li><span>...</span></li>{/if}\n        {#list (total - side + 1)..total as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n    {#else}\n        {#list 1..total as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n    {/if}\n    <li class=\"pager_next\" r-class={ {'z-dis' : current >= total} } on-click={this.select(current + 1)}><a>下一页</a></li>\n</ul>";
	},function(t,e,i){"use strict";var n=i(2),s=i(67),a=i(3),r=n.extend({name:"modal",template:s,config:function(){a.extend(this.data,{title:"提示",content:"",okButton:!0,cancelButton:!1,width:null}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},close:function(t){this.$emit("close",{result:t}),t?this.ok():this.cancel()},ok:function(){this.$emit("ok"),this.destroy()},cancel:function(){this.$emit("cancel"),this.destroy()},keyup:function(t){13==t.which&&this.ok()}});r.alert=function(t,e,i){var n=new r({data:{content:t,title:e,okButton:i}});return n},r.confirm=function(t,e,i,n){var s=new r({data:{content:t,title:e,okButton:i,cancelButton:n||!0}});return s},t.exports=r},function(t,e){t.exports='<div class="m-modal {class}" on-keyup={this.keyup($event)} r-hide={!visible}>\n    <div class="modal_dialog" {#if width}style="width: {width}px"{/if}>\n        <div class="modal_hd">\n            <a class="modal_close" on-click={this.close(!cancelButton)}><i class="u-icon u-icon-close"></i></a>\n            <h3 class="modal_title">{title}</h3>\n        </div>\n        <div class="modal_bd">\n            {#if contentTemplate}{#inc @(contentTemplate)}{#else}{content}{/if}\n        </div>\n        <div class="modal_ft">\n            {#if okButton}\n            <button class="u-btn u-btn-primary" on-click={this.close(true)}>{okButton === true ? \'确定\' : okButton}</button>\n            {/if}\n            {#if cancelButton}\n            <button class="u-btn" on-click={this.close(false)}>{cancelButton === true ? \'取消\' : cancelButton}</button>\n            {/if}\n        </div>\n    </div>\n</div>'},function(t,e,i){"use strict";var n=i(5),s=i(69),a=i(3),r=n.extend({name:"listView",template:s,config:function(){a.extend(this.data,{selected:null,itemTemplate:null}),this.supr()},select:function(t){this.data.readonly||this.data.disabled||t.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))}});t.exports=r},function(t,e){t.exports="<ul class=\"m-listview {class}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    {#list source as item}\n    <li r-class={ {'z-sel': selected === item, 'z-dis': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#inc @(itemTemplate)}{#else}{item.name}{/if}</li>\n    {/list}\n</ul>"},function(t,e,i){"use strict";var n=i(2),s=i(71),a=i(3),r=n.extend({name:"modal",template:s,config:function(){a.extend(this.data,{title:"提示",content:"",okButton:!0,cancelButton:!1,width:null}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},close:function(t){this.$emit("close",{result:t}),t?this.ok():this.cancel(),this.destroy()},ok:function(){this.$emit("ok")},cancel:function(){this.$emit("cancel")}});t.exports=r},function(t,e){t.exports=""},function(t,e,i){"use strict";var n=i(2),s=i(73),a=i(3),r=n.extend({name:"htmlEditor",template:s,config:function(){a.extend(this.data,{content:""}),this.supr()},computed:{html:function(){return this.data.content}},bold:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<strong>"+t.text+"</strong>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},italic:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<em>"+t.text+"</em>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},quote:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<blockquote>"+t.text+"</blockquote>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ul:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<li>"+t.text+"</li>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ol:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<li>"+t.text+"</li>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},link:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text='<a href="#">'+t.text+"</a>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},image:function(){this.data.readonly||this.data.disabled||this.$refs.uploader.upload()},latex:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="$$a^2 + b^2 = c^2$$",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},uploaderSuccess:function(t){var e=this.getCursorPosition();e.text='<img src="'+t.result+'">',this.setCursorPosition(e),this.data.content=this.$refs.textarea.value,this.$update()},uploaderError:function(t){Notify.error(t)},getCursorPosition:function(){var t=this.$refs.textarea,e={text:"",start:0,end:0};if(t.focus(),t.setSelectionRange)e.start=t.selectionStart,e.end=t.selectionEnd,e.text=e.start!=e.end?t.value.substring(e.start,e.end):"";else if(document.selection){var i,n=document.selection.createRange(),s=document.body.createTextRange();for(s.moveToElementText(t),e.text=n.text,e.bookmark=n.getBookmark(),i=0;s.compareEndPoints("StartToStart",n)<0&&0!==n.moveStart("character",-1);i++)"\n"==t.value.charAt(i)&&i++;e.start=i,e.end=e.text.length+e.start}return e},setCursorPosition:function(t){if(!t)throw new Error("You must get cursor position first!");var e=this.$refs.textarea,i=e.value;if(e.value=i.substring(0,t.start)+t.text+i.substring(t.end,i.length),t.end=t.start+t.text.length,e.setSelectionRange)e.focus(),e.setSelectionRange(t.start,t.end);else if(e.createTextRange){var n=e.createTextRange();e.value.length===t.start?(n.collapse(!1),n.select()):(n.moveToBookmark(t.bookmark),n.select())}}});t.exports=r},function(t,e){t.exports='<div class="m-editor {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>\n    <div class="editor_preview" r-html={html}></div>\n    <ul class="m-toolbar editor_toolbar" r-class={ {\'z-dis\': disabled} }>\n        <li><a title="加粗" on-click={this.bold()}><i class="u-icon u-icon-bold"></i></a></li>\n        <li><a title="斜体" on-click={this.italic()}><i class="u-icon u-icon-italic"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="引用" on-click={this.quote()}><i class="u-icon u-icon-quote"></i></a></li>\n        <li><a title="无序列表" on-click={this.ul()}><i class="u-icon u-icon-list-ul"></i></a></li>\n        <li><a title="有序列表" on-click={this.ol()}><i class="u-icon u-icon-list-ol"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="链接" on-click={this.link()}><i class="u-icon u-icon-link"></i></a></li>\n        <li><a title="图片" on-click={this.image()}><i class="u-icon u-icon-image"></i></a></li>\n    </ul>\n    <textarea class="editor_textarea" r-model={content} ref="textarea" readonly={readonly} disabled={disabled}></textarea>\n</div>\n<uploader visible={false} url={imageUrl} extensions={extensions} ref="uploader" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />'},function(t,e,i){"use strict";var n=i(2),s=i(75),a=i(3),r=i(76),o=n.extend({name:"markEditor",template:s,config:function(){a.extend(this.data,{content:""}),this.supr()},computed:{html:function(){return r(this.data.content)}},bold:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="**"+t.text+"**",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},italic:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="*"+t.text+"*",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},quote:function(){if(!this.data.readonly&&!this.data.disabled){for(var t=this.getCursorPosition(),e=this.$refs.textarea.value,i=t.start-1;i>0;i--)if("\n"==e[i]){i++;break}t.start=i,t.text="> ",t.end=t.start,this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ul:function(){if(!this.data.readonly&&!this.data.disabled){for(var t=this.getCursorPosition(),e=this.$refs.textarea.value,i=t.start-1;i>0;i--)if("\n"==e[i]){i++;break}t.start=i,t.text="- ",t.end=t.start,this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ol:function(){if(!this.data.readonly&&!this.data.disabled){for(var t=this.getCursorPosition(),e=this.$refs.textarea.value,i=t.start-1;i>0;i--)if("\n"==e[i]){i++;break}t.start=i,t.text="1. ",t.end=t.start,this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},link:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="["+t.text+"](http://)",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},image:function(){this.data.readonly||this.data.disabled||this.$refs.uploader.upload()},latex:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="$$a^2 + b^2 = c^2$$",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},uploaderSuccess:function(t){var e=this.getCursorPosition();e.text="\n![]("+t.result+")",this.setCursorPosition(e),this.data.content=this.$refs.textarea.value,this.$update()},uploaderError:function(t){Notify.error(t)},getCursorPosition:function(){var t=this.$refs.textarea,e={text:"",start:0,end:0};if(t.focus(),t.setSelectionRange)e.start=t.selectionStart,e.end=t.selectionEnd,e.text=e.start!=e.end?t.value.substring(e.start,e.end):"";else if(document.selection){var i,n=document.selection.createRange(),s=document.body.createTextRange();for(s.moveToElementText(t),e.text=n.text,e.bookmark=n.getBookmark(),i=0;s.compareEndPoints("StartToStart",n)<0&&0!==n.moveStart("character",-1);i++)"\n"==t.value.charAt(i)&&i++;e.start=i,e.end=e.text.length+e.start}return e},setCursorPosition:function(t){if(!t)throw new Error("You must get cursor position first!");var e=this.$refs.textarea,i=e.value;if(e.value=i.substring(0,t.start)+t.text+i.substring(t.end,i.length),t.end=t.start+t.text.length,e.setSelectionRange)e.focus(),e.setSelectionRange(t.start,t.end);else if(e.createTextRange){var n=e.createTextRange();e.value.length===t.start?(n.collapse(!1),n.select()):(n.moveToBookmark(t.bookmark),n.select())}}});t.exports=o},function(t,e){t.exports='<div class="m-editor {class}" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>\n    <div class="editor_preview" r-html={html}></div>\n    <ul class="m-toolbar editor_toolbar" r-class={ {\'z-dis\': disabled} }>\n        <li><a title="加粗" on-click={this.bold()}><i class="u-icon u-icon-bold"></i></a></li>\n        <li><a title="斜体" on-click={this.italic()}><i class="u-icon u-icon-italic"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="引用" on-click={this.quote()}><i class="u-icon u-icon-quote"></i></a></li>\n        <li><a title="无序列表" on-click={this.ul()}><i class="u-icon u-icon-list-ul"></i></a></li>\n        <li><a title="有序列表" on-click={this.ol()}><i class="u-icon u-icon-list-ol"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="链接" on-click={this.link()}><i class="u-icon u-icon-link"></i></a></li>\n        <li><a title="图片" on-click={this.image()}><i class="u-icon u-icon-image"></i></a></li>\n        <li class="f-fr"><a title="帮助" href="http://www.jianshu.com/p/7bd23251da0a" target="_blank"><i class="u-icon u-icon-info"></i></a></li>\n    </ul>\n    <textarea class="editor_textarea" r-model={content} ref="textarea" readonly={readonly} disabled={disabled}></textarea>\n</div>\n<uploader visible={false} url={imageUrl} extensions={extensions} ref="uploader" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />'},function(t,e,i){(function(e){(function(){function e(t){this.tokens=[],this.tokens.links={},this.options=t||d.defaults,this.rules=u.normal,this.options.gfm&&(this.options.tables?this.rules=u.tables:this.rules=u.gfm)}function i(t,e){if(this.options=e||d.defaults,this.links=t,this.rules=h.normal,this.renderer=this.options.renderer||new n,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=h.breaks:this.rules=h.gfm:this.options.pedantic&&(this.rules=h.pedantic)}function n(t){this.options=t||{}}function s(t){this.tokens=[],this.token=null,this.options=t||d.defaults,this.options.renderer=this.options.renderer||new n,this.renderer=this.options.renderer,this.renderer.options=this.options}function a(t,e){return t.replace(e?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function r(t){return t.replace(/&([#\w]+);/g,function(t,e){return e=e.toLowerCase(),"colon"===e?":":"#"===e.charAt(0)?"x"===e.charAt(1)?String.fromCharCode(parseInt(e.substring(2),16)):String.fromCharCode(+e.substring(1)):""})}function o(t,e){return t=t.source,e=e||"",function i(n,s){return n?(s=s.source||s,s=s.replace(/(^|[^\[])\^/g,"$1"),t=t.replace(n,s),i):new RegExp(t,e)}}function l(){}function c(t){for(var e,i,n=1;n<arguments.length;n++){e=arguments[n];for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}function d(t,i,n){if(n||"function"==typeof i){n||(n=i,i=null),i=c({},d.defaults,i||{});var r,o,l=i.highlight,u=0;try{r=e.lex(t,i)}catch(h){return n(h)}o=r.length;var p=function(t){if(t)return i.highlight=l,n(t);var e;try{e=s.parse(r,i)}catch(a){t=a}return i.highlight=l,t?n(t):n(null,e)};if(!l||l.length<3)return p();if(delete i.highlight,!o)return p();for(;u<r.length;u++)!function(t){return"code"!==t.type?--o||p():l(t.text,t.lang,function(e,i){return e?p(e):null==i||i===t.text?--o||p():(t.text=i,t.escaped=!0,void(--o||p()))})}(r[u])}else try{return i&&(i=c({},d.defaults,i)),s.parse(e.lex(t,i),i)}catch(h){if(h.message+="\nPlease report this to https://github.com/chjj/marked.",(i||d.defaults).silent)return"<p>An error occured:</p><pre>"+a(h.message+"",!0)+"</pre>";throw h}}var u={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:l,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:l,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:l,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};u.bullet=/(?:[*+-]|\d+\.)/,u.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,u.item=o(u.item,"gm")(/bull/g,u.bullet)(),u.list=o(u.list)(/bull/g,u.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+u.def.source+")")(),u.blockquote=o(u.blockquote)("def",u.def)(),u._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",u.html=o(u.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,u._tag)(),u.paragraph=o(u.paragraph)("hr",u.hr)("heading",u.heading)("lheading",u.lheading)("blockquote",u.blockquote)("tag","<"+u._tag)("def",u.def)(),u.normal=c({},u),u.gfm=c({},u.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),u.gfm.paragraph=o(u.paragraph)("(?!","(?!"+u.gfm.fences.source.replace("\\1","\\2")+"|"+u.list.source.replace("\\1","\\3")+"|")(),u.tables=c({},u.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),e.rules=u,e.lex=function(t,i){var n=new e(i);return n.lex(t)},e.prototype.lex=function(t){return t=t.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(t,!0)},e.prototype.token=function(t,e,i){for(var n,s,a,r,o,l,c,d,h,t=t.replace(/^ +$/gm,"");t;)if((a=this.rules.newline.exec(t))&&(t=t.substring(a[0].length),a[0].length>1&&this.tokens.push({type:"space"})),a=this.rules.code.exec(t))t=t.substring(a[0].length),a=a[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?a:a.replace(/\n+$/,"")});else if(a=this.rules.fences.exec(t))t=t.substring(a[0].length),this.tokens.push({type:"code",lang:a[2],text:a[3]||""});else if(a=this.rules.heading.exec(t))t=t.substring(a[0].length),this.tokens.push({type:"heading",depth:a[1].length,text:a[2]});else if(e&&(a=this.rules.nptable.exec(t))){for(t=t.substring(a[0].length),l={type:"table",header:a[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:a[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:a[3].replace(/\n$/,"").split("\n")},d=0;d<l.align.length;d++)/^ *-+: *$/.test(l.align[d])?l.align[d]="right":/^ *:-+: *$/.test(l.align[d])?l.align[d]="center":/^ *:-+ *$/.test(l.align[d])?l.align[d]="left":l.align[d]=null;for(d=0;d<l.cells.length;d++)l.cells[d]=l.cells[d].split(/ *\| */);this.tokens.push(l)}else if(a=this.rules.lheading.exec(t))t=t.substring(a[0].length),this.tokens.push({type:"heading",depth:"="===a[2]?1:2,text:a[1]});else if(a=this.rules.hr.exec(t))t=t.substring(a[0].length),this.tokens.push({type:"hr"});else if(a=this.rules.blockquote.exec(t))t=t.substring(a[0].length),this.tokens.push({type:"blockquote_start"}),a=a[0].replace(/^ *> ?/gm,""),this.token(a,e,!0),this.tokens.push({type:"blockquote_end"});else if(a=this.rules.list.exec(t)){for(t=t.substring(a[0].length),r=a[2],this.tokens.push({type:"list_start",ordered:r.length>1}),a=a[0].match(this.rules.item),n=!1,h=a.length,d=0;h>d;d++)l=a[d],c=l.length,l=l.replace(/^ *([*+-]|\d+\.) +/,""),~l.indexOf("\n ")&&(c-=l.length,l=this.options.pedantic?l.replace(/^ {1,4}/gm,""):l.replace(new RegExp("^ {1,"+c+"}","gm"),"")),this.options.smartLists&&d!==h-1&&(o=u.bullet.exec(a[d+1])[0],r===o||r.length>1&&o.length>1||(t=a.slice(d+1).join("\n")+t,d=h-1)),s=n||/\n\n(?!\s*$)/.test(l),d!==h-1&&(n="\n"===l.charAt(l.length-1),s||(s=n)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(l,!1,i),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(a=this.rules.html.exec(t))t=t.substring(a[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===a[1]||"script"===a[1]||"style"===a[1]),text:a[0]});else if(!i&&e&&(a=this.rules.def.exec(t)))t=t.substring(a[0].length),this.tokens.links[a[1].toLowerCase()]={href:a[2],title:a[3]};else if(e&&(a=this.rules.table.exec(t))){for(t=t.substring(a[0].length),l={type:"table",header:a[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:a[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:a[3].replace(/(?: *\| *)?\n$/,"").split("\n")},d=0;d<l.align.length;d++)/^ *-+: *$/.test(l.align[d])?l.align[d]="right":/^ *:-+: *$/.test(l.align[d])?l.align[d]="center":/^ *:-+ *$/.test(l.align[d])?l.align[d]="left":l.align[d]=null;for(d=0;d<l.cells.length;d++)l.cells[d]=l.cells[d].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(l)}else if(e&&(a=this.rules.paragraph.exec(t)))t=t.substring(a[0].length),this.tokens.push({type:"paragraph",text:"\n"===a[1].charAt(a[1].length-1)?a[1].slice(0,-1):a[1]});else if(a=this.rules.text.exec(t))t=t.substring(a[0].length),this.tokens.push({type:"text",text:a[0]});else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0));return this.tokens};var h={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:l,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:l,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};h._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,h._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,h.link=o(h.link)("inside",h._inside)("href",h._href)(),h.reflink=o(h.reflink)("inside",h._inside)(),h.normal=c({},h),h.pedantic=c({},h.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),h.gfm=c({},h.normal,{escape:o(h.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:o(h.text)("]|","~]|")("|","|https?://|")()}),h.breaks=c({},h.gfm,{br:o(h.br)("{2,}","*")(),text:o(h.gfm.text)("{2,}","*")()}),i.rules=h,i.output=function(t,e,n){var s=new i(e,n);return s.output(t)},i.prototype.output=function(t){for(var e,i,n,s,r="";t;)if(s=this.rules.escape.exec(t))t=t.substring(s[0].length),r+=s[1];else if(s=this.rules.autolink.exec(t))t=t.substring(s[0].length),"@"===s[2]?(i=":"===s[1].charAt(6)?this.mangle(s[1].substring(7)):this.mangle(s[1]),n=this.mangle("mailto:")+i):(i=a(s[1]),n=i),r+=this.renderer.link(n,null,i);else if(this.inLink||!(s=this.rules.url.exec(t))){if(s=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),t=t.substring(s[0].length),r+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):a(s[0]):s[0];else if(s=this.rules.link.exec(t))t=t.substring(s[0].length),this.inLink=!0,r+=this.outputLink(s,{href:s[2],title:s[3]}),this.inLink=!1;else if((s=this.rules.reflink.exec(t))||(s=this.rules.nolink.exec(t))){if(t=t.substring(s[0].length),e=(s[2]||s[1]).replace(/\s+/g," "),e=this.links[e.toLowerCase()],!e||!e.href){r+=s[0].charAt(0),t=s[0].substring(1)+t;continue}this.inLink=!0,r+=this.outputLink(s,e),this.inLink=!1}else if(s=this.rules.strong.exec(t))t=t.substring(s[0].length),r+=this.renderer.strong(this.output(s[2]||s[1]));else if(s=this.rules.em.exec(t))t=t.substring(s[0].length),r+=this.renderer.em(this.output(s[2]||s[1]));else if(s=this.rules.code.exec(t))t=t.substring(s[0].length),r+=this.renderer.codespan(a(s[2],!0));else if(s=this.rules.br.exec(t))t=t.substring(s[0].length),r+=this.renderer.br();else if(s=this.rules.del.exec(t))t=t.substring(s[0].length),r+=this.renderer.del(this.output(s[1]));else if(s=this.rules.text.exec(t))t=t.substring(s[0].length),r+=this.renderer.text(a(this.smartypants(s[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else t=t.substring(s[0].length),i=a(s[1]),n=i,r+=this.renderer.link(n,null,i);return r},i.prototype.outputLink=function(t,e){var i=a(e.href),n=e.title?a(e.title):null;return"!"!==t[0].charAt(0)?this.renderer.link(i,n,this.output(t[1])):this.renderer.image(i,n,a(t[1]))},i.prototype.smartypants=function(t){return this.options.smartypants?t.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):t},i.prototype.mangle=function(t){if(!this.options.mangle)return t;for(var e,i="",n=t.length,s=0;n>s;s++)e=t.charCodeAt(s),Math.random()>.5&&(e="x"+e.toString(16)),i+="&#"+e+";";return i},n.prototype.code=function(t,e,i){if(this.options.highlight){var n=this.options.highlight(t,e);null!=n&&n!==t&&(i=!0,t=n)}return e?'<pre><code class="'+this.options.langPrefix+a(e,!0)+'">'+(i?t:a(t,!0))+"\n</code></pre>\n":"<pre><code>"+(i?t:a(t,!0))+"\n</code></pre>"},n.prototype.blockquote=function(t){return"<blockquote>\n"+t+"</blockquote>\n"},n.prototype.html=function(t){return t},n.prototype.heading=function(t,e,i){return"<h"+e+' id="'+this.options.headerPrefix+i.toLowerCase().replace(/[^\w]+/g,"-")+'">'+t+"</h"+e+">\n"},n.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},n.prototype.list=function(t,e){var i=e?"ol":"ul";return"<"+i+">\n"+t+"</"+i+">\n"},n.prototype.listitem=function(t){return"<li>"+t+"</li>\n"},n.prototype.paragraph=function(t){return"<p>"+t+"</p>\n"},n.prototype.table=function(t,e){return"<table>\n<thead>\n"+t+"</thead>\n<tbody>\n"+e+"</tbody>\n</table>\n"},n.prototype.tablerow=function(t){return"<tr>\n"+t+"</tr>\n"},n.prototype.tablecell=function(t,e){var i=e.header?"th":"td",n=e.align?"<"+i+' style="text-align:'+e.align+'">':"<"+i+">";return n+t+"</"+i+">\n"},n.prototype.strong=function(t){return"<strong>"+t+"</strong>"},n.prototype.em=function(t){return"<em>"+t+"</em>"},n.prototype.codespan=function(t){return"<code>"+t+"</code>"},n.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},n.prototype.del=function(t){return"<del>"+t+"</del>"},n.prototype.link=function(t,e,i){if(this.options.sanitize){try{var n=decodeURIComponent(r(t)).replace(/[^\w:]/g,"").toLowerCase()}catch(s){return""}if(0===n.indexOf("javascript:")||0===n.indexOf("vbscript:"))return""}var a='<a href="'+t+'"';return e&&(a+=' title="'+e+'"'),a+=">"+i+"</a>"},n.prototype.image=function(t,e,i){var n='<img src="'+t+'" alt="'+i+'"';return e&&(n+=' title="'+e+'"'),n+=this.options.xhtml?"/>":">"},n.prototype.text=function(t){return t},s.parse=function(t,e,i){var n=new s(e,i);return n.parse(t)},s.prototype.parse=function(t){this.inline=new i(t.links,this.options,this.renderer),this.tokens=t.reverse();for(var e="";this.next();)e+=this.tok();return e},s.prototype.next=function(){return this.token=this.tokens.pop()},s.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},s.prototype.parseText=function(){for(var t=this.token.text;"text"===this.peek().type;)t+="\n"+this.next().text;return this.inline.output(t)},s.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var t,e,i,n,s,a="",r="";for(i="",t=0;t<this.token.header.length;t++)n={header:!0,align:this.token.align[t]},i+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(a+=this.renderer.tablerow(i),t=0;t<this.token.cells.length;t++){for(e=this.token.cells[t],i="",s=0;s<e.length;s++)i+=this.renderer.tablecell(this.inline.output(e[s]),{header:!1,align:this.token.align[s]});r+=this.renderer.tablerow(i)}return this.renderer.table(a,r);case"blockquote_start":for(var r="";"blockquote_end"!==this.next().type;)r+=this.tok();return this.renderer.blockquote(r);case"list_start":for(var r="",o=this.token.ordered;"list_end"!==this.next().type;)r+=this.tok();return this.renderer.list(r,o);case"list_item_start":for(var r="";"list_item_end"!==this.next().type;)r+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(r);case"loose_item_start":for(var r="";"list_item_end"!==this.next().type;)r+=this.tok();return this.renderer.listitem(r);case"html":var l=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(l);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},l.exec=l,d.options=d.setOptions=function(t){return c(d.defaults,t),d},d.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new n,xhtml:!1},d.Parser=s,d.parser=s.parse,d.Renderer=n,d.Lexer=e,d.lexer=e.lex,d.InlineLexer=i,d.inlineLexer=i.output,d.parse=d,t.exports=d}).call(function(){return this||("undefined"!=typeof window?window:e)}())}).call(e,function(){return this}())}])});

/***/ }
/******/ ])
});
;