/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 101);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.4.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5),
    core = __webpack_require__(0),
    hide = __webpack_require__(28),
    redefine = __webpack_require__(79),
    ctx = __webpack_require__(25),
    PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F,
      IS_GLOBAL = type & $export.G,
      IS_STATIC = type & $export.S,
      IS_PROTO = type & $export.P,
      IS_BIND = type & $export.B,
      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
      key,
      own,
      out,
      exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(14),
    defined = __webpack_require__(6);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    is: function is(o, type) {
        var isnan = { "NaN": 1, "Infinity": 1, "-Infinity": 1 };
        type = type.toLowerCase();

        // {"NaN": 1, "Infinity": 1, "-Infinity": 1}.hasOwnProperty(2)   -> false
        // {"NaN": 1, "Infinity": 1, "-Infinity": 1}.hasOwnProperty(NaN) -> true
        if (type == "finite") {
            return !isnan["hasOwnProperty"](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return type == "null" && o === null ||
        // is(undefined,'undefined')
        type == (typeof o === "undefined" ? "undefined" : _typeof(o)) && o !== null ||
        // Object(Object) == Object -> true
        // Object({}) == {}         -> false
        type == "object" && o === Object(o) || type == "array" && Array.isArray && Array.isArray(o) || Object.prototype.toString.call(o).slice(8, -1).toLowerCase() == type;
    },

    uniqid: function uniqid() {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


        var length = 8;
        var timestamp = +new Date();

        var _getRandomInt = function _getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var ts = timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return prefix + id;
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var _ = exports;

_.type = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
};

_.isArray = function isArray(list) {
  return _.type(list) === 'Array';
};

_.isString = function isString(list) {
  return _.type(list) === 'String';
};

_.each = function each(array, fn) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i);
  }
};

_.toArray = function toArray(listLike) {
  if (!listLike) {
    return [];
  }

  var list = [];

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i]);
  }

  return list;
};

_.setAttr = function setAttr(node, key, value) {
  switch (key) {
    case 'style':
      node.style.cssText = value;
      break;
    case 'value':
      var tagName = node.tagName || '';
      tagName = tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        node.value = value;
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value);
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13),
    IE8_DOM_DEFINE = __webpack_require__(29),
    toPrimitive = __webpack_require__(36),
    dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys'),
    uid = __webpack_require__(19);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(4);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    arg ? method.call(null, function () {}, 1) : method.call(null);
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil,
    floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var id = 0,
    px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {



var document = window.document;
var fns = [];
var args = [];
var isReady = false;
var errorHandler = null;

/**
 * Call a ready handler
 * @private
 * @param {function} fn
 */
var call = function call(fn) {
    try {
        // call function
        fn.apply(this, args);
    } catch (e) {
        try {
            console.error(e);
        } catch (e) {}

        // error occured while executing function
        if (errorHandler !== null) {
            errorHandler.call(this, e);
        }
    }
};

/**
 * Call all ready handlers
 * @private
 */
var run = function run() {
    var x;

    isReady = true;

    // call all registered functions
    for (x = 0; x < fns.length; x = x + 1) {
        call(fns[x]);
    }

    // clear handlers
    fns = [];
};

/**
 * Initialize
 * @private
 */
var init = function init() {
    if (window.addEventListener) {
        // for all browsers except IE
        document.addEventListener('DOMContentLoaded', function () {
            run();
        }, false);
    } else {
        // for IE
        // code taken from http://javascript.nwbox.com/IEContentLoaded/
        var poll = function poll() {
            // check IE's proprietary DOM members
            if (!document.uniqueID && document.expando) {
                return;
            }

            // you can create any tagName, even customTag like <document :ready />
            var tempNode = document.createElement('document:ready');

            try {
                // see if it throws errors until after ondocumentready
                tempNode.doScroll('left');

                // call run
                run();
            } catch (e) {
                window.setTimeout(poll, 10);
            }
        };

        // trying to always fire before onload
        document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
                document.onreadystatechange = null;
                run();
            }
        };

        poll();
    }
};

/**
 * @namespace domReady
 *
 * @public
 * @param {function} fn
 * @return {domReady}
 */
var domReady = function domReady(fn) {
    return domReady.on(fn);
};

/**
 * Add code or function to execute when the DOM is ready
 * @public
 * @param {function} fn
 * @return {domReady}
 */
domReady.on = function (fn) {
    // call imediately when DOM is already ready
    if (isReady) {
        call(fn);
    } else {
        // add to the list
        fns[fns.length] = fn;
    }

    return this;
};

/**
 * Set params that will be passed to every ready handler
 * @public
 * @param {Array.<*>} params
 * @return {domReady}
 */
domReady.params = function (params) {
    args = params;
    return this;
};

/**
 * Set error callback
 * @public
 * @param {function([Error|string])} fn
 * @return {domReady}
 */
domReady.error = function (fn) {
    errorHandler = fn;
    return this;
};

// initialize
init();

// make global
module.exports = domReady;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(12);

var REPLACE = 0;
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;

function patch(node, patches) {
  var walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index];

  var len = node.childNodes ? node.childNodes.length : 0;
  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches);
  }
}

function applyPatches(node, currentPatches) {
  _.each(currentPatches, function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
        node.parentNode.replaceChild(newNode, node);
        break;
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content;
        } else {
          // fuck ie
          node.nodeValue = currentPatch.content;
        }
        break;
      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  });
}

function setProps(node, props) {
  for (var key in props) {
    if (props[key] === void 666) {
      node.removeAttribute(key);
    } else {
      var value = props[key];
      _.setAttr(node, key, value);
    }
  }
}

function reorderChildren(node, moves) {
  var staticNodeList = _.toArray(node.childNodes);
  var maps = {};

  _.each(staticNodeList, function (node) {
    if (node.nodeType === 1) {
      var key = node.getAttribute('key');
      if (key) {
        maps[key] = node;
      }
    }
  });

  _.each(moves, function (move) {
    var index = move.index;
    if (move.type === 0) {
      // remove item
      if (staticNodeList[index] === node.childNodes[index]) {
        // maybe have been removed for inserting
        node.removeChild(node.childNodes[index]);
      }
      staticNodeList.splice(index, 1);
    } else if (move.type === 1) {
      // insert item
      var insertNode = maps[move.item.key] ? maps[move.item.key] // reuse old item
      : _typeof(move.item) === 'object' ? move.item.render() : document.createTextNode(move.item);
      staticNodeList.splice(index, 0, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || null);
    }
  });
}

patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;

