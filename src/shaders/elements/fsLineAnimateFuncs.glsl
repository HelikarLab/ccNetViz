#ifndef PI
#define PI 3.141592653589793
#endif

float isAnimateCovered() {
  vec2 pos = gl_FragCoord.xy;
  vec2 viewport = 2. * v_screen;
  float maxLen = length(viewport);
  vec2 startPos = viewport * (v_startPos + vec2(1., 1.)) / 2.;
  vec2 endPos = viewport * (v_endPos + vec2(1., 1.)) / 2.;

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
  vec2 startPos = viewport * (v_startPos + vec2(1., 1.)) / 2.;
  vec2 endPos = viewport * (v_endPos + vec2(1., 1.)) / 2.;

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
  vec2 startPos = viewport * (v_startPos + vec2(1., 1.)) / 2.;
  vec2 endPos = viewport * (v_endPos + vec2(1., 1.)) / 2.;

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
  vec2 pos = gl_FragCoord.xy;
  vec2 viewport = 2. * v_screen;
  float maxLen = length(viewport);

  vec2 startPos = viewport * (v_startPos + vec2(1., 1.)) / 2.;
  vec2 endPos = viewport * (v_endPos + vec2(1., 1.)) / 2.;

  vec2 vec = endPos - startPos;
  vec2 norm = normalize(vec2(-vec.y, vec.x));
  // vec2 norm = normalize(n);
  mat2 rotateMat = mat2(norm.y, norm.x, -norm.x, norm.y); // rotate to horizental

  float totalLen = distance(startPos, endPos);
  float r = v_animateMaxWidth * 2. + ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) * (totalLen - v_animateMaxWidth * 4.);
  // float r = 0.5 * totalLen;

  float currWidth = length(dot(pos - startPos, norm));

  vec2 center = startPos + normalize(vec) * r;
  vec2 newPos = center + (rotateMat * (pos - center));
  vec2 relativePos = newPos - center;

  // if (currWidth > v_lineWidth && length(pos - center) > v_animateMaxWidth) {
    // return 0.;
  // }

  float shapeLen = 4. * v_animateMaxWidth; // TODO: may be configurable
  float A = (v_animateMaxWidth - v_lineWidth) / 2.;
  float K = 2. * PI / shapeLen;
  float B = v_lineWidth + (v_animateMaxWidth - v_lineWidth) / 2.;
  float draw = 1.;
  if (currWidth > v_lineWidth) {
    draw = 0.;
  }
  if (length(relativePos.x) < shapeLen / 2. && abs(A * cos(K * relativePos.x) + B) > abs(relativePos.y)) {
    draw = 1.;
  }

  return draw;

  // float draw = 1. - step(r, len);
  // return draw;
}

float waveCurve(float A, float B, float x) {
  return A * (sin(PI * (x / B + 1.) * (x / B + 1.)) * (1. - step(0., x)) + -sin(PI * (-x / B + 1.) * (-x / B + 1.)) * step(0., x));
}

float waveCurveGrad(float A, float B, float x) {
  return A * (cos(PI * (x / B + 1.) * (x / B + 1.)) * 2. * PI / B * (x / B + 1.) * (1. - step(0., x)) +
          -cos(PI * (-x / B + 1.) * (-x / B + 1.)) * 2. * PI / (-B) * (-x / B + 1.) * step(0., x));
}

float isAnimateWave() {
  vec2 pos = gl_FragCoord.xy;
  vec2 viewport = 2. * v_screen;
  float maxLen = length(viewport);

  vec2 startPos = viewport * (v_startPos + vec2(1., 1.)) / 2.;
  vec2 endPos = viewport * (v_endPos + vec2(1., 1.)) / 2.;

  vec2 vec = endPos - startPos;
  vec2 norm = normalize(vec2(-vec.y, vec.x));
  // vec2 norm = normalize(n);
  mat2 rotateMat = mat2(norm.y, norm.x, -norm.x, norm.y); // rotate to horizental

  float totalLen = distance(startPos, endPos);
  // float r = ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) * totalLen;
  // float r = v_animateMaxWidth * 2. + ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) * (totalLen - v_animateMaxWidth * 4.);
  float r = v_animateMaxWidth + ease(fract(v_time * animateSpeed * 0.2 * maxLen / totalLen)) * (totalLen - v_animateMaxWidth * 2.);
  // float r = 0.5 * totalLen;

  float currWidth = length(dot(pos - startPos, norm));

  vec2 center = startPos + normalize(vec) * r;
  vec2 newPos = center + (rotateMat * (pos - center));
  vec2 relativePos = newPos - center;

  float shapeLen = 2. * v_animateMaxWidth; // TODO: may be configurable
  float draw = 1.;
  if (length(relativePos.x) < shapeLen / 2. || currWidth > v_lineWidth) {
    draw = 0.;
  }
  float A = v_animateMaxWidth - v_lineWidth;
  float B = shapeLen / 2.;
  if (length(relativePos.x) < shapeLen / 2. && abs(waveCurve(A, B, relativePos.x) - relativePos.y) < v_lineWidth * sqrt(1. + abs(pow(waveCurveGrad(A, B, relativePos.x), 1.)))) {
    draw = 1.;
  }

  return draw;
}