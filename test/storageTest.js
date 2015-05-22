/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("MemoryStore", function() {

    var MemoryStorage = exports.MemoryStorage;

    it("has empty memory storage", function () {
        var ms = new MemoryStorage();
        expect(ms).toBeTruthy();
    });

    it("can write/read values to/from memory store", function () {
        var ms = new MemoryStorage();
        ms.setItem("test", "huhu");
        ms.setItem("bla", 42);
        ms.setItem("flag", false);
        ms.setItem("obj", {});

        expect(ms.getItem("test")).toBe("huhu");
        expect(ms.getItem("bla")).toBe("42");
        expect(ms.getItem("flag")).toBe("false");
        expect(ms.getItem("obj")).toBe("[object Object]");
    });

});

describe("Storage", function() {
    var Storage = exports.Storage;

    it("with no args creates store with MemoryStorage", function () {
        var s = new Storage();

        expect(s.storage instanceof exports.MemoryStorage).toBe(true);
    });

    it("with localStorage create store with localStorage", function () {
        var s = new Storage(window.localStorage);
        expect(s.storage).toBe(window.localStorage);
    });

    it("can write/read values to/from memory store", function () {
        var s = new Storage();
        s.setItem("eye", "(oO)");

        expect(s.getItem("eye")).toBe("(oO)");
    });

    it("can use window.localStorage", function () {
        var s = new Storage(window.localStorage);
        s.setItem("yo", "!");
        expect(window.localStorage.getItem("yo")).toBe("!");

        // clean up
        window.localStorage.removeItem("yo");
    });
});