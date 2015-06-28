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

    it("createNote creates note, and adds it to the nots arra", function () {
        var app = new NotesApp();
        var note = app.createNote();
        expect(app.notes.get()).toEqual([note]);
    });

    it("has filtered notes", function () {
        var app = new NotesApp();
        var note1 = app.createNote();
        var note2 = app.createNote();
        note1.finished = true;
        app.filter();

        expect(app.filteredNotes.get()).toEqual([note2]);
    });
});