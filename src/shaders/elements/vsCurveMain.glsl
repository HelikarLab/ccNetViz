void main(void) {
  vec2 n = vec2(normal.x, aspect2 * normal.y);
  float length = length(screen * n);
  n = length == 0.0 ? vec2(0, 0) : n / length;
  gl_Position = getShiftCurve() + getShiftCircle() + vec4(exc * n, 0, 0) +
                transform * vec4(position, 0, 1);
  c = curve;

  vec4 p = transform * vec4(lengthSoFar, 0, 0);
  v_lengthSoFar = vec2(p.x, p.y / aspect);
}