app.controller('ImportController', function ($scope, $http, toastr) {

    $scope.loading = false;

    $scope.uploadFile = function () {
        $scope.loading = true;
        $.ajax({
            url: API_ROUTE + '/stock',
            type: 'POST',
            data: new FormData($('.uploader-form')[0]),
            cache: false,
            contentType: false,
            processData: false,
        }).done(function () {
            toastr.success('La importación se realizo con éxito.', 'Bien hecho!');
            $scope.loading = false;
        }).fail(function () {
            toastr.error('Sucedió un error, intenta de nuevo!.', 'Oops!')
            $scope.loading = false;
        });
    }

});