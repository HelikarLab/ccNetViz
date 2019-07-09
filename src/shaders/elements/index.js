import vsLabelsShader from './vsLabelsShader.glsl';

import vsLineHead from './vsLineHead.glsl';
import vsLineMain from './vsLineMain.glsl';
import getShiftFuncs from './getShiftFuncs.glsl';

import { easeFunctions } from '../easeFunctions';
import fsLineHead from './fsLineHead.glsl';
import fsLineAnimateFuncs from './fsLineAnimateFuncs.glsl';
import fsLineMain from './fsLineMain.glsl';
import fsLineBasic from './fsLineBasic.glsl';

import fsColorTexture from './fsColorTexture.glsl';
import fsVarColorTexture from './fsVarColorTexture.glsl';
import fsLabelTexture from './fsLabelTexture.glsl';

import fsCurve from './fsCurve.glsl';

import vsCurveHead from './vsCurveHead.glsl';
import vsCurveMain from './vsCurveMain.glsl';
import vsCircleHead from './vsCircleHead.glsl';
import vsCircleMain from './vsCircleMain.glsl';

import vsNode from './vsNode.glsl';
import vsNodeColored from './vsNodeColored.glsl';

import vsLineArrowHead from './vsLineArrowHead.glsl';
import vsLineArrowMain from './vsLineArrowMain.glsl';
import vsCurveArrowHead from './vsCurveArrowHead.glsl';
import vsCurveArrowMain from './vsCurveArrowMain.glsl';
import vsCircleArrowHead from './vsCircleArrowHead.glsl';
import vsCircleArrowMain from './vsCircleArrowMain.glsl';

const vsLine = [vsLineHead, getShiftFuncs, vsLineMain].join('\n');
const vsCurve = [vsCurveHead, getShiftFuncs, vsCurveMain].join('\n');
const vsCircle = [vsCircleHead, getShiftFuncs, vsCircleMain].join('\n');

const vsLineArrow = [vsLineArrowHead, getShiftFuncs, vsLineArrowMain].join(
  '\n'
);
const vsCurveArrow = [vsCurveArrowHead, getShiftFuncs, vsCurveArrowMain].join(
  '\n'
);
const vsCircleArrow = [
  vsCircleArrowHead,
  getShiftFuncs,
  vsCircleArrowMain,
].join('\n');

const easeFunctionPart = ease => {
  return `${easeFunctions[ease ? ease : 'linear']}`;
};

const fsLineAnimate = ease => {
  return [
    fsLineHead,
    easeFunctionPart(ease),
    fsLineAnimateFuncs,
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
  fsCircle: fsCurve,
  vsCircle,
  vsNode,
  vsNodeColored,
  vsLineArrow,
  vsCurveArrow,
  vsCircleArrow,
};

export { elementShaders };
