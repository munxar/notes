/**
 * Created by saschaaeppli on 21.05.15.
 */

(function() {
    'use strict';

    var list = document.getElementById("list");
    var styles = document.getElementById("styles");
    var filter = document.getElementById("filter");
    var css = document.getElementById("css");

    // create list of notes
    app.getNotes().forEach(function(note, index) {
        var li = document.createElement("li");
        li.innerHTML = "<span>"+note.name+"</span><a href='edit.html?index=" + index + "'>bearbeiten</a>";
        list.appendChild(li);
    });

    // create styles list
    app.getStyles().forEach(function(style, index) {
        var option = document.createElement("option");
        option.innerHTML = style.name;
        option.value = style.href;
        styles.appendChild(option);
    });

    // set init and install change handler
    styles.value = app.getStyle();
    css.href = styles.value;
    styles.onchange = function() {
        app.setStyle(styles.value);
        css.href = styles.value;
    };

    app.getFilters().forEach(function(f, index) {
        var li = document.createElement("li");
        li.className = app.getFilter() == index ? "active" : "";
        var a = document.createElement("a");
        a.innerHTML = f.name;
        a.href = "";
        a.onclick = function() {
            app.setFilter(index);
        };
        li.appendChild(a);
        filter.appendChild(li);
    });
})();
