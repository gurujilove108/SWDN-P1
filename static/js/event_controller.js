controllers.controller('EventController', function ($scope, $location, oauth2Provider) {

	$scope.userSignedIn = function() {
		return oauth2Provider.signedIn;
	}

	$scope.createEvent = function() {
		if($scope.eventFormValid()) {
			sendGapiCreateForm();
		} 
	}

	$scope.eventFormValid = function() {

	}

	$scope.addGuest = function() {
		if (defined($scope.current_guest)) {
			jQuery("#guestlist").append(
				"<option value='%s'>".replace("%s", $scope.current_guest)
			);
		}
	}
});