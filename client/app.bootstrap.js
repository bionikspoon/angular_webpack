require('./vendor');
require('./app/app.module');

angular.element(document).ready(() => {
  angular.bootstrap(document, [ 'app' ]);
});
