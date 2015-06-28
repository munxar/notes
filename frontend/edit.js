/**
 * Created by saschaaeppli on 21.05.15.
 */
(function(exports) {
    'use strict';

    // imports
    var util = exports.util;
    var NotesApp = exports.NotesApp;

    // create app
    var app = new NotesApp(window.localStorage);

    // convert query string to key/value pair object
    var params = util.queryParameter(location.search);
    // get elements from dom
    var form = $("#form");
    var css = $("#css");

    // set style
    css.href = app.style.get();

    app.getNote(params.id, function(note) {

        form.onsubmit = note._id != undefined ? save : create;

        $("#delete-button").click(function() {
            $.ajax({type: "DELETE",
                url: "api/notes/" + note._id,
                success: function(request) {
                    window.location = "index.html";
                }
            });
        });

        setModel(note);

        function save(e) {
            e.preventDefault();

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
        }

        function create(e) {
            e.preventDefault();
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
