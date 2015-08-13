// var ext_keys = exports.ext_keys = ["refer_link","crt_time","update_time"];

/**
* @param type text, textarea, select, radio
* sku for example 
	"spc": "111",// single parent child 111
	"key":"item_sku",
	"en":"SKU",
	"copy":true,
	"type":"text", // text, textarea, select, hidden, 
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
}

var item_name = {
	"spc": "111",
	"edit": true,
	"key":"item_name",
	"en":"Product Name",
	"copy":true,
	"type":"text", 
}

var external_product_id = {
	"spc": "101",
	"edit": true,
	"key":"external_product_id",
	"en":"Product ID",
	"copy":false,
	"type":"text", 
}

var standard_price = {
	"spc": "101",
	"edit": true,
	"key":"standard_price",
	"en":"Standard Price",
	"copy":false,
	"type":"text", 
}

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
		"type":"select", 
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
		"type":"select", 
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
	"field":[ item_sku, item_name,external_product_id, standard_price, product_description, 
		department_name(["baby-boys","baby-girls","boys","girls","mens","unisex-baby","womens"]),
		variation_theme(["Color","Size","sizecolor"]),
		parent_child("parent"),
		relationship_type("Variation"), refer_link, 
		
		],
		
	"single":	function(){return this.field.filter(function(item){return item.spc[0]=="1"})},
	"parent":	function(){return this.field.filter(function(item){return item.spc[1]=="1"})},
	"child"	:	function(){return this.field.filter(function(item){return item.spc[2]=="1"})},
	
	"single_edit":	function(){return this.field.filter(function(item){return item.spc[0]=="1" && item.edit})},
	"parent_edit":	function(){return this.field.filter(function(item){return item.spc[1]=="1" && item.edit})},
	"child_edit"	:	function(){return this.field.filter(function(item){return item.spc[2]=="1" && item.edit})},
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