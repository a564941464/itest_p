
// var mongo = require('ringo-mongodb');
// var client = new mongo.MongoClient('localhost', 27017);
// var db = client.getDB('test_database');

var db = exports.db = require('mongodb/mongodb').connect('mongodb://localhost/ListingBuilder');

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
