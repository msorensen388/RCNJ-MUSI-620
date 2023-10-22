import p5 from 'p5';
window.p5 = p5;
require('p5/lib/addons/p5.sound');
import 'reset.css';
import { s } from './sketch';

const main = async () => new p5(s);

main().then(() => console.log('Started'));
