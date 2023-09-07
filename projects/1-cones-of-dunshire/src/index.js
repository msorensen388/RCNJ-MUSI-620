import p5 from 'p5';
import 'reset.css';
import { s } from './sketch';

const main = async () => new p5(s);

main().then(() => console.log('Started'));
