app.controller('OfferController', function ($scope, Restangular) {

    Restangular.all('products/categories/offers').customGET().then(function (data) {
        $scope.offers = data['data'];
    });

});