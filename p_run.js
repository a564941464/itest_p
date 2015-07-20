var log = require("ringo/logging").getLogger(module.id);

var fs = require("fs")
var root_directory = fs.directory(module.path);

fs.changeWorkingDirectory(root_directory);

require.paths[require.paths.length] = "./action";
require.paths[require.paths.length] = "./modules";
require.paths[require.paths.length] = "./db";

var {Application} = require("stick/stick");

var app = exports.app = Application();//***********

app.configure('route');
app.configure("notfound", "mount", "static");
app.configure(require('stick/middleware/upload'));
app.configure('params');
//app.configure(require("./middleware/auth"));
app.configure('session');

app.static(module.resolve("./static"), "index.html");

var {Environment} = require('reinhardt');

var env = new Environment({
   loader: module.resolve("./template/")
});

app.get('/intro.md', require("action").intro);
app.get('/:category/category.md', require("action").category);

if (require.main === module) {
    require("ringo/httpserver").main(module.id);
}

