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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-polyfill/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ "./node_modules/core-js/shim.js");

__webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js");

__webpack_require__(/*! core-js/fn/regexp/escape */ "./node_modules/core-js/fn/regexp/escape.js");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-js/fn/regexp/escape.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ "./node_modules/core-js/modules/core.regexp.escape.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").RegExp.escape;


/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_a-number-value.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-instance.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-copy-within.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-fill.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-from-iterable.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-reduce.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

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
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_bind.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/modules/_invoke.js");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-strong.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var fastKey = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-to-json.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-weak.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var getWeak = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js");
var $has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_create-property.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_date-to-iso-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),

/***/ "./node_modules/core-js/modules/_date-to-primitive.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
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
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fix-re-wks.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_flags.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_flatten-into-array.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),

/***/ "./node_modules/core-js/modules/_for-of.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_invoke.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array-iter.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-call.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-detect.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_math-expm1.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),

/***/ "./node_modules/core-js/modules/_math-fround.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js");
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-log1p.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-scale.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-sign.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_metadata.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ "./node_modules/core-js/modules/es6.map.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js"))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),

/***/ "./node_modules/core-js/modules/_microtask.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var macrotask = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_new-promise-capability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-forced-pam.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") || !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js")[K];
});


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-sap.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-to-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_own-keys.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var Reflect = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_parse-float.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js") + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ "./node_modules/core-js/modules/_parse-int.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;
var ws = __webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js");
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "./node_modules/core-js/modules/_perform.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_promise-resolve.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
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

/***/ "./node_modules/core-js/modules/_redefine-all.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_replacer.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_same-value.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-collection-from.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-collection-of.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_species-constructor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_strict-method.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-html.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-pad.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var repeat = __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-repeat.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-trim.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var spaces = __webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
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

/***/ "./node_modules/core-js/modules/_string-ws.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/core-js/modules/_task.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-index.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
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

/***/ "./node_modules/core-js/modules/_typed-array.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js")) {
  var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
  var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
  var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
  var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
  var $typed = __webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js");
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ "./node_modules/core-js/modules/_typed-buffer.js");
  var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
  var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
  var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
  var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
  var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
  var toIndex = __webpack_require__(/*! ./_to-index */ "./node_modules/core-js/modules/_to-index.js");
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
  var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
  var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
  var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
  var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
  var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
  var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
  var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
  var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js");
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js");
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
  var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
  var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
  var arrayFill = __webpack_require__(/*! ./_array-fill */ "./node_modules/core-js/modules/_array-fill.js");
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ "./node_modules/core-js/modules/_array-copy-within.js");
  var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js/modules/_typed-buffer.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $typed = __webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toIndex = __webpack_require__(/*! ./_to-index */ "./node_modules/core-js/modules/_to-index.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ "./node_modules/core-js/modules/_array-fill.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),

/***/ "./node_modules/core-js/modules/_typed.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_user-agent.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_user-agent.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "./node_modules/core-js/modules/_validate-collection.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/core.get-iterator-method.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/modules/core.regexp.escape.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $re = __webpack_require__(/*! ./_replacer */ "./node_modules/core-js/modules/_replacer.js")(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.copy-within.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ "./node_modules/core-js/modules/_array-copy-within.js") });

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('copyWithin');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.every.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $every = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.fill.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ "./node_modules/core-js/modules/_array-fill.js") });

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('fill');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.filter.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $filter = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find-index.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.for-each.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $forEach = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.from.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.index-of.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $indexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.is-array.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.join.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js") != Object || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.last-index-of.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.map.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $map = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.of.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.reduce-right.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $reduce = __webpack_require__(/*! ./_array-reduce */ "./node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.reduce.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $reduce = __webpack_require__(/*! ./_array-reduce */ "./node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.slice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.some.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $some = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.sort.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.species.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('Array');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.now.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-iso-string.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ "./node_modules/core-js/modules/_date-to-iso-string.js");

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-json.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ "./node_modules/core-js/modules/_date-to-primitive.js"));


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.bind.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ "./node_modules/core-js/modules/_bind.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.has-instance.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.name.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.map.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.acosh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var log1p = __webpack_require__(/*! ./_math-log1p */ "./node_modules/core-js/modules/_math-log1p.js");
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.asinh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.atanh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.cbrt.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var sign = __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js");

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.clz32.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.cosh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.expm1.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.fround.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ "./node_modules/core-js/modules/_math-fround.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.hypot.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.imul.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log10.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log1p.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ "./node_modules/core-js/modules/_math-log1p.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log2.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.sign.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.sinh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.tanh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.trunc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, NUMBER, $Number);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.epsilon.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-finite.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var _isFinite = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-integer.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ "./node_modules/core-js/modules/_is-integer.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-nan.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-safe-integer.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isInteger = __webpack_require__(/*! ./_is-integer */ "./node_modules/core-js/modules/_is-integer.js");
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.max-safe-integer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.min-safe-integer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.parse-float.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseFloat = __webpack_require__(/*! ./_parse-float */ "./node_modules/core-js/modules/_parse-float.js");
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.parse-int.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/core-js/modules/_parse-int.js");
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.to-fixed.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "./node_modules/core-js/modules/_a-number-value.js");
var repeat = __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js");
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.to-precision.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "./node_modules/core-js/modules/_a-number-value.js");
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.create.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-properties.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.freeze.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-names.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js").f;
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-extensible.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-frozen.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-sealed.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ "./node_modules/core-js/modules/_same-value.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.prevent-extensions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.seal.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.set-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.parse-float.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseFloat = __webpack_require__(/*! ./_parse-float */ "./node_modules/core-js/modules/_parse-float.js");
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.parse-int.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/core-js/modules/_parse-int.js");
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.promise.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var task = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js").set;
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.apply.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var rApply = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.construct.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var bind = __webpack_require__(/*! ./_bind */ "./node_modules/core-js/modules/_bind.js");
var rConstruct = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.define-property.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.delete-property.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.enumerate.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js")(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get-prototype-of.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var getProto = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.has.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.is-extensible.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.own-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ "./node_modules/core-js/modules/_own-keys.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.prevent-extensions.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.set-prototype-of.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var setProto = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js");

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.set.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  re2[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('RegExp');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.flags.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.match.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.replace.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.search.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.split.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.set.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.anchor.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.big.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.blink.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.bold.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.code-point-at.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.ends-with.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fixed.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fontcolor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fontsize.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.from-code-point.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.includes.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.italics.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.link.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.raw.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.repeat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.small.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.strike.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.sub.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.sup.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.trim.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js")('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.array-buffer.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $typed = __webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js");
var buffer = __webpack_require__(/*! ./_typed-buffer */ "./node_modules/core-js/modules/_typed-buffer.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var ArrayBuffer = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")(ARRAY_BUFFER);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.data-view.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ "./node_modules/core-js/modules/_typed.js").ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ "./node_modules/core-js/modules/_typed-buffer.js").DataView
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.float32-array.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.float64-array.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.int16-array.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.int32-array.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.int8-array.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint16-array.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint32-array.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint8-array.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "./node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.weak-map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var assign = __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js");
var weak = __webpack_require__(/*! ./_collection-weak */ "./node_modules/core-js/modules/_collection-weak.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.weak-set.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ "./node_modules/core-js/modules/_collection-weak.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.flat-map.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ "./node_modules/core-js/modules/_flatten-into-array.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('flatMap');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.flatten.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ "./node_modules/core-js/modules/_flatten-into-array.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('flatten');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $includes = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('includes');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.asap.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/modules/_microtask.js")();
var process = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").process;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.error.is-error.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.global.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.G, { global: __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('Map');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.of.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('Map');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.to-json.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ "./node_modules/core-js/modules/_collection-to-json.js")('Map') });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.clamp.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.deg-per-rad.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.degrees.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.fscale.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var scale = __webpack_require__(/*! ./_math-scale */ "./node_modules/core-js/modules/_math-scale.js");
var fround = __webpack_require__(/*! ./_math-fround */ "./node_modules/core-js/modules/_math-fround.js");

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.iaddh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.imulh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.isubh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.rad-per-deg.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.radians.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.scale.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ "./node_modules/core-js/modules/_math-scale.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.signbit.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.math.umulh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.define-getter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.define-setter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.entries.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $entries = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var ownKeys = __webpack_require__(/*! ./_own-keys */ "./node_modules/core-js/modules/_own-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.lookup-getter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.lookup-setter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.values.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $values = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/modules/_object-to-array.js")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.observable.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/modules/_microtask.js")();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('Observable');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.promise.finally.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.promise.try.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.define-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ "./node_modules/core-js/modules/es6.set.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.metadata.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('Set');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.of.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('Set');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.to-json.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ "./node_modules/core-js/modules/_collection-to-json.js")('Set') });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.at.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.match-all.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var getFlags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js")($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.pad-end.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $pad = __webpack_require__(/*! ./_string-pad */ "./node_modules/core-js/modules/_string-pad.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.pad-start.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $pad = __webpack_require__(/*! ./_string-pad */ "./node_modules/core-js/modules/_string-pad.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.trim-left.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js")('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.string.trim-right.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js")('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.async-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.observable.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.system.global.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-map.from.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('WeakMap');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-map.of.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('WeakMap');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-set.from.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('WeakSet');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.weak-set.of.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('WeakSet');


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.immediate.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $task = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js");
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.timers.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ "./node_modules/core-js/shim.js":
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
__webpack_require__(/*! ./modules/es6.object.create */ "./node_modules/core-js/modules/es6.object.create.js");
__webpack_require__(/*! ./modules/es6.object.define-property */ "./node_modules/core-js/modules/es6.object.define-property.js");
__webpack_require__(/*! ./modules/es6.object.define-properties */ "./node_modules/core-js/modules/es6.object.define-properties.js");
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js");
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ "./node_modules/core-js/modules/es6.object.get-prototype-of.js");
__webpack_require__(/*! ./modules/es6.object.keys */ "./node_modules/core-js/modules/es6.object.keys.js");
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ "./node_modules/core-js/modules/es6.object.get-own-property-names.js");
__webpack_require__(/*! ./modules/es6.object.freeze */ "./node_modules/core-js/modules/es6.object.freeze.js");
__webpack_require__(/*! ./modules/es6.object.seal */ "./node_modules/core-js/modules/es6.object.seal.js");
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ "./node_modules/core-js/modules/es6.object.prevent-extensions.js");
__webpack_require__(/*! ./modules/es6.object.is-frozen */ "./node_modules/core-js/modules/es6.object.is-frozen.js");
__webpack_require__(/*! ./modules/es6.object.is-sealed */ "./node_modules/core-js/modules/es6.object.is-sealed.js");
__webpack_require__(/*! ./modules/es6.object.is-extensible */ "./node_modules/core-js/modules/es6.object.is-extensible.js");
__webpack_require__(/*! ./modules/es6.object.assign */ "./node_modules/core-js/modules/es6.object.assign.js");
__webpack_require__(/*! ./modules/es6.object.is */ "./node_modules/core-js/modules/es6.object.is.js");
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ "./node_modules/core-js/modules/es6.object.set-prototype-of.js");
__webpack_require__(/*! ./modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ./modules/es6.function.bind */ "./node_modules/core-js/modules/es6.function.bind.js");
__webpack_require__(/*! ./modules/es6.function.name */ "./node_modules/core-js/modules/es6.function.name.js");
__webpack_require__(/*! ./modules/es6.function.has-instance */ "./node_modules/core-js/modules/es6.function.has-instance.js");
__webpack_require__(/*! ./modules/es6.parse-int */ "./node_modules/core-js/modules/es6.parse-int.js");
__webpack_require__(/*! ./modules/es6.parse-float */ "./node_modules/core-js/modules/es6.parse-float.js");
__webpack_require__(/*! ./modules/es6.number.constructor */ "./node_modules/core-js/modules/es6.number.constructor.js");
__webpack_require__(/*! ./modules/es6.number.to-fixed */ "./node_modules/core-js/modules/es6.number.to-fixed.js");
__webpack_require__(/*! ./modules/es6.number.to-precision */ "./node_modules/core-js/modules/es6.number.to-precision.js");
__webpack_require__(/*! ./modules/es6.number.epsilon */ "./node_modules/core-js/modules/es6.number.epsilon.js");
__webpack_require__(/*! ./modules/es6.number.is-finite */ "./node_modules/core-js/modules/es6.number.is-finite.js");
__webpack_require__(/*! ./modules/es6.number.is-integer */ "./node_modules/core-js/modules/es6.number.is-integer.js");
__webpack_require__(/*! ./modules/es6.number.is-nan */ "./node_modules/core-js/modules/es6.number.is-nan.js");
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ "./node_modules/core-js/modules/es6.number.is-safe-integer.js");
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ "./node_modules/core-js/modules/es6.number.max-safe-integer.js");
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ "./node_modules/core-js/modules/es6.number.min-safe-integer.js");
__webpack_require__(/*! ./modules/es6.number.parse-float */ "./node_modules/core-js/modules/es6.number.parse-float.js");
__webpack_require__(/*! ./modules/es6.number.parse-int */ "./node_modules/core-js/modules/es6.number.parse-int.js");
__webpack_require__(/*! ./modules/es6.math.acosh */ "./node_modules/core-js/modules/es6.math.acosh.js");
__webpack_require__(/*! ./modules/es6.math.asinh */ "./node_modules/core-js/modules/es6.math.asinh.js");
__webpack_require__(/*! ./modules/es6.math.atanh */ "./node_modules/core-js/modules/es6.math.atanh.js");
__webpack_require__(/*! ./modules/es6.math.cbrt */ "./node_modules/core-js/modules/es6.math.cbrt.js");
__webpack_require__(/*! ./modules/es6.math.clz32 */ "./node_modules/core-js/modules/es6.math.clz32.js");
__webpack_require__(/*! ./modules/es6.math.cosh */ "./node_modules/core-js/modules/es6.math.cosh.js");
__webpack_require__(/*! ./modules/es6.math.expm1 */ "./node_modules/core-js/modules/es6.math.expm1.js");
__webpack_require__(/*! ./modules/es6.math.fround */ "./node_modules/core-js/modules/es6.math.fround.js");
__webpack_require__(/*! ./modules/es6.math.hypot */ "./node_modules/core-js/modules/es6.math.hypot.js");
__webpack_require__(/*! ./modules/es6.math.imul */ "./node_modules/core-js/modules/es6.math.imul.js");
__webpack_require__(/*! ./modules/es6.math.log10 */ "./node_modules/core-js/modules/es6.math.log10.js");
__webpack_require__(/*! ./modules/es6.math.log1p */ "./node_modules/core-js/modules/es6.math.log1p.js");
__webpack_require__(/*! ./modules/es6.math.log2 */ "./node_modules/core-js/modules/es6.math.log2.js");
__webpack_require__(/*! ./modules/es6.math.sign */ "./node_modules/core-js/modules/es6.math.sign.js");
__webpack_require__(/*! ./modules/es6.math.sinh */ "./node_modules/core-js/modules/es6.math.sinh.js");
__webpack_require__(/*! ./modules/es6.math.tanh */ "./node_modules/core-js/modules/es6.math.tanh.js");
__webpack_require__(/*! ./modules/es6.math.trunc */ "./node_modules/core-js/modules/es6.math.trunc.js");
__webpack_require__(/*! ./modules/es6.string.from-code-point */ "./node_modules/core-js/modules/es6.string.from-code-point.js");
__webpack_require__(/*! ./modules/es6.string.raw */ "./node_modules/core-js/modules/es6.string.raw.js");
__webpack_require__(/*! ./modules/es6.string.trim */ "./node_modules/core-js/modules/es6.string.trim.js");
__webpack_require__(/*! ./modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ./modules/es6.string.code-point-at */ "./node_modules/core-js/modules/es6.string.code-point-at.js");
__webpack_require__(/*! ./modules/es6.string.ends-with */ "./node_modules/core-js/modules/es6.string.ends-with.js");
__webpack_require__(/*! ./modules/es6.string.includes */ "./node_modules/core-js/modules/es6.string.includes.js");
__webpack_require__(/*! ./modules/es6.string.repeat */ "./node_modules/core-js/modules/es6.string.repeat.js");
__webpack_require__(/*! ./modules/es6.string.starts-with */ "./node_modules/core-js/modules/es6.string.starts-with.js");
__webpack_require__(/*! ./modules/es6.string.anchor */ "./node_modules/core-js/modules/es6.string.anchor.js");
__webpack_require__(/*! ./modules/es6.string.big */ "./node_modules/core-js/modules/es6.string.big.js");
__webpack_require__(/*! ./modules/es6.string.blink */ "./node_modules/core-js/modules/es6.string.blink.js");
__webpack_require__(/*! ./modules/es6.string.bold */ "./node_modules/core-js/modules/es6.string.bold.js");
__webpack_require__(/*! ./modules/es6.string.fixed */ "./node_modules/core-js/modules/es6.string.fixed.js");
__webpack_require__(/*! ./modules/es6.string.fontcolor */ "./node_modules/core-js/modules/es6.string.fontcolor.js");
__webpack_require__(/*! ./modules/es6.string.fontsize */ "./node_modules/core-js/modules/es6.string.fontsize.js");
__webpack_require__(/*! ./modules/es6.string.italics */ "./node_modules/core-js/modules/es6.string.italics.js");
__webpack_require__(/*! ./modules/es6.string.link */ "./node_modules/core-js/modules/es6.string.link.js");
__webpack_require__(/*! ./modules/es6.string.small */ "./node_modules/core-js/modules/es6.string.small.js");
__webpack_require__(/*! ./modules/es6.string.strike */ "./node_modules/core-js/modules/es6.string.strike.js");
__webpack_require__(/*! ./modules/es6.string.sub */ "./node_modules/core-js/modules/es6.string.sub.js");
__webpack_require__(/*! ./modules/es6.string.sup */ "./node_modules/core-js/modules/es6.string.sup.js");
__webpack_require__(/*! ./modules/es6.date.now */ "./node_modules/core-js/modules/es6.date.now.js");
__webpack_require__(/*! ./modules/es6.date.to-json */ "./node_modules/core-js/modules/es6.date.to-json.js");
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ "./node_modules/core-js/modules/es6.date.to-iso-string.js");
__webpack_require__(/*! ./modules/es6.date.to-string */ "./node_modules/core-js/modules/es6.date.to-string.js");
__webpack_require__(/*! ./modules/es6.date.to-primitive */ "./node_modules/core-js/modules/es6.date.to-primitive.js");
__webpack_require__(/*! ./modules/es6.array.is-array */ "./node_modules/core-js/modules/es6.array.is-array.js");
__webpack_require__(/*! ./modules/es6.array.from */ "./node_modules/core-js/modules/es6.array.from.js");
__webpack_require__(/*! ./modules/es6.array.of */ "./node_modules/core-js/modules/es6.array.of.js");
__webpack_require__(/*! ./modules/es6.array.join */ "./node_modules/core-js/modules/es6.array.join.js");
__webpack_require__(/*! ./modules/es6.array.slice */ "./node_modules/core-js/modules/es6.array.slice.js");
__webpack_require__(/*! ./modules/es6.array.sort */ "./node_modules/core-js/modules/es6.array.sort.js");
__webpack_require__(/*! ./modules/es6.array.for-each */ "./node_modules/core-js/modules/es6.array.for-each.js");
__webpack_require__(/*! ./modules/es6.array.map */ "./node_modules/core-js/modules/es6.array.map.js");
__webpack_require__(/*! ./modules/es6.array.filter */ "./node_modules/core-js/modules/es6.array.filter.js");
__webpack_require__(/*! ./modules/es6.array.some */ "./node_modules/core-js/modules/es6.array.some.js");
__webpack_require__(/*! ./modules/es6.array.every */ "./node_modules/core-js/modules/es6.array.every.js");
__webpack_require__(/*! ./modules/es6.array.reduce */ "./node_modules/core-js/modules/es6.array.reduce.js");
__webpack_require__(/*! ./modules/es6.array.reduce-right */ "./node_modules/core-js/modules/es6.array.reduce-right.js");
__webpack_require__(/*! ./modules/es6.array.index-of */ "./node_modules/core-js/modules/es6.array.index-of.js");
__webpack_require__(/*! ./modules/es6.array.last-index-of */ "./node_modules/core-js/modules/es6.array.last-index-of.js");
__webpack_require__(/*! ./modules/es6.array.copy-within */ "./node_modules/core-js/modules/es6.array.copy-within.js");
__webpack_require__(/*! ./modules/es6.array.fill */ "./node_modules/core-js/modules/es6.array.fill.js");
__webpack_require__(/*! ./modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
__webpack_require__(/*! ./modules/es6.array.find-index */ "./node_modules/core-js/modules/es6.array.find-index.js");
__webpack_require__(/*! ./modules/es6.array.species */ "./node_modules/core-js/modules/es6.array.species.js");
__webpack_require__(/*! ./modules/es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
__webpack_require__(/*! ./modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
__webpack_require__(/*! ./modules/es6.regexp.to-string */ "./node_modules/core-js/modules/es6.regexp.to-string.js");
__webpack_require__(/*! ./modules/es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
__webpack_require__(/*! ./modules/es6.regexp.match */ "./node_modules/core-js/modules/es6.regexp.match.js");
__webpack_require__(/*! ./modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
__webpack_require__(/*! ./modules/es6.regexp.search */ "./node_modules/core-js/modules/es6.regexp.search.js");
__webpack_require__(/*! ./modules/es6.regexp.split */ "./node_modules/core-js/modules/es6.regexp.split.js");
__webpack_require__(/*! ./modules/es6.promise */ "./node_modules/core-js/modules/es6.promise.js");
__webpack_require__(/*! ./modules/es6.map */ "./node_modules/core-js/modules/es6.map.js");
__webpack_require__(/*! ./modules/es6.set */ "./node_modules/core-js/modules/es6.set.js");
__webpack_require__(/*! ./modules/es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js");
__webpack_require__(/*! ./modules/es6.weak-set */ "./node_modules/core-js/modules/es6.weak-set.js");
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ "./node_modules/core-js/modules/es6.typed.array-buffer.js");
__webpack_require__(/*! ./modules/es6.typed.data-view */ "./node_modules/core-js/modules/es6.typed.data-view.js");
__webpack_require__(/*! ./modules/es6.typed.int8-array */ "./node_modules/core-js/modules/es6.typed.int8-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ "./node_modules/core-js/modules/es6.typed.uint8-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ "./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js");
__webpack_require__(/*! ./modules/es6.typed.int16-array */ "./node_modules/core-js/modules/es6.typed.int16-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ "./node_modules/core-js/modules/es6.typed.uint16-array.js");
__webpack_require__(/*! ./modules/es6.typed.int32-array */ "./node_modules/core-js/modules/es6.typed.int32-array.js");
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ "./node_modules/core-js/modules/es6.typed.uint32-array.js");
__webpack_require__(/*! ./modules/es6.typed.float32-array */ "./node_modules/core-js/modules/es6.typed.float32-array.js");
__webpack_require__(/*! ./modules/es6.typed.float64-array */ "./node_modules/core-js/modules/es6.typed.float64-array.js");
__webpack_require__(/*! ./modules/es6.reflect.apply */ "./node_modules/core-js/modules/es6.reflect.apply.js");
__webpack_require__(/*! ./modules/es6.reflect.construct */ "./node_modules/core-js/modules/es6.reflect.construct.js");
__webpack_require__(/*! ./modules/es6.reflect.define-property */ "./node_modules/core-js/modules/es6.reflect.define-property.js");
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ "./node_modules/core-js/modules/es6.reflect.delete-property.js");
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ "./node_modules/core-js/modules/es6.reflect.enumerate.js");
__webpack_require__(/*! ./modules/es6.reflect.get */ "./node_modules/core-js/modules/es6.reflect.get.js");
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js");
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ "./node_modules/core-js/modules/es6.reflect.get-prototype-of.js");
__webpack_require__(/*! ./modules/es6.reflect.has */ "./node_modules/core-js/modules/es6.reflect.has.js");
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ "./node_modules/core-js/modules/es6.reflect.is-extensible.js");
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ "./node_modules/core-js/modules/es6.reflect.own-keys.js");
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ "./node_modules/core-js/modules/es6.reflect.prevent-extensions.js");
__webpack_require__(/*! ./modules/es6.reflect.set */ "./node_modules/core-js/modules/es6.reflect.set.js");
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ "./node_modules/core-js/modules/es6.reflect.set-prototype-of.js");
__webpack_require__(/*! ./modules/es7.array.includes */ "./node_modules/core-js/modules/es7.array.includes.js");
__webpack_require__(/*! ./modules/es7.array.flat-map */ "./node_modules/core-js/modules/es7.array.flat-map.js");
__webpack_require__(/*! ./modules/es7.array.flatten */ "./node_modules/core-js/modules/es7.array.flatten.js");
__webpack_require__(/*! ./modules/es7.string.at */ "./node_modules/core-js/modules/es7.string.at.js");
__webpack_require__(/*! ./modules/es7.string.pad-start */ "./node_modules/core-js/modules/es7.string.pad-start.js");
__webpack_require__(/*! ./modules/es7.string.pad-end */ "./node_modules/core-js/modules/es7.string.pad-end.js");
__webpack_require__(/*! ./modules/es7.string.trim-left */ "./node_modules/core-js/modules/es7.string.trim-left.js");
__webpack_require__(/*! ./modules/es7.string.trim-right */ "./node_modules/core-js/modules/es7.string.trim-right.js");
__webpack_require__(/*! ./modules/es7.string.match-all */ "./node_modules/core-js/modules/es7.string.match-all.js");
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ "./node_modules/core-js/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ./modules/es7.symbol.observable */ "./node_modules/core-js/modules/es7.symbol.observable.js");
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js");
__webpack_require__(/*! ./modules/es7.object.values */ "./node_modules/core-js/modules/es7.object.values.js");
__webpack_require__(/*! ./modules/es7.object.entries */ "./node_modules/core-js/modules/es7.object.entries.js");
__webpack_require__(/*! ./modules/es7.object.define-getter */ "./node_modules/core-js/modules/es7.object.define-getter.js");
__webpack_require__(/*! ./modules/es7.object.define-setter */ "./node_modules/core-js/modules/es7.object.define-setter.js");
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ "./node_modules/core-js/modules/es7.object.lookup-getter.js");
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ "./node_modules/core-js/modules/es7.object.lookup-setter.js");
__webpack_require__(/*! ./modules/es7.map.to-json */ "./node_modules/core-js/modules/es7.map.to-json.js");
__webpack_require__(/*! ./modules/es7.set.to-json */ "./node_modules/core-js/modules/es7.set.to-json.js");
__webpack_require__(/*! ./modules/es7.map.of */ "./node_modules/core-js/modules/es7.map.of.js");
__webpack_require__(/*! ./modules/es7.set.of */ "./node_modules/core-js/modules/es7.set.of.js");
__webpack_require__(/*! ./modules/es7.weak-map.of */ "./node_modules/core-js/modules/es7.weak-map.of.js");
__webpack_require__(/*! ./modules/es7.weak-set.of */ "./node_modules/core-js/modules/es7.weak-set.of.js");
__webpack_require__(/*! ./modules/es7.map.from */ "./node_modules/core-js/modules/es7.map.from.js");
__webpack_require__(/*! ./modules/es7.set.from */ "./node_modules/core-js/modules/es7.set.from.js");
__webpack_require__(/*! ./modules/es7.weak-map.from */ "./node_modules/core-js/modules/es7.weak-map.from.js");
__webpack_require__(/*! ./modules/es7.weak-set.from */ "./node_modules/core-js/modules/es7.weak-set.from.js");
__webpack_require__(/*! ./modules/es7.global */ "./node_modules/core-js/modules/es7.global.js");
__webpack_require__(/*! ./modules/es7.system.global */ "./node_modules/core-js/modules/es7.system.global.js");
__webpack_require__(/*! ./modules/es7.error.is-error */ "./node_modules/core-js/modules/es7.error.is-error.js");
__webpack_require__(/*! ./modules/es7.math.clamp */ "./node_modules/core-js/modules/es7.math.clamp.js");
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ "./node_modules/core-js/modules/es7.math.deg-per-rad.js");
__webpack_require__(/*! ./modules/es7.math.degrees */ "./node_modules/core-js/modules/es7.math.degrees.js");
__webpack_require__(/*! ./modules/es7.math.fscale */ "./node_modules/core-js/modules/es7.math.fscale.js");
__webpack_require__(/*! ./modules/es7.math.iaddh */ "./node_modules/core-js/modules/es7.math.iaddh.js");
__webpack_require__(/*! ./modules/es7.math.isubh */ "./node_modules/core-js/modules/es7.math.isubh.js");
__webpack_require__(/*! ./modules/es7.math.imulh */ "./node_modules/core-js/modules/es7.math.imulh.js");
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ "./node_modules/core-js/modules/es7.math.rad-per-deg.js");
__webpack_require__(/*! ./modules/es7.math.radians */ "./node_modules/core-js/modules/es7.math.radians.js");
__webpack_require__(/*! ./modules/es7.math.scale */ "./node_modules/core-js/modules/es7.math.scale.js");
__webpack_require__(/*! ./modules/es7.math.umulh */ "./node_modules/core-js/modules/es7.math.umulh.js");
__webpack_require__(/*! ./modules/es7.math.signbit */ "./node_modules/core-js/modules/es7.math.signbit.js");
__webpack_require__(/*! ./modules/es7.promise.finally */ "./node_modules/core-js/modules/es7.promise.finally.js");
__webpack_require__(/*! ./modules/es7.promise.try */ "./node_modules/core-js/modules/es7.promise.try.js");
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ "./node_modules/core-js/modules/es7.reflect.define-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ "./node_modules/core-js/modules/es7.reflect.get-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js");
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js");
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ "./node_modules/core-js/modules/es7.reflect.has-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js");
__webpack_require__(/*! ./modules/es7.reflect.metadata */ "./node_modules/core-js/modules/es7.reflect.metadata.js");
__webpack_require__(/*! ./modules/es7.asap */ "./node_modules/core-js/modules/es7.asap.js");
__webpack_require__(/*! ./modules/es7.observable */ "./node_modules/core-js/modules/es7.observable.js");
__webpack_require__(/*! ./modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");
__webpack_require__(/*! ./modules/web.immediate */ "./node_modules/core-js/modules/web.immediate.js");
__webpack_require__(/*! ./modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
module.exports = __webpack_require__(/*! ./modules/_core */ "./node_modules/core-js/modules/_core.js");


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/pbf/index.js":
/*!***********************************!*\
  !*** ./node_modules/pbf/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Pbf;

var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js");

function Pbf(buf) {
    this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
    this.pos = 0;
    this.type = 0;
    this.length = this.buf.length;
}

Pbf.Varint  = 0; // varint: int32, int64, uint32, uint64, sint32, sint64, bool, enum
Pbf.Fixed64 = 1; // 64-bit: double, fixed64, sfixed64
Pbf.Bytes   = 2; // length-delimited: string, bytes, embedded messages, packed repeated fields
Pbf.Fixed32 = 5; // 32-bit: float, fixed32, sfixed32

var SHIFT_LEFT_32 = (1 << 16) * (1 << 16),
    SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;

Pbf.prototype = {

    destroy: function() {
        this.buf = null;
    },

    // === READING =================================================================

    readFields: function(readField, result, end) {
        end = end || this.length;

        while (this.pos < end) {
            var val = this.readVarint(),
                tag = val >> 3,
                startPos = this.pos;

            this.type = val & 0x7;
            readField(tag, result, this);

            if (this.pos === startPos) this.skip(val);
        }
        return result;
    },

    readMessage: function(readField, result) {
        return this.readFields(readField, result, this.readVarint() + this.pos);
    },

    readFixed32: function() {
        var val = readUInt32(this.buf, this.pos);
        this.pos += 4;
        return val;
    },

    readSFixed32: function() {
        var val = readInt32(this.buf, this.pos);
        this.pos += 4;
        return val;
    },

    // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)

    readFixed64: function() {
        var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
        this.pos += 8;
        return val;
    },

    readSFixed64: function() {
        var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
        this.pos += 8;
        return val;
    },

    readFloat: function() {
        var val = ieee754.read(this.buf, this.pos, true, 23, 4);
        this.pos += 4;
        return val;
    },

    readDouble: function() {
        var val = ieee754.read(this.buf, this.pos, true, 52, 8);
        this.pos += 8;
        return val;
    },

    readVarint: function(isSigned) {
        var buf = this.buf,
            val, b;

        b = buf[this.pos++]; val  =  b & 0x7f;        if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 7;  if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 14; if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 21; if (b < 0x80) return val;
        b = buf[this.pos];   val |= (b & 0x0f) << 28;

        return readVarintRemainder(val, isSigned, this);
    },

    readVarint64: function() { // for compatibility with v2.0.1
        return this.readVarint(true);
    },

    readSVarint: function() {
        var num = this.readVarint();
        return num % 2 === 1 ? (num + 1) / -2 : num / 2; // zigzag encoding
    },

    readBoolean: function() {
        return Boolean(this.readVarint());
    },

    readString: function() {
        var end = this.readVarint() + this.pos,
            str = readUtf8(this.buf, this.pos, end);
        this.pos = end;
        return str;
    },

    readBytes: function() {
        var end = this.readVarint() + this.pos,
            buffer = this.buf.subarray(this.pos, end);
        this.pos = end;
        return buffer;
    },

    // verbose for performance reasons; doesn't affect gzipped size

    readPackedVarint: function(arr, isSigned) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readVarint(isSigned));
        return arr;
    },
    readPackedSVarint: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readSVarint());
        return arr;
    },
    readPackedBoolean: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readBoolean());
        return arr;
    },
    readPackedFloat: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readFloat());
        return arr;
    },
    readPackedDouble: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readDouble());
        return arr;
    },
    readPackedFixed32: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readFixed32());
        return arr;
    },
    readPackedSFixed32: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readSFixed32());
        return arr;
    },
    readPackedFixed64: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readFixed64());
        return arr;
    },
    readPackedSFixed64: function(arr) {
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readSFixed64());
        return arr;
    },

    skip: function(val) {
        var type = val & 0x7;
        if (type === Pbf.Varint) while (this.buf[this.pos++] > 0x7f) {}
        else if (type === Pbf.Bytes) this.pos = this.readVarint() + this.pos;
        else if (type === Pbf.Fixed32) this.pos += 4;
        else if (type === Pbf.Fixed64) this.pos += 8;
        else throw new Error('Unimplemented type: ' + type);
    },

    // === WRITING =================================================================

    writeTag: function(tag, type) {
        this.writeVarint((tag << 3) | type);
    },

    realloc: function(min) {
        var length = this.length || 16;

        while (length < this.pos + min) length *= 2;

        if (length !== this.length) {
            var buf = new Uint8Array(length);
            buf.set(this.buf);
            this.buf = buf;
            this.length = length;
        }
    },

    finish: function() {
        this.length = this.pos;
        this.pos = 0;
        return this.buf.subarray(0, this.length);
    },

    writeFixed32: function(val) {
        this.realloc(4);
        writeInt32(this.buf, val, this.pos);
        this.pos += 4;
    },

    writeSFixed32: function(val) {
        this.realloc(4);
        writeInt32(this.buf, val, this.pos);
        this.pos += 4;
    },

    writeFixed64: function(val) {
        this.realloc(8);
        writeInt32(this.buf, val & -1, this.pos);
        writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
        this.pos += 8;
    },

    writeSFixed64: function(val) {
        this.realloc(8);
        writeInt32(this.buf, val & -1, this.pos);
        writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
        this.pos += 8;
    },

    writeVarint: function(val) {
        val = +val || 0;

        if (val > 0xfffffff || val < 0) {
            writeBigVarint(val, this);
            return;
        }

        this.realloc(4);

        this.buf[this.pos++] =           val & 0x7f  | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] =   (val >>> 7) & 0x7f;
    },

    writeSVarint: function(val) {
        this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
    },

    writeBoolean: function(val) {
        this.writeVarint(Boolean(val));
    },

    writeString: function(str) {
        str = String(str);
        this.realloc(str.length * 4);

        this.pos++; // reserve 1 byte for short string length

        var startPos = this.pos;
        // write the string directly to the buffer and see how much was written
        this.pos = writeUtf8(this.buf, str, this.pos);
        var len = this.pos - startPos;

        if (len >= 0x80) makeRoomForExtraLength(startPos, len, this);

        // finally, write the message length in the reserved place and restore the position
        this.pos = startPos - 1;
        this.writeVarint(len);
        this.pos += len;
    },

    writeFloat: function(val) {
        this.realloc(4);
        ieee754.write(this.buf, val, this.pos, true, 23, 4);
        this.pos += 4;
    },

    writeDouble: function(val) {
        this.realloc(8);
        ieee754.write(this.buf, val, this.pos, true, 52, 8);
        this.pos += 8;
    },

    writeBytes: function(buffer) {
        var len = buffer.length;
        this.writeVarint(len);
        this.realloc(len);
        for (var i = 0; i < len; i++) this.buf[this.pos++] = buffer[i];
    },

    writeRawMessage: function(fn, obj) {
        this.pos++; // reserve 1 byte for short message length

        // write the message directly to the buffer and see how much was written
        var startPos = this.pos;
        fn(obj, this);
        var len = this.pos - startPos;

        if (len >= 0x80) makeRoomForExtraLength(startPos, len, this);

        // finally, write the message length in the reserved place and restore the position
        this.pos = startPos - 1;
        this.writeVarint(len);
        this.pos += len;
    },

    writeMessage: function(tag, fn, obj) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeRawMessage(fn, obj);
    },

    writePackedVarint:   function(tag, arr) { this.writeMessage(tag, writePackedVarint, arr);   },
    writePackedSVarint:  function(tag, arr) { this.writeMessage(tag, writePackedSVarint, arr);  },
    writePackedBoolean:  function(tag, arr) { this.writeMessage(tag, writePackedBoolean, arr);  },
    writePackedFloat:    function(tag, arr) { this.writeMessage(tag, writePackedFloat, arr);    },
    writePackedDouble:   function(tag, arr) { this.writeMessage(tag, writePackedDouble, arr);   },
    writePackedFixed32:  function(tag, arr) { this.writeMessage(tag, writePackedFixed32, arr);  },
    writePackedSFixed32: function(tag, arr) { this.writeMessage(tag, writePackedSFixed32, arr); },
    writePackedFixed64:  function(tag, arr) { this.writeMessage(tag, writePackedFixed64, arr);  },
    writePackedSFixed64: function(tag, arr) { this.writeMessage(tag, writePackedSFixed64, arr); },

    writeBytesField: function(tag, buffer) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeBytes(buffer);
    },
    writeFixed32Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeFixed32(val);
    },
    writeSFixed32Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeSFixed32(val);
    },
    writeFixed64Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeFixed64(val);
    },
    writeSFixed64Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeSFixed64(val);
    },
    writeVarintField: function(tag, val) {
        this.writeTag(tag, Pbf.Varint);
        this.writeVarint(val);
    },
    writeSVarintField: function(tag, val) {
        this.writeTag(tag, Pbf.Varint);
        this.writeSVarint(val);
    },
    writeStringField: function(tag, str) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeString(str);
    },
    writeFloatField: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeFloat(val);
    },
    writeDoubleField: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeDouble(val);
    },
    writeBooleanField: function(tag, val) {
        this.writeVarintField(tag, Boolean(val));
    }
};

function readVarintRemainder(l, s, p) {
    var buf = p.buf,
        h, b;

    b = buf[p.pos++]; h  = (b & 0x70) >> 4;  if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 3;  if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 10; if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 17; if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 24; if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x01) << 31; if (b < 0x80) return toNum(l, h, s);

    throw new Error('Expected varint not more than 10 bytes');
}

function readPackedEnd(pbf) {
    return pbf.type === Pbf.Bytes ?
        pbf.readVarint() + pbf.pos : pbf.pos + 1;
}

function toNum(low, high, isSigned) {
    if (isSigned) {
        return high * 0x100000000 + (low >>> 0);
    }

    return ((high >>> 0) * 0x100000000) + (low >>> 0);
}

function writeBigVarint(val, pbf) {
    var low, high;

    if (val >= 0) {
        low  = (val % 0x100000000) | 0;
        high = (val / 0x100000000) | 0;
    } else {
        low  = ~(-val % 0x100000000);
        high = ~(-val / 0x100000000);

        if (low ^ 0xffffffff) {
            low = (low + 1) | 0;
        } else {
            low = 0;
            high = (high + 1) | 0;
        }
    }

    if (val >= 0x10000000000000000 || val < -0x10000000000000000) {
        throw new Error('Given varint doesn\'t fit into 10 bytes');
    }

    pbf.realloc(10);

    writeBigVarintLow(low, high, pbf);
    writeBigVarintHigh(high, pbf);
}

function writeBigVarintLow(low, high, pbf) {
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos]   = low & 0x7f;
}

function writeBigVarintHigh(high, pbf) {
    var lsb = (high & 0x07) << 4;

    pbf.buf[pbf.pos++] |= lsb         | ((high >>>= 3) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f;
}

function makeRoomForExtraLength(startPos, len, pbf) {
    var extraLen =
        len <= 0x3fff ? 1 :
        len <= 0x1fffff ? 2 :
        len <= 0xfffffff ? 3 : Math.ceil(Math.log(len) / (Math.LN2 * 7));

    // if 1 byte isn't enough for encoding message length, shift the data to the right
    pbf.realloc(extraLen);
    for (var i = pbf.pos - 1; i >= startPos; i--) pbf.buf[i + extraLen] = pbf.buf[i];
}

function writePackedVarint(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeVarint(arr[i]);   }
function writePackedSVarint(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeSVarint(arr[i]);  }
function writePackedFloat(arr, pbf)    { for (var i = 0; i < arr.length; i++) pbf.writeFloat(arr[i]);    }
function writePackedDouble(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeDouble(arr[i]);   }
function writePackedBoolean(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeBoolean(arr[i]);  }
function writePackedFixed32(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed32(arr[i]);  }
function writePackedSFixed32(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed32(arr[i]); }
function writePackedFixed64(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed64(arr[i]);  }
function writePackedSFixed64(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed64(arr[i]); }

// Buffer code below from https://github.com/feross/buffer, MIT-licensed

function readUInt32(buf, pos) {
    return ((buf[pos]) |
        (buf[pos + 1] << 8) |
        (buf[pos + 2] << 16)) +
        (buf[pos + 3] * 0x1000000);
}

function writeInt32(buf, val, pos) {
    buf[pos] = val;
    buf[pos + 1] = (val >>> 8);
    buf[pos + 2] = (val >>> 16);
    buf[pos + 3] = (val >>> 24);
}

function readInt32(buf, pos) {
    return ((buf[pos]) |
        (buf[pos + 1] << 8) |
        (buf[pos + 2] << 16)) +
        (buf[pos + 3] << 24);
}

function readUtf8(buf, pos, end) {
    var str = '';
    var i = pos;

    while (i < end) {
        var b0 = buf[i];
        var c = null; // codepoint
        var bytesPerSequence =
            b0 > 0xEF ? 4 :
            b0 > 0xDF ? 3 :
            b0 > 0xBF ? 2 : 1;

        if (i + bytesPerSequence > end) break;

        var b1, b2, b3;

        if (bytesPerSequence === 1) {
            if (b0 < 0x80) {
                c = b0;
            }
        } else if (bytesPerSequence === 2) {
            b1 = buf[i + 1];
            if ((b1 & 0xC0) === 0x80) {
                c = (b0 & 0x1F) << 0x6 | (b1 & 0x3F);
                if (c <= 0x7F) {
                    c = null;
                }
            }
        } else if (bytesPerSequence === 3) {
            b1 = buf[i + 1];
            b2 = buf[i + 2];
            if ((b1 & 0xC0) === 0x80 && (b2 & 0xC0) === 0x80) {
                c = (b0 & 0xF) << 0xC | (b1 & 0x3F) << 0x6 | (b2 & 0x3F);
                if (c <= 0x7FF || (c >= 0xD800 && c <= 0xDFFF)) {
                    c = null;
                }
            }
        } else if (bytesPerSequence === 4) {
            b1 = buf[i + 1];
            b2 = buf[i + 2];
            b3 = buf[i + 3];
            if ((b1 & 0xC0) === 0x80 && (b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
                c = (b0 & 0xF) << 0x12 | (b1 & 0x3F) << 0xC | (b2 & 0x3F) << 0x6 | (b3 & 0x3F);
                if (c <= 0xFFFF || c >= 0x110000) {
                    c = null;
                }
            }
        }

        if (c === null) {
            c = 0xFFFD;
            bytesPerSequence = 1;

        } else if (c > 0xFFFF) {
            c -= 0x10000;
            str += String.fromCharCode(c >>> 10 & 0x3FF | 0xD800);
            c = 0xDC00 | c & 0x3FF;
        }

        str += String.fromCharCode(c);
        i += bytesPerSequence;
    }

    return str;
}

function writeUtf8(buf, str, pos) {
    for (var i = 0, c, lead; i < str.length; i++) {
        c = str.charCodeAt(i); // code point

        if (c > 0xD7FF && c < 0xE000) {
            if (lead) {
                if (c < 0xDC00) {
                    buf[pos++] = 0xEF;
                    buf[pos++] = 0xBF;
                    buf[pos++] = 0xBD;
                    lead = c;
                    continue;
                } else {
                    c = lead - 0xD800 << 10 | c - 0xDC00 | 0x10000;
                    lead = null;
                }
            } else {
                if (c > 0xDBFF || (i + 1 === str.length)) {
                    buf[pos++] = 0xEF;
                    buf[pos++] = 0xBF;
                    buf[pos++] = 0xBD;
                } else {
                    lead = c;
                }
                continue;
            }
        } else if (lead) {
            buf[pos++] = 0xEF;
            buf[pos++] = 0xBF;
            buf[pos++] = 0xBD;
            lead = null;
        }

        if (c < 0x80) {
            buf[pos++] = c;
        } else {
            if (c < 0x800) {
                buf[pos++] = c >> 0x6 | 0xC0;
            } else {
                if (c < 0x10000) {
                    buf[pos++] = c >> 0xC | 0xE0;
                } else {
                    buf[pos++] = c >> 0x12 | 0xF0;
                    buf[pos++] = c >> 0xC & 0x3F | 0x80;
                }
                buf[pos++] = c >> 0x6 & 0x3F | 0x80;
            }
            buf[pos++] = c & 0x3F | 0x80;
        }
    }
    return pos;
}


/***/ }),

/***/ "./node_modules/shelf-pack/index.umd.js":
/*!**********************************************!*\
  !*** ./node_modules/shelf-pack/index.umd.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
     true ? module.exports = factory() :
    undefined;
}(this, function () {

/**
 * Create a new ShelfPack bin allocator.
 *
 * Uses the Shelf Best Height Fit algorithm from
 * http://clb.demon.fi/files/RectangleBinPack.pdf
 *
 * @class  ShelfPack
 * @param  {number}  [w=64]  Initial width of the sprite
 * @param  {number}  [h=64]  Initial width of the sprite
 * @param  {Object}  [options]
 * @param  {boolean} [options.autoResize=false]  If `true`, the sprite will automatically grow
 * @example
 * var sprite = new ShelfPack(64, 64, { autoResize: false });
 */
function ShelfPack(w, h, options) {
    options = options || {};
    this.w = w || 64;
    this.h = h || 64;
    this.autoResize = !!options.autoResize;
    this.shelves = [];
    this.freebins = [];
    this.stats = {};
    this.bins = {};
    this.maxId = 0;
}


/**
 * Batch pack multiple bins into the sprite.
 *
 * @param   {Object[]} bins       Array of requested bins - each object should have `width`, `height` (or `w`, `h`) properties
 * @param   {number}   bins[].w   Requested bin width
 * @param   {number}   bins[].h   Requested bin height
 * @param   {Object}   [options]
 * @param   {boolean}  [options.inPlace=false] If `true`, the supplied bin objects will be updated inplace with `x` and `y` properties
 * @returns {Bin[]}    Array of allocated Bins - each Bin is an object with `id`, `x`, `y`, `w`, `h` properties
 * @example
 * var bins = [
 *     { id: 1, w: 12, h: 12 },
 *     { id: 2, w: 12, h: 16 },
 *     { id: 3, w: 12, h: 24 }
 * ];
 * var results = sprite.pack(bins, { inPlace: false });
 */
ShelfPack.prototype.pack = function(bins, options) {
    bins = [].concat(bins);
    options = options || {};

    var results = [],
        w, h, id, allocation;

    for (var i = 0; i < bins.length; i++) {
        w  = bins[i].w || bins[i].width;
        h  = bins[i].h || bins[i].height;
        id = bins[i].id;

        if (w && h) {
            allocation = this.packOne(w, h, id);
            if (!allocation) {
                continue;
            }
            if (options.inPlace) {
                bins[i].x  = allocation.x;
                bins[i].y  = allocation.y;
                bins[i].id = allocation.id;
            }
            results.push(allocation);
        }
    }

    // Shrink the width/height of the sprite to the bare minimum.
    // Since shelf-pack doubles first width, then height when running out of shelf space
    // this can result in fairly large unused space both in width and height if that happens
    // towards the end of bin packing.
    if (this.shelves.length > 0) {
        var w2 = 0;
        var h2 = 0;

        for (var j = 0; j < this.shelves.length; j++) {
            var shelf = this.shelves[j];
            h2 += shelf.h;
            w2 = Math.max(shelf.w - shelf.free, w2);
        }

        this.resize(w2, h2);
    }

    return results;
};


/**
 * Pack a single bin into the sprite.
 *
 * Each bin will have a unique identitifer.
 * If no identifier is supplied in the `id` parameter, one will be created.
 * Note: The supplied `id` is used as an object index, so numeric values are fastest!
 *
 * Bins are automatically refcounted (i.e. a newly packed Bin will have a refcount of 1).
 * When a bin is no longer needed, use the `ShelfPack.unref` function to mark it
 *   as unused.  When a Bin's refcount decrements to 0, the Bin will be marked
 *   as free and its space may be reused by the packing code.
 *
 * @param    {number}         w      Width of the bin to allocate
 * @param    {number}         h      Height of the bin to allocate
 * @param    {number|string}  [id]   Unique identifier for this bin, (if unsupplied, assume it's a new bin and create an id)
 * @returns  {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties, or `null` if allocation failed
 * @example
 * var results = sprite.packOne(12, 16, 'a');
 */
ShelfPack.prototype.packOne = function(w, h, id) {
    var best = { freebin: -1, shelf: -1, waste: Infinity },
        y = 0,
        bin, shelf, waste, i;

    // if id was supplied, attempt a lookup..
    if (typeof id === 'string' || typeof id === 'number') {
        bin = this.getBin(id);
        if (bin) {              // we packed this bin already
            this.ref(bin);
            return bin;
        }
        if (typeof id === 'number') {
            this.maxId = Math.max(id, this.maxId);
        }
    } else {
        id = ++this.maxId;
    }

    // First try to reuse a free bin..
    for (i = 0; i < this.freebins.length; i++) {
        bin = this.freebins[i];

        // exactly the right height and width, use it..
        if (h === bin.maxh && w === bin.maxw) {
            return this.allocFreebin(i, w, h, id);
        }
        // not enough height or width, skip it..
        if (h > bin.maxh || w > bin.maxw) {
            continue;
        }
        // extra height or width, minimize wasted area..
        if (h <= bin.maxh && w <= bin.maxw) {
            waste = (bin.maxw * bin.maxh) - (w * h);
            if (waste < best.waste) {
                best.waste = waste;
                best.freebin = i;
            }
        }
    }

    // Next find the best shelf..
    for (i = 0; i < this.shelves.length; i++) {
        shelf = this.shelves[i];
        y += shelf.h;

        // not enough width on this shelf, skip it..
        if (w > shelf.free) {
            continue;
        }
        // exactly the right height, pack it..
        if (h === shelf.h) {
            return this.allocShelf(i, w, h, id);
        }
        // not enough height, skip it..
        if (h > shelf.h) {
            continue;
        }
        // extra height, minimize wasted area..
        if (h < shelf.h) {
            waste = (shelf.h - h) * w;
            if (waste < best.waste) {
                best.freebin = -1;
                best.waste = waste;
                best.shelf = i;
            }
        }
    }

    if (best.freebin !== -1) {
        return this.allocFreebin(best.freebin, w, h, id);
    }

    if (best.shelf !== -1) {
        return this.allocShelf(best.shelf, w, h, id);
    }

    // No free bins or shelves.. add shelf..
    if (h <= (this.h - y) && w <= this.w) {
        shelf = new Shelf(y, this.w, h);
        return this.allocShelf(this.shelves.push(shelf) - 1, w, h, id);
    }

    // No room for more shelves..
    // If `autoResize` option is set, grow the sprite as follows:
    //  * double whichever sprite dimension is smaller (`w1` or `h1`)
    //  * if sprite dimensions are equal, grow width before height
    //  * accomodate very large bin requests (big `w` or `h`)
    if (this.autoResize) {
        var h1, h2, w1, w2;

        h1 = h2 = this.h;
        w1 = w2 = this.w;

        if (w1 <= h1 || w > w1) {   // grow width..
            w2 = Math.max(w, w1) * 2;
        }
        if (h1 < w1 || h > h1) {    // grow height..
            h2 = Math.max(h, h1) * 2;
        }

        this.resize(w2, h2);
        return this.packOne(w, h, id);  // retry
    }

    return null;
};


/**
 * Called by packOne() to allocate a bin by reusing an existing freebin
 *
 * @private
 * @param    {number}         index  Index into the `this.freebins` array
 * @param    {number}         w      Width of the bin to allocate
 * @param    {number}         h      Height of the bin to allocate
 * @param    {number|string}  id     Unique identifier for this bin
 * @returns  {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties
 * @example
 * var bin = sprite.allocFreebin(0, 12, 16, 'a');
 */
ShelfPack.prototype.allocFreebin = function (index, w, h, id) {
    var bin = this.freebins.splice(index, 1)[0];
    bin.id = id;
    bin.w = w;
    bin.h = h;
    bin.refcount = 0;
    this.bins[id] = bin;
    this.ref(bin);
    return bin;
};


/**
 * Called by `packOne() to allocate bin on an existing shelf
 *
 * @private
 * @param    {number}         index  Index into the `this.shelves` array
 * @param    {number}         w      Width of the bin to allocate
 * @param    {number}         h      Height of the bin to allocate
 * @param    {number|string}  id     Unique identifier for this bin
 * @returns  {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties
 * @example
 * var results = sprite.allocShelf(0, 12, 16, 'a');
 */
ShelfPack.prototype.allocShelf = function(index, w, h, id) {
    var shelf = this.shelves[index];
    var bin = shelf.alloc(w, h, id);
    this.bins[id] = bin;
    this.ref(bin);
    return bin;
};


/**
 * Return a packed bin given its id, or undefined if the id is not found
 *
 * @param    {number|string}  id  Unique identifier for this bin,
 * @returns  {Bin}            The requested bin, or undefined if not yet packed
 * @example
 * var b = sprite.getBin('a');
 */
ShelfPack.prototype.getBin = function(id) {
    return this.bins[id];
};


/**
 * Increment the ref count of a bin and update statistics.
 *
 * @param    {Bin}     bin  Bin instance
 * @returns  {number}  New refcount of the bin
 * @example
 * var bin = sprite.getBin('a');
 * sprite.ref(bin);
 */
ShelfPack.prototype.ref = function(bin) {
    if (++bin.refcount === 1) {   // a new Bin.. record height in stats historgram..
        var h = bin.h;
        this.stats[h] = (this.stats[h] | 0) + 1;
    }

    return bin.refcount;
};


/**
 * Decrement the ref count of a bin and update statistics.
 * The bin will be automatically marked as free space once the refcount reaches 0.
 *
 * @param    {Bin}     bin  Bin instance
 * @returns  {number}  New refcount of the bin
 * @example
 * var bin = sprite.getBin('a');
 * sprite.unref(bin);
 */
ShelfPack.prototype.unref = function(bin) {
    if (bin.refcount === 0) {
        return 0;
    }

    if (--bin.refcount === 0) {
        this.stats[bin.h]--;
        delete this.bins[bin.id];
        this.freebins.push(bin);
    }

    return bin.refcount;
};


/**
 * Clear the sprite.  Resets everything and resets statistics.
 *
 * @example
 * sprite.clear();
 */
ShelfPack.prototype.clear = function() {
    this.shelves = [];
    this.freebins = [];
    this.stats = {};
    this.bins = {};
    this.maxId = 0;
};


/**
 * Resize the sprite.
 *
 * @param   {number}  w  Requested new sprite width
 * @param   {number}  h  Requested new sprite height
 * @returns {boolean} `true` if resize succeeded, `false` if failed
 * @example
 * sprite.resize(256, 256);
 */
ShelfPack.prototype.resize = function(w, h) {
    this.w = w;
    this.h = h;
    for (var i = 0; i < this.shelves.length; i++) {
        this.shelves[i].resize(w);
    }
    return true;
};


/**
 * Create a new Shelf.
 *
 * @private
 * @class  Shelf
 * @param  {number}  y   Top coordinate of the new shelf
 * @param  {number}  w   Width of the new shelf
 * @param  {number}  h   Height of the new shelf
 * @example
 * var shelf = new Shelf(64, 512, 24);
 */
function Shelf(y, w, h) {
    this.x = 0;
    this.y = y;
    this.w = this.free = w;
    this.h = h;
}


/**
 * Allocate a single bin into the shelf.
 *
 * @private
 * @param   {number}         w   Width of the bin to allocate
 * @param   {number}         h   Height of the bin to allocate
 * @param   {number|string}  id  Unique id of the bin to allocate
 * @returns {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties, or `null` if allocation failed
 * @example
 * shelf.alloc(12, 16, 'a');
 */
Shelf.prototype.alloc = function(w, h, id) {
    if (w > this.free || h > this.h) {
        return null;
    }
    var x = this.x;
    this.x += w;
    this.free -= w;
    return new Bin(id, x, this.y, w, h);
};


/**
 * Resize the shelf.
 *
 * @private
 * @param   {number}  w  Requested new width of the shelf
 * @returns {boolean}    true
 * @example
 * shelf.resize(512);
 */
Shelf.prototype.resize = function(w) {
    this.free += (w - this.w);
    this.w = w;
    return true;
};


/**
 * Create a new Bin object.
 *
 * @class  Bin
 * @param  {number|string}  id  Unique id of the bin
 * @param  {number}         x   Left coordinate of the bin
 * @param  {number}         y   Top coordinate of the bin
 * @param  {number}         w   Width of the bin
 * @param  {number}         h   Height of the bin
 * @example
 * var bin = new Bin('a', 0, 0, 12, 16);
 */
function Bin(id, x, y, w, h) {
    this.id = id;
    this.x  = x;
    this.y  = y;
    this.w  = w;
    this.h  = h;
    this.maxw = w;
    this.maxh = h;
    this.refcount = 0;
}

return ShelfPack;

}));

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/worker-loader/dist/workers/InlineWorker.js":
/*!*****************************************************************!*\
  !*** ./node_modules/worker-loader/dist/workers/InlineWorker.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;

module.exports = function (content, url) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return new Worker(URL.createObjectURL(blob));
    } catch (e) {
      return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }

    return new Worker(url);
  }
};

/***/ }),

/***/ "./src/ccNetViz.js":
/*!*************************!*\
  !*** ./src/ccNetViz.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(/*! ./layer */ "./src/layer.js");

var _layer2 = _interopRequireDefault(_layer);

var _layout = __webpack_require__(/*! ./layout/layout */ "./src/layout/layout.js");

var _layout2 = _interopRequireDefault(_layout);

var _gl = __webpack_require__(/*! ./gl */ "./src/gl.js");

var _gl2 = _interopRequireDefault(_gl);

var _color = __webpack_require__(/*! ./color */ "./src/color.js");

var _color2 = _interopRequireDefault(_color);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _textures = __webpack_require__(/*! ./dataSources/textures */ "./src/dataSources/textures.js");

var _textures2 = _interopRequireDefault(_textures);

var _files = __webpack_require__(/*! ./dataSources/files */ "./src/dataSources/files.js");

var _files2 = _interopRequireDefault(_files);

var _texts = __webpack_require__(/*! ./texts/texts */ "./src/texts/texts.js");

var _texts2 = _interopRequireDefault(_texts);

var _lazyEvents = __webpack_require__(/*! ./lazyEvents */ "./src/lazyEvents.js");

var _lazyEvents2 = _interopRequireDefault(_lazyEvents);

var _interactivityBatch = __webpack_require__(/*! ./interactivityBatch */ "./src/interactivityBatch.js");

var _interactivityBatch2 = _interopRequireDefault(_interactivityBatch);

var _spatialSearch = __webpack_require__(/*! ./spatialSearch/spatialSearch */ "./src/spatialSearch/spatialSearch.js");

var _spatialSearch2 = _interopRequireDefault(_spatialSearch);

var _primitiveTools = __webpack_require__(/*! ./primitiveTools */ "./src/primitiveTools.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors:
 *  David Tichy
 *    Aleš Saska - http://alessaska.cz/
 */

var sCanvas = document.createElement("canvas");
function getContext(canvas) {
  var attributes = { depth: false, antialias: false };
  var gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);

  return gl;
}

var lastUniqId = 0;

function checkUniqId(el) {
  if (el.__uniqid !== undefined) {
    el.uniqid = el.__uniqid;
    delete el.__uniqid;
  } else if (el.uniqid === undefined) {
    el.uniqid = ++lastUniqId;
  }
}

function mergeArrays(a, b, cmp) {
  var r = [];
  r.length = a.length + b.length;

  var i = 0,
      j = 0,
      k = 0;

  while (i < a.length && j < b.length) {
    if (cmp(a[i], b[j]) < 0) r[k++] = a[i++];else r[k++] = b[j++];
  }

  while (i < a.length) {
    r[k++] = a[i++];
  }while (j < b.length) {
    r[k++] = b[j++];
  }return r;
}

var ccNetViz = function ccNetViz(canvas, options) {
  var _this = this;

  var self = this;
  canvas = canvas || sCanvas;

  var backgroundStyle = options.styles.background = options.styles.background || {};
  var backgroundColor = new _color2.default(backgroundStyle.color || "rgb(255, 255, 255)");

  var removed = false;
  var setted = false;

  var nodeStyle = options.styles.node = options.styles.node || {};
  nodeStyle.minSize = nodeStyle.minSize != null ? nodeStyle.minSize : 6;
  nodeStyle.maxSize = nodeStyle.maxSize || 16;
  nodeStyle.color = nodeStyle.color || "rgb(255, 255, 255)";

  if (nodeStyle.label) {
    var s = nodeStyle.label;
    s.color = s.color || "rgb(120, 120, 120)";
    s.font = s.font || { type: "Arial, Helvetica, sans-serif", size: 11 };
  }

  var edgeStyle = options.styles.edge = options.styles.edge || {};
  edgeStyle.width = edgeStyle.width || 1;
  edgeStyle.color = edgeStyle.color || "rgb(204, 204, 204)";

  var onLoad = function onLoad() {
    if (!options.onLoad || options.onLoad()) {
      _this.draw(true);
    }
  };

  if (edgeStyle.arrow) {
    var _s = edgeStyle.arrow;
    _s.minSize = _s.minSize != null ? _s.minSize : 6;
    _s.maxSize = _s.maxSize || 12;
    _s.aspect = 1;
  }

  var events = new _lazyEvents2.default();
  var layers = {};
  var view = void 0,
      gl = void 0,
      drawFunc = void 0,
      textures = void 0,
      files = void 0,
      texts = void 0;
  var context = {};

  this.cntShownNodes = function () {
    var n = 0;
    for (var k in layers) {
      n += layers[k].cntShownNodes();
    }return n;
  };
  var getNodesCnt = options.getNodesCnt || this.cntShownNodes;

  this.cntShownEdges = function () {
    var e = 0;
    for (var k in layers) {
      e += layers[k].cntShownEdges();
    }return e;
  };
  var getEdgesCnt = options.getEdgesCnt || this.cntShownEdges;

  var onRedraw = events.debounce(function () {
    self.draw.call(self);
    return false;
  }, 5);

  function checkRemoved() {
    if (removed) {
      console.error("Cannot call any function on graph after remove()");
      return true;
    }
    return false;
  }

  var nodes = void 0,
      edges = void 0;

  function insertTempLayer() {
    if (layers.temp) return;
    layers.temp = new _layer2.default(canvas, context, view, gl, textures, files, texts, events, options, backgroundColor, nodeStyle, edgeStyle, getSize, getNodeSize, getLabelSize, getLabelHideSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad);
  }

  var batch = undefined;
  function getBatch() {
    if (!batch) batch = new _interactivityBatch2.default(layers, insertTempLayer, drawFunc, nodes, edges, checkUniqId);
    return batch;
  };

  this.set = function (n, e, layout) {
    var layout_options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (checkRemoved()) return _this;

    nodes = n || [];
    edges = e || [];

    nodes.forEach(checkUniqId);
    edges.forEach(checkUniqId);

    layers.temp && layers.temp.set([], [], layout, layout_options);
    layers.main.set(nodes, edges, layout, layout_options);

    //reset batch
    batch = undefined;
    setted = true;
    return _this;
  };

  //make all dynamic changes static
  this.reflow = function () {
    if (checkRemoved()) return;

    getBatch().applyChanges();

    //nodes and edges in dynamic chart are actual
    var n = layers.main.getVisibleNodes();
    if (layers.temp) n = n.concat(layers.temp.getVisibleNodes());

    var e = layers.main.getVisibleEdges();
    if (layers.temp) e = e.concat(layers.temp.getVisibleEdges());

    _this.set(n, e);
    _this.draw();
  };

  this.removeNode = function (n) {
    if (checkRemoved()) {
      return _this;
    }getBatch().removeNode(n);return _this;
  };
  this.removeEdge = function (e) {
    if (checkRemoved()) {
      return _this;
    }getBatch().removeEdge(e);return _this;
  };
  this.addEdge = function (e) {
    if (checkRemoved()) {
      return _this;
    }getBatch().addEdge(e);return _this;
  };
  this.addNode = function (n) {
    if (checkRemoved()) {
      return _this;
    }getBatch().addNode(n);return _this;
  };
  this.updateNode = function (n) {
    if (checkRemoved()) {
      return _this;
    }return _this.removeNode(n).addNode(n);
  };
  this.updateEdge = function (e) {
    if (checkRemoved()) {
      return _this;
    }return _this.removeEdge(e).addEdge(e);
  };
  this.applyChanges = function () {
    if (checkRemoved()) {
      return _this;
    }getBatch().applyChanges();return _this;
  };

  this.addEdges = function (edges) {
    if (checkRemoved()) return _this;

    edges.forEach(function (e) {
      _this.addEdge(e);
    });

    return _this;
  };

  this.addNodes = function (nodes) {
    if (checkRemoved()) return _this;

    nodes.forEach(function (n) {
      _this.addNode(n);
    });

    return _this;
  };

  this.removeEdges = function (edges) {
    if (checkRemoved()) return _this;

    edges.forEach(function (e) {
      _this.removeEdge(e);
    });
    return _this;
  };

  this.removeNodes = function (nodes) {
    if (checkRemoved()) return _this;

    nodes.forEach(function (n) {
      _this.removeNode(n);
    });
    return _this;
  };

  this.updateNodes = function (nodes) {
    if (checkRemoved()) return _this;

    nodes.forEach(function (n) {
      _this.updateNode(n);
    });

    return _this;
  };

  this.updateEdges = function (edges) {
    if (checkRemoved()) return _this;

    edges.forEach(function (e) {
      _this.updateEdge(e);
    });

    return _this;
  };

  var getSize = function getSize(c, s, n, sc) {
    var result = sc * Math.sqrt(c.width * c.height / (n + 1)) / view.size;
    if (s) {
      var min = s.size ? s.size : s.minSize;
      var max = s.size ? s.size : s.maxSize;

      result = max ? Math.min(max, result) : result;
      if (result < s.hideSize) return 0;
      result = min ? Math.max(min, result) : result;
    }
    return result;
  };

  var getNodeSize = function getNodeSize(c) {
    return getSize(c, c.style, getNodesCnt(), 0.4);
  };
  var getLabelSize = function getLabelSize(c, s) {
    return getSize(c, s, getNodesCnt(), 0.25);
  };

  var getLabelHideSize = function getLabelHideSize(c, s) {
    if (s) {
      var sc = 0.25;
      var n = layers.main.cntShownNodes(); //lower bound
      var t = sc * Math.sqrt(c.width * c.height / (n + 1));

      var vs = void 0;
      if (s.hideSize) {
        vs = t / s.hideSize;
        if (s.maxSize) vs = Math.min(vs, t / s.maxSize);
        return vs;
      }
    }

    return 1;
  };

  var offset = 0.5 * nodeStyle.maxSize;

  this.draw = function (silent) {
    if (silent && (removed || !setted)) return;
    if (checkRemoved()) return;

    var width = canvas.width;
    var height = canvas.height;
    var aspect = width / height;
    var o = view.size === 1 ? offset : 0;
    var ox = o / width;
    var oy = o / height;

    context.transform = _gl2.default.ortho(view.x - ox, view.x + view.size + ox, view.y - oy, view.y + view.size + oy, -1, 1);
    context.offsetX = ox;
    context.offsetY = oy;
    context.width = 0.5 * width;
    context.height = 0.5 * height;
    context.aspect2 = aspect * aspect;
    context.aspect = aspect;
    context.count = getNodesCnt();

    //bad hack because we use different size for curveExc and for nodeSize :(
    if (context.style) delete context.style;
    context.curveExc = getSize(context, undefined, getEdgesCnt(), 0.5);
    context.style = nodeStyle;
    context.nodeSize = getNodeSize(context);

    gl && gl.viewport(0, 0, width, height);

    gl && gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < layers.main.scene.elements.length; i++) {
      layers.main.scene.elements[i].draw(context);
      layers.temp && layers.temp.scene.elements[i].draw(context);
    }
  };
  drawFunc = this.draw.bind(this);

  this.getScreenCoords = function (conf) {
    if (checkRemoved()) return;
    var ret = {};
    var rect = canvas.getBoundingClientRect();
    if (conf.x !== undefined) ret.x = (conf.x - view.x + context.offsetX) / (view.size + 2 * context.offsetX) * canvas.width + rect.left;
    if (conf.y !== undefined) ret.y = (1 - (conf.y - view.y + context.offsetY) / (view.size + 2 * context.offsetY)) * canvas.height + rect.top;
    return ret;
  };

  this.getLayerCoords = function (conf) {
    if (checkRemoved()) return;

    var ret = {};

    ['x', 'x1', 'x2'].forEach(function (k) {
      if (conf[k] !== undefined) {
        var x = conf[k];
        x = x / canvas.width * (view.size + 2 * context.offsetX) - context.offsetX + view.x;
        ret[k] = x;
      }
    });

    ['y', 'y1', 'y2'].forEach(function (k) {
      if (conf[k] !== undefined) {
        var y = conf[k];
        y = (1 - y / canvas.height) * (view.size + 2 * context.offsetY) - context.offsetY + view.y;
        ret[k] = y;
      }
    });

    if (conf.radius !== undefined) {
      var dist = conf.radius;

      var disth = dist / canvas.height;
      var distw = dist / canvas.width;
      dist = Math.max(disth, distw) * view.size;

      ret.radius = dist;
    }

    return ret;
  };

  var findMerge = function findMerge(funcname, args) {
    if (checkRemoved() || !gl) return;

    var f1 = layers.main[funcname].apply(layers.main, args);

    if (!layers.temp) return f1;

    var f2 = layers.temp[funcname].apply(layers.temp, args);

    var r = {};
    for (var key in f1) {
      r[key] = mergeArrays(f1[key], f2[key], function (e1, e2) {
        return e1.dist2 - e2.dist2;
      });
    }

    return r;
  };

  this.find = function () {
    return findMerge('find', arguments);
  };
  this.findArea = function () {
    return findMerge('findArea', arguments);
  };

  this.getTextPosition = function (n) {
    if (checkRemoved() || !gl) return;

    var offset = 0.5 * context.nodeSize;
    var offsety = (2.0 * (n.y <= 0.5 ? 0 : 1) - 1.0) * offset;

    var ns = (0, _primitiveTools.getPartitionStyle)(options.styles[n.style], nodeStyle, "label");
    var textEngine = texts.getEngine(ns.font);
    textEngine.setFont(ns.font);

    var wantedSize = textEngine.isSDF ? getLabelSize(context, ns.label || {}) : textEngine.fontSize;
    var fontScale = wantedSize / textEngine.fontSize;if (wantedSize === 0) {
      fontScale = 0;
    };

    return { offsetY: offsety, fontScale: fontScale, chars: textEngine.get(n.label, n.x, n.y) };
  };

  var addEvts = function addEvts(el, evts) {
    for (var k in evts || {}) {
      evts[k] && el.addEventListener(k, evts[k], { passive: options.passiveEvts });
    }
  };

  var removeEvts = function removeEvts(el, evts) {
    for (var k in evts || {}) {
      evts[k] && el.removeEventListener(k, evts[k]);
    }
  };

  var onDownThis = onMouseDown.bind(this);

  var zoomevts = void 0;
  addEvts(canvas, zoomevts = {
    'mousedown': onDownThis,
    'touchstart': onDownThis,
    'wheel': onWheel.bind(this),
    'contextmenu': options.onContextMenu
  });

  this.remove = function () {
    if (checkRemoved()) return;

    for (var k in layers) {
      layers[k].remove();
    }

    if (gl) {
      gl.viewport(0, 0, context.width * 2, context.height * 2);
      gl.clear(gl.COLOR_BUFFER_BIT);

      var gl_lose = gl.getExtension('WEBGL_lose_context');
      gl_lose && gl_lose.loseContext();
    }

    removeEvts(canvas, zoomevts);

    events.disable();
    texts && texts.remove();

    removed = true;
  };

  var last_view = {};
  function checkChangeViewport() {
    var is_change = false;
    if (last_view) {
      for (var k in view) {
        if (last_view[k] !== view[k]) is_change = true;
      }
    }
    _utils2.default.extend(last_view, view);

    if (is_change) {
      options.onChangeViewport && options.onChangeViewport(view);
    }
  }

  function onContextMenu(e) {}

  function onWheel(e) {
    var rect = canvas.getBoundingClientRect();

    if (!options.passiveEvts) {
      e.preventDefault();
    }

    var oldsize = void 0,
        oldx = void 0,
        oldy = void 0;

    // Mouse coordinates
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    var radius = 10;

    // if no timer found i.e. we are not in continuous phase
    // we are calculating the focus variables again
    if (!onWheel.continuosZoom) {
      onWheel.startView = { size: view.size, x: view.x, y: view.y };

      var lCoords = this.getLayerCoords({ x1: mouseX - radius, y1: mouseY - radius, x2: mouseX + radius, y2: mouseY - radius });
      var searchNodes = this.findArea(lCoords.x1, lCoords.y1, lCoords.x2, lCoords.y2, true);
      // if node found beneath mouse_ptr, zooming_focus is the center of that node
      if (searchNodes.nodes.length) {
        var node = searchNodes.nodes[0];
        var focus = this.getScreenCoords({
          x: node.node.x,
          y: node.node.y
        });
        onWheel.focusX = focus.x;
        onWheel.focusY = focus.y;
      }
      // else, it is the window co-ords of the mouse_ptr
      else {
          onWheel.focusX = mouseX;
          onWheel.focusY = mouseY;
        }
      onWheel.oldX = view.x;
      onWheel.oldY = view.y;
      onWheel.oldSize = view.size;

      if (onWheel.continuosZoom) clearTimeout(onWheel.continuosZoom);

      oldx = view.x;
      oldy = view.y;
    }
    onWheel.continuosZoom = setTimeout(function () {
      onWheel.continuosZoom = undefined;
    }, 200);

    var size = Math.min(1.0, view.size * (1 + 0.001 * (e.deltaMode ? 33 : 1) * e.deltaY));
    var delta = size - onWheel.oldSize;

    view.size = size;
    view.x = Math.max(0, Math.min(1 - size, onWheel.oldX - delta * onWheel.focusX / canvas.width));
    view.y = Math.max(0, Math.min(1 - size, onWheel.oldY - delta * (1 - onWheel.focusY / canvas.height)));

    if (options.onZoom && options.onZoom(view) === false) {
      view.size = oldsize;
      view.x = oldx;
      view.y = oldy;
      return;
    }

    checkChangeViewport();

    this.draw();
  }

  var lastUpTime = 0;
  function onMouseDown(downe) {
    var _this2 = this;

    if (downe.which !== 1) return; //catch only 1 - left mouse button

    var parseTouchEvts = function parseTouchEvts(e) {
      if (!e.touches) return e;

      var x = 0,
          y = 0;
      for (var i = 0; i < e.touches.length; i++) {
        x += e.touches[i].clientX;y += e.touches[i].clientY;
      }
      e.clientX = x / e.touches.length;
      e.clientY = y / e.touches.length;

      return e;
    };

    downe = parseTouchEvts(downe);

    var width = canvas.width / view.size;
    var height = canvas.height / view.size;
    var sx = downe.clientX;
    var sy = downe.clientY;
    var dx = view.x + sx / width;
    var dy = sy / height - view.y;
    var od = options.onDrag;
    var dragged = void 0,
        custom = void 0;
    var panning = true;
    var zooming = false;
    var evts = void 0;

    var origdist = void 0;
    if ((downe.touches || []).length === 2) {
      var mx = downe.touches[0].clientX - downe.touches[1].clientX,
          my = downe.touches[0].clientY - downe.touches[1].clientY;
      origdist = Math.sqrt(mx * mx + my * my);
      zooming = true;
    }

    var drag = function drag(e) {
      e = parseTouchEvts(e);

      if (e.touches && e.touches.length != 1) panning = false;

      if (dragged) {
        if (panning) {
          if (custom) {
            od.drag && od.drag(e);
          } else {
            view.x = Math.max(0, Math.min(1 - view.size, dx - e.clientX / width));
            view.y = Math.max(0, Math.min(1 - view.size, e.clientY / height - dy));
            checkChangeViewport();
            _this2.draw();
          }
        }
      } else {
        var x = void 0,
            y = void 0;
        if (e.touches && e.touches.length > 0) {
          x = e.touches[0].clientX;y = e.touches[0].clientY;
        } else {
          x = e.clientX;y = e.clientY;
        }

        var _mx = x - sx;
        var _my = y - sy;

        if (_mx * _mx + _my * _my > 8) {
          dragged = true;
          custom = od && od.start(downe);
          custom && od.drag && od.drag(e);
        }
      }
      if (!options.passiveEvts) {
        e.preventDefault();
      }
    };

    var up = function up(e) {
      e = parseTouchEvts(e);

      custom && od.stop && od.stop(e);

      if (!dragged) {
        options.onClick && options.onClick(e);

        if (new Date().getTime() - lastUpTime < 250) {
          options.onDblClick && options.onDblClick(e);
          lastUpTime = 0;
        } else {
          lastUpTime = new Date().getTime();
        }
      }

      removeEvts(window, evts);
    };

    var zoom = function zoom(e) {
      e = parseTouchEvts(e);

      if (e.touches && e.touches.length == 2) {
        var _mx2 = e.touches[0].clientX - e.touches[1].clientX,
            _my2 = e.touches[0].clientY - e.touches[1].clientY;
        var dist = Math.sqrt(_mx2 * _mx2 + _my2 * _my2);
        e.deltaY = -(dist - origdist) * 5;
        onWheelThis(e);
        origdist = dist;
      }
    };

    addEvts(window, evts = {
      'mouseup': up,
      'touchend': up,
      'touchcancel': up,
      'mousemove': zooming ? zoom : drag,
      'touchmove': zooming ? zoom : drag
    });
  }

  this.image = function () {
    if (checkRemoved()) return;

    return canvas.toDataURL();
  };

  this.resize = function () {
    if (checkRemoved()) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  this.getViewport = function () {
    return view;
  };

  this.setViewport = function (v) {
    if (checkRemoved()) return;

    _utils2.default.extend(view, v);

    checkChangeViewport();
  };

  this.resetView = function () {
    return _this.setViewport({ size: 1, x: 0, y: 0 });
  };

  //expose these methods from layer into this class
  ['update'].forEach(function (method) {
    (function (method, self) {
      self[method] = function () {
        var args = arguments;
        for (var k in layers) {
          var l = layers[k];
          l[method].apply(l, args);
        };
        return self;
      };
    })(method, self);
  });

  if (gl = getContext(canvas)) {
    gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);
  }

  view = { size: 1, x: 0, y: 0 };

  this.resize();

  textures = new _textures2.default(events, onLoad);
  files = new _files2.default(events, onLoad);
  texts = gl && new _texts2.default(gl, files, textures);
  layers.main = new _layer2.default(canvas, context, view, gl, textures, files, texts, events, options, backgroundColor, nodeStyle, edgeStyle, getSize, getNodeSize, getLabelSize, getLabelHideSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad);

  if (!gl) console.warn("Cannot initialize WebGL context");
};

ccNetViz.isWebGLSupported = function () {
  return !!getContext(sCanvas);
};

ccNetViz.color = _color2.default;
ccNetViz.spatialSearch = _spatialSearch2.default;
ccNetViz.layout = _layout2.default;
ccNetViz.color = _color2.default;

window.ccNetViz = ccNetViz;
exports.default = ccNetViz;

/***/ }),

/***/ "./src/ccNetVizMultiLevel.js":
/*!***********************************!*\
  !*** ./src/ccNetVizMultiLevel.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ccNetViz = __webpack_require__(/*! ./ccNetViz */ "./src/ccNetViz.js");

var _ccNetViz2 = _interopRequireDefault(_ccNetViz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */

var ccNetVizMultiLevel = function ccNetVizMultiLevel(canvas, options) {
  var vizScreen = new _ccNetViz2.default(canvas, options);
  var vizLayout;

  var history = [];
  var curlevel = {};

  var onContextMenu, onClick;

  //right click >> go back
  canvas.addEventListener('contextmenu', onContextMenu = function onContextMenu(e) {

    if (history.length > 0) {
      var histel = history.pop();

      //currently shown level
      curlevel = histel;

      vizScreen.set(curlevel.nodes, curlevel.edges);
      vizScreen.draw();
    }

    e.preventDefault();
  });

  canvas.addEventListener('click', onClick = function onClick(e) {
    var bb = canvas.getBoundingClientRect();

    var x = e.clientX - bb.left;
    var y = e.clientY - bb.top;
    var radius = 5;

    var lCoords = vizScreen.getLayerCoords({ radius: radius, x: x, y: y });
    var result = vizScreen.find(lCoords.x, lCoords.y, lCoords.radius, true, false);
    if (result.nodes.length > 0) {
      var node = result.nodes[0].node;
      var layout = node.layout || vizLayout;

      if (node.__computedLayout) {
        // it is not nessesary to recompute layout if it was yet computed on this subgraph
        layout = undefined;
      } else {
        // we store that layout was once computed for this subgraph
        node.__computedLayout = true;
      }

      if (node.nodes && node.edges) {
        var insidenodes = node.nodes;
        var insideedges = node.edges;

        history.push(curlevel);

        curlevel = {
          nodes: insidenodes,
          edges: insideedges
        };

        vizScreen.set(curlevel.nodes, curlevel.edges, layout);
        vizScreen.draw();
      }
    }
  });

  //// TODO: Add interactivity functios into this class

  this.remove = function () {
    canvas.removeEventListener('contextmenu', onContextMenu);
    canvas.removeEventListener('click', onClick);
    vizScreen.remove();
  };

  this.set = function (nodes, edges, layout) {
    curlevel = { nodes: nodes, edges: edges };
    history = [];

    vizLayout = layout;
    vizScreen.set.apply(vizScreen, arguments);
  };

  var exposeMethods = ['find', 'findArea', 'getLayerCoords', 'draw', 'resetView', 'setViewport', 'update', 'resetView'];
  var self = this;
  exposeMethods.forEach(function (method) {
    (function (method, self) {
      self[method] = function () {
        return vizScreen[method].apply(vizScreen, arguments);
      };
    })(method, self);
  });
};

window.ccNetVizMultiLevel = ccNetVizMultiLevel;

exports.default = ccNetVizMultiLevel;

/***/ }),

/***/ "./src/color.js":
/*!**********************!*\
  !*** ./src/color.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var Color = function Color(color) {
    _classCallCheck(this, Color);

    this.a = 1;

    if (color instanceof Color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    } else if (arguments.length >= 3) {
        this.r = arguments[0];
        this.g = arguments[1];
        this.b = arguments[2];
        arguments.length > 3 && (this.a = arguments[3]);
    } else if (/^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {
        color = /^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
        var get = function get(v) {
            return parseInt(v, 10) / 255;
        };

        this.r = get(color[1]);
        this.g = get(color[2]);
        this.b = get(color[3]);
        this.a = get(color[4]);
    } else if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {
        color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
        var _get = function _get(v) {
            return parseInt(v, 10) / 255;
        };

        this.r = _get(color[1]);
        this.g = _get(color[2]);
        this.b = _get(color[3]);
    } else if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(color)) {
        color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(color);
        var _get2 = function _get2(v) {
            return parseInt(v, 10) / 100;
        };

        this.r = _get2(color[1]);
        this.g = _get2(color[2]);
        this.b = _get2(color[3]);
    } else if (/^\#([0-9a-f]{6})$/i.test(color)) {
        color = parseInt(color.substring(1), 16);
        this.r = (color >> 16 & 255) / 255;
        this.g = (color >> 8 & 255) / 255;
        this.b = (color & 255) / 255;
    } else {
        this.r = this.g = this.b = 0;
    }
};

exports.default = Color;
;

/***/ }),

/***/ "./src/dataSources/files.js":
/*!**********************************!*\
  !*** ./src/dataSources/files.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _gl = __webpack_require__(/*! ../gl */ "./src/gl.js");

var _gl2 = _interopRequireDefault(_gl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

var _class = function () {
  function _class(events, onLoad) {
    _classCallCheck(this, _class);

    this._load = [events.debounce(onLoad || function () {}, 5)];
    this._files = {};
    this._pending = {};
    this._n = 0;
  }

  _createClass(_class, [{
    key: '_transformFile',
    value: function _transformFile(data, dataType) {
      if (dataType === 'json') return JSON.parse(data);
      return data;
    }
  }, {
    key: 'get',
    value: function get(url) {
      return this._files[url];
    }

    /*
     * @param type {
     *   url: 'url of file',
     *   success: callback
     *   dataType "text" || "json"
     * }
     */

  }, {
    key: 'load',
    value: function load(url, action, dataType) {
      var _this = this;

      var p = this._pending[url];
      var f = this._files[url];

      if (p) {
        p.push(action);
      } else if (f) {
        action && action();
      } else {
        p = this._pending[url] = [action];
        this._n++;

        _utils2.default.ajax(url, function (data) {
          _this._files[url] = _this._transformFile(data, dataType);
          p.forEach(function (a) {
            return a && a(_this._files[url]);
          });
          delete _this._pending[url];
          --_this._n || _this._load.forEach(function (l) {
            return l();
          });
        }, dataType == 'arraybuffer' ? dataType : undefined);
      }
      return f;
    }
  }, {
    key: 'onLoad',
    value: function onLoad(action) {
      if (this.allLoaded()) action();else this._load.push(action);
    }
  }, {
    key: 'allLoaded',
    value: function allLoaded() {
      return _utils2.default.emptyObject(this._pending);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./src/dataSources/textures.js":
/*!*************************************!*\
  !*** ./src/dataSources/textures.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _gl = __webpack_require__(/*! ../gl */ "./src/gl.js");

var _gl2 = _interopRequireDefault(_gl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

var _class = function () {
    function _class(events, onLoad) {
        _classCallCheck(this, _class);

        this._load = [events.debounce(onLoad, 5)];
        this._textures = {};
        this._pending = {};
        this._n = 0;
    }

    _createClass(_class, [{
        key: 'get',
        value: function get(gl, img, action, options) {
            var _this = this;

            var p = this._pending[img];
            var t = this._textures[img];

            if (p) {
                p.push(action);
            } else if (t) {
                action && action();
            } else {
                p = this._pending[img] = [action];
                this._n++;
                this._textures[img] = t = _gl2.default.createTexture(gl, img, function () {
                    p.forEach(function (a) {
                        return a && a();
                    });
                    delete _this._pending[img];
                    --_this._n || _this._load.forEach(function (l) {
                        return l();
                    });
                }, options);
            }
            return t;
        }
    }, {
        key: 'onLoad',
        value: function onLoad(action) {
            if (this.allLoaded()) action();else this._load.push(action);
        }
    }, {
        key: 'allLoaded',
        value: function allLoaded() {
            return _utils2.default.emptyObject(this._pending);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./src/geomutils.js":
/*!**************************!*\
  !*** ./src/geomutils.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: "edgeSource",
    value: function edgeSource(e) {
      if (e.source.source) {
        //source is edge
        var s = this.edgeSource(e.source);
        var t = this.edgeTarget(e.source);

        return {
          x: (s.x + t.x) / 2,
          y: (s.y + t.y) / 2,
          uniqid: e.uniqid,
          index: e.index,
          is_edge: true,
          e: e.source
        };
      }

      return e.source;
    }
  }, {
    key: "edgeTarget",
    value: function edgeTarget(e) {
      if (e.target.source) {
        //target is edge
        var s = this.edgeSource(e.target);
        var t = this.edgeTarget(e.target);

        return {
          x: (s.x + t.x) / 2,
          y: (s.y + t.y) / 2,
          uniqid: e.uniqid,
          index: e.index,
          is_edge: true,
          e: e.target
        };
      }

      return e.target;
    }
  }, {
    key: "getCurveShift",
    value: function getCurveShift(e, r) {
      r = r || {};
      r.x = r.y = r.cx = r.cy = 0;
      if (!e) return r;
      if (e.t && e.t >= 1) {
        //curve or circle
        if (e.t >= 2) {
          //circle
          var s = this.edgeSource(e);
          var d = s.y < 0.5 ? 1 : -1;

          r.cx = d * 1.25;
          r.cy = 0;
        } else {
          var se = this.edgeSource(e);
          var te = this.edgeTarget(e);

          r.x = se.x - te.x;
          r.y = se.y - te.y;
        }
      }
      return r;
    }
  }]);

  return _class;
}();

exports.default = _class;
;

/***/ }),

/***/ "./src/gl.js":
/*!*******************!*\
  !*** ./src/gl.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "initExtensions",
        value: function initExtensions(gl) {
            var extensions = gl.getSupportedExtensions();
            var result = {};
            for (var i = 1; i < arguments.length; i++) {
                var e = arguments[i];
                (result[e] = extensions.indexOf(e) >= 0) && gl.getExtension(e);
            }
            return result;
        }
    }, {
        key: "createShader",
        value: function createShader(gl, type, source) {
            var result = gl.createShader(type);
            gl.shaderSource(result, source);
            gl.compileShader(result);

            if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
                console.log(gl.getShaderInfoLog(result));
                return null;
            }
            return result;
        }
    }, {
        key: "createTexture",
        value: function createTexture(gl, img, onLoad, options) {
            var result = gl.createTexture();

            var image = new Image();

            var load = function load() {
                image.onload = null;
                gl.bindTexture(gl.TEXTURE_2D, result);

                if ((options || {}).sdf) {
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, image);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                } else {
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }

                gl.bindTexture(gl.TEXTURE_2D, null);
                onLoad && onLoad();
            };

            image.onload = load;
            image.src = img;
            image.naturalWidth && image.naturalHeight && load();

            result.image = image;
            return result;
        }
    }, {
        key: "uniformColor",
        value: function uniformColor(gl, location, color) {
            gl.uniform4f(location, color.r, color.g, color.b, color.a);
        }
    }, {
        key: "ortho",
        value: function ortho(left, right, bottom, top, near, far) {
            var lr = 1 / (left - right),
                bt = 1 / (bottom - top),
                nf = 1 / (near - far);

            var result = new Float32Array(16);
            result[0] = -2 * lr;
            result[1] = 0;
            result[2] = 0;
            result[3] = 0;
            result[4] = 0;
            result[5] = -2 * bt;
            result[6] = 0;
            result[7] = 0;
            result[8] = 0;
            result[9] = 0;
            result[10] = 2 * nf;
            result[11] = 0;
            result[12] = (left + right) * lr;
            result[13] = (top + bottom) * bt;
            result[14] = (far + near) * nf;
            result[15] = 1;
            return result;
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),

/***/ "./src/interactivityBatch.js":
/*!***********************************!*\
  !*** ./src/interactivityBatch.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _geomutils = __webpack_require__(/*! ./geomutils */ "./src/geomutils.js");

var _geomutils2 = _interopRequireDefault(_geomutils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska
 */

function pushUnique(arr, e) {
  if (arr.indexOf(e) >= 0) return;
  arr.push(e);
}

var _class = function () {
  function _class(layers, insertTempLayer, draw, nodes, edges, checkUniqId) {
    var _this = this;

    _classCallCheck(this, _class);

    this._layers = layers;
    this._insertTempLayer = insertTempLayer;

    this._draw = draw;
    this._nodes = nodes;
    this._edges = edges;
    this._checkUniqId = checkUniqId;

    this._toAddEdges = [];
    this._toAddNodes = [];
    this._toRemoveEdges = [];
    this._toRemoveNodes = [];

    //create support structures
    this._nPos = {};
    this._ePos = {};
    this._eDirs = {};

    nodes.forEach(function (n, i) {
      _this._nPos[n.uniqid] = i;
      _this._eDirs[n.uniqid] = {};
    });

    edges.forEach(function (e, i) {
      var s = _geomutils2.default.edgeSource(e);
      var t = _geomutils2.default.edgeTarget(e);

      var si = s.uniqid || s.__uniqid;
      var ti = t.uniqid || t.__uniqid;
      (_this._eDirs[si] || (_this._eDirs[si] = {}))[ti] = e;
      _this._ePos[e.uniqid] = i;
    });

    this._actualTempNodes = [];
    this._actualTempEdges = [];
  }

  _createClass(_class, [{
    key: "_doRemoveNodes",
    value: function _doRemoveNodes(nodes) {
      var _this2 = this;

      nodes.forEach(function (n) {
        if (n.uniqid === undefined) return;

        if (_this2._nPos[n.uniqid] !== undefined) {
          //in the normal graph
          var pos = _this2._nPos[n.uniqid];
          _this2._layers.main.removeNodeAtPos(pos);
          delete _this2._nPos[n.uniqid];
        } else {
          //try to remove from temp graph

          for (var i = 0; i < _this2._actualTempNodes.length; i++) {
            if (_this2._actualTempNodes[i] === n) {
              _this2._actualTempNodes.splice(i, 1);
              break;
            }
          }
        }

        n.__uniqid = n.uniqid;
        delete n.uniqid;
      });
    }
  }, {
    key: "_doRemoveEdges",
    value: function _doRemoveEdges(edges) {
      var _this3 = this;

      edges.forEach(function (e) {
        if (e.uniqid === undefined) return;

        var s = _geomutils2.default.edgeSource(e);
        var t = _geomutils2.default.edgeTarget(e);

        delete (_this3._eDirs[s.uniqid || s.__uniqid] || {})[t.uniqid || t.__uniqid];

        if (_this3._ePos[e.uniqid] !== undefined) {
          //in the normal graph
          var pos = _this3._ePos[e.uniqid];
          _this3._layers.main.removeEdgeAtPos(pos);
          delete _this3._ePos[e.uniqid];
        } else {
          //try to remove from temp graph

          for (var i = 0; i < _this3._actualTempEdges.length; i++) {
            if (_this3._actualTempEdges[i] === e) {
              _this3._actualTempEdges.splice(i, 1);
              break;
            }
          }
        }

        e.__uniqid = e.uniqid;
        delete e.uniqid;
      });
    }
  }, {
    key: "_doAddEdges",
    value: function _doAddEdges() {
      var _this4 = this;

      this._toAddEdges.forEach(function (e) {
        //already added in main graph
        if (_this4._ePos[e.uniqid] !== undefined) {
          _this4._doRemoveEdges([e]);
        }

        if (e.uniqid !== undefined) {
          console.error(e);
          console.error("This edge has been already added, if you want to add same edge twice, create new object with same properties");
          return;
        }
        _this4._checkUniqId(e);

        //add this node into temporary chart

        //TODO: Not so efficient >> causes quadratic complexity of adding edges into temporary graph
        pushUnique(_this4._actualTempEdges, e);
      });
    }
  }, {
    key: "_doAddNodes",
    value: function _doAddNodes(nodes) {
      var _this5 = this;

      this._toAddNodes.forEach(function (n) {
        if (_this5._nPos[n.uniqid] !== undefined) {
          _this5._doRemoveNodes([n]);
        }

        //already added
        if (n.uniqid !== undefined) {
          console.error(n);
          console.error("This node has been already added, if you want to add same node twice, create new object with same properties");
          return;
        }
        _this5._checkUniqId(n);

        _this5._eDirs[n.uniqid] = {};

        //TODO: Not so efficient >> causes quadratic complexity of adding nodes into temporary graph
        pushUnique(_this5._actualTempNodes, n);
      });
    }
  }, {
    key: "addEdge",
    value: function addEdge(e) {
      var s = _geomutils2.default.edgeSource(e);
      var t = _geomutils2.default.edgeTarget(e);

      var tid = t.uniqid || t.__uniqid;
      var sid = s.uniqid || s.__uniqid;

      if ((this._eDirs[sid] || {})[tid]) {
        //this edge was already added >> remove it
        this._doRemoveEdges([e]);
      }

      if ((this._eDirs[tid] || {})[sid]) {
        //must remove line and add two curves

        this._toAddEdges.push(this._eDirs[tid][sid]);
        this._doRemoveEdges([this._eDirs[tid][sid]]);

        this._toAddEdges.push(this._eDirs[sid][tid] = e);

        return this;
      }

      this._toAddEdges.push(e);
      return this;
    }
  }, {
    key: "addNode",
    value: function addNode(n) {
      this._toAddNodes.push(n);
      return this;
    }
  }, {
    key: "removeNode",
    value: function removeNode(n) {
      this._toRemoveNodes.push(n);
      return this;
    }
  }, {
    key: "removeEdge",
    value: function removeEdge(e) {
      this._toRemoveEdges.push(e);
      return this;
    }
  }, {
    key: "applyChanges",
    value: function applyChanges() {

      //nothing to do
      if (this._toRemoveEdges.length === 0 && this._toRemoveNodes.length === 0 && this._toAddEdges.length === 0 && this._toAddNodes.length === 0) return this;

      this._actualTempNodes = this._layers.temp ? this._layers.temp.nodes : [];
      this._actualTempEdges = this._layers.temp ? this._layers.temp.edges : [];

      this._doRemoveEdges(this._toRemoveEdges);
      this._doRemoveNodes(this._toRemoveNodes);
      this._doAddNodes();
      this._doAddEdges();

      this._toAddEdges = [];
      this._toAddNodes = [];
      this._toRemoveEdges = [];
      this._toRemoveNodes = [];

      this._insertTempLayer();
      this._layers.temp.set(this._actualTempNodes, this._actualTempEdges);

      this._draw();

      return this;
    }
  }]);

  return _class;
}();

exports.default = _class;
;

/***/ }),

/***/ "./src/layer.js":
/*!**********************!*\
  !*** ./src/layer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (canvas, context, view, gl, textures, files, texts, events, options, backgroundColor, nodeStyle, edgeStyle, getSize, getNodeSize, getLabelSize, getLabelHideSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad) {
    var _this = this;

    getNodesCnt = getNodesCnt || function () {
        return _this.nodes.length;
    };
    getEdgesCnt = getEdgesCnt || function () {
        return _this.edges.length;
    };

    this.redraw = onRedraw || function () {};

    options = options || {};
    options.styles = options.styles || {};

    var nodesFiller = function nodesFiller(style) {
        return {
            set: function set(v, e, iV, iI) {
                var x = e.x;
                var y = e.y;
                _primitive2.default.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                _primitive2.default.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
                if (v.color) {
                    var c = e.color;
                    _primitive2.default.colors(v.color, iV, c, c, c, c);
                }
                _primitive2.default.quad(v.indices, iV, iI);
            } };
    };
    var labelsFiller = function labelsFiller(style) {
        return function (style) {
            var textEngine = texts.getEngine(style.font);

            textEngine.setFont(style.font);

            return {
                set: function set(v, e, iV, iI) {
                    var x = e.x;
                    var y = e.y;

                    var ret = false;
                    var parts = textEngine.get(e.label || "", x, y, function () {
                        ret = true;
                    });
                    for (var i = 0; i < parts.length; i++, iV += 4, iI += 6) {
                        var c = parts[i];

                        _primitive2.default.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                        _primitive2.default.vertices(v.relative, iV, c.dx, c.dy, c.width + c.dx, c.dy, c.width + c.dx, c.height + c.dy, c.dx, c.height + c.dy);
                        _primitive2.default.vertices(v.textureCoord, iV, c.left, c.bottom, c.right, c.bottom, c.right, c.top, c.left, c.top);
                        _primitive2.default.quad(v.indices, iV, iI);
                    }

                    return ret;
                },
                size: function size(v, e) {
                    return textEngine.steps(e.label || "");
                }
            };
        }(style);
    };

    var normalize = function normalize(a, b) {
        var x = b.x - a.x;
        var y = b.y - a.y;
        var sc = 1 / Math.sqrt(x * x + y * y);
        return { x: sc * x, y: sc * y };
    };

    var dx = Math.cos(0.9);
    var dy = Math.sin(0.9);

    var ct1 = {},
        ct2 = {},
        ct = {};
    var setVerticeCurveShift = function setVerticeCurveShift(v, iV, s, t) {
        var csx = void 0,
            csy = void 0,
            ctx = void 0,
            cty = void 0,
            cisx = void 0,
            cisy = void 0,
            sisy = void 0,
            citx = void 0,
            city = void 0;
        _geomutils2.default.getCurveShift(t.e, ct1);
        ctx = ct1.x;
        cty = ct1.y;
        citx = ct1.cx;
        city = ct1.cy;

        _geomutils2.default.getCurveShift(s.e, ct2);
        csx = ct2.x;
        csy = ct2.y;
        cisx = ct2.cx;
        cisy = ct2.cy;

        v.curveShift && _primitive2.default.vertices(v.curveShift, iV, -csy, csx, -csy, csx, -cty, ctx, -cty, ctx);
        v.circleShift && _primitive2.default.vertices(v.circleShift, iV, -cisy, cisx, -cisy, cisx, -city, citx, -city, citx);
    };

    var edgesFiller = {
        'lines': function lines(style) {
            return {
                set: function set(v, e, iV, iI) {
                    var s = _geomutils2.default.edgeSource(e);
                    var t = _geomutils2.default.edgeTarget(e);
                    var dx = s.x - t.x;
                    var dy = s.y - t.y;
                    var d = normalize(s, t);

                    setVerticeCurveShift(v, iV, s, t);

                    _primitive2.default.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
                    _primitive2.default.vertices(v.lengthSoFar, iV, 0, 0, 0, 0, dx, dy, dx, dy);
                    _primitive2.default.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
                    _primitive2.default.quad(v.indices, iV, iI);
                } };
        },
        'curves': function curves(style) {
            return {
                numVertices: 3,
                numIndices: 3,
                set: function set(v, e, iV, iI) {
                    var s = _geomutils2.default.edgeSource(e);
                    var t = _geomutils2.default.edgeTarget(e);
                    var dx = s.x - t.x;
                    var dy = s.y - t.y;
                    var d = normalize(s, t);

                    setVerticeCurveShift(v, iV, s, t);

                    _primitive2.default.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
                    _primitive2.default.vertices(v.lengthSoFar, iV, 0, 0, dx / 2, dy / 2, dx, dy);
                    _primitive2.default.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
                    _primitive2.default.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
                    _primitive2.default.indices(v.indices, iV, iI, 0, 1, 2);
                }
            };
        },
        'circles': function circles(style) {
            return {
                set: function set(v, e, iV, iI) {
                    var s = _geomutils2.default.edgeSource(e);
                    var d = s.y < 0.5 ? 1 : -1;

                    var xdiff1 = 0;
                    var ydiff1 = 0;
                    var xdiff2 = 1;
                    var ydiff2 = d;
                    var xdiff3 = 2;
                    var ydiff3 = 1.25 * d;
                    var xdiff4 = 3;
                    var ydiff4 = 1.5 * d;

                    setVerticeCurveShift(v, iV, s, s);

                    _primitive2.default.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
                    _primitive2.default.vertices(v.lengthSoFar, iV, xdiff1, ydiff1, xdiff2, ydiff2, xdiff3, ydiff3, xdiff4, ydiff4);
                    _primitive2.default.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
                    _primitive2.default.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
                    _primitive2.default.quad(v.indices, iV, iI);
                }
            };
        }
    };

    var _set = function _set(v, e, s, t, iV, iI, dx, dy) {
        var tx = t.x;
        var ty = t.y;

        var offsetMul = void 0;
        var ctx = void 0,
            cty = void 0,
            citx = void 0,
            city = void 0;

        _geomutils2.default.getCurveShift(t.e, ct);
        ctx = ct.x;
        cty = ct.y;
        citx = ct.cx;
        city = ct.cy;

        if (t.is_edge) {
            //if target is edge, disable node offset for arrow
            //normal of that edge
            offsetMul = 0;
        } else {
            offsetMul = 1;
        }
        v.curveShift && _primitive2.default.vertices(v.curveShift, iV, -cty, ctx, -cty, ctx, -cty, ctx, -cty, ctx);
        v.circleShift && _primitive2.default.vertices(v.circleShift, iV, -city, citx, -city, citx, -city, citx, -city, citx);

        _primitive2.default.singles(v.offsetMul, iV, offsetMul, offsetMul, offsetMul, offsetMul);
        _primitive2.default.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
        _primitive2.default.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
        _primitive2.default.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
        _primitive2.default.quad(v.indices, iV, iI);
    };

    var arrowFiller = {
        lineArrows: function lineArrows(style) {
            return {
                set: function set(v, e, iV, iI) {
                    var s = _geomutils2.default.edgeSource(e);
                    var t = _geomutils2.default.edgeTarget(e);
                    var d = normalize(s, t);
                    _set(v, e, s, t, iV, iI, d.x, d.y);
                } };
        },
        curveArrows: function curveArrows(style) {
            return {
                set: function set(v, e, iV, iI) {
                    var s = _geomutils2.default.edgeSource(e);
                    var t = _geomutils2.default.edgeTarget(e);
                    return _set(v, e, s, t, iV, iI, 0.5 * (t.x - s.x), 0.5 * (t.y - s.y));
                }
            };
        },
        circleArrows: function circleArrows(style) {
            return {
                set: function set(v, e, iV, iI) {
                    var t = _geomutils2.default.edgeTarget(e);
                    var s = t;
                    return _set(v, e, s, t, iV, iI, t.x < 0.5 ? dx : -dx, t.y < 0.5 ? -dy : dy);
                }
            };
        }
    };

    this.getCurrentSpatialSearch = function (context) {
        if (spatialSearch === undefined) {
            spatialSearch = new _spatialSearch2.default(context, texts, options, [], {}, [], {}, [], {}, [], {}, normalize, nodeStyle, getLabelSize, getLabelHideSize);
        }
        return spatialSearch;
    };

    this.remove = function () {};

    var edgeTypes = void 0;
    var edgePoses = void 0;

    var spatialSearch = undefined;

    var lvl = 0;
    //make sure everything (files and textures) are load, if not, redraw the whole graph after they became
    var set_end = function set_end() {
        var enableLazyRedraw = false;
        var reset = function reset(p) {
            if (enableLazyRedraw) _this.set(_this.nodes, _this.edges);
        };
        files.onLoad(reset);
        textures.onLoad(reset);
        enableLazyRedraw = true;
    };

    this.set = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(nodes, edges, layout, layout_options) {
            var lines, curves, circles, _i, e, getIndex, init, nodesParts, circlesParts, linesParts, curvesParts, tryInitPrimitives;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            removedNodes = 0;
                            removedEdges = 0;

                            this.nodes = nodes = nodes || [];
                            this.edges = edges = edges ? [].concat(edges) : [];

                            spatialSearch = undefined;

                            lines = [], curves = [], circles = [];

                            //tanslate indexes into node objects

                            for (_i = 0; _i < edges.length; _i++) {
                                e = edges[_i];

                                if (typeof e.source == 'number') e.source = nodes[e.source];

                                if (typeof e.target == 'number') e.target = nodes[e.target];
                            }

                            getIndex = function getIndex(e) {
                                return e.uniqid || -e.index || -e.nidx;
                            };

                            init = function init() {
                                for (var _i2 = 0; _i2 < nodes.length; _i2++) {
                                    nodes[_i2].index = _i2;
                                }

                                for (var _i3 = 0, j = nodes.length + 10; _i3 < edges.length; _i3++, j++) {
                                    edges[_i3].nidx = j;
                                }

                                edgeTypes = [];
                                edgePoses = new Uint32Array(edges.length);
                                var dummysd = { k: '_', kArrow: '_', d: [] };
                                var circlesd = { k: 'circles', kArrow: 'circleArrows', d: circles };
                                var linesd = { k: 'lines', kArrow: 'lineArrows', d: lines };
                                var curvesd = { k: 'curves', kArrow: 'curveArrows', d: curves };

                                if (extensions.OES_standard_derivatives) {
                                    var map = {};
                                    for (var _i4 = 0; _i4 < edges.length; _i4++) {
                                        var _e = edges[_i4];

                                        var si = getIndex(_e.source);
                                        var ti = getIndex(_e.target);

                                        (map[si] || (map[si] = {}))[ti] = true;
                                    }

                                    for (var _i5 = 0; _i5 < edges.length; _i5++) {
                                        var target = void 0,
                                            _e2 = edges[_i5];

                                        var _si = getIndex(_e2.source);
                                        var _ti = getIndex(_e2.target);

                                        var t = dummysd;
                                        if (_si === _ti) {
                                            _e2.t = 2; //circle
                                            target = circles;
                                            t = circlesd;
                                        } else {
                                            var m = map[_ti];
                                            if (m && m[_si]) {
                                                _e2.t = 1; //curve
                                                target = curves;
                                                t = curvesd;
                                            } else {
                                                _e2.t = 0; //line
                                                target = lines;
                                                t = linesd;
                                            }
                                        }
                                        edgeTypes.push(t);
                                        edgePoses[_i5] = t.d.length;
                                        target.push(_e2);
                                    }
                                } else {
                                    for (var _i6 = 0; _i6 < edges.length; _i6++) {
                                        var _e3 = edges[_i6];

                                        var _si2 = getIndex(_e3.source);
                                        var _ti2 = getIndex(_e3.target);

                                        var _t = dummysd;
                                        if (_si2 !== _ti2) {
                                            _t = linesd;
                                            _e3.t = 0;
                                            lines.push(_e3);
                                        }
                                        edgeTypes.push(_t);
                                        edgePoses[_i6] = _t.d.length;
                                    }
                                }
                            };

                            init();

                            nodesParts = (0, _primitiveTools.partitionByStyle)(nodes);
                            circlesParts = (0, _primitiveTools.partitionByStyle)(circles);
                            linesParts = (0, _primitiveTools.partitionByStyle)(lines);
                            curvesParts = (0, _primitiveTools.partitionByStyle)(curves);


                            this.getCurrentSpatialSearch = function (context) {
                                if (spatialSearch === undefined) {
                                    spatialSearch = new _spatialSearch2.default(context, texts, options, nodes, nodesParts, lines, linesParts, curves, curvesParts, circles, circlesParts, normalize, nodeStyle, getLabelSize, getLabelHideSize);
                                }
                                return spatialSearch;
                            };

                            if (!layout) {
                                _context.next = 18;
                                break;
                            }

                            _context.next = 18;
                            return new _layout2.default(nodes, edges, layout, layout_options).compute();

                        case 18:
                            if (gl) {
                                _context.next = 20;
                                break;
                            }

                            return _context.abrupt('return');

                        case 20:
                            tryInitPrimitives = function tryInitPrimitives() {

                                var isDirty = false;

                                var defaultAdder = function defaultAdder(section, addSection) {
                                    if (typeof section.style.texture === 'string') section.style.texture = textures.get(gl, section.style.texture, addSection);else addSection();
                                };
                                var labelAdder = function labelAdder(section, addSection) {
                                    var slf = (section.style.label || {}).font || {};
                                    var textEngine = texts.getEngine(slf);
                                    section.style.texture = textEngine.getTexture(slf, addSection);
                                };

                                var is = void 0;
                                is = nodes.length && !nodes[0].color;
                                isDirty = isDirty || scene.nodes.set(gl, options.styles, defaultAdder, is ? nodes : [], is ? nodesParts : {}, nodesFiller);
                                is = nodes.length && nodes[0].color;
                                isDirty = isDirty || scene.nodesColored.set(gl, options.styles, defaultAdder, is ? nodes : [], is ? nodesParts : {}, nodesFiller);

                                if (nodeStyle.label) {
                                    texts.clear();
                                    isDirty = isDirty || scene.labelsOutline.set(gl, options.styles, labelAdder, nodes, nodesParts, labelsFiller);
                                    isDirty = isDirty || scene.labels.set(gl, options.styles, labelAdder, nodes, nodesParts, labelsFiller);
                                    texts.bind();
                                }

                                isDirty = isDirty || scene.lines.set(gl, options.styles, defaultAdder, lines, linesParts, edgesFiller.lines);

                                if (extensions.OES_standard_derivatives) {
                                    isDirty = isDirty || scene.curves.set(gl, options.styles, defaultAdder, curves, curvesParts, edgesFiller.curves);
                                    isDirty = isDirty || scene.circles.set(gl, options.styles, defaultAdder, circles, circlesParts, edgesFiller.circles);
                                }

                                if (edgeStyle.arrow) {
                                    isDirty = isDirty || scene.lineArrows.set(gl, options.styles, defaultAdder, lines, linesParts, arrowFiller.lineArrows);

                                    if (extensions.OES_standard_derivatives) {
                                        isDirty = isDirty || scene.curveArrows.set(gl, options.styles, defaultAdder, curves, curvesParts, arrowFiller.curveArrows);

                                        isDirty = isDirty || scene.circleArrows.set(gl, options.styles, defaultAdder, circles, circlesParts, arrowFiller.circleArrows);
                                    }
                                }

                                return isDirty;
                            };

                            while (tryInitPrimitives()) {} //loop until they are not dirty
                            set_end();

                        case 23:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
        };
    }();

    this.update = function (element, attribute, data) {
        if (!gl) return;
        scene[element].update(gl, attribute, data, function (style) {
            return {
                set: function set(v, e, iV) {
                    return _primitive2.default.colors(v, iV, e, e, e, e);
                }
            };
        });
    };

    this.find = function (x, y, dist, nodes, edges, labels) {
        return _this.getCurrentSpatialSearch(context).find(context, x, y, dist, view.size, nodes, edges, labels);
    };

    this.findArea = function (x1, y1, x2, y2, nodes, edges, labels) {
        return _this.getCurrentSpatialSearch(context).findArea(context, x1, y1, x2, y2, view.size, nodes, edges, labels);
    };

    this.updateNode = function (n, i) {
        _this.nodes[i] = n;

        if (spatialSearch) spatialSearch.update(context, 'nodes', i, n);

        if (!gl) return;

        (_this.nodes[0].color ? scene.nodesColored : scene.nodes).updateEl(gl, n, i, nodesFiller);
        scene.labels && scene.labels.updateEl(gl, n, i, labelsFiller);
        scene.labelsOutline && scene.labelsOutline.updateEl(gl, n, i, labelsFiller);
    };

    this.updateEdge = function (e, i) {
        var t = edgeTypes[i];
        var pos = edgePoses[i];

        t.d[pos] = _this.edges[i] = e;

        if (spatialSearch) spatialSearch.update(context, t.k, pos, e);

        if (!gl) return;

        scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
        if (edgeStyle.arrow) scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);
    };

    var removedNodes = 0;
    var removedEdges = 0;

    var freenode = { x: -1, y: -1, title: "" };
    this.removeNodeAtPos = function (pos) {
        if (_this.nodes[pos] === freenode) {
            return;
        }

        removedNodes++;
        _this.updateNode(freenode, pos);
    };

    var freeedge = { source: { x: -1, y: -1 }, target: { x: -1, y: -1 } };
    this.removeEdgeAtPos = function (pos) {
        if (_this.edges[pos] === freeedge) {
            return;
        }

        removedEdges++;

        _this.updateEdge(freeedge, pos);
    };

    this.getVisibleNodes = function () {
        if (removedNodes <= 0) return _this.nodes;

        var r = [];
        _this.nodes.forEach(function (n) {
            if (n !== freenode) r.push(n);
        });
        return r;
    };

    this.getVisibleEdges = function () {
        if (removedEdges <= 0) return _this.edges;

        var r = [];
        _this.edges.forEach(function (n) {
            if (n !== freeedge) r.push(n);
        });
        return r;
    };

    this.cntShownNodes = function () {
        return _this.nodes.length - removedNodes;
    };

    this.cntShownEdges = function () {
        return _this.edges.length - removedEdges;
    };

    var getEdgeStyleSize = function getEdgeStyleSize(c) {
        return c.width / 120;
        /*      let avsize = (c.width + c.height)/2;
              let koef = (Math.min(Math.max((avsize - 150)/150, 0),1)+1)*1.3;
              //koef 1 for 150 size and 1.4 for 300 size
              return c.width/(130*koef);
        */
    };

    var stylesTransl = {
        'line': 0,
        'dashed': 1,
        'chain-dotted': 2,
        'dotted': 3
    };
    var getEdgeType = function getEdgeType(t) {
        if (t !== undefined) {
            t = stylesTransl[t];
        }

        if (t === undefined || typeof t !== 'number') {
            t = 0;
        }

        return t;
    };

    this.nodes = [];
    this.edges = [];

    var extensions = gl ? _gl2.default.initExtensions(gl, "OES_standard_derivatives") : {};
    var scene = this.scene = createScene.call(this);

    var loadCalled = false;
    if (!gl) {
        options.onLoad && !loadCalled && (loadCalled = true) && options.onLoad();return this;
    };

    var getLabelType = function getLabelType(f) {
        if (texts.isSDF(f)) return 1;
        return 0;
    };

    var fsColorTexture = ["precision mediump float;", "uniform vec4 color;", "uniform sampler2D texture;", "varying vec2 tc;", "void main(void) {", "   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));", "}"];

    var fsLabelTexture = ["precision mediump float;", "uniform lowp sampler2D texture;", "uniform mediump vec4 color;", "uniform mediump float height_font;", "uniform float type;", "uniform float buffer;", "uniform float boldness;", "float gamma = 4.0 * 1.4142 * boldness / height_font;", "varying mediump vec2 tc;", "void main() {", "  if(type > 0.5){", //SDF
    "    float tx=texture2D(texture, tc).a;", "    float a= smoothstep(buffer - gamma, buffer + gamma, tx);", "    gl_FragColor=vec4(color.rgb, a*color.a);", "  }else{", //NORMAL FONT
    "    gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));", "  }", "}"];

    var fsVarColorTexture = ["precision mediump float;", "uniform sampler2D texture;", "varying vec2 tc;", "varying vec4 c;", "void main(void) {", "   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));", "}"];

    var lineTypes = ["   if(type >= 2.5){", //3.0 dotted
    "      part = fract(part*3.0);", "      if(part < 0.5) discard;", "   }else if(type >= 1.5){", //2.0 - chain dotted
    "      if(part < 0.15) discard;", "      if(part > 0.30 && part < 0.45) discard;", "   }else if(type >= 0.5){", //1.0 - dashed
    "      if(part < 0.5) discard;", "   }"];
    var fsCurve = ["#extension GL_OES_standard_derivatives : enable", "#ifdef GL_ES", "precision highp float;", "#endif", "uniform float width;", "uniform vec4 color;", "uniform float type;", "uniform float lineStepSize;", "uniform float lineSize;", "varying vec2 c;", "varying vec2 v_lengthSoFar;", "void main(void) {", "   float part = abs(fract(length(v_lengthSoFar)*lineStepSize*lineSize));"].concat(lineTypes).concat(["   vec2 px = dFdx(c);", "   vec2 py = dFdy(c);", "   float fx = 2.0 * c.x * px.x - px.y;", "   float fy = 2.0 * c.y * py.x - py.y;", "   float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);", "   float alpha = 1.0 - abs(sd) / width;", "   if (alpha < 0.0) discard;", "   gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));", "}"]);

    var getShiftFuncs = ["attribute vec2 curveShift;", "vec4 getShiftCurve(void) {", "   vec2 shiftN = vec2(curveShift.x, aspect2 * curveShift.y);", "   float length = length(screen * shiftN);", "   return vec4(exc * (length == 0.0 ? vec2(0, 0) : shiftN * 0.5 / length), 0, 0);", "}", "attribute vec2 circleShift;", "vec4 getShiftCircle(void) {", "   return vec4(size*circleShift,0,0);", "}"];

    scene.add("lines", new _primitive2.default(gl, edgeStyle, null, ["precision mediump float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 lengthSoFar;", "uniform float exc;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform vec2 width;", "uniform mat4 transform;", "varying vec2 n;", "varying vec2 v_lengthSoFar;"].concat(getShiftFuncs).concat(["void main(void) {", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);", "   vec4 p = transform*vec4(lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x, p.y/aspect);", "   n = normal;", "}"]), ["precision mediump float;", "uniform float type;", "uniform vec4 color;", "varying vec2 n;", "varying vec2 v_lengthSoFar;", "uniform float lineSize;", "void main(void) {", "   float part = abs(fract(length(v_lengthSoFar)*lineSize*5.0));"].concat(lineTypes).concat(["   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));", "}"]), function (c) {
        var uniforms = c.shader.uniforms;
        uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
        gl.uniform2f(uniforms.screen, c.width, c.height);
        var size = 2.5 * c.nodeSize;
        uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
        gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
        gl.uniform1f(uniforms.aspect2, c.aspect2);
        gl.uniform1f(uniforms.aspect, c.aspect);
        gl.uniform2f(uniforms.width, c.style.width / c.width, c.style.width / c.height);
        gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
        _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
    }));

    if (extensions.OES_standard_derivatives) {
        scene.add("curves", new _primitive2.default(gl, edgeStyle, null, ["precision highp float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 curve;", "attribute vec2 lengthSoFar;", "uniform vec2 size;", "uniform float exc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform mat4 transform;", "varying vec2 v_lengthSoFar;", "varying vec2 c;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 n = vec2(normal.x, aspect2 * normal.y);", "   float length = length(screen * n);", "   n = length == 0.0 ? vec2(0, 0) : n / length;", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);", "   c = curve;", "   vec4 p = transform*vec4(lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x, p.y/aspect);", "}"]), fsCurve, function (c) {
            var uniforms = c.shader.uniforms;
            gl.uniform1f(uniforms.width, c.style.width);
            gl.uniform1f(uniforms.exc, c.curveExc);
            gl.uniform2f(uniforms.screen, c.width, c.height);
            var size = 2.5 * c.nodeSize;
            uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
            gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
            gl.uniform1f(uniforms.aspect2, c.aspect2);
            gl.uniform1f(uniforms.aspect, c.aspect);
            gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
            uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5);
            _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
        }));
        scene.add("circles", new _primitive2.default(gl, edgeStyle, null, ["precision highp float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 curve;", "attribute vec2 lengthSoFar;", "uniform float exc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 c;", "varying vec2 v_lengthSoFar;"].concat(getShiftFuncs).concat(["void main(void) {", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);", "   c = curve;", "   vec4 p = transform*vec4(size * lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x, p.y/aspect);", "}"]), fsCurve, function (c) {
            var uniforms = c.shader.uniforms;
            uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
            gl.uniform1f(uniforms.width, c.style.width);
            gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
            gl.uniform2f(uniforms.screen, c.width, c.height);
            var size = 2.5 * c.nodeSize;
            uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
            gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
            gl.uniform1f(uniforms.aspect2, c.aspect2);
            gl.uniform1f(uniforms.aspect, c.aspect);
            uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5 / 3);
            _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
        }));
    }

    if (edgeStyle.arrow) {
        var shaderparams = { attribute: { offsetMul: 1 } };

        var bind = function bind(c) {
            var size = getSize(c, c.style, getEdgesCnt(), 0.2);
            if (!size) return true;

            var uniforms = c.shader.uniforms;
            gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(uniforms.arrowsize, size, c.style.aspect * size);
            gl.uniform1f(uniforms.exc, c.curveExc);
            uniforms.cexc && gl.uniform1f(uniforms.cexc, 0.5 * view.size * c.curveExc);
            if (uniforms.size) {
                size = 2.5 * c.nodeSize;
                uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
            }
            gl.uniform2f(uniforms.screen, c.width, c.height);
            gl.uniform1f(uniforms.aspect2, c.aspect2);
            _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
        };

        scene.add("lineArrows", new _primitive2.default(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float exc;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = direction / length(screen * direction);", "   vec2 v = vec2(u.y, -aspect2 * u.x);", "   v = v / length(screen * v);", "   gl_Position = getShiftCurve() + getShiftCircle()  + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));

        if (extensions.OES_standard_derivatives) {
            scene.add("curveArrows", new _primitive2.default(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform float exc;", "uniform float cexc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));", "   u = normalize(direction - cexc * u / length(screen * u));", "   u = u / length(screen * u);", "   vec2 v = vec2(u.y, -aspect2 * u.x);", "   v = v / length(screen * v);", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));
            scene.add("circleArrows", new _primitive2.default(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float exc;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = direction;", "   vec2 v = vec2(direction.y, -direction.x);", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4((arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u) / screen, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));
        }
    }

    scene.add("nodes", new _primitive2.default(gl, nodeStyle, null, ["attribute vec2 position;", "attribute vec2 textureCoord;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 tc;", "void main(void) {", "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"], fsColorTexture, function (c) {
        var size = getNodeSize(c);
        var uniforms = c.shader.uniforms;
        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
        _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
    }));
    scene.add("nodesColored", new _primitive2.default(gl, nodeStyle, null, ["attribute vec2 position;", "attribute vec2 textureCoord;", "attribute vec4 color;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 tc;", "varying vec4 c;", "void main(void) {", "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "   c = color;", "}"], fsVarColorTexture, function (c) {
        var size = getNodeSize(c);
        var uniforms = c.shader.uniforms;
        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
    }));

    var vsLabelsShader = ["attribute vec2 position;", "attribute vec2 relative;", "attribute vec2 textureCoord;", "uniform float offset;", "uniform vec2 scale;", "uniform float fontScale;", "uniform mat4 transform;", "varying vec2 tc;", "void main(void) {", "   gl_Position = vec4(scale * (relative*fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"];
    var bindLabels = function bindLabels(is_outline) {
        return function (c) {
            if (!getNodeSize(c)) return true;

            var l = c.style.label;
            var f = l.font;
            var uniforms = c.shader.uniforms;

            gl.uniform1f(uniforms.type, getLabelType(f));
            //            gl.uniform1f(uniforms.type, 0);

            var textEngine = texts.getEngine(f);
            textEngine.setFont(f);

            var fontScale = 1.0;
            var sdfSize = textEngine.fontSize;
            var wantedSize = textEngine.isSDF ? getLabelSize(context, l || {}) : sdfSize;
            if (wantedSize === 0) {
                fontScale = 0;
            };

            var opts = {};
            if (wantedSize && sdfSize) {
                fontScale *= wantedSize / sdfSize;
            }

            if (is_outline && !textEngine.isSDF) //discardAll
                fontScale = 0;

            gl.uniform1f(uniforms.buffer, is_outline ? 0.25 : 192.0 / 256.0);
            gl.uniform1f(uniforms.boldness, (f ? f.boldness : undefined) || 1.);
            gl.uniform1f(uniforms.fontScale, fontScale);
            gl.uniform1f(uniforms.height_font, sdfSize);
            gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(uniforms.scale, 1 / c.width, 1 / c.height);

            var color = void 0;
            if (is_outline && f) color = new _color2.default(f.outlineColor || backgroundColor);else color = c.style.color;
            _gl2.default.uniformColor(gl, uniforms.color, color);
        };
    };
    nodeStyle.label && scene.add("labelsOutline", new _primitive2.default(gl, nodeStyle, "label", vsLabelsShader, fsLabelTexture, bindLabels(true)));
    nodeStyle.label && scene.add("labels", new _primitive2.default(gl, nodeStyle, "label", vsLabelsShader, fsLabelTexture, bindLabels(false)));

    if (options.onLoad) {
        var styles = options.styles;
        for (var p in styles) {
            var s = styles[p];

            s.texture && textures.get(gl, s.texture, onLoad);
            s.arrow && s.arrow.texture && textures.get(gl, s.arrow.texture);
        }
    }

    function createScene() {
        return {
            elements: [],
            add: function add(name, e) {
                scene[name] = e;
                scene.elements.push(e);
            }
        };
    }
};

var _color = __webpack_require__(/*! ./color */ "./src/color.js");

var _color2 = _interopRequireDefault(_color);

var _gl = __webpack_require__(/*! ./gl */ "./src/gl.js");

var _gl2 = _interopRequireDefault(_gl);

var _primitive = __webpack_require__(/*! ./primitive */ "./src/primitive.js");

var _primitive2 = _interopRequireDefault(_primitive);

var _layout = __webpack_require__(/*! ./layout/layout */ "./src/layout/layout.js");

var _layout2 = _interopRequireDefault(_layout);

var _geomutils = __webpack_require__(/*! ./geomutils */ "./src/geomutils.js");

var _geomutils2 = _interopRequireDefault(_geomutils);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _primitiveTools = __webpack_require__(/*! ./primitiveTools */ "./src/primitiveTools.js");

var _spatialSearch = __webpack_require__(/*! ./spatialSearch/spatialSearch */ "./src/spatialSearch/spatialSearch.js");

var _spatialSearch2 = _interopRequireDefault(_spatialSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var i = 1;

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors:
 * 	David Tichy
 * 	Aleš Saska - http://alessaska.cz/
 */

/***/ }),

/***/ "./src/layout/circular.worker.js":
/*!***************************************!*\
  !*** ./src/layout/circular.worker.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/circular.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/circular.worker.js\":\n/*!***************************************!*\\\n  !*** ./src/layout/circular.worker.js ***!\n  \\***************************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/layout/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\n\n\nclass Circular {\n  // get degree of all nodes\n  // let user define at least: starting angle and radius and\n  // clock/cclock direction\n  // size of vertices\n  // more: a ratio of compactness for the more/less connected nodes\n  // a spiral ratio with a rotation ratio for having more than 2pi\n  // distribution of nodes when spiriling\n  // use some other ordering criterion than degree? Strength?\n  // defined by user and found as attribute of each node?\n  // random ordering, minimal crossing of edges?\n  constructor(nodes, edges, layout_options = {}) {\n    this._nodes = nodes;\n    this._edges = edges;\n    this._angle_step = 2*Math.PI/nodes.length;\n    if (layout_options.starting_angle == null)\n\tthis._starting_angle = 0;\n    else\n\tthis._starting_angle = layout_options.starting_angle;\n  }\n  apply () {\n      let nd = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"degrees\"])(this._nodes, this._edges);\n      for (let i=0; i<this._nodes.length; ++i){\n          this._nodes[nd.nodes[i].index].x = 0.05+(1+Math.cos(this._starting_angle+i*this._angle_step))*.45;\n          this._nodes[nd.nodes[i].index].y = 0.05+(1+Math.sin(this._starting_angle+i*this._angle_step))*.45;\n          this._nodes[nd.nodes[i].index].weight = nd.degrees[i];\n      }\n  }\n};\n\nself.addEventListener('message', function (e) {\n    var nodes = e.data.nodes;\n    var edges = e.data.edges;\n    var layout_options = e.data.layout_options;\n    new Circular(nodes, edges, layout_options).apply();\n    self.postMessage({ nodes, edges });\n}, false);\n\n/***/ }),\n\n/***/ \"./src/layout/utils.js\":\n/*!*****************************!*\\\n  !*** ./src/layout/utils.js ***!\n  \\*****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.create2dArray = create2dArray;\nexports.degrees = degrees;\nexports.getDepth = getDepth;\nexports.getRanges = getRanges;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nfunction create2dArray(rows, columns) {\n    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {\n        return Array(columns).fill(0);\n    });\n}\n\nfunction degrees(nodes, edges) {\n    // should return ordered nodes and their degrees - high to low\n    var degrees = Array(nodes.length).fill(0);\n    edges.forEach(function (e) {\n        degrees[e.source.index] += 1;\n        degrees[e.target.index] += 1;\n    }); // check to see if not getting double of the degree in undirected graphs\n    //getting the order of nodes from highest to lowest degrees\n    var ordered_nodes = degrees.map(function (el, i) {\n        return { index: i, value: el };\n    });\n    ordered_nodes.sort(function (a, b) {\n        return +(a.value < b.value) || +(a.value === b.value) - 1;\n    });\n    var ordered_degrees = ordered_nodes.map(function (el) {\n        return degrees[el.index];\n    });\n    return { nodes: ordered_nodes,\n        degrees: ordered_degrees };\n}\n\nfunction getDepth(obj) {\n    var depth = 0;\n    if (obj.children) {\n        obj.children.forEach(function (d) {\n            if (d.depth_visited == true) {\n                throw new Error(\"This layout is only for trees acyclic graphs\");\n            }\n            d.depth_visited = true;\n            var tmpDepth = getDepth(d);\n            if (tmpDepth > depth) {\n                depth = tmpDepth;\n            }\n        });\n    }\n    return 1 + depth;\n}\n\nfunction getRanges(n) {\n    n = Math.abs(n);\n    if (n <= 1) {\n        return {\n            start: 0.5,\n            step: 1\n        };\n    }\n    var start = .05;\n    return {\n        start: start,\n        step: (1 - 2 * start) / (n - 1)\n    };\n}\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=5bd33b4be7da4c954802.worker.js.map", __webpack_require__.p + "5bd33b4be7da4c954802.worker.js");
};

/***/ }),

/***/ "./src/layout/force.worker.js":
/*!************************************!*\
  !*** ./src/layout/force.worker.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/force.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/force.worker.js\":\n/*!************************************!*\\\n  !*** ./src/layout/force.worker.js ***!\n  \\************************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quadTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../quadTree */ \"./src/quadTree.js\");\n/* harmony import */ var _quadTree__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_quadTree__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n *  Copyright (c) 2016, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: David Tichy\n */\n \nfunction Force(nodes, edges, options = {}) {\n    const edgeDistance = 15,\n        edgeStrength = 1,\n        friction = 0.9,\n        charge = -30,\n        gravity = 0.4,\n        theta2 = .64,\n        size = [1,1],\n        chargeDistance2 = Infinity;\n\n    let   alpha,\n          distances = [],\n          strengths = [],\n          charges = [];\n\n\n    function accumulate(quad, alpha, charges) {\n        let cx = 0, cy = 0;\n        quad.charge = 0;\n        if (!quad.leaf) {\n            let nodes = quad.nodes;\n            let c, n = nodes.length;\n\n            for (let i = 0; i < n; i++) {\n                c = nodes[i];\n                if (c == null) continue;\n                accumulate(c, alpha, charges);\n                quad.charge += c.charge;\n                cx += c.charge * c.cx;\n                cy += c.charge * c.cy;\n            }\n        }\n        if (quad.point) {\n            if (!quad.leaf) {\n                quad.point.x += Math.random() - 0.5;\n                quad.point.y += Math.random() - 0.5;\n            }\n            let k = alpha * charges[quad.point.index];\n            quad.charge += quad.pointCharge = k;\n            cx += k * quad.point.x;\n            cy += k * quad.point.y;\n        }\n        quad.cx = cx / quad.charge;\n        quad.cy = cy / quad.charge;\n    }\n\n    function repulse(node) {\n        return function(quad, x1, _, x2) {\n            if (quad.point !== node) {\n                let dx = quad.cx - node.x;\n                let dy = quad.cy - node.y;\n                let dw = x2 - x1;\n                let dn = dx * dx + dy * dy;\n\n                if (dw * dw / theta2 < dn) {\n                    if (dn < chargeDistance2) {\n                        let k = quad.charge / dn;\n                        node.px -= dx * k;\n                        node.py -= dy * k;\n                    }\n                    return true;\n                }\n\n                if (quad.point && dn && dn < chargeDistance2) {\n                    let k = quad.pointCharge / dn;\n                    node.px -= dx * k;\n                    node.py -= dy * k;\n                }\n            }\n            return !quad.charge;\n        };\n    }\n\n    function step() {\n        if ((alpha *= .99) < .05) {\n            alpha = 0;\n            return true;\n        }\n\n        let q, o, s, t, l, k, x, y;\n        let n = nodes.length;\n        let m = edges.length;\n\n        for (let i = 0; i < m; i++) {\n            o = edges[i];\n            s = o.source;\n            t = o.target;\n            x = t.x - s.x;\n            y = t.y - s.y;\n            if (l = (x * x + y * y)) {\n                l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;\n                x *= l;\n                y *= l;\n                t.x -= x * (k = s.weight / (t.weight + s.weight));\n                t.y -= y * k;\n                s.x += x * (k = 1 - k);\n                s.y += y * k;\n            }\n        }\n\n        if (k = alpha * gravity) {\n            x = size[0] / 2;\n            y = size[1] / 2;\n\n            for (let i = 0; i < n; i++) {\n                o = nodes[i];\n                o.x += (x - o.x) * k;\n                o.y += (y - o.y) * k;\n            }\n        }\n\n        if (charge) {\n            accumulate(q = _quadTree__WEBPACK_IMPORTED_MODULE_0___default()(nodes), alpha, charges);\n\n            for (let i = 0; i < n; i++) {\n                let o = nodes[i];\n                !o.fixed && q.visit(repulse(o));\n            }\n        }\n\n        const rnd = (min,max) => Math.random() * (max-min) + min;\n        for (let i = 0; i < n; i++) {\n            o = nodes[i];\n            if (o.fixed || o.fixed2) {\n                o.x = o.px;\n                o.y = o.py;\n            }\n            else {\n                o.x -= (o.px - (o.px = o.x)) * friction;\n                o.y -= (o.py - (o.py = o.y)) * friction;\n\n                if(options && options.minX !== undefined){\n                    if(o.x < options.minX || o.x > options.maxX){\n                        o.x = rnd(options.minX, options.maxX);\n                    }\n                    if(o.y < options.minY || o.y > options.maxY){\n                        o.y = rnd(options.minY, options.maxY);\n                    }\n                }\n            }\n        }\n    };\n\n    this.apply = function() {\n        let n = nodes.length;\n        let d = Math.sqrt(n);\n        let s = 0.3 / d;\n\n        for (let i = 0; i < n; i++) {\n            let o = nodes[i];\n            o.weight = 0;\n            o.x = o.x !== undefined ? o.x : s + (i % d) / d;\n            o.y = o.y !== undefined ? o.y : s + Math.floor(i / d) / d;\n            o.px = o.x;\n            o.py = o.y;\n            charges[i] = charge;\n        }\n\n        for (let i = 0; i < edges.length; i++) {\n            let o = edges[i];\n            o.source.weight++;\n            o.target.weight++;\n            distances[i] = edgeDistance;\n            strengths[i] = edgeStrength;\n        }\n\n        alpha = 0.1;\n        while (!step());\n\n        return true;\n    };\n};\n\nself.addEventListener('message', function (e) {\n    var nodes = e.data.nodes;\n    var edges = e.data.edges;\n    var layout_options = e.data.layout_options;\n    new Force(nodes, edges, layout_options).apply();\n    self.postMessage({nodes, edges});\n}, false);\n\n/***/ }),\n\n/***/ \"./src/quadTree.js\":\n/*!*************************!*\\\n  !*** ./src/quadTree.js ***!\n  \\*************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function (points) {\n    var d = void 0,\n        xs = void 0,\n        ys = void 0,\n        i = void 0,\n        n = void 0,\n        x1_ = void 0,\n        y1_ = void 0,\n        x2_ = void 0,\n        y2_ = void 0;\n\n    x2_ = y2_ = -(x1_ = y1_ = Infinity);\n    xs = [], ys = [];\n    n = points.length;\n\n    for (i = 0; i < n; ++i) {\n        d = points[i];\n        if (d.x < x1_) x1_ = d.x;\n        if (d.y < y1_) y1_ = d.y;\n        if (d.x > x2_) x2_ = d.x;\n        if (d.y > y2_) y2_ = d.y;\n        xs.push(d.x);\n        ys.push(d.y);\n    }\n\n    var dx = x2_ - x1_;\n    var dy = y2_ - y1_;\n    dx > dy ? y2_ = y1_ + dx : x2_ = x1_ + dy;\n\n    function create() {\n        return {\n            leaf: true,\n            nodes: [],\n            point: null,\n            x: null,\n            y: null\n        };\n    }\n\n    function visit(f, node, x1, y1, x2, y2) {\n        if (!f(node, x1, y1, x2, y2)) {\n            var sx = (x1 + x2) * 0.5;\n            var sy = (y1 + y2) * 0.5;\n            var children = node.nodes;\n\n            if (children[0]) visit(f, children[0], x1, y1, sx, sy);\n            if (children[1]) visit(f, children[1], sx, y1, x2, sy);\n            if (children[2]) visit(f, children[2], x1, sy, sx, y2);\n            if (children[3]) visit(f, children[3], sx, sy, x2, y2);\n        }\n    }\n\n    function insert(n, d, x, y, x1, y1, x2, y2) {\n        if (n.leaf) {\n            var nx = n.x;\n            var ny = n.y;\n\n            if (nx !== null) {\n                if (nx === x && ny === y) {\n                    insertChild(n, d, x, y, x1, y1, x2, y2);\n                } else {\n                    var nPoint = n.point;\n                    n.x = n.y = n.point = null;\n                    insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);\n                    insertChild(n, d, x, y, x1, y1, x2, y2);\n                }\n            } else {\n                n.x = x, n.y = y, n.point = d;\n            }\n        } else {\n            insertChild(n, d, x, y, x1, y1, x2, y2);\n        }\n    }\n\n    function insertChild(n, d, x, y, x1, y1, x2, y2) {\n        var xm = (x1 + x2) * 0.5;\n        var ym = (y1 + y2) * 0.5;\n        var right = x >= xm;\n        var below = y >= ym;\n        var i = below << 1 | right;\n\n        n.leaf = false;\n        n = n.nodes[i] || (n.nodes[i] = create());\n\n        right ? x1 = xm : x2 = xm;\n        below ? y1 = ym : y2 = ym;\n        insert(n, d, x, y, x1, y1, x2, y2);\n    }\n\n    function findNode(root, x, y, x0, y0, x3, y3) {\n        var minDistance2 = Infinity;\n        var closestPoint = void 0;\n\n        (function find(node, x1, y1, x2, y2) {\n            if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;\n\n            if (point = node.point) {\n                var _point = void 0;\n                var _dx = x - node.x;\n                var _dy = y - node.y;\n                var distance2 = _dx * _dx + _dy * _dy;\n\n                if (distance2 < minDistance2) {\n                    var distance = Math.sqrt(minDistance2 = distance2);\n                    x0 = x - distance, y0 = y - distance;\n                    x3 = x + distance, y3 = y + distance;\n                    closestPoint = _point;\n                }\n            }\n\n            var children = node.nodes;\n            var xm = (x1 + x2) * .5;\n            var ym = (y1 + y2) * .5;\n            var right = x >= xm;\n            var below = y >= ym;\n\n            for (var _i = below << 1 | right, j = _i + 4; _i < j; ++_i) {\n                if (node = children[_i & 3]) switch (_i & 3) {\n                    case 0:\n                        find(node, x1, y1, xm, ym);break;\n                    case 1:\n                        find(node, xm, y1, x2, ym);break;\n                    case 2:\n                        find(node, x1, ym, xm, y2);break;\n                    case 3:\n                        find(node, xm, ym, x2, y2);break;\n                }\n            }\n        })(root, x0, y0, x3, y3);\n\n        return closestPoint;\n    }\n\n    var root = create();\n    root.visit = function (f) {\n        return visit(f, root, x1_, y1_, x2_, y2_);\n    };\n    root.find = function (x, y) {\n        return findNode(root, x, y, x1_, y1_, x2_, y2_);\n    };\n\n    for (i = 0; i < n; i++) {\n        insert(root, points[i], xs[i], ys[i], x1_, y1_, x2_, y2_);\n    }--i;\n\n    xs = ys = points = d = null;\n\n    return root;\n};\n\n; /**\n   *  Copyright (c) 2016, Helikar Lab.\n   *  All rights reserved.\n   *\n   *  This source code is licensed under the GPLv3 License.\n   *  Author: David Tichy\n   */\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=b2e2651ee4edcc7894c2.worker.js.map", __webpack_require__.p + "b2e2651ee4edcc7894c2.worker.js");
};

/***/ }),

/***/ "./src/layout/grid.worker.js":
/*!***********************************!*\
  !*** ./src/layout/grid.worker.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/grid.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/grid.worker.js\":\n/*!***********************************!*\\\n  !*** ./src/layout/grid.worker.js ***!\n  \\***********************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/layout/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass Grid {\n  constructor(nodes, edges) {\n    this._nodes = nodes;\n    this._edges = edges;\n    this._margin = 0.05;\n  }\n  apply () {\n      let nd = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"degrees\"])(this._nodes, this._edges);\n      const sq = Math.sqrt(this._nodes.length);\n      const reminder = sq - Math.floor(sq);\n      if (reminder > 0)\n\t  var nnodes = Math.floor(sq)+1;\n      else\n\t  var nnodes = sq;\n      const step = (1 - this._margin*2)/nnodes;\n\n      const nlines = this._nodes.length/nnodes;\n      const reminder2 = nlines - Math.floor(nlines);\n      if (reminder2 > 0)\n\t  var nlines2 = Math.floor(nlines)+1;\n      else\n\t  var nlines2 = nlines;\n      const stepy = (1-2*this._margin)/(nlines2-2);\n      for (let i=0; i<this._nodes.length; ++i){\n\t  let j = Math.floor(i/(nnodes+1));\n          this._nodes[nd.nodes[i].index].x = this._margin+step*(i-j*(nnodes+1));\n          this._nodes[nd.nodes[i].index].y = this._margin+stepy*j;\n          this._nodes[nd.nodes[i].index].weight = nd.degrees[i];\n      }\n  }\n};\n\nself.addEventListener('message', function (e) {\n  var nodes = e.data.nodes;\n  var edges = e.data.edges;\n  var layout_options = e.data.layout_options;\n  new Grid(nodes, edges, layout_options).apply();\n  self.postMessage({ nodes, edges });\n}, false);\n\n/***/ }),\n\n/***/ \"./src/layout/utils.js\":\n/*!*****************************!*\\\n  !*** ./src/layout/utils.js ***!\n  \\*****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.create2dArray = create2dArray;\nexports.degrees = degrees;\nexports.getDepth = getDepth;\nexports.getRanges = getRanges;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nfunction create2dArray(rows, columns) {\n    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {\n        return Array(columns).fill(0);\n    });\n}\n\nfunction degrees(nodes, edges) {\n    // should return ordered nodes and their degrees - high to low\n    var degrees = Array(nodes.length).fill(0);\n    edges.forEach(function (e) {\n        degrees[e.source.index] += 1;\n        degrees[e.target.index] += 1;\n    }); // check to see if not getting double of the degree in undirected graphs\n    //getting the order of nodes from highest to lowest degrees\n    var ordered_nodes = degrees.map(function (el, i) {\n        return { index: i, value: el };\n    });\n    ordered_nodes.sort(function (a, b) {\n        return +(a.value < b.value) || +(a.value === b.value) - 1;\n    });\n    var ordered_degrees = ordered_nodes.map(function (el) {\n        return degrees[el.index];\n    });\n    return { nodes: ordered_nodes,\n        degrees: ordered_degrees };\n}\n\nfunction getDepth(obj) {\n    var depth = 0;\n    if (obj.children) {\n        obj.children.forEach(function (d) {\n            if (d.depth_visited == true) {\n                throw new Error(\"This layout is only for trees acyclic graphs\");\n            }\n            d.depth_visited = true;\n            var tmpDepth = getDepth(d);\n            if (tmpDepth > depth) {\n                depth = tmpDepth;\n            }\n        });\n    }\n    return 1 + depth;\n}\n\nfunction getRanges(n) {\n    n = Math.abs(n);\n    if (n <= 1) {\n        return {\n            start: 0.5,\n            step: 1\n        };\n    }\n    var start = .05;\n    return {\n        start: start,\n        step: (1 - 2 * start) / (n - 1)\n    };\n}\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=77ab56e065cb91b68e29.worker.js.map", __webpack_require__.p + "77ab56e065cb91b68e29.worker.js");
};

/***/ }),

/***/ "./src/layout/hierarchical.worker.js":
/*!*******************************************!*\
  !*** ./src/layout/hierarchical.worker.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/hierarchical.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/hierarchical.worker.js\":\n/*!*******************************************!*\\\n  !*** ./src/layout/hierarchical.worker.js ***!\n  \\*******************************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nclass Hierarchical {\n  // this layout should handle any digraph\n  constructor(nodes, edges) {\n    this._nodes = nodes;\n    this._edges = edges;\n    this.alphay = 0.05; // y margin\n    this.alphax = 0.05; // x margin\n  }\n\n  makeLayers(nodes, layer){\n      if (nodes.length > 1){\n          const stepy = (1 - 2*this.alphay)/(nodes.length-1);\n          for (let i=0; i<nodes.length; ++i){\n              nodes[i].visited = true;\n              nodes[i].layer = layer; // makes x afterwards\n              nodes[i].y = this.alphay + i*stepy;\n          }\n      }\n      else {\n          nodes[0].visited = true;\n          nodes[0].layer = layer; // makes x afterwards\n          nodes[0].y = 0.5;\n      }\n      let next_layer = [];\n      for (let i=0; i<nodes.length; i++){\n          let neighbors = nodes[i].parents.concat(nodes[i].children);\n          for (let j=0; j < neighbors.length; j++){\n              if (neighbors[j].visited == false && !next_layer.includes(neighbors[j])){\n                  next_layer.push(neighbors[j]);\n              }\n          }\n      }\n      if (next_layer.length == 0){\n          return layer;\n      }\n      else {\n          return this.makeLayers(next_layer, layer+1);\n      }\n  }\n\n  apply () {\n      // left-right tree by default, let user choose\n      // top-down, bottom-top, right-left in subsequent versions\n      // hierarchical layouts for trees (acyclic graphs) are\n      // implemented separately for now\n      let nodes = this._nodes;\n      nodes.forEach(function(n,i){\n          n.parents = [];\n          n.children = [];\n          n.visited = false;\n      });\n      this._edges.forEach(function(e,i){\n          e.source.children.push(e.target);\n          e.target.parents.push(e.source);\n      });\n      // find the roots:\n      // nodes defined by the user as roots OR\n      // nodes with in-degree == 0 OR\n      // nodes with greatest in-degree (or degree if undirected graph)\n      let roots = [];\n      for (let i = 0; i < nodes.length; i++){\n          if (nodes[i].isroot == true){ // has to be on the json file of the graph\n              roots.push(nodes[i]);\n          }\n      }\n      if (roots.length == 0){\n          for (let i = 0; i < nodes.length; i++){\n              if (nodes[i].parents.length == 0){\n                  roots.push(nodes[i]);\n              }\n          }\n      }\n      if (roots.length == 0){\n          // calculate max out-degree\n          let max_outdegree = 0;\n          nodes.forEach(function(node){\n              if (node.children.length > max_outdegree){\n                  max_outdegree = node.children.length;\n              }\n          });\n          // choose vertices with greatest out-degree\n          nodes.forEach(function(node){\n              if (node.children.length == max_outdegree){\n                  roots.push(node);\n              }\n          });\n      }\n      // number of layers and max number of nodes in each layer\n      // has to be found by making the layout\n      // there are two approaches to finding the nodes in each layer:\n      // 1) each layer has all the neighbors of the nodes in the previous layer\n      // 2) follow links and then place non visited nodes on the layer of neighbors OR\n      // this layout implements the first of these approaches.\n      const depth = this.makeLayers(roots, 1);\n      // each layer of tree x = [0+alpha,1-alpha]\n      const stepx = (1-2*this.alphax)/(depth-1);\n      // posx = alphax + stepx*(depth-1)\n      for (let i=0; i<this._nodes.length; ++i){\n          this._nodes[i].x = this.alphax + stepx*(this._nodes[i].layer - 1);\n      }\n  }\n};\n\n\nself.addEventListener('message', function (e) {\n    var nodes = e.data.nodes;\n    var edges = e.data.edges;\n    var layout_options = e.data.layout_options;\n    new Hierarchical(nodes, edges, layout_options).apply();\n    self.postMessage({ nodes, edges });\n}, false);\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=1405827a25d508209dcb.worker.js.map", __webpack_require__.p + "1405827a25d508209dcb.worker.js");
};

/***/ }),

/***/ "./src/layout/hierarchical2.worker.js":
/*!********************************************!*\
  !*** ./src/layout/hierarchical2.worker.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/hierarchical2.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/hierarchical2.worker.js\":\n/*!********************************************!*\\\n  !*** ./src/layout/hierarchical2.worker.js ***!\n  \\********************************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nfunction isOrphan(node){\n    let orphan = true;\n    for (let i=0; i<node.parents.length; ++i){\n        let parent_ = node.parents[i];\n        if (parent_ != node)\n            orphan = false;\n    }\n    for (let i=0; i<node.children.length; ++i){\n        let child = node.children[i];\n        if (child != node)\n            orphan = false;\n    }\n    return orphan;\n}\n\nclass Hierarchical2 {\n  // this layout should handle any digraph\n  constructor(nodes, edges) {\n    this._nodes = nodes;\n    this._edges = edges;\n    this.alphay = 0.05; // y margin\n    this.alphax = 0.05; // x margin\n    this.components = {\"current_component\": 0, \"depth\": 1};\n    this.unvisited = nodes;\n  }\n  \n  initHierarchy(){\n      this._nodes.forEach(function(n,i){\n          n.parents = [];\n          n.children = [];\n          n.visited = false;\n      });\n      this._edges.forEach(function(e,i){\n          e.source.children.push(e.target);\n          e.target.parents.push(e.source);\n      });\n  }\n\n  separateOrphans(){\n      let orphans = [];\n      let nodes = [];\n      for (let i=0; i< this._nodes.length; ++i){\n          let node = this._nodes[i];\n          if (isOrphan(node))\n              orphans.push(node);\n          else\n              nodes.push(node);\n      }\n      return orphans;\n  }\n\n  findRoots(nodes){\n      // find the roots:\n      // nodes defined by the user as roots OR\n      // nodes with in-degree == 0 OR\n      // nodes with greatest in-degree (or degree if undirected graph)\n      let roots = [];\n      for (let i = 0; i < nodes.length; i++){\n          if (nodes[i].isroot == true){ // has to be on the json file of the graph\n              roots.push(nodes[i]);\n          }\n      }\n      if (roots.length == 0){\n          for (let i = 0; i < nodes.length; i++){\n              if (nodes[i].parents.length == 0){\n                  roots.push(nodes[i]);\n              }\n          }\n      }\n      if (roots.length == 0){\n          // calculate max out-degree\n          let max_outdegree = 0;\n          nodes.forEach(function(node){\n              if (node.children.length > max_outdegree){\n                  max_outdegree = node.children.length;\n              }\n          });\n          // choose vertices with greatest out-degree\n          nodes.forEach(function(node){\n              if (node.children.length == max_outdegree){\n                  roots.push(node);\n              }\n          });\n      }\n      return roots;\n  }\n\n  placeOrphans(nodes, max_layer){\n      const stepy = (1 - 2*this.alphay)/(nodes.length-1);\n      for (let i=0; i<nodes.length; ++i){\n          nodes[i].y = this.alphay + i*stepy;\n          nodes[i].x = max_layer+1;\n      }\n      if (nodes.length > 0)\n          return max_layer+1;\n      else\n          return max_layer;\n  }\n\n  unvisitedNodes(){\n      let nodes = [];\n      let orphans = this.orphans;\n      this.unvisited.forEach(function(node){\n          if (node.visited == false && !(node in orphans))\n              nodes.push(node);\n      });\n      if (nodes.length != this.unvisited){\n          this.maybe_more = true;\n          this.unvisited = nodes;\n      } else this.maybe_more = false;\n  }\n\n  placeAdditional(){\n      // place non-visited nodes in between layers\n      let aux_layers = {};\n      let c = this.components[this.components.current_component];\n      let layers = c.layers;\n      for (let i=0; i<this.unvisited.length; ++i){\n          let node = this.unvisited[i];\n          let lowest_layer = this.components.depth;\n          let child_found = false;\n          for(let j=0; j<node.children.length; ++j){\n              let child = node.children[j];\n              if (child.visited == true){\n                  child_found = true;\n                  if(child.layer <= lowest_layer){ // child has to be visited to have a layer\n                      lowest_layer = child.layer;\n                  }\n                  break;\n              }\n          }\n          if (child_found){\n              node.visited = true;\n              // node.index = lowest_layer-sep;\n              if ( !((lowest_layer-sep) in layers))\n                  layers[lowest_layer-sep] = []\n              layers[lowest_layer-sep].push(node)\n          }\n          else {\n              let lowest_layer = max_layer;\n              let parent_found = false;\n              for(let j=0; j<node.parents.length; ++j){\n                  let parent_ = node.parents[j];\n                  if (parent_.visited == true){\n                      parent_found = true;\n                      if(parent_.layer <= lowest_layer){ // child has to be visited to have a layer\n                          lowest_layer = parent_.layer;\n                      }\n                  }\n              }\n              if (parent_found){\n                  node.visited = true;\n                  node.x = lowest_layer+sep;\n                  if ( !((lowest_layer+sep) in layers) )\n                      layers[lowest_layer+sep] = []\n                  layers[lowest_layer+sep].push(node)\n              }\n          }\n      }\n  }\n\n  initializeComponent(component){\n      this.components[component] = {};\n      this.components[component].max_nodes_layer = 0;\n      if (component > 0)\n          this.components[component].index_offset = this.components[component-1].vertical_nodes;\n      else\n          this.components[component].index_offset = 0;\n      this.components[component].current_layer = 1;\n      //this.components[component].layers = {\"nodes\": [], \"layer_value\": 1};\n      this.components[component].layers = {};\n      this.components[component].vertical_nodes = 0;\n  }\n\n  layerNodes(nodes){\n      if (!(this.components.current_component in this.components))\n          this.initializeComponent(this.components.current_component);\n      let c = this.components[this.components.current_component];\n      if (nodes.length > c.vertical_nodes)\n          c.vertical_nodes = nodes.length;\n      c.layers[c.current_layer] = [];\n      for (let i=0; i<nodes.length; ++i){\n          nodes[i].visited = true;\n          c.layers[c.current_layer].push(nodes[i]);\n      }\n      let next_layer = [];\n      for (let i=0; i<nodes.length; i++){\n          let candidates = nodes[i].children;\n          for (let j=0; j < candidates.length; j++){\n              if (candidates[j].visited == false && !next_layer.includes(candidates[j])){\n                  next_layer.push(candidates[j]);\n              }\n          }\n      }\n      if (next_layer.length > 0){\n          c.current_layer++;\n          if (this.components.depth<c.current_layer)\n              this.components.depth = c.current_layer;\n          this.layerNodes(next_layer);\n      }\n  }\n\n  apply () {\n      // left-right tree by default, let user choose\n      // top-down, bottom-top, right-left in subsequent versions\n      // hierarchical layouts for trees (acyclic graphs) are\n      // implemented separately for now\n\n      // number of layers and max number of nodes in each layer\n      // has to be found by making the layout\n      // there are two approaches to finding the nodes in each layer:\n      // 1) each layer has all the neighbors of the nodes in the previous layer\n      // 2) follow links and then place non visited nodes on the layer of neighbors OR\n      // this layout implements the second of these approaches.\n\n      this.initHierarchy();\n      this.orphans = this.separateOrphans();\n      this.unvisitedNodes();\n      while (this.unvisited.length > 0){\n          let roots = this.findRoots(this.unvisited);\n          this.layerNodes(roots);\n          this.unvisitedNodes(); // update unvisited nodes\n          this.maybe_mode = true;\n          while (this.maybe_more){\n              this.placeAdditional(); // place additional nodes linked to this component\n              this.unvisitedNodes(); // update unvisited nodes\n          }\n          this.components.current_component++;\n      }\n      this.components.vertical_nodes = 0;\n      for (let i=0; i<this.components.current_component; i++){\n          this.components.vertical_nodes += this.components[i].vertical_nodes;\n      }\n\n      // layerNodes should populate the dictionary this.components of components and aux variables:\n      // components[x] is a component, x is an integer\n      // components[x].vertical_nodes is the maximum number of nodes in a layer for the component\n      // components[x].layer[j] is the j-th layer on the component, j can be fractional\n      // components[x].index_offset is the number of nodes positioned in above components\n      // components.ncomponents is the number of components\n      // components.vertical_nodes is the sum of the max nodes in any layer of each component\n      // components.depth is the maximum number of layers\n\n      // each layer of tree xy = [0+alpha,1-alpha]\n      const stepx = (1-2*this.alphax)/(this.components.depth);\n      const stepy = (1-2*this.alphay)/(this.components.vertical_nodes);\n      for (let i=0; i<this.components.current_component; i++){\n          let component = this.components[i];\n          for (let layer_val in component.layers){\n              let layer = component.layers[layer_val];\n              if (layer.length == 1){\n                  let node = layer[0];\n                  node.x = this.alphax + stepx*layer_val;\n                  node.y = this.alphay + stepy*(component.index_offset + component.vertical_nodes/2);\n              } else {\n                  for (let k=0; k<layer.length; ++k){\n                      let node = layer[k];\n                      node.x = this.alphax + stepx*layer_val;\n                      node.y = this.alphay + stepy*(component.index_offset + k);\n                  }\n              }\n          }\n      }\n      this.placeOrphans(this.orphans);\n  }\n};\n\nself.addEventListener('message', function (e) {\n    var nodes = e.data.nodes;\n    var edges = e.data.edges;\n    var layout_options = e.data.layout_options;\n    new Hierarchical2(nodes, edges, layout_options).apply();\n    self.postMessage({ nodes, edges });\n}, false);\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=0b45ca70d0a01c8a24bc.worker.js.map", __webpack_require__.p + "0b45ca70d0a01c8a24bc.worker.js");
};

/***/ }),

/***/ "./src/layout/hive.worker.js":
/*!***********************************!*\
  !*** ./src/layout/hive.worker.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/hive.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/hive.worker.js\":\n/*!***********************************!*\\\n  !*** ./src/layout/hive.worker.js ***!\n  \\***********************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/layout/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\n\n\nclass Hive {\n  // get degree of all nodes\n  constructor(nodes, edges) {\n    this._nodes = nodes;\n    this._edges = edges;\n    this._margin = 0.05; // from [0,1] borders\n    this._radius = 0.05; // of the empty circle on the center\n    this._nlines = 5;\n  }\n  apply () {\n      let nd = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"degrees\"])(this._nodes, this._edges);\n      const nodes_segment = this._nodes.length / this._nlines;\n      const segment = 0.5 - (this._margin + this._radius);\n      const step = segment / nodes_segment;\n      const angle = 2*Math.PI/this._nlines;\n      let j = 0;\n      for(let i=0; i<this._nodes.length; ++i){\n          let ii = nd.nodes[i].index;\n          this._nodes[ii].x = 0.5+(this._radius + step*(i-j*nodes_segment))*Math.cos(angle*j+Math.PI/2);\n          this._nodes[ii].y = 0.5+(this._radius + step*(i-j*nodes_segment))*Math.sin(angle*j+Math.PI/2);\n          j = Math.floor(i/nodes_segment);\n      }\n  }\n};\n\nself.addEventListener('message', function (e) {\n  var nodes = e.data.nodes;\n  var edges = e.data.edges;\n  var layout_options = e.data.layout_options;\n  new Hive(nodes, edges, layout_options).apply();\n  self.postMessage({ nodes, edges });\n}, false);\n\n/***/ }),\n\n/***/ \"./src/layout/utils.js\":\n/*!*****************************!*\\\n  !*** ./src/layout/utils.js ***!\n  \\*****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.create2dArray = create2dArray;\nexports.degrees = degrees;\nexports.getDepth = getDepth;\nexports.getRanges = getRanges;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nfunction create2dArray(rows, columns) {\n    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {\n        return Array(columns).fill(0);\n    });\n}\n\nfunction degrees(nodes, edges) {\n    // should return ordered nodes and their degrees - high to low\n    var degrees = Array(nodes.length).fill(0);\n    edges.forEach(function (e) {\n        degrees[e.source.index] += 1;\n        degrees[e.target.index] += 1;\n    }); // check to see if not getting double of the degree in undirected graphs\n    //getting the order of nodes from highest to lowest degrees\n    var ordered_nodes = degrees.map(function (el, i) {\n        return { index: i, value: el };\n    });\n    ordered_nodes.sort(function (a, b) {\n        return +(a.value < b.value) || +(a.value === b.value) - 1;\n    });\n    var ordered_degrees = ordered_nodes.map(function (el) {\n        return degrees[el.index];\n    });\n    return { nodes: ordered_nodes,\n        degrees: ordered_degrees };\n}\n\nfunction getDepth(obj) {\n    var depth = 0;\n    if (obj.children) {\n        obj.children.forEach(function (d) {\n            if (d.depth_visited == true) {\n                throw new Error(\"This layout is only for trees acyclic graphs\");\n            }\n            d.depth_visited = true;\n            var tmpDepth = getDepth(d);\n            if (tmpDepth > depth) {\n                depth = tmpDepth;\n            }\n        });\n    }\n    return 1 + depth;\n}\n\nfunction getRanges(n) {\n    n = Math.abs(n);\n    if (n <= 1) {\n        return {\n            start: 0.5,\n            step: 1\n        };\n    }\n    var start = .05;\n    return {\n        start: start,\n        step: (1 - 2 * start) / (n - 1)\n    };\n}\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=b90a830997a091503e95.worker.js.map", __webpack_require__.p + "b90a830997a091503e95.worker.js");
};

/***/ }),

/***/ "./src/layout/layout.js":
/*!******************************!*\
  !*** ./src/layout/layout.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2016, Helikar Lab.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Author: David Tichy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// import Worker_Tree from './tree.worker.js';
// import Worker_TreeT from './treeT.worker.js';


var _randomWorker = __webpack_require__(/*! ./random.worker.js */ "./src/layout/random.worker.js");

var _randomWorker2 = _interopRequireDefault(_randomWorker);

var _forceWorker = __webpack_require__(/*! ./force.worker.js */ "./src/layout/force.worker.js");

var _forceWorker2 = _interopRequireDefault(_forceWorker);

var _circularWorker = __webpack_require__(/*! ./circular.worker.js */ "./src/layout/circular.worker.js");

var _circularWorker2 = _interopRequireDefault(_circularWorker);

var _hierarchicalWorker = __webpack_require__(/*! ./hierarchical.worker.js */ "./src/layout/hierarchical.worker.js");

var _hierarchicalWorker2 = _interopRequireDefault(_hierarchicalWorker);

var _hierarchical2Worker = __webpack_require__(/*! ./hierarchical2.worker.js */ "./src/layout/hierarchical2.worker.js");

var _hierarchical2Worker2 = _interopRequireDefault(_hierarchical2Worker);

var _spectralWorker = __webpack_require__(/*! ./spectral.worker.js */ "./src/layout/spectral.worker.js");

var _spectralWorker2 = _interopRequireDefault(_spectralWorker);

var _spectral2Worker = __webpack_require__(/*! ./spectral2.worker.js */ "./src/layout/spectral2.worker.js");

var _spectral2Worker2 = _interopRequireDefault(_spectral2Worker);

var _hiveWorker = __webpack_require__(/*! ./hive.worker.js */ "./src/layout/hive.worker.js");

var _hiveWorker2 = _interopRequireDefault(_hiveWorker);

var _gridWorker = __webpack_require__(/*! ./grid.worker.js */ "./src/layout/grid.worker.js");

var _gridWorker2 = _interopRequireDefault(_gridWorker);

var _versinusWorker = __webpack_require__(/*! ./versinus.worker.js */ "./src/layout/versinus.worker.js");

var _versinusWorker2 = _interopRequireDefault(_versinusWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(nodes, edges, layout, layout_options) {
    _classCallCheck(this, _class);

    this._nodes = nodes;
    this._edges = edges;
    this._layout = layout;
    this._layout_options = layout_options;

    switch (this._layout) {
      case "random":
        this._Worker = _randomWorker2.default;
        break;
      case "force":
        this._Worker = _forceWorker2.default;
        break;
      case 'circular':
        this._Worker = _circularWorker2.default;
        break;
      // case 'tree':
      //   this._Worker = Worker_Tree;
      //   break;
      // case 'treeT':
      //   this._Worker = Worker_TreeT;
      //   break;
      case 'hierarchical':
        this._Worker = _hierarchicalWorker2.default;
        break;
      case 'hierarchical2':
        this._Worker = _hierarchical2Worker2.default;
        break;
      case 'spectral':
        this._Worker = _spectralWorker2.default;
        break;
      case 'spectral2':
        this._Worker = _spectral2Worker2.default;
        break;
      case 'hive':
        this._Worker = _hiveWorker2.default;
        break;
      case 'grid':
        this._Worker = _gridWorker2.default;
        break;
      case 'versinus':
        this._Worker = _versinusWorker2.default;
        break;
      default:
        throw Error("Invalid layout value");
    }
  }

  // brings values of x and y in range 0 - 1


  _createClass(_class, [{
    key: '_normalize',
    value: function _normalize(nodes, dim) {
      var minX = void 0,
          minY = void 0,
          n = nodes.length;

      if (dim) {
        minX = dim.minX;
        minY = dim.minY;
      } else {
        var maxX = -Infinity;
        var maxY = -Infinity;
        minX = minY = Infinity;

        for (var i = 0; i < n; i++) {
          var o = nodes[i];
          maxX = Math.max(maxX, o.x);
          maxY = Math.max(maxY, o.y);
          minX = Math.min(minX, o.x);
          minY = Math.min(minY, o.y);
        };

        dim = {
          maxX: maxX,
          maxY: maxY,
          minX: minX,
          minY: minY
        };
      }

      var scX = minX !== dim.maxX ? 1 / (dim.maxX - minX) : (minX -= 0.5, 1);
      var scY = minY !== dim.maxY ? 1 / (dim.maxY - minY) : (minY -= 0.5, 1);

      for (var _i = 0; _i < n; _i++) {
        var _o = nodes[_i];
        _o.x = scX * (_o.x - minX);
        _o.y = scY * (_o.y - minY);
      }
      return dim;
    }
  }, {
    key: 'compute',
    value: function compute() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var worker = new _this._Worker();

        worker.postMessage({ nodes: _this._nodes, edges: _this._edges, layout_options: _this.layout_options });
        worker.addEventListener('message', function (event) {

          if (event.data.nodes) {
            for (var i = 0, n = _this._nodes.length; i < n; i++) {
              Object.assign(_this._nodes[i], event.data.nodes[i]);
            }
          }

          _this._normalize(_this._nodes);

          if (event.data.edges) {
            for (var _i2 = 0, _n = _this._nodes.length; _i2 < _n; _i2++) {
              Object.assign(_this._edges[_i2], event.data.edges[_i2]);
              _this._edges[_i2].source = _this._nodes[_this._edges[_i2].source.index];
              _this._edges[_i2].target = _this._nodes[_this._edges[_i2].target.index];
            }
          }

          resolve(_this._nodes);
        });
        worker.addEventListener('error', reject);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./src/layout/random.worker.js":
/*!*************************************!*\
  !*** ./src/layout/random.worker.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/random.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/random.worker.js\":\n/*!*************************************!*\\\n  !*** ./src/layout/random.worker.js ***!\n  \\*************************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\nself.addEventListener('message', function (e) {\n    let data = e.data.nodes;\n    for (let i = 0, n = data.length; i < n; i++) {\n        let o = data[i];\n        o.x = Math.random();\n        o.y = Math.random();\n    }\n    self.postMessage({nodes: data});\n}, false);\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=fc8d8836683ed4da8585.worker.js.map", __webpack_require__.p + "fc8d8836683ed4da8585.worker.js");
};

/***/ }),

/***/ "./src/layout/spectral.worker.js":
/*!***************************************!*\
  !*** ./src/layout/spectral.worker.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/spectral.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./node_modules/ml-array-max/src/index.js\":\n/*!************************************************!*\\\n  !*** ./node_modules/ml-array-max/src/index.js ***!\n  \\************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return max; });\n/**\n * Computes the maximum of the given values\n * @param {Array<number>} input\n * @return {number}\n */\nfunction max(input) {\n    if (!Array.isArray(input)) {\n        throw new Error('input must be an array');\n    }\n\n    if (input.length === 0) {\n        throw new Error('input must not be empty');\n    }\n\n    var max = input[0];\n    for (var i = 1; i < input.length; i++) {\n        if (input[i] > max) max = input[i];\n    }\n    return max;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-array-min/src/index.js\":\n/*!************************************************!*\\\n  !*** ./node_modules/ml-array-min/src/index.js ***!\n  \\************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return min; });\n/**\n * Computes the minimum of the given values\n * @param {Array<number>} input\n * @return {number}\n */\nfunction min(input) {\n    if (!Array.isArray(input)) {\n        throw new Error('input must be an array');\n    }\n\n    if (input.length === 0) {\n        throw new Error('input must not be empty');\n    }\n\n    var min = input[0];\n    for (var i = 1; i < input.length; i++) {\n        if (input[i] < min) min = input[i];\n    }\n    return min;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-array-rescale/src/index.js\":\n/*!****************************************************!*\\\n  !*** ./node_modules/ml-array-rescale/src/index.js ***!\n  \\****************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return rescale; });\n/* harmony import */ var ml_array_max__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ml-array-max */ \"./node_modules/ml-array-max/src/index.js\");\n/* harmony import */ var ml_array_min__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ml-array-min */ \"./node_modules/ml-array-min/src/index.js\");\n\n\n\nfunction rescale(input, options = {}) {\n    if (!Array.isArray(input)) {\n        throw new TypeError('input must be an array');\n    } else if (input.length === 0) {\n        throw new TypeError('input must not be empty');\n    }\n\n    let output;\n    if (options.output !== undefined) {\n        if (!Array.isArray(options.output)) {\n            throw new TypeError('output option must be an array if specified');\n        }\n        output = options.output;\n    } else {\n        output = new Array(input.length);\n    }\n\n    const currentMin = Object(ml_array_min__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(input);\n    const currentMax = Object(ml_array_max__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(input);\n\n    if (currentMin === currentMax) {\n        throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');\n    }\n\n    const {\n        min: minValue = options.autoMinMax ? currentMin : 0,\n        max: maxValue = options.autoMinMax ? currentMax : 1\n    } = options;\n\n    if (minValue >= maxValue) {\n        throw new RangeError('min option must be smaller than max option');\n    }\n\n    const factor = (maxValue - minValue) / (currentMax - currentMin);\n    for (var i = 0; i < input.length; i++) {\n        output[i] = (input[i] - currentMin) * factor + minValue;\n    }\n\n    return output;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/abstractMatrix.js\":\n/*!******************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/abstractMatrix.js ***!\n  \\******************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AbstractMatrix; });\n/* harmony import */ var ml_array_rescale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ml-array-rescale */ \"./node_modules/ml-array-rescale/src/index.js\");\n/* harmony import */ var _dc_lu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dc/lu */ \"./node_modules/ml-matrix/src/dc/lu.js\");\n/* harmony import */ var _dc_svd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dc/svd */ \"./node_modules/ml-matrix/src/dc/svd.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ \"./node_modules/ml-matrix/src/util.js\");\n/* harmony import */ var _views_transpose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/transpose */ \"./node_modules/ml-matrix/src/views/transpose.js\");\n/* harmony import */ var _views_row__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/row */ \"./node_modules/ml-matrix/src/views/row.js\");\n/* harmony import */ var _views_sub__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/sub */ \"./node_modules/ml-matrix/src/views/sub.js\");\n/* harmony import */ var _views_selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/selection */ \"./node_modules/ml-matrix/src/views/selection.js\");\n/* harmony import */ var _views_rowSelection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/rowSelection */ \"./node_modules/ml-matrix/src/views/rowSelection.js\");\n/* harmony import */ var _views_columnSelection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./views/columnSelection */ \"./node_modules/ml-matrix/src/views/columnSelection.js\");\n/* harmony import */ var _views_column__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./views/column */ \"./node_modules/ml-matrix/src/views/column.js\");\n/* harmony import */ var _views_flipRow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./views/flipRow */ \"./node_modules/ml-matrix/src/views/flipRow.js\");\n/* harmony import */ var _views_flipColumn__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./views/flipColumn */ \"./node_modules/ml-matrix/src/views/flipColumn.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction AbstractMatrix(superCtor) {\n  if (superCtor === undefined) superCtor = Object;\n\n  /**\n   * Real matrix\n   * @class Matrix\n   * @param {number|Array|Matrix} nRows - Number of rows of the new matrix,\n   * 2D array containing the data or Matrix instance to clone\n   * @param {number} [nColumns] - Number of columns of the new matrix\n   */\n  class Matrix extends superCtor {\n    static get [Symbol.species]() {\n      return this;\n    }\n\n    /**\n     * Constructs a Matrix with the chosen dimensions from a 1D array\n     * @param {number} newRows - Number of rows\n     * @param {number} newColumns - Number of columns\n     * @param {Array} newData - A 1D array containing data for the matrix\n     * @return {Matrix} - The new matrix\n     */\n    static from1DArray(newRows, newColumns, newData) {\n      var length = newRows * newColumns;\n      if (length !== newData.length) {\n        throw new RangeError('Data length does not match given dimensions');\n      }\n      var newMatrix = new this(newRows, newColumns);\n      for (var row = 0; row < newRows; row++) {\n        for (var column = 0; column < newColumns; column++) {\n          newMatrix.set(row, column, newData[row * newColumns + column]);\n        }\n      }\n      return newMatrix;\n    }\n\n    /**\n         * Creates a row vector, a matrix with only one row.\n         * @param {Array} newData - A 1D array containing data for the vector\n         * @return {Matrix} - The new matrix\n         */\n    static rowVector(newData) {\n      var vector = new this(1, newData.length);\n      for (var i = 0; i < newData.length; i++) {\n        vector.set(0, i, newData[i]);\n      }\n      return vector;\n    }\n\n    /**\n         * Creates a column vector, a matrix with only one column.\n         * @param {Array} newData - A 1D array containing data for the vector\n         * @return {Matrix} - The new matrix\n         */\n    static columnVector(newData) {\n      var vector = new this(newData.length, 1);\n      for (var i = 0; i < newData.length; i++) {\n        vector.set(i, 0, newData[i]);\n      }\n      return vector;\n    }\n\n    /**\n         * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).\n         * @param {number} rows - Number of rows\n         * @param {number} columns - Number of columns\n         * @return {Matrix} - The new matrix\n         */\n    static empty(rows, columns) {\n      return new this(rows, columns);\n    }\n\n    /**\n         * Creates a matrix with the given dimensions. Values will be set to zero.\n         * @param {number} rows - Number of rows\n         * @param {number} columns - Number of columns\n         * @return {Matrix} - The new matrix\n         */\n    static zeros(rows, columns) {\n      return this.empty(rows, columns).fill(0);\n    }\n\n    /**\n         * Creates a matrix with the given dimensions. Values will be set to one.\n         * @param {number} rows - Number of rows\n         * @param {number} columns - Number of columns\n         * @return {Matrix} - The new matrix\n         */\n    static ones(rows, columns) {\n      return this.empty(rows, columns).fill(1);\n    }\n\n    /**\n         * Creates a matrix with the given dimensions. Values will be randomly set.\n         * @param {number} rows - Number of rows\n         * @param {number} columns - Number of columns\n         * @param {function} [rng=Math.random] - Random number generator\n         * @return {Matrix} The new matrix\n         */\n    static rand(rows, columns, rng) {\n      if (rng === undefined) rng = Math.random;\n      var matrix = this.empty(rows, columns);\n      for (var i = 0; i < rows; i++) {\n        for (var j = 0; j < columns; j++) {\n          matrix.set(i, j, rng());\n        }\n      }\n      return matrix;\n    }\n\n    /**\n         * Creates a matrix with the given dimensions. Values will be random integers.\n         * @param {number} rows - Number of rows\n         * @param {number} columns - Number of columns\n         * @param {number} [maxValue=1000] - Maximum value\n         * @param {function} [rng=Math.random] - Random number generator\n         * @return {Matrix} The new matrix\n         */\n    static randInt(rows, columns, maxValue, rng) {\n      if (maxValue === undefined) maxValue = 1000;\n      if (rng === undefined) rng = Math.random;\n      var matrix = this.empty(rows, columns);\n      for (var i = 0; i < rows; i++) {\n        for (var j = 0; j < columns; j++) {\n          var value = Math.floor(rng() * maxValue);\n          matrix.set(i, j, value);\n        }\n      }\n      return matrix;\n    }\n\n    /**\n         * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and others will be 0.\n         * @param {number} rows - Number of rows\n         * @param {number} [columns=rows] - Number of columns\n         * @param {number} [value=1] - Value to fill the diagonal with\n         * @return {Matrix} - The new identity matrix\n         */\n    static eye(rows, columns, value) {\n      if (columns === undefined) columns = rows;\n      if (value === undefined) value = 1;\n      var min = Math.min(rows, columns);\n      var matrix = this.zeros(rows, columns);\n      for (var i = 0; i < min; i++) {\n        matrix.set(i, i, value);\n      }\n      return matrix;\n    }\n\n    /**\n         * Creates a diagonal matrix based on the given array.\n         * @param {Array} data - Array containing the data for the diagonal\n         * @param {number} [rows] - Number of rows (Default: data.length)\n         * @param {number} [columns] - Number of columns (Default: rows)\n         * @return {Matrix} - The new diagonal matrix\n         */\n    static diag(data, rows, columns) {\n      var l = data.length;\n      if (rows === undefined) rows = l;\n      if (columns === undefined) columns = rows;\n      var min = Math.min(l, rows, columns);\n      var matrix = this.zeros(rows, columns);\n      for (var i = 0; i < min; i++) {\n        matrix.set(i, i, data[i]);\n      }\n      return matrix;\n    }\n\n    /**\n         * Returns a matrix whose elements are the minimum between matrix1 and matrix2\n         * @param {Matrix} matrix1\n         * @param {Matrix} matrix2\n         * @return {Matrix}\n         */\n    static min(matrix1, matrix2) {\n      matrix1 = this.checkMatrix(matrix1);\n      matrix2 = this.checkMatrix(matrix2);\n      var rows = matrix1.rows;\n      var columns = matrix1.columns;\n      var result = new this(rows, columns);\n      for (var i = 0; i < rows; i++) {\n        for (var j = 0; j < columns; j++) {\n          result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));\n        }\n      }\n      return result;\n    }\n\n    /**\n         * Returns a matrix whose elements are the maximum between matrix1 and matrix2\n         * @param {Matrix} matrix1\n         * @param {Matrix} matrix2\n         * @return {Matrix}\n         */\n    static max(matrix1, matrix2) {\n      matrix1 = this.checkMatrix(matrix1);\n      matrix2 = this.checkMatrix(matrix2);\n      var rows = matrix1.rows;\n      var columns = matrix1.columns;\n      var result = new this(rows, columns);\n      for (var i = 0; i < rows; i++) {\n        for (var j = 0; j < columns; j++) {\n          result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));\n        }\n      }\n      return result;\n    }\n\n    /**\n         * Check that the provided value is a Matrix and tries to instantiate one if not\n         * @param {*} value - The value to check\n         * @return {Matrix}\n         */\n    static checkMatrix(value) {\n      return Matrix.isMatrix(value) ? value : new this(value);\n    }\n\n    /**\n         * Returns true if the argument is a Matrix, false otherwise\n         * @param {*} value - The value to check\n         * @return {boolean}\n         */\n    static isMatrix(value) {\n      return (value != null) && (value.klass === 'Matrix');\n    }\n\n    /**\n         * @prop {number} size - The number of elements in the matrix.\n         */\n    get size() {\n      return this.rows * this.columns;\n    }\n\n    /**\n         * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.\n         * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)\n         * @return {Matrix} this\n         */\n    apply(callback) {\n      if (typeof callback !== 'function') {\n        throw new TypeError('callback must be a function');\n      }\n      var ii = this.rows;\n      var jj = this.columns;\n      for (var i = 0; i < ii; i++) {\n        for (var j = 0; j < jj; j++) {\n          callback.call(this, i, j);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Returns a new 1D array filled row by row with the matrix values\n         * @return {Array}\n         */\n    to1DArray() {\n      var array = new Array(this.size);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          array[i * this.columns + j] = this.get(i, j);\n        }\n      }\n      return array;\n    }\n\n    /**\n         * Returns a 2D array containing a copy of the data\n         * @return {Array}\n         */\n    to2DArray() {\n      var copy = new Array(this.rows);\n      for (var i = 0; i < this.rows; i++) {\n        copy[i] = new Array(this.columns);\n        for (var j = 0; j < this.columns; j++) {\n          copy[i][j] = this.get(i, j);\n        }\n      }\n      return copy;\n    }\n\n    /**\n         * @return {boolean} true if the matrix has one row\n         */\n    isRowVector() {\n      return this.rows === 1;\n    }\n\n    /**\n         * @return {boolean} true if the matrix has one column\n         */\n    isColumnVector() {\n      return this.columns === 1;\n    }\n\n    /**\n         * @return {boolean} true if the matrix has one row or one column\n         */\n    isVector() {\n      return (this.rows === 1) || (this.columns === 1);\n    }\n\n    /**\n         * @return {boolean} true if the matrix has the same number of rows and columns\n         */\n    isSquare() {\n      return this.rows === this.columns;\n    }\n\n    /**\n         * @return {boolean} true if the matrix is square and has the same values on both sides of the diagonal\n         */\n    isSymmetric() {\n      if (this.isSquare()) {\n        for (var i = 0; i < this.rows; i++) {\n          for (var j = 0; j <= i; j++) {\n            if (this.get(i, j) !== this.get(j, i)) {\n              return false;\n            }\n          }\n        }\n        return true;\n      }\n      return false;\n    }\n\n    /**\n         * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1\n         * @abstract\n         * @param {number} rowIndex - Index of the row\n         * @param {number} columnIndex - Index of the column\n         * @param {number} value - The new value for the element\n         * @return {Matrix} this\n         */\n    set(rowIndex, columnIndex, value) { // eslint-disable-line no-unused-vars\n      throw new Error('set method is unimplemented');\n    }\n\n    /**\n         * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]\n         * @abstract\n         * @param {number} rowIndex - Index of the row\n         * @param {number} columnIndex - Index of the column\n         * @return {number}\n         */\n    get(rowIndex, columnIndex) { // eslint-disable-line no-unused-vars\n      throw new Error('get method is unimplemented');\n    }\n\n    /**\n         * Creates a new matrix that is a repetition of the current matrix. New matrix has rowRep times the number of\n         * rows of the matrix, and colRep times the number of columns of the matrix\n         * @param {number} rowRep - Number of times the rows should be repeated\n         * @param {number} colRep - Number of times the columns should be re\n         * @return {Matrix}\n         * @example\n         * var matrix = new Matrix([[1,2]]);\n         * matrix.repeat(2); // [[1,2],[1,2]]\n         */\n    repeat(rowRep, colRep) {\n      rowRep = rowRep || 1;\n      colRep = colRep || 1;\n      var matrix = new this.constructor[Symbol.species](this.rows * rowRep, this.columns * colRep);\n      for (var i = 0; i < rowRep; i++) {\n        for (var j = 0; j < colRep; j++) {\n          matrix.setSubMatrix(this, this.rows * i, this.columns * j);\n        }\n      }\n      return matrix;\n    }\n\n    /**\n         * Fills the matrix with a given value. All elements will be set to this value.\n         * @param {number} value - New value\n         * @return {Matrix} this\n         */\n    fill(value) {\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, value);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Negates the matrix. All elements will be multiplied by (-1)\n         * @return {Matrix} this\n         */\n    neg() {\n      return this.mulS(-1);\n    }\n\n    /**\n         * Returns a new array from the given row index\n         * @param {number} index - Row index\n         * @return {Array}\n         */\n    getRow(index) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, index);\n      var row = new Array(this.columns);\n      for (var i = 0; i < this.columns; i++) {\n        row[i] = this.get(index, i);\n      }\n      return row;\n    }\n\n    /**\n         * Returns a new row vector from the given row index\n         * @param {number} index - Row index\n         * @return {Matrix}\n         */\n    getRowVector(index) {\n      return this.constructor.rowVector(this.getRow(index));\n    }\n\n    /**\n         * Sets a row at the given index\n         * @param {number} index - Row index\n         * @param {Array|Matrix} array - Array or vector\n         * @return {Matrix} this\n         */\n    setRow(index, array) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, index);\n      array = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowVector\"])(this, array);\n      for (var i = 0; i < this.columns; i++) {\n        this.set(index, i, array[i]);\n      }\n      return this;\n    }\n\n    /**\n         * Swaps two rows\n         * @param {number} row1 - First row index\n         * @param {number} row2 - Second row index\n         * @return {Matrix} this\n         */\n    swapRows(row1, row2) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, row1);\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, row2);\n      for (var i = 0; i < this.columns; i++) {\n        var temp = this.get(row1, i);\n        this.set(row1, i, this.get(row2, i));\n        this.set(row2, i, temp);\n      }\n      return this;\n    }\n\n    /**\n         * Returns a new array from the given column index\n         * @param {number} index - Column index\n         * @return {Array}\n         */\n    getColumn(index) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, index);\n      var column = new Array(this.rows);\n      for (var i = 0; i < this.rows; i++) {\n        column[i] = this.get(i, index);\n      }\n      return column;\n    }\n\n    /**\n         * Returns a new column vector from the given column index\n         * @param {number} index - Column index\n         * @return {Matrix}\n         */\n    getColumnVector(index) {\n      return this.constructor.columnVector(this.getColumn(index));\n    }\n\n    /**\n         * Sets a column at the given index\n         * @param {number} index - Column index\n         * @param {Array|Matrix} array - Array or vector\n         * @return {Matrix} this\n         */\n    setColumn(index, array) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, index);\n      array = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnVector\"])(this, array);\n      for (var i = 0; i < this.rows; i++) {\n        this.set(i, index, array[i]);\n      }\n      return this;\n    }\n\n    /**\n         * Swaps two columns\n         * @param {number} column1 - First column index\n         * @param {number} column2 - Second column index\n         * @return {Matrix} this\n         */\n    swapColumns(column1, column2) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, column1);\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, column2);\n      for (var i = 0; i < this.rows; i++) {\n        var temp = this.get(i, column1);\n        this.set(i, column1, this.get(i, column2));\n        this.set(i, column2, temp);\n      }\n      return this;\n    }\n\n    /**\n         * Adds the values of a vector to each row\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    addRowVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) + vector[j]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Subtracts the values of a vector from each row\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    subRowVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) - vector[j]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Multiplies the values of a vector with each row\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    mulRowVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) * vector[j]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Divides the values of each row by those of a vector\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    divRowVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) / vector[j]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Adds the values of a vector to each column\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    addColumnVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) + vector[i]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Subtracts the values of a vector from each column\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    subColumnVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) - vector[i]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Multiplies the values of a vector with each column\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    mulColumnVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) * vector[i]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Divides the values of each column by those of a vector\n         * @param {Array|Matrix} vector - Array or vector\n         * @return {Matrix} this\n         */\n    divColumnVector(vector) {\n      vector = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnVector\"])(this, vector);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          this.set(i, j, this.get(i, j) / vector[i]);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Multiplies the values of a row with a scalar\n         * @param {number} index - Row index\n         * @param {number} value\n         * @return {Matrix} this\n         */\n    mulRow(index, value) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, index);\n      for (var i = 0; i < this.columns; i++) {\n        this.set(index, i, this.get(index, i) * value);\n      }\n      return this;\n    }\n\n    /**\n         * Multiplies the values of a column with a scalar\n         * @param {number} index - Column index\n         * @param {number} value\n         * @return {Matrix} this\n         */\n    mulColumn(index, value) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, index);\n      for (var i = 0; i < this.rows; i++) {\n        this.set(i, index, this.get(i, index) * value);\n      }\n      return this;\n    }\n\n    /**\n         * Returns the maximum value of the matrix\n         * @return {number}\n         */\n    max() {\n      var v = this.get(0, 0);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          if (this.get(i, j) > v) {\n            v = this.get(i, j);\n          }\n        }\n      }\n      return v;\n    }\n\n    /**\n         * Returns the index of the maximum value\n         * @return {Array}\n         */\n    maxIndex() {\n      var v = this.get(0, 0);\n      var idx = [0, 0];\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          if (this.get(i, j) > v) {\n            v = this.get(i, j);\n            idx[0] = i;\n            idx[1] = j;\n          }\n        }\n      }\n      return idx;\n    }\n\n    /**\n         * Returns the minimum value of the matrix\n         * @return {number}\n         */\n    min() {\n      var v = this.get(0, 0);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          if (this.get(i, j) < v) {\n            v = this.get(i, j);\n          }\n        }\n      }\n      return v;\n    }\n\n    /**\n         * Returns the index of the minimum value\n         * @return {Array}\n         */\n    minIndex() {\n      var v = this.get(0, 0);\n      var idx = [0, 0];\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          if (this.get(i, j) < v) {\n            v = this.get(i, j);\n            idx[0] = i;\n            idx[1] = j;\n          }\n        }\n      }\n      return idx;\n    }\n\n    /**\n         * Returns the maximum value of one row\n         * @param {number} row - Row index\n         * @return {number}\n         */\n    maxRow(row) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, row);\n      var v = this.get(row, 0);\n      for (var i = 1; i < this.columns; i++) {\n        if (this.get(row, i) > v) {\n          v = this.get(row, i);\n        }\n      }\n      return v;\n    }\n\n    /**\n         * Returns the index of the maximum value of one row\n         * @param {number} row - Row index\n         * @return {Array}\n         */\n    maxRowIndex(row) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, row);\n      var v = this.get(row, 0);\n      var idx = [row, 0];\n      for (var i = 1; i < this.columns; i++) {\n        if (this.get(row, i) > v) {\n          v = this.get(row, i);\n          idx[1] = i;\n        }\n      }\n      return idx;\n    }\n\n    /**\n         * Returns the minimum value of one row\n         * @param {number} row - Row index\n         * @return {number}\n         */\n    minRow(row) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, row);\n      var v = this.get(row, 0);\n      for (var i = 1; i < this.columns; i++) {\n        if (this.get(row, i) < v) {\n          v = this.get(row, i);\n        }\n      }\n      return v;\n    }\n\n    /**\n         * Returns the index of the maximum value of one row\n         * @param {number} row - Row index\n         * @return {Array}\n         */\n    minRowIndex(row) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, row);\n      var v = this.get(row, 0);\n      var idx = [row, 0];\n      for (var i = 1; i < this.columns; i++) {\n        if (this.get(row, i) < v) {\n          v = this.get(row, i);\n          idx[1] = i;\n        }\n      }\n      return idx;\n    }\n\n    /**\n         * Returns the maximum value of one column\n         * @param {number} column - Column index\n         * @return {number}\n         */\n    maxColumn(column) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, column);\n      var v = this.get(0, column);\n      for (var i = 1; i < this.rows; i++) {\n        if (this.get(i, column) > v) {\n          v = this.get(i, column);\n        }\n      }\n      return v;\n    }\n\n    /**\n         * Returns the index of the maximum value of one column\n         * @param {number} column - Column index\n         * @return {Array}\n         */\n    maxColumnIndex(column) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, column);\n      var v = this.get(0, column);\n      var idx = [0, column];\n      for (var i = 1; i < this.rows; i++) {\n        if (this.get(i, column) > v) {\n          v = this.get(i, column);\n          idx[0] = i;\n        }\n      }\n      return idx;\n    }\n\n    /**\n         * Returns the minimum value of one column\n         * @param {number} column - Column index\n         * @return {number}\n         */\n    minColumn(column) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, column);\n      var v = this.get(0, column);\n      for (var i = 1; i < this.rows; i++) {\n        if (this.get(i, column) < v) {\n          v = this.get(i, column);\n        }\n      }\n      return v;\n    }\n\n    /**\n         * Returns the index of the minimum value of one column\n         * @param {number} column - Column index\n         * @return {Array}\n         */\n    minColumnIndex(column) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, column);\n      var v = this.get(0, column);\n      var idx = [0, column];\n      for (var i = 1; i < this.rows; i++) {\n        if (this.get(i, column) < v) {\n          v = this.get(i, column);\n          idx[0] = i;\n        }\n      }\n      return idx;\n    }\n\n    /**\n         * Returns an array containing the diagonal values of the matrix\n         * @return {Array}\n         */\n    diag() {\n      var min = Math.min(this.rows, this.columns);\n      var diag = new Array(min);\n      for (var i = 0; i < min; i++) {\n        diag[i] = this.get(i, i);\n      }\n      return diag;\n    }\n\n    /**\n         * Returns the sum by the argument given, if no argument given,\n         * it returns the sum of all elements of the matrix.\n         * @param {string} by - sum by 'row' or 'column'.\n         * @return {Matrix|number}\n         */\n    sum(by) {\n      switch (by) {\n        case 'row':\n          return Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"sumByRow\"])(this);\n        case 'column':\n          return Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"sumByColumn\"])(this);\n        default:\n          return Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"sumAll\"])(this);\n      }\n    }\n\n    /**\n         * Returns the mean of all elements of the matrix\n         * @return {number}\n         */\n    mean() {\n      return this.sum() / this.size;\n    }\n\n    /**\n         * Returns the product of all elements of the matrix\n         * @return {number}\n         */\n    prod() {\n      var prod = 1;\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          prod *= this.get(i, j);\n        }\n      }\n      return prod;\n    }\n\n    /**\n         * Returns the norm of a matrix.\n         * @param {string} type - \"frobenius\" (default) or \"max\" return resp. the Frobenius norm and the max norm.\n         * @return {number}\n         */\n    norm(type = 'frobenius') {\n      var result = 0;\n      if (type === 'max') {\n        return this.max();\n      } else if (type === 'frobenius') {\n        for (var i = 0; i < this.rows; i++) {\n          for (var j = 0; j < this.columns; j++) {\n            result = result + this.get(i, j) * this.get(i, j);\n          }\n        }\n        return Math.sqrt(result);\n      } else {\n        throw new RangeError(`unknown norm type: ${type}`);\n      }\n    }\n\n    /**\n         * Computes the cumulative sum of the matrix elements (in place, row by row)\n         * @return {Matrix} this\n         */\n    cumulativeSum() {\n      var sum = 0;\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          sum += this.get(i, j);\n          this.set(i, j, sum);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Computes the dot (scalar) product between the matrix and another\n         * @param {Matrix} vector2 vector\n         * @return {number}\n         */\n    dot(vector2) {\n      if (Matrix.isMatrix(vector2)) vector2 = vector2.to1DArray();\n      var vector1 = this.to1DArray();\n      if (vector1.length !== vector2.length) {\n        throw new RangeError('vectors do not have the same size');\n      }\n      var dot = 0;\n      for (var i = 0; i < vector1.length; i++) {\n        dot += vector1[i] * vector2[i];\n      }\n      return dot;\n    }\n\n    /**\n         * Returns the matrix product between this and other\n         * @param {Matrix} other\n         * @return {Matrix}\n         */\n    mmul(other) {\n      other = this.constructor.checkMatrix(other);\n      if (this.columns !== other.rows) {\n        // eslint-disable-next-line no-console\n        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');\n      }\n\n      var m = this.rows;\n      var n = this.columns;\n      var p = other.columns;\n\n      var result = new this.constructor[Symbol.species](m, p);\n\n      var Bcolj = new Array(n);\n      for (var j = 0; j < p; j++) {\n        for (var k = 0; k < n; k++) {\n          Bcolj[k] = other.get(k, j);\n        }\n\n        for (var i = 0; i < m; i++) {\n          var s = 0;\n          for (k = 0; k < n; k++) {\n            s += this.get(i, k) * Bcolj[k];\n          }\n\n          result.set(i, j, s);\n        }\n      }\n      return result;\n    }\n\n    strassen2x2(other) {\n      var result = new this.constructor[Symbol.species](2, 2);\n      const a11 = this.get(0, 0);\n      const b11 = other.get(0, 0);\n      const a12 = this.get(0, 1);\n      const b12 = other.get(0, 1);\n      const a21 = this.get(1, 0);\n      const b21 = other.get(1, 0);\n      const a22 = this.get(1, 1);\n      const b22 = other.get(1, 1);\n\n      // Compute intermediate values.\n      const m1 = (a11 + a22) * (b11 + b22);\n      const m2 = (a21 + a22) * b11;\n      const m3 = a11 * (b12 - b22);\n      const m4 = a22 * (b21 - b11);\n      const m5 = (a11 + a12) * b22;\n      const m6 = (a21 - a11) * (b11 + b12);\n      const m7 = (a12 - a22) * (b21 + b22);\n\n      // Combine intermediate values into the output.\n      const c00 = m1 + m4 - m5 + m7;\n      const c01 = m3 + m5;\n      const c10 = m2 + m4;\n      const c11 = m1 - m2 + m3 + m6;\n\n      result.set(0, 0, c00);\n      result.set(0, 1, c01);\n      result.set(1, 0, c10);\n      result.set(1, 1, c11);\n      return result;\n    }\n\n    strassen3x3(other) {\n      var result = new this.constructor[Symbol.species](3, 3);\n\n      const a00 = this.get(0, 0);\n      const a01 = this.get(0, 1);\n      const a02 = this.get(0, 2);\n      const a10 = this.get(1, 0);\n      const a11 = this.get(1, 1);\n      const a12 = this.get(1, 2);\n      const a20 = this.get(2, 0);\n      const a21 = this.get(2, 1);\n      const a22 = this.get(2, 2);\n\n      const b00 = other.get(0, 0);\n      const b01 = other.get(0, 1);\n      const b02 = other.get(0, 2);\n      const b10 = other.get(1, 0);\n      const b11 = other.get(1, 1);\n      const b12 = other.get(1, 2);\n      const b20 = other.get(2, 0);\n      const b21 = other.get(2, 1);\n      const b22 = other.get(2, 2);\n\n      const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;\n      const m2 = (a00 - a10) * (-b01 + b11);\n      const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);\n      const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);\n      const m5 = (a10 + a11) * (-b00 + b01);\n      const m6 = a00 * b00;\n      const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);\n      const m8 = (-a00 + a20) * (b02 - b12);\n      const m9 = (a20 + a21) * (-b00 + b02);\n      const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;\n      const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);\n      const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);\n      const m13 = (a02 - a22) * (b11 - b21);\n      const m14 = a02 * b20;\n      const m15 = (a21 + a22) * (-b20 + b21);\n      const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);\n      const m17 = (a02 - a12) * (b12 - b22);\n      const m18 = (a11 + a12) * (-b20 + b22);\n      const m19 = a01 * b10;\n      const m20 = a12 * b21;\n      const m21 = a10 * b02;\n      const m22 = a20 * b01;\n      const m23 = a22 * b22;\n\n      const c00 = m6 + m14 + m19;\n      const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;\n      const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;\n      const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;\n      const c11 = m2 + m4 + m5 + m6 + m20;\n      const c12 = m14 + m16 + m17 + m18 + m21;\n      const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;\n      const c21 = m12 + m13 + m14 + m15 + m22;\n      const c22 = m6 + m7 + m8 + m9 + m23;\n\n      result.set(0, 0, c00);\n      result.set(0, 1, c01);\n      result.set(0, 2, c02);\n      result.set(1, 0, c10);\n      result.set(1, 1, c11);\n      result.set(1, 2, c12);\n      result.set(2, 0, c20);\n      result.set(2, 1, c21);\n      result.set(2, 2, c22);\n      return result;\n    }\n\n    /**\n         * Returns the matrix product between x and y. More efficient than mmul(other) only when we multiply squared matrix and when the size of the matrix is > 1000.\n         * @param {Matrix} y\n         * @return {Matrix}\n         */\n    mmulStrassen(y) {\n      var x = this.clone();\n      var r1 = x.rows;\n      var c1 = x.columns;\n      var r2 = y.rows;\n      var c2 = y.columns;\n      if (c1 !== r2) {\n        // eslint-disable-next-line no-console\n        console.warn(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`);\n      }\n\n      // Put a matrix into the top left of a matrix of zeros.\n      // `rows` and `cols` are the dimensions of the output matrix.\n      function embed(mat, rows, cols) {\n        var r = mat.rows;\n        var c = mat.columns;\n        if ((r === rows) && (c === cols)) {\n          return mat;\n        } else {\n          var resultat = Matrix.zeros(rows, cols);\n          resultat = resultat.setSubMatrix(mat, 0, 0);\n          return resultat;\n        }\n      }\n\n\n      // Make sure both matrices are the same size.\n      // This is exclusively for simplicity:\n      // this algorithm can be implemented with matrices of different sizes.\n\n      var r = Math.max(r1, r2);\n      var c = Math.max(c1, c2);\n      x = embed(x, r, c);\n      y = embed(y, r, c);\n\n      // Our recursive multiplication function.\n      function blockMult(a, b, rows, cols) {\n        // For small matrices, resort to naive multiplication.\n        if (rows <= 512 || cols <= 512) {\n          return a.mmul(b); // a is equivalent to this\n        }\n\n        // Apply dynamic padding.\n        if ((rows % 2 === 1) && (cols % 2 === 1)) {\n          a = embed(a, rows + 1, cols + 1);\n          b = embed(b, rows + 1, cols + 1);\n        } else if (rows % 2 === 1) {\n          a = embed(a, rows + 1, cols);\n          b = embed(b, rows + 1, cols);\n        } else if (cols % 2 === 1) {\n          a = embed(a, rows, cols + 1);\n          b = embed(b, rows, cols + 1);\n        }\n\n        var halfRows = parseInt(a.rows / 2, 10);\n        var halfCols = parseInt(a.columns / 2, 10);\n        // Subdivide input matrices.\n        var a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);\n        var b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);\n\n        var a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);\n        var b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);\n\n        var a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);\n        var b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);\n\n        var a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);\n        var b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1);\n\n        // Compute intermediate values.\n        var m1 = blockMult(Matrix.add(a11, a22), Matrix.add(b11, b22), halfRows, halfCols);\n        var m2 = blockMult(Matrix.add(a21, a22), b11, halfRows, halfCols);\n        var m3 = blockMult(a11, Matrix.sub(b12, b22), halfRows, halfCols);\n        var m4 = blockMult(a22, Matrix.sub(b21, b11), halfRows, halfCols);\n        var m5 = blockMult(Matrix.add(a11, a12), b22, halfRows, halfCols);\n        var m6 = blockMult(Matrix.sub(a21, a11), Matrix.add(b11, b12), halfRows, halfCols);\n        var m7 = blockMult(Matrix.sub(a12, a22), Matrix.add(b21, b22), halfRows, halfCols);\n\n        // Combine intermediate values into the output.\n        var c11 = Matrix.add(m1, m4);\n        c11.sub(m5);\n        c11.add(m7);\n        var c12 = Matrix.add(m3, m5);\n        var c21 = Matrix.add(m2, m4);\n        var c22 = Matrix.sub(m1, m2);\n        c22.add(m3);\n        c22.add(m6);\n\n        // Crop output to the desired size (undo dynamic padding).\n        var resultat = Matrix.zeros(2 * c11.rows, 2 * c11.columns);\n        resultat = resultat.setSubMatrix(c11, 0, 0);\n        resultat = resultat.setSubMatrix(c12, c11.rows, 0);\n        resultat = resultat.setSubMatrix(c21, 0, c11.columns);\n        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);\n        return resultat.subMatrix(0, rows - 1, 0, cols - 1);\n      }\n      return blockMult(x, y, r, c);\n    }\n\n    /**\n         * Returns a row-by-row scaled matrix\n         * @param {number} [min=0] - Minimum scaled value\n         * @param {number} [max=1] - Maximum scaled value\n         * @return {Matrix} - The scaled matrix\n         */\n    scaleRows(min, max) {\n      min = min === undefined ? 0 : min;\n      max = max === undefined ? 1 : max;\n      if (min >= max) {\n        throw new RangeError('min should be strictly smaller than max');\n      }\n      var newMatrix = this.constructor.empty(this.rows, this.columns);\n      for (var i = 0; i < this.rows; i++) {\n        var scaled = Object(ml_array_rescale__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.getRow(i), { min, max });\n        newMatrix.setRow(i, scaled);\n      }\n      return newMatrix;\n    }\n\n    /**\n         * Returns a new column-by-column scaled matrix\n         * @param {number} [min=0] - Minimum scaled value\n         * @param {number} [max=1] - Maximum scaled value\n         * @return {Matrix} - The new scaled matrix\n         * @example\n         * var matrix = new Matrix([[1,2],[-1,0]]);\n         * var scaledMatrix = matrix.scaleColumns(); // [[1,1],[0,0]]\n         */\n    scaleColumns(min, max) {\n      min = min === undefined ? 0 : min;\n      max = max === undefined ? 1 : max;\n      if (min >= max) {\n        throw new RangeError('min should be strictly smaller than max');\n      }\n      var newMatrix = this.constructor.empty(this.rows, this.columns);\n      for (var i = 0; i < this.columns; i++) {\n        var scaled = Object(ml_array_rescale__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.getColumn(i), {\n          min: min,\n          max: max\n        });\n        newMatrix.setColumn(i, scaled);\n      }\n      return newMatrix;\n    }\n\n\n    /**\n         * Returns the Kronecker product (also known as tensor product) between this and other\n         * See https://en.wikipedia.org/wiki/Kronecker_product\n         * @param {Matrix} other\n         * @return {Matrix}\n         */\n    kroneckerProduct(other) {\n      other = this.constructor.checkMatrix(other);\n\n      var m = this.rows;\n      var n = this.columns;\n      var p = other.rows;\n      var q = other.columns;\n\n      var result = new this.constructor[Symbol.species](m * p, n * q);\n      for (var i = 0; i < m; i++) {\n        for (var j = 0; j < n; j++) {\n          for (var k = 0; k < p; k++) {\n            for (var l = 0; l < q; l++) {\n              result[p * i + k][q * j + l] = this.get(i, j) * other.get(k, l);\n            }\n          }\n        }\n      }\n      return result;\n    }\n\n    /**\n         * Transposes the matrix and returns a new one containing the result\n         * @return {Matrix}\n         */\n    transpose() {\n      var result = new this.constructor[Symbol.species](this.columns, this.rows);\n      for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n          result.set(j, i, this.get(i, j));\n        }\n      }\n      return result;\n    }\n\n    /**\n         * Sorts the rows (in place)\n         * @param {function} compareFunction - usual Array.prototype.sort comparison function\n         * @return {Matrix} this\n         */\n    sortRows(compareFunction) {\n      if (compareFunction === undefined) compareFunction = compareNumbers;\n      for (var i = 0; i < this.rows; i++) {\n        this.setRow(i, this.getRow(i).sort(compareFunction));\n      }\n      return this;\n    }\n\n    /**\n         * Sorts the columns (in place)\n         * @param {function} compareFunction - usual Array.prototype.sort comparison function\n         * @return {Matrix} this\n         */\n    sortColumns(compareFunction) {\n      if (compareFunction === undefined) compareFunction = compareNumbers;\n      for (var i = 0; i < this.columns; i++) {\n        this.setColumn(i, this.getColumn(i).sort(compareFunction));\n      }\n      return this;\n    }\n\n    /**\n         * Returns a subset of the matrix\n         * @param {number} startRow - First row index\n         * @param {number} endRow - Last row index\n         * @param {number} startColumn - First column index\n         * @param {number} endColumn - Last column index\n         * @return {Matrix}\n         */\n    subMatrix(startRow, endRow, startColumn, endColumn) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRange\"])(this, startRow, endRow, startColumn, endColumn);\n      var newMatrix = new this.constructor[Symbol.species](endRow - startRow + 1, endColumn - startColumn + 1);\n      for (var i = startRow; i <= endRow; i++) {\n        for (var j = startColumn; j <= endColumn; j++) {\n          newMatrix[i - startRow][j - startColumn] = this.get(i, j);\n        }\n      }\n      return newMatrix;\n    }\n\n    /**\n         * Returns a subset of the matrix based on an array of row indices\n         * @param {Array} indices - Array containing the row indices\n         * @param {number} [startColumn = 0] - First column index\n         * @param {number} [endColumn = this.columns-1] - Last column index\n         * @return {Matrix}\n         */\n    subMatrixRow(indices, startColumn, endColumn) {\n      if (startColumn === undefined) startColumn = 0;\n      if (endColumn === undefined) endColumn = this.columns - 1;\n      if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns)) {\n        throw new RangeError('Argument out of range');\n      }\n\n      var newMatrix = new this.constructor[Symbol.species](indices.length, endColumn - startColumn + 1);\n      for (var i = 0; i < indices.length; i++) {\n        for (var j = startColumn; j <= endColumn; j++) {\n          if (indices[i] < 0 || indices[i] >= this.rows) {\n            throw new RangeError(`Row index out of range: ${indices[i]}`);\n          }\n          newMatrix.set(i, j - startColumn, this.get(indices[i], j));\n        }\n      }\n      return newMatrix;\n    }\n\n    /**\n         * Returns a subset of the matrix based on an array of column indices\n         * @param {Array} indices - Array containing the column indices\n         * @param {number} [startRow = 0] - First row index\n         * @param {number} [endRow = this.rows-1] - Last row index\n         * @return {Matrix}\n         */\n    subMatrixColumn(indices, startRow, endRow) {\n      if (startRow === undefined) startRow = 0;\n      if (endRow === undefined) endRow = this.rows - 1;\n      if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows)) {\n        throw new RangeError('Argument out of range');\n      }\n\n      var newMatrix = new this.constructor[Symbol.species](endRow - startRow + 1, indices.length);\n      for (var i = 0; i < indices.length; i++) {\n        for (var j = startRow; j <= endRow; j++) {\n          if (indices[i] < 0 || indices[i] >= this.columns) {\n            throw new RangeError(`Column index out of range: ${indices[i]}`);\n          }\n          newMatrix.set(j - startRow, i, this.get(j, indices[i]));\n        }\n      }\n      return newMatrix;\n    }\n\n    /**\n         * Set a part of the matrix to the given sub-matrix\n         * @param {Matrix|Array< Array >} matrix - The source matrix from which to extract values.\n         * @param {number} startRow - The index of the first row to set\n         * @param {number} startColumn - The index of the first column to set\n         * @return {Matrix}\n         */\n    setSubMatrix(matrix, startRow, startColumn) {\n      matrix = this.constructor.checkMatrix(matrix);\n      var endRow = startRow + matrix.rows - 1;\n      var endColumn = startColumn + matrix.columns - 1;\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRange\"])(this, startRow, endRow, startColumn, endColumn);\n      for (var i = 0; i < matrix.rows; i++) {\n        for (var j = 0; j < matrix.columns; j++) {\n          this[startRow + i][startColumn + j] = matrix.get(i, j);\n        }\n      }\n      return this;\n    }\n\n    /**\n         * Return a new matrix based on a selection of rows and columns\n         * @param {Array<number>} rowIndices - The row indices to select. Order matters and an index can be more than once.\n         * @param {Array<number>} columnIndices - The column indices to select. Order matters and an index can be use more than once.\n         * @return {Matrix} The new matrix\n         */\n    selection(rowIndices, columnIndices) {\n      var indices = Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkIndices\"])(this, rowIndices, columnIndices);\n      var newMatrix = new this.constructor[Symbol.species](rowIndices.length, columnIndices.length);\n      for (var i = 0; i < indices.row.length; i++) {\n        var rowIndex = indices.row[i];\n        for (var j = 0; j < indices.column.length; j++) {\n          var columnIndex = indices.column[j];\n          newMatrix[i][j] = this.get(rowIndex, columnIndex);\n        }\n      }\n      return newMatrix;\n    }\n\n    /**\n         * Returns the trace of the matrix (sum of the diagonal elements)\n         * @return {number}\n         */\n    trace() {\n      var min = Math.min(this.rows, this.columns);\n      var trace = 0;\n      for (var i = 0; i < min; i++) {\n        trace += this.get(i, i);\n      }\n      return trace;\n    }\n\n    /*\n         Matrix views\n         */\n\n    /**\n         * Returns a view of the transposition of the matrix\n         * @return {MatrixTransposeView}\n         */\n    transposeView() {\n      return new _views_transpose__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this);\n    }\n\n    /**\n         * Returns a view of the row vector with the given index\n         * @param {number} row - row index of the vector\n         * @return {MatrixRowView}\n         */\n    rowView(row) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkRowIndex\"])(this, row);\n      return new _views_row__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this, row);\n    }\n\n    /**\n         * Returns a view of the column vector with the given index\n         * @param {number} column - column index of the vector\n         * @return {MatrixColumnView}\n         */\n    columnView(column) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_3__[\"checkColumnIndex\"])(this, column);\n      return new _views_column__WEBPACK_IMPORTED_MODULE_10__[\"default\"](this, column);\n    }\n\n    /**\n         * Returns a view of the matrix flipped in the row axis\n         * @return {MatrixFlipRowView}\n         */\n    flipRowView() {\n      return new _views_flipRow__WEBPACK_IMPORTED_MODULE_11__[\"default\"](this);\n    }\n\n    /**\n         * Returns a view of the matrix flipped in the column axis\n         * @return {MatrixFlipColumnView}\n         */\n    flipColumnView() {\n      return new _views_flipColumn__WEBPACK_IMPORTED_MODULE_12__[\"default\"](this);\n    }\n\n    /**\n         * Returns a view of a submatrix giving the index boundaries\n         * @param {number} startRow - first row index of the submatrix\n         * @param {number} endRow - last row index of the submatrix\n         * @param {number} startColumn - first column index of the submatrix\n         * @param {number} endColumn - last column index of the submatrix\n         * @return {MatrixSubView}\n         */\n    subMatrixView(startRow, endRow, startColumn, endColumn) {\n      return new _views_sub__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this, startRow, endRow, startColumn, endColumn);\n    }\n\n    /**\n         * Returns a view of the cross of the row indices and the column indices\n         * @example\n         * // resulting vector is [[2], [2]]\n         * var matrix = new Matrix([[1,2,3], [4,5,6]]).selectionView([0, 0], [1])\n         * @param {Array<number>} rowIndices\n         * @param {Array<number>} columnIndices\n         * @return {MatrixSelectionView}\n         */\n    selectionView(rowIndices, columnIndices) {\n      return new _views_selection__WEBPACK_IMPORTED_MODULE_7__[\"default\"](this, rowIndices, columnIndices);\n    }\n\n    /**\n         * Returns a view of the row indices\n         * @example\n         * // resulting vector is [[1,2,3], [1,2,3]]\n         * var matrix = new Matrix([[1,2,3], [4,5,6]]).rowSelectionView([0, 0])\n         * @param {Array<number>} rowIndices\n         * @return {MatrixRowSelectionView}\n         */\n    rowSelectionView(rowIndices) {\n      return new _views_rowSelection__WEBPACK_IMPORTED_MODULE_8__[\"default\"](this, rowIndices);\n    }\n\n    /**\n         * Returns a view of the column indices\n         * @example\n         * // resulting vector is [[2, 2], [5, 5]]\n         * var matrix = new Matrix([[1,2,3], [4,5,6]]).columnSelectionView([1, 1])\n         * @param {Array<number>} columnIndices\n         * @return {MatrixColumnSelectionView}\n         */\n    columnSelectionView(columnIndices) {\n      return new _views_columnSelection__WEBPACK_IMPORTED_MODULE_9__[\"default\"](this, columnIndices);\n    }\n\n\n    /**\n        * Calculates and returns the determinant of a matrix as a Number\n        * @example\n        *   new Matrix([[1,2,3], [4,5,6]]).det()\n        * @return {number}\n        */\n    det() {\n      if (this.isSquare()) {\n        var a, b, c, d;\n        if (this.columns === 2) {\n          // 2 x 2 matrix\n          a = this.get(0, 0);\n          b = this.get(0, 1);\n          c = this.get(1, 0);\n          d = this.get(1, 1);\n\n          return a * d - (b * c);\n        } else if (this.columns === 3) {\n          // 3 x 3 matrix\n          var subMatrix0, subMatrix1, subMatrix2;\n          subMatrix0 = this.selectionView([1, 2], [1, 2]);\n          subMatrix1 = this.selectionView([1, 2], [0, 2]);\n          subMatrix2 = this.selectionView([1, 2], [0, 1]);\n          a = this.get(0, 0);\n          b = this.get(0, 1);\n          c = this.get(0, 2);\n\n          return a * subMatrix0.det() - b * subMatrix1.det() + c * subMatrix2.det();\n        } else {\n          // general purpose determinant using the LU decomposition\n          return new _dc_lu__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this).determinant;\n        }\n      } else {\n        throw Error('Determinant can only be calculated for a square matrix.');\n      }\n    }\n\n    /**\n         * Returns inverse of a matrix if it exists or the pseudoinverse\n         * @param {number} threshold - threshold for taking inverse of singular values (default = 1e-15)\n         * @return {Matrix} the (pseudo)inverted matrix.\n         */\n    pseudoInverse(threshold) {\n      if (threshold === undefined) threshold = Number.EPSILON;\n      var svdSolution = new _dc_svd__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, { autoTranspose: true });\n\n      var U = svdSolution.leftSingularVectors;\n      var V = svdSolution.rightSingularVectors;\n      var s = svdSolution.diagonal;\n\n      for (var i = 0; i < s.length; i++) {\n        if (Math.abs(s[i]) > threshold) {\n          s[i] = 1.0 / s[i];\n        } else {\n          s[i] = 0.0;\n        }\n      }\n\n      // convert list to diagonal\n      s = this.constructor[Symbol.species].diag(s);\n      return V.mmul(s.mmul(U.transposeView()));\n    }\n\n    /**\n         * Creates an exact and independent copy of the matrix\n         * @return {Matrix}\n         */\n    clone() {\n      var newMatrix = new this.constructor[Symbol.species](this.rows, this.columns);\n      for (var row = 0; row < this.rows; row++) {\n        for (var column = 0; column < this.columns; column++) {\n          newMatrix.set(row, column, this.get(row, column));\n        }\n      }\n      return newMatrix;\n    }\n  }\n\n  Matrix.prototype.klass = 'Matrix';\n\n  function compareNumbers(a, b) {\n    return a - b;\n  }\n\n  /*\n     Synonyms\n     */\n\n  Matrix.random = Matrix.rand;\n  Matrix.diagonal = Matrix.diag;\n  Matrix.prototype.diagonal = Matrix.prototype.diag;\n  Matrix.identity = Matrix.eye;\n  Matrix.prototype.negate = Matrix.prototype.neg;\n  Matrix.prototype.tensorProduct = Matrix.prototype.kroneckerProduct;\n  Matrix.prototype.determinant = Matrix.prototype.det;\n\n  /*\n     Add dynamically instance and static methods for mathematical operations\n     */\n\n  var inplaceOperator = `\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n`;\n\n  var inplaceOperatorScalar = `\n(function %name%S(value) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, this.get(i, j) %op% value);\n        }\n    }\n    return this;\n})\n`;\n\n  var inplaceOperatorMatrix = `\n(function %name%M(matrix) {\n    matrix = this.constructor.checkMatrix(matrix);\n    if (this.rows !== matrix.rows ||\n        this.columns !== matrix.columns) {\n        throw new RangeError('Matrices dimensions must be equal');\n    }\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, this.get(i, j) %op% matrix.get(i, j));\n        }\n    }\n    return this;\n})\n`;\n\n  var staticOperator = `\n(function %name%(matrix, value) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%(value);\n})\n`;\n\n  var inplaceMethod = `\n(function %name%() {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j)));\n        }\n    }\n    return this;\n})\n`;\n\n  var staticMethod = `\n(function %name%(matrix) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%();\n})\n`;\n\n  var inplaceMethodWithArgs = `\n(function %name%(%args%) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), %args%));\n        }\n    }\n    return this;\n})\n`;\n\n  var staticMethodWithArgs = `\n(function %name%(matrix, %args%) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%(%args%);\n})\n`;\n\n\n  var inplaceMethodWithOneArgScalar = `\n(function %name%S(value) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), value));\n        }\n    }\n    return this;\n})\n`;\n  var inplaceMethodWithOneArgMatrix = `\n(function %name%M(matrix) {\n    matrix = this.constructor.checkMatrix(matrix);\n    if (this.rows !== matrix.rows ||\n        this.columns !== matrix.columns) {\n        throw new RangeError('Matrices dimensions must be equal');\n    }\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), matrix.get(i, j)));\n        }\n    }\n    return this;\n})\n`;\n\n  var inplaceMethodWithOneArg = `\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n`;\n\n  var staticMethodWithOneArg = staticMethodWithArgs;\n\n  var operators = [\n    // Arithmetic operators\n    ['+', 'add'],\n    ['-', 'sub', 'subtract'],\n    ['*', 'mul', 'multiply'],\n    ['/', 'div', 'divide'],\n    ['%', 'mod', 'modulus'],\n    // Bitwise operators\n    ['&', 'and'],\n    ['|', 'or'],\n    ['^', 'xor'],\n    ['<<', 'leftShift'],\n    ['>>', 'signPropagatingRightShift'],\n    ['>>>', 'rightShift', 'zeroFillRightShift']\n  ];\n\n  var i;\n  var eval2 = eval; // eslint-disable-line no-eval\n  for (var operator of operators) {\n    var inplaceOp = eval2(fillTemplateFunction(inplaceOperator, { name: operator[1], op: operator[0] }));\n    var inplaceOpS = eval2(fillTemplateFunction(inplaceOperatorScalar, { name: `${operator[1]}S`, op: operator[0] }));\n    var inplaceOpM = eval2(fillTemplateFunction(inplaceOperatorMatrix, { name: `${operator[1]}M`, op: operator[0] }));\n    var staticOp = eval2(fillTemplateFunction(staticOperator, { name: operator[1] }));\n    for (i = 1; i < operator.length; i++) {\n      Matrix.prototype[operator[i]] = inplaceOp;\n      Matrix.prototype[`${operator[i]}S`] = inplaceOpS;\n      Matrix.prototype[`${operator[i]}M`] = inplaceOpM;\n      Matrix[operator[i]] = staticOp;\n    }\n  }\n\n  var methods = [['~', 'not']];\n\n  [\n    'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil',\n    'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p',\n    'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'\n  ].forEach(function (mathMethod) {\n    methods.push([`Math.${mathMethod}`, mathMethod]);\n  });\n\n  for (var method of methods) {\n    var inplaceMeth = eval2(fillTemplateFunction(inplaceMethod, { name: method[1], method: method[0] }));\n    var staticMeth = eval2(fillTemplateFunction(staticMethod, { name: method[1] }));\n    for (i = 1; i < method.length; i++) {\n      Matrix.prototype[method[i]] = inplaceMeth;\n      Matrix[method[i]] = staticMeth;\n    }\n  }\n\n  var methodsWithArgs = [['Math.pow', 1, 'pow']];\n\n  for (var methodWithArg of methodsWithArgs) {\n    var args = 'arg0';\n    for (i = 1; i < methodWithArg[1]; i++) {\n      args += `, arg${i}`;\n    }\n    if (methodWithArg[1] !== 1) {\n      var inplaceMethWithArgs = eval2(fillTemplateFunction(inplaceMethodWithArgs, {\n        name: methodWithArg[2],\n        method: methodWithArg[0],\n        args: args\n      }));\n      var staticMethWithArgs = eval2(fillTemplateFunction(staticMethodWithArgs, { name: methodWithArg[2], args: args }));\n      for (i = 2; i < methodWithArg.length; i++) {\n        Matrix.prototype[methodWithArg[i]] = inplaceMethWithArgs;\n        Matrix[methodWithArg[i]] = staticMethWithArgs;\n      }\n    } else {\n      var tmplVar = {\n        name: methodWithArg[2],\n        args: args,\n        method: methodWithArg[0]\n      };\n      var inplaceMethod2 = eval2(fillTemplateFunction(inplaceMethodWithOneArg, tmplVar));\n      var inplaceMethodS = eval2(fillTemplateFunction(inplaceMethodWithOneArgScalar, tmplVar));\n      var inplaceMethodM = eval2(fillTemplateFunction(inplaceMethodWithOneArgMatrix, tmplVar));\n      var staticMethod2 = eval2(fillTemplateFunction(staticMethodWithOneArg, tmplVar));\n      for (i = 2; i < methodWithArg.length; i++) {\n        Matrix.prototype[methodWithArg[i]] = inplaceMethod2;\n        Matrix.prototype[`${methodWithArg[i]}M`] = inplaceMethodM;\n        Matrix.prototype[`${methodWithArg[i]}S`] = inplaceMethodS;\n        Matrix[methodWithArg[i]] = staticMethod2;\n      }\n    }\n  }\n\n  function fillTemplateFunction(template, values) {\n    for (var value in values) {\n      template = template.replace(new RegExp(`%${value}%`, 'g'), values[value]);\n    }\n    return template;\n  }\n\n  return Matrix;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/dc/cholesky.js\":\n/*!***************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/dc/cholesky.js ***!\n  \\***************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CholeskyDecomposition; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./node_modules/ml-matrix/src/index.js\");\n\n\n/**\n * @class CholeskyDecomposition\n * @link https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs\n * @param {Matrix} value\n */\nclass CholeskyDecomposition {\n  constructor(value) {\n    value = _index__WEBPACK_IMPORTED_MODULE_0__[\"WrapperMatrix2D\"].checkMatrix(value);\n    if (!value.isSymmetric()) {\n      throw new Error('Matrix is not symmetric');\n    }\n\n    var a = value;\n    var dimension = a.rows;\n    var l = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](dimension, dimension);\n    var positiveDefinite = true;\n    var i, j, k;\n\n    for (j = 0; j < dimension; j++) {\n      var Lrowj = l[j];\n      var d = 0;\n      for (k = 0; k < j; k++) {\n        var Lrowk = l[k];\n        var s = 0;\n        for (i = 0; i < k; i++) {\n          s += Lrowk[i] * Lrowj[i];\n        }\n        Lrowj[k] = s = (a.get(j, k) - s) / l[k][k];\n        d = d + s * s;\n      }\n\n      d = a.get(j, j) - d;\n\n      positiveDefinite &= d > 0;\n      l[j][j] = Math.sqrt(Math.max(d, 0));\n      for (k = j + 1; k < dimension; k++) {\n        l[j][k] = 0;\n      }\n    }\n\n    if (!positiveDefinite) {\n      throw new Error('Matrix is not positive definite');\n    }\n\n    this.L = l;\n  }\n\n  /**\n   *\n   * @param {Matrix} value\n   * @return {Matrix}\n   */\n  solve(value) {\n    value = _index__WEBPACK_IMPORTED_MODULE_0__[\"WrapperMatrix2D\"].checkMatrix(value);\n\n    var l = this.L;\n    var dimension = l.rows;\n\n    if (value.rows !== dimension) {\n      throw new Error('Matrix dimensions do not match');\n    }\n\n    var count = value.columns;\n    var B = value.clone();\n    var i, j, k;\n\n    for (k = 0; k < dimension; k++) {\n      for (j = 0; j < count; j++) {\n        for (i = 0; i < k; i++) {\n          B[k][j] -= B[i][j] * l[k][i];\n        }\n        B[k][j] /= l[k][k];\n      }\n    }\n\n    for (k = dimension - 1; k >= 0; k--) {\n      for (j = 0; j < count; j++) {\n        for (i = k + 1; i < dimension; i++) {\n          B[k][j] -= B[i][j] * l[i][k];\n        }\n        B[k][j] /= l[k][k];\n      }\n    }\n\n    return B;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get lowerTriangularMatrix() {\n    return this.L;\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/dc/evd.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/dc/evd.js ***!\n  \\**********************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EigenvalueDecomposition; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./node_modules/ml-matrix/src/index.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./node_modules/ml-matrix/src/dc/util.js\");\n\n\n\n\n/**\n * @class EigenvalueDecomposition\n * @link https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs\n * @param {Matrix} matrix\n * @param {object} [options]\n * @param {boolean} [options.assumeSymmetric=false]\n */\nclass EigenvalueDecomposition {\n  constructor(matrix, options = {}) {\n    const { assumeSymmetric = false } = options;\n\n    matrix = _index__WEBPACK_IMPORTED_MODULE_0__[\"WrapperMatrix2D\"].checkMatrix(matrix);\n    if (!matrix.isSquare()) {\n      throw new Error('Matrix is not a square matrix');\n    }\n\n    var n = matrix.columns;\n    var V = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"getFilled2DArray\"])(n, n, 0);\n    var d = new Array(n);\n    var e = new Array(n);\n    var value = matrix;\n    var i, j;\n\n    var isSymmetric = false;\n    if (assumeSymmetric) {\n      isSymmetric = true;\n    } else {\n      isSymmetric = matrix.isSymmetric();\n    }\n\n    if (isSymmetric) {\n      for (i = 0; i < n; i++) {\n        for (j = 0; j < n; j++) {\n          V[i][j] = value.get(i, j);\n        }\n      }\n      tred2(n, e, d, V);\n      tql2(n, e, d, V);\n    } else {\n      var H = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"getFilled2DArray\"])(n, n, 0);\n      var ort = new Array(n);\n      for (j = 0; j < n; j++) {\n        for (i = 0; i < n; i++) {\n          H[i][j] = value.get(i, j);\n        }\n      }\n      orthes(n, H, ort, V);\n      hqr2(n, e, d, V, H);\n    }\n\n    this.n = n;\n    this.e = e;\n    this.d = d;\n    this.V = V;\n  }\n\n  /**\n   *\n   * @return {Array<number>}\n   */\n  get realEigenvalues() {\n    return this.d;\n  }\n\n  /**\n   *\n   * @return {Array<number>}\n   */\n  get imaginaryEigenvalues() {\n    return this.e;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get eigenvectorMatrix() {\n    if (!_index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].isMatrix(this.V)) {\n      this.V = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](this.V);\n    }\n    return this.V;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get diagonalMatrix() {\n    var n = this.n;\n    var e = this.e;\n    var d = this.d;\n    var X = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](n, n);\n    var i, j;\n    for (i = 0; i < n; i++) {\n      for (j = 0; j < n; j++) {\n        X[i][j] = 0;\n      }\n      X[i][i] = d[i];\n      if (e[i] > 0) {\n        X[i][i + 1] = e[i];\n      } else if (e[i] < 0) {\n        X[i][i - 1] = e[i];\n      }\n    }\n    return X;\n  }\n}\n\nfunction tred2(n, e, d, V) {\n  var f, g, h, i, j, k, hh, scale;\n\n  for (j = 0; j < n; j++) {\n    d[j] = V[n - 1][j];\n  }\n\n  for (i = n - 1; i > 0; i--) {\n    scale = 0;\n    h = 0;\n    for (k = 0; k < i; k++) {\n      scale = scale + Math.abs(d[k]);\n    }\n\n    if (scale === 0) {\n      e[i] = d[i - 1];\n      for (j = 0; j < i; j++) {\n        d[j] = V[i - 1][j];\n        V[i][j] = 0;\n        V[j][i] = 0;\n      }\n    } else {\n      for (k = 0; k < i; k++) {\n        d[k] /= scale;\n        h += d[k] * d[k];\n      }\n\n      f = d[i - 1];\n      g = Math.sqrt(h);\n      if (f > 0) {\n        g = -g;\n      }\n\n      e[i] = scale * g;\n      h = h - f * g;\n      d[i - 1] = f - g;\n      for (j = 0; j < i; j++) {\n        e[j] = 0;\n      }\n\n      for (j = 0; j < i; j++) {\n        f = d[j];\n        V[j][i] = f;\n        g = e[j] + V[j][j] * f;\n        for (k = j + 1; k <= i - 1; k++) {\n          g += V[k][j] * d[k];\n          e[k] += V[k][j] * f;\n        }\n        e[j] = g;\n      }\n\n      f = 0;\n      for (j = 0; j < i; j++) {\n        e[j] /= h;\n        f += e[j] * d[j];\n      }\n\n      hh = f / (h + h);\n      for (j = 0; j < i; j++) {\n        e[j] -= hh * d[j];\n      }\n\n      for (j = 0; j < i; j++) {\n        f = d[j];\n        g = e[j];\n        for (k = j; k <= i - 1; k++) {\n          V[k][j] -= f * e[k] + g * d[k];\n        }\n        d[j] = V[i - 1][j];\n        V[i][j] = 0;\n      }\n    }\n    d[i] = h;\n  }\n\n  for (i = 0; i < n - 1; i++) {\n    V[n - 1][i] = V[i][i];\n    V[i][i] = 1;\n    h = d[i + 1];\n    if (h !== 0) {\n      for (k = 0; k <= i; k++) {\n        d[k] = V[k][i + 1] / h;\n      }\n\n      for (j = 0; j <= i; j++) {\n        g = 0;\n        for (k = 0; k <= i; k++) {\n          g += V[k][i + 1] * V[k][j];\n        }\n        for (k = 0; k <= i; k++) {\n          V[k][j] -= g * d[k];\n        }\n      }\n    }\n\n    for (k = 0; k <= i; k++) {\n      V[k][i + 1] = 0;\n    }\n  }\n\n  for (j = 0; j < n; j++) {\n    d[j] = V[n - 1][j];\n    V[n - 1][j] = 0;\n  }\n\n  V[n - 1][n - 1] = 1;\n  e[0] = 0;\n}\n\nfunction tql2(n, e, d, V) {\n  var g, h, i, j, k, l, m, p, r, dl1, c, c2, c3, el1, s, s2, iter;\n\n  for (i = 1; i < n; i++) {\n    e[i - 1] = e[i];\n  }\n\n  e[n - 1] = 0;\n\n  var f = 0;\n  var tst1 = 0;\n  var eps = Number.EPSILON;\n\n  for (l = 0; l < n; l++) {\n    tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));\n    m = l;\n    while (m < n) {\n      if (Math.abs(e[m]) <= eps * tst1) {\n        break;\n      }\n      m++;\n    }\n\n    if (m > l) {\n      iter = 0;\n      do {\n        iter = iter + 1;\n\n        g = d[l];\n        p = (d[l + 1] - g) / (2 * e[l]);\n        r = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(p, 1);\n        if (p < 0) {\n          r = -r;\n        }\n\n        d[l] = e[l] / (p + r);\n        d[l + 1] = e[l] * (p + r);\n        dl1 = d[l + 1];\n        h = g - d[l];\n        for (i = l + 2; i < n; i++) {\n          d[i] -= h;\n        }\n\n        f = f + h;\n\n        p = d[m];\n        c = 1;\n        c2 = c;\n        c3 = c;\n        el1 = e[l + 1];\n        s = 0;\n        s2 = 0;\n        for (i = m - 1; i >= l; i--) {\n          c3 = c2;\n          c2 = c;\n          s2 = s;\n          g = c * e[i];\n          h = c * p;\n          r = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(p, e[i]);\n          e[i + 1] = s * r;\n          s = e[i] / r;\n          c = p / r;\n          p = c * d[i] - s * g;\n          d[i + 1] = h + s * (c * g + s * d[i]);\n\n          for (k = 0; k < n; k++) {\n            h = V[k][i + 1];\n            V[k][i + 1] = s * V[k][i] + c * h;\n            V[k][i] = c * V[k][i] - s * h;\n          }\n        }\n\n        p = -s * s2 * c3 * el1 * e[l] / dl1;\n        e[l] = s * p;\n        d[l] = c * p;\n      } while (Math.abs(e[l]) > eps * tst1);\n    }\n    d[l] = d[l] + f;\n    e[l] = 0;\n  }\n\n  for (i = 0; i < n - 1; i++) {\n    k = i;\n    p = d[i];\n    for (j = i + 1; j < n; j++) {\n      if (d[j] < p) {\n        k = j;\n        p = d[j];\n      }\n    }\n\n    if (k !== i) {\n      d[k] = d[i];\n      d[i] = p;\n      for (j = 0; j < n; j++) {\n        p = V[j][i];\n        V[j][i] = V[j][k];\n        V[j][k] = p;\n      }\n    }\n  }\n}\n\nfunction orthes(n, H, ort, V) {\n  var low = 0;\n  var high = n - 1;\n  var f, g, h, i, j, m;\n  var scale;\n\n  for (m = low + 1; m <= high - 1; m++) {\n    scale = 0;\n    for (i = m; i <= high; i++) {\n      scale = scale + Math.abs(H[i][m - 1]);\n    }\n\n    if (scale !== 0) {\n      h = 0;\n      for (i = high; i >= m; i--) {\n        ort[i] = H[i][m - 1] / scale;\n        h += ort[i] * ort[i];\n      }\n\n      g = Math.sqrt(h);\n      if (ort[m] > 0) {\n        g = -g;\n      }\n\n      h = h - ort[m] * g;\n      ort[m] = ort[m] - g;\n\n      for (j = m; j < n; j++) {\n        f = 0;\n        for (i = high; i >= m; i--) {\n          f += ort[i] * H[i][j];\n        }\n\n        f = f / h;\n        for (i = m; i <= high; i++) {\n          H[i][j] -= f * ort[i];\n        }\n      }\n\n      for (i = 0; i <= high; i++) {\n        f = 0;\n        for (j = high; j >= m; j--) {\n          f += ort[j] * H[i][j];\n        }\n\n        f = f / h;\n        for (j = m; j <= high; j++) {\n          H[i][j] -= f * ort[j];\n        }\n      }\n\n      ort[m] = scale * ort[m];\n      H[m][m - 1] = scale * g;\n    }\n  }\n\n  for (i = 0; i < n; i++) {\n    for (j = 0; j < n; j++) {\n      V[i][j] = i === j ? 1 : 0;\n    }\n  }\n\n  for (m = high - 1; m >= low + 1; m--) {\n    if (H[m][m - 1] !== 0) {\n      for (i = m + 1; i <= high; i++) {\n        ort[i] = H[i][m - 1];\n      }\n\n      for (j = m; j <= high; j++) {\n        g = 0;\n        for (i = m; i <= high; i++) {\n          g += ort[i] * V[i][j];\n        }\n\n        g = g / ort[m] / H[m][m - 1];\n        for (i = m; i <= high; i++) {\n          V[i][j] += g * ort[i];\n        }\n      }\n    }\n  }\n}\n\nfunction hqr2(nn, e, d, V, H) {\n  var n = nn - 1;\n  var low = 0;\n  var high = nn - 1;\n  var eps = Number.EPSILON;\n  var exshift = 0;\n  var norm = 0;\n  var p = 0;\n  var q = 0;\n  var r = 0;\n  var s = 0;\n  var z = 0;\n  var iter = 0;\n  var i, j, k, l, m, t, w, x, y;\n  var ra, sa, vr, vi;\n  var notlast, cdivres;\n\n  for (i = 0; i < nn; i++) {\n    if (i < low || i > high) {\n      d[i] = H[i][i];\n      e[i] = 0;\n    }\n\n    for (j = Math.max(i - 1, 0); j < nn; j++) {\n      norm = norm + Math.abs(H[i][j]);\n    }\n  }\n\n  while (n >= low) {\n    l = n;\n    while (l > low) {\n      s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);\n      if (s === 0) {\n        s = norm;\n      }\n      if (Math.abs(H[l][l - 1]) < eps * s) {\n        break;\n      }\n      l--;\n    }\n\n    if (l === n) {\n      H[n][n] = H[n][n] + exshift;\n      d[n] = H[n][n];\n      e[n] = 0;\n      n--;\n      iter = 0;\n    } else if (l === n - 1) {\n      w = H[n][n - 1] * H[n - 1][n];\n      p = (H[n - 1][n - 1] - H[n][n]) / 2;\n      q = p * p + w;\n      z = Math.sqrt(Math.abs(q));\n      H[n][n] = H[n][n] + exshift;\n      H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;\n      x = H[n][n];\n\n      if (q >= 0) {\n        z = p >= 0 ? p + z : p - z;\n        d[n - 1] = x + z;\n        d[n] = d[n - 1];\n        if (z !== 0) {\n          d[n] = x - w / z;\n        }\n        e[n - 1] = 0;\n        e[n] = 0;\n        x = H[n][n - 1];\n        s = Math.abs(x) + Math.abs(z);\n        p = x / s;\n        q = z / s;\n        r = Math.sqrt(p * p + q * q);\n        p = p / r;\n        q = q / r;\n\n        for (j = n - 1; j < nn; j++) {\n          z = H[n - 1][j];\n          H[n - 1][j] = q * z + p * H[n][j];\n          H[n][j] = q * H[n][j] - p * z;\n        }\n\n        for (i = 0; i <= n; i++) {\n          z = H[i][n - 1];\n          H[i][n - 1] = q * z + p * H[i][n];\n          H[i][n] = q * H[i][n] - p * z;\n        }\n\n        for (i = low; i <= high; i++) {\n          z = V[i][n - 1];\n          V[i][n - 1] = q * z + p * V[i][n];\n          V[i][n] = q * V[i][n] - p * z;\n        }\n      } else {\n        d[n - 1] = x + p;\n        d[n] = x + p;\n        e[n - 1] = z;\n        e[n] = -z;\n      }\n\n      n = n - 2;\n      iter = 0;\n    } else {\n      x = H[n][n];\n      y = 0;\n      w = 0;\n      if (l < n) {\n        y = H[n - 1][n - 1];\n        w = H[n][n - 1] * H[n - 1][n];\n      }\n\n      if (iter === 10) {\n        exshift += x;\n        for (i = low; i <= n; i++) {\n          H[i][i] -= x;\n        }\n        s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);\n        x = y = 0.75 * s;\n        w = -0.4375 * s * s;\n      }\n\n      if (iter === 30) {\n        s = (y - x) / 2;\n        s = s * s + w;\n        if (s > 0) {\n          s = Math.sqrt(s);\n          if (y < x) {\n            s = -s;\n          }\n          s = x - w / ((y - x) / 2 + s);\n          for (i = low; i <= n; i++) {\n            H[i][i] -= s;\n          }\n          exshift += s;\n          x = y = w = 0.964;\n        }\n      }\n\n      iter = iter + 1;\n\n      m = n - 2;\n      while (m >= l) {\n        z = H[m][m];\n        r = x - z;\n        s = y - z;\n        p = (r * s - w) / H[m + 1][m] + H[m][m + 1];\n        q = H[m + 1][m + 1] - z - r - s;\n        r = H[m + 2][m + 1];\n        s = Math.abs(p) + Math.abs(q) + Math.abs(r);\n        p = p / s;\n        q = q / s;\n        r = r / s;\n        if (m === l) {\n          break;\n        }\n        if (\n          Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) <\n          eps *\n            (Math.abs(p) *\n              (Math.abs(H[m - 1][m - 1]) +\n                Math.abs(z) +\n                Math.abs(H[m + 1][m + 1])))\n        ) {\n          break;\n        }\n        m--;\n      }\n\n      for (i = m + 2; i <= n; i++) {\n        H[i][i - 2] = 0;\n        if (i > m + 2) {\n          H[i][i - 3] = 0;\n        }\n      }\n\n      for (k = m; k <= n - 1; k++) {\n        notlast = k !== n - 1;\n        if (k !== m) {\n          p = H[k][k - 1];\n          q = H[k + 1][k - 1];\n          r = notlast ? H[k + 2][k - 1] : 0;\n          x = Math.abs(p) + Math.abs(q) + Math.abs(r);\n          if (x !== 0) {\n            p = p / x;\n            q = q / x;\n            r = r / x;\n          }\n        }\n\n        if (x === 0) {\n          break;\n        }\n\n        s = Math.sqrt(p * p + q * q + r * r);\n        if (p < 0) {\n          s = -s;\n        }\n\n        if (s !== 0) {\n          if (k !== m) {\n            H[k][k - 1] = -s * x;\n          } else if (l !== m) {\n            H[k][k - 1] = -H[k][k - 1];\n          }\n\n          p = p + s;\n          x = p / s;\n          y = q / s;\n          z = r / s;\n          q = q / p;\n          r = r / p;\n\n          for (j = k; j < nn; j++) {\n            p = H[k][j] + q * H[k + 1][j];\n            if (notlast) {\n              p = p + r * H[k + 2][j];\n              H[k + 2][j] = H[k + 2][j] - p * z;\n            }\n\n            H[k][j] = H[k][j] - p * x;\n            H[k + 1][j] = H[k + 1][j] - p * y;\n          }\n\n          for (i = 0; i <= Math.min(n, k + 3); i++) {\n            p = x * H[i][k] + y * H[i][k + 1];\n            if (notlast) {\n              p = p + z * H[i][k + 2];\n              H[i][k + 2] = H[i][k + 2] - p * r;\n            }\n\n            H[i][k] = H[i][k] - p;\n            H[i][k + 1] = H[i][k + 1] - p * q;\n          }\n\n          for (i = low; i <= high; i++) {\n            p = x * V[i][k] + y * V[i][k + 1];\n            if (notlast) {\n              p = p + z * V[i][k + 2];\n              V[i][k + 2] = V[i][k + 2] - p * r;\n            }\n\n            V[i][k] = V[i][k] - p;\n            V[i][k + 1] = V[i][k + 1] - p * q;\n          }\n        }\n      }\n    }\n  }\n\n  if (norm === 0) {\n    return;\n  }\n\n  for (n = nn - 1; n >= 0; n--) {\n    p = d[n];\n    q = e[n];\n\n    if (q === 0) {\n      l = n;\n      H[n][n] = 1;\n      for (i = n - 1; i >= 0; i--) {\n        w = H[i][i] - p;\n        r = 0;\n        for (j = l; j <= n; j++) {\n          r = r + H[i][j] * H[j][n];\n        }\n\n        if (e[i] < 0) {\n          z = w;\n          s = r;\n        } else {\n          l = i;\n          if (e[i] === 0) {\n            H[i][n] = w !== 0 ? -r / w : -r / (eps * norm);\n          } else {\n            x = H[i][i + 1];\n            y = H[i + 1][i];\n            q = (d[i] - p) * (d[i] - p) + e[i] * e[i];\n            t = (x * s - z * r) / q;\n            H[i][n] = t;\n            H[i + 1][n] =\n              Math.abs(x) > Math.abs(z) ? (-r - w * t) / x : (-s - y * t) / z;\n          }\n\n          t = Math.abs(H[i][n]);\n          if (eps * t * t > 1) {\n            for (j = i; j <= n; j++) {\n              H[j][n] = H[j][n] / t;\n            }\n          }\n        }\n      }\n    } else if (q < 0) {\n      l = n - 1;\n\n      if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {\n        H[n - 1][n - 1] = q / H[n][n - 1];\n        H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];\n      } else {\n        cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);\n        H[n - 1][n - 1] = cdivres[0];\n        H[n - 1][n] = cdivres[1];\n      }\n\n      H[n][n - 1] = 0;\n      H[n][n] = 1;\n      for (i = n - 2; i >= 0; i--) {\n        ra = 0;\n        sa = 0;\n        for (j = l; j <= n; j++) {\n          ra = ra + H[i][j] * H[j][n - 1];\n          sa = sa + H[i][j] * H[j][n];\n        }\n\n        w = H[i][i] - p;\n\n        if (e[i] < 0) {\n          z = w;\n          r = ra;\n          s = sa;\n        } else {\n          l = i;\n          if (e[i] === 0) {\n            cdivres = cdiv(-ra, -sa, w, q);\n            H[i][n - 1] = cdivres[0];\n            H[i][n] = cdivres[1];\n          } else {\n            x = H[i][i + 1];\n            y = H[i + 1][i];\n            vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;\n            vi = (d[i] - p) * 2 * q;\n            if (vr === 0 && vi === 0) {\n              vr =\n                eps *\n                norm *\n                (Math.abs(w) +\n                  Math.abs(q) +\n                  Math.abs(x) +\n                  Math.abs(y) +\n                  Math.abs(z));\n            }\n            cdivres = cdiv(\n              x * r - z * ra + q * sa,\n              x * s - z * sa - q * ra,\n              vr,\n              vi\n            );\n            H[i][n - 1] = cdivres[0];\n            H[i][n] = cdivres[1];\n            if (Math.abs(x) > Math.abs(z) + Math.abs(q)) {\n              H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;\n              H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;\n            } else {\n              cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);\n              H[i + 1][n - 1] = cdivres[0];\n              H[i + 1][n] = cdivres[1];\n            }\n          }\n\n          t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));\n          if (eps * t * t > 1) {\n            for (j = i; j <= n; j++) {\n              H[j][n - 1] = H[j][n - 1] / t;\n              H[j][n] = H[j][n] / t;\n            }\n          }\n        }\n      }\n    }\n  }\n\n  for (i = 0; i < nn; i++) {\n    if (i < low || i > high) {\n      for (j = i; j < nn; j++) {\n        V[i][j] = H[i][j];\n      }\n    }\n  }\n\n  for (j = nn - 1; j >= low; j--) {\n    for (i = low; i <= high; i++) {\n      z = 0;\n      for (k = low; k <= Math.min(j, high); k++) {\n        z = z + V[i][k] * H[k][j];\n      }\n      V[i][j] = z;\n    }\n  }\n}\n\nfunction cdiv(xr, xi, yr, yi) {\n  var r, d;\n  if (Math.abs(yr) > Math.abs(yi)) {\n    r = yi / yr;\n    d = yr + r * yi;\n    return [(xr + r * xi) / d, (xi - r * xr) / d];\n  } else {\n    r = yr / yi;\n    d = yi + r * yr;\n    return [(r * xr + xi) / d, (r * xi - xr) / d];\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/dc/lu.js\":\n/*!*********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/dc/lu.js ***!\n  \\*********************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LuDecomposition; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./node_modules/ml-matrix/src/index.js\");\n\n\n/**\n * @class LuDecomposition\n * @link https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs\n * @param {Matrix} matrix\n */\nclass LuDecomposition {\n  constructor(matrix) {\n    matrix = _index__WEBPACK_IMPORTED_MODULE_0__[\"WrapperMatrix2D\"].checkMatrix(matrix);\n\n    var lu = matrix.clone();\n    var rows = lu.rows;\n    var columns = lu.columns;\n    var pivotVector = new Array(rows);\n    var pivotSign = 1;\n    var i, j, k, p, s, t, v;\n    var LUcolj, kmax;\n\n    for (i = 0; i < rows; i++) {\n      pivotVector[i] = i;\n    }\n\n    LUcolj = new Array(rows);\n\n    for (j = 0; j < columns; j++) {\n      for (i = 0; i < rows; i++) {\n        LUcolj[i] = lu.get(i, j);\n      }\n\n      for (i = 0; i < rows; i++) {\n        kmax = Math.min(i, j);\n        s = 0;\n        for (k = 0; k < kmax; k++) {\n          s += lu.get(i, k) * LUcolj[k];\n        }\n        LUcolj[i] -= s;\n        lu.set(i, j, LUcolj[i]);\n      }\n\n      p = j;\n      for (i = j + 1; i < rows; i++) {\n        if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {\n          p = i;\n        }\n      }\n\n      if (p !== j) {\n        for (k = 0; k < columns; k++) {\n          t = lu.get(p, k);\n          lu.set(p, k, lu.get(j, k));\n          lu.set(j, k, t);\n        }\n\n        v = pivotVector[p];\n        pivotVector[p] = pivotVector[j];\n        pivotVector[j] = v;\n\n        pivotSign = -pivotSign;\n      }\n\n      if (j < rows && lu.get(j, j) !== 0) {\n        for (i = j + 1; i < rows; i++) {\n          lu.set(i, j, lu.get(i, j) / lu.get(j, j));\n        }\n      }\n    }\n\n    this.LU = lu;\n    this.pivotVector = pivotVector;\n    this.pivotSign = pivotSign;\n  }\n\n  /**\n   *\n   * @return {boolean}\n   */\n  isSingular() {\n    var data = this.LU;\n    var col = data.columns;\n    for (var j = 0; j < col; j++) {\n      if (data[j][j] === 0) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  /**\n   *\n   * @param {Matrix} value\n   * @return {Matrix}\n   */\n  solve(value) {\n    value = _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].checkMatrix(value);\n\n    var lu = this.LU;\n    var rows = lu.rows;\n\n    if (rows !== value.rows) {\n      throw new Error('Invalid matrix dimensions');\n    }\n    if (this.isSingular()) {\n      throw new Error('LU matrix is singular');\n    }\n\n    var count = value.columns;\n    var X = value.subMatrixRow(this.pivotVector, 0, count - 1);\n    var columns = lu.columns;\n    var i, j, k;\n\n    for (k = 0; k < columns; k++) {\n      for (i = k + 1; i < columns; i++) {\n        for (j = 0; j < count; j++) {\n          X[i][j] -= X[k][j] * lu[i][k];\n        }\n      }\n    }\n    for (k = columns - 1; k >= 0; k--) {\n      for (j = 0; j < count; j++) {\n        X[k][j] /= lu[k][k];\n      }\n      for (i = 0; i < k; i++) {\n        for (j = 0; j < count; j++) {\n          X[i][j] -= X[k][j] * lu[i][k];\n        }\n      }\n    }\n    return X;\n  }\n\n  /**\n   *\n   * @return {number}\n   */\n  get determinant() {\n    var data = this.LU;\n    if (!data.isSquare()) {\n      throw new Error('Matrix must be square');\n    }\n    var determinant = this.pivotSign;\n    var col = data.columns;\n    for (var j = 0; j < col; j++) {\n      determinant *= data[j][j];\n    }\n    return determinant;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get lowerTriangularMatrix() {\n    var data = this.LU;\n    var rows = data.rows;\n    var columns = data.columns;\n    var X = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](rows, columns);\n    for (var i = 0; i < rows; i++) {\n      for (var j = 0; j < columns; j++) {\n        if (i > j) {\n          X[i][j] = data[i][j];\n        } else if (i === j) {\n          X[i][j] = 1;\n        } else {\n          X[i][j] = 0;\n        }\n      }\n    }\n    return X;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get upperTriangularMatrix() {\n    var data = this.LU;\n    var rows = data.rows;\n    var columns = data.columns;\n    var X = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](rows, columns);\n    for (var i = 0; i < rows; i++) {\n      for (var j = 0; j < columns; j++) {\n        if (i <= j) {\n          X[i][j] = data[i][j];\n        } else {\n          X[i][j] = 0;\n        }\n      }\n    }\n    return X;\n  }\n\n  /**\n   *\n   * @return {Array<number>}\n   */\n  get pivotPermutationVector() {\n    return this.pivotVector.slice();\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/dc/qr.js\":\n/*!*********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/dc/qr.js ***!\n  \\*********************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return QrDecomposition; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./node_modules/ml-matrix/src/index.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./node_modules/ml-matrix/src/dc/util.js\");\n\n\n\n\n/**\n * @class QrDecomposition\n * @link https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs\n * @param {Matrix} value\n */\nclass QrDecomposition {\n  constructor(value) {\n    value = _index__WEBPACK_IMPORTED_MODULE_0__[\"WrapperMatrix2D\"].checkMatrix(value);\n\n    var qr = value.clone();\n    var m = value.rows;\n    var n = value.columns;\n    var rdiag = new Array(n);\n    var i, j, k, s;\n\n    for (k = 0; k < n; k++) {\n      var nrm = 0;\n      for (i = k; i < m; i++) {\n        nrm = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(nrm, qr.get(i, k));\n      }\n      if (nrm !== 0) {\n        if (qr.get(k, k) < 0) {\n          nrm = -nrm;\n        }\n        for (i = k; i < m; i++) {\n          qr.set(i, k, qr.get(i, k) / nrm);\n        }\n        qr.set(k, k, qr.get(k, k) + 1);\n        for (j = k + 1; j < n; j++) {\n          s = 0;\n          for (i = k; i < m; i++) {\n            s += qr.get(i, k) * qr.get(i, j);\n          }\n          s = -s / qr.get(k, k);\n          for (i = k; i < m; i++) {\n            qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));\n          }\n        }\n      }\n      rdiag[k] = -nrm;\n    }\n\n    this.QR = qr;\n    this.Rdiag = rdiag;\n  }\n\n  /**\n   * Solve a problem of least square (Ax=b) by using the QR decomposition. Useful when A is rectangular, but not working when A is singular.\n   * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :\n   * var qr = QrDecomposition(A);\n   * var x = qr.solve(b);\n   * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)\n   * @return {Matrix} - The vector x\n   */\n  solve(value) {\n    value = _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].checkMatrix(value);\n\n    var qr = this.QR;\n    var m = qr.rows;\n\n    if (value.rows !== m) {\n      throw new Error('Matrix row dimensions must agree');\n    }\n    if (!this.isFullRank()) {\n      throw new Error('Matrix is rank deficient');\n    }\n\n    var count = value.columns;\n    var X = value.clone();\n    var n = qr.columns;\n    var i, j, k, s;\n\n    for (k = 0; k < n; k++) {\n      for (j = 0; j < count; j++) {\n        s = 0;\n        for (i = k; i < m; i++) {\n          s += qr[i][k] * X[i][j];\n        }\n        s = -s / qr[k][k];\n        for (i = k; i < m; i++) {\n          X[i][j] += s * qr[i][k];\n        }\n      }\n    }\n    for (k = n - 1; k >= 0; k--) {\n      for (j = 0; j < count; j++) {\n        X[k][j] /= this.Rdiag[k];\n      }\n      for (i = 0; i < k; i++) {\n        for (j = 0; j < count; j++) {\n          X[i][j] -= X[k][j] * qr[i][k];\n        }\n      }\n    }\n\n    return X.subMatrix(0, n - 1, 0, count - 1);\n  }\n\n  /**\n   *\n   * @return {boolean}\n   */\n  isFullRank() {\n    var columns = this.QR.columns;\n    for (var i = 0; i < columns; i++) {\n      if (this.Rdiag[i] === 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get upperTriangularMatrix() {\n    var qr = this.QR;\n    var n = qr.columns;\n    var X = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](n, n);\n    var i, j;\n    for (i = 0; i < n; i++) {\n      for (j = 0; j < n; j++) {\n        if (i < j) {\n          X[i][j] = qr[i][j];\n        } else if (i === j) {\n          X[i][j] = this.Rdiag[i];\n        } else {\n          X[i][j] = 0;\n        }\n      }\n    }\n    return X;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get orthogonalMatrix() {\n    var qr = this.QR;\n    var rows = qr.rows;\n    var columns = qr.columns;\n    var X = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](rows, columns);\n    var i, j, k, s;\n\n    for (k = columns - 1; k >= 0; k--) {\n      for (i = 0; i < rows; i++) {\n        X[i][k] = 0;\n      }\n      X[k][k] = 1;\n      for (j = k; j < columns; j++) {\n        if (qr[k][k] !== 0) {\n          s = 0;\n          for (i = k; i < rows; i++) {\n            s += qr[i][k] * X[i][j];\n          }\n\n          s = -s / qr[k][k];\n\n          for (i = k; i < rows; i++) {\n            X[i][j] += s * qr[i][k];\n          }\n        }\n      }\n    }\n    return X;\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/dc/svd.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/dc/svd.js ***!\n  \\**********************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SingularValueDecomposition; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./node_modules/ml-matrix/src/index.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./node_modules/ml-matrix/src/dc/util.js\");\n\n\n\n\n/**\n * @class SingularValueDecomposition\n * @see https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs\n * @param {Matrix} value\n * @param {object} [options]\n * @param {boolean} [options.computeLeftSingularVectors=true]\n * @param {boolean} [options.computeRightSingularVectors=true]\n * @param {boolean} [options.autoTranspose=false]\n */\nclass SingularValueDecomposition {\n  constructor(value, options = {}) {\n    value = _index__WEBPACK_IMPORTED_MODULE_0__[\"WrapperMatrix2D\"].checkMatrix(value);\n\n    var m = value.rows;\n    var n = value.columns;\n\n    const {\n      computeLeftSingularVectors = true,\n      computeRightSingularVectors = true,\n      autoTranspose = false\n    } = options;\n\n    var wantu = Boolean(computeLeftSingularVectors);\n    var wantv = Boolean(computeRightSingularVectors);\n\n    var swapped = false;\n    var a;\n    if (m < n) {\n      if (!autoTranspose) {\n        a = value.clone();\n        // eslint-disable-next-line no-console\n        console.warn(\n          'Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose'\n        );\n      } else {\n        a = value.transpose();\n        m = a.rows;\n        n = a.columns;\n        swapped = true;\n        var aux = wantu;\n        wantu = wantv;\n        wantv = aux;\n      }\n    } else {\n      a = value.clone();\n    }\n\n    var nu = Math.min(m, n);\n    var ni = Math.min(m + 1, n);\n    var s = new Array(ni);\n    var U = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"getFilled2DArray\"])(m, nu, 0);\n    var V = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"getFilled2DArray\"])(n, n, 0);\n\n    var e = new Array(n);\n    var work = new Array(m);\n\n    var si = new Array(ni);\n    for (let i = 0; i < ni; i++) si[i] = i;\n\n    var nct = Math.min(m - 1, n);\n    var nrt = Math.max(0, Math.min(n - 2, m));\n    var mrc = Math.max(nct, nrt);\n\n    for (let k = 0; k < mrc; k++) {\n      if (k < nct) {\n        s[k] = 0;\n        for (let i = k; i < m; i++) {\n          s[k] = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(s[k], a[i][k]);\n        }\n        if (s[k] !== 0) {\n          if (a[k][k] < 0) {\n            s[k] = -s[k];\n          }\n          for (let i = k; i < m; i++) {\n            a[i][k] /= s[k];\n          }\n          a[k][k] += 1;\n        }\n        s[k] = -s[k];\n      }\n\n      for (let j = k + 1; j < n; j++) {\n        if (k < nct && s[k] !== 0) {\n          let t = 0;\n          for (let i = k; i < m; i++) {\n            t += a[i][k] * a[i][j];\n          }\n          t = -t / a[k][k];\n          for (let i = k; i < m; i++) {\n            a[i][j] += t * a[i][k];\n          }\n        }\n        e[j] = a[k][j];\n      }\n\n      if (wantu && k < nct) {\n        for (let i = k; i < m; i++) {\n          U[i][k] = a[i][k];\n        }\n      }\n\n      if (k < nrt) {\n        e[k] = 0;\n        for (let i = k + 1; i < n; i++) {\n          e[k] = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(e[k], e[i]);\n        }\n        if (e[k] !== 0) {\n          if (e[k + 1] < 0) {\n            e[k] = 0 - e[k];\n          }\n          for (let i = k + 1; i < n; i++) {\n            e[i] /= e[k];\n          }\n          e[k + 1] += 1;\n        }\n        e[k] = -e[k];\n        if (k + 1 < m && e[k] !== 0) {\n          for (let i = k + 1; i < m; i++) {\n            work[i] = 0;\n          }\n          for (let i = k + 1; i < m; i++) {\n            for (let j = k + 1; j < n; j++) {\n              work[i] += e[j] * a[i][j];\n            }\n          }\n          for (let j = k + 1; j < n; j++) {\n            let t = -e[j] / e[k + 1];\n            for (let i = k + 1; i < m; i++) {\n              a[i][j] += t * work[i];\n            }\n          }\n        }\n        if (wantv) {\n          for (let i = k + 1; i < n; i++) {\n            V[i][k] = e[i];\n          }\n        }\n      }\n    }\n\n    let p = Math.min(n, m + 1);\n    if (nct < n) {\n      s[nct] = a[nct][nct];\n    }\n    if (m < p) {\n      s[p - 1] = 0;\n    }\n    if (nrt + 1 < p) {\n      e[nrt] = a[nrt][p - 1];\n    }\n    e[p - 1] = 0;\n\n    if (wantu) {\n      for (let j = nct; j < nu; j++) {\n        for (let i = 0; i < m; i++) {\n          U[i][j] = 0;\n        }\n        U[j][j] = 1;\n      }\n      for (let k = nct - 1; k >= 0; k--) {\n        if (s[k] !== 0) {\n          for (let j = k + 1; j < nu; j++) {\n            let t = 0;\n            for (let i = k; i < m; i++) {\n              t += U[i][k] * U[i][j];\n            }\n            t = -t / U[k][k];\n            for (let i = k; i < m; i++) {\n              U[i][j] += t * U[i][k];\n            }\n          }\n          for (let i = k; i < m; i++) {\n            U[i][k] = -U[i][k];\n          }\n          U[k][k] = 1 + U[k][k];\n          for (let i = 0; i < k - 1; i++) {\n            U[i][k] = 0;\n          }\n        } else {\n          for (let i = 0; i < m; i++) {\n            U[i][k] = 0;\n          }\n          U[k][k] = 1;\n        }\n      }\n    }\n\n    if (wantv) {\n      for (let k = n - 1; k >= 0; k--) {\n        if (k < nrt && e[k] !== 0) {\n          for (let j = k + 1; j < n; j++) {\n            let t = 0;\n            for (let i = k + 1; i < n; i++) {\n              t += V[i][k] * V[i][j];\n            }\n            t = -t / V[k + 1][k];\n            for (let i = k + 1; i < n; i++) {\n              V[i][j] += t * V[i][k];\n            }\n          }\n        }\n        for (let i = 0; i < n; i++) {\n          V[i][k] = 0;\n        }\n        V[k][k] = 1;\n      }\n    }\n\n    var pp = p - 1;\n    var iter = 0;\n    var eps = Number.EPSILON;\n    while (p > 0) {\n      let k, kase;\n      for (k = p - 2; k >= -1; k--) {\n        if (k === -1) {\n          break;\n        }\n        const alpha =\n          Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));\n        if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {\n          e[k] = 0;\n          break;\n        }\n      }\n      if (k === p - 2) {\n        kase = 4;\n      } else {\n        let ks;\n        for (ks = p - 1; ks >= k; ks--) {\n          if (ks === k) {\n            break;\n          }\n          let t =\n            (ks !== p ? Math.abs(e[ks]) : 0) +\n            (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);\n          if (Math.abs(s[ks]) <= eps * t) {\n            s[ks] = 0;\n            break;\n          }\n        }\n        if (ks === k) {\n          kase = 3;\n        } else if (ks === p - 1) {\n          kase = 1;\n        } else {\n          kase = 2;\n          k = ks;\n        }\n      }\n\n      k++;\n\n      switch (kase) {\n        case 1: {\n          let f = e[p - 2];\n          e[p - 2] = 0;\n          for (let j = p - 2; j >= k; j--) {\n            let t = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(s[j], f);\n            let cs = s[j] / t;\n            let sn = f / t;\n            s[j] = t;\n            if (j !== k) {\n              f = -sn * e[j - 1];\n              e[j - 1] = cs * e[j - 1];\n            }\n            if (wantv) {\n              for (let i = 0; i < n; i++) {\n                t = cs * V[i][j] + sn * V[i][p - 1];\n                V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];\n                V[i][j] = t;\n              }\n            }\n          }\n          break;\n        }\n        case 2: {\n          let f = e[k - 1];\n          e[k - 1] = 0;\n          for (let j = k; j < p; j++) {\n            let t = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(s[j], f);\n            let cs = s[j] / t;\n            let sn = f / t;\n            s[j] = t;\n            f = -sn * e[j];\n            e[j] = cs * e[j];\n            if (wantu) {\n              for (let i = 0; i < m; i++) {\n                t = cs * U[i][j] + sn * U[i][k - 1];\n                U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];\n                U[i][j] = t;\n              }\n            }\n          }\n          break;\n        }\n        case 3: {\n          const scale = Math.max(\n            Math.abs(s[p - 1]),\n            Math.abs(s[p - 2]),\n            Math.abs(e[p - 2]),\n            Math.abs(s[k]),\n            Math.abs(e[k])\n          );\n          const sp = s[p - 1] / scale;\n          const spm1 = s[p - 2] / scale;\n          const epm1 = e[p - 2] / scale;\n          const sk = s[k] / scale;\n          const ek = e[k] / scale;\n          const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;\n          const c = sp * epm1 * (sp * epm1);\n          let shift = 0;\n          if (b !== 0 || c !== 0) {\n            if (b < 0) {\n              shift = 0 - Math.sqrt(b * b + c);\n            } else {\n              shift = Math.sqrt(b * b + c);\n            }\n            shift = c / (b + shift);\n          }\n          let f = (sk + sp) * (sk - sp) + shift;\n          let g = sk * ek;\n          for (let j = k; j < p - 1; j++) {\n            let t = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(f, g);\n            if (t === 0) t = Number.MIN_VALUE;\n            let cs = f / t;\n            let sn = g / t;\n            if (j !== k) {\n              e[j - 1] = t;\n            }\n            f = cs * s[j] + sn * e[j];\n            e[j] = cs * e[j] - sn * s[j];\n            g = sn * s[j + 1];\n            s[j + 1] = cs * s[j + 1];\n            if (wantv) {\n              for (let i = 0; i < n; i++) {\n                t = cs * V[i][j] + sn * V[i][j + 1];\n                V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];\n                V[i][j] = t;\n              }\n            }\n            t = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"hypotenuse\"])(f, g);\n            if (t === 0) t = Number.MIN_VALUE;\n            cs = f / t;\n            sn = g / t;\n            s[j] = t;\n            f = cs * e[j] + sn * s[j + 1];\n            s[j + 1] = -sn * e[j] + cs * s[j + 1];\n            g = sn * e[j + 1];\n            e[j + 1] = cs * e[j + 1];\n            if (wantu && j < m - 1) {\n              for (let i = 0; i < m; i++) {\n                t = cs * U[i][j] + sn * U[i][j + 1];\n                U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];\n                U[i][j] = t;\n              }\n            }\n          }\n          e[p - 2] = f;\n          iter = iter + 1;\n          break;\n        }\n        case 4: {\n          if (s[k] <= 0) {\n            s[k] = s[k] < 0 ? -s[k] : 0;\n            if (wantv) {\n              for (let i = 0; i <= pp; i++) {\n                V[i][k] = -V[i][k];\n              }\n            }\n          }\n          while (k < pp) {\n            if (s[k] >= s[k + 1]) {\n              break;\n            }\n            let t = s[k];\n            s[k] = s[k + 1];\n            s[k + 1] = t;\n            if (wantv && k < n - 1) {\n              for (let i = 0; i < n; i++) {\n                t = V[i][k + 1];\n                V[i][k + 1] = V[i][k];\n                V[i][k] = t;\n              }\n            }\n            if (wantu && k < m - 1) {\n              for (let i = 0; i < m; i++) {\n                t = U[i][k + 1];\n                U[i][k + 1] = U[i][k];\n                U[i][k] = t;\n              }\n            }\n            k++;\n          }\n          iter = 0;\n          p--;\n          break;\n        }\n        // no default\n      }\n    }\n\n    if (swapped) {\n      var tmp = V;\n      V = U;\n      U = tmp;\n    }\n\n    this.m = m;\n    this.n = n;\n    this.s = s;\n    this.U = U;\n    this.V = V;\n  }\n\n  /**\n   * Solve a problem of least square (Ax=b) by using the SVD. Useful when A is singular. When A is not singular, it would be better to use qr.solve(value).\n   * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :\n   * var svd = SingularValueDecomposition(A);\n   * var x = svd.solve(b);\n   * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)\n   * @return {Matrix} - The vector x\n   */\n  solve(value) {\n    var Y = value;\n    var e = this.threshold;\n    var scols = this.s.length;\n    var Ls = _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].zeros(scols, scols);\n\n    for (let i = 0; i < scols; i++) {\n      if (Math.abs(this.s[i]) <= e) {\n        Ls[i][i] = 0;\n      } else {\n        Ls[i][i] = 1 / this.s[i];\n      }\n    }\n\n    var U = this.U;\n    var V = this.rightSingularVectors;\n\n    var VL = V.mmul(Ls);\n    var vrows = V.rows;\n    var urows = U.length;\n    var VLU = _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].zeros(vrows, urows);\n\n    for (let i = 0; i < vrows; i++) {\n      for (let j = 0; j < urows; j++) {\n        let sum = 0;\n        for (let k = 0; k < scols; k++) {\n          sum += VL[i][k] * U[j][k];\n        }\n        VLU[i][j] = sum;\n      }\n    }\n\n    return VLU.mmul(Y);\n  }\n\n  /**\n   *\n   * @param {Array<number>} value\n   * @return {Matrix}\n   */\n  solveForDiagonal(value) {\n    return this.solve(_index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].diag(value));\n  }\n\n  /**\n   * Get the inverse of the matrix. We compute the inverse of a matrix using SVD when this matrix is singular or ill-conditioned. Example :\n   * var svd = SingularValueDecomposition(A);\n   * var inverseA = svd.inverse();\n   * @return {Matrix} - The approximation of the inverse of the matrix\n   */\n  inverse() {\n    var V = this.V;\n    var e = this.threshold;\n    var vrows = V.length;\n    var vcols = V[0].length;\n    var X = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](vrows, this.s.length);\n\n    for (let i = 0; i < vrows; i++) {\n      for (let j = 0; j < vcols; j++) {\n        if (Math.abs(this.s[j]) > e) {\n          X[i][j] = V[i][j] / this.s[j];\n        } else {\n          X[i][j] = 0;\n        }\n      }\n    }\n\n    var U = this.U;\n\n    var urows = U.length;\n    var ucols = U[0].length;\n    var Y = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](vrows, urows);\n\n    for (let i = 0; i < vrows; i++) {\n      for (let j = 0; j < urows; j++) {\n        let sum = 0;\n        for (let k = 0; k < ucols; k++) {\n          sum += X[i][k] * U[j][k];\n        }\n        Y[i][j] = sum;\n      }\n    }\n\n    return Y;\n  }\n\n  /**\n   *\n   * @return {number}\n   */\n  get condition() {\n    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];\n  }\n\n  /**\n   *\n   * @return {number}\n   */\n  get norm2() {\n    return this.s[0];\n  }\n\n  /**\n   *\n   * @return {number}\n   */\n  get rank() {\n    var tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;\n    var r = 0;\n    var s = this.s;\n    for (var i = 0, ii = s.length; i < ii; i++) {\n      if (s[i] > tol) {\n        r++;\n      }\n    }\n    return r;\n  }\n\n  /**\n   *\n   * @return {Array<number>}\n   */\n  get diagonal() {\n    return this.s;\n  }\n\n  /**\n   *\n   * @return {number}\n   */\n  get threshold() {\n    return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get leftSingularVectors() {\n    if (!_index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].isMatrix(this.U)) {\n      this.U = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](this.U);\n    }\n    return this.U;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get rightSingularVectors() {\n    if (!_index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].isMatrix(this.V)) {\n      this.V = new _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"](this.V);\n    }\n    return this.V;\n  }\n\n  /**\n   *\n   * @return {Matrix}\n   */\n  get diagonalMatrix() {\n    return _index__WEBPACK_IMPORTED_MODULE_0__[\"Matrix\"].diag(this.s);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/dc/util.js\":\n/*!***********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/dc/util.js ***!\n  \\***********************************************/\n/*! exports provided: hypotenuse, getFilled2DArray */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hypotenuse\", function() { return hypotenuse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFilled2DArray\", function() { return getFilled2DArray; });\nfunction hypotenuse(a, b) {\n  var r = 0;\n  if (Math.abs(a) > Math.abs(b)) {\n    r = b / a;\n    return Math.abs(a) * Math.sqrt(1 + r * r);\n  }\n  if (b !== 0) {\n    r = a / b;\n    return Math.abs(b) * Math.sqrt(1 + r * r);\n  }\n  return 0;\n}\n\nfunction getFilled2DArray(rows, columns, value) {\n  var array = new Array(rows);\n  for (var i = 0; i < rows; i++) {\n    array[i] = new Array(columns);\n    for (var j = 0; j < columns; j++) {\n      array[i][j] = value;\n    }\n  }\n  return array;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/decompositions.js\":\n/*!******************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/decompositions.js ***!\n  \\******************************************************/\n/*! exports provided: inverse, solve */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"inverse\", function() { return inverse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solve\", function() { return solve; });\n/* harmony import */ var _dc_lu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dc/lu */ \"./node_modules/ml-matrix/src/dc/lu.js\");\n/* harmony import */ var _dc_qr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dc/qr */ \"./node_modules/ml-matrix/src/dc/qr.js\");\n/* harmony import */ var _dc_svd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dc/svd */ \"./node_modules/ml-matrix/src/dc/svd.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index */ \"./node_modules/ml-matrix/src/index.js\");\n\n\n\n\n\n\n/**\n * Computes the inverse of a Matrix\n * @param {Matrix} matrix\n * @param {boolean} [useSVD=false]\n * @return {Matrix}\n */\nfunction inverse(matrix, useSVD = false) {\n  matrix = _index__WEBPACK_IMPORTED_MODULE_3__[\"WrapperMatrix2D\"].checkMatrix(matrix);\n  if (useSVD) {\n    return new _dc_svd__WEBPACK_IMPORTED_MODULE_2__[\"default\"](matrix).inverse();\n  } else {\n    return solve(matrix, _index__WEBPACK_IMPORTED_MODULE_3__[\"Matrix\"].eye(matrix.rows));\n  }\n}\n\n/**\n *\n * @param {Matrix} leftHandSide\n * @param {Matrix} rightHandSide\n * @param {boolean} [useSVD = false]\n * @return {Matrix}\n */\nfunction solve(leftHandSide, rightHandSide, useSVD = false) {\n  leftHandSide = _index__WEBPACK_IMPORTED_MODULE_3__[\"WrapperMatrix2D\"].checkMatrix(leftHandSide);\n  rightHandSide = _index__WEBPACK_IMPORTED_MODULE_3__[\"WrapperMatrix2D\"].checkMatrix(rightHandSide);\n  if (useSVD) {\n    return new _dc_svd__WEBPACK_IMPORTED_MODULE_2__[\"default\"](leftHandSide).solve(rightHandSide);\n  } else {\n    return leftHandSide.isSquare()\n      ? new _dc_lu__WEBPACK_IMPORTED_MODULE_0__[\"default\"](leftHandSide).solve(rightHandSide)\n      : new _dc_qr__WEBPACK_IMPORTED_MODULE_1__[\"default\"](leftHandSide).solve(rightHandSide);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/index.js\":\n/*!*********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/index.js ***!\n  \\*********************************************/\n/*! exports provided: default, Matrix, abstractMatrix, wrap, WrapperMatrix2D, WrapperMatrix1D, solve, inverse, linearDependencies, SingularValueDecomposition, SVD, EigenvalueDecomposition, EVD, CholeskyDecomposition, CHO, LuDecomposition, LU, QrDecomposition, QR */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ \"./node_modules/ml-matrix/src/matrix.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _matrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Matrix\", function() { return _matrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _abstractMatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstractMatrix */ \"./node_modules/ml-matrix/src/abstractMatrix.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"abstractMatrix\", function() { return _abstractMatrix__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _wrap_wrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wrap/wrap */ \"./node_modules/ml-matrix/src/wrap/wrap.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"wrap\", function() { return _wrap_wrap__WEBPACK_IMPORTED_MODULE_2__[\"wrap\"]; });\n\n/* harmony import */ var _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wrap/WrapperMatrix2D */ \"./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WrapperMatrix2D\", function() { return _wrap_WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _wrap_WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wrap/WrapperMatrix1D */ \"./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WrapperMatrix1D\", function() { return _wrap_WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _decompositions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./decompositions */ \"./node_modules/ml-matrix/src/decompositions.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"solve\", function() { return _decompositions__WEBPACK_IMPORTED_MODULE_5__[\"solve\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"inverse\", function() { return _decompositions__WEBPACK_IMPORTED_MODULE_5__[\"inverse\"]; });\n\n/* harmony import */ var _linearDependencies__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./linearDependencies */ \"./node_modules/ml-matrix/src/linearDependencies.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"linearDependencies\", function() { return _linearDependencies__WEBPACK_IMPORTED_MODULE_6__[\"linearDependencies\"]; });\n\n/* harmony import */ var _dc_svd_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dc/svd.js */ \"./node_modules/ml-matrix/src/dc/svd.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SingularValueDecomposition\", function() { return _dc_svd_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SVD\", function() { return _dc_svd_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _dc_evd_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dc/evd.js */ \"./node_modules/ml-matrix/src/dc/evd.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"EigenvalueDecomposition\", function() { return _dc_evd_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"EVD\", function() { return _dc_evd_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _dc_cholesky_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dc/cholesky.js */ \"./node_modules/ml-matrix/src/dc/cholesky.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CholeskyDecomposition\", function() { return _dc_cholesky_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CHO\", function() { return _dc_cholesky_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _dc_lu_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dc/lu.js */ \"./node_modules/ml-matrix/src/dc/lu.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LuDecomposition\", function() { return _dc_lu_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LU\", function() { return _dc_lu_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _dc_qr_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dc/qr.js */ \"./node_modules/ml-matrix/src/dc/qr.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"QrDecomposition\", function() { return _dc_qr_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"QR\", function() { return _dc_qr_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/linearDependencies.js\":\n/*!**********************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/linearDependencies.js ***!\n  \\**********************************************************/\n/*! exports provided: linearDependencies */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linearDependencies\", function() { return linearDependencies; });\n/* harmony import */ var ml_array_max__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ml-array-max */ \"./node_modules/ml-array-max/src/index.js\");\n/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ \"./node_modules/ml-matrix/src/matrix.js\");\n/* harmony import */ var _dc_svd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dc/svd */ \"./node_modules/ml-matrix/src/dc/svd.js\");\n\n\n\n\n\n// function used by rowsDependencies\nfunction xrange(n, exception) {\n  var range = [];\n  for (var i = 0; i < n; i++) {\n    if (i !== exception) {\n      range.push(i);\n    }\n  }\n  return range;\n}\n\n// function used by rowsDependencies\nfunction dependenciesOneRow(\n  error,\n  matrix,\n  index,\n  thresholdValue = 10e-10,\n  thresholdError = 10e-10\n) {\n  if (error > thresholdError) {\n    return new Array(matrix.rows + 1).fill(0);\n  } else {\n    var returnArray = matrix.addRow(index, [0]);\n    for (var i = 0; i < returnArray.rows; i++) {\n      if (Math.abs(returnArray.get(i, 0)) < thresholdValue) {\n        returnArray.set(i, 0, 0);\n      }\n    }\n    return returnArray.to1DArray();\n  }\n}\n\n/**\n * Creates a matrix which represents the dependencies between rows.\n * If a row is a linear combination of others rows, the result will be a row with the coefficients of this combination.\n * For example : for A = [[2, 0, 0, 1], [0, 1, 6, 0], [0, 3, 0, 1], [0, 0, 1, 0], [0, 1, 2, 0]], the result will be [[0, 0, 0, 0, 0], [0, 0, 0, 4, 1], [0, 0, 0, 0, 0], [0, 0.25, 0, 0, -0.25], [0, 1, 0, -4, 0]]\n * @param {Matrix} matrix\n * @param {Object} [options] includes thresholdValue and thresholdError.\n * @param {number} [options.thresholdValue = 10e-10] If an absolute value is inferior to this threshold, it will equals zero.\n * @param {number} [options.thresholdError = 10e-10] If the error is inferior to that threshold, the linear combination found is accepted and the row is dependent from other rows.\n * @return {Matrix} the matrix which represents the dependencies between rows.\n */\n\nfunction linearDependencies(matrix, options = {}) {\n  const { thresholdValue = 10e-10, thresholdError = 10e-10 } = options;\n\n  var n = matrix.rows;\n  var results = new _matrix__WEBPACK_IMPORTED_MODULE_1__[\"default\"](n, n);\n\n  for (var i = 0; i < n; i++) {\n    var b = _matrix__WEBPACK_IMPORTED_MODULE_1__[\"default\"].columnVector(matrix.getRow(i));\n    var Abis = matrix.subMatrixRow(xrange(n, i)).transposeView();\n    var svd = new _dc_svd__WEBPACK_IMPORTED_MODULE_2__[\"default\"](Abis);\n    var x = svd.solve(b);\n    var error = Object(ml_array_max__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n      _matrix__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sub(b, Abis.mmul(x))\n        .abs()\n        .to1DArray()\n    );\n    results.setRow(\n      i,\n      dependenciesOneRow(error, x, i, thresholdValue, thresholdError)\n    );\n  }\n  return results;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/matrix.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/matrix.js ***!\n  \\**********************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Matrix; });\n/* harmony import */ var _abstractMatrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstractMatrix */ \"./node_modules/ml-matrix/src/abstractMatrix.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./node_modules/ml-matrix/src/util.js\");\n\n\n\nclass Matrix extends Object(_abstractMatrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Array) {\n  constructor(nRows, nColumns) {\n    var i;\n    if (arguments.length === 1 && typeof nRows === 'number') {\n      return new Array(nRows);\n    }\n    if (Matrix.isMatrix(nRows)) {\n      return nRows.clone();\n    } else if (Number.isInteger(nRows) && nRows > 0) {\n      // Create an empty matrix\n      super(nRows);\n      if (Number.isInteger(nColumns) && nColumns > 0) {\n        for (i = 0; i < nRows; i++) {\n          this[i] = new Array(nColumns);\n        }\n      } else {\n        throw new TypeError('nColumns must be a positive integer');\n      }\n    } else if (Array.isArray(nRows)) {\n      // Copy the values from the 2D array\n      const matrix = nRows;\n      nRows = matrix.length;\n      nColumns = matrix[0].length;\n      if (typeof nColumns !== 'number' || nColumns === 0) {\n        throw new TypeError(\n          'Data must be a 2D array with at least one element'\n        );\n      }\n      super(nRows);\n      for (i = 0; i < nRows; i++) {\n        if (matrix[i].length !== nColumns) {\n          throw new RangeError('Inconsistent array dimensions');\n        }\n        this[i] = [].concat(matrix[i]);\n      }\n    } else {\n      throw new TypeError(\n        'First argument must be a positive number or an array'\n      );\n    }\n    this.rows = nRows;\n    this.columns = nColumns;\n    return this;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this[rowIndex][columnIndex] = value;\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this[rowIndex][columnIndex];\n  }\n\n  /**\n   * Removes a row from the given index\n   * @param {number} index - Row index\n   * @return {Matrix} this\n   */\n  removeRow(index) {\n    Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"checkRowIndex\"])(this, index);\n    if (this.rows === 1) {\n      throw new RangeError('A matrix cannot have less than one row');\n    }\n    this.splice(index, 1);\n    this.rows -= 1;\n    return this;\n  }\n\n  /**\n   * Adds a row at the given index\n   * @param {number} [index = this.rows] - Row index\n   * @param {Array|Matrix} array - Array or vector\n   * @return {Matrix} this\n   */\n  addRow(index, array) {\n    if (array === undefined) {\n      array = index;\n      index = this.rows;\n    }\n    Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"checkRowIndex\"])(this, index, true);\n    array = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"checkRowVector\"])(this, array, true);\n    this.splice(index, 0, array);\n    this.rows += 1;\n    return this;\n  }\n\n  /**\n   * Removes a column from the given index\n   * @param {number} index - Column index\n   * @return {Matrix} this\n   */\n  removeColumn(index) {\n    Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"checkColumnIndex\"])(this, index);\n    if (this.columns === 1) {\n      throw new RangeError('A matrix cannot have less than one column');\n    }\n    for (var i = 0; i < this.rows; i++) {\n      this[i].splice(index, 1);\n    }\n    this.columns -= 1;\n    return this;\n  }\n\n  /**\n   * Adds a column at the given index\n   * @param {number} [index = this.columns] - Column index\n   * @param {Array|Matrix} array - Array or vector\n   * @return {Matrix} this\n   */\n  addColumn(index, array) {\n    if (typeof array === 'undefined') {\n      array = index;\n      index = this.columns;\n    }\n    Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"checkColumnIndex\"])(this, index, true);\n    array = Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"checkColumnVector\"])(this, array);\n    for (var i = 0; i < this.rows; i++) {\n      this[i].splice(index, 0, array[i]);\n    }\n    this.columns += 1;\n    return this;\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/util.js\":\n/*!********************************************!*\\\n  !*** ./node_modules/ml-matrix/src/util.js ***!\n  \\********************************************/\n/*! exports provided: checkRowIndex, checkColumnIndex, checkRowVector, checkColumnVector, checkIndices, checkRowIndices, checkColumnIndices, checkRange, getRange, sumByRow, sumByColumn, sumAll */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkRowIndex\", function() { return checkRowIndex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkColumnIndex\", function() { return checkColumnIndex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkRowVector\", function() { return checkRowVector; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkColumnVector\", function() { return checkColumnVector; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkIndices\", function() { return checkIndices; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkRowIndices\", function() { return checkRowIndices; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkColumnIndices\", function() { return checkColumnIndices; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkRange\", function() { return checkRange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRange\", function() { return getRange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumByRow\", function() { return sumByRow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumByColumn\", function() { return sumByColumn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sumAll\", function() { return sumAll; });\n/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ \"./node_modules/ml-matrix/src/matrix.js\");\n\n\n/**\n * @private\n * Check that a row index is not out of bounds\n * @param {Matrix} matrix\n * @param {number} index\n * @param {boolean} [outer]\n */\nfunction checkRowIndex(matrix, index, outer) {\n  var max = outer ? matrix.rows : matrix.rows - 1;\n  if (index < 0 || index > max) {\n    throw new RangeError('Row index out of range');\n  }\n}\n\n/**\n * @private\n * Check that a column index is not out of bounds\n * @param {Matrix} matrix\n * @param {number} index\n * @param {boolean} [outer]\n */\nfunction checkColumnIndex(matrix, index, outer) {\n  var max = outer ? matrix.columns : matrix.columns - 1;\n  if (index < 0 || index > max) {\n    throw new RangeError('Column index out of range');\n  }\n}\n\n/**\n * @private\n * Check that the provided vector is an array with the right length\n * @param {Matrix} matrix\n * @param {Array|Matrix} vector\n * @return {Array}\n * @throws {RangeError}\n */\nfunction checkRowVector(matrix, vector) {\n  if (vector.to1DArray) {\n    vector = vector.to1DArray();\n  }\n  if (vector.length !== matrix.columns) {\n    throw new RangeError(\n      'vector size must be the same as the number of columns'\n    );\n  }\n  return vector;\n}\n\n/**\n * @private\n * Check that the provided vector is an array with the right length\n * @param {Matrix} matrix\n * @param {Array|Matrix} vector\n * @return {Array}\n * @throws {RangeError}\n */\nfunction checkColumnVector(matrix, vector) {\n  if (vector.to1DArray) {\n    vector = vector.to1DArray();\n  }\n  if (vector.length !== matrix.rows) {\n    throw new RangeError('vector size must be the same as the number of rows');\n  }\n  return vector;\n}\n\nfunction checkIndices(matrix, rowIndices, columnIndices) {\n  return {\n    row: checkRowIndices(matrix, rowIndices),\n    column: checkColumnIndices(matrix, columnIndices)\n  };\n}\n\nfunction checkRowIndices(matrix, rowIndices) {\n  if (typeof rowIndices !== 'object') {\n    throw new TypeError('unexpected type for row indices');\n  }\n\n  var rowOut = rowIndices.some((r) => {\n    return r < 0 || r >= matrix.rows;\n  });\n\n  if (rowOut) {\n    throw new RangeError('row indices are out of range');\n  }\n\n  if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);\n\n  return rowIndices;\n}\n\nfunction checkColumnIndices(matrix, columnIndices) {\n  if (typeof columnIndices !== 'object') {\n    throw new TypeError('unexpected type for column indices');\n  }\n\n  var columnOut = columnIndices.some((c) => {\n    return c < 0 || c >= matrix.columns;\n  });\n\n  if (columnOut) {\n    throw new RangeError('column indices are out of range');\n  }\n  if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);\n\n  return columnIndices;\n}\n\nfunction checkRange(matrix, startRow, endRow, startColumn, endColumn) {\n  if (arguments.length !== 5) {\n    throw new RangeError('expected 4 arguments');\n  }\n  checkNumber('startRow', startRow);\n  checkNumber('endRow', endRow);\n  checkNumber('startColumn', startColumn);\n  checkNumber('endColumn', endColumn);\n  if (\n    startRow > endRow ||\n    startColumn > endColumn ||\n    startRow < 0 ||\n    startRow >= matrix.rows ||\n    endRow < 0 ||\n    endRow >= matrix.rows ||\n    startColumn < 0 ||\n    startColumn >= matrix.columns ||\n    endColumn < 0 ||\n    endColumn >= matrix.columns\n  ) {\n    throw new RangeError('Submatrix indices are out of range');\n  }\n}\n\nfunction getRange(from, to) {\n  var arr = new Array(to - from + 1);\n  for (var i = 0; i < arr.length; i++) {\n    arr[i] = from + i;\n  }\n  return arr;\n}\n\nfunction sumByRow(matrix) {\n  var sum = _matrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"].zeros(matrix.rows, 1);\n  for (var i = 0; i < matrix.rows; ++i) {\n    for (var j = 0; j < matrix.columns; ++j) {\n      sum.set(i, 0, sum.get(i, 0) + matrix.get(i, j));\n    }\n  }\n  return sum;\n}\n\nfunction sumByColumn(matrix) {\n  var sum = _matrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"].zeros(1, matrix.columns);\n  for (var i = 0; i < matrix.rows; ++i) {\n    for (var j = 0; j < matrix.columns; ++j) {\n      sum.set(0, j, sum.get(0, j) + matrix.get(i, j));\n    }\n  }\n  return sum;\n}\n\nfunction sumAll(matrix) {\n  var v = 0;\n  for (var i = 0; i < matrix.rows; i++) {\n    for (var j = 0; j < matrix.columns; j++) {\n      v += matrix.get(i, j);\n    }\n  }\n  return v;\n}\n\nfunction checkNumber(name, value) {\n  if (typeof value !== 'number') {\n    throw new TypeError(`${name} must be a number`);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/base.js\":\n/*!**************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/base.js ***!\n  \\**************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BaseView; });\n/* harmony import */ var _abstractMatrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstractMatrix */ \"./node_modules/ml-matrix/src/abstractMatrix.js\");\n/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../matrix */ \"./node_modules/ml-matrix/src/matrix.js\");\n\n\n\nclass BaseView extends Object(_abstractMatrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"])() {\n  constructor(matrix, rows, columns) {\n    super();\n    this.matrix = matrix;\n    this.rows = rows;\n    this.columns = columns;\n  }\n\n  static get [Symbol.species]() {\n    return _matrix__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/column.js\":\n/*!****************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/column.js ***!\n  \\****************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixColumnView; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\nclass MatrixColumnView extends _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(matrix, column) {\n    super(matrix, matrix.rows, 1);\n    this.column = column;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(rowIndex, this.column, value);\n    return this;\n  }\n\n  get(rowIndex) {\n    return this.matrix.get(rowIndex, this.column);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/columnSelection.js\":\n/*!*************************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/columnSelection.js ***!\n  \\*************************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixColumnSelectionView; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./node_modules/ml-matrix/src/util.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\n\n\nclass MatrixColumnSelectionView extends _base__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(matrix, columnIndices) {\n    columnIndices = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"checkColumnIndices\"])(matrix, columnIndices);\n    super(matrix, matrix.rows, columnIndices.length);\n    this.columnIndices = columnIndices;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/flipColumn.js\":\n/*!********************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/flipColumn.js ***!\n  \\********************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixFlipColumnView; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\nclass MatrixFlipColumnView extends _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(matrix) {\n    super(matrix, matrix.rows, matrix.columns);\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(rowIndex, this.columns - columnIndex - 1, value);\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(rowIndex, this.columns - columnIndex - 1);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/flipRow.js\":\n/*!*****************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/flipRow.js ***!\n  \\*****************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixFlipRowView; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\nclass MatrixFlipRowView extends _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(matrix) {\n    super(matrix, matrix.rows, matrix.columns);\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(this.rows - rowIndex - 1, columnIndex, value);\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(this.rows - rowIndex - 1, columnIndex);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/row.js\":\n/*!*************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/row.js ***!\n  \\*************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixRowView; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\nclass MatrixRowView extends _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(matrix, row) {\n    super(matrix, 1, matrix.columns);\n    this.row = row;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(this.row, columnIndex, value);\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(this.row, columnIndex);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/rowSelection.js\":\n/*!**********************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/rowSelection.js ***!\n  \\**********************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixRowSelectionView; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./node_modules/ml-matrix/src/util.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\n\n\nclass MatrixRowSelectionView extends _base__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(matrix, rowIndices) {\n    rowIndices = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"checkRowIndices\"])(matrix, rowIndices);\n    super(matrix, rowIndices.length, matrix.columns);\n    this.rowIndices = rowIndices;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(this.rowIndices[rowIndex], columnIndex);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/selection.js\":\n/*!*******************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/selection.js ***!\n  \\*******************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixSelectionView; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./node_modules/ml-matrix/src/util.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\n\n\nclass MatrixSelectionView extends _base__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(matrix, rowIndices, columnIndices) {\n    var indices = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"checkIndices\"])(matrix, rowIndices, columnIndices);\n    super(matrix, indices.row.length, indices.column.length);\n    this.rowIndices = indices.row;\n    this.columnIndices = indices.column;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(\n      this.rowIndices[rowIndex],\n      this.columnIndices[columnIndex],\n      value\n    );\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(\n      this.rowIndices[rowIndex],\n      this.columnIndices[columnIndex]\n    );\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/sub.js\":\n/*!*************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/sub.js ***!\n  \\*************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixSubView; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./node_modules/ml-matrix/src/util.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\n\n\nclass MatrixSubView extends _base__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(matrix, startRow, endRow, startColumn, endColumn) {\n    Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"checkRange\"])(matrix, startRow, endRow, startColumn, endColumn);\n    super(matrix, endRow - startRow + 1, endColumn - startColumn + 1);\n    this.startRow = startRow;\n    this.startColumn = startColumn;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(\n      this.startRow + rowIndex,\n      this.startColumn + columnIndex,\n      value\n    );\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(\n      this.startRow + rowIndex,\n      this.startColumn + columnIndex\n    );\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/views/transpose.js\":\n/*!*******************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/views/transpose.js ***!\n  \\*******************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MatrixTransposeView; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./node_modules/ml-matrix/src/views/base.js\");\n\n\nclass MatrixTransposeView extends _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(matrix) {\n    super(matrix, matrix.columns, matrix.rows);\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.matrix.set(columnIndex, rowIndex, value);\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.matrix.get(columnIndex, rowIndex);\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js\":\n/*!************************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js ***!\n  \\************************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WrapperMatrix1D; });\n/* harmony import */ var _abstractMatrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstractMatrix */ \"./node_modules/ml-matrix/src/abstractMatrix.js\");\n/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../matrix */ \"./node_modules/ml-matrix/src/matrix.js\");\n\n\n\nclass WrapperMatrix1D extends Object(_abstractMatrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"])() {\n  /**\n   * @class WrapperMatrix1D\n   * @param {Array<number>} data\n   * @param {object} [options]\n   * @param {object} [options.rows = 1]\n   */\n  constructor(data, options = {}) {\n    const { rows = 1 } = options;\n\n    if (data.length % rows !== 0) {\n      throw new Error('the data length is not divisible by the number of rows');\n    }\n    super();\n    this.rows = rows;\n    this.columns = data.length / rows;\n    this.data = data;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    var index = this._calculateIndex(rowIndex, columnIndex);\n    this.data[index] = value;\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    var index = this._calculateIndex(rowIndex, columnIndex);\n    return this.data[index];\n  }\n\n  _calculateIndex(row, column) {\n    return row * this.columns + column;\n  }\n\n  static get [Symbol.species]() {\n    return _matrix__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js\":\n/*!************************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js ***!\n  \\************************************************************/\n/*! exports provided: default */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WrapperMatrix2D; });\n/* harmony import */ var _abstractMatrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstractMatrix */ \"./node_modules/ml-matrix/src/abstractMatrix.js\");\n/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../matrix */ \"./node_modules/ml-matrix/src/matrix.js\");\n\n\n\nclass WrapperMatrix2D extends Object(_abstractMatrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"])() {\n  /**\n   * @class WrapperMatrix2D\n   * @param {Array<Array<number>>} data\n   */\n  constructor(data) {\n    super();\n    this.data = data;\n    this.rows = data.length;\n    this.columns = data[0].length;\n  }\n\n  set(rowIndex, columnIndex, value) {\n    this.data[rowIndex][columnIndex] = value;\n    return this;\n  }\n\n  get(rowIndex, columnIndex) {\n    return this.data[rowIndex][columnIndex];\n  }\n\n  static get [Symbol.species]() {\n    return _matrix__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/ml-matrix/src/wrap/wrap.js\":\n/*!*************************************************!*\\\n  !*** ./node_modules/ml-matrix/src/wrap/wrap.js ***!\n  \\*************************************************/\n/*! exports provided: wrap */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wrap\", function() { return wrap; });\n/* harmony import */ var _WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WrapperMatrix1D */ \"./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js\");\n/* harmony import */ var _WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WrapperMatrix2D */ \"./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js\");\n\n\n\n/**\n * @param {Array<Array<number>>|Array<number>} array\n * @param {object} [options]\n * @param {object} [options.rows = 1]\n * @return {WrapperMatrix1D|WrapperMatrix2D}\n */\nfunction wrap(array, options) {\n  if (Array.isArray(array)) {\n    if (array[0] && Array.isArray(array[0])) {\n      return new _WrapperMatrix2D__WEBPACK_IMPORTED_MODULE_1__[\"default\"](array);\n    } else {\n      return new _WrapperMatrix1D__WEBPACK_IMPORTED_MODULE_0__[\"default\"](array, options);\n    }\n  } else {\n    throw new Error('the argument is not an array');\n  }\n}\n\n\n/***/ }),\n\n/***/ \"./src/layout/spectral.worker.js\":\n/*!***************************************!*\\\n  !*** ./src/layout/spectral.worker.js ***!\n  \\***************************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ml_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ml-matrix */ \"./node_modules/ml-matrix/src/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/layout/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_1__);\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\n\n\n\nfunction twoSmallest (arr) {\n    const min = Math.min.apply(null, arr), // get the max of the array\n        mini = arr.indexOf(min);\n    arr[mini] = Infinity; // replace max in the array with -infinity\n    const second_min = Math.min.apply(null, arr), // get the new max \n        second_mini = arr.indexOf(second_min);\n    arr[second_mini] = Infinity; // replace max in the array with -infinity\n    const third_min = Math.min.apply(null, arr), // get the new max \n        third_mini = arr.indexOf(third_min);\n    return [second_mini, third_mini];\n}\n\nfunction normalize (x, y) {\n    let maxx = Math.max.apply(null, x.map(Math.abs)),\n        maxy = Math.max.apply(null, y.map(Math.abs));\n    let minx = Math.min.apply(null, x),\n        miny = Math.min.apply(null, y);\n    for(let i=0; i<x.length; ++i){\n        x[i] = 0.1+(x[i]-minx)/((maxx-minx)*1.25);\n        y[i] = 0.1+(y[i]-miny)/((maxy-miny)*1.25);\n    }\n    return [x, y];\n}\n\nclass Spectral {\n  // get degree of all nodes\n  // let user define at least: starting angle and radius and\n  // clock/cclock direction\n  // size of vertices\n  // more: a ratio of compactness for the more/less connected nodes\n  // a spiral ratio with a rotation ratio for having more than 2pi\n  // distribution of nodes when spiriling\n  // use some other ordering criterion than degree? Strength?\n  // defined by user and found as attribute of each node?\n  // random ordering, minimal crossing of edges?\n  constructor(nodes, edges) {\n    this._nodes = nodes;\n    this._edges = edges;\n  }\n\n  apply () {\n      let A = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"create2dArray\"])(this._nodes.length, this._nodes.length);\n      // build the adjacency matrix\n      for (let i=0; i<this._edges.length; ++i){\n          let ii = this._edges[i].source.index;\n          let j = this._edges[i].target.index;\n          A[ii][j] = -1; // not considering edge weight for now (the example json files don't have weight)\n          A[j][ii] = -1; // not considering edge weight for now (the example json files don't have weight)\n      }\n      // build the diagonal of degrees\n      // NOT subtract adjacency from degrees but:\n      // substitute diagonal by degrees\n      for (let i=0; i<this._nodes.length; ++i){\n          A[i][i] = -A[i].reduce((a, b) => a+b, 0);\n      }\n      let foo = new ml_matrix__WEBPACK_IMPORTED_MODULE_0__[\"EigenvalueDecomposition\"](A);\n      const iii = twoSmallest(foo.realEigenvalues);\n      const foo_ = foo.eigenvectorMatrix.transpose();\n      const x = foo_[iii[0]];\n      const y = foo_[iii[1]];\n      const xy = normalize(x, y);\n      // var fooo = new Matrix.EigenvalueDecomposition(A);\n      // var fooo = new Matrix.EigenvalueDecomposition(A);\n      // recipe from http://www.sfu.ca/personal/archives/richards/Pages/NAS.AJS-WDR.pdf\n      // and implemented in networkx/drawing/layout.py\n      this._nodes.forEach(function(node, i){\n          node.x = xy[0][i];\n          node.y = xy[1][i];\n      }); \n  }\n};\n\n\nself.addEventListener('message', function (e) {\n    var nodes = e.data.nodes;\n    var edges = e.data.edges;\n    var layout_options = e.data.layout_options;\n    new Spectral(nodes, edges, layout_options).apply();\n    self.postMessage({ nodes, edges });\n}, false);\n\n/***/ }),\n\n/***/ \"./src/layout/utils.js\":\n/*!*****************************!*\\\n  !*** ./src/layout/utils.js ***!\n  \\*****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.create2dArray = create2dArray;\nexports.degrees = degrees;\nexports.getDepth = getDepth;\nexports.getRanges = getRanges;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nfunction create2dArray(rows, columns) {\n    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {\n        return Array(columns).fill(0);\n    });\n}\n\nfunction degrees(nodes, edges) {\n    // should return ordered nodes and their degrees - high to low\n    var degrees = Array(nodes.length).fill(0);\n    edges.forEach(function (e) {\n        degrees[e.source.index] += 1;\n        degrees[e.target.index] += 1;\n    }); // check to see if not getting double of the degree in undirected graphs\n    //getting the order of nodes from highest to lowest degrees\n    var ordered_nodes = degrees.map(function (el, i) {\n        return { index: i, value: el };\n    });\n    ordered_nodes.sort(function (a, b) {\n        return +(a.value < b.value) || +(a.value === b.value) - 1;\n    });\n    var ordered_degrees = ordered_nodes.map(function (el) {\n        return degrees[el.index];\n    });\n    return { nodes: ordered_nodes,\n        degrees: ordered_degrees };\n}\n\nfunction getDepth(obj) {\n    var depth = 0;\n    if (obj.children) {\n        obj.children.forEach(function (d) {\n            if (d.depth_visited == true) {\n                throw new Error(\"This layout is only for trees acyclic graphs\");\n            }\n            d.depth_visited = true;\n            var tmpDepth = getDepth(d);\n            if (tmpDepth > depth) {\n                depth = tmpDepth;\n            }\n        });\n    }\n    return 1 + depth;\n}\n\nfunction getRanges(n) {\n    n = Math.abs(n);\n    if (n <= 1) {\n        return {\n            start: 0.5,\n            step: 1\n        };\n    }\n    var start = .05;\n    return {\n        start: start,\n        step: (1 - 2 * start) / (n - 1)\n    };\n}\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=73e8404455f2b8a2ca79.worker.js.map", __webpack_require__.p + "73e8404455f2b8a2ca79.worker.js");
};

/***/ }),

/***/ "./src/layout/spectral2.worker.js":
/*!****************************************!*\
  !*** ./src/layout/spectral2.worker.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/spectral2.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/spectral2.worker.js\":\n/*!****************************************!*\\\n  !*** ./src/layout/spectral2.worker.js ***!\n  \\****************************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/layout/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\n// inspired in Matlab implementation\n// and JS transcription in\n// https://github.com/alanmeeson/spectral-graph-layout\n\n\n\nclass Spectral2 {\n  constructor(nodes, edges) {\n    this._nodes = nodes;\n    this._edges = edges;\n    this._epsilon = 1e-8; // tolerance\n    this._MAX_ITTERATIONS = 100; //We use power iteration, this is analogous to wall time to avoid infinite loops.\n    this._num_elements = nodes.length; //number of nodes in graph\n    this._dims = 2;\n  }\n  apply () {\n      let A = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"create2dArray\"])(this._nodes.length, this._nodes.length);\n      // build the adjacency matrix\n      for (let i=0; i<this._edges.length; ++i){\n          let ii = this._edges[i].source.index;\n          let j = this._edges[i].target.index;\n          A[ii][j] = 1; // not considering edge weight for now (the example json files don't have weight)\n      }\n      const D = deg(A); //degree of each node in graph (number of connections).\n\n      const dims = this._dims + 1; //add one to the dims to allow for the first eigen vector\n      let u = new Array(dims);//declare the eigen vector matrix\n      u[0] = normalize(ones(this._num_elements)); //create & normalize the first eigen vector\n      for (let i = 1; i < dims; i++) u[i] = zeros(this._num_elements); //create empty space for the other eigen vectors\n\n      //Power iteration to determine the remaining eigen vectors.\n      for (let k=1; k < dims; k++) { //for each eigen vector after the first, \n          //initialize eigen vector with random values\n          let uhk = normalize(rand(this._num_elements));\n\n          let itt_count = 0; //we are allowing a max of 100 iterations, to avoid hanging and infinite loops. (specified above in constants)\n          let stop = false; //stopping criterion flag.\n          while (!stop) { // do...while using flags to keep it consistent with my matlab implementation\n\n              //D-orthogonalize against previous eigenvectors\n              let uk = uhk.slice();\n              for (let l = 0; l < k; l++) {\t\t\t\t\t\t\n                  let ul = u[l]; //extract the l-th eigen vector\n\n                  //Calculate (uk'.D.ul)/(ul'.D.ul)\n                  let top_ = 0;\n                  let bottom = 0;\n                  for (let vmi = 0; vmi < uk.length; vmi++) {\n                      top_ += (uk[vmi] * D[vmi] * ul[vmi]);\n                      bottom += (ul[vmi] * D[vmi] * ul[vmi]);\n                  }\n                  const ratio = top_ / bottom;\n\n                  //uk = uk - ((uk' . D . ul) / (ul' . D ul)) . ul\n                  for (let vsi = 0; vsi < uk.length; vsi++) {\n                      uk[vsi] = uk[vsi] - (ratio * ul[vsi]);\n                  }\n              }\n\n              //multiply with .5(I+D^-1 A)\n              for (let i = 0; i < uhk.length; i++) {\n                  uhk[i] = 0.5 * (uk[i] + dot(A[i], uk) / D[i]);\n              }\n\n\n              uhk = normalize(uhk);\n\n              itt_count = itt_count + 1;\n              stop = (itt_count > 100) | !(dot(uhk, uk) < (1-this._epsilon));\n          }\n          u[k] = uhk.slice();\t\n      }\n\n      //discard the first eigenvector which should be [ones].\n      // var v = new Array(u.length);\n      // for (var i=0; i < u.length; i++) {\n      //     v[i] = new Array(u[i].length);\n      //     for (var j=0; j < u[i].length; j++) v[i][j] = u[i][j];\n      // }\n      const x = normalize2(u[1]);\n      const y = normalize2(u[2]);\n      this._nodes.forEach(function(node, i){\n          node.x = x[i];\n          node.y = y[i];\n      }); \n  }\n};\n\nfunction deg(graph) {\n    //Calculate the degree of each node from the graph matrix.\n    let d = zeros(graph.length);\n\n    //degree of node i is the sum of the weights of all edges connected to it.\n    for (let i = 0; i < graph.length; i++) {\n        let node_degree = 0;\n        for (let j = 0; j < graph[i].length; j++) {\n            node_degree += graph[i][j];\n        }\n        d[i] = node_degree+1;\n    }\n\n    return d;\n}\n\nfunction dot(a,b) {\n    //inner product of two vectors\n    let d = 0;\n    for (let i = 0; i < a.length; i++) {\n        d += a[i] * b[i];\n    }\n    return d;\n}\n\nfunction euclideanDistance(coordinates) {\n    //calculate the euclidean distance between two points/vectors.\n    // used for normalization.\n    let d = 0;\n\n    for (let i = 0; i < coordinates.length; i++) {\n        d += Math.pow(coordinates[i], 2);\n    }\n    return Math.sqrt(d);\n}\n\nfunction normalize(arr) {\n    //normalizes a vector = arr/||arr||\n    const d = euclideanDistance(arr);\n    let narr = new Array(arr.length);\n    for (let i = 0; i < arr.length; i++) {\n        narr[i] = arr[i] / d;\n    }\n\n    return narr;\n}\n\nfunction rand(n) {\n    //create a vector of length n and fill with random numbers.\n    let arr = new Array(n);\n    for (let i = 0; i < n; i++) arr[i] = Math.random();\n    return arr;\n}\n\nfunction add(a, b) {\n    let c = new Array(a.length);\n    for (let i = 0; i < a.length; i++) {\n        c[i] = new Array(a[i].length);\n        for (let j = 0; j < a[i].length; j++) c[i][j] = a[i][j] + b[i][j];\n    }\n    return c;\n}\n\nfunction symmetricRandMatrix(n, ulim) {\n    let mat = new Array(n);\n    for (let i = 0; i < n; i++) {\n        mat[i] = new Array(n);\n        mat[i][i] = 0;\n    }\n    for (let i = 0; i < n; i++) {\n        for (let j = i + 1; j < n; j++) {\n            mat[i][j] = ulim * Math.random();\n            mat[j][i] = mat[i][j];\n        }\n    }\n    return mat;\n}\n\nfunction zeros(n) {\n    //create a vector filled with zeros\n    let arr = new Array(n);\n    for (let i = 0; i < n; i++) arr[i] = 0;\n    return arr;\n}\n\nfunction ones(n) {\n    //create a vector filled with ones\n    let arr = new Array(n);\n    for (let i = 0; i < n; i++) arr[i] = 1;\n    return arr;\n}\n\nfunction normalize2 (x) {\n    let maxx = Math.max.apply(null, x.map(Math.abs));\n    let minx = Math.min.apply(null, x);\n    for(let i=0; i<x.length; ++i){\n        x[i] = 0.1+(x[i]-minx)/((maxx - minx)*1.25);\n    }\n    return x;\n}\n\nself.addEventListener('message', function (e) {\n    var nodes = e.data.nodes;\n    var edges = e.data.edges;\n    var layout_options = e.data.layout_options;\n    new Spectral2(nodes, edges, layout_options).apply();\n    self.postMessage({ nodes, edges });\n}, false);\n\n/***/ }),\n\n/***/ \"./src/layout/utils.js\":\n/*!*****************************!*\\\n  !*** ./src/layout/utils.js ***!\n  \\*****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.create2dArray = create2dArray;\nexports.degrees = degrees;\nexports.getDepth = getDepth;\nexports.getRanges = getRanges;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nfunction create2dArray(rows, columns) {\n    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {\n        return Array(columns).fill(0);\n    });\n}\n\nfunction degrees(nodes, edges) {\n    // should return ordered nodes and their degrees - high to low\n    var degrees = Array(nodes.length).fill(0);\n    edges.forEach(function (e) {\n        degrees[e.source.index] += 1;\n        degrees[e.target.index] += 1;\n    }); // check to see if not getting double of the degree in undirected graphs\n    //getting the order of nodes from highest to lowest degrees\n    var ordered_nodes = degrees.map(function (el, i) {\n        return { index: i, value: el };\n    });\n    ordered_nodes.sort(function (a, b) {\n        return +(a.value < b.value) || +(a.value === b.value) - 1;\n    });\n    var ordered_degrees = ordered_nodes.map(function (el) {\n        return degrees[el.index];\n    });\n    return { nodes: ordered_nodes,\n        degrees: ordered_degrees };\n}\n\nfunction getDepth(obj) {\n    var depth = 0;\n    if (obj.children) {\n        obj.children.forEach(function (d) {\n            if (d.depth_visited == true) {\n                throw new Error(\"This layout is only for trees acyclic graphs\");\n            }\n            d.depth_visited = true;\n            var tmpDepth = getDepth(d);\n            if (tmpDepth > depth) {\n                depth = tmpDepth;\n            }\n        });\n    }\n    return 1 + depth;\n}\n\nfunction getRanges(n) {\n    n = Math.abs(n);\n    if (n <= 1) {\n        return {\n            start: 0.5,\n            step: 1\n        };\n    }\n    var start = .05;\n    return {\n        start: start,\n        step: (1 - 2 * start) / (n - 1)\n    };\n}\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=9633327aaf5e651ed45e.worker.js.map", __webpack_require__.p + "9633327aaf5e651ed45e.worker.js");
};

/***/ }),

/***/ "./src/layout/versinus.worker.js":
/*!***************************************!*\
  !*** ./src/layout/versinus.worker.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/layout/versinus.worker.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/layout/utils.js\":\n/*!*****************************!*\\\n  !*** ./src/layout/utils.js ***!\n  \\*****************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.create2dArray = create2dArray;\nexports.degrees = degrees;\nexports.getDepth = getDepth;\nexports.getRanges = getRanges;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n *  Copyright (c) 2017, Helikar Lab.\n *  All rights reserved.\n *\n *  This source code is licensed under the GPLv3 License.\n *  Author: Renato Fabbri\n */\n\nfunction create2dArray(rows, columns) {\n    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {\n        return Array(columns).fill(0);\n    });\n}\n\nfunction degrees(nodes, edges) {\n    // should return ordered nodes and their degrees - high to low\n    var degrees = Array(nodes.length).fill(0);\n    edges.forEach(function (e) {\n        degrees[e.source.index] += 1;\n        degrees[e.target.index] += 1;\n    }); // check to see if not getting double of the degree in undirected graphs\n    //getting the order of nodes from highest to lowest degrees\n    var ordered_nodes = degrees.map(function (el, i) {\n        return { index: i, value: el };\n    });\n    ordered_nodes.sort(function (a, b) {\n        return +(a.value < b.value) || +(a.value === b.value) - 1;\n    });\n    var ordered_degrees = ordered_nodes.map(function (el) {\n        return degrees[el.index];\n    });\n    return { nodes: ordered_nodes,\n        degrees: ordered_degrees };\n}\n\nfunction getDepth(obj) {\n    var depth = 0;\n    if (obj.children) {\n        obj.children.forEach(function (d) {\n            if (d.depth_visited == true) {\n                throw new Error(\"This layout is only for trees acyclic graphs\");\n            }\n            d.depth_visited = true;\n            var tmpDepth = getDepth(d);\n            if (tmpDepth > depth) {\n                depth = tmpDepth;\n            }\n        });\n    }\n    return 1 + depth;\n}\n\nfunction getRanges(n) {\n    n = Math.abs(n);\n    if (n <= 1) {\n        return {\n            start: 0.5,\n            step: 1\n        };\n    }\n    var start = .05;\n    return {\n        start: start,\n        step: (1 - 2 * start) / (n - 1)\n    };\n}\n\n/***/ }),\n\n/***/ \"./src/layout/versinus.worker.js\":\n/*!***************************************!*\\\n  !*** ./src/layout/versinus.worker.js ***!\n  \\***************************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/layout/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass Versinus {\n  // the hubs are on the first half of the sinusoid period\n  // the intermediary are on the second half\n  // and the periphery are on the upper straight line\n  // further versions should enable the choice of other\n  // fractions of hubs, intermediary and peripheral vertices\n  // or the Erdös sectioning.\n  // maybe also let the user set the endpoints of the periphery segment\n  constructor(nodes, edges) {\n    this._nodes = nodes;\n    this._edges = edges;\n    this._margin = 0.05;\n    this._hubs = 0.1; // 10%\n    this._intermediary = 0.2;\n  }\n  apply () {\n      let nd = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"degrees\"])(this._nodes, this._edges);\n      const nhubs_intermediary = Math.floor(this._nodes.length*(this._hubs + this._intermediary));\n      const nhubs = Math.floor(this._nodes.length*this._hubs);\n      const stepx1 = ((1 - 2*this._margin)/2)/(nhubs - 1);\n      const steprad = Math.PI/(nhubs - 1); \n      let i = 0;\n      while (i < nhubs ){\n        this._nodes[nd.nodes[i].index].x = this._margin + stepx1*i;\n        this._nodes[nd.nodes[i].index].y = this._margin + 0.4 + 0.4*Math.sin(i*steprad);\n\t++i;\n      }\n      const nintermediary = nhubs_intermediary - nhubs;\n      const steprad2 = Math.PI/nintermediary; \n      const stepx2 = ((1 - 2*this._margin)/2)/nintermediary;\n      i = 0;\n      while (i < nintermediary ){\n        this._nodes[nd.nodes[i+nhubs].index].x = 0.5 + stepx2*(i+1);\n        this._nodes[nd.nodes[i+nhubs].index].y = this._margin + 0.4 + 0.4*Math.sin(Math.PI+(i+1)*steprad2);\n\t++i;\n      }\n      const p0 = [0.85, 0.75];\n      const p1 = [0.4, 1-this._margin];\n      const nperipheral = this._nodes.length - nhubs_intermediary;\n      const stepxx = (p1[0]-p0[0])/(nperipheral - 1);\n      const stepy = (p1[1]-p0[1])/(nperipheral - 1);\n      i = 0;\n      while (i < nperipheral ){\n        this._nodes[nd.nodes[i+nhubs_intermediary].index].x = p0[0] + stepxx*i;\n        this._nodes[nd.nodes[i+nhubs_intermediary].index].y = p0[1] + stepy*i;\n\t++i;\n      }\n  }\n};\n\nself.addEventListener('message', function (e) {\n  var nodes = e.data.nodes;\n  var edges = e.data.edges;\n  var layout_options = e.data.layout_options;\n  new Versinus(nodes, edges, layout_options).apply();\n  self.postMessage({ nodes, edges });\n}, false);\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=bfd2d43433ad515dfdd6.worker.js.map", __webpack_require__.p + "bfd2d43433ad515dfdd6.worker.js");
};

/***/ }),

/***/ "./src/lazyEvents.js":
/*!***************************!*\
  !*** ./src/lazyEvents.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this._enable = true;
    }

    _createClass(_class, [{
        key: "debounce",
        value: function debounce(func, wait, immediate) {
            var _this = this,
                _arguments = arguments;

            var timeout = void 0,
                args = void 0,
                context = void 0,
                timestamp = void 0,
                result = void 0;

            var later = function later() {
                var last = Date.now - timestamp;

                if (last < wait && last > 0) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) {
                        if (_this._enable) {
                            result = func.apply(context, args);
                        }
                        if (!timeout) context = args = null;
                    }
                }
            };

            return function () {
                context = _this;
                args = _arguments;
                timestamp = Date.now;
                var callNow = immediate && !timeout;
                if (!timeout) timeout = setTimeout(later, wait);
                if (callNow) {
                    if (_this._enable) {
                        result = func.apply(context, args);
                    }
                    context = args = null;
                }

                return result;
            };
        }
    }, {
        key: "disable",
        value: function disable() {
            this._enable = false;
        }
    }]);

    return _class;
}();

exports.default = _class;
;

/***/ }),

/***/ "./src/primitive.js":
/*!**************************!*\
  !*** ./src/primitive.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shader = __webpack_require__(/*! ./shader */ "./src/shader.js");

var _shader2 = _interopRequireDefault(_shader);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _primitiveTools = __webpack_require__(/*! ./primitiveTools */ "./src/primitiveTools.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var primitive = function () {
    function primitive(gl, baseStyle, styleProperty, vs, fs, bind, shaderParams) {
        var _this = this;

        _classCallCheck(this, primitive);

        var shader = new _shader2.default(gl, vs.join('\n'), fs.join('\n'), shaderParams);
        var buffers = [];
        var sections = [];

        var sectionsByStyle = {};

        var e = {};
        var iV = void 0,
            iI = void 0,
            iS = 0,
            iB = 0;

        var partLength = function partLength(filler, part) {
            if (filler.size) {
                var n = 0;
                part.forEach(function (p) {
                    n += filler.size(e, p);
                });
                return n;
            } else {
                return part.length;
            }
            return;
        };

        var init = function init(filler, n) {
            iV = iI = 0;
            var max = Math.floor(primitive.maxBufferSize / filler.numVertices);
            var nV = Math.min(max, n - (iB - iS) * max);
            var nI = nV * filler.numIndices;

            if (!e.indices || e.indices.length !== nI) {
                e.indices = new Uint16Array(nI);
                nV *= filler.numVertices;
                for (var a in shader.attributes) {
                    e[a] = new Float32Array(shader.attributes[a].size * nV);
                }
            }
        };

        var zerofiller = {
            set: function set(v, iV, iI, numVertices, numIndices) {
                var indicesarr = [v.indices, iV, iI];
                for (var i = 0; i < numIndices; i++) {
                    indicesarr.push(0);
                }var verticesarr = [undefined, iV, iI];
                for (var _i = 0; _i < numVertices; _i++) {
                    verticesarr.push(0);
                }for (var k in v) {
                    if (k === 'indices') {
                        primitive.indices.apply(_this, indicesarr);
                    } else {
                        verticesarr[0] = v[k];
                        primitive.vertices.apply(_this, verticesarr);
                    }
                }
            }
        };

        this.set = function (gl, styles, adder, data, parts, get) {
            var isDirty = false;

            iS = 0;
            iB = 0;

            _this._iIs = new Uint32Array(data.length);
            _this._iVs = new Uint32Array(data.length);
            _this._iBs = new Uint8Array(data.length);
            _this._sizes = new Uint8Array(data.length);

            var store = function store(section) {
                var b = buffers[iB];
                if (!b) {
                    buffers[iB] = b = {};
                    for (var a in e) {
                        b[a] = gl.createBuffer();
                    }
                }
                for (var _a in shader.attributes) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, b[_a]);
                    gl.bufferData(gl.ARRAY_BUFFER, e[_a], gl.STATIC_DRAW);
                }
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, e.indices, gl.STATIC_DRAW);
                b.numIndices = iI;
                b.numVertices = iV;
                section.buffers.push(b);
                iB++;
            };

            sections = [];
            for (var p in parts) {
                var add = function add() {
                    sections.push(this);
                    sectionsByStyle[this.styleName] = this;
                };

                iS = iB;

                var section = {
                    style: (0, _primitiveTools.getPartitionStyle)(styles[p], baseStyle, styleProperty),
                    buffers: [],
                    styleName: p
                };

                var filler = get(section.style);
                filler.numVertices = filler.numVertices || 4;
                filler.numIndices = filler.numIndices || 6;

                var part = parts[p];

                var pL = partLength(filler, part);
                init(filler, pL);
                var max = primitive.maxBufferSize;
                for (var i = 0; i < part.length; i++) {
                    var s = filler.size ? filler.size(e, part[i]) : 1;
                    var niV = iV + s * filler.numVertices;
                    var niI = iI + s * filler.numIndices;

                    if (niV >= max) {
                        store(section);
                        init(filler, pL);
                        niV = iV;
                        niI = iI;
                    }

                    if (filler.set(e, part[i], iV, iI)) isDirty = true;

                    var idx = part.idx[i];
                    _this._iIs[idx] = iI;
                    _this._iVs[idx] = iV;
                    _this._iBs[idx] = iB;
                    _this._sizes[idx] = s;

                    iI = niI;
                    iV = niV;
                }
                store(section);

                var addSection = add.bind(section);

                adder ? adder(section, addSection) : addSection();
            }

            return isDirty;
        };

        var fb = void 0;
        this.update = function (gl, attribute, data, get) {
            var i = 0,
                size = shader.attributes[attribute].size;
            sections.forEach(function (section) {
                var filler = get(section.style);
                filler.numVertices = filler.numVertices || 4;

                section.buffers.forEach(function (e) {
                    (!fb || fb.length !== size * e.numVertices) && (fb = new Float32Array(size * e.numVertices));
                    for (var _iV = 0; _iV < e.numVertices; _iV += (filler.size ? filler.size(e, data[i]) : 1) * filler.numVertices) {
                        filler.set(fb, data[i++], _iV);
                    }gl.bindBuffer(gl.ARRAY_BUFFER, e[attribute]);
                    gl.bufferData(gl.ARRAY_BUFFER, fb, gl.DYNAMIC_DRAW);
                });
            });
        };

        this.updateEl = function (gl, el, pos, get) {
            var storeToPos = function storeToPos(b, iV, iI) {
                for (var a in shader.attributes) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
                    gl.bufferSubData(gl.ARRAY_BUFFER, shader.attributes[a].size * iV * e[a].BYTES_PER_ELEMENT, e[a]);
                }
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
                gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, iI * e.indices.BYTES_PER_ELEMENT, e.indices);
            };

            var section = sectionsByStyle[el.style];

            var filler = get(section.style);
            filler.numVertices = filler.numVertices || 4;
            filler.numIndices = filler.numIndices || 6;

            iB = iS = 0;

            var buffer = section.buffers[_this._iBs[pos]];
            var s = filler.size ? filler.size(buffer, el) : 1;
            var olds = _this._sizes[pos];
            if (s > olds) {
                console.error('Cannot set primitive to new value which has greater size (' + s + " > " + olds + ") - no enough empty space to fill in GL buffer");
                return;
            }

            init(filler, olds);
            filler.set(e, el, 0, 0);

            for (; s < olds; s++) {
                //zero fill empty spaces
                zerofiller.set(e, s * filler.numVertices, s * filler.numIndices, filler.numVertices, filler.numIndices);
            }

            var iV = _this._iVs[pos];
            var iI = _this._iIs[pos];
            storeToPos(buffer, iV, iI);
        };

        this.draw = function (context) {
            context.shader = shader;
            shader.bind();

            gl.uniformMatrix4fv(shader.uniforms.transform, false, context.transform);

            sections.forEach(function (section) {
                if (section.style.texture) {
                    section.style.texture.update && section.style.texture.update();
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, section.style.texture);
                    gl.uniform1i(shader.uniforms.texture, 0);
                }

                context.style = section.style;
                if (bind(context)) return;

                section.buffers.forEach(function (e) {
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, e.indices);

                    for (var a in shader.attributes) {
                        var attribute = shader.attributes[a];
                        gl.bindBuffer(gl.ARRAY_BUFFER, e[a]);
                        gl.vertexAttribPointer(attribute.index, attribute.size, gl.FLOAT, false, 0, 0);
                    }

                    gl.drawElements(gl.TRIANGLES, e.numIndices, gl.UNSIGNED_SHORT, 0);
                });
            });

            shader.unbind();
        };
    }

    _createClass(primitive, null, [{
        key: 'vertices',
        value: function vertices(buffer, iV) {
            for (var i = 2, j = 2 * iV, n = arguments.length; i < n; i++, j++) {
                buffer[j] = arguments[i];
            }
        }
    }, {
        key: 'singles',
        value: function singles(buffer, iV) {
            for (var i = 2, j = 1 * iV, n = arguments.length; i < n; i++, j++) {
                buffer[j] = arguments[i];
            }
        }
    }, {
        key: 'colors',
        value: function colors(buffer, iV) {
            for (var i = 2, j = 4 * iV, n = arguments.length; i < n; i++) {
                var c = arguments[i];
                buffer[j++] = c.r;
                buffer[j++] = c.g;
                buffer[j++] = c.b;
                buffer[j++] = c.a;
            }
        }
    }, {
        key: 'indices',
        value: function indices(buffer, iV, iI) {
            for (var i = 3, j = iI, n = arguments.length; i < n; i++, j++) {
                buffer[j] = iV + arguments[i];
            }
        }
    }, {
        key: 'quad',
        value: function quad(buffer, iV, iI) {
            primitive.indices(buffer, iV, iI, 0, 1, 2, 2, 3, 0);
        }
    }, {
        key: 'maxBufferSize',
        get: function get() {
            return 65536;
        }
    }]);

    return primitive;
}();

exports.default = primitive;

/***/ }),

/***/ "./src/primitiveTools.js":
/*!*******************************!*\
  !*** ./src/primitiveTools.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPartitionStyle = exports.partitionByStyle = undefined;

var _color = __webpack_require__(/*! ./color */ "./src/color.js");

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function partitionByStyle(data) {
    var parts = {};

    var pN = {};
    for (var i = 0; i < data.length; i++) {
        var el = data[i];
        var part = parts[el.style] = parts[el.style] || [];
        if (part.idx === undefined) part.idx = [];
        part.idx.push(i);

        el.sI = pN[el.style] = pN[el.style] === undefined ? 0 : pN[el.style] + 1;

        part.push(el);
    }

    return parts;
}

function getPartitionStyle(style, baseStyle, styleProperty) {
    var result = {};

    var copy = function copy(s) {
        if (s) for (var p in s) {
            result[p] = s[p];
        }
    };

    copy(baseStyle);
    copy(style);

    if (styleProperty) {
        copy(baseStyle[styleProperty]);
        style && copy(style[styleProperty]);
    }
    result.color = result.color && new _color2.default(result.color);
    return result;
};

exports.partitionByStyle = partitionByStyle;
exports.getPartitionStyle = getPartitionStyle;

/***/ }),

/***/ "./src/shader.js":
/*!***********************!*\
  !*** ./src/shader.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gl = __webpack_require__(/*! ./gl */ "./src/gl.js");

var _gl2 = _interopRequireDefault(_gl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var defaultAttr = { color: 4 };

var Shader = function () {
  function Shader(gl, vs, fs, shaderParams) {
    _classCallCheck(this, Shader);

    this._gl = gl;
    this._vs = vs;
    this._fs = fs;

    var program = this._program = gl.createProgram();

    gl.attachShader(program, _gl2.default.createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(program, _gl2.default.createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);

    this.uniforms = {};
    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < n; i++) {
      var name = gl.getActiveUniform(program, i).name;
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    var attrParams = (shaderParams || {}).attribute || {};

    this.attributes = {};
    n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (var _i = 0; _i < n; _i++) {
      var _name = gl.getActiveAttrib(program, _i).name;
      this.attributes[_name] = { index: _i, size: attrParams[_name] || Shader.attribute[_name] || 2 };
    }
  }

  _createClass(Shader, [{
    key: 'bind',
    value: function bind() {
      this._gl.useProgram(this._program);

      var n = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
      for (var i = 0; i < n; i++) {
        this._gl.enableVertexAttribArray(i);
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      var n = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
      for (var i = 0; i < n; i++) {
        this._gl.disableVertexAttribArray(i);
      }
    }
  }], [{
    key: 'attribute',
    get: function get() {
      return defaultAttr;
    }
  }]);

  return Shader;
}();

exports.default = Shader;
;

/***/ }),

/***/ "./src/spatialSearch/geomtools.js":
/*!****************************************!*\
  !*** ./src/spatialSearch/geomtools.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.neq = exports.eq = exports.getBBFromPoints = exports.pDistance2 = exports.distance2 = exports.distance2ToBezier = exports.pointInRect = exports.rectIntersectsRect = exports.lineIntersectsRect = exports.bezierIntersectsLine = exports.bezierIntersectsRect = exports.EPS = undefined;

var _rbush = __webpack_require__(/*! ./rbush */ "./src/spatialSearch/rbush.js");

var _rbush2 = _interopRequireDefault(_rbush);

var _geomutils = __webpack_require__(/*! ../geomutils */ "./src/geomutils.js");

var _geomutils2 = _interopRequireDefault(_geomutils);

var _primitiveTools = __webpack_require__(/*! ../primitiveTools */ "./src/primitiveTools.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */

var EPS = Number.EPSILON || 1e-14;

//solving cube analyticaly for bezier curves
function cuberoot(x) {
  var y = Math.pow(Math.abs(x), 1 / 3);
  return x < 0 ? -y : y;
}

function solveCubic(a, b, c, d) {
  if (Math.abs(a) < 1e-8) {
    // Quadratic case, ax^2+bx+c=0
    a = b;b = c;c = d;
    if (Math.abs(a) < 1e-8) {
      // Linear case, ax+b=0
      a = b;b = c;
      if (Math.abs(a) < 1e-8) // Degenerate case
        return [];
      return [-b / a];
    }

    var D = b * b - 4 * a * c;
    if (Math.abs(D) < 1e-8) return [-b / (2 * a)];else if (D > 0) return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
    return [];
  }

  // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
  var p = (3 * a * c - b * b) / (3 * a * a);
  var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
  var roots = void 0;

  if (Math.abs(p) < 1e-8) {
    // p = 0 -> t^3 = -q -> t = -q^1/3
    roots = [cuberoot(-q)];
  } else if (Math.abs(q) < 1e-8) {
    // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
  } else {
    var _D = q * q / 4 + p * p * p / 27;
    if (Math.abs(_D) < 1e-8) {
      // D = 0 -> two roots
      roots = [-1.5 * q / p, 3 * q / p];
    } else if (_D > 0) {
      // Only one real root
      var u = cuberoot(-q / 2 - Math.sqrt(_D));
      roots = [u - p / (3 * u)];
    } else {
      // D < 0, three roots, but needs to use complex numbers/trigonometric solution
      var _u = 2 * Math.sqrt(-p / 3);
      var t = Math.acos(3 * q / p / _u) / 3; // D < 0 implies p < 0 and acos argument in [-1..1]
      var k = 2 * Math.PI / 3;
      roots = [_u * Math.cos(t), _u * Math.cos(t - k), _u * Math.cos(t - 2 * k)];
    }
  }

  // Convert back from depressed cubic
  for (var i = 0; i < roots.length; i++) {
    roots[i] -= b / (3 * a);
  }return roots;
}

//function distanceToBezier(x,y,ax,ay,bx,by,cx,cy){
function distance2ToBezier(x, y, a, d, b, e, c, f) {
  //based on compute derivation of: d/dt ((X - (a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t))^2 + (Y - (d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t))^2)

  var A = 4 * a * a - 16 * a * b + 8 * a * c + 16 * b * b - 16 * b * c + 4 * c * c + 4 * d * d - 16 * d * e + 8 * d * f + 16 * e * e - 16 * e * f + 4 * f * f;
  var B = -12 * a * a + 36 * a * b - 12 * a * c - 24 * b * b + 12 * b * c - 12 * d * d + 36 * d * e - 12 * d * f - 24 * e * e + 12 * e * f;
  var C = 12 * a * a - 24 * a * b + 4 * a * c - 4 * a * x + 8 * b * b + 8 * b * x - 4 * c * x + 12 * d * d - 24 * d * e + 4 * d * f - 4 * d * y + 8 * e * e + 8 * e * y - 4 * f * y;
  var D = -4 * a * a + 4 * a * b + 4 * a * x - 4 * b * x - 4 * d * d + 4 * d * e + 4 * d * y - 4 * e * y;

  var eqresult = solveCubic(A, B, C, D);

  //loop through all possible solitions to find out which point is the nearest
  var mindist = Infinity;
  for (var i = 0; i < eqresult.length; i++) {
    var t = eqresult[i];

    if (t < 0 || t > 1) continue;

    //point at bezier curve
    var px = a * (1 - t) * (1 - t) + 2 * b * t * (1 - t) + c * t * t;
    var py = d * (1 - t) * (1 - t) + 2 * e * t * (1 - t) + f * t * t;

    var dist = distance2(x, y, px, py);
    if (dist < mindist) mindist = dist;
  }

  return mindist;
}

/*
 * @param v - array of with points [x1,y1,x2,y2 .... ]
 * @return array representing bounding box [x1,y1,x2,y2]
 */
function getBBFromPoints(v) {
  var xmin = Infinity;
  var xmax = -xmin;
  var ymin = Infinity;
  var ymax = -ymin;

  //x of points - even indexes in array 
  for (var i = 0; i < v.length; i += 2) {
    var val = v[i];
    if (val < xmin) xmin = val;
    if (val > xmax) xmax = val;
  }

  //y of points - odd indexes in array 
  for (var _i = 1; _i < v.length; _i += 2) {
    var _val = v[_i];
    if (_val < ymin) ymin = _val;
    if (_val > ymax) ymax = _val;
  }

  return [xmin, ymin, xmax, ymax];
}

//distance from point to point
function distance2(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return dx * dx + dy * dy;
}

//distance from point to line
function pDistance2(x, y, x1, y1, x2, y2) {
  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
    param = dot / len_sq;

  var xx = void 0,
      yy = void 0;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  return distance2(x, y, xx, yy);
}

function lineIntersectsLine(l1p1x, l1p1y, l1p2x, l1p2y, l2p1x, l2p1y, l2p2x, l2p2y) {
  var q = (l1p1y - l2p1y) * (l2p2x - l2p1x) - (l1p1x - l2p1x) * (l2p2y - l2p1y);
  var d = (l1p2x - l1p1x) * (l2p2y - l2p1y) - (l1p2y - l1p1y) * (l2p2x - l2p1x);

  if (d == 0) {
    return false;
  }

  var r = q / d;

  q = (l1p1y - l2p1y) * (l1p2x - l1p1x) - (l1p1x - l2p1x) * (l1p2y - l1p1y);
  var s = q / d;

  if (r < 0 || r > 1 || s < 0 || s > 1) {
    return false;
  }

  return true;
}

function pointInRect(px, py, x1, y1, x2, y2) {
  return px >= x1 - EPS && px <= x2 + EPS && py >= y1 - EPS && py <= y2 + EPS;
}

function rectIntersectsRect(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r2y) {
  return p1x <= r2x && p1y <= r2y && p2x >= r1x && p2y >= r1y;
}

function lineIntersectsRect(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r2y) {
  if (pointInRect(p1x, p1y, r1x, r1y, r2x, r2y) || pointInRect(p2x, p2y, r1x, r1y, r2x, r2y)) return true;

  return lineIntersectsLine(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r1y) || lineIntersectsLine(p1x, p1y, p2x, p2y, r2x, r1y, r2x, r2y) || lineIntersectsLine(p1x, p1y, p2x, p2y, r2x, r2y, r1x, r2y) || lineIntersectsLine(p1x, p1y, p2x, p2y, r1x, r2y, r1x, r1y);
}

function eq(a, b) {
  return a >= b - EPS && a <= b + EPS;
}

function neq(a, b) {
  return !eq(a, b);
}

function checkBezierTkoef(a, d, b, e, c, f, t, q, s, r, v) {
  if (t < 0 || t > 1) return false;

  if (neq(v - s, 0)) {
    var x = (d * (1 - t) * (1 - t) + 2 * e * t * (1 - t) + f * t * t) / (v - s);
    if (x < 0 || x > 1) return false;
  }

  return true;
}

function bezierIntersectsLine(a, d, b, e, c, f, q, s, r, v) {
  //based on wolfram alpha: >> solve ((d*(1-x)*(1-x)+2*e*x*(1-x)+f*x*x) = s + ((-a*(x-1)*(x-1) + x*(2*b*(x-1)-c*x)+q)/(q-r))*(v - s)) for x <<

  var t = void 0;

  var tden = -a * s + a * v + 2 * b * s - 2 * b * v - c * s + c * v + d * q - d * r - 2 * e * q + 2 * e * r + f * q - f * r;
  if (neq(tden, 0)) {
    if (neq(q - r, 0)) {
      var sq1 = 2 * a * s - 2 * a * v - 2 * b * s + 2 * b * v - 2 * d * r + 2 * e * q - 2 * e * r;
      var sq = sq1 * sq1 - 4 * (-a * s + a * v + d * q - d * r - q * v + r * s) * (-a * s + a * v + 2 * b * s - 2 * b * v - c * s + c * v + d * q - d * r - 2 * e * q + 2 * e * r + f * q - f * r);
      if (sq >= 0) {
        var t1 = a * s - a * v - b * s + b * v - d * q + d * r + e * q - e * r;

        t = (t1 - 0.5 * Math.sqrt(sq)) / tden;
        if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;

        t = (t1 + 0.5 * Math.sqrt(sq)) / tden;
        if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
      }
    }
  }

  tden = -b * s + b * v + c * s - c * v + e * q - e * r - f * q + f * r;
  if (eq(d, 2 * e - f) && eq(a, 2 * b - c) && neq(tden, 0) && neq(q * s - q * v - r * s + r * v, 0)) {
    t = -2 * b * s + 2 * b * v + c * s - c * v + 2 * e * q - 2 * e * r - f * q + f * r - q * v + r * s;
    t = t / (2 * tden);
    if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
  }

  if (eq(s, v) && eq(d, 2 * e - f) && neq(e - f, 0) && neq(q - r, 0)) {
    t = (2 * e - f - v) / (2 * (e - f));
    if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
  }

  var aeq = (2 * b * s - 2 * b * v - c * s + c * v + d * q - d * r - 2 * e * q + 2 * e * r + f * q - f * r) / (s - v);
  var val = b * d * s - b * d * v - 2 * b * e * s + 2 * b * e * v + b * f * s - b * f * v - c * d * s + c * d * v + 2 * c * e * s - 2 * c * e * v - c * f * s + c * f * v - d * e * q + d * e * r + d * f * q - d * f * r + 2 * e * e * q - 2 * e * e * r - 3 * e * f * q + 3 * e * f * r + f * f * q - f * f * r;
  if (eq(a, aeq) && neq(val, 0) && neq(q - r, 0)) {
    t = (2 * b * s - 2 * b * v - c * s + c * v - 2 * e * q + 2 * e * r + f * q - f * r + q * v - r * s) / (2 * (b * s - b * v - c * s + c * v - e * q + e * r + f * q - f * r));
    if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
  }

  return false;
}

function bezierIntersectsRect(a, d, b, e, c, f, r1x, r1y, r2x, r2y) {
  if (pointInRect(a, d, r1x, r1y, r2x, r2y) || pointInRect(c, f, r1x, r1y, r2x, r2y)) return true;

  var centerx = (r1x + r2x) / 2;
  var centery = (r1y + r2y) / 2;

  var diffx = r1x - r2x;
  var diffy = r1y - r2y;

  //performance optimalization based on distance
  var diff2xy = diffx * diffx + diffy * diffy;
  var dist2 = distance2ToBezier(centerx, centery, a, d, b, e, c, f);
  if (dist2 * 4 > diff2xy) return false;
  if (dist2 * 4 <= Math.min(diffx * diffx, diffy * diffy)) return true;

  return bezierIntersectsLine(a, d, b, e, c, f, r1y, r2x, r1y, r1y) || bezierIntersectsLine(a, d, b, e, c, f, r2x, r1y, r2x, r2y) || bezierIntersectsLine(a, d, b, e, c, f, r2x, r2y, r1x, r2y) || bezierIntersectsLine(a, d, b, e, c, f, r1x, r2y, r1x, r1y);
}

exports.EPS = EPS;
exports.bezierIntersectsRect = bezierIntersectsRect;
exports.bezierIntersectsLine = bezierIntersectsLine;
exports.lineIntersectsRect = lineIntersectsRect;
exports.rectIntersectsRect = rectIntersectsRect;
exports.pointInRect = pointInRect;
exports.distance2ToBezier = distance2ToBezier;
exports.distance2 = distance2;
exports.pDistance2 = pDistance2;
exports.getBBFromPoints = getBBFromPoints;
exports.eq = eq;
exports.neq = neq;

/***/ }),

/***/ "./src/spatialSearch/rbush.js":
/*!************************************!*\
  !*** ./src/spatialSearch/rbush.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 (c) 2015, Vladimir Agafonkin
 RBush, a JavaScript library for high-performance 2D spatial indexing of points and rectangles.
 https://github.com/mourner/rbush
*/

function rbush(maxEntries, format) {
    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

    // max entries in a node is 9 by default; min node fill is 40% for best performance
    this._maxEntries = Math.max(4, maxEntries || 9);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

    if (format) {
        this._initFormat(format);
    }

    this.clear();
}

rbush.prototype = {

    all: function all() {
        return this._all(this.data, []);
    },

    search: function search(bbox) {

        var node = this.data,
            result = [],
            toBBox = this.toBBox;

        if (!intersects(bbox, node.bbox)) return result;

        var nodesToSearch = [],
            i,
            len,
            child,
            childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child.bbox;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf) result.push(child);else if (contains(bbox, childBBox)) this._all(child, result);else nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return result;
    },

    collides: function collides(bbox) {

        var node = this.data,
            toBBox = this.toBBox;

        if (!intersects(bbox, node.bbox)) return false;

        var nodesToSearch = [],
            i,
            len,
            child,
            childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child.bbox;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    },

    load: function load(data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        // recursively build the tree with the given data from stratch using OMT algorithm
        var node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            // save as is if tree is empty
            this.data = node;
        } else if (this.data.height === node.height) {
            // split root if trees have the same height
            this._splitRoot(this.data, node);
        } else {
            if (this.data.height < node.height) {
                // swap trees if inserted one is bigger
                var tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            // insert the small tree into the large tree at appropriate level
            this._insert(node, this.data.height - node.height - 1, true);
        }

        return this;
    },

    insert: function insert(item) {
        if (item) this._insert(item, this.data.height - 1);
        return this;
    },

    clear: function clear() {
        this.data = {
            children: [],
            height: 1,
            bbox: empty(),
            leaf: true
        };
        return this;
    },

    remove: function remove(item) {
        if (!item) return this;

        var node = this.data,
            bbox = this.toBBox(item),
            path = [],
            indexes = [],
            i,
            parent,
            index,
            goingUp;

        // depth-first iterative tree traversal
        while (node || path.length) {

            if (!node) {
                // go up
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }

            if (node.leaf) {
                // check current node
                index = node.children.indexOf(item);

                if (index !== -1) {
                    // item found, remove the item and condense tree upwards
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }

            if (!goingUp && !node.leaf && contains(node.bbox, bbox)) {
                // go down
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];
            } else if (parent) {
                // go right
                i++;
                node = parent.children[i];
                goingUp = false;
            } else node = null; // nothing found
        }

        return this;
    },

    toBBox: function toBBox(item) {
        return item;
    },

    compareMinX: function compareMinX(a, b) {
        return a[0] - b[0];
    },
    compareMinY: function compareMinY(a, b) {
        return a[1] - b[1];
    },

    toJSON: function toJSON() {
        return this.data;
    },

    fromJSON: function fromJSON(data) {
        this.data = data;
        return this;
    },

    _all: function _all(node, result) {
        var nodesToSearch = [];
        while (node) {
            if (node.leaf) result.push.apply(result, node.children);else nodesToSearch.push.apply(nodesToSearch, node.children);

            node = nodesToSearch.pop();
        }
        return result;
    },

    _build: function _build(items, left, right, height) {

        var N = right - left + 1,
            M = this._maxEntries,
            node;

        if (N <= M) {
            // reached leaf level; return leaf
            node = {
                children: items.slice(left, right + 1),
                height: 1,
                bbox: null,
                leaf: true
            };
            calcBBox(node, this.toBBox);
            return node;
        }

        if (!height) {
            // target height of the bulk-loaded tree
            height = Math.ceil(Math.log(N) / Math.log(M));

            // target number of root entries to maximize storage utilization
            M = Math.ceil(N / Math.pow(M, height - 1));
        }

        node = {
            children: [],
            height: height,
            bbox: null,
            leaf: false
        };

        // split the items into M mostly square tiles

        var N2 = Math.ceil(N / M),
            N1 = N2 * Math.ceil(Math.sqrt(M)),
            i,
            j,
            right2,
            right3;

        multiSelect(items, left, right, N1, this.compareMinX);

        for (i = left; i <= right; i += N1) {

            right2 = Math.min(i + N1 - 1, right);

            multiSelect(items, i, right2, N2, this.compareMinY);

            for (j = i; j <= right2; j += N2) {

                right3 = Math.min(j + N2 - 1, right2);

                // pack each entry recursively
                node.children.push(this._build(items, j, right3, height - 1));
            }
        }

        calcBBox(node, this.toBBox);

        return node;
    },

    _chooseSubtree: function _chooseSubtree(bbox, node, level, path) {

        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

        while (true) {
            path.push(node);

            if (node.leaf || path.length - 1 === level) break;

            minArea = minEnlargement = Infinity;

            for (i = 0, len = node.children.length; i < len; i++) {
                child = node.children[i];
                area = bboxArea(child.bbox);
                enlargement = enlargedArea(bbox, child.bbox) - area;

                // choose entry with the least area enlargement
                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;
                } else if (enlargement === minEnlargement) {
                    // otherwise choose one with the smallest area
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }

            node = targetNode || node.children[0];
        }

        return node;
    },

    _insert: function _insert(item, level, isNode) {

        var toBBox = this.toBBox,
            bbox = isNode ? item.bbox : toBBox(item),
            insertPath = [];

        // find the best node for accommodating the item, saving all nodes along the path too
        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

        // put the item into the node
        node.children.push(item);
        extend(node.bbox, bbox);

        // split on node overflow; propagate upwards if necessary
        while (level >= 0) {
            if (insertPath[level].children.length > this._maxEntries) {
                this._split(insertPath, level);
                level--;
            } else break;
        }

        // adjust bboxes along the insertion path
        this._adjustParentBBoxes(bbox, insertPath, level);
    },

    // split overflowed node into two
    _split: function _split(insertPath, level) {

        var node = insertPath[level],
            M = node.children.length,
            m = this._minEntries;

        this._chooseSplitAxis(node, m, M);

        var splitIndex = this._chooseSplitIndex(node, m, M);

        var newNode = {
            children: node.children.splice(splitIndex, node.children.length - splitIndex),
            height: node.height,
            bbox: null,
            leaf: false
        };

        if (node.leaf) newNode.leaf = true;

        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);

        if (level) insertPath[level - 1].children.push(newNode);else this._splitRoot(node, newNode);
    },

    _splitRoot: function _splitRoot(node, newNode) {
        // split root node
        this.data = {
            children: [node, newNode],
            height: node.height + 1,
            bbox: null,
            leaf: false
        };
        calcBBox(this.data, this.toBBox);
    },

    _chooseSplitIndex: function _chooseSplitIndex(node, m, M) {

        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

        minOverlap = minArea = Infinity;

        for (i = m; i <= M - m; i++) {
            bbox1 = distBBox(node, 0, i, this.toBBox);
            bbox2 = distBBox(node, i, M, this.toBBox);

            overlap = intersectionArea(bbox1, bbox2);
            area = bboxArea(bbox1) + bboxArea(bbox2);

            // choose distribution with minimum overlap
            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;

                minArea = area < minArea ? area : minArea;
            } else if (overlap === minOverlap) {
                // otherwise choose distribution with minimum area
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }

        return index;
    },

    // sorts node children by the best axis for split
    _chooseSplitAxis: function _chooseSplitAxis(node, m, M) {

        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
            xMargin = this._allDistMargin(node, m, M, compareMinX),
            yMargin = this._allDistMargin(node, m, M, compareMinY);

        // if total distributions margin value is minimal for x, sort by minX,
        // otherwise it's already sorted by minY
        if (xMargin < yMargin) node.children.sort(compareMinX);
    },

    // total margin of all possible split distributions where each node is at least m full
    _allDistMargin: function _allDistMargin(node, m, M, compare) {

        node.children.sort(compare);

        var toBBox = this.toBBox,
            leftBBox = distBBox(node, 0, m, toBBox),
            rightBBox = distBBox(node, M - m, M, toBBox),
            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
            i,
            child;

        for (i = m; i < M - m; i++) {
            child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child.bbox);
            margin += bboxMargin(leftBBox);
        }

        for (i = M - m - 1; i >= m; i--) {
            child = node.children[i];
            extend(rightBBox, node.leaf ? toBBox(child) : child.bbox);
            margin += bboxMargin(rightBBox);
        }

        return margin;
    },

    _adjustParentBBoxes: function _adjustParentBBoxes(bbox, path, level) {
        // adjust bboxes along the given tree path
        for (var i = level; i >= 0; i--) {
            extend(path[i].bbox, bbox);
        }
    },

    _condense: function _condense(path) {
        // go through the path, removing empty nodes and updating bboxes
        for (var i = path.length - 1, siblings; i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);
                } else this.clear();
            } else calcBBox(path[i], this.toBBox);
        }
    },

    _initFormat: function _initFormat(format) {
        // data format (minX, minY, maxX, maxY accessors)

        // uses eval-type function compilation instead of just accepting a toBBox function
        // because the algorithms are very sensitive to sorting functions performance,
        // so they should be dead simple and without inner calls

        var compareArr = ['return a', ' - b', ';'];

        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

        this.toBBox = new Function('a', 'return [a' + format.join(', a') + '];');
    }
};

// calculate node's bbox from bboxes of its children
function calcBBox(node, toBBox) {
    node.bbox = distBBox(node, 0, node.children.length, toBBox);
}

// min bounding rectangle of node children from k to p-1
function distBBox(node, k, p, toBBox) {
    var bbox = empty();

    for (var i = k, child; i < p; i++) {
        child = node.children[i];
        extend(bbox, node.leaf ? toBBox(child) : child.bbox);
    }

    return bbox;
}

function empty() {
    return [Infinity, Infinity, -Infinity, -Infinity];
}

function extend(a, b) {
    a[0] = Math.min(a[0], b[0]);
    a[1] = Math.min(a[1], b[1]);
    a[2] = Math.max(a[2], b[2]);
    a[3] = Math.max(a[3], b[3]);
    return a;
}

function compareNodeMinX(a, b) {
    return a.bbox[0] - b.bbox[0];
}
function compareNodeMinY(a, b) {
    return a.bbox[1] - b.bbox[1];
}

function bboxArea(a) {
    return (a[2] - a[0]) * (a[3] - a[1]);
}
function bboxMargin(a) {
    return a[2] - a[0] + (a[3] - a[1]);
}

function enlargedArea(a, b) {
    return (Math.max(b[2], a[2]) - Math.min(b[0], a[0])) * (Math.max(b[3], a[3]) - Math.min(b[1], a[1]));
}

function intersectionArea(a, b) {
    var minX = Math.max(a[0], b[0]),
        minY = Math.max(a[1], b[1]),
        maxX = Math.min(a[2], b[2]),
        maxY = Math.min(a[3], b[3]);

    return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
}

function contains(a, b) {
    return a[0] <= b[0] && a[1] <= b[1] && b[2] <= a[2] && b[3] <= a[3];
}

function intersects(a, b) {
    return b[0] <= a[2] && b[1] <= a[3] && b[2] >= a[0] && b[3] >= a[1];
}

// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
// combines selection algorithm with binary divide & conquer approach

function multiSelect(arr, left, right, n, compare) {
    var stack = [left, right],
        mid;

    while (stack.length) {
        right = stack.pop();
        left = stack.pop();

        if (right - left <= n) continue;

        mid = left + Math.ceil((right - left) / n / 2) * n;
        select(arr, left, right, mid, compare);

        stack.push(left, mid, mid, right);
    }
}

// Floyd-Rivest selection algorithm:
// sort an array between left and right (inclusive) so that the smallest k elements come first (unordered)
function select(arr, left, right, k, compare) {
    var n, i, z, s, sd, newLeft, newRight, t, j;

    while (right > left) {
        if (right - left > 600) {
            n = right - left + 1;
            i = k - left + 1;
            z = Math.log(n);
            s = 0.5 * Math.exp(2 * z / 3);
            sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (i - n / 2 < 0 ? -1 : 1);
            newLeft = Math.max(left, Math.floor(k - i * s / n + sd));
            newRight = Math.min(right, Math.floor(k + (n - i) * s / n + sd));
            select(arr, newLeft, newRight, k, compare);
        }

        t = arr[k];
        i = left;
        j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) swap(arr, left, right);

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) {
                i++;
            }while (compare(arr[j], t) > 0) {
                j--;
            }
        }

        if (compare(arr[left], t) === 0) swap(arr, left, j);else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

exports.default = rbush;

/***/ }),

/***/ "./src/spatialSearch/spatialSearch.js":
/*!********************************************!*\
  !*** ./src/spatialSearch/spatialSearch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rbush = __webpack_require__(/*! ./rbush */ "./src/spatialSearch/rbush.js");

var _rbush2 = _interopRequireDefault(_rbush);

var _geomutils = __webpack_require__(/*! ../geomutils */ "./src/geomutils.js");

var _geomutils2 = _interopRequireDefault(_geomutils);

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _primitiveTools = __webpack_require__(/*! ../primitiveTools */ "./src/primitiveTools.js");

var _geomtools = __webpack_require__(/*! ./geomtools */ "./src/spatialSearch/geomtools.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */

var ct = {};
function getEdgeShift(context, screensize, e, ct) {
  _geomutils2.default.getCurveShift(e, ct); //get shift because of edge-to-edge functionality


  //compute all transformations made in the vertex shader
  var ctx = void 0,
      cty = void 0,
      citx = void 0,
      city = void 0;

  ctx = -ct.y;
  cty = ct.x * context.aspect2;

  var len2 = ctx * context.width * ctx * context.width + cty * context.height * cty * context.height;

  if ((0, _geomtools.eq)(len2, 0)) {
    ctx = 0;
    cty = 0;
  } else {
    var len = Math.sqrt(len2);
    ctx *= context.curveExc * 0.25 * screensize / len;
    cty *= context.curveExc * 0.25 * screensize / len;
  }

  var sizex = 2.5 * context.nodeSize * screensize / context.width;
  var sizey = 2.5 * context.nodeSize * screensize / context.height;
  citx = -ct.cy * 0.5 * sizex;
  city = ct.cx * 0.5 * sizey;

  ct.x = ctx + citx;
  ct.y = cty + city;
}

var Node = function () {
  function Node(n) {
    _classCallCheck(this, Node);

    this.e = n;
  }

  _createClass(Node, [{
    key: 'getBBox',
    value: function getBBox() {
      return [this.e.x - _geomtools.EPS, this.e.y - _geomtools.EPS, this.e.x + _geomtools.EPS, this.e.y + _geomtools.EPS];
    }
  }, {
    key: 'intersectsRect',
    value: function intersectsRect(x1, y1, x2, y2) {
      return (0, _geomtools.pointInRect)(this.e.x, this.e.y, x1, y1, x2, y2);
    }
  }, {
    key: 'dist2',
    value: function dist2(x, y, context) {
      return (0, _geomtools.distance2)(x, y, this.e.x, this.e.y);
    }
  }, {
    key: 'isNode',
    get: function get() {
      return true;
    }
  }]);

  return Node;
}();

var Label = function () {
  function Label(n, textpos, style, fontSize, isSDF, getLabelSize) {
    _classCallCheck(this, Label);

    this.e = n;
    this.pos = textpos;
    this.style = style;
    this.fontSize = fontSize;
    this.isSDF = isSDF;
    this.getLabelSize = getLabelSize;
  }

  _createClass(Label, [{
    key: 'getTextPos',
    value: function getTextPos(context, size) {
      var x = this.e.x;
      var y = this.e.y;

      var x1 = void 0,
          y1 = void 0,
          x2 = void 0,
          y2 = void 0;
      x1 = x2 = x;
      y1 = y2 = y;

      var wantedSize = this.isSDF ? this.getLabelSize(context, this.style.label || {}) : this.fontSize;

      var fontScale = wantedSize / this.fontSize;
      if (wantedSize === 0) {
        fontScale = 0;
      };

      var step = function step(edge, x) {
        return x < edge ? 0 : 1;
      };

      var offset = 0.5 * context.nodeSize;
      var MAX = 10.;
      var MIN = -10.;
      var bbox = [MAX, MAX, MIN, MIN];

      this.pos.forEach(function (c) {
        var offsety = (2.0 * step(y, 0.5) - 1.0) * offset;
        x1 = x + size * (c.dx * fontScale) / context.width / 2;
        y1 = y + size * (c.dy * fontScale + offsety) / context.height / 2;
        x2 = x + size * ((c.dx + c.width) * fontScale) / context.width / 2;
        y2 = y + size * ((c.dy + c.height) * fontScale + offsety) / context.height / 2;

        bbox[0] = Math.min(x1, bbox[0]);
        bbox[1] = Math.min(y1, bbox[1]);
        bbox[2] = Math.max(x2, bbox[2]);
        bbox[3] = Math.max(y2, bbox[3]);
      });

      return bbox;
    }
  }, {
    key: 'getBBox',
    value: function getBBox(context) {
      var bb = this.getTextPos(context, 1);
      bb[0] = Math.min(bb[0], this.e.x);
      bb[1] = Math.min(bb[1], this.e.y);
      bb[2] = Math.max(bb[2], this.e.x);
      bb[3] = Math.max(bb[3], this.e.y);
      return bb;
    }
  }, {
    key: 'intersectsRect',
    value: function intersectsRect(x1, y1, x2, y2, context, size) {
      var t = this.getTextPos(context, size);
      return (0, _geomtools.rectIntersectsRect)(x1, y1, x2, y2, t[0], t[1], t[2], t[3]);
    }
  }, {
    key: 'dist2',
    value: function dist2(x, y, context, size) {
      var t = this.getTextPos(context, size);

      if ((0, _geomtools.pointInRect)(x, y, t[0], t[1], t[2], t[3])) return 0;

      //minimum from distance from corners or distance from borders
      return Math.min((0, _geomtools.distance2)(t[0], t[1]), (0, _geomtools.distance2)(t[2], t[3]), (0, _geomtools.distance2)(t[0], t[3]), (0, _geomtools.distance2)(t[2], t[1]), (0, _geomtools.pDistance2)(x, y, t[0], t[1], t[2], t[1]), (0, _geomtools.pDistance2)(x, y, t[0], t[3], t[2], t[3]), (0, _geomtools.pDistance2)(x, y, t[0], t[1], t[0], t[3]), (0, _geomtools.pDistance2)(x, y, t[2], t[1], t[2], t[3]));
    }
  }, {
    key: 'isLabel',
    get: function get() {
      return true;
    }
  }]);

  return Label;
}();

var Line = function () {
  function Line(l) {
    _classCallCheck(this, Line);

    this.e = l;
  }

  _createClass(Line, [{
    key: 'getPoints',
    value: function getPoints(context, size) {
      var x1 = void 0,
          y1 = void 0,
          x2 = void 0,
          y2 = void 0;

      var s = _geomutils2.default.edgeSource(this.e);
      var t = _geomutils2.default.edgeTarget(this.e);

      x1 = s.x;
      y1 = s.y;
      x2 = t.x;
      y2 = t.y;

      getEdgeShift(context, size, s.e, ct);
      x1 += ct.x;
      y1 += ct.y;
      getEdgeShift(context, size, t.e, ct);
      x2 += ct.x;
      y2 += ct.y;

      return [x1, y1, x2, y2];
    }
  }, {
    key: 'getBBox',
    value: function getBBox(context, size) {
      var p = this.getPoints(context, size);

      return [Math.min(p[0], p[2]), Math.min(p[1], p[3]), Math.max(p[0], p[2]), Math.max(p[1], p[3])];
    }
  }, {
    key: 'intersectsRect',
    value: function intersectsRect(x1, y1, x2, y2, context, size) {
      var p = this.getPoints(context, size);

      return (0, _geomtools.lineIntersectsRect)(p[0], p[1], p[2], p[3], x1, y1, x2, y2);
    }
  }, {
    key: 'dist2',
    value: function dist2(x, y, context, size) {
      var p = this.getPoints(context, size);

      return (0, _geomtools.pDistance2)(x, y, p[0], p[1], p[2], p[3]);
    }
  }, {
    key: 'isEdge',
    get: function get() {
      return true;
    }
  }]);

  return Line;
}();

var Circle = function () {
  function Circle(c) {
    _classCallCheck(this, Circle);

    this.e = c;
  }

  _createClass(Circle, [{
    key: 'getBezierPoints',
    value: function getBezierPoints(context, screensize) {
      var x1 = void 0,
          y1 = void 0,
          s = void 0;
      s = _geomutils2.default.edgeSource(this.e);
      x1 = s.x;
      y1 = s.y;

      var size = 2.5 * context.nodeSize * screensize;
      var xsize = size / context.width / 2;
      var ysize = size / context.height / 2;

      var d = s.y < 0.5 ? 1 : -1;

      getEdgeShift(context, screensize, s.e, ct);
      x1 += ct.x;
      y1 += ct.y;

      return [x1, y1, x1 + xsize * 1, y1 + ysize * d, x1, y1 + ysize * 1.25 * d, x1 - xsize * 1, y1 + ysize * d];
    }
  }, {
    key: 'getBBox',
    value: function getBBox(context, size) {
      var v = this.getBezierPoints(context, size);

      return (0, _geomtools.getBBFromPoints)(v);
    }
  }, {
    key: 'intersectsRect',
    value: function intersectsRect(x1, y1, x2, y2, context, size, normalize) {
      var v = this.getBezierPoints(context, size);
      return (0, _geomtools.bezierIntersectsRect)(v[0], v[1], v[2], v[3], v[4], v[5], x1, y1, x2, y2) || (0, _geomtools.bezierIntersectsRect)(v[2], v[3], v[4], v[5], v[6], v[7], x1, y1, x2, y2);
    }
  }, {
    key: 'dist2',
    value: function dist2(x, y, context, size) {
      var v = this.getBezierPoints(context, size);

      //circle is just 2 bezier curves :)
      var d1 = (0, _geomtools.distance2ToBezier)(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
      var d2 = (0, _geomtools.distance2ToBezier)(x, y, v[2], v[3], v[4], v[5], v[6], v[7]);

      return Math.min(d1, d2);
    }
  }, {
    key: 'isEdge',
    get: function get() {
      return true;
    }
  }]);

  return Circle;
}();

var Curve = function () {
  function Curve(c) {
    _classCallCheck(this, Curve);

    this.e = c;
  }

  _createClass(Curve, [{
    key: 'getBezierPoints',
    value: function getBezierPoints(context, size, normalize) {
      var x1 = void 0,
          x2 = void 0,
          y1 = void 0,
          y2 = void 0;
      var s = _geomutils2.default.edgeSource(this.e);
      var t = _geomutils2.default.edgeTarget(this.e);

      x1 = s.x;
      y1 = s.y;
      x2 = t.x;
      y2 = t.y;

      var d = normalize(s, t);

      var n2 = d.y;
      var n3 = context.aspect2 * -d.x;

      var x = context.width * n2;
      var y = context.height * n3;
      var l = Math.sqrt(x * x + y * y) * 2;

      n2 *= context.curveExc * size / l;
      n3 *= context.curveExc * size / l;

      getEdgeShift(context, size, s.e, ct);
      x1 += ct.x;
      y1 += ct.y;
      getEdgeShift(context, size, t.e, ct);
      x2 += ct.x;
      y2 += ct.y;

      var ret = [x1, y1, (x1 + x2) / 2 + n2, (y1 + y2) / 2 + n3, x2, y2];
      return ret;
    }
  }, {
    key: 'intersectsRect',
    value: function intersectsRect(x1, y1, x2, y2, context, size, normalize) {
      var v = this.getBezierPoints(context, size, normalize);
      return (0, _geomtools.bezierIntersectsRect)(v[0], v[1], v[2], v[3], v[4], v[5], x1, y1, x2, y2);
    }
  }, {
    key: 'getBBox',
    value: function getBBox(context, size, normalize) {
      var v = this.getBezierPoints(context, size, normalize);
      return (0, _geomtools.getBBFromPoints)(v);
    }
  }, {
    key: 'dist2',
    value: function dist2(x, y, context, size, normalize) {
      var v = this.getBezierPoints(context, size, normalize);
      return (0, _geomtools.distance2ToBezier)(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
    }
  }, {
    key: 'isEdge',
    get: function get() {
      return true;
    }
  }]);

  return Curve;
}();

function sortByDistances(e1, e2) {
  return e1.dist2 - e2.dist2;
}

var tConst = { nodes: Node, lines: Line, circles: Circle, curves: Curve, labels: Label };

var spatialIndex = function () {
  function spatialIndex(c, texts, options, nodes, nodesParts, lines, linesParts, curves, curvesParts, circles, circlesParts, normalize, nodeStyle, getLabelSize, getLabelHideScreen) {
    _classCallCheck(this, spatialIndex);

    //init all elements into rbush tree with size 1 (outer bound - the worst case)
    var size = 1;var oldsize = c.size || 1;c.size = 1.;

    this.texts = texts;
    this.normalize = normalize;
    var t = this.types = { nodes: [], lines: [], circles: [], curves: [], labels: [] };
    var i = 0,
        d = [];

    var addEntity = function addEntity(e, d, i) {
      d[i] = e.getBBox(c, size, normalize);
      d[i].push(e);
      return e;
    };

    nodes.forEach(function (n) {
      t.nodes.push(addEntity(new Node(n), d, i++));
    });

    lines.forEach(function (l) {
      t.lines.push(addEntity(new Line(l), d, i++));
    });

    circles.forEach(function (c) {
      t.circles.push(addEntity(new Circle(c), d, i++));
    });

    curves.forEach(function (c) {
      t.curves.push(addEntity(new Curve(c), d, i++));
    });

    var sd = {};
    var sdi = {};

    //labels position could differ by style >> must partition by it

    var _loop = function _loop(style) {
      var nodes = nodesParts[style];

      var ns = (0, _primitiveTools.getPartitionStyle)(options.styles[style], nodeStyle, "label");
      var textEngine = texts.getEngine(ns.font);
      textEngine.setFont(ns.font);
      var fontSize = textEngine.fontSize;
      var isSDF = textEngine.isSDF;

      var sd_n = sd[style] || (sd[style] = []);
      var sdi_n = sdi[style] || (sdi[style] = 0);

      //biggest size in which the text is shown
      c.size = getLabelHideScreen(c, ns.label || {});
      nodes.forEach(function (n) {
        var textpos = textEngine.get(n.label, n.x, n.y);
        t.labels.push(addEntity(new Label(n, textpos, ns, fontSize, isSDF, getLabelSize), sd_n, sdi_n++));
      });

      sdi[style] = sdi_n;
    };

    for (var style in nodesParts) {
      _loop(style);
    }

    this.rbushtree_s = {};
    for (var style in sd) {
      var rb = this.rbushtree_s[style] = (0, _rbush2.default)();
      rb.load(sd[style]);
    }

    //tree initialization
    this.rbushtree = (0, _rbush2.default)();
    this.rbushtree.load(d);

    //restore the size of scale (loosen outer the upper bound)
    c.size = oldsize;
  }

  _createClass(spatialIndex, [{
    key: '_tryAddEl',
    value: function _tryAddEl(ret, e, dist2, nodes, edges, labels) {
      if (nodes && e.isNode) {
        ret.nodes.push({ node: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
      }
      if (edges && e.isEdge) {
        ret.edges.push({ edge: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
      }
      if (labels && e.isLabel) {
        ret.labels.push({ label: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
      }
    }
  }, {
    key: 'findArea',
    value: function findArea(context, x1, y1, x2, y2, size, nodes, edges, labels) {
      if (x1 > x2) {
        var p = x1;
        x1 = x2;
        x2 = p;
      }
      if (y1 > y2) {
        var _p = y1;
        y1 = y2;
        y2 = _p;
      }

      var ret = {};
      if (edges) ret.edges = [];
      if (nodes) ret.nodes = [];
      if (labels) ret.labels = [];

      var x = (x1 + x2) / 2;
      var y = (y1 + y2) / 2;

      var data = this.rbushtree.search([x1 - _geomtools.EPS, y1 - _geomtools.EPS, x2 + _geomtools.EPS, y2 + _geomtools.EPS]);
      if (labels) {
        for (var s in this.rbushtree_s) {
          data = data.concat(this.rbushtree_s[s].search([x1 - _geomtools.EPS, y1 - _geomtools.EPS, x2 + _geomtools.EPS, y2 + _geomtools.EPS]));
        }
      }

      for (var i = 0; i < data.length; i++) {
        var e = data[i][4];
        var dist2 = e.dist2(x, y, context, size, this.normalize, this.texts);
        if (!e.intersectsRect(x1, y1, x2, y2, context, size, this.normalize, this.texts)) continue;

        this._tryAddEl(ret, e, dist2, nodes, edges, labels);
      }

      for (var k in ret) {
        ret[k].sort(sortByDistances);
      }

      return ret;
    }
  }, {
    key: 'find',
    value: function find(context, x, y, radius, size, nodes, edges, labels) {
      var ret = {};
      if (edges) ret.edges = [];
      if (nodes) ret.nodes = [];
      if (labels) ret.labels = [];

      var xradius = radius;
      var yradius = radius;

      var radius2 = radius * radius;

      var data = this.rbushtree.search([x - xradius, y - yradius, x + xradius, y + yradius]);
      if (labels) {
        for (var s in this.rbushtree_s) {
          data = data.concat(this.rbushtree_s[s].search([x - xradius, y - yradius, x + xradius, y + yradius]));
        }
      }

      for (var i = 0; i < data.length; i++) {
        var e = data[i][4];
        var dist2 = e.dist2(x, y, context, size, this.normalize, this.texts);
        if (dist2 > radius2) continue;

        this._tryAddEl(ret, e, dist2, nodes, edges, labels);
      }

      for (var k in ret) {
        ret[k].sort(sortByDistances);
      }

      return ret;
    }
  }, {
    key: 'update',
    value: function update(context, t, i, v) {
      //init all elements into rbush tree with size 1 (the biggest possible - the worst case)
      var size = 1;

      this.rbushtree.remove(this.types[t][i]);

      var e = new tConst[t](v);
      var arr = e.getBBox(context, size, this.normalize, this.texts);
      arr.push(e);

      this.rbushtree.insert(this.types[t][i] = arr);
    }
  }]);

  return spatialIndex;
}();

exports.default = spatialIndex;

/***/ }),

/***/ "./src/texts/default.js":
/*!******************************!*\
  !*** ./src/texts/default.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

var _class = function () {
  function _class(gl, files, textures) {
    _classCallCheck(this, _class);

    this._gl = gl;
    this._size = 1024;

    this._canvas = document.createElement("canvas");
    this._canvas.width = this._canvas.height = this._size;
    this._canvas.style.width = this._canvas.style.height = this._size + 'px';
    this._canvas.style.display = "none";
    this._el = document.body.appendChild(this._canvas);

    this._context = this._canvas.getContext('2d');
    this._context.fillStyle = "white";
    this._context.textAlign = "left";
    this._context.textBaseline = "top";

    this._rendered = this._texts = this._x = this._y = this._height = undefined;

    this.texture = this._gl.createTexture();
  }

  _createClass(_class, [{
    key: "clear",
    value: function clear() {
      this._rendered = {};
      this._context.clearRect(0, 0, this._size, this._size);
      this._height = this._x = this._y = 0;
    }
  }, {
    key: "setFont",
    value: function setFont(font) {
      var fontstr = font ? font.size + "px " + font.type : undefined;

      this._rendered[fontstr] = this._texts = this._rendered[fontstr] || {};
      this._context.font = fontstr;
      this._x = 0;
      this._y += this._height;
      this._height = font ? font.size + 1 : NaN;
    }
  }, {
    key: "getTexture",
    value: function getTexture(style, onLoad) {
      onLoad();
      return this.texture;
    }
  }, {
    key: "_getText",
    value: function _getText(text) {
      var result = this._texts[text];
      if (!result) {
        var width = this._context.measureText(text).width;
        if (this._x + width > this._size) {
          this._x = 0;
          this._y += this._height;
        }
        this._context.fillText(text, this._x, this._y);
        this._texts[text] = result = {
          width: width,
          height: this._height,
          left: this._x / this._size,
          right: (this._x + width) / this._size,
          top: this._y / this._size,
          bottom: (this._y + this._height) / this._size
        };
        this._x += width;
      }
      return result;
    }
  }, {
    key: "get",
    value: function get(text, x, y) {
      var c = this._getText(text);

      var dx = x <= 0.5 ? 0 : -c.width;
      var dy = y <= 0.5 ? 0 : -c.height;

      return [{
        width: c.width,
        height: c.height,
        left: c.left,
        right: c.right,
        top: c.top,
        bottom: c.bottom,
        dx: dx,
        dy: dy
      }];
    }
  }, {
    key: "steps",
    value: function steps(text) {
      return 1;
    }
  }, {
    key: "bind",
    value: function bind() {
      this._gl.bindTexture(this._gl.TEXTURE_2D, this.texture);
      this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
      this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._canvas);
      this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    }
  }, {
    key: "remove",
    value: function remove() {
      this._context && this._el.parentNode.removeChild(this._el);
    }
  }, {
    key: "fontSize",
    get: function get() {
      return this._height - 1;
    }
  }]);

  return _class;
}();

exports.default = _class;
;

/***/ }),

/***/ "./src/texts/sdf/atlas.js":
/*!********************************!*\
  !*** ./src/texts/sdf/atlas.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shelfPack = __webpack_require__(/*! shelf-pack */ "./node_modules/shelf-pack/index.umd.js");

var _shelfPack2 = _interopRequireDefault(_shelfPack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// size of the spritesheet generated in pixels
var DEFAULT_SIZE = 1024;

// multiplication factor by which spritesheet can grow, if shelfpack is full
var SIZE_GROWTH_RATE = 4;

// max size to contain all the characters in the spritesheet
// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
var MAX_SIZE = 2048;

var GlyphAtlas = function () {
    function GlyphAtlas(gl, resetCache) {
        _classCallCheck(this, GlyphAtlas);

        // setting width to default
        this.width = DEFAULT_SIZE;

        // setting height to default
        this.height = DEFAULT_SIZE;

        // resets cached glyphs in sdf.js before making resize() call
        this._resetCache = resetCache;

        // creating an empty spritesheet to pack glyphs
        this.bin = new _shelfPack2.default(this.width, this.height);

        /**
         * stores information coordinate about character
         *
         * (Object):
         *  "fontstring#charid": {
         *      id, x, y, h, w, maxh, maxw, ref_count
         *  }
         */
        this.index = {};

        /**
         * stores list of character ids available in atlas.js
         *
         * (Object):
         *  "fontstring#charid": ["charid"]
         */
        this.ids = {};

        // webgl rendering context
        this.gl = gl;

        // initialized to empty Uint8Array buffer to store texture data
        this.data = new Uint8Array(this.width * this.height);
    }

    // refreshes texture of characters when updateTexture() is called


    _createClass(GlyphAtlas, [{
        key: '_createTexture',
        value: function _createTexture() {
            //
            this.dirty = false;

            // standard creation of webgl texture
            var gl = this.gl;
            var texture = gl.createTexture();
            // binds texture buffer to the target (gl.TEXTURE_2D = a 2 dimensional texture)
            gl.bindTexture(gl.TEXTURE_2D, texture);

            /**
             * pixelStorei() (Func): specifies the pixel storage modes
             * UNPACK_FLIP_Y_WEBGL (Parameter): Flips the source data along its vertical axis if true.
             */
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

            // standard interpolation Filters
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // specifies a two-dimensional image for texture buffer stored in variable named "texture"
            gl.texImage2D(gl.TEXTURE_2D, // target: A two-dimensional texture
            0, // level of detail: 0 = base image level; n = nth mipmap reduction level
            gl.ALPHA, // internalFormat: only reads the alpha component
            this.width, // width
            this.height, // height
            0, // border
            gl.ALPHA, // format
            gl.UNSIGNED_BYTE, // type
            this.data // ImageData object
            );

            // Unbinding the buffer channel
            gl.bindTexture(gl.TEXTURE_2D, null);

            // returning so formed texture
            return texture;
        }

        // utility function that returns list of glyphs added

    }, {
        key: 'getGlyphs',
        value: function getGlyphs() {
            var glyphs = {};
            var split = void 0,
                name = void 0,
                id = void 0;

            for (var key in this.ids) {
                split = key.split('#');
                name = split[0];
                id = split[1];

                if (!glyphs[name]) glyphs[name] = [];
                glyphs[name].push(id);
            }
            return glyphs;
        }

        // utility function that returns list of rects added

    }, {
        key: 'getRects',
        value: function getRects() {
            var rects = {};
            var split = void 0,
                name = void 0,
                id = void 0;

            for (var key in this.ids) {
                split = key.split('#');
                name = split[0];
                id = split[1];

                if (!rects[name]) rects[name] = {};
                rects[name][id] = this.index[key];
            }
            return rects;
        }

        // main function of the module called from sdf.js

    }, {
        key: 'addGlyph',
        value: function addGlyph(id, // character id
        name, // name of the font - "fontstrong#range.pbf"
        glyph, // glyph object from sdf.js
        buffer, // padding around glyph
        fontSize, markDirty //
        ) {
            if (!glyph) return null;

            // compiles 'name' and glyph.id into a single string with a seperator '#'
            var key = name + '#' + glyph.id;

            // if key is present in index and not present in ids then add it in ids
            if (this.index[key]) {
                if (this.ids[key].indexOf(id) < 0) {
                    this.ids[key].push(id);
                }
                return this.index[key];
            }

            var bufferedWidth = glyph.width + buffer * 2;
            var bufferedHeight = glyph.height + buffer * 2;

            // Add a 1px border around every image.
            // 'padding' variable is basically border
            // buffer variable is basically padding
            var padding = Math.floor(Math.pow(Math.ceil(fontSize / 7), 2));
            // const padding = 12;
            var packWidth = bufferedWidth + 2 * padding;
            var packHeight = bufferedHeight + 2 * padding;

            // Increase to next number divisible by 4, but at least 1.
            // This is so we can scale down the texture coordinates and pack them into fewer bytes
            packWidth += 4 - packWidth % 4;
            packHeight += 4 - packHeight % 4;

            var rect = this.bin.packOne(packWidth, packHeight);

            // if the current size is not sufficient to contain all the characters in the texture
            // then, expand (resize) it
            if (!rect) {
                this.resize();
                rect = this.bin.packOne(packWidth, packHeight);
                // if markDirty callback was passed then execute it
                markDirty && markDirty();
            }

            // if still not found then there is some problem, simply return null to indicate problem
            if (!rect) {
                return null;
            }

            this.index[key] = rect;
            this.ids[key] = [id];

            // if bitmap corresponding to the glyph object exists then, add the glyph
            if (glyph.bitmap) {
                var target = this.data;
                var source = glyph.bitmap;
                for (var y = 0; y < bufferedHeight; y++) {
                    var y1 = this.width * (rect.y + y + padding) + rect.x + padding;
                    var y2 = bufferedWidth * y;
                    for (var x = 0; x < bufferedWidth; x++) {
                        target[y1 + x] = source[y2 + x];
                    }
                }
            }
            this.dirty = true;
            return rect;
        }

        // expands the size of the texture if all the characters were not contained in default size

    }, {
        key: 'resize',
        value: function resize() {
            var prevWidth = this.width;
            var prevHeight = this.height;

            if (prevWidth >= MAX_SIZE || prevHeight >= MAX_SIZE) return;

            if (this._texture) {
                if (this.gl) {
                    this.gl.deleteTexture(this._texture);
                }
                this._texture = null;
            }

            this.width *= SIZE_GROWTH_RATE;
            this.height *= SIZE_GROWTH_RATE;
            this.bin.resize(this.width, this.height);

            var buf = new ArrayBuffer(this.width * this.height);
            for (var i = 0; i < prevHeight; i++) {
                var src = new Uint8Array(this.data.buffer, prevHeight * i, prevWidth);
                var dst = new Uint8Array(buf, prevHeight * i * SIZE_GROWTH_RATE, prevWidth);
                dst.set(src);
            }
            this.data = new Uint8Array(buf);
            this._resetCache();
        }
    }, {
        key: 'bind',
        value: function bind(gl) {}

        // getter of texture from GlyphAtlas object

    }, {
        key: 'updateTexture',
        value: function updateTexture() {
            var gl = this.gl;
            if (!this._texture) {
                this._texture = this._createTexture();
            }

            // if dirty functionality is true then:
            if (this.dirty) {

                gl.bindTexture(gl.TEXTURE_2D, this._texture);

                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                // specifies a sub - rectangle of the current texture
                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, gl.ALPHA, gl.UNSIGNED_BYTE, this.data);
                gl.bindTexture(gl.TEXTURE_2D, null);
                this.dirty = false;
            }
            return this._texture;
        }
    }, {
        key: 'texture',
        get: function get() {
            return this._texture;
        }
    }]);

    return GlyphAtlas;
}();

exports.default = GlyphAtlas;
;

/***/ }),

/***/ "./src/texts/sdf/glyphTrimmer.js":
/*!***************************************!*\
  !*** ./src/texts/sdf/glyphTrimmer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Algorithm to trim the glyph and add padding to it */
// Finding absolute left bound (lb) and right bound (rb) of the glyph
// Slicing the extra columns
// Adding buffer space on the sides

var _class = function () {
    function _class(buffer) {
        _classCallCheck(this, _class);

        if (buffer == undefined) this.buffer = 0;else this.buffer = buffer;
    }

    // find lb and rb of single row


    _createClass(_class, [{
        key: "_findRowBounds",
        value: function _findRowBounds(a) {
            // a == array
            var lb = 0,
                // left bound of individual row
            rb = 0; // right bound of individual row

            var threshold = 170;

            for (var i = 0; i < a.length; i++) {
                if (a[i] > threshold) {
                    lb = i;
                    break;
                }
            }
            if (!lb) lb = a.length;

            for (var _i = a.length; _i > -1; _i--) {
                if (a[_i] > threshold) {
                    rb = _i;
                    break;
                }
            }
            if (!rb) rb = -1;

            return [lb, rb];
        }
    }, {
        key: "_findGlyphBounds",
        value: function _findGlyphBounds(glyph) {
            var glyphData = glyph.bitmap;
            var numCols = glyph.width;
            var currentRow = [];

            var lbs = [],
                // row left bounds
            rbs = []; // row right bounds    
            var lb = -1,
                rb = glyphData.length;

            // iterate through every row
            for (var i = 0; i < glyphData.length; i += numCols) {
                // slice out the array
                currentRow = glyphData.slice(i, i + numCols);
                var res = this._findRowBounds(currentRow);
                lbs.push(res[0]);
                rbs.push(res[1]);
            }

            // choose the min(lbs) and max(rbs) as absolute lb and rb
            lb = Math.min.apply(Math, lbs);
            rb = Math.max.apply(Math, rbs);
            // if (lb >= numCols || rb < 0) throw "Glyph is empty";
            return [lb, rb];
        }
    }, {
        key: "process",
        value: function process(glyph) {
            var glyphData = glyph.bitmap;
            var numCols = glyph.width;

            var bounds = this._findGlyphBounds(glyph);
            var lb = bounds[0];
            var rb = bounds[1];

            var buffer = this.buffer;
            // const buffer = 20;
            // const buffer = 1;
            // const buffer = 0;

            var newData = [];
            // var newWidth = (rb - lb + 1) + buffer * 2 + 2;
            var newWidth = rb - lb + 1 + buffer * 2;
            // var newWidth = (rb - lb + 1);

            // iterate through every row
            var currentRow = [];
            for (var i = 0; i < glyphData.length; i += numCols) {
                currentRow = glyphData.slice(i, i + numCols);
                var bufferCol = Array.apply(null, Array(buffer)).map(Number.prototype.valueOf, 0);
                newData.push.apply(newData, _toConsumableArray(bufferCol).concat(_toConsumableArray(currentRow.slice(lb, rb + 1)), _toConsumableArray(bufferCol)));
            }

            // JS passes objects by reference. Therefore,
            glyph.bitmap = new Uint8ClampedArray(newData);
            glyph.width = newWidth;
            glyph.advance = newWidth;
        }
    }]);

    return _class;
}(); // ends class


exports.default = _class;

/***/ }),

/***/ "./src/texts/sdf/glyphs.js":
/*!*********************************!*\
  !*** ./src/texts/sdf/glyphs.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Glyphs;
function Glyphs(pbf, end) {
    this.stacks = pbf.readFields(readFontstacks, [], end);
}

function readFontstacks(tag, stacks, pbf) {
    if (tag === 1) {
        var fontstack = pbf.readMessage(readFontstack, { glyphs: {} });
        stacks.push(fontstack);
    }
}

function readFontstack(tag, fontstack, pbf) {
    if (tag === 1) fontstack.name = pbf.readString();else if (tag === 2) fontstack.range = pbf.readString();else if (tag === 3) {
        var glyph = pbf.readMessage(readGlyph, {});
        fontstack.glyphs[glyph.id] = glyph;
    }
}

function readGlyph(tag, glyph, pbf) {
    if (tag === 1) glyph.id = pbf.readVarint();else if (tag === 2) glyph.bitmap = pbf.readBytes();else if (tag === 3) glyph.width = pbf.readVarint();else if (tag === 4) glyph.height = pbf.readVarint();else if (tag === 5) glyph.left = pbf.readSVarint();else if (tag === 6) glyph.top = pbf.readSVarint();else if (tag === 7) glyph.advance = pbf.readVarint();
}

/***/ }),

/***/ "./src/texts/sdf/sdf.js":
/*!******************************!*\
  !*** ./src/texts/sdf/sdf.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pbf = __webpack_require__(/*! pbf */ "./node_modules/pbf/index.js");

var _pbf2 = _interopRequireDefault(_pbf);

var _atlas = __webpack_require__(/*! ./atlas */ "./src/texts/sdf/atlas.js");

var _atlas2 = _interopRequireDefault(_atlas);

var _glyphs = __webpack_require__(/*! ./glyphs */ "./src/texts/sdf/glyphs.js");

var _glyphs2 = _interopRequireDefault(_glyphs);

var _spriteGenerator = __webpack_require__(/*! ./spriteGenerator */ "./src/texts/sdf/spriteGenerator.js");

var _spriteGenerator2 = _interopRequireDefault(_spriteGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: Aleš Saska
 */

// A simplified representation of the glyph containing only the properties needed for shaping.
var SimpleGlyph = function SimpleGlyph(glyph, rect, buffer) {
  _classCallCheck(this, SimpleGlyph);

  var padding = 1;
  this.advance = glyph.advance;
  this.left = glyph.left - buffer - padding;
  this.top = glyph.top + buffer + padding;
  this.rect = rect;
};

// Multiplication factor by which the size will grow


var SIZE_GROWTH_RATE = 4;

// Size in which we try to contian the glyphs
var DEFAULT_SIZE = 512;

// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
// Maybe the maximum size allowed of the atlas
var MAX_SIZE = 2048;

// Class for the text engine

// invoked only when main configuration object, the "font" is mentioned and
// the proper link to the font file is present

var _class = function () {

  // new text engine object takes 3 arguments
  // 1. gl = Webgl context
  // 2. files = File object programmed in src/dataSources/files.js
  // 3. texture = Texture object programmed in src/dataSources/textures.js

  function _class(gl, files, textures) {
    var _this = this;

    _classCallCheck(this, _class);

    // Defines the dimensions of the texture
    this.width = DEFAULT_SIZE;
    this.height = DEFAULT_SIZE;

    // Does nothing. Required in default.js text engine
    this.clear();

    // _files contains the file object of the glyph obtained via protobuf
    this._files = files;

    // Webgl Rendering context
    this._gl = gl;

    // Atlas object programmed in src/texts/sdf/atlas.js
    this.atlas = new _atlas2.default(this._gl, function () {
      _this._cachedGlyphs = {};
    });

    // For every char_id, contains position, properties and buffer data
    this._glyphs = {};

    // For every char_id, contains position and properties
    this._rects = {};

    // glyphs that are cached from previous draw call of label for next one
    this._cachedGlyphs = {};

    // Client-Side builder of spritesheet
    this.spriteGenerator = new _spriteGenerator2.default();
  }

  // returns if we are using SDF TextEngine or not


  _createClass(_class, [{
    key: 'clear',


    // this is a dummy method to make 'interface' of sdf.js and default.js same
    value: function clear() {}

    /**
     * style = object: {
     *   pbf: <url to the font file on the server>
     *   type: 'sdf' {Type of the font file & sdf => distance transformed spriteSheet}
     * }
     */

  }, {
    key: 'setFont',
    value: function setFont(style) {
      // curFont => current_font
      // style.pbf examplar value = http://helikarlab.github.io/ccNetViz/fonts/FineHand/0-65535.pbf
      this.curFont = style.pbf;
    }

    // FontSize is fixed and hardcoded i.e. 24

  }, {
    key: 'getTexture',


    //
    value: function getTexture(style, onLoad) {
      // init with first most-used ASCII chars
      for (var i = 0; i < 128; i++) {
        // Cache the most used characters prior to the knowledge if they would be used in lables or not
        // TODO: Ideally get methods should return something which in-turn should pe passed to other variables
        this._getChar(String.fromCharCode(i));
      }
      onLoad && onLoad.apply(this, arguments);

      // by calling this._getChar, we have updated the texture in this.atlas object
      // following we are returning the updated object
      // TODO: this code is not intuitive, we can write better
      return this.atlas.texture;
    }

    /**
     * Updates the 'texture' member variable of this.atlas object
     *
     * text = single character which is to be added to the texture of 'this.atlas'
     * markDirty = ??? callback to be called if the size of the texture is resized
     */
    // TODO: parameter name should be changed from 'text' to 'char'

  }, {
    key: '_getChar',
    value: function _getChar(text, markDirty) {
      // curFont is same as style.pbf defined above
      // TODO: We are doing this too many times in this code. Find a better mech.
      var font = this.curFont;

      // glyphId is the character code of the glyph passed in arguments under the name 'text'
      var glyphID = text.charCodeAt(0);

      // Padding around the glyph
      var buffer = 0;

      var cache = this._cachedGlyphs[font] || (this._cachedGlyphs[font] = {});
      var glyph = cache[glyphID] && cache[glyphID].glyph || this.spriteGenerator.draw(text);

      // TODO: Delete following testing code
      if (t) {
        var imgData = this.spriteGenerator._makeRGBAImageData(glyph.bitmap, glyph.width, glyph.height);
        var testCanvas = document.getElementById("test-canvas");
        var ctx = testCanvas.getContext("2d");
        ctx.putImageData(imgData, 10, 20);
        --t;
      }

      var fontSize = this.spriteGenerator.fontSize;

      if (!this._rects[font]) this._rects[font] = {};
      var rect = this._rects[font][text] = this.atlas.addGlyph(glyphID, // character id
      this.curFont, // contains url of the font file on server
      glyph, // glyph object
      buffer, // padding
      fontSize, // fontSize
      markDirty // callback function to be called if texture resizes
      );

      return cache[glyphID] || (cache[glyphID] = new SimpleGlyph(glyph, rect, buffer));
    }
  }, {
    key: 'get',
    value: function get(text, x, y, markDirty) {
      var width = 0;
      var height = 0;

      var horiBearingX = 3;
      var horiBearingY = 2;

      for (var i = 0; i < text.length; i++) {
        var char = this._getChar(text[i], markDirty);
        var rect = char.rect || {};
        height = Math.max(height, rect.h - char.top);
        width += char.advance + horiBearingX;
      }

      var dx = x <= 0.5 ? 0 : -width;
      var dy = y <= 0.5 ? 0 : -height;

      // "ret" must be the return object. "ret" is always the return object
      var ret = [];

      for (var _i = 0; _i < text.length; _i++) {

        var _char = this._getChar(text[_i], markDirty);
        var _rect = _char.rect || {};

        var horiAdvance = void 0;

        dx += horiBearingX;

        ret.push({
          width: _rect.w,
          height: _rect.h,
          left: _rect.x / this.atlas.width,
          right: (_rect.x + _rect.w) / this.atlas.width,
          bottom: (_rect.y + _rect.h) / this.atlas.height,
          top: _rect.y / this.atlas.height,
          dx: dx,
          dy: dy + _char.top + (height - _rect.h)
        });

        dx += _char.advance;
        //      dx += rect.w;
      }
      return ret;
    }
  }, {
    key: 'steps',
    value: function steps(text) {
      return text.length;
    }
  }, {
    key: 'bind',
    value: function bind() {
      this.atlas.updateTexture(this._gl);
    }
  }, {
    key: 'isSDF',
    get: function get() {
      return true;
    }
  }, {
    key: 'fontSize',
    get: function get() {
      return 24;
    }
  }]);

  return _class;
}();

exports.default = _class;
;

/***/ }),

/***/ "./src/texts/sdf/spriteGenerator.js":
/*!******************************************!*\
  !*** ./src/texts/sdf/spriteGenerator.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glyphTrimmer = __webpack_require__(/*! ./glyphTrimmer */ "./src/texts/sdf/glyphTrimmer.js");

var _glyphTrimmer2 = _interopRequireDefault(_glyphTrimmer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INF = 1e20;

var SpriteGenerator = function () {
    function SpriteGenerator() {
        _classCallCheck(this, SpriteGenerator);

        // Member variables for configurations for font-style and box of the font
        var textSize = 23;
        this.fontSize = Math.round(textSize / 4) * 4;
        this.buffer = this.fontSize / 8;
        this.radius = this.fontSize / 3;
        this.cutoff = 0.25;
        this.fontFamily = 'sans-serif';
        // this.fontFamily = 'vedana';
        // this.fontFamily = 'arial';
        this.fontWeight = 'normal';
        // this.fontWeight = 'bold';
        // Size of one box of character
        var size = this.size = this.fontSize + this.buffer * 2;

        // Member varaibles for single canvas element on which single character is to be drawn
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = size;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'black';

        // Work-around: https://bugzilla.mozilla.org/show_bug.cgi?id=737852
        this.middle = Math.round(size / 2 * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1));

        // Member variables for temp arrays required for the distance transform
        this.gridOuter = new Float64Array(size * size);
        this.gridInner = new Float64Array(size * size);
        this.f = new Float64Array(size);
        this.d = new Float64Array(size);
        this.z = new Float64Array(size + 1);
        this.v = new Int16Array(size);

        // Glyph Trimmer
        this.trimmer = new _glyphTrimmer2.default(0);
        this.count = 1;
    }

    _createClass(SpriteGenerator, [{
        key: '_makeRGBAImageData',
        value: function _makeRGBAImageData(alphaChannel, width, height) {
            var imageData = this.ctx.createImageData(width, height);
            var data = imageData.data;
            for (var i = 0; i < alphaChannel.length; i++) {
                data[4 * i + 0] = alphaChannel[i];
                data[4 * i + 1] = alphaChannel[i];
                data[4 * i + 2] = alphaChannel[i];
                data[4 * i + 3] = 255;
            }
            return imageData;
        }

        // Returns the alpha channel for a single character

    }, {
        key: 'draw',
        value: function draw(char) {
            // Clear the area and draw the glyph
            this.ctx.clearRect(0, 0, this.size, this.size);
            this.ctx.fillText(char, this.buffer, this.middle);
            var imgData = this.ctx.getImageData(0, 0, this.size, this.size);
            var alphaChannel = new Uint8ClampedArray(this.size * this.size);

            for (var i = 0; i < this.size * this.size; i++) {
                var a = imgData.data[i * 4 + 3] / 255; // alpha value
                this.gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
                this.gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
            }

            this._edt(this.gridOuter, this.size, this.size, this.f, this.d, this.v, this.z);
            this._edt(this.gridInner, this.size, this.size, this.f, this.d, this.v, this.z);

            for (var _i = 0; _i < this.size * this.size; _i++) {
                var d = this.gridOuter[_i] - this.gridInner[_i];
                alphaChannel[_i] = Math.max(0, Math.min(255, Math.round(255 - 255 * (d / this.radius + this.cutoff))));
            }

            var glyph = {
                id: char.charCodeAt(0),
                bitmap: alphaChannel,
                left: 0,
                top: 0,
                width: this.size,
                height: this.size,
                advance: 4 // width
            };

            if (glyph.id !== 32) {
                this.trimmer.process(glyph);
            }

            // TODO: Delete this debugging code
            if (glyph.id == 65 && this.count) {
                var glyphData = glyph.bitmap;
                var numCols = glyph.width;
                var t = [];
                // iterate through every row
                for (var _i2 = 0; _i2 < glyphData.length; _i2 += numCols) {
                    // slice out the array
                    t.push(Array.from(glyphData.slice(_i2, _i2 + numCols)));
                }
                this.count--;
            }
            return glyph;
        }

        // 2D Euclidean distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/papers/dt-final.pdf

    }, {
        key: '_edt',
        value: function _edt(data, width, height, f, d, v, z) {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    f[y] = data[y * width + x];
                }
                this._edt1d(f, d, v, z, height);
                for (var _y = 0; _y < height; _y++) {
                    data[_y * width + x] = d[_y];
                }
            }
            for (var _y2 = 0; _y2 < height; _y2++) {
                for (var _x = 0; _x < width; _x++) {
                    f[_x] = data[_y2 * width + _x];
                }
                this._edt1d(f, d, v, z, width);
                for (var _x2 = 0; _x2 < width; _x2++) {
                    data[_y2 * width + _x2] = Math.sqrt(d[_x2]);
                }
            }
        }

        // 1D squared distance transform

    }, {
        key: '_edt1d',
        value: function _edt1d(f, d, v, z, n) {
            v[0] = 0;
            z[0] = -INF;
            z[1] = +INF;

            for (var q = 1, k = 0; q < n; q++) {
                var s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
                while (s <= z[k]) {
                    k--;
                    s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
                }
                k++;
                v[k] = q;
                z[k] = s;
                z[k + 1] = +INF;
            }

            for (var _q = 0, _k = 0; _q < n; _q++) {
                while (z[_k + 1] < _q) {
                    _k++;
                }d[_q] = (_q - v[_k]) * (_q - v[_k]) + f[v[_k]];
            }
        }
    }]);

    return SpriteGenerator;
}();

exports.default = SpriteGenerator;

/***/ }),

/***/ "./src/texts/texts.js":
/*!****************************!*\
  !*** ./src/texts/texts.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2016, Helikar Lab.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Authors: David Tichy, Aleš Saska
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _default = __webpack_require__(/*! ./default */ "./src/texts/default.js");

var _default2 = _interopRequireDefault(_default);

var _sdf = __webpack_require__(/*! ./sdf/sdf */ "./src/texts/sdf/sdf.js");

var _sdf2 = _interopRequireDefault(_sdf);

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(gl, files, textures) {
    _classCallCheck(this, _class);

    this._gl = gl;

    this._modules = {
      'default': new _default2.default(gl, files, textures),
      'sdf': new _sdf2.default(gl, files, textures)
    };
  }

  _createClass(_class, [{
    key: 'clear',
    value: function clear() {
      for (var k in this._modules) {
        this._modules[k].clear();
      }
    }
  }, {
    key: 'isSDF',
    value: function isSDF(font) {
      if (_utils2.default.isObject(font)) {
        if (font.type === 'sdf' && font.pbf) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'getEngine',
    value: function getEngine(font) {
      if (this.isSDF(font)) {
        return this._modules.sdf;
      }
      return this._modules.default;
    }
  }, {
    key: 'bind',
    value: function bind() {
      for (var k in this._modules) {
        this._modules[k].bind();
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      for (var k in this._modules) {
        this._modules[k].remove && this._modules[k].remove();
      }
    }
  }]);

  return _class;
}();

exports.default = _class;
;

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "extend",
    value: function extend(from) {
      for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          from[k] = arguments[i][k];
        }
      }
      return from;
    }
  }, {
    key: "isObject",
    value: function isObject(obj) {
      return obj === Object(obj);
    }
  }, {
    key: "emptyObject",
    value: function emptyObject(obj) {
      if (!Utils.isObject(obj)) return false;

      for (var k in obj) {
        return false;
      }return true;
    }
  }, {
    key: "ajax",
    value: function ajax(url, callback, type) {
      var xmlhttp;
      // compatible with IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function (cbk) {
        return function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            cbk(type == 'arraybuffer' ? xmlhttp.response : xmlhttp.responseText);
          }
        };
      }(callback);
      if (type) xmlhttp.responseType = type;
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    }
  }]);

  return Utils;
}();

exports.default = Utils;
;

/***/ }),

/***/ 0:
/*!********************************************************!*\
  !*** multi babel-polyfill ./src/ccNetVizMultiLevel.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./src/ccNetVizMultiLevel.js */"./src/ccNetVizMultiLevel.js");


/***/ })

/******/ });
//# sourceMappingURL=ccNetViz.js.map
if(typeof module !== "undefined")
module.exports = ccNetViz;