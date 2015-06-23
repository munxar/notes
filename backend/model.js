/**
 * Created by saschaaeppli on 19.06.15.
 */
var mongoose = require("mongoose");

var NoteSchema = mongoose.Schema({
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    importance: { type: Number, default: 0 },
    creationDate: { type: Date, default: new Date() },
    finishDate: { type: Date, default: new Date() },
    finished: { type: Boolean, default: false }
});

module.exports = mongoose.model("Note", NoteSchema);