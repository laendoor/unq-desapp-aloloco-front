app.directive('stock', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/stock.html',

        link: function (scope) {
            scope.amount = 0;

            scope.exceded_stock = false;

            scope.addProductToSelectedOnes = function (product) {

                if (scope.amount > product.stock) {
                    scope.exceded_stock = true;
                    return;
                } else {
                    scope.exceded_stock = false;
                }

                scope.$parent.stock.forEach(function (stocked) {
                    if (stocked.id == product.id) {
                        product.selected = true;
                        product.desired = scope.amount;
                        scope.$parent.displayRelateds(product.id)
                    }
                });
            }
        },

        scope: {
            product: '='
        },

    }
});