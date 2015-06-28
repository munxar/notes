/**
 * Created by saschaaeppli on 21.05.15.
 */
;(function(exports) {
    'use strict';

    // imports
    var util = exports.util;
    var NotesApp = exports.NotesApp;
    var noteService = exports.noteService;

    // create app
    var app = new NotesApp(window.localStorage);

    // convert query string to key/value pair object
    var params = util.queryParameter(location.search);
    // get elements from dom
    var form = $("#form");
    var css = $("#css");
    var deleteButton = $("#delete-button");

    // set style
    css.prop("href", app.style.get());

    noteService.getById(params.id, function(note) {
        var id = note._id;

        form.on("submit", note._id != undefined ? save : create);

        deleteButton.on("click", function() {
            noteService.delete(id, function() {
                window.location = "index.html";
            });
        });

        setModel(note);

        function save(e) {
            e.preventDefault();
            getModel();

            noteService.update(id, note, function() {
                window.location = "index.html";
            });
        }

        function create(e) {
            e.preventDefault();
            getModel();

            noteService.create(note, function() {
                window.location = "index.html";
            });
        }

        function setModel(note) {
            for(var attr in note) {
                var input = $("#" + attr);
                if(input) {
                    input.val(note[attr]);
                }
            }
        }

        function getModel() {
            for(var attr in note) {
                var input = $("#" + attr);
                if(input) {
                    note[attr] = input.val();
                }
            }
        }
    });

})(exports);
