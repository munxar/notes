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
        this.filterIndex = new Property();
        this.showFinished = new Property();
        this.notes = new Property();
        this.style = new Property();

        // initialize variables
        this.styles = [
            { name: "Black White Style", href: "styles/default.css" },
            { name: "Colorful Cat", href: "styles/color.css" }
        ];
        this.filters = [
            { name: "finish date" },
            { name: "creation date" },
            { name: "importance" }
        ];
    }

    /**
     * get available styles
     * @returns {Array}
     */
    NotesApp.prototype.getStyles = function() {
        return this.styles;
    };

    /**
     * get all filters
     * @return {Array}
     */
    NotesApp.prototype.getFilters = function() {
        return this.filters;
    };

    /**
     * persists a property in the storage on change
     * @param key in the storage
     * @param property property
     * @param init initial value if not present in storage
     */
    NotesApp.prototype.persist = function(key, property, init) {
        var storage = this.storage;
        // try to get item from storage, or set default and parse value
        var value = JSON.parse(storage.getItem(key) || JSON.stringify(init));

        // initialize property
        property.set(value);

        // persist value on change
        property.onChanged(function(value) {
            storage.setItem(key, JSON.stringify(value));
        });
    };

    /**
     * initialize all properties to their defaults
     */
    NotesApp.prototype.init = function() {
        this.persist("filterIndex", this.filterIndex, 0);
        this.persist("showFinished", this.showFinished, false);
        this.persist("notes", this.notes, []);
        this.persist("style", this.style, this.getStyles()[0].href)
    };

    // exports
    exports.NotesApp = NotesApp;
})(exports);