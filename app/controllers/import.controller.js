app.controller('ImportController', ['$scope', '$http', function ($scope, $http) {

    $scope.uploadFile = function () {
        $.ajax({
            url: API_ROUTE + 'stock',
            type: 'POST',
            data: new FormData($('.uploader-form')[0]),
            cache: false,
            contentType: false,
            processData: false,
        });
    }

}]);