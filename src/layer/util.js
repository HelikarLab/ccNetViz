const normalize = (a, b) => {
  let x = b.x - a.x;
  let y = b.y - a.y;
  let sc = 1 / Math.sqrt(x * x + y * y);
  return { x: sc * x, y: sc * y };
};

const stopWatch = (text = '', action) => {
  const startDate = new Date();
  console.log(`Starting ${text}`);

  action();

  const tookMs = new Date().getTime() - startDate.getTime();
  console.log(`Finishing ${text} (took ${tookMs}ms)`);
};

export { normalize, stopWatch };
