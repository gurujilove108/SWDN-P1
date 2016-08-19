controllers.controller('RootController', function ($scope, $location, oauth2Provider) {
	$scope.toggleMenu = function() { 
		jQuery('#wrapper').toggleClass('toggled');
	}

	$scope.userSignedIn = function() {
		return false;
	}
});