app.controller('WishlistCreationController', ['$scope', 'Restangular', function ($scope, Restangular) {

    $scope.currentPage = 0;
    $scope.pageSize = 6;

    Restangular.all('stock').customGET().then(function (stock) {
        $scope.stock = stock['data'];
    });

    $scope.numberOfPages = function () {
        return Math.ceil($scope.stock.length / $scope.pageSize);
    }

    $scope.selected = function () {
        return $scope.stock.filter(function (product) {
            return product.selected;
        });
    }

}]);