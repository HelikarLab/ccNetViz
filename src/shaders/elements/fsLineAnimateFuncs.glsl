float isAnimateCovered() {
  vec2 pos = gl_FragCoord.xy;
  vec2 viewport = 2. * v_screen;
  float maxLen = length(viewport);
  vec2 startPos = viewport * v_startPos;
  vec2 endPos = viewport * v_endPos;
  float totalLen = distance(startPos, endPos);
  float len = distance(pos, startPos);
  // float r = 300.;
  float r =
      ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) * totalLen;
  // float r = 0.5 * totalLen;
  float draw = 1. - step(r, len);
  return draw;
}

float isAnimateCoveredGradient() {
  vec2 pos = gl_FragCoord.xy;
  vec2 viewport = 2. * v_screen;
  float maxLen = length(viewport);
  vec2 startPos = viewport * v_startPos;
  vec2 endPos = viewport * v_endPos;
  float totalLen = distance(startPos, endPos);
  float len = distance(pos, startPos);
  float gradLen = 180.; // TODO: can config
  float r = ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) *
            (totalLen + gradLen / 2.); // NOTE: use 0.2 as a proper factor
  // float r = 0.5 * totalLen;
  float draw = fract(smoothstep(r - gradLen, r, len));
  return draw;
}

float isAnimateCoveredDoubleGradient() {
  vec2 pos = gl_FragCoord.xy;
  vec2 viewport = 2. * v_screen;
  float maxLen = length(viewport);
  vec2 startPos = viewport * v_startPos;
  vec2 endPos = viewport * v_endPos;
  float totalLen = distance(startPos, endPos);
  float len = distance(pos, startPos);
  float gradLen = 90.; // TODO: can config
  float r = ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) *
            (totalLen + gradLen / 2.); // NOTE: use 0.2 as a proper factor

  float draw = (1. - step(r, len)) * fract(smoothstep(r - gradLen, r, len)) +
               (1. - step(r + gradLen, len)) * step(r, len) *
                   (1. - fract(smoothstep(r, r + gradLen, len)));
  return draw;
}

float isAnimateBubble() {
  // TODO: implement bubble shape
  return 1.;
}