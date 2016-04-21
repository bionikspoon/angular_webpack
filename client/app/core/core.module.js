import angular from 'angular';

import navbar from '../components/navbar/navbar.module';
import pageHome from '../pages/home/index.js';
import pageAbout from '../pages/about/index.js';

import coreConfig from './core.config';
import routeConfig from './route.config';
import appCore from './core.component';

export default angular
  .module('app.core', [ navbar.name, pageHome.name, pageAbout.name ])
  .value('$routerRootComponent', 'appCore')
  .config(coreConfig)
  .config(routeConfig)
  .component('appCore', appCore);
