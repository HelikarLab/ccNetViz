void main(void) {
  gl_Position = getShiftCurve() + getShiftCircle() + vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);

  vec4 p = transform * vec4(lengthSoFar, 0, 0);
  v_lengthSoFar = vec2(p.x, p.y / aspect);

  n = normal;
}