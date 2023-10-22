// this import isn't actually necessary but resolves eslint error
import p5 from 'p5';

export const s = sketch => {

  const canvasWidth = 700,
    canvasHeight = 600,
    numOscillators = 8,
    fundamental = 200,
    headerOffset = 140,
    sliderInterval = 50,
    leftPosition = 40;

  let amplitudeSliders = [],
    frequencySliders = [],
    oscillators = [],
    harmonies = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2],
    isPlaying = false,
    startStopButton,
    randomAmplitudeButton,
    randomFrequenciesButton;

  // sliders control oscillator amplitude
  const createSliders = () => {
    for (let j = 0; j < numOscillators; j++) {
      amplitudeSliders.push(sketch.createSlider(0, 100, 50, 1));
      amplitudeSliders[j].position(leftPosition, headerOffset + 50 + sliderInterval * j);
    }
    for (let j = 0; j < numOscillators; j++) {
      frequencySliders.push(sketch.createSlider(0, fundamental * 4, 50, 0.0000000000001));
      frequencySliders[j].position(canvasWidth - 200, headerOffset + 50 + sliderInterval * j);
    }
  };

  const createOscillators = () => {
    for (let i = 0; i < numOscillators; i++) {
      oscillators[i] = new p5.Oscillator('sine');
      oscillators[i].freq(frequencySliders[i].value(), 0.1);
      oscillators[i].amp(amplitudeSliders[i].value(), 0.1);
    }
  };

  const startStop = () => {
    if (!isPlaying) {
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].start();
      }
      isPlaying = true;
    } else {
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].amp(0, 0.5);
      }
      isPlaying = false;
    }
  };

  const randomizeAmplitudes = () => {
    for (let i = 0; i < numOscillators; i++) {
      const newAmplitude = sketch.random(100);
      amplitudeSliders[i].value(newAmplitude);
      oscillators[i].amp(0, newAmplitude / 100);
    }
  };

  const randomizeFrequencies = () => {
    for (let i = 0; i < numOscillators; i++) {
      frequencySliders[i].value(frequencySliders[i].value() + sketch.random(-50, 50));
    }
  };

  sketch.setup = () => {
    const { createCanvas, createButton, fill } = sketch;
    createCanvas(canvasWidth, canvasHeight);

    fill(100, 0, 255);

    startStopButton = createButton('Start/Stop');
    startStopButton.position(canvasWidth / 2 - 40, headerOffset);
    startStopButton.mouseClicked(startStop);

    randomAmplitudeButton = createButton('Randomize Amplitudes');
    randomAmplitudeButton.position(leftPosition, headerOffset);
    randomAmplitudeButton.mouseClicked(randomizeAmplitudes);

    randomFrequenciesButton = createButton('Randomize Frequencies');
    randomFrequenciesButton.position(canvasWidth - 200, headerOffset);
    randomFrequenciesButton.mouseClicked(randomizeFrequencies);

    createSliders();
    createOscillators();

    for (let i = 0; i < numOscillators; i++) {
      frequencySliders[i].value(fundamental * harmonies[i]);
    }
  };

  sketch.draw = () => {
    const {
      background,
      strokeWeight,
      fill,
      textSize,
      textFont,
      text,
      random,
    } = sketch;

    background(232, 252, 3);

    strokeWeight(2);
    fill(100, 0, 255);
    textSize(50);
    textFont('Anton');
    text('DRONE', leftPosition, 90);
    text('MONARCH', 480, 90);

    if (isPlaying) {
      for (let i = 0; i < numOscillators; i++) {
        frequencySliders[i].value(frequencySliders[i].value() + random(-0.5, 0.5));
        oscillators[i].freq(frequencySliders[i].value(), 0.1);
        oscillators[i].amp(amplitudeSliders[i].value() / 100, 0.5);
      }
    }
  };
};
