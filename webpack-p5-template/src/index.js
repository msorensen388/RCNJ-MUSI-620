import p5 from 'p5';
import 'reset.css';

const WIDTH = 800,
    HEIGHT = 600;


const s = sketch => {
    
    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(100, 100,50,50);
    };
};

const main = async () => {

    let theP5 = new p5(s);
};

main().then(() => console.log('Started'));