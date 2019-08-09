import BasePlugin from './basePlugin';
import { AnimateLine } from '../shapes/edge';
import { Curve, Circle } from '../shapes/edge';
import { LineArrow, CurveArrow, CircleArrow } from '../shapes/edgeArrow';

export default class AnimateEdgePlugin extends BasePlugin {
  constructor(options) {
    super(options);

    const { gl, extensions, edgeStyle, getSize, getEdgesCnt, view } = options;

    this.scene.add('lines', new AnimateLine(gl, edgeStyle));

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
  runRegistrations({ gl, textures }) {
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

    this.register('lines', 'lines', defaultAdder);

    if (extensions.OES_standard_derivatives) {
      this.register('curves', 'curves', defaultAdder);
      this.register('circles', 'circles', defaultAdder);
    }

    if (edgeStyle.arrow) {
      this.register('lineArrows', 'lines', defaultAdder);

      if (extensions.OES_standard_derivatives) {
        this.register('curveArrows', 'curves', defaultAdder);
        this.register('circleArrows', 'circles', defaultAdder);
      }
    }
  }
}
