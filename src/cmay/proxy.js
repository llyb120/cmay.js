const utils = require('./utils');
const config = require("./config");




const hasProxy = false;
var _Proxy = hasProxy && window.Proxy || (function () {
    var list = [];
    var lastLength = -1;
    var copy = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };

    var frame = function (flag) {
        var callback = function(){
            for (var i = 0; i < list.length;i++) {
                list[i].dirtyCheck();
            }
            if(flag){
                window.requestAnimationFrame(callback);
            }
        }
        return callback;
        
    }

    window.requestAnimationFrame &&  window.requestAnimationFrame(frame(true)) || setInterval(frame(false),config.fps);;

    return function (target, handler) {
        var _source = JSON.stringify(target);

        this.dirtyCheck = function () {
            var now = JSON.stringify(target);
            if(now.length != _source.length){
                handler.set.call();
            }
            else if(now != _source){
                handler.set.call();
            }
            _source = now;

            return;

        };

        list.push(this);
        return target;
    }
})();




function proxyFactory(data,widget) {
    var handler = {
        set: function (obj, key, val, proxy) {
            if(hasProxy){
                if (val && utils.is(val, 'array')) {
                    obj[key] = proxyFactory(val,widget);
                }
                else if (val && utils.is(val, 'object')) {
                    obj[key] = proxyFactory(val,widget);
                }
                else {
                    obj[key] = val;
                }
            }

            widget.render();

            return true;
        }
    }
    
    var proxy = new _Proxy(data, handler);
    if(hasProxy){
        for(var i in proxy){
            proxy[i] = proxy[i];
        }
        return proxy;
    }
    else{
        return data;
    }
}

function watchFactory(data,callback){
    var proxy = new _Proxy(data,{set : callback});
    return data;
}

module.exports.proxyFactory = proxyFactory;
module.exports.watchFactory = watchFactory;