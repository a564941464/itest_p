var {Environment} = require('reinhardt/reinhardt');
var env = new Environment({
   loader: module.resolve('../template/')
});

var log = require("ringo/logging").getLogger(module.id);
var db = require('db');
var response = require('ringo/jsgi/response');

///////////////////////////////////////////////////////////////////

exports.user_role_update_owner = function(req, action){
    var action = action.trim();
    //var actions = ['update_product_owner', 'partial_update_product_owner','update_order_owner'];
    if(action == 'update_product_owner'){
        store.beginTransaction();
        var products = store.query("from Product");
        products.forEach(function(p){
            if(p.code){
                var user = utils.skucode2user(p.code);
                p.own_user_id = user._id;
                p.own_user_name = user.display_name;
                p.save();
            }
        });
        store.commitTransaction();
        return response.json({"status":200, "msg": ""});
        
    }else if(action == 'partial_update_product_owner'){
        store.beginTransaction();
        var products = store.query("from Product where Product.own_user_id = -1");
        products.forEach(function(p){
            if(p.code){
                var user = utils.skucode2user(p.code);
                p.own_user_id = user._id;
                p.own_user_name = user.display_name;
                p.save();
            }
        });
        store.commitTransaction();
        return response.json({"status":200, "msg": ""});
        
    }else if(action == 'update_order_owner'){
        store.beginTransaction();
        var orders = store.query("from Order");
        orders.forEach(function(ord){
            var own_user = utils.skucode2user(ord.sku);
            ord.own_user_id = own_user._id;
            ord.own_user_name = own_user.display_name;
            ord.save();
            
        });
        store.commitTransaction();
        return response.json({"status":200, "msg": ""})
    }else{
        return response.json({"status":168, "msg": all_chinese[168]})
    }    
}
exports.user_role_auth = function(req){
	var user = req.session.data['user'];
    var role = store.query("from Role where Role.id = :role_id", {"role_id": parseInt(user.role_id)})[0];
    if(role){
        return response.text(role.res);
    }else{
        return response.text("");
    }
}

exports.user_role_delete_role = function(req, role_id){
	store.beginTransaction();
    var role = store.query("from Role where Role.id = :role_id", {"role_id": parseInt(role_id)})[0];
    role.remove();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}

exports.user_role_to_edit_role = function(req, role_id){
	var role = store.query("from Role where Role.id = :role_id", {"role_id": parseInt(role_id)})[0];

    return env.renderResponse('user_role_to_edit_role.html', {
		"role":role,
	});
}

exports.user_role_edit_role = function(req){
 var role_name = req.postParams.role_name;
    var role_id = parseInt(req.postParams.role_id.trim());
    
    var url = req.postParams.url; 
    var res = req.postParams.res; 
    
    var save_url = url.trim().split("\n").map(function(u){return u.trim();}).filter(function(ur){return (ur!="" && !strings.startsWith(ur,"**"))});
    
    store.beginTransaction();
    var role = store.query("from Role where Role.id = :role_id", {"role_id": parseInt(role_id)})[0];
    if(role.role_name!=role_name){
        role.role_name = role_name;

        var users = store.query("from User where User.role_id = :role_id order by User.id",{"role_id":role._id});
        users.forEach(function(user){
            user.role_name = role_name;
            user.save();
        });
    }
    role.res = res;
    role.url = JSON.stringify(save_url);
    role.original_url = url,
    role.save();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}

exports.user_role_to_add_role = function(req){

    return env.renderResponse('user_role_to_add_role.html', {

	});
}

exports.user_role_add_role = function(req){
    var role_name = req.postParams.role_name;
    var url = req.postParams.url; 
    var res = req.postParams.res; 
    
    var save_url = url.trim().split("\n").map(function(u){return u.trim();}).filter(function(ur){return (ur!="" && !strings.startsWith(ur,"#"))});
   
    store.beginTransaction();
    var role = new RoleMod({
        "role_name":role_name,
        "url":JSON.stringify(save_url),
        "res":res,
        "original_url":url,
        "crt_time":utils.cur_time(),
    });
    role.save();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}  

