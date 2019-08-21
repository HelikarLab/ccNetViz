import vsLineHead from './vsLineHead.glsl';
import vsLineMain from './vsLineMain.glsl';
import getShiftFuncs from './getShiftFuncs.glsl';

import { easeFunctions } from '../easeFunctions';
import fsLineHead from './fsLineHead.glsl';
import fsLineAnimateFuncs from './fsLineAnimateFuncs.glsl';
import fsLineMain from './fsLineMain.glsl';

const vsLine = [vsLineHead, getShiftFuncs, vsLineMain].join('\n');
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
};

export { elementShaders };
