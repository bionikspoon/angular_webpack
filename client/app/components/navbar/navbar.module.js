import angular from 'angular';
import bootstrapCollapse from 'angular-ui-bootstrap/src/collapse';

export default angular
  .module('app.component.navbar', [ bootstrapCollapse ])
  .component('appNavbar', { templateUrl: require('./navbar.html') });