module.exports = patch;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(9),
    toLength = __webpack_require__(35),
    toIndex = __webpack_require__(83);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this),
        length = toLength(O.length),
        index = toIndex(fromIndex, length),
        value;
    // Array#includes uses SameValueZero equality algorithm
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      if (value != value) return true;
      // Array#toIndex ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(25),
    IObject = __webpack_require__(14),
    toObject = __webpack_require__(10),
    toLength = __webpack_require__(35),
    asc = __webpack_require__(69);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1,
      IS_FILTER = TYPE == 2,
      IS_SOME = TYPE == 3,
      IS_EVERY = TYPE == 4,
      IS_FIND_INDEX = TYPE == 6,
      NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
      create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this),
        self = IObject(O),
        f = ctx(callbackfn, that, 3),
        length = toLength(self.length),
        index = 0,
        result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
        val,
        res;
    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return val; // find
              case 6:
                return index; // findIndex
              case 2:
                result.push(val); // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(67);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8),
    document = __webpack_require__(5).document
// in old IE typeof document.createElement is 'object'
,
    is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15),
    createDesc = __webpack_require__(33);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(78),
    enumBugKeys = __webpack_require__(27);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1),
    core = __webpack_require__(0),
    fails = __webpack_require__(4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY],
      exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5),
    SHARED = '__core-js_shared__',
    store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(18),
    min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(11);

var htmlspecialchars_decode = __webpack_require__(53);

var component = function () {
    function component(domNode) {
        var cleanDom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, component);

        this.$tpl = domNode.outerHTML.replace(/[\r\n]/g, "");
        this.$rootTag = domNode.getAttribute('f-tag') || 'div';
        this.$tpl = this.$tpl.replace(/^<script/gi, "<" + this.$rootTag).replace(/<\/script>/gi, "</" + this.$rootTag + '>');
        this.initFactory();

        if (cleanDom) {
            domNode.parentNode.removeChild(domNode);
        }
    }

    _createClass(component, [{
        key: 'initFactory',
        value: function initFactory() {
            var keywords = ['if', 'for', 'else if', 'else'].map(function (item) {
                return '^\\s*(' + item + ')';
            });
            var regexp = new RegExp(keywords.join("|"));
            console.log(regexp);
            var code = 'this.$factory = (function($data,uuid){ if(!$data){$data = {};} if(uuid == null){ uuid = Cmay.set($data);} $data.toString = function(){return "Cmay.get(\'"+uuid+"\')"; };  var _uuid = uuid; var $current; with($data){ var $last = []; var buffer = []; buffer.push(\'';
            var count = -1;
            var target = -1;
            var spaceRegex = "[\\s\\n\\r\\t]*";
            var charRegex = "[^\\s\\n\\r\\t\\|]";
            var filterInfoRegex = spaceRegex + '(' + charRegex + '+)' + spaceRegex + '([^\\|]*)';
            var filterRegex = new RegExp('\\|' + filterInfoRegex, 'g');
            filterInfoRegex = new RegExp(filterInfoRegex);

            var code2 = this.$tpl.replace(/\{([\s\S]+?)\}|[^\{]+/g, function (matched, a) {

                if (!a) {
                    return matched.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
                } else {
                    a = htmlspecialchars_decode(a.trim());
                }

                var _matched;

                if (a == 'end' || a == '}') {
                    count--;
                    if (count == target) {
                        target = -1;
                        return '\');' + '} } _uuid = $last.pop(); $current = "Cmay.get(\\\'"+_uuid+"\\\')";' + " buffer.push(\'";
                    } else {
                        return '\');' + '}' + " buffer.push(\'";
                    }
                } else if (_matched = a.match(/(?:for|each)\s*(\w+)?(?:,\s*(\w+))?\s*in\s*([^\}\{]+)/)) {
                    if (!_matched[2]) {
                        _matched[2] = '__index';
                    }
                    if (!_matched[1]) {
                        _matched[1] = '__item';
                    }
                    //taget = -1;
                    //count = 0
                    // alert('now is' + target)
                    target = count++;
                    // alert('now is' + target)
                    return '\');' + (' \n                    $last.push(_uuid);\n                    for(var ' + _matched[2] + ' in ' + _matched[3] + '){ \n                        var ' + _matched[1] + ' = ' + _matched[3] + '[' + _matched[2] + '];  \n                        if(typeof ' + _matched[1] + ' == \'function\'){ \n                            continue; \n                        } \n                        _uuid = Cmay.set(' + _matched[1] + ');\n                        $current = "Cmay.get(\\\'"+_uuid+"\\\')";\n                        with(' + _matched[1] + '){\n                            buffer.push(\'');
                    //console.log(_matched)
                } else if (_matched = a.match(regexp)) {
                    switch (_matched[0]) {
                        case 'for':
                        case 'if':
                            count++;
                            return '\'); ' + _matched[0] + '(' + a.replace(regexp, "") + "){ buffer.push(\'";
                        case 'else':
                            return '\'); }' + a + "{ buffer.push(\'";

                        case 'else if':
                            return '\'); }else if(' + a.replace(regexp, "") + "){ buffer.push(\'";

                    }
                    return '\');' + a + " buffer.push(\'";
                } else {
                    var filters = [];
                    a = a.replace(filterRegex, function (matched) {
                        matched = matched.match(filterInfoRegex);
                        if (matched) {
                            filters.push([matched[1], matched[2]]);
                        }
                        return '';
                    });

                    filters.forEach(function (filter) {
                        a = 'Cmay.getFilter(\'' + filter[0] + '\').call(null,' + a + ',\'' + filter[1] + '\')';
                        console.log(a);
                    });

                    try {
                        return '\'); buffer.push(' + a + ');buffer.push(\'';
                    } catch (e) {
                        return '\'); buffer.push(' + ');buffer.push(\'';
                    }
                }
                /*
                if(/^for\b/.test(a) || ){
                  }
                if (a.indexOf('for') > -1 || a.indexOf('}') > -1) {
                    return '\');' + a + " buffer.push(\'";
                }
                else {
                    
                }
                */
            });

            var finalCode = code + code2 + '\'); } var ret = buffer.join(""); ret = ret.replace(/^(<[^\\s>]+)/,"$1 data-uuid=" + uuid); console.log(ret); return ret; });';
            console.log(finalCode);
            eval(finalCode);
        }
    }]);

    return component;
}();

