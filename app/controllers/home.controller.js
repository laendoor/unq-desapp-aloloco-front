app.controller('HomeController', ['$scope', 'Restangular', function ($scope, Restangular) {

    Restangular.all('client/wishlists').customGET().then(function (wishlists) {
        $scope.wishlists = wishlists['data'];
    });

}]);