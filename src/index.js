import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import Application from './application';
// Global Styles
import './common/styles/application.pcss';

// Render whole application
render(<Application />, document.getElementById('app'));
