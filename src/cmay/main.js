require('core-js/fn/object/assign');
require('core-js/fn/object/define-property');
require('core-js/fn/object/create');
require('core-js/fn/object/get-prototype-of');
require('core-js/fn/object/get-own-property-descriptor');
require('core-js/fn/array/for-each');
require('core-js/fn/array/map');
require('core-js/fn/string/trim');
require('core-js/fn/string/repeat');
require('core-js/fn/array/index-of')

require('./Cmay.lite.js');
require("./plugin.url.js");
require('./filter-default.js');


Cmay.bootstrap();




/*
var component = require('./component');
var widget = require("./widget");
var domready = require('./domready');

var list = [];
var components = {};

domready(function(){
    
    //扫描所有组件
    var elems = document.querySelectorAll("[c-widget]");
    for(var i = 0; i < elems.length; i++){
        var widgetName = elems[i].getAttribute('c-widget');
        if(widgetName == '' || widgetName == null){
            continue;
        }
        if(components[widgetName]){
            continue;
        }

        components[widgetName] = new component(elems[i],widgetName);
        
    }

    //扫描所有需要渲染的组件
    var elems = document.querySelectorAll("[c-tpl]");
    for(var i = 0; i < elems.length; i++){
        list.push(new widget(elems[i]));
    }

    //渲染组件
    for(var i in components){
        var elems = document.getElementsByTagName(i);
        console.log(elems)
        for(var j = 0; j < elems.length; j++){

        }
        
    }
});

*/