/* This controller handles all the functionality for creting an event and loading in all events from the db */
controllers.controller('EventController', function ($scope, $location, $templateCache, oauth2Provider) {

	/* Initialize all required inputs validity to be false. These will be set true when they are validated name, host length just have to be greater than 3 */
	$scope.isEventNameValid = false;

	/* Host just has to be more than 0 characters */
	$scope.isEventHostValid = false;

	/* Here we want to store the error message element because I have a feeling the website will be using it alot and its much more efficient to store it one time than to have to store it everytime there is an error. I like effiency and speed! */
	$scope.error 			= jQuery("#msg");

	$scope.guestlist 		= document.getElementById("guestlist")
	$scope.eventTypes 		= document.getElementById("eventtype");
	$scope.numGuests 		= ($scope.guestlist != null) ? $scope.guestlist.childElementCount : $location.path();
	$scope.numEventTypes	= ($scope.eventTypes != null) ? $scope.eventTypes.childElementCount : $location.path();

	/* When these are set they will be set to the correct date timestamps in milliseconds since it's javascript and timesamps in js are in millisecond so to get them into seconds just multiply by a 1000 */
	$scope.startDate;
	$scope.endDate;

	$scope.createEvent = function() {
		var error_message = "";
		var errors = $scope.createEventFormValid();
		
		if (errors)
			$sope.sendGapiCreateForm();

		else {
			errors.forEach(function(error, index) {
				error_message += (error + "<br>");
			});

			$scope.showMessageBox("#errors");
			$scope.error.text(error_message);
		}
	};		

	$scope.showErrors = function(errorList) {

	}

	$scope.createEventFormValid = function() {
		var errors = [];

		if ( ! $scope.isEventNameValid)
			errors.push("Event Name,");

		if ( ! $scope.isEventHostValid)
			error.push("Event Host,");

		if ( ! $scope.checkDates())
			errors.push("Event Start Date must be before right now and must be before the Event End Date,");

		if ( ! $scope.guestlistValid()) 
			errors.push("there must be at least one guest,");

		if ( ! $scope.eventTypesValid())
			error.push("There must be at least one event type")

		if (errors.length > 0)
			return false;
		return true;
	};

	$scope.checkDates = function() {
		log($scope.guestlistValid())
		log($scope.eventTypesValid());
		log($scope.isEventNameValid)
		log($scope.isEventHostValid)
		log($scope.startDate);
		log($scope.endDate);
		return false;
	}

	$scope.userSignedIn = function() {
		return oauth2Provider.signedIn;
	};

	/* Functions that validate required input fields when their input is changed */
	$scope.onEventNameChange = function() {
		$scope.isEventNameValid = ($scope.eventName.length > 0) ? true : false;
	};

	$scope.onEventHostChange = function() {
		$scope.isEventHostValid = ($scope.eventHost.length > 0) ? true : false;
	};

	$scope.guestlistValid = function() {
		return $scope.numGuests > 0;
	};

	$scope.eventTypesValid = function() {
		return $scope.numEventTypes > 0;
	}

	$scope.onEventStartDateChange = function() {
		$scope.startDate = $scope.eventDateStart;
	};

	$scope.onEventEndDateChange = function() {
		$scope.endDate = $scope.eventDateEnd;
	};

	$scope.deleteEventInfo = function() {
		jQuery(".event-info-row").remove();
	};

	$scope.showMessageBox = function(stringProperty) {
		jQuery(stringProperty).removeClass("hidden");
	};

	$scope.closeMessageBox = function(stringProperty) {
		jQuery(stringProperty).addClass("hidden");
	};

	/*
	 * Method to create the form rpc object to pass in to our create event api method
	 * Note that the keys in the object we pass to the user endpoint api must have the same keynames in the rpc object that is being accepted by the api endpoint 
    */
	$scope.sendGapiCreateForm = function() {
    	var guestlistChildren 	= $scope.guestlist.children;
    	var eventTypesChildren 	= $scope.eventTypes.children;
    	var current_guest;
    	var i;

		var formObject = {
			event_name:  jQuery("#event-name").val(),
			event_host:  jQuery("#event-host").val(),
			event_start: jQuery("#event-datetime-start").val(),
			event_end:   jQuery("#event-datetime-end").val()
		};

		/* Creating an array of guests to store in the Event database from the datalist in the create event form */
		if ($scope.numGuests > 0) {
	
			for (i=0, guests=[]; i < $scope.numGuests; i++) {
				current_guest = guestlistChildren[i].value;
				guests.push(current_guest);
			}

			formObject.event_guestlist = guests;
		}

		/* Same thing as above except with the eventtype list*/ 
    	if ($scope.numEventTypes > 0) {
      
			for (i=0, event_types=[]; i < $scope.numEventTypes; i++) {
				current_event_type = eventTypesChildren[i].value;
				event_types.push(current_event_type);
			}

			formObject.event_type = event_types;
		}

		/* Since guestmessage is not required we only add it if there is a message */
		if (guestMessage.value.length > 0)
			formObject.event_guestmessage = guestMessage.value;

		var request = gapi.client.user_endpoint.create_event(formObject);
		request.execute(function(response){
			if (response.hasOwnProperty("successful") && response.successful === "1") {
				$scope.showMessageBox("#event-create-success");
				jQuery("#eventname").text($scope.eventName);
			}
		});

	};

	/* This function allows a user to add an element to a datalist, it just needs an id of th input datalist and an id of the datalist itself and so far it works with any data list */
	$scope.addToDatalist = function(input_id, datalist_id) {
			var datalist 			= jQuery("#" + datalist_id);
			var inputForDatalist 	= jQuery("#" + input_id);
			var inputValue 			= inputForDatalist.val();

			if (inputValue.length > 0) {
				datalist.append("<option value='%s'>".replace("%s", inputValue));

				/* After we've added the input to the datalist we want to clear the input field so it makes it easier for the user to add more data to the datalist also we could dynamically add the autofocus to it by writing the code jQuery(element).attr(autofocus, true)*/
				inputForDatalist.val('');

				/* We also want to remove the error box if the user has added input and added it to the data list */
				$scope.closeMessageBox("#errors");

			} else {
				$scope.showMessageBox("#errors");	
				jQuery("#msg").text("You can't add blank input to a list. Please provide at least one event and at least one guest");		
			}
				
	};

	/* The container that holds all the rows of events that are loaded rom the db */
	$scope.container = jQuery(".events-container-wrapper");

	/* 
	 * I'm sure theres a better way of doing this but this way is definitely harder which makes me cooler lol jk. 
	 * When loading our events from the database, we have to essentially re-create any datalists into the datalist html if we want to present it that way
	 * So thats exactly what this function does. This originally was only made for the event_guestlist, but now I have made it dynamic to accept any list and make datalist html
	*/
	$scope.createDataList = function(database_list, index, id) {

		/* 
		 * The guestlist and event types list are required by default so I shouldn't have to check for this, but Im going to anyway, because certain lists are requird
		 * The length will always be greater than 0, so in the else statement Im still going to provide output that doesnt break anthing but lets the tester know something is wrong with the code
		 */
		if (database_list.hasOwnProperty("length") && database_list.length > 0) {
			var datalist_input = "<input list='%s'>".replace("%s", id+index); 
			var datalist = "<datalist id='%s'>".replace("%s", id+index);

			/* Iterate through all objects in the list from the db */
			database_list.forEach(function(element, index) {

				/* Add each value from the list as an option alement to the datalist because a datalist uses html option elements so an option element is what we hve to add*/
				datalist += "<option value='%s'>".replace("%s", element);
			});

			/* Here we close off the datalist otherwise it wouldnt be valid html*/
			datalist += "</datalist>";

			return {input: datalist_input, datalist: datalist};

		} else {

			/* This should never ever be returned, don't worry if it is I will fix it */
			return {input: "no", datalist: "values on the list"};
		}
	};

	$scope.initMap = function() {
		log("map loaded");
	}

	/* 
	 * This method fetches all of the events from the db, organizes them into html and then displays them on the page
     * Because I had so much troube with ng-repeat which would have made my life a whole lot easier in solving this problem,
     * I had the pleasure of learning a new templating system called mustache.js but in the next project I will make sure
     * To get ng-repeat working
	*/
	$scope.loadAllEventsOntoPage = function() {

		/* Declare our variables here so we dont have to keep re-creating objects which is more effient */
		var guestlist_datalist, event_types_datalist, html, row1, row2, row3, row4, row5, row6, row7;
		var request = gapi.client.user_endpoint.all_events();

		/* Start loading in events */
		request.execute(function(response){
			log(response);
			/* if there are no events then there will be no events object in response we will add a msg to the events.html page to link them to create an event */
			if ( ! response.hasOwnProperty("events")) {
				jQuery(".no-events").text('There are currently no events, to create an event click');
				jQuery('.no-events').append(" <a href='/#/create_event'>create an event</a>");
			} else {

				/* Iterate through the events from our db */
				response.events.forEach(function(element1, index) { 

					/* 
					 * For each event, re-create our datalist, since each datalist has two tags, an input and datalist
					 * This datalist will be an object containing two keys which correspond to the two tags, datalist.input, datalist.datalist
					 */
					guestlist_datalist = $scope.createDataList(element1.event_guestlist, index, "guests");
					event_types_datalist = $scope.createDataList(element1.event_type, index, "eventtypes");
					/* Now for each event key we create the html to display them using mustache to replace the values from out event objects */
					row1 = "<div class='row text-left'><div class='col-xs-12'><label for='event_name'>Name of Event: </label><span id='event_name'> {{event_name}}</span></div></div> ";
					row2 = "<div class='row text-left'><div class='col-xs-12'><label for='event_type'>Event Types: </label><span id='event_type'>%s </span></div></div> ".replace("%s", event_types_datalist.input + event_types_datalist.datalist);
					row3 = "<div class='row text-left'><div class='col-xs-12'><label for='event_host'>Host of Event: </label><span id='event_host'> {{event_host}}</span></div></div> "; 
					row4 = "<div class='row text-left'><div class='col-xs-12'><label for='event_start'>Event Start Date: </label><span id='event_start'> {{event_start}}</span></div></div> "; 
					row5 = "<div class='row text-left'><div class='col-xs-12'><label for='event_end'>Event End Date: </label><span id='event_end'> {{event_end}}</span></div></div> "; 
					row6 = "<div class='row text-left'><div class='col-xs-12'><label for='event_guestlist'>Event Guest list: </label><span id='event_guestlist' class='event_guestlist_unbelievable'>%s </span></div></div> ".replace("%s", guestlist_datalist.input + guestlist_datalist.datalist); 
					row7 = "<div class='row text-left'><div class='col-xs-12'><label for='event_guestmessage'>Message for Guests: </label><span id='event_guestmessage'> {{event_guestmessage}}</span></div></div><hr> "; 
					
					/* Iterate through all the rows, use mustache to make the html and then add it onto the events container */
					[row1, row2, row3, row4, row5, row6, row7].forEach(function(element2, index){
						html = Mustache.to_html(element2, element1);
						$scope.container.append(html);
					});
				});
			}
		});
	};
});