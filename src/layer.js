define([
        './color',
        './gl',
        './primitive', 
        './layout/layout',
	'./geomutils',
        './texts',
        './spatialSearch/spatialSearch'
    ], 
    function(
        ccNetViz_color,
        ccNetViz_gl,
        ccNetViz_primitive,
        ccNetViz_layout,
        ccNetViz_geomutils,
        ccNetViz_texts,
        ccNetViz_spatialSearch
    ){
/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: 
 * 	David Tichy
 * 	Aleš Saska - http://alessaska.cz/
 */

var layer = function(canvas, context, view, gl, textures, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw) {
    getNodesCnt = getNodesCnt || (()=>{return this.nodes.length;});
    getEdgesCnt = getEdgesCnt || (()=>{return this.edges.length;});
    this.redraw = onRedraw || (() => {});
  
    options = options || {};
    options.styles = options.styles || {};

    var nodesFiller = (
      style => ({
        set: (v, e, iV, iI) => {
            var x = e.x;
            var y = e.y;
            ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
            ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
            if(v.color){
              var c = e.color;
              ccNetViz_primitive.colors(v.color, iV, c, c, c, c);
            }
            ccNetViz_primitive.quad(v.indices, iV, iI);
        }})
    );
    var labelsFiller = (style => {
	texts.setFont(style.font);
	style.texture = texts.texture;
	return {
	    set: (v, e, iV, iI) => {
		var x = e.x;
		var y = e.y;
		ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
		var t = texts.get(e.label);
		var dx = x <= 0.5 ? 0 : -t.width;
		var dy = y <= 0.5 ? 0 : -t.height;
		ccNetViz_primitive.vertices(v.relative, iV, dx, dy, t.width + dx, dy, t.width + dx, t.height + dy, dx, t.height + dy);
		ccNetViz_primitive.vertices(v.textureCoord, iV, t.left, t.bottom, t.right, t.bottom, t.right, t.top, t.left, t.top);
		ccNetViz_primitive.quad(v.indices, iV, iI);
	    }}
	}	
    );

    var normalize = (a, b) => {
        var x = b.x - a.x;
        var y = b.y - a.y;
        var sc = 1 / Math.sqrt(x*x + y*y);
        return { x: sc * x, y: sc * y };
    };
    
    var edgesFiller = {
      'lines': (style => ({
            set: (v, e, iV, iI) => {
                var s = ccNetViz_geomutils.edgeSource(e);
                var t = ccNetViz_geomutils.edgeTarget(e);
                var dx = s.x-t.x;
                var dy = s.y-t.y;
                var d = normalize(s, t);

                ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
                ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0,0,0,dx, dy, dx, dy);
                ccNetViz_primitive.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
                ccNetViz_primitive.quad(v.indices, iV, iI);
            }})),
       'curves': (style => ({
                    numVertices: 3,
                    numIndices: 3,
                    set: (v, e, iV, iI) => {
			var s = ccNetViz_geomutils.edgeSource(e);
			var t = ccNetViz_geomutils.edgeTarget(e);
                        var dx = s.x-t.x;
                        var dy = s.y-t.y;
                        var d = normalize(s, t);

                        ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
                        ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0,dx/2, dy/2, dx, dy);
                        ccNetViz_primitive.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
                        ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
                        ccNetViz_primitive.indices(v.indices, iV, iI, 0, 1, 2);
                    }
                })),
       'circles': (style => ({
                    set: (v, e, iV, iI) => {
                        var s = ccNetViz_geomutils.edgeSource(e);
                        var d = s.y < 0.5 ? 1 : -1;

                        var xdiff1 = 0;
                        var ydiff1 = 0;
                        var xdiff2 = 1;
                        var ydiff2 = d;
                        var xdiff3 = 2;
                        var ydiff3 = 1.25*d;
                        var xdiff4 = 3;
                        var ydiff4 = 1.5*d;

                        ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
                        ccNetViz_primitive.vertices(v.lengthSoFar, iV, xdiff1, ydiff1, xdiff2, ydiff2, xdiff3, ydiff3, xdiff4, ydiff4);
                        ccNetViz_primitive.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
                        ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
                        ccNetViz_primitive.quad(v.indices, iV, iI);
                    }
                }))
    };

    var set = (v, e, iV, iI, dx, dy) => {
        var t = ccNetViz_geomutils.edgeTarget(e);
        var tx = t.x;
        var ty = t.y;

        var offsetMul;
        if(t.is_edge)	//if target is edge, disable node offset for arrow
          offsetMul = 0;
        else
          offsetMul = 1;



        ccNetViz_primitive.singles(v.offsetMul, iV, offsetMul, offsetMul, offsetMul, offsetMul);
        ccNetViz_primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
        ccNetViz_primitive.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
        ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
        ccNetViz_primitive.quad(v.indices, iV, iI);
    };
            
    var dx = Math.cos(0.9);
    var dy = Math.sin(0.9);
    var arrowFiller = {
      lineArrows: (style => ({
                set: (v, e, iV, iI) => {
                    var d = normalize(ccNetViz_geomutils.edgeSource(e), ccNetViz_geomutils.edgeTarget(e));
                    var t = ccNetViz_geomutils.edgeTarget(e);
                    set(v, e, iV, iI, d.x, d.y);
                }})),
       curveArrows: (style => ({
                        set: (v, e, iV, iI) => {
                          var s = ccNetViz_geomutils.edgeSource(e);
                          var t = ccNetViz_geomutils.edgeTarget(e);			  
                          return set(v, e, iV, iI, 0.5 * (t.x - s.x), 0.5 * (t.y - s.y));
                        }
                    })),
       circleArrows: (style => ({
                        set: (v, e, iV, iI) => {
                          var t = ccNetViz_geomutils.edgeTarget(e);
                          return set(v, e, iV, iI, t.x < 0.5 ? dx : -dx, t.y < 0.5 ? -dy : dy);
                        }
                    }))
    };

    var edgeTypes;
    var edgePoses;

    var spatialSearch = undefined;

    this.set = function(nodes, edges, layout) {
        removedNodes = 0;
        removedEdges = 0;
      
        this.nodes = nodes = nodes || [];
        this.edges = edges = edges ? [].concat(edges) : [];

        spatialSearch = undefined;

        var lines = [], curves = [], circles = [];

        //tanslate indexes into node objects
        for (var i = 0; i < edges.length; i++) {
          var e = edges[i];
          if(typeof e.source == 'number')
            e.source = nodes[e.source];
          var e = edges[i];
          if(typeof e.target == 'number')
            e.target = nodes[e.target];
        }


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

            edgeTypes = [];
            edgePoses = new Uint32Array(edges.length);
            var dummysd  = {k:  '_',      kArrow: '_', d: []};
            var circlesd = {k: 'circles', kArrow: 'circleArrows', d: circles};
            var linesd   = {k: 'lines',   kArrow: 'lineArrows',d: lines};
            var curvesd  = {k: 'curves',  kArrow: 'curveArrows',d: curves};
            
            if (extensions.OES_standard_derivatives) {
                var map = {};
                for (var i = 0; i < edges.length; i++) {
                    var e = edges[i];
    
                    var si = e.source.uniqid || -e.source.index;
                    var ti = e.target.uniqid || -e.target.index;
    
                    (map[si] || (map[si] = {}))[ti] = true;
                }

                for (var i = 0; i < edges.length; i++) {
                    var target, e = edges[i];

                    var si = e.source.uniqid || -e.source.index;
                    var ti = e.target.uniqid || -e.target.index;
    
                    var t = dummysd;
                    if (si === ti) {
                        target = circles;
                        t = circlesd;
                    }else {
                        var m = map[ti];
                        if(m && m[si]){
                          target = curves;
                          t = curvesd;
                        }else{
                          target = lines;
                          t = linesd;
                        }
                    }
                    edgeTypes.push(t);
                    edgePoses[i] = t.d.length;
                    target.push(e);
                }
            } else {
                for (var i = 0; i < edges.length; i++) {
                    var e = edges[i];

                    var si = e.source.uniqid || -e.source.index;
                    var ti = e.target.uniqid || -e.target.index;

                    var t = dummysd;
                    if(si !== ti){
                      t = linesd;
                      lines.push(e);
                    }
                    edgeTypes.push(t);
                    edgePoses[i] = t.d.length;
                }
            }
        };

        init();

        layout && new ccNetViz_layout[layout](nodes, edges).apply() && ccNetViz_layout.normalize(nodes);

        scene.nodes.set(gl, options.styles, textures, nodes.length && !nodes[0].color ? nodes : [], nodesFiller);
        scene.nodesColored.set(gl, options.styles, textures, nodes.length && nodes[0].color ? nodes : [], nodesFiller);

        if (nodeStyle.label) {
            texts.clear();
            scene.labels.set(gl, options.styles, textures, nodes, labelsFiller);
            texts.bind();
        }

        scene.lines.set(gl, options.styles, textures, lines, edgesFiller.lines);

        if (extensions.OES_standard_derivatives) {
            scene.curves.set(gl, options.styles, textures, curves, edgesFiller.curves);
            scene.circles.set(gl, options.styles, textures, circles, edgesFiller.circles);
        }

        if (edgeStyle.arrow) {
            scene.lineArrows.set(gl, options.styles, textures, lines, arrowFiller.lineArrows);

            if (extensions.OES_standard_derivatives) {
                scene.curveArrows.set(gl, options.styles, textures, curves, arrowFiller.curveArrows);

                scene.circleArrows.set(gl, options.styles, textures, circles, arrowFiller.circleArrows);
            }
        }
    }
    
    this.find = (x,y,dist,nodes,edges) => {
      return this.getCurrentSpatialSearch(context).find(context, x,y,dist, view.size, nodes,edges);
    }

    this.findArea = (x1,y1,x2,y2,nodes,edges) => {
      return this.getCurrentSpatialSearch(context).findArea(context, x1,y1,x2,y2, view.size, nodes,edges);
    }
    
    this.updateNode = (n, i) => {
      this.nodes[i] = n;

      (this.nodes[0].color ? scene.nodesColored : scene.nodes).updateEl(gl, n, i, nodesFiller);
      scene.labels.updateEl(gl, n, i, labelsFiller);
      
      if(spatialSearch)
        spatialSearch.update(context, view.size, 'nodes', i, n);
    };
    
    this.updateEdge = ((e, i) => {
      var t = edgeTypes[i];
      var pos = edgePoses[i];

      t.d[pos] = this.edges[i] = e;
      scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
      if (edgeStyle.arrow)
	scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);
      
      if(spatialSearch)
        spatialSearch.update(context, view.size, t.k, pos, e);
    });
    
    var removedNodes = 0;
    var removedEdges = 0;
    
    var freenode = {x:-1,y:-1,title:""};
    this.removeNodeAtPos = ((pos) => {
      if(this.nodes[pos] === freenode){
        return;
      }

      removedNodes++;
      this.updateNode(freenode, pos);
    });

    var freeedge = {source:{x:-1,y:-1},target:{x:-1,y:-1}};
    this.removeEdgeAtPos = ((pos) => {
      if(this.edges[pos] === freeedge){
        return;
      }

      removedEdges++;

      this.updateEdge(freeedge, pos);
    });
    
    this.getVisibleNodes = () => {
      if(removedNodes <= 0)
	return this.nodes;

      var r = [];
      this.nodes.forEach((n) => {
	if(n !== freenode)
	  r.push(n);
      });
      return r;
    }

    this.getVisibleEdges = () => {
      if(removedEdges <= 0)
	return this.edges;
      
      var r = [];
      this.edges.forEach((n) => {
	if(n !== freeedge)
	  r.push(n);
      });
      return r;
    }
    
    this.cntShownNodes = (() => {
      return this.nodes.length - removedNodes;
    });

    this.cntShownEdges = (() => {
      return this.edges.length - removedEdges;
    });

    
    this.nodes = [];
    this.edges = [];

    var extensions = ccNetViz_gl.initExtensions(gl, "OES_standard_derivatives");
    var texts = new ccNetViz_texts(gl);
    var scene = this.scene = createScene.call(this);

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
        "uniform float type;",
        "uniform float lineStepSize;",
        "varying vec2 c;",
        "varying vec2 v_lengthSoFar;",
        "void main(void) {",
        "   float part = abs(fract(length(v_lengthSoFar)*lineStepSize));",
        "   if(type >= 2.5){",        //3.0 dotted
        "      part = fract(part*5.0);",
        "      if(part < 0.5) discard;",
        "   }else if(type >= 1.5){",        //2.0 - chain dotted
        "      if(part < 0.15) discard;",
        "      if(part > 0.25 && part < 0.40) discard;",
        "   }else if(type >= 0.5){",        //1.0 - dashed
        "      if(part < 0.2) discard;",
        "   }",
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

    scene.add("lines", new ccNetViz_primitive(gl, edgeStyle, null, [
            "precision mediump float;",
            "attribute vec2 position;",
            "attribute vec2 normal;",
            "attribute vec2 lengthSoFar;",
            "uniform vec2 width;",
            "uniform mat4 transform;",
            "varying vec2 n;",
            "varying vec2 v_lengthSoFar;",
            "void main(void) {",
            "   gl_Position = vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);",

            "   vec4 p = transform*vec4(lengthSoFar,0,0);",
            "   v_lengthSoFar.x = p.x;",
            "   v_lengthSoFar.y = p.y;",

            "   n = normal;",
            "}"
        ], [
            "precision mediump float;",
            "uniform float type;",
            "uniform vec4 color;",
            "varying vec2 n;",
            "varying vec2 v_lengthSoFar;",
            "void main(void) {",
            "   float part = abs(fract(length(v_lengthSoFar)*15.0));",
            "   if(type >= 2.5){",        //3.0 dotted
            "      part = fract(part*5.0);",
            "      if(part < 0.5) discard;",
            "   }else if(type >= 1.5){",        //2.0 - chain dotted
            "      if(part < 0.15) discard;",
            "      if(part > 0.25 && part < 0.40) discard;",
            "   }else if(type >= 0.5){",        //1.0 - dashed
            "      if(part < 0.2) discard;",
            "   }",
            "   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));",
            "}"
        ], c => {
            gl.uniform2f(c.shader.uniforms.width, c.style.width / c.width, c.style.width / c.height);
            gl.uniform1f(c.shader.uniforms.type, c.style.type);
            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        })
    );

    if (extensions.OES_standard_derivatives) {
        scene.add("curves", new ccNetViz_primitive(gl, edgeStyle, null, [
                "precision highp float;",
                "attribute vec2 position;",
                "attribute vec2 normal;",
                "attribute vec2 curve;",
                "attribute vec2 lengthSoFar;",
                "uniform float exc;",
                "uniform vec2 screen;",
                "uniform float aspect2;",
                "uniform mat4 transform;",
                "varying vec2 v_lengthSoFar;",
                "varying vec2 c;",
                "void main(void) {",
                "   vec2 n = vec2(normal.x, aspect2 * normal.y);",
                "   float length = length(screen * n);",
                "   n = length == 0.0 ? vec2(0, 0) : n / length;",
                "   gl_Position = vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);",
                "   c = curve;",

                "   vec4 p = transform*vec4(lengthSoFar,0,0);",
                "   v_lengthSoFar.x = p.x;",
                "   v_lengthSoFar.y = p.y;",

                "}"
            ], fsCurve, c => {
                gl.uniform1f(c.shader.uniforms.width, c.style.width);
                gl.uniform1f(c.shader.uniforms.exc, c.curveExc);
                gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
                gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
                gl.uniform1f(c.shader.uniforms.type, c.style.type);
                gl.uniform1f(c.shader.uniforms.lineStepSize, 15);
                ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
            })
        );
        scene.add("circles", new ccNetViz_primitive(gl, edgeStyle, null, [
                "precision highp float;",
                "attribute vec2 position;",
                "attribute vec2 normal;",
                "attribute vec2 curve;",
                "attribute vec2 lengthSoFar;",
                "uniform vec2 size;",
                "uniform mat4 transform;",
                "varying vec2 c;",
                "varying vec2 v_lengthSoFar;",
                "void main(void) {",
                "   gl_Position = vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);",
                "   c = curve;",

                "   vec4 p = transform*vec4(size * lengthSoFar,0,0);",
                "   v_lengthSoFar.x = p.x;",
                "   v_lengthSoFar.y = p.y;",
                "}"
            ], fsCurve, c => {
                gl.uniform1f(c.shader.uniforms.width, c.style.width);
                gl.uniform1f(c.shader.uniforms.type, c.style.type);
                var size = 2.5 * c.nodeSize;
                gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
                gl.uniform1f(c.shader.uniforms.lineStepSize, 5);
                ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
            })
        );
    }

    if (edgeStyle.arrow) {
        var shaderparams = {attribute:{offsetMul:1}};

        var bind = c => {
            var size = getSize(c, getEdgesCnt(), 0.2);
            if (!size) return true;

            gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(c.shader.uniforms.size, size, c.style.aspect * size);
            c.shader.uniforms.exc && gl.uniform1f(c.shader.uniforms.exc, 0.5 * view.size * c.curveExc);
            gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
            c.shader.uniforms.aspect2 && gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        };
      
        scene.add("lineArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
                "attribute vec2 position;",
                "attribute vec2 direction;",
                "attribute vec2 textureCoord;",
		"attribute float offsetMul;",		    
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
                "   gl_Position = vec4(size.x * (0.5 - textureCoord.x) * v - size.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);",
                "   tc = textureCoord;",
                "}"
            ], fsColorTexture, bind, shaderparams)
        );

        if (extensions.OES_standard_derivatives) {
            scene.add("curveArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
                    "attribute vec2 position;",
                    "attribute vec2 direction;",
                    "attribute vec2 textureCoord;",
                    "attribute float offsetMul;",		    
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
                ], fsColorTexture, bind, shaderparams)
            );
            scene.add("circleArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
                    "attribute vec2 position;",
                    "attribute vec2 direction;",
                    "attribute vec2 textureCoord;",
                    "attribute float offsetMul;",		    
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
                ], fsColorTexture, bind, shaderparams)
            );
        }
    }
        
    scene.add("nodes", new ccNetViz_primitive(gl, nodeStyle, null, [
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
            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        })
    );
    scene.add("nodesColored", new ccNetViz_primitive(gl, nodeStyle, null, [
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
    nodeStyle.label && scene.add("labels", new ccNetViz_primitive(gl, nodeStyle, "label", [
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
            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
        })
    );

    if (options.onLoad) {
        var styles = options.styles;
        for (var p in styles) {
            var s = styles[p];
            s.texture && textures.get(gl, s.texture);
            s.arrow && s.arrow.texture && textures.get(gl, s.arrow.texture);
        }
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

module.exports = layer;

});