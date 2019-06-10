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
}

export {
    easeFunctions,
}