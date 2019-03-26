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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/layout/hierarchical.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layout/hierarchical.worker.js":
/*!*******************************************!*\
  !*** ./src/layout/hierarchical.worker.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

class Hierarchical {
  // this layout should handle any digraph
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this.alphay = 0.05; // y margin
    this.alphax = 0.05; // x margin
  }

  makeLayers(nodes, layer){
      if (nodes.length > 1){
          const stepy = (1 - 2*this.alphay)/(nodes.length-1);
          for (let i=0; i<nodes.length; ++i){
              nodes[i].visited = true;
              nodes[i].layer = layer; // makes x afterwards
              nodes[i].y = this.alphay + i*stepy;
          }
      }
      else {
          nodes[0].visited = true;
          nodes[0].layer = layer; // makes x afterwards
          nodes[0].y = 0.5;
      }
      let next_layer = [];
      for (let i=0; i<nodes.length; i++){
          let neighbors = nodes[i].parents.concat(nodes[i].children);
          for (let j=0; j < neighbors.length; j++){
              if (neighbors[j].visited == false && !next_layer.includes(neighbors[j])){
                  next_layer.push(neighbors[j]);
              }
          }
      }
      if (next_layer.length == 0){
          return layer;
      }
      else {
          return this.makeLayers(next_layer, layer+1);
      }
  }

  apply () {
      // left-right tree by default, let user choose
      // top-down, bottom-top, right-left in subsequent versions
      // hierarchical layouts for trees (acyclic graphs) are
      // implemented separately for now
      let nodes = this._nodes;
      nodes.forEach(function(n,i){
          n.parents = [];
          n.children = [];
          n.visited = false;
      });
      this._edges.forEach(function(e,i){
          e.source.children.push(e.target);
          e.target.parents.push(e.source);
      });
      // find the roots:
      // nodes defined by the user as roots OR
      // nodes with in-degree == 0 OR
      // nodes with greatest in-degree (or degree if undirected graph)
      let roots = [];
      for (let i = 0; i < nodes.length; i++){
          if (nodes[i].isroot == true){ // has to be on the json file of the graph
              roots.push(nodes[i]);
          }
      }
      if (roots.length == 0){
          for (let i = 0; i < nodes.length; i++){
              if (nodes[i].parents.length == 0){
                  roots.push(nodes[i]);
              }
          }
      }
      if (roots.length == 0){
          // calculate max out-degree
          let max_outdegree = 0;
          nodes.forEach(function(node){
              if (node.children.length > max_outdegree){
                  max_outdegree = node.children.length;
              }
          });
          // choose vertices with greatest out-degree
          nodes.forEach(function(node){
              if (node.children.length == max_outdegree){
                  roots.push(node);
              }
          });
      }
      // number of layers and max number of nodes in each layer
      // has to be found by making the layout
      // there are two approaches to finding the nodes in each layer:
      // 1) each layer has all the neighbors of the nodes in the previous layer
      // 2) follow links and then place non visited nodes on the layer of neighbors OR
      // this layout implements the first of these approaches.
      const depth = this.makeLayers(roots, 1);
      // each layer of tree x = [0+alpha,1-alpha]
      const stepx = (1-2*this.alphax)/(depth-1);
      // posx = alphax + stepx*(depth-1)
      for (let i=0; i<this._nodes.length; ++i){
          this._nodes[i].x = this.alphax + stepx*(this._nodes[i].layer - 1);
      }
  }
};


self.addEventListener('message', function (e) {
    var nodes = e.data.nodes;
    var edges = e.data.edges;
    var layout_options = e.data.layout_options;
    new Hierarchical(nodes, edges, layout_options).apply();
    self.postMessage({ nodes, edges });
}, false);

/***/ })

/******/ });
//# sourceMappingURL=1405827a25d508209dcb.worker.js.map