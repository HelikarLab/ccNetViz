#extension GL_OES_standard_derivatives : enable
#ifdef GL_ES
precision highp float;
#endif
uniform float width;
uniform vec4 color;
uniform float type;
uniform float lineStepSize;
uniform float lineSize;
varying vec2 c;
varying vec2 v_lengthSoFar;
void main(void) {
  float part = abs(fract(length(v_lengthSoFar) * lineStepSize * lineSize));

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

  vec2 px = dFdx(c);
  vec2 py = dFdy(c);
  float fx = 2.0 * c.x * px.x - px.y;
  float fy = 2.0 * c.y * py.x - py.y;
  float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);
  float alpha = 1.0 - abs(sd) / width;
  if (alpha < 0.0)
    discard;
  gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));
}