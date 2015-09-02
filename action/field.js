// var ext_keys = exports.ext_keys = ["refer_link","crt_time","update_time"];
var vtmap = exports.vtmap =  {
	'sizecolor':['size_name','color_name'],
	'SizeNameColorName':['size_name','color_name'],
	'Color':['color_name'],
	'ColorName':['color_name'],
	'Size':['size_name'],
	'SizeName':['size_name'],
	'Style':['style_name'],
	'StyleName':['style_name'],
	'Flavor':['flavor_name'],
	'FlavorSize':['flavor_name','size_name'],
	'PatternName':['pattern_name'],
	'MetalType':['metal_type'],
	
}
/**
* @param type text, textarea, select_1, select_2, radio
* sku for example 
	"spc": "111",// single parent child 111
	"key":"item_sku",
	"en":"SKU",
	"copy":true,
	"type":"text", // text, textarea, select_1, select_2, hidden, 
	"values":[], 
	"value":value, 
	"func_in":null, //save
	"func_out":null, //view 
*/
var item_sku = {
	"spc": "111",
	"edit": "",
	"key":"item_sku",
	"en":"SKU",
	"copy":true,
	"type":"text", 
	"func_in": function(sku){
		if(sku&&sku.trim()){
			return sku.trim().toUpperCase();
		}
	}, //save
}//item_sku


var item_name = {
	"spc": "111",
	"edit": "",
	"key":"item_name",
	"en":"Product Name",
	"copy":true,
	"type":"text", 
}//item_name

var brand_name = {
	"spc": "111",
	"edit": "",
	"key":"brand_name",
	"en":"Brand Name",
	"copy":true,
	"type":"text", 
}//brand_name

var external_product_id = {
	"spc": "101",
	"edit": "",
	"key":"external_product_id",
	"en":"Product ID",
	"copy":false,
	"type":"text", 
}//external_product_id

var external_product_id_type = {
	"spc": "101",
	"edit": "",
	"key":"external_product_id_type",
	"en":"Product ID Type",
	"copy":false,
	"type":"select_1", 
	"values":['UPC','GCID'],
}//external_product_id_type

var item_type = function(valid_values){
	return {
		"spc": "111",
		"edit": "",
		"key":"item_type",
		"en":"Item Type Keyword",
		"copy":false,
		"type":"select_2", 
		"values":valid_values,
	}
}//item_type

var standard_price = {
	"spc": "111",// just for child, not for parent
	"edit": "",
	"key":"standard_price",
	"en":"Standard Price",
	"copy":false,
	"type":"text", 
}//standard_price

var quantity = {
	"spc": "111",// not for parent, just for child
	"edit": "",
	"key":"quantity",
	"en":"Quantity",
	"copy":true,
	"type":"hidden", 
	"value":30,
}//quantity

var bullet_point1 = {
	"spc": "111",
	"edit": "",
	"key":"bullet_point1",
	"en":"Key Product Features1",
	"copy":true,
	"type":"text", 
}//bullet_point1

var bullet_point2 = {
	"spc": "111",
	"edit": "",
	"key":"bullet_point2",
	"en":"Key Product Features2",
	"copy":true,
	"type":"text", 
}//bullet_point2

var bullet_point3 = {
	"spc": "111",
	"edit": "",
	"key":"bullet_point3",
	"en":"Key Product Features3",
	"copy":true,
	"type":"text", 
}//bullet_point3

var bullet_point4 = {
	"spc": "111",
	"edit": "",
	"key":"bullet_point4",
	"en":"Key Product Features4",
	"copy":true,
	"type":"text", 
}//bullet_point4

var bullet_point5 = {
	"spc": "111",
	"edit": "",
	"key":"bullet_point5",
	"en":"Key Product Features5",
	"copy":true,
	"type":"text", 
}//bullet_point5

var generic_keywords1 = {
	"spc": "111",
	"edit": "",
	"key":"generic_keywords1",
	"en":"Search Terms1",
	"copy":true,
	"type":"text", 
}//generic_keywords1

var generic_keywords2 = {
	"spc": "111",
	"edit": "",
	"key":"generic_keywords2",
	"en":"Search Terms2",
	"copy":true,
	"type":"text", 
}//generic_keywords2

