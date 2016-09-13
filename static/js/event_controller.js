/* This controller handles all the functionality for creting an event and loading in all events from the db */
controllers.controller('EventController',  ['$scope', '$location', function ($scope, $location) {

	$scope.isEventNameValid 	= false;
	$scope.isEventHostValid 	= false;
	$scope.isEventTypesValid	= false;
	$scope.isEventTypeValid 	= false;
	$scope.isGuestValid 		= false;
	$scope.isGuestlistValid 	= false;
	$scope.isStartDateValid 	= false;
	$scope.isEndDateValid 		= false;
	$scope.isAddressValid 		= false;

	$scope.eventNameStatus 		= jQuery('.event-name-status');
	$scope.eventHostStatus 		= jQuery('.event-host-status');
	$scope.eventTypesStatus		= jQuery('.event-eventtypes-status');
	$scope.eventGuestlistStatus = jQuery('.event-guestlist-status');
	$scope.startDateStatus		= jQuery('.event-datetime-start-status');
	$scope.endDateStatus 		= jQuery('.event-datetime-end-status');
	$scope.eventAddressStatus 	= jQuery('.event-address-status');

	$scope.eventNameInput 		= jQuery('#event-name-input');
	$scope.eventHostInput 		= jQuery('#event-host-input');
	$scope.eventTypeInput		= jQuery("#event-type-input");
	$scope.eventTypeList 		= jQuery("#eventtypes-list");
	$scope.guestlist 			= jQuery("#guestlist");
	$scope.guestlistInput		= jQuery("#event-guest-input");
	$scope.eventStartDateInput	= jQuery("#event-datetime-start");
	$scope.eventEndDateInput 	= jQuery("#event-datetime-end");
	$scope.eventAddressInput 	= jQuery("#event-address");

	$scope.startDateTimestamp;
	$scope.endDateTimestamp;

	$scope.allEvents = [];

	/* validation functions */
	$scope.checkEventNameValid = function() {
		if ( ! validEventName($scope.eventName)) {
			$scope.eventNameStatus.text("Event Name is invalid").css("color", "red");
			$scope.isEventNameValid = false;

		} else {
			$scope.eventNameStatus.text("Event Name is valid").css("color", "green");
			$scope.isEventNameValid = true;
		}
	};

	$scope.handleEventNameUnfocus = function() {
		if ( ! $scope.isEventNameValid) {
			$scope.eventNameStatus.text("Event Name is invalid, please validate before you continue the form process").css("color", "red");
			$scope.isEventNameValid = false;

		} else {
			$scope.eventNameStatus.text("Event Name is valid").css("color", "green");
			$scope.isEventNameValid = true;
		}
			
	};

	$scope.checkEventHostValid = function() {
		if ( ! validHost($scope.eventHost)) {
			$scope.eventHostStatus.text("Host Name is invalid").css("color", "red");
			$scope.isEventHostValid = false;

		} else {
			$scope.eventHostStatus.text("Host Name is valid").css("color", "green");
			$scope.isEventHostValid = true;
		} 
	};

	$scope.handleEventHostUnfocus = function() {
		if ( ! $scope.isEventHostValid) {
			$scope.eventHostStatus.text("Event Host is invalid, please validate before you continue the form process").css("color", "red");
			
		} else {
			$scope.setFocus($scope.eventTypeInput);
		}
	};

	$scope.checkEventTypeValid = function() {
		if ( ! validEventType($scope.eventType)) {
			$scope.eventTypesStatus.text("Type Name is invalid").css("color", "red");
			$scope.isEventTypeValid = false;

		} else {
			$scope.eventTypesStatus.text("Type Name is valid, you are ready to add to the list").css("color", "green");
			$scope.isEventTypeValid = true;
		}
	};

	$scope.checkEventTypesValid = function() {
		if ($scope.eventTypeList.children().length > 0) {
			$scope.isEventTypesValid = true;
			$scope.eventTypesStatus.text("There is at least one event type so you are good to go").css("color", "green");

		} else {
			$scope.eventTypesStatus.text("At least one event type is required").css("color", "red");
			$scope.isEventTypesValid = false;
		}
	};

	$scope.checkGuestInputValid = function() {
		if ( ! validGuest($scope.currentGuest)) {
			$scope.eventGuestlistStatus.text("Guest Name is invalid").css("color", "red");
			$scope.isGuestValid = false;

		} else {
			$scope.eventGuestlistStatus.text("Guest Name is valid, you are ready to add to the list").css("color", "green");
			$scope.isGuestValid = true;
		}
	}

	$scope.checkGuestlistValid = function() {
		if ($scope.guestlist.children().length > 0) {
			$scope.isGuestlistValid = true;
			$scope.eventGuestlistStatus.text("There is at least one guest so you are good to go").css("color", "green");

		} else {
			$scope.eventGuestlistStatus.text("At least one guest is required").css("color", "red");
			$scope.isGuestlistValid = false;
		}
	}

	$scope.checkStartDateValid = function() {
		if (defined($scope.eventDateStart)) {
			$scope.startDateTimestamp = new Date($scope.eventDateStart).getTime();

			if ($scope.startDateTimestamp <= Date.now()) {
				$scope.startDateStatus.text("Event start date can not be in the past").css("color", "red");
				$scope.isStartDateValid = false;

			} else {
				$scope.startDateStatus.text("Start date is valid").css("color", "green");
				$scope.isStartDateValid = true;
			}

		} else {
			$scope.startDateStatus.text("Please provide a valid start date").css("color", "red");
			$scope.isStartDateValid = false;
		}
	};

	$scope.checkEndDateValid = function() {

		if (! defined($scope.eventDateEnd))
			$scope.endDateStatus.text("Please provide a valid end date").css("color", "red");

		if ( ! $scope.isStartDateValid) {
			$scope.endDateStatus.text("Please provide a valid start date before entering an end date").css("color", "red");
			$scope.setFocus($scope.eventStartDateInput);

		} else if ($scope.isStartDateValid) {

			if (defined($scope.eventDateEnd)) {
				$scope.endDateTimestamp = new Date($scope.eventDateEnd).getTime();

				if ($scope.endDateTimestamp > $scope.startDateTimestamp) {
					$scope.endDateStatus.text("End date is valid").css("color", "green");
					$scope.isEndDateValid = true;

				} else {
					$scope.endDateStatus.text("End date can not be equal to or less than the start date").css("color", "red");
					$scope.isEndDateValid = false;
				}
			}

		} else {
			$scope.endDateStatus.text("Please provide a valid start date").css("color", "red");
			$scope.isEndDateValid = false;
		}
	};

	$scope.checkEventAddressValid = function() {
		if (defined($scope.address) && $scope.address.length >= 3) {
			$scope.isAddressValid = true;
			$scope.eventAddressStatus.text("Address is valid").css("color", "green");

		} else {
			$scope.isAddressValid = false;
			$scope.eventAddressStatus.text("Address is invalid").css("color", "red");
		}
	};

	/* focus, change, unfocus functions*/
	$scope.onEventNameFocus = function() {
		$scope.checkEventNameValid();
	};

	$scope.onEventNameChange = function() {
		$scope.checkEventNameValid();
	};

	$scope.onEventNameUnfocus= function() {
		$scope.handleEventNameUnfocus();
	};

	$scope.onEventHostFocus = function() {
		$scope.checkEventHostValid();
	};

	$scope.onEventHostChange = function() {
		$scope.checkEventHostValid();
	};

	$scope.onEventHostUnfocus = function() {
		$scope.handleEventHostUnfocus();
	};

	$scope.onEventTypeFocus = function() {
		$scope.checkEventTypeValid();
	};

	$scope.onEventTypeChange = function() {
		$scope.checkEventTypeValid();
	};

	$scope.onEventTypeUnfocus = function() {
		$scope.checkEventTypesValid();
	};

	$scope.onGuestInputFocus = function() {
		$scope.checkGuestInputValid();
	};

	$scope.onGuestInputChange = function() {
		$scope.checkGuestInputValid();
	};

	$scope.onGuestInputUnfocus = function() {
		$scope.checkGuestlistValid();
	};

	$scope.onEventStartDateFocus = function() {
		$scope.checkStartDateValid();
	};

	$scope.onEventStartDateChange = function() {
		$scope.checkStartDateValid();
	};

	$scope.onEventStartDateUnfocus = function() {
		$scope.checkStartDateValid();
	};

	$scope.onEventEndDateFocus = function() {
		$scope.checkEndDateValid();
	};

	$scope.onEventEndDateChange = function() {
		$scope.checkEndDateValid();
	};

	$scope.onEventEndDateUnfocus = function() {
		$scope.checkEndDateValid();
	};

	$scope.onAddressFocus = function() {
		$scope.checkEventAddressValid();
	};

	$scope.onAddressChange = function() {
		$scope.checkEventAddressValid();
	};

	$scope.onAddressUnfocus = function() {
		$scope.checkEventAddressValid();
	};

	$scope.addGuestToDatalist = function() {
		if ($scope.isGuestValid) {
			$scope.guestlist.append("<option value='%s'>".replace("%s", $scope.currentGuest));
			$scope.currentGuest = "";
			$scope.guestlistInput.val('');
			$scope.checkGuestInputValid();
			$scope.setFocus($scope.guestlistInput);
		} 
	};

	$scope.addEventTypeToDatalist = function() {
		if ($scope.isEventTypeValid) {
			$scope.eventTypeList.append("<option value='%s'>".replace("%s", $scope.eventType));
			$scope.eventType = "";
			$scope.eventTypeInput.val('');
			$scope.checkEventTypeValid();
			$scope.setFocus($scope.eventTypeInput);
		} 
	};

	$scope.setFocus = function(jquery_element) {
		jquery_element.focus();
	};

	$scope.checkPath = function() {
		if ($location.path() === "/create_event") {
			$scope.setFocus($scope.eventNameInput);
			$scope.onEventNameFocus();
		}
	};

	$scope.checkPath();	

	$scope.showBox = function(stringProperty) {
		jQuery(stringProperty).removeClass("hidden");
	};

	$scope.closeBox = function(stringProperty) {
		jQuery(stringProperty).addClass("hidden");
	};

	$scope.createEvent = function() {
		if ($scope.formValid()) {
			$scope.sendGapiCreateForm();
		}
	};

	$scope.formValid = function() {
		return $scope.isGuestlistValid && $scope.isStartDateValid && $scope.isEndDateValid && $scope.isAddressValid && $scope.isEventNameValid && $scope.isEventHostValid;
	};

	$scope.sendGapiCreateForm = function() {
    	var guestlistChildren 	= $scope.guestlist.children();
    	var eventTypesChildren 	= $scope.eventTypeList.children();
    	var numGuests 			= guestlistChildren.length;
    	var numEventTypes 		= eventTypesChildren.length;
    	var guestMessage 		= jQuery("#guest-message").val();
    	var current_guest;
    	var current_event_type;
    	var i;
    	var guests;
    	var event_types;

		var formObject = {
			event_name		: $scope.eventName,
			event_host		: $scope.eventHost,
			event_start		: $scope.startDateTimestamp,
			event_end		: $scope.endDateTimestamp,
			event_address	: $scope.address 
		};

		/* Creating an array of guests to store in the Event database from the datalist in the create event form */
		if (numGuests > 0) {
			for (i=0, guests=[]; i < numGuests; i++) {
				current_guest = guestlistChildren[i].value;
				guests.push(current_guest);
			}
			formObject.event_guestlist = guests;
		}

		/* Same thing as above except with the eventtype list*/ 
    	if (numEventTypes > 0) {
			for (i=0, event_types=[]; i < numEventTypes; i++) {
				current_event_type = eventTypesChildren[i].value;
				event_types.push(current_event_type);
			}
			formObject.event_types = event_types;
		}

		/* Since guestmessage is not required we only add it if there is a message */
		if (guestMessage.length > 0)
			formObject.event_guestmessage = guestMessage;
		else
			formObject.event_guestmessage = "No current message for this event at this time";

		var request = gapi.client.user_endpoint.create_event(formObject);
		request.execute(function(response){

			if (response.hasOwnProperty("successful") && response.successful === "1") {
				$scope.showBox("#event-create-success");
				jQuery("#eventname").text($scope.eventName);
			}
		});
	};

	/* The container that holds all the rows of events that are loaded rom the db */
	$scope.container = jQuery(".events-container-wrapper");

	/* 
	 * I'm sure theres a better way of doing this but this way is definitely harder which makes me cooler lol jk. 
	 * When loading our events from the database, we have to essentially re-create any datalists into the datalist html if we want to present it that way
	 * So thats exactly what this function does. This originally was only made for the event_guestlist, but now I have made it dynamic to accept any list and make datalist html
	 * I will eventually make this into a csv list or a select box since truth is it doesn't make since it's a datalist
	*/
	$scope.createDataList = function(database_list, index, id) {

		if (database_list.hasOwnProperty("length") && database_list.length > 0) {
			var datalist_input = "<input list='%s'>".replace("%s", id+index); 
			var datalist = "<datalist id='%s'>".replace("%s", id+index);
			
			database_list.forEach(function(element, index) {
				datalist += "<option value='%s'>".replace("%s", element);
			});
			datalist += "</datalist>";

			return {input: datalist_input, datalist: datalist};

		} else {

			/* This should never ever be returned, don't worry if it is I will fix it */
			return {input: "no", datalist: "values on the list"};
		}
	};

	$scope.loadAllEventsOntoPage = function() {

		/* Declare our variables here so we dont have to keep re-creating objects which is more effient */
		var guestlist_datalist, event_types_datalist, html, row1, row2, row3, row4, row5, row6, row7, row8;
		var request = gapi.client.user_endpoint.all_events();

		request.execute(function(response){
			if ( ! response.hasOwnProperty("events")) {
				jQuery(".no-events").text('There are currently no events, to create an event click');
				jQuery('.no-events').append(" <a href='/#/create_event'>create an event</a>");
			} else {

				/* Iterate through the events from our db */
				response.events.forEach(function(element1, index) { 
					element1.event_start = new Date(parseInt(element1.event_start));
					element1.event_end = new Date(parseInt(element1.event_end));

		 			//  * For each event, re-create our datalist, since each datalist has two tags, an input and datalist
					// * This datalist will be an object containing two keys which correspond to the two tags, datalist.input, datalist.datalist
					 
					guestlist_datalist = $scope.createDataList(element1.event_guestlist, index, "guests");
					event_types_datalist = $scope.createDataList(element1.event_types, index, "eventtypes");
					
					/* Now for each event key we create the html to display them using mustache to replace the values from out event objects */
					row1 = "<div class='row text-left'><div class='col-xs-12'><label for='event_name'>Name of Event: </label><span id='event_name'> {{event_name}}</span></div></div> ";
					row2 = "<div class='row text-left'><div class='col-xs-12'><label for='event_type'>Event Types: </label><span id='event_type'>%s </span></div></div> ".replace("%s", event_types_datalist.input + event_types_datalist.datalist);
					row3 = "<div class='row text-left'><div class='col-xs-12'><label for='event_host'>Host of Event: </label><span id='event_host'> {{event_host}}</span></div></div> "; 
					row4 = "<div class='row text-left'><div class='col-xs-12'><label for='event_start'>Event Start Date: </label><span id='event_start'> {{event_start}}</span></div></div> "; 
					row5 = "<div class='row text-left'><div class='col-xs-12'><label for='event_end'>Event End Date: </label><span id='event_end'> {{event_end}}</span></div></div> "; 
					row6 = "<div class='row text-left'><div class='col-xs-12'><label for='event_guestlist'>Event Guest list: </label><span id='event_guestlist' class='event_guestlist_unbelievable'>%s </span></div></div> ".replace("%s", guestlist_datalist.input + guestlist_datalist.datalist); 
					row7 = "<div class='row text-left'><div class='col-xs-12'><label for='event_guestmessage'>Message for Guests: </label><span id='event_guestmessage'> {{event_guestmessage}}</span></div></div>"; 
					row8 = "<div class='row text-left'><div class='col-xs-12'><label for='address'>Address for event: </label><span id='address'> {{event_address}}</span></div></div><hr> "; 
			
					/* Iterate through all the rows, use mustache to make the html and then add it onto the events container */
					[row1, row2, row3, row4, row5, row6, row7, row8].forEach(function(element2, index){
						html = Mustache.to_html(element2, element1);
						$scope.container.append(html);
					});
				});
			}
		});
	};
}]);