module.exports = component;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = {
    fps: 60
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(11);
var config = __webpack_require__(38);

var hasProxy = false;
var _Proxy = hasProxy && window.Proxy || function () {
    var list = [];
    var lastLength = -1;
    var copy = function copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    };

    var frame = function frame(flag) {
        var callback = function callback() {
            for (var i = 0; i < list.length; i++) {
                list[i].dirtyCheck();
            }
            if (flag) {
                window.requestAnimationFrame(callback);
            }
        };
        return callback;
    };

    window.requestAnimationFrame && window.requestAnimationFrame(frame(true)) || setInterval(frame(false), config.fps);;

    return function (target, handler) {
        var _source = JSON.stringify(target);

        this.dirtyCheck = function () {
            var now = JSON.stringify(target);
            if (now.length != _source.length) {
                handler.set.call();
            } else if (now != _source) {
                handler.set.call();
            }
            _source = now;

            return;
        };

        list.push(this);
        return target;
    };
}();

function proxyFactory(data, widget) {
    var handler = {
        set: function set(obj, key, val, proxy) {
            if (hasProxy) {
                if (val && utils.is(val, 'array')) {
                    obj[key] = proxyFactory(val, widget);
                } else if (val && utils.is(val, 'object')) {
                    obj[key] = proxyFactory(val, widget);
                } else {
                    obj[key] = val;
                }
            }

            widget.render();

            return true;
        }
    };

    var proxy = new _Proxy(data, handler);
    if (hasProxy) {
        for (var i in proxy) {
            proxy[i] = proxy[i];
        }
        return proxy;
    } else {
        return data;
    }
}

function watchFactory(data, callback) {
    var proxy = new _Proxy(data, { set: callback });
    return data;
}

module.exports.proxyFactory = proxyFactory;
module.exports.watchFactory = watchFactory;

/***/ }),
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
__webpack_require__(62);
__webpack_require__(61);
__webpack_require__(64);
__webpack_require__(63);
__webpack_require__(57);
__webpack_require__(59);
__webpack_require__(66);
__webpack_require__(65);
__webpack_require__(58);

__webpack_require__(95);
__webpack_require__(97);
__webpack_require__(96);

Cmay.bootstrap();

/*
var component = require('./component');
var widget = require("./widget");
var domready = require('./domready');

var list = [];
var components = {};

domready(function(){
    
    //扫描所有组件
    var elems = document.querySelectorAll("[c-widget]");
    for(var i = 0; i < elems.length; i++){
        var widgetName = elems[i].getAttribute('c-widget');
        if(widgetName == '' || widgetName == null){
            continue;
        }
        if(components[widgetName]){
            continue;
        }

        components[widgetName] = new component(elems[i],widgetName);
        
    }

    //扫描所有需要渲染的组件
    var elems = document.querySelectorAll("[c-tpl]");
    for(var i = 0; i < elems.length; i++){
        list.push(new widget(elems[i]));
    }

    //渲染组件
    for(var i in components){
        var elems = document.getElementsByTagName(i);
        console.log(elems)
        for(var j = 0; j < elems.length; j++){

        }
        
    }
});

*/

/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {



/**
 * Module dependencies.
 */
var utilities = __webpack_require__(44);
var formatDOM = utilities.formatDOM;

/**
 * Parse HTML string to DOM nodes.
 * This uses the browser DOM API.
 *
 * @param  {String} html - The HTML.
 * @return {Object}      - The DOM nodes.
 */
function parseDOM(html) {
    if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string.');
    }

    // try to match the tags
    var match = html.match(/<[^\/](.+?)>/g);
    var nodes;

    if (match && match.length) {
        var tagMatch = match[0];

        // directive matched
        if (/<![^-]/.test(tagMatch)) {
            var directive =
            // remove angle brackets
            tagMatch.substring(1, tagMatch.length - 1).trim();

            // tag name can no longer be first match item
            tagMatch = match[1];

            // remove directive from html
            html = html.substring(html.indexOf('>') + 1);
        }

        // first tag name matched
        if (tagMatch) {
            var tagName =
            // keep only tag name
            tagMatch.substring(1, tagMatch.indexOf(' ')).trim().toLowerCase();
        }
    }

    // create html document to parse top-level nodes
    if (['html', 'head', 'body'].indexOf(tagName) > -1) {
        var doc;

        // `new DOMParser().parseFromString()`
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
        if (window.DOMParser) {
            doc = new window.DOMParser().parseFromString(html, 'text/html');

            // `DOMImplementation.createHTMLDocument()`
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createHTMLDocument
        } else if (document.implementation.createHTMLDocument) {
            doc = document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML = html;
            doc.removeChild(doc.childNodes[0]); // remove doctype
        }

        // html
        if (tagName === 'html') {
            nodes = doc.childNodes;
            // head and body
        } else {
            nodes =
            // do this so attributes are kept
            // but there may be an extra head/body node
            doc.getElementsByTagName(tagName)[0].parentNode.childNodes;
        }

        // `innerHTML` approach
    } else {
        var container = document.createElement('body');
        container.innerHTML = html;
        nodes = container.childNodes;
    }

    return formatDOM(nodes, null, directive);
}

/**
 * Export HTML to DOM parser (client).
 */
module.exports = parseDOM;

