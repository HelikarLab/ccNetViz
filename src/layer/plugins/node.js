import BasePlugin from './basePlugin';

import { Node, NodeColored } from '../shapes/node';

/**
 *  Copyright (c) 2019, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors:
 *    Aleš Saska - http://alessaska.cz/
 */

export default class NodePlugin extends BasePlugin {
  constructor(options) {
    super(options);

    const { gl, nodeStyle, getNodeSize } = options;

    this.scene.add('nodes', new Node(gl, nodeStyle, getNodeSize));
    this.scene.add('nodesColored', new NodeColored(gl, nodeStyle, getNodeSize));
  }
  runRegistrations({ gl, textures, drawEntities: { nodes } }) {
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

    if (nodes.length && !nodes[0].color)
      this.register('nodes', 'nodes', defaultAdder);
    else this.register('nodes', 'nodes', defaultAdder);

    return isDirty;
  }
}
