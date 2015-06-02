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

        this.id = args.id || util.genId();
        this.done = args.done || false;
        this.name = args.name || "";
        this.finished = args.finished || false;
        this.creationDate = args.creationDate || new Date();
        this.finishDate = args.finishDate || new Date();
        this.description = args.description || "";
        this.importance = args.importance || 0;
    }

    // exports
    exports.Note = Note;
})(exports);