'use strict';
'use runtime-nodent';

global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import App from './app/App.js';
import { render } from './app/lib/Render.js';

async function startApp() {
  await render('app', [[App]]);
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if(loadedStates.includes(document.readyState) && document.body) {
  startApp();
} else {
  window.addEventListener('DOMContentLoaded', startApp, false);
}
