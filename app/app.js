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
 * set style index
 * @param style index
 */
Application.prototype.setStyle = function(style) {
    window.localStorage.setItem("style", style);
};

/**
 * get list filters
 * @returns {*[]}
 */
Application.prototype.getFilters = function() {
    return this.filters;
};

/**
 * get curren active filter
 * @returns {number} index
 */
Application.prototype.getFilter = function() {
    return JSON.parse(window.localStorage.getItem("filter")) || 0;
};

/**
 * store current filter index
 */
Application.prototype.setFilter = function(filter) {
    window.localStorage.setItem("filter", filter);
};

/**
 * get finished state
 */
Application.prototype.getShowFinished = function() {
    return JSON.parse(window.localStorage.getItem("showFinished")) || false;
};

/**
 * set show finished state
 */
Application.prototype.setShowFinished = function(finished) {
    window.localStorage.setItem("showFinished", finished);
};

/**
 * location.search to object conversion
 * ?key=val&key2=val2
 */
Application.prototype.getQueryParameters = function() {
    // remove ?
    var query = location.search.substring(1);
    // split key value pairs
    var tokens = query.split("&");
    // make object with key value pairs
    return tokens.reduce(function(obj, val) {
        var keyValue = val.split("=");
        var key = keyValue[0];
        obj[key] = keyValue[1];
        return obj;
    }, {});
};

//  new app instace
var app = new Application();

