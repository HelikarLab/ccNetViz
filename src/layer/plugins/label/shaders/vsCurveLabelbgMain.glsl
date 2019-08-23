void main(void) {
  vec2 n = vec2(normal.x, aspect2 * normal.y);
  float length = length(screen * n);
  n = length == 0.0 ? vec2(0, 0) : n / length;
  
  vec4 shift = getShiftCurve() + getShiftCircle() + vec4(( exc / 2.0 * n ), 0, 0) ; 
  vec4 pos = vec4(scale * ( relative*fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0)
    + transform * vec4(position, 0, 1)   ;
  
  gl_Position = pos + shift;
   
}