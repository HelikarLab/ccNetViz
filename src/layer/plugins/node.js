import BasePlugin from './basePlugin';

import { Node, NodeColored } from '../shapes/node';

export default class NodePlugin extends BasePlugin {
  constructor(options) {
    super(options);

    const { gl, nodeStyle, getNodeSize } = options;

    this.scene.add('nodes', new Node(gl, nodeStyle, getNodeSize));
    this.scene.add('nodesColored', new NodeColored(gl, nodeStyle, getNodeSize));
  }
  set({ gl, styles, textures, drawEntities: { nodes, nodesParts } }) {
    let isDirty = false;

    let defaultAdder = (section, addSection) => {
      if (typeof section.style.texture === 'string')
        section.style.texture = textures.get(
          gl,
          section.style.texture,
          addSection
        );
      else addSection();
    };

    let is;
    is = nodes.length && !nodes[0].color;
    isDirty =
      isDirty ||
      this.scene.nodes.set(
        gl,
        styles,
        defaultAdder,
        is ? nodes : [],
        is ? nodesParts : {}
      );
    is = nodes.length && nodes[0].color;
    isDirty =
      isDirty ||
      this.scene.nodesColored.set(
        gl,
        styles,
        defaultAdder,
        is ? nodes : [],
        is ? nodesParts : {}
      );

    return isDirty;
  }
}
