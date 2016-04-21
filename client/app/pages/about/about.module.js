import angular from 'angular';

export default angular
  .module('app.page.about', [])
  .component('appPageAbout', { templateUrl: require('./about.html') });
