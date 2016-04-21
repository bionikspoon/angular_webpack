import angular from 'angular';
import RandomNames from './randomNames.service';

export default angular
  .module('app.service.random-names', [])
  .service('randomNames', RandomNames);
