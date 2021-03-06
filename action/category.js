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

exports.copy_product_page = function(req, category, product_id, spc) {
	var product = db.one(category, {"_id":product_id});
	var field = fd[category];
	
	var data = field[spc](), spc_product;
	if(product.parent_child == "parent"){
		spc_product = "Parent Product";
	}else if(product.parent_child == "child"){
		spc_product = "Child Product";
	}else{
		spc_product = "Single Product";
	}
	data.forEach(function(item){
		if(item.copy){
			if(item.func_out){
				item.value = item.func_out(product[item.key]);
			}else{
				item.value = product[item.key]?product[item.key]:""; 
			}
		}
	});	
	return env.renderResponse("copy_product_page.html",{
		"product":	product,
		"category":	category,
		"data":		data,
		"spc":		spc,
		"spc_product":	spc_product,
		"csrftoken":req.getCsrfToken(),
	});
}

exports.get_inventory_file = function(req, category, json_product_ids, withupc){
	var products = db.all(category, {"_id":{$in:JSON.parse(json_product_ids)}});
	
	var headline = hline[category];
	var headline_3 = hline[category + "_3"];
	
	var body_content = [headline];	

	if(withupc == '1'){
		var upc_enough = true;
		for(var i in products){
			var p = products[i];
			if(p.parent_child != 'parent'){
				if(!p.external_product_id){
					var upc = db.one('UPC', {'used':false});
					if(!upc){
						upc_enough = false;
						break;
					}
					p.external_product_id = upc.barcode;
					upc.used = true;
					db.save('UPC', upc);
					db.save(category, p);
					p.external_product_id_type = 'UPC';
				}
			}        
			var r = "";
			headline_3.forEach(function(h3){
				r += ((p[h3]?p[h3].trim():"") + "\t");
			});
			r += "\n";
			body_content.push(r);
		}
		if(!upc_enough){
			return response.html('<script>alert("upc is not enough");history.back();</script>');
		}
	}else{
		for(var i in products){
			var p = products[i];
			if(p.parent_child != 'parent'){
				p.external_product_id_type = 'GCID';
			}
			var r = "";
			headline_3.forEach(function(h3){
				r += ((p[h3]?p[h3].trim():"") + "\t");
			});
			r += "\n";
			body_content.push(r);
		}
	}

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

	fields = field[spc]();
	
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
		data = field['010']();
		spc_product = "Parent Product";
	}else if(product.parent_child == "child"){		
		data = field['001']();
		spc_product = "Child Product";
	}else{		
		data = field['100']();
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
		"spc_product":	spc_product,
		"csrftoken":req.getCsrfToken(),
	});
}


exports.child_products_complete = function(req, category) {
    var product_id = req.postParams.product_id;
	var product = db.one(category, {"_id":product_id});
	
	product.item_sku = req.postParams.item_sku.trim();
	product.standard_price = req.postParams.standard_price.trim();
	product.main_image_url = req.postParams.main_image_url.trim();
	product.other_image_url1 = req.postParams.other_image_url1?req.postParams.other_image_url1.trim():"";
	product.other_image_url2 = req.postParams.other_image_url2?req.postParams.other_image_url2.trim():"";
	
	db.save(category, product);
	return response.json({"status":200, "msg":"ok"});
}

exports.child_products_complete_page = function(req, category, parent_product_id) {
	var parent_product = db.one(category, {"_id":parent_product_id});
	var child_products = db.all(category, {"parent_sku":parent_product.item_sku});
	var vtlist = fd.vtmap[parent_product.variation_theme];
	child_products.forEach(function(cp){
		cp.vtcontents = "";
		vtlist.forEach(function(vt,i){
			if(i == 0){
				cp.vtcontents += cp[vt];
			}else{
				cp.vtcontents += "/" + cp[vt];
			}
		});
	});
	return env.renderResponse("child_products.html",{
		"parent_product":parent_product,
		"child_products":child_products,
		"csrftoken":req.getCsrfToken(),
	});
}

