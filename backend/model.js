/**
 * Created by saschaaeppli on 19.06.15.
 */
var mongoose = require("mongoose");

var NoteSchema = mongoose.Schema({
    name: { type: String, default: "" }
});

module.exports = mongoose.model("Note", NoteSchema);