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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AdvancedNodeEdge; });\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _shapes_node_circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shapes/node/circle */ \"./shapes/node/circle.js\");\n/* harmony import */ var _shapes_node_ellipse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shapes/node/ellipse */ \"./shapes/node/ellipse.js\");\n/* harmony import */ var _shapes_node_triangle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shapes/node/triangle */ \"./shapes/node/triangle.js\");\n/* harmony import */ var _shapes_node_rectangle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shapes/node/rectangle */ \"./shapes/node/rectangle.js\");\n/* harmony import */ var _shapes_node_rhombus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shapes/node/rhombus */ \"./shapes/node/rhombus.js\");\n/* harmony import */ var _shapes_node_pentagon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shapes/node/pentagon */ \"./shapes/node/pentagon.js\");\n/* harmony import */ var _shapes_node_hexagon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shapes/node/hexagon */ \"./shapes/node/hexagon.js\");\n/* harmony import */ var _shapes_node_heptagon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shapes/node/heptagon */ \"./shapes/node/heptagon.js\");\n/* harmony import */ var _shapes_node_star__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shapes/node/star */ \"./shapes/node/star.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar AdvancedNodeEdge =\n/*#__PURE__*/\nfunction () {\n  function AdvancedNodeEdge() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AdvancedNodeEdge);\n\n    this.canvas = document.createElement('canvas');\n    this.canvas.width = 0;\n    this.canvas.height = 0;\n    this.canvas.style.display = 'none';\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AdvancedNodeEdge, [{\n    key: \"createTexture\",\n    value: function createTexture(config) {\n      this.config = config;\n      var temp = {};\n      var promises = [];\n\n      for (var key in this.config) {\n        var _config = this.config[key];\n\n        switch (Object.keys(_config)[0]) {\n          case \"circle\":\n            var circle = new _shapes_node_circle__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.canvas, _config.circle);\n            promises.push({\n              name: key,\n              promise: circle.toBlob,\n              config: _config.circle\n            });\n            break;\n\n          case \"ellipse\":\n            var ellipse = new _shapes_node_ellipse__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.canvas, _config.ellipse);\n            promises.push({\n              name: key,\n              promise: ellipse.toBlob,\n              config: _config.ellipse\n            });\n            break;\n\n          case \"triangle\":\n            var triangle = new _shapes_node_triangle__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.canvas, _config.triangle);\n            promises.push({\n              name: key,\n              promise: triangle.toBlob,\n              config: _config.triangle\n            });\n            break;\n\n          case \"rectangle\":\n            var rectangle = new _shapes_node_rectangle__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this.canvas, _config.rectangle);\n            promises.push({\n              name: key,\n              promise: rectangle.toBlob,\n              config: _config.rectangle\n            });\n            break;\n\n          case \"rhombus\":\n            var rhombus = new _shapes_node_rhombus__WEBPACK_IMPORTED_MODULE_7__[\"default\"](this.canvas, _config.rhombus);\n            promises.push({\n              name: key,\n              promise: rhombus.toBlob,\n              config: _config.rhombus\n            });\n            break;\n\n          case \"pentagon\":\n            var pentagon = new _shapes_node_pentagon__WEBPACK_IMPORTED_MODULE_8__[\"default\"](this.canvas, _config.pentagon);\n            promises.push({\n              name: key,\n              promise: pentagon.toBlob,\n              config: _config.pentagon\n            });\n            break;\n\n          case \"hexagon\":\n            var hexagon = new _shapes_node_hexagon__WEBPACK_IMPORTED_MODULE_9__[\"default\"](this.canvas, _config.hexagon);\n            promises.push({\n              name: key,\n              promise: hexagon.toBlob,\n              config: _config.hexagon\n            });\n            break;\n\n          case \"heptagon\":\n            var heptagon = new _shapes_node_heptagon__WEBPACK_IMPORTED_MODULE_10__[\"default\"](this.canvas, _config.heptagon);\n            promises.push({\n              name: key,\n              promise: heptagon.toBlob,\n              config: _config.heptagon\n            });\n            break;\n\n          case \"star\":\n            var star = new _shapes_node_star__WEBPACK_IMPORTED_MODULE_11__[\"default\"](this.canvas, _config.star);\n            promises.push({\n              name: key,\n              promise: star.toBlob,\n              config: _config.star\n            });\n            break;\n\n          default:\n            // TODO : Throw error and shapes link\n            break;\n        }\n      }\n\n      Promise.all(promises.map(function (item) {\n        return item.promise;\n      })).then(function (blobs) {\n        blobs.map(function (blob, index) {\n          var item = promises[index];\n          temp[item.name] = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({\n            texture: URL.createObjectURL(blob)\n          }, item.config);\n        });\n      });\n      return temp;\n    }\n  }]);\n\n  return AdvancedNodeEdge;\n}();\n\n\nwindow.AdvancedNodeEdge = AdvancedNodeEdge;\n\n//# sourceURL=webpack:///./main.js?");

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

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/defineProperty.js?");

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

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? arguments[i] : {};\n    var ownKeys = Object.keys(source);\n\n    if (typeof Object.getOwnPropertySymbols === 'function') {\n      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {\n        return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n      }));\n    }\n\n    ownKeys.forEach(function (key) {\n      defineProperty(target, key, source[key]);\n    });\n  }\n\n  return target;\n}\n\nmodule.exports = _objectSpread;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/objectSpread.js?");

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

