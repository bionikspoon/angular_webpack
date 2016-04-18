describe('Controller: Home', () => {
  let $controller;

  beforeEach(angular.mock.module('app.component.hero'));
  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('name is initialized to world', () => {
    const ctrl = $controller('HeroController');
    expect(ctrl.name).toBe('world');
  });
});
