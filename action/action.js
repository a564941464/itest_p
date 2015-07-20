var log = require("ringo/logging").getLogger(module.id);
var {Environment} = require('reinhardt');

var env = new Environment({
   loader: module.resolve("../template/")
});

var db = require('db').db;

exports.category = function(req, category) {
	db.getCollectionNames().forEach(function(dbname) {
		console.log(dbname);
	});
	var col = db.getCollection('Clothing');
	col.count();

	log.info(JSON.stringify(col.findOne().toJSON()));

	var col2 = db.getCollection('Clothing');
	var curi = col2.find();
	//log.info(curi.hasNext());
	
	var  arr = curi.toArray();
	arr.forEach(function(item){
		log.info(item);
	});
	return env.renderResponse("category.html",{
	   collections:arr,
	   category:category,
	   
	});
}
exports.intro = function(req) {
   var coll_names = db.getCollectionNames();
   return env.renderResponse("intro.html",{
	   coll_names:coll_names,
	   
   });
}
