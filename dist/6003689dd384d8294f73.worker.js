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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/layout/tree.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layout/tree.worker.js":
/*!***********************************!*\
  !*** ./src/layout/tree.worker.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// /**
//  *  Copyright (c) 2017, Helikar Lab.
//  *  All rights reserved.
//  *
//  *  This source code is licensed under the GPLv3 License.
//  *  Author: Renato Fabbri
//  */

// import {getDepth, getRanges} from './utils';

// class Tree {
//   constructor(nodes, edges) {
//     this._nodes = nodes;
//     this._edges = edges;
//   }

//   drawTreeCentered(root, visited_leafs_parent=0, layer=1){
//       root.centered = true;
//       root.depth_visited = false; // so that getDepth does not raise error if another tree layout is called subsequently
//       // branch order is for now stable but unpredictable, see layouts.cri
//       let visited_leafs = 0;
//       for (let i=0; i < root.children.length; i++){
//           let child = root.children[i];
//           if (child.centered != true){
//               visited_leafs += this.drawTreeCentered(child, visited_leafs+visited_leafs_parent, layer+1);
//           }
//       }
//       if (root.children == 0){
//           visited_leafs++;
//       }
//       // moving to parent, position node
//       root.y = this.stepy*(visited_leafs_parent+(visited_leafs-1)/2) + this.alphay;
//       root.x = (layer-1)*this.stepx + this.alphax;
//       return visited_leafs;
//   }

//   apply () {
//       // only one root node supported for now
//       // left-right tree by default, let user choose
//       // top-down, bottom-top, right-left in subsequent versions
//       // hierarchical layouts for non-trees (cyclical graphs) should be
//       // implemented separately for now
//       let nodes = this._nodes;
//       // make hierarchy, annotate parent(s) and children in the nodes
//       nodes.forEach(function(n,i){
//           n.parents = [];
//           n.children = [];
//           n.centered = false;
//       });
//       this._edges.forEach(function(e,i){
//           e.source.children.push(e.target);
//           e.target.parents.push(e.source);
//       });
//       // find the root
//       for (let i = 0; i < nodes.length; i++){
//           if (nodes[i].parents.length == 0){
//               var root = nodes[i];
//               break;
//           }
//       }
//       const depth = getDepth(root);
//       // each layer of tree x = [0+alpha,1-alpha]
//       let r = getRanges(depth);
//       this.alphax = r.start;
//       this.stepx = r.step;
//       // posx = alphax + stepx*(depth-1)

//       // find the number of leafs to distribute nodes vertically
//       let leafs = 0;
//       nodes.forEach(function(node){
//           if (node.children.length == 0){
//               leafs++;
//           }
//       });
//       r = getRanges(leafs);
//       // each leaf y = [0+alpha,1-alpha]
//       this.alphay = r.start;
//       this.stepy = r.step;
//       // posy = alphay + stepy*(leafn-1)

//       this.drawTreeCentered(root);
//   }
// };

// self.addEventListener('message', function (e) {
//     var nodes = e.data.nodes;
//     var edges = e.data.edges;
//     var layout_options = e.data.layout_options;
//     new Tree(nodes, edges, layout_options).apply();
//     self.postMessage({ nodes, edges });
// }, false);

/***/ })

/******/ });
//# sourceMappingURL=6003689dd384d8294f73.worker.js.map