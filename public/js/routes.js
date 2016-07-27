;(function() {
'use strict'

angular.module('website-app', ['ngRoute', 'ngResource', 'ngAnimate'])
    .config(config);

function config($routeProvider, $locationProvider) {
    $routeProvider


        .when('/reads', {
            templateUrl: 'views/reads.html',
            controller: 'ReadsCtrl',
    		controllerAs: 'controller'
        })

        $locationProvider.html5Mode(true);

}
})()