/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("NotesApp", function() {
    var NotesApp = exports.NotesApp;
    var Note = exports.Note;

    it("creates default MemoryStorage if no storage arg is present", function () {
        var app = new NotesApp();

        expect(app.storage instanceof exports.MemoryStorage).toBe(true);
    });

    it("auto persists filter index", function () {
        var app = new NotesApp();
        app.filterIndex.set(1);
        app.store();

        expect(app.storage.getItem("filterIndex")).toBe("1");
    });

    it("auto persists style", function () {
        var app = new NotesApp();
        app.style.set("test");
        app.store();

        expect(app.storage.getItem("style")).toBe('"test"');
    });

    it("auto persists showFinished flag", function () {
        var app = new NotesApp();
        app.showFinished.set(false);
        app.store();

        expect(app.storage.getItem("showFinished")).toBe("false");
    });

    it("getNote by index", function () {
        var app = new NotesApp();
        var note1 = new Note();
        var note2 = new Note();
        app.notes.get().push(note1);
        app.notes.get().push(note2);

        var note = app.getNote(0);

        expect(note).toBe(note1);
    });

    it("getNote creates note, if index is undefined", function () {
        var app = new NotesApp({ getItem: function() { return "[]"; }});
        var note = app.getNote();

        expect(note instanceof Note).toBe(true);
    });

    it("createNote appends note to notes array", function () {
        var app = new NotesApp();
        var note = new Note();
        app.addNote(note);

        expect(app.notes.get()).toEqual([note]);
    });

});