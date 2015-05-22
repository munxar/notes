/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("notes.Property", function() {

    it("can be a empty property", function () {
        var p = new notes.Property();
        expect(p).toBeTruthy();
    });

    it("should have init value", function () {
        var p = new notes.Property("default");
        expect(p.get()).toBe("default");
    });

    it("stores the set value", function () {
        var p = new notes.Property();
        p.set(42);
        expect(p.get()).toBe(42);
    });

    it("calls observer after value has changed", function (done) {
        var p = new notes.Property();
        p.onChanged(function(value) {
            expect(value).toBe(3.1415);
            done();
        });
        p.set(3.1415);
    });


});