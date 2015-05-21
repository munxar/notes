/**
 * Created by saschaaeppli on 21.05.15.
 */
(function() {
    'use strict';

    var params = app.getQueryParameters();
    var note = app.getNote(params.index);
    var form = document.getElementById("form");
    var css = document.getElementById("css");

    // set style
    css.href = app.getStyle();

    form.onsubmit = save;

    if(!note) {
        note = app.createNote();
    }

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
        app.store();

        // hack to prevent url encoding of form
        event.preventDefault();
        window.location = "index.html";
    }

})();
