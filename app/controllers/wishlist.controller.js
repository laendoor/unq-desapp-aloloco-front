app.controller('WishlistController', ['$scope', '$routeParams', 'Restangular', function ($scope, $routeParams, Restangular) {

    $scope.wishlist_id = $routeParams.wishlistId;

    $scope.countdown = 0;
    $scope.boxNumber = false;

    $scope.on_cart = function () {
        var res = 0;

        if ($scope.wishlist.products != undefined) {
            $scope.wishlist.products.forEach(function (product) {
                if (product.on_cart == true) {
                    res++;
                }
            });
        }

        return res;
    };

    $scope.addToCart = function (id) {
        $scope.wishlist.products.forEach(function (product) {
            if (product.id == id) {
                product.on_cart = true;
            }
        })
    }

    Restangular.all('user/1/wishlists').customGET().then(function (wishlists) {
        $scope.wishlist = wishlists['data'].find(function (wishlist) {
            return wishlist.id == $scope.wishlist_id;
        });
    });

    $scope.request_box = function () {
        $scope.countdown = 10
        var interval = setInterval(function(){
            $scope.countdown = $scope.countdown - 1;
            if($scope.countdown == 0){
                clearInterval(interval);
                $scope.boxNumber = 50;
            }
            $scope.$apply()
        }, 1000)
    }

}]);