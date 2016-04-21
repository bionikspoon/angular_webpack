import angular from 'angular';

export default angular.module('app.component.focus', [])
  .component('appFocus', {
    templateUrl: require('./focus.html'),
    transclude: true,
    bindings: { title: '@' },
  })
  .component('appFocusContainer', {
    template: '<div class="container"><div class="row" ng-transclude></div></div>',
    transclude: true,
  });
