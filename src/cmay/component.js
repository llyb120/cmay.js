var utils = require('./utils');

const htmlspecialchars_decode = require('locutus/php/strings/htmlspecialchars_decode');
// const addslashes = require('locutus/php/strings/addslashes');
// const Parser = require('html-dom-parser');

class component {
    constructor(domNode,cleanDom = true) {
        this.$tpl = domNode.outerHTML.replace(/[\r\n]/g, "");
        this.$rootTag = domNode.getAttribute('f-tag') || 'div';
        this.$tpl = this.$tpl
                        .replace(/^<script/gi,"<"+this.$rootTag)
            .replace(/<\/script>/gi, "</" + this.$rootTag + '>')
        ;
        this.initFactory();

        if(cleanDom){
            domNode.parentNode.removeChild(domNode);
        }
    };


    initFactory() {
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
        // var components = Cmay.getComponents();
        // // var regbuf = [];
        // // for(var name in components){
        // //     regbuf.push(`<(${name})[\\s\\S]*?(\/?)>`);
        // //     regbuf.push(`<(\/)(${name})`);
        // // }
        // var getHTML = (node,outer = true) => {
        //     if(node.type == 'tag'){
        //         var ret = '';
        //         if(outer){
        //             ret += `<${node.name}`
        //             for(var i in node.attribs){
        //                 ret += ` ${i}="${node.attribs[i]}"`;
        //             }
        //         }
        //
        //         if(node.children.length){
        //             if(outer){
        //                 ret += ' >';
        //             }
        //             node.children.forEach((child) => {
        //                 ret += getHTML(child);
        //             });
        //             if(outer){
        //                 ret += `</${node.name}>`;
        //             }
        //         }
        //         else{
        //             ret += ' />';
        //         }
        //         return ret;
        //     }
        //     else{
        //         return node.data;
        //     }
        // };
        //
        // var dom = Parser(this.$tpl);
        // console.error((dom));
        //
        // console.error(getHTML(dom[0],false));
        //
        // var flag = true;
        // var walk = (node,index) => {
        //     if(node.type != 'tag'){
        //         return;
        //     }
        //
        //     if(components[node.name]){
        //         node.parent.children[index] = {
        //             type : 'text',
        //             data : `{Cmay.widget("${node.name}",${node.attribs["c-data"]},${flag ? "'" : "\\\'"}${getHTML(node,false)}${flag ? "'" : "\\\'"})}`
        //         }
        //         flag = false;
        //     }
        //     node.children.forEach((child,_index) => {
        //         walk(child,_index);
        //     });
        // }
        // walk(dom[0]);
        //
        // this.$tpl = getHTML(dom[0])
        //
        // console.error(dom)
        // var stack = [dom];
        // while(stack.length){
        //     let node = stack.shift();
        //
        // }
        // console.log(dom)
        // if(regbuf.length){
        //     var fullRegexp = new RegExp(`${regbuf.join('|')}`,"g");
        //     var r = null;
        //     var limit = 998;
        //     var stack = [];
        //     while(r = fullRegexp.exec(this.$tpl)){
        //         console.error(r)
        //         if(--limit == 0){
        //             console.error("you write wrong code!!!");
        //             break;
        //         }
        //         //tag start
        //         if(r[1]){
        //             stack.push([r[1],r.index]);
        //         }
        //         //tag end
        //         else if(r[3]){
        //             var top = stack.pop();
        //
        //         }
        //     }
        //     var matched = this.$tpl.match(fullRegexp);
        //     console.warn(matched)
        //     code2 = this.$tpl.replace(fullRegexp,function (matched,a) {
        //         console.error(matched)
        //     })
        // }


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
                    return '\');' + '}' + " buffer.push(\'";
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
                        return '\'); '+_matched[0]+'(' + a.replace(regexp,"") + "){ buffer.push(\'";
                    case 'else':
                        return '\'); }' + a + "{ buffer.push(\'";

                    case 'else if':
                        return '\'); }else if(' + a.replace(regexp,"") + "){ buffer.push(\'";

                    


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
                    console.log(a)
                });

                return '\'); try{ buffer.push(' + a + '); }catch(e){} buffer.push(\'';

                // try{
                //     console.error(a)
                // }
                // catch(e){
                //     return '\'); buffer.push(' + ');buffer.push(\'';
                // }
            }
            /*
            if(/^for\b/.test(a) || ){

            }
            if (a.indexOf('for') > -1 || a.indexOf('}') > -1) {
                return '\');' + a + " buffer.push(\'";
            }
            else {
                
            }
            */
        });

        var finalCode = code + code2 + '\'); } var ret = buffer.join(""); ret = ret.replace(/^(<[^\\s>]+)/,"$1 data-uuid=" + uuid); console.log(ret); return ret; });';
        console.log(finalCode)
        eval(finalCode);

    };






}

module.exports = component;