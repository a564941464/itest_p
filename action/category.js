var log = require("ringo/logging").getLogger(module.id);
var {Environment} = require('reinhardt');

var env = new Environment({
   loader: module.resolve("../template/")
});

var response = require('ringo/jsgi/response');
var strings = require("ringo/utils/strings");

var db = require('db');
var utils = require('utils');
var fd = require('field');
var hline = require('headline');

//////////////////////////////////////////////////////////////////////

exports.generate_child_product = function(req) {
    var category = req.postParams.category;
    var spc = req.postParams.spc;
	//var field = fd[category];
	//log.info(typeof req.postParams)
	
	if(spc == "100"){
		
	}else if(spc == "010"){
		
	}
	
	var line_3 = hline[category+"_3"];
	var product ={};
	line_3.forEach(function(item){
		product[item] = req.postParams[item];
	});
	db.save(category, product);
	return response.json({"status":200, "msg":"ok"});
}

exports.child_products = function(req, category, parent_product_id) {
	var parent_product = db.one(category, {"_id":parent_product_id});
	var child_products = db.all(category, {"parent_sku":parent_product.item_sku});
	return env.renderResponse("child_products.html",{
		"parent_product":parent_product,
		"child_products":child_products,
		
	});
}

exports.add_product = function(req) {
    var category = req.postParams.category;
    var spc = req.postParams.spc;
	//var field = fd[category];
	//log.info(typeof req.postParams)	
	var line_3_ext = hline[category+"_3_ext"];
	var product ={};
	line_3_ext.forEach(function(item){
		product[item] = req.postParams[item];
	});
	if(spc == "100"){


	}else if(spc == "010"){
		var variation_theme = req.postParams.variation_theme;
		if(variation_theme == "Size"){
			var variation_theme_size = req.postParams.variation_theme_size;
			var sizelist = variation_theme_size.split(",").map(function(item){return item.trim()});
			sizelist.forEach(function(item, i){
				var child_product = utils.clone(product);
				child_product.size_name = item;
				child_product.parent_child = "child";
				child_product.parent_sku = product.item_sku;
				child_product.item_sku = product.item_sku + i;
				child_product.item_name = product.item_name + " " +item;
				db.save(category, child_product);
			});
		}else if(variation_theme == "Color"){
			var variation_theme_color = req.postParams.variation_theme_color;
			var colorlist = variation_theme_color.split(",").map(function(item){return item.trim()});
			colorlist.forEach(function(item, i){
				var child_product = utils.clone(product);
				child_product.color_name = item;
				child_product.parent_child = "child";
				child_product.parent_sku = product.item_sku;
				child_product.item_sku = product.item_sku + i;
				child_product.item_name = product.item_name + " " +item;
				db.save(category, child_product);
			});
			
		}else if(variation_theme == "sizecolor"){
			var variation_theme_size = req.postParams.variation_theme_size;
			var variation_theme_color = req.postParams.variation_theme_color;
			var sizelist = variation_theme_size.split(",").map(function(item){return item.trim()});
			var colorlist = variation_theme_color.split(",").map(function(item){return item.trim()});
			sizelist.forEach(function(sitem, i){
				colorlist.forEach(function(citem, j){
					var child_product = utils.clone(product);
					child_product.size_name = sitem;
					child_product.color_name = citem;
					child_product.parent_child = "child";
					child_product.parent_sku = product.item_sku;
					child_product.item_sku = product.item_sku + i + j;
					
					child_product.item_name = product.item_name + " " + sitem + " " + citem; 
					db.save(category, child_product);
				});
			});
		}
	}
	db.save(category, product);
	return response.json({"status":200, "msg":"ok", "spc":spc, "product_id":product._id});
}


exports.add_product_page = function(req, category) {
	var field = fd[category];
	// var headline = hline[category];
	return env.renderResponse("add_product_page.html",{
	   category:category,
	   variable:field.variable,
	   single:field.single(),
	   parent:field.parent(),
	   
	});
}
exports.delete_product = function(req, category, product_id) {
	var product = db.one(category, {"_id":product_id});
	db.remove(category, product);
	return response.json({"status":200, "msg":"delete ok"});
}

exports.category = function(req, category) {	
	var  products = db.all(category);
	return env.renderResponse("category.html",{
	   products:products,
	   category:category,
	   
	});
}

exports.intro = function(req) {
   return env.renderResponse("intro.html",{
	   
   });
}
