import vsLabelsShader from './vsLabelsShader.glsl';

import vsLineHead from './vsLineHead.glsl';
import vsLineMain from './vsLineMain.glsl';
import getShiftFuncs from './getShiftFuncs.glsl';

import { easeFunctions } from '../easeFunctions';
import fsLineHead from './fsLineHead.glsl';
import fsLineAnimateBasic from './fsLineAnimateBasic.glsl';
import fsLineAnimateGradient from './fsLineAnimateGradient.glsl';
import fsLineMain from './fsLineMain.glsl';
import fsLineBasic from './fsLineBasic.glsl';

import fsColorTexture from './fsColorTexture.glsl';
import fsVarColorTexture from './fsVarColorTexture.glsl';
import fsLabelTexture from './fsLabelTexture.glsl';

import fsCurve from './fsCurve.glsl';

import vsCurveHead from './vsCurveHead.glsl';
import vsCurveMain from './vsCurveMain.glsl';

const vsLine = [vsLineHead, getShiftFuncs, vsLineMain].join('\n');
const vsCurve = [vsCurveHead, getShiftFuncs, vsCurveMain].join('\n');

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
  vsLine,
  fsLineAnimate,
  fsLineBasic,
  fsColorTexture,
  fsVarColorTexture,
  vsLabelsShader,
  fsLabelTexture,
  fsCurve,
  vsCurve,
};

export { elementShaders };
