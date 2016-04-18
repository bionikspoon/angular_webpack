const HeroController = require('./hero.controller');
const hero = require('./hero.component.js');

angular.module('app.component.hero', [ 'app.service.random-names', 'app.component.greetings' ])
       .controller('HeroController', HeroController)
       .component('appHero', hero);
