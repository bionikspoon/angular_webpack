import angular from 'angular';
import appHero from '../../components/hero';
import appFocus from '../../components/focus';

export default angular
  .module('app.page.home', [ appHero.name, appFocus.name ])
  .component('appPageHome', { templateUrl: require('./home.html') });
