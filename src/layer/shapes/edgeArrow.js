import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import { elementShaders } from '../../shaders';
import { BaseShape } from './baseShape';

let shaderparams = { attribute: { offsetMul: 1 } };

class LineArrow extends BaseShape {
  constructor(gl, edgeStyle, bind) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      'arrow',
      elementShaders.vsLineArrow,
      elementShaders.fsColorTexture,
      bind,
      shaderparams
    );
  }
}

class CurveArrow extends BaseShape {
  constructor(gl, edgeStyle, bind) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      'arrow',
      elementShaders.vsCurveArrow,
      elementShaders.fsColorTexture,
      bind,
      shaderparams
    );
  }
}

class CircleArrow extends BaseShape {
  constructor(gl, edgeStyle, bind) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      'arrow',
      elementShaders.vsCircleArrow,
      elementShaders.fsColorTexture,
      bind,
      shaderparams
    );
  }
}

export { LineArrow, CurveArrow, CircleArrow };
