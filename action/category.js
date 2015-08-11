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

exports.update_product = function(req) {
    var category = req.postParams.category;
    var product_id = req.postParams.product_id;
	
	var spc = req.postParams.spc;
	var field = fd[category];
	
	var fields = [];
	var product = db.one(category, {"_id":product_id});
	if(spc == "100"){
		fields = field.single();
	}else if(spc == "010"){
		fields = field.parent();
	}
	
	fields.forEach(function(item){
		if(item.func_in){
			product[item.key] = item.func_in(req.postParams[item.key]?req.postParams[item.key]:"");
		}else{
			product[item.key] = req.postParams[item.key]?req.postParams[item.key]:"";
		}
	});
	
	db.save(category, product);
	return response.json({"status":200, "msg":"ok", "spc":spc, "product_id":product._id});
}
exports.update_product_page = function(req, category, product_id) {
	var product = db.one(category, {"_id":product_id});
	var field = fd[category];
	
	var data, spc_product;
	if(product.parent_child == "parent"){
		data = field.parent_edit();
		spc_product = "Parent Product";
	}else if(product.parent_child == "child"){
		data = field.child_edit();
		spc_product = "Child Product";
	}else{
		data = field.single_edit();
		spc_product = "Single Product";
	}
	data.forEach(function(item){
		if(item.func_out){
			item.value = item.func_out(product[item.key]);
		}else{
			item.value = product[item.key]; 
		}
	});	
	return env.renderResponse("update_product_page.html",{
		"product":	product,
		"category":	category,
		"data":		data,
		"spc_product":		spc_product,
		
	});
}


exports.child_products_complete = function(req, category) {
    var product_id = req.postParams.product_id;
	var product = db.one(category, {"_id":product_id});
	
	product.item_sku = req.postParams.item_sku.trim();
	product.main_image_url = req.postParams.main_image_url.trim();
	product.other_image_url1 = req.postParams.other_image_url1?req.postParams.other_image_url1.trim():"";
	product.other_image_url2 = req.postParams.other_image_url2?req.postParams.other_image_url2.trim():"";
	
	db.save(category, product);
	return response.json({"status":200, "msg":"ok"});
}

exports.child_products_complete_page = function(req, category, parent_product_id) {
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
	var field = fd[category];
	//log.info(typeof req.postParams)	
	var fields = [];
	var product ={};
	if(spc == "100"){
		fields = field.single();
	}else if(spc == "010"){
		fields = field.parent();
	}
	
	fields.forEach(function(item){
		if(item.func_in){
			product[item.key] = item.func_in(req.postParams[item.key]?req.postParams[item.key]:"");
		}else{
			product[item.key] = req.postParams[item.key]?req.postParams[item.key]:"";
		}
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
				
				
				log.info(JSON.stringify(child_product));

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
