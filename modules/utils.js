importPackage(java.text);
importPackage(java.util);

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