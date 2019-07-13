void main(void) {
  float part = abs(fract(length(v_lengthSoFar) * lineSize * 5.0));

  // line types
  if (type >= 2.5) { // 3.0 dotted
    part = fract(part * 3.0);
    if (part < 0.5)
      discard;
  } else if (type >= 1.5) { // 2.0 - chain dotted
    if (part < 0.15)
      discard;
    if (part > 0.30 && part < 0.45)
      discard;
  } else if (type >= 0.5) { // 1.0 - dashed
    if (part < 0.5)
      discard;
  }

  // line animate types
  if (animateType >= 3.5) {
    gl_FragColor = isAnimateBubble() * color;
  } else if (animateType >= 2.5) {
    gl_FragColor = isAnimateCoveredDoubleGradient() * animateColor +
                   (1. - isAnimateCoveredDoubleGradient()) * color;
  } else if (animateType >= 1.5) {
    gl_FragColor = isAnimateCoveredGradient() * animateColor +
                   (1. - isAnimateCoveredGradient()) * color;
  } else if (animateType >= 0.5) {
    gl_FragColor =
        isAnimateCovered() * animateColor + (1. - isAnimateCovered()) * color;
  } else {
    gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));
  }
}