import linear from './linear.glsl';
import sinIn from './sin-in.glsl';
import sinOut from './sin-out.glsl';
import sinInOut from './sin-inout.glsl';
import expIn from './exp-in.glsl';
import expOut from './exp-out.glsl';
import expInOut from './exp-inout.glsl';
import bounceIn from './bounce-in.glsl';
import bounceOut from './bounce-out.glsl';
import bounceInOut from './bounce-inout.glsl';
import circularIn from './circular-in.glsl';
import circularOut from './circular-out.glsl';
import circularInOut from './circular-inout.glsl';
import quadIn from './quad-in.glsl';
import quadOut from './quad-out.glsl';
import quadInOut from './quad-inout.glsl';
import cubicIn from './cubic-in.glsl';
import cubicOut from './cubic-out.glsl';
import cubicInOut from './cubic-inout.glsl';
import quartIn from './quart-in.glsl';
import quartOut from './quart-out.glsl';
import quartInOut from './quart-inout.glsl';
import quintIn from './quint-in.glsl';
import quintOut from './quint-out.glsl';
import quintInOut from './quint-inout.glsl';

const easeFunctions = {
    'linear': linear,
    'sin-in': sinIn,
    'sin-out': sinOut,
    'sin-inout': sinInOut,
    'exp-in': expIn,
    'exp-out': expOut,
    'exp-inout': expInOut,
    'bounce-in': bounceIn,
    'bounce-out': bounceOut,
    'bounce-inout': bounceInOut,
    'circular-in': circularIn,
    'circular-out': circularOut,
    'circular-inout': circularInOut,
    'quad-in': quadIn,
    'quad-out': quadOut,
    'quad-inout': quadInOut,
    'cubic-in': cubicIn,
    'cubic-out': cubicOut,
    'cubic-inout': cubicInOut,
    'quart-in': quartIn,
    'quart-out': quartOut,
    'quart-inout': quartInOut,
    'quint-in': quintIn,
    'quint-out': quintOut,
    'quint-inout': quintInOut,
}

export {
    easeFunctions,
}