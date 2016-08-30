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

function trim(value) {
    /* The built in trim function doesn't permanently trim the value, so we might as well do it while were here instead of in signup form */
    value = value.trim();
    return value;
}
function validAccountName(account_name) {
	return (defined(account_name) && trim(account_name).length >= 3);
}

function validEmail(email) {
	return (defined(email) && regExpMatch(config.regexp.email, trim(email)));
}

function validPassword(password_value) {
    return (defined(password_value) && regExpMatch(config.regexp.password, trim(password_value)));
}

function validPhone(phone_value) {
	return (defined(phone_value) && regExpMatch(config.regexp.phone, trim(phone_value)));
}

function validEmployer(employer_value) {
    return (defined(employer_value) && trim(employer_value).length >= 3);
}

function removeDisabledAttr(string_selector) {
	jQuery(string_selector).attr("disabled", null);
}

function addDisabledAttr(string_selector) {
	jQuery(string_selector).attr("disabled", true);
}

/* @param a hashtag for id, or a period for a class*/
function clearInput(string_selector) {
   jQuery(string_selector).val('');   
}
