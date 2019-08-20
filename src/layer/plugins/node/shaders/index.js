import fsColorTexture from './fsColorTexture.glsl';
import fsVarColorTexture from './fsVarColorTexture.glsl';
import vsNode from './vsNode.glsl';
import vsNodeColored from './vsNodeColored.glsl';

const shaders = {
  vsNode,
  fsColorTexture,
  vsNodeColored,
  fsVarColorTexture,
};

export { shaders };
