/**
 * domReady
 *
 * @fileOverview
 *    Cross browser object to attach functions that will be called
 *    immediatly when the DOM is ready.
 *    Released under MIT license.
 * @version 3.0.0
 * @author Victor Villaverde Laan
 * @license MIT  * @link http://www.freelancephp.net/domready-javascript-object-cross-browser/
 * @link https://github.com/freelancephp/DOMReady
 */

'use strict';

var document = window.document;
var fns = [];
var args = [];
var isReady = false;
var errorHandler = null;

/**
 * Call a ready handler
 * @private
 * @param {function} fn
 */
var call = function (fn) {
    try {
        // call function
        fn.apply(this, args);
    } catch (e) {
        try{
            console.error(e)
        }
        catch(e){}
        
        // error occured while executing function
        if (errorHandler !== null) {
            errorHandler.call(this, e);
        }
    }
};

/**
 * Call all ready handlers
 * @private
 */
var run = function () {
    var x;

    isReady = true;

    // call all registered functions
    for (x = 0; x < fns.length; x = x + 1) {
        call(fns[x]);
    }

    // clear handlers
    fns = [];
};

/**
 * Initialize
 * @private
 */
var init = function () {
    if (window.addEventListener) {
        // for all browsers except IE
        document.addEventListener('DOMContentLoaded', function () { run(); }, false);
    } else {
        // for IE
        // code taken from http://javascript.nwbox.com/IEContentLoaded/
        var poll = function () {
            // check IE's proprietary DOM members
            if (!document.uniqueID && document.expando) {
                return;
            }

            // you can create any tagName, even customTag like <document :ready />
            var tempNode = document.createElement('document:ready');

            try {
                // see if it throws errors until after ondocumentready
                tempNode.doScroll('left');

                // call run
                run();
            } catch (e) {
                window.setTimeout(poll, 10);
            }
        };

        // trying to always fire before onload
        document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
                document.onreadystatechange = null;
                run();
            }
        };

        poll();
    }
};

/**
 * @namespace domReady
 *
 * @public
 * @param {function} fn
 * @return {domReady}
 */
var domReady = function (fn) {
    return domReady.on(fn);
};

/**
 * Add code or function to execute when the DOM is ready
 * @public
 * @param {function} fn
 * @return {domReady}
 */
domReady.on = function (fn) {
    // call imediately when DOM is already ready
    if (isReady) {
        call(fn);
    } else {
        // add to the list
        fns[fns.length] = fn;
    }

    return this;
};

/**
 * Set params that will be passed to every ready handler
 * @public
 * @param {Array.<*>} params
 * @return {domReady}
 */
domReady.params = function (params) {
    args = params;
    return this;
};

/**
 * Set error callback
 * @public
 * @param {function([Error|string])} fn
 * @return {domReady}
 */
domReady.error = function (fn) {
    errorHandler = fn;
    return this;
};

// initialize
init();

// make global
module.exports = domReady;