// this import isn't actually necessary but resolves eslint error
import p5 from 'p5';

export const s = sketch => {

  const canvasWidth = 700,
    canvasHeight = 600,
    numOscillators = 8,
    headerOffset = 140,
    sliderInterval = 50,
    defaultFundamental = 200,
    frequencyRange = defaultFundamental * 4,
    leftPosition = 40,
    middlePosition = canvasWidth / 2 - 80;

  let fundSlider,
    ampSliders = [],
    freqSliders = [],
    oscillators = [],
    freqTransSlider,
    wanderValueSlider,
    ampTransSlider,
    randomAmplitudeButton,
    randomFrequenciesButton,
    harmonies = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2],
    isPlaying = false,
    startStopButton,
    currentFundamental = defaultFundamental;

  function getSliderTop(index) {
    return headerOffset + 50 + sliderInterval * index;
  }

  // sliders control oscillator amplitude
  function createSliders() {

    // Fundamental frequency slider
    fundSlider = sketch.createSlider(100, 500, defaultFundamental);
    fundSlider.position(middlePosition, 250);

    // Amplitude controls
    for (let i = 0; i < numOscillators; i++) {
      ampSliders.push(sketch.createSlider(0, 100, 50, 1));
      ampSliders[i].position(leftPosition, getSliderTop(i));
    }

    // Harmonic controls
    for (let i = 0; i < numOscillators; i++) {
      freqSliders.push(sketch.createSlider(0, frequencyRange, 50, 0.0000000000001));
      freqSliders[i].position(canvasWidth - 200, getSliderTop(i));
    }

    // Transition length sliders
    freqTransSlider = sketch.createSlider(0, 1, 0.1, 0.01);
    freqTransSlider.position(middlePosition, 325);
    wanderValueSlider = sketch.createSlider(0, 10, 0.5, 0.1);
    wanderValueSlider.position(middlePosition, 400);
    ampTransSlider = sketch.createSlider(0, 1, 0.1, 0.01);
    ampTransSlider.position(middlePosition, 475);
  }

  function createOscillators() {

    for (let i = 0; i < numOscillators; i++) {
      oscillators[i] = new p5.Oscillator('sine');
      oscillators[i].freq(freqSliders[i].value(), 0.1);
      oscillators[i].amp(ampSliders[i].value(), 0.1);
    }
  }

  function startStop() {

    if (!isPlaying) {
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].start();
      }

    } else {

      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].amp(0, 0.5);
      }
    }

    isPlaying = !isPlaying;
  }

  function randomizeAmplitudes() {
    for (let i = 0; i < numOscillators; i++) {
      const newAmplitude = sketch.random(100);
      ampSliders[i].value(newAmplitude);
      oscillators[i].amp(0, newAmplitude / 100);
    }
  }

  function randomizeFrequencies() {
    for (let i = 0; i < numOscillators; i++) {
      freqSliders[i].value(sketch.random(currentFundamental, frequencyRange));
    }
  }

  sketch.setup = () => {
    sketch.createCanvas(canvasWidth, canvasHeight);

    sketch.background(232, 252, 3);

    sketch.fill(100, 0, 255);

    startStopButton = sketch.createButton('Start/Stop');
    startStopButton.position(canvasWidth / 2 - 40, headerOffset);
    startStopButton.mouseClicked(startStop);

    randomAmplitudeButton = sketch.createButton('Randomize Amplitudes');
    randomAmplitudeButton.position(leftPosition, headerOffset);
    randomAmplitudeButton.mouseClicked(randomizeAmplitudes);

    randomFrequenciesButton = sketch.createButton('Randomize Frequencies');
    randomFrequenciesButton.position(canvasWidth - 200, headerOffset);
    randomFrequenciesButton.mouseClicked(randomizeFrequencies);

    createSliders();
    createOscillators();

    for (let i = 0; i < numOscillators; i++) {
      freqSliders[i].value(defaultFundamental * harmonies[i]);
    }

    // header stuff
    sketch.strokeWeight(2);
    sketch.fill(100, 0, 255);
    sketch.textSize(50);
    sketch.textAlign(sketch.LEFT);
    sketch.textFont('Anton');
    sketch.text('DRONE', leftPosition, 90);
    sketch.text('MONARCH', 480, 90);
    sketch.textSize(70);
    sketch.textAlign(sketch.CENTER);
    sketch.text('2.0', canvasWidth / 2, 90);

    // slider labels
    sketch.textSize(16);
    sketch.textAlign(sketch.LEFT);
    sketch.textFont('Arial');
    sketch.text('Fundamental', middlePosition, 240);
    sketch.text('Freq Trans Time', middlePosition, 310);
    sketch.text('Freq Rand Range', middlePosition, 390);
    sketch.text('Amp Trans Time', middlePosition, 470);
  };

  sketch.draw = () => {

    // if the fundamental slider is changed update oscillators to new harmonic series
    if (currentFundamental !== fundSlider.value()) {
      currentFundamental = fundSlider.value();

      for (let i = 0; i < numOscillators; i++) {
        freqSliders[i].value(currentFundamental * harmonies[i]);
      }
    } else if (isPlaying) {

      for (let i = 0; i < numOscillators; i++) {

        //randomly change frequency of oscillators
        const wanderValue = wanderValueSlider.value();
        let newFrequency = freqSliders[i].value() + sketch.random(-wanderValue, wanderValue);
        if (newFrequency <= 0) newFrequency = 0.1;
        if (newFrequency > frequencyRange) newFrequency = frequencyRange;
        freqSliders[i].value(newFrequency);
        oscillators[i].freq(newFrequency, freqTransSlider.value());

        oscillators[i].amp(ampSliders[i].value() / 100, ampTransSlider.value());
      }
    }
  };
};

