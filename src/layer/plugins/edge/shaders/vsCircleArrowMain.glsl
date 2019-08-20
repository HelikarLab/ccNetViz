void main(void) {
  vec2 u = direction;
  vec2 v = vec2(direction.y, -direction.x);
  gl_Position =
      getShiftCurve() + getShiftCircle() +
      vec4((arrowsize.x * (0.5 - textureCoord.x) * v -
            arrowsize.y * textureCoord.y * u - offset * offsetMul * u) /
               screen,
           0, 0) +
      transform * vec4(position, 0, 1);
  tc = textureCoord;
}