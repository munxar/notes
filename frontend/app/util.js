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

    /**
     * helper to get a array of element ids as key/value map
     * @param document window.document
     * @param elementIds array of element ids
     * @return {*} key value object with id's as keys and elements as values
     */
    util.getElements = function(document, elementIds) {
        // for each element
        return elementIds.reduce(function(elements, id) {
            // add it to the elements object
            elements[id] = document.getElementById(id);
            return elements;
        }, {});
    };

    /**
     * removes all children from a given element
     * @param element DOM element
     */
    util.removeChildren = function(element) {
        // while there is a firstChild
        while (element.firstChild) {
            // remove it
            element.removeChild(element.firstChild);
        }
    };

    /**
     * generate a random string
     * @returns {string}
     */
    util.genId = function() {
        return Math.random().toString(36).split(".").join("");
    };

    // exports
    exports.util = util;
})(exports);