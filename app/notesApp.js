/**
 * Created by saschaaeppli on 22.05.15.
 */

(function(exports) {
    var Property = exports.Property;

    /**
     * Notes App business logic
     * if no storage is present a MemoryStorage will be created as storage
     * note: install all property observers before calling init(), or default values will not be set.
     * @param storage optional
     * @constructor
     */
    function NotesApp(storage) {
        // set or initialize default storage
        this.storage = storage || new exports.MemoryStorage;

        // create properties
        this.filters = new Property();
    }

    /**
     * initialize all properties to their defaults
     */
    NotesApp.prototype.init = function() {
        this.filters.set([]);
    };

    // exports
    exports.NotesApp = NotesApp;
})(exports);