var user_role_delete_user = exports.user_role_delete_user = function(req, user_id){
    store.beginTransaction();
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	if(user.deletable){
		// user.remove();
		user.is_del = true;
        user.save();
	}else{
		return response.json({"status":119, msg: all_chinese[119]});
	}
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}

var user_role_active_user = exports.user_role_active_user = function(req, user_id){
    store.beginTransaction();
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
    user.is_del = false;
    user.save();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}

var user_role_edit_user = exports.user_role_edit_user = function(req){
	var user_id = parseInt(req.postParams.user_id.trim());	
    var qq = req.postParams.qq.trim();
	
	store.beginTransaction();
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	
   var login_name = req.postParams.login_name.trim();

   var existed_user = store.query("from User where User.login_name = :login_name and User.id <> :cur_user_id", {"login_name": login_name, "cur_user_id":user._id})[0];
   if(existed_user){
        return response.json({"status":118, "msg": all_chinese[118]});
   }
   
   var codechar = req.postParams.codechar.trim().toUpperCase();
   var existed_codechar = store.query("from User where User.codechar = :codechar and User.id <> :cur_user_id", {"codechar": codechar, "cur_user_id":user._id})[0];
   if(existed_codechar){
        return response.json({"status":164, "msg": all_chinese[164] + existed_codechar.codechar});
   }
   var display_name = req.postParams.display_name.trim();   
   var super_yes_or_no = req.postParams.is_super.trim();
   var is_super = (super_yes_or_no=="yes"?true:false);
    var role_id = -1;
    var role_name = all_chinese[163] ;
    if(!is_super){
        role_id = parseInt(req.postParams.role_id,10);
        var role = store.query("from Role where Role.id = :role_id",{"role_id":role_id})[0];
        role_name = role.role_name;
    }
	user.display_name = display_name;
	user.login_name = login_name;
	user.role_id = role_id;
	user.role_name = role_name;
	user.codechar = codechar;
    user.is_super = is_super;
    user.qq = qq;

    user.save();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}

var user_role_passwd = exports.user_role_passwd = function(req){
	var user_id = parseInt(req.postParams.user_id.trim());
	store.beginTransaction();
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	
	var login_password = req.postParams.login_password.trim();
	var re_login_password = req.postParams.re_login_password.trim();
	
	if(login_password==""){
		return response.json({"status":120, "msg":all_chinese[120]});
	}
	if(login_password!=re_login_password){
		return response.json({"status":152, "msg":all_chinese[152]});
   }

   var save_login_password = strings.digest(login_password + user.crt_time, "md5");
   
   
	user.login_password = save_login_password;

    user.save();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}

var user_role_set_role = exports.user_role_set_role = function(req){
	var user_id = parseInt(req.postParams.user_id.trim());
	store.beginTransaction();
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	
    var super_yes_or_no = req.postParams.is_super.trim();
    var is_super = (super_yes_or_no=="yes"?true:false);
    var role_id = -1;
    var role_name = all_chinese[163] ;
    if(!is_super){
        role_id = parseInt(req.postParams.role_id,10);
        var role = store.query("from Role where Role.id = :role_id",{"role_id":role_id})[0];
        role_name = role.role_name;
    }
	user.role_id = role_id;
	user.role_name = role_name;
    user.is_super = is_super;

    user.save();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}

var user_role_display = exports.user_role_display = function(req, user_id){
	var product = req.postParams.product.trim();
	var fba = req.postParams.fba.trim();
	var order = req.postParams.order.trim();
	var inventory = req.postParams.inventory.trim();
	var sale_report = req.postParams.sale_report.trim();
	var jinhuo = req.postParams.jinhuo.trim();
    
    var m = ["self","all"];
    var display = {"product":"", "fba":"", "order":"", "inventory":"","sale_report":"", "jinhuo":""};
    if(arrays.contains(m, product)){
        display.product = product;
    }
    if(arrays.contains(m, fba)){
        display.fba = fba;
    }
    if(arrays.contains(m, order)){
        display.order = order;
    }
    if(arrays.contains(m, inventory)){
        display.inventory = inventory;
    }
    if(arrays.contains(m, sale_report)){
        display.sale_report = sale_report;
    }
    if(arrays.contains(m, jinhuo)){
        display.jinhuo = jinhuo;
    }
    // log.info(JSON.stringify(display));
	store.beginTransaction();
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	if(req.session.data['user']._id == user._id){
        req.session.data['user'] = user;    
    }
    
    user.display = JSON.stringify(display);
    user.save();
    store.commitTransaction();
    
    return response.json({"status":200, msg:""});
}

var user_role_to_display = exports.user_role_to_display = function(req, user_id){
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	if(user.display){
        user.display = JSON.parse(user.display);
    }else{
        user.display = {"product":"", "fba":"", "order":"", "inventory":"","sale_report":"", "jinhuo":""};
    }
    return env.renderResponse('user_role_to_display.html', {
		"user":user,
	});
}
var user_role_to_set_role = exports.user_role_to_set_role = function(req, user_id){
	var rolelist = store.query("from Role order by Role.id");
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	
    return env.renderResponse('user_role_to_set_role.html', {
		"rolelist":rolelist,
		"user":user,
	});
}

var user_role_to_passwd = exports.user_role_to_passwd = function(req, user_id){
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	
    return env.renderResponse('user_role_to_passwd.html', {
		"user":user,
	});
}

var user_role_to_edit_user = exports.user_role_to_edit_user = function(req, user_id){
	var rolelist = store.query("from Role order by Role.id");
	var user = store.query("from User where User.id = :user_id", {"user_id": parseInt(user_id)})[0];
	
    return env.renderResponse('user_role_to_edit_user.html', {
		"rolelist":rolelist,
		"user":user,
	});
}

var user_role_add_user = exports.user_role_add_user = function(req){
   var login_password = req.postParams.login_password.trim();
   var re_login_password = req.postParams.re_login_password.trim();
   var qq = req.postParams.qq.trim();

   if(login_password==""){
		return response.json({"status":120, "msg":all_chinese[120]});
   }
   if(login_password!=re_login_password){
		return response.json({"status":152, "msg":all_chinese[152]});
   }
   var crt_time = utils.cur_time();
   var save_login_password = strings.digest(login_password+crt_time, "md5");

   var login_name = req.postParams.login_name.trim();
   
   var existed_user = store.query("from User where User.login_name = :login_name", {"login_name": login_name})[0];
   if(existed_user){
		return response.json({"status":118, "msg": all_chinese[118]});
    }

    var codechar = req.postParams.codechar.trim().toUpperCase();
	if(codechar.length>2){
		return response.json({"status":189, "msg": all_chinese[189]});
    }
	
    var existed_codechar = store.query("from User where User.codechar = :codechar", {"codechar": codechar})[0];
    if(existed_codechar){
        return response.json({"status":164, "msg": all_chinese[164] + existed_codechar.codechar});
    }
    var display_name = req.postParams.display_name.trim();
    var super_yes_or_no = req.postParams.is_super.trim();

    var is_super = (super_yes_or_no=="yes"?true:false);
    var role_id = -1;
    var role_name = all_chinese[163] ;
    if(!is_super){
        role_id = parseInt(req.postParams.role_id,10);
        var role = store.query("from Role where Role.id = :role_id",{"role_id":role_id})[0];
        role_name = role.role_name;
    }

	var display = {"product":"self", "fba":"self", "order":"self", "inventory":"self","sale_report":"self", "jinhuo":"self"};
    store.beginTransaction();
    var user = new UserMod({
        "login_name":login_name,
        "login_password":save_login_password,
        "display_name":display_name,
        "role_id":role_id,
		"role_name":role_name,
        "crt_time":crt_time,
        "codechar":codechar,
		"is_del":true,
        "is_super": is_super,
		"deletable":true,
        "display": JSON.stringify(display),
        "qq": qq,
    });
    user.save();
    store.commitTransaction();
    return response.json({"status":200, msg:""});
}
var user_role_to_add_user = exports.user_role_to_add_user = function(req){
	var roles = db.all('Role');
    return env.renderResponse('user_role_to_add_user.html', {
		"roles":roles,
	});
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
	return env.renderResponse('user_role.html');
}
