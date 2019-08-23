precision mediump float;
uniform vec4 borderColor;
varying vec2 nB;
void main() { 
  gl_FragColor = vec4(borderColor.r, borderColor.g, borderColor.b, borderColor.a-length(nB));
}