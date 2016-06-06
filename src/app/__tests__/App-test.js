'use runtime-nodent';
jest.disableAutomock();
global.amap = require('nodent/covers/map')(null,{Promise:require('nodent/lib/thenable')});

import App from '../App.js';
