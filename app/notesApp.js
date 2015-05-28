/**
 * Created by saschaaeppli on 22.05.15.
 */

(function(exports) {
    var Property = exports.Property;
    var Note = exports.Note;

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
        // init properties
        this.notes = new Property([]);
        this.filteredNotes = new Property([]);
        this.filterIndex = new Property(0);
        this.showFinished = new Property(false);
        this.style = new Property(this.styles[0].href);

        // apply filter
        this.showFinished.onChanged(this.filter.bind(this));
        this.notes.onChanged(this.filter.bind(this));
        this.filterIndex.onChanged(this.filter.bind(this));
    }

    /**
     * filter the notes and set result to filteredNotes property
     */
    NotesApp.prototype.filter = function() {
        var app = this;
        var notes = this.notes.get();

        // filtering
        var filteredNotes = notes.filter(function(note) {
            return app.showFinished.get() ? true : !note.finished.get();
        });

        // sorting
        var sortFn = this.getSortFunction();
        var sortedAndFilteredNotes = filteredNotes.sort(sortFn);

        this.filteredNotes.set(sortedAndFilteredNotes);
    };

    /**
     * returns a sort function depending on filterIndex
     * 0: finish date
     * 1: creation date
     * 2: importance
     * @returns {*}
     */
    NotesApp.prototype.getSortFunction = function() {
        return {
            0: function(a, b) { return new Date(b.finishDate.get()) - new Date(a.finishDate.get()); },
            1: function(a, b) { return new Date(b.creationDate.get()) - new Date(a.creationDate.get());},
            2: function(a, b) { return b.importance.get() - a.importance.get(); }
        }[this.filterIndex.get()];
    };

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
     * get a node by id
     * @param id note id
     * @return {*|Note}
     */
    NotesApp.prototype.getNote = function(id) {
        return this.notes.get().filter(function(note) { return note.id.get() === id; })[0];
    };


    /**
     * append a new note and adds it to the notes array
     * @return {*|Note}
     */
    NotesApp.prototype.createNote = function() {
        // create new note
        var note = new Note();
        this.notes.get().push(note);
        return note;
    };

    /**
     *
     */
    NotesApp.prototype.store = function() {
        var storage = this.storage;

        storage.setItem("filterIndex", JSON.stringify(this.filterIndex.get()));
        storage.setItem("showFinished", JSON.stringify(this.showFinished.get()));
        storage.setItem("style", JSON.stringify(this.style.get()));
        storage.setItem("notes", JSON.stringify(this.notes.get()));
    };

    NotesApp.prototype.restore = function() {
        var storage = this.storage;

        this.filterIndex.set(JSON.parse(storage.getItem("filterIndex")) || this.filterIndex.get());
        this.showFinished.set(JSON.parse(storage.getItem("showFinished")) || this.showFinished.get());
        this.style.set(JSON.parse(storage.getItem("style")) || this.style.get());

        var notes = JSON.parse(storage.getItem("notes") || JSON.stringify(this.notes.get()))
            .map(function(note) { return new Note(note); });
        this.notes.set(notes);
    };

    // exports
    exports.NotesApp = NotesApp;
})(exports);