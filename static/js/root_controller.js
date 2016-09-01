controllers.controller('RootController', function ($scope, $location, oauth2Provider) {
	$scope.toggleMenu = function() { 
		jQuery('#wrapper').toggleClass('toggled');
	}

	$scope.userSignedIn = function() {
		return oauth2Provider.signedIn;
	}

	$scope.events = [];

	$scope.getEvents = function() {
		log("hello");
		var request = gapi.client.user_endpoint.all_events();
		request.execute(function(response) {
			for (var i=0, len=response.events.length; i < len; i++) {
				$scope.events.push(response.events[i]);
			}
		});
	}
});

