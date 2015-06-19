/**
 * Created by saschaaeppli on 19.06.15.
 */
var mongoose = require("mongoose");

var NoteSchema = mongoose.Schema({
    name: { type: String },
    test: { type: String }
});

module.exports = mongoose.model("Note", NoteSchema);