import component from "./component";
import widget from "./widget"
const domready = require('./domready');
const utils = require('./utils');
const proxy = require("./proxy");

var components = {};
var data = {};
var plugins = [];
var filters = {};

var Cmay = {

    scanComponent: function (domNode) {
        var widgetName = domNode.getAttribute('c-widget');
        if (widgetName == '' || widgetName == null) {
            return;
        }
        if (components[widgetName]) {
            return;
        }
        components[widgetName] = 1;
        components[widgetName] = new component(domNode);
    },

    getComponents(){
        return components;
    },

    widget: function (componentName, data = {}) {
        console.warn(arguments)
        if (!components[componentName]) {
            return '';
        }
        return components[componentName].$factory(data);
    },
    set: function (obj,index = null) {
        //如果已经保存过了
        // if(utils.is(obj,'object') || utils.is(obj,'array')){
            for(var uuid in data){
                if(data[uuid] === obj){
                    return uuid;
                }
            }
        // }
        var uuid = utils.uniqid('obj_');
        data[uuid] = obj;
        return uuid;
    },

    remove: function (uuid) {
        delete data[uuid];
    },

    setValue: function (elem, value) {
        if (!elem || elem.name == '' || elem.name == null) {
            return;
        }
        var obj = Cmay.get(elem);
        if (obj) {
            var indexs = elem.name.match(/[^\[\]]+/g).map(function (item) {
                if (item[0] == '[') {
                    var index = item.substr(1, item.length - 1);
                }
                else {
                    var index = item;
                }
                if (index[0] != "'" && index[0] != '"') {
                    index = `"${index}"`;
                }
                return `[${index}]`;
            }).join("");

            var js = "obj" + indexs + " = \"" + value + '"';

            try {
                eval(js);
            }
            catch (e) { }
        }
    },


    get: function (obj) {
        var _uuid;
        if (utils.is(obj, "string")) {
            _uuid = obj;
        }
        else if (obj.nodeType) {
            var item = obj;
            do {
                if (!item.getAttribute) {
                    break;
                }
                var uuid;
                if (uuid = item.getAttribute('data-uuid')) {
                    _uuid = uuid;
                    break;
                }
            } while (item = item.parentNode);
        }
        if (data[_uuid]) {
            return data[_uuid];
        }
        // alert(2)
        // for (var i in data) {
        //     console.log(i);
        //     console.log(data[i]);
        // }
        // var keys = data.keys();
        // alert(keys.length)
        // for(var i = 0; i < keys.length; i++){
        //     var key = keys[i];
        //     alert(key)
        //     if(data[key] == _uuid){
        //         alert(2);

        //     }
        // }
        // for (var key in data.keys()) {
        //     if (data[key] == _uuid) {
        //         return data;
        //     }
        // }
        // console.log(keys)

        // for (var [key, uuid] of data) {
        //     if (uuid == _uuid) {
        //         return key;
        //     }
        // }
        return null;
    },

    plugin : function(item){
        plugins.push(item)
    },

    plugins : function(){
        return plugins;
    },

    filter : function(name,filter){
        filters[name] = filter;
    },

    getFilter : function(name){
        return filters[name] || function(val,args){
            return val || '';
        };
    },

    watch : function(obj,callback){
        return proxy.watchFactory(obj,callback);
    },

    bootstrap: function () {
        domready(function () {
            //扫描所有组件
            var elems = document.querySelectorAll("[c-widget]");
            for (var i = 0; i < elems.length; i++) {
                Cmay.scanComponent(elems[i]);
            }
            var elems = document.querySelectorAll("[c-tpl]");
            for (var i = 0; i < elems.length; i++) {
                (new widget(elems[i]));
            }


        });


        //双向绑定
        var timer = null;
        var handler = function (e) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            setTimeout(function () {
                var elem = e.target;
                if (!elem || elem.name == '' || elem.name == null) {
                    return;
                }
                Cmay.setValue(elem, elem.value);
            },1000/60);

            // var obj = Cmay.get(e.target);
            // if (obj) {
            //     var js = "obj['" + elem.name + '\'] = "' + elem.value + '"';
            //     console.log(js)
            //     eval(js);

            //     try {
            //     }
            //     catch (e) { }
            // }
        };
        if (document.addEventListener) {
            document.addEventListener('input', handler);
            document.addEventListener('change', handler);
        }


    },
    showData: function () {
        console.log(data)
    }



};

global.Cmay = Cmay;
