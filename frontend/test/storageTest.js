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