export const s = sketch => {

  const screenWidth = 500,
    screenHeight = 500;

  let frameCounter = 0;
  const numberCircles = 10;

  // distance between circles
  const xGap = screenWidth / numberCircles,
    yGap = screenHeight / numberCircles;

  console.log(xGap);

  let increasing = true;

  let r = 0,
    g = 0,
    b = 0;

  let x = -screenWidth / 2,
    y = 0,
    diameter = 0;

  const calculateColor = (a, b, c, range) => {
    r++;
    g+=2;
    b--;

    if (a > range) r = 0;
    if (b > range) g = 0;
    if (c < 0) b = range;

    return { r, g, b };
  };

  const calculateCircle = (x, y, diameter, increasing) => {
    x++;
    y--;

    if (increasing) {
      diameter++;
    } else {
      diameter--;
    }

    if (x > screenWidth || x < 0) x = 0;
    if (y > screenHeight || y < 0) y = screenHeight;

    return { x, y, diameter };
  };

  sketch.setup = () => {
    sketch.createCanvas(screenWidth * 2, screenHeight * 2);
  };

  sketch.draw = () => {
    frameCounter++;

    if (frameCounter === 300) {
      sketch.clear();
      sketch.background(220);
    }

    for (var i = 0; i < numberCircles; i++) {
      const newRGB = calculateColor(r, g, b, 255);
      r = newRGB.r;
      g = newRGB.g;
      b = newRGB.b;

      if (diameter === 100) {
        increasing = false;
      }
      if (diameter === 0) {
        increasing = true;
      }

      const newXY = calculateCircle(x, y, diameter, increasing);
      x = newXY.x;
      y = newXY.y;
      diameter = newXY.diameter;

      sketch.fill(r, g, b);

      if (i < numberCircles / 2) {
        sketch.circle(x, y + yGap * i, diameter);
      } else {
        sketch.circle(x + xGap * i, y + yGap * numberCircles / 2, diameter);
      }
    }
  };
};
