void main(void) {
  vec2 u = direction / length(screen * direction);
  vec2 v = vec2(u.y, -aspect2 * u.x);
  v = v / length(screen * v);
  gl_Position =
      getShiftCurve() + getShiftCircle() +
      vec4(arrowsize.x * (0.5 - textureCoord.x) * v -
               arrowsize.y * textureCoord.y * u - offset * offsetMul * u,
           0, 0) +
      transform * vec4(position, 0, 1);
  tc = textureCoord;
}