
const date = require('locutus/php/datetime/date');

Cmay.filter("money",function(val,args){
	var num = parseInt(args);
	if(num != num){
		num = 2;
	}
	val = parseFloat(val);
	
	if(val != val) return "0." +"0".repeat(num);

	return val.toFixed(num); 
});

Cmay.filter('bold',function(val){
	return '<b>' + val + '</b>';
});

Cmay.filter('image',function(val){
	return '<img src=' + val + ' />';
})

Cmay.filter('date',function(val,args){
	args = args.length ? args : 'yyyy-mm-dd';
	return date(args,val)
});