var log = require("ringo/logging").getLogger(module.id);

var response = require('ringo/jsgi/response');
var strings = require("ringo/utils/strings");

var db = require('db');
var utils = require('utils');

exports.middleware = function (next) {
   return function(req) {return next(req);   
        var path = req.pathInfo;
        if(path.indexOf(".md") != -1){
            var user = req.session.data['user'];            
            if(user && user.is_enabled){
				return next(req);                
            } else{
				return response.html("<script>location.href='/index.html';</script>");    
			}  
        }
   };
};