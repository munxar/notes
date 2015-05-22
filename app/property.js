/**
 * Created by saschaaeppli on 22.05.15.
 */
(function(exports) {
    'use strict';

    /**
     * property class that is observable
     * @param init initial value
     * @constructor
     */
    function Property(init) {
        this._value = init;
        this._observers = [];
    }

    /**
     * getter
     */
    Property.prototype.get = function() {
        return this._value;
    };

    /**
     * setter
     */
    Property.prototype.set = function(value) {
        // set value
        this._value = value;
        // call observer
        this._observers.forEach(function(observer) { observer(value); });
    };

    /**
     * install a on changed handler on the property.
     * the callback will be called whenever the value hs changed.
     * @param callback observer of type function(value) {}
     */
    Property.prototype.onChanged = function(callback) {
        this._observers.push(callback);
        return callback;
    };

    /**
     * remove onChanged observer
     * @param callback observer callback to remove
     * if callback isn't found, silently nothing will happen.
     */
    Property.prototype.offChanged = function(callback) {
        var idx = this._observers.indexOf(callback);
        if(idx >= 0) {
            this._observers.splice(idx, 1);
        }
    };

    // exports
    exports.Property = Property;

})(exports || {});
