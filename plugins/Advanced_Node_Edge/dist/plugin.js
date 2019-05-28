/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Plugin; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shape.js */ \"./shape.js\");\n\n\n\n\nvar Plugin =\n/*#__PURE__*/\nfunction () {\n  function Plugin() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Plugin);\n\n    this.canvas = document.createElement('canvas');\n    this.canvas.width = 0;\n    this.canvas.height = 0;\n    this.canvas.style.display = 'none';\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Plugin, [{\n    key: \"set\",\n    value: function set(config) {\n      this.config = config;\n      var temp = {};\n      var promises = [];\n\n      for (var key in this.config) {\n        switch (Object.keys(this.config[key])[0]) {\n          case \"circle\":\n            var circle = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Circle\"](this.canvas, this.config[key].circle);\n            promises.push({\n              name: key,\n              promise: circle.toBlob,\n              config: this.config[key].circle\n            });\n            break;\n\n          case \"ellipse\":\n            var ellipse = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Ellipse\"](this.canvas, this.config[key].ellipse);\n            promises.push({\n              name: key,\n              promise: ellipse.toBlob,\n              config: this.config[key].ellipse\n            });\n            break;\n\n          case \"triangle\":\n            var triangle = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Triangle\"](this.canvas, this.config[key].triangle);\n            promises.push({\n              name: key,\n              promise: triangle.toBlob,\n              config: this.config[key].triangle\n            });\n            break;\n\n          case \"rectangle\":\n            var rectangle = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Rectangle\"](this.canvas, this.config[key].rectangle);\n            promises.push({\n              name: key,\n              promise: rectangle.toBlob,\n              config: this.config[key].rectangle\n            });\n            break;\n\n          case \"rhombus\":\n            var rhombus = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Rhombus\"](this.canvas, this.config[key].rhombus);\n            promises.push({\n              name: key,\n              promise: rhombus.toBlob,\n              config: this.config[key].rhombus\n            });\n            break;\n\n          case \"pentagon\":\n            var pentagon = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Pentagon\"](this.canvas, this.config[key].pentagon);\n            promises.push({\n              name: key,\n              promise: pentagon.toBlob,\n              config: this.config[key].pentagon\n            });\n            break;\n\n          case \"hexagon\":\n            var hexagon = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Hexagon\"](this.canvas, this.config[key].hexagon);\n            promises.push({\n              name: key,\n              promise: hexagon.toBlob,\n              config: this.config[key].hexagon\n            });\n            break;\n\n          case \"heptagon\":\n            var heptagon = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Heptagon\"](this.canvas, this.config[key].heptagon);\n            promises.push({\n              name: key,\n              promise: heptagon.toBlob,\n              config: this.config[key].heptagon\n            });\n            break;\n\n          case \"star\":\n            var star = new _shape_js__WEBPACK_IMPORTED_MODULE_2__[\"Star\"](this.canvas, this.config[key].star);\n            promises.push({\n              name: key,\n              promise: star.toBlob,\n              config: this.config[key].star\n            });\n            break;\n\n          default:\n            // TODO : Throw error and shapes link\n            break;\n        }\n      }\n\n      Promise.all(promises.map(function (item) {\n        return item.promise;\n      })).then(function (blobs) {\n        blobs.map(function (item, index) {\n          temp[promises[index].name] = {\n            \"texture\": URL.createObjectURL(item)\n          };\n        });\n      });\n      return {\n        styles: temp\n      };\n    }\n  }]);\n\n  return Plugin;\n}();\n\n\nwindow.Plugin = Plugin;\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n\nvar superPropBase = __webpack_require__(/*! ./superPropBase */ \"./node_modules/@babel/runtime/helpers/superPropBase.js\");\n\nfunction _get(target, property, receiver) {\n  if (typeof Reflect !== \"undefined\" && Reflect.get) {\n    module.exports = _get = Reflect.get;\n  } else {\n    module.exports = _get = function _get(target, property, receiver) {\n      var base = superPropBase(target, property);\n      if (!base) return;\n      var desc = Object.getOwnPropertyDescriptor(base, property);\n\n      if (desc.get) {\n        return desc.get.call(receiver);\n      }\n\n      return desc.value;\n    };\n  }\n\n  return _get(target, property, receiver || target);\n}\n\nmodule.exports = _get;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/get.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n\nfunction _superPropBase(object, property) {\n  while (!Object.prototype.hasOwnProperty.call(object, property)) {\n    object = getPrototypeOf(object);\n    if (object === null) break;\n  }\n\n  return object;\n}\n\nmodule.exports = _superPropBase;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/superPropBase.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./shape.js":
/*!******************!*\
  !*** ./shape.js ***!
  \******************/
