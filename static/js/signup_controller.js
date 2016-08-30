controllers.controller('SignupController', function ($scope, $location, oauth2Provider) {

   /* constants for input error messages and success messages
	* Constants for the html error containers
	* Because getting them on every event being fired is a waste
	* finally we get the form signup button so we dont have to get it everytime in the correlated functions 
	* I have a rule that is you use the same code twice, then you should create a function for it
	* however there are some exceptions
	*/
	$scope.account_name_error 		= "Account name must be at least 3 characters";
	$scope.email_error 				= "Email must meet the following requirements, Some letters, an @ sign, some letters, a period, some letters";
	$scope.password_error 			= "Password must be 8 characters in length and include 1 lowercase and 1 uppercase letter";
	$scope.phone_error 				= "Phone must be in format (555)555-5555";
	$scope.employer_error			= "Employer name must be at least 3 characters";

	$scope.account_name_valid_msg 	= "Account name is valid";
	$scope.email_valid_msg 			= "Email is valid";
	$scope.password_valid_msg 		= "Password is valid";
	$scope.phone_valid_msg 			= "Phone is valid";
	$scope.employer_valid_msg		= "Employer is valid";			

	$scope.$account_name_status 	= jQuery('.account-name-status');
	$scope.$email_status 			= jQuery('.email-status');
	$scope.$password_status 		= jQuery('.password-status');
	$scope.$phone_status 			= jQuery('.phone-status');
	$scope.$employer_status			= jQuery(".employer-status");

	$scope.signup_btn = jQuery('.btn-signup');

	/* In order to enable the sign up button, all input fields must be true and 
	 * That's what I'm declaring right here. initializing every input field variable to be false
	 * and then when the onchange event fires the corresponding input variable will be set to true
	 * At the end ofthe script we will only enable the button if all of these variables are true.
	 * There might be better ways to solve this problem, but this is my solution!
	 */
	 $scope.is_account_name_valid 	= false;
	 $scope.is_email_valid 			= false;
	 $scope.is_password_valid 		= false;
	 $scope.is_phone_valid 			= false;
	 $scope.is_employer_valid 		= false;

	/* Methods for account name input events, focus and unfocus */
	$scope.onAccountNameChange = function() {
		if (validAccountName($scope.account_name)) {
			$scope.$account_name_status.text($scope.account_name_valid_msg).css("color", "green");
			$scope.is_account_name_valid = true;
		} else {
			$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
		}

		$scope.checkAllFieldsValid();
	}

	/* Method for when the user leaves focus of the account name input box
	 * We have to check to see if the account name is valid and we will do the same 
	 * for the other input form fields as well
	 */
	$scope.onAccountNameUnfocus = function() {
		if (!validAccountName($scope.account_name)) {
			$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
		}
	}

	/* Every time the user changes the input in the email input box
	 * This method gets called
	 */
	$scope.onEmailChange = function(){
		if(validEmail($scope.email)) {
			$scope.$email_status.text($scope.email_valid_msg).css("color", "green");
			$scope.is_email_valid = true;
		} else {
			$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
		}

		$scope.checkAllFieldsValid();
	}

	$scope.onEmailUnfocus = function(){
		if (!validEmail($scope.email)) {
			$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
		}
	}

	/*
     * When a user clicks the password box and neither of the account name or
     * email is valid then we will display the error message for those inputs		
	 */
	 $scope.onPasswordFocus = function() {
	 	if (!validAccountName($scope.account_name)) {
	 		$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
	 	}

	 	if (!validEmail($scope.email)) {
	 		$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
	 	}
	 }

	 $scope.onPasswordUnfocus = function() {
	 	if (!validPassword($scope.password)) {
	 		$scope.$password_status.text($scope.password_error).css("color", "red");
			$scope.is_password_valid = false;
	 	}
	 }

	/* 
	 * Methods for password input events
	 * Ok I have just experienced an interesting problem.
	 * When the /signup page loads and the email and password are autofilled in, the email onchange gets run
	 * but the password onchange doesn't. If I click the page or click the password box it then runs as it should.
	 * I'm going to fix this problem by just firing an onclick event on the document
	 */
	$scope.onPasswordChange = function() {
		if(validPassword($scope.password)) {
			$scope.$password_status.text($scope.password_valid_msg).css("color", "green");
			$scope.is_password_valid = true;
		} else {
			$scope.$password_status.text($scope.password_error).css("color", "red");
			$scope.is_password_valid = false;
		}

		$scope.checkAllFieldsValid();
	}

	/*
		Here we are going to do the same thing as the onPasswordFocus except
		We are going to include the password field as well 
	*/
	$scope.onPhoneFocus = function() {
		if (!validAccountName($scope.account_name)) {
	 		$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
	 	}

	 	if (!validEmail($scope.email)) {
	 		$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
	 	}

	 	if (!validPassword($scope.password)) {
	 		$scope.$password_status.text($scope.password_error).css("color", "red");
			$scope.is_password_valid = false;
	 	}
	}

	$scope.onPhoneUnfocus = function() {
		if (!validPhone($scope.phone_number)) {
	 		$scope.$phone_status.text($scope.phone_error).css("color", "red");
			$scope.is_phone_valid = false;
	 	}
	}

	$scope.onPhoneChange = function() {
		if(validPhone($scope.phone_number)) {
			$scope.$phone_status.text($scope.phone_valid_msg).css("color", "green");
			$scope.is_phone_valid = true;
		} else {
			$scope.$phone_status.text($scope.phone_error).css("color", "red");
			$scope.is_phone_valid = false;
		}

		$scope.checkAllFieldsValid();
	}

	$scope.onEmployerFocus = function() {
		if (!validAccountName($scope.account_name)) {
	 		$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
	 	}

	 	if (!validEmail($scope.email)) {
	 		$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
	 	}

	 	if (!validPassword($scope.password)) {
	 		$scope.$password_status.text($scope.password_error).css("color", "red");
			$scope.is_password_valid = false;
	 	}

	 	if(!validPhone($scope.phone_number)) {
	 		$scope.$phone_status.text($scope.phone_error).css("color", "red");
			$scope.is_phone_valid = false;
	 	}
	}

	$scope.onEmployerUnfocus = function() {
		if (!validEmployer($scope.employer)) {
			$scope.$employer_status.text($scope.employer_error).css("color", "red");
			$scope.is_employer_valid = false;
		}
	}

	$scope.onEmployerChange = function() {
		if (validEmployer($scope.employer)) {
			$scope.$employer_status.text($scope.employer_valid_msg).css("color", "green");
			$scope.is_employer_valid = true;
		} else {
			$scope.$employer_status.text($scope.employer_error).css("color", "red");
			$scope.is_employer_valid = false;
		}

		$scope.checkAllFieldsValid();
	}
	/* 
	 * method that will be run on every onchange of every input 
	 * returns true if every input validation has been satisfied
	 * false otherwise
	 * This method makes sense to me as a good solution to make the form submitable
	 * Due to the possibility that a user could have any different combination
	 * of valid form inputs complete and finishing the form with any form unput
	 * which is why I have the function exit as soon as one input validity returns false
	*/
	$scope.allFieldsValid = function() {
		if ($scope.is_account_name_valid)
			if ($scope.is_email_valid) 
				if ($scope.is_password_valid)
					if ($scope.is_phone_valid) 
						if ($scope.is_employer_valid)
							return true;
						return false;
					return false;
				return false;
			return false;
		return false;
	}

	/* 
  	 * In case the user fills out the user in any order
  	 * We check to see if all fields are valid at the end
  	 * Of every form onChange. if Their all valid then we enable the button to sign up
	 */
	 $scope.checkAllFieldsValid = function() {
	 	if ($scope.allFieldsValid()) {
	 		$scope.signup_btn.attr("disabled", null);
	 		return true;
	 	} else {
	 		$scope.signup_btn.attr("disabled", true);
	 		return false;
	 	}
	 }


	 /*  
	  * Function for collecting all the form input values to send as a rpc message to 
	  * our user endpoint
	  */
	  $scope.collectFormObject = function() {	  	
	  	var signupFormObjectRPC = {
	  		account_name: 	jQuery("#account_name").val(),
	  		email: 			jQuery("#email-signup").val(),
	  		password: 		jQuery("#password-signup").val(),
	  		phone: 			jQuery("#phone").val(),
	  		employer: 		jQuery("#employer").val()  		
				  	
	  	};
	  	return signupFormObjectRPC;
	  }


	 /* 
	  * Now for our submit form function.
	  * So In case the user is trying to hack the form and removes the required attributes
	  * And un-disables the button, we still make sure to check if all the fields are valid 
	  * When we submit the form. What would also be cool is to check to see if
	  * Any of the required attributes have been remove. I'm definitely going to implement
	  * That on my next project
	  */
	  $scope.submitSignupForm = function() {
	  	log("attempting to sign up user");
	  	if ($scope.checkAllFieldsValid()) {
	  		var rpcFormObject = $scope.collectFormObject();
	  		log("all fields are valid");
	  		log("logging form object to send to google cloud endpoint");
	  		log(rpcFormObject);

	  		var request = $scope.getSignupEndpointRequest(rpcFormObject);
	  		log("current request object: ")
	  		log(rpcFormObject);

	  		request.execute(function(response) {
	  			log(response);
	  			if (response.user_stored === "0") {
	  				$scope.$account_name_status.text("Account name already exists, please choose another").css("color", "red");
	  			}

	  		});

	  	} else {
	  		log("not signin up the form, btn should be disabled");
	  	}
	  }

	  $scope.getSignupEndpointRequest = function(rpcFormObject) {
	  	var request = gapi.client.user_endpoint.user_signup(rpcFormObject);
		return request;
	  }
});
	/* 
		the ng-models will be adding the following variables to the $scope object
		$scope.account_name;
		$scope.email;
		$scope.password;
		$scope.phone_number;
		$scope.employer;
		Very Important Note 1. If there is no value inside the input box, $scope.value will be undefined opposed to ""
	*/

