
/* Ok guys, since the login is not required, please don't give me grief about it, I just wanted to test out some functionality */
/* I know that normally Iwould just let them enter a username and password and if their validthen log them in, but i am just playing around with this one and I know it's a huge security flaw. When I actually do implement login with oauth, I will change this */
/* The loginis not completely functional yet but the autofocus has been implemented */
controllers.controller('LoginController', ['$scope', '$location', function ($scope, $location) {
	
	$scope.account_name_valid 		= false;
	$scope.account_password_valid 	= false;
	$scope.account_name_input 		= jQuery("#account-name-login");
	$scope.account_password 		= jQuery("#login-password");
	$scope.account_name_status  	= jQuery(".account-name-login-status");
	$scope.account_password_status 	= jQuery(".password-login-status");


	$scope.submitLoginForm = function() {

		if ($scope.formValidated())
			$scope.sendGapiLoginForm();

	};

	$scope.formValidated = function() {
		return $scope.account_name_valid && $scope.account_password_valid;
	};
	
	$scope.accountNameExists = function() {

		var request = gapi.client.user_endpoint.user_exists({username: $scope.account_name});
		request.execute(function(response) {
			if (response.exists === "false") {
				$scope.account_name_valid = false;
				$scope.setFocus("account-name-login");
				$scope.account_name_status.text("This account does not exist. Please enter an account name that exists or click below to sign up").css("color", "red");
			
			} else {
				if (response.exists === "true") {
					$scope.account_name_valid = true;
					$scope.account_name_status.text("Account name exists!").css("color", "green");
					$scope.setFocus("login-password");
					$scope.onPasswordFocus();
				}
			} 
		});
	};

	$scope.passwordMatchesAccountName = function() {
		var request = gapi.client.user_endpoint.check_password_match({username: $scope.account_name, password: $scope.password});
		request.execute(function(response) {
			if (response.match === "true") {
				$scope.account_password_valid = true;
				$scope.account_password_status.text("password matches account name, button is enabled, press enter to login").css("color", "green");
				$scope.setFocus("btn-login");
			
			} else {
				$scope.account_password_status.text("Password does not match, please try again").css("color", "red");
			}

		});
	};

	$scope.setFocus = function(element_id) {
		jQuery("#" + element_id).focus();
	};

	$scope.sendGapiLoginForm = function() {

		var loginFormObject = {
			account_name: 	$scope.account_name,
			password: 		$scope.password
		};

		var request = gapi.client.user_endpoint.user_login(loginFormObject);
		request.execute(function(response) {
			log(response);
		});

	};

	$scope.onAccountNameFocus = function() {

		if (  ! validAccountName($scope.account_name))
			$scope.account_name_status.text("Account name is currently invalid").css("color", "red");

	};

	$scope.onAccountNameChange = function() {

		if (validAccountName($scope.account_name)) {
			$scope.account_name_status.text("Account name is valid").css("color", "green");
		
		} else {

			$scope.account_name_status.text("Account name is invalid").css("color", "red");
			if ($scope.account_name_valid)
				$scope.account_name_valid = false;
		}

	};

	$scope.onAccountNameUnfocus = function() {

		if (validAccountName($scope.account_name) && ! $scope.account_name_valid)
			$scope.accountNameExists();

	};

	$scope.onPasswordFocus = function() {

		if ( ! validPassword($scope.password)) {
			$scope.account_password_status.text("Password is currently invalid").css("color", "red");
		} 
	};

	$scope.onPasswordChange = function() {
		
		if (validPassword($scope.password)){
			$scope.account_password_status.text("Password is valid");

		} else {
			$scope.account_password_status.text("Password is currently Invalid")
		} 
	};

	$scope.onPasswordUnfocus = function() {

		if ( ! validPassword($scope.password)) {
			$scope.account_password_status.text("Password is currently Invalid").css("color", "red");
		} else {
			if ( ! $scope.account_password_valid)
				$scope.passwordMatchesAccountName();
		}
	};

	/* There's the autofocus right there #winning */
	$scope.checkPath = function() {

		var current_path = $location.path();
		if (current_path === "/login") {
			$scope.setFocus("account-name-login");
			$scope.onAccountNameFocus();
		}

	};

	$scope.checkPath();

}]);


/* 
get login form validated and submit
figure out how to use custom login
*/