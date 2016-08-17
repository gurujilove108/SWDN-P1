'use strict';

var app = angular.module('dylansProfileApp', ['dylansProfileControllers', 'ngRoute', 'ui.bootstrap']);
app.config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider.when('/udacity', {
            templateUrl: '/views/udacity.html',
            controller: 'NandegreeController'
        });
        $routeProvider.when('/twilio_dashbard', {
            templateUrl: '/views/twilio_dashbard.html',
            controller: 'TwilioController'
        });
        $routeProvider.when('/code_forums', {
            templateUrl: '/views/code_forums.html',
            controller: 'CodeForumsController',
        });
        $routeProvider.when('/rss_feeds', {
            templateUrl: '/views/rss_feeds.html',
            controller: 'RssFeedController'

        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
}]);

app.filter('startFrom', function () {
    var filter = function (data, start) {
        return data.slice(start);
    }
    return filter;
});

app.constant('HTTP_ERRORS', {
    'UNAUTHORIZED': 401
});

app.factory('oauth2Provider', function ($modal) {
    var oauth2Provider = {
        CLIENT_ID: '39830639023-6ijh10vnoq4cdgkoh4me2btt4sfjgqco.apps.googleusercontent.com',
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

    /**
     * Shows the modal with Google+ sign in button.
     *
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
