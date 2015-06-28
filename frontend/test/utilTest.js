/**
 * Created by saschaaeppli on 22.05.15.
 */


describe("util", function() {

    var util = exports.util;
    var fakeDocument = { getElementById: function(id) { return id; }};

    it("queryParameter can handle empty search string", function () {
        var params = util.queryParameter("");

        expect(params).toEqual({});
    });

    it("queryParameter can contain query string", function () {
        var params = util.queryParameter("&");
        expect(params).toEqual({});
    });

    it("queryParameter makes key value pairs", function () {
        var params = util.queryParameter("&name=test&value=42");
        expect(params).toEqual({ name: "test", value: "42" });
    });

    it("queryParameter ignored empty keys", function () {
        var params = util.queryParameter("&=test&=42");
        expect(params).toEqual({});
    });

    it("queryParameter can contain empty values", function () {
        var params = util.queryParameter("&test=");
        expect(params).toEqual({ test: "" });
    });

    it("getElements can handle empty array", function () {
        var elements = util.getElements(fakeDocument, []);

        expect(elements).toEqual({});
    });

    it("getElements gets elements by id", function () {
        var elements = util.getElements(fakeDocument, ["one", "two"]);

        expect(elements).toEqual({ one: "one", two: "two" });
    });

    it("removeElements calls removeChild as long as firstChild exists", function () {
        var element = {
            firstChild: 2,
            removeChild: function(e) {
                this.firstChild--;
            }
        };
        util.removeChildren(element);

        expect(element.firstChild).toBe(0);
    });

});