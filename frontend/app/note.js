/**
 * Created by saschademirovic on 24.05.15.
 */

(function(exports) {
    var util = exports.util;

    /**
     * Note class
     * @constructor
     */
    function Note(args) {
        args = args || {};

        this._id = args._id || undefined;
        this.done = args.done || false;
        this.name = args.name || "";
        this.finished = args.finished || false;
        var creationDate = args.creationDate || new Date();
        var finishDate = args.finishDate || new Date();
        this.creationDate = onlyDate(creationDate);
        this.finishDate = onlyDate(finishDate);
        this.description = args.description || "";
        this.importance = args.importance || 0;
    }

    function onlyDate(date) {
        return new Date(date).toJSON().split("T")[0];
    }

    // exports
    exports.Note = Note;
})(exports);