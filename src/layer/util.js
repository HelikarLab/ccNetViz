const normalize = (a, b) => {
  let x = b.x - a.x;
  let y = b.y - a.y;
  let sc = 1 / Math.sqrt(x * x + y * y);
  return { x: sc * x, y: sc * y };
};

export { normalize };
