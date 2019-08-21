precision mediump float;
uniform vec4 color;
uniform sampler2D texture;
varying vec2 tc;
void main(void) {
   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));
}