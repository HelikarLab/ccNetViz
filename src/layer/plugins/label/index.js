import BasePlugin from '../basePlugin';
import {
  DefaultLabel,
  CurveLabel,
  CircleLabel,
  DefaultLabelOutline,
  CurveLabelOutline,
  CircleLabelOutline,
  LabelManager,
} from './shape/labels';
import {
  DefaultLabelBackground,
  CurveLabelBackground,
  CircleLabelBackground,
  DefaultLabelBorder,
  CurveLabelBorder,
  CircleLabelBorder,
  LabelsBackgroundManager,
} from './shape/labelsBackground';

/**
 *  Copyright (c) 2019, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors:
 *    Aleš Saska - http://alessaska.cz/
 */

export default class LabelPlugin extends BasePlugin {
  constructor(options) {
    super(options);

    const {
      gl,
      nodeStyle,
      edgeStyle,
      getNodeSize,
      texts,
      context,
      backgroundColor,
      getLabelSize,
    } = options;

    const labelManager = new LabelManager(texts);
    this._labelsFiller = labelManager.getFiller();

    const labelsBackgroundManager = new LabelsBackgroundManager(texts);
    this._labelsBackgroundFiller = labelsBackgroundManager.getFiller();

    nodeStyle.label &&
      nodeStyle.label.backgroundColor &&
      this.scene.add(
        `defaultNodeLabelBackground`,
        new DefaultLabelBackground(gl, nodeStyle, getLabelSize, texts, context)
      );

    if (edgeStyle.label && edgeStyle.label.backgroundColor) {
      this.scene.add(
        `defaultEdgeLabelBackground`,
        new DefaultLabelBackground(gl, edgeStyle, getLabelSize, texts, context)
      );

      this.scene.add(
        `curveLabelBackground`,
        new CurveLabelBackground(gl, edgeStyle, getLabelSize, texts, context)
      );

      this.scene.add(
        `circleLabelBackground`,
        new CircleLabelBackground(gl, edgeStyle, getLabelSize, texts, context)
      );
    }

    nodeStyle.label &&
      this.scene.add(
        'defaultNodeLabelOutline',
        new DefaultLabelOutline(
          gl,
          nodeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );
    if (edgeStyle.label) {
      this.scene.add(
        'defaultEdgeLabelOutline',
        new DefaultLabelOutline(
          gl,
          edgeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );

      this.scene.add(
        'curveLabelOutline',
        new CurveLabelOutline(
          gl,
          edgeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );

      this.scene.add(
        'circleLabelOutline',
        new CircleLabelOutline(
          gl,
          edgeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );
    }

    nodeStyle.label &&
      nodeStyle.label.borderColor &&
      this.scene.add(
        `defaultNodeLabelBorder`,
        new DefaultLabelBorder(gl, nodeStyle, getLabelSize, texts, context)
      );

    if (edgeStyle.label && edgeStyle.label.borderColor) {
      this.scene.add(
        `defaultEdgeLabelBorder`,
        new DefaultLabelBorder(gl, edgeStyle, getLabelSize, texts, context)
      );

      this.scene.add(
        `curveLabelBorder`,
        new CurveLabelBorder(gl, edgeStyle, getLabelSize, texts, context)
      );

      this.scene.add(
        `circleLabelBorder`,
        new CircleLabelBorder(gl, edgeStyle, getLabelSize, texts, context)
      );
    }

    nodeStyle.label &&
      this.scene.add(
        'defaultNodeLabel',
        new DefaultLabel(
          gl,
          nodeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );

    if (edgeStyle.label) {
      this.scene.add(
        'defaultEdgeLabel',
        new DefaultLabel(
          gl,
          edgeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );
      this.scene.add(
        'curveLabel',
        new CurveLabel(
          gl,
          edgeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );

      this.scene.add(
        'circleLabel',
        new CircleLabel(
          gl,
          edgeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );
    }
  }
  runRegistrations({}) {
    let isDirty = false;

    let labelAdder = (section, addSection) => {
      var slf = (section.style.label || {}).font || {};
      let textEngine = this.options.texts.getEngine(slf);
      section.style.texture = textEngine.getTexture(slf, addSection);
    };

    let styleOptions = [
      ['defaultNode', 'nodes', this.options.nodeStyle],
      ['defaultEdge', 'lines', this.options.edgeStyle],
      ['circle', 'circles', this.options.edgeStyle],
      ['curve', 'curves', this.options.edgeStyle],
    ];

    this.register(() => {
      this.options.texts.clear();
    });

    styleOptions.forEach(element => {
      var el_identifier = element[0];
      var el = element[1];
      var style = element[2];

      if (style.label) {
        style.label.borderColor &&
          this.register(
            `${el_identifier}LabelBorder`,
            el,
            labelAdder,
            this._labelsBackgroundFiller.border
          );

        style.label.outlineColor &&
          !style.label.backgroundColor &&
          this.register(
            `${el_identifier}LabelOutline`,
            el,
            labelAdder,
            this._labelsFiller
          );

        style.label.backgroundColor &&
          this.register(
            `${el_identifier}LabelBackground`,
            el,
            labelAdder,
            this._labelsBackgroundFiller.background
          );

        this.register(
          `${el_identifier}Label`,
          el,
          labelAdder,
          this._labelsFiller
        );
      }
    });

    this.register(() => {
      this.options.texts.bind();
    });

    return isDirty;
  }
}
