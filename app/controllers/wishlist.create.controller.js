app.controller('WishlistCreationController', ['$scope', 'Restangular', function ($scope, Restangular) {

    $scope.currentPage = 0;
    $scope.pageSize = 6;

    Restangular.all('stock').customGET().then(function (stock) {
        $scope.stock = stock['data'];
    });

    $scope.numberOfPages = function () {
        return Math.ceil($scope.stock.length / $scope.pageSize);
    }

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