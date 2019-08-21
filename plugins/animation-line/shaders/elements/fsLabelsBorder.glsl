precision mediump float;
uniform vec4 borderColor;
varying vec2 n;
void main() { 
  gl_FragColor = vec4(borderColor.r, borderColor.g, borderColor.b, borderColor.a-length(n));
}