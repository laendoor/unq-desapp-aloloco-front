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
            templateUrl: "views/map.html",
            controller: "MapController"
        })
        .when("/admin/import", {
            templateUrl: "views/import.html",
            controller: "ImportController"
        });

});

app.config(function (RestangularProvider) {

    RestangularProvider.setBaseUrl(API_ROUTE);

});

app.controller('HomeController', ['$scope', 'Restangular', function ($scope, Restangular) {

    Restangular.all('client/wishlists').customGET().then(function (wishlists) {
        $scope.wishlists = wishlists['data'];
    });

}]);

app.controller('MapController', ['$scope', function ($scope) {

    $scope.initMap = function () {
        var markerArray = [];

        var directionsService = new google.maps.DirectionsService;

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: -34.7101435, lng: -58.2858949}
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

        var stepDisplay = new google.maps.InfoWindow;

        $scope.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
    }

    $scope.calculateAndDisplayRoute = function (directionsDisplay, directionsService, markerArray, stepDisplay, map) {
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        directionsService.route({
            origin: 'universidad de quilmes',
            destination: 'estacion de bernal',
            avoidTolls: true,
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                document.getElementById('distance').innerHTML = response.routes[0].legs[0].distance.text;
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    $scope.initMap();

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

        product.amount = 10; // Hacerlo dinamico
        $scope.selectedProducts.push(product)

        $scope.stock = $scope.stock.filter(function (product) {
            return product.id != id;
        })
    }

}]);

app.controller('WishlistController', ['$scope', '$routeParams', 'Restangular', function ($scope, $routeParams, Restangular) {

    $scope.wishlist_id = $routeParams.wishlistId;

    Restangular.all('client/wishlists').customGET().then(function (wishlists) {
        $scope.wishlist = wishlists['data'].find(function (wishlist) {
            return wishlist.id == $scope.wishlist_id;
        });
    });

}]);

app.controller('ImportController', ['$scope', '$http', function ($scope, $http) {

    $scope.uploadFile = function () {
        $.ajax({
            url: API_ROUTE + '/stock',
            type: 'POST',
            data: new FormData($('.uploader-form')[0]),
            cache: false,
            contentType: false,
            processData: false,
        });
    }

}]);