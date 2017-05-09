var app = angular.module("aloloco", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller: "HomeController"

        })
        .when("/map", {
            templateUrl : "views/map.html"
        });
});

app.controller('HomeController', ['$scope', function($scope) {

  $scope.products = [
  	{
  		"id": 1,  		
  		"name": "Papas Fritas",  		
  		"brand": "Lays",  		
  		"price": "20",  		
  		"image": "http://2.bp.blogspot.com/_tQVckLGToNA/TB_rn9LxlZI/AAAAAAAAEjk/mpV31bXbmgU/s1600/LAYS_Classic.gif",  		
  	},
  	{
  		"id": 2,  		
  		"name": "Papas Fritas",  		
  		"brand": "Lays",  		
  		"price": "20",  		
  		"image": "http://2.bp.blogspot.com/_tQVckLGToNA/TB_rn9LxlZI/AAAAAAAAEjk/mpV31bXbmgU/s1600/LAYS_Classic.gif",  		
  	},
  	{
  		"id": 3,  		
  		"name": "Papas Fritas",  		
  		"brand": "Lays",  		
  		"price": "20",  		
  		"image": "http://2.bp.blogspot.com/_tQVckLGToNA/TB_rn9LxlZI/AAAAAAAAEjk/mpV31bXbmgU/s1600/LAYS_Classic.gif",  		
  	},
  ];

}]);