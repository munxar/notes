/**
 * Created by saschaaeppli on 22.05.15.
 */

(function(exports) {
    /**
     * simple store class with localStorage interface
     * methods on localStorage must be
     * - setItem(key: string, value: string)
     * - getItem(key: string): string
     * if no localStorage is provided, an in memory implementation is used
     * @constructor
     */
    function Storage(localStorage) {
        this.storage = localStorage || new MemoryStorage();
    }

    /**
     * set a value by key
     * @param key {string}
     * @param value {string}
     */
    Storage.prototype.setItem = function(key, value) {
        this.storage.setItem(key, value);
    };

    /**
     * get a value by key
     * @param key {string}
     * @return {string}
     */
    Storage.prototype.getItem = function(key) {
        return this.storage.getItem(key);
    };

    /**
     * in memory local storage for testing
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
    exports.Storage = Storage;
    exports.MemoryStorage = MemoryStorage;

})(exports || {});