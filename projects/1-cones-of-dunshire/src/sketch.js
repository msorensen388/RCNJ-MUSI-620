import p5 from 'p5';


export const s = sketch => {

  var screenWidth = 500,
    screenHeight = 500;

  var frameCounter = 0;
  const numberCircles = 5;
  const xIncrement = screenWidth / numberCircles;
  const yIncrement = screenHeight / numberCircles;

  var increasing = true;

  var r = 0,
    g = 0,
    b = 0;

  var x = 0,
    y = 0,
    diameter = 0;

  function calculateColor(a, b, c, range) {
    r++;
    g+=2;
    b--;

    if (a > range) {
        r = 0;
    }
    if (b > range) {
        g = 0;
    }
    if (c < 0) {
        b = range;
    }

    return { r, g, b };
  }
  function calculateCircle(x, y, diameter, increasing) {
      x++;
      y--;

      if (increasing) {
          diameter++;
      } else {
          diameter--;
      }

      if (x > screenWidth || x < 0) {
          x = 0;
      }
      if (y > screenHeight || y < 0) {
          y = screenHeight;
      }

      return { x, y, diameter };
  }

  sketch.setup = () => {
      sketch.createCanvas(screenWidth, screenHeight);
  };

  sketch.draw = () => {
      frameCounter++;

      if (frameCounter === 300) {
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

          const newXY = calculateCircle(x, y, diameter, increasing)
          x = newXY.x;
          y = newXY.y;
          diameter = newXY.diameter;

          sketch.fill(r, g, b);
          sketch.circle(x + xIncrement * i, y + yIncrement * i, diameter);
      }

  }
};
