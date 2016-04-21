/* eslint-env angular/mocks, jasmine */

import 'angular-mocks';

import appHero from './';

describe('Hero Component', () => {
  let element;
  let $scope;

  beforeEach(() => {
    let $compile;
    let $rootScope;

    // eslint-disable-next-line angular/window-service
    window.module(appHero.name);

    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new(true);

      element = $compile('<app-hero></app-hero>')($scope);
      $scope.$digest();
    });
  });

  it('Should exist', () => {
    expect(element[ 0 ].classList.contains('ng-scope')).toBeTruthy();
    expect(element[ 0 ].classList.contains('ng-isolate-scope')).toBeTruthy();
  });
  
  
});
