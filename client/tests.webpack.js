import 'babel-polyfill';
import 'angular';

const context = require.context('.', true, /\.spec\.js$/);
context.keys().map(context);
