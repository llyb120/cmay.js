var utils = require('./utils');

const htmlspecialchars_decode = require('locutus/php/strings/htmlspecialchars_decode');

class component {
    constructor(domNode,cleanDom = true) {
        this.$tpl = domNode.outerHTML.replace(/[\r\n]/g, "");
        this.$rootTag = domNode.getAttribute('f-tag') || 'div';
        this.$tpl = this.$tpl
                        .replace(/^<script/gi,"<"+this.$rootTag)
                        .replace(/<\/script>/gi,"</" + this.$rootTag + '>');
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
        filterInfoRegex = new RegExp(filterInfoRegex)

        var code2 = this.$tpl.replace(/\{([\s\S]+?)\}|[^\{]+/g, function (matched, a) {

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


                try{
                    return '\'); buffer.push(' + a + ');buffer.push(\'';
                }
                catch(e){
                    return '\'); buffer.push(' + ');buffer.push(\''; 
                }
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