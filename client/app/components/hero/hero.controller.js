module.exports = HeroController;

/* @ngInject */
function HeroController(randomNames) {
  const $ctrl = this;
  $ctrl.name = 'world';
  $ctrl.changeName = (name = randomNames.getName()) => {$ctrl.name = name;};
}
