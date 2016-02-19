/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

ccNetViz = function(canvas, options) {
    options = options || {};
    options.styles = options.styles || {};

    var backgroundStyle = options.styles.background = options.styles.background || {};
    var backgroundColor = new ccNetViz.color(backgroundStyle.color || "rgb(255, 255, 255)");

    var nodeStyle = options.styles.node = options.styles.node || {};
    nodeStyle.minSize = nodeStyle.minSize != null ? nodeStyle.minSize : 6;
    nodeStyle.maxSize = nodeStyle.maxSize || 16;
    nodeStyle.color = nodeStyle.color || "rgb(255, 255, 255)";

    if (nodeStyle.label) {
        var s = nodeStyle.label;
        s.color = s.color || "rgb(120, 120, 120)";
        s.font = s.font || "11px Arial, Helvetica, sans-serif";
    }

    var edgeStyle = options.styles.edge = options.styles.edge || {};
    edgeStyle.width = edgeStyle.width || 1;
    edgeStyle.color = edgeStyle.color || "rgb(204, 204, 204)";

    if (edgeStyle.arrow) {
        var s = edgeStyle.arrow;
        s.minSize = s.minSize != null ? s.minSize : 6;
        s.maxSize = s.maxSize || 12;
        s.aspect = 1;
    }

    var offset = 0.5 * nodeStyle.maxSize;

    this.set = function(nodes, edges, layout) {
        this.nodes = nodes = nodes || [];
        this.edges = edges = edges || [];

        var lines = [], curves = [], circles = [];

        var init = function()  {
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].index = i;
            }
            if (extensions.OES_standard_derivatives) {
                var map = {};
                for (var i = 0; i < edges.length; i++) {
                    var e = edges[i];
                    (map[e.source.index] || (map[e.source.index] = {}))[e.target.index] = true;
                }
                for (var i = 0; i < edges.length; i++) {
                    var target, e = edges[i];

                    if (e.source.index === e.target.index) {
                        target = circles;
                    }
                    else {
                        var m = map[e.target.index];
                        target = m && m[e.source.index] ? curves : lines;
                    }
                    target.push(e);
                }
            }
            else {
                for (var i = 0; i < edges.length; i++) {
                    var e = edges[i];
                    e.source.index !== e.target.index && lines.push(e);
                }
            }
        };

        var normalize = function(a, b)  {
            var x = b.x - a.x;
            var y = b.y - a.y;
            var sc = 1 / Math.sqrt(x*x + y*y);
            return { x: sc * x, y: sc * y };
        };

        init();

        layout && new ccNetViz.layout[layout](nodes, edges).apply() && ccNetViz.layout.normalize(nodes);

        scene.nodes.set(gl, options.styles, textures, nodes.length && !nodes[0].color ? nodes : [], function(style)  {return {
            set: function(v, e, iV, iI)  {
                var x = e.x;
                var y = e.y;
                ccNetViz.primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                ccNetViz.primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            }};}
        );

        scene.nodesColored.set(gl, options.styles, textures, nodes.length && nodes[0].color ? nodes : [], function(style)  {return {
            set: function(v, e, iV, iI)  {
                var x = e.x;
                var y = e.y;
                var c = e.color;
                ccNetViz.primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                ccNetViz.primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
                ccNetViz.primitive.colors(v.color, iV, c, c, c, c);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            }};}
        );

        if (nodeStyle.label) {
            texts.clear();
            scene.labels.set(gl, options.styles, textures, nodes, function(style)  {
                texts.setFont(style.font);
                style.texture = texts.texture;
                return {
                    set: function(v, e, iV, iI)  {
                        var x = e.x;
                        var y = e.y;
                        ccNetViz.primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                        var t = texts.get(e.label);
                        var dx = x <= 0.5 ? 0 : -t.width;
                        var dy = y <= 0.5 ? 0 : -t.height;
                        ccNetViz.primitive.vertices(v.relative, iV, dx, dy, t.width + dx, dy, t.width + dx, t.height + dy, dx, t.height + dy);
                        ccNetViz.primitive.vertices(v.textureCoord, iV, t.left, t.bottom, t.right, t.bottom, t.right, t.top, t.left, t.top);
                        ccNetViz.primitive.quad(v.indices, iV, iI);
                    }}
            });
            texts.bind();
        }

        scene.lines.set(gl, options.styles, textures, lines, function(style)  {return {
            set: function(v, e, iV, iI)  {
                var s = e.source;
                var t = e.target;
                var d = normalize(s, t);
                ccNetViz.primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
                ccNetViz.primitive.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            }};}
        );

        if (extensions.OES_standard_derivatives) {
            scene.curves.set(gl, options.styles, textures, curves, function(style)  {return {
                    numVertices: 3,
                    numIndices: 3,
                    set: function(v, e, iV, iI)  {
                        var s = e.source;
                        var t = e.target;
                        var d = normalize(s, t);
                        ccNetViz.primitive.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
                        ccNetViz.primitive.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
                        ccNetViz.primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0);
                        ccNetViz.primitive.indices(v.indices, iV, iI, 0, 1, 2);
                    }
                };}
            );

            scene.circles.set(gl, options.styles, textures, circles, function(style)  {return {
                    set: function(v, e, iV, iI)  {
                        var s = e.source;
                        var d = s.y < 0.5 ? 1 : -1;
                        ccNetViz.primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
                        ccNetViz.primitive.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
                        ccNetViz.primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
                        ccNetViz.primitive.quad(v.indices, iV, iI);
                    }
                };}
            );
        }

        if (edgeStyle.arrow) {
            var set = function(v, e, iV, iI, dx, dy)  {
                var tx = e.target.x;
                var ty = e.target.y;
                ccNetViz.primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
                ccNetViz.primitive.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
                ccNetViz.primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            };

            scene.lineArrows.set(gl, options.styles, textures, lines, function(style)  {return {
                set: function(v, e, iV, iI)  {
                    var d = normalize(e.source, e.target);
                    set(v, e, iV, iI, d.x, d.y);
                }};}
            );

            if (extensions.OES_standard_derivatives) {
                scene.curveArrows.set(gl, options.styles, textures, curves, function(style)  {return {
                        set: function(v, e, iV, iI)  {return set(v, e, iV, iI, 0.5 * (e.target.x - e.source.x), 0.5 * (e.target.y - e.source.y));}
                    };}
                );

                var dx = Math.cos(0.9);
                var dy = Math.sin(0.9);
                scene.circleArrows.set(gl, options.styles, textures, circles, function(style)  {return {
                        set: function(v, e, iV, iI)  {return set(v, e, iV, iI, e.target.x < 0.5 ? dx : -dx, e.target.y < 0.5 ? -dy : dy);}
                    };}
                );
            }
        }
    }

    this.update = function(element, attribute, data) {
        scene[element].update(gl, attribute, data, function(style)  {return {
            set: function(v, e, iV)  {return ccNetViz.primitive.colors(v, iV, e, e, e, e);}
        };});
    }

    this.draw = function()  {
        var width = canvas.width;
        var height = canvas.height;
        var aspect = width / height;
        var o = view.size === 1 ? offset : 0;
        var ox = o / width;
        var oy = o / height;

        var context = {
            transform: ccNetViz.gl.ortho(view.x - ox, view.x + view.size + ox, view.y - oy, view.y + view.size + oy, -1, 1),
            width: 0.5 * width,
            height: 0.5 * height,
            aspect2: aspect * aspect,
            count: this.nodes.length
        };
        context.curveExc = getSize(context, this.edges.length, 0.5);
        context.style = nodeStyle;
        context.nodeSize = getNodeSize(context);

        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        scene.elements.forEach(function(e)  {return e.draw(context);});
    }.bind(this)

    this.resize = function() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    this.resetView = function() {
        view.size = 1;
        view.x = view.y = 0;
    }

    this.image = function() {
        return canvas.toDataURL();
    }

    this.resize();

    this.nodes = [];
    this.edges = [];

    var view = {};
    this.resetView();

    var gl = getContext();
    var extensions = ccNetViz.gl.initExtensions(gl, "OES_standard_derivatives");
    var textures = new ccNetViz.textures(options.onLoad || this.draw);
    var texts = new ccNetViz.texts(gl);
    var scene = createScene.call(this);

    var getSize = function(c, n, sc)  {
        var result = sc * Math.sqrt(c.width * c.height / n) / view.size;
        var s = c.style;
        if (s) {
            result = s.maxSize ? Math.min(s.maxSize, result) : result;
            result = result < s.hideSize ? 0 : (s.minSize ? Math.max(s.minSize, result) : result);
        }
        return result;
    };
    var getNodeSize = function(c)  {return getSize(c, this.nodes.length, 0.4);}.bind(this);

    var fsColorTexture = [
        "precision mediump float;",
        "uniform vec4 color;",
        "uniform sampler2D texture;",
        "varying vec2 tc;",
        "void main(void) {",
        "   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));",
        "}"
    ];

    var fsVarColorTexture = [
        "precision mediump float;",
        "uniform sampler2D texture;",
        "varying vec2 tc;",
        "varying vec4 c;",
        "void main(void) {",
        "   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));",
        "}"
    ];

    var fsCurve = [
        "#extension GL_OES_standard_derivatives : enable",
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
        "uniform float width;",
        "uniform vec4 color;",
        "varying vec2 c;",
        "void main(void) {",
        "   vec2 px = dFdx(c);",
        "   vec2 py = dFdy(c);",
        "   float fx = 2.0 * c.x * px.x - px.y;",
        "   float fy = 2.0 * c.y * py.x - py.y;",
        "   float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);",
        "   float alpha = 1.0 - abs(sd) / width;",
        "   if (alpha < 0.0) discard;",
        "   gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));",
        "}"
    ];

    scene.add("lines", new ccNetViz.primitive(gl, edgeStyle, null, [
            "attribute vec2 position;",
            "attribute vec2 normal;",
            "uniform vec2 width;",
            "uniform mat4 transform;",
            "varying vec2 n;",
            "void main(void) {",
            "   gl_Position = vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);",
            "   n = normal;",
            "}"
        ], [
            "precision mediump float;",
            "uniform vec4 color;",
            "varying vec2 n;",
            "void main(void) {",
            "   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));",
            "}"
        ], function(c)  {
            gl.uniform2f(c.shader.uniforms.width, c.style.width / c.width, c.style.width / c.height);
            ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        })
    );

    if (extensions.OES_standard_derivatives) {
        scene.add("curves", new ccNetViz.primitive(gl, edgeStyle, null, [
                "attribute vec2 position;",
                "attribute vec2 normal;",
                "attribute vec2 curve;",
                "uniform float exc;",
                "uniform vec2 screen;",
                "uniform float aspect2;",
                "uniform mat4 transform;",
                "varying vec2 c;",
                "void main(void) {",
                "   vec2 n = vec2(normal.x, aspect2 * normal.y);",
                "   float length = length(screen * n);",
                "   n = length == 0.0 ? vec2(0, 0) : n / length;",
                "   gl_Position = vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);",
                "   c = curve;",
                "}"
            ], fsCurve, function(c)  {
                gl.uniform1f(c.shader.uniforms.width, c.style.width);
                gl.uniform1f(c.shader.uniforms.exc, c.curveExc);
                gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
                gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
                ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
            })
        );
        scene.add("circles", new ccNetViz.primitive(gl, edgeStyle, null, [
                "attribute vec2 position;",
                "attribute vec2 normal;",
                "attribute vec2 curve;",
                "uniform vec2 size;",
                "uniform mat4 transform;",
                "varying vec2 c;",
                "void main(void) {",
                "   gl_Position = vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);",
                "   c = curve;",
                "}"
            ], fsCurve, function(c)  {
                gl.uniform1f(c.shader.uniforms.width, c.style.width);
                var size = 2.5 * c.nodeSize;
                gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
                ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
            })
        );
    }

    if (edgeStyle.arrow) {
        var bind = function(c)  {
            var size = getSize(c, this.edges.length, 0.2);
            if (!size) return true;
            gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(c.shader.uniforms.size, size, c.style.aspect * size);
            c.shader.uniforms.exc && gl.uniform1f(c.shader.uniforms.exc, 0.5 * view.size * c.curveExc);
            gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
            c.shader.uniforms.aspect2 && gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
            ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        }.bind(this);
        scene.add("lineArrows", new ccNetViz.primitive(gl, edgeStyle, "arrow", [
                "attribute vec2 position;",
                "attribute vec2 direction;",
                "attribute vec2 textureCoord;",
                "uniform float offset;",
                "uniform vec2 size;",
                "uniform vec2 screen;",
                "uniform float aspect2;",
                "uniform mat4 transform;",
                "varying vec2 tc;",
                "void main(void) {",
                "   vec2 u = direction / length(screen * direction);",
                "   vec2 v = vec2(u.y, -aspect2 * u.x);",
                "   v = v / length(screen * v);",
                "   gl_Position = vec4(size.x * (0.5 - textureCoord.x) * v - size.y * textureCoord.y * u - offset * u, 0, 0) + transform * vec4(position, 0, 1);",
                "   tc = textureCoord;",
                "}"
            ], fsColorTexture, bind)
        );

        if (extensions.OES_standard_derivatives) {
            scene.add("curveArrows", new ccNetViz.primitive(gl, edgeStyle, "arrow", [
                    "attribute vec2 position;",
                    "attribute vec2 direction;",
                    "attribute vec2 textureCoord;",
                    "uniform float offset;",
                    "uniform vec2 size;",
                    "uniform float exc;",
                    "uniform vec2 screen;",
                    "uniform float aspect2;",
                    "uniform mat4 transform;",
                    "varying vec2 tc;",
                    "void main(void) {",
                    "   vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));",
                    "   u = normalize(direction - exc * u / length(screen * u));",
                    "   u = u / length(screen * u);",
                    "   vec2 v = vec2(u.y, -aspect2 * u.x);",
                    "   v = v / length(screen * v);",
                    "   gl_Position = vec4(size.x * (0.5 - textureCoord.x) * v - size.y * textureCoord.y * u - offset * u, 0, 0) + transform * vec4(position, 0, 1);",
                    "   tc = textureCoord;",
                    "}"
                ], fsColorTexture, bind)
            );
            scene.add("circleArrows", new ccNetViz.primitive(gl, edgeStyle, "arrow", [
                    "attribute vec2 position;",
                    "attribute vec2 direction;",
                    "attribute vec2 textureCoord;",
                    "uniform float offset;",
                    "uniform vec2 size;",
                    "uniform vec2 screen;",
                    "uniform mat4 transform;",
                    "varying vec2 tc;",
                    "void main(void) {",
                    "   vec2 u = direction;",
                    "   vec2 v = vec2(direction.y, -direction.x);",
                    "   gl_Position = vec4((size.x * (0.5 - textureCoord.x) * v - size.y * textureCoord.y * u - offset * u) / screen, 0, 0) + transform * vec4(position, 0, 1);",
                    "   tc = textureCoord;",
                    "}"
                ], fsColorTexture, bind)
            );
        }
    }
    scene.add("nodes", new ccNetViz.primitive(gl, nodeStyle, null, [
            "attribute vec2 position;",
            "attribute vec2 textureCoord;",
            "uniform vec2 size;",
            "uniform mat4 transform;",
            "varying vec2 tc;",
            "void main(void) {",
            "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);",
            "   tc = textureCoord;",
            "}"
        ], fsColorTexture, function(c)  {
            var size = getNodeSize(c);
            gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
            ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        })
    );
    scene.add("nodesColored", new ccNetViz.primitive(gl, nodeStyle, null, [
            "attribute vec2 position;",
            "attribute vec2 textureCoord;",
            "attribute vec4 color;",
            "uniform vec2 size;",
            "uniform mat4 transform;",
            "varying vec2 tc;",
            "varying vec4 c;",
            "void main(void) {",
            "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);",
            "   tc = textureCoord;",
            "   c = color;",
            "}"
        ], fsVarColorTexture, function(c)  {
            var size = getNodeSize(c);
            gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
        })
    );
    nodeStyle.label && scene.add("labels", new ccNetViz.primitive(gl, nodeStyle, "label", [
            "attribute vec2 position;",
            "attribute vec2 relative;",
            "attribute vec2 textureCoord;",
            "uniform float offset;",
            "uniform vec2 scale;",
            "uniform mat4 transform;",
            "varying vec2 tc;",
            "void main(void) {",
            "   gl_Position = vec4(scale * (relative + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);",
            "   tc = textureCoord;",
            "}"
        ], fsColorTexture, function(c)  {
            if (!getNodeSize(c)) return true;
            gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(c.shader.uniforms.scale, 1 / c.width, 1 / c.height);
            ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        })
    );

    gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);

    if (options.onLoad) {
        var styles = options.styles;
        for (var p in styles) {
            var s = styles[p];
            s.texture && textures.get(gl, s.texture);
            s.arrow && s.arrow.texture && textures.get(gl, s.arrow.texture);
        }
    }

    canvas.addEventListener("mousedown", onMouseDown.bind(this));
    canvas.addEventListener("wheel", onWheel.bind(this));

    function onWheel(e) {
        var rect = canvas.getBoundingClientRect();
        var size = Math.min(1.0, view.size * (1 + 0.001 * (e.deltaMode ? 33 : 1) * e.deltaY));
        var delta = size - view.size;

        view.size = size;
        view.x = Math.max(0, Math.min(1 - size, view.x - delta * (e.clientX - rect.left) / canvas.width));
        view.y = Math.max(0, Math.min(1 - size, view.y - delta * (1 - (e.clientY - rect.top) / canvas.height)));

        this.draw();
	e.preventDefault();
    }

    function onMouseDown(e) {
        var width = canvas.width / view.size;
        var height = canvas.height / view.size;
        var dx = view.x + e.clientX / width;
        var dy = e.clientY / height - view.y;

        var drag = function(e)  {
            view.x = Math.max(0, Math.min(1 - view.size, dx - e.clientX / width));
            view.y = Math.max(0, Math.min(1 - view.size, e.clientY / height - dy));
            this.draw();
            e.preventDefault();
        }.bind(this);

        var up = function()  {
            window.removeEventListener('mouseup', up);
            window.removeEventListener('mousemove', drag);
        };
        window.addEventListener('mouseup', up);
        window.addEventListener('mousemove', drag);
    }

    function getContext() {
        var attributes = { depth: false, antialias: false };
        return canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    }

    function createScene() {
        return {
            elements: [],
            add: function(name, e)  {
                scene[name] = e;
                scene.elements.push(e);
            }
        };
    }
}

