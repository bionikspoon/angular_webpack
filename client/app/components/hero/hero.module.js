import angular from 'angular';
import HeroController from './hero.controller';

import randomNames from '../../services/randomNames/index.js';
import greetings from '../greetings/index.js';

export default angular
  .module('app.component.hero', [ randomNames.name, greetings.name ])
  .controller('HeroController', HeroController)
  .component('appHero', {
    templateUrl: require('./hero.html'),
    controller: 'HeroController',
    transclude: true,
  });
