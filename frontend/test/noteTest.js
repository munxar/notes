/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("Note", function() {
    var Note = exports.Note;

    it("has name with default 'New Note'", function () {
        var note = new Note();

        expect(note.name).toBe("");
    });

    it("has done property with default false", function () {
        var note = new Note();

        expect(note.done).toBe(false);
    });

    it("has creationDate", function () {
        var note = new Note({ creationDate: Date.UTC(1980,1,17,0,0,0) });

        expect(note.creationDate).toEqual("1980-02-17");
    });

    it("has finishedDate", function () {
        var note = new Note({ finishDate: Date.UTC(2000,3,1,0,0,0)});

        expect(note.finishDate).toBe("2000-04-01");
    });

    it("has description with default ''", function () {
        var note = new Note();

        expect(note.description).toBe("");
    });

    it("has importance with default 0", function () {
        var note = new Note();

        expect(note.importance).toBe(0);
    });

    it("has finished with default false", function () {
        var note = new Note();

        expect(note.finished).toBe(false);
    });

    it("create Note from json", function () {
        var date1 = Date.UTC(2015,6,1);
        var date2 = Date.UTC(2016,1,6);
        var note = new Note({ name: "one", done: true, creationDate: date1, finishDate: date2, description: "hallo", importance: 42 });

        expect(note.name).toBe("one");
        expect(note.description).toBe("hallo");
        expect(note.done).toBe(true);
        expect(note.creationDate).toBe("2015-07-01");
        expect(note.finishDate).toBe("2016-02-06");
        expect(note.importance).toBe(42);
    });

});