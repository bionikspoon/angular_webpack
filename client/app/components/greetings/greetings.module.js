const greeting = {
  bindings: { name: '<' },
  template: '<h1>Hello, {{$ctrl.name}}</h1>',
};

angular.module('app.component.greetings', [])
       .component('appGreeting', greeting);
