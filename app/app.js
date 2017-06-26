var app = angular.module("aloloco", ["ngRoute", "restangular", "pascalprecht.translate"]);

app.config(function ($routeProvider, RestangularProvider, $translateProvider) {
    // $authProvider.google({
    //     clientId: '590295520687-gop8hq463v30p58n59jt1nqoahukougs.apps.googleusercontent.com'
    // });
    // $authProvider.google({
    //     url: '/auth/google',
    //     authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    //     redirectUri: window.location.origin,
    //     requiredUrlParams: ['scope'],
    //     optionalUrlParams: ['display'],
    //     scope: ['profile', 'email'],
    //     responseType: "token",
    //     scopePrefix: 'openid',
    //     scopeDelimiter: ' ',
    //     display: 'popup',
    //     oauthType: '2.0',
    //     popupOptions: {width: 452, height: 633}
    // });

    $translateProvider.translations('en', {
        'menu': {
            'home': 'Home',
            'new_wishlist': 'New wishlist',
            'new_offer': 'New offer',
            'import': 'Import',
            'history': 'History',
            'profile': 'Profile',
            'logout': 'Log out',
        }
    })
        .translations('es', {
            'menu': {
                'home': 'Inicio',
                'new_wishlist': 'Nueva lista',
                'new_offer': 'Nueva promoción',
                'import': 'Importar',
                'history': 'Historial',
                'profile': 'Perfil',
                'logout': 'Cerrar Sesion',
            }
        })
        .preferredLanguage('es');

    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeController"
        })
        .when("/users/:userId/wishlists/create", {
            templateUrl: "views/wishlist-form.html",
            controller: "WishlistCreationController"
        })
        .when("/users/:userId/history", {
            templateUrl: "views/history.html",
            controller: "HistoryController"
        })
        .when("/users/:userId/wishlists/:wishlistId", {
            templateUrl: "views/wishlist.html",
            controller: "WishlistController"
        })
        .when("/users/:userId/wishlists/:wishlistId/delivery", {
            templateUrl: "views/delivery.html",
            controller: "DeliveryController"
        })
        .when("/map", {
            templateUrl: "views/map.html",
            controller: "MapController"
        })
        .when("/offers/create", {
            templateUrl: "views/offer-form.html",
            controller: "MapController"
        })
        .when("/admin/import", {
            templateUrl: "views/import.html",
            controller: "ImportController"
        });

    RestangularProvider.setBaseUrl(API_ROUTE);

});

app.controller('MainController', function ($scope, $translate) {

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };

    // $scope.authenticated = true;
    //
    // $scope.authenticate = function (provider) {
    //     $auth.authenticate(provider)
    //         .then(function (response) {
    //             $auth.setToken(response);
    //             console.log($auth.isAuthenticated());
    //         })
    //         .catch(function (response) {
    //         });
    // };

//
// gapi.load('auth2', function () {
//     auth2 = gapi.auth2.init({
//         client_id: '590295520687-gop8hq463v30p58n59jt1nqoahukougs.apps.googleusercontent.com',
//         cookiepolicy: 'single_host_origin',
//     });
//     auth2.attachClickHandler('sign-in-button', {}, function (googleUser) {
//         $scope.authenticated = true;
//     }, function (error) {
//         alert(JSON.stringify(error, undefined, 2));
//     });
// });
//
// $scope.signOut = function () {
//     auth2.getAuthInstance().signOut().then(function () {
//         $scope.authenticated = false;
//     });
// }

});