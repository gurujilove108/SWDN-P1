

controllers.controller('SignupController', function ($scope, $location, oauth2Provider) {

   /* 
    * Constants for input error messages and success messages
	* Constants for the html error containers
	* Because getting them on every event being fired is a waste and inefficient 
	* finally we get the form signup button so we dont have to get it everytime in the correlated functions 
	* I have a rule that if you use the same code twice, then you should create a function for it
	* However there are some exceptions
	*/
	$scope.account_name_error 		= "Account name must be at least 3 characters";
	$scope.email_error 				= "Email must meet the following requirements, Some letters, an @ sign, some letters, a period, some letters";
	$scope.password_error 			= "Password must be 8 characters in length, include 1 lowercase and 1 uppercase letter";
	$scope.phone_error 				= "Phone must be in format (555)555-5555";
	$scope.employer_error			= "Employer name must be at least 3 characters in length";

	$scope.account_name_valid_msg 	= "Account name is valid";
	$scope.email_valid_msg 			= "Email is valid";
	$scope.password_valid_msg 		= "Password is valid";
	$scope.phone_valid_msg 			= "Phone is valid";
	$scope.employer_valid_msg		= "Employer is valid";			

	$scope.$account_name_status 	= jQuery('.account-name-status');
	$scope.$email_status 			= jQuery('.email-status');
	$scope.$password_status 		= jQuery('.password-status');
	$scope.$phone_status 			= jQuery('.phone-status');
	$scope.$employer_status			= jQuery('.employer-status');

	/* 
	 * In order to enable the sign up button, all input fields must be true and 
	 * That's what I'm declaring right here. initializing every input field variable to be false
	 * and then when the onchange event fires the corresponding input variable will be set to true if their valid
	 * At the end ofthe script we will only enable the button if all of these variables are true.
	 * There might be better ways to solve this problem, but this is my solution!
	 */
	$scope.is_account_name_valid 	= false;
	$scope.is_email_valid 			= false;
	$scope.is_password_valid 		= false;
	$scope.is_phone_valid 			= false;
	$scope.is_employer_valid 		= false;

	$scope.onAccountNameChange = function() {

		if (validAccountName($scope.account_name)) {
			$scope.$account_name_status.text($scope.account_name_valid_msg).css("color", "green");
			$scope.is_account_name_valid = true;

		} else {
			$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
		}
	};

	/* The email onchange has to be handled differently then the other onchanges because */
	/* If this event gets fired then the email is valid according to html5 */
	$scope.onEmailChange = function() {

		if (validEmail($scope.email)) {
			$scope.$email_status.text($scope.email_valid_msg).css("color", "green");
			$scope.is_email_valid = true;

		} else {
			$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
		}
	};

	$scope.onPasswordChange = function() {

		if (validPassword($scope.password)) {
			$scope.$password_status.text($scope.password_valid_msg).css("color", "green");
			$scope.is_password_valid = true;
			
		} else {
			$scope.$password_status.text($scope.password_error).css("color", "red");
			$scope.is_password_valid = false;
		}
	};

	$scope.onPhoneChange = function() {

		if (validPhone($scope.phone_number)) {
	 		$scope.$phone_status.text($scope.phone_valid_msg).css("color", "green");
			$scope.is_phone_valid = true;

	 	} else {
	 		$scope.$phone_status.text($scope.phone_error).css("color", "red");
			$scope.is_phone_valid = false;
	 	}
	};

	$scope.onEmployerChange = function() {

		if (validEmployer($scope.employer)) {
	 		$scope.$employer_status.text($scope.employer_valid_msg).css("color", "green");
			$scope.is_employer_valid = true;

	 	} else {
	 		$scope.$employer_status.text($scope.employer_error).css("color", "red");
			$scope.is_employer_valid = false;
	 	}
	};

	/* function to make sure all fields are valid, if this function returns true then the signup button will be disabled */
	$scope.allFieldsValid = function() {
		return $scope.is_account_name_valid && $scope.is_email_valid && $scope.is_password_valid && $scope.is_phone_valid && $scope.is_employer_valid;	
	};

	$scope.collectFormObject = function() {	  	
	  	return {
	  		account_name : 	jQuery("#account_name").val(),
	  		email 		 : 	jQuery("#email-signup").val(),
	  		password 	 : 	jQuery("#password-signup").val(),
	  		phone 		 : 	jQuery("#phone").val(),
	  		employer 	 : 	jQuery("#employer").val()  		 	
	  	};
	 };

   /* 
	* Now for our submit form function.
	* So In case the user is trying to hack the form and removes the required attributes
	* And un-disables the button, we still make sure to check if all the fields are valid 
	* When we submit the form. What would also be cool is to check to see if
	* Any of the required attributes have been removed. I'm definitely going to implement
	* That on my next project, well maybe if I have time.
	*/
	$scope.submitSignupForm = function() {

	  	if ($scope.allFieldsValid()) {
	  		var rpcFormObject = $scope.collectFormObject();
	  		var request = $scope.getUserSignupEndpointRequest(rpcFormObject);

	  		request.execute(function(response) {

	  			log(response);

	  			/* As of right now the only time response.user_stored would equal "0" is if the username already exists */
	  			/* If user stored === "1" then the user was stored in the user db. all we have to do is implement login options*/
	  			/* If the user stored === "1" the user ccount was created and not we redirect to the login page*/ 
	  			if (response.user_stored === "0") {
	  				$scope.$account_name_status.text("Account name already exists, please choose another").css("color", "red");

	  			} else if (response.user_stored === "1") { 
	  				$location.path("/login");
					$("#alert-msg").removeClass("hidden");
					window.scrollTo(10, 10);
				}	  			
	  		});
	  	} 
	};

	$scope.clearSignupForm = function() {

	};

	$scope.getUserSignupEndpointRequest = function(rpcFormObject) {
		return gapi.client.user_endpoint.user_signup(rpcFormObject);
	};
});

