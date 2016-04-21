import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import uiRouter from 'angular-ui-router';

import appCore from './core';

export default angular
  .module('app', [ ngAnimate, ngTouch, uiRouter, appCore.name ]);
