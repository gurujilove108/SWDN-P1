function log(m) {
    console.log(m);
}

function timeNow() {
    return performance.now();
}

function timeDifference(t2, t1) {
	return t2-t1;
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function loadStyleSheetsAsync() {
    config.stylesheetsAsyncLoad.forEach(function(link, index, args) {
        jQuery("head").append(link);
    });
}

function defined(val) {
    return (val !== undefined);
}

function regExpMatch(regexp, value) {
	return regexp.test(value);
}

function validAccountName(account_name) {
	return (defined(account_name) && account_name.trim().length >= 3);
}

function validEmail(email) {
	return (defined(email) && regExpMatch(config.regexp.email, email.trim()));
}

function validPassword(password_value) {
    return (defined(password_value) && regExpMatch(config.regexp.password, password_value.trim()));
}

function validPhone(phone_value) {
	return (defined(phone_value) && regExpMatch(config.regexp.phone, phone_value.trim()));
}

function validEmployer(employer_value) {
    return employer_value.trim().length >= 3;
}

function removeDisabledAttr(string_selector) {
	jQuery(string_selector).attr("disabled", null);
}

function addDisabledAttr(string_selector) {
	jQuery(string_selector).attr("disabled", true);
}
