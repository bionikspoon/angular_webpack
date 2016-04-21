import angular from 'angular';
import HeroController from './hero.controller';

import randomNames from '../../services/randomNames';
import greetings from '../greetings';

export default angular
  .module('app.component.hero', [ randomNames.name, greetings.name ])
  .controller('HeroController', HeroController)
  .component('appHero', {
    templateUrl: require('./hero.html'),
    controller: 'HeroController',
    transclude: true,
  });
