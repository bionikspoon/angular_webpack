const _sample = require('lodash/sample');

class RandomNames {
  /* @ngInject */
  constructor() {
    this.names = [ 'Angular', 'JavaScript', 'WebPack', '21st Century' ];
  }

  getName() {
    return _sample(this.names);
  }
}

angular.module('app.service.random-names', [])
       .service('randomNames', RandomNames);