var generic_keywords3 = {
	"spc": "111",
	"edit": "",
	"key":"generic_keywords3",
	"en":"Search Terms3",
	"copy":true,
	"type":"text", 
}//generic_keywords3

var generic_keywords4 = {
	"spc": "111",
	"edit": "",
	"key":"generic_keywords4",
	"en":"Search Terms4",
	"copy":true,
	"type":"text", 
}//generic_keywords4

var generic_keywords5 = {
	"spc": "111",
	"edit": "",
	"key":"generic_keywords5",
	"en":"Search Terms5",
	"copy":true,
	"type":"text", 
}//generic_keywords5

var size_name = {
	"spc": "101",
	"edit": "",
	"key":"size_name",
	"en":"Size",
	"copy":false,
	"type":"text", 
}//size_name

var color_name = {
	"spc": "101",
	"edit": "",
	"key":"color_name",
	"en":"Colour",
	"copy":false,
	"type":"text", 
}//color_name

var main_image_url = {
	"spc": "111",
	"edit": "",
	"key":"main_image_url",
	"en":"Main Image URL",
	"copy":false,
	"type":"text", 
}//main_image_url

var other_image_url1 = {
	"spc": "111",
	"edit": "",
	"key":"other_image_url1",
	"en":"Other Image URL1",
	"copy":false,
	"type":"text", 
}//other_image_url1

var other_image_url2 = {
	"spc": "111",
	"edit": "",
	"key":"other_image_url2",
	"en":"Other Image URL2",
	"copy":false,
	"type":"text", 
}//other_image_url2

var other_image_url3 = {
	"spc": "111",
	"edit": "",
	"key":"other_image_url3",
	"en":"Other Image URL3",
	"copy":false,
	"type":"text", 
}//other_image_url3

var other_image_url4 = {
	"spc": "111",
	"edit": "",
	"key":"other_image_url4",
	"en":"Other Image URL4",
	"copy":false,
	"type":"text", 
}//other_image_url4

var other_image_url5 = {
	"spc": "111",
	"edit": "",
	"key":"other_image_url5",
	"en":"Other Image URL5",
	"copy":false,
	"type":"text", 
}//other_image_url5

var product_description = {
	"spc": "111",
	"edit": "",
	"key":"product_description",
	"en":"Product Description",
	"copy":true,
	"type":"textarea", 
	"func_in": function(desc){
		if(desc&&desc.trim()){
			return desc.trim().replace(/\n|(\r\n)/gm, "<br/>");
		}
	}, //save
	"func_out":function(desc){
		if(desc&&desc.trim()){
			return desc.trim().replace(/<br\/>/gm, "\r\n");
		}
	}, //view 
}//product_description

var variation_theme_content = {
	"spc": "010",
	"edit": "disabled",
	"key":"variation_theme_content",
	"en":"Variation Theme Content",
	"copy":true,
	"type":"textarea", 
}//variation_theme_content

var department_name = function(valid_values) {
	return {
		"spc": "111",
		"edit": "",
		"key":"department_name",
		"en":"Department",
		"copy":true,
		"type":"select_1", 
		"values": valid_values, 
	}
}//department_name

var variation_theme = function(valid_values) {
	return {
		"spc": "010",
		"edit": "disabled",
		"key":"variation_theme",
		"en":"Variation Theme",
		"copy":true,
		"type":"select_1", 
		"values": valid_values, 
	}
}//variation_theme


var parent_child = function(value) {
	return {
		"spc": "010",
		"edit": "disabled",
		"key":"parent_child",
		"en":"Parentage",
		"copy":true,
		"type":"hidden", 
		"value": value, 
	}
}//parent_child

var relationship_type = function(value) {
	return {
		"spc": "010",
		"edit": "disabled",
		"key":"relationship_type",
		"en":"Relationship Type",
		"copy":true,
		"type":"hidden", 
		"value": value, 
	}
}//relationship_type


var refer_link = {
	"spc": "111",
	"edit": "",
	"key":"refer_link",
	"en":"Product Link",
	"copy":false,
	"type":"text", 
}//refer_link

