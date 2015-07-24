var log = require("ringo/logging").getLogger(module.id);

// var mongo = require('ringo-mongodb');
// var client = new mongo.MongoClient('localhost', 27017);
// var db = client.getDB('test_database');

var db = exports.db = require('mongodb/mongodb').connect('mongodb://localhost/ListingBuilder');

var update = exports.update   = function(collection_name, object){
	var col = db.getCollection(collection_name);	
	col.update({"_id":object._id},  {$set:object});
}

var save = exports.save   = function(collection_name, object){
	var col = db.getCollection(collection_name);
	var existed = find_one({"_id":object._id});
	if(existed){
		col.update({"_id":object._id},  {$set:object});
	}else{
		col.insert(object);
	}
}
/**
* @param query json 
*/
var find_one = exports.find_one   = function(collection_name, query){
	var col = db.getCollection(collection_name);
	var mdoc  = col.findOne (query);
	if(mdoc){
		log.info(mdoc.toJSON())
		return JSON.parse(mdoc.toJSON());
	}else{
		return null;
	}
}

var all = exports.all = function(collection_name){
	var col = db.getCollection(collection_name);
	var curi = col.find();
	
	var  objects = curi.toArray().map(function(item){
		return JSON.parse(item.toJSON());
	});
	return objects;
}
	

var health = exports.health = db.getCollection('Health');
var watches = exports.watches = db.getCollection('Watches');
var beauty = exports.beauty = db.getCollection('Beauty');
var clothing = exports.clothing = db.getCollection('Clothing');
var outdoors = exports.outdoors = db.getCollection('Outdoors');
var office = exports.office = db.getCollection('Office');
var foodandbeverages = exports.foodandbeverages = db.getCollection('FoodAndBeverages');
var home = exports.home = db.getCollection('Home');
var toys = exports.toys = db.getCollection('Toys');
var baby = exports.baby = db.getCollection('Baby');

var follow_ads = exports.follow_ads = db.getCollection('Follow_Ads');
var shippingfees = exports.shippingfees = db.getCollection('ShippingFees');
var user = exports.user = db.getCollection('User');
