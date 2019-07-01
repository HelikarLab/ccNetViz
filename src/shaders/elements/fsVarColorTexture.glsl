precision mediump float;
uniform sampler2D texture;
varying vec2 tc;
varying vec4 c;
void main(void) {
   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));
}