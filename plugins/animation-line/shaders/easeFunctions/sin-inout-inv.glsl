#ifndef PI
#define PI 3.141592653589793
#endif

float ease(float t) {
  return acos(1. - 2. * t) / PI;
}