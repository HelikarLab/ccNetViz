void main(void) {
  vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));
  u = normalize(direction - cexc * u / length(screen * u));
  u = u / length(screen * u);
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