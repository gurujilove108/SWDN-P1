function log(m) {
    console.log(m);
}

function timeNow() {
    return performance.now();
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function logReplaced(symbol, replacement_str, message) {
    log(message.replace(symbol, replacement_str));
}

function loadStyleSheetsAsync() {
    config.stylesheetsAsyncLoad.forEach(function(link, index, args) {
        $("head").append(link);
    });
}