var feed_product_type = function(valid_values){
	return {
		"spc": "111",
		"edit": "disabled",
		"key":"feed_product_type",
		"en":"Product Type",
		"copy":true,
		"type":"select_1", 
		"values":valid_values, 
	}
}//feed_product_type

var condition_type = {
	"spc": "111",
	"edit": "disabled",
	"key":"condition_type",
	"en":"Item Condition",
	"copy":true,
	"type":"hidden", 
	"value":"New",
}//condition_type

var target_audience_keywords1 = function(valid_values){
	return {
		"spc": "111",
		"edit": "",
		"key":"target_audience_keywords1",
		"en":"Target Audience1",
		"copy":true,
		"type":"select_1", 
		"values":valid_values,
	}
}//target_audience_keywords1
var target_audience_keywords2 = function(valid_values){
	return {
		"spc": "111",
		"edit": "",
		"key":"target_audience_keywords2",
		"en":"Target Audience2",
		"copy":true,
		"type":"select_1", 
		"values":valid_values,
	}
}//target_audience_keywords2

var target_audience_keywords3 = function(valid_values){
	return {
		"spc": "111",
		"edit": "",
		"key":"target_audience_keywords3",
		"en":"Target Audience3",
		"copy":true,
		"type":"select_1", 
		"values":valid_values,
	}
}//target_audience_keywords3

var manufacturer = {
		"spc": "111",
		"edit": "",
		"key":"manufacturer",
		"en":"Manufacturer",
		"copy":true,
		"type":"text", 
}//manufacturer

var model = {
		"spc": "101",
		"edit": "",
		"key":"model",
		"en":"Model Number",
		"copy":false,
		"type":"text", 
}//model


var currency = {
		"spc": "101",
		"edit": "",
		"key":"currency",
		"en":"Currency",
		"copy":true,
		"type":"hidden", 
		"value":"USD",
}//currency


var display_dimensions_unit_of_measure = {
		"spc": "101",
		"edit": "",
		"key":"display_dimensions_unit_of_measure",
		"en":"测量单位",
		"copy":true,
		"type":"select_1", 
		"values":["CM","FT","IN","M","MM"],
}//display_dimensions_unit_of_measure

var metal_type = function(valid_values){
	return {
		"spc": "101",
		"edit": "",
		"key":"metal_type",
		"en":"Metal Type",
		"copy":true,
		"type":"select_2", 
		"values":valid_values,
	};
}//metal_type

var material_type1 = function(valid_values){
	return {
		"spc": "101",
		"edit": "",
		"key":"material_type1",
		"en":"Material Type1",
		"copy":true,
		"type":"select_2", 
		"values":valid_values,
	};
}//material_type1


var material_type2 = function(valid_values){
	return {
		"spc": "101",
		"edit": "",
		"key":"material_type2",
		"en":"Material Type2",
		"copy":true,
		"type":"select_2", 
		"values":valid_values,
	};
}//material_type2
var material_type3 = function(valid_values){
	return {
		"spc": "101",
		"edit": "",
		"key":"material_type3",
		"en":"Material Type3",
		"copy":true,
		"type":"select_2", 
		"values":valid_values,
	};
}//material_type3


var metal_stamp = function(valid_values){
	return {
		"spc": "101",
		"edit": "",
		"key":"metal_stamp",
		"en":"Metal Stamp",
		"copy":true,
		"type":"select_1", 
		"values":valid_values,
	};
}//metal_stamp

var gem_type1 = function(valid_values){
	return {
		"spc": "101",
		"edit": "",
		"key":"gem_type1",
		"en":"Gem Type1",
		"copy":true,
		"type":"select_2", 
		"values":valid_values,
	};
}//gem_type1



