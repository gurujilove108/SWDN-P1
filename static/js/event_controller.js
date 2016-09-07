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

	$scope.deleteEventInfo = function() {
		jQuery(".event-info-row").remove();
		
	}

	/*
	 * method to create the form rpc object to pass in to our create event api method
	 * the keys in tje object must have the same name as the keys in the rpc object that is beint accepted by the api endpoint 
    */
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

		/* creating an array of guests to store in the Event database from the datalist in the create event form */
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
			if (response.successful === "1") {
				jQuery("#event-create-success").removeClass("hidden");
				jQuery("#eventname").text("Your Event");
			}
		});

	}

	/* This function allows a user to add a guest to the data list */
	$scope.addGuest = function() {
		if (defined($scope.current_guest)) {
			var guestlist_datalist = jQuery("#guestlist");
			var guestlist_input    = jQuery("#event-guestlist");
			guestlist_datalist.append("<option value='%s'>".replace("%s", $scope.current_guest));
			guestlist_input.val('');
		}
	}

	/* the container that holds all the rows of events that are loaded rom the db */
	$scope.container = jQuery(".events-container-wrapper");

	/* 
	 * I'm sure theres a better way of doing this but this way is definitely harder which makes me cooler lol jk. 
	 * When loadin our events from the database, we have to essentially re-create datalist html if we want to present that way
	 * so thats exactly what this function does. 
	*/
	$scope.createDataList = function(guests, index) {
		if (guests.hasOwnProperty("length") && guests.length > 0) {
			var datalist_input = "<input list='%s'>".replace("%s", "guestlist"+index);
			var datalist = "<datalist id='%s'>".replace("%s", "guestlist"+index )

			guests.forEach(function(element, index) {
				datalist += "<option value='%s'>".replace("%s", element);
			});
			datalist += "</datalist>";

			return {input: datalist_input, datalist: datalist}

		} else {
			return {input: "no", datalist: "guests"}
		}
	}

	/* 
	 * This method fetches all of the events from the db, organizes them intohtml and then displays them on the page
     * Because I had so much troube with ng-repeat which would have made my life a whole lot easier in solving this problem,
     * I had the pleaseure of learning a new templating system called muctache
	*/
	$scope.loadAllEventsOntoPage = function() {

		// Declare our variables here so we dont have to keep re-creating objects which is more effient
		var datalist, html, row1, row2, row3, row4, row5, row6, row7;
		var request = gapi.client.user_endpoint.all_events();

		// Start loading in events
		request.execute(function(response){
			log(response);
			// if there are no events then there will be no events object in response we will add a msg to the events.html page to link them to create an event
			if (!response.events) {
				jQuery(".no-events").text('There are currently no events, to create an event click');
				jQuery('.no-events').append(" <a href='/#/create_event'>create an event</a>");
			} else {

				// Iterate through the events
				response.events.forEach(function(element1, index) { 

					// For each event, re-create our datalist, since each datalist has two tags, an input and datalist
					// this datalist will be an object containing two keys which correspond to the two tags, datalist.input, datalist.datalist
					datalist = $scope.createDataList(element1.event_guestlist, index);

					// now for each event key we create the html to display them using mustache to replace the values from out event objects
					row1 = "<div class='row text-center'><div class='col-xs-12'><label for='event_name'>Name of Event: </label><span id='event_name'> {{event_name}}</span></div></div> ";
					row2 = "<div class='row text-center'><div class='col-xs-12'><label for='event_type'>Type of Event: </label><span id='event_type'> {{event_type}}</span></div></div> "; 
					row3 = "<div class='row text-center'><div class='col-xs-12'><label for='event_host'>Host of Event: </label><span id='event_host'> {{event_host}}</span></div></div> "; 
					row4 = "<div class='row text-center'><div class='col-xs-12'><label for='event_start'>Event Start Date: </label><span id='event_start'> {{event_start}}</span></div></div> "; 
					row5 = "<div class='row text-center'><div class='col-xs-12'><label for='event_end'>Event End Date: </label><span id='event_end'> {{event_end}}</span></div></div> "; 
					row6 = "<div class='row text-center'><div class='col-xs-12'><label for='event_guestlist'>Event Guest list: </label><span id='event_guestlist' class='event_guestlist_unbelievable'>doit </span></div></div> ".replace("doit", datalist.input + datalist.datalist); 
					row7 = "<div class='row text-center'><div class='col-xs-12'><label for='event_guestmessage'>Message for Guests: </label><span id='event_guestmessage'> {{event_guestmessage}}</span></div></div><hr> "; 
					
					// iterate through all the rows, use mustache to make the html and then add it onto the events container
					[row1, row2, row3, row4, row5, row6, row7].forEach(function(element2, index){
						html = Mustache.to_html(element2, element1);
						$scope.container.append(html);
					});
				});
			}
		});
	}
});