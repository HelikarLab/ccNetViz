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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Plugin; });\n/* harmony import */ var _shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape.js */ \"./shape.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Plugin =\n/*#__PURE__*/\nfunction () {\n  function Plugin() {\n    _classCallCheck(this, Plugin);\n\n    this.canvas = document.createElement('canvas');\n    this.canvas.width = 0;\n    this.canvas.height = 0; //this.canvas.style.display = 'none';\n  }\n\n  _createClass(Plugin, [{\n    key: \"circle\",\n    value: function circle(config) {\n      var circle = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Circle\"](this.canvas, config);\n    }\n  }, {\n    key: \"ellipse\",\n    value: function ellipse(config) {\n      var ellipse = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Ellipse\"](this.canvas, config);\n    }\n  }, {\n    key: \"triangle\",\n    value: function triangle(config) {\n      var triangle = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"](this.canvas, config);\n    }\n  }, {\n    key: \"rectangle\",\n    value: function rectangle(config) {\n      var rectangle = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](this.canvas, config);\n    }\n  }, {\n    key: \"rhombus\",\n    value: function rhombus(config) {\n      var rhombus = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Rhombus\"](this.canvas, config);\n    }\n  }, {\n    key: \"pentagon\",\n    value: function pentagon(config) {\n      var pentagon = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Pentagon\"](this.canvas, config);\n    }\n  }, {\n    key: \"hexagon\",\n    value: function hexagon(config) {\n      var hexagon = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Hexagon\"](this.canvas, config);\n    }\n  }, {\n    key: \"heptagon\",\n    value: function heptagon(config) {\n      var heptagon = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Heptagon\"](this.canvas, config);\n    }\n  }, {\n    key: \"star\",\n    value: function star(config) {\n      var star = new _shape_js__WEBPACK_IMPORTED_MODULE_0__[\"Star\"](this.canvas, config);\n    }\n  }]);\n\n  return Plugin;\n}();\n\n\nwindow.Plugin = Plugin;\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./shape.js":
/*!******************!*\
  !*** ./shape.js ***!
  \******************/
/*! exports provided: Circle, Ellipse, Triangle, Rectangle, Rhombus, Pentagon, Hexagon, Heptagon, Star */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Circle\", function() { return Circle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ellipse\", function() { return Ellipse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Triangle\", function() { return Triangle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rectangle\", function() { return Rectangle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rhombus\", function() { return Rhombus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pentagon\", function() { return Pentagon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hexagon\", function() { return Hexagon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Heptagon\", function() { return Heptagon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Star\", function() { return Star; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Shape =\n/*#__PURE__*/\nfunction () {\n  function Shape(canvas, config) {\n    var _this = this;\n\n    _classCallCheck(this, Shape);\n\n    this.canvas = canvas;\n    this.config = config;\n    this[\"default\"] = {\n      stroke: {\n        color: \"#333333\",\n        size: 0\n      },\n      color: \"#cf0101\",\n      size: 16\n    };\n\n    this._preConf();\n\n    this._setCanvas();\n\n    this._draw();\n\n    this._toBlob(this.canvas).then(function (blob) {\n      _this.config.blob = URL.createObjectURL(blob);\n      console.log(_this.config.blob);\n    })[\"catch\"](function (err) {\n      console.log(err);\n    });\n  }\n\n  _createClass(Shape, [{\n    key: \"_preConf\",\n    value: function _preConf() {\n      if (typeof this.config !== \"undefined\") {\n        if (typeof this.config.stroke !== \"undefined\") {\n          this.config.stroke.size = this.config.stroke.size || this[\"default\"].stroke.size;\n          this.config.stroke.color = this.config.stroke.color || this[\"default\"].stroke.color;\n        } else {\n          this.config.stroke = this[\"default\"].stroke;\n        }\n\n        this.config.color = this.config.color || this[\"default\"].color;\n        this.config.size = this.config.size || this[\"default\"].size;\n      } else {\n        this.config = this[\"default\"];\n      }\n\n      this.canvas.width = 0;\n      this.canvas.height = 0;\n    }\n  }, {\n    key: \"_setCanvas\",\n    value: function _setCanvas() {\n      this.config.cursor = {\n        x0: this.canvas.width,\n        y0: this.canvas.height,\n        x1: this.canvas.width + (this.config.stroke.size * 2 + this.config.size),\n        y1: this.canvas.height + (this.config.stroke.size * 2 + this.config.size)\n      };\n      this.canvas.width = this.config.cursor.x1;\n      this.canvas.height = this.config.cursor.y1;\n      this.context = this.canvas.getContext('2d');\n      this.context.fillStyle = this.config.color;\n      this.context.strokeStyle = this.config.stroke.color;\n      this.context.lineWidth = this.config.stroke.size;\n      document.body.appendChild(this.canvas);\n    }\n  }, {\n    key: \"_draw\",\n    value: function _draw() {}\n  }, {\n    key: \"_toBlob\",\n    value: function _toBlob(canvas) {\n      var mimeType = 'image/png';\n      return new Promise(function (resolve, reject) {\n        canvas.toBlob(function (blob) {\n          resolve(blob);\n        }, mimeType);\n      });\n    }\n  }, {\n    key: \"t\",\n    value: function t(size) {\n      return this.config.stroke.size + this.config.size * size;\n    }\n  }]);\n\n  return Shape;\n}();\n\nvar Circle =\n/*#__PURE__*/\nfunction (_Shape) {\n  _inherits(Circle, _Shape);\n\n  function Circle() {\n    _classCallCheck(this, Circle);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Circle).apply(this, arguments));\n  }\n\n  _createClass(Circle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.arc(this.config.size / 2 + this.config.stroke.size, this.config.size / 2 + this.config.stroke.size, this.config.size / 2, 0, 2 * Math.PI);\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Circle;\n}(Shape);\n\nvar Ellipse =\n/*#__PURE__*/\nfunction (_Shape2) {\n  _inherits(Ellipse, _Shape2);\n\n  function Ellipse() {\n    _classCallCheck(this, Ellipse);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Ellipse).apply(this, arguments));\n  }\n\n  _createClass(Ellipse, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.ellipse(this.config.size / 2 + this.config.stroke.size, this.config.size / 2 + this.config.stroke.size, this.config.size / 2, this.config.size / 4, Math.PI / 4, 0, 2 * Math.PI);\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Ellipse;\n}(Shape);\n\nvar Triangle =\n/*#__PURE__*/\nfunction (_Shape3) {\n  _inherits(Triangle, _Shape3);\n\n  function Triangle() {\n    _classCallCheck(this, Triangle);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Triangle).apply(this, arguments));\n  }\n\n  _createClass(Triangle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(1));\n      this.context.lineTo(this.t(0), this.t(1));\n      this.context.lineTo(this.t(0.5), this.t(0));\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Triangle;\n}(Shape);\n\nvar Rectangle =\n/*#__PURE__*/\nfunction (_Shape4) {\n  _inherits(Rectangle, _Shape4);\n\n  function Rectangle() {\n    _classCallCheck(this, Rectangle);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).apply(this, arguments));\n  }\n\n  _createClass(Rectangle, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0), this.t(0));\n      this.context.lineTo(this.t(0), this.t(1));\n      this.context.lineTo(this.t(1), this.t(1));\n      this.context.lineTo(this.t(1), this.t(0));\n      this.context.lineTo(this.t(0), this.t(0));\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Rectangle;\n}(Shape);\n\nvar Rhombus =\n/*#__PURE__*/\nfunction (_Shape5) {\n  _inherits(Rhombus, _Shape5);\n\n  function Rhombus() {\n    _classCallCheck(this, Rhombus);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Rhombus).apply(this, arguments));\n  }\n\n  _createClass(Rhombus, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(0.5));\n      this.context.lineTo(this.t(0.5), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.5));\n      this.context.lineTo(this.t(0.5), this.t(0));\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Rhombus;\n}(Shape);\n\nvar Pentagon =\n/*#__PURE__*/\nfunction (_Shape6) {\n  _inherits(Pentagon, _Shape6);\n\n  function Pentagon() {\n    _classCallCheck(this, Pentagon);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Pentagon).apply(this, arguments));\n  }\n\n  _createClass(Pentagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(1), this.t(0.4));\n      this.context.lineTo(this.t(0.8), this.t(1));\n      this.context.lineTo(this.t(0.2), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.4));\n      this.context.lineTo(this.t(0.5), this.t(0));\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Pentagon;\n}(Shape);\n\nvar Hexagon =\n/*#__PURE__*/\nfunction (_Shape7) {\n  _inherits(Hexagon, _Shape7);\n\n  function Hexagon() {\n    _classCallCheck(this, Hexagon);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Hexagon).apply(this, arguments));\n  }\n\n  _createClass(Hexagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.25), this.t(0));\n      this.context.lineTo(this.t(0.75), this.t(0.0));\n      this.context.lineTo(this.t(1), this.t(0.5));\n      this.context.lineTo(this.t(0.75), this.t(1));\n      this.context.lineTo(this.t(0.25), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.5));\n      this.context.lineTo(this.t(0.25), this.t(0));\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Hexagon;\n}(Shape);\n\nvar Heptagon =\n/*#__PURE__*/\nfunction (_Shape8) {\n  _inherits(Heptagon, _Shape8);\n\n  function Heptagon() {\n    _classCallCheck(this, Heptagon);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Heptagon).apply(this, arguments));\n  }\n\n  _createClass(Heptagon, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(0.9), this.t(0.2));\n      this.context.lineTo(this.t(1), this.t(0.7));\n      this.context.lineTo(this.t(0.7), this.t(1));\n      this.context.lineTo(this.t(0.3), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.7));\n      this.context.lineTo(this.t(0.1), this.t(0.2));\n      this.context.lineTo(this.t(0.5), this.t(0));\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Heptagon;\n}(Shape);\n\nvar Star =\n/*#__PURE__*/\nfunction (_Shape9) {\n  _inherits(Star, _Shape9);\n\n  function Star() {\n    _classCallCheck(this, Star);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Star).apply(this, arguments));\n  }\n\n  _createClass(Star, [{\n    key: \"_draw\",\n    value: function _draw() {\n      this.context.beginPath();\n      this.context.moveTo(this.t(0.5), this.t(0));\n      this.context.lineTo(this.t(0.8), this.t(1));\n      this.context.lineTo(this.t(0), this.t(0.4));\n      this.context.lineTo(this.t(1), this.t(0.4));\n      this.context.lineTo(this.t(0.2), this.t(1));\n      this.context.closePath();\n      this.context.stroke();\n      this.context.fill();\n    }\n  }]);\n\n  return Star;\n}(Shape);\n\n\n\n//# sourceURL=webpack:///./shape.js?");

/***/ })

/******/ });