;(function() {
'use strict'

angular.module('website-app')
    .config(config);

function config($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
        })

        .when('/about', {
            templateUrl: 'views/about.html',
        })

        .when('/reads', {
            templateUrl: 'views/reads.html',
            controller: 'ReadsCtrl',
    		controllerAs: 'controller'
        })

        .when('/tabla-docs', {
            templateUrl: 'views/tabla-docs.html',
            controller: 'TablaDocsCtrl',
    		controllerAs: 'controller'
        })

        $locationProvider.html5Mode(true);

}
})()