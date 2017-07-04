app.controller('WishlistCreationController', function ($scope, Restangular, toastr, $location) {

    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.relatedProducts = [];

    Restangular.all('stock').customGET().then(function (stock) {
        $scope.stock = stock['data'];
    });

    $scope.removeProductFromSelectedOnes = function (product) {
        $scope.stock.forEach(function (stocked) {
            if (stocked.id == product.id) {
                product.selected = false;
                product.desired = 0;
            }
        });
    }


    $scope.displayRelateds = function (id) {
        Restangular.all('products/' + id + '/related').customGET().then(function (stock) {
            $scope.relatedProducts = stock['data'];
        });
    }

    $scope.numberOfPages = function () {
        return Math.ceil($scope.stock.length / $scope.pageSize);
    }

    $scope.selected = function () {
        return $scope.stock.filter(function (product) {
            return product.selected;
        });
    }

    $scope.submit = function(){
        toastr.success('La lista fue creada', 'Bien hecho!')
        $location.path('/')
    }

});