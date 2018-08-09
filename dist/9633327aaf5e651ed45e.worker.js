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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/layout/spectral2.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layout/spectral2.worker.js":
/*!****************************************!*\
  !*** ./src/layout/spectral2.worker.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/layout/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

// inspired in Matlab implementation
// and JS transcription in
// https://github.com/alanmeeson/spectral-graph-layout



class Spectral2 {
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this._epsilon = 1e-8; // tolerance
    this._MAX_ITTERATIONS = 100; //We use power iteration, this is analogous to wall time to avoid infinite loops.
    this._num_elements = nodes.length; //number of nodes in graph
    this._dims = 2;
  }
  apply () {
      let A = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create2dArray"])(this._nodes.length, this._nodes.length);
      // build the adjacency matrix
      for (let i=0; i<this._edges.length; ++i){
          let ii = this._edges[i].source.index;
          let j = this._edges[i].target.index;
          A[ii][j] = 1; // not considering edge weight for now (the example json files don't have weight)
      }
      const D = deg(A); //degree of each node in graph (number of connections).

      const dims = this._dims + 1; //add one to the dims to allow for the first eigen vector
      let u = new Array(dims);//declare the eigen vector matrix
      u[0] = normalize(ones(this._num_elements)); //create & normalize the first eigen vector
      for (let i = 1; i < dims; i++) u[i] = zeros(this._num_elements); //create empty space for the other eigen vectors

      //Power iteration to determine the remaining eigen vectors.
      for (let k=1; k < dims; k++) { //for each eigen vector after the first, 
          //initialize eigen vector with random values
          let uhk = normalize(rand(this._num_elements));

          let itt_count = 0; //we are allowing a max of 100 iterations, to avoid hanging and infinite loops. (specified above in constants)
          let stop = false; //stopping criterion flag.
          while (!stop) { // do...while using flags to keep it consistent with my matlab implementation

              //D-orthogonalize against previous eigenvectors
              let uk = uhk.slice();
              for (let l = 0; l < k; l++) {						
                  let ul = u[l]; //extract the l-th eigen vector

                  //Calculate (uk'.D.ul)/(ul'.D.ul)
                  let top_ = 0;
                  let bottom = 0;
                  for (let vmi = 0; vmi < uk.length; vmi++) {
                      top_ += (uk[vmi] * D[vmi] * ul[vmi]);
                      bottom += (ul[vmi] * D[vmi] * ul[vmi]);
                  }
                  const ratio = top_ / bottom;

                  //uk = uk - ((uk' . D . ul) / (ul' . D ul)) . ul
                  for (let vsi = 0; vsi < uk.length; vsi++) {
                      uk[vsi] = uk[vsi] - (ratio * ul[vsi]);
                  }
              }

              //multiply with .5(I+D^-1 A)
              for (let i = 0; i < uhk.length; i++) {
                  uhk[i] = 0.5 * (uk[i] + dot(A[i], uk) / D[i]);
              }


              uhk = normalize(uhk);

              itt_count = itt_count + 1;
              stop = (itt_count > 100) | !(dot(uhk, uk) < (1-this._epsilon));
          }
          u[k] = uhk.slice();	
      }

      //discard the first eigenvector which should be [ones].
      // var v = new Array(u.length);
      // for (var i=0; i < u.length; i++) {
      //     v[i] = new Array(u[i].length);
      //     for (var j=0; j < u[i].length; j++) v[i][j] = u[i][j];
      // }
      const x = normalize2(u[1]);
      const y = normalize2(u[2]);
      this._nodes.forEach(function(node, i){
          node.x = x[i];
          node.y = y[i];
      }); 
  }
};

function deg(graph) {
    //Calculate the degree of each node from the graph matrix.
    let d = zeros(graph.length);

    //degree of node i is the sum of the weights of all edges connected to it.
    for (let i = 0; i < graph.length; i++) {
        let node_degree = 0;
        for (let j = 0; j < graph[i].length; j++) {
            node_degree += graph[i][j];
        }
        d[i] = node_degree+1;
    }

    return d;
}

function dot(a,b) {
    //inner product of two vectors
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += a[i] * b[i];
    }
    return d;
}

function euclideanDistance(coordinates) {
    //calculate the euclidean distance between two points/vectors.
    // used for normalization.
    let d = 0;

    for (let i = 0; i < coordinates.length; i++) {
        d += Math.pow(coordinates[i], 2);
    }
    return Math.sqrt(d);
}

function normalize(arr) {
    //normalizes a vector = arr/||arr||
    const d = euclideanDistance(arr);
    let narr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        narr[i] = arr[i] / d;
    }

    return narr;
}

function rand(n) {
    //create a vector of length n and fill with random numbers.
    let arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = Math.random();
    return arr;
}

function add(a, b) {
    let c = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
        c[i] = new Array(a[i].length);
        for (let j = 0; j < a[i].length; j++) c[i][j] = a[i][j] + b[i][j];
    }
    return c;
}

function symmetricRandMatrix(n, ulim) {
    let mat = new Array(n);
    for (let i = 0; i < n; i++) {
        mat[i] = new Array(n);
        mat[i][i] = 0;
    }
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            mat[i][j] = ulim * Math.random();
            mat[j][i] = mat[i][j];
        }
    }
    return mat;
}

function zeros(n) {
    //create a vector filled with zeros
    let arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = 0;
    return arr;
}

function ones(n) {
    //create a vector filled with ones
    let arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = 1;
    return arr;
}

function normalize2 (x) {
    let maxx = Math.max.apply(null, x.map(Math.abs));
    let minx = Math.min.apply(null, x);
    for(let i=0; i<x.length; ++i){
        x[i] = 0.1+(x[i]-minx)/((maxx - minx)*1.25);
    }
    return x;
}

self.addEventListener('message', function (e) {
    var nodes = e.data.nodes;
    var edges = e.data.edges;
    var layout_options = e.data.layout_options;
    new Spectral2(nodes, edges, layout_options).apply();
    self.postMessage({ nodes, edges });
}, false);

/***/ }),

