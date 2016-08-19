controllers.controller('RootController', function ($scope, $location, oauth2Provider) {
	$scope.toggleMenu = function() { 
		jQuery('#wrapper').toggleClass('toggled');
	}

	$scope.toggleSearch = function() {
		var searchForm = jQuery('.search-form-container');
		searchForm.toggleClass("hidden");
		searchForm.hide();
		searchForm.fadeIn('slow/400/fast', function() {
			
		});
	}

	$scope.userSignedIn = function() {
		return false;
	}
});