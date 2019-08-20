import { BaseShape } from '../baseShape';
import ccNetViz_primitive from '../../../primitive';
import { shaders } from './shaders';
import ccNetViz_gl from '../../../gl';

const nodesFiller = style => ({
  set: (v, e, iV, iI) => {
    let x = e.x;
    let y = e.y;
    ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
    ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
    if (v.color) {
      let c = e.color;
      ccNetViz_primitive.colors(v.color, iV, c, c, c, c);
    }
    ccNetViz_primitive.quad(v.indices, iV, iI);
  },
});

class Node extends BaseShape {
  constructor(gl, nodeStyle, getNodeSize) {
    super();

    this.filler = nodesFiller;

    this._primitive = new ccNetViz_primitive(
      gl,
      nodeStyle,
      null,
      shaders.vsNode,
      shaders.fsColorTexture,
      c => {
        let size = getNodeSize(c);
        let uniforms = c.shader.uniforms;
        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
        ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
      }
    );
  }
}

class NodeColored extends BaseShape {
  constructor(gl, nodeStyle, getNodeSize) {
    super();

    this.filler = nodesFiller;

    this._primitive = new ccNetViz_primitive(
      gl,
      nodeStyle,
      null,
      shaders.vsNodeColored,
      shaders.fsVarColorTexture,
      c => {
        let size = getNodeSize(c);
        let uniforms = c.shader.uniforms;
        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
      }
    );
  }
}

export { Node, NodeColored };
