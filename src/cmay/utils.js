module.exports = {
    is: function (o, type) {
        var isnan = { "NaN": 1, "Infinity": 1, "-Infinity": 1 }
        type = type.toLowerCase();

        // {"NaN": 1, "Infinity": 1, "-Infinity": 1}.hasOwnProperty(2)   -> false
        // {"NaN": 1, "Infinity": 1, "-Infinity": 1}.hasOwnProperty(NaN) -> true
        if (type == "finite") {
            return !isnan["hasOwnProperty"](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return (type == "null" && o === null) ||
            // is(undefined,'undefined')
            (type == typeof o && o !== null) ||
            // Object(Object) == Object -> true
            // Object({}) == {}         -> false
            (type == "object" && o === Object(o)) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            Object.prototype.toString.call(o).slice(8, -1).toLowerCase() == type;
    },


    uniqid: function (prefix = '') {

        var length = 8;
        var timestamp = +new Date;

        var _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var ts = timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return prefix + id;


    }
}
