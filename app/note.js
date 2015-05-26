/**
 * Created by saschademirovic on 24.05.15.
 */

(function(exports) {

    // imports
    var Property = exports.Property;

    /**
     * Note class
     * @constructor
     */
    function Note(args) {
        args = args || {};

        this.done = new Property(args.done || false);
        this.name = new Property(args.name || "New Note");
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