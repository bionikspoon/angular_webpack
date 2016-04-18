const coreConfig = require('./core.config');
const routeConfig = require('./route.config');
const appCore = require('./core.component.js');

angular
  .module('app.core', [
    'ngAnimate', 'ngTouch', 'ui.router', 'app.component.navbar', 'app.page.home', 'app.page.about',
  ])
  .value('$routerRootComponent', 'appCore')
  .config(coreConfig)
  .config(routeConfig)
  .component('appCore', appCore);

