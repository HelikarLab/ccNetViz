attribute vec2 position;
attribute vec2 relative;
uniform vec2 scale;
uniform mat4 transform;
uniform float fontScale;
uniform float offset;
void main(void) {
   gl_Position = vec4(scale * (relative*fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);
}