/***/ "./shapes/node/circle.js":
/*!*******************************!*\
  !*** ./shapes/node/circle.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Circle; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Circle =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Circle, _Shape);\n\n  function Circle() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Circle);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Circle).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Circle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.arc(this.config.size / 2 + this.config.stroke.size, this.config.size / 2 + this.config.stroke.size, this.config.size / 2, 0, 2 * Math.PI);\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Circle.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Circle;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/circle.js?");

/***/ }),

/***/ "./shapes/node/ellipse.js":
/*!********************************!*\
  !*** ./shapes/node/ellipse.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Ellipse; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Ellipse =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Ellipse, _Shape);\n\n  function Ellipse() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Ellipse);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Ellipse).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Ellipse, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.ellipse(this.config.size / 2 + this.config.stroke.size, this.config.size / 2 + this.config.stroke.size, this.config.size / 2, this.config.size / 4, Math.PI / 4, 0, 2 * Math.PI);\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Ellipse.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Ellipse;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/ellipse.js?");

/***/ }),

/***/ "./shapes/node/heptagon.js":
/*!*********************************!*\
  !*** ./shapes/node/heptagon.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Heptagon; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Heptagon =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Heptagon, _Shape);\n\n  function Heptagon() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Heptagon);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Heptagon).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Heptagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(0.9), this.t(0.2));\n      this.context.lineTo(this.t(1), this.t(0.7));\n      this.context.lineTo(this.t(0.7), this.t(1));\n      this.context.lineTo(this.t(0.3), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.7));\n      this.context.lineTo(this.t(0.1), this.t(0.2));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Heptagon.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Heptagon;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/heptagon.js?");

/***/ }),

/***/ "./shapes/node/hexagon.js":
/*!********************************!*\
  !*** ./shapes/node/hexagon.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Hexagon; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Hexagon =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Hexagon, _Shape);\n\n  function Hexagon() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Hexagon);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Hexagon).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Hexagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.25), this.t(0));\n      this.context.lineTo(this.t(0.75), this.t(0.0));\n      this.context.lineTo(this.t(1), this.t(0.5));\n      this.context.lineTo(this.t(0.75), this.t(1));\n      this.context.lineTo(this.t(0.25), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.5));\n      this.context.lineTo(this.t(0.25), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Hexagon.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Hexagon;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/hexagon.js?");

/***/ }),

/***/ "./shapes/node/pentagon.js":
/*!*********************************!*\
  !*** ./shapes/node/pentagon.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pentagon; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Pentagon =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Pentagon, _Shape);\n\n  function Pentagon() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Pentagon);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Pentagon).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Pentagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(0.4));\n      this.context.lineTo(this.t(0.8), this.t(1));\n      this.context.lineTo(this.t(0.2), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.4));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Pentagon.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Pentagon;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/pentagon.js?");

/***/ }),

/***/ "./shapes/node/rectangle.js":
/*!**********************************!*\
  !*** ./shapes/node/rectangle.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Rectangle; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Rectangle =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Rectangle, _Shape);\n\n  function Rectangle() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Rectangle);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Rectangle).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Rectangle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0), this.t(0));\n      this.context.lineTo(this.t(0), this.t(1));\n      this.context.lineTo(this.t(1), this.t(1));\n      this.context.lineTo(this.t(1), this.t(0));\n      this.context.lineTo(this.t(0), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Rectangle.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Rectangle;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/rectangle.js?");

/***/ }),

