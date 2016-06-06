'use strict';
'use runtime-nodent';
require('es6-shim');

global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import WebApp from './WebApp.js';

let webApp = new WebApp();
const loadedStates = new Set(['complete', 'loaded', 'interactive']);

if(loadedStates.has(document.readyState) && document.body) {
  webApp.start();
} else {
  window.addEventListener('DOMContentLoaded', webApp.start, false);
}
