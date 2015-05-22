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

});