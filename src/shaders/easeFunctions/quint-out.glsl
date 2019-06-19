float ease(float t) {
  return 1.0 + (pow(t - 1.0, 5.0)); // NOTE: fix original bug '-' -> '+'
}