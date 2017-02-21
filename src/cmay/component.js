var utils = require('./utils');

const htmlspecialchars_decode = require('locutus/php/strings/htmlspecialchars_decode');
// const addslashes = require('locutus/php/strings/addslashes');
const Parser = require('html-dom-parser');
const config = require('./config.js');

class component {
    constructor(domNode,cleanDom = true) {
        if(config.renderType == 'node'){
            /**
             * 另一种渲染方式
             */
            var dom = Parser(this.$tpl);
            dom[0].name = dom[0].attribs['f-tag'] || 'div';
            this.$dom = dom[0];
            // this.initNodeFactory();
        }
        else{
            this.$tpl = domNode.outerHTML.replace(/[\r\n]/g, "");
            this.$rootTag = domNode.getAttribute('f-tag') || 'div';
            this.$tpl = this.$tpl
                .replace(/^<script/gi,"<"+this.$rootTag)
                .replace(/<\/script>/gi, "</" + this.$rootTag + '>')
            ;
            this.initStringFactory();
        }


        if(cleanDom){
            domNode.parentNode.removeChild(domNode);
        }
    };

    renderNode(str){
        var reg = /\{([\s\S]+?)\}/g;
        return str.replace(reg,function(matched,a){

        });
    };

    render($data,$uuid = null){
        var keywords = ['if', 'for', 'else if','else'].map(function (item) {
            return '^\\s*(' + item + ')';
        });
        var keyWordsRegexp = new RegExp(keywords.join("|"));
        var endRegExp = /\{\s*end\s*\}/;
        if(!$uuid){
            $uuid = Cmay.set($data);
        }
        this.$dom.attribs['data-uuid'] = $uuid;
        var stack = [this.$dom];
        while(stack.length){
            var node = stack.shift();
            if(node.type == 'tag'){
                for(var i = 0; i < node.children.length; i++){
                    stack.push(node.children[i]);
                }
            }
            else{
                var params = [];
                node.data = node.data.replace(keyWordsRegexp,function(matched,keyword){
                    switch (keyword.trim()){
                        case 'for':
                            var item = node;
                            while(item = node.next){
                                params.push(node)
                            }
                            break;
                    }
                });
                // node.data = this.render(node)
                // node.data = node.data.replace(reg,function(matched,a){
                //
                // });

                // var matched = node.data.match(reg);
                // if(!matched){
                //     return;
                // }

            }

        }
    }

    initStringFactory() {
        var keywords = ['if', 'for', 'else if','else'].map(function (item) {
            return '^\\s*(' + item + ')';
        });
        var regexp = new RegExp(keywords.join("|"));
        console.log(regexp)
        var code = 'this.$factory = (function($data,uuid){ if(!$data){$data = {};} if(uuid == null){ uuid = Cmay.set($data);} $data.toString = function(){return "Cmay.get(\'"+uuid+"\')"; };  var _uuid = uuid; var $current; with($data){ var $last = []; var buffer = []; buffer.push(\'';
        var count = -1;
        var target = -1;
        var spaceRegex = "[\\s\\n\\r\\t]*";
        var charRegex = "[^\\s\\n\\r\\t\\|]";
        var filterInfoRegex = `${spaceRegex}(${charRegex}+)${spaceRegex}([^\\|]*)`;
        var filterRegex = new RegExp(`\\|${filterInfoRegex}`,'g');
        filterInfoRegex = new RegExp(filterInfoRegex);

        var code2;

        code2 = this.$tpl.replace(/\{([\s\S]+?)\}|[^\{]+/g, function (matched, a) {
            if (!a) {
                return matched
                    .replace(/[\\"']/g, '\\$&')
                    .replace(/\u0000/g, '\\0');
            }
            else {
                a = htmlspecialchars_decode(a.trim());
            }

            var _matched;

            if (a == 'end' || a == '}') {
                count--;
                if(count == target){
                    target = -1;
                    return '\');' + `} } _uuid = $last.pop(); $current = "Cmay.get(\\'"+_uuid+"\\')";` + " buffer.push(\'";
                }
                else{
                    return `');
                        }
                        buffer.push('`;
                    //return '\');' + '}' + " buffer.push(\'";
                }
            }
            else if (_matched = a.match(/(?:for|each)\s*(\w+)?(?:,\s*(\w+))?\s*in\s*([^\}\{]+)/)) {
                if (!_matched[2]) {
                    _matched[2] = '__index';
                }
                if(!_matched[1]){
                    _matched[1] = '__item';
                }
                //taget = -1;
                //count = 0
                // alert('now is' + target)
                target = count++;
                // alert('now is' + target)
                return '\');' + ` 
                    $last.push(_uuid);
                    for(var ${_matched[2]} in ${_matched[3]}){ 
                        var ${_matched[1]} = ${_matched[3]}[${_matched[2]}];  
                        if(typeof ${_matched[1]} == 'function'){ 
                            continue; 
                        } 
                        _uuid = Cmay.set(${_matched[1]});
                        $current = "Cmay.get(\\'"+_uuid+"\\')";
                        with(${_matched[1]}){
                            buffer.push(\'`;
                //console.log(_matched)
            }
            else if (_matched = a.match(regexp)) {
                switch (_matched[0]) {
                    case 'for':
                    case 'if':
                        count++;
                        return `'); 
                            ${_matched[0]} (${a.replace(regexp,"")}) {
                                buffer.push('`;
                        //return '\'); '+_matched[0]+'(' + a.replace(regexp,"") + "){ buffer.push(\'";
                    case 'else':
                        return `');
                            }
                            ${a}{
                                buffer.push('`;
                        // return '\'); }' + a + "{ buffer.push(\'";

                    case 'else if':
                        return `');
                                }else if(${a.replace(regexp,"")}){
                                    buffer.push('`;
                        //return '\'); }else if(' + a.replace(regexp,"") + "){ buffer.push(\'";

                    


                }
                return '\');' + a + " buffer.push(\'";
            }
            else {
                var filters = [];
                a = a.replace(filterRegex,function(matched){
                    matched = matched.match(filterInfoRegex);
                    if(matched){
                        filters.push([matched[1],matched[2]]);
                    }
                    return '';
                });

                filters.forEach(function(filter){
                    a = `Cmay.getFilter('${filter[0]}').call(null,${a},'${filter[1]}')`;
                });

                return `');
                    try{
                        buffer.push(${a})
                    }catch(e){
                    }
                    buffer.push('`;
                //return '\'); try{ buffer.push(' + a + '); }catch(e){} buffer.push(\'';

                // try{
                //     console.error(a)
                // }
                // catch(e){
                //     return '\'); buffer.push(' + ');buffer.push(\'';
                // }
            }
        });

        var finalCode = code + code2 + '\'); } var ret = buffer.join(""); ret = ret.replace(/^(<[^\\s>]+)/,"$1 data-uuid=" + uuid); console.log(ret); return ret; });';
        console.log(finalCode)
        eval(finalCode);

    };






}

module.exports = component;