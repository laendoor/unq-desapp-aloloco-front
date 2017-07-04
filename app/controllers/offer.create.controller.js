app.controller('OfferCreationController', function ($scope, Restangular, toastr) {

    $scope.loading = false;

    Restangular.all('products/categories').customGET().then(function (data) {
        $scope.categories = data['data'];
    });

    $scope.submit = function () {

        $scope.loading = true;

        var offer = {
            category_id: $scope.category_id,
            percentage: $scope.percentage,
            valid_from: moment($scope.valid_from).format("YYYY-MM-DD HH:mm:ss"),
            valid_to: moment($scope.valid_to).format("YYYY-MM-DD HH:mm:ss"),
        }

        $.post(API_ROUTE + '/products/categories/offers', offer, function () {
            toastr.success('Se guardo correctamente!', 'Bien hecho');
        }).fail(function () {
            toastr.error('Ocurrió un error!', 'Malas noticias');
        }).always(function () {
            $scope.loading = false;
        });


    }

});