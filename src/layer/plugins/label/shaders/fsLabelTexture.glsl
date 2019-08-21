precision mediump float;
uniform lowp sampler2D texture;
uniform mediump vec4 color;
uniform mediump float height_font;
uniform float type;
uniform float buffer;
uniform float boldness;
float gamma = 4.0 * 1.4142 * boldness / height_font;
varying mediump vec2 tc;
void main() {
  if(type > 0.5){  //SDF
    float tx=texture2D(texture, tc).a;
    float a= smoothstep(buffer - gamma, buffer + gamma, tx);
    gl_FragColor=vec4(color.rgb, a*color.a);
  }else{ //NORMAL FONT
    gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));
  }
}