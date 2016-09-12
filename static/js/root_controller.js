controllers.controller('RootController', ['$scope', '$location', function ($scope, $location) {

	/* Pretty self explanatory of what this function does */
	$scope.toggleMenu = function() { 
		jQuery('#wrapper').toggleClass('toggled');
	};

	/* 
	 * Not actually using this function other then to always return false, I have all the tools
	 * To implement google login but I'll save it for the next project
	*/
	// $scope.userSignedIn = function() {
	// 	return oauth2Provider.signedIn;
	// };

	$scope.loadInitialPage = function(){
		$location.path("/events");
	};

	/* load all the events when the user first visits the page */
	$scope.loadInitialPage();

}]);

