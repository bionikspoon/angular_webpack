import angular from 'angular';

export default angular
  .module('app.component.greetings', [])
  .component('appGreeting', {
    bindings: { name: '<' },
    template: '<h1>Hello, {{$ctrl.name}}</h1>',
  });
