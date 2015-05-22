/**
 * Created by saschaaeppli on 22.05.15.
 */

describe("Property", function() {
    var Property = exports.Property;

    it("can be a empty property", function () {
        var p = new Property();

        expect(p).toBeTruthy();
    });

    it("should have init value", function () {
        var p = new Property("default");

        expect(p.get()).toBe("default");
    });

    it("stores the set value", function () {
        var p = new Property();
        p.set(42);

        expect(p.get()).toBe(42);
    });

    it("calls observer after value has changed", function (done) {
        var p = new Property();
        p.onChanged(function(value) {
            expect(value).toBe(3.1415);
            done();
        });
        p.set(3.1415);
    });

    it("can have multiple observers", function () {
        var p = new Property();
        var v1 = 0, v2 = 0;
        p.onChanged(function(value) { v1 = value; });
        p.onChanged(function(value) { v2 = value; });
        p.set(1);

        expect(v1).toBe(1);
        expect(v2).toBe(1);
    });

    it("can remove observes", function () {
        var p = new Property();
        var v1 = 0, v2 = 0;
        var cb = p.onChanged(function(value) { v1 = value; });
        p.onChanged(function(value) { v2 = value; });
        p.offChanged(cb);
        p.set(1);

        expect(v1).toBe(0);
        expect(v2).toBe(1);
    });
});