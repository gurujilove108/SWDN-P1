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


	$scope.container = jQuery("#events-container-wrapper");

	$scope.createNameMarkup = function(name) {
		<div class="row">
			<div class="col-md-3 text-left">
				<label for="event_name">Name of Event:</label><span class="event-names" id="event_name" name</span>
			
	}

	$scope.loadAllEventsOntoPage = function() {
		var request = gapi.client.user_endpoint.all_events();
		request.execute(function(response){
			response.events.forEach(function(element, index) { 
				event_name = $scope.createNameMarkup(element.event_name);
				event_type = $scope.createTypeMarkup(element.event_type);
				event_host = $scope.createHostMarkup(element.event_host);
				event_start = $scope.createStartTimeMarkup(element.event_start);
				event_end = $scope.createEndTimeMarkup(element.event_end);
				event_guestlist = $scope.createGuestlistMarkup(element.event_guestlist);
				event_message = $scope.createGuestMessageMarkup(element.event_guestmessage);
			});
		});
	}
});