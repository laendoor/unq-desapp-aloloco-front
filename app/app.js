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
                'wishlists': 'Wishlists',
                'all_wishlists': 'View all',
                'new_wishlist': 'Create new',
                'offers': 'Offers',
                'all_offers': 'View all',
                'new_offer': 'Create new',
                'history': 'History',
                'data': 'Data',
                'profile': 'Profile',
                'logout': 'Log out',
                'english': 'English',
                'spanish': 'Spanish'
            },
            'home' : {
                'welcome' : 'Welcome!'
            },
            'offers' : {
                'discount' : 'Discount:',
                'valid_from' : 'Valid from:',
                'valid_to' : 'Valid to:'
            }
        })
        .translations('es', {
            'menu': {
                'home': 'Inicio',
                'wishlists': 'Listas',
                'all_wishlists': 'Ver todas',
                'new_wishlist': 'Crear nueva',
                'offers': 'Promociones',
                'all_offers': 'Ver todas',
                'new_offer': 'Crear nueva',
                'history': 'Historial',
                'data': 'Datos',
                'profile': 'Perfil',
                'logout': 'Cerrar Sesión',
                'english': 'Ingles',
                'spanish': 'Español'
            },
            'home' : {
                'welcome' : 'Bienvenido!'
            },
            'offers' : {
                'discount' : 'Descuento:',
                'valid_from' : 'Valido desde:',
                'valid_to' : 'Valido hasta:'
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
        .when("/profile", {
            templateUrl: "views/profile.html",
            controller: "ProfileController"
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

    $scope.profile = store.get('profile');

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