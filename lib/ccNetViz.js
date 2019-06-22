!(function(t, e) {
  if ('object' == typeof exports && 'object' == typeof module)
    module.exports = e();
  else if ('function' == typeof define && define.amd) define([], e);
  else {
    var r = e();
    for (var n in r) ('object' == typeof exports ? exports : t)[n] = r[n];
  }
})(window, function() {
  return (function(t) {
    var e = {};
    function r(n) {
      if (e[n]) return e[n].exports;
      var i = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
    }
    return (
      (r.m = t),
      (r.c = e),
      (r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (r.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      }),
      (r.t = function(t, e) {
        if ((1 & e && (t = r(t)), 8 & e)) return t;
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
          2 & e && 'string' != typeof t)
        )
          for (var i in t)
            r.d(
              n,
              i,
              function(e) {
                return t[e];
              }.bind(null, i)
            );
        return n;
      }),
      (r.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return r.d(e, 'a', e), e;
      }),
      (r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (r.p = ''),
      r((r.s = 2))
    );
  })([
    function(t, e, r) {
      'use strict';
      const n = Object.prototype.toString;
      t.exports = function(t) {
        return n.call(t).endsWith('Array]');
      };
    },
    function(t, e, r) {
      t.exports = (function() {
        function t(t, e, r) {
          (r = r || {}),
            (this.w = t || 64),
            (this.h = e || 64),
            (this.autoResize = !!r.autoResize),
            (this.shelves = []),
            (this.freebins = []),
            (this.stats = {}),
            (this.bins = {}),
            (this.maxId = 0);
        }
        function e(t, e, r) {
          (this.x = 0), (this.y = t), (this.w = this.free = e), (this.h = r);
        }
        function r(t, e, r, n, i) {
          (this.id = t),
            (this.x = e),
            (this.y = r),
            (this.w = n),
            (this.h = i),
            (this.maxw = n),
            (this.maxh = i),
            (this.refcount = 0);
        }
        return (
          (t.prototype.pack = function(t, e) {
            (t = [].concat(t)), (e = e || {});
            for (var r, n, i, o, s = [], a = 0; a < t.length; a++)
              if (
                ((r = t[a].w || t[a].width),
                (n = t[a].h || t[a].height),
                (i = t[a].id),
                r && n)
              ) {
                if (!(o = this.packOne(r, n, i))) continue;
                e.inPlace && ((t[a].x = o.x), (t[a].y = o.y), (t[a].id = o.id)),
                  s.push(o);
              }
            if (this.shelves.length > 0) {
              for (var h = 0, u = 0, c = 0; c < this.shelves.length; c++) {
                var f = this.shelves[c];
                (u += f.h), (h = Math.max(f.w - f.free, h));
              }
              this.resize(h, u);
            }
            return s;
          }),
          (t.prototype.packOne = function(t, r, n) {
            var i,
              o,
              s,
              a,
              h,
              u,
              c,
              f,
              l = { freebin: -1, shelf: -1, waste: 1 / 0 },
              d = 0;
            if ('string' == typeof n || 'number' == typeof n) {
              if ((i = this.getBin(n))) return this.ref(i), i;
              'number' == typeof n && (this.maxId = Math.max(n, this.maxId));
            } else n = ++this.maxId;
            for (a = 0; a < this.freebins.length; a++) {
              if (r === (i = this.freebins[a]).maxh && t === i.maxw)
                return this.allocFreebin(a, t, r, n);
              r > i.maxh ||
                t > i.maxw ||
                (r <= i.maxh &&
                  t <= i.maxw &&
                  (s = i.maxw * i.maxh - t * r) < l.waste &&
                  ((l.waste = s), (l.freebin = a)));
            }
            for (a = 0; a < this.shelves.length; a++)
              if (((d += (o = this.shelves[a]).h), !(t > o.free))) {
                if (r === o.h) return this.allocShelf(a, t, r, n);
                r > o.h ||
                  (r < o.h &&
                    (s = (o.h - r) * t) < l.waste &&
                    ((l.freebin = -1), (l.waste = s), (l.shelf = a)));
              }
            return -1 !== l.freebin
              ? this.allocFreebin(l.freebin, t, r, n)
              : -1 !== l.shelf
              ? this.allocShelf(l.shelf, t, r, n)
              : r <= this.h - d && t <= this.w
              ? ((o = new e(d, this.w, r)),
                this.allocShelf(this.shelves.push(o) - 1, t, r, n))
              : this.autoResize
              ? ((h = u = this.h),
                ((c = f = this.w) <= h || t > c) && (f = 2 * Math.max(t, c)),
                (h < c || r > h) && (u = 2 * Math.max(r, h)),
                this.resize(f, u),
                this.packOne(t, r, n))
              : null;
          }),
          (t.prototype.allocFreebin = function(t, e, r, n) {
            var i = this.freebins.splice(t, 1)[0];
            return (
              (i.id = n),
              (i.w = e),
              (i.h = r),
              (i.refcount = 0),
              (this.bins[n] = i),
              this.ref(i),
              i
            );
          }),
          (t.prototype.allocShelf = function(t, e, r, n) {
            var i = this.shelves[t].alloc(e, r, n);
            return (this.bins[n] = i), this.ref(i), i;
          }),
          (t.prototype.getBin = function(t) {
            return this.bins[t];
          }),
          (t.prototype.ref = function(t) {
            if (1 == ++t.refcount) {
              var e = t.h;
              this.stats[e] = 1 + (0 | this.stats[e]);
            }
            return t.refcount;
          }),
          (t.prototype.unref = function(t) {
            return 0 === t.refcount
              ? 0
              : (0 == --t.refcount &&
                  (this.stats[t.h]--,
                  delete this.bins[t.id],
                  this.freebins.push(t)),
                t.refcount);
          }),
          (t.prototype.clear = function() {
            (this.shelves = []),
              (this.freebins = []),
              (this.stats = {}),
              (this.bins = {}),
              (this.maxId = 0);
          }),
          (t.prototype.resize = function(t, e) {
            (this.w = t), (this.h = e);
            for (var r = 0; r < this.shelves.length; r++)
              this.shelves[r].resize(t);
            return !0;
          }),
          (e.prototype.alloc = function(t, e, n) {
            if (t > this.free || e > this.h) return null;
            var i = this.x;
            return (this.x += t), (this.free -= t), new r(n, i, this.y, t, e);
          }),
          (e.prototype.resize = function(t) {
            return (this.free += t - this.w), (this.w = t), !0;
          }),
          t
        );
      })();
    },
    function(t, e, r) {
      'use strict';
      r.r(e);
      var n = function t(e) {
        if (
          ((function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          (this.r = this.g = this.b = 0),
          (this.a = 1),
          e instanceof t)
        )
          (this.r = e.r), (this.g = e.g), (this.b = e.b), (this.a = e.a);
        else if (arguments.length >= 3)
          (this.r = arguments[0]),
            (this.g = arguments[1]),
            (this.b = arguments[2]),
            arguments.length > 3 && (this.a = arguments[3]);
        else if (/^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.test(e)) {
          e = /^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.exec(e);
          var r = function(t) {
            return parseInt(t, 10) / 255;
          };
          (this.r = r(e[1])),
            (this.g = r(e[2])),
            (this.b = r(e[3])),
            (this.a = r(e[4]));
        } else if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(e)) {
          e = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(e);
          var n = function(t) {
            return parseInt(t, 10) / 255;
          };
          (this.r = n(e[1])), (this.g = n(e[2])), (this.b = n(e[3]));
        } else if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(e)) {
          e = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(e);
          var i = function(t) {
            return parseInt(t, 10) / 100;
          };
          (this.r = i(e[1])), (this.g = i(e[2])), (this.b = i(e[3]));
        } else
          /^\#([0-9a-f]{6})$/i.test(e) &&
            ((e = parseInt(e.substring(1), 16)),
            (this.r = ((e >> 16) & 255) / 255),
            (this.g = ((e >> 8) & 255) / 255),
            (this.b = (255 & e) / 255));
      };
      function i(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var o = (function() {
        function t() {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
        }
        var e, r, n;
        return (
          (e = t),
          (n = [
            {
              key: 'initExtensions',
              value: function(t) {
                for (
                  var e = t.getSupportedExtensions(), r = {}, n = 1;
                  n < arguments.length;
                  n++
                ) {
                  var i = arguments[n];
                  (r[i] = e.indexOf(i) >= 0) && t.getExtension(i);
                }
                return r;
              },
            },
            {
              key: 'createShader',
              value: function(t, e, r) {
                var n = t.createShader(e);
                return (
                  t.shaderSource(n, r),
                  t.compileShader(n),
                  t.getShaderParameter(n, t.COMPILE_STATUS)
                    ? n
                    : (console.log(t.getShaderInfoLog(n)), null)
                );
              },
            },
            {
              key: 'createTexture',
              value: function(t, e, r, n) {
                var i = t.createTexture(),
                  o = new Image(),
                  s = function() {
                    (o.onload = null),
                      t.bindTexture(t.TEXTURE_2D, i),
                      (n || {}).sdf
                        ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1),
                          t.texImage2D(
                            t.TEXTURE_2D,
                            0,
                            t.LUMINANCE,
                            t.LUMINANCE,
                            t.UNSIGNED_BYTE,
                            o
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_MAG_FILTER,
                            t.LINEAR
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_MIN_FILTER,
                            t.LINEAR
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_WRAP_S,
                            t.CLAMP_TO_EDGE
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_WRAP_T,
                            t.CLAMP_TO_EDGE
                          ))
                        : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0),
                          t.texImage2D(
                            t.TEXTURE_2D,
                            0,
                            t.RGBA,
                            t.RGBA,
                            t.UNSIGNED_BYTE,
                            o
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_MAG_FILTER,
                            t.LINEAR
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_MIN_FILTER,
                            t.LINEAR
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_WRAP_S,
                            t.CLAMP_TO_EDGE
                          ),
                          t.texParameteri(
                            t.TEXTURE_2D,
                            t.TEXTURE_WRAP_T,
                            t.CLAMP_TO_EDGE
                          )),
                      t.bindTexture(t.TEXTURE_2D, null),
                      r && r();
                  };
                return (
                  (o.onload = s),
                  (o.src = e),
                  o.naturalWidth && o.naturalHeight && s(),
                  (i.image = o),
                  i
                );
              },
            },
            {
              key: 'uniformColor',
              value: function(t, e, r) {
                t.uniform4f(e, r.r, r.g, r.b, r.a);
              },
            },
            {
              key: 'ortho',
              value: function(t, e, r, n, i, o) {
                var s = 1 / (t - e),
                  a = 1 / (r - n),
                  h = 1 / (i - o),
                  u = new Float32Array(16);
                return (
                  (u[0] = -2 * s),
                  (u[1] = 0),
                  (u[2] = 0),
                  (u[3] = 0),
                  (u[4] = 0),
                  (u[5] = -2 * a),
                  (u[6] = 0),
                  (u[7] = 0),
                  (u[8] = 0),
                  (u[9] = 0),
                  (u[10] = 2 * h),
                  (u[11] = 0),
                  (u[12] = (t + e) * s),
                  (u[13] = (n + r) * a),
                  (u[14] = (o + i) * h),
                  (u[15] = 1),
                  u
                );
              },
            },
          ]),
          (r = null) && i(e.prototype, r),
          n && i(e, n),
          t
        );
      })();
      function s(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var a = { color: 4 },
        h = (function() {
          function t(e, r, n, i) {
            !(function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this._gl = e),
              (this._vs = r),
              (this._fs = n);
            var s = (this._program = e.createProgram());
            e.attachShader(s, o.createShader(e, e.VERTEX_SHADER, r)),
              e.attachShader(s, o.createShader(e, e.FRAGMENT_SHADER, n)),
              e.linkProgram(s),
              (this.uniforms = {});
            for (
              var a = e.getProgramParameter(s, e.ACTIVE_UNIFORMS), h = 0;
              h < a;
              h++
            ) {
              var u = e.getActiveUniform(s, h).name;
              this.uniforms[u] = e.getUniformLocation(s, u);
            }
            var c = (i || {}).attribute || {};
            (this.attributes = {}),
              (a = e.getProgramParameter(s, e.ACTIVE_ATTRIBUTES));
            for (var f = 0; f < a; f++) {
              var l = e.getActiveAttrib(s, f).name;
              this.attributes[l] = {
                index: f,
                size: c[l] || t.attribute[l] || 2,
              };
            }
          }
          var e, r, n;
          return (
            (e = t),
            (n = [
              {
                key: 'attribute',
                get: function() {
                  return a;
                },
              },
            ]),
            (r = [
              {
                key: 'bind',
                value: function() {
                  this._gl.useProgram(this._program);
                  for (
                    var t = this._gl.getProgramParameter(
                        this._program,
                        this._gl.ACTIVE_ATTRIBUTES
                      ),
                      e = 0;
                    e < t;
                    e++
                  )
                    this._gl.enableVertexAttribArray(e);
                },
              },
              {
                key: 'unbind',
                value: function() {
                  for (
                    var t = this._gl.getProgramParameter(
                        this._program,
                        this._gl.ACTIVE_ATTRIBUTES
                      ),
                      e = 0;
                    e < t;
                    e++
                  )
                    this._gl.disableVertexAttribArray(e);
                },
              },
            ]) && s(e.prototype, r),
            n && s(e, n),
            t
          );
        })();
      function u(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var c = (function() {
        function t() {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
        }
        var e, r, n;
        return (
          (e = t),
          (n = [
            {
              key: 'extend',
              value: function(t) {
                for (var e = 1; e < arguments.length; e++)
                  for (var r in arguments[e]) t[r] = arguments[e][r];
                return t;
              },
            },
            {
              key: 'isObject',
              value: function(t) {
                return t === Object(t);
              },
            },
            {
              key: 'emptyObject',
              value: function(e) {
                if (!t.isObject(e)) return !1;
                for (var r in e) return !1;
                return !0;
              },
            },
            {
              key: 'ajax',
              value: function(t, e, r) {
                var n, i;
                ((n = new XMLHttpRequest()).onreadystatechange =
                  ((i = e),
                  function() {
                    4 == n.readyState &&
                      200 == n.status &&
                      i('arraybuffer' == r ? n.response : n.responseText);
                  })),
                  r && (n.responseType = r),
                  n.open('GET', t, !0),
                  n.send();
              },
            },
          ]),
          (r = null) && u(e.prototype, r),
          n && u(e, n),
          t
        );
      })();
      function f(t) {
        for (var e = {}, r = {}, n = 0; n < t.length; n++) {
          var i = t[n],
            o = (e[i.style] = e[i.style] || []);
          void 0 === o.idx && (o.idx = []),
            o.idx.push(n),
            (i.sI = r[i.style] = void 0 === r[i.style] ? 0 : r[i.style] + 1),
            o.push(i);
        }
        return e;
      }
      function l(t, e, r) {
        var i = {},
          o = function(t) {
            if (t) for (var e in t) i[e] = t[e];
          };
        return (
          o(e),
          o(t),
          r && (o(e[r]), t && o(t[r])),
          (i.color = i.color && new n(i.color)),
          (i.animateColor = i.animateColor && new n(i.animateColor)),
          i
        );
      }
      function d(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var v = (function() {
          function t(e, r, n, i, o, s, a) {
            var u = this;
            !(function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t);
            var c,
              f,
              d,
              v = new h(e, i.join('\n'), o.join('\n'), a),
              g = [],
              m = [],
              p = {},
              y = {},
              x = 0,
              w = 0,
              b = function(t, e) {
                if (t.size) {
                  var r = 0;
                  return (
                    e.forEach(function(e) {
                      r += t.size(y, e);
                    }),
                    r
                  );
                }
                return e.length;
              },
              _ = function(e, r) {
                c = f = 0;
                var n = Math.floor(t.maxBufferSize / e.numVertices),
                  i = Math.min(n, r - (w - x) * n),
                  o = i * e.numIndices;
                if (!y.indices || y.indices.length !== o)
                  for (var s in ((y.indices = new Uint16Array(o)),
                  (i *= e.numVertices),
                  v.attributes))
                    y[s] = new Float32Array(v.attributes[s].size * i);
              },
              E = function(e, r, n, i, o) {
                for (var s = [e.indices, r, n], a = 0; a < o; a++) s.push(0);
                for (var h = [void 0, r, n], c = 0; c < i; c++) h.push(0);
                for (var f in e)
                  'indices' === f
                    ? t.indices.apply(u, s)
                    : ((h[0] = e[f]), t.vertices.apply(u, h));
              };
            (this.set = function(e, i, o, s, a, h) {
              var d = !1;
              (x = 0),
                (w = 0),
                (u._iIs = new Uint32Array(s.length)),
                (u._iVs = new Uint32Array(s.length)),
                (u._iBs = new Uint8Array(s.length)),
                (u._sizes = new Uint8Array(s.length));
              var E = function(t) {
                var r = g[w];
                if (!r)
                  for (var n in ((g[w] = r = {}), y)) r[n] = e.createBuffer();
                for (var i in v.attributes)
                  e.bindBuffer(e.ARRAY_BUFFER, r[i]),
                    e.bufferData(e.ARRAY_BUFFER, y[i], e.STATIC_DRAW);
                e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, r.indices),
                  e.bufferData(
                    e.ELEMENT_ARRAY_BUFFER,
                    y.indices,
                    e.STATIC_DRAW
                  ),
                  (r.numIndices = f),
                  (r.numVertices = c),
                  t.buffers.push(r),
                  w++;
              };
              for (var M in ((m = []), a)) {
                x = w;
                var S = { style: l(i[M], r, n), buffers: [], styleName: M },
                  T = h(S.style);
                (T.numVertices = T.numVertices || 4),
                  (T.numIndices = T.numIndices || 6);
                var A = a[M],
                  z = b(T, A);
                _(T, z);
                for (var k = t.maxBufferSize, R = 0; R < A.length; R++) {
                  var C = T.size ? T.size(y, A[R]) : 1,
                    P = c + C * T.numVertices,
                    I = f + C * T.numIndices;
                  P >= k && (E(S), _(T, z), (P = c), (I = f)),
                    T.set(y, A[R], c, f) && (d = !0);
                  var N = A.idx[R];
                  (u._iIs[N] = f),
                    (u._iVs[N] = c),
                    (u._iBs[N] = w),
                    (u._sizes[N] = C),
                    (f = I),
                    (c = P);
                }
                E(S);
                var F = function() {
                  m.push(this), (p[this.styleName] = this);
                }.bind(S);
                o ? o(S, F) : F();
              }
              return d;
            }),
              (this.update = function(t, e, r, n) {
                var i = 0,
                  o = v.attributes[e].size;
                m.forEach(function(s) {
                  var a = n(s.style);
                  (a.numVertices = a.numVertices || 4),
                    s.buffers.forEach(function(n) {
                      (!d || d.length !== o * n.numVertices) &&
                        (d = new Float32Array(o * n.numVertices));
                      for (
                        var s = 0;
                        s < n.numVertices;
                        s += (a.size ? a.size(n, r[i]) : 1) * a.numVertices
                      )
                        a.set(d, r[i++], s);
                      t.bindBuffer(t.ARRAY_BUFFER, n[e]),
                        t.bufferData(t.ARRAY_BUFFER, d, t.DYNAMIC_DRAW);
                    });
                });
              }),
              (this.updateEl = function(t, e, r, n) {
                var i = p[e.style],
                  o = n(i.style);
                (o.numVertices = o.numVertices || 4),
                  (o.numIndices = o.numIndices || 6),
                  (w = x = 0);
                var s = i.buffers[u._iBs[r]],
                  a = o.size ? o.size(s, e) : 1,
                  h = u._sizes[r];
                if (a > h)
                  console.error(
                    'Cannot set primitive to new value which has greater size (' +
                      a +
                      ' > ' +
                      h +
                      ') - no enough empty space to fill in GL buffer'
                  );
                else {
                  for (_(o, h), o.set(y, e, 0, 0); a < h; a++)
                    E(
                      y,
                      a * o.numVertices,
                      a * o.numIndices,
                      o.numVertices,
                      o.numIndices
                    );
                  !(function(e, r, n) {
                    for (var i in v.attributes)
                      t.bindBuffer(t.ARRAY_BUFFER, e[i]),
                        t.bufferSubData(
                          t.ARRAY_BUFFER,
                          v.attributes[i].size * r * y[i].BYTES_PER_ELEMENT,
                          y[i]
                        );
                    t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, e.indices),
                      t.bufferSubData(
                        t.ELEMENT_ARRAY_BUFFER,
                        n * y.indices.BYTES_PER_ELEMENT,
                        y.indices
                      );
                  })(s, u._iVs[r], u._iIs[r]);
                }
              }),
              (this.draw = function(t) {
                (t.shader = v),
                  v.bind(),
                  e.uniformMatrix4fv(v.uniforms.transform, !1, t.transform),
                  e.uniform1f(v.uniforms.time, t.renderTime),
                  m.forEach(function(r) {
                    r.style.texture &&
                      (r.style.texture.update && r.style.texture.update(),
                      e.activeTexture(e.TEXTURE0),
                      e.bindTexture(e.TEXTURE_2D, r.style.texture),
                      e.uniform1i(v.uniforms.texture, 0)),
                      (t.style = r.style),
                      s(t) ||
                        r.buffers.forEach(function(t) {
                          for (var r in (e.bindBuffer(
                            e.ELEMENT_ARRAY_BUFFER,
                            t.indices
                          ),
                          v.attributes)) {
                            var n = v.attributes[r];
                            e.bindBuffer(e.ARRAY_BUFFER, t[r]),
                              e.vertexAttribPointer(
                                n.index,
                                n.size,
                                e.FLOAT,
                                !1,
                                0,
                                0
                              );
                          }
                          e.drawElements(
                            e.TRIANGLES,
                            t.numIndices,
                            e.UNSIGNED_SHORT,
                            0
                          );
                        });
                  }),
                  v.unbind();
              });
          }
          var e, r, n;
          return (
            (e = t),
            (n = [
              {
                key: 'vertices',
                value: function(t, e) {
                  for (
                    var r = 2, n = 2 * e, i = arguments.length;
                    r < i;
                    r++, n++
                  )
                    t[n] = arguments[r];
                },
              },
              {
                key: 'singles',
                value: function(t, e) {
                  for (
                    var r = 2, n = 1 * e, i = arguments.length;
                    r < i;
                    r++, n++
                  )
                    t[n] = arguments[r];
                },
              },
              {
                key: 'colors',
                value: function(t, e) {
                  for (var r = 2, n = 4 * e, i = arguments.length; r < i; r++) {
                    var o = arguments[r];
                    (t[n++] = o.r),
                      (t[n++] = o.g),
                      (t[n++] = o.b),
                      (t[n++] = o.a);
                  }
                },
              },
              {
                key: 'indices',
                value: function(t, e, r) {
                  for (var n = 3, i = r, o = arguments.length; n < o; n++, i++)
                    t[i] = e + arguments[n];
                },
              },
              {
                key: 'quad',
                value: function(e, r, n) {
                  t.indices(e, r, n, 0, 1, 2, 2, 3, 0);
                },
              },
              {
                key: 'maxBufferSize',
                get: function() {
                  return 65536;
                },
              },
            ]),
            (r = null) && d(e.prototype, r),
            n && d(e, n),
            t
          );
        })(),
        g = function(t) {
          var e, r, n, i, o, s, a, h, u;
          for (
            h = u = -(s = a = 1 / 0), r = [], n = [], o = t.length, i = 0;
            i < o;
            ++i
          )
            (e = t[i]).x < s && (s = e.x),
              e.y < a && (a = e.y),
              e.x > h && (h = e.x),
              e.y > u && (u = e.y),
              r.push(e.x),
              n.push(e.y);
          var c = h - s,
            f = u - a;
          function l(t, e, r, n, i, o, s, a) {
            if (t.leaf) {
              var h = t.x,
                u = t.y;
              if (null !== h)
                if (h === r && u === n) d(t, e, r, n, i, o, s, a);
                else {
                  var c = t.point;
                  (t.x = t.y = t.point = null),
                    d(t, c, h, u, i, o, s, a),
                    d(t, e, r, n, i, o, s, a);
                }
              else (t.x = r), (t.y = n), (t.point = e);
            } else d(t, e, r, n, i, o, s, a);
          }
          function d(t, e, r, n, i, o, s, a) {
            var h = 0.5 * (i + s),
              u = 0.5 * (o + a),
              c = r >= h,
              f = n >= u,
              d = (f << 1) | c;
            (t.leaf = !1),
              c ? (i = h) : (s = h),
              f ? (o = u) : (a = u),
              l(
                (t =
                  t.nodes[d] ||
                  (t.nodes[d] = {
                    leaf: !0,
                    nodes: [],
                    point: null,
                    x: null,
                    y: null,
                  })),
                e,
                r,
                n,
                i,
                o,
                s,
                a
              );
          }
          c > f ? (u = a + c) : (h = s + f);
          var v = { leaf: !0, nodes: [], point: null, x: null, y: null };
          for (
            v.visit = function(t) {
              return (function t(e, r, n, i, o, s) {
                if (!e(r, n, i, o, s)) {
                  var a = 0.5 * (n + o),
                    h = 0.5 * (i + s),
                    u = r.nodes;
                  u[0] && t(e, u[0], n, i, a, h),
                    u[1] && t(e, u[1], a, i, o, h),
                    u[2] && t(e, u[2], n, h, a, s),
                    u[3] && t(e, u[3], a, h, o, s);
                }
              })(t, v, s, a, h, u);
            },
              v.find = function(t, e) {
                return (function(t, e, r, n, i, o, s) {
                  var a,
                    h = 1 / 0;
                  return (
                    (function t(u, c, f, l, d) {
                      if (!(c > o || f > s || l < n || d < i)) {
                        var v;
                        if ((v = u.point)) {
                          var g = e - u.x,
                            m = r - u.y,
                            p = g * g + m * m;
                          if (p < h) {
                            var y = Math.sqrt((h = p));
                            (n = e - y),
                              (i = r - y),
                              (o = e + y),
                              (s = r + y),
                              (a = v);
                          }
                        }
                        for (
                          var x = u.nodes,
                            w = 0.5 * (c + l),
                            b = 0.5 * (f + d),
                            _ = ((r >= b) << 1) | (e >= w),
                            E = _ + 4;
                          _ < E;
                          ++_
                        )
                          if ((u = x[3 & _]))
                            switch (3 & _) {
                              case 0:
                                t(u, c, f, w, b);
                                break;
                              case 1:
                                t(u, w, f, l, b);
                                break;
                              case 2:
                                t(u, c, b, w, d);
                                break;
                              case 3:
                                t(u, w, b, l, d);
                            }
                      }
                    })(t, n, i, o, s),
                    a
                  );
                })(v, t, e, s, a, h, u);
              },
              i = 0;
            i < o;
            i++
          )
            l(v, t[i], r[i], n[i], s, a, h, u);
          return --i, (r = n = t = e = null), v;
        },
        m = function(t, e) {
          var r,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            i = 0.9,
            o = -30,
            s = 0.4,
            a = 0.64,
            h = [1, 1],
            u = 1 / 0,
            c = [],
            f = [],
            l = [];
          function d(t) {
            return function(e, r, n, i) {
              if (e.point !== t) {
                var o = e.cx - t.x,
                  s = e.cy - t.y,
                  h = i - r,
                  c = o * o + s * s;
                if ((h * h) / a < c) {
                  if (c < u) {
                    var f = e.charge / c;
                    (t.px -= o * f), (t.py -= s * f);
                  }
                  return !0;
                }
                if (e.point && c && c < u) {
                  var l = e.pointCharge / c;
                  (t.px -= o * l), (t.py -= s * l);
                }
              }
              return !e.charge;
            };
          }
          function v() {
            if ((r *= 0.99) < 0.05) return (r = 0), !0;
            for (
              var a, u, v, m, p, y, x, w, b = t.length, _ = e.length, E = 0;
              E < _;
              E++
            )
              (v = (u = e[E]).source),
                (p = (x = (m = u.target).x - v.x) * x + (w = m.y - v.y) * w) &&
                  ((x *= p = (r * f[E] * ((p = Math.sqrt(p)) - c[E])) / p),
                  (w *= p),
                  (m.x -= x * (y = v.weight / (m.weight + v.weight))),
                  (m.y -= w * y),
                  (v.x += x * (y = 1 - y)),
                  (v.y += w * y));
            if ((y = r * s)) {
              (x = h[0] / 2), (w = h[1] / 2);
              for (var M = 0; M < b; M++)
                ((u = t[M]).x += (x - u.x) * y), (u.y += (w - u.y) * y);
            }
            if (o) {
              !(function t(e, r, n) {
                var i = 0,
                  o = 0;
                if (((e.charge = 0), !e.leaf))
                  for (var s, a = e.nodes, h = a.length, u = 0; u < h; u++)
                    null != (s = a[u]) &&
                      (t(s, r, n),
                      (e.charge += s.charge),
                      (i += s.charge * s.cx),
                      (o += s.charge * s.cy));
                if (e.point) {
                  e.leaf ||
                    ((e.point.x += Math.random() - 0.5),
                    (e.point.y += Math.random() - 0.5));
                  var c = r * n[e.point.index];
                  (e.charge += e.pointCharge = c),
                    (i += c * e.point.x),
                    (o += c * e.point.y);
                }
                (e.cx = i / e.charge), (e.cy = o / e.charge);
              })((a = g(t)), r, l);
              for (var S = 0; S < b; S++) {
                var T = t[S];
                !T.fixed && a.visit(d(T));
              }
            }
            for (
              var A = function(t, e) {
                  return Math.random() * (e - t) + t;
                },
                z = 0;
              z < b;
              z++
            )
              (u = t[z]).fixed || u.fixed2
                ? ((u.x = u.px), (u.y = u.py))
                : ((u.x -= (u.px - (u.px = u.x)) * i),
                  (u.y -= (u.py - (u.py = u.y)) * i),
                  n &&
                    void 0 !== n.minX &&
                    ((u.x < n.minX || u.x > n.maxX) &&
                      (u.x = A(n.minX, n.maxX)),
                    (u.y < n.minY || u.y > n.maxY) &&
                      (u.y = A(n.minY, n.maxY))));
          }
          this.apply = function() {
            for (
              var n = t.length, i = Math.sqrt(n), s = 0.3 / i, a = 0;
              a < n;
              a++
            ) {
              var h = t[a];
              (h.weight = 0),
                (h.x = void 0 !== h.x ? h.x : s + (a % i) / i),
                (h.y = void 0 !== h.y ? h.y : s + Math.floor(a / i) / i),
                (h.px = h.x),
                (h.py = h.y),
                (l[a] = o);
            }
            for (var u = 0; u < e.length; u++) {
              var d = e[u];
              d.source.weight++, d.target.weight++, (c[u] = 15), (f[u] = 1);
            }
            for (r = 0.1; !v(); );
            return !0;
          };
        };
      function p(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var y = (function() {
        function t(e) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'apply',
              value: function() {
                for (var t = 0, e = this._nodes.length; t < e; t++) {
                  var r = this._nodes[t];
                  (r.x = Math.random()), (r.y = Math.random());
                }
              },
            },
          ]) && p(e.prototype, r),
          n && p(e, n),
          t
        );
      })();
      function x(t) {
        return (
          (function(t) {
            if (Array.isArray(t)) {
              for (var e = 0, r = new Array(t.length); e < t.length; e++)
                r[e] = t[e];
              return r;
            }
          })(t) ||
          (function(t) {
            if (
              Symbol.iterator in Object(t) ||
              '[object Arguments]' === Object.prototype.toString.call(t)
            )
              return Array.from(t);
          })(t) ||
          (function() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance'
            );
          })()
        );
      }
      function w(t, e) {
        return x(Array(t).keys()).map(function(t) {
          return Array(e).fill(0);
        });
      }
      function b(t, e) {
        var r = Array(t.length).fill(0);
        e.forEach(function(t) {
          (r[t.source.index] += 1), (r[t.target.index] += 1);
        });
        var n = r.map(function(t, e) {
          return { index: e, value: t };
        });
        n.sort(function(t, e) {
          return +(t.value < e.value) || +(t.value === e.value) - 1;
        });
        var i = n.map(function(t) {
          return r[t.index];
        });
        return { nodes: n, degrees: i };
      }
      function _(t) {
        var e = 0;
        return (
          t.children &&
            t.children.forEach(function(t) {
              if (1 == t.depth_visited)
                throw new Error('This layout is only for trees acyclic graphs');
              t.depth_visited = !0;
              var r = _(t);
              r > e && (e = r);
            }),
          1 + e
        );
      }
      function E(t) {
        if ((t = Math.abs(t)) <= 1) return { start: 0.5, step: 1 };
        return { start: 0.05, step: 0.9 / (t - 1) };
      }
      function M(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var S = (function() {
        function t(e, r) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r),
            (this._angle_step = (2 * Math.PI) / e.length),
            null == n.starting_angle
              ? (this._starting_angle = 0)
              : (this._starting_angle = n.starting_angle);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'apply',
              value: function() {
                for (
                  var t = b(this._nodes, this._edges), e = 0;
                  e < this._nodes.length;
                  ++e
                )
                  (this._nodes[t.nodes[e].index].x =
                    0.05 +
                    0.45 *
                      (1 +
                        Math.cos(this._starting_angle + e * this._angle_step))),
                    (this._nodes[t.nodes[e].index].y =
                      0.05 +
                      0.45 *
                        (1 +
                          Math.sin(
                            this._starting_angle + e * this._angle_step
                          ))),
                    (this._nodes[t.nodes[e].index].weight = t.degrees[e]);
              },
            },
          ]) && M(e.prototype, r),
          n && M(e, n),
          t
        );
      })();
      function T(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var A = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'drawTreeCentered',
              value: function(t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 0,
                  r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 1;
                (t.centered = !0), (t.depth_visited = !1);
                for (var n = 0, i = 0; i < t.children.length; i++) {
                  var o = t.children[i];
                  1 != o.centered &&
                    (n += this.drawTreeCentered(o, n + e, r + 1));
                }
                return (
                  0 == t.children && n++,
                  (t.y = this.stepy * (e + (n - 1) / 2) + this.alphay),
                  (t.x = (r - 1) * this.stepx + this.alphax),
                  n
                );
              },
            },
            {
              key: 'apply',
              value: function() {
                var t = this._nodes;
                t.forEach(function(t, e) {
                  (t.parents = []), (t.children = []), (t.centered = !1);
                }),
                  this._edges.forEach(function(t, e) {
                    t.source.children.push(t.target),
                      t.target.parents.push(t.source);
                  });
                for (var e = 0; e < t.length; e++)
                  if (0 == t[e].parents.length) {
                    var r = t[e];
                    break;
                  }
                var n = E(_(r));
                (this.alphax = n.start), (this.stepx = n.step);
                var i = 0;
                t.forEach(function(t) {
                  0 == t.children.length && i++;
                }),
                  (n = E(i)),
                  (this.alphay = n.start),
                  (this.stepy = n.step),
                  this.drawTreeCentered(r);
              },
            },
          ]) && T(e.prototype, r),
          n && T(e, n),
          t
        );
      })();
      function z(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var k = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'drawTreeTop',
              value: function(t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 0,
                  r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 1;
                (t.visited = !0),
                  (t.depth_visited = !1),
                  (t.x = this.alphax + this.stepx * (r - 1)),
                  (t.y = 1 - (this.alphay + this.stepy * e));
                for (var n = 0, i = 0; i < t.children.length; i++) {
                  var o = t.children[i];
                  1 != o.centered && (n += this.drawTreeTop(o, n + e, r + 1));
                }
                return 0 == t.children.length && n++, n;
              },
            },
            {
              key: 'apply',
              value: function() {
                var t = this._nodes;
                t.forEach(function(t, e) {
                  (t.parents = []), (t.children = []), (t.centered = !1);
                }),
                  this._edges.forEach(function(t, e) {
                    t.source.children.push(t.target),
                      t.target.parents.push(t.source);
                  });
                for (var e = 0; e < t.length; e++)
                  if (0 == t[e].parents.length) {
                    var r = t[e];
                    break;
                  }
                var n = E(_(r));
                (this.alphax = n.start), (this.stepx = n.step);
                var i = 0;
                t.forEach(function(t) {
                  0 == t.children.length && i++;
                }),
                  (n = E(i)),
                  (this.alphay = n.start),
                  (this.stepy = n.step),
                  this.drawTreeTop(r);
              },
            },
          ]) && z(e.prototype, r),
          n && z(e, n),
          t
        );
      })();
      function R(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var C = (function() {
          function t(e, r) {
            !(function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this._nodes = e),
              (this._edges = r),
              (this.alphay = 0.05),
              (this.alphax = 0.05);
          }
          var e, r, n;
          return (
            (e = t),
            (r = [
              {
                key: 'makeLayers',
                value: function(t, e) {
                  if (t.length > 1)
                    for (
                      var r = (1 - 2 * this.alphay) / (t.length - 1), n = 0;
                      n < t.length;
                      ++n
                    )
                      (t[n].visited = !0),
                        (t[n].layer = e),
                        (t[n].y = this.alphay + n * r);
                  else (t[0].visited = !0), (t[0].layer = e), (t[0].y = 0.5);
                  for (var i = [], o = 0; o < t.length; o++)
                    for (
                      var s = t[o].parents.concat(t[o].children), a = 0;
                      a < s.length;
                      a++
                    )
                      0 != s[a].visited || i.includes(s[a]) || i.push(s[a]);
                  return 0 == i.length ? e : this.makeLayers(i, e + 1);
                },
              },
              {
                key: 'apply',
                value: function() {
                  var t = this._nodes;
                  t.forEach(function(t, e) {
                    (t.parents = []), (t.children = []), (t.visited = !1);
                  }),
                    this._edges.forEach(function(t, e) {
                      t.source.children.push(t.target),
                        t.target.parents.push(t.source);
                    });
                  for (var e = [], r = 0; r < t.length; r++)
                    1 == t[r].isroot && e.push(t[r]);
                  if (0 == e.length)
                    for (var n = 0; n < t.length; n++)
                      0 == t[n].parents.length && e.push(t[n]);
                  if (0 == e.length) {
                    var i = 0;
                    t.forEach(function(t) {
                      t.children.length > i && (i = t.children.length);
                    }),
                      t.forEach(function(t) {
                        t.children.length == i && e.push(t);
                      });
                  }
                  for (
                    var o = this.makeLayers(e, 1),
                      s = (1 - 2 * this.alphax) / (o - 1),
                      a = 0;
                    a < this._nodes.length;
                    ++a
                  )
                    this._nodes[a].x =
                      this.alphax + s * (this._nodes[a].layer - 1);
                },
              },
            ]) && R(e.prototype, r),
            n && R(e, n),
            t
          );
        })(),
        P = r(0),
        I = r.n(P);
      var N = function(t) {
        if (!I()(t)) throw new TypeError('input must be an array');
        if (0 === t.length) throw new TypeError('input must not be empty');
        for (var e = t[0], r = 1; r < t.length; r++) t[r] > e && (e = t[r]);
        return e;
      };
      var F = function(t) {
        if (!I()(t)) throw new TypeError('input must be an array');
        if (0 === t.length) throw new TypeError('input must not be empty');
        for (var e = t[0], r = 1; r < t.length; r++) t[r] < e && (e = t[r]);
        return e;
      };
      var L = function(t) {
        var e,
          r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!I()(t)) throw new TypeError('input must be an array');
        if (0 === t.length) throw new TypeError('input must not be empty');
        if (void 0 !== r.output) {
          if (!I()(r.output))
            throw new TypeError('output option must be an array if specified');
          e = r.output;
        } else e = new Array(t.length);
        var n = F(t),
          i = N(t);
        if (n === i)
          throw new RangeError(
            'minimum and maximum input values are equal. Cannot rescale a constant array'
          );
        var o = r.min,
          s = void 0 === o ? (r.autoMinMax ? n : 0) : o,
          a = r.max,
          h = void 0 === a ? (r.autoMinMax ? i : 1) : a;
        if (s >= h)
          throw new RangeError('min option must be smaller than max option');
        for (var u = (h - s) / (i - n), c = 0; c < t.length; c++)
          e[c] = (t[c] - n) * u + s;
        return e;
      };
      class q {
        constructor(t) {
          var e,
            r,
            n,
            i,
            o,
            s,
            a,
            h,
            u,
            c = (t = ht.checkMatrix(t)).clone(),
            f = c.rows,
            l = c.columns,
            d = new Array(f),
            v = 1;
          for (e = 0; e < f; e++) d[e] = e;
          for (h = new Array(f), r = 0; r < l; r++) {
            for (e = 0; e < f; e++) h[e] = c.get(e, r);
            for (e = 0; e < f; e++) {
              for (u = Math.min(e, r), o = 0, n = 0; n < u; n++)
                o += c.get(e, n) * h[n];
              (h[e] -= o), c.set(e, r, h[e]);
            }
            for (i = r, e = r + 1; e < f; e++)
              Math.abs(h[e]) > Math.abs(h[i]) && (i = e);
            if (i !== r) {
              for (n = 0; n < l; n++)
                (s = c.get(i, n)), c.set(i, n, c.get(r, n)), c.set(r, n, s);
              (a = d[i]), (d[i] = d[r]), (d[r] = a), (v = -v);
            }
            if (r < f && 0 !== c.get(r, r))
              for (e = r + 1; e < f; e++)
                c.set(e, r, c.get(e, r) / c.get(r, r));
          }
          (this.LU = c), (this.pivotVector = d), (this.pivotSign = v);
        }
        isSingular() {
          for (var t = this.LU, e = t.columns, r = 0; r < e; r++)
            if (0 === t[r][r]) return !0;
          return !1;
        }
        solve(t) {
          t = at.checkMatrix(t);
          var e = this.LU;
          if (e.rows !== t.rows) throw new Error('Invalid matrix dimensions');
          if (this.isSingular()) throw new Error('LU matrix is singular');
          var r,
            n,
            i,
            o = t.columns,
            s = t.subMatrixRow(this.pivotVector, 0, o - 1),
            a = e.columns;
          for (i = 0; i < a; i++)
            for (r = i + 1; r < a; r++)
              for (n = 0; n < o; n++) s[r][n] -= s[i][n] * e[r][i];
          for (i = a - 1; i >= 0; i--) {
            for (n = 0; n < o; n++) s[i][n] /= e[i][i];
            for (r = 0; r < i; r++)
              for (n = 0; n < o; n++) s[r][n] -= s[i][n] * e[r][i];
          }
          return s;
        }
        get determinant() {
          var t = this.LU;
          if (!t.isSquare()) throw new Error('Matrix must be square');
          for (var e = this.pivotSign, r = t.columns, n = 0; n < r; n++)
            e *= t[n][n];
          return e;
        }
        get lowerTriangularMatrix() {
          for (
            var t = this.LU, e = t.rows, r = t.columns, n = new at(e, r), i = 0;
            i < e;
            i++
          )
            for (var o = 0; o < r; o++)
              n[i][o] = i > o ? t[i][o] : i === o ? 1 : 0;
          return n;
        }
        get upperTriangularMatrix() {
          for (
            var t = this.LU, e = t.rows, r = t.columns, n = new at(e, r), i = 0;
            i < e;
            i++
          )
            for (var o = 0; o < r; o++) n[i][o] = i <= o ? t[i][o] : 0;
          return n;
        }
        get pivotPermutationVector() {
          return this.pivotVector.slice();
        }
      }
      function B(t, e) {
        var r = 0;
        return Math.abs(t) > Math.abs(e)
          ? ((r = e / t), Math.abs(t) * Math.sqrt(1 + r * r))
          : 0 !== e
          ? ((r = t / e), Math.abs(e) * Math.sqrt(1 + r * r))
          : 0;
      }
      function D(t, e, r) {
        for (var n = new Array(t), i = 0; i < t; i++) {
          n[i] = new Array(e);
          for (var o = 0; o < e; o++) n[i][o] = r;
        }
        return n;
      }
      class O {
        constructor(t, e = {}) {
          var r = (t = ht.checkMatrix(t)).rows,
            n = t.columns;
          const {
            computeLeftSingularVectors: i = !0,
            computeRightSingularVectors: o = !0,
            autoTranspose: s = !1,
          } = e;
          var a,
            h = Boolean(i),
            u = Boolean(o),
            c = !1;
          if (r < n)
            if (s) {
              (r = (a = t.transpose()).rows), (n = a.columns), (c = !0);
              var f = h;
              (h = u), (u = f);
            } else
              (a = t.clone()),
                console.warn(
                  'Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose'
                );
          else a = t.clone();
          var l = Math.min(r, n),
            d = Math.min(r + 1, n),
            v = new Array(d),
            g = D(r, l, 0),
            m = D(n, n, 0),
            p = new Array(n),
            y = new Array(r),
            x = new Array(d);
          for (let t = 0; t < d; t++) x[t] = t;
          var w = Math.min(r - 1, n),
            b = Math.max(0, Math.min(n - 2, r)),
            _ = Math.max(w, b);
          for (let t = 0; t < _; t++) {
            if (t < w) {
              v[t] = 0;
              for (let e = t; e < r; e++) v[t] = B(v[t], a[e][t]);
              if (0 !== v[t]) {
                a[t][t] < 0 && (v[t] = -v[t]);
                for (let e = t; e < r; e++) a[e][t] /= v[t];
                a[t][t] += 1;
              }
              v[t] = -v[t];
            }
            for (let e = t + 1; e < n; e++) {
              if (t < w && 0 !== v[t]) {
                let n = 0;
                for (let i = t; i < r; i++) n += a[i][t] * a[i][e];
                n = -n / a[t][t];
                for (let i = t; i < r; i++) a[i][e] += n * a[i][t];
              }
              p[e] = a[t][e];
            }
            if (h && t < w) for (let e = t; e < r; e++) g[e][t] = a[e][t];
            if (t < b) {
              p[t] = 0;
              for (let e = t + 1; e < n; e++) p[t] = B(p[t], p[e]);
              if (0 !== p[t]) {
                p[t + 1] < 0 && (p[t] = 0 - p[t]);
                for (let e = t + 1; e < n; e++) p[e] /= p[t];
                p[t + 1] += 1;
              }
              if (((p[t] = -p[t]), t + 1 < r && 0 !== p[t])) {
                for (let e = t + 1; e < r; e++) y[e] = 0;
                for (let e = t + 1; e < r; e++)
                  for (let r = t + 1; r < n; r++) y[e] += p[r] * a[e][r];
                for (let e = t + 1; e < n; e++) {
                  let n = -p[e] / p[t + 1];
                  for (let i = t + 1; i < r; i++) a[i][e] += n * y[i];
                }
              }
              if (u) for (let e = t + 1; e < n; e++) m[e][t] = p[e];
            }
          }
          let E = Math.min(n, r + 1);
          if (
            (w < n && (v[w] = a[w][w]),
            r < E && (v[E - 1] = 0),
            b + 1 < E && (p[b] = a[b][E - 1]),
            (p[E - 1] = 0),
            h)
          ) {
            for (let t = w; t < l; t++) {
              for (let e = 0; e < r; e++) g[e][t] = 0;
              g[t][t] = 1;
            }
            for (let t = w - 1; t >= 0; t--)
              if (0 !== v[t]) {
                for (let e = t + 1; e < l; e++) {
                  let n = 0;
                  for (let i = t; i < r; i++) n += g[i][t] * g[i][e];
                  n = -n / g[t][t];
                  for (let i = t; i < r; i++) g[i][e] += n * g[i][t];
                }
                for (let e = t; e < r; e++) g[e][t] = -g[e][t];
                g[t][t] = 1 + g[t][t];
                for (let e = 0; e < t - 1; e++) g[e][t] = 0;
              } else {
                for (let e = 0; e < r; e++) g[e][t] = 0;
                g[t][t] = 1;
              }
          }
          if (u)
            for (let t = n - 1; t >= 0; t--) {
              if (t < b && 0 !== p[t])
                for (let e = t + 1; e < n; e++) {
                  let r = 0;
                  for (let i = t + 1; i < n; i++) r += m[i][t] * m[i][e];
                  r = -r / m[t + 1][t];
                  for (let i = t + 1; i < n; i++) m[i][e] += r * m[i][t];
                }
              for (let e = 0; e < n; e++) m[e][t] = 0;
              m[t][t] = 1;
            }
          for (var M = E - 1, S = Number.EPSILON; E > 0; ) {
            let t, e;
            for (t = E - 2; t >= -1 && -1 !== t; t--) {
              const e =
                Number.MIN_VALUE + S * Math.abs(v[t] + Math.abs(v[t + 1]));
              if (Math.abs(p[t]) <= e || Number.isNaN(p[t])) {
                p[t] = 0;
                break;
              }
            }
            if (t === E - 2) e = 4;
            else {
              let r;
              for (r = E - 1; r >= t && r !== t; r--) {
                let e =
                  (r !== E ? Math.abs(p[r]) : 0) +
                  (r !== t + 1 ? Math.abs(p[r - 1]) : 0);
                if (Math.abs(v[r]) <= S * e) {
                  v[r] = 0;
                  break;
                }
              }
              r === t ? (e = 3) : r === E - 1 ? (e = 1) : ((e = 2), (t = r));
            }
            switch ((t++, e)) {
              case 1: {
                let e = p[E - 2];
                p[E - 2] = 0;
                for (let r = E - 2; r >= t; r--) {
                  let i = B(v[r], e),
                    o = v[r] / i,
                    s = e / i;
                  if (
                    ((v[r] = i),
                    r !== t && ((e = -s * p[r - 1]), (p[r - 1] = o * p[r - 1])),
                    u)
                  )
                    for (let t = 0; t < n; t++)
                      (i = o * m[t][r] + s * m[t][E - 1]),
                        (m[t][E - 1] = -s * m[t][r] + o * m[t][E - 1]),
                        (m[t][r] = i);
                }
                break;
              }
              case 2: {
                let e = p[t - 1];
                p[t - 1] = 0;
                for (let n = t; n < E; n++) {
                  let i = B(v[n], e),
                    o = v[n] / i,
                    s = e / i;
                  if (((v[n] = i), (e = -s * p[n]), (p[n] = o * p[n]), h))
                    for (let e = 0; e < r; e++)
                      (i = o * g[e][n] + s * g[e][t - 1]),
                        (g[e][t - 1] = -s * g[e][n] + o * g[e][t - 1]),
                        (g[e][n] = i);
                }
                break;
              }
              case 3: {
                const e = Math.max(
                    Math.abs(v[E - 1]),
                    Math.abs(v[E - 2]),
                    Math.abs(p[E - 2]),
                    Math.abs(v[t]),
                    Math.abs(p[t])
                  ),
                  i = v[E - 1] / e,
                  o = v[E - 2] / e,
                  s = p[E - 2] / e,
                  a = v[t] / e,
                  c = p[t] / e,
                  f = ((o + i) * (o - i) + s * s) / 2,
                  l = i * s * (i * s);
                let d = 0;
                (0 === f && 0 === l) ||
                  (d =
                    l /
                    (f +
                      (d =
                        f < 0
                          ? 0 - Math.sqrt(f * f + l)
                          : Math.sqrt(f * f + l))));
                let y = (a + i) * (a - i) + d,
                  x = a * c;
                for (let e = t; e < E - 1; e++) {
                  let i = B(y, x);
                  0 === i && (i = Number.MIN_VALUE);
                  let o = y / i,
                    s = x / i;
                  if (
                    (e !== t && (p[e - 1] = i),
                    (y = o * v[e] + s * p[e]),
                    (p[e] = o * p[e] - s * v[e]),
                    (x = s * v[e + 1]),
                    (v[e + 1] = o * v[e + 1]),
                    u)
                  )
                    for (let t = 0; t < n; t++)
                      (i = o * m[t][e] + s * m[t][e + 1]),
                        (m[t][e + 1] = -s * m[t][e] + o * m[t][e + 1]),
                        (m[t][e] = i);
                  if (
                    (0 === (i = B(y, x)) && (i = Number.MIN_VALUE),
                    (o = y / i),
                    (s = x / i),
                    (v[e] = i),
                    (y = o * p[e] + s * v[e + 1]),
                    (v[e + 1] = -s * p[e] + o * v[e + 1]),
                    (x = s * p[e + 1]),
                    (p[e + 1] = o * p[e + 1]),
                    h && e < r - 1)
                  )
                    for (let t = 0; t < r; t++)
                      (i = o * g[t][e] + s * g[t][e + 1]),
                        (g[t][e + 1] = -s * g[t][e] + o * g[t][e + 1]),
                        (g[t][e] = i);
                }
                (p[E - 2] = y), 1;
                break;
              }
              case 4:
                if (v[t] <= 0 && ((v[t] = v[t] < 0 ? -v[t] : 0), u))
                  for (let e = 0; e <= M; e++) m[e][t] = -m[e][t];
                for (; t < M && !(v[t] >= v[t + 1]); ) {
                  let e = v[t];
                  if (((v[t] = v[t + 1]), (v[t + 1] = e), u && t < n - 1))
                    for (let r = 0; r < n; r++)
                      (e = m[r][t + 1]), (m[r][t + 1] = m[r][t]), (m[r][t] = e);
                  if (h && t < r - 1)
                    for (let n = 0; n < r; n++)
                      (e = g[n][t + 1]), (g[n][t + 1] = g[n][t]), (g[n][t] = e);
                  t++;
                }
                0, E--;
            }
          }
          if (c) {
            var T = m;
            (m = g), (g = T);
          }
          (this.m = r), (this.n = n), (this.s = v), (this.U = g), (this.V = m);
        }
        solve(t) {
          var e = t,
            r = this.threshold,
            n = this.s.length,
            i = at.zeros(n, n);
          for (let t = 0; t < n; t++)
            Math.abs(this.s[t]) <= r
              ? (i[t][t] = 0)
              : (i[t][t] = 1 / this.s[t]);
          var o = this.U,
            s = this.rightSingularVectors,
            a = s.mmul(i),
            h = s.rows,
            u = o.length,
            c = at.zeros(h, u);
          for (let t = 0; t < h; t++)
            for (let e = 0; e < u; e++) {
              let r = 0;
              for (let i = 0; i < n; i++) r += a[t][i] * o[e][i];
              c[t][e] = r;
            }
          return c.mmul(e);
        }
        solveForDiagonal(t) {
          return this.solve(at.diag(t));
        }
        inverse() {
          var t = this.V,
            e = this.threshold,
            r = t.length,
            n = t[0].length,
            i = new at(r, this.s.length);
          for (let o = 0; o < r; o++)
            for (let r = 0; r < n; r++)
              Math.abs(this.s[r]) > e
                ? (i[o][r] = t[o][r] / this.s[r])
                : (i[o][r] = 0);
          var o = this.U,
            s = o.length,
            a = o[0].length,
            h = new at(r, s);
          for (let t = 0; t < r; t++)
            for (let e = 0; e < s; e++) {
              let r = 0;
              for (let n = 0; n < a; n++) r += i[t][n] * o[e][n];
              h[t][e] = r;
            }
          return h;
        }
        get condition() {
          return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
        }
        get norm2() {
          return this.s[0];
        }
        get rank() {
          for (
            var t = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON,
              e = 0,
              r = this.s,
              n = 0,
              i = r.length;
            n < i;
            n++
          )
            r[n] > t && e++;
          return e;
        }
        get diagonal() {
          return this.s;
        }
        get threshold() {
          return (Number.EPSILON / 2) * Math.max(this.m, this.n) * this.s[0];
        }
        get leftSingularVectors() {
          return at.isMatrix(this.U) || (this.U = new at(this.U)), this.U;
        }
        get rightSingularVectors() {
          return at.isMatrix(this.V) || (this.V = new at(this.V)), this.V;
        }
        get diagonalMatrix() {
          return at.diag(this.s);
        }
      }
      function U(t, e, r) {
        var n = r ? t.rows : t.rows - 1;
        if (e < 0 || e > n) throw new RangeError('Row index out of range');
      }
      function V(t, e, r) {
        var n = r ? t.columns : t.columns - 1;
        if (e < 0 || e > n) throw new RangeError('Column index out of range');
      }
      function j(t, e) {
        if ((e.to1DArray && (e = e.to1DArray()), e.length !== t.columns))
          throw new RangeError(
            'vector size must be the same as the number of columns'
          );
        return e;
      }
      function X(t, e) {
        if ((e.to1DArray && (e = e.to1DArray()), e.length !== t.rows))
          throw new RangeError(
            'vector size must be the same as the number of rows'
          );
        return e;
      }
      function Y(t, e, r) {
        return { row: G(t, e), column: $(t, r) };
      }
      function G(t, e) {
        if ('object' != typeof e)
          throw new TypeError('unexpected type for row indices');
        if (e.some(e => e < 0 || e >= t.rows))
          throw new RangeError('row indices are out of range');
        return Array.isArray(e) || (e = Array.from(e)), e;
      }
      function $(t, e) {
        if ('object' != typeof e)
          throw new TypeError('unexpected type for column indices');
        if (e.some(e => e < 0 || e >= t.columns))
          throw new RangeError('column indices are out of range');
        return Array.isArray(e) || (e = Array.from(e)), e;
      }
      function W(t, e, r, n, i) {
        if (5 !== arguments.length)
          throw new RangeError('expected 4 arguments');
        if (
          (H('startRow', e),
          H('endRow', r),
          H('startColumn', n),
          H('endColumn', i),
          e > r ||
            n > i ||
            e < 0 ||
            e >= t.rows ||
            r < 0 ||
            r >= t.rows ||
            n < 0 ||
            n >= t.columns ||
            i < 0 ||
            i >= t.columns)
        )
          throw new RangeError('Submatrix indices are out of range');
      }
      function H(t, e) {
        if ('number' != typeof e) throw new TypeError(`${t} must be a number`);
      }
      class Z extends st() {
        constructor(t, e, r) {
          super(), (this.matrix = t), (this.rows = e), (this.columns = r);
        }
        static get [Symbol.species]() {
          return at;
        }
      }
      class K extends Z {
        constructor(t) {
          super(t, t.columns, t.rows);
        }
        set(t, e, r) {
          return this.matrix.set(e, t, r), this;
        }
        get(t, e) {
          return this.matrix.get(e, t);
        }
      }
      class J extends Z {
        constructor(t, e) {
          super(t, 1, t.columns), (this.row = e);
        }
        set(t, e, r) {
          return this.matrix.set(this.row, e, r), this;
        }
        get(t, e) {
          return this.matrix.get(this.row, e);
        }
      }
      class Q extends Z {
        constructor(t, e, r, n, i) {
          W(t, e, r, n, i),
            super(t, r - e + 1, i - n + 1),
            (this.startRow = e),
            (this.startColumn = n);
        }
        set(t, e, r) {
          return (
            this.matrix.set(this.startRow + t, this.startColumn + e, r), this
          );
        }
        get(t, e) {
          return this.matrix.get(this.startRow + t, this.startColumn + e);
        }
      }
      class tt extends Z {
        constructor(t, e, r) {
          var n = Y(t, e, r);
          super(t, n.row.length, n.column.length),
            (this.rowIndices = n.row),
            (this.columnIndices = n.column);
        }
        set(t, e, r) {
          return (
            this.matrix.set(this.rowIndices[t], this.columnIndices[e], r), this
          );
        }
        get(t, e) {
          return this.matrix.get(this.rowIndices[t], this.columnIndices[e]);
        }
      }
      class et extends Z {
        constructor(t, e) {
          super(t, (e = G(t, e)).length, t.columns), (this.rowIndices = e);
        }
        set(t, e, r) {
          return this.matrix.set(this.rowIndices[t], e, r), this;
        }
        get(t, e) {
          return this.matrix.get(this.rowIndices[t], e);
        }
      }
      class rt extends Z {
        constructor(t, e) {
          (e = $(t, e)), super(t, t.rows, e.length), (this.columnIndices = e);
        }
        set(t, e, r) {
          return this.matrix.set(t, this.columnIndices[e], r), this;
        }
        get(t, e) {
          return this.matrix.get(t, this.columnIndices[e]);
        }
      }
      class nt extends Z {
        constructor(t, e) {
          super(t, t.rows, 1), (this.column = e);
        }
        set(t, e, r) {
          return this.matrix.set(t, this.column, r), this;
        }
        get(t) {
          return this.matrix.get(t, this.column);
        }
      }
      class it extends Z {
        constructor(t) {
          super(t, t.rows, t.columns);
        }
        set(t, e, r) {
          return this.matrix.set(this.rows - t - 1, e, r), this;
        }
        get(t, e) {
          return this.matrix.get(this.rows - t - 1, e);
        }
      }
      class ot extends Z {
        constructor(t) {
          super(t, t.rows, t.columns);
        }
        set(t, e, r) {
          return this.matrix.set(t, this.columns - e - 1, r), this;
        }
        get(t, e) {
          return this.matrix.get(t, this.columns - e - 1);
        }
      }
      function st(t) {
        void 0 === t && (t = Object);
        class e extends t {
          static get [Symbol.species]() {
            return this;
          }
          static from1DArray(t, e, r) {
            if (t * e !== r.length)
              throw new RangeError(
                'Data length does not match given dimensions'
              );
            for (var n = new this(t, e), i = 0; i < t; i++)
              for (var o = 0; o < e; o++) n.set(i, o, r[i * e + o]);
            return n;
          }
          static rowVector(t) {
            for (var e = new this(1, t.length), r = 0; r < t.length; r++)
              e.set(0, r, t[r]);
            return e;
          }
          static columnVector(t) {
            for (var e = new this(t.length, 1), r = 0; r < t.length; r++)
              e.set(r, 0, t[r]);
            return e;
          }
          static empty(t, e) {
            return new this(t, e);
          }
          static zeros(t, e) {
            return this.empty(t, e).fill(0);
          }
          static ones(t, e) {
            return this.empty(t, e).fill(1);
          }
          static rand(t, e, r) {
            void 0 === r && (r = Math.random);
            for (var n = this.empty(t, e), i = 0; i < t; i++)
              for (var o = 0; o < e; o++) n.set(i, o, r());
            return n;
          }
          static randInt(t, e, r, n) {
            void 0 === r && (r = 1e3), void 0 === n && (n = Math.random);
            for (var i = this.empty(t, e), o = 0; o < t; o++)
              for (var s = 0; s < e; s++) {
                var a = Math.floor(n() * r);
                i.set(o, s, a);
              }
            return i;
          }
          static eye(t, e, r) {
            void 0 === e && (e = t), void 0 === r && (r = 1);
            for (
              var n = Math.min(t, e), i = this.zeros(t, e), o = 0;
              o < n;
              o++
            )
              i.set(o, o, r);
            return i;
          }
          static diag(t, e, r) {
            var n = t.length;
            void 0 === e && (e = n), void 0 === r && (r = e);
            for (
              var i = Math.min(n, e, r), o = this.zeros(e, r), s = 0;
              s < i;
              s++
            )
              o.set(s, s, t[s]);
            return o;
          }
          static min(t, e) {
            (t = this.checkMatrix(t)), (e = this.checkMatrix(e));
            for (
              var r = t.rows, n = t.columns, i = new this(r, n), o = 0;
              o < r;
              o++
            )
              for (var s = 0; s < n; s++)
                i.set(o, s, Math.min(t.get(o, s), e.get(o, s)));
            return i;
          }
          static max(t, e) {
            (t = this.checkMatrix(t)), (e = this.checkMatrix(e));
            for (
              var r = t.rows, n = t.columns, i = new this(r, n), o = 0;
              o < r;
              o++
            )
              for (var s = 0; s < n; s++)
                i.set(o, s, Math.max(t.get(o, s), e.get(o, s)));
            return i;
          }
          static checkMatrix(t) {
            return e.isMatrix(t) ? t : new this(t);
          }
          static isMatrix(t) {
            return null != t && 'Matrix' === t.klass;
          }
          get size() {
            return this.rows * this.columns;
          }
          apply(t) {
            if ('function' != typeof t)
              throw new TypeError('callback must be a function');
            for (var e = this.rows, r = this.columns, n = 0; n < e; n++)
              for (var i = 0; i < r; i++) t.call(this, n, i);
            return this;
          }
          to1DArray() {
            for (var t = new Array(this.size), e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                t[e * this.columns + r] = this.get(e, r);
            return t;
          }
          to2DArray() {
            for (var t = new Array(this.rows), e = 0; e < this.rows; e++) {
              t[e] = new Array(this.columns);
              for (var r = 0; r < this.columns; r++) t[e][r] = this.get(e, r);
            }
            return t;
          }
          isRowVector() {
            return 1 === this.rows;
          }
          isColumnVector() {
            return 1 === this.columns;
          }
          isVector() {
            return 1 === this.rows || 1 === this.columns;
          }
          isSquare() {
            return this.rows === this.columns;
          }
          isSymmetric() {
            if (this.isSquare()) {
              for (var t = 0; t < this.rows; t++)
                for (var e = 0; e <= t; e++)
                  if (this.get(t, e) !== this.get(e, t)) return !1;
              return !0;
            }
            return !1;
          }
          isEchelonForm() {
            let t = 0,
              e = 0,
              r = -1,
              n = !0,
              i = !1;
            for (; t < this.rows && n; ) {
              for (e = 0, i = !1; e < this.columns && !1 === i; )
                0 === this.get(t, e)
                  ? e++
                  : 1 === this.get(t, e) && e > r
                  ? ((i = !0), (r = e))
                  : ((n = !1), (i = !0));
              t++;
            }
            return n;
          }
          isReducedEchelonForm() {
            let t = 0,
              e = 0,
              r = -1,
              n = !0,
              i = !1;
            for (; t < this.rows && n; ) {
              for (e = 0, i = !1; e < this.columns && !1 === i; )
                0 === this.get(t, e)
                  ? e++
                  : 1 === this.get(t, e) && e > r
                  ? ((i = !0), (r = e))
                  : ((n = !1), (i = !0));
              for (let r = e + 1; r < this.rows; r++)
                0 !== this.get(t, r) && (n = !1);
              t++;
            }
            return n;
          }
          set(t, e, r) {
            throw new Error('set method is unimplemented');
          }
          get(t, e) {
            throw new Error('get method is unimplemented');
          }
          repeat(t, e) {
            (t = t || 1), (e = e || 1);
            for (
              var r = new this.constructor[Symbol.species](
                  this.rows * t,
                  this.columns * e
                ),
                n = 0;
              n < t;
              n++
            )
              for (var i = 0; i < e; i++)
                r.setSubMatrix(this, this.rows * n, this.columns * i);
            return r;
          }
          fill(t) {
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++) this.set(e, r, t);
            return this;
          }
          neg() {
            return this.mulS(-1);
          }
          getRow(t) {
            U(this, t);
            for (var e = new Array(this.columns), r = 0; r < this.columns; r++)
              e[r] = this.get(t, r);
            return e;
          }
          getRowVector(t) {
            return this.constructor.rowVector(this.getRow(t));
          }
          setRow(t, e) {
            U(this, t), (e = j(this, e));
            for (var r = 0; r < this.columns; r++) this.set(t, r, e[r]);
            return this;
          }
          swapRows(t, e) {
            U(this, t), U(this, e);
            for (var r = 0; r < this.columns; r++) {
              var n = this.get(t, r);
              this.set(t, r, this.get(e, r)), this.set(e, r, n);
            }
            return this;
          }
          getColumn(t) {
            V(this, t);
            for (var e = new Array(this.rows), r = 0; r < this.rows; r++)
              e[r] = this.get(r, t);
            return e;
          }
          getColumnVector(t) {
            return this.constructor.columnVector(this.getColumn(t));
          }
          setColumn(t, e) {
            V(this, t), (e = X(this, e));
            for (var r = 0; r < this.rows; r++) this.set(r, t, e[r]);
            return this;
          }
          swapColumns(t, e) {
            V(this, t), V(this, e);
            for (var r = 0; r < this.rows; r++) {
              var n = this.get(r, t);
              this.set(r, t, this.get(r, e)), this.set(r, e, n);
            }
            return this;
          }
          addRowVector(t) {
            t = j(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) + t[r]);
            return this;
          }
          subRowVector(t) {
            t = j(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) - t[r]);
            return this;
          }
          mulRowVector(t) {
            t = j(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) * t[r]);
            return this;
          }
          divRowVector(t) {
            t = j(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) / t[r]);
            return this;
          }
          addColumnVector(t) {
            t = X(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) + t[e]);
            return this;
          }
          subColumnVector(t) {
            t = X(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) - t[e]);
            return this;
          }
          mulColumnVector(t) {
            t = X(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) * t[e]);
            return this;
          }
          divColumnVector(t) {
            t = X(this, t);
            for (var e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.set(e, r, this.get(e, r) / t[e]);
            return this;
          }
          mulRow(t, e) {
            U(this, t);
            for (var r = 0; r < this.columns; r++)
              this.set(t, r, this.get(t, r) * e);
            return this;
          }
          mulColumn(t, e) {
            V(this, t);
            for (var r = 0; r < this.rows; r++)
              this.set(r, t, this.get(r, t) * e);
            return this;
          }
          max() {
            for (var t = this.get(0, 0), e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.get(e, r) > t && (t = this.get(e, r));
            return t;
          }
          maxIndex() {
            for (var t = this.get(0, 0), e = [0, 0], r = 0; r < this.rows; r++)
              for (var n = 0; n < this.columns; n++)
                this.get(r, n) > t &&
                  ((t = this.get(r, n)), (e[0] = r), (e[1] = n));
            return e;
          }
          min() {
            for (var t = this.get(0, 0), e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                this.get(e, r) < t && (t = this.get(e, r));
            return t;
          }
          minIndex() {
            for (var t = this.get(0, 0), e = [0, 0], r = 0; r < this.rows; r++)
              for (var n = 0; n < this.columns; n++)
                this.get(r, n) < t &&
                  ((t = this.get(r, n)), (e[0] = r), (e[1] = n));
            return e;
          }
          maxRow(t) {
            U(this, t);
            for (var e = this.get(t, 0), r = 1; r < this.columns; r++)
              this.get(t, r) > e && (e = this.get(t, r));
            return e;
          }
          maxRowIndex(t) {
            U(this, t);
            for (
              var e = this.get(t, 0), r = [t, 0], n = 1;
              n < this.columns;
              n++
            )
              this.get(t, n) > e && ((e = this.get(t, n)), (r[1] = n));
            return r;
          }
          minRow(t) {
            U(this, t);
            for (var e = this.get(t, 0), r = 1; r < this.columns; r++)
              this.get(t, r) < e && (e = this.get(t, r));
            return e;
          }
          minRowIndex(t) {
            U(this, t);
            for (
              var e = this.get(t, 0), r = [t, 0], n = 1;
              n < this.columns;
              n++
            )
              this.get(t, n) < e && ((e = this.get(t, n)), (r[1] = n));
            return r;
          }
          maxColumn(t) {
            V(this, t);
            for (var e = this.get(0, t), r = 1; r < this.rows; r++)
              this.get(r, t) > e && (e = this.get(r, t));
            return e;
          }
          maxColumnIndex(t) {
            V(this, t);
            for (var e = this.get(0, t), r = [0, t], n = 1; n < this.rows; n++)
              this.get(n, t) > e && ((e = this.get(n, t)), (r[0] = n));
            return r;
          }
          minColumn(t) {
            V(this, t);
            for (var e = this.get(0, t), r = 1; r < this.rows; r++)
              this.get(r, t) < e && (e = this.get(r, t));
            return e;
          }
          minColumnIndex(t) {
            V(this, t);
            for (var e = this.get(0, t), r = [0, t], n = 1; n < this.rows; n++)
              this.get(n, t) < e && ((e = this.get(n, t)), (r[0] = n));
            return r;
          }
          diag() {
            for (
              var t = Math.min(this.rows, this.columns),
                e = new Array(t),
                r = 0;
              r < t;
              r++
            )
              e[r] = this.get(r, r);
            return e;
          }
          sum(t) {
            switch (t) {
              case 'row':
                return (function(t) {
                  for (var e = at.zeros(t.rows, 1), r = 0; r < t.rows; ++r)
                    for (var n = 0; n < t.columns; ++n)
                      e.set(r, 0, e.get(r, 0) + t.get(r, n));
                  return e;
                })(this);
              case 'column':
                return (function(t) {
                  for (var e = at.zeros(1, t.columns), r = 0; r < t.rows; ++r)
                    for (var n = 0; n < t.columns; ++n)
                      e.set(0, n, e.get(0, n) + t.get(r, n));
                  return e;
                })(this);
              default:
                return (function(t) {
                  for (var e = 0, r = 0; r < t.rows; r++)
                    for (var n = 0; n < t.columns; n++) e += t.get(r, n);
                  return e;
                })(this);
            }
          }
          mean() {
            return this.sum() / this.size;
          }
          prod() {
            for (var t = 1, e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++) t *= this.get(e, r);
            return t;
          }
          norm(t = 'frobenius') {
            var e = 0;
            if ('max' === t) return this.max();
            if ('frobenius' === t) {
              for (var r = 0; r < this.rows; r++)
                for (var n = 0; n < this.columns; n++)
                  e += this.get(r, n) * this.get(r, n);
              return Math.sqrt(e);
            }
            throw new RangeError(`unknown norm type: ${t}`);
          }
          cumulativeSum() {
            for (var t = 0, e = 0; e < this.rows; e++)
              for (var r = 0; r < this.columns; r++)
                (t += this.get(e, r)), this.set(e, r, t);
            return this;
          }
          dot(t) {
            e.isMatrix(t) && (t = t.to1DArray());
            var r = this.to1DArray();
            if (r.length !== t.length)
              throw new RangeError('vectors do not have the same size');
            for (var n = 0, i = 0; i < r.length; i++) n += r[i] * t[i];
            return n;
          }
          mmul(t) {
            (t = this.constructor.checkMatrix(t)),
              this.columns !== t.rows &&
                console.warn(
                  'Number of columns of left matrix are not equal to number of rows of right matrix.'
                );
            for (
              var e = this.rows,
                r = this.columns,
                n = t.columns,
                i = new this.constructor[Symbol.species](e, n),
                o = new Array(r),
                s = 0;
              s < n;
              s++
            ) {
              for (var a = 0; a < r; a++) o[a] = t.get(a, s);
              for (var h = 0; h < e; h++) {
                var u = 0;
                for (a = 0; a < r; a++) u += this.get(h, a) * o[a];
                i.set(h, s, u);
              }
            }
            return i;
          }
          strassen2x2(t) {
            var e = new this.constructor[Symbol.species](2, 2);
            const r = this.get(0, 0),
              n = t.get(0, 0),
              i = this.get(0, 1),
              o = t.get(0, 1),
              s = this.get(1, 0),
              a = t.get(1, 0),
              h = this.get(1, 1),
              u = t.get(1, 1),
              c = (r + h) * (n + u),
              f = (s + h) * n,
              l = r * (o - u),
              d = h * (a - n),
              v = (r + i) * u,
              g = c + d - v + (i - h) * (a + u),
              m = l + v,
              p = f + d,
              y = c - f + l + (s - r) * (n + o);
            return (
              e.set(0, 0, g), e.set(0, 1, m), e.set(1, 0, p), e.set(1, 1, y), e
            );
          }
          strassen3x3(t) {
            var e = new this.constructor[Symbol.species](3, 3);
            const r = this.get(0, 0),
              n = this.get(0, 1),
              i = this.get(0, 2),
              o = this.get(1, 0),
              s = this.get(1, 1),
              a = this.get(1, 2),
              h = this.get(2, 0),
              u = this.get(2, 1),
              c = this.get(2, 2),
              f = t.get(0, 0),
              l = t.get(0, 1),
              d = t.get(0, 2),
              v = t.get(1, 0),
              g = t.get(1, 1),
              m = t.get(1, 2),
              p = t.get(2, 0),
              y = t.get(2, 1),
              x = t.get(2, 2),
              w = (r - o) * (-l + g),
              b = (-r + o + s) * (f - l + g),
              _ = (o + s) * (-f + l),
              E = r * f,
              M = (-r + h + u) * (f - d + m),
              S = (-r + h) * (d - m),
              T = (h + u) * (-f + d),
              A = (-i + u + c) * (g + p - y),
              z = (i - c) * (g - y),
              k = i * p,
              R = (u + c) * (-p + y),
              C = (-i + s + a) * (m + p - x),
              P = (i - a) * (m - x),
              I = (s + a) * (-p + x),
              N = E + k + n * v,
              F = (r + n + i - o - s - u - c) * g + b + _ + E + A + k + R,
              L = E + M + T + (r + n + i - s - a - h - u) * m + k + C + I,
              q = w + s * (-f + l + v - g - m - p + x) + b + E + k + C + P,
              B = w + b + _ + E + a * y,
              D = k + C + P + I + o * d,
              O = E + M + S + u * (-f + d + v - g - m - p + y) + A + z + k,
              U = A + z + k + R + h * l,
              V = E + M + S + T + c * x;
            return (
              e.set(0, 0, N),
              e.set(0, 1, F),
              e.set(0, 2, L),
              e.set(1, 0, q),
              e.set(1, 1, B),
              e.set(1, 2, D),
              e.set(2, 0, O),
              e.set(2, 1, U),
              e.set(2, 2, V),
              e
            );
          }
          mmulStrassen(t) {
            var r = this.clone(),
              n = r.rows,
              i = r.columns,
              o = t.rows,
              s = t.columns;
            function a(t, r, n) {
              var i = t.rows,
                o = t.columns;
              if (i === r && o === n) return t;
              var s = e.zeros(r, n);
              return (s = s.setSubMatrix(t, 0, 0));
            }
            i !== o &&
              console.warn(
                `Multiplying ${n} x ${i} and ${o} x ${s} matrix: dimensions do not match.`
              );
            var h = Math.max(n, o),
              u = Math.max(i, s);
            return (function t(r, n, i, o) {
              if (i <= 512 || o <= 512) return r.mmul(n);
              i % 2 == 1 && o % 2 == 1
                ? ((r = a(r, i + 1, o + 1)), (n = a(n, i + 1, o + 1)))
                : i % 2 == 1
                ? ((r = a(r, i + 1, o)), (n = a(n, i + 1, o)))
                : o % 2 == 1 && ((r = a(r, i, o + 1)), (n = a(n, i, o + 1)));
              var s = parseInt(r.rows / 2, 10),
                h = parseInt(r.columns / 2, 10),
                u = r.subMatrix(0, s - 1, 0, h - 1),
                c = n.subMatrix(0, s - 1, 0, h - 1),
                f = r.subMatrix(0, s - 1, h, r.columns - 1),
                l = n.subMatrix(0, s - 1, h, n.columns - 1),
                d = r.subMatrix(s, r.rows - 1, 0, h - 1),
                v = n.subMatrix(s, n.rows - 1, 0, h - 1),
                g = r.subMatrix(s, r.rows - 1, h, r.columns - 1),
                m = n.subMatrix(s, n.rows - 1, h, n.columns - 1),
                p = t(e.add(u, g), e.add(c, m), s, h),
                y = t(e.add(d, g), c, s, h),
                x = t(u, e.sub(l, m), s, h),
                w = t(g, e.sub(v, c), s, h),
                b = t(e.add(u, f), m, s, h),
                _ = t(e.sub(d, u), e.add(c, l), s, h),
                E = t(e.sub(f, g), e.add(v, m), s, h),
                M = e.add(p, w);
              M.sub(b), M.add(E);
              var S = e.add(x, b),
                T = e.add(y, w),
                A = e.sub(p, y);
              A.add(x), A.add(_);
              var z = e.zeros(2 * M.rows, 2 * M.columns);
              return (z = (z = (z = (z = z.setSubMatrix(M, 0, 0)).setSubMatrix(
                S,
                M.rows,
                0
              )).setSubMatrix(T, 0, M.columns)).setSubMatrix(
                A,
                M.rows,
                M.columns
              )).subMatrix(0, i - 1, 0, o - 1);
            })((r = a(r, h, u)), (t = a(t, h, u)), h, u);
          }
          scaleRows(t, e) {
            if ((t = void 0 === t ? 0 : t) >= (e = void 0 === e ? 1 : e))
              throw new RangeError('min should be strictly smaller than max');
            for (
              var r = this.constructor.empty(this.rows, this.columns), n = 0;
              n < this.rows;
              n++
            ) {
              var i = L(this.getRow(n), { min: t, max: e });
              r.setRow(n, i);
            }
            return r;
          }
          scaleColumns(t, e) {
            if ((t = void 0 === t ? 0 : t) >= (e = void 0 === e ? 1 : e))
              throw new RangeError('min should be strictly smaller than max');
            for (
              var r = this.constructor.empty(this.rows, this.columns), n = 0;
              n < this.columns;
              n++
            ) {
              var i = L(this.getColumn(n), { min: t, max: e });
              r.setColumn(n, i);
            }
            return r;
          }
          kroneckerProduct(t) {
            t = this.constructor.checkMatrix(t);
            for (
              var e = this.rows,
                r = this.columns,
                n = t.rows,
                i = t.columns,
                o = new this.constructor[Symbol.species](e * n, r * i),
                s = 0;
              s < e;
              s++
            )
              for (var a = 0; a < r; a++)
                for (var h = 0; h < n; h++)
                  for (var u = 0; u < i; u++)
                    o[n * s + h][i * a + u] = this.get(s, a) * t.get(h, u);
            return o;
          }
          transpose() {
            for (
              var t = new this.constructor[Symbol.species](
                  this.columns,
                  this.rows
                ),
                e = 0;
              e < this.rows;
              e++
            )
              for (var r = 0; r < this.columns; r++)
                t.set(r, e, this.get(e, r));
            return t;
          }
          sortRows(t) {
            void 0 === t && (t = r);
            for (var e = 0; e < this.rows; e++)
              this.setRow(e, this.getRow(e).sort(t));
            return this;
          }
          sortColumns(t) {
            void 0 === t && (t = r);
            for (var e = 0; e < this.columns; e++)
              this.setColumn(e, this.getColumn(e).sort(t));
            return this;
          }
          subMatrix(t, e, r, n) {
            W(this, t, e, r, n);
            for (
              var i = new this.constructor[Symbol.species](
                  e - t + 1,
                  n - r + 1
                ),
                o = t;
              o <= e;
              o++
            )
              for (var s = r; s <= n; s++) i[o - t][s - r] = this.get(o, s);
            return i;
          }
          subMatrixRow(t, e, r) {
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = this.columns - 1),
              e > r || e < 0 || e >= this.columns || r < 0 || r >= this.columns)
            )
              throw new RangeError('Argument out of range');
            for (
              var n = new this.constructor[Symbol.species](t.length, r - e + 1),
                i = 0;
              i < t.length;
              i++
            )
              for (var o = e; o <= r; o++) {
                if (t[i] < 0 || t[i] >= this.rows)
                  throw new RangeError(`Row index out of range: ${t[i]}`);
                n.set(i, o - e, this.get(t[i], o));
              }
            return n;
          }
          subMatrixColumn(t, e, r) {
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = this.rows - 1),
              e > r || e < 0 || e >= this.rows || r < 0 || r >= this.rows)
            )
              throw new RangeError('Argument out of range');
            for (
              var n = new this.constructor[Symbol.species](r - e + 1, t.length),
                i = 0;
              i < t.length;
              i++
            )
              for (var o = e; o <= r; o++) {
                if (t[i] < 0 || t[i] >= this.columns)
                  throw new RangeError(`Column index out of range: ${t[i]}`);
                n.set(o - e, i, this.get(o, t[i]));
              }
            return n;
          }
          setSubMatrix(t, e, r) {
            W(
              this,
              e,
              e + (t = this.constructor.checkMatrix(t)).rows - 1,
              r,
              r + t.columns - 1
            );
            for (var n = 0; n < t.rows; n++)
              for (var i = 0; i < t.columns; i++)
                this[e + n][r + i] = t.get(n, i);
            return this;
          }
          selection(t, e) {
            for (
              var r = Y(this, t, e),
                n = new this.constructor[Symbol.species](t.length, e.length),
                i = 0;
              i < r.row.length;
              i++
            )
              for (var o = r.row[i], s = 0; s < r.column.length; s++) {
                var a = r.column[s];
                n[i][s] = this.get(o, a);
              }
            return n;
          }
          trace() {
            for (
              var t = Math.min(this.rows, this.columns), e = 0, r = 0;
              r < t;
              r++
            )
              e += this.get(r, r);
            return e;
          }
          transposeView() {
            return new K(this);
          }
          rowView(t) {
            return U(this, t), new J(this, t);
          }
          columnView(t) {
            return V(this, t), new nt(this, t);
          }
          flipRowView() {
            return new it(this);
          }
          flipColumnView() {
            return new ot(this);
          }
          subMatrixView(t, e, r, n) {
            return new Q(this, t, e, r, n);
          }
          selectionView(t, e) {
            return new tt(this, t, e);
          }
          rowSelectionView(t) {
            return new et(this, t);
          }
          columnSelectionView(t) {
            return new rt(this, t);
          }
          det() {
            var t, e, r, n, i, o;
            if (this.isSquare())
              return 2 === this.columns
                ? ((t = this.get(0, 0)),
                  (e = this.get(0, 1)),
                  (r = this.get(1, 0)),
                  t * this.get(1, 1) - e * r)
                : 3 === this.columns
                ? ((n = this.selectionView([1, 2], [1, 2])),
                  (i = this.selectionView([1, 2], [0, 2])),
                  (o = this.selectionView([1, 2], [0, 1])),
                  (t = this.get(0, 0)),
                  (e = this.get(0, 1)),
                  (r = this.get(0, 2)),
                  t * n.det() - e * i.det() + r * o.det())
                : new q(this).determinant;
            throw Error(
              'Determinant can only be calculated for a square matrix.'
            );
          }
          pseudoInverse(t) {
            void 0 === t && (t = Number.EPSILON);
            for (
              var e = new O(this, { autoTranspose: !0 }),
                r = e.leftSingularVectors,
                n = e.rightSingularVectors,
                i = e.diagonal,
                o = 0;
              o < i.length;
              o++
            )
              Math.abs(i[o]) > t ? (i[o] = 1 / i[o]) : (i[o] = 0);
            return (
              (i = this.constructor[Symbol.species].diag(i)),
              n.mmul(i.mmul(r.transposeView()))
            );
          }
          clone() {
            for (
              var t = new this.constructor[Symbol.species](
                  this.rows,
                  this.columns
                ),
                e = 0;
              e < this.rows;
              e++
            )
              for (var r = 0; r < this.columns; r++)
                t.set(e, r, this.get(e, r));
            return t;
          }
        }
        function r(t, e) {
          return t - e;
        }
        (e.prototype.klass = 'Matrix'),
          (e.random = e.rand),
          (e.diagonal = e.diag),
          (e.prototype.diagonal = e.prototype.diag),
          (e.identity = e.eye),
          (e.prototype.negate = e.prototype.neg),
          (e.prototype.tensorProduct = e.prototype.kroneckerProduct),
          (e.prototype.determinant = e.prototype.det);
        var n,
          i =
            '\n(function %name%(matrix, %args%) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%(%args%);\n})\n',
          o = eval;
        for (var s of [
          ['+', 'add'],
          ['-', 'sub', 'subtract'],
          ['*', 'mul', 'multiply'],
          ['/', 'div', 'divide'],
          ['%', 'mod', 'modulus'],
          ['&', 'and'],
          ['|', 'or'],
          ['^', 'xor'],
          ['<<', 'leftShift'],
          ['>>', 'signPropagatingRightShift'],
          ['>>>', 'rightShift', 'zeroFillRightShift'],
        ]) {
          var a = o(
              M(
                "\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n",
                { name: s[1], op: s[0] }
              )
            ),
            h = o(
              M(
                '\n(function %name%S(value) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, this.get(i, j) %op% value);\n        }\n    }\n    return this;\n})\n',
                { name: `${s[1]}S`, op: s[0] }
              )
            ),
            u = o(
              M(
                "\n(function %name%M(matrix) {\n    matrix = this.constructor.checkMatrix(matrix);\n    if (this.rows !== matrix.rows ||\n        this.columns !== matrix.columns) {\n        throw new RangeError('Matrices dimensions must be equal');\n    }\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, this.get(i, j) %op% matrix.get(i, j));\n        }\n    }\n    return this;\n})\n",
                { name: `${s[1]}M`, op: s[0] }
              )
            ),
            c = o(
              M(
                '\n(function %name%(matrix, value) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%(value);\n})\n',
                { name: s[1] }
              )
            );
          for (n = 1; n < s.length; n++)
            (e.prototype[s[n]] = a),
              (e.prototype[`${s[n]}S`] = h),
              (e.prototype[`${s[n]}M`] = u),
              (e[s[n]] = c);
        }
        var f = [['~', 'not']];
        for (var l of ([
          'abs',
          'acos',
          'acosh',
          'asin',
          'asinh',
          'atan',
          'atanh',
          'cbrt',
          'ceil',
          'clz32',
          'cos',
          'cosh',
          'exp',
          'expm1',
          'floor',
          'fround',
          'log',
          'log1p',
          'log10',
          'log2',
          'round',
          'sign',
          'sin',
          'sinh',
          'sqrt',
          'tan',
          'tanh',
          'trunc',
        ].forEach(function(t) {
          f.push([`Math.${t}`, t]);
        }),
        f)) {
          var d = o(
              M(
                '\n(function %name%() {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j)));\n        }\n    }\n    return this;\n})\n',
                { name: l[1], method: l[0] }
              )
            ),
            v = o(
              M(
                '\n(function %name%(matrix) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%();\n})\n',
                { name: l[1] }
              )
            );
          for (n = 1; n < l.length; n++) (e.prototype[l[n]] = d), (e[l[n]] = v);
        }
        for (var g of [['Math.pow', 1, 'pow']]) {
          var m = 'arg0';
          for (n = 1; n < g[1]; n++) m += `, arg${n}`;
          if (1 !== g[1]) {
            var p = o(
                M(
                  '\n(function %name%(%args%) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), %args%));\n        }\n    }\n    return this;\n})\n',
                  { name: g[2], method: g[0], args: m }
                )
              ),
              y = o(M(i, { name: g[2], args: m }));
            for (n = 2; n < g.length; n++)
              (e.prototype[g[n]] = p), (e[g[n]] = y);
          } else {
            var x = { name: g[2], args: m, method: g[0] },
              w = o(
                M(
                  "\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n",
                  x
                )
              ),
              b = o(
                M(
                  '\n(function %name%S(value) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), value));\n        }\n    }\n    return this;\n})\n',
                  x
                )
              ),
              _ = o(
                M(
                  "\n(function %name%M(matrix) {\n    matrix = this.constructor.checkMatrix(matrix);\n    if (this.rows !== matrix.rows ||\n        this.columns !== matrix.columns) {\n        throw new RangeError('Matrices dimensions must be equal');\n    }\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), matrix.get(i, j)));\n        }\n    }\n    return this;\n})\n",
                  x
                )
              ),
              E = o(
                M(
                  '\n(function %name%(matrix, %args%) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%(%args%);\n})\n',
                  x
                )
              );
            for (n = 2; n < g.length; n++)
              (e.prototype[g[n]] = w),
                (e.prototype[`${g[n]}M`] = _),
                (e.prototype[`${g[n]}S`] = b),
                (e[g[n]] = E);
          }
        }
        function M(t, e) {
          for (var r in e) t = t.replace(new RegExp(`%${r}%`, 'g'), e[r]);
          return t;
        }
        return e;
      }
      class at extends st(Array) {
        constructor(t, e) {
          var r;
          if (1 === arguments.length && 'number' == typeof t)
            return new Array(t);
          if (at.isMatrix(t)) return t.clone();
          if (Number.isInteger(t) && t > 0) {
            if ((super(t), !(Number.isInteger(e) && e > 0)))
              throw new TypeError('nColumns must be a positive integer');
            for (r = 0; r < t; r++) this[r] = new Array(e);
          } else {
            if (!Array.isArray(t))
              throw new TypeError(
                'First argument must be a positive number or an array'
              );
            {
              const n = t;
              if (
                ((t = n.length),
                'number' != typeof (e = n[0].length) || 0 === e)
              )
                throw new TypeError(
                  'Data must be a 2D array with at least one element'
                );
              for (super(t), r = 0; r < t; r++) {
                if (n[r].length !== e)
                  throw new RangeError('Inconsistent array dimensions');
                this[r] = [].concat(n[r]);
              }
            }
          }
          return (this.rows = t), (this.columns = e), this;
        }
        set(t, e, r) {
          return (this[t][e] = r), this;
        }
        get(t, e) {
          return this[t][e];
        }
        removeRow(t) {
          if ((U(this, t), 1 === this.rows))
            throw new RangeError('A matrix cannot have less than one row');
          return this.splice(t, 1), (this.rows -= 1), this;
        }
        addRow(t, e) {
          return (
            void 0 === e && ((e = t), (t = this.rows)),
            U(this, t, !0),
            (e = j(this, e)),
            this.splice(t, 0, e),
            (this.rows += 1),
            this
          );
        }
        removeColumn(t) {
          if ((V(this, t), 1 === this.columns))
            throw new RangeError('A matrix cannot have less than one column');
          for (var e = 0; e < this.rows; e++) this[e].splice(t, 1);
          return (this.columns -= 1), this;
        }
        addColumn(t, e) {
          void 0 === e && ((e = t), (t = this.columns)),
            V(this, t, !0),
            (e = X(this, e));
          for (var r = 0; r < this.rows; r++) this[r].splice(t, 0, e[r]);
          return (this.columns += 1), this;
        }
      }
      class ht extends st() {
        constructor(t) {
          super(),
            (this.data = t),
            (this.rows = t.length),
            (this.columns = t[0].length);
        }
        set(t, e, r) {
          return (this.data[t][e] = r), this;
        }
        get(t, e) {
          return this.data[t][e];
        }
        static get [Symbol.species]() {
          return at;
        }
      }
      class ut {
        constructor(t, e = {}) {
          const { assumeSymmetric: r = !1 } = e;
          if (!(t = ht.checkMatrix(t)).isSquare())
            throw new Error('Matrix is not a square matrix');
          var n,
            i,
            o = t.columns,
            s = D(o, o, 0),
            a = new Array(o),
            h = new Array(o),
            u = t;
          if (!!r || t.isSymmetric()) {
            for (n = 0; n < o; n++)
              for (i = 0; i < o; i++) s[n][i] = u.get(n, i);
            !(function(t, e, r, n) {
              var i, o, s, a, h, u, c, f;
              for (h = 0; h < t; h++) r[h] = n[t - 1][h];
              for (a = t - 1; a > 0; a--) {
                for (f = 0, s = 0, u = 0; u < a; u++) f += Math.abs(r[u]);
                if (0 === f)
                  for (e[a] = r[a - 1], h = 0; h < a; h++)
                    (r[h] = n[a - 1][h]), (n[a][h] = 0), (n[h][a] = 0);
                else {
                  for (u = 0; u < a; u++) (r[u] /= f), (s += r[u] * r[u]);
                  for (
                    i = r[a - 1],
                      o = Math.sqrt(s),
                      i > 0 && (o = -o),
                      e[a] = f * o,
                      s -= i * o,
                      r[a - 1] = i - o,
                      h = 0;
                    h < a;
                    h++
                  )
                    e[h] = 0;
                  for (h = 0; h < a; h++) {
                    for (
                      i = r[h], n[h][a] = i, o = e[h] + n[h][h] * i, u = h + 1;
                      u <= a - 1;
                      u++
                    )
                      (o += n[u][h] * r[u]), (e[u] += n[u][h] * i);
                    e[h] = o;
                  }
                  for (i = 0, h = 0; h < a; h++)
                    (e[h] /= s), (i += e[h] * r[h]);
                  for (c = i / (s + s), h = 0; h < a; h++) e[h] -= c * r[h];
                  for (h = 0; h < a; h++) {
                    for (i = r[h], o = e[h], u = h; u <= a - 1; u++)
                      n[u][h] -= i * e[u] + o * r[u];
                    (r[h] = n[a - 1][h]), (n[a][h] = 0);
                  }
                }
                r[a] = s;
              }
              for (a = 0; a < t - 1; a++) {
                if (
                  ((n[t - 1][a] = n[a][a]), (n[a][a] = 1), 0 !== (s = r[a + 1]))
                ) {
                  for (u = 0; u <= a; u++) r[u] = n[u][a + 1] / s;
                  for (h = 0; h <= a; h++) {
                    for (o = 0, u = 0; u <= a; u++) o += n[u][a + 1] * n[u][h];
                    for (u = 0; u <= a; u++) n[u][h] -= o * r[u];
                  }
                }
                for (u = 0; u <= a; u++) n[u][a + 1] = 0;
              }
              for (h = 0; h < t; h++) (r[h] = n[t - 1][h]), (n[t - 1][h] = 0);
              (n[t - 1][t - 1] = 1), (e[0] = 0);
            })(o, h, a, s),
              (function(t, e, r, n) {
                var i, o, s, a, h, u, c, f, l, d, v, g, m, p, y, x;
                for (s = 1; s < t; s++) e[s - 1] = e[s];
                e[t - 1] = 0;
                var w = 0,
                  b = 0,
                  _ = Number.EPSILON;
                for (u = 0; u < t; u++) {
                  for (
                    b = Math.max(b, Math.abs(r[u]) + Math.abs(e[u])), c = u;
                    c < t && !(Math.abs(e[c]) <= _ * b);

                  )
                    c++;
                  if (c > u) {
                    0;
                    do {
                      for (
                        1,
                          i = r[u],
                          f = (r[u + 1] - i) / (2 * e[u]),
                          l = B(f, 1),
                          f < 0 && (l = -l),
                          r[u] = e[u] / (f + l),
                          r[u + 1] = e[u] * (f + l),
                          d = r[u + 1],
                          o = i - r[u],
                          s = u + 2;
                        s < t;
                        s++
                      )
                        r[s] -= o;
                      for (
                        w += o,
                          f = r[c],
                          g = v = 1,
                          m = v,
                          p = e[u + 1],
                          y = 0,
                          x = 0,
                          s = c - 1;
                        s >= u;
                        s--
                      )
                        for (
                          m = g,
                            g = v,
                            x = y,
                            i = v * e[s],
                            o = v * f,
                            l = B(f, e[s]),
                            e[s + 1] = y * l,
                            y = e[s] / l,
                            f = (v = f / l) * r[s] - y * i,
                            r[s + 1] = o + y * (v * i + y * r[s]),
                            h = 0;
                          h < t;
                          h++
                        )
                          (o = n[h][s + 1]),
                            (n[h][s + 1] = y * n[h][s] + v * o),
                            (n[h][s] = v * n[h][s] - y * o);
                      (f = (-y * x * m * p * e[u]) / d),
                        (e[u] = y * f),
                        (r[u] = v * f);
                    } while (Math.abs(e[u]) > _ * b);
                  }
                  (r[u] = r[u] + w), (e[u] = 0);
                }
                for (s = 0; s < t - 1; s++) {
                  for (h = s, f = r[s], a = s + 1; a < t; a++)
                    r[a] < f && ((h = a), (f = r[a]));
                  if (h !== s)
                    for (r[h] = r[s], r[s] = f, a = 0; a < t; a++)
                      (f = n[a][s]), (n[a][s] = n[a][h]), (n[a][h] = f);
                }
              })(o, h, a, s);
          } else {
            var c = D(o, o, 0),
              f = new Array(o);
            for (i = 0; i < o; i++)
              for (n = 0; n < o; n++) c[n][i] = u.get(n, i);
            !(function(t, e, r, n) {
              var i,
                o,
                s,
                a,
                h,
                u,
                c,
                f = t - 1;
              for (u = 1; u <= f - 1; u++) {
                for (c = 0, a = u; a <= f; a++) c += Math.abs(e[a][u - 1]);
                if (0 !== c) {
                  for (s = 0, a = f; a >= u; a--)
                    (r[a] = e[a][u - 1] / c), (s += r[a] * r[a]);
                  for (
                    o = Math.sqrt(s),
                      r[u] > 0 && (o = -o),
                      s -= r[u] * o,
                      r[u] = r[u] - o,
                      h = u;
                    h < t;
                    h++
                  ) {
                    for (i = 0, a = f; a >= u; a--) i += r[a] * e[a][h];
                    for (i /= s, a = u; a <= f; a++) e[a][h] -= i * r[a];
                  }
                  for (a = 0; a <= f; a++) {
                    for (i = 0, h = f; h >= u; h--) i += r[h] * e[a][h];
                    for (i /= s, h = u; h <= f; h++) e[a][h] -= i * r[h];
                  }
                  (r[u] = c * r[u]), (e[u][u - 1] = c * o);
                }
              }
              for (a = 0; a < t; a++)
                for (h = 0; h < t; h++) n[a][h] = a === h ? 1 : 0;
              for (u = f - 1; u >= 1; u--)
                if (0 !== e[u][u - 1]) {
                  for (a = u + 1; a <= f; a++) r[a] = e[a][u - 1];
                  for (h = u; h <= f; h++) {
                    for (o = 0, a = u; a <= f; a++) o += r[a] * n[a][h];
                    for (o = o / r[u] / e[u][u - 1], a = u; a <= f; a++)
                      n[a][h] += o * r[a];
                  }
                }
            })(o, c, f, s),
              (function(t, e, r, n, i) {
                var o,
                  s,
                  a,
                  h,
                  u,
                  c,
                  f,
                  l,
                  d,
                  v,
                  g,
                  m,
                  p,
                  y,
                  x,
                  w = t - 1,
                  b = t - 1,
                  _ = Number.EPSILON,
                  E = 0,
                  M = 0,
                  S = 0,
                  T = 0,
                  A = 0,
                  z = 0,
                  k = 0,
                  R = 0;
                for (o = 0; o < t; o++)
                  for (
                    (o < 0 || o > b) && ((r[o] = i[o][o]), (e[o] = 0)),
                      s = Math.max(o - 1, 0);
                    s < t;
                    s++
                  )
                    M += Math.abs(i[o][s]);
                for (; w >= 0; ) {
                  for (
                    h = w;
                    h > 0 &&
                    (0 ===
                      (z = Math.abs(i[h - 1][h - 1]) + Math.abs(i[h][h])) &&
                      (z = M),
                    !(Math.abs(i[h][h - 1]) < _ * z));

                  )
                    h--;
                  if (h === w)
                    (i[w][w] = i[w][w] + E),
                      (r[w] = i[w][w]),
                      (e[w] = 0),
                      w--,
                      (R = 0);
                  else if (h === w - 1) {
                    if (
                      ((f = i[w][w - 1] * i[w - 1][w]),
                      (S = (i[w - 1][w - 1] - i[w][w]) / 2),
                      (T = S * S + f),
                      (k = Math.sqrt(Math.abs(T))),
                      (i[w][w] = i[w][w] + E),
                      (i[w - 1][w - 1] = i[w - 1][w - 1] + E),
                      (l = i[w][w]),
                      T >= 0)
                    ) {
                      for (
                        k = S >= 0 ? S + k : S - k,
                          r[w - 1] = l + k,
                          r[w] = r[w - 1],
                          0 !== k && (r[w] = l - f / k),
                          e[w - 1] = 0,
                          e[w] = 0,
                          l = i[w][w - 1],
                          z = Math.abs(l) + Math.abs(k),
                          S = l / z,
                          T = k / z,
                          A = Math.sqrt(S * S + T * T),
                          S /= A,
                          T /= A,
                          s = w - 1;
                        s < t;
                        s++
                      )
                        (k = i[w - 1][s]),
                          (i[w - 1][s] = T * k + S * i[w][s]),
                          (i[w][s] = T * i[w][s] - S * k);
                      for (o = 0; o <= w; o++)
                        (k = i[o][w - 1]),
                          (i[o][w - 1] = T * k + S * i[o][w]),
                          (i[o][w] = T * i[o][w] - S * k);
                      for (o = 0; o <= b; o++)
                        (k = n[o][w - 1]),
                          (n[o][w - 1] = T * k + S * n[o][w]),
                          (n[o][w] = T * n[o][w] - S * k);
                    } else
                      (r[w - 1] = l + S),
                        (r[w] = l + S),
                        (e[w - 1] = k),
                        (e[w] = -k);
                    (w -= 2), (R = 0);
                  } else {
                    if (
                      ((l = i[w][w]),
                      (d = 0),
                      (f = 0),
                      h < w &&
                        ((d = i[w - 1][w - 1]),
                        (f = i[w][w - 1] * i[w - 1][w])),
                      10 === R)
                    ) {
                      for (E += l, o = 0; o <= w; o++) i[o][o] -= l;
                      (z = Math.abs(i[w][w - 1]) + Math.abs(i[w - 1][w - 2])),
                        (l = d = 0.75 * z),
                        (f = -0.4375 * z * z);
                    }
                    if (30 === R && (z = (z = (d - l) / 2) * z + f) > 0) {
                      for (
                        z = Math.sqrt(z),
                          d < l && (z = -z),
                          z = l - f / ((d - l) / 2 + z),
                          o = 0;
                        o <= w;
                        o++
                      )
                        i[o][o] -= z;
                      (E += z), (l = d = f = 0.964);
                    }
                    for (
                      R += 1, u = w - 2;
                      u >= h &&
                      ((k = i[u][u]),
                      (S =
                        ((A = l - k) * (z = d - k) - f) / i[u + 1][u] +
                        i[u][u + 1]),
                      (T = i[u + 1][u + 1] - k - A - z),
                      (A = i[u + 2][u + 1]),
                      (z = Math.abs(S) + Math.abs(T) + Math.abs(A)),
                      (S /= z),
                      (T /= z),
                      (A /= z),
                      u !== h) &&
                      !(
                        Math.abs(i[u][u - 1]) * (Math.abs(T) + Math.abs(A)) <
                        _ *
                          (Math.abs(S) *
                            (Math.abs(i[u - 1][u - 1]) +
                              Math.abs(k) +
                              Math.abs(i[u + 1][u + 1])))
                      );

                    )
                      u--;
                    for (o = u + 2; o <= w; o++)
                      (i[o][o - 2] = 0), o > u + 2 && (i[o][o - 3] = 0);
                    for (
                      a = u;
                      a <= w - 1 &&
                      ((y = a !== w - 1),
                      a !== u &&
                        ((S = i[a][a - 1]),
                        (T = i[a + 1][a - 1]),
                        (A = y ? i[a + 2][a - 1] : 0),
                        0 !== (l = Math.abs(S) + Math.abs(T) + Math.abs(A)) &&
                          ((S /= l), (T /= l), (A /= l))),
                      0 !== l);
                      a++
                    )
                      if (
                        ((z = Math.sqrt(S * S + T * T + A * A)),
                        S < 0 && (z = -z),
                        0 !== z)
                      ) {
                        for (
                          a !== u
                            ? (i[a][a - 1] = -z * l)
                            : h !== u && (i[a][a - 1] = -i[a][a - 1]),
                            l = (S += z) / z,
                            d = T / z,
                            k = A / z,
                            T /= S,
                            A /= S,
                            s = a;
                          s < t;
                          s++
                        )
                          (S = i[a][s] + T * i[a + 1][s]),
                            y &&
                              ((S += A * i[a + 2][s]),
                              (i[a + 2][s] = i[a + 2][s] - S * k)),
                            (i[a][s] = i[a][s] - S * l),
                            (i[a + 1][s] = i[a + 1][s] - S * d);
                        for (o = 0; o <= Math.min(w, a + 3); o++)
                          (S = l * i[o][a] + d * i[o][a + 1]),
                            y &&
                              ((S += k * i[o][a + 2]),
                              (i[o][a + 2] = i[o][a + 2] - S * A)),
                            (i[o][a] = i[o][a] - S),
                            (i[o][a + 1] = i[o][a + 1] - S * T);
                        for (o = 0; o <= b; o++)
                          (S = l * n[o][a] + d * n[o][a + 1]),
                            y &&
                              ((S += k * n[o][a + 2]),
                              (n[o][a + 2] = n[o][a + 2] - S * A)),
                            (n[o][a] = n[o][a] - S),
                            (n[o][a + 1] = n[o][a + 1] - S * T);
                      }
                  }
                }
                if (0 === M) return;
                for (w = t - 1; w >= 0; w--)
                  if (((S = r[w]), 0 === (T = e[w])))
                    for (h = w, i[w][w] = 1, o = w - 1; o >= 0; o--) {
                      for (f = i[o][o] - S, A = 0, s = h; s <= w; s++)
                        A += i[o][s] * i[s][w];
                      if (e[o] < 0) (k = f), (z = A);
                      else if (
                        ((h = o),
                        0 === e[o]
                          ? (i[o][w] = 0 !== f ? -A / f : -A / (_ * M))
                          : ((l = i[o][o + 1]),
                            (d = i[o + 1][o]),
                            (T = (r[o] - S) * (r[o] - S) + e[o] * e[o]),
                            (c = (l * z - k * A) / T),
                            (i[o][w] = c),
                            (i[o + 1][w] =
                              Math.abs(l) > Math.abs(k)
                                ? (-A - f * c) / l
                                : (-z - d * c) / k)),
                        (c = Math.abs(i[o][w])),
                        _ * c * c > 1)
                      )
                        for (s = o; s <= w; s++) i[s][w] = i[s][w] / c;
                    }
                  else if (T < 0)
                    for (
                      h = w - 1,
                        Math.abs(i[w][w - 1]) > Math.abs(i[w - 1][w])
                          ? ((i[w - 1][w - 1] = T / i[w][w - 1]),
                            (i[w - 1][w] = -(i[w][w] - S) / i[w][w - 1]))
                          : ((x = ct(0, -i[w - 1][w], i[w - 1][w - 1] - S, T)),
                            (i[w - 1][w - 1] = x[0]),
                            (i[w - 1][w] = x[1])),
                        i[w][w - 1] = 0,
                        i[w][w] = 1,
                        o = w - 2;
                      o >= 0;
                      o--
                    ) {
                      for (v = 0, g = 0, s = h; s <= w; s++)
                        (v += i[o][s] * i[s][w - 1]), (g += i[o][s] * i[s][w]);
                      if (((f = i[o][o] - S), e[o] < 0))
                        (k = f), (A = v), (z = g);
                      else if (
                        ((h = o),
                        0 === e[o]
                          ? ((x = ct(-v, -g, f, T)),
                            (i[o][w - 1] = x[0]),
                            (i[o][w] = x[1]))
                          : ((l = i[o][o + 1]),
                            (d = i[o + 1][o]),
                            (m = (r[o] - S) * (r[o] - S) + e[o] * e[o] - T * T),
                            (p = 2 * (r[o] - S) * T),
                            0 === m &&
                              0 === p &&
                              (m =
                                _ *
                                M *
                                (Math.abs(f) +
                                  Math.abs(T) +
                                  Math.abs(l) +
                                  Math.abs(d) +
                                  Math.abs(k))),
                            (x = ct(
                              l * A - k * v + T * g,
                              l * z - k * g - T * v,
                              m,
                              p
                            )),
                            (i[o][w - 1] = x[0]),
                            (i[o][w] = x[1]),
                            Math.abs(l) > Math.abs(k) + Math.abs(T)
                              ? ((i[o + 1][w - 1] =
                                  (-v - f * i[o][w - 1] + T * i[o][w]) / l),
                                (i[o + 1][w] =
                                  (-g - f * i[o][w] - T * i[o][w - 1]) / l))
                              : ((x = ct(
                                  -A - d * i[o][w - 1],
                                  -z - d * i[o][w],
                                  k,
                                  T
                                )),
                                (i[o + 1][w - 1] = x[0]),
                                (i[o + 1][w] = x[1]))),
                        (c = Math.max(
                          Math.abs(i[o][w - 1]),
                          Math.abs(i[o][w])
                        )),
                        _ * c * c > 1)
                      )
                        for (s = o; s <= w; s++)
                          (i[s][w - 1] = i[s][w - 1] / c),
                            (i[s][w] = i[s][w] / c);
                    }
                for (o = 0; o < t; o++)
                  if (o < 0 || o > b) for (s = o; s < t; s++) n[o][s] = i[o][s];
                for (s = t - 1; s >= 0; s--)
                  for (o = 0; o <= b; o++) {
                    for (k = 0, a = 0; a <= Math.min(s, b); a++)
                      k += n[o][a] * i[a][s];
                    n[o][s] = k;
                  }
              })(o, h, a, s, c);
          }
          (this.n = o), (this.e = h), (this.d = a), (this.V = s);
        }
        get realEigenvalues() {
          return this.d;
        }
        get imaginaryEigenvalues() {
          return this.e;
        }
        get eigenvectorMatrix() {
          return at.isMatrix(this.V) || (this.V = new at(this.V)), this.V;
        }
        get diagonalMatrix() {
          var t,
            e,
            r = this.n,
            n = this.e,
            i = this.d,
            o = new at(r, r);
          for (t = 0; t < r; t++) {
            for (e = 0; e < r; e++) o[t][e] = 0;
            (o[t][t] = i[t]),
              n[t] > 0
                ? (o[t][t + 1] = n[t])
                : n[t] < 0 && (o[t][t - 1] = n[t]);
          }
          return o;
        }
      }
      function ct(t, e, r, n) {
        var i, o;
        return Math.abs(r) > Math.abs(n)
          ? [(t + (i = n / r) * e) / (o = r + i * n), (e - i * t) / o]
          : [((i = r / n) * t + e) / (o = n + i * r), (i * e - t) / o];
      }
      function ft(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var lt = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'apply',
              value: function() {
                for (
                  var t = w(this._nodes.length, this._nodes.length), e = 0;
                  e < this._edges.length;
                  ++e
                ) {
                  var r = this._edges[e].source.index,
                    n = this._edges[e].target.index;
                  (t[r][n] = -1), (t[n][r] = -1);
                }
                for (var i = 0; i < this._nodes.length; ++i)
                  t[i][i] = -t[i].reduce(function(t, e) {
                    return t + e;
                  }, 0);
                var o = new ut(t),
                  s = (function(t) {
                    var e = Math.min.apply(null, t),
                      r = t.indexOf(e);
                    t[r] = 1 / 0;
                    var n = Math.min.apply(null, t),
                      i = t.indexOf(n);
                    t[i] = 1 / 0;
                    var o = Math.min.apply(null, t);
                    return [i, t.indexOf(o)];
                  })(o.realEigenvalues),
                  a = o.eigenvectorMatrix.transpose(),
                  h = (function(t, e) {
                    for (
                      var r = Math.max.apply(null, t.map(Math.abs)),
                        n = Math.max.apply(null, e.map(Math.abs)),
                        i = Math.min.apply(null, t),
                        o = Math.min.apply(null, e),
                        s = 0;
                      s < t.length;
                      ++s
                    )
                      (t[s] = 0.1 + (t[s] - i) / (1.25 * (r - i))),
                        (e[s] = 0.1 + (e[s] - o) / (1.25 * (n - o)));
                    return [t, e];
                  })(a[s[0]], a[s[1]]);
                this._nodes.forEach(function(t, e) {
                  (t.x = h[0][e]), (t.y = h[1][e]);
                });
              },
            },
          ]) && ft(e.prototype, r),
          n && ft(e, n),
          t
        );
      })();
      function dt(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var vt = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r),
            (this._epsilon = 1e-8),
            (this._MAX_ITTERATIONS = 100),
            (this._num_elements = e.length),
            (this._dims = 2);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'apply',
              value: function() {
                for (
                  var t = w(this._nodes.length, this._nodes.length), e = 0;
                  e < this._edges.length;
                  ++e
                ) {
                  var r = this._edges[e].source.index,
                    n = this._edges[e].target.index;
                  t[r][n] = 1;
                }
                var i = (function(t) {
                    for (var e = yt(t.length), r = 0; r < t.length; r++) {
                      for (var n = 0, i = 0; i < t[r].length; i++) n += t[r][i];
                      e[r] = n + 1;
                    }
                    return e;
                  })(t),
                  o = this._dims + 1,
                  s = new Array(o);
                s[0] = mt(
                  (function(t) {
                    for (var e = new Array(t), r = 0; r < t; r++) e[r] = 1;
                    return e;
                  })(this._num_elements)
                );
                for (var a = 1; a < o; a++) s[a] = yt(this._num_elements);
                for (var h = 1; h < o; h++) {
                  for (
                    var u = mt(pt(this._num_elements)), c = 0, f = !1;
                    !f;

                  ) {
                    for (var l = u.slice(), d = 0; d < h; d++) {
                      for (var v = s[d], g = 0, m = 0, p = 0; p < l.length; p++)
                        (g += l[p] * i[p] * v[p]), (m += v[p] * i[p] * v[p]);
                      for (var y = g / m, x = 0; x < l.length; x++)
                        l[x] = l[x] - y * v[x];
                    }
                    for (var b = 0; b < u.length; b++)
                      u[b] = 0.5 * (l[b] + gt(t[b], l) / i[b]);
                    f =
                      ((c += 1) > 100) |
                      !(gt((u = mt(u)), l) < 1 - this._epsilon);
                  }
                  s[h] = u.slice();
                }
                var _ = xt(s[1]),
                  E = xt(s[2]);
                this._nodes.forEach(function(t, e) {
                  (t.x = _[e]), (t.y = E[e]);
                });
              },
            },
          ]) && dt(e.prototype, r),
          n && dt(e, n),
          t
        );
      })();
      function gt(t, e) {
        for (var r = 0, n = 0; n < t.length; n++) r += t[n] * e[n];
        return r;
      }
      function mt(t) {
        for (
          var e = (function(t) {
              for (var e = 0, r = 0; r < t.length; r++) e += Math.pow(t[r], 2);
              return Math.sqrt(e);
            })(t),
            r = new Array(t.length),
            n = 0;
          n < t.length;
          n++
        )
          r[n] = t[n] / e;
        return r;
      }
      function pt(t) {
        for (var e = new Array(t), r = 0; r < t; r++) e[r] = Math.random();
        return e;
      }
      function yt(t) {
        for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
        return e;
      }
      function xt(t) {
        for (
          var e = Math.max.apply(null, t.map(Math.abs)),
            r = Math.min.apply(null, t),
            n = 0;
          n < t.length;
          ++n
        )
          t[n] = 0.1 + (t[n] - r) / (1.25 * (e - r));
        return t;
      }
      function wt(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var bt = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r),
            (this._margin = 0.05),
            (this._radius = 0.05),
            (this._nlines = 5);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'apply',
              value: function() {
                for (
                  var t = b(this._nodes, this._edges),
                    e = this._nodes.length / this._nlines,
                    r = (0.5 - (this._margin + this._radius)) / e,
                    n = (2 * Math.PI) / this._nlines,
                    i = 0,
                    o = 0;
                  o < this._nodes.length;
                  ++o
                ) {
                  var s = t.nodes[o].index;
                  (this._nodes[s].x =
                    0.5 +
                    (this._radius + r * (o - i * e)) *
                      Math.cos(n * i + Math.PI / 2)),
                    (this._nodes[s].y =
                      0.5 +
                      (this._radius + r * (o - i * e)) *
                        Math.sin(n * i + Math.PI / 2)),
                    (i = Math.floor(o / e));
                }
              },
            },
          ]) && wt(e.prototype, r),
          n && wt(e, n),
          t
        );
      })();
      function _t(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var Et = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r),
            (this._margin = 0.05);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'apply',
              value: function() {
                var t = b(this._nodes, this._edges),
                  e = Math.sqrt(this._nodes.length);
                if (e - Math.floor(e) > 0) var r = Math.floor(e) + 1;
                else r = e;
                var n = (1 - 2 * this._margin) / r,
                  i = this._nodes.length / r;
                if (i - Math.floor(i) > 0) var o = Math.floor(i) + 1;
                else o = i;
                for (
                  var s = (1 - 2 * this._margin) / (o - 2), a = 0;
                  a < this._nodes.length;
                  ++a
                ) {
                  var h = Math.floor(a / (r + 1));
                  (this._nodes[t.nodes[a].index].x =
                    this._margin + n * (a - h * (r + 1))),
                    (this._nodes[t.nodes[a].index].y = this._margin + s * h),
                    (this._nodes[t.nodes[a].index].weight = t.degrees[a]);
                }
              },
            },
          ]) && _t(e.prototype, r),
          n && _t(e, n),
          t
        );
      })();
      function Mt(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var St = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._nodes = e),
            (this._edges = r),
            (this._margin = 0.05),
            (this._hubs = 0.1),
            (this._intermediary = 0.2);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'apply',
              value: function() {
                for (
                  var t = b(this._nodes, this._edges),
                    e = Math.floor(
                      this._nodes.length * (this._hubs + this._intermediary)
                    ),
                    r = Math.floor(this._nodes.length * this._hubs),
                    n = (1 - 2 * this._margin) / 2 / (r - 1),
                    i = Math.PI / (r - 1),
                    o = 0;
                  o < r;

                )
                  (this._nodes[t.nodes[o].index].x = this._margin + n * o),
                    (this._nodes[t.nodes[o].index].y =
                      this._margin + 0.4 + 0.4 * Math.sin(o * i)),
                    ++o;
                var s = e - r,
                  a = Math.PI / s,
                  h = (1 - 2 * this._margin) / 2 / s;
                for (o = 0; o < s; )
                  (this._nodes[t.nodes[o + r].index].x = 0.5 + h * (o + 1)),
                    (this._nodes[t.nodes[o + r].index].y =
                      this._margin +
                      0.4 +
                      0.4 * Math.sin(Math.PI + (o + 1) * a)),
                    ++o;
                var u = [0.85, 0.75],
                  c = [0.4, 1 - this._margin],
                  f = this._nodes.length - e,
                  l = (c[0] - u[0]) / (f - 1),
                  d = (c[1] - u[1]) / (f - 1);
                for (o = 0; o < f; )
                  (this._nodes[t.nodes[o + e].index].x = u[0] + l * o),
                    (this._nodes[t.nodes[o + e].index].y = u[1] + d * o),
                    ++o;
              },
            },
          ]) && Mt(e.prototype, r),
          n && Mt(e, n),
          t
        );
      })();
      function Tt(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var At = (function() {
        function t() {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
        }
        var e, r, n;
        return (
          (e = t),
          (n = [
            {
              key: 'normalize',
              value: function(t, e) {
                var r,
                  n,
                  i = t.length;
                if (e) (r = e.minX), (n = e.minY);
                else {
                  var o = -1 / 0,
                    s = -1 / 0;
                  r = n = 1 / 0;
                  for (var a = 0; a < i; a++) {
                    var h = t[a];
                    (o = Math.max(o, h.x)),
                      (s = Math.max(s, h.y)),
                      (r = Math.min(r, h.x)),
                      (n = Math.min(n, h.y));
                  }
                  e = { maxX: o, maxY: s, minX: r, minY: n };
                }
                for (
                  var u = r !== e.maxX ? 1 / (e.maxX - r) : ((r -= 0.5), 1),
                    c = n !== e.maxY ? 1 / (e.maxY - n) : ((n -= 0.5), 1),
                    f = 0;
                  f < i;
                  f++
                ) {
                  var l = t[f];
                  (l.x = u * (l.x - r)), (l.y = c * (l.y - n));
                }
                return e;
              },
            },
            {
              key: 'force',
              get: function() {
                return m;
              },
            },
            {
              key: 'random',
              get: function() {
                return y;
              },
            },
            {
              key: 'circular',
              get: function() {
                return S;
              },
            },
            {
              key: 'tree',
              get: function() {
                return A;
              },
            },
            {
              key: 'tree2',
              get: function() {
                return k;
              },
            },
            {
              key: 'hierarchical',
              get: function() {
                return C;
              },
            },
            {
              key: 'spectral',
              get: function() {
                return lt;
              },
            },
            {
              key: 'spectral2',
              get: function() {
                return vt;
              },
            },
            {
              key: 'hive',
              get: function() {
                return bt;
              },
            },
            {
              key: 'grid',
              get: function() {
                return Et;
              },
            },
            {
              key: 'versinus',
              get: function() {
                return St;
              },
            },
          ]),
          (r = null) && Tt(e.prototype, r),
          n && Tt(e, n),
          t
        );
      })();
      function zt(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var kt = (function() {
        function t() {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
        }
        var e, r, n;
        return (
          (e = t),
          (n = [
            {
              key: 'edgeSource',
              value: function(t) {
                if (t.source.source) {
                  var e = this.edgeSource(t.source),
                    r = this.edgeTarget(t.source);
                  return {
                    x: (e.x + r.x) / 2,
                    y: (e.y + r.y) / 2,
                    uniqid: t.uniqid,
                    index: t.index,
                    is_edge: !0,
                    e: t.source,
                  };
                }
                return t.source;
              },
            },
            {
              key: 'edgeTarget',
              value: function(t) {
                if (t.target.source) {
                  var e = this.edgeSource(t.target),
                    r = this.edgeTarget(t.target);
                  return {
                    x: (e.x + r.x) / 2,
                    y: (e.y + r.y) / 2,
                    uniqid: t.uniqid,
                    index: t.index,
                    is_edge: !0,
                    e: t.target,
                  };
                }
                return t.target;
              },
            },
            {
              key: 'getCurveShift',
              value: function(t, e) {
                if ((((e = e || {}).x = e.y = e.cx = e.cy = 0), !t)) return e;
                if (t.t && t.t >= 1)
                  if (t.t >= 2) {
                    var r = this.edgeSource(t).y < 0.5 ? 1 : -1;
                    (e.cx = 1.25 * r), (e.cy = 0);
                  } else {
                    var n = this.edgeSource(t),
                      i = this.edgeTarget(t);
                    (e.x = n.x - i.x), (e.y = n.y - i.y);
                  }
                return e;
              },
            },
          ]),
          (r = null) && zt(e.prototype, r),
          n && zt(e, n),
          t
        );
      })();
      function Rt(t, e) {
        if (!(this instanceof Rt)) return new Rt(t, e);
        (this._maxEntries = Math.max(4, t || 9)),
          (this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries))),
          e && this._initFormat(e),
          this.clear();
      }
      function Ct(t, e) {
        t.bbox = Pt(t, 0, t.children.length, e);
      }
      function Pt(t, e, r, n) {
        for (var i, o = It(), s = e; s < r; s++)
          (i = t.children[s]), Nt(o, t.leaf ? n(i) : i.bbox);
        return o;
      }
      function It() {
        return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
      }
      function Nt(t, e) {
        return (
          (t[0] = Math.min(t[0], e[0])),
          (t[1] = Math.min(t[1], e[1])),
          (t[2] = Math.max(t[2], e[2])),
          (t[3] = Math.max(t[3], e[3])),
          t
        );
      }
      function Ft(t, e) {
        return t.bbox[0] - e.bbox[0];
      }
      function Lt(t, e) {
        return t.bbox[1] - e.bbox[1];
      }
      function qt(t) {
        return (t[2] - t[0]) * (t[3] - t[1]);
      }
      function Bt(t) {
        return t[2] - t[0] + (t[3] - t[1]);
      }
      function Dt(t, e) {
        return t[0] <= e[0] && t[1] <= e[1] && e[2] <= t[2] && e[3] <= t[3];
      }
      function Ot(t, e) {
        return e[0] <= t[2] && e[1] <= t[3] && e[2] >= t[0] && e[3] >= t[1];
      }
      function Ut(t, e, r, n, i) {
        for (var o, s = [e, r]; s.length; )
          (r = s.pop()) - (e = s.pop()) <= n ||
            (Vt(t, e, r, (o = e + Math.ceil((r - e) / n / 2) * n), i),
            s.push(e, o, o, r));
      }
      function Vt(t, e, r, n, i) {
        for (var o, s, a, h, u, c, f; r > e; ) {
          for (
            r - e > 600 &&
              ((o = r - e + 1),
              (s = n - e + 1),
              (a = Math.log(o)),
              (h = 0.5 * Math.exp((2 * a) / 3)),
              (u =
                0.5 *
                Math.sqrt((a * h * (o - h)) / o) *
                (s - o / 2 < 0 ? -1 : 1)),
              Vt(
                t,
                Math.max(e, Math.floor(n - (s * h) / o + u)),
                Math.min(r, Math.floor(n + ((o - s) * h) / o + u)),
                n,
                i
              )),
              c = t[n],
              s = e,
              f = r,
              jt(t, e, n),
              i(t[r], c) > 0 && jt(t, e, r);
            s < f;

          ) {
            for (jt(t, s, f), s++, f--; i(t[s], c) < 0; ) s++;
            for (; i(t[f], c) > 0; ) f--;
          }
          0 === i(t[e], c) ? jt(t, e, f) : jt(t, ++f, r),
            f <= n && (e = f + 1),
            n <= f && (r = f - 1);
        }
      }
      function jt(t, e, r) {
        var n = t[e];
        (t[e] = t[r]), (t[r] = n);
      }
      Rt.prototype = {
        all: function() {
          return this._all(this.data, []);
        },
        search: function(t) {
          var e = this.data,
            r = [],
            n = this.toBBox;
          if (!Ot(t, e.bbox)) return r;
          for (var i, o, s, a, h = []; e; ) {
            for (i = 0, o = e.children.length; i < o; i++)
              (s = e.children[i]),
                Ot(t, (a = e.leaf ? n(s) : s.bbox)) &&
                  (e.leaf ? r.push(s) : Dt(t, a) ? this._all(s, r) : h.push(s));
            e = h.pop();
          }
          return r;
        },
        collides: function(t) {
          var e = this.data,
            r = this.toBBox;
          if (!Ot(t, e.bbox)) return !1;
          for (var n, i, o, s, a = []; e; ) {
            for (n = 0, i = e.children.length; n < i; n++)
              if (((o = e.children[n]), Ot(t, (s = e.leaf ? r(o) : o.bbox)))) {
                if (e.leaf || Dt(t, s)) return !0;
                a.push(o);
              }
            e = a.pop();
          }
          return !1;
        },
        load: function(t) {
          if (!t || !t.length) return this;
          if (t.length < this._minEntries) {
            for (var e = 0, r = t.length; e < r; e++) this.insert(t[e]);
            return this;
          }
          var n = this._build(t.slice(), 0, t.length - 1, 0);
          if (this.data.children.length)
            if (this.data.height === n.height) this._splitRoot(this.data, n);
            else {
              if (this.data.height < n.height) {
                var i = this.data;
                (this.data = n), (n = i);
              }
              this._insert(n, this.data.height - n.height - 1, !0);
            }
          else this.data = n;
          return this;
        },
        insert: function(t) {
          return t && this._insert(t, this.data.height - 1), this;
        },
        clear: function() {
          return (
            (this.data = { children: [], height: 1, bbox: It(), leaf: !0 }),
            this
          );
        },
        remove: function(t) {
          if (!t) return this;
          for (
            var e, r, n, i, o = this.data, s = this.toBBox(t), a = [], h = [];
            o || a.length;

          ) {
            if (
              (o ||
                ((o = a.pop()), (r = a[a.length - 1]), (e = h.pop()), (i = !0)),
              o.leaf && -1 !== (n = o.children.indexOf(t)))
            )
              return (
                o.children.splice(n, 1), a.push(o), this._condense(a), this
              );
            i || o.leaf || !Dt(o.bbox, s)
              ? r
                ? (e++, (o = r.children[e]), (i = !1))
                : (o = null)
              : (a.push(o), h.push(e), (e = 0), (r = o), (o = o.children[0]));
          }
          return this;
        },
        toBBox: function(t) {
          return t;
        },
        compareMinX: function(t, e) {
          return t[0] - e[0];
        },
        compareMinY: function(t, e) {
          return t[1] - e[1];
        },
        toJSON: function() {
          return this.data;
        },
        fromJSON: function(t) {
          return (this.data = t), this;
        },
        _all: function(t, e) {
          for (var r = []; t; )
            t.leaf ? e.push.apply(e, t.children) : r.push.apply(r, t.children),
              (t = r.pop());
          return e;
        },
        _build: function(t, e, r, n) {
          var i,
            o = r - e + 1,
            s = this._maxEntries;
          if (o <= s)
            return (
              Ct(
                (i = {
                  children: t.slice(e, r + 1),
                  height: 1,
                  bbox: null,
                  leaf: !0,
                }),
                this.toBBox
              ),
              i
            );
          n ||
            ((n = Math.ceil(Math.log(o) / Math.log(s))),
            (s = Math.ceil(o / Math.pow(s, n - 1)))),
            (i = { children: [], height: n, bbox: null, leaf: !1 });
          var a,
            h,
            u,
            c,
            f = Math.ceil(o / s),
            l = f * Math.ceil(Math.sqrt(s));
          for (Ut(t, e, r, l, this.compareMinX), a = e; a <= r; a += l)
            for (
              Ut(t, a, (u = Math.min(a + l - 1, r)), f, this.compareMinY),
                h = a;
              h <= u;
              h += f
            )
              (c = Math.min(h + f - 1, u)),
                i.children.push(this._build(t, h, c, n - 1));
          return Ct(i, this.toBBox), i;
        },
        _chooseSubtree: function(t, e, r, n) {
          for (
            var i, o, s, a, h, u, c, f, l, d;
            n.push(e), !e.leaf && n.length - 1 !== r;

          ) {
            for (c = f = 1 / 0, i = 0, o = e.children.length; i < o; i++)
              (h = qt((s = e.children[i]).bbox)),
                (l = t),
                (d = s.bbox),
                (u =
                  (Math.max(d[2], l[2]) - Math.min(d[0], l[0])) *
                    (Math.max(d[3], l[3]) - Math.min(d[1], l[1])) -
                  h) < f
                  ? ((f = u), (c = h < c ? h : c), (a = s))
                  : u === f && h < c && ((c = h), (a = s));
            e = a || e.children[0];
          }
          return e;
        },
        _insert: function(t, e, r) {
          var n = this.toBBox,
            i = r ? t.bbox : n(t),
            o = [],
            s = this._chooseSubtree(i, this.data, e, o);
          for (
            s.children.push(t), Nt(s.bbox, i);
            e >= 0 && o[e].children.length > this._maxEntries;

          )
            this._split(o, e), e--;
          this._adjustParentBBoxes(i, o, e);
        },
        _split: function(t, e) {
          var r = t[e],
            n = r.children.length,
            i = this._minEntries;
          this._chooseSplitAxis(r, i, n);
          var o = this._chooseSplitIndex(r, i, n),
            s = {
              children: r.children.splice(o, r.children.length - o),
              height: r.height,
              bbox: null,
              leaf: !1,
            };
          r.leaf && (s.leaf = !0),
            Ct(r, this.toBBox),
            Ct(s, this.toBBox),
            e ? t[e - 1].children.push(s) : this._splitRoot(r, s);
        },
        _splitRoot: function(t, e) {
          (this.data = {
            children: [t, e],
            height: t.height + 1,
            bbox: null,
            leaf: !1,
          }),
            Ct(this.data, this.toBBox);
        },
        _chooseSplitIndex: function(t, e, r) {
          var n, i, o, s, a, h, u, c, f, l, d, v, g, m;
          for (h = u = 1 / 0, n = e; n <= r - e; n++)
            (i = Pt(t, 0, n, this.toBBox)),
              (o = Pt(t, n, r, this.toBBox)),
              (f = i),
              (l = o),
              (d = void 0),
              (v = void 0),
              (g = void 0),
              (m = void 0),
              (d = Math.max(f[0], l[0])),
              (v = Math.max(f[1], l[1])),
              (g = Math.min(f[2], l[2])),
              (m = Math.min(f[3], l[3])),
              (s = Math.max(0, g - d) * Math.max(0, m - v)),
              (a = qt(i) + qt(o)),
              s < h
                ? ((h = s), (c = n), (u = a < u ? a : u))
                : s === h && a < u && ((u = a), (c = n));
          return c;
        },
        _chooseSplitAxis: function(t, e, r) {
          var n = t.leaf ? this.compareMinX : Ft,
            i = t.leaf ? this.compareMinY : Lt;
          this._allDistMargin(t, e, r, n) < this._allDistMargin(t, e, r, i) &&
            t.children.sort(n);
        },
        _allDistMargin: function(t, e, r, n) {
          t.children.sort(n);
          var i,
            o,
            s = this.toBBox,
            a = Pt(t, 0, e, s),
            h = Pt(t, r - e, r, s),
            u = Bt(a) + Bt(h);
          for (i = e; i < r - e; i++)
            (o = t.children[i]), Nt(a, t.leaf ? s(o) : o.bbox), (u += Bt(a));
          for (i = r - e - 1; i >= e; i--)
            (o = t.children[i]), Nt(h, t.leaf ? s(o) : o.bbox), (u += Bt(h));
          return u;
        },
        _adjustParentBBoxes: function(t, e, r) {
          for (var n = r; n >= 0; n--) Nt(e[n].bbox, t);
        },
        _condense: function(t) {
          for (var e, r = t.length - 1; r >= 0; r--)
            0 === t[r].children.length
              ? r > 0
                ? (e = t[r - 1].children).splice(e.indexOf(t[r]), 1)
                : this.clear()
              : Ct(t[r], this.toBBox);
        },
        _initFormat: function(t) {
          var e = ['return a', ' - b', ';'];
          (this.compareMinX = new Function('a', 'b', e.join(t[0]))),
            (this.compareMinY = new Function('a', 'b', e.join(t[1]))),
            (this.toBBox = new Function(
              'a',
              'return [a' + t.join(', a') + '];'
            ));
        },
      };
      var Xt = Rt,
        Yt = Number.EPSILON || 1e-14;
      function Gt(t) {
        var e = Math.pow(Math.abs(t), 1 / 3);
        return t < 0 ? -e : e;
      }
      function $t(t, e, r, n, i, o, s, a) {
        for (
          var h = (function(t, e, r, n) {
              if (Math.abs(t) < 1e-8) {
                if (((t = e), (e = r), (r = n), Math.abs(t) < 1e-8))
                  return (t = e), (e = r), Math.abs(t) < 1e-8 ? [] : [-e / t];
                var i = e * e - 4 * t * r;
                return Math.abs(i) < 1e-8
                  ? [-e / (2 * t)]
                  : i > 0
                  ? [
                      (-e + Math.sqrt(i)) / (2 * t),
                      (-e - Math.sqrt(i)) / (2 * t),
                    ]
                  : [];
              }
              var o,
                s = (3 * t * r - e * e) / (3 * t * t),
                a =
                  (2 * e * e * e - 9 * t * e * r + 27 * t * t * n) /
                  (27 * t * t * t);
              if (Math.abs(s) < 1e-8) o = [Gt(-a)];
              else if (Math.abs(a) < 1e-8)
                o = [0].concat(s < 0 ? [Math.sqrt(-s), -Math.sqrt(-s)] : []);
              else {
                var h = (a * a) / 4 + (s * s * s) / 27;
                if (Math.abs(h) < 1e-8) o = [(-1.5 * a) / s, (3 * a) / s];
                else if (h > 0) {
                  var u = Gt(-a / 2 - Math.sqrt(h));
                  o = [u - s / (3 * u)];
                } else {
                  var c = 2 * Math.sqrt(-s / 3),
                    f = Math.acos((3 * a) / s / c) / 3,
                    l = (2 * Math.PI) / 3;
                  o = [
                    c * Math.cos(f),
                    c * Math.cos(f - l),
                    c * Math.cos(f - 2 * l),
                  ];
                }
              }
              for (var d = 0; d < o.length; d++) o[d] -= e / (3 * t);
              return o;
            })(
              4 * r * r -
                16 * r * i +
                8 * r * s +
                16 * i * i -
                16 * i * s +
                4 * s * s +
                4 * n * n -
                16 * n * o +
                8 * n * a +
                16 * o * o -
                16 * o * a +
                4 * a * a,
              -12 * r * r +
                36 * r * i -
                12 * r * s -
                24 * i * i +
                12 * i * s -
                12 * n * n +
                36 * n * o -
                12 * n * a -
                24 * o * o +
                12 * o * a,
              12 * r * r -
                24 * r * i +
                4 * r * s -
                4 * r * t +
                8 * i * i +
                8 * i * t -
                4 * s * t +
                12 * n * n -
                24 * n * o +
                4 * n * a -
                4 * n * e +
                8 * o * o +
                8 * o * e -
                4 * a * e,
              -4 * r * r +
                4 * r * i +
                4 * r * t -
                4 * i * t -
                4 * n * n +
                4 * n * o +
                4 * n * e -
                4 * o * e
            ),
            u = 1 / 0,
            c = 0;
          c < h.length;
          c++
        ) {
          var f = h[c];
          if (!(f < 0 || f > 1)) {
            var l = Ht(
              t,
              e,
              r * (1 - f) * (1 - f) + 2 * i * f * (1 - f) + s * f * f,
              n * (1 - f) * (1 - f) + 2 * o * f * (1 - f) + a * f * f
            );
            l < u && (u = l);
          }
        }
        return u;
      }
      function Wt(t) {
        for (
          var e = 1 / 0, r = -e, n = 1 / 0, i = -n, o = 0;
          o < t.length;
          o += 2
        ) {
          var s = t[o];
          s < e && (e = s), s > r && (r = s);
        }
        for (var a = 1; a < t.length; a += 2) {
          var h = t[a];
          h < n && (n = h), h > i && (i = h);
        }
        return [e, n, r, i];
      }
      function Ht(t, e, r, n) {
        var i = t - r,
          o = e - n;
        return i * i + o * o;
      }
      function Zt(t, e, r, n, i, o) {
        var s,
          a,
          h = i - r,
          u = o - n,
          c = h * h + u * u,
          f = -1;
        return (
          0 != c && (f = ((t - r) * h + (e - n) * u) / c),
          f < 0
            ? ((s = r), (a = n))
            : f > 1
            ? ((s = i), (a = o))
            : ((s = r + f * h), (a = n + f * u)),
          Ht(t, e, s, a)
        );
      }
      function Kt(t, e, r, n, i, o, s, a) {
        var h = (e - o) * (s - i) - (t - i) * (a - o),
          u = (r - t) * (a - o) - (n - e) * (s - i);
        if (0 == u) return !1;
        var c = h / u,
          f = (h = (e - o) * (r - t) - (t - i) * (n - e)) / u;
        return !(c < 0 || c > 1 || f < 0 || f > 1);
      }
      function Jt(t, e, r, n, i, o) {
        return t >= r - Yt && t <= i + Yt && e >= n - Yt && e <= o + Yt;
      }
      function Qt(t, e) {
        return t >= e - Yt && t <= e + Yt;
      }
      function te(t, e) {
        return !Qt(t, e);
      }
      function ee(t, e, r, n, i, o, s, a, h, u, c) {
        if (s < 0 || s > 1) return !1;
        if (te(c - h, 0)) {
          var f =
            (e * (1 - s) * (1 - s) + 2 * n * s * (1 - s) + o * s * s) / (c - h);
          if (f < 0 || f > 1) return !1;
        }
        return !0;
      }
      function re(t, e, r, n, i, o, s, a, h, u) {
        var c,
          f =
            -t * a +
            t * u +
            2 * r * a -
            2 * r * u -
            i * a +
            i * u +
            e * s -
            e * h -
            2 * n * s +
            2 * n * h +
            o * s -
            o * h;
        if (te(f, 0) && te(s - h, 0)) {
          var l =
              2 * t * a -
              2 * t * u -
              2 * r * a +
              2 * r * u -
              2 * e * h +
              2 * n * s -
              2 * n * h,
            d =
              l * l -
              4 *
                (-t * a + t * u + e * s - e * h - s * u + h * a) *
                (-t * a +
                  t * u +
                  2 * r * a -
                  2 * r * u -
                  i * a +
                  i * u +
                  e * s -
                  e * h -
                  2 * n * s +
                  2 * n * h +
                  o * s -
                  o * h);
          if (d >= 0) {
            var v =
              t * a - t * u - r * a + r * u - e * s + e * h + n * s - n * h;
            if (
              ee(
                0,
                e,
                0,
                n,
                0,
                o,
                s,
                0,
                h,
                0,
                (c = (v - 0.5 * Math.sqrt(d)) / f)
              )
            )
              return !0;
            if (
              ee(
                0,
                e,
                0,
                n,
                0,
                o,
                s,
                0,
                h,
                0,
                (c = (v + 0.5 * Math.sqrt(d)) / f)
              )
            )
              return !0;
          }
        }
        if (
          ((f = -r * a + r * u + i * a - i * u + n * s - n * h - o * s + o * h),
          Qt(e, 2 * n - o) &&
            Qt(t, 2 * r - i) &&
            te(f, 0) &&
            te(s * a - s * u - h * a + h * u, 0) &&
            ((c =
              -2 * r * a +
              2 * r * u +
              i * a -
              i * u +
              2 * n * s -
              2 * n * h -
              o * s +
              o * h -
              s * u +
              h * a),
            ee(0, e, 0, n, 0, o, s, 0, h, 0, (c /= 2 * f))))
        )
          return !0;
        if (
          Qt(a, u) &&
          Qt(e, 2 * n - o) &&
          te(n - o, 0) &&
          te(s - h, 0) &&
          ee(
            0,
            e,
            0,
            n,
            0,
            o,
            s,
            0,
            h,
            0,
            (c = (2 * n - o - u) / (2 * (n - o)))
          )
        )
          return !0;
        var g =
          r * e * a -
          r * e * u -
          2 * r * n * a +
          2 * r * n * u +
          r * o * a -
          r * o * u -
          i * e * a +
          i * e * u +
          2 * i * n * a -
          2 * i * n * u -
          i * o * a +
          i * o * u -
          e * n * s +
          e * n * h +
          e * o * s -
          e * o * h +
          2 * n * n * s -
          2 * n * n * h -
          3 * n * o * s +
          3 * n * o * h +
          o * o * s -
          o * o * h;
        return !!(
          Qt(
            t,
            (2 * r * a -
              2 * r * u -
              i * a +
              i * u +
              e * s -
              e * h -
              2 * n * s +
              2 * n * h +
              o * s -
              o * h) /
              (a - u)
          ) &&
          te(g, 0) &&
          te(s - h, 0) &&
          ee(
            0,
            e,
            0,
            n,
            0,
            o,
            s,
            0,
            h,
            0,
            (c =
              (2 * r * a -
                2 * r * u -
                i * a +
                i * u -
                2 * n * s +
                2 * n * h +
                o * s -
                o * h +
                s * u -
                h * a) /
              (2 *
                (r * a -
                  r * u -
                  i * a +
                  i * u -
                  n * s +
                  n * h +
                  o * s -
                  o * h)))
          )
        );
      }
      function ne(t, e, r, n, i, o, s, a, h, u) {
        if (Jt(t, e, s, a, h, u) || Jt(i, o, s, a, h, u)) return !0;
        var c = s - h,
          f = a - u,
          l = c * c + f * f,
          d = $t((s + h) / 2, (a + u) / 2, t, e, r, n, i, o);
        return (
          !(4 * d > l) &&
          (4 * d <= Math.min(c * c, f * f) ||
            (re(t, e, r, n, i, o, a, h, a, a) ||
              re(t, e, r, n, i, o, h, a, h, u) ||
              re(t, e, r, n, i, o, h, u, s, u) ||
              re(t, e, r, n, i, o, s, u, s, a)))
        );
      }
      function ie(t, e) {
        if (!(t instanceof e))
          throw new TypeError('Cannot call a class as a function');
      }
      function oe(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function se(t, e, r) {
        return e && oe(t.prototype, e), r && oe(t, r), t;
      }
      var ae = {};
      function he(t, e, r, n) {
        var i, o, s, a;
        kt.getCurveShift(r, n), (i = -n.y), (o = n.x * t.aspect2);
        var h = i * t.width * i * t.width + o * t.height * o * t.height;
        if (Qt(h, 0)) (i = 0), (o = 0);
        else {
          var u = Math.sqrt(h);
          (i *= (0.25 * t.curveExc * e) / u),
            (o *= (0.25 * t.curveExc * e) / u);
        }
        var c = (2.5 * t.nodeSize * e) / t.width,
          f = (2.5 * t.nodeSize * e) / t.height;
        (s = 0.5 * -n.cy * c),
          (a = 0.5 * n.cx * f),
          (n.x = i + s),
          (n.y = o + a);
      }
      var ue = (function() {
          function t(e) {
            ie(this, t), (this.e = e);
          }
          return (
            se(t, [
              {
                key: 'getBBox',
                value: function() {
                  return [
                    this.e.x - Yt,
                    this.e.y - Yt,
                    this.e.x + Yt,
                    this.e.y + Yt,
                  ];
                },
              },
              {
                key: 'intersectsRect',
                value: function(t, e, r, n) {
                  return Jt(this.e.x, this.e.y, t, e, r, n);
                },
              },
              {
                key: 'dist2',
                value: function(t, e, r) {
                  return Ht(t, e, this.e.x, this.e.y);
                },
              },
              {
                key: 'isNode',
                get: function() {
                  return !0;
                },
              },
            ]),
            t
          );
        })(),
        ce = (function() {
          function t(e, r, n, i, o, s) {
            ie(this, t),
              (this.e = e),
              (this.pos = r),
              (this.style = n),
              (this.fontSize = i),
              (this.isSDF = o),
              (this.getLabelSize = s);
          }
          return (
            se(t, [
              {
                key: 'getTextPos',
                value: function(t, e) {
                  var r,
                    n,
                    i,
                    o,
                    s = this.e.x,
                    a = this.e.y;
                  (r = i = s), (n = o = a);
                  var h = this.isSDF
                      ? this.getLabelSize(t, this.style.label || {})
                      : this.fontSize,
                    u = h / this.fontSize;
                  0 === h && (u = 0);
                  var c = 0.5 * t.nodeSize,
                    f = [10, 10, -10, -10];
                  return (
                    this.pos.forEach(function(h) {
                      var l =
                        (2 *
                          (function(t, e) {
                            return e < t ? 0 : 1;
                          })(a, 0.5) -
                          1) *
                        c;
                      (r = s + (e * (h.dx * u)) / t.width / 2),
                        (n = a + (e * (h.dy * u + l)) / t.height / 2),
                        (i = s + (e * ((h.dx + h.width) * u)) / t.width / 2),
                        (o =
                          a + (e * ((h.dy + h.height) * u + l)) / t.height / 2),
                        (f[0] = Math.min(r, f[0])),
                        (f[1] = Math.min(n, f[1])),
                        (f[2] = Math.max(i, f[2])),
                        (f[3] = Math.max(o, f[3]));
                    }),
                    f
                  );
                },
              },
              {
                key: 'getBBox',
                value: function(t) {
                  var e = this.getTextPos(t, 1);
                  return (
                    (e[0] = Math.min(e[0], this.e.x)),
                    (e[1] = Math.min(e[1], this.e.y)),
                    (e[2] = Math.max(e[2], this.e.x)),
                    (e[3] = Math.max(e[3], this.e.y)),
                    e
                  );
                },
              },
              {
                key: 'intersectsRect',
                value: function(t, e, r, n, i, o) {
                  var s,
                    a,
                    h,
                    u,
                    c,
                    f,
                    l,
                    d,
                    v = this.getTextPos(i, o);
                  return (
                    (s = t),
                    (a = e),
                    (h = r),
                    (u = n),
                    (c = v[0]),
                    (f = v[1]),
                    (l = v[2]),
                    (d = v[3]),
                    s <= l && a <= d && h >= c && u >= f
                  );
                },
              },
              {
                key: 'dist2',
                value: function(t, e, r, n) {
                  var i = this.getTextPos(r, n);
                  return Jt(t, e, i[0], i[1], i[2], i[3])
                    ? 0
                    : Math.min(
                        Ht(i[0], i[1]),
                        Ht(i[2], i[3]),
                        Ht(i[0], i[3]),
                        Ht(i[2], i[1]),
                        Zt(t, e, i[0], i[1], i[2], i[1]),
                        Zt(t, e, i[0], i[3], i[2], i[3]),
                        Zt(t, e, i[0], i[1], i[0], i[3]),
                        Zt(t, e, i[2], i[1], i[2], i[3])
                      );
                },
              },
              {
                key: 'isLabel',
                get: function() {
                  return !0;
                },
              },
            ]),
            t
          );
        })(),
        fe = (function() {
          function t(e) {
            ie(this, t), (this.e = e);
          }
          return (
            se(t, [
              {
                key: 'getPoints',
                value: function(t, e) {
                  var r,
                    n,
                    i,
                    o,
                    s = kt.edgeSource(this.e),
                    a = kt.edgeTarget(this.e);
                  return (
                    (r = s.x),
                    (n = s.y),
                    (i = a.x),
                    (o = a.y),
                    he(t, e, s.e, ae),
                    (r += ae.x),
                    (n += ae.y),
                    he(t, e, a.e, ae),
                    [r, n, (i += ae.x), (o += ae.y)]
                  );
                },
              },
              {
                key: 'getBBox',
                value: function(t, e) {
                  var r = this.getPoints(t, e);
                  return [
                    Math.min(r[0], r[2]),
                    Math.min(r[1], r[3]),
                    Math.max(r[0], r[2]),
                    Math.max(r[1], r[3]),
                  ];
                },
              },
              {
                key: 'intersectsRect',
                value: function(t, e, r, n, i, o) {
                  var s,
                    a,
                    h,
                    u,
                    c,
                    f,
                    l,
                    d,
                    v = this.getPoints(i, o);
                  return (
                    (s = v[0]),
                    (a = v[1]),
                    (h = v[2]),
                    (u = v[3]),
                    !(
                      !Jt(s, a, (c = t), (f = e), (l = r), (d = n)) &&
                      !Jt(h, u, c, f, l, d)
                    ) ||
                      Kt(s, a, h, u, c, f, l, f) ||
                      Kt(s, a, h, u, l, f, l, d) ||
                      Kt(s, a, h, u, l, d, c, d) ||
                      Kt(s, a, h, u, c, d, c, f)
                  );
                },
              },
              {
                key: 'dist2',
                value: function(t, e, r, n) {
                  var i = this.getPoints(r, n);
                  return Zt(t, e, i[0], i[1], i[2], i[3]);
                },
              },
              {
                key: 'isEdge',
                get: function() {
                  return !0;
                },
              },
            ]),
            t
          );
        })(),
        le = (function() {
          function t(e) {
            ie(this, t), (this.e = e);
          }
          return (
            se(t, [
              {
                key: 'getBezierPoints',
                value: function(t, e) {
                  var r, n, i;
                  (r = (i = kt.edgeSource(this.e)).x), (n = i.y);
                  var o = 2.5 * t.nodeSize * e,
                    s = o / t.width / 2,
                    a = o / t.height / 2,
                    h = i.y < 0.5 ? 1 : -1;
                  return (
                    he(t, e, i.e, ae),
                    [
                      (r += ae.x),
                      (n += ae.y),
                      r + 1 * s,
                      n + a * h,
                      r,
                      n + 1.25 * a * h,
                      r - 1 * s,
                      n + a * h,
                    ]
                  );
                },
              },
              {
                key: 'getBBox',
                value: function(t, e) {
                  return Wt(this.getBezierPoints(t, e));
                },
              },
              {
                key: 'intersectsRect',
                value: function(t, e, r, n, i, o, s) {
                  var a = this.getBezierPoints(i, o);
                  return (
                    ne(a[0], a[1], a[2], a[3], a[4], a[5], t, e, r, n) ||
                    ne(a[2], a[3], a[4], a[5], a[6], a[7], t, e, r, n)
                  );
                },
              },
              {
                key: 'dist2',
                value: function(t, e, r, n) {
                  var i = this.getBezierPoints(r, n),
                    o = $t(t, e, i[0], i[1], i[2], i[3], i[4], i[5]),
                    s = $t(t, e, i[2], i[3], i[4], i[5], i[6], i[7]);
                  return Math.min(o, s);
                },
              },
              {
                key: 'isEdge',
                get: function() {
                  return !0;
                },
              },
            ]),
            t
          );
        })(),
        de = (function() {
          function t(e) {
            ie(this, t), (this.e = e);
          }
          return (
            se(t, [
              {
                key: 'getBezierPoints',
                value: function(t, e, r) {
                  var n,
                    i,
                    o,
                    s,
                    a = kt.edgeSource(this.e),
                    h = kt.edgeTarget(this.e);
                  (n = a.x), (o = a.y), (i = h.x), (s = h.y);
                  var u = r(a, h),
                    c = u.y,
                    f = t.aspect2 * -u.x,
                    l = t.width * c,
                    d = t.height * f,
                    v = 2 * Math.sqrt(l * l + d * d);
                  return (
                    (c *= (t.curveExc * e) / v),
                    (f *= (t.curveExc * e) / v),
                    he(t, e, a.e, ae),
                    (n += ae.x),
                    (o += ae.y),
                    he(t, e, h.e, ae),
                    [
                      n,
                      o,
                      (n + (i += ae.x)) / 2 + c,
                      (o + (s += ae.y)) / 2 + f,
                      i,
                      s,
                    ]
                  );
                },
              },
              {
                key: 'intersectsRect',
                value: function(t, e, r, n, i, o, s) {
                  var a = this.getBezierPoints(i, o, s);
                  return ne(a[0], a[1], a[2], a[3], a[4], a[5], t, e, r, n);
                },
              },
              {
                key: 'getBBox',
                value: function(t, e, r) {
                  return Wt(this.getBezierPoints(t, e, r));
                },
              },
              {
                key: 'dist2',
                value: function(t, e, r, n, i) {
                  var o = this.getBezierPoints(r, n, i);
                  return $t(t, e, o[0], o[1], o[2], o[3], o[4], o[5]);
                },
              },
              {
                key: 'isEdge',
                get: function() {
                  return !0;
                },
              },
            ]),
            t
          );
        })();
      function ve(t, e) {
        return t.dist2 - e.dist2;
      }
      var ge = { nodes: ue, lines: fe, circles: le, curves: de, labels: ce },
        me = (function() {
          function t(e, r, n, i, o, s, a, h, u, c, f, d, v, g, m) {
            ie(this, t);
            var p = e.size || 1;
            (e.size = 1), (this.texts = r), (this.normalize = d);
            var y = (this.types = {
                nodes: [],
                lines: [],
                circles: [],
                curves: [],
                labels: [],
              }),
              x = 0,
              w = [],
              b = function(t, r, n) {
                return (r[n] = t.getBBox(e, 1, d)), r[n].push(t), t;
              };
            i.forEach(function(t) {
              y.nodes.push(b(new ue(t), w, x++));
            }),
              s.forEach(function(t) {
                y.lines.push(b(new fe(t), w, x++));
              }),
              c.forEach(function(t) {
                y.circles.push(b(new le(t), w, x++));
              }),
              h.forEach(function(t) {
                y.curves.push(b(new de(t), w, x++));
              });
            var _ = {},
              E = {},
              M = function(t) {
                var i = o[t],
                  s = l(n.styles[t], v, 'label'),
                  a = r.getEngine(s.font);
                a.setFont(s.font);
                var h = a.fontSize,
                  u = a.isSDF,
                  c = _[t] || (_[t] = []),
                  f = E[t] || (E[t] = 0);
                (e.size = m(e, s.label || {})),
                  i.forEach(function(t) {
                    var e = a.get(t.label, t.x, t.y);
                    y.labels.push(b(new ce(t, e, s, h, u, g), c, f++));
                  }),
                  (E[t] = f);
              };
            for (var S in o) M(S);
            for (var S in ((this.rbushtree_s = {}), _)) {
              (this.rbushtree_s[S] = Xt()).load(_[S]);
            }
            (this.rbushtree = Xt()), this.rbushtree.load(w), (e.size = p);
          }
          return (
            se(t, [
              {
                key: '_tryAddEl',
                value: function(t, e, r, n, i, o) {
                  n &&
                    e.isNode &&
                    t.nodes.push({ node: e.e, dist: Math.sqrt(r), dist2: r }),
                    i &&
                      e.isEdge &&
                      t.edges.push({ edge: e.e, dist: Math.sqrt(r), dist2: r }),
                    o &&
                      e.isLabel &&
                      t.labels.push({
                        label: e.e,
                        dist: Math.sqrt(r),
                        dist2: r,
                      });
                },
              },
              {
                key: 'findArea',
                value: function(t, e, r, n, i, o, s, a, h) {
                  if (e > n) {
                    var u = e;
                    (e = n), (n = u);
                  }
                  if (r > i) {
                    var c = r;
                    (r = i), (i = c);
                  }
                  var f = {};
                  a && (f.edges = []),
                    s && (f.nodes = []),
                    h && (f.labels = []);
                  var l = (e + n) / 2,
                    d = (r + i) / 2,
                    v = this.rbushtree.search([e - Yt, r - Yt, n + Yt, i + Yt]);
                  if (h)
                    for (var g in this.rbushtree_s)
                      v = v.concat(
                        this.rbushtree_s[g].search([
                          e - Yt,
                          r - Yt,
                          n + Yt,
                          i + Yt,
                        ])
                      );
                  for (var m = 0; m < v.length; m++) {
                    var p = v[m][4],
                      y = p.dist2(l, d, t, o, this.normalize, this.texts);
                    p.intersectsRect(
                      e,
                      r,
                      n,
                      i,
                      t,
                      o,
                      this.normalize,
                      this.texts
                    ) && this._tryAddEl(f, p, y, s, a, h);
                  }
                  for (var x in f) f[x].sort(ve);
                  return f;
                },
              },
              {
                key: 'find',
                value: function(t, e, r, n, i, o, s, a) {
                  var h = {};
                  s && (h.edges = []),
                    o && (h.nodes = []),
                    a && (h.labels = []);
                  var u = n,
                    c = n,
                    f = n * n,
                    l = this.rbushtree.search([e - u, r - c, e + u, r + c]);
                  if (a)
                    for (var d in this.rbushtree_s)
                      l = l.concat(
                        this.rbushtree_s[d].search([e - u, r - c, e + u, r + c])
                      );
                  for (var v = 0; v < l.length; v++) {
                    var g = l[v][4],
                      m = g.dist2(e, r, t, i, this.normalize, this.texts);
                    m > f || this._tryAddEl(h, g, m, o, s, a);
                  }
                  for (var p in h) h[p].sort(ve);
                  return h;
                },
              },
              {
                key: 'update',
                value: function(t, e, r, n) {
                  this.rbushtree.remove(this.types[e][r]);
                  var i = new ge[e](n),
                    o = i.getBBox(t, 1, this.normalize, this.texts);
                  o.push(i), this.rbushtree.insert((this.types[e][r] = o));
                },
              },
            ]),
            t
          );
        })(),
        pe = {
          linear: 'float ease(float t) {\n  return t;\n}\n',
          'sin-in':
            '#ifndef HALF_PI\n#define HALF_PI 1.5707963267948966\n#endif\n\nfloat ease(float t) {\n  return sin((t - 1.0) * HALF_PI) + 1.0;\n}\n',
          'sin-out':
            '#ifndef HALF_PI\n#define HALF_PI 1.5707963267948966\n#endif\n\nfloat ease(float t) {\n  return sin(t * HALF_PI);\n}',
          'sin-inout':
            '#ifndef PI\n#define PI 3.141592653589793\n#endif\n\nfloat ease(float t) {\n  return -0.5 * (cos(PI * t) - 1.0);\n}',
          'exp-in':
            'float ease(float t) {\n  return t == 0.0 ? t : pow(2.0, 10.0 * (t - 1.0));\n}',
          'exp-out':
            'float ease(float t) {\n  return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);\n}\n',
          'exp-inout':
            'float ease(float t) {\n  return t == 0.0 || t == 1.0\n    ? t\n    : t < 0.5\n      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n}',
          'bounce-in':
            '#ifndef PI\n#define PI 3.141592653589793\n#endif\n\nfloat bounceOut(float t) {\n  const float a = 4.0 / 11.0;\n  const float b = 8.0 / 11.0;\n  const float c = 9.0 / 10.0;\n\n  const float ca = 4356.0 / 361.0;\n  const float cb = 35442.0 / 1805.0;\n  const float cc = 16061.0 / 1805.0;\n\n  float t2 = t * t;\n\n  return t < a\n    ? 7.5625 * t2\n    : t < b\n      ? 9.075 * t2 - 9.9 * t + 3.4\n      : t < c\n        ? ca * t2 - cb * t + cc\n        : 10.8 * t * t - 20.52 * t + 10.72;\n}\n\n\nfloat ease(float t) {\n  return 1.0 - bounceOut(1.0 - t);\n}',
          'bounce-out':
            '#ifndef PI\n#define PI 3.141592653589793\n#endif\n\nfloat ease(float t) {\n  const float a = 4.0 / 11.0;\n  const float b = 8.0 / 11.0;\n  const float c = 9.0 / 10.0;\n\n  const float ca = 4356.0 / 361.0;\n  const float cb = 35442.0 / 1805.0;\n  const float cc = 16061.0 / 1805.0;\n\n  float t2 = t * t;\n\n  return t < a\n    ? 7.5625 * t2\n    : t < b\n      ? 9.075 * t2 - 9.9 * t + 3.4\n      : t < c\n        ? ca * t2 - cb * t + cc\n        : 10.8 * t * t - 20.52 * t + 10.72;\n}\n',
          'bounce-inout':
            '#ifndef PI\n#define PI 3.141592653589793\n#endif\n\nfloat bounceOut(float t) {\n  const float a = 4.0 / 11.0;\n  const float b = 8.0 / 11.0;\n  const float c = 9.0 / 10.0;\n\n  const float ca = 4356.0 / 361.0;\n  const float cb = 35442.0 / 1805.0;\n  const float cc = 16061.0 / 1805.0;\n\n  float t2 = t * t;\n\n  return t < a\n    ? 7.5625 * t2\n    : t < b\n      ? 9.075 * t2 - 9.9 * t + 3.4\n      : t < c\n        ? ca * t2 - cb * t + cc\n        : 10.8 * t * t - 20.52 * t + 10.72;\n}\n\nfloat ease(float t) {\n  return t < 0.5\n    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))\n    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;\n}',
          'circular-in':
            'float ease(float t) {\n  return 1.0 - sqrt(1.0 - t * t);\n}',
          'circular-out':
            'float ease(float t) {\n  return sqrt((2.0 - t) * t);\n}',
          'circular-inout':
            'float ease(float t) {\n  return t < 0.5\n    ? 0.5 * (1.0 - sqrt(1.0 - 4.0 * t * t))\n    : 0.5 * (sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);\n}',
          'quad-in': 'float ease(float t) {\n  return t * t;\n}',
          'quad-out': 'float ease(float t) {\n  return -t * (t - 2.0);\n}',
          'quad-inout':
            'float ease(float t) {\n  return t < 0.5\n    ? +8.0 * pow(t, 4.0)\n    : -8.0 * pow(t - 1.0, 4.0) + 1.0;\n}',
          'cubic-in': 'float ease(float t) {\n  return t * t * t;\n}',
          'cubic-out':
            'float ease(float t) {\n  float f = t - 1.0;\n  return f * f * f + 1.0;\n}',
          'cubic-inout':
            'float ease(float t) {\n  return t < 0.5\n    ? 4.0 * t * t * t\n    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;\n}',
          'quart-in': 'float ease(float t) {\n  return pow(t, 4.0);\n}',
          'quart-out':
            'float ease(float t) {\n  return pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;\n}',
          'quart-inout':
            'float ease(float t) {\n  return t < 0.5\n    ? +8.0 * pow(t, 4.0)\n    : -8.0 * pow(t - 1.0, 4.0) + 1.0;\n}',
          'quint-in': 'float ease(float t) {\n  return pow(t, 5.0);\n}',
          'quint-out':
            "float ease(float t) {\n  return 1.0 + (pow(t - 1.0, 5.0)); // NOTE: fix original bug '-' -> '+'\n}",
          'quint-inout':
            "float ease(float t) {\n  return t < 0.5\n    ? +16.0 * pow(t, 5.0)\n    : 0.5 * pow(2.0 * t - 2.0, 5.0) + 1.0; // NOTE: fix original bug, no '-'\n}\n",
        },
        ye = function(
          t,
          e,
          r,
          i,
          s,
          a,
          h,
          u,
          c,
          l,
          d,
          g,
          m,
          p,
          y,
          x,
          w,
          b,
          _,
          E
        ) {
          var M = this;
          (w =
            w ||
            function() {
              return M.nodes.length;
            }),
            (b =
              b ||
              function() {
                return M.edges.length;
              }),
            (this.redraw = _ || function() {}),
            ((c = c || {}).styles = c.styles || {}),
            (this.hasEdgeAnimation =
              !!g.animateType && 'none' !== g.animateType);
          var S,
            T,
            A = function(t) {
              return {
                set: function(t, e, r, n) {
                  var i = e.x,
                    o = e.y;
                  if (
                    (v.vertices(t.position, r, i, o, i, o, i, o, i, o),
                    v.vertices(t.textureCoord, r, 0, 0, 1, 0, 1, 1, 0, 1),
                    t.color)
                  ) {
                    var s = e.color;
                    v.colors(t.color, r, s, s, s, s);
                  }
                  v.quad(t.indices, r, n);
                },
              };
            },
            z = function(t) {
              return (function(t) {
                var e = h.getEngine(t.font);
                return (
                  e.setFont(t.font),
                  {
                    set: function(t, r, n, i) {
                      for (
                        var o = r.x,
                          s = r.y,
                          a = !1,
                          h = e.get(r.label || '', o, s, function() {
                            a = !0;
                          }),
                          u = 0;
                        u < h.length;
                        u++, n += 4, i += 6
                      ) {
                        var c = h[u];
                        v.vertices(t.position, n, o, s, o, s, o, s, o, s),
                          v.vertices(
                            t.relative,
                            n,
                            c.dx,
                            c.dy,
                            c.width + c.dx,
                            c.dy,
                            c.width + c.dx,
                            c.height + c.dy,
                            c.dx,
                            c.height + c.dy
                          ),
                          v.vertices(
                            t.textureCoord,
                            n,
                            c.left,
                            c.bottom,
                            c.right,
                            c.bottom,
                            c.right,
                            c.top,
                            c.left,
                            c.top
                          ),
                          v.quad(t.indices, n, i);
                      }
                      return a;
                    },
                    size: function(t, r) {
                      return e.steps(r.label || '');
                    },
                  }
                );
              })(t);
            },
            k = function(t, e) {
              var r = e.x - t.x,
                n = e.y - t.y,
                i = 1 / Math.sqrt(r * r + n * n);
              return { x: i * r, y: i * n };
            },
            R = Math.cos(0.9),
            C = Math.sin(0.9),
            P = {},
            I = {},
            N = {},
            F = function(t, e, r, n) {
              var i, o, s, a, h, u, c, f;
              kt.getCurveShift(n.e, P),
                (s = P.x),
                (a = P.y),
                (c = P.cx),
                (f = P.cy),
                kt.getCurveShift(r.e, I),
                (i = I.x),
                (o = I.y),
                (h = I.cx),
                (u = I.cy),
                t.curveShift &&
                  v.vertices(t.curveShift, e, -o, i, -o, i, -a, s, -a, s),
                t.circleShift &&
                  v.vertices(t.circleShift, e, -u, h, -u, h, -f, c, -f, c);
            },
            L = {
              lines: function(t) {
                return {
                  set: function(t, e, r, n) {
                    var i = kt.edgeSource(e),
                      o = kt.edgeTarget(e),
                      s = i.x - o.x,
                      a = i.y - o.y,
                      h = k(i, o);
                    F(t, r, i, o),
                      v.vertices(
                        t.position,
                        r,
                        i.x,
                        i.y,
                        i.x,
                        i.y,
                        o.x,
                        o.y,
                        o.x,
                        o.y
                      ),
                      v.vertices(t.lengthSoFar, r, 0, 0, 0, 0, s, a, s, a),
                      v.vertices(
                        t.normal,
                        r,
                        -h.y,
                        h.x,
                        h.y,
                        -h.x,
                        h.y,
                        -h.x,
                        -h.y,
                        h.x
                      ),
                      M.hasEdgeAnimation &&
                        (v.vertices(
                          t.startPos,
                          r,
                          i.x,
                          i.y,
                          i.x,
                          i.y,
                          i.x,
                          i.y,
                          i.x,
                          i.y
                        ),
                        v.vertices(
                          t.endPos,
                          r,
                          o.x,
                          o.y,
                          o.x,
                          o.y,
                          o.x,
                          o.y,
                          o.x,
                          o.y
                        )),
                      v.quad(t.indices, r, n);
                  },
                };
              },
              curves: function(t) {
                return {
                  numVertices: 3,
                  numIndices: 3,
                  set: function(t, e, r, n) {
                    var i = kt.edgeSource(e),
                      o = kt.edgeTarget(e),
                      s = i.x - o.x,
                      a = i.y - o.y,
                      h = k(i, o);
                    F(t, r, i, o),
                      v.vertices(
                        t.position,
                        r,
                        i.x,
                        i.y,
                        0.5 * (o.x + i.x),
                        0.5 * (o.y + i.y),
                        o.x,
                        o.y
                      ),
                      v.vertices(t.lengthSoFar, r, 0, 0, s / 2, a / 2, s, a),
                      v.vertices(t.normal, r, 0, 0, h.y, -h.x, 0, 0),
                      v.vertices(t.curve, r, 1, 1, 0.5, 0, 0, 0),
                      v.indices(t.indices, r, n, 0, 1, 2);
                  },
                };
              },
              circles: function(t) {
                return {
                  set: function(t, e, r, n) {
                    var i = kt.edgeSource(e),
                      o = i.y < 0.5 ? 1 : -1,
                      s = o,
                      a = 1.25 * o,
                      h = 1.5 * o;
                    F(t, r, i, i),
                      v.vertices(
                        t.position,
                        r,
                        i.x,
                        i.y,
                        i.x,
                        i.y,
                        i.x,
                        i.y,
                        i.x,
                        i.y
                      ),
                      v.vertices(t.lengthSoFar, r, 0, 0, 1, s, 2, a, 3, h),
                      v.vertices(t.normal, r, 0, 0, 1, o, 0, 1.25 * o, -1, o),
                      v.vertices(t.curve, r, 1, 1, 0.5, 0, 0, 0, 0.5, 0),
                      v.quad(t.indices, r, n);
                  },
                };
              },
            },
            q = function(t, e, r, n, i, o, s, a) {
              var h,
                u,
                c,
                f,
                l,
                d = n.x,
                g = n.y;
              kt.getCurveShift(n.e, N),
                (u = N.x),
                (c = N.y),
                (f = N.cx),
                (l = N.cy),
                (h = n.is_edge ? 0 : 1),
                t.curveShift &&
                  v.vertices(t.curveShift, i, -c, u, -c, u, -c, u, -c, u),
                t.circleShift &&
                  v.vertices(t.circleShift, i, -l, f, -l, f, -l, f, -l, f),
                v.singles(t.offsetMul, i, h, h, h, h),
                v.vertices(t.position, i, d, g, d, g, d, g, d, g),
                v.vertices(t.direction, i, s, a, s, a, s, a, s, a),
                v.vertices(t.textureCoord, i, 0, 0, 1, 0, 1, 1, 0, 1),
                v.quad(t.indices, i, o);
            },
            B = {
              lineArrows: function(t) {
                return {
                  set: function(t, e, r, n) {
                    var i = kt.edgeSource(e),
                      o = kt.edgeTarget(e),
                      s = k(i, o);
                    q(t, 0, 0, o, r, n, s.x, s.y);
                  },
                };
              },
              curveArrows: function(t) {
                return {
                  set: function(t, e, r, n) {
                    var i = kt.edgeSource(e),
                      o = kt.edgeTarget(e);
                    return q(
                      t,
                      0,
                      0,
                      o,
                      r,
                      n,
                      0.5 * (o.x - i.x),
                      0.5 * (o.y - i.y)
                    );
                  },
                };
              },
              circleArrows: function(t) {
                return {
                  set: function(t, e, r, n) {
                    var i = kt.edgeTarget(e);
                    return q(
                      t,
                      0,
                      0,
                      i,
                      r,
                      n,
                      i.x < 0.5 ? R : -R,
                      i.y < 0.5 ? -C : C
                    );
                  },
                };
              },
            };
          (this.getCurrentSpatialSearch = function(t) {
            return (
              void 0 === D &&
                (D = new me(
                  t,
                  h,
                  c,
                  [],
                  {},
                  [],
                  {},
                  [],
                  {},
                  [],
                  {},
                  k,
                  d,
                  y,
                  x
                )),
              D
            );
          }),
            (this.remove = function() {});
          var D = void 0;
          (this.set = function(t, e, r, n) {
            (O = 0),
              (U = 0),
              (this.nodes = t = t || []),
              (this.edges = e = e ? [].concat(e) : []),
              (D = void 0);
            for (var o = [], u = [], l = [], v = 0; v < e.length; v++) {
              var m = e[v];
              'number' == typeof m.source && (m.source = t[m.source]),
                'number' == typeof m.target && (m.target = t[m.target]);
            }
            var p = function(t) {
              return t.uniqid || -t.index || -t.nidx;
            };
            !(function() {
              for (var r = 0; r < t.length; r++) t[r].index = r;
              for (var n = 0, i = t.length + 10; n < e.length; n++, i++)
                e[n].nidx = i;
              (S = []), (T = new Uint32Array(e.length));
              var s = { k: '_', kArrow: '_', d: [] },
                a = { k: 'circles', kArrow: 'circleArrows', d: l },
                h = { k: 'lines', kArrow: 'lineArrows', d: o },
                f = { k: 'curves', kArrow: 'curveArrows', d: u };
              if (W.OES_standard_derivatives) {
                for (var d = {}, v = 0; v < e.length; v++) {
                  var g = e[v],
                    m = p(g.source),
                    y = p(g.target);
                  (d[m] || (d[m] = {}))[y] = !0;
                }
                for (
                  var x = 'overlap' === c.bidirectional, w = 0;
                  w < e.length;
                  w++
                ) {
                  var b = void 0,
                    _ = e[w],
                    E = p(_.source),
                    M = p(_.target),
                    A = s;
                  if (E === M) (_.t = 2), (b = l), (A = a);
                  else {
                    var z = d[M];
                    z && z[E] && x
                      ? ((_.t = 1), (b = u), (A = f))
                      : ((_.t = 0), (b = o), (A = h));
                  }
                  S.push(A), (T[w] = A.d.length), b.push(_);
                }
              } else
                for (var k = 0; k < e.length; k++) {
                  var R = e[k],
                    C = s;
                  p(R.source) !== p(R.target) &&
                    ((C = h), (R.t = 0), o.push(R)),
                    S.push(C),
                    (T[k] = C.d.length);
                }
            })();
            var w = f(t),
              b = f(l),
              _ = f(o),
              E = f(u);
            if (
              ((this.getCurrentSpatialSearch = function(e) {
                return (
                  void 0 === D &&
                    (D = new me(e, h, c, t, w, o, _, u, E, l, b, k, d, y, x)),
                  D
                );
              }),
              r && new At[r](t, e, n).apply() && At.normalize(t),
              i)
            ) {
              for (
                var R, C, P, I, N, F;
                (R = void 0),
                  (C = void 0),
                  (P = void 0),
                  (I = void 0),
                  (C = !1),
                  (P = function(t, e) {
                    'string' == typeof t.style.texture
                      ? (t.style.texture = s.get(i, t.style.texture, e))
                      : e();
                  }),
                  (I = function(t, e) {
                    var r = (t.style.label || {}).font || {},
                      n = h.getEngine(r);
                    t.style.texture = n.getTexture(r, e);
                  }),
                  (R = t.length && !t[0].color),
                  (C =
                    C ||
                    H.nodes.set(i, c.styles, P, R ? t : [], R ? w : {}, A)),
                  (R = t.length && t[0].color),
                  (C =
                    C ||
                    H.nodesColored.set(
                      i,
                      c.styles,
                      P,
                      R ? t : [],
                      R ? w : {},
                      A
                    )),
                  d.label &&
                    (h.clear(),
                    (C =
                      (C = C || H.labelsOutline.set(i, c.styles, I, t, w, z)) ||
                      H.labels.set(i, c.styles, I, t, w, z)),
                    h.bind()),
                  (C = C || H.lines.set(i, c.styles, P, o, _, L.lines)),
                  W.OES_standard_derivatives &&
                    (C =
                      (C = C || H.curves.set(i, c.styles, P, u, E, L.curves)) ||
                      H.circles.set(i, c.styles, P, l, b, L.circles)),
                  g.arrow &&
                    ((C =
                      C ||
                      H.lineArrows.set(i, c.styles, P, o, _, B.lineArrows)),
                    W.OES_standard_derivatives &&
                      (C =
                        (C =
                          C ||
                          H.curveArrows.set(
                            i,
                            c.styles,
                            P,
                            u,
                            E,
                            B.curveArrows
                          )) ||
                        H.circleArrows.set(
                          i,
                          c.styles,
                          P,
                          l,
                          b,
                          B.circleArrows
                        ))),
                  C;

              );
              (N = !1),
                (F = function(t) {
                  N && M.set(M.nodes, M.edges);
                }),
                a.onLoad(F),
                s.onLoad(F),
                (N = !0);
            }
          }),
            (this.update = function(t, e, r) {
              i &&
                H[t].update(i, e, r, function(t) {
                  return {
                    set: function(t, e, r) {
                      return v.colors(t, r, e, e, e, e);
                    },
                  };
                });
            }),
            (this.find = function(t, n, i, o, s, a) {
              return M.getCurrentSpatialSearch(e).find(
                e,
                t,
                n,
                i,
                r.size,
                o,
                s,
                a
              );
            }),
            (this.findArea = function(t, n, i, o, s, a, h) {
              return M.getCurrentSpatialSearch(e).findArea(
                e,
                t,
                n,
                i,
                o,
                r.size,
                s,
                a,
                h
              );
            }),
            (this.updateNode = function(t, r) {
              (M.nodes[r] = t),
                D && D.update(e, 'nodes', r, t),
                i &&
                  ((M.nodes[0].color ? H.nodesColored : H.nodes).updateEl(
                    i,
                    t,
                    r,
                    A
                  ),
                  H.labels && H.labels.updateEl(i, t, r, z),
                  H.labelsOutline && H.labelsOutline.updateEl(i, t, r, z));
            }),
            (this.updateEdge = function(t, r) {
              var n = S[r],
                o = T[r];
              (n.d[o] = M.edges[r] = t),
                D && D.update(e, n.k, o, t),
                i &&
                  (H[n.k].updateEl(i, t, o, L[n.k]),
                  g.arrow && H[n.kArrow].updateEl(i, t, o, B[n.kArrow]));
            });
          var O = 0,
            U = 0,
            V = { x: -1, y: -1, title: '' };
          this.removeNodeAtPos = function(t) {
            M.nodes[t] !== V && (O++, M.updateNode(V, t));
          };
          var j = { source: { x: -1, y: -1 }, target: { x: -1, y: -1 } };
          (this.removeEdgeAtPos = function(t) {
            M.edges[t] !== j && (U++, M.updateEdge(j, t));
          }),
            (this.getVisibleNodes = function() {
              if (O <= 0) return M.nodes;
              var t = [];
              return (
                M.nodes.forEach(function(e) {
                  e !== V && t.push(e);
                }),
                t
              );
            }),
            (this.getVisibleEdges = function() {
              if (U <= 0) return M.edges;
              var t = [];
              return (
                M.edges.forEach(function(e) {
                  e !== j && t.push(e);
                }),
                t
              );
            }),
            (this.cntShownNodes = function() {
              return M.nodes.length - O;
            }),
            (this.cntShownEdges = function() {
              return M.edges.length - U;
            });
          var X = function(t) {
              return t.width / 120;
            },
            Y = { line: 0, dashed: 1, 'chain-dotted': 2, dotted: 3 },
            G = function(t) {
              return (
                void 0 !== t && (t = Y[t]),
                (void 0 !== t && 'number' == typeof t) || (t = 0),
                t
              );
            },
            $ = { none: 0, basic: 1, gradient: 2 };
          (this.nodes = []), (this.edges = []);
          var W = i ? o.initExtensions(i, 'OES_standard_derivatives') : {},
            H = (this.scene = function() {
              return {
                elements: [],
                add: function(t, e) {
                  (H[t] = e), H.elements.push(e);
                },
              };
            }.call(this)),
            Z = !1;
          if (!i) return c.onLoad && !Z && (Z = !0) && c.onLoad(), this;
          var K = [
              'precision mediump float;',
              'uniform vec4 color;',
              'uniform sampler2D texture;',
              'varying vec2 tc;',
              'void main(void) {',
              '   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));',
              '}',
            ],
            J = [
              'precision mediump float;',
              'uniform lowp sampler2D texture;',
              'uniform mediump vec4 color;',
              'uniform mediump float height_font;',
              'uniform float type;',
              'uniform float buffer;',
              'uniform float boldness;',
              'float gamma = 4.0 * 1.4142 * boldness / height_font;',
              'varying mediump vec2 tc;',
              'void main() {',
              '  if(type > 0.5){',
              '    float tx=texture2D(texture, tc).a;',
              '    float a= smoothstep(buffer - gamma, buffer + gamma, tx);',
              '    gl_FragColor=vec4(color.rgb, a*color.a);',
              '  }else{',
              '    gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));',
              '  }',
              '}',
            ],
            Q = [
              '   if(type >= 2.5){',
              '      part = fract(part*3.0);',
              '      if(part < 0.5) discard;',
              '   }else if(type >= 1.5){',
              '      if(part < 0.15) discard;',
              '      if(part > 0.30 && part < 0.45) discard;',
              '   }else if(type >= 0.5){',
              '      if(part < 0.5) discard;',
              '   }',
            ],
            tt = [
              '#extension GL_OES_standard_derivatives : enable',
              '#ifdef GL_ES',
              'precision highp float;',
              '#endif',
              'uniform float width;',
              'uniform vec4 color;',
              'uniform float type;',
              'uniform float lineStepSize;',
              'uniform float lineSize;',
              'varying vec2 c;',
              'varying vec2 v_lengthSoFar;',
              'void main(void) {',
              '   float part = abs(fract(length(v_lengthSoFar)*lineStepSize*lineSize));',
            ]
              .concat(Q)
              .concat([
                '   vec2 px = dFdx(c);',
                '   vec2 py = dFdy(c);',
                '   float fx = 2.0 * c.x * px.x - px.y;',
                '   float fy = 2.0 * c.y * py.x - py.y;',
                '   float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);',
                '   float alpha = 1.0 - abs(sd) / width;',
                '   if (alpha < 0.0) discard;',
                '   gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));',
                '}',
              ]),
            et = [
              'attribute vec2 curveShift;',
              'vec4 getShiftCurve(void) {',
              '   vec2 shiftN = vec2(curveShift.x, aspect2 * curveShift.y);',
              '   float length = length(screen * shiftN);',
              '   return vec4(exc * (length == 0.0 ? vec2(0, 0) : shiftN * 0.5 / length), 0, 0);',
              '}',
              'attribute vec2 circleShift;',
              'vec4 getShiftCircle(void) {',
              '   return vec4(size*circleShift,0,0);',
              '}',
            ],
            rt = [''.concat(pe[g.animateEase ? g.animateEase : 'linear'])];
          if (
            (this.hasEdgeAnimation
              ? H.add(
                  'lines',
                  new v(
                    i,
                    g,
                    null,
                    [
                      'precision mediump float;',
                      'attribute vec2 position;',
                      'attribute vec2 normal;',
                      'attribute vec2 lengthSoFar;',
                      'attribute vec2 startPos;',
                      'attribute vec2 endPos;',
                      'uniform float time;',
                      'uniform float exc;',
                      'uniform vec2 size;',
                      'uniform vec2 screen;',
                      'uniform float aspect2;',
                      'uniform float aspect;',
                      'uniform vec2 width;',
                      'uniform mat4 transform;',
                      'varying float v_time;',
                      'varying vec2 v_startPos;',
                      'varying vec2 v_endPos;',
                      'varying vec2 v_screen;',
                      'varying vec2 n;',
                      'varying vec2 v_lengthSoFar;',
                    ]
                      .concat(et)
                      .concat([
                        'void main(void) {',
                        '   gl_Position = getShiftCurve() + getShiftCircle() + vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);',
                        '   vec4 p = transform*vec4(lengthSoFar,0,0);',
                        '   v_lengthSoFar = vec2(p.x, p.y/aspect);',
                        '   v_time = time;',
                        '   v_startPos = startPos;',
                        '   v_endPos = endPos;',
                        '   v_screen = screen;',
                        '   n = normal;',
                        '}',
                      ]),
                    [
                      'precision mediump float;',
                      'uniform float type;',
                      'uniform float animateType;',
                      'uniform vec4 color;',
                      'uniform vec4 animateColor;',
                      'uniform float animateSpeed;',
                      'varying vec2 n;',
                      'varying float v_time;',
                      'varying vec2 v_startPos;',
                      'varying vec2 v_endPos;',
                      'varying vec2 v_screen;',
                      'varying vec2 v_lengthSoFar;',
                      'uniform float lineSize;',
                    ]
                      .concat(rt)
                      .concat([
                        'float isAnimateCovered() {',
                        '   vec2 pos = gl_FragCoord.xy;',
                        '   vec2 viewport = 2. * v_screen;',
                        '   float maxLen = length(viewport);',
                        '   vec2 startPos = viewport * v_startPos;',
                        '   vec2 endPos = viewport * v_endPos;',
                        '   float totalLen = distance(startPos, endPos);',
                        '   float len = distance(pos, startPos);',
                        '   // float r = 300.;',
                        '   float r = ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) * totalLen;',
                        '   // float r = 0.5 * totalLen;',
                        '   float draw = 1. - step(r, len);',
                        '   return draw;',
                        '}',
                      ])
                      .concat([
                        'float isAnimateCoveredGradient() {',
                        '   vec2 pos = gl_FragCoord.xy;',
                        '   vec2 viewport = 2. * v_screen;',
                        '   float maxLen = length(viewport);',
                        '   vec2 startPos = viewport * v_startPos;',
                        '   vec2 endPos = viewport * v_endPos;',
                        '   float totalLen = distance(startPos, endPos);',
                        '   float len = distance(pos, startPos);',
                        '   float gradLen = 180.;',
                        '   float r = ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) * (totalLen + gradLen / 2.);',
                        '   // float r = 0.5 * totalLen;',
                        '   float draw = fract(smoothstep(r - gradLen, r, len));',
                        '   return draw;',
                        '}',
                      ])
                      .concat([
                        'void main(void) {',
                        '   float part = abs(fract(length(v_lengthSoFar)*lineSize*5.0));',
                      ])
                      .concat(Q)
                      .concat([
                        '   if (animateType >= 1.5) {',
                        '       gl_FragColor = isAnimateCoveredGradient() * animateColor + (1. - isAnimateCoveredGradient()) * color;',
                        '   } else if (animateType >= 0.5) {',
                        '       gl_FragColor = isAnimateCovered() * animateColor + (1. - isAnimateCovered()) * color;',
                        '   } else {',
                        '       gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));',
                        '   }',
                      ])
                      .concat(['}']),
                    function(t) {
                      var e = t.shader.uniforms;
                      e.exc && i.uniform1f(e.exc, t.curveExc),
                        i.uniform2f(e.screen, t.width, t.height);
                      var r,
                        n = 2.5 * t.nodeSize;
                      e.size && i.uniform2f(e.size, n / t.width, n / t.height),
                        i.uniform1f(e.lineSize, X(t)),
                        i.uniform1f(e.aspect2, t.aspect2),
                        i.uniform1f(e.aspect, t.aspect),
                        i.uniform2f(
                          e.width,
                          t.style.width / t.width,
                          t.style.width / t.height
                        ),
                        i.uniform1f(e.type, G(t.style.type)),
                        i.uniform1f(
                          e.animateType,
                          (void 0 !== (r = t.style.animateType) && (r = $[r]),
                          (void 0 !== r && 'number' == typeof r) || (r = 0),
                          r)
                        ),
                        i.uniform1f(e.animateSpeed, t.style.animateSpeed),
                        o.uniformColor(i, e.color, t.style.color),
                        o.uniformColor(i, e.animateColor, t.style.animateColor);
                    }
                  )
                )
              : H.add(
                  'lines',
                  new v(
                    i,
                    g,
                    null,
                    [
                      'precision mediump float;',
                      'attribute vec2 position;',
                      'attribute vec2 normal;',
                      'attribute vec2 lengthSoFar;',
                      'uniform float exc;',
                      'uniform vec2 size;',
                      'uniform vec2 screen;',
                      'uniform float aspect2;',
                      'uniform float aspect;',
                      'uniform vec2 width;',
                      'uniform mat4 transform;',
                      'varying vec2 n;',
                      'varying vec2 v_lengthSoFar;',
                    ]
                      .concat(et)
                      .concat([
                        'void main(void) {',
                        '   gl_Position = getShiftCurve() + getShiftCircle() + vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);',
                        '   vec4 p = transform*vec4(lengthSoFar,0,0);',
                        '   v_lengthSoFar = vec2(p.x, p.y/aspect);',
                        '   n = normal;',
                        '}',
                      ]),
                    [
                      'precision mediump float;',
                      'uniform float type;',
                      'uniform vec4 color;',
                      'varying vec2 n;',
                      'varying vec2 v_lengthSoFar;',
                      'uniform float lineSize;',
                      'void main(void) {',
                      '   float part = abs(fract(length(v_lengthSoFar)*lineSize*5.0));',
                    ]
                      .concat(Q)
                      .concat([
                        '   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));',
                        '}',
                      ]),
                    function(t) {
                      var e = t.shader.uniforms;
                      e.exc && i.uniform1f(e.exc, t.curveExc),
                        i.uniform2f(e.screen, t.width, t.height);
                      var r = 2.5 * t.nodeSize;
                      e.size && i.uniform2f(e.size, r / t.width, r / t.height),
                        i.uniform1f(e.lineSize, X(t)),
                        i.uniform1f(e.aspect2, t.aspect2),
                        i.uniform1f(e.aspect, t.aspect),
                        i.uniform2f(
                          e.width,
                          t.style.width / t.width,
                          t.style.width / t.height
                        ),
                        i.uniform1f(e.type, G(t.style.type)),
                        o.uniformColor(i, e.color, t.style.color);
                    }
                  )
                ),
            W.OES_standard_derivatives &&
              (H.add(
                'curves',
                new v(
                  i,
                  g,
                  null,
                  [
                    'precision highp float;',
                    'attribute vec2 position;',
                    'attribute vec2 normal;',
                    'attribute vec2 curve;',
                    'attribute vec2 lengthSoFar;',
                    'uniform vec2 size;',
                    'uniform float exc;',
                    'uniform vec2 screen;',
                    'uniform float aspect2;',
                    'uniform float aspect;',
                    'uniform mat4 transform;',
                    'varying vec2 v_lengthSoFar;',
                    'varying vec2 c;',
                  ]
                    .concat(et)
                    .concat([
                      'void main(void) {',
                      '   vec2 n = vec2(normal.x, aspect2 * normal.y);',
                      '   float length = length(screen * n);',
                      '   n = length == 0.0 ? vec2(0, 0) : n / length;',
                      '   gl_Position = getShiftCurve() + getShiftCircle() + vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);',
                      '   c = curve;',
                      '   vec4 p = transform*vec4(lengthSoFar,0,0);',
                      '   v_lengthSoFar = vec2(p.x, p.y/aspect);',
                      '}',
                    ]),
                  tt,
                  function(t) {
                    var e = t.shader.uniforms;
                    i.uniform1f(e.width, t.style.width),
                      i.uniform1f(e.exc, t.curveExc),
                      i.uniform2f(e.screen, t.width, t.height);
                    var r = 2.5 * t.nodeSize;
                    e.size && i.uniform2f(e.size, r / t.width, r / t.height),
                      i.uniform1f(e.lineSize, X(t)),
                      i.uniform1f(e.aspect2, t.aspect2),
                      i.uniform1f(e.aspect, t.aspect),
                      i.uniform1f(e.type, G(t.style.type)),
                      e.lineStepSize && i.uniform1f(e.lineStepSize, 5),
                      o.uniformColor(i, e.color, t.style.color);
                  }
                )
              ),
              H.add(
                'circles',
                new v(
                  i,
                  g,
                  null,
                  [
                    'precision highp float;',
                    'attribute vec2 position;',
                    'attribute vec2 normal;',
                    'attribute vec2 curve;',
                    'attribute vec2 lengthSoFar;',
                    'uniform float exc;',
                    'uniform vec2 screen;',
                    'uniform float aspect2;',
                    'uniform float aspect;',
                    'uniform vec2 size;',
                    'uniform mat4 transform;',
                    'varying vec2 c;',
                    'varying vec2 v_lengthSoFar;',
                  ]
                    .concat(et)
                    .concat([
                      'void main(void) {',
                      '   gl_Position = getShiftCurve() + getShiftCircle() + vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);',
                      '   c = curve;',
                      '   vec4 p = transform*vec4(size * lengthSoFar,0,0);',
                      '   v_lengthSoFar = vec2(p.x, p.y/aspect);',
                      '}',
                    ]),
                  tt,
                  function(t) {
                    var e = t.shader.uniforms;
                    e.exc && i.uniform1f(e.exc, t.curveExc),
                      i.uniform1f(e.width, t.style.width),
                      i.uniform1f(e.type, G(t.style.type)),
                      i.uniform2f(e.screen, t.width, t.height);
                    var r = 2.5 * t.nodeSize;
                    e.size && i.uniform2f(e.size, r / t.width, r / t.height),
                      i.uniform1f(e.lineSize, X(t)),
                      i.uniform1f(e.aspect2, t.aspect2),
                      i.uniform1f(e.aspect, t.aspect),
                      e.lineStepSize && i.uniform1f(e.lineStepSize, 5 / 3),
                      o.uniformColor(i, e.color, t.style.color);
                  }
                )
              )),
            g.arrow)
          ) {
            var nt = { attribute: { offsetMul: 1 } },
              it = function(t) {
                var e = m(t, t.style, b(), 0.2);
                if (!e) return !0;
                var n = t.shader.uniforms;
                i.uniform1f(n.offset, 0.5 * t.nodeSize),
                  i.uniform2f(n.arrowsize, e, t.style.aspect * e),
                  i.uniform1f(n.exc, t.curveExc),
                  n.cexc && i.uniform1f(n.cexc, 0.5 * r.size * t.curveExc),
                  n.size &&
                    ((e = 2.5 * t.nodeSize),
                    n.size && i.uniform2f(n.size, e / t.width, e / t.height)),
                  i.uniform2f(n.screen, t.width, t.height),
                  i.uniform1f(n.aspect2, t.aspect2),
                  o.uniformColor(i, n.color, t.style.color);
              };
            H.add(
              'lineArrows',
              new v(
                i,
                g,
                'arrow',
                [
                  'attribute vec2 position;',
                  'attribute vec2 direction;',
                  'attribute vec2 textureCoord;',
                  'attribute float offsetMul;',
                  'uniform float offset;',
                  'uniform vec2 arrowsize;',
                  'uniform vec2 size;',
                  'uniform vec2 screen;',
                  'uniform float exc;',
                  'uniform float aspect2;',
                  'uniform mat4 transform;',
                  'varying vec2 tc;',
                ]
                  .concat(et)
                  .concat([
                    'void main(void) {',
                    '   vec2 u = direction / length(screen * direction);',
                    '   vec2 v = vec2(u.y, -aspect2 * u.x);',
                    '   v = v / length(screen * v);',
                    '   gl_Position = getShiftCurve() + getShiftCircle()  + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);',
                    '   tc = textureCoord;',
                    '}',
                  ]),
                K,
                it,
                nt
              )
            ),
              W.OES_standard_derivatives &&
                (H.add(
                  'curveArrows',
                  new v(
                    i,
                    g,
                    'arrow',
                    [
                      'attribute vec2 position;',
                      'attribute vec2 direction;',
                      'attribute vec2 textureCoord;',
                      'attribute float offsetMul;',
                      'uniform float offset;',
                      'uniform vec2 arrowsize;',
                      'uniform vec2 size;',
                      'uniform float exc;',
                      'uniform float cexc;',
                      'uniform vec2 screen;',
                      'uniform float aspect2;',
                      'uniform mat4 transform;',
                      'varying vec2 tc;',
                    ]
                      .concat(et)
                      .concat([
                        'void main(void) {',
                        '   vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));',
                        '   u = normalize(direction - cexc * u / length(screen * u));',
                        '   u = u / length(screen * u);',
                        '   vec2 v = vec2(u.y, -aspect2 * u.x);',
                        '   v = v / length(screen * v);',
                        '   gl_Position = getShiftCurve() + getShiftCircle() + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);',
                        '   tc = textureCoord;',
                        '}',
                      ]),
                    K,
                    it,
                    nt
                  )
                ),
                H.add(
                  'circleArrows',
                  new v(
                    i,
                    g,
                    'arrow',
                    [
                      'attribute vec2 position;',
                      'attribute vec2 direction;',
                      'attribute vec2 textureCoord;',
                      'attribute float offsetMul;',
                      'uniform float offset;',
                      'uniform vec2 arrowsize;',
                      'uniform vec2 size;',
                      'uniform vec2 screen;',
                      'uniform float exc;',
                      'uniform float aspect2;',
                      'uniform mat4 transform;',
                      'varying vec2 tc;',
                    ]
                      .concat(et)
                      .concat([
                        'void main(void) {',
                        '   vec2 u = direction;',
                        '   vec2 v = vec2(direction.y, -direction.x);',
                        '   gl_Position = getShiftCurve() + getShiftCircle() + vec4((arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u) / screen, 0, 0) + transform * vec4(position, 0, 1);',
                        '   tc = textureCoord;',
                        '}',
                      ]),
                    K,
                    it,
                    nt
                  )
                ));
          }
          H.add(
            'nodes',
            new v(
              i,
              d,
              null,
              [
                'attribute vec2 position;',
                'attribute vec2 textureCoord;',
                'uniform vec2 size;',
                'uniform mat4 transform;',
                'varying vec2 tc;',
                'void main(void) {',
                '   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);',
                '   tc = textureCoord;',
                '}',
              ],
              K,
              function(t) {
                var e = p(t),
                  r = t.shader.uniforms;
                i.uniform2f(r.size, e / t.width, e / t.height),
                  o.uniformColor(i, r.color, t.style.color);
              }
            )
          ),
            H.add(
              'nodesColored',
              new v(
                i,
                d,
                null,
                [
                  'attribute vec2 position;',
                  'attribute vec2 textureCoord;',
                  'attribute vec4 color;',
                  'uniform vec2 size;',
                  'uniform mat4 transform;',
                  'varying vec2 tc;',
                  'varying vec4 c;',
                  'void main(void) {',
                  '   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);',
                  '   tc = textureCoord;',
                  '   c = color;',
                  '}',
                ],
                [
                  'precision mediump float;',
                  'uniform sampler2D texture;',
                  'varying vec2 tc;',
                  'varying vec4 c;',
                  'void main(void) {',
                  '   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));',
                  '}',
                ],
                function(t) {
                  var e = p(t),
                    r = t.shader.uniforms;
                  i.uniform2f(r.size, e / t.width, e / t.height);
                }
              )
            );
          var ot = [
              'attribute vec2 position;',
              'attribute vec2 relative;',
              'attribute vec2 textureCoord;',
              'uniform float offset;',
              'uniform vec2 scale;',
              'uniform float fontScale;',
              'uniform mat4 transform;',
              'varying vec2 tc;',
              'void main(void) {',
              '   gl_Position = vec4(scale * (relative*fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);',
              '   tc = textureCoord;',
              '}',
            ],
            st = function(t) {
              return function(r) {
                if (!p(r)) return !0;
                var s = r.style.label,
                  a = s.font,
                  u = r.shader.uniforms;
                i.uniform1f(
                  u.type,
                  (function(t) {
                    return h.isSDF(t) ? 1 : 0;
                  })(a)
                );
                var c = h.getEngine(a);
                c.setFont(a);
                var f,
                  d = 1,
                  v = c.fontSize,
                  g = c.isSDF ? y(e, s || {}) : v;
                0 === g && (d = 0),
                  g && v && (d *= g / v),
                  t && !c.isSDF && (d = 0),
                  i.uniform1f(u.buffer, t ? 0.25 : 0.75),
                  i.uniform1f(u.boldness, (a ? a.boldness : void 0) || 1),
                  i.uniform1f(u.fontScale, d),
                  i.uniform1f(u.height_font, v),
                  i.uniform1f(u.offset, 0.5 * r.nodeSize),
                  i.uniform2f(u.scale, 1 / r.width, 1 / r.height),
                  (f = t && a ? new n(a.outlineColor || l) : r.style.color),
                  o.uniformColor(i, u.color, f);
              };
            };
          if (
            (d.label &&
              H.add('labelsOutline', new v(i, d, 'label', ot, J, st(!0))),
            d.label && H.add('labels', new v(i, d, 'label', ot, J, st(!1))),
            c.onLoad)
          ) {
            var at = c.styles;
            for (var ht in at) {
              var ut = at[ht];
              ut.texture && s.get(i, ut.texture, E),
                ut.arrow && ut.arrow.texture && s.get(i, ut.arrow.texture);
            }
          }
        };
      function xe(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var we = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._load = [e.debounce(r, 5)]),
            (this._textures = {}),
            (this._pending = {}),
            (this._n = 0);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'get',
              value: function(t, e, r, n) {
                var i = this,
                  s = this._pending[e],
                  a = this._textures[e];
                return (
                  s
                    ? s.push(r)
                    : a
                    ? r && r()
                    : ((s = this._pending[e] = [r]),
                      this._n++,
                      (this._textures[e] = a = o.createTexture(
                        t,
                        e,
                        function() {
                          s.forEach(function(t) {
                            return t && t();
                          }),
                            delete i._pending[e],
                            --i._n ||
                              i._load.forEach(function(t) {
                                return t();
                              });
                        },
                        n
                      ))),
                  a
                );
              },
            },
            {
              key: 'onLoad',
              value: function(t) {
                this.allLoaded() ? t() : this._load.push(t);
              },
            },
            {
              key: 'allLoaded',
              value: function() {
                return c.emptyObject(this._pending);
              },
            },
          ]) && xe(e.prototype, r),
          n && xe(e, n),
          t
        );
      })();
      function be(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var _e = (function() {
        function t(e, r) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._load = [e.debounce(r || function() {}, 5)]),
            (this._files = {}),
            (this._pending = {}),
            (this._n = 0);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: '_transformFile',
              value: function(t, e) {
                return 'json' === e ? JSON.parse(t) : t;
              },
            },
            {
              key: 'get',
              value: function(t) {
                return this._files[t];
              },
            },
            {
              key: 'load',
              value: function(t, e, r) {
                var n = this,
                  i = this._pending[t],
                  o = this._files[t];
                return (
                  i
                    ? i.push(e)
                    : o
                    ? e && e()
                    : ((i = this._pending[t] = [e]),
                      this._n++,
                      c.ajax(
                        t,
                        function(e) {
                          (n._files[t] = n._transformFile(e, r)),
                            i.forEach(function(e) {
                              return e && e(n._files[t]);
                            }),
                            delete n._pending[t],
                            --n._n ||
                              n._load.forEach(function(t) {
                                return t();
                              });
                        },
                        'arraybuffer' == r ? r : void 0
                      )),
                  o
                );
              },
            },
            {
              key: 'onLoad',
              value: function(t) {
                this.allLoaded() ? t() : this._load.push(t);
              },
            },
            {
              key: 'allLoaded',
              value: function() {
                return c.emptyObject(this._pending);
              },
            },
          ]) && be(e.prototype, r),
          n && be(e, n),
          t
        );
      })();
      function Ee(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var Me = (function() {
          function t(e, r, n) {
            !(function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this._gl = e),
              (this._size = 1024),
              (this._canvas = document.createElement('canvas')),
              (this._canvas.width = this._canvas.height = this._size),
              (this._canvas.style.width = this._canvas.style.height =
                this._size + 'px'),
              (this._canvas.style.display = 'none'),
              (this._el = document.body.appendChild(this._canvas)),
              (this._context = this._canvas.getContext('2d')),
              (this._context.fillStyle = 'white'),
              (this._context.textAlign = 'left'),
              (this._context.textBaseline = 'top'),
              (this._rendered = this._texts = this._x = this._y = this._height = void 0),
              (this.texture = this._gl.createTexture());
          }
          var e, r, n;
          return (
            (e = t),
            (r = [
              {
                key: 'clear',
                value: function() {
                  (this._rendered = {}),
                    this._context.clearRect(0, 0, this._size, this._size),
                    (this._height = this._x = this._y = 0);
                },
              },
              {
                key: 'setFont',
                value: function(t) {
                  var e = t ? t.size + 'px ' + t.type : void 0;
                  (this._rendered[e] = this._texts = this._rendered[e] || {}),
                    (this._context.font = e),
                    (this._x = 0),
                    (this._y += this._height),
                    (this._height = t ? t.size + 1 : NaN);
                },
              },
              {
                key: 'getTexture',
                value: function(t, e) {
                  return e(), this.texture;
                },
              },
              {
                key: '_getText',
                value: function(t) {
                  var e = this._texts[t];
                  if (!e) {
                    var r = this._context.measureText(t).width;
                    this._x + r > this._size &&
                      ((this._x = 0), (this._y += this._height)),
                      this._context.fillText(t, this._x, this._y),
                      (this._texts[t] = e = {
                        width: r,
                        height: this._height,
                        left: this._x / this._size,
                        right: (this._x + r) / this._size,
                        top: this._y / this._size,
                        bottom: (this._y + this._height) / this._size,
                      }),
                      (this._x += r);
                  }
                  return e;
                },
              },
              {
                key: 'get',
                value: function(t, e, r) {
                  var n = this._getText(t),
                    i = e <= 0.5 ? 0 : -n.width,
                    o = r <= 0.5 ? 0 : -n.height;
                  return [
                    {
                      width: n.width,
                      height: n.height,
                      left: n.left,
                      right: n.right,
                      top: n.top,
                      bottom: n.bottom,
                      dx: i,
                      dy: o,
                    },
                  ];
                },
              },
              {
                key: 'steps',
                value: function(t) {
                  return 1;
                },
              },
              {
                key: 'bind',
                value: function() {
                  this._gl.bindTexture(this._gl.TEXTURE_2D, this.texture),
                    this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, !1),
                    this._gl.texParameteri(
                      this._gl.TEXTURE_2D,
                      this._gl.TEXTURE_MAG_FILTER,
                      this._gl.NEAREST
                    ),
                    this._gl.texParameteri(
                      this._gl.TEXTURE_2D,
                      this._gl.TEXTURE_MIN_FILTER,
                      this._gl.NEAREST
                    ),
                    this._gl.texImage2D(
                      this._gl.TEXTURE_2D,
                      0,
                      this._gl.RGBA,
                      this._gl.RGBA,
                      this._gl.UNSIGNED_BYTE,
                      this._canvas
                    ),
                    this._gl.bindTexture(this._gl.TEXTURE_2D, null);
                },
              },
              {
                key: 'remove',
                value: function() {
                  this._context && this._el.parentNode.removeChild(this._el);
                },
              },
              {
                key: 'fontSize',
                get: function() {
                  return this._height - 1;
                },
              },
            ]) && Ee(e.prototype, r),
            n && Ee(e, n),
            t
          );
        })(),
        Se = r(1),
        Te = r.n(Se);
      function Ae(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var ze = 1024,
        ke = (function() {
          function t(e, r) {
            !(function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this.width = ze),
              (this.height = ze),
              (this._resetCache = r),
              (this.bin = new Te.a(this.width, this.height)),
              (this.index = {}),
              (this.ids = {}),
              (this.gl = e),
              (this.data = new Uint8Array(this.width * this.height));
          }
          var e, r, n;
          return (
            (e = t),
            (r = [
              {
                key: '_createTexture',
                value: function() {
                  this.dirty = !1;
                  var t = this.gl,
                    e = t.createTexture();
                  return (
                    t.bindTexture(t.TEXTURE_2D, e),
                    t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MAG_FILTER,
                      t.LINEAR
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MIN_FILTER,
                      t.LINEAR
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_WRAP_S,
                      t.CLAMP_TO_EDGE
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_WRAP_T,
                      t.CLAMP_TO_EDGE
                    ),
                    t.texImage2D(
                      t.TEXTURE_2D,
                      0,
                      t.ALPHA,
                      this.width,
                      this.height,
                      0,
                      t.ALPHA,
                      t.UNSIGNED_BYTE,
                      this.data
                    ),
                    t.bindTexture(t.TEXTURE_2D, null),
                    e
                  );
                },
              },
              {
                key: 'getGlyphs',
                value: function() {
                  var t,
                    e,
                    r,
                    n = {};
                  for (var i in this.ids)
                    (e = (t = i.split('#'))[0]),
                      (r = t[1]),
                      n[e] || (n[e] = []),
                      n[e].push(r);
                  return n;
                },
              },
              {
                key: 'getRects',
                value: function() {
                  var t,
                    e,
                    r,
                    n = {};
                  for (var i in this.ids)
                    (e = (t = i.split('#'))[0]),
                      (r = t[1]),
                      n[e] || (n[e] = {}),
                      (n[e][r] = this.index[i]);
                  return n;
                },
              },
              {
                key: 'addGlyph',
                value: function(t, e, r, n, i, o) {
                  if (!r) return null;
                  var s = ''.concat(e, '#').concat(r.id);
                  if (this.index[s])
                    return (
                      this.ids[s].indexOf(t) < 0 && this.ids[s].push(t),
                      this.index[s]
                    );
                  var a = r.width + 2 * n,
                    h = r.height + 2 * n,
                    u = Math.floor(Math.pow(Math.ceil(i / 7), 2)),
                    c = a + 2 * u,
                    f = h + 2 * u;
                  (c += 4 - (c % 4)), (f += 4 - (f % 4));
                  var l = this.bin.packOne(c, f);
                  if (
                    (l ||
                      (this.resize(), (l = this.bin.packOne(c, f)), o && o()),
                    !l)
                  )
                    return null;
                  if (((this.index[s] = l), (this.ids[s] = [t]), r.bitmap))
                    for (var d = this.data, v = r.bitmap, g = 0; g < h; g++)
                      for (
                        var m = this.width * (l.y + g + u) + l.x + u,
                          p = a * g,
                          y = 0;
                        y < a;
                        y++
                      )
                        d[m + y] = v[p + y];
                  return (this.dirty = !0), l;
                },
              },
              {
                key: 'resize',
                value: function() {
                  var t = this.width,
                    e = this.height;
                  if (!(t >= 2048 || e >= 2048)) {
                    this._texture &&
                      (this.gl && this.gl.deleteTexture(this._texture),
                      (this._texture = null)),
                      (this.width *= 4),
                      (this.height *= 4),
                      this.bin.resize(this.width, this.height);
                    for (
                      var r = new ArrayBuffer(this.width * this.height), n = 0;
                      n < e;
                      n++
                    ) {
                      var i = new Uint8Array(this.data.buffer, e * n, t);
                      new Uint8Array(r, e * n * 4, t).set(i);
                    }
                    (this.data = new Uint8Array(r)), this._resetCache();
                  }
                },
              },
              { key: 'bind', value: function(t) {} },
              {
                key: 'updateTexture',
                value: function() {
                  var t = this.gl;
                  return (
                    this._texture || (this._texture = this._createTexture()),
                    this.dirty &&
                      (t.bindTexture(t.TEXTURE_2D, this._texture),
                      t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1),
                      t.texSubImage2D(
                        t.TEXTURE_2D,
                        0,
                        0,
                        0,
                        this.width,
                        this.height,
                        t.ALPHA,
                        t.UNSIGNED_BYTE,
                        this.data
                      ),
                      t.bindTexture(t.TEXTURE_2D, null),
                      (this.dirty = !1)),
                    this._texture
                  );
                },
              },
              {
                key: 'texture',
                get: function() {
                  return this._texture;
                },
              },
            ]) && Ae(e.prototype, r),
            n && Ae(e, n),
            t
          );
        })();
      function Re(t) {
        return (
          (function(t) {
            if (Array.isArray(t)) {
              for (var e = 0, r = new Array(t.length); e < t.length; e++)
                r[e] = t[e];
              return r;
            }
          })(t) ||
          (function(t) {
            if (
              Symbol.iterator in Object(t) ||
              '[object Arguments]' === Object.prototype.toString.call(t)
            )
              return Array.from(t);
          })(t) ||
          (function() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance'
            );
          })()
        );
      }
      function Ce(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var Pe = (function() {
        function t(e) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this.buffer = null == e ? 0 : e);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: '_findRowBounds',
              value: function(t) {
                for (var e = 0, r = 0, n = 0; n < t.length; n++)
                  if (t[n] > 170) {
                    e = n;
                    break;
                  }
                e || (e = t.length);
                for (var i = t.length; i > -1; i--)
                  if (t[i] > 170) {
                    r = i;
                    break;
                  }
                return r || (r = -1), [e, r];
              },
            },
            {
              key: '_findGlyphBounds',
              value: function(t) {
                for (
                  var e = t.bitmap,
                    r = t.width,
                    n = [],
                    i = [],
                    o = [],
                    s = (e.length, 0);
                  s < e.length;
                  s += r
                ) {
                  n = e.slice(s, s + r);
                  var a = this._findRowBounds(n);
                  i.push(a[0]), o.push(a[1]);
                }
                return [Math.min.apply(Math, i), Math.max.apply(Math, o)];
              },
            },
            {
              key: 'process',
              value: function(t) {
                for (
                  var e = t.bitmap,
                    r = t.width,
                    n = this._findGlyphBounds(t),
                    i = n[0],
                    o = n[1],
                    s = this.buffer,
                    a = [],
                    h = o - i + 1 + 2 * s,
                    u = [],
                    c = 0;
                  c < e.length;
                  c += r
                ) {
                  u = e.slice(c, c + r);
                  var f = Array.apply(null, Array(s)).map(
                    Number.prototype.valueOf,
                    0
                  );
                  a.push.apply(a, Re(f).concat(Re(u.slice(i, o + 1)), Re(f)));
                }
                (t.bitmap = new Uint8ClampedArray(a)),
                  (t.width = h),
                  (t.advance = h);
              },
            },
          ]) && Ce(e.prototype, r),
          n && Ce(e, n),
          t
        );
      })();
      function Ie(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var Ne = (function() {
        function t() {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
          (this.fontSize = 4 * Math.round(5.75)),
            (this.buffer = this.fontSize / 8),
            (this.radius = this.fontSize / 3),
            (this.cutoff = 0.25),
            (this.fontFamily = 'sans-serif'),
            (this.fontWeight = 'normal');
          var e = (this.size = this.fontSize + 2 * this.buffer);
          (this.canvas = document.createElement('canvas')),
            (this.canvas.width = this.canvas.height = e),
            (this.ctx = this.canvas.getContext('2d')),
            (this.ctx.font =
              this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily),
            (this.ctx.textBaseline = 'middle'),
            (this.ctx.fillStyle = 'black'),
            (this.middle = Math.round(
              (e / 2) * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1)
            )),
            (this.gridOuter = new Float64Array(e * e)),
            (this.gridInner = new Float64Array(e * e)),
            (this.f = new Float64Array(e)),
            (this.d = new Float64Array(e)),
            (this.z = new Float64Array(e + 1)),
            (this.v = new Int16Array(e)),
            (this.trimmer = new Pe(0)),
            (this.count = 1);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: '_makeRGBAImageData',
              value: function(t, e, r) {
                for (
                  var n = this.ctx.createImageData(e, r), i = n.data, o = 0;
                  o < t.length;
                  o++
                )
                  (i[4 * o + 0] = t[o]),
                    (i[4 * o + 1] = t[o]),
                    (i[4 * o + 2] = t[o]),
                    (i[4 * o + 3] = 255);
                return n;
              },
            },
            {
              key: 'draw',
              value: function(t) {
                this.ctx.clearRect(0, 0, this.size, this.size),
                  this.ctx.fillText(t, this.buffer, this.middle);
                for (
                  var e = this.ctx.getImageData(0, 0, this.size, this.size),
                    r = new Uint8ClampedArray(this.size * this.size),
                    n = 0;
                  n < this.size * this.size;
                  n++
                ) {
                  var i = e.data[4 * n + 3] / 255;
                  (this.gridOuter[n] =
                    1 === i
                      ? 0
                      : 0 === i
                      ? 1e20
                      : Math.pow(Math.max(0, 0.5 - i), 2)),
                    (this.gridInner[n] =
                      1 === i
                        ? 1e20
                        : 0 === i
                        ? 0
                        : Math.pow(Math.max(0, i - 0.5), 2));
                }
                this._edt(
                  this.gridOuter,
                  this.size,
                  this.size,
                  this.f,
                  this.d,
                  this.v,
                  this.z
                ),
                  this._edt(
                    this.gridInner,
                    this.size,
                    this.size,
                    this.f,
                    this.d,
                    this.v,
                    this.z
                  );
                for (var o = 0; o < this.size * this.size; o++) {
                  var s = this.gridOuter[o] - this.gridInner[o];
                  r[o] = Math.max(
                    0,
                    Math.min(
                      255,
                      Math.round(255 - 255 * (s / this.radius + this.cutoff))
                    )
                  );
                }
                var a = {
                  id: t.charCodeAt(0),
                  bitmap: r,
                  left: 0,
                  top: 0,
                  width: this.size,
                  height: this.size,
                  advance: 4,
                };
                if (
                  (32 !== a.id && this.trimmer.process(a),
                  65 == a.id && this.count)
                ) {
                  for (
                    var h = a.bitmap, u = a.width, c = [], f = 0;
                    f < h.length;
                    f += u
                  )
                    c.push(Array.from(h.slice(f, f + u)));
                  this.count--;
                }
                return a;
              },
            },
            {
              key: '_edt',
              value: function(t, e, r, n, i, o, s) {
                for (var a = 0; a < e; a++) {
                  for (var h = 0; h < r; h++) n[h] = t[h * e + a];
                  this._edt1d(n, i, o, s, r);
                  for (var u = 0; u < r; u++) t[u * e + a] = i[u];
                }
                for (var c = 0; c < r; c++) {
                  for (var f = 0; f < e; f++) n[f] = t[c * e + f];
                  this._edt1d(n, i, o, s, e);
                  for (var l = 0; l < e; l++) t[c * e + l] = Math.sqrt(i[l]);
                }
              },
            },
            {
              key: '_edt1d',
              value: function(t, e, r, n, i) {
                (r[0] = 0), (n[0] = -1e20), (n[1] = 1e20);
                for (var o = 1, s = 0; o < i; o++) {
                  for (
                    var a =
                      (t[o] + o * o - (t[r[s]] + r[s] * r[s])) /
                      (2 * o - 2 * r[s]);
                    a <= n[s];

                  )
                    s--,
                      (a =
                        (t[o] + o * o - (t[r[s]] + r[s] * r[s])) /
                        (2 * o - 2 * r[s]));
                  (r[++s] = o), (n[s] = a), (n[s + 1] = 1e20);
                }
                for (var h = 0, u = 0; h < i; h++) {
                  for (; n[u + 1] < h; ) u++;
                  e[h] = (h - r[u]) * (h - r[u]) + t[r[u]];
                }
              },
            },
          ]) && Ie(e.prototype, r),
          n && Ie(e, n),
          t
        );
      })();
      function Fe(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function Le(t, e) {
        if (!(t instanceof e))
          throw new TypeError('Cannot call a class as a function');
      }
      var qe = function t(e, r, n) {
          Le(this, t);
          (this.advance = e.advance),
            (this.left = e.left - n - 1),
            (this.top = e.top + n + 1),
            (this.rect = r);
        },
        Be = 512,
        De = (function() {
          function t(e, r, n) {
            var i = this;
            Le(this, t),
              (this.width = Be),
              (this.height = Be),
              this.clear(),
              (this._files = r),
              (this._gl = e),
              (this.atlas = new ke(this._gl, function() {
                i._cachedGlyphs = {};
              })),
              (this._glyphs = {}),
              (this._rects = {}),
              (this._cachedGlyphs = {}),
              (this.spriteGenerator = new Ne());
          }
          var e, r, n;
          return (
            (e = t),
            (r = [
              { key: 'clear', value: function() {} },
              {
                key: 'setFont',
                value: function(t) {
                  this.curFont = t.pbf;
                },
              },
              {
                key: 'getTexture',
                value: function(t, e) {
                  for (var r = 0; r < 128; r++)
                    this._getChar(String.fromCharCode(r));
                  return e && e.apply(this, arguments), this.atlas.texture;
                },
              },
              {
                key: '_getChar',
                value: function(t, e) {
                  var r = this.curFont,
                    n = t.charCodeAt(0),
                    i = this._cachedGlyphs[r] || (this._cachedGlyphs[r] = {}),
                    o = (i[n] && i[n].glyph) || this.spriteGenerator.draw(t),
                    s = this.spriteGenerator.fontSize;
                  this._rects[r] || (this._rects[r] = {});
                  var a = (this._rects[r][t] = this.atlas.addGlyph(
                    n,
                    this.curFont,
                    o,
                    0,
                    s,
                    e
                  ));
                  return i[n] || (i[n] = new qe(o, a, 0));
                },
              },
              {
                key: 'get',
                value: function(t, e, r, n) {
                  for (var i = 0, o = 0, s = 0; s < t.length; s++) {
                    var a = this._getChar(t[s], n),
                      h = a.rect || {};
                    (o = Math.max(o, h.h - a.top)), (i += a.advance + 3);
                  }
                  for (
                    var u = e <= 0.5 ? 0 : -i,
                      c = r <= 0.5 ? 0 : -o,
                      f = [],
                      l = 0;
                    l < t.length;
                    l++
                  ) {
                    var d = this._getChar(t[l], n),
                      v = d.rect || {};
                    (u += 3),
                      f.push({
                        width: v.w,
                        height: v.h,
                        left: v.x / this.atlas.width,
                        right: (v.x + v.w) / this.atlas.width,
                        bottom: (v.y + v.h) / this.atlas.height,
                        top: v.y / this.atlas.height,
                        dx: u,
                        dy: c + d.top + (o - v.h),
                      }),
                      (u += d.advance);
                  }
                  return f;
                },
              },
              {
                key: 'steps',
                value: function(t) {
                  return t.length;
                },
              },
              {
                key: 'bind',
                value: function() {
                  this.atlas.updateTexture(this._gl);
                },
              },
              {
                key: 'isSDF',
                get: function() {
                  return !0;
                },
              },
              {
                key: 'fontSize',
                get: function() {
                  return 24;
                },
              },
            ]) && Fe(e.prototype, r),
            n && Fe(e, n),
            t
          );
        })();
      function Oe(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var Ue = (function() {
        function t(e, r, n) {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._gl = e),
            (this._modules = {
              default: new Me(e, r, n),
              sdf: new De(e, r, n),
            });
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'clear',
              value: function() {
                for (var t in this._modules) this._modules[t].clear();
              },
            },
            {
              key: 'isSDF',
              value: function(t) {
                return !(!c.isObject(t) || 'sdf' !== t.type);
              },
            },
            {
              key: 'getEngine',
              value: function(t) {
                return this.isSDF(t)
                  ? this._modules.sdf
                  : this._modules.default;
              },
            },
            {
              key: 'bind',
              value: function() {
                for (var t in this._modules) this._modules[t].bind();
              },
            },
            {
              key: 'remove',
              value: function() {
                for (var t in this._modules)
                  this._modules[t].remove && this._modules[t].remove();
              },
            },
          ]) && Oe(e.prototype, r),
          n && Oe(e, n),
          t
        );
      })();
      function Ve(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      var je = (function() {
        function t() {
          !(function(t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this._enable = !0);
        }
        var e, r, n;
        return (
          (e = t),
          (r = [
            {
              key: 'debounce',
              value: function(t, e, r) {
                var n,
                  i,
                  o,
                  s,
                  a,
                  h = this,
                  u = arguments,
                  c = function u() {
                    var c = Date.now - s;
                    c < e && c > 0
                      ? (n = setTimeout(u, e - c))
                      : ((n = null),
                        r ||
                          (h._enable && (a = t.apply(o, i)),
                          n || (o = i = null)));
                  };
                return function() {
                  (o = h), (i = u), (s = Date.now);
                  var f = r && !n;
                  return (
                    n || (n = setTimeout(c, e)),
                    f && (h._enable && (a = t.apply(o, i)), (o = i = null)),
                    a
                  );
                };
              },
            },
            {
              key: 'disable',
              value: function() {
                this._enable = !1;
              },
            },
          ]) && Ve(e.prototype, r),
          n && Ve(e, n),
          t
        );
      })();
      function Xe(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function Ye(t, e) {
        t.indexOf(e) >= 0 || t.push(e);
      }
      var Ge = (function() {
          function t(e, r, n, i, o, s) {
            var a = this;
            !(function(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this._layers = e),
              (this._insertTempLayer = r),
              (this._draw = n),
              (this._nodes = i),
              (this._edges = o),
              (this._checkUniqId = s),
              (this._toAddEdges = []),
              (this._toAddNodes = []),
              (this._toRemoveEdges = []),
              (this._toRemoveNodes = []),
              (this._nPos = {}),
              (this._ePos = {}),
              (this._eDirs = {}),
              i.forEach(function(t, e) {
                (a._nPos[t.uniqid] = e), (a._eDirs[t.uniqid] = {});
              }),
              o.forEach(function(t, e) {
                var r = kt.edgeSource(t),
                  n = kt.edgeTarget(t),
                  i = r.uniqid || r.__uniqid,
                  o = n.uniqid || n.__uniqid;
                ((a._eDirs[i] || (a._eDirs[i] = {}))[o] = t),
                  (a._ePos[t.uniqid] = e);
              }),
              (this._actualTempNodes = []),
              (this._actualTempEdges = []);
          }
          var e, r, n;
          return (
            (e = t),
            (r = [
              {
                key: '_doRemoveNodes',
                value: function(t) {
                  var e = this;
                  t.forEach(function(t) {
                    if (void 0 !== t.uniqid) {
                      if (void 0 !== e._nPos[t.uniqid]) {
                        var r = e._nPos[t.uniqid];
                        e._layers.main.removeNodeAtPos(r),
                          delete e._nPos[t.uniqid];
                      } else
                        for (var n = 0; n < e._actualTempNodes.length; n++)
                          if (e._actualTempNodes[n] === t) {
                            e._actualTempNodes.splice(n, 1);
                            break;
                          }
                      (t.__uniqid = t.uniqid), delete t.uniqid;
                    }
                  });
                },
              },
              {
                key: '_doRemoveEdges',
                value: function(t) {
                  var e = this;
                  t.forEach(function(t) {
                    if (void 0 !== t.uniqid) {
                      var r = kt.edgeSource(t),
                        n = kt.edgeTarget(t);
                      if (
                        (delete (e._eDirs[r.uniqid || r.__uniqid] || {})[
                          n.uniqid || n.__uniqid
                        ],
                        void 0 !== e._ePos[t.uniqid])
                      ) {
                        var i = e._ePos[t.uniqid];
                        e._layers.main.removeEdgeAtPos(i),
                          delete e._ePos[t.uniqid];
                      } else
                        for (var o = 0; o < e._actualTempEdges.length; o++)
                          if (e._actualTempEdges[o] === t) {
                            e._actualTempEdges.splice(o, 1);
                            break;
                          }
                      (t.__uniqid = t.uniqid), delete t.uniqid;
                    }
                  });
                },
              },
              {
                key: '_doAddEdges',
                value: function() {
                  var t = this;
                  this._toAddEdges.forEach(function(e) {
                    if (
                      (void 0 !== t._ePos[e.uniqid] && t._doRemoveEdges([e]),
                      void 0 !== e.uniqid)
                    )
                      return (
                        console.error(e),
                        void console.error(
                          'This edge has been already added, if you want to add same edge twice, create new object with same properties'
                        )
                      );
                    t._checkUniqId(e), Ye(t._actualTempEdges, e);
                  });
                },
              },
              {
                key: '_doAddNodes',
                value: function(t) {
                  var e = this;
                  this._toAddNodes.forEach(function(t) {
                    if (
                      (void 0 !== e._nPos[t.uniqid] && e._doRemoveNodes([t]),
                      void 0 !== t.uniqid)
                    )
                      return (
                        console.error(t),
                        void console.error(
                          'This node has been already added, if you want to add same node twice, create new object with same properties'
                        )
                      );
                    e._checkUniqId(t),
                      (e._eDirs[t.uniqid] = {}),
                      Ye(e._actualTempNodes, t);
                  });
                },
              },
              {
                key: 'addEdge',
                value: function(t) {
                  var e = kt.edgeSource(t),
                    r = kt.edgeTarget(t),
                    n = r.uniqid || r.__uniqid,
                    i = e.uniqid || e.__uniqid;
                  return (
                    (this._eDirs[i] || {})[n] && this._doRemoveEdges([t]),
                    (this._eDirs[n] || {})[i]
                      ? (this._toAddEdges.push(this._eDirs[n][i]),
                        this._doRemoveEdges([this._eDirs[n][i]]),
                        this._toAddEdges.push((this._eDirs[i][n] = t)),
                        this)
                      : (this._toAddEdges.push(t), this)
                  );
                },
              },
              {
                key: 'addNode',
                value: function(t) {
                  return this._toAddNodes.push(t), this;
                },
              },
              {
                key: 'removeNode',
                value: function(t) {
                  return this._toRemoveNodes.push(t), this;
                },
              },
              {
                key: 'removeEdge',
                value: function(t) {
                  return this._toRemoveEdges.push(t), this;
                },
              },
              {
                key: 'applyChanges',
                value: function() {
                  return 0 === this._toRemoveEdges.length &&
                    0 === this._toRemoveNodes.length &&
                    0 === this._toAddEdges.length &&
                    0 === this._toAddNodes.length
                    ? this
                    : ((this._actualTempNodes = this._layers.temp
                        ? this._layers.temp.nodes
                        : []),
                      (this._actualTempEdges = this._layers.temp
                        ? this._layers.temp.edges
                        : []),
                      this._doRemoveEdges(this._toRemoveEdges),
                      this._doRemoveNodes(this._toRemoveNodes),
                      this._doAddNodes(),
                      this._doAddEdges(),
                      (this._toAddEdges = []),
                      (this._toAddNodes = []),
                      (this._toRemoveEdges = []),
                      (this._toRemoveNodes = []),
                      this._insertTempLayer(),
                      this._layers.temp.set(
                        this._actualTempNodes,
                        this._actualTempEdges
                      ),
                      this._draw(),
                      this);
                },
              },
            ]) && Xe(e.prototype, r),
            n && Xe(e, n),
            t
          );
        })(),
        $e = document.createElement('canvas');
      function We(t) {
        var e = { depth: !1, antialias: !1 };
        return (
          t.getContext('webgl', e) || t.getContext('experimental-webgl', e)
        );
      }
      var He = 0;
      function Ze(t) {
        void 0 !== t.__uniqid
          ? ((t.uniqid = t.__uniqid), delete t.__uniqid)
          : void 0 === t.uniqid && (t.uniqid = ++He);
      }
      function Ke(t, e, r) {
        var n = [];
        n.length = t.length + e.length;
        for (var i = 0, o = 0, s = 0; i < t.length && o < e.length; )
          r(t[i], e[o]) < 0 ? (n[s++] = t[i++]) : (n[s++] = e[o++]);
        for (; i < t.length; ) n[s++] = t[i++];
        for (; o < e.length; ) n[s++] = e[o++];
        return n;
      }
      var Je = function(t, e) {
        var r = this,
          i = this;
        t = t || $e;
        var s = (e.styles.background = e.styles.background || {}),
          a = new n(s.color || 'rgb(255, 255, 255)'),
          h = !1,
          u = !1,
          f = (e.styles.node = e.styles.node || {});
        if (
          ((f.minSize = null != f.minSize ? f.minSize : 6),
          (f.maxSize = f.maxSize || 16),
          (f.color = f.color || 'rgb(255, 255, 255)'),
          f.label)
        ) {
          var d = f.label;
          (d.color = d.color || 'rgb(120, 120, 120)'),
            (d.font = d.font || {
              type: 'Arial, Helvetica, sans-serif',
              size: 11,
            });
        }
        var v = (e.styles.edge = e.styles.edge || { arrow: {} });
        (v.width = v.width || 1),
          (v.color = v.color || 'rgb(204, 204, 204)'),
          (v.animateColor = v.animateColor || 'rgb(240, 80, 120)'),
          (v.animateSpeed = v.animateSpeed || 1);
        var g = function() {
          (e.onLoad && !e.onLoad()) || r.draw(!0);
        };
        if (v.arrow && void 0 !== v.arrow.texture) {
          var m = v.arrow;
          (m.minSize = null != m.minSize ? m.minSize : 6),
            (m.maxSize = m.maxSize || 12),
            (m.aspect = 1);
        }
        var p,
          y,
          x,
          w,
          b,
          _,
          E = new je(),
          M = {},
          S = {};
        this.cntShownNodes = function() {
          var t = 0;
          for (var e in M) t += M[e].cntShownNodes();
          return t;
        };
        var T = e.getNodesCnt || this.cntShownNodes;
        this.cntShownEdges = function() {
          var t = 0;
          for (var e in M) t += M[e].cntShownEdges();
          return t;
        };
        var A,
          z,
          k = e.getEdgesCnt || this.cntShownEdges,
          R = E.debounce(function() {
            return i.draw.call(i), !1;
          }, 5);
        function C() {
          return (
            !!h &&
            (console.error('Cannot call any function on graph after remove()'),
            !0)
          );
        }
        function P() {
          M.temp ||
            (M.temp = new ye(
              t,
              S,
              p,
              y,
              w,
              b,
              _,
              E,
              e,
              a,
              f,
              v,
              F,
              L,
              q,
              B,
              T,
              k,
              R,
              g
            ));
        }
        var I = void 0;
        function N() {
          return I || (I = new Ge(M, P, x, A, z, Ze)), I;
        }
        (this.set = function(t, n, o) {
          var s =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
          if (C()) return r;
          (z = n || []), (A = t || []).forEach(Ze), z.forEach(Ze);
          var a = [];
          return (
            'undefined' != typeof ccNetVizPlugins &&
              (void 0 !== ccNetVizPlugins.node &&
                (a = ccNetVizPlugins.node.Integration(e, i).shapes),
              void 0 !== ccNetVizPlugins.arrow &&
                (a = a.concat(ccNetVizPlugins.arrow.Integration(e, i).shapes))),
            Promise.all(
              a.map(function(t) {
                return t.config;
              })
            ).then(function(t) {
              t.map(function(t, r) {
                'arrow' === t.plugin
                  ? (e.styles[a[r].name].arrow = t)
                  : (e.styles[a[r].name] = t);
              }),
                M.temp && M.temp.set([], [], o, s),
                M.main.set(A, z, o, s);
            }),
            (I = void 0),
            (u = !0),
            r
          );
        }),
          (this.reflow = function() {
            if (!C()) {
              N().applyChanges();
              var t = M.main.getVisibleNodes();
              M.temp && (t = t.concat(M.temp.getVisibleNodes()));
              var e = M.main.getVisibleEdges();
              M.temp && (e = e.concat(M.temp.getVisibleEdges())),
                r.set(t, e),
                r.draw();
            }
          }),
          (this.removeNode = function(t) {
            return C() ? r : (N().removeNode(t), r);
          }),
          (this.removeEdge = function(t) {
            return C() ? r : (N().removeEdge(t), r);
          }),
          (this.addEdge = function(t) {
            return C() ? r : (N().addEdge(t), r);
          }),
          (this.addNode = function(t) {
            return C() ? r : (N().addNode(t), r);
          }),
          (this.updateNode = function(t) {
            return C() ? r : r.removeNode(t).addNode(t);
          }),
          (this.updateEdge = function(t) {
            return C() ? r : r.removeEdge(t).addEdge(t);
          }),
          (this.applyChanges = function() {
            return C() ? r : (N().applyChanges(), r);
          }),
          (this.addEdges = function(t) {
            return C()
              ? r
              : (t.forEach(function(t) {
                  r.addEdge(t);
                }),
                r);
          }),
          (this.addNodes = function(t) {
            return C()
              ? r
              : (t.forEach(function(t) {
                  r.addNode(t);
                }),
                r);
          }),
          (this.removeEdges = function(t) {
            return C()
              ? r
              : (t.forEach(function(t) {
                  r.removeEdge(t);
                }),
                r);
          }),
          (this.removeNodes = function(t) {
            return C()
              ? r
              : (t.forEach(function(t) {
                  r.removeNode(t);
                }),
                r);
          }),
          (this.updateNodes = function(t) {
            return C()
              ? r
              : (t.forEach(function(t) {
                  r.updateNode(t);
                }),
                r);
          }),
          (this.updateEdges = function(t) {
            return C()
              ? r
              : (t.forEach(function(t) {
                  r.updateEdge(t);
                }),
                r);
          });
        var F = function(t, e, r, n) {
            var i = (n * Math.sqrt((t.width * t.height) / (r + 1))) / p.size;
            if (e) {
              var o = e.size ? e.size : e.minSize,
                s = e.size ? e.size : e.maxSize;
              if ((i = s ? Math.min(s, i) : i) < e.hideSize) return 0;
              i = o ? Math.max(o, i) : i;
            }
            return i;
          },
          L = function(t) {
            return F(t, t.style, T(), 0.4);
          },
          q = function(t, e) {
            return F(t, e, T(), 0.25);
          },
          B = function(t, e) {
            if (e) {
              var r,
                n = M.main.cntShownNodes(),
                i = 0.25 * Math.sqrt((t.width * t.height) / (n + 1));
              if (e.hideSize)
                return (
                  (r = i / e.hideSize),
                  e.maxSize && (r = Math.min(r, i / e.maxSize)),
                  r
                );
            }
            return 1;
          },
          D = 0.5 * f.maxSize;
        (this.draw = function(e) {
          if ((!e || (!h && u)) && !C()) {
            var r = t.width,
              n = t.height,
              i = r / n,
              s = 1 === p.size ? D : 0,
              a = s / r,
              c = s / n;
            (S.transform = o.ortho(
              p.x - a,
              p.x + p.size + a,
              p.y - c,
              p.y + p.size + c,
              -1,
              1
            )),
              (S.offsetX = a),
              (S.offsetY = c),
              (S.width = 0.5 * r),
              (S.height = 0.5 * n),
              (S.aspect2 = i * i),
              (S.aspect = i),
              (S.count = T()),
              S.style && delete S.style,
              (S.curveExc = F(S, void 0, k(), 0.5)),
              (S.style = f),
              (S.nodeSize = L(S)),
              y && y.viewport(0, 0, r, n),
              y && y.clear(y.COLOR_BUFFER_BIT);
            var l = Date.now(),
              d = function() {
                for (var t = 0; t < M.main.scene.elements.length; t++)
                  M.main.scene.elements[t].draw(S),
                    M.temp && M.temp.scene.elements[t].draw(S);
              };
            v.animateType && 'none' !== v.animateType
              ? (function t() {
                  (S.renderTime = (Date.now() - l) / 1e3),
                    d(),
                    requestAnimationFrame(t);
                })()
              : d();
          }
        }),
          (x = this.draw.bind(this)),
          (this.getScreenCoords = function(e) {
            if (!C()) {
              var r = {},
                n = t.getBoundingClientRect();
              return (
                void 0 !== e.x &&
                  (r.x =
                    ((e.x - p.x + S.offsetX) / (p.size + 2 * S.offsetX)) *
                      t.width +
                    n.left),
                void 0 !== e.y &&
                  (r.y =
                    (1 - (e.y - p.y + S.offsetY) / (p.size + 2 * S.offsetY)) *
                      t.height +
                    n.top),
                r
              );
            }
          }),
          (this.getLayerCoords = function(e) {
            if (!C()) {
              var r = {};
              if (
                (['x', 'x1', 'x2'].forEach(function(n) {
                  if (void 0 !== e[n]) {
                    var i = e[n];
                    (i =
                      (i / t.width) * (p.size + 2 * S.offsetX) -
                      S.offsetX +
                      p.x),
                      (r[n] = i);
                  }
                }),
                ['y', 'y1', 'y2'].forEach(function(n) {
                  if (void 0 !== e[n]) {
                    var i = e[n];
                    (i =
                      (1 - i / t.height) * (p.size + 2 * S.offsetY) -
                      S.offsetY +
                      p.y),
                      (r[n] = i);
                  }
                }),
                void 0 !== e.radius)
              ) {
                var n = e.radius,
                  i = n / t.height,
                  o = n / t.width;
                (n = Math.max(i, o) * p.size), (r.radius = n);
              }
              return r;
            }
          });
        var O = function(t, e) {
          if (!C() && y) {
            var r = M.main[t].apply(M.main, e);
            if (!M.temp) return r;
            var n = M.temp[t].apply(M.temp, e),
              i = {};
            for (var o in r)
              i[o] = Ke(r[o], n[o], function(t, e) {
                return t.dist2 - e.dist2;
              });
            return i;
          }
        };
        (this.find = function() {
          return O('find', arguments);
        }),
          (this.findArea = function() {
            return O('findArea', arguments);
          }),
          (this.getTextPosition = function(t) {
            if (!C() && y) {
              var r = 0.5 * S.nodeSize,
                n = (2 * (t.y <= 0.5 ? 0 : 1) - 1) * r,
                i = l(e.styles[t.style], f, 'label'),
                o = _.getEngine(i.font);
              o.setFont(i.font);
              var s = o.isSDF ? q(S, i.label || {}) : o.fontSize,
                a = s / o.fontSize;
              return (
                0 === s && (a = 0),
                { offsetY: n, fontScale: a, chars: o.get(t.label, t.x, t.y) }
              );
            }
          });
        var U,
          V = function(t, r) {
            for (var n in r || {})
              r[n] && t.addEventListener(n, r[n], { passive: e.passiveEvts });
          },
          j = function(t, e) {
            for (var r in e || {}) e[r] && t.removeEventListener(r, e[r]);
          },
          X = function(r) {
            var n = this;
            if (1 !== r.which) return;
            var i = function(t) {
              if (!t.touches) return t;
              for (var e = 0, r = 0, n = 0; n < t.touches.length; n++)
                (e += t.touches[n].clientX), (r += t.touches[n].clientY);
              return (
                (t.clientX = e / t.touches.length),
                (t.clientY = r / t.touches.length),
                t
              );
            };
            r = i(r);
            var o,
              s,
              a,
              h,
              u = t.width / p.size,
              c = t.height / p.size,
              f = r.clientX,
              l = r.clientY,
              d = p.x + f / u,
              v = l / c - p.y,
              g = e.onDrag,
              m = !0,
              y = !1;
            if (2 === (r.touches || []).length) {
              var x = r.touches[0].clientX - r.touches[1].clientX,
                w = r.touches[0].clientY - r.touches[1].clientY;
              (h = Math.sqrt(x * x + w * w)), (y = !0);
            }
            var b = function(t) {
                if (
                  ((t = i(t)).touches && 1 != t.touches.length && (m = !1), o)
                )
                  m &&
                    (s
                      ? g.drag && g.drag(t)
                      : ((p.x = Math.max(
                          0,
                          Math.min(1 - p.size, d - t.clientX / u)
                        )),
                        (p.y = Math.max(
                          0,
                          Math.min(1 - p.size, t.clientY / c - v)
                        )),
                        $(),
                        n.draw()));
                else {
                  var a, h;
                  t.touches && t.touches.length > 0
                    ? ((a = t.touches[0].clientX), (h = t.touches[0].clientY))
                    : ((a = t.clientX), (h = t.clientY));
                  var y = a - f,
                    x = h - l;
                  y * y + x * x > 8 &&
                    ((o = !0), (s = g && g.start(r)) && g.drag && g.drag(t));
                }
                e.passiveEvts || t.preventDefault();
              },
              _ = function(t) {
                (t = i(t)),
                  s && g.stop && g.stop(t),
                  o ||
                    (e.onClick && e.onClick(t),
                    new Date().getTime() - W < 250
                      ? (e.onDblClick && e.onDblClick(t), (W = 0))
                      : (W = new Date().getTime())),
                  j(window, a);
              },
              E = function(t) {
                if ((t = i(t)).touches && 2 == t.touches.length) {
                  var e = t.touches[0].clientX - t.touches[1].clientX,
                    r = t.touches[0].clientY - t.touches[1].clientY,
                    n = Math.sqrt(e * e + r * r);
                  (t.deltaY = 5 * -(n - h)), Y(t), (h = n);
                }
              };
            V(
              window,
              (a = {
                mouseup: _,
                touchend: _,
                touchcancel: _,
                mousemove: y ? E : b,
                touchmove: y ? E : b,
              })
            );
          }.bind(this),
          Y = function r(n) {
            var i = t.getBoundingClientRect();
            e.passiveEvts || n.preventDefault();
            var o, s;
            var a = n.clientX - i.left;
            var h = n.clientY - i.top;
            if (!r.continuosZoom) {
              r.startView = { size: p.size, x: p.x, y: p.y };
              var u = this.getLayerCoords({
                  x1: a - 10,
                  y1: h - 10,
                  x2: a + 10,
                  y2: h - 10,
                }),
                c = this.findArea(u.x1, u.y1, u.x2, u.y2, !0);
              if (c.nodes.length) {
                var f = c.nodes[0],
                  l = this.getScreenCoords({ x: f.node.x, y: f.node.y });
                (r.focusX = l.x), (r.focusY = l.y);
              } else (r.focusX = a), (r.focusY = h);
              (r.oldX = p.x),
                (r.oldY = p.y),
                (r.oldSize = p.size),
                r.continuosZoom && clearTimeout(r.continuosZoom),
                (o = p.x),
                (s = p.y);
            }
            r.continuosZoom = setTimeout(function() {
              r.continuosZoom = void 0;
            }, 200);
            var d = Math.min(
              1,
              p.size * (1 + 0.001 * (n.deltaMode ? 33 : 1) * n.deltaY)
            );
            var v = d - r.oldSize;
            p.size = d;
            p.x = Math.max(
              0,
              Math.min(1 - d, r.oldX - (v * r.focusX) / t.width)
            );
            p.y = Math.max(
              0,
              Math.min(1 - d, r.oldY - v * (1 - r.focusY / t.height))
            );
            if (e.onZoom && !1 === e.onZoom(p))
              return (p.size = void 0), (p.x = o), void (p.y = s);
            $();
            this.draw();
          }.bind(this);
        V(
          t,
          (U = {
            mousedown: X,
            touchstart: X,
            wheel: Y,
            contextmenu: e.onContextMenu,
          })
        ),
          (this.remove = function() {
            if (!C()) {
              for (var e in M) M[e].remove();
              if (y) {
                y.viewport(0, 0, 2 * S.width, 2 * S.height),
                  y.clear(y.COLOR_BUFFER_BIT);
                var r = y.getExtension('WEBGL_lose_context');
                r && r.loseContext();
              }
              j(t, U), E.disable(), _ && _.remove(), (h = !0);
            }
          });
        var G = {};
        function $() {
          var t = !1;
          if (G) for (var r in p) G[r] !== p[r] && (t = !0);
          c.extend(G, p), t && e.onChangeViewport && e.onChangeViewport(p);
        }
        var W = 0;
        (this.image = function() {
          if (!C()) return t.toDataURL();
        }),
          (this.resize = function() {
            C() || ((t.width = t.offsetWidth), (t.height = t.offsetHeight));
          }),
          (this.getViewport = function() {
            return p;
          }),
          (this.setViewport = function(t) {
            C() || (c.extend(p, t), $());
          }),
          (this.resetView = function() {
            return r.setViewport({ size: 1, x: 0, y: 0 });
          }),
          ['update'].forEach(function(t) {
            !(function(t, e) {
              e[t] = function() {
                var r = arguments;
                for (var n in M) {
                  var i = M[n];
                  i[t].apply(i, r);
                }
                return e;
              };
            })(t, i);
          }),
          (y = We(t)) &&
            (y.clearColor(a.r, a.g, a.b, a.a),
            y.blendEquation(y.FUNC_ADD),
            y.blendFuncSeparate(
              y.SRC_ALPHA,
              y.ONE_MINUS_SRC_ALPHA,
              y.ONE,
              y.ONE
            ),
            y.enable(y.BLEND)),
          (p = { size: 1, x: 0, y: 0 }),
          this.resize(),
          (w = new we(E, g)),
          (b = new _e(E, g)),
          (_ = y && new Ue(y, b, w)),
          (M.main = new ye(
            t,
            S,
            p,
            y,
            w,
            b,
            _,
            E,
            e,
            a,
            f,
            v,
            F,
            L,
            q,
            B,
            T,
            k,
            R,
            g
          )),
          y || console.warn('Cannot initialize WebGL context');
      };
      (Je.isWebGLSupported = function() {
        return !!We($e);
      }),
        (Je.color = n),
        (Je.spatialSearch = me),
        (Je.layout = At),
        (Je.color = n),
        (window.ccNetViz = Je);
      e.default = Je;
    },
  ]);
});
//# sourceMappingURL=ccNetViz.js.map
