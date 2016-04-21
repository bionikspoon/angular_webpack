export default {
  templateUrl: require('./core.html'),
  controller: CoreController,
  controllerAs: 'app',
};

/* @ngInject */
function CoreController() {
  const app = this;
  app.noun = 'turtles';
}
