var log = require("ringo/logging").getLogger(module.id);

var fs = require("fs")
var root_directory = fs.directory(module.path);

fs.changeWorkingDirectory(root_directory);

require.paths[require.paths.length] = "./action";
require.paths[require.paths.length] = "./modules";
require.paths[require.paths.length] = "./db";
require.paths[require.paths.length] = "./middleware";

var {Application} = require("stick/stick");

var app = exports.app = Application();//***********

app.configure('route');
app.configure("notfound", "mount", "static");
app.configure(require('stick/middleware/upload'));
app.configure('params');
app.configure(require("auth"));
app.configure('session');

app.static(module.resolve("./static"), "index.html");

var {Environment} = require('reinhardt');

var env = new Environment({
   loader: module.resolve("./template/")
});

var login = require("login");
var category = require("category");
var user_role = require("user_role");

app.get("/:category/:json_product_ids/get_inventory_file.md", category.get_inventory_file);

app.get("/:category/:product_id/:spc/copy_product_page.md", category.copy_product_page);
app.post("/update_product.md", category.update_product);
app.get("/:category/:product_id/update_product_page.md", category.update_product_page);

app.post("/:category/child_products_complete.md", category.child_products_complete);
app.get("/:category/:parent_product_id/child_products_complete_page.md", category.child_products_complete_page);

app.get("/:category/:product_id/delete_product.md", category.delete_product);
app.post("/add_product.md", category.add_product);

app.get("/:category/add_product_page.md", category.add_product_page);
app.get('/:category/category.md', category.category);
app.get('/:category/:cur_page_num/category.md', category.category);
app.get('/intro.md', category.intro);


app.post("/set_role.md", user_role.set_role);
app.get("/:user_id/to_set_role.md", user_role.to_set_role);
app.post("/user_passwd.md", user_role.user_passwd);
app.get("/:user_id/user_to_passwd.md", user_role.user_to_passwd);
app.get("/:user_id/user_inactive.md", user_role.user_inactive);
app.get("/:user_id/user_active.md", user_role.user_active);
app.post("/add_user.md", user_role.add_user);
app.get("/user_list.md", user_role.user_list);
app.get("/role_list.md", user_role.role_list);
app.get("/user_role.md", user_role.user_role);

app.post("/login.in", login.login);
app.get("/logout.out", login.logout);
app.get("/", login.to_login);
app.get("/login_user_display_name.md", login.login_user_display_name);
app.get("/index.html", login.to_login);

if (require.main === module) {
    require("ringo/httpserver").main(module.id);
}

