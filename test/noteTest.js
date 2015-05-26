/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("Note", function() {
    var Note = exports.Note;

    it("has name with default 'New Note'", function () {
        var note = new Note();

        expect(note.name).toBe("New Note");
    });

    it("has done property with default false", function () {
        var note = new Note();

        expect(note.done.get()).toBe(false);
    });

    it("has creationDate", function () {
        var note = new Note();

        expect(note.creationDate instanceof Date).toBe(true);
    });

    it("has finishedDate", function () {
        var note = new Note();

        expect(note.finishDate instanceof Date).toBe(true);
    });

    it("has description with default ''", function () {
        var note = new Note();

        expect(note.description).toBe("");
    });

    it("has importance with default 0", function () {
        var note = new Note();

        expect(note.importance).toBe(0);
    });

    it("create Note from json", function () {
        var date1 = new Date();
        var date2 = new Date();
        var note = new Note({ name: "one", done: true, creationDate: date1, finishDate: date2, description: "hallo", importance: 42 });

        expect(note.name).toBe("one");
        expect(note.description).toBe("hallo");
        expect(note.done.get()).toBe(true);
        expect(note.creationDate).toBe(date1);
        expect(note.finishDate).toBe(date2);
        expect(note.importance).toBe(42);
    });

});