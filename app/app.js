/**
 * Created by saschaaeppli on 21.05.15.
 */


function Application() {
    // init filters list
    this.filters = [
        { name: "finish date" },
        { name: "creation date" },
        { name: "importance" }
    ];

    // restore notes
    this.restore();
}

/**
 * returns all notes
 * @returns {Array}
 */
Application.prototype.getNotes = function() {
    return this.notes;
};

/**
 * return note by index
 * @param index
 * @returns {*} note
 */
Application.prototype.getNote = function(index) {
    return this.notes[index];
};

/**
 * create new note object
 * @returns {object}
 */
Application.prototype.createNote = function() {
    var note = {
        creationDate: new Date(),
        finishDate: new Date(),
        name: "",
        description: "",
        importance: 0,
        done: false
    };
    this.notes.push(note);
    return note;
};

/**
 * restore data from local storage
 */
Application.prototype.restore = function() {
    this.notes = JSON.parse(window.localStorage.getItem("notes") || "[]");
};

/**
 * store data in local storage
 */
Application.prototype.store = function() {
    window.localStorage.setItem("notes", JSON.stringify(this.notes));
};

/**
 * get application styles
 * @returns {*[]}
 */
Application.prototype.getStyles = function() {
    return [
        { name: "Black White Style", href: "styles/default.css" },
        { name: "Colorful Cat", href: "styles/color.css" }
    ];
};

/**
 * get style index
 */
Application.prototype.getStyle = function() {
    return JSON.parse(window.localStorage.getItem("style")) || this.getStyles()[0].href;
};

/**
 * get list filters
 * @returns {*[]}
 */
Application.prototype.getFilters = function() {
    return this.filters;
};

//  new app instace
var app = new Application();