exports.add_product = function(req) {
    var category = req.postParams.category;
    var spc = req.postParams.spc;
	var field = fd[category];
	//log.info(typeof req.postParams)	
	var fields = [];
	var product ={};

	fields = field[spc]();
	
	fields.forEach(function(item){
		
		if(item.func_in){
			product[item.key] = item.func_in(req.postParams[item.key]?req.postParams[item.key].trim():"");
		}else{
			product[item.key] = req.postParams[item.key]?req.postParams[item.key].trim():"";
		}
	});
	
	var user = req.session.data['iluser'];
	var crt_time = utils.cur_time();
	
	product.user_id = user._id;
	product.crt_time = crt_time;
	product.dtimes = 0;
	
	if(spc == "010"){
		var variation_theme = req.postParams.variation_theme;
		var vtmclist2v = req.postParams.variation_theme_content.trim().split(/\r\n|\n/).filter(function(item){return item.trim()!=''}).map(function(itm){return itm.split(/,|，/).filter(function(it){return it.trim()!="";})});
		// log.info("vtmclist2v:"+JSON.stringify(vtmclist2v));
		var vtlist = fd.vtmap[variation_theme];
		//////////////////////
		// variation_theme_content [[],[]]
		if(vtmclist2v.length == 0){
			return response.json({"status":301, "msg":"variation_theme_content can not be empty!"});
		}

		function generate_zuhe(vtmclist2v){
			var vtmclist1v = vtmclist2v.pop();
			if(vtmclist2v.length == 0){
				var r = vtmclist1v.map(function(item){
					return [item.trim()];
				});
				// log.info("end:" + JSON.stringify(r));
				return r;
			}else{
				var re = generate_zuhe(vtmclist2v);
				var result = []; 
				vtmclist1v.forEach(function(vt){
					vt = vt.trim();
					re.forEach(function(rt){
						result.push(rt.concat([vt]));
					});
				});
				// log.info("end:" + JSON.stringify(result));
				return result;
			}
		}
		var results = generate_zuhe(vtmclist2v);
		// log.info(JSON.stringify(results));
		results.forEach(function(rs){
			var child_product = utils.clone(product);
			
			var add_to_sku ="";
			var add_to_name ="";
			
			rs.forEach(function(item, i){
				item = item.trim();
				child_product[vtlist[i]] = item;
				add_to_name += " " + item;
				add_to_sku += item;
			});
			child_product.parent_child = "child";
			child_product.parent_sku = product.item_sku;
			child_product.item_sku = product.item_sku + add_to_sku.toUpperCase();
			child_product.item_name = product.item_name + " " + add_to_name;
			db.save(category, child_product);
		});
		//chu li mu lei mei you de shu xing 
		product.quantity = "";
		product.standard_price = "";
	}else if(spc == "100"){

	}else if(spc == "001"){
		
	}
	//////////////////////

	
	db.save(category, product);
	return response.json({"status":200, "msg":"ok", "spc":spc, "product_id":product._id});
}


exports.add_product_page = function(req, category) {
	var field = fd[category];

	return env.renderResponse("add_product_page.html",{
	   category:category,
	   variable:field.variable,
	   single:field['100'](),
	   parent:field['010'](),
	   "csrftoken":req.getCsrfToken(),
	});
}

exports.delete_product = function(req, category, product_id) {
	var product = db.one(category, {"_id":product_id});
	db.remove(category, product);
	return response.json({"status":200, "msg":"delete ok"});
}

exports.category = function(req, category, cur_page_num) {
	var user = req.session.data['iluser'];
	var page_size = 15;
	var result = db.page(category, {"user_id": user._id}, cur_page_num, page_size, {"crt_time":-1});
	var products = result['objects'];
	var last_page_num = result['last_page_num'];
	
	if(!cur_page_num || cur_page_num < 1){
		cur_page_num = 1;
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
