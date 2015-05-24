/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("NotesApp", function() {
    var NotesApp = exports.NotesApp;
    var Property = exports.Property;

    it("creates default MemoryStorage if no storage arg is present", function () {
        var app = new NotesApp();

        expect(app.storage instanceof exports.MemoryStorage).toBe(true);
    });

    it("has filters property", function () {
        var app = new NotesApp();

        expect(app.filters instanceof Property).toBe(true);
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


});