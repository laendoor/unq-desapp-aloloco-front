var app = angular.module("aloloco", ["ngRoute", "restangular"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeController"
        })
        .when("/users/:userId/wishlists/create", {
            templateUrl: "views/wishlist-form.html",
            controller: "WishlistCreationController"
        })
        .when("/users/:userId/wishlists/:wishlistId", {
            templateUrl: "views/wishlist.html",
            controller: "WishlistController"
        })
        .when("/map", {
            templateUrl: "views/map.html"
        })
        .when("/admin/import", {
            templateUrl: "views/import.html",
            controller: "ImportController"
        });

});

app.config(function (RestangularProvider) {

    RestangularProvider.setBaseUrl('http://api.aloloco.dev');

});

app.controller('HomeController', ['$scope', 'Restangular', function ($scope, Restangular) {

}]);

app.controller('WishlistCreationController', ['$scope', 'Restangular', function ($scope, Restangular) {

    Restangular.all('stock').customGET().then(function (stock) {
        $scope.stock = stock['data'];
    });

    $scope.selectedProducts = [];

    $scope.addProductToSelectedOnes = function (id) {
        var product = $scope.stock.find(function (product) {
            return product.id == id;
        });

        $scope.selectedProducts.push(product)

        $scope.stock = $scope.stock.filter(function (product) {
            return product.id != id;
        })
    }

}]);

app.controller('WishlistController', ['$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.user = $routeParams.userId;

    $scope.wishlist = $routeParams.wishlistId;

}]);

app.controller('ImportController', ['$scope', '$http', function ($scope, $http) {

    $scope.uploadFile = function () {
        $.ajax({
            url: 'http://v3core.app/aloloco',
            type: 'POST',
            data: new FormData($('.uploader-form')[0]),
            cache: false,
            contentType: false,
            processData: false,
        });
    }
    
}]);