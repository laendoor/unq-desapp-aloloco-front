var app = angular.module("aloloco", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html"
        })
        .when("/map", {
            templateUrl : "views/map.html"
        });
});