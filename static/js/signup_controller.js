controllers.controller('SignupController', function ($scope, $location, oauth2Provider) {

   /* 
	* constants for input error messages and success messages
	* Constants for the html error containers
	* Because getting them on every event being fired is a waste
	*/
	$scope.account_name_error 		= "Account name must be at least 3 characters";
	$scope.email_error 				= "Email must meet the following requirements, Some letters, an @ sign, some letters, a period, some letters";
	$scope.password_error 			= "Password must be 8 characters in length and include 1 lowercase and 1 uppercase letter";
	$scope.phone_error 				= "Phone must be in format (555)555-5555";

	$scope.account_name_valid_msg 	= "Account name is valid";
	$scope.email_valid_msg 			= "Email is valid";
	$scope.password_valid_msg 		= "Password is valid";
	$scope.phone_valid_msg 			= "Phone is valid";

	$scope.$account_name_label 	= jQuery('.account-name-status');
	$scope.$email_label 		= jQuery('.email-status');
	$scope.$password_label 		= jQuery('.password-status');
	$scope.$phone_label 		= jQuery('.phone-status');

	/* finally we get the signup button so we dont have to get it everytime */
	$scope.signup_btn = jQuery('.btn-signup');

	/*
	 * In order to enable the sign up button, all input fields must be true and 
	 * That's what I'm declaring right here. initializing every input field variable to be false
	 * and then when the onchange event fires the corresponding input variable will be set to true
	 * At the end ofthe script we will only enable the button if all of these variables are true.
	 * There might be better ways to solve this problem, but this is my solution!
	 */
	 $scope.is_account_name_valid 	= false;
	 $scope.is_email_valid 			= false;
	 $scope.is_password_valid 		= false;
	 $scope.is_phone_valid 			= false;

	/* 
	 * Methods for account name input events 
	 */
	$scope.onAccountNameChange = function() {
		if(validAccountName($scope.account_name)) {
			$scope.$account_name_label.text($scope.account_name_valid_msg).css("color", "green");
			$scope.is_account_name_valid = true;
		} else {
			$scope.$account_name_label.text($scope.account_name_error).css("color", "red");
			$scope.is_account_name_valid = false;
		}

		$scope.checkAllFieldsValid();
	}

	/*
	 * Methods for email input events
	 */
	$scope.onEmailChange = function(){
		if(validEmail($scope.email)) {
			$scope.$email_label.text($scope.email_valid_msg).css("color", "green");
			$scope.is_email_valid = true;
		} else {
			$scope.$email_label.text($scope.email_error).css("color", "red");
			$scope.is_email_valid = false;
		}

		$scope.checkAllFieldsValid();
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
			$scope.$password_label.text($scope.password_valid_msg).css("color", "green");
			$scope.is_password_valid = true;
		} else {
			$scope.$password_label.text($scope.password_error).css("color", "red");
			$scope.is_password_valid = false;
		}

		$scope.checkAllFieldsValid();
	}

	$scope.onPhoneChange = function() {
		if(validPhone($scope.phone_number)) {
			$scope.$phone_label.text($scope.phone_valid_msg).css("color", "green");
			$scope.is_phone_valid = true;
		} else {
			$scope.$phone_label.text($scope.phone_error).css("color", "red");
			$scope.is_phone_valid = false;
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
						return true;
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
	 	if ($scope.allFieldsValid())
	 		$scope.signup_btn.attr("disabled", null);
	 	else 
	 		$scope.signup_btn.attr("disabled", true);

	 }
});
	/* 
		the ng-models will be adding the following variables to the $scope object
		$scope.account_name;
		$scope.email;
		$scope.password;
		$scope.phone_number;
	*/

