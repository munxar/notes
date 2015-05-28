/**
 * Created by saschademirovic on 24.05.15.
 */

(function(exports) {

    // imports
    var Property = exports.Property;
    var util = exports.util;

    /**
     * Note class
     * @constructor
     */
    function Note(args) {
        args = args || {};

        this.id = new Property(args.id || util.genId());
        this.done = new Property(args.done || false);
        this.name = new Property(args.name || "");
        this.finished = new Property(args.finished || false);
        this.creationDate = new Property(args.creationDate || new Date());
        this.finishDate = new Property(args.finishDate || new Date());
        this.description = new Property(args.description || "");
        this.importance = new Property(args.importance || 0);
    }

    /**
     * convert
     * @return {{name}}
     */
    Note.prototype.toJSON = function() {
        var json = {};
        for(var attr in this) {
            if(this[attr] instanceof Property) {
                json[attr] = this[attr].get();
            }
        }
        return json;
    };

    // exports
    exports.Note = Note;
})(exports);