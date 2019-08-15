float ease(float t) {
  return t < 0.5
    ? pow((t / 8.), 0.25)
    : -pow((1.0 - t) / 8., 0.25) + 1.;
}