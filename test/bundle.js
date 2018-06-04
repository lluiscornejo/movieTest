import 'babel-polyfill';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Grab all .js and .jsx files under src
const bundle = require.context('../src', true, /\.jsx?$/);
bundle.keys().filter(file => file !== './index.js').forEach(bundle);

