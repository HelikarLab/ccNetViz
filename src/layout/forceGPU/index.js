import GPGPUtility from './gpgputility';

/**
 * Sigma ParaGraphL: Fruchterman-Reingold with WebGL
 * ===============================
 * Tao Lin, Bowei Chen
 * Based on:
 * Author: Sébastien Heymann @ Linkurious
 * Version: 0.1
 */

var settings = {
  autoArea: true,
  area: 1,
  gravity: 1,
  speed: 0.005,
  iterations: 100,
};

var _instance = {};

/**
 * Event emitter Object
 * ------------------
 */
var _eventEmitter = {};

/**
 * Fruchterman Object
 * ------------------
 */
function FruchtermanReingoldGL() {
  var self = this;

  this.init = function(nodes, edges, options = {}) {
    options = options || {};

    // Properties
    //    this.sigInst = sigInst;
    this.config = { ...settings, ...options };
    this.easing = options.easing;
    this.duration = options.duration;

    this.nodes = nodes;
    this.edges = edges;

    // State
    this.running = false;
  };

  this.createProgram = function() {
    var gl = this.gl;
    var gpgpUtility = this.gpgpUtility;

    var sourceCode =
      `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D m;
varying vec2 vTextureCoord;
void main()
{
  float dx = 0.0, dy = 0.0;
  int i = int(floor(vTextureCoord.s * float(` +
      this.textureSize +
      `) + 0.5));
  vec4 node_i = texture2D(m, vec2(vTextureCoord.s, 1));
  gl_FragColor = node_i;
  //gl_FragColor.r = float(i);
  //return;
  if (i > ` +
      this.nodesCount +
      `) return;
  for (int j = 0; j < ` +
      this.nodesCount.toString() +
      `; j++) {
    if (i != j + 1) {
      vec4 node_j = texture2D(m, vec2((float(j) + 0.5) / float(` +
      this.textureSize +
      `) , 1));
      float xDist = node_i.r - node_j.r;
      float yDist = node_i.g - node_j.g;
      float dist = sqrt(xDist * xDist + yDist * yDist) + 0.01;
      if (dist > 0.0) {
        float repulsiveF = ` +
      this.k_2.toString() +
      ` / dist;
        dx += xDist / dist * repulsiveF;
        dy += yDist / dist * repulsiveF;
      }
    }
  }
  int arr_offset = int(floor(node_i.b + 0.5));
  int length = int(floor(node_i.a + 0.5));
  vec4 node_buffer;
  for (int p = 0; p < ` +
      String(this.maxEdgePerVetex) +
      `; p++) {
    if (p >= length) break;
    int arr_idx = arr_offset + p;
    // when arr_idx % 4 == 0 update node_idx_buffer
    int buf_offset = arr_idx - arr_idx / 4 * 4;
    if (p == 0 || buf_offset == 0) {
      node_buffer = texture2D(m, vec2((float(arr_idx / 4) + 0.5) /
                                          float(` +
      this.textureSize +
      `) , 1));
    }
    float float_j = buf_offset == 0 ? node_buffer.r :
                    buf_offset == 1 ? node_buffer.g :
                    buf_offset == 2 ? node_buffer.b :
                                      node_buffer.a;
    vec4 node_j = texture2D(m, vec2((float_j + 0.5) /
                                    float(` +
      this.textureSize +
      `), 1));
    float xDist = node_i.r - node_j.r;
    float yDist = node_i.g - node_j.g;
    float dist = sqrt(xDist * xDist + yDist * yDist) + 0.01;
    float attractiveF = dist * dist / ` +
      this.k +
      `;
    if (dist > 0.0) {
      dx -= xDist / dist * attractiveF;
      dy -= yDist / dist * attractiveF;
    }
  }
  // Gravity
  float d = sqrt(node_i.r * node_i.r + node_i.g * node_i.g);
  float gf = ` +
      String(0.01 * this.k * self.config.gravity) +
      ` * d;
  dx -= gf * node_i.r / d;
  dy -= gf * node_i.g / d;
  // Speed
  dx *= ` +
      String(self.config.speed) +
      `;
  dy *= ` +
      String(self.config.speed) +
      `;
  // Apply computed displacement
  float dist = sqrt(dx * dx + dy * dy);
  if (dist > 0.0) {
    float limitedDist = min(` +
      String(
        Number.parseFloat(this.maxDisplace * self.config.speed).toFixed(8)
      ) +
      `, dist);
    gl_FragColor.r += dx / dist * limitedDist;
    gl_FragColor.g += dy / dist * limitedDist;
  }
}
`;

    // console.log(sourceCode);
    var program = gpgpUtility.createProgram(null, sourceCode);
    this.positionHandle = gpgpUtility.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(this.positionHandle);
    this.textureCoordHandle = gpgpUtility.getAttribLocation(
      program,
      'textureCoord'
    );
    gl.enableVertexAttribArray(this.textureCoordHandle);
    this.textureHandle = gl.getUniformLocation(program, 'texture');

    this.program = program;
  };

  this.atomicGo = function(input, output) {
    if (!this.running || this.iterCount < 1) return false;
    this.iterCount--;
    this.running = this.iterCount > 0;

    console.log('ATOMIC GO');

    var gl = this.gl;
    var gpgpUtility = this.gpgpUtility;

    var outputBuffer = gpgpUtility.attachFrameBuffer(output);

    gl.useProgram(this.program);

    this.gpgpUtility.getStandardVertices();

    // TODO: what?
    gl.vertexAttribPointer(this.positionHandle, 3, gl.FLOAT, gl.FALSE, 20, 0);
    gl.vertexAttribPointer(
      this.textureCoordHandle,
      2,
      gl.FLOAT,
      gl.FALSE,
      20,
      12
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, input);
    gl.uniform1i(this.textureHandle, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  this.buildTextureData = function(nodes, edges, nodesCount, edgesCount) {
    var dataArray = [];
    var nodeDict = [];
    var mapIdPos = {};
    console.log('BUILD Texture Data', { nodes, edges });
    for (var i = 0; i < nodesCount; i++) {
      var n = nodes[i];
      mapIdPos[n.uniqid] = i;
      dataArray.push(n.x);
      dataArray.push(n.y);
      dataArray.push(0);
      dataArray.push(0);
      nodeDict.push([]);
    }
    for (var i = 0; i < edgesCount; i++) {
      var e = edges[i];
      nodeDict[mapIdPos[e.source.uniqid]].push(mapIdPos[e.target.uniqid]);
      nodeDict[mapIdPos[e.target.uniqid]].push(mapIdPos[e.source.uniqid]);
    }

    this.maxEdgePerVetex = 0;
    for (i = 0; i < nodesCount; i++) {
      var offset = dataArray.length;
      var dests = nodeDict[i];
      var len = dests.length;
      dataArray[i * 4 + 2] = offset;
      dataArray[i * 4 + 3] = dests.length;
      this.maxEdgePerVetex = Math.max(this.maxEdgePerVetex, dests.length);
      for (var j = 0; j < len; ++j) {
        var dest = dests[j];
        dataArray.push(+dest);
      }
    }
    // Dummy
    while (dataArray.length % 4 != 0) dataArray.push(0);
    // console.log(dataArray);
    return new Float32Array(dataArray);
  };

  this.saveDataToNode = function() {
    // this.texture_output;
    var nodes = this.nodes;
    var gl = this.gpgpUtility.getGLContext();
    var nodesCount = nodes.length;
    var output_arr = new Float32Array(nodesCount * 4);
    gl.readPixels(0, 0, nodesCount, 1, gl.RGBA, gl.FLOAT, output_arr);

    // console.log(output_arr);

    // var test = new Float32Array(this.textureSize * 4);
    // gl.readPixels(0, 0, this.textureSize, 1, gl.RGBA, gl.FLOAT, test);
    // console.log(test);

    console.log('OUTPUT ', { nodesCount, nodes, output_arr });
    for (var i = 0; i < nodesCount; ++i) {
      var n = nodes[i];
      n.x = output_arr[4 * i + 2];
      n.y = output_arr[4 * i + 3];
    }
  };

  this.setupGo = function() {
    this.iterCount = this.config.iterations;

    var nodes = this.nodes;
    var edges = this.edges;
    var nodesCount = nodes.length;
    this.nodesCount = nodesCount;
    var edgesCount = edges.length;
    this.config.area = this.config.autoArea
      ? nodesCount * nodesCount
      : this.config.area;
    this.maxDisplace = Math.sqrt(this.config.area) / 10;
    this.k_2 = this.config.area / (1 + nodesCount);
    this.k = Math.sqrt(this.k_2);

    var textureSize = nodesCount + parseInt((edgesCount * 2 + 3) / 4);
    // console.log(textureSize);
    this.textureSize = textureSize;
    var gpgpUtility = new GPGPUtility(textureSize, 1, {
      premultipliedAlpha: false,
    });
    this.gpgpUtility = gpgpUtility;

    if (!this.gpgpUtility.isFloatingTexture()) {
      alert('Floating point textures are not supported.');
      return false;
    }

    this.gl = gpgpUtility.getGLContext();

    var data = this.buildTextureData(nodes, edges, nodesCount, edgesCount);
    this.texture_input = gpgpUtility.makeTexture(
      WebGLRenderingContext.FLOAT,
      data
    );
    this.texture_output = gpgpUtility.makeTexture(
      WebGLRenderingContext.FLOAT,
      data
    );

    this.createProgram();

    // Check if frame buffer works
    var framebuffer = this.gpgpUtility.attachFrameBuffer(this.texture_output);
    var bufferStatus = this.gpgpUtility.frameBufferIsComplete();
    if (!bufferStatus.isComplete) {
      alert(bufferStatus.message);
      return false;
    }

    return true;
  };

  this.go = function() {
    if (!this.setupGo()) {
      return;
    }

    // console.log(this.iterCount);
    while (this.running) {
      var tmp = this.texture_input;
      this.texture_input = this.texture_output;
      this.texture_output = tmp;
      this.atomicGo(this.texture_input, this.texture_output);
    }
    this.saveDataToNode();
    this.stop();
  };

  this.start = function() {
    if (this.running) return;
    //      _eventEmitter[self.sigInst.id].dispatchEvent('start');
    //      var nodes = this.sigInst.graph.nodes();
    this.running = true;

    // Init nodes
    // for (var i = 0; i < nodes.length; i++) {
    //   nodes[i].fr_x = nodes[i].x;
    //   nodes[i].fr_y = nodes[i].y;
    //   nodes[i].fr = {
    //     dx: 0,
    //     dy: 0
    //   };
    // }

    this.go();
  };

  this.stop = function() {
    // var nodes = this.sigInst.graph.nodes();

    //      _eventEmitter[self.sigInst.id].dispatchEvent('stop');

    this.running = false;
    //      self.sigInst.refresh();
    /*if (this.easing) {
        _eventEmitter[self.sigInst.id].dispatchEvent('interpolate');
        sigma.plugins.animate(
          self.sigInst,
          {
            x: 'fr_x',
            y: 'fr_y'
          },
          {
            easing: self.easing,
            onComplete: function() {
              self.sigInst.refresh();
              for (var i = 0; i < nodes.length; i++) {
                nodes[i].fr = null;
                nodes[i].fr_x = null;
                nodes[i].fr_y = null;
              }
              _eventEmitter[self.sigInst.id].dispatchEvent('stop');
            },
            duration: self.duration
          }
        );
      }
      else {
        // Apply changes
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].x = nodes[i].fr_x;
          nodes[i].y = nodes[i].fr_y;
        }
        this.sigInst.refresh();
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].fr = null;
          nodes[i].fr_x = null;
          nodes[i].fr_y = null;
        }
        _eventEmitter[self.sigInst.id].dispatchEvent('stop');
      }*/
  };

  this.kill = function() {
    this.config = null;
    this.easing = null;
  };
}

/**
 * Interface
 * ----------
 */
export default function forceGPU(nodes, edges, layout_options = {}) {
  const margin = layout_options.margin || 0.05,
    direction = layout_options.direction || 'left-right';

  const _options = {
    margin: margin,
    direction: direction,
  };

  this.apply = function() {
    var algorithm = new FruchtermanReingoldGL();
    algorithm.init(nodes, edges, _options);
    algorithm.start();

    return _options;
  };
}
