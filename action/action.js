var log = require("ringo/logging").getLogger(module.id);
var {Environment} = require('reinhardt');

var env = new Environment({
   loader: module.resolve("../template/")
});

var db = require('db').db;
var response = require('ringo/jsgi/response');
//////////////////////////////////////////////////////////////////////

var login = exports.login = function(req) {
    var redirect_path = req.postParams.redirect_path;

    var login_name = req.postParams.login_name.trim();
    var login_password = req.postParams.login_password.trim();
	return response.redirect("/intro.md");
}


var login_user_display_name = exports.login_user_display_name = function(req) {
    if(req.session.data['islogon']){
		return response.html(req.session.data['user'].display_name);
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

exports.category = function(req, category) {
	var col = db.getCollection(category);
	var curi = col.find();
	
	var  arr = curi.toArray().map(function(item){
		return JSON.parse(item.toJSON());
	});
	return env.renderResponse("category.html",{
	   collections:arr,
	   category:category,
	   
	});
}
exports.intro = function(req) {
   var coll_names = db.getCollectionNames();
   return env.renderResponse("intro.html",{
	   coll_names:coll_names,
	   
   });
}
