var log = require("ringo/logging").getLogger(module.id);
var {Environment} = require('reinhardt');

var env = new Environment({
   loader: module.resolve("../template/")
});

var response = require('ringo/jsgi/response');
var strings = require("ringo/utils/strings");

var db = require('db');
var utils = require('utils');

//////////////////////////////////////////////////////////////////////

var login = exports.login = function(req) {
    var redirect_path = req.postParams.redirect_path;
	
    var login_name = req.postParams.login_name.trim();
    var login_password = req.postParams.login_password.trim();
	
   var user = db.one("User", {"login_name":login_name});
   // log.info("===========================================");
   // log.info("login:"+JSON.stringify(user));
   if(!user || user.is_enabled == false){
        return response.html("user is not existed! <a href='javascript:history.back()'>back.</a>");
        //return response.html("<script>alert('"+ all_chinese[166] +"');history.back();</script>"); 
	}
	var md5_login_password = strings.digest(login_password + user.crt_time, "md5")
	
	// log.info("md5_login_password:"+md5_login_password);
	// log.info("user.password:"+user.password);
	if(user.login_password == md5_login_password){
        req.session.data['user'] = user;
		 var cur_time = utils.cur_time();
		 user.last_login_time = cur_time;
		 db.save("User", user);
        if(redirect_path){
            return response.redirect(base64.decode(redirect_path, "utf-8"));
        }else{
            return response.redirect("/intro.md");
       }     
	}else{
        return response.html("name or password is error! <a href='javascript:history.back()'>back.</a>");
        //return response.html("<script>alert('"+ all_chinese[167] +"');history.back();</script>"); 
    }
}


var login_user_display_name = exports.login_user_display_name = function(req) {
    if(req.session.data['user']){
		return response.html(req.session.data['user'].display_name + " welcome!");
	}else{
		return response.html('');
	}
}

var logout = exports.logout = function(req) {
    req.session.data['islogon'] = false;    
    req.session.data['user'] = null;
    return response.redirect("/index.html");
}
var to_login = exports.to_login = function(req, redirect_path) {
    return env.renderResponse('index.html', {
        "redirect_path":redirect_path,
    });
}
