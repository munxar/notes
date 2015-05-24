/**
 * Created by saschaaeppli on 21.05.15.
 */

(function() {
    'use strict';

    // access dom elements that we use
    var css = document.getElementById("css");
    var list = document.getElementById("list");
    var styles = document.getElementById("styles");
    var filter = document.getElementById("filter");
    var showFinished = document.getElementById("showFinished");

    var notesApp = new exports.NotesApp(window.localStorage);

    notesApp.getFilters().forEach(function(f, index) {
        var li = document.createElement("li");
        notesApp.filterIndex.onChanged(function(value) {
            li.className = value == index ? "active" : "";
        });
        var a = document.createElement("a");
        a.innerHTML = f.name;
        a.href = "";
        a.onclick = function() {
            notesApp.filterIndex.set(index);
            event.preventDefault();
        };
        li.appendChild(a);
        filter.appendChild(li);
    });

    /*
    // listen to filters changes
    notesApp.filters.onChanged(function(filters) {
        while (filter.firstChild) {
            filter.removeChild(filter.firstChild);
        }
        filters.forEach(function(f, index) {
            var li = document.createElement("li");
            li.className = f.active ? "active" : "";
            var a = document.createElement("a");
            a.innerHTML = f.name;
            a.href = "";
            a.onclick = function() {
                notesApp.filterIndex.set(index);
                event.preventDefault();
            };
            li.appendChild(a);
            filter.appendChild(li);
        });
    });
    */

    // install change listener and set class depending on state
    notesApp.showFinished.onChanged(function(show) {
        showFinished.className = show ? "active" : "";
    });

    // on click we toggle showFinished flag
    showFinished.onclick = function() {
        notesApp.showFinished.set(!notesApp.showFinished.get());
        // prevent default, so anchor doesn't navigate
        event.preventDefault();
    };

    // render notes
    notesApp.notes.onChanged(function(notes) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        notes.forEach(function(note, index) {
            var li = document.createElement("li");
            li.innerHTML = "<span>"+note.name+"</span><a href='edit.html?index=" + index + "'>bearbeiten</a>";
            list.appendChild(li);
        });
    });

    // create styles list
    notesApp.getStyles().forEach(function(style) {
        var option = document.createElement("option");
        option.innerHTML = style.name;
        option.value = style.href;
        styles.appendChild(option);
    });

    // bind style to select value
    notesApp.style.onChanged(function(style) {
        styles.value = style;
        css.href = styles.value;
    });

    // on change set style
    styles.onchange = function() {
        notesApp.style.set(styles.value);
    };

    // init application
    notesApp.init();

})();
