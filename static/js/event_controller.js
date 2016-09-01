controllers.controller('EventController', function ($scope, $location, oauth2Provider) {

	$scope.userSignedIn = function() {
		return oauth2Provider.signedIn;
	}

	$scope.createEvent = function() {
		if($scope.eventFormValid()) {
			$scope.sendGapiCreateForm();
		} 
	}

	$scope.eventFormValid = function() {
		return true;
	}

	$scope.sendGapiCreateForm = function() {
		var guestlist = document.getElementById("guestlist");
		var guestMessage = document.getElementById("guest-message");

		var formObject = {
			event_name:  jQuery("#event-name").val(),
			event_type:  jQuery("#event-type").val(),
			event_host:  jQuery("#event-host").val(),
			event_start: jQuery("#event-datetime-start").val(),
			event_end:   jQuery("#event-datetime-end").val()
		};

		if (guestlist.childElementCount > 0) 
			for (var i=0, guests=[], len=guestlist.children.length; i < len; i++) {
				var current_guest = guestlist.children[i].value;
				guests.push(current_guest);
			formObject.event_guestlist = guests;
		}

		if (guestMessage.value.length > 0)
			formObject.event_guestmessage = guestMessage.value;

		var request = gapi.client.user_endpoint.create_event(formObject);
		request.execute(function(response){
			log(response)
		});

	}

	$scope.addGuest = function() {
		if (defined($scope.current_guest)) {
			var guestlist = jQuery("#guestlist");
			guestlist.append(
				"<option value='%s'>".replace("%s", $scope.current_guest)
			);
			guestlist.val('');
		}
	}
});