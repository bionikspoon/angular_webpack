import angular from 'angular';
import appHero from '../../components/hero/hero.module';
import appFocus from '../../components/focus/focus.module';

export default angular
  .module('app.page.home', [ appHero.name, appFocus.name ])
  .component('appPageHome', { templateUrl: require('./home.html') });
