precision mediump float;
uniform float type;
uniform vec4 color;
varying vec2 n;
varying vec2 v_lengthSoFar;
uniform float lineSize;
void main(void) {
  float part = abs(fract(length(v_lengthSoFar) * lineSize * 5.0));

  // line types
  if (type >= 2.5) { // 3.0 dotted
    part = fract(part * 3.0);
    if (part < 0.5)
      discard;
  } else if (type >= 1.5) { // 2.0 - chain dotted
    if (part < 0.15)
      discard;
    if (part > 0.30 && part < 0.45)
      discard;
  } else if (type >= 0.5) { // 1.0 - dashed
    if (part < 0.5)
      discard;
  }

  gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));
}