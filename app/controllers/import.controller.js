app.controller('ImportController', function ($scope, $http, toastr) {

    $scope.uploadFile = function () {
        $.ajax({
            url: API_ROUTE + 'stock',
            type: 'POST',
            data: new FormData($('.uploader-form')[0]),
            cache: false,
            contentType: false,
            processData: false,
        }).done(function () {
            toastr.success('Bien hecho!', 'La importación se realizo con éxito.');
        }).fail(function () {
            toastr.error('Oops!', 'Sucedió un error, intenta de nuevo!.')
        });
    }

});