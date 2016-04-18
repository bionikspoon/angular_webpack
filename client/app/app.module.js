const modules = require.context('./', true, /\.(?:module|service)$/);
modules.keys().map(modules);

angular.module('app', [ 'app.core' ]);
