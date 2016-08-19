controllers.controller('RootController', function ($scope, $location, oauth2Provider) {
	$scope.toggleMenu = function() { 
		jQuery('#wrapper').toggleClass('toggled');
	}

	$scope.toggleSearch = function() {
		jQuery('.search-form-container').toggleClass("hidden");
	}

	$scope.userSignedIn = function() {
		return false;
	}
});