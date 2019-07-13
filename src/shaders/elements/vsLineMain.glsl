void main(void) {
  vec2 finalWidth = vec2(max(width, animateMaxWidth), max(width, animateMaxWidth));
  gl_Position = getShiftCurve() + getShiftCircle() +
                vec4(finalWidth / screen * normal, 0, 0) + transform * vec4(position, 0, 1);

  vec4 p = transform * vec4(lengthSoFar, 0, 0);
  v_lengthSoFar = vec2(p.x, p.y / aspect);
  v_time = time;
  v_startPos = startPos;
  v_endPos = endPos;
  v_screen = screen;

  n = normal;
}
