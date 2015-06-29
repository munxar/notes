/**
 * Created by saschademirovic on 24.05.15.
 */

(function(exports) {
    /**
     * Note class
     * @constructor
     */
    function Note(args) {
        args = args || {};

        this._id = args._id || undefined;
        this.name = args.name || "";
        this.finished = args.finished || false;
        this.description = args.description || "";
        this.importance = args.importance || 0;

        // convert date
        var creationDate = args.creationDate || new Date();
        var finishDate = args.finishDate || new Date();
        this.creationDate = onlyDate(creationDate);
        this.finishDate = onlyDate(finishDate);
    }

    /**
     * convert a date or iso string to yyyy-mm-dd format
     * @param date date or iso string
     * @returns {string} yyyy-mm-dd format
     */
    function onlyDate(date) {
        return new Date(date).toJSON().split("T")[0];
    }

    // exports
    exports.Note = Note;
})(exports);