var Jewelry = exports.Jewelry = {
	"variable":true,//parent child 
	"field":[ refer_link, item_sku, item_name, manufacturer, model, brand_name,currency,quantity, 
		feed_product_type("FashionEarring","FashionNecklaceBraceletAnklet", "FashionRing", "FashionOther"),  standard_price, product_description, 
		item_type([
			["cuff-bracelets", "开口手镯"],["bracelets", "其他bracelets"],["	wrap-bracelets", "缠绕手链"],["link-bracelets", "链子手链"],["stretch-bracelets", "松紧手链"],["identification-bracelets", "识别手环"],["anklets", "脚链,踝环"],["bangle-bracelets", "圆环手镯"],
			["earrings", "耳环,耳饰"],
			["rings", "戒指"],
			["chain-necklaces", "链子项链"],["choker-necklaces", "脖子项链"],["locket-necklaces", "吊坠可打开项链"],["y-shaped-necklaces", "Y字形项链"],
		]),
		display_dimensions_unit_of_measure,
		bullet_point1, bullet_point2, bullet_point3, bullet_point4, bullet_point5,
		generic_keywords1, generic_keywords2, generic_keywords3,generic_keywords4, generic_keywords5,
		parent_child("parent"),
		department_name(["womens","boys","girls","mens","unisex-adult","unisex-child",]),
		metal_type([
			["alloy", "合金"],["no-metal-type", "无金属"],["brass", "黄铜"],["brass-plated-gold", "黄铜镀金"],
			["bronze", "青铜"],["cobalt", "钴"],["copper", "铜"],["nickel", "镍"],["pewter", "锡"],["rose-gold", "玫瑰金"],
			["titanium", "钛"],["tungsten", "钨"],["stainless-steel", "不锈钢"],["silver-plated-base", "银镀普通金属"],
			
		]),
		metal_stamp(["no-metal-stamp","stainless-steel"]),
		material_type1([
			["NA","无"],["bamboo","竹子"],["ceramic","陶器"],["coral","珊瑚"],["crystal","水晶,水钻"],["enamel","珐琅,瓷釉"],
			["epoxy","环氧树脂"],["glass","玻璃"],["leather","皮革"],["mother-of-pearl","珍珠母"],["pearl","珍珠"],["resin","松香"],
			["rhinestone","人造钻石"],["rubber","橡胶"],["shell","贝壳"],["synthetic-resin","合成树脂"],["wood"," 木头, 木材, 木制品"],
		]),		
		material_type2([
			["NA","无"],["bamboo","竹子"],["ceramic","陶器"],["coral","珊瑚"],["crystal","水晶,水钻"],["enamel","珐琅,瓷釉"],
			["epoxy","环氧树脂"],["glass","玻璃"],["leather","皮革"],["mother-of-pearl","珍珠母"],["pearl","珍珠"],["resin","松香"],
			["rhinestone","人造钻石"],["rubber","橡胶"],["shell","贝壳"],["synthetic-resin","合成树脂"],["wood"," 木头, 木材, 木制品"],
		]),	
		material_type3([
			["NA","无"],["bamboo","竹子"],["ceramic","陶器"],["coral","珊瑚"],["crystal","水晶,水钻"],["enamel","珐琅,瓷釉"],
			["epoxy","环氧树脂"],["glass","玻璃"],["leather","皮革"],["mother-of-pearl","珍珠母"],["pearl","珍珠"],["resin","松香"],
			["rhinestone","人造钻石"],["rubber","橡胶"],["shell","贝壳"],["synthetic-resin","合成树脂"],["wood"," 木头, 木材, 木制品"],
		]),
		gem_type1([
			["NA","无"],["agate","玛瑙"],["quartz","石英"],["quartzite","石英岩"],
		]),
		variation_theme(["ColorName","StyleName","MetalType",]), variation_theme_content, color_name,
		relationship_type("Variation"), 
		main_image_url, other_image_url1, other_image_url2, other_image_url3, other_image_url4,other_image_url5,
		
		],
		
	"100":	function(){return this.field.filter(function(item){return item.spc[0]=="1"})},
	"010":	function(){return this.field.filter(function(item){return item.spc[1]=="1"})},
	"001":	function(){return this.field.filter(function(item){return item.spc[2]=="1"})},
}

