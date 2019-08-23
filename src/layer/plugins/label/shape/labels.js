import ccNetViz_primitive from '../../../../primitive';
import ccNetViz_gl from '../../../../gl';
import ccNetViz_color from '../../../../color';
import { shaders } from '../shaders';
import { BaseShape, BaseShapeManager } from '../../baseShape';
import { setLabelAttributes, getMidPoint } from './labelsUtil';

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
  backgroundColor,
  context,
  is_curve
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

    if (is_curve) {
      gl.uniform1f(uniforms.exc, c.curveExc);
      gl.uniform2f(uniforms.screen, c.width, c.height);
      let size = 2.5 * c.nodeSize;
      uniforms.size &&
        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
      gl.uniform1f(uniforms.aspect2, c.aspect2);
      gl.uniform1f(uniforms.aspect, c.aspect);
    }
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

class DefaultLabel extends BaseShape {
  constructor(
    gl,
    style,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor,
    context
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      style,
      'label',
      shaders.vsDfLabelShader,
      shaders.fsLabelTexture,
      bindLabels(
        false,
        gl,
        getNodeSize,
        getLabelSize,
        texts,
        backgroundColor,
        context,
        false
      )
    );
  }
}

class CurveLabel extends BaseShape {
  constructor(
    gl,
    style,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor,
    context
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      style,
      'label',
      shaders.vsCurveLabelsShader,
      shaders.fsLabelTexture,
      bindLabels(
        false,
        gl,
        getNodeSize,
        getLabelSize,
        texts,
        backgroundColor,
        context,
        true
      )
    );
  }
}
class CircleLabel extends BaseShape {
  constructor(
    gl,
    style,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor,
    context
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      style,
      'label',
      shaders.vsCircleLabelsShader,
      shaders.fsLabelTexture,
      bindLabels(
        false,
        gl,
        getNodeSize,
        getLabelSize,
        texts,
        backgroundColor,
        context,
        true
      )
    );
  }
}

class DefaultLabelOutline extends BaseShape {
  constructor(
    gl,
    style,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor,
    context
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      style,
      'label',
      shaders.vsDfLabelShader,
      shaders.fsLabelTexture,
      bindLabels(
        true,
        gl,
        getNodeSize,
        getLabelSize,
        texts,
        backgroundColor,
        context
      )
    );
  }
}

class CurveLabelOutline extends BaseShape {
  constructor(
    gl,
    style,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor,
    context
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      style,
      'label',
      shaders.vsCurveLabelsShader,
      shaders.fsLabelTexture,
      bindLabels(
        true,
        gl,
        getNodeSize,
        getLabelSize,
        texts,
        backgroundColor,
        context
      )
    );
  }
}

class CircleLabelOutline extends BaseShape {
  constructor(
    gl,
    style,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor,
    context
  ) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      style,
      'label',
      shaders.vsCircleLabelsShader,
      shaders.fsLabelTexture,
      bindLabels(
        true,
        gl,
        getNodeSize,
        getLabelSize,
        texts,
        backgroundColor,
        context
      )
    );
  }
}

class LabelManager extends BaseShapeManager {
  constructor(texts) {
    super();
    this._filler = style => {
      return (function(style) {
        let textEngine = texts.getEngine(style.font);

        textEngine.setFont(style.font);

        return {
          set: (v, e, iV, iI) => {
            var p = getMidPoint(e);

            var x = p.x;
            var y = p.y;
            var d = p.d;
            var s = p.s;
            var t = p.t;
            var ret = false;
            var parts = textEngine.get(e.label || '', x, y, () => {
              ret = true;
            });
            for (var i = 0; i < parts.length; i++, iV += 4, iI += 6) {
              // parts is the array of characters, character description and position w.r.t node
              let c = parts[i];
              //position of the element
              // in case of node => node position and bezier curve => mid point
              setLabelAttributes(v, e, s, t, x, y, d, iV);
              //position of the vertices of box of label to be rendered
              if (i == 0) {
                // bring the center of box of character to the center of node (incase if you are wondering
                // why not c.width/2 and c.height/2 , it's because for c.width/2, it will exactly coincide with
                // center of node, so some of the node labels could go out of canvas)
                //UPDATE : for x<=0.5 , we need to bring to centre of node for new labelBackground shader
                var boxMinusX = x <= 0.5 ? c.width / 2 : c.width / 3;
                var boxMinusY = c.height / 3;
              }
              ccNetViz_primitive.vertices(
                v.relative,
                iV,
                c.dx - boxMinusX,
                c.dy - boxMinusY,
                c.width + c.dx - boxMinusX,
                c.dy - boxMinusY,
                c.width + c.dx - boxMinusX,
                c.height + c.dy - boxMinusY,
                c.dx - boxMinusX,
                c.height + c.dy - boxMinusY
              );
              // position of characters in atlas
              if (v.textureCoord) {
                ccNetViz_primitive.vertices(
                  v.textureCoord,
                  iV,
                  c.left,
                  c.bottom,
                  c.right,
                  c.bottom,
                  c.right,
                  c.top,
                  c.left,
                  c.top
                );
              }
              ccNetViz_primitive.quad(v.indices, iV, iI);
            }
            return ret;
          },
          size: (v, e) => {
            return textEngine.steps(e.label || '');
          },
        };
      })(style);
    };
  }
}

export {
  DefaultLabel,
  CurveLabel,
  CircleLabel,
  DefaultLabelOutline,
  CurveLabelOutline,
  CircleLabelOutline,
  LabelManager,
};
