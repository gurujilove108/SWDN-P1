'use strict';

var dylansProfileApp = dylansProfileApp || {};
dylansProfileApp.controllers = angular.module('dylansProfileControllers', ['ui.bootstrap']);
var controllers = dylansProfileApp.controllers;

controllers.controller('RootController', function ($scope, $location, oauth2Provider) {
    $scope.init = function() {
        log($scope);
        log($location);
        log(oauth2Provider);
    }

    $scope.getSignedInState = function () {
        if (!(oauth2Provider.signedIn)) {
            return false;
        }
        return oauth2Provider.signedIn;


    };

    $scope.signIn = function () {
        var signinFunction = function () {
            gapi.client.oauth2.userinfo.get().execute(function (resp) {
                log(resp);
                $scope.$apply(function () {
                    if (resp.email) {
                        oauth2Provider.signedIn = true;
                        $scope.alertStatus = 'success';
                        $scope.rootMessages = 'Logged in with ' + resp.email;
                    }
                });
            });
        }
        oauth2Provider.signIn(signinFunction);
    };

    $scope.signOut = function () {
        oauth2Provider.signOut();
        $scope.alertStatus = 'success';
        $scope.rootMessages = 'Logged out';
    };

    $scope.toggleMenuAngular = function() {
        var t1 = timeNow();
        var wrapper = angular.element(document.querySelector("#wrapper"))[0];
        var page_content_wrapper;
        var mobileDropdownMenu = angular.element(document.querySelector("#mobileDropdownMenuParent"))[0];
        (function() {
            if (window.currentWidth > 672) {
                if (mobileDropdownMenu.className.indexOf("open") != -1) {
                    mobileDropdownMenu.className = "dropdown closed";
                }
                if (wrapper.className == "") {
                    wrapper.className = "toggled";
                } else if (wrapper.className == "toggled") {
                    wrapper.className = "";
                }
            } else if (window.currentWidth <= 672) {
                if (mobileDropdownMenu.className.indexOf("open") == -1) {
                    mobileDropdownMenu.className = "dropdown open";
                } else if (mobileDropdownMenu.className.indexOf("open") != -1) {
                    mobileDropdownMenu.className = "dropdown closed";
                }
                log(window.currentWidth);
            }
        })();
        var t2 = timeNow();
        logReplaced("%s", round(t2-t1, 2), "toggleMenu took %s milisseconds")
    }
});

controllers.controller("NanodegreeController", function ($scope, $location, oauth2Provider) {

});


