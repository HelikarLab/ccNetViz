import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import ccNetViz_color from '../../color';
import { elementShaders } from '../../shaders';
import { BaseShape } from './baseShape';

let getLabelType = (f, texts) => {
  if (texts.isSDF(f)) return 1;
  return 0;
};

let bindLabels = (
  is_outline,
  gl,
  getNodeSize,
  getLabelSize,
  texts,
  backgroundColor
) => {
  return c => {
    if (!getNodeSize(c)) return true;

    let l = c.style.label;
    let f = l.font;
    let uniforms = c.shader.uniforms;

    gl.uniform1f(uniforms.type, getLabelType(f, texts));
    //            gl.uniform1f(uniforms.type, 0);

    let textEngine = texts.getEngine(f);
    textEngine.setFont(f);

    let fontScale = 1.0;
    let sdfSize = textEngine.fontSize;
    let wantedSize = textEngine.isSDF
      ? getLabelSize(context, l || {})
      : sdfSize;
    if (wantedSize === 0) {
      fontScale = 0;
    }

    let opts = {};
    if (wantedSize && sdfSize) {
      fontScale *= wantedSize / sdfSize;
    }

    if (is_outline && !textEngine.isSDF)
      //discardAll
      fontScale = 0;

    gl.uniform1f(uniforms.buffer, is_outline ? 0.25 : 192.0 / 256.0);
    gl.uniform1f(uniforms.boldness, (f ? f.boldness : undefined) || 1);
    gl.uniform1f(uniforms.fontScale, fontScale);
    gl.uniform1f(uniforms.height_font, sdfSize);
    gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
    gl.uniform2f(uniforms.scale, 1 / c.width, 1 / c.height);

    let color;
    if (is_outline && f)
      color = new ccNetViz_color(f.outlineColor || backgroundColor);
    else color = c.style.color;
    ccNetViz_gl.uniformColor(gl, uniforms.color, color);
  };
};

class Label extends BaseShape {
  constructor(
    gl,
    nodeStyle,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      nodeStyle,
      'label',
      elementShaders.vsLabelsShader,
      elementShaders.fsLabelTexture,
      bindLabels(false, gl, getNodeSize, getLabelSize, texts, backgroundColor)
    );
  }
}

class LabelOutline extends BaseShape {
  constructor(
    gl,
    nodeStyle,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      nodeStyle,
      'label',
      elementShaders.vsLabelsShader,
      elementShaders.fsLabelTexture,
      bindLabels(true, gl, getNodeSize, getLabelSize, texts, backgroundColor)
    );
  }
}

export { Label, LabelOutline };
