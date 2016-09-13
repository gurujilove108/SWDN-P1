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
    console.log(regexp.test(value));
	return regexp.test(value);
}

function trim(value) {
    /* The built in trim function doesn't permanently trim the value, so we might as well do it while were here instead of in signup form */
    value = value.trim();
    return value;
}
function validAccountName(account_name) {
	return (defined(account_name) && (trim(account_name)).length >= 3);
}

/* So For some reason the error message for email validation doesn't show up until theres some letters an @ sign and then some letters */
/* Thus, I need the validation to show up as soon as someone enters in at least one character so they know whatthe requirement */
/* In order to accomplish this I'm going to apply a length requirement. So far the least of amount of letters accepted as a valid email is 6 so If the email value is not at least 6 letters the error should show up */ 
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

/*  
 * so I'm not exactly sure how I should validate an event name, but I'm just going to validate by making sure 
 * the value is greater than 0 and that they are not all digits because an event name that is all digits 
 * just doesn't make any sense and can't be valid
*/
function validEventName(value) {
    return defined(value) && value.length > 0 && notAllDigits(value);
}

/* I'm just going to do the same thing with the valid EventName so instead of calling validEventname on the host value I'm going to make a validHost function that just calls validEventName so the code can be more self documenting */
function validHost(value) {
    return validEventName(value);
}

/* same concept as above*/
function validEventType(value) {
    return validEventName(value);
}

function validGuest(value) {
    return validEventName(value);
}

function validAddress(address) {
    return validEventname(address) && address.length > 3;
}

/* I love ternary operators because they turn at least like several lines of code into 1 and they are readable as well as maintainable , at least in my opinion */
function notAllDigits(value) {
    return (config.regexp.allNumbers.test(value)) ? false : true; 
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
