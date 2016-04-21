/* @ngInject */
export default function routeConfig($stateProvider) {
  $stateProvider
    .state('home', { url: '/', template: '<app-page-home></app-page-home>' })
    .state('about', { url: '/about/', template: '<app-page-about></app-page-about>' });
}
