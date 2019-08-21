void main(void) {
  gl_Position = getShiftCurve() + getShiftCircle() + vec4(size * normal, 0, 0) +
                transform * vec4(position, 0, 1);
  c = curve;

  vec4 p = transform * vec4(size * lengthSoFar, 0, 0);
  v_lengthSoFar = vec2(p.x, p.y / aspect);
}