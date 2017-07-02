var app = angular.module("aloloco", [
    "ngRoute",
    "restangular",
    "pascalprecht.translate",
    "auth0",
    "angular-storage",
    "angular-jwt",
    'tmh.dynamicLocale',
    'ngAnimate',
    'toastr'
]);

app.run(function ($rootScope, auth, store, jwtHelper, $window) {
    $rootScope.$on('$routeChangeStart', function () {
        var token = store.get('id_token');
        if (token !== null && !jwtHelper.isTokenExpired(token)) {
            auth.authenticate(store.get('profile'), token);
        }
    });
});


app.config(function ($routeProvider,
                     RestangularProvider,
                     $translateProvider,
                     authProvider,
                     tmhDynamicLocaleProvider) {

    authProvider.init({
        domain: 'alolocogrupoe.auth0.com',
        clientID: 'X9RiuKF_oZnkFQ9sRnXUah051YwqJGm0'
    });

    $translateProvider
        .translations('en', {
            'menu': {
                'home': 'Home',
                'new_wishlist': 'New wishlist',
                'new_offer': 'New offer',
                'offers': 'Offers',
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
                'offers': 'Ofertas',
                'import': 'Importar',
                'history': 'Historial',
                'profile': 'Perfil',
                'logout': 'Cerrar Sesion',
            }
        })
        .preferredLanguage('es')
        .useSanitizeValueStrategy(null);

    tmhDynamicLocaleProvider.localeLocationPattern('/components/angular-i18n/angular-locale_{{locale}}.js');

    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeController",
            resolve: {
                load: function (store, $window) {
                    var token = store.get('id_token');
                    if (token == null) {
                        $window.location.href = '/login.html';
                    }
                }
            }
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginController"
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
        // .when("/map", {
        //     templateUrl: "views/map.html",
        //     controller: "MapController"
        // })
        .when("/offers", {
            templateUrl: "views/offers.html",
            controller: "OfferController"
        })
        .when("/offers/create", {
            templateUrl: "views/offer-form.html",
            controller: "OfferCreationController"
        })
        .when("/admin/import", {
            templateUrl: "views/import.html",
            controller: "ImportController"
        });

    RestangularProvider.setBaseUrl(API_ROUTE);

});

app.controller('MainController', function ($rootScope, $scope, $translate, auth, store, tmhDynamicLocale, $locale, $window) {

    $scope.changeLanguage = function (key) {
        var locale;
        if (key == 'en') {
            locale = 'en-us';
        } else if (key == 'es') {
            locale = 'es-ar';
        }
        $translate.use(key);
        $rootScope.$locale = $locale;
        $rootScope.changeLocale = tmhDynamicLocale.set(locale);
    };

    $scope.auth = auth;

    $scope.login = function () {
        auth.signin({}, function (profile, token) {
            store.set('profile', profile);
            store.set('id_token', token);
        }, function (error) {
            console.log(error);
        });
    }

    $scope.logout = function () {
        store.remove('profile');
        store.remove('id_token');
        auth.signout();
        $window.location.href = '/login.html';
    }

});