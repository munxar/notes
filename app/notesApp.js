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
        this.filterIndex = new Property();
        this.showFinished = new Property();
        this.notes = new Property();
        this.style = new Property();

        // if filter index changes, recreate filter list
        this.filterIndex.onChanged(this.setFilterIndex.bind(this));
    }

    /**
     * return available styles
     * @returns {*[]}
     */
    NotesApp.prototype.getStyles = function() {
        return [
            { name: "Black White Style", href: "styles/default.css" },
            { name: "Colorful Cat", href: "styles/color.css" }
        ];
    };

    /**
     * set the current active filter index
     * @param index
     */
    NotesApp.prototype.setFilterIndex = function(index) {
        // get property array
        var filters = this.filters.get();
        // update state
        filters.forEach(function(filter, idx) { filter.active = idx == index; });
        // reset property
        this.filters.set(filters);
    };

    NotesApp.prototype.persist = function(key, property, init, noparse) {
        var storage = this.storage;
        var value = storage.getItem(key) || init;
        if(!noparse) {
            value = JSON.parse(value) || init;
        }
        property.set(value);
        property.onChanged(function(value) {
            storage.setItem(key, value);
        });
    };

    /**
     * initialize all properties to their defaults
     */
    NotesApp.prototype.init = function() {

        this.filters.set([
            { name: "finish date" },
            { name: "creation date" },
            { name: "importance" }
        ]);

        this.persist("filterIndex", this.filterIndex, 0);
        this.persist("showFinished", this.showFinished, false);
        this.persist("notes", this.notes, []);
        this.persist("style", this.style, this.getStyles()[0], true)
    };

    // exports
    exports.NotesApp = NotesApp;
})(exports);