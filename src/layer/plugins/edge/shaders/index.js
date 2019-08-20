import vsLineHead from './vsLineHead.glsl';
import vsLineMain from './vsLineMain.glsl';
import getShiftFuncs from './getShiftFuncs.glsl';

import fsLineBasic from './fsLineBasic.glsl';

import fsColorTexture from './fsColorTexture.glsl';

import fsCurve from './fsCurve.glsl';

import vsCurveHead from './vsCurveHead.glsl';
import vsCurveMain from './vsCurveMain.glsl';
import vsCircleHead from './vsCircleHead.glsl';
import vsCircleMain from './vsCircleMain.glsl';

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

const shaders = {
  vsLine,
  fsLineBasic,
  vsCurve,
  fsCurve,
  vsCircle,
  fsCircle: fsCurve,
  vsLineArrow,
  fsColorTexture,
  vsCurveArrow,
  vsCircleArrow,
};

export { shaders };
