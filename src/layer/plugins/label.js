import BasePlugin from './basePlugin';
import { Label, LabelOutline, LabelManager } from '../shapes/labels';
import {
  LabelsBackground,
  LabelsBackgroundManager,
  LabelsBorder,
} from '../shapes/labelsBackground';

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
  set({ gl, styles, drawEntities: { nodes, nodesParts } }) {
    let isDirty = false;

    const nodeStyle = this.options.nodeStyle;

    let labelAdder = (section, addSection) => {
      var slf = (section.style.label || {}).font || {};
      let textEngine = this.options.texts.getEngine(slf);
      section.style.texture = textEngine.getTexture(slf, addSection);
    };

    if (nodeStyle.label) {
      this.options.texts.clear();
      if (!nodeStyle.label.backgroundColor) {
        isDirty =
          isDirty ||
          this.scene.labelsOutline.set(
            gl,
            styles,
            labelAdder,
            nodes,
            nodesParts,
            this._labelsFiller
          );
      }
      isDirty =
        isDirty ||
        this.scene.labels.set(
          gl,
          styles,
          labelAdder,
          nodes,
          nodesParts,
          this._labelsFiller
        );
      this.options.texts.bind();
    }
    if (nodeStyle.label && nodeStyle.label.backgroundColor) {
      isDirty =
        isDirty ||
        this.scene.labelsBackground.set(
          gl,
          styles,
          labelAdder,
          nodes,
          nodesParts,
          this._labelsBackgroundFiller.background
        );
    }

    if (nodeStyle.label && nodeStyle.label.borderColor) {
      isDirty =
        isDirty ||
        this.scene.labelsBorder.set(
          gl,
          styles,
          labelAdder,
          nodes,
          nodesParts,
          this._labelsBackgroundFiller.border
        );
    }

    return isDirty;
  }
}
