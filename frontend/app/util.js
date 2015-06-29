/**
 * Created by saschademirovic on 24.05.15.
 */

(function(exports) {
    // namespace util
    var util = {};

    /**
     * convert query string to key/value pair object
     */
    util.queryParameter = function(search) {
        // remove ? or initialize with empty string if string is shorter than 1 char
        var query = search.length > 0 ? search.substring(1) : "";

        // split key value pairs
        var tokens = query.split("&");

        // make object with key value pairs
        return tokens.reduce(function(obj, val) {
            var keyValue = val.split("=");
            var key = keyValue[0];
            // if key is not empty string
            if(key != "") {
                // set value
                obj[key] = keyValue[1];
            }
            return obj;
        }, {});
    };

    // exports
    exports.util = util;
})(exports);