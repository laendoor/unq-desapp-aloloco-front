var app = angular.module('ALoLocoLogin', ['auth0', 'angular-storage']);

app.config(function (authProvider) {

    authProvider.init({
        domain: 'alolocogrupoe.auth0.com',
        clientID: 'X9RiuKF_oZnkFQ9sRnXUah051YwqJGm0'
    });

})

app.controller('LoginController', function ($scope, auth, store, $window) {

    $scope.login = function () {
        auth.signin({}, function (profile, token) {
            store.set('profile', profile);
            store.set('id_token', token);
            $window.location.href = '/';
        }, function (error) {
            console.log(error);
        });
    }

});