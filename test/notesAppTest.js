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

    it("persists filter index", function () {
        var app = new NotesApp();
        app.init();
        app.filterIndex.set(1);

        expect(app.storage.getItem("filterIndex")).toBe("1");
    });

    it("persists style", function () {
        var app = new NotesApp();
        app.init();
        app.style.set("test");

        expect(app.storage.getItem("style")).toBe('"test"');
    });

    it("persists showFinished flag", function () {
        var app = new NotesApp();
        app.init();
        app.showFinished.set(false);

        expect(app.storage.getItem("showFinished")).toBe("false");
    });

    it("persists notes", function () {
        var app = new NotesApp();
        app.init();
        app.notes.set([]);

        expect(app.storage.getItem("notes")).toBe("[]");
    });

    it("getNote by index", function () {
        var notes = [{name: "a"},{name: "a"}];
        var app = new NotesApp({ getItem: function() { return JSON.stringify(notes); }});
        app.init();
        var note = app.getNote(0);

        expect(note.name).toBe("a");
    });

    it("getNote creates note, if index is undefined", function () {
        var app = new NotesApp({ getItem: function() { return "[]"; }});
        app.init();
        var note = app.getNote();

        expect(note instanceof Note).toBe(true);
    });
});