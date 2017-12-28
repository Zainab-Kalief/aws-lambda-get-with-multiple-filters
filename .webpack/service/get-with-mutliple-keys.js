(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = __webpack_require__(2);

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(4);

var _promise2 = _interopRequireDefault(_promise);

var main = exports.main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var eventData, params, PersonScan;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            eventData = event.queryStringParameters || {}, params = (0, _keys2.default)(eventData);
            PersonScan = null;

            if (!params.length) {
              _context.next = 8;
              break;
            }

            PersonScan = _dynamodbLib2.default.scan();
            params.forEach(function (key) {
              return PersonScan = PersonScan.where(key).equals(eventData[key]);
            });

            PersonScan.exec(function (error, data) {
              scanPromise(error, data).then(function (value) {
                var response = {};
                if (!value.Count) {
                  response.message = "Person not found";
                  return callback(null, (0, _responseLib.failure)(response, 404));
                } else {
                  response.message = "successfully found";
                  // response.data = value.Items
                  console.log(value.Items);
                  return callback(null, (0, _responseLib.success)(response));
                }
              }).catch(function (error) {
                console.log(error);
                return callback(null, (0, _responseLib.failure)({ error: error.message }));
              });
            });
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", callback(null, (0, _responseLib.failure)({ error: "No Query String Parameter was given" })));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _responseLib = __webpack_require__(5);

var _dynamodbLib = __webpack_require__(7);

var _dynamodbLib2 = _interopRequireDefault(_dynamodbLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scanPromise(error, data) {
  return new _promise2.default(function (resolve, reject) {
    if (error) {
      reject(error);
    }
    resolve(data);
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(6);

var _stringify2 = _interopRequireDefault(_stringify);

exports.success = success;
exports.failure = failure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(body) {
    body.status = true;
    return buildResponse(200, body);
}

function failure(body) {
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    body.status = false;
    return buildResponse(statusCode, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: (0, _stringify2.default)(body)
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dynamodb = __webpack_require__(8);

var _dynamodb2 = _interopRequireDefault(_dynamodb);

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PERSON = _dynamodb2.default.define("PERSON", {
  hashKey: "mpId",
  timestamps: true,
  schema: {
    mpId: _dynamodb2.default.types.uuid(),
    title: _joi2.default.string().max(10),
    content: _joi2.default.string(),
    createdBy: _joi2.default.string(),
    address: _joi2.default.string(),
    name: _joi2.default.string(),
    userId: _joi2.default.string()
  },
  tableName: "CoronaMP_DEV"
});

module.exports = PERSON;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("dynamodb");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ })
/******/ ])));