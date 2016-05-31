'use strict';
'use runtime-nodent';

global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import App from './app/App.js';

async function startApp() {
  let app = new App();
  await app.render();
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if(loadedStates.includes(document.readyState) && document.body) {
  startApp();
} else {
  window.addEventListener('DOMContentLoaded', startApp, false);
}
