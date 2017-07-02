app.controller('OfferCreationController', function ($scope, Restangular, toastr) {

    Restangular.all('products/categories').customGET().then(function (data) {
        $scope.categories = data['data'];
    });

    $scope.submit = function () {
        var offer = {
            category_id: $scope.category_id,
            percentage: $scope.percentage,
            valid_from: $scope.valid_from,
            valid_to: $scope.valid_to,
        }

        Restangular.all('products/categories/offers').post(offer).then(function () {
            toastr.success('Bien hecho', 'Se guardo correctamente!');
        }, function () {
            toastr.error('Malas noticias', 'Ocurrió un error!');
        });
    }

});