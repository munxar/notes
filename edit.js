/**
 * Created by saschaaeppli on 21.05.15.
 */
(function(exports) {
    'use strict';

    // imports
    var util = exports.util;
    var NotesApp = exports.NotesApp;
    var Note = exports.Note;

    // create app
    var app = new NotesApp(window.localStorage);
    // load data
    //app.restore();

    // convert query string to key/value pair object
    var params = util.queryParameter(location.search);
    // get elements from dom
    var elements = util.getElements(document, ["form", "css"]);
    // set style
    elements.css.href = app.style.get();

    app.getNote(params.id, function(note) {
        console.log(note);
        elements.form.onsubmit = note._id != undefined ? save : create;

        $("#delete-button").click(function() {
            console.log("click");
            $.ajax({type: "DELETE",
                url: "api/notes/" + note._id,
                success: function(request) {
                    window.location = "index.html";
                }
            });
        });

        setModel(note);

        function save() {
            getModel();

            $.ajax({
                type: "PUT",
                url: "api/notes/" + note._id,
                data: JSON.stringify(note),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function(request) {
                    window.location = "index.html";
                }
            });
            // hack to prevent url encoding of form
            event.preventDefault();
        }

        function create() {
            getModel();

            $.ajax({
                type: "POST",
                url: "api/notes",
                data: JSON.stringify(note),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function(request) {
                    window.location = "index.html";
                }
            });
            event.preventDefault();
        }

        function setModel(note) {
            for(var attr in note) {
                var input = document.getElementById(attr);
                if(input) {
                    input.value = note[attr];
                }
            }
        }

        function getModel() {
            for(var attr in note) {
                var input = document.getElementById(attr);
                if(input) {
                    note[attr] = input.value;
                }
            }
        }
    });

    // get the note
    //var note = params.id != undefined ? app.getNote(params.id) : app.createNote();
})(exports);
