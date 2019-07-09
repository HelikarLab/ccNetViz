import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import ccNetViz_color from '../../color';
import { elementShaders } from '../../shaders';
import { BaseShape, BaseShapeManager } from './baseShape';

// TODO: make this function simpler to understand
const getLabelVertices = (texts, font, label, x, y) => {
  let textEngine = texts.getEngine(font);
  textEngine.setFont(font);
  let ret = false;
  let parts = textEngine.get(label || '', x, y, () => {
    ret = true;
  });
  // c denotes the character having the max dx position, it's basically for finding the highest word length
  let c = 0;
  let height = 0;
  // finding max dx and dy

  for (let i = 0; i < parts.length; i++) {
    c = Math.abs(parts[c].dx) > Math.abs(parts[i].dx) ? c : i;
    height = height > Math.abs(parts[i].dy) ? height : Math.abs(parts[i].dy);
  }

  // height refers to max dy
  // endPosX and startPosX calculation requires clear understanding of alignText function in sdf.js
  let endPosX =
    x <= 0.5
      ? Math.abs(parts[c].dx) + parts[c].advance
      : -Math.abs(parts[c].dx);
  let startPosX = x <= 0.5 ? -5 : 0;
  height = y <= 0.5 ? height + parts[c].height / 3 : -height;
  return { startPosX: startPosX, endPosX: endPosX, height: height };
};

class LabelsBackground extends BaseShape {
  constructor(gl, nodeStyle, getLabelSize, texts, backgroundColor, context) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      nodeStyle,
      'label',
      elementShaders.vsLabelsBackgroundShader,
      elementShaders.fsLabelsBackgroundShader,
      c => {
        let uniforms = c.shader.uniforms;
        let l = c.style.label;
        let f = l.font;
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
        if (wantedSize && sdfSize) {
          fontScale *= wantedSize / sdfSize;
        }
        gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
        gl.uniform2f(uniforms.scale, 1 / c.width, 1 / c.height);
        gl.uniform1f(uniforms.fontScale, fontScale);
        let backgroundColor = new ccNetViz_color(
          l.backgroundColor || backgroundColor
        );
        ccNetViz_gl.uniformColor(gl, uniforms.backgroundColor, backgroundColor);
      }
    );
  }
}

class LabelsBackgroundManager extends BaseShapeManager {
  constructor(texts) {
    super();
    this._filler = {
      backgroundColor: style => ({
        set: (v, e, iV, iI) => {
          let x = e.x;
          let y = e.y;
          let rect = getLabelVertices(texts, style.font, e.label, x, y);

          ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
          ccNetViz_primitive.vertices(
            v.relative,
            iV,
            rect.startPosX,
            0,
            rect.endPosX,
            0,
            rect.endPosX,
            rect.height,
            rect.startPosX,
            rect.height
          );
          ccNetViz_primitive.quad(v.indices, iV, iI);
        },
      }),
    };
  }
}

export { LabelsBackground, LabelsBackgroundManager };