/***/ }),
/* 44 */
/***/ (function(module, exports) {



/**
 * Format DOM attributes to an associative array.
 *
 * @param  {NamedNodeMap} - The list of attributes.
 * @return {Object}       - The object of attributes.
 */
function formatAttributes(attributes) {
    var result = {};
    var attribute;

    // NamedNodeMap is array-like
    for (var i = 0, len = attributes.length; i < len; i++) {
        attribute = attributes[i];
        result[attribute.name] = attribute.value;
    }

    return result;
}

/**
 * Format the browser DOM nodes to mimic the output of `htmlparser2.parseDOM()`.
 *
 * @param  {NodeList} nodes        - The DOM nodes.
 * @param  {Object}   [parentObj]  - The formatted parent node.
 * @param  {String}   [directive]  - The directive.
 * @return {Object}                - The formatted DOM object.
 */
function formatDOM(nodes, parentObj, directive) {
    parentObj = parentObj || null;

    var result = [];
    var node;
    var prevNode;
    var nodeObj;

    // NodeList is array-like
    for (var i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        // reset
        nodeObj = {
            next: null,
            prev: result[i - 1] || null,
            parent: parentObj
        };

        // set the next node for the previous node (if applicable)
        prevNode = result[i - 1];
        if (prevNode) {
            prevNode.next = nodeObj;
        }

        // set the node name if it's not "#text" or "#comment"
        // e.g., "div"
        if (node.nodeName.indexOf('#') !== 0) {
            nodeObj.name = node.nodeName.toLowerCase();

            // also, nodes of type "tag" have "attribs"
            nodeObj.attribs = {}; // default
            if (node.attributes && node.attributes.length) {
                nodeObj.attribs = formatAttributes(node.attributes);
            }
        }

        // set the node type
        // e.g., "tag"
        switch (node.nodeType) {
            // 1 = element
            case 1:
                if (nodeObj.name === 'script' || nodeObj.name === 'style') {
                    nodeObj.type = nodeObj.name;
                } else {
                    nodeObj.type = 'tag';
                }
                // recursively format the children
                nodeObj.children = formatDOM(node.childNodes, nodeObj);
                break;
            // 2 = attribute
            // 3 = text
            case 3:
                nodeObj.type = 'text';
                nodeObj.data = node.nodeValue;
                break;
            // 8 = comment
            case 8:
                nodeObj.type = 'comment';
                nodeObj.data = node.nodeValue;
                break;
            default:
                break;
        }

        result.push(nodeObj);
    }

    if (directive) {
        result.unshift({
            name: directive.substring(0, directive.indexOf(' ')).toLowerCase(),
            data: directive,
            type: 'directive',
            next: result[0] ? result[0] : null,
            prev: null,
            parent: parentObj
        });

        if (result[1]) {
            result[1].prev = result[0];
        }
    }

    return result;
}

/**
 * Export utilities.
 */
module.exports = {
    formatAttributes: formatAttributes,
    formatDOM: formatDOM
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(46).diff;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function diff(oldList, newList, key) {
  var oldMap = makeKeyIndexAndFree(oldList, key);
  var newMap = makeKeyIndexAndFree(newList, key);

  var newFree = newMap.free;

  var oldKeyIndex = oldMap.keyIndex;
  var newKeyIndex = newMap.keyIndex;

  var moves = [];

  // a simulate list to manipulate
  var children = [];
  var i = 0;
  var item;
  var itemKey;
  var freeIndex = 0;

  // fist pass to check item in old list: if it's removed or not
  while (i < oldList.length) {
    item = oldList[i];
    itemKey = getItemKey(item, key);
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null);
      } else {
        var newItemIndex = newKeyIndex[itemKey];
        children.push(newList[newItemIndex]);
      }
    } else {
      var freeItem = newFree[freeIndex++];
      children.push(freeItem || null);
    }
    i++;
  }

  var simulateList = children.slice(0);

  // remove items no longer exist
  i = 0;
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i);
      removeSimulate(i);
    } else {
      i++;
    }
  }

  // i is cursor pointing to a item in new list
  // j is cursor pointing to a item in simulateList
  var j = i = 0;
  while (i < newList.length) {
    item = newList[i];
    itemKey = getItemKey(item, key);

    var simulateItem = simulateList[j];
    var simulateItemKey = getItemKey(simulateItem, key);

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++;
      } else {
        // new item, just inesrt it
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item);
        } else {
          // if remove current simulateItem make item in right place
          // then just remove it
          var nextItemKey = getItemKey(simulateList[j + 1], key);
          if (nextItemKey === itemKey) {
            remove(i);
            removeSimulate(j);
            j++; // after removing, current j is right, just jump to next one
          } else {
            // else insert item
            insert(i, item);
          }
        }
      }
    } else {
      insert(i, item);
    }

    i++;
  }

  function remove(index) {
    var move = { index: index, type: 0 };
    moves.push(move);
  }

  function insert(index, item) {
    var move = { index: index, item: item, type: 1 };
    moves.push(move);
  }

  function removeSimulate(index) {
    simulateList.splice(index, 1);
  }

  return {
    moves: moves,
    children: children
  };
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree(list, key) {
  var keyIndex = {};
  var free = [];
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i];
    var itemKey = getItemKey(item, key);
    if (itemKey) {
      keyIndex[itemKey] = i;
    } else {
      free.push(item);
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  };
}

function getItemKey(item, key) {
  if (!item || !key) return void 666;
  return typeof key === 'string' ? item[key] : key(item);
}

exports.makeKeyIndexAndFree = makeKeyIndexAndFree; // exports for test
exports.diff = diff;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports.el = __webpack_require__(49);
exports.diff = __webpack_require__(48);
exports.patch = __webpack_require__(21);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(12);
var patch = __webpack_require__(21);
var listDiff = __webpack_require__(45);

function diff(oldTree, newTree) {
  var index = 0;
  var patches = {};
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}

function dfsWalk(oldNode, newNode, index, patches) {
  var currentPatch = [];

  // Node is removed.
  if (newNode === null) {
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
    // TextNode content replacing
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode });
    }
    // Nodes are the same, diff old node's props and children
  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // Diff props
    var propsPatches = diffProps(oldNode, newNode);
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches });
    }
    // Diff children. If the node has a `ignore` property, do not diff children
    if (!isIgnoreChildren(newNode)) {
      diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
    }
    // Nodes are not the same, replace the old node with new node
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode });
  }

  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key');
  newChildren = diffs.children;

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves };
    currentPatch.push(reorderPatch);
  }

  var leftNode = null;
  var currentNodeIndex = index;
  _.each(oldChildren, function (child, i) {
    var newChild = newChildren[i];
    currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
    dfsWalk(child, newChild, currentNodeIndex, patches);
    leftNode = child;
  });
}

