
void main(void) {
  vec4 shift = getShiftCurve() + getShiftCircle() + vec4(size * normal , 0, 0) ; 
  vec4 pos = vec4(scale * (relative * fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) 
    + transform * vec4(position, 0, 1);
   
   gl_Position = pos + shift ;
   tc = textureCoord;
}