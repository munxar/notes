/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("Note", function() {
    var Note = exports.Note;

    it("has name with default 'New Note'", function () {
        var note = new Note();

        expect(note.name.get()).toBe("");
    });

    it("has done property with default false", function () {
        var note = new Note();

        expect(note.done.get()).toBe(false);
    });

    it("has creationDate", function () {
        var note = new Note();

        expect(note.creationDate.get() instanceof Date).toBe(true);
    });

    it("has finishedDate", function () {
        var note = new Note();

        expect(note.finishDate.get() instanceof Date).toBe(true);
    });

    it("has description with default ''", function () {
        var note = new Note();

        expect(note.description.get()).toBe("");
    });

    it("has importance with default 0", function () {
        var note = new Note();

        expect(note.importance.get()).toBe(0);
    });

    it("has finished with default false", function () {
        var note = new Note();

        expect(note.finished.get()).toBe(false);
    });

    it("create Note from json", function () {
        var date1 = new Date();
        var date2 = new Date();
        var note = new Note({ name: "one", done: true, creationDate: date1, finishDate: date2, description: "hallo", importance: 42 });

        expect(note.name.get()).toBe("one");
        expect(note.description.get()).toBe("hallo");
        expect(note.done.get()).toBe(true);
        expect(note.creationDate.get()).toBe(date1);
        expect(note.finishDate.get()).toBe(date2);
        expect(note.importance.get()).toBe(42);
    });

});