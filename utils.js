import {fileURLToPath} from 'url';
import { dirname } from 'path'; //=> Toma una referencia absoluta de donde yo tenga guardado todo

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;