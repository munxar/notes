/**
 * Created by saschaaeppli on 21.05.15.
 */

$(function() {
    'use strict';
    // helper to set class 'active' if index is eql filterIndex
    Handlebars.registerHelper('isActive', function(index, filterIndex) {
        return index == filterIndex ? "active" : "";
    });
    // helper to set checked attribute in input element, based on a flag
    Handlebars.registerHelper('checked', function(flag) {
        return flag ? "checked" : "";
    });

    // get dom elements that we use
    var css = $("#css");
    var styles = $("#styles");
    var filterList = $("#filter");
    var showFinished = $("#showFinished");
    var list = $("#list");

    // get and compile handlebars templates
    var template = Handlebars.compile($("#listTemplate").html());
    var styleTemplate = Handlebars.compile($("#styleTemplate").html());
    var filterTemplate = Handlebars.compile($("#filterTemplate").html());

    // create a notes app
    var app = new exports.NotesApp(window.localStorage);

    // render filters if model changes
    app.filters.onChanged(function(filters) {
        var data = { filters: filters, filterIndex: app.filterIndex.get() };
        filterList.html(filterTemplate(data));
    });

    // set filterIndex if filter item is clicked
    filterList.on("click", "a", function(event) {
        var index = $(event.target).data("index");
        app.filterIndex.set(index);

    });

    // if note finished input changes, set model and update list
    list.on("change", "input", function(event) {
        var target = $(event.target);
        var id = target.data("id");
        $.ajax({
            type: "PUT",
            url: "api/notes/" + id,
            data: JSON.stringify({ finished: target.prop("checked")}),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function(request) {
                app.restore();
                // update list
                app.filter();
            }
        });
    });

    // if show finished state changes, change class
    app.showFinished.onChanged(function(show) {
        showFinished.toggleClass("active", show);
    });

    // toggle state and save, if showFinished button is clicked
    showFinished.click(function() {
        app.showFinished.set(!app.showFinished.get());
        app.store();
        // prevent default, so anchor doesn't navigate
        event.preventDefault();
    });

    // render notes if model changes
    app.filteredNotes.onChanged(function(notes) {
        list.html(template(notes));
    });

    // render options if model changes
    app.styles.onChanged(function(s) {
        styles.html(styleTemplate(s));
    });

    // bind style to select value
    app.style.onChanged(function(style) {
        styles.val(style);
        css.prop("href", style);
    });

    // on change set style, must be inside this event handler, cause the dom doesn't exist before this call,
    styles.on("change", function(event) {
        app.style.set(styles.val());
        // save
        app.store();
    });

    // init application
    app.restore();

});
