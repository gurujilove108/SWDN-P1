controllers.controller('SignupController', function ($scope, $location, oauth2Provider) {

	/* Methods for account_name input */
	$scope.onAccountNameFocus = function() {
		log("focusing on name input");
	}

	$scope.onAccountNameChange = function() {
		log("changing account name " + $scope.account_name);
		if ($scope.account_name != undefined && $scope.account_name.length >= 3) {
			jQuery(".account_name_success").attr("hidden", null);
		}

	}

	$scope.onAccountNameMouseLeave = function() {
		log("leaving account name input");
	}

	/* Methods for email input */
	$scope.onEmailFocus = function() {
		log("focusing on email input");
		if ($scope.account_name.length < 3) {
			jQuery("#account_name");
		}
	}

	$scope.onEmailChange = function() {
		log("changing email");
	}

	$scope.onEmailMouseLeave = function() {
		log("leaving email input");
	}

	/* */


	


	/* 
		the ng-models will be adding the following variables to the $scope object
		$scope.account_name;
		$scope.email;
		$scope.password;
		$scope.phone;
	*/

});