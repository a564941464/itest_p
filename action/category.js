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

exports.get_inventory_file = function(req, category, json_product_ids){
	var products = db.all(category, {"_id":{$in:JSON.parse(json_product_ids)}})["objects"];
	
	var headline = hline[category];
	var headline_3 = hline[category + "_3"];
	
	var body_content = [headline];
	
    products.forEach(function(p){
        var r = "";
		headline_3.forEach(function(h3){
			r += ((p[h3]?p[h3]:"") + "\t");
		});
		r += "\n";
        body_content.push(r);
	});
    var crt_time = utils.cur_time("yyyyMMddHHmmss");
    return {
        body: body_content,
        headers: {"Content-disposition":"attachment;filename= Inventory_" + crt_time + ".txt",
                "ContentType":  "text/txt", },
        status: 200,
   }
}

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
			product[item.key] = item.func_in(req.postParams[item.key]?req.postParams[item.key].trim():"");
		}else{
			product[item.key] = req.postParams[item.key]?req.postParams[item.key].trim():"";
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
			item.value = product[item.key]?product[item.key]:""; 
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
			product[item.key] = item.func_in(req.postParams[item.key]?req.postParams[item.key].trim():"");
		}else{
			product[item.key] = req.postParams[item.key]?req.postParams[item.key].trim():"";
		}
	});
	
	var user = req.session.data['user'];
	var crt_time = utils.cur_time();
	
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

				product.user_id = user._id;
				product.crt_time = crt_time;
				product.dtimes = 0;
				
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

				product.user_id = user._id;
				product.crt_time = crt_time;
				product.dtimes = 0;
				
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
					
					product.user_id = user._id;
					product.crt_time = crt_time;
					product.dtimes = 0;
					
					db.save(category, child_product);

				});
			});
		}
	}
	
	product.user_id = user._id;
	product.crt_time = crt_time;
	product.dtimes = 0;	
	
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

exports.category = function(req, category, cur_page_num) {
	var user = req.session.data['user'];
	var page_size = 20;
	var result = db.page(category, {"user_id": user._id}, cur_page_num, page_size);
	var products = result['objects'];
	var last_page_num = result['last_page_num'];
	
	if(!cur_page_num || cur_page_num < 1){
		cur_page_num = 1;
	}
	if(!page_size || page_size < 1){
		page_size = 20;
	}
	
	cur_page_num = result['cur_page_num'];
	
	return env.renderResponse("category.html",{
		products:products,
		category:category,

		last_page_num:last_page_num, 
		page_size: page_size, 
		cur_page_num: cur_page_num, 
		pre_page_num: parseInt(cur_page_num) - 1, 
		next_page_num: parseInt(cur_page_num) + 1, 

		url: "category.md", 
		query_str_param: "",
	});
}

exports.intro = function(req) {
   return env.renderResponse("intro.html",{
	   
   });
}
