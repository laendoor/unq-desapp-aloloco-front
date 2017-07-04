app.controller('HistoryController', function ($scope, Restangular) {

    Restangular.all('user/1/history').customGET().then(function (purchases) {
        $scope.purchases = purchases['data'];
    });

});