function diffProps(oldNode, newNode) {
  var count = 0;
  var oldProps = oldNode.props;
  var newProps = newNode.props;

  var key, value;
  var propsPatches = {};

  // Find out different properties
  for (key in oldProps) {
    value = oldProps[key];
    if (newProps[key] !== value) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  // Find out new property
  for (key in newProps) {
    value = newProps[key];
    if (!oldProps.hasOwnProperty(key)) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  // If properties all are identical
  if (count === 0) {
    return null;
  }

  return propsPatches;
}

function isIgnoreChildren(node) {
  return node.props && node.props.hasOwnProperty('ignore');
}

module.exports = diff;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(12);

/**
 * Virtual-dom Element.
 * @param {String} tagName
 * @param {Object} props - Element's properties,
 *                       - using object to store key-value pair
 * @param {Array<Element|String>} - This element's children elements.
 *                                - Can be Element instance or just a piece plain text.
 */
function Element(tagName, props, children) {
  if (!(this instanceof Element)) {
    return new Element(tagName, props, children);
  }

  if (_.isArray(props)) {
    children = props;
    props = {};
  }

  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : void 666;

  var count = 0;

  _.each(this.children, function (child, i) {
    if (child instanceof Element) {
      count += child.count;
    } else {
      children[i] = '' + child;
    }
    count++;
  });

  this.count = count;
}

/**
 * Render the hold element tree.
 */
Element.prototype.render = function () {
  var el = document.createElement(this.tagName);
  var props = this.props;

  for (var propName in props) {
    var propValue = props[propName];
    _.setAttr(el, propName, propValue);
  }

  _.each(this.children, function (child) {
    var childEl = child instanceof Element ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });

  return el;
};

module.exports = Element;

/***/ }),
/* 50 */
/***/ (function(module, exports) {



module.exports = function date(format, timestamp) {
  //  discuss at: http://locutus.io/php/date/
  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // original by: gettimeofday
  //    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: MeEtc (http://yass.meetcweb.com)
  // improved by: Brad Touesnard
  // improved by: Tim Wiel
  // improved by: Bryan Elliott
  // improved by: David Randall
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Thomas Beaucourt (http://www.webapp.fr)
  // improved by: JT
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // improved by: Theriault (https://github.com/Theriault)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: majak
  //    input by: Alex
  //    input by: Martin
  //    input by: Alex Wilson
  //    input by: Haravikk
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: majak
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: omid (http://locutus.io/php/380:380#comment_137122)
  // bugfixed by: Chris (http://www.devotis.nl/)
  //      note 1: Uses global: locutus to store the default timezone
  //      note 1: Although the function potentially allows timezone info
  //      note 1: (see notes), it currently does not set
  //      note 1: per a timezone specified by date_default_timezone_set(). Implementers might use
  //      note 1: $locutus.currentTimezoneOffset and
  //      note 1: $locutus.currentTimezoneDST set by that function
  //      note 1: in order to adjust the dates in this function
  //      note 1: (or our other date functions!) accordingly
  //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)
  //   returns 1: '07:09:40 m is month'
  //   example 2: date('F j, Y, g:i a', 1062462400)
  //   returns 2: 'September 2, 2003, 12:26 am'
  //   example 3: date('Y W o', 1062462400)
  //   returns 3: '2003 36 2003'
  //   example 4: var $x = date('Y m d', (new Date()).getTime() / 1000)
  //   example 4: $x = $x + ''
  //   example 4: var $result = $x.length // 2009 01 09
  //   returns 4: 10
  //   example 5: date('W', 1104534000)
  //   returns 5: '52'
  //   example 6: date('B t', 1104534000)
  //   returns 6: '999 31'
  //   example 7: date('W U', 1293750000.82); // 2010-12-31
  //   returns 7: '52 1293750000'
  //   example 8: date('W', 1293836400); // 2011-01-01
  //   returns 8: '52'
  //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  //   returns 9: '52 2011-01-02'
  //        test: skip-1 skip-2 skip-5

  var jsdate, f;
  // Keep this here (works, but for code commented-out below for file size reasons)
  // var tal= [];
  var txtWords = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // trailing backslash -> (dropped)
  // a backslash followed by any character (including backslash) -> the character
  // empty string -> empty string
  var formatChr = /\\?(.?)/gi;
  var formatChrCb = function formatChrCb(t, s) {
    return f[t] ? f[t]() : s;
  };
  var _pad = function _pad(n, c) {
    n = String(n);
    while (n.length < c) {
      n = '0' + n;
    }
    return n;
  };
  f = {
    // Day
    d: function d() {
      // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function D() {
      // Shorthand day name; Mon...Sun
      return f.l().slice(0, 3);
    },
    j: function j() {
      // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function l() {
      // Full day name; Monday...Sunday
      return txtWords[f.w()] + 'day';
    },
    N: function N() {
      // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S: function S() {
      // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j();
      var i = j % 10;
      if (i <= 3 && parseInt(j % 100 / 10, 10) === 1) {
        i = 0;
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th';
    },
    w: function w() {
      // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function z() {
      // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j());
      var b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W: function W() {
      // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
      var b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function F() {
      // Full month name; January...December
      return txtWords[6 + f.n()];
    },
    m: function m() {
      // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function M() {
      // Shorthand month name; Jan...Dec
      return f.F().slice(0, 3);
    },
    n: function n() {
      // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function t() {
      // Days in month; 28...31
      return new Date(f.Y(), f.n(), 0).getDate();
    },

    // Year
    L: function L() {
      // Is leap year?; 0 or 1
      var j = f.Y();
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
    },
    o: function o() {
      // ISO-8601 year
      var n = f.n();
      var W = f.W();
      var Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y: function Y() {
      // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function y() {
      // Last two digits of year; 00...99
      return f.Y().toString().slice(-2);
    },

    // Time
    a: function a() {
      // am or pm
      return jsdate.getHours() > 11 ? 'pm' : 'am';
    },
    A: function A() {
      // AM or PM
      return f.a().toUpperCase();
    },
    B: function B() {
      // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2;
      // Hours
      var i = jsdate.getUTCMinutes() * 60;
      // Minutes
      // Seconds
      var s = jsdate.getUTCSeconds();
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function g() {
      // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G: function G() {
      // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function h() {
      // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function H() {
      // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function i() {
      // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function s() {
      // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function u() {
      // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function e() {
      // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      /*              return that.date_default_timezone_get();
       */
      var msg = 'Not supported (see source code of date() for timezone on how to add support)';
      throw new Error(msg);
    },
    I: function I() {
      // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0);
      // Jan 1
      var c = Date.UTC(f.Y(), 0);
      // Jan 1 UTC
      var b = new Date(f.Y(), 6);
      // Jul 1
      // Jul 1 UTC
      var d = Date.UTC(f.Y(), 6);
      return a - c !== b - d ? 1 : 0;
    },
    O: function O() {
      // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset();
      var a = Math.abs(tzo);
      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P: function P() {
      // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return O.substr(0, 3) + ':' + O.substr(3, 2);
    },
    T: function T() {
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
      /*              var abbr, i, os, _default;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if ($locutus && $locutus.default_timezone) {
        _default = $locutus.default_timezone;
        for (abbr in tal) {
          for (i = 0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === _default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
      */
      return 'UTC';
    },
    Z: function Z() {
      // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c: function c() {
      // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function r() {
      // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function U() {
      // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };

  var _date = function _date(format, timestamp) {
    jsdate = timestamp === undefined ? new Date() // Not provided
    : timestamp instanceof Date ? new Date(timestamp) // JS Date()
    : new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    ;
    return format.replace(formatChr, formatChrCb);
  };

  return _date(format, timestamp);
};
//# sourceMappingURL=date.js.map

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports) {



module.exports = function htmlspecialchars_decode(string, quoteStyle) {
  // eslint-disable-line camelcase
  //       discuss at: http://locutus.io/php/htmlspecialchars_decode/
  //      original by: Mirek Slugen
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  //      bugfixed by: Mateusz "loonquawl" Zalega
  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //         input by: ReverseSyntax
  //         input by: Slawomir Kaniecki
  //         input by: Scott Cariss
  //         input by: Francois
  //         input by: Ratheous
  //         input by: Mailfaker (http://www.weedem.fr/)
  //       revised by: Kevin van Zonneveld (http://kvz.io)
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //        example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES')
  //        returns 1: '<p>this -> &quot;</p>'
  //        example 2: htmlspecialchars_decode("&amp;quot;")
  //        returns 2: '&quot;'

  var optTemp = 0;
  var i = 0;
  var noquotes = false;

  if (typeof quoteStyle === 'undefined') {
    quoteStyle = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quoteStyle === 0) {
    noquotes = true;
  }
  if (typeof quoteStyle !== 'number') {
    // Allow for a single string or an array of string flags
    quoteStyle = [].concat(quoteStyle);
    for (i = 0; i < quoteStyle.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quoteStyle[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quoteStyle[i]]) {
        optTemp = optTemp | OPTS[quoteStyle[i]];
      }
    }
    quoteStyle = optTemp;
  }
  if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
    // PHP doesn't currently escape if more than one 0, but it should:
    string = string.replace(/&#0*39;/g, "'");
    // This would also be useful here, but not a part of PHP:
    // string = string.replace(/&apos;|&#x0*27;/g, "'");
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
};
//# sourceMappingURL=htmlspecialchars_decode.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

module.exports = function http_build_query(formdata, numericPrefix, argSeparator) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/http_build_query/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Legaev Andrey
  // improved by: Michael White (http://getsprink.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  revised by: stag019
  //    input by: Dreamer
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
  //      note 1: If the value is null, key and value are skipped in the
  //      note 1: http_build_query of PHP while in locutus they are not.
  //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;')
  //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_')
  //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'

  var urlencode = __webpack_require__(55);

  var value;
  var key;
  var tmp = [];

  var _httpBuildQueryHelper = function _httpBuildQueryHelper(key, val, argSeparator) {
    var k;
    var tmp = [];
    if (val === true) {
      val = '1';
    } else if (val === false) {
      val = '0';
    }
    if (val !== null) {
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
        for (k in val) {
          if (val[k] !== null) {
            tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator));
          }
        }
        return tmp.join(argSeparator);
      } else if (typeof val !== 'function') {
        return urlencode(key) + '=' + urlencode(val);
      } else {
        throw new Error('There was an error processing for http_build_query().');
      }
    } else {
      return '';
    }
  };

  if (!argSeparator) {
    argSeparator = '&';
  }
  for (key in formdata) {
    value = formdata[key];
    if (numericPrefix && !isNaN(key)) {
      key = String(numericPrefix) + key;
    }
    var query = _httpBuildQueryHelper(key, value, argSeparator);
    if (query !== '') {
      tmp.push(query);
    }
  }

  return tmp.join(argSeparator);
};
//# sourceMappingURL=http_build_query.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports) {



module.exports = function urlencode(str) {
  //       discuss at: http://locutus.io/php/urlencode/
  //      original by: Philip Peterson
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      improved by: Lars Fischer
  //         input by: AJ
  //         input by: travc
  //         input by: Brett Zamir (http://brett-zamir.me)
  //         input by: Ratheous
  //      bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //      bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //      bugfixed by: Joris
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //           note 1: This reflects PHP 5.3/6.0+ behavior
  //           note 1: Please be aware that this function
  //           note 1: expects to encode into UTF-8 encoded strings, as found on
  //           note 1: pages served as UTF-8
  //        example 1: urlencode('Kevin van Zonneveld!')
  //        returns 1: 'Kevin+van+Zonneveld%21'
  //        example 2: urlencode('http://kvz.io/')
  //        returns 2: 'http%3A%2F%2Fkvz.io%2F'
  //        example 3: urlencode('http://www.google.nl/search?q=Locutus&ie=utf-8')
  //        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'

  str = str + '';

  // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
  // but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};
//# sourceMappingURL=urlencode.js.map

/***/ }),
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
module.exports = __webpack_require__(0).Array.forEach;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
module.exports = __webpack_require__(0).Array.indexOf;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(0).Array.map;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
module.exports = __webpack_require__(0).Object.getPrototypeOf;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(93);
module.exports = __webpack_require__(0).String.repeat;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
module.exports = __webpack_require__(0).String.trim;

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8),
    isArray = __webpack_require__(71),
    SPECIES = __webpack_require__(84)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }return C === undefined ? Array : C;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(68);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5).document && document.documentElement;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {


// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(30),
    gOPS = __webpack_require__(76),
    pIE = __webpack_require__(31),
    toObject = __webpack_require__(10),
    IObject = __webpack_require__(14),
    $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {},
      B = {},
      S = Symbol(),
      K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target),
      aLen = arguments.length,
      index = 1,
      getSymbols = gOPS.f,
      isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]),
        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
        length = keys.length,
        j = 0,
        key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13),
    dPs = __webpack_require__(74),
    enumBugKeys = __webpack_require__(27),
    IE_PROTO = __webpack_require__(16)('IE_PROTO'),
    Empty = function Empty() {/* empty */},
    PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(26)('iframe'),
      i = enumBugKeys.length,
      lt = '<',
      gt = '>',
      iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15),
    anObject = __webpack_require__(13),
    getKeys = __webpack_require__(30);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties),
      length = keys.length,
      i = 0,
      P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(31),
    createDesc = __webpack_require__(33),
    toIObject = __webpack_require__(9),
    toPrimitive = __webpack_require__(36),
    has = __webpack_require__(7),
    IE8_DOM_DEFINE = __webpack_require__(29),
    gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 76 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7),
    toObject = __webpack_require__(10),
    IE_PROTO = __webpack_require__(16)('IE_PROTO'),
    ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7),
    toIObject = __webpack_require__(9),
    arrayIndexOf = __webpack_require__(22)(false),
    IE_PROTO = __webpack_require__(16)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object),
      i = 0,
      result = [],
      key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5),
    hide = __webpack_require__(28),
    has = __webpack_require__(7),
    SRC = __webpack_require__(19)('src'),
    TO_STRING = 'toString',
    $toString = Function[TO_STRING],
    TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(0).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else {
    if (!safe) {
      delete O[key];
      hide(O, key, val);
    } else {
      if (O[key]) O[key] = val;else hide(O, key, val);
    }
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {


var toInteger = __webpack_require__(18),
    defined = __webpack_require__(6);

module.exports = function repeat(count) {
  var str = String(defined(this)),
      res = '',
      n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }return res;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1),
    defined = __webpack_require__(6),
    fails = __webpack_require__(4),
    spaces = __webpack_require__(82),
    space = '[' + spaces + ']',
    non = '\u200B\x85',
    ltrim = RegExp('^' + space + space + '*'),
    rtrim = RegExp(space + space + '*$');

var exporter = function exporter(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18),
    max = Math.max,
    min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(34)('wks'),
    uid = __webpack_require__(19),
    _Symbol = __webpack_require__(5).Symbol,
    USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {


var $export = __webpack_require__(1),
    $forEach = __webpack_require__(23)(0),
    STRICT = __webpack_require__(17)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


var $export = __webpack_require__(1),
    $indexOf = __webpack_require__(22)(false),
    $native = [].indexOf,
    NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(17)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
    return NEGATIVE_ZERO
    // convert -0 to +0
    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {


var $export = __webpack_require__(1),
    $map = __webpack_require__(23)(1);

$export($export.P + $export.F * !__webpack_require__(17)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(72) });

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(73) });

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(15).f });

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(9),
    $getOwnPropertyDescriptor = __webpack_require__(75).f;

