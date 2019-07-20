import BasePlugin from './basePlugin';
import { Label, LabelOutline, LabelManager } from '../shapes/labels';
import {
  LabelsBackground,
  LabelsBackgroundManager,
  LabelsBorder,
} from '../shapes/labelsBackground';

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

    if (nodeStyle.label && nodeStyle.label.backgroundColor) {
      this.scene.add(
        'labelsBackground',
        new LabelsBackground(gl, nodeStyle, getLabelSize, texts, context)
      );
    }

    if (nodeStyle.label && nodeStyle.label.borderColor) {
      this.scene.add(
        'labelsBorder',
        new LabelsBorder(gl, nodeStyle, getLabelSize, texts, context)
      );
    }

    nodeStyle.label &&
      this.scene.add(
        'labelsOutline',
        new LabelOutline(
          gl,
          nodeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        )
      );

    nodeStyle.label &&
      this.scene.add(
        'labels',
        new Label(
          gl,
          nodeStyle,
          getNodeSize,
          getLabelSize,
          texts,
          backgroundColor,
          context
        ),
        backgroundColor
      );
  }
  runRegistrations({}) {
    let isDirty = false;

    const nodeStyle = this.options.nodeStyle;

    let labelAdder = (section, addSection) => {
      var slf = (section.style.label || {}).font || {};
      let textEngine = this.options.texts.getEngine(slf);
      section.style.texture = textEngine.getTexture(slf, addSection);
    };

    if (nodeStyle.label) {
      this.register(() => {
        this.options.texts.clear();
      });
      if (!nodeStyle.label.backgroundColor) {
        this.register('labelsOutline', 'nodes', labelAdder, this._labelsFiller);
      }

      this.register('labels', 'nodes', labelAdder, this._labelsFiller);

      this.register(() => {
        this.options.texts.bind();
      });
    }
    if (nodeStyle.label && nodeStyle.label.backgroundColor) {
      this.register(
        'labelsBackground',
        'nodes',
        labelAdder,
        this._labelsBackgroundFiller.background
      );
    }

    if (nodeStyle.label && nodeStyle.label.borderColor) {
      this.register(
        'labelsBorder',
        'nodes',
        labelAdder,
        this._labelsBackgroundFiller.border
      );
    }

    return isDirty;
  }
}
