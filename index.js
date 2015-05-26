/**
 * Created by saschaaeppli on 21.05.15.
 */

(function(exports) {
    'use strict';

    // imports
    var util = exports.util;

    // get dom elements that we use
    var elements = util.getElements(document, ["css", "list", "styles", "filter", "showFinished"]);

    // create a notes app
    var notesApp = new exports.NotesApp(window.localStorage);

    // create filters
    notesApp.getFilters().forEach(function(f, index) {
        var li = document.createElement("li");
        // if filter index changes, update active class
        notesApp.filterIndex.onChanged(function(value) {
            li.className = value == index ? "active" : "";
        });
        var a = document.createElement("a");
        a.innerHTML = f.name;
        a.href = "";
        // install click handler to change current filter
        a.onclick = function() {
            notesApp.filterIndex.set(index);
            notesApp.store();
            event.preventDefault();
        };
        li.appendChild(a);
        elements.filter.appendChild(li);
    });

    // install change listener and set class depending on state
    notesApp.showFinished.onChanged(function(show) {
        elements.showFinished.className = show ? "active" : "";
    });

    // on click we toggle showFinished flag
    elements.showFinished.onclick = function() {
        notesApp.showFinished.set(!notesApp.showFinished.get());
        notesApp.store();

        // prevent default, so anchor doesn't navigate
        event.preventDefault();
    };

    // render notes
    notesApp.filteredNotes.onChanged(function(notes) {
        // empty list
        util.removeChildren(elements.list);

        notes.forEach(function(note, index) {
            var li = document.createElement("li");

            var finished = document.createElement("input");
            finished.type = "checkbox";
            finished.checked = note.finished.get();
            finished.onchange = function() {
                note.finished.set(this.checked);
                notesApp.store();
                notesApp.filter();
            };

            var name = document.createElement("span");
            name.innerHTML = note.name.get();

            var edit = document.createElement("a");
            edit.href= "edit.html?index=" + index;
            edit.innerHTML = "bearbeiten";

            li.appendChild(finished);
            li.appendChild(name);
            li.appendChild(edit);

            elements.list.appendChild(li);
        });
    });

    // create styles list
    notesApp.getStyles().forEach(function(style) {
        var option = document.createElement("option");
        option.innerHTML = style.name;
        option.value = style.href;
        elements.styles.appendChild(option);
    });

    // bind style to select value
    notesApp.style.onChanged(function(style) {
        elements.styles.value = style;
        elements.css.href = style;
    });

    // on change set style
    elements.styles.onchange = function() {
        notesApp.style.set(elements.styles.value);
        notesApp.store();
    };

    // init application
    notesApp.restore();

})(exports);
