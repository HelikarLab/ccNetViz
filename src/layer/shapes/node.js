import { BaseShape } from './baseShape';
import ccNetViz_primitive from '../../primitive';
import { elementShaders } from '../../shaders';
import ccNetViz_gl from '../../gl';

class Node extends BaseShape {
  constructor(gl, nodeStyle, getNodeSize) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      nodeStyle,
      null,
      elementShaders.vsNode,
      elementShaders.fsColorTexture,
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
    this._primitive = new ccNetViz_primitive(
      gl,
      nodeStyle,
      null,
      elementShaders.vsNodeColored,
      elementShaders.fsVarColorTexture,
      c => {
        let size = getNodeSize(c);
        let uniforms = c.shader.uniforms;
        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
      }
    );
  }
}

export { Node, NodeColored };