__webpack_require__(32)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(10),
    $getPrototypeOf = __webpack_require__(77);

__webpack_require__(32)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(80)
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {


// 21.1.3.25 String.prototype.trim()
__webpack_require__(81)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widget__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widget___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__widget__);


var domready = __webpack_require__(20);
var utils = __webpack_require__(11);
var proxy = __webpack_require__(39);

var components = {};
var data = {};
var _plugins = [];
var filters = {};

var Cmay = {

    scanComponent: function scanComponent(domNode) {
        var widgetName = domNode.getAttribute('c-widget');
        if (widgetName == '' || widgetName == null) {
            return;
        }
        if (components[widgetName]) {
            return;
        }
        components[widgetName] = new __WEBPACK_IMPORTED_MODULE_0__component___default.a(domNode);
    },

    widget: function widget(componentName) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!components[componentName]) {
            return '';
        }
        return components[componentName].$factory(data);
    },
    set: function set(obj) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        //如果已经保存过了
        // if(utils.is(obj,'object') || utils.is(obj,'array')){
        for (var uuid in data) {
            if (data[uuid] === obj) {
                return uuid;
            }
        }
        // }
        var uuid = utils.uniqid('obj_');
        data[uuid] = obj;
        return uuid;
    },

    remove: function remove(uuid) {
        delete data[uuid];
    },

    setValue: function setValue(elem, value) {
        if (!elem || elem.name == '' || elem.name == null) {
            return;
        }
        var obj = Cmay.get(elem);
        if (obj) {
            var indexs = elem.name.match(/[^\[\]]+/g).map(function (item) {
                if (item[0] == '[') {
                    var index = item.substr(1, item.length - 1);
                } else {
                    var index = item;
                }
                if (index[0] != "'" && index[0] != '"') {
                    index = "\"" + index + "\"";
                }
                return "[" + index + "]";
            }).join("");

            var js = "obj" + indexs + " = \"" + value + '"';

            try {
                eval(js);
            } catch (e) {}
        }
    },

    get: function get(obj) {
        var _uuid;
        if (utils.is(obj, "string")) {
            _uuid = obj;
        } else if (obj.nodeType) {
            var item = obj;
            do {
                if (!item.getAttribute) {
                    break;
                }
                var uuid;
                if (uuid = item.getAttribute('data-uuid')) {
                    _uuid = uuid;
                    break;
                }
            } while (item = item.parentNode);
        }
        if (data[_uuid]) {
            return data[_uuid];
        }
        // alert(2)
        // for (var i in data) {
        //     console.log(i);
        //     console.log(data[i]);
        // }
        // var keys = data.keys();
        // alert(keys.length)
        // for(var i = 0; i < keys.length; i++){
        //     var key = keys[i];
        //     alert(key)
        //     if(data[key] == _uuid){
        //         alert(2);

        //     }
        // }
        // for (var key in data.keys()) {
        //     if (data[key] == _uuid) {
        //         return data;
        //     }
        // }
        // console.log(keys)

        // for (var [key, uuid] of data) {
        //     if (uuid == _uuid) {
        //         return key;
        //     }
        // }
        return null;
    },

    plugin: function plugin(item) {
        _plugins.push(item);
    },

    plugins: function plugins() {
        return _plugins;
    },

    filter: function filter(name, _filter) {
        filters[name] = _filter;
    },

    getFilter: function getFilter(name) {
        return filters[name] || function (val, args) {
            return val || '';
        };
    },

    watch: function watch(obj, callback) {
        return proxy.watchFactory(obj, callback);
    },

    bootstrap: function bootstrap() {
        domready(function () {
            //扫描所有组件
            var elems = document.querySelectorAll("[c-widget]");
            for (var i = 0; i < elems.length; i++) {
                Cmay.scanComponent(elems[i]);
            }
            var elems = document.querySelectorAll("[c-tpl]");
            for (var i = 0; i < elems.length; i++) {
                new __WEBPACK_IMPORTED_MODULE_1__widget___default.a(elems[i]);
            }
        });

        //双向绑定
        var timer = null;
        var handler = function handler(e) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            setTimeout(function () {
                var elem = e.target;
                if (!elem || elem.name == '' || elem.name == null) {
                    return;
                }
                Cmay.setValue(elem, elem.value);
            }, 1000 / 60);

            // var obj = Cmay.get(e.target);
            // if (obj) {
            //     var js = "obj['" + elem.name + '\'] = "' + elem.value + '"';
            //     console.log(js)
            //     eval(js);

            //     try {
            //     }
            //     catch (e) { }
            // }
        };
        if (document.addEventListener) {
            document.addEventListener('input', handler);
            document.addEventListener('change', handler);
        }
    },
    showData: function showData() {
        console.log(data);
    }

};

