app.directive('stocked-product', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/stocked-product.html',

        link: function (scope) {
            // scope.showProducts = false;
            //
            // scope.toggleProducts = function () {
            //     scope.showProducts = !scope.showProducts;
            // }
        },

        scope: {
            product: '='
        },

    }
});