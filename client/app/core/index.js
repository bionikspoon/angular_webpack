import angular from 'angular';

import uiRouter from 'angular-ui-router';

import navbar from '../components/navbar/navbar.module';

import coreConfig from './core.config';
import CoreController from './core.controller';

export default angular
  .module('app.core', [ uiRouter, navbar.name ])
  .value('$routerRootComponent', 'appCore')
  .config(coreConfig)
  .controller('CoreController', CoreController)
  .component('appCore', {
    templateUrl: require('./core.html'),
    controller: 'CoreController',
    controllerAs: 'app',
  });
