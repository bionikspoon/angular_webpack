const focus = {
  templateUrl: require('./focus.html'),
  transclude: true,
  bindings: { title: '@' },
};

const focusContainer = {
  template: '<div class="container"><div class="row" ng-transclude></div></div>',
  transclude: true,
};

angular.module('app.component.focus', [])
       .component('appFocus', focus)
       .component('appFocusContainer', focusContainer);
