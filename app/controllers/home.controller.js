app.controller('HomeController', function ($scope, Restangular) {

    Restangular.all('user/1/wishlists').customGET().then(function (wishlists) {
        $scope.wishlists = wishlists['data'];
    });

});