// var ext_keys = exports.ext_keys = ["refer_link","crt_time","update_time"];
var vtmap = exports.vtmap =  {
	'sizecolor':['size_name','color_name'],
	'SizeNameColorName':['size_name','color_name'],
	'Color':['color_name'],
	'Size':['size_name'],
	'SizeName':['size_name'],
	'Style':['style_name'],
	'Flavor':['flavor_name'],
	'FlavorSize':['flavor_name','size_name'],
	'PatternName':['pattern_name'],
	
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
	"type":"select_2", 
	"values":[['UPC','UPC']],
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
	"spc": "101",
	"edit": "",
	"key":"standard_price",
	"en":"Standard Price",
	"copy":false,
	"type":"text", 
}//standard_price

var quantity = {
	"spc": "101",
	"edit": "",
	"key":"quantity",
	"en":"Quantity",
	"copy":true,
	"type":"text", 
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

var feed_product_type = function(value){
	return {
		"spc": "111",
		"edit": "disabled",
		"key":"feed_product_type",
		"en":"Product Type",
		"copy":true,
		"type":"hidden", 
		"value":value, 
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

var PetSupplies = exports.PetSupplies = {
	"variable":true,//parent child 
	"field":[ refer_link, item_sku, item_name, brand_name, external_product_id, external_product_id_type, standard_price, product_description, 
		
		feed_product_type("PetSuppliesMisc"),
		variation_theme(["Color","SizeName","SizeNameColorName","Flavor","FlavorSize","PatternName"]), variation_theme_content,
		bullet_point1, bullet_point2, bullet_point3, bullet_point4, bullet_point5,
		generic_keywords1, generic_keywords2, generic_keywords3,generic_keywords4, generic_keywords5,
		
		target_audience_keywords1(["amphibians","birds","chinchillas","dogs","ferrets","fish","guinea-pigs","hamsters","horses","house-cats","insects","mice","rabbits","rats","reptiles"]),
		target_audience_keywords2(["amphibians","birds","chinchillas","dogs","ferrets","fish","guinea-pigs","hamsters","horses","house-cats","insects","mice","rabbits","rats","reptiles"]),
		target_audience_keywords3(["amphibians","birds","chinchillas","dogs","ferrets","fish","guinea-pigs","hamsters","horses","house-cats","insects","mice","rabbits","rats","reptiles"]),
		relationship_type("Variation"),
		quantity, size_name, color_name,
		
		item_type([
			["pet-bed-blankets","Bed Blankets"],["pet-squeak-toys","Squeak Toys"],["pet-toys","Other (Toys)"],["pet-chew-toys","Chew Toys"],["pet-toy-balls","Balls"],["pet-toy-ropes","Ropes"],
		]),
		parent_child("parent"),
		main_image_url, other_image_url1, other_image_url2, other_image_url3, other_image_url4,other_image_url5,
		],
		
	"single":	function(){return this.field.filter(function(item){return item.spc[0]=="1"})},
	"parent":	function(){return this.field.filter(function(item){return item.spc[1]=="1"})},
	"child"	:	function(){return this.field.filter(function(item){return item.spc[2]=="1"})},
	
	"single_edit":	function(){return this.field.filter(function(item){return item.spc[0]=="1" && item.edit})},
	"parent_edit":	function(){return this.field.filter(function(item){return item.spc[1]=="1" && item.edit})},
	"child_edit"	:function(){return this.field.filter(function(item){return item.spc[2]=="1" && item.edit})},
}


var Clothing = exports.Clothing = {
	"variable":true,//parent child 
	"field":[ item_sku, item_name, brand_name, external_product_id, external_product_id_type, standard_price, product_description, 
		department_name(["baby-boys","baby-girls","boys","girls","mens","unisex-baby","womens"]),
		variation_theme(["sizecolor"]), variation_theme_content, quantity, size_name, color_name,
		bullet_point1, bullet_point2, bullet_point3, bullet_point4, bullet_point5,
		generic_keywords1, generic_keywords2, generic_keywords3,generic_keywords4, generic_keywords5,
		item_type([
			["infant-and-toddler-hats","Hats & Caps"],["dresses","Dresses"],["fashion-scarves", "Scarves"],
		]),
		parent_child("parent"),
		relationship_type("Variation"), refer_link, 
		main_image_url, other_image_url1, other_image_url2, other_image_url3, other_image_url4,other_image_url5,
		
		],
		
	"100":	function(){return this.field.filter(function(item){return item.spc[0]=="1"})},
	"010":	function(){return this.field.filter(function(item){return item.spc[1]=="1"})},
	"001"	:	function(){return this.field.filter(function(item){return item.spc[2]=="1"})},
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