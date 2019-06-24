import vsLabelsShader from './vsLabelsShader.glsl';
import fsLabelsShader from './fsLabelsShader.glsl';

import vsLineHead from './vsLineHead.glsl';
import vsLineMain from './vsLineMain.glsl';
import vsLineGetShiftFuncs from './vsLineGetShiftFuncs.glsl';

import { easeFunctions } from '../easeFunctions';
import fsLineHead from './fsLineHead.glsl';
import fsLineAnimateBasic from './fsLineAnimateBasic.glsl';
import fsLineAnimateGradient from './fsLineAnimateGradient.glsl';
import fsLineMain from './fsLineMain.glsl';
import fsLineBasic from './fsLineBasic.glsl';

const vsLine = [vsLineHead, vsLineGetShiftFuncs, vsLineMain].join('\n');

const easeFunctionPart = ease => {
  return `${easeFunctions[ease ? ease : 'linear']}`;
};

const fsLineAnimate = ease => {
  return [
    fsLineHead,
    easeFunctionPart(ease),
    fsLineAnimateBasic,
    fsLineAnimateGradient,
    fsLineMain,
  ].join('\n');
};

const elementShaders = {
  vsLabels: vsLabelsShader,
  fsLabels: fsLabelsShader,
  vsLine: vsLine,
  fsLineAnimate: fsLineAnimate,
  fsLineBasic: fsLineBasic,
};

export { elementShaders };
