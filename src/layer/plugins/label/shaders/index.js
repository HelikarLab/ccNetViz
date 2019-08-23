import vsLabelHead from './vsLabelHead.glsl';
import vsCurveLabelUtilityHead from './vsCurveLabelUtilityHead.glsl';
import vsCurveLabelMain from './vsCurveLabelMain.glsl';
import vsCircleLabelMain from './vsCircleLabelMain.glsl';
import vsDefaultLabel from './vsDefaultLabel.glsl';

import vsLabelbgHead from './vsLabelbgHead.glsl';
import vsDefaultLabelbg from './vsDefaultLabelbg.glsl';
import vsCurveLabelbgMain from './vsCurveLabelbgMain.glsl';
import vsCircleLabelbgMain from './vsCircleLabelbgMain.glsl';

import vsLabelBorderHead from './vsLabelBorderHead.glsl';
import vsDefaultLabelBorder from './vsDefaultLabelBorder.glsl';
import vsCurveLabelBorderMain from './vsCurveLabelBorderMain.glsl';
import vsCircleLabelBorderMain from './vsCircleLabelBorderMain.glsl';

import fsLabelsBackgroundShader from './fsLabelsBackgroundShader.glsl';
import fsLabelsBorder from './fsLabelsBorder.glsl';
import fsLabelTexture from './fsLabelTexture.glsl';

import getShiftFuncs from '../../edge/shaders/getShiftFuncs.glsl';

const vsCurveLabelsShader = [
  vsLabelHead,
  vsCurveLabelUtilityHead,
  getShiftFuncs,
  vsCurveLabelMain,
].join('\n');
const vsCircleLabelsShader = [
  vsLabelHead,
  vsCurveLabelUtilityHead,
  getShiftFuncs,
  vsCircleLabelMain,
].join('\n');
const vsDfLabelShader = [vsLabelHead, vsDefaultLabel].join('\n');

const vsDfLabelBackground = [vsLabelbgHead, vsDefaultLabelbg].join('\n');
const vsCurveLabelBackground = [
  vsLabelbgHead,
  vsCurveLabelUtilityHead,
  getShiftFuncs,
  vsCurveLabelbgMain,
].join('\n');
const vsCircleLabelBackground = [
  vsLabelbgHead,
  vsCurveLabelUtilityHead,
  getShiftFuncs,
  vsCircleLabelbgMain,
].join('\n');

const vsDfLabelBorder = [vsLabelBorderHead, vsDefaultLabelBorder].join('\n');
const vsCurveLabelBorder = [
  vsLabelBorderHead,
  vsCurveLabelUtilityHead,
  getShiftFuncs,
  vsCurveLabelBorderMain,
].join('\n');
const vsCircleLabelBorder = [
  vsLabelBorderHead,
  vsCurveLabelUtilityHead,
  getShiftFuncs,
  vsCircleLabelBorderMain,
].join('\n');

const shaders = {
  vsCurveLabelsShader,
  vsCircleLabelsShader,
  vsDfLabelShader,
  vsDfLabelBackground,
  vsCurveLabelBackground,
  vsCircleLabelBackground,
  vsDfLabelBorder,
  vsCurveLabelBorder,
  vsCircleLabelBorder,
  fsLabelTexture,
  fsLabelsBackgroundShader,
  fsLabelsBorder,
};

export { shaders };
