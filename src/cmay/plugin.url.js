const http_build_query  = require("locutus/php/url/http_build_query");

var ajax = function(url,callback){

	var xhr = new XMLHttpRequest();
    xhr.onload = function(e){
        if (this.readyState == 4 && this.status == 200) {
        	callback.call(null,this.responseText);
        }
    }
    xhr.open("get",url);
    xhr.send(null);
};

var reload = function(url,widget,dataKey = null){
	ajax(url,function(txt){
        var result = txt;
        try{
            result = JSON.parse(result)
        }
        catch(e){
        	result = {};
        }
        console.log(result)
        widget.render(result,dataKey);
	});
}


Cmay.plugin({
    "c-url" : function(url,data,dom,widget){
    	var target;
    	widget.$sourceUrl = url;
    	if(target = dom.getAttribute('c-url-data')){
    		widget.$sourceUrlDataTarget = target; 
    		reload(url,widget,target);
    	}
    	else{
	    	reload(url,widget);
    	}

        console.log(widget);
    },


    'c-reload' : function(val,data,dom,widget){
    	if(!widget.$sourceUrl){
    		return;
    	}

    	var obj;
    	val = val.trim();
    	if(val.length && val[0] == '{' || val[0] == '['){
    		try{
	    		obj = JSON.parse(val);
    		}
    		catch(e){
    			obj = {};
    		}
    	}
    	else{
    		obj = (global[val] ? global[val] : {});
    	}
    	widget.$reloadWatching = Cmay.set(obj);

    	var sourceUrl = widget.$sourceUrl;
    	var callback = 
    		(
    			(url,widget) => { 
		    		return () => {
		    			var options = http_build_query(Cmay.get(widget.$reloadWatching));
		    			sourceUrl += sourceUrl.indexOf('?') > -1 ? '&' + options : '?' + options;
		    			reload(sourceUrl,widget,widget.$sourceUrlDataTarget);
		    		}
	    		}
    		)(sourceUrl,widget) 
		
    	  
    	Cmay.watch(obj,callback);

    	dom.removeAttribute('c-reload');
    	
    }
})