import angular from 'angular';

import uiRouter from 'angular-ui-router';

import navbar from '../components/navbar/navbar.module';
import pageHome from '../pages/home';
import pageAbout from '../pages/about';

import coreConfig from './core.config';
import routeConfig from './route.config';
import CoreController from './core.controller';

export default angular
  .module('app.core', [ uiRouter, navbar.name, pageHome.name, pageAbout.name ])
  .value('$routerRootComponent', 'appCore')
  .config(coreConfig)
  .config(routeConfig)
  .controller('CoreController', CoreController)
  .component('appCore', {
    templateUrl: require('./core.html'),
    controller: 'CoreController',
    controllerAs: 'app',
  });
