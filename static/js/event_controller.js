controllers.controller('EventController', function ($scope, $location, oauth2Provider) {
	$scope.sup = function() {
		log("sup");
	}

	$scope.userSignedIn = function() {
		return oauth2Provider.signedIn;
	}

	$scope.alertWarning = function() {
		$("")
	}

	$scope.name = "Dylan"
});