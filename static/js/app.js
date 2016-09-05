'use strict';

var app = angular.module('swdnP1App', ['swdnP1AppControllers', 'ngRoute', 'ui.bootstrap']);

app.config(["$routeProvider", function ($routeProvider, $templateCache) {
    
    $routeProvider.when('/events', {
        templateUrl: '../views/events.html',
        controller: 'EventController'
    });
    $routeProvider.when('/create_event', {
        templateUrl: '../views/create_event.html',
        controller: 'EventController'
    });
    $routeProvider.when('/login', {
        templateUrl: '../views/login.html',
        controller: 'LoginController'
    });
    $routeProvider.when('/signup', {
        templateUrl: '../views/signup.html',
        controller: 'SignupController'
    });
    $routeProvider.when('/into', {
        templateUrl: '../views/intro.html'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);

app.factory('oauth2Provider', function ($modal) {
    var oauth2Provider = {
        CLIENT_ID: '39830639023-6ijh10vnoq4cdgkoh4me2btt4sfjgqco.apps.googleusercontent.com', //replace me with new one, this is from different app
        SCOPES: 'email profile',
        signedIn: false
    }

    oauth2Provider.signIn = function (callback) {
        gapi.auth.signIn({
            'clientid': oauth2Provider.CLIENT_ID,
            'cookiepolicy': 'single_host_origin',
            'accesstype': 'online',
            'approveprompt': 'auto',
            'scope': oauth2Provider.SCOPES,
            'callback': callback
        });
    };

    oauth2Provider.signOut = function () {
        gapi.auth.signOut();
        gapi.auth.setToken({access_token: ''})
        oauth2Provider.signedIn = false;
    };

    /*
     * Shows the modal with Google+ sign in button.
     * @returns {*|Window}
     */
    oauth2Provider.showLoginModal = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/login.modal.html',
            controller: 'OAuth2LoginModalCtrl'
        });
        return modalInstance;
    };

    return oauth2Provider;
});

app.filter('startFrom', function () {
    var filter = function (data, start) {
        return data.slice(start);
    }
    return filter;
});

app.constant('HTTP_ERRORS', {
    'UNAUTHORIZED': 401,
    'test': 503 
});
