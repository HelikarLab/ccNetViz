import ccNetViz_color     from './color' ;
import ccNetViz_gl        from './gl' ;
import ccNetViz_primitive from './primitive' ;
import ccNetViz_layout    from './layout/layout' ;
import ccNetViz_geomutils from './geomutils' ;
import ccNetViz_utils     from './utils' ;
import {partitionByStyle} from './primitiveTools';
import ccNetViz_spatialSearch from './spatialSearch/spatialSearch' ;

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: 
 * 	David Tichy
 * 	Aleš Saska - http://alessaska.cz/
 */

export default function(canvas, context, view, gl, textures, files, texts, events, options, backgroundColor, nodeStyle, edgeStyle, getSize, getNodeSize, getLabelSize, getLabelHideSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad) {
    getNodesCnt = getNodesCnt || (()=>{return this.nodes.length;});
    getEdgesCnt = getEdgesCnt || (()=>{return this.edges.length;});
    
    this.redraw = onRedraw || (() => {});
  
    options = options || {};
    options.styles = options.styles || {};

    let nodesFiller = (
      style => ({
        set: (v, e, iV, iI) => {
            let x = e.x;
            let y = e.y;
            ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
            ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
            if(v.color){
              let c = e.color;
              ccNetViz_primitive.colors(v.color, iV, c, c, c, c);
            }
            ccNetViz_primitive.quad(v.indices, iV, iI);
        }})
    );
    let labelsFiller = (style => {
        return (function(style){
          let textEngine = texts.getEngine(style.font);
      
          textEngine.setFont(style.font);

          return {
              set: (v, e, iV, iI) => {
                var x = e.x;
                var y = e.y;

                var ret = false;
                var parts = textEngine.get(e.label || "", x, y, () => {ret = true;});
                for(var i = 0; i < parts.length; i++, iV += 4, iI += 6){
                  let c = parts[i];

                  ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
                  ccNetViz_primitive.vertices(v.relative, iV, c.dx, c.dy, c.width + c.dx, c.dy, c.width + c.dx, c.height + c.dy, c.dx, c.height + c.dy);
                  ccNetViz_primitive.vertices(v.textureCoord, iV, c.left, c.bottom, c.right, c.bottom, c.right, c.top, c.left, c.top);
                  ccNetViz_primitive.quad(v.indices, iV, iI);
                }
                
                return ret;
              },
              size: (v,e) => {
                return textEngine.steps(e.label || "");
              }
            };
        })(style);
    });

    let normalize = (a, b) => {
        let x = b.x - a.x;
        let y = b.y - a.y;
        let sc = 1 / Math.sqrt(x*x + y*y);
        return { x: sc * x, y: sc * y };
    };
    
    let dx = Math.cos(0.9);
    let dy = Math.sin(0.9);
    
    let ct1 = {}, ct2 = {}, ct = {};
    let setVerticeCurveShift = (v,iV,s,t) => {
        let csx,csy,ctx,cty,cisx,cisy,sisy,citx,city;
        ccNetViz_geomutils.getCurveShift(t.e,ct1);
        ctx = ct1.x;
        cty = ct1.y;
        citx = ct1.cx;
        city = ct1.cy;

        ccNetViz_geomutils.getCurveShift(s.e,ct2);
        csx = ct2.x;
        csy = ct2.y;
        cisx = ct2.cx;
        cisy = ct2.cy;

        v.curveShift && ccNetViz_primitive.vertices(v.curveShift, iV, -csy, csx, -csy, csx, -cty, ctx, -cty, ctx);
        v.circleShift && ccNetViz_primitive.vertices(v.circleShift, iV, -cisy, cisx, -cisy, cisx, -city, citx, -city, citx);
    };
    
    let edgesFiller = {
      'lines': (style => ({
            set: (v, e, iV, iI) => {
                let s = ccNetViz_geomutils.edgeSource(e);
                let t = ccNetViz_geomutils.edgeTarget(e);
                let dx = s.x-t.x;
                let dy = s.y-t.y;
                let d = normalize(s, t);

                setVerticeCurveShift(v,iV,s,t);

                ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
                ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0,0,0,dx, dy, dx, dy);
                ccNetViz_primitive.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
                ccNetViz_primitive.quad(v.indices, iV, iI);
            }})),
       'curves': (style => ({
                    numVertices: 3,
                    numIndices: 3,
                    set: (v, e, iV, iI) => {
                        let s = ccNetViz_geomutils.edgeSource(e);
                        let t = ccNetViz_geomutils.edgeTarget(e);
                        let dx = s.x-t.x;
                        let dy = s.y-t.y;
                        let d = normalize(s, t);

                        setVerticeCurveShift(v,iV,s,t);

                        ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
                        ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0,dx/2, dy/2, dx, dy);
                        ccNetViz_primitive.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
                        ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
                        ccNetViz_primitive.indices(v.indices, iV, iI, 0, 1, 2);
                    }
                })),
       'circles': (style => ({
                    set: (v, e, iV, iI) => {
                        let s = ccNetViz_geomutils.edgeSource(e);
                        let d = s.y < 0.5 ? 1 : -1;

                        let xdiff1 = 0;
                        let ydiff1 = 0;
                        let xdiff2 = 1;
                        let ydiff2 = d;
                        let xdiff3 = 2;
                        let ydiff3 = 1.25*d;
                        let xdiff4 = 3;
                        let ydiff4 = 1.5*d;

                        setVerticeCurveShift(v,iV,s,s);

                        ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
                        ccNetViz_primitive.vertices(v.lengthSoFar, iV, xdiff1, ydiff1, xdiff2, ydiff2, xdiff3, ydiff3, xdiff4, ydiff4);
                        ccNetViz_primitive.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
                        ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
                        ccNetViz_primitive.quad(v.indices, iV, iI);
                    }
                }))
    };

    let set = (v, e, s, t, iV, iI, dx, dy) => {
        let tx = t.x;
        let ty = t.y;

        let offsetMul;
        let ctx,cty,citx,city;

        ccNetViz_geomutils.getCurveShift(t.e,ct);
        ctx = ct.x;
        cty = ct.y;
        citx = ct.cx;
        city = ct.cy;

        if(t.is_edge){	//if target is edge, disable node offset for arrow
          //normal of that edge
          offsetMul = 0;
        }else{
          offsetMul = 1;
        }
        v.curveShift && ccNetViz_primitive.vertices(v.curveShift, iV, -cty, ctx, -cty, ctx, -cty, ctx, -cty, ctx);
        v.circleShift && ccNetViz_primitive.vertices(v.circleShift, iV, -city, citx, -city, citx, -city, citx, -city, citx);

        ccNetViz_primitive.singles(v.offsetMul, iV, offsetMul, offsetMul, offsetMul, offsetMul);
        ccNetViz_primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
        ccNetViz_primitive.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
        ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
        ccNetViz_primitive.quad(v.indices, iV, iI);
    };
            
    let arrowFiller = {
      lineArrows: (style => ({
                set: (v, e, iV, iI) => {
                    let s = ccNetViz_geomutils.edgeSource(e);
                    let t = ccNetViz_geomutils.edgeTarget(e);
                    let d = normalize(s, t);
                    set(v, e, s, t, iV, iI, d.x, d.y);
                }})),
       curveArrows: (style => ({
                        set: (v, e, iV, iI) => {
                          let s = ccNetViz_geomutils.edgeSource(e);
                          let t = ccNetViz_geomutils.edgeTarget(e);			  
                          return set(v, e, s, t, iV, iI, 0.5 * (t.x - s.x), 0.5 * (t.y - s.y));
                        }
                    })),
       circleArrows: (style => ({
                        set: (v, e, iV, iI) => {
                          let t = ccNetViz_geomutils.edgeTarget(e);
                          let s = t;
                          return set(v, e, s, t, iV, iI, t.x < 0.5 ? dx : -dx, t.y < 0.5 ? -dy : dy);
                        }
                    }))
    };

    this.getCurrentSpatialSearch = (context) => {
      if(spatialSearch === undefined){
        spatialSearch = new ccNetViz_spatialSearch(context, texts, options, [], {}, [], {}, [], {}, [], {}, normalize, nodeStyle, getLabelSize, getLabelHideSize);
      }
      return spatialSearch;
    }
    
    this.remove = () => { }
    
    
    let edgeTypes;
    let edgePoses;

    let spatialSearch = undefined;
    
    let lvl = 0;
    //make sure everything (files and textures) are load, if not, redraw the whole graph after they became
    let set_end = () => {
      let enableLazyRedraw = false;
      let reset = (p) => {
        if(enableLazyRedraw)
          this.set(this.nodes, this.edges);
      };
      files.onLoad(reset)
      textures.onLoad(reset)
      enableLazyRedraw = true;
    };    

    this.set = function(nodes, edges, layout, layout_options) {
        removedNodes = 0;
        removedEdges = 0;
      
        this.nodes = nodes = nodes || [];
        this.edges = edges = edges ? [].concat(edges) : [];

        spatialSearch = undefined;

        let lines = [], curves = [], circles = [];

        //tanslate indexes into node objects
        for (let i = 0; i < edges.length; i++) {
          let e = edges[i];
          if(typeof e.source == 'number')
            e.source = nodes[e.source];
  
          if(typeof e.target == 'number')
            e.target = nodes[e.target];
        }


        let getIndex = (e) => {
            return e.uniqid || -e.index || -e.nidx;
        }

        let init = () => {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].index = i;
            }

            for (let i = 0,j=nodes.length + 10; i < edges.length; i++, j++) {
                edges[i].nidx = j;
            }

            edgeTypes = [];
            edgePoses = new Uint32Array(edges.length);
            const dummysd  = {k:  '_',      kArrow: '_', d: []};
            const circlesd = {k: 'circles', kArrow: 'circleArrows', d: circles};
            const linesd   = {k: 'lines',   kArrow: 'lineArrows',d: lines};
            const curvesd  = {k: 'curves',  kArrow: 'curveArrows',d: curves};
            
            if (extensions.OES_standard_derivatives) {
                let map = {};
                for (let i = 0; i < edges.length; i++) {
                    let e = edges[i];
    
                    const si = getIndex(e.source);
                    const ti = getIndex(e.target);
    
                    (map[si] || (map[si] = {}))[ti] = true;
                }

                for (let i = 0; i < edges.length; i++) {
                    let target, e = edges[i];

                    const si = getIndex(e.source);
                    const ti = getIndex(e.target);
    
                    let t = dummysd;
                    if (si === ti) {
                        e.t = 2;	//circle
                        target = circles;
                        t = circlesd;
                    }else {
                        let m = map[ti];
                        if(m && m[si]){
                          e.t = 1;	//curve
                          target = curves;
                          t = curvesd;
                        }else{
                          e.t = 0;	//line
                          target = lines;
                          t = linesd;
                        }
                    }
                    edgeTypes.push(t);
                    edgePoses[i] = t.d.length;
                    target.push(e);
                }
            } else {
                for (let i = 0; i < edges.length; i++) {
                    let e = edges[i];

                    const si = getIndex(e.source);
                    const ti = getIndex(e.target);

                    let t = dummysd;
                    if(si !== ti){
                      t = linesd;
                      e.t = 0;
                      lines.push(e);
                    }
                    edgeTypes.push(t);
                    edgePoses[i] = t.d.length;
                }
            }
        };

        init();
        
        let nodesParts   = partitionByStyle(nodes);
        let circlesParts = partitionByStyle(circles);
        let linesParts   = partitionByStyle(lines);
        let curvesParts  = partitionByStyle(curves);

        this.getCurrentSpatialSearch = (context) => {
          if(spatialSearch === undefined){
            spatialSearch = new ccNetViz_spatialSearch(context, texts, options, nodes, nodesParts, lines, linesParts, curves, curvesParts, circles, circlesParts, normalize, nodeStyle, getLabelSize, getLabelHideSize);
          }
          return spatialSearch;
        }        

        layout && new ccNetViz_layout[layout](nodes, edges, layout_options).apply() && ccNetViz_layout.normalize(nodes);
        
        if(!gl) return;
        
        let tryInitPrimitives = () => {
            var isDirty = false;

            let defaultAdder = (section, addSection) => {
              if(typeof section.style.texture === 'string')
                  section.style.texture = textures.get(gl, section.style.texture, addSection);
                else
                  addSection();
            }
            let labelAdder = (section, addSection) => {
              var slf = (section.style.label || {}).font || {};
              let textEngine = texts.getEngine(slf);
              section.style.texture = textEngine.getTexture(slf, addSection);
            }

            let is;
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
        
        while(tryInitPrimitives()); //loop until they are not dirty
        set_end();
    };
    
    
    
    this.update = function(element, attribute, data) {
        if(!gl) return;
        scene[element].update(gl, attribute, data, function(style)  {return {
            set: function(v, e, iV)  {return ccNetViz_primitive.colors(v, iV, e, e, e, e);}
        };});
    }
    
    this.find = (x,y,dist,nodes,edges,labels) => {
      return this.getCurrentSpatialSearch(context).find(context, x,y,dist, view.size, nodes,edges,labels);
    }

    this.findArea = (x1,y1,x2,y2,nodes,edges,labels) => {
      return this.getCurrentSpatialSearch(context).findArea(context, x1,y1,x2,y2, view.size, nodes,edges,labels);
    }
    
    this.updateNode = (n, i) => {
      this.nodes[i] = n;

      if(spatialSearch)
        spatialSearch.update(context, 'nodes', i, n);
      
      if(!gl) return;
      
      (this.nodes[0].color ? scene.nodesColored : scene.nodes).updateEl(gl, n, i, nodesFiller);
      scene.labels && scene.labels.updateEl(gl, n, i, labelsFiller);
      scene.labelsOutline && scene.labelsOutline.updateEl(gl, n, i, labelsFiller);
      
    };
    
    this.updateEdge = ((e, i) => {
      let t = edgeTypes[i];
      let pos = edgePoses[i];

      t.d[pos] = this.edges[i] = e;

      if(spatialSearch)
        spatialSearch.update(context, t.k, pos, e);
      
      if(!gl) return;
                       
      scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
      if (edgeStyle.arrow)
        scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);
    });
    
    let removedNodes = 0;
    let removedEdges = 0;
    
    const freenode = {x:-1,y:-1,title:""};
    this.removeNodeAtPos = ((pos) => {
      if(this.nodes[pos] === freenode){
        return;
      }

      removedNodes++;
      this.updateNode(freenode, pos);
    });

    const freeedge = {source:{x:-1,y:-1},target:{x:-1,y:-1}};
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

      let r = [];
      this.nodes.forEach(n => {
        if(n !== freenode)
          r.push(n);
      });
      return r;
    }

    this.getVisibleEdges = () => {
      if(removedEdges <= 0)
        return this.edges;
      
      let r = [];
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
    
    let getEdgeStyleSize = ((c) => {
      return c.width/(120);
/*      let avsize = (c.width + c.height)/2;
      let koef = (Math.min(Math.max((avsize - 150)/150, 0),1)+1)*1.3;
      //koef 1 for 150 size and 1.4 for 300 size
      return c.width/(130*koef);
*/    });
    
      
    let stylesTransl = {
      'line': 0,
      'dashed'  : 1,
      'chain-dotted': 2,
      'dotted': 3
    }
    let getEdgeType = (t) => {
      if(t !== undefined){
        t = stylesTransl[t];
      }
    
      if(t === undefined || typeof t !== 'number'){
        t = 0;
      }
      
      return t;
    };

    
    this.nodes = [];
    this.edges = [];
    
    let extensions = gl ? ccNetViz_gl.initExtensions(gl, "OES_standard_derivatives") : {};
    let scene = this.scene = createScene.call(this);
    
    let loadCalled = false;
    if(!gl) { options.onLoad && !loadCalled && (loadCalled = true) && options.onLoad(); return this };
    
    let getLabelType = (f) => {
      if(texts.isSDF(f))
        return 1;
      return 0;
    };

    const fsColorTexture = [
        "precision mediump float;",
        "uniform vec4 color;",
        "uniform sampler2D texture;",
        "varying vec2 tc;",
        "void main(void) {",
        "   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));",
        "}"
    ];

    const fsLabelTexture = [
        "precision mediump float;",
        "uniform lowp sampler2D texture;",
        "uniform mediump vec4 color;",
        "uniform mediump float height_font;",
        "uniform float type;",
        "uniform float buffer;",
        "uniform float boldness;",
        "float gamma = 4.0 * 1.4142 * boldness / height_font;",
        "varying mediump vec2 tc;",
        "void main() {",
        "  if(type > 0.5){",  //SDF
        "    float tx=texture2D(texture, tc).a;",
        "    float a= smoothstep(buffer - gamma, buffer + gamma, tx);",
        "    gl_FragColor=vec4(color.rgb, a*color.a);",
        "  }else{", //NORMAL FONT
        "    gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));",
        "  }",
        "}"
    ];

    const fsVarColorTexture = [
        "precision mediump float;",
        "uniform sampler2D texture;",
        "varying vec2 tc;",
        "varying vec4 c;",
        "void main(void) {",
        "   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));",
        "}"
    ];

    const lineTypes = [
        "   if(type >= 2.5){",        //3.0 dotted
        "      part = fract(part*3.0);",
        "      if(part < 0.5) discard;",
        "   }else if(type >= 1.5){",        //2.0 - chain dotted
        "      if(part < 0.15) discard;",
        "      if(part > 0.30 && part < 0.45) discard;",
        "   }else if(type >= 0.5){",        //1.0 - dashed
        "      if(part < 0.5) discard;",
        "   }"
    ];
    const fsCurve = [
        "#extension GL_OES_standard_derivatives : enable",
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
        "uniform float width;",
        "uniform vec4 color;",
        "uniform float type;",
        "uniform float lineStepSize;",
        "uniform float lineSize;",
        "varying vec2 c;",
        "varying vec2 v_lengthSoFar;",
        "void main(void) {",
        "   float part = abs(fract(length(v_lengthSoFar)*lineStepSize*lineSize));"
        ].concat(lineTypes).concat([
        "   vec2 px = dFdx(c);",
        "   vec2 py = dFdy(c);",
        "   float fx = 2.0 * c.x * px.x - px.y;",
        "   float fy = 2.0 * c.y * py.x - py.y;",
        "   float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);",
        "   float alpha = 1.0 - abs(sd) / width;",
        "   if (alpha < 0.0) discard;",
        "   gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));",
        "}"
    ]);
    

    const getShiftFuncs = [
        "attribute vec2 curveShift;",
        "vec4 getShiftCurve(void) {",
        "   vec2 shiftN = vec2(curveShift.x, aspect2 * curveShift.y);",
        "   float length = length(screen * shiftN);",
        "   return vec4(exc * (length == 0.0 ? vec2(0, 0) : shiftN * 0.5 / length), 0, 0);",
        "}",
        "attribute vec2 circleShift;",
        "vec4 getShiftCircle(void) {",
        "   return vec4(size*circleShift,0,0);",
        "}"
    ];

    scene.add("lines", new ccNetViz_primitive(gl, edgeStyle, null, [
            "precision mediump float;",
            "attribute vec2 position;",
            "attribute vec2 normal;",
            "attribute vec2 lengthSoFar;",
            "uniform float exc;",
            "uniform vec2 size;",
            "uniform vec2 screen;",
            "uniform float aspect2;",
            "uniform float aspect;",
            "uniform vec2 width;",
            "uniform mat4 transform;",
            "varying vec2 n;",
            "varying vec2 v_lengthSoFar;"
            ].concat(getShiftFuncs).concat([
            "void main(void) {",
            "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);",

            "   vec4 p = transform*vec4(lengthSoFar,0,0);",
            "   v_lengthSoFar = vec2(p.x, p.y/aspect);",

            "   n = normal;",
            "}"
        ]), [
            "precision mediump float;",
            "uniform float type;",
            "uniform vec4 color;",
            "varying vec2 n;",
            "varying vec2 v_lengthSoFar;",
            "uniform float lineSize;",
            "void main(void) {",
            "   float part = abs(fract(length(v_lengthSoFar)*lineSize*5.0));"
	    ].concat(lineTypes).concat([
            "   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));",
            "}"
        ]), c => {
            let uniforms = c.shader.uniforms;
            uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
            gl.uniform2f(uniforms.screen, c.width, c.height);
            let size = 2.5 * c.nodeSize;
            uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
            gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
            gl.uniform1f(uniforms.aspect2, c.aspect2);
            gl.uniform1f(uniforms.aspect, c.aspect);
            gl.uniform2f(uniforms.width, c.style.width / c.width, c.style.width / c.height);
            gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
            ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
        })
    );

    if (extensions.OES_standard_derivatives) {
        scene.add("curves", new ccNetViz_primitive(gl, edgeStyle, null, [
                "precision highp float;",
                "attribute vec2 position;",
                "attribute vec2 normal;",
                "attribute vec2 curve;",
                "attribute vec2 lengthSoFar;",
                "uniform vec2 size;",
                "uniform float exc;",
                "uniform vec2 screen;",
                "uniform float aspect2;",
                "uniform float aspect;",
                "uniform mat4 transform;",
                "varying vec2 v_lengthSoFar;",
                "varying vec2 c;",
                ].concat(getShiftFuncs).concat([
                "void main(void) {",
                "   vec2 n = vec2(normal.x, aspect2 * normal.y);",
                "   float length = length(screen * n);",
                "   n = length == 0.0 ? vec2(0, 0) : n / length;",
                "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);",
                "   c = curve;",

                "   vec4 p = transform*vec4(lengthSoFar,0,0);",
                "   v_lengthSoFar = vec2(p.x, p.y/aspect);",

                "}"
            ]), fsCurve, c => {
                let uniforms = c.shader.uniforms;
                gl.uniform1f(uniforms.width, c.style.width);
                gl.uniform1f(uniforms.exc, c.curveExc);
                gl.uniform2f(uniforms.screen, c.width, c.height);
                let size = 2.5 * c.nodeSize;
                uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
                gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
                gl.uniform1f(uniforms.aspect2, c.aspect2);
                gl.uniform1f(uniforms.aspect, c.aspect);
                gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
                uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5);
                ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
            })
        );
        scene.add("circles", new ccNetViz_primitive(gl, edgeStyle, null, [
                "precision highp float;",
                "attribute vec2 position;",
                "attribute vec2 normal;",
                "attribute vec2 curve;",
                "attribute vec2 lengthSoFar;",
                "uniform float exc;",
                "uniform vec2 screen;",
                "uniform float aspect2;",
                "uniform float aspect;",
                "uniform vec2 size;",
                "uniform mat4 transform;",
                "varying vec2 c;",
                "varying vec2 v_lengthSoFar;",
                ].concat(getShiftFuncs).concat([
                "void main(void) {",
                "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);",
                "   c = curve;",

                "   vec4 p = transform*vec4(size * lengthSoFar,0,0);",
                "   v_lengthSoFar = vec2(p.x, p.y/aspect);",
                "}"])
            , fsCurve, c => {
                let uniforms = c.shader.uniforms;
                uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
                gl.uniform1f(uniforms.width, c.style.width);
                gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
                gl.uniform2f(uniforms.screen, c.width, c.height);
                let size = 2.5 * c.nodeSize;
                uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
                gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
                gl.uniform1f(uniforms.aspect2, c.aspect2);
                gl.uniform1f(uniforms.aspect, c.aspect);
                uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5/3);
                ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
            })
        );
    }

    if (edgeStyle.arrow) {
        let shaderparams = {attribute:{offsetMul:1}};

        let bind = c => {
            let size = getSize(c, c.style, getEdgesCnt(), 0.2);
            if (!size) return true;

            let uniforms = c.shader.uniforms;
            gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(uniforms.arrowsize, size, c.style.aspect * size);
            gl.uniform1f(uniforms.exc, c.curveExc);
            uniforms.cexc && gl.uniform1f(uniforms.cexc, 0.5 * view.size * c.curveExc);
            if(uniforms.size){
              size = 2.5 * c.nodeSize;
              uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
            }
            gl.uniform2f(uniforms.screen, c.width, c.height);
            gl.uniform1f(uniforms.aspect2, c.aspect2);
            ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
        };
      
        scene.add("lineArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
                "attribute vec2 position;",
                "attribute vec2 direction;",
                "attribute vec2 textureCoord;",
                "attribute float offsetMul;",		    
                "uniform float offset;",
                "uniform vec2 arrowsize;",
                "uniform vec2 size;",
                "uniform vec2 screen;",
                "uniform float exc;",
                "uniform float aspect2;",
                "uniform mat4 transform;",
                "varying vec2 tc;",
                ].concat(getShiftFuncs).concat([
                "void main(void) {",
                "   vec2 u = direction / length(screen * direction);",
                "   vec2 v = vec2(u.y, -aspect2 * u.x);",
                "   v = v / length(screen * v);",
                "   gl_Position = getShiftCurve() + getShiftCircle()  + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);",
                "   tc = textureCoord;",
                "}"
            ]), fsColorTexture, bind, shaderparams)
        );

        if (extensions.OES_standard_derivatives) {
            scene.add("curveArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
                    "attribute vec2 position;",
                    "attribute vec2 direction;",
                    "attribute vec2 textureCoord;",
                    "attribute float offsetMul;",		    
                    "uniform float offset;",
                    "uniform vec2 arrowsize;",
                    "uniform vec2 size;",
                    "uniform float exc;",
                    "uniform float cexc;",
                    "uniform vec2 screen;",
                    "uniform float aspect2;",
                    "uniform mat4 transform;",
                    "varying vec2 tc;",
                    ].concat(getShiftFuncs).concat([
                    "void main(void) {",
                    "   vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));",
                    "   u = normalize(direction - cexc * u / length(screen * u));",
                    "   u = u / length(screen * u);",
                    "   vec2 v = vec2(u.y, -aspect2 * u.x);",
                    "   v = v / length(screen * v);",
                    "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);",
                    "   tc = textureCoord;",
                    "}"
                ]), fsColorTexture, bind, shaderparams)
            );
            scene.add("circleArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
                    "attribute vec2 position;",
                    "attribute vec2 direction;",
                    "attribute vec2 textureCoord;",
                    "attribute float offsetMul;",		    
                    "uniform float offset;",
                    "uniform vec2 arrowsize;",
                    "uniform vec2 size;",
                    "uniform vec2 screen;",
                    "uniform float exc;",
                    "uniform float aspect2;",
                    "uniform mat4 transform;",
                    "varying vec2 tc;",
                    ].concat(getShiftFuncs).concat([
                    "void main(void) {",
                    "   vec2 u = direction;",
                    "   vec2 v = vec2(direction.y, -direction.x);",
                    "   gl_Position = getShiftCurve() + getShiftCircle() + vec4((arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u) / screen, 0, 0) + transform * vec4(position, 0, 1);",
                    "   tc = textureCoord;",
                    "}"
                ]), fsColorTexture, bind, shaderparams)
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
            let size = getNodeSize(c);
            let uniforms = c.shader.uniforms;
            gl.uniform2f(uniforms.size, size / c.width, size / c.height);
            ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
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
            let size = getNodeSize(c);
            let uniforms = c.shader.uniforms;
            gl.uniform2f(uniforms.size, size / c.width, size / c.height);
        })
    );
    
    let vsLabelsShader = [
            "attribute vec2 position;",
            "attribute vec2 relative;",
            "attribute vec2 textureCoord;",
            "uniform float offset;",
            "uniform vec2 scale;",
            "uniform float fontScale;",
            "uniform mat4 transform;",
            "varying vec2 tc;",
            "void main(void) {",
            "   gl_Position = vec4(scale * (relative*fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);",
            "   tc = textureCoord;",
            "}"
        ];
    let bindLabels = (is_outline) => {
      return c => {
            if (!getNodeSize(c)) return true;
            
            let l = c.style.label;
            let f = l.font;
            let uniforms = c.shader.uniforms;

            gl.uniform1f(uniforms.type, getLabelType(f));

            let textEngine = texts.getEngine(f);
            textEngine.setFont(f);

            let fontScale = 1.0;
            let sdfSize = textEngine.fontSize;
            let wantedSize = ( textEngine.isSDF ? getLabelSize(context, l || {}) : sdfSize );
            if(wantedSize === 0){ fontScale = 0; };

            let opts = {};
            if(wantedSize && sdfSize){
              fontScale *= wantedSize / sdfSize;
            }

            if(is_outline && !textEngine.isSDF) //discardAll
              fontScale = 0;

            gl.uniform1f(uniforms.buffer, is_outline ? 0.25 : 192.0 / 256.0);
            gl.uniform1f(uniforms.boldness, (f ? f.boldness : undefined) || 1.);
            gl.uniform1f(uniforms.fontScale, fontScale);
            gl.uniform1f(uniforms.height_font, sdfSize);
            gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
            gl.uniform2f(uniforms.scale, 1 / c.width, 1 / c.height);

            let color;
            if(is_outline && f)
                color = new ccNetViz_color(f.outlineColor || backgroundColor);
            else
                color = c.style.color;
            ccNetViz_gl.uniformColor(gl, uniforms.color, color);
        };
    };
    nodeStyle.label && scene.add("labelsOutline", new ccNetViz_primitive(gl, nodeStyle, "label", vsLabelsShader, fsLabelTexture, bindLabels(true)) );
    nodeStyle.label && scene.add("labels", new ccNetViz_primitive(gl, nodeStyle, "label", vsLabelsShader, fsLabelTexture, bindLabels(false)) );

    if (options.onLoad) {
        let styles = options.styles;
        for (let p in styles) {
            let s = styles[p];

            s.texture && textures.get(gl, s.texture, onLoad);
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
