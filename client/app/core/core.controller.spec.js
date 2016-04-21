/* eslint-env angular/mocks, jasmine */

import 'angular-mocks';
import appCore from './';

describe('Core Controller', () => {
  let $ctrl;
  let $scope;

  beforeEach(() => {
    let $controller;
    let $rootScope;

    // eslint-disable-next-line angular/window-service
    window.module(appCore.name);

    inject((_$controller_, _$rootScope_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new(true);

      $ctrl = $controller('CoreController', { $scope });
    });
  });

  it('Should exist', () => {
    expect(typeof $ctrl).toBe('object');
  });

  it('Should should initialize with a noun', () => {
    expect($ctrl.noun).toEqual('turtles');
  });
});
