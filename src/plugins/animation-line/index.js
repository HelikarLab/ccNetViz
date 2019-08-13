// import BasePlugin from './basePlugin';
import { AnimateLine } from './shapes/animateLine';

// TODO: check ccNetViz
if (!ccNetViz) {
  console.error('Please import ccNetViz library');
}

const BasePlugin = ccNetViz.BasePlugin;

export class AnimateEdgePlugin extends BasePlugin {
  constructor(options) {
    super(options);

    const { gl, edgeStyle } = options;

    this.scene.add('lines', new AnimateLine(gl, edgeStyle));
  }
  runRegistrations({ gl, textures }) {
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
  }
}
