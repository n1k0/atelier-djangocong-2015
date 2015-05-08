import 'babel-core/polyfill';
import React from 'react';
import App from './App';
import { AppFlux } from './Flux';

var flux = new AppFlux();

React.render(<App flux={flux} />, document.getElementById('root'));
