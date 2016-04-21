import sample from 'lodash/sample';

export default class RandomNames {
  /* @ngInject */
  constructor() {
    this.names = [ 'Angular', 'JavaScript', 'WebPack', '21st Century' ];
  }

  getName() {
    return sample(this.names);
  }
}
