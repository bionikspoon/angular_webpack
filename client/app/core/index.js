import angular from 'angular';

import navbar from '../components/navbar/navbar.module';
import pageHome from '../pages/home';
import pageAbout from '../pages/about';

import coreConfig from './core.config';
import routeConfig from './route.config';
import appCore from './core.component';

export default angular
  .module('app.core', [ navbar.name, pageHome.name, pageAbout.name ])
  .value('$routerRootComponent', 'appCore')
  .config(coreConfig)
  .config(routeConfig)
  .component('appCore', appCore);
