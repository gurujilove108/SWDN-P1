
controllers.controller('SignupController', ['$scope', '$location', function ($scope, $location) {

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
	$scope.account_name_exists_error= "That Account already exists, please enter a different account name."
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
	$scope.is_phone_valid			= false;
	$scope.is_employer_valid		= false;
	$scope.username_exists 			= false;

	// $scope.accountNameExists = function() {

	// 	if ( ! $scope.username_exists) {
	// 		var request = gapi.client.user_endpoint.user_exists({username: $scope.account_name});
	// 		request.execute(function(response) {
	// 			if (response.exists === "true") {
	// 				$scope.$account_name_status.text($scope.account_name_exists_error).css("color", "red");
	// 				$scope.is_account_name_valid = false;
	// 				$scope.username_exists = true;
	// 			}
	// 		});
	// 	}
	// };

	$scope.onAccountNameFocus = function() {

		if ( ! validAccountName($scope.account_name)) {
			$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
		} else {
			$scope.$account_name_status.text($scope.account_name_valid_msg).css("color", "green");
			$scope.is_account_name_valid = false;
		}
	};

	$scope.onAccountNameChange = function() {

		if (validAccountName($scope.account_name) ) {
			$scope.$account_name_status.text($scope.account_name_valid_msg).css("color", "green");
			$scope.is_account_name_valid = true;

		} else {
			$scope.$account_name_status.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
		}
	};

	/* If you click outside of the account name input and account name is valid then it sets focus to email, just in case the user doesnt hit tab or click the email input, well do it for them. We could set the focus as soon as the account name is valid, but that might turn out to be a bad user experience because even though it's valid, the user might not be done */ 
	/* Also, if this event is called and account name is not valid then we put the focus back on the account name */
	$scope.onAccountNameUnfocus = function() {

	};

	$scope.onEmailFocus = function() {

		if ( ! $scope.is_account_name_valid)
			$scope.setFocus("account_name");

		/* We have to add the or conditiion because of the way the input type='email' works */
		if (jQuery("#email-signup").val().length <= 6) 
			$scope.$email_status.text($scope.email_error).css("color", "red");
	};

	/* The email onchange has to be handled differently then the other onchanges because */
	/* If this event gets fired then the email is valid according to html5 */
	$scope.onEmailChange = function() {

		if (validEmail($scope.email) && jQuery("#email-signup").val().length >= 6) {
			$scope.$email_status.text($scope.email_valid_msg).css("color", "green");
			$scope.is_email_valid = true;

		} else {
			$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
		}
	};

	/* I'm going to make it the same with all inputs so that if they unfocus then the focus stays on that input*/
	$scope.onEmailUnfocus = function() {

		if ( ! $scope.is_email_valid) {
			$scope.$email_status.text($scope.email_error).css("color", "red");
			$scope.setFocus("email-signup");
		}
	};

	$scope.onPasswordFocus = function() {

		if ( ! validPassword($scope.password)) {
			$scope.$password_status.text($scope.password_error).css("color", "red");
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

	$scope.onPasswordUnfocus = function() {

		if ( ! $scope.is_password_valid) {
			$scope.$password_status.text($scope.password_error).css("color", "red");
			$scope.setFocus("password-signup");
		}

		else
			$scope.setFocus("phone");
	};
 
 	$scope.onPhoneFocus = function() {
 		/* Nothing to do here because we only show the validation message if they start entering data */
 	};

 	/* We want to handle the optional fields a little differently, like I before if we only show the validation message if theres input other wise we remove it */
	$scope.onPhoneChange = function() {

		if (validPhone($scope.phone_number)) {
	 		$scope.$phone_status.text($scope.phone_valid_msg).css("color", "green");
			$scope.is_phone_valid = true;

	 	} else if (( ! validPhone($scope.phone_number)) && $scope.phone_number.length > 0) {
	 		$scope.$phone_status.text($scope.phone_error).css("color", "red");
			$scope.is_phone_valid = false;

	 	} else {
	 		$scope.$phone_status.text('');
	 	}
	};

	$scope.onPhoneUnfocus = function() {

	}

	$scope.onEmployerChange = function() {

		if (validEmployer($scope.employer)) {
	 		$scope.$employer_status.text($scope.employer_valid_msg).css("color", "green");
			$scope.is_employer_valid = true;

	 	} else if ( ( ! validEmployer($scope.employer)) && $scope.employer.length > 0 ) {
	 		$scope.$employer_status.text($scope.employer_error).css("color", "red");
			$scope.is_employer_valid = false;

	 	} else {
	 		$scope.$employer_status.text('');
	 	}
	};

	$scope.onEmployerUnfocus = function() {

	};

	/* function to make sure all fields are valid, if this function returns true then the signup button will be disabled */
	$scope.allFieldsValid = function() {
		return $scope.is_account_name_valid && $scope.is_email_valid && $scope.is_password_valid;	
	};

	$scope.collectFormObject = function() {	 

	  	var rpcObj = {
	  		account_name : 	jQuery("#account_name").val(),
	  		email 		 : 	jQuery("#email-signup").val(),
	  		password 	 : 	jQuery("#password-signup").val()	 	
	  	};

	  	if ($scope.is_password_valid)
	  		rpcObj.phone = $scope.phone_number;

	  	if ($scope.is_employer_valid)
	  		rpcObj.employer = $scope.employer;

	  	return rpcObj;
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
		log("form submitting")
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
	  				window.setTimeout(function() {
	  					$location.path("/login");
	  				}, 100);

					$("#alert-msg").removeClass("hidden");
					window.scrollTo(10, 10);
				}	  			
	  		});
	  	} 
	};

	/* Once the user has successfully created an account we should clear all inputs, but since were redirect after 8/10 of a second and you cant make signup with an existing account name, ill just leave the method signature here in case I change my mind for some reason, maybe I'll apply some cool fade out affect, because I can do whatever I want with code #winning */
	$scope.clearSignupForm = function() {

	};

	$scope.getUserSignupEndpointRequest = function(rpcFormObject) {
		return gapi.client.user_endpoint.user_signup(rpcFormObject);
	};

	$scope.setFocus = function(element_id) {
		jQuery("#" + element_id).focus();
	};

	/* There's the autofocus right there #winning */
	$scope.checkPath = function() {
		var current_path = $location.path();
		if (current_path === "/signup") {
			$scope.setFocus("account_name");
			$scope.onAccountNameFocus();
		}

	};

	$scope.checkPath();
}]);

