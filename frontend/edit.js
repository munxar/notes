/**
 * Created by saschaaeppli on 21.05.15.
 */
;(function(exports) {
    'use strict';

    // imports
    var util = exports.util;
    var NotesApp = exports.NotesApp;
    var Note = exports.Note;
    var noteService = exports.noteService;

    // create app
    var app = new NotesApp(window.localStorage);

    // convert query string to key/value pair object
    var params = util.queryParameter(location.search);
    var formTemplate = Handlebars.compile($("#formTemplate").html());

    // set style
    $("#css").prop("href", app.style.get());

    noteService.getById(params.id, function(note) {
        var id = note._id;
        $("#formContainer").html(formTemplate(note));

        $("#form").on("submit", id != undefined ? save : create);

        $("#delete-button").on("click", function() {
            noteService.delete(id, function() {
                window.location = "index.html";
            });
        });

        function save(e) {
            e.preventDefault();

            noteService.update(id, getModel(), function() {
                window.location = "index.html";
            });
        }

        function create(e) {
            e.preventDefault();

            noteService.create(getModel(), function() {
                window.location = "index.html";
            });
        }
    });

    function getModel() {
        var note = new Note();
        for(var attr in note) {
            var input = $("#" + attr);
            if(input) {
                note[attr] = input.val();
            }
        }
        return note;
    }
})(exports);
