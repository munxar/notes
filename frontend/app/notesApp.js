/**
 * Created by saschaaeppli on 22.05.15.
 */

(function(exports) {
    var Property = exports.Property;
    var Note = exports.Note;
    var noteService = exports.noteService;

    /**
     * Notes App business logic
     * if no storage is present a MemoryStorage will be created as storage
     * note: install all property observers before calling init(), or default values will not be set.
     * @param storage optional
     * @constructor
     */
    function NotesApp(storage) {
        var self = this;

        // set or initialize default storage
        this.storage = storage || new exports.MemoryStorage();

        this.styles = new Property([]);
        this.filters = new Property([]);

        // init properties
        this.notes = new Property([]);
        this.filteredNotes = new Property([]);
        this.filterIndex = new Property(0);
        this.showFinished = new Property(JSON.parse(this.storage.getItem("showFinished") || "false"));
        this.style = new Property(JSON.parse(this.storage.getItem("style") || '"styles/default.css"'));

        // apply filter
        this.showFinished.onChanged(function(value) {
            self.filter();
        });

        this.notes.onChanged(this.filter.bind(this));

        this.filterIndex.onChanged(function() {
            // update filters to toggle active state
            self.filters.set(self.filters.get());
            // filter list
            self.filter();
            self.store();
        });

    }

    /**
     * filter the notes and set result to filteredNotes property
     */
    NotesApp.prototype.filter = function() {
        var app = this;
        var notes = this.notes.get();

        // filtering
        var filteredNotes = notes.filter(function(note) {
            return app.showFinished.get() ? note.finished : !note.finished;
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
            0: function(a, b) { return new Date(a.finishDate) - new Date(b.finishDate); },
            1: function(a, b) { return new Date(a.creationDate) - new Date(b.creationDate);},
            2: function(a, b) { return b.importance - a.importance; }
        }[this.filterIndex.get()];
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
    };

    NotesApp.prototype.restore = function() {
        var storage = this.storage;

        this.styles.set([
            { name: "Black White Style", href: "styles/default.css" },
            { name: "Colorful Cat", href: "styles/color.css" }
        ]);

        this.filters.set([
            { name: "finish date" },
            { name: "creation date" },
            { name: "importance" }
        ]);

        this.filterIndex.set(JSON.parse(storage.getItem("filterIndex")) || this.filterIndex.get());
        this.showFinished.set(JSON.parse(storage.getItem("showFinished")) || this.showFinished.get());
        this.style.set(JSON.parse(storage.getItem("style")) || this.style.get());

        var self = this;
        noteService.getAll(function(notes) {
            self.notes.set(notes);
        });
    };

    // exports
    exports.NotesApp = NotesApp;
})(exports);