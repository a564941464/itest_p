// var ext_keys = exports.ext_keys = ["refer_link","crt_time","update_time"];

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
	"edit": true,
	"key":"item_sku",
	"en":"SKU",
	"copy":true,
	"type":"text", 
}//item_sku

var item_name = {
	"spc": "111",
	"edit": true,
	"key":"item_name",
	"en":"Product Name",
	"copy":true,
	"type":"text", 
}//item_name

var brand_name = {
	"spc": "111",
	"edit": true,
	"key":"brand_name",
	"en":"Brand Name",
	"copy":true,
	"type":"text", 
}//brand_name

var external_product_id = {
	"spc": "101",
	"edit": true,
	"key":"external_product_id",
	"en":"Product ID",
	"copy":false,
	"type":"text", 
}//external_product_id

var external_product_id_type = {
	"spc": "101",
	"edit": true,
	"key":"external_product_id_type",
	"en":"Product ID Type",
	"copy":false,
	"type":"select_1", 
	"values":['UPC'],
}//external_product_id_type

var item_type = function(valid_values){
	return {
		"spc": "111",
		"edit": true,
		"key":"item_type",
		"en":"Item Type Keyword",
		"copy":false,
		"type":"select_2", 
		"values":valid_values,
	}
}//item_type

var standard_price = {
	"spc": "101",
	"edit": true,
	"key":"standard_price",
	"en":"Standard Price",
	"copy":false,
	"type":"text", 
}//standard_price

var quantity = {
	"spc": "101",
	"edit": true,
	"key":"quantity",
	"en":"Quantity",
	"copy":true,
	"type":"text", 
	"value":30,
}//quantity

var bullet_point1 = {
	"spc": "111",
	"edit": true,
	"key":"bullet_point1",
	"en":"Key Product Features1",
	"copy":true,
	"type":"text", 
}//bullet_point1

var bullet_point2 = {
	"spc": "111",
	"edit": true,
	"key":"bullet_point2",
	"en":"Key Product Features2",
	"copy":true,
	"type":"text", 
}//bullet_point2

var bullet_point3 = {
	"spc": "111",
	"edit": true,
	"key":"bullet_point3",
	"en":"Key Product Features3",
	"copy":true,
	"type":"text", 
}//bullet_point3

var bullet_point4 = {
	"spc": "111",
	"edit": true,
	"key":"bullet_point4",
	"en":"Key Product Features4",
	"copy":true,
	"type":"text", 
}//bullet_point4

var bullet_point5 = {
	"spc": "111",
	"edit": true,
	"key":"bullet_point5",
	"en":"Key Product Features5",
	"copy":true,
	"type":"text", 
}//bullet_point5

var generic_keywords1 = {
	"spc": "111",
	"edit": true,
	"key":"generic_keywords1",
	"en":"Search Terms1",
	"copy":true,
	"type":"text", 
}//generic_keywords1

var generic_keywords2 = {
	"spc": "111",
	"edit": true,
	"key":"generic_keywords2",
	"en":"Search Terms2",
	"copy":true,
	"type":"text", 
}//generic_keywords2

var generic_keywords3 = {
	"spc": "111",
	"edit": true,
	"key":"generic_keywords3",
	"en":"Search Terms3",
	"copy":true,
	"type":"text", 
}//generic_keywords3

var generic_keywords4 = {
	"spc": "111",
	"edit": true,
	"key":"generic_keywords4",
	"en":"Search Terms4",
	"copy":true,
	"type":"text", 
}//generic_keywords4

var generic_keywords5 = {
	"spc": "111",
	"edit": true,
	"key":"generic_keywords5",
	"en":"Search Terms5",
	"copy":true,
	"type":"text", 
}//generic_keywords5

var main_image_url = {
	"spc": "111",
	"edit": true,
	"key":"main_image_url",
	"en":"Main Image URL",
	"copy":true,
	"type":"text", 
}//main_image_url

var other_image_url1 = {
	"spc": "111",
	"edit": true,
	"key":"other_image_url1",
	"en":"Other Image URL1",
	"copy":true,
	"type":"text", 
}//other_image_url1

var size_name = {
	"spc": "101",
	"edit": true,
	"key":"size_name",
	"en":"Size",
	"copy":false,
	"type":"text", 
}//size_name

var color_name = {
	"spc": "101",
	"edit": true,
	"key":"color_name",
	"en":"Colour",
	"copy":false,
	"type":"text", 
}//color_name

var other_image_url2 = {
	"spc": "111",
	"edit": true,
	"key":"other_image_url2",
	"en":"Other Image URL2",
	"copy":true,
	"type":"text", 
}//other_image_url2

var product_description = {
	"spc": "111",
	"edit": true,
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

var department_name = function(valid_values) {
	return {
		"spc": "111",
		"edit": true,
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
		"edit": false,
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
		"edit": false,
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
		"edit": false,
		"key":"relationship_type",
		"en":"Relationship Type",
		"copy":true,
		"type":"hidden", 
		"value": value, 
	}
}//relationship_type


var refer_link = {
	"spc": "111",
	"edit": true,
	"key":"refer_link",
	"en":"Product Link",
	"copy":false,
	"type":"text", 
}//refer_link

var Clothing = exports.Clothing = {
	"variable":true,//parent child 
	"field":[ item_sku, item_name, brand_name, external_product_id, external_product_id_type, standard_price, product_description, 
		department_name(["baby-boys","baby-girls","boys","girls","mens","unisex-baby","womens"]),
		variation_theme(["Color","Size","sizecolor"]),quantity, size_name, color_name,
		bullet_point1, bullet_point2, bullet_point3, bullet_point4, bullet_point5,
		main_image_url, other_image_url1, other_image_url2,
		generic_keywords1, generic_keywords2, generic_keywords3,generic_keywords4, generic_keywords5,
		item_type([
			["infant-and-toddler-hats","Hats & Caps"],["dresses","Dresses"],
		]),
		parent_child("parent"),
		relationship_type("Variation"), refer_link, 
		
		],
		
	"single":	function(){return this.field.filter(function(item){return item.spc[0]=="1"})},
	"parent":	function(){return this.field.filter(function(item){return item.spc[1]=="1"})},
	"child"	:	function(){return this.field.filter(function(item){return item.spc[2]=="1"})},
	
	"single_edit":	function(){return this.field.filter(function(item){return item.spc[0]=="1" && item.edit})},
	"parent_edit":	function(){return this.field.filter(function(item){return item.spc[1]=="1" && item.edit})},
	"child_edit"	:function(){return this.field.filter(function(item){return item.spc[2]=="1" && item.edit})},
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