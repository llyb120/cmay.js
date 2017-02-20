const proxy = require("./proxy");
const utils = require('./utils');
const config = require('./config');
//const htmlParserLibrary = require('html-parser-lite');
//const htmlParser = new htmlParserLibrary();
const svd = require('simple-virtual-dom')
const component = require('./component');
const el = svd.el;
const diff = svd.diff
const patch = svd.patch

var Parser = require('html-dom-parser');


class widget {
    constructor(domNode, _component = null) {
        this.$timer = null;
        this.$element = domNode;
        var data = null;
        var _data = domNode.getAttribute('c-tpl').trim();
        domNode.removeAttribute('c-tpl');
        
        if (_component == null) {
            this.$prototype = new component(domNode, false);
        }
        else {
            this.$prototype = _component;
        }

        //this.$tpl = domNode.outerHTML.replace(/[\r\n]/g, "");
        
        //如果没有声明被绑定的对象，视为一般的模板，不再响应双向绑定
        if (_data == '') {
            this.$proxy = proxy.proxyFactory({}, this);
        }
        else if(_data.length && _data[0] == '{' || _data[0] == '['){
            try{
                this.$proxy = proxy.proxyFactory(JSON.parse(_data), this);
            }
            catch(e){
                this.$proxy = proxy.proxyFactory({}, this);
            }
        }
        else {
            //如果已经存在这个对象，那么直接使用
            if (!window[_data]) {
                window[_data] = {}
            }
            window[_data] = this.$proxy = proxy.proxyFactory(window[_data], this);
        }

        this.$uuid = Cmay.set(this.$proxy);

        var plugins = Cmay.plugins();
        var self = this;
        plugins.forEach(function(item){
            for(var attrName in item){
                var callback = item[attrName];
                var val = domNode.getAttribute(attrName);
                if(val){
                    callback.call(null,val,self.$proxy,domNode,self);
                }
            }
        })


        this.render();


    };


    render(data = null,dataKey = null) {
        if(data){
            if(dataKey){
                console.log('this.$proxy.' + dataKey + '=' + JSON.stringify(data))
                eval('this.$proxy.' + dataKey + '=' + JSON.stringify(data));
            }
            else{
                for(var i in data){
                    this.$proxy[i] = data[i];
                }
            }
            
        }

        if (this.$timer) {
            clearTimeout(this.$timer);
            this.$timer = null;
        }
        this.$timer = setTimeout(() => {
            if(config.renderType == 'node'){
                this.$prototype.render(this.$proxy);
            }
            else{
                var html = this.$prototype.$factory(this.$proxy, this.$uuid);
                //build virtual dom
                var vdom = this.convertVirtualDom(html);
                console.error(vdom)
            }

            //
            if (this.$vdom) {
                //二次渲染的时候，移除没用的内容
                var elems = this.$element.querySelectorAll('[data-uuid]');
                for (var i = 0; i < elems.length; i++) {
                    var uuid = elems[i].getAttribute('uuid');
                    Cmay.remove(uuid);
                }
                var patches = diff(this.$vdom, vdom);
                patch(this.$element, patches);
            }
            else {
                var realDom = vdom.render();
                this.$element.parentNode.replaceChild(realDom, this.$element);
                this.$element = realDom;
            }

            //IE绑定事件
            if (!document.addEventListener) {
                var elems = this.$element.querySelectorAll("input,textarea,select");
                for (var i = 0; i < elems.length; i++) {
                    elems[i].removeAttribute('onpropertychange');
                    elems[i].onpropertychange = function () {
                        var e = window.event;
                        var elem = e.srcElement;
                        if (!elem || elem.name == '' || elem.name == null) {
                            return;
                        }
                        if (e.propertyName == 'value') {
                            Cmay.setValue(elem, elem.value);
                        }
                    };
                }
            }

            this.$vdom = vdom;

        },1000 / config.fps);

    };

    convertVirtualDom(html) {
        var dom = Parser(html);
        if (!dom.length) {
            return [{ name: "div", attribs: {}, children: [] }]
        }
        var node = dom[0];
        return el(node.name, node.attribs, this.generateVirtualDomNode(node.children));
    };

    generateVirtualDomNode(nodes) {
        var ret = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.type == 'tag') {
                //修正input显示“”的问题
                // if (node.tagName === 'input' && node.attribs.value == '""') {
                //     node.attribs.value = "";
                // }
                ret.push(el(node.name, node.attribs, this.generateVirtualDomNode(node.children)));
            }
            else if (node.type == 'text') {
                ret.push(node.data);
            }
        }
        return ret;
    };
}

module.exports = widget;

