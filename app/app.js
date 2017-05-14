var app = angular.module("aloloco", ["ngRoute", "restangular"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller: "HomeController"

        })
        .when("/users/:userId/wishlists/create", {
            templateUrl: "views/wishlist-form.html"
        })
        .when("/users/:userId/wishlists/:wishlistId", {
            templateUrl: "views/wishlist.html",
            controller: "WishlistController"
        })
        .when("/map", {
            templateUrl : "views/map.html"
        });
        .when("/admin/import", {
            templateUrl: "views/import.html"
        });
});

app.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://api.aloloco.dev');
});

app.controller('HomeController', ['$scope', 'Restangular', function($scope, Restangular) {

    Restangular.all('products')
        .getList()
        .then(function(products) {
            $scope.products = products;
        });

}]);

app.controller('WishlistController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.user = $routeParams.userId;
    $scope.wishlist = $routeParams.wishlistId;
}]);