/***/ "./src/layout/utils.js":
/*!*****************************!*\
  !*** ./src/layout/utils.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create2dArray = create2dArray;
exports.degrees = degrees;
exports.getDepth = getDepth;
exports.getRanges = getRanges;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

function create2dArray(rows, columns) {
    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {
        return Array(columns).fill(0);
    });
}

function degrees(nodes, edges) {
    // should return ordered nodes and their degrees - high to low
    var degrees = Array(nodes.length).fill(0);
    edges.forEach(function (e) {
        degrees[e.source.index] += 1;
        degrees[e.target.index] += 1;
    }); // check to see if not getting double of the degree in undirected graphs
    //getting the order of nodes from highest to lowest degrees
    var ordered_nodes = degrees.map(function (el, i) {
        return { index: i, value: el };
    });
    ordered_nodes.sort(function (a, b) {
        return +(a.value < b.value) || +(a.value === b.value) - 1;
    });
    var ordered_degrees = ordered_nodes.map(function (el) {
        return degrees[el.index];
    });
    return { nodes: ordered_nodes,
        degrees: ordered_degrees };
}

function getDepth(obj) {
    var depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
            if (d.depth_visited == true) {
                throw new Error("This layout is only for trees acyclic graphs");
            }
            d.depth_visited = true;
            var tmpDepth = getDepth(d);
            if (tmpDepth > depth) {
                depth = tmpDepth;
            }
        });
    }
    return 1 + depth;
}

function getRanges(n) {
    n = Math.abs(n);
    if (n <= 1) {
        return {
            start: 0.5,
            step: 1
        };
    }
    var start = .05;
    return {
        start: start,
        step: (1 - 2 * start) / (n - 1)
    };
}

/***/ })

/******/ });
//# sourceMappingURL=9633327aaf5e651ed45e.worker.js.map