/**
 * Created by saschaaeppli on 22.05.15.
 */

(function(exports) {

    /**
     * in memory storage for testing
     * simulates the window.localStorage interface
     * @constructor
     */
    function MemoryStorage() {
        this.storage = {};
    }

    /**
     * set a value for a key
     * @param key
     * @param value
     */
    MemoryStorage.prototype.setItem = function(key, value) {
        this.storage[key] = value.toString();
    };

    /**
     * get a value by key
     * @param key
     * @returns {*}
     */
    MemoryStorage.prototype.getItem = function(key) {
        return this.storage[key];
    };

    // exports
    exports.MemoryStorage = MemoryStorage;

})(exports);