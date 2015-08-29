importPackage(java.text);
importPackage(java.util);

var clone = exports.clone = function(obj) {  
	var o;  
	if (typeof obj == "object") {  
		if (obj === null) {  
			o = null;  
		} else {  
			if (obj instanceof Array) {  
				o = [];  
				for (var i = 0, len = obj.length; i < len; i++) {  
					o.push(clone(obj[i]));  
				}  
			} else {  
				o = {};  
				for (var j in obj) {  
					o[j] = clone(obj[j]);  
				}  
			}  
		}  
	} else {  
		o = obj;  
	}  
	return o;  
}  
var guid = exports.guid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

var cur_time = exports.cur_time = function(pattern){ 
    var sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    if(pattern){
        sf = new SimpleDateFormat(pattern);
    }
    var crt_time = sf.format(new Date());
    return crt_time;
}

var cur_date = exports.cur_date = function(pattern){ 
    var sf = new SimpleDateFormat("yyyy-MM-dd");
    if(pattern){
        sf = new SimpleDateFormat(pattern);
    }
    var cur_date = sf.format(new Date());
    return cur_date;
}