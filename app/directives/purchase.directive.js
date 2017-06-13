app.directive('purchase', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/history.html',

        link: function (scope) {
            scope.showProducts = false;

            scope.toggleProducts = function () {
                scope.showProducts = !scope.showProducts;
            }

        },

        scope: {
            purchase: '='
        },

    }
});