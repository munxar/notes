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
    // initialize properties
    app.init();

    // convert query string to key/value pair object
    var params = util.queryParameter(location.search);
    var note = app.getNote(params.index);

    // get elements from dom
    var elements = util.getElements(document, ["form", "css"]);

    // set style
    elements.css.href = app.style.get();
    elements.form.onsubmit = save;

    setModel(note);

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

    function save() {
        getModel();
        //app.store();

        // hack to prevent url encoding of form
        event.preventDefault();
        window.location = "index.html";
    }

    app.init();
})(exports);
