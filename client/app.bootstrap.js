import angular from 'angular';
import app from './app/app.module';

angular.element(document).ready(() => {
  angular.bootstrap(document, [ app.name ]);
});
