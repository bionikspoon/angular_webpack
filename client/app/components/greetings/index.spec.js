/* eslint-env angular/mocks, jasmine */

import 'angular-mocks';
import appGreeting from './';

describe('Greeting Component', () => {
  let element;
  let $scope;

  beforeEach(() => {
    let $compile;
    let $rootScope;

    // eslint-disable-next-line angular/window-service
    window.module(appGreeting.name);

    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new(true);

      element = $compile('<app-greeting name="\'Test Name\'"></app-greeting>')($scope);
      $scope.$digest();
    });
  });

  it('Should exist', () => {
    expect(element[ 0 ].classList.contains('ng-scope')).toBeTruthy();
    expect(element[ 0 ].classList.contains('ng-isolate-scope')).toBeTruthy();
  });

  it('Should render with name', () => {
    expect(element[ 0 ].querySelector('h1').textContent).toEqual('Hello, Test Name');
  });

  it('Should should watch name for updates', () => {
    //  TODO test updates
  });
});