/***/ "./shapes/node/rhombus.js":
/*!********************************!*\
  !*** ./shapes/node/rhombus.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Rhombus; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Rhombus =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Rhombus, _Shape);\n\n  function Rhombus() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Rhombus);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Rhombus).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Rhombus, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(0.5));\n      this.context.lineTo(this.t(0.5), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.5));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Rhombus.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Rhombus;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/rhombus.js?");

/***/ }),

/***/ "./shapes/node/star.js":
/*!*****************************!*\
  !*** ./shapes/node/star.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Star; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Star =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Star, _Shape);\n\n  function Star() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Star);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Star).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Star, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(0.8), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.4));\n      this.context.lineTo(this.t(1), this.t(0.4));\n      this.context.lineTo(this.t(0.2), this.t(1));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Star.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Star;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/star.js?");

/***/ }),

/***/ "./shapes/node/triangle.js":
/*!*********************************!*\
  !*** ./shapes/node/triangle.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Triangle; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shape */ \"./shapes/shape.js\");\n\n\n\n\n\n\n\n\nvar Triangle =\n/*#__PURE__*/\nfunction (_Shape) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Triangle, _Shape);\n\n  function Triangle() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Triangle);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Triangle).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Triangle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(1));\n      this.context.lineTo(this.t(0), this.t(1));\n      this.context.lineTo(this.t(0.5), this.t(0));\n\n      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Triangle.prototype), \"_draw\", this).call(this);\n    }\n  }]);\n\n  return Triangle;\n}(_shape__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./shapes/node/triangle.js?");

/***/ }),

/***/ "./shapes/shape.js":
/*!*************************!*\
  !*** ./shapes/shape.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Shape; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar Shape =\n/*#__PURE__*/\nfunction () {\n  function Shape(canvas, config) {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Shape);\n\n    this.canvas = canvas;\n    this.config = config;\n    this[\"default\"] = {};\n\n    this._preConf();\n\n    this._setCanvas();\n\n    this._draw();\n\n    this.toBlob = new Promise(function (resolve, reject) {\n      _this.canvas.toBlob(function (blob) {\n        resolve(blob);\n      }, 'image/png');\n    });\n  } // Before the drawing; when the config is existed override the default config.\n\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Shape, [{\n    key: \"_preConf\",\n    value: function _preConf() {\n      // Default config\n      this[\"default\"] = {\n        stroke: {\n          color: \"#333333\",\n          size: 0\n        },\n        textureColor: \"#999999\",\n        size: 16\n      };\n\n      if (typeof this.config !== \"undefined\") {\n        if (typeof this.config.stroke !== \"undefined\") {\n          this.config.stroke.size = this.config.stroke.size || this[\"default\"].stroke.size;\n          this.config.stroke.color = this.config.stroke.color || this[\"default\"].stroke.color;\n        } else {\n          this.config.stroke = this[\"default\"].stroke;\n        }\n\n        this.config.textureColor = this.config.textureColor || this[\"default\"].textureColor;\n        this.config.size = this.config.size || this[\"default\"].size;\n      } else {\n        this.config = this[\"default\"];\n      }\n\n      this.canvas.width = 0;\n      this.canvas.height = 0;\n    } // Setting up the canvas width, height. Also, creating canvas context and colors.\n\n  }, {\n    key: \"_setCanvas\",\n    value: function _setCanvas() {\n      var cursor = {\n        x0: this.canvas.width,\n        y0: this.canvas.height,\n        x1: this.canvas.width + (this.config.stroke.size * 2 + this.config.size),\n        y1: this.canvas.height + (this.config.stroke.size * 2 + this.config.size)\n      };\n      this.canvas.width = cursor.x1;\n      this.canvas.height = cursor.y1;\n      this.context = this.canvas.getContext('2d');\n      this.context.fillStyle = this.config.textureColor;\n      this.context.strokeStyle = this.config.stroke.color;\n      this.context.lineWidth = this.config.stroke.size;\n      document.body.appendChild(this.canvas);\n    }\n  }, {\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    } // Canvas transform into the 0-1 range\n\n  }, {\n    key: \"t\",\n    value: function t(size) {\n      return this.config.stroke.size + this.config.size * size;\n    }\n  }]);\n\n  return Shape;\n}();\n\n\n\n//# sourceURL=webpack:///./shapes/shape.js?");

/***/ })

/******/ });