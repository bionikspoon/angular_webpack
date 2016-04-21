/* eslint-env angular/mocks */

import 'angular-mocks';
import hero from './hero.module';
// import HeroController from './hero.controller';

describe('Controller: Home', () => {
  let $controller;

  beforeEach(window.module(hero.name));
  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('name is initialized to world', () => {
    const ctrl = $controller('HeroController');
    expect(ctrl.name).toBe('world');
  });
});
