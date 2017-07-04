app.controller('ProfileController', function ($scope, store, toastr) {

    $scope.submit = function () {
        toastr.success('El perfil fue actualizado con éxito', 'Bien hecho!')
        var original = store.get('profile');
        var modified = $scope.new_profile;
        jQuery.extend(original, modified);
        store.set('profile', original)
    }

});