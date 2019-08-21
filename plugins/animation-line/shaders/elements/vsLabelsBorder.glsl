precision mediump float;
attribute vec2 relative;
attribute vec2 position;
attribute vec2 normal;
uniform vec2 width;
uniform mat4 transform;
uniform float fontScale;
uniform float offset;
uniform vec2 scale;
varying vec2 n;
void main(void) {
   vec4 pos = vec4(scale * (relative*fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);
  gl_Position =  vec4(width * normal, 0, 0) + pos;
  n = normal;
}