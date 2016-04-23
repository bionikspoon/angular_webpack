import angular from 'angular';

export default angular
  .module('app.page.about', [])
  .config(routeConfig);

/* @ngInject */
function routeConfig($stateProvider) {
  $stateProvider
    .state('about', { url: '/about/', templateUrl: require('./about.html') });
}
