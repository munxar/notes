/**
 * Created by saschaaeppli on 28.06.15.
 */

;(function(exports) {
    // imports
    var Note = exports.Note;

    /**
     * note service
     * note: for simplicity no error handlers are exposed (error will throw and be visible in the console)
     * @constructor
     */
    function NoteService() {

    }

    /**
     * get all Notes
     * @param {([Note])} callback
     */
    NoteService.prototype.getAll = function(callback) {
        $.get("api/notes", function(data) {
            callback(data.map(function(note) { return new Note(note); }));
        });
    };

    /**
     * get one Note by id
     * @param {string} id unique identifier as ObjectId
     * @param {(Note)} callback
     */
    NoteService.prototype.getById = function(id, callback) {
        id ? $.get("api/notes/" + id, function(data) { callback(new Note(data)); }) : callback(new Note());
    };

    /**
     * create a Note
     * @param {string} data
     * @param {(Note)} callback
     */
    NoteService.prototype.create = function(data, callback) {
        request("POST", "api/notes", data, callback);
    };

    /**
     * update note by id
     * @param {string} id as ObjectId
     * @param {Note} data
     * @param {(Note)} callback
     */
    NoteService.prototype.update = function(id, data, callback) {
        request("PUT", "api/notes/" + id, data, callback)
    };

    /**
     * delete Note by id
     * @param {string} id
     * @param {(Note)} callback
     */
    NoteService.prototype.delete = function(id, callback) {
        request("DELETE", "api/notes/" + id, {}, callback);
    };

    /**
     * make a ajax request
     * @param {string} method
     * @param {string} url
     * @param {{}} data
     * @param {({})} callback
     */
    function request(method, url, data, callback) {
        $.ajax({ method: method, url: url, success: callback, data: JSON.stringify(data),  dataType: 'json', contentType: "application/json; charset=utf-8" })
    }

    exports.noteService = new NoteService();
})(exports);