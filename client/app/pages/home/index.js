import angular from 'angular';
import appHero from '../../components/hero';
import appFocus from '../../components/focus';

export default angular
  .module('app.page.home', [ appHero.name, appFocus.name ])
  .config(routeConfig);

/* @ngInject */
function routeConfig($stateProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: require('./home.html') });
}
