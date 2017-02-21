/**
 * @author livoras
 * @licence MIT
 * @forked https://github.com/livoras/h2v/blob/master/index.js
 */
var svd = require('simple-virtual-dom')
var el = svd.el

function parseDOM(html) {
    if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string.');
    }

    // try to match the tags
    var match = html.match(/<[^\/](.+?)>/g);
    var nodes;

    if (match && match.length) {
        var tagMatch = match[0];

        // directive matched
        if (/<![^-]/.test(tagMatch)) {
            var directive = (
                // remove angle brackets
                tagMatch
                    .substring(1, tagMatch.length - 1)
                    .trim()
            );

            // tag name can no longer be first match item
            tagMatch = match[1];

            // remove directive from html
            html = html.substring(html.indexOf('>') + 1);
        }

        // first tag name matched
        if (tagMatch) {
            var tagName = (
                // keep only tag name
                tagMatch
                    .substring(1, tagMatch.indexOf(' '))
                    .trim()
                    .toLowerCase()
            )
        }
    }

    // create html document to parse top-level nodes
    if (['html', 'head', 'body'].indexOf(tagName) > -1) {
        var doc;

        // `new DOMParser().parseFromString()`
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
        if (window.DOMParser) {
            doc = new window.DOMParser().parseFromString(html, 'text/html');

            // `DOMImplementation.createHTMLDocument()`
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createHTMLDocument
        } else if (document.implementation.createHTMLDocument) {
            doc = document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML = html;
            doc.removeChild(doc.childNodes[0]); // remove doctype
        }

        // html
        if (tagName === 'html') {
            nodes = doc.childNodes;
            // head and body
        } else {
            nodes = (
                // do this so attributes are kept
                // but there may be an extra head/body node
                doc.getElementsByTagName(tagName)[0]
                    .parentNode
                    .childNodes
            );
        }

        // `innerHTML` approach
    } else {
        var container = document.createElement('body');
        container.innerHTML = html;
        nodes = container.childNodes;
    }
    return toVirtualDOM(nodes[0]);

    // return formatDOM(nodes, null, directive);
}


// function h2v (html) {
//     var root = document.createElement('div')
//     root.innerHTML = html
//     root = (root.childNodes.length === 1)
//         ? root.childNodes[0]
//         : root
//     return toVirtualDOM(root)
// }

const regexp = /\{[\s\S]+?\}/g;
const config = require('./config');

if(config.renderType == 'node'){
    var toVirtualDOM = function(dom) {
        var tagName = dom.tagName.toLowerCase()
        var props = attrsToObj(dom)
        var children = []
        for (var i = 0, len = dom.childNodes.length; i < len; i++) {
            var node = dom.childNodes[i]
            // TEXT node
            if (node.nodeType === 3) {
                var val;
                if (node.nodeValue) {
                    val = (node.nodeValue)
                } else {
                    val = (node.textContent)
                }
                if(config.renderType == 'node'){
                    var splited = val.split(regexp)
                    if(splited.length > 1){
                        var matched = val.match(regexp);
                        splited.forEach((item,index) => {
                            children.push(item);
                            if(matched[index]){
                                children.push(matched[index]);
                            }
                        })
                    }
                    else{
                        children.push(val);
                    }
                }
                else{
                    children.push(val)
                }

            }
            else if(node.nodeType == 8){
                var val = node.nodeValue.trim();
                if(val == 'end'){
                    children.push('?!' + node.nodeValue)
                }
                else{
                    children.push('??' + node.nodeValue)
                }
            }
            else {
                children.push(toVirtualDOM(node))
            }
        }
        var ret = el(tagName, props, children)
        return ret;
    }
}
else{
     var toVirtualDOM = function(dom) {
        var tagName = dom.tagName.toLowerCase()
        var props = attrsToObj(dom)
        var children = []
        for (var i = 0, len = dom.childNodes.length; i < len; i++) {
            var node = dom.childNodes[i]
            // TEXT node
            if (node.nodeType === 3) {
                var val;
                if (node.nodeValue) {
                    val = (node.nodeValue)
                } else {
                    val = (node.textContent)
                }
                children.push(val);
            }
            else {
                children.push(toVirtualDOM(node))
            }
        }
        var ret = el(tagName, props, children)
        return ret;
    }
}


function attrsToObj (dom) {
    var attrs = dom.attributes
    var props = {}
    for (var i = 0, len = attrs.length; i < len; i++) {
        var name = attrs[i].name
        var value = attrs[i].value
        // TODO: fix IE style string.
        props[name] = value
    }
    return props
}

module.exports = parseDOM;