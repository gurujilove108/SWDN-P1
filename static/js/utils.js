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

function logReplaced(symbol, replacement_str, message) {
    log(message.replace(symbol, replacement_str));
}

function loadStyleSheetsAsync() {
    config.stylesheetsAsyncLoad.forEach(function(link, index, args) {
        jQuery("head").append(link);
    });
}

function regExpMatch(regexp, value) {
	return regexp.test(value);
}

function validAccountName(account_name) {
	return (account_name !== undefined && account_name.length >= 3);
}

function validEmail(email) {
	return regExpMatch(config.regexp.email, email.trim());
}

function validPassword(password_value) {
    return regExpMatch(config.regexp.password, password_value.trim());
}

function validPhone(phone_value) {
	return regExpMatch(config.regexp.phone, phone_value.trim());
}

function validEmployer(employer_value) {
    return employer_value.length.trim() >= 3;
}

function removeDisabledAttr(string_selector) {
	jQuery(string_selector).attr("disabled", null);
}

function addDisabledAttr(string_selector) {
	jQuery(string_selector).attr("disabled", true);
}