ccNetViz.utils = function() {};

ccNetViz.utils.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        var last = Date.now - timestamp;

        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = Date.now;
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

ccNetViz.color = function (color) {
    this.a = 1;

    if (arguments.length >= 3) {
        this.r = arguments[0];
        this.g = arguments[1];
        this.b = arguments[2];
        arguments.length > 3 && (this.a = arguments[3]);
    }
    else if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {
        color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
        var get = function(v)  {return parseInt(v, 10) / 255;};

        this.r = get(color[1]);
        this.g = get(color[2]);
        this.b = get(color[3]);
    }
    else if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(color)) {
        color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(color);
        var get = function(v)  {return parseInt(v, 10) / 100;};

        this.r = get(color[1]);
        this.g = get(color[2]);
        this.b = get(color[3]);
    }
    else if (/^\#([0-9a-f]{6})$/i.test(color)) {
        color = parseInt(color.substring(1), 16);
        this.r = (color >> 16 & 255) / 255;
        this.g = (color >> 8 & 255) / 255;
        this.b = (color & 255) / 255;
    }
    else {
        this.r = this.g = this.b = 0;
    }
};

ccNetViz.gl = function() {}

ccNetViz.gl.initExtensions = function(gl) {
    var extensions = gl.getSupportedExtensions();
    var result = {};
    for (var i = 1; i < arguments.length; i++) {
        var e = arguments[i];
        (result[e] = extensions.indexOf(e) >= 0) && gl.getExtension(e);
    }
    return result;
}

ccNetViz.gl.createShader = function(gl, type, source) {
    var result = gl.createShader(type);
    gl.shaderSource(result, source);
    gl.compileShader(result);

    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(result));
        return null;
    }
    return result;
}

ccNetViz.gl.createTexture = function(gl, img, onLoad) {
    var result = gl.createTexture();

    function load() {
        image.onload = null;
        gl.bindTexture(gl.TEXTURE_2D, result);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        onLoad && onLoad();
    }

    var image = new Image();
    image.onload = load;
    image.src = img;
    image.naturalWidth && image.naturalHeight && load();
    return result;
}

ccNetViz.gl.uniformColor = function(gl, location, color) {
    gl.uniform4f(location, color.r, color.g, color.b, color.a);
}

ccNetViz.gl.ortho = function(left, right, bottom, top, near, far) {
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

ccNetViz.shader = function(gl, vs, fs) {
    var program = gl.createProgram();
    gl.attachShader(program, ccNetViz.gl.createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(program, ccNetViz.gl.createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);

    this.uniforms = {};
    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < n; i++) {
        var name = gl.getActiveUniform(program, i).name;
        this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    this.attributes = {};
    n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < n; i++) {
        var name = gl.getActiveAttrib(program, i).name;
        this.attributes[name] = { index: i, size: ccNetViz.shader.attribute[name] || 2 };
    }

    this.bind = function()  {
        gl.useProgram(program);
        for (var i = 0; i < n; i++) gl.enableVertexAttribArray(i);
    };

    this.unbind = function()  {
        for (var i = 0; i < n; i++) gl.disableVertexAttribArray(i);
    };
}

ccNetViz.shader.attribute = {
    color: 4
}

ccNetViz.primitive = function(gl, baseStyle, styleProperty, vs, fs, bind) {
    var shader = new ccNetViz.shader(gl, vs.join('\n'), fs.join('\n'));
    var buffers = [];
    var sections = [];

    this.set = function(gl, styles, textures, data, get)  {
        var parts = {};
        for (var i = 0; i < data.length; i++) {
            var e = data[i];
            var part = parts[e.style] = parts[e.style] || [];
            part.push(e);
        }

        var iV, iI, iS = 0, iB = 0;
        var e = {};

        var init = function(filler, n)  {
            iV = iI = 0;
            var max = Math.floor(ccNetViz.primitive.maxBufferSize / filler.numVertices);
            var nV = Math.min(max, n - (iB - iS)*max);
            var nI = nV * filler.numIndices;

            if (!e.indices || e.indices.length !== nI) {
                e.indices = new Uint16Array(nI);
                nV *= filler.numVertices;
                for (var a in shader.attributes) e[a] = new Float32Array(shader.attributes[a].size * nV);
            }
        };

        var store = function(section)  {
            var b = buffers[iB];
            if (!b) {
                buffers[iB] = b = {};
                for (var a in e) b[a] = gl.createBuffer();
            }
            for (var a in shader.attributes) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
                gl.bufferData(gl.ARRAY_BUFFER, e[a], gl.STATIC_DRAW);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, e.indices, gl.STATIC_DRAW);
            b.numIndices = iI;
            b.numVertices = iV;
            section.buffers.push(b);
            iB++;
        };

        var createStyle = function(style)  {
            var result = {};

            var copy = function(s)  {
                if (s) for (var p in s) result[p] = s[p];
            };

            copy(baseStyle);
            copy(style);

            if (styleProperty) {
                copy(baseStyle[styleProperty]);
                style && copy(style[styleProperty]);
            }
            result.color = result.color && new ccNetViz.color(result.color);
            return result;
        };

        sections = [];
        for (var p in parts) {
            iS = iB;

            var section = {
                style: createStyle(styles[p]),
                buffers: []
            };

            var filler = get(section.style);
            filler.numVertices = filler.numVertices || 4;
            filler.numIndices = filler.numIndices || 6;

            var part = parts[p];
            init(filler, part.length);
            var max = ccNetViz.primitive.maxBufferSize - filler.numVertices;
            for (var i = 0; i < part.length; i++, iV += filler.numVertices, iI += filler.numIndices) {
                if (iV > max) {
                    store(section);
                    init(filler, part.length);
                }
                filler.set(e, part[i], iV, iI);
            }
            store(section);

            function add() {
                sections.push(this);
            }
            var addSection = add.bind(section);

            typeof section.style.texture === 'string' ? section.style.texture = textures.get(gl, section.style.texture, addSection) : addSection();
        }
    }.bind(this)

    var fb;
    this.update = function(gl, attribute, data, get)  {
        var i = 0, size = shader.attributes[attribute].size;
        sections.forEach(function(section)  {
            var filler = get(section.style);
            filler.numVertices = filler.numVertices || 4;

            section.buffers.forEach(function(e)  {
                (!fb || fb.length !== size * e.numVertices) && (fb = new Float32Array(size * e.numVertices));
                for (var iV = 0; iV < e.numVertices; iV += filler.numVertices) filler.set(fb, data[i++], iV);
                gl.bindBuffer(gl.ARRAY_BUFFER, e[attribute]);
                gl.bufferData(gl.ARRAY_BUFFER, fb, gl.DYNAMIC_DRAW);
            });
        });
    }

    this.draw = function(context)  {
        context.shader = shader;
        shader.bind();

        gl.uniformMatrix4fv(shader.uniforms.transform, false, context.transform);

        sections.forEach(function(section)  {
            if (section.style.texture) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, section.style.texture);
                gl.uniform1i(shader.uniforms.texture, 0);
            }

            context.style = section.style;
            if (bind(context)) return;

            section.buffers.forEach(function(e)  {
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
    }
}

ccNetViz.primitive.vertices = function(buffer, iV) {
    for (var i = 2, j = 2 * iV, n = arguments.length; i < n; i++, j++) buffer[j] = arguments[i];
}

ccNetViz.primitive.colors = function(buffer, iV) {
    for (var i = 2, j = 4 * iV, n = arguments.length; i < n; i++) {
        var c = arguments[i];
        buffer[j++] = c.r;
        buffer[j++] = c.g;
        buffer[j++] = c.b;
        buffer[j++] = c.a;
    }
}

ccNetViz.primitive.indices = function(buffer, iV, iI) {
    for (var i = 3, j = iI, n = arguments.length; i < n; i++, j++) buffer[j] = iV + arguments[i];
}

ccNetViz.primitive.quad = function(buffer, iV, iI) {
    ccNetViz.primitive.indices(buffer, iV, iI, 0, 1, 2, 2, 3, 0);
}

ccNetViz.primitive.maxBufferSize = 65536;

ccNetViz.textures = function(onLoad) {
    var load = ccNetViz.utils.debounce(onLoad, 5);
    var textures = {};
    var pending = {};
    var n = 0;

    this.get = function(gl, img, action) {
        var p = pending[img];
        var t = textures[img];

        if (p) {
            p.push(action);
        }
        else if (t) {
            action && action();
        }
        else {
            p = pending[img] = [action];
            n++;
            textures[img] = t = ccNetViz.gl.createTexture(gl, img, function()  {
                p.forEach(function(a)  {return a && a();});
                delete pending[img];
                --n || load();
            });
        }
        return t;
    }
}

ccNetViz.texts = function(gl) {
    var size = 1024;

    var canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    canvas.style.width = canvas.style.height = size + 'px';
    canvas.style.display = "none";
    document.body.appendChild(canvas);

    var context = canvas.getContext('2d');
    context.fillStyle = "white";
    context.textAlign = "left";
    context.textBaseline = "top";

    var rendered, texts;
    var x, y, height;

    this.texture = gl.createTexture();

    this.clear = function()  {
        rendered = {};
        context.clearRect(0, 0, size, size);
        height = x = y = 0;
    };

    this.setFont = function(font)  {
        rendered[font] = texts = rendered[font] || {};
        context.font = font;
        x = 0;
        y += height;
        height = +/(\d+)px/.exec(font)[1] + 1;
    };

    this.get = function(text)  {
        var result = texts[text];
        if (!result) {
            var width = context.measureText(text).width;
            if (x + width > size) {
                x = 0;
                y += height;
            }
            context.fillText(text, x, y);
            texts[text] = result = {
                width: width,
                height: height,
                left: x / size,
                right: (x + width) / size,
                top: y / size,
                bottom: (y + height) / size
            };
            x += width;
        }
        return result;
    };

    this.bind = function()  {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }.bind(this);
}

ccNetViz.quadtree = function(points) {
    var d, xs, ys, i, n, x1_, y1_, x2_, y2_;

    x2_ = y2_ = -(x1_ = y1_ = Infinity);
    xs = [], ys = [];
    n = points.length;

    for (i = 0; i < n; ++i) {
        d = points[i];
        if (d.x < x1_) x1_ = d.x;
        if (d.y < y1_) y1_ = d.y;
        if (d.x > x2_) x2_ = d.x;
        if (d.y > y2_) y2_ = d.y;
        xs.push(d.x);
        ys.push(d.y);
    }

    var dx = x2_ - x1_;
    var dy = y2_ - y1_;
    dx > dy ? y2_ = y1_ + dx : x2_ = x1_ + dy;

    function create() {
        return {
            leaf: true,
            nodes: [],
            point: null,
            x: null,
            y: null
        };
    }

    function visit(f, node, x1, y1, x2, y2) {
        if (!f(node, x1, y1, x2, y2)) {
            var sx = (x1 + x2) * 0.5;
            var sy = (y1 + y2) * 0.5;
            var children = node.nodes;

            if (children[0]) visit(f, children[0], x1, y1, sx, sy);
            if (children[1]) visit(f, children[1], sx, y1, x2, sy);
            if (children[2]) visit(f, children[2], x1, sy, sx, y2);
            if (children[3]) visit(f, children[3], sx, sy, x2, y2);
        }
    }

    function insert(n, d, x, y, x1, y1, x2, y2) {
        if (n.leaf) {
            var nx = n.x;
            var ny = n.y;

            if (nx !== null) {
                if (nx === x && ny === y) {
                    insertChild(n, d, x, y, x1, y1, x2, y2);
                }
                else {
                    var nPoint = n.point;
                    n.x = n.y = n.point = null;
                    insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
                    insertChild(n, d, x, y, x1, y1, x2, y2);
                }
            } else {
                n.x = x, n.y = y, n.point = d;
            }
        } else {
            insertChild(n, d, x, y, x1, y1, x2, y2);
        }
    }

    function insertChild(n, d, x, y, x1, y1, x2, y2) {
        var xm = (x1 + x2) * 0.5;
        var ym = (y1 + y2) * 0.5;
        var right = x >= xm;
        var below = y >= ym;
        var i = below << 1 | right;

        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = create());

        right ? x1 = xm : x2 = xm;
        below ? y1 = ym : y2 = ym;
        insert(n, d, x, y, x1, y1, x2, y2);
    }

    function findNode(root, x, y, x0, y0, x3, y3) {
        var minDistance2 = Infinity;
        var closestPoint;

        (function find(node, x1, y1, x2, y2) {
            if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;

            if (point = node.point) {
                var point;
                var dx = x - node.x;
                var dy = y - node.y;
                var distance2 = dx * dx + dy * dy;

                if (distance2 < minDistance2) {
                    var distance = Math.sqrt(minDistance2 = distance2);
                    x0 = x - distance, y0 = y - distance;
                    x3 = x + distance, y3 = y + distance;
                    closestPoint = point;
                }
            }

            var children = node.nodes;
            var xm = (x1 + x2) * .5;
            var ym = (y1 + y2) * .5;
            var right = x >= xm;
            var below = y >= ym;

            for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
                if (node = children[i & 3]) switch (i & 3) {
                    case 0: find(node, x1, y1, xm, ym); break;
                    case 1: find(node, xm, y1, x2, ym); break;
                    case 2: find(node, x1, ym, xm, y2); break;
                    case 3: find(node, xm, ym, x2, y2); break;
                }
            }
        })(root, x0, y0, x3, y3);

        return closestPoint;
    }

    var root = create();
    root.visit = function(f)  {return visit(f, root, x1_, y1_, x2_, y2_);};
    root.find = function(x, y)  {return findNode(root, x, y, x1_, y1_, x2_, y2_);};

    for (i = 0; i < n; i++) insert(root, points[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
    --i;

    xs = ys = points = d = null;

    return root;
};

ccNetViz.layout = function() {}

ccNetViz.layout.normalize = function(nodes) {
    var n = nodes.length;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var minX = Infinity;
    var minY = Infinity;

    for (var i = 0; i < n; i++) {
        var o = nodes[i];
        maxX = Math.max(maxX, o.x);
        maxY = Math.max(maxY, o.y);
        minX = Math.min(minX, o.x);
        minY = Math.min(minY, o.y);
    };

    var scX = minX !== maxX ? 1 / (maxX - minX) : ((minX -= 0.5), 1);
    var scY = minY !== maxY ? 1 / (maxY - minY) : ((minY -= 0.5), 1);

    for (var i = 0; i < n; i++) {
        var o = nodes[i];
        o.x = scX * (o.x - minX);
        o.y = scY * (o.y - minY);
    }
}

ccNetViz.layout.random = function(nodes) {
    this.apply = function() {
        for (var i = 0, n = nodes.length; i < n; i++) {
            var o = nodes[i];
            o.x = Math.random();
            o.y = Math.random();
        }
    }
}

ccNetViz.layout.force = function(nodes, edges) {
    var size = [1, 1],
        alpha,
        friction = 0.9,
        edgeDistance = 15,
        edgeStrength = 1,
        charge = -30,
        chargeDistance2 = Infinity,
        gravity = 0.4,
        theta2 = .64,
        distances = [],
        strengths = [],
        charges = [];

    function accumulate(quad, alpha, charges) {
        var cx = 0, cy = 0;
        quad.charge = 0;
        if (!quad.leaf) {
            var nodes = quad.nodes;
            var c, n = nodes.length;

            for (var i = 0; i < n; i++) {
                c = nodes[i];
                if (c == null) continue;
                accumulate(c, alpha, charges);
                quad.charge += c.charge;
                cx += c.charge * c.cx;
                cy += c.charge * c.cy;
            }
        }
        if (quad.point) {
            if (!quad.leaf) {
                quad.point.x += Math.random() - 0.5;
                quad.point.y += Math.random() - 0.5;
            }
            var k = alpha * charges[quad.point.index];
            quad.charge += quad.pointCharge = k;
            cx += k * quad.point.x;
            cy += k * quad.point.y;
        }
        quad.cx = cx / quad.charge;
        quad.cy = cy / quad.charge;
    }

    function repulse(node) {
        return function(quad, x1, _, x2) {
            if (quad.point !== node) {
                var dx = quad.cx - node.x;
                var dy = quad.cy - node.y;
                var dw = x2 - x1;
                var dn = dx * dx + dy * dy;

                if (dw * dw / theta2 < dn) {
                    if (dn < chargeDistance2) {
                        var k = quad.charge / dn;
                        node.px -= dx * k;
                        node.py -= dy * k;
                    }
                    return true;
                }

                if (quad.point && dn && dn < chargeDistance2) {
                    var k = quad.pointCharge / dn;
                    node.px -= dx * k;
                    node.py -= dy * k;
                }
            }
            return !quad.charge;
        };
    }

    function step() {
        if ((alpha *= .99) < .05) {
            alpha = 0;
            return true;
        }

        var q, o, s, t, l, k, x, y;
        var n = nodes.length;
        var m = edges.length;

        for (var i = 0; i < m; i++) {
            o = edges[i];
            s = o.source;
            t = o.target;
            x = t.x - s.x;
            y = t.y - s.y;
            if (l = (x * x + y * y)) {
                l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
                x *= l;
                y *= l;
                t.x -= x * (k = s.weight / (t.weight + s.weight));
                t.y -= y * k;
                s.x += x * (k = 1 - k);
                s.y += y * k;
            }
        }

        if (k = alpha * gravity) {
            x = size[0] / 2;
            y = size[1] / 2;

            for (var i = 0; i < n; i++) {
                o = nodes[i];
                o.x += (x - o.x) * k;
                o.y += (y - o.y) * k;
            }
        }

        if (charge) {
            accumulate(q = ccNetViz.quadtree(nodes), alpha, charges);

            for (var i = 0; i < n; i++) {
                var o = nodes[i];
                !o.fixed && q.visit(repulse(o));
            }
        }

        for (var i = 0; i < n; i++) {
            o = nodes[i];
            if (o.fixed) {
                o.x = o.px;
                o.y = o.py;
            }
            else {
                o.x -= (o.px - (o.px = o.x)) * friction;
                o.y -= (o.py - (o.py = o.y)) * friction;
            }
        }
    };

    this.apply = function() {
        var n = nodes.length;
        var d = Math.sqrt(n);
        var s = 0.3 / d;

        for (var i = 0; i < n; i++) {
            var o = nodes[i];
            o.weight = 0;
            o.x = o.x !== undefined ? o.x : s + (i % d) / d;
            o.y = o.y !== undefined ? o.y : s + Math.floor(i / d) / d;
            o.px = o.x;
            o.py = o.y;
            charges[i] = charge;
        }

        for (var i = 0; i < edges.length; i++) {
            var o = edges[i];
            o.source.weight++;
            o.target.weight++;
            distances[i] = edgeDistance;
            strengths[i] = edgeStrength;
        }

        alpha = 0.1;
        while (!step());

        return true;
    };
};