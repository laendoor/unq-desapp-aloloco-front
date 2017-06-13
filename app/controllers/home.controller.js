app.controller('HomeController', ['$scope', 'Restangular', function ($scope, Restangular) {

    Restangular.all('user/1/wishlists').customGET().then(function (wishlists) {
        $scope.wishlists = wishlists['data'];
    });

}]);