/*! exports provided: Circle, Ellipse, Triangle, Rectangle, Rhombus, Pentagon, Hexagon, Heptagon, Star */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Circle\", function() { return Circle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ellipse\", function() { return Ellipse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Triangle\", function() { return Triangle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rectangle\", function() { return Rectangle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rhombus\", function() { return Rhombus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pentagon\", function() { return Pentagon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hexagon\", function() { return Hexagon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Heptagon\", function() { return Heptagon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Star\", function() { return Star; });\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nvar Shape =\n/*#__PURE__*/\nfunction () {\n  function Shape(canvas, config) {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Shape);\n\n    this.canvas = canvas;\n    this.config = config; // Default config\n\n    this[\"default\"] = {\n      stroke: {\n        color: \"#333333\",\n        size: 0\n      },\n      color: \"#999999\",\n      size: 16\n    };\n\n    this._preConf();\n\n    this._setCanvas();\n\n    this._draw();\n\n    this.toBlob = new Promise(function (resolve, reject) {\n      _this.canvas.toBlob(function (blob) {\n        resolve(blob);\n      }, 'image/png');\n    });\n  } // Before the drawing; when the config is existed override the default config.\n\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Shape, [{\n    key: \"_preConf\",\n    value: function _preConf() {\n      if (typeof this.config !== \"undefined\") {\n        if (typeof this.config.stroke !== \"undefined\") {\n          this.config.stroke.size = this.config.stroke.size || this[\"default\"].stroke.size;\n          this.config.stroke.color = this.config.stroke.color || this[\"default\"].stroke.color;\n        } else {\n          this.config.stroke = this[\"default\"].stroke;\n        }\n\n        this.config.color = this.config.color || this[\"default\"].color;\n        this.config.size = this.config.size || this[\"default\"].size;\n      } else {\n        this.config = this[\"default\"];\n      }\n\n      this.canvas.width = 0;\n      this.canvas.height = 0;\n    } // Setting up the canvas width, height. Also, creating canvas context and colors.\n\n  }, {\n    key: \"_setCanvas\",\n    value: function _setCanvas() {\n      this.config.cursor = {\n        x0: this.canvas.width,\n        y0: this.canvas.height,\n        x1: this.canvas.width + (this.config.stroke.size * 2 + this.config.size),\n        y1: this.canvas.height + (this.config.stroke.size * 2 + this.config.size)\n      };\n      this.canvas.width = this.config.cursor.x1;\n      this.canvas.height = this.config.cursor.y1;\n      this.context = this.canvas.getContext('2d');\n      this.context.fillStyle = this.config.color;\n      this.context.strokeStyle = this.config.stroke.color;\n      this.context.lineWidth = this.config.stroke.size;\n      document.body.appendChild(this.canvas);\n    }\n  }, {\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    } // Canvas transform into the 0-1 range\n\n  }, {\n    key: \"t\",\n    value: function t(size) {\n      return this.config.stroke.size + this.config.size * size;\n    }\n  }]);\n\n  return Shape;\n}();\n\nvar Circle =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Circle, _Shape);\n\n  function Circle() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Circle);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Circle).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Circle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.arc(this.config.size / 2 + this.config.stroke.size, this.config.size / 2 + this.config.stroke.size, this.config.size / 2, 0, 2 * Math.PI);\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Circle.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Circle;\n}(Shape);\n\nvar Ellipse =\n/*#__PURE__*/\nfunction (_Shape2) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Ellipse, _Shape2);\n\n  function Ellipse() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Ellipse);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Ellipse).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Ellipse, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.ellipse(this.config.size / 2 + this.config.stroke.size, this.config.size / 2 + this.config.stroke.size, this.config.size / 2, this.config.size / 4, Math.PI / 4, 0, 2 * Math.PI);\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Ellipse.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Ellipse;\n}(Shape);\n\nvar Triangle =\n/*#__PURE__*/\nfunction (_Shape3) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Triangle, _Shape3);\n\n  function Triangle() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Triangle);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Triangle).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Triangle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(1));\n      this.context.lineTo(this.t(0), this.t(1));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Triangle.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Triangle;\n}(Shape);\n\nvar Rectangle =\n/*#__PURE__*/\nfunction (_Shape4) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Rectangle, _Shape4);\n\n  function Rectangle() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Rectangle);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Rectangle).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Rectangle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0), this.t(0));\n      this.context.lineTo(this.t(0), this.t(1));\n      this.context.lineTo(this.t(1), this.t(1));\n      this.context.lineTo(this.t(1), this.t(0));\n      this.context.lineTo(this.t(0), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Rectangle.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Rectangle;\n}(Shape);\n\nvar Rhombus =\n/*#__PURE__*/\nfunction (_Shape5) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Rhombus, _Shape5);\n\n  function Rhombus() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Rhombus);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Rhombus).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Rhombus, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(0.5));\n      this.context.lineTo(this.t(0.5), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.5));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Rhombus.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Rhombus;\n}(Shape);\n\nvar Pentagon =\n/*#__PURE__*/\nfunction (_Shape6) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Pentagon, _Shape6);\n\n  function Pentagon() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Pentagon);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Pentagon).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Pentagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(0.4));\n      this.context.lineTo(this.t(0.8), this.t(1));\n      this.context.lineTo(this.t(0.2), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.4));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Pentagon.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Pentagon;\n}(Shape);\n\nvar Hexagon =\n/*#__PURE__*/\nfunction (_Shape7) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Hexagon, _Shape7);\n\n  function Hexagon() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Hexagon);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Hexagon).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Hexagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.25), this.t(0));\n      this.context.lineTo(this.t(0.75), this.t(0.0));\n      this.context.lineTo(this.t(1), this.t(0.5));\n      this.context.lineTo(this.t(0.75), this.t(1));\n      this.context.lineTo(this.t(0.25), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.5));\n      this.context.lineTo(this.t(0.25), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Hexagon.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Hexagon;\n}(Shape);\n\nvar Heptagon =\n/*#__PURE__*/\nfunction (_Shape8) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Heptagon, _Shape8);\n\n  function Heptagon() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Heptagon);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Heptagon).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Heptagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(0.9), this.t(0.2));\n      this.context.lineTo(this.t(1), this.t(0.7));\n      this.context.lineTo(this.t(0.7), this.t(1));\n      this.context.lineTo(this.t(0.3), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.7));\n      this.context.lineTo(this.t(0.1), this.t(0.2));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Heptagon.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Heptagon;\n}(Shape);\n\nvar Star =\n/*#__PURE__*/\nfunction (_Shape9) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Star, _Shape9);\n\n  function Star() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Star);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Star).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Star, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(0.8), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.4));\n      this.context.lineTo(this.t(1), this.t(0.4));\n      this.context.lineTo(this.t(0.2), this.t(1));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Star.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Star;\n}(Shape);\n\n\n\n//# sourceURL=webpack:///./shape.js?");

/***/ })

/******/ });