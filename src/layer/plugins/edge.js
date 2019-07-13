import BasePlugin from './basePlugin';
import { Line, Curve, Circle, EdgeManager } from '../shapes/edge';
import {
  LineArrow,
  CurveArrow,
  CircleArrow,
  EdgeArrowManager,
} from '../shapes/edgeArrow';

export default class EdgePlugin extends BasePlugin {
  constructor(options) {
    super(options);

    const { gl, extensions, edgeStyle, getSize, getEdgesCnt, view } = options;

    // NOTE: split to different file and use getPrimitive to get webgl element
    this.scene.add('lines', new Line(gl, edgeStyle));

    if (extensions.OES_standard_derivatives) {
      this.scene.add('curves', new Curve(gl, edgeStyle));
      this.scene.add('circles', new Circle(gl, edgeStyle));
    }

    if (edgeStyle.arrow) {
      this.scene.add(
        'lineArrows',
        new LineArrow(gl, view, edgeStyle, getSize, getEdgesCnt)
      );

      if (extensions.OES_standard_derivatives) {
        this.scene.add(
          'curveArrows',
          new CurveArrow(gl, view, edgeStyle, getSize, getEdgesCnt)
        );
        this.scene.add(
          'circleArrows',
          new CircleArrow(gl, view, edgeStyle, getSize, getEdgesCnt)
        );
      }
    }
  }
  set({
    gl,
    styles,
    textures,
    drawEntities: {
      lines,
      linesParts,
      curves,
      curvesParts,
      circles,
      circlesParts,
    },
  }) {
    let isDirty = false;

    const { extensions, edgeStyle } = this.options;

    let defaultAdder = (section, addSection) => {
      if (typeof section.style.texture === 'string')
        section.style.texture = textures.get(
          gl,
          section.style.texture,
          addSection
        );
      else addSection();
    };

    isDirty =
      isDirty ||
      this.scene.lines.set(gl, styles, defaultAdder, lines, linesParts);

    if (extensions.OES_standard_derivatives) {
      isDirty =
        isDirty ||
        this.scene.curves.set(gl, styles, defaultAdder, curves, curvesParts);
      isDirty =
        isDirty ||
        this.scene.circles.set(gl, styles, defaultAdder, circles, circlesParts);
    }

    if (edgeStyle.arrow) {
      isDirty =
        isDirty ||
        this.scene.lineArrows.set(gl, styles, defaultAdder, lines, linesParts);

      if (extensions.OES_standard_derivatives) {
        isDirty =
          isDirty ||
          this.scene.curveArrows.set(
            gl,
            styles,
            defaultAdder,
            curves,
            curvesParts
          );

        isDirty =
          isDirty ||
          this.scene.circleArrows.set(
            gl,
            styles,
            defaultAdder,
            circles,
            circlesParts
          );
      }
    }

    return isDirty;
  }
}
