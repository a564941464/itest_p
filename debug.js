var log = require("ringo/logging").getLogger(module.id);

require.paths[require.paths.length] = "./db";
require.paths[require.paths.length] = "./modules";

var response = require('ringo/jsgi/response');
var strings = require("ringo/utils/strings");
var db = require('db');
var utils = require('utils');

var users = db.all('User');

var userlist = [
{
        "_id" : "1415649380023",
        "is_super" : "true",
        "display_name" : "胡静",
        "permissions" : [
                "edit"
        ],
        "categories" : [
                "Health",
                "Watches",
                "Beauty",
                "Clothing",
                "Outdoors",
                "Office",
                "FoodAndBeverages",
                "Toys",
                "Baby"
        ],
        "login_name" : "hujing",
        "password" : "Tao5180&"
},
{
        "_id" : "1415649950130",
        "is_super" : "true",
        "display_name" : "甜总",
        "permissions" : [
                "edit",
                "download",
                "user_manage"
        ],
        "categories" : [
                "Health",
                "Watches",
                "Beauty"
        ],
        "login_name" : "admin",
        "password" : "6BD47943EC81BEFD10D54E87C086752C"
},
{
        "_id" : "1420705774097",
        "is_super" : "false",
        "display_name" : "马姐",
        "permissions" : [
                "edit",
                "download"
        ],
        "categories" : [
                "Watches",
                "Clothing",
                "Home"
        ],
        "login_name" : "mfy",
        "password" : "123456"
},
{
        "_id" : "1426222181601",
        "is_super" : "false",
        "display_name" : "小七",
        "permissions" : [
                "edit"
        ],
        "categories" : [
                "Clothing"
        ],
        "login_name" : "seven",
        "password" : "123456"
},
{
        "_id" : "1422344079466",
        "is_super" : "false",
        "display_name" : "莉莉",
        "permissions" : [
                "edit"
        ],
        "categories" : [
                "Watches",
                "Clothing"
        ],
        "login_name" : "lili",
        "password" : "123456"
},
{
        "_id" : "1427961469361",
        "is_super" : "false",
        "display_name" : "小青",
        "permissions" : [
                "edit"
        ],
        "categories" : [
                "Clothing"
        ],
        "login_name" : "xiaoqing",
        "password" : "sdfwg"
},
{
        "_id" : "1434105113953",
        "display_name" : "鬼",
        "permissions" : [
                "edit",
                "download",
                "user_manage"
        ],
        "categories" : [ ],
        "is_super" : "true",
        "login_name" : "hujianwei",
        "password" : "tao7562&"
}
]
userlist.forEach(function(item){
    item.crt_time = utils.cur_time();
	var save_login_password = strings.digest(item.login_password + item.crt_time, "md5");
    item.login_password = save_login_password,
    item.is_super = true;
	item.is_enabled = true;
	item.last_login_time = utils.cur_time();
    
	db.save("User", item);
	// db.remove("User", item);
})