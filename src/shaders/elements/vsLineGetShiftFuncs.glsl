attribute vec2 curveShift;
vec4 getShiftCurve(void) {
  vec2 shiftN = vec2(curveShift.x, aspect2 * curveShift.y);
  float length = length(screen * shiftN);
  return vec4(exc * (length == 0.0 ? vec2(0, 0) : shiftN * 0.5 / length), 0, 0);
}
attribute vec2 circleShift;
vec4 getShiftCircle(void) { return vec4(size * circleShift, 0, 0); }