var PetSupplies = exports.PetSupplies = {
	"variable":true,//parent child 
	"field":[ refer_link, item_sku, item_name, brand_name, standard_price, product_description, 
		currency,
		feed_product_type(["PetSuppliesMisc"]),
		variation_theme(["Color","SizeName","SizeNameColorName","Flavor","FlavorSize","PatternName"]), variation_theme_content,
		bullet_point1, bullet_point2, bullet_point3, bullet_point4, bullet_point5,
		generic_keywords1, generic_keywords2, generic_keywords3,generic_keywords4, generic_keywords5,
		
		target_audience_keywords1(["amphibians","birds","chinchillas","dogs","ferrets","fish","guinea-pigs","hamsters","horses","house-cats","insects","mice","rabbits","rats","reptiles"]),
		target_audience_keywords2(["amphibians","birds","chinchillas","dogs","ferrets","fish","guinea-pigs","hamsters","horses","house-cats","insects","mice","rabbits","rats","reptiles"]),
		target_audience_keywords3(["amphibians","birds","chinchillas","dogs","ferrets","fish","guinea-pigs","hamsters","horses","house-cats","insects","mice","rabbits","rats","reptiles"]),
		relationship_type("Variation"),
		quantity, size_name, color_name,
		
		item_type([
			["pet-sweaters","毛衣,运动衫"],["pet-sunglasses","眼镜"],["pet-raincoats","雨衣"],["pet-necklaces","项链"],["pet-lifejackets","夹克"],["pet-hats","帽子"],["pet-hair-accessories","头饰"],["pet-dresses","连衣裙"],["pet-coats","外套"],["pet-paw-protectors","爪子保护器"],["pet-backpacks","背包"],
			["pet-bed-blankets","床毯"],["pet-squeak-toys","发声玩具"],["pet-toys","其他(玩具)"],["pet-chew-toys","咀嚼玩具"],["pet-toy-balls","玩具球"],["pet-toy-ropes","玩具绳"],
		]),
		parent_child("parent"),
		main_image_url, other_image_url1, other_image_url2, other_image_url3, other_image_url4,other_image_url5,
		],
		
	"100":	function(){return this.field.filter(function(item){return item.spc[0]=="1"})},
	"010":	function(){return this.field.filter(function(item){return item.spc[1]=="1"})},
	"001":	function(){return this.field.filter(function(item){return item.spc[2]=="1"})},
	
}


var Clothing = exports.Clothing = {
	"variable":true,//parent child 
	"field":[ refer_link, item_sku, model, item_name, brand_name, standard_price, product_description, currency,
		department_name(["baby-boys","baby-girls","boys","girls","mens","unisex-baby","womens"]),
		variation_theme(["sizecolor"]), variation_theme_content, quantity, size_name, color_name,
		bullet_point1, bullet_point2, bullet_point3, bullet_point4, bullet_point5,
		generic_keywords1, generic_keywords2, generic_keywords3,generic_keywords4, generic_keywords5,
		item_type([
			["tights", "Tights"],["slipper-socks", "连袜便鞋"],["pantyhose", " 袜裤; 长筒袜裤"],["fashion-liner-socks", "No Show & Liner Socks"],["leg-warmers", "Leg Warmers"],["dress-socks", "Dress & Trouser Socks"], ["casual-socks", "休闲袜"], ["athletic-socks", "运动袜"],
			["infant-and-toddler-hats","Hats & Caps"],["dresses","连衣裙"],["fashion-scarves", "围巾"],
		]),
		parent_child("parent"),
		relationship_type("Variation"), 
		main_image_url, other_image_url1, other_image_url2, other_image_url3, other_image_url4,other_image_url5,
		
		],
		
	"100":	function(){return this.field.filter(function(item){return item.spc[0]=="1"})},
	"010":	function(){return this.field.filter(function(item){return item.spc[1]=="1"})},
	"001":	function(){return this.field.filter(function(item){return item.spc[2]=="1"})},
}




// class for js
// function Car(sColor,iDoors,iMpg) {
  // this.color = sColor;
  // this.doors = iDoors;
  // this.mpg = iMpg;
  // this.drivers = new Array("Mike","John");
  
  // if (typeof Car._initialized == "undefined") {
    // Car.prototype.showColor = function() {
      // alert(this.color);
    // };
	
    // Car._initialized = true;
  // }
// }