app.directive('stock', function (toastr) {
    return {
        restrict: 'E',
        templateUrl: 'directives/stock.html',

        link: function (scope) {
            scope.amount = 0;

            scope.exceded_stock = false;

            scope.addProductToSelectedOnes = function (product) {
                if (scope.amount > product.stock) {
                    toastr.error('No tenemos suficiente stock', 'Cuidado!')
                    return;
                } else {
                    toastr.success('Se agrego el producto a la lista', 'Bien hecho!')
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