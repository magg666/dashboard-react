
/**
 * Formats time into format (HH:MM:SS)
 * @param {number} hour
 * @param {number} minutes
 * @param {number} seconds
 * @returns {string}
 */

export function formatTime(hour, minutes, seconds) {
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    return hour + ':' + minutes + ':' + seconds
}

/**
 * Formats date as day - number, month - name, year - number
 * @param dateString
 * @returns {string}
 */
// The function works, but 'format' looks like error.
export function formatDate(dateString) {
    let date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date)
}

/**
 * Function to sort list of objects by indicated parameters
 * Very nice, from internet...
 * @type {sortBy}
 */
export const sortBy = (function () {
    let toString = Object.prototype.toString,
        // default parser function
        parse = function (x) {
            return x;
        },
        // gets the item to be sorted
        getItem = function (x) {
            let isObject = x != null && typeof x === "object";
            let isProp = isObject && this.prop in x;
            return this.parser(isProp ? x[this.prop] : x);
        };

    /**
     * Sorts an array of elements.
     *
     * @param {Array} array: the collection to sort
     * @param {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortBy(array, cfg) {
        if (!(array instanceof Array && array.length)) return [];
        if (toString.call(cfg) !== "[object Object]") cfg = {};
        if (typeof cfg.parser !== "function") cfg.parser = parse;
        cfg.desc = !!cfg.desc ? -1 : 1;
        return array.sort(function (a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            return cfg.desc * (a < b ? -1 : +(a > b));
        });
    };

}());