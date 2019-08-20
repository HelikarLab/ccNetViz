import vsLabelsShader from './vsLabelsShader.glsl';
import vsLabelsBackgroundShader from './vsLabelsBackgroundShader.glsl';
import vsLabelsBorder from './vsLabelsBorder.glsl';
import fsLabelsBackgroundShader from './fsLabelsBackgroundShader.glsl';
import fsLabelsBorder from './fsLabelsBorder.glsl';

import fsLabelTexture from './fsLabelTexture.glsl';

const shaders = {
  vsLabelsShader,
  fsLabelTexture,
  vsLabelsBackgroundShader,
  vsLabelsBorder,
  fsLabelsBackgroundShader,
  fsLabelsBorder,
};

export { shaders };
