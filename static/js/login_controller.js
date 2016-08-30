controllers.controller('LoginController', function ($scope, $location, oauth2Provider) {
	$scope.account_name_valid 	= false;
	$scope.password_valid 		= false;

	$scope.submitLoginForm = function() {
		if ($scope.formValidated()) {
			$scope.sendGapiLoginForm();
		}
	}

	$scope.formValidated = function() {
		return ($scope.account_name_valid && $scope.password_valid);
	}
	

	$scope.sendGapiLoginForm = function() {
		var loginFormObject = {
			account_name: 	jQuery("#account-name-login").val(),
			password: 		jQuery("#login-password").val()
		}

		var request = gapi.client.user_endpoint.user_login(loginFormObject);
		request.execute(function(response) {
			log(response);
			if (response.successful === "0") {
				jQuery(".account-name-login-status").text(response.error_msg).css("color", "red");
			}
		});
	}

	$scope.onAccountNameChange = function() {
		if (validAccountName($scope.account_name)) {
			jQuery(".account-name-login-status").text("Account name valid").css("color", "green");
			$scope.account_name_valid = true;
		} else {
			jQuery(".account-name-login-status").text("Account name invalid").css("color", "red");
			$scope.account_name_valid = false;
		}
	}

	$scope.onPasswordChange = function() {
		if (validPassword($scope.password)) {
			jQuery(".password-login-status").text("Password name valid").css("color", "green");
			$scope.password_valid = true;
		} else {
			jQuery('.password-login-status').text("Account name invalid").css("color", "red");
			$scope.password_valid = false;
		}
	}
});


/* 
get login form validated and submit
figure out how to use custom login
*/