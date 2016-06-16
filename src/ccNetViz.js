define([
	'./color',
	'./gl',
	'./primitive', 
	'./layout/layout',
	'./textures', 
	'./texts',
	'./spatialSearch/spatialSearch'
    ], 
    function(
	ccNetViz_color,
	ccNetViz_gl,
	ccNetViz_primitive,
	ccNetViz_layout,
	ccNetViz_textures,
	ccNetViz_texts,
	ccNetViz_spatialSearch
    ){
/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

ccNetViz = {};

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
    
    var context;

    var spatialSearch = undefined;

    var offset = 0.5 * nodeStyle.maxSize;

    this.set = function(nodes, edges, layout) {
        this.nodes = nodes = nodes || [];
        this.edges = edges = edges || [];

        spatialSearch = undefined;

        var lines = [], curves = [], circles = [];
	
	this.getCurrentSpatialSearch = (context) => {
	  if(spatialSearch === undefined){
	    spatialSearch = new ccNetViz_spatialSearch(context, nodes, lines, curves, circles, view.size, normalize);
	  }
	  return spatialSearch;
	}

        var init = () => {
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

        var normalize = (a, b) => {
            var x = b.x - a.x;
            var y = b.y - a.y;
            var sc = 1 / Math.sqrt(x*x + y*y);
            return { x: sc * x, y: sc * y };
        };

        init();

        layout && new ccNetViz.layout[layout](nodes, edges).apply() && ccNetViz.layout.normalize(nodes);

        scene.nodes.set(gl, options.styles, textures, nodes.length && !nodes[0].color ? nodes : [], style => ({
            set: (v, e, iV, iI) => {
                var x = e.x;
                var y = e.y;
                ccNetViz.primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                ccNetViz.primitive.vertices(v.textureCoord, iV, 10, 0, 1, 0, 1, 1, 0, 1);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            }})
        );

        scene.nodesColored.set(gl, options.styles, textures, nodes.length && nodes[0].color ? nodes : [], style => ({
            set: (v, e, iV, iI) => {
                var x = e.x;
                var y = e.y;
                var c = e.color;
                ccNetViz.primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                ccNetViz.primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
                ccNetViz.primitive.colors(v.color, iV, c, c, c, c);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            }})
        );

        if (nodeStyle.label) {
            texts.clear();
            scene.labels.set(gl, options.styles, textures, nodes, style => {
                texts.setFont(style.font);
                style.texture = texts.texture;
                return {
                    set: (v, e, iV, iI) => {
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

        scene.lines.set(gl, options.styles, textures, lines, style => ({
            set: (v, e, iV, iI) => {
                var s = e.source;
                var t = e.target;
                var d = normalize(s, t);
                ccNetViz.primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
                ccNetViz.primitive.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            }})
        );

        if (extensions.OES_standard_derivatives) {
            scene.curves.set(gl, options.styles, textures, curves, style => ({
                    numVertices: 3,
                    numIndices: 3,
                    set: (v, e, iV, iI) => {
                        var s = e.source;
                        var t = e.target;
                        var d = normalize(s, t);
                        ccNetViz.primitive.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
                        ccNetViz.primitive.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
                        ccNetViz.primitive.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
                        ccNetViz.primitive.indices(v.indices, iV, iI, 0, 1, 2);
                    }
                })
            );

            scene.circles.set(gl, options.styles, textures, circles, style => ({
                    set: (v, e, iV, iI) => {
                        var s = e.source;
                        var d = s.y < 0.5 ? 1 : -1;
                        ccNetViz.primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
                        ccNetViz.primitive.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
                        ccNetViz.primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
                        ccNetViz.primitive.quad(v.indices, iV, iI);
                    }
                })
            );
        }

        if (edgeStyle.arrow) {
            var set = (v, e, iV, iI, dx, dy) => {
                var tx = e.target.x;
                var ty = e.target.y;
                ccNetViz.primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
                ccNetViz.primitive.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
                ccNetViz.primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
                ccNetViz.primitive.quad(v.indices, iV, iI);
            };

            scene.lineArrows.set(gl, options.styles, textures, lines, style => ({
                set: (v, e, iV, iI) => {
                    var d = normalize(e.source, e.target);
                    set(v, e, iV, iI, d.x, d.y);
                }})
            );

            if (extensions.OES_standard_derivatives) {
                scene.curveArrows.set(gl, options.styles, textures, curves, style => ({
                        set: (v, e, iV, iI) => set(v, e, iV, iI, 0.5 * (e.target.x - e.source.x), 0.5 * (e.target.y - e.source.y))
                    })
                );

                var dx = Math.cos(0.9);
                var dy = Math.sin(0.9);
                scene.circleArrows.set(gl, options.styles, textures, circles, style => ({
                        set: (v, e, iV, iI) => set(v, e, iV, iI, e.target.x < 0.5 ? dx : -dx, e.target.y < 0.5 ? -dy : dy)
                    })
                );
            }
        }
    }
    
    
    this.find = (x,y,dist,nodes,edges) => {
      var disth = dist / canvas.height;
      var distw = dist / canvas.width;
      dist = Math.max(disth, distw) * view.size;

      x = (x/canvas.width)*(view.size+2*context.offsetX)-context.offsetX+view.x;
      y = (1-y/canvas.height)*(view.size+2*context.offsetY)-context.offsetY+view.y;
      
      return this.getCurrentSpatialSearch(context).find(context, x,y,dist, view.size, nodes,edges);
    }



    this.update = function(element, attribute, data) {
        scene[element].update(gl, attribute, data, style => ({
            set: (v, e, iV) => ccNetViz.primitive.colors(v, iV, e, e, e, e)
        }));
    }

    this.draw = () => {
        var width = canvas.width;
        var height = canvas.height;
        var aspect = width / height;
        var o = view.size === 1 ? offset : 0;
        var ox = o / width;
        var oy = o / height;

        context = {
            transform: ccNetViz.gl.ortho(view.x - ox, view.x + view.size + ox, view.y - oy, view.y + view.size + oy, -1, 1),
            offsetX: ox,
            offsetY: oy,
            width: 0.5 * width,
            height: 0.5 * height,
            aspect2: aspect * aspect,
            count: this.nodes.length
        };
        context.curveExc = getSize(context, this.edges.length, 0.5);
        context.style = nodeStyle;
        context.nodeSize = getNodeSize(context);

        if(spatialSearch !== undefined)
          spatialSearch.setContext(context);

        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        scene.elements.forEach(e => e.draw(context));
    }

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

    var getSize = (c, n, sc) => {
        var result = sc * Math.sqrt(c.width * c.height / n) / view.size;
        var s = c.style;
        if (s) {
            result = s.maxSize ? Math.min(s.maxSize, result) : result;
            result = result < s.hideSize ? 0 : (s.minSize ? Math.max(s.minSize, result) : result);
        }
        return result;
    };

    var getNodeSize = c => getSize(c, this.nodes.length, 0.4);

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
        ], c => {
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
            ], fsCurve, c => {
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
            ], fsCurve, c => {
                gl.uniform1f(c.shader.uniforms.width, c.style.width);
                var size = 2.5 * c.nodeSize;
                gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
                ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
            })
        );
    }

    if (edgeStyle.arrow) {
        var bind = c => {
            var size = getSize(c, this.edges.length, 0.2);
            if (!size) return true;
            gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(c.shader.uniforms.size, size, c.style.aspect * size);
            c.shader.uniforms.exc && gl.uniform1f(c.shader.uniforms.exc, 0.5 * view.size * c.curveExc);
            gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
            c.shader.uniforms.aspect2 && gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
            ccNetViz.gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        };
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
        ], fsColorTexture, c => {
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
        ], fsVarColorTexture, c => {
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
        ], fsColorTexture, c => {
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

        var drag = e => {
            view.x = Math.max(0, Math.min(1 - view.size, dx - e.clientX / width));
            view.y = Math.max(0, Math.min(1 - view.size, e.clientY / height - dy));
            this.draw();
            e.preventDefault();
        };

        var up = () => {
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
            add: (name, e) => {
                scene[name] = e;
                scene.elements.push(e);
            }
        };
    }
}

ccNetViz.color = ccNetViz_color;
ccNetViz.gl = ccNetViz_gl;
ccNetViz.primitive = ccNetViz_primitive;
ccNetViz.textures = ccNetViz_textures;
ccNetViz.texts = ccNetViz_texts;
ccNetViz.layout = ccNetViz_layout;


module.exports = ccNetViz;

});