/**
 * Created by saschaaeppli on 28.06.15.
 */

;(function(exports) {
    // imports
    var Note = exports.Note;

    function NoteService() {

    }

    NoteService.prototype.getAll = function(callback) {
        $.get("api/notes", function(data) {
            callback(data.map(function(note) { return new Note(note); }));
        });
    };

    NoteService.prototype.getById = function(id, callback) {
        id ? $.get("api/notes/" + id, function(data) { callback(new Note(data)); }) : callback(new Note());
    };

    NoteService.prototype.create = function(data, callback) {
        request("POST", "api/notes", data, callback);
    };

    NoteService.prototype.update = function(id, data, callback) {
        request("PUT", "api/notes/" + id, data, callback)
    };

    NoteService.prototype.delete = function(id, callback) {
        request("DELETE", "api/notes/" + id, {}, callback);
    };

    function request(method, url, data, callback) {
        $.ajax({ method: method, url: url, success: callback, data: JSON.stringify(data),  dataType: 'json', contentType: "application/json; charset=utf-8" })
    }

    exports.noteService = new NoteService();
})(exports);