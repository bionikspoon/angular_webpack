require('babel-polyfill');
require('angular');
require('angular-mocks');

require('./vendor');
require('./app/app.module');

const context = require.context('.', true, /\.spec\.js$/);
context.keys().map(context);
