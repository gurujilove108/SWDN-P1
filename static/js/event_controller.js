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


	$scope.container = jQuery(".events-container-wrapper");

	$scope.createDataList = function(guests, index) {
		if (guests.length > 0) {
			var datalist_input = "<input list='%s'>".replace("%s", "guestlist"+index);
			var datalist = "<datalist id='%s'>".replace("%s", "guestlist"+index )
			guests.forEach(function(element, index) {
				datalist += "<option value='%s'>".replace("%s", element);
			});
			datalist += "</datalist>";
			return {input: datalist_input, datalist: datalist}
		} else {
			return {input: "no", datalist: "guests lol"}
		}
	}
	$scope.loadAllEventsOntoPage = function() {
		var datalist, html, datalist_input, datalist_list, row1, row2, row3, row4, row5, row6, row7;
		var request = gapi.client.user_endpoint.all_events();
		request.execute(function(response){
			response.events.forEach(function(element1, index) { 
				datalist = $scope.createDataList(element1.event_guestlist, index);
				element1.datalist_input = datalist.input;
				element1.datalist_list = datalist.datalist;
				log(element1)
				row1 = "<div class='row'><div class='col-md-3 text-left'><label for='event_name'>Name of Event: </label><span id='event_name'> {{event_name}}</span></div></div> ";
				row2 = "<div class='row'><div class='col-md-3 text-center'><label for='event_type'>Type of Event: </label><span id='event_type'> {{event_type}}</span></div></div> "; 
				row3 = "<div class='row'><div class='col-md-3 text-right'><label for='event_host'>Host of Event: </label><span id='event_host'> {{event_host}}</span></div></div> "; 
				row4 = "<div class='row'><div class='col-md-4 text-right'><label for='event_start'>Event Start Date: </label><span id='event_start'> {{event_start}}</span></div></div> "; 
				row5 = "<div class='row'><div class='col-md-5 text-right'><label for='event_end'>Event End Date: </label><span id='event_end'> {{event_end}}</span></div></div> "; 
				row6 = "<div class='row'><div class='col-md-6 text-right'><label for='event_guestlist'>Event Guest list: </label><span id='event_guestlist' class='event_guestlist_unbelievable'> </span></div></div> "; 
				row7 = "<div class='row'><div class='col-md-7 text-right'><label for='event_guestmessage'>Message for Guests: </label><span id='event_guestmessage'> {{event_guestmessage}}</span></div></div><hr> "; 
				
				[row1, row2, row3, row4, row5, row6, row7].forEach(function(element2, index){
					html = Mustache.to_html(element2, element1);
					$scope.container.append(html);
					
				});
			});
		});
	}
});