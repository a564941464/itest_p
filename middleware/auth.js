var log = require("ringo/logging").getLogger(module.id);

var response = require('ringo/jsgi/response');
var strings = require("ringo/utils/strings");

var db = require('db');
var utils = require('utils');

exports.middleware = function (next) {
   return function(req) {
		// return next(req);   
        var path = req.pathInfo;
		// log.info(path)
        if(path.indexOf(".md") != -1){
			log.info(path)
            var user = req.session.data['iluser'];            
            if(user && user.is_enabled){
				return next(req);                
            }else{
			log.info("md5_login_password:-------------------------");
				return response.html("<script>location.href='/index.html';</script>");    
			}  
        }else{
			return next(req); 
		}
   };
};