global.Cmay = Cmay;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {


var date = __webpack_require__(50);

Cmay.filter("money", function (val, args) {
	var num = parseInt(args);
	if (num != num) {
		num = 2;
	}
	val = parseFloat(val);

	if (val != val) return "0." + "0".repeat(num);

	return val.toFixed(num);
});

Cmay.filter('bold', function (val) {
	return '<b>' + val + '</b>';
});

Cmay.filter('image', function (val) {
	return '<img src=' + val + ' />';
});

Cmay.filter('date', function (val, args) {
	args = args.length ? args : 'yyyy-mm-dd';
	return date(args, val);
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var http_build_query = __webpack_require__(54);

var ajax = function ajax(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            callback.call(null, this.responseText);
        }
    };
    xhr.open("get", url);
    xhr.send(null);
};

var reload = function reload(url, widget) {
    var dataKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    ajax(url, function (txt) {
        var result = txt;
        try {
            result = JSON.parse(result);
        } catch (e) {
            result = {};
        }
        console.log(result);
        widget.render(result, dataKey);
    });
};

Cmay.plugin({
    "c-url": function cUrl(url, data, dom, widget) {
        var target;
        widget.$sourceUrl = url;
        if (target = dom.getAttribute('c-url-data')) {
            widget.$sourceUrlDataTarget = target;
            reload(url, widget, target);
        } else {
            reload(url, widget);
        }

        console.log(widget);
    },

    'c-reload': function cReload(val, data, dom, widget) {
        if (!widget.$sourceUrl) {
            return;
        }

        var obj;
        val = val.trim();
        if (val.length && val[0] == '{' || val[0] == '[') {
            try {
                obj = JSON.parse(val);
            } catch (e) {
                obj = {};
            }
        } else {
            obj = global[val] ? global[val] : {};
        }
        widget.$reloadWatching = Cmay.set(obj);

        var sourceUrl = widget.$sourceUrl;
        var callback = function (url, widget) {
            return function () {
                var options = http_build_query(Cmay.get(widget.$reloadWatching));
                sourceUrl += sourceUrl.indexOf('?') > -1 ? '&' + options : '?' + options;
                reload(sourceUrl, widget, widget.$sourceUrlDataTarget);
            };
        }(sourceUrl, widget);

        Cmay.watch(obj, callback);

        dom.removeAttribute('c-reload');
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proxy = __webpack_require__(39);
var utils = __webpack_require__(11);
var config = __webpack_require__(38);
//const htmlParserLibrary = require('html-parser-lite');
//const htmlParser = new htmlParserLibrary();
var svd = __webpack_require__(47);
var component = __webpack_require__(37);
var el = svd.el;
var diff = svd.diff;
var patch = svd.patch;

var Parser = __webpack_require__(43);

var widget = function () {
    function widget(domNode) {
        var _component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, widget);

        this.$timer = null;
        this.$element = domNode;
        var data = null;
        var _data = domNode.getAttribute('c-tpl').trim();
        domNode.removeAttribute('c-tpl');

        if (_component == null) {
            this.$prototype = new component(domNode, false);
        } else {
            this.$prototype = _component;
        }

        //this.$tpl = domNode.outerHTML.replace(/[\r\n]/g, "");

        //如果没有声明被绑定的对象，视为一般的模板，不再响应双向绑定
        if (_data == '') {
            this.$proxy = proxy.proxyFactory({}, this);
        } else if (_data.length && _data[0] == '{' || _data[0] == '[') {
            try {
                this.$proxy = proxy.proxyFactory(JSON.parse(_data), this);
            } catch (e) {
                this.$proxy = proxy.proxyFactory({}, this);
            }
        } else {
            //如果已经存在这个对象，那么直接使用
            if (!window[_data]) {
                window[_data] = {};
            }
            window[_data] = this.$proxy = proxy.proxyFactory(window[_data], this);
        }

        this.$uuid = Cmay.set(this.$proxy);

        var plugins = Cmay.plugins();
        var self = this;
        plugins.forEach(function (item) {
            for (var attrName in item) {
                var callback = item[attrName];
                var val = domNode.getAttribute(attrName);
                if (val) {
                    callback.call(null, val, self.$proxy, domNode, self);
                }
            }
        });

        this.render();
    }

    _createClass(widget, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var dataKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (data) {
                if (dataKey) {
                    console.log('this.$proxy.' + dataKey + '=' + JSON.stringify(data));
                    eval('this.$proxy.' + dataKey + '=' + JSON.stringify(data));
                } else {
                    for (var i in data) {
                        this.$proxy[i] = data[i];
                    }
                }
            }

            if (this.$timer) {
                clearTimeout(this.$timer);
                this.$timer = null;
            }
            this.$timer = setTimeout(function () {
                var html = _this.$prototype.$factory(_this.$proxy, _this.$uuid);
                //build virtual dom
                var vdom = _this.convertVirtualDom(html);
                //
                if (_this.$vdom) {
                    //二次渲染的时候，移除没用的内容
                    var elems = _this.$element.querySelectorAll('[data-uuid]');
                    for (var i = 0; i < elems.length; i++) {
                        var uuid = elems[i].getAttribute('uuid');
                        Cmay.remove(uuid);
                    }
                    var patches = diff(_this.$vdom, vdom);
                    patch(_this.$element, patches);
                } else {
                    var realDom = vdom.render();
                    _this.$element.parentNode.replaceChild(realDom, _this.$element);
                    _this.$element = realDom;
                }

                //IE绑定事件
                if (!document.addEventListener) {
                    var elems = _this.$element.querySelectorAll("input,textarea,select");
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].removeAttribute('onpropertychange');
                        elems[i].onpropertychange = function () {
                            var e = window.event;
                            var elem = e.srcElement;
                            if (!elem || elem.name == '' || elem.name == null) {
                                return;
                            }
                            if (e.propertyName == 'value') {
                                Cmay.setValue(elem, elem.value);
                            }
                        };
                    }
                }

                _this.$vdom = vdom;
            }, 1000 / config.fps);
        }
    }, {
        key: 'convertVirtualDom',
        value: function convertVirtualDom(html) {
            var dom = Parser(html);
            if (!dom.length) {
                return [{ name: "div", attribs: {}, children: [] }];
            }
            var node = dom[0];
            return el(node.name, node.attribs, this.generateVirtualDomNode(node.children));
        }
    }, {
        key: 'generateVirtualDomNode',
        value: function generateVirtualDomNode(nodes) {
            var ret = [];
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.type == 'tag') {
                    //修正input显示“”的问题
                    // if (node.tagName === 'input' && node.attribs.value == '""') {
                    //     node.attribs.value = "";
                    // }
                    ret.push(el(node.name, node.attribs, this.generateVirtualDomNode(node.children)));
                } else if (node.type == 'text') {
                    ret.push(node.data);
                }
            }
            return ret;
        }
    }]);

    return widget;
}();

module.exports = widget;

/***/ }),
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ })
/******/ ]);