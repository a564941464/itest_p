var {Environment} = require('reinhardt/reinhardt');
var env = new Environment({
   loader: module.resolve('../template/')
});

var log = require("ringo/logging").getLogger(module.id);
var response = require('ringo/jsgi/response');
var strings = require("ringo/utils/strings");

var db = require('db');
var utils = require('utils');

///////////////////////////////////////////////////////////////////
var set_role = exports.set_role = function(req){
	var user_id = req.postParams.user_id.trim();
	var user = db.one("User", {"_id":user_id});
	var is_super = req.postParams.is_super;
	user.is_super = is_super == 'yes'?true:false;
	db.save("User", user);
    return response.json({"status":200, msg:"", "user":user});
}
var to_set_role = exports.to_set_role = function(req, user_id){
	var user = db.one("User", {"_id":user_id});
    return env.renderResponse('to_set_role.html',{"user":user});
}

var user_passwd = exports.user_passwd = function(req){
	var user_id = req.postParams.user_id.trim();
	var user = db.one("User", {"_id":user_id});
	var login_password = req.postParams.login_password.trim();
	var re_login_password = req.postParams.re_login_password.trim();

	if(login_password==""){
		return response.json({"status":120, "msg":"password could not be empty"});
	}
	if(login_password!=re_login_password){
		return response.json({"status":152, "msg":"password not same"});
	}
	var save_login_password = strings.digest(login_password + user.crt_time, "md5");

	user.login_password = save_login_password;
	db.save("User", user);
	return response.json({"status":200, msg:""});
}
var user_to_passwd = exports.user_to_passwd = function(req, user_id){
	var user = db.one("User", {"_id":user_id});
    return env.renderResponse('user_passwd.html',{"user":user});
}

var user_inactive = exports.user_inactive = function(req, user_id){
	var user = db.one("User", {"_id":user_id});
	user.is_enabled = false;
	db.save("User", user);
    return response.json({"status":200, msg:""});
}
var user_active = exports.user_active = function(req, user_id){
	var user = db.one("User", {"_id":user_id});
	user.is_enabled = true;
    return response.json({"status":200, msg:""});
}

var add_user = exports.add_user = function(req){
   var login_password = req.postParams.login_password.trim();
   var re_login_password = req.postParams.re_login_password.trim();

   if(login_password==""){
		return response.json({"status":120, "msg":"password could not be empty"});
   }
   if(login_password!=re_login_password){
		return response.json({"status":152, "msg":"password not same"});
   }
   var crt_time = utils.cur_time();
   var save_login_password = strings.digest(login_password+crt_time, "md5");

   var login_name = req.postParams.login_name.trim();
   
   var existed_user = db.one("User", {"login_name":login_name});
   if(existed_user){
		return response.json({"status":300, "msg": "existed user!"});
    }
    var display_name = req.postParams.display_name.trim();
    var super_yes = req.postParams.is_super;

    var is_super = (super_yes=="yes"?true:false);

	var user = {
		"display_name":display_name, 
        "login_name":login_name,
        "login_password":save_login_password,
        "is_super": is_super,
        "crt_time":crt_time,
		"is_enabled":true,
		"last_login_time":crt_time,
    }
    db.save("User", user);
    return response.json({"status":200, msg:""});
}

var user_list = exports.user_list = function(req){
	var users = db.all('User');
    return env.renderResponse('user_list.html', {
		"users":users,
	});
}

var role_list = exports.role_list = function(req){
	var roles = db.all('Role');
    return env.renderResponse('role_list.html', {
		"roles":roles,
	});
}

var user_role = exports.user_role = function(req){
	return env.renderResponse('user_role.html', {"category": "user_role"});
}
