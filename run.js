// Stick demo app. Run with `ringo -m .. examples/demo.js` with the -m option
// pointing to the Stick parent directory.

var log = require("ringo/logging").getLogger(module.id);

var fs = require("fs")
var root_directory = fs.directory(module.path);

fs.changeWorkingDirectory(root_directory);

require.paths[require.paths.length] = "./lib"
require.paths[require.paths.length] = "./jsgi"

//log.info("./jar/fastjson-1.1.33.jar")

addToClasspath(module.resolve("./jars/fastjson-1.1.33.jar"));
addToClasspath(module.resolve("./jars/epacket-api-1.0.jar"));
addToClasspath(module.resolve("./jars/commons-codec-1.9.jar"));
addToClasspath(module.resolve("./jars/poi-3.10-FINAL-20140208.jar"));
addToClasspath(module.resolve("./jars/itextpdf-5.5.0.jar"));
addToClasspath(module.resolve("./jars/simpleitext-1.0.jar"));
addToClasspath(module.resolve("./jars/imagezoom-0.1.jar"));

var init = require("init");

//init.logisticsorders_recursive();

var utils = require("utils");
var fs = require("fs");

// log.info(fs.read("./lib/config").replace("\n",""));
// console = require("console");
// console.log(require.paths);

var {Application} = require("stick/stick"),
    {Server} = require("ringo/httpserver"),
    {Buffer} = require("ringo/buffer"),
    log = require("ringo/logging").getLogger("run.js");
    
// Our main application
var app = exports.app = Application();

// configure notfound, mount, and static middleware
app.configure('route');
app.configure("notfound", "mount", "static");
app.configure(require('stick/middleware/upload'));
app.configure('params');
app.configure(require("./middleware/auth"));
app.configure('session');

app.static(module.resolve("./static"), "index.html");

var {Environment} = require('reinhardt/reinhardt');

var env = new Environment({
   loader: module.resolve("./template/")
});

var {
	system_config_update_wuliu_data
    } = require("./action");
    
var {models} = require("./model");

// app.mount("/d/hello", dummyPage("hello world!"));

// app.mount('/hello_me', function(req) {
   // return env.renderResponse('hello.html', {
      // 'hi': "hello me! Goodmorning!"
   // })
// });

app.get('/intro.md', function(req) {
   return env.renderResponse("intro.html");
});


app.get("/:trnum/android_trnum2image_get.adr", android_trnum2image_get);
app.get('/android_trnum2image.adr', function(req) {
   return env.renderResponse("android_trnum2image.html");
});

app.get('/:html_file_pre/page.md', function(req, html_file_pre) {
   return env.renderResponse(html_file_pre + ".html");
});

app.get("/report_sale_page.md", report_sale_page);
app.get("/:cur_page_num/:start_date/:end_date/report_sale.md", report_sale);
app.get("/:cur_page_num/:query_str/report_fbarecord_query.md", report_fbarecord_query);
app.get("/:cur_page_num/report_fbarecord.md", report_fbarecord);

app.get("/:lowest_inventory/:highest_inventory/report_inventory_between_query.md", report_inventory_between_query);
app.get("/:lowest_inventory/report_inventory_query.md", report_inventory_query);
app.get("/report_inventory.md", report_inventory);
app.get("/report.md", report);

app.get("/generate_jinhuo.md", generate_jinhuo);
app.get("/:is_for_fba/:caigou_id/caigou_is_for_fba.md", caigou_is_for_fba);
app.post("/caigou_price_jisuan_yunfei_change.md", caigou_price_jisuan_yunfei_change);
app.post("/caigou_price_jisuan_amount_change.md", caigou_price_jisuan_amount_change);
app.post("/caigou_price_jisuan_unit_price_change.md", caigou_price_jisuan_unit_price_change);
app.get("/caigou_clear_caigou.md", caigou_clear_caigou);
app.get("/:caigou_id/caigou_delete_caigou.md", caigou_delete_caigou);
app.get("/:product_id/caigou_add_to_caigou.md", caigou_add_to_caigou);
app.get("/caigou.md", caigou);

app.post("/jinhuo_mark_as_jinhuowancheng.md", jinhuo_mark_as_jinhuowancheng);
app.get("/:djh_id_ref/jinhuo_mark_as_jinhuowancheng_page.md", jinhuo_mark_as_jinhuowancheng_page);
app.get("/:jinhuo_id/jinhuo_daijinhuo_delete.md", jinhuo_daijinhuo_delete);
app.get("/:jinhuo_id/jinhuo_daijinhuo_delete.md", jinhuo_daijinhuo_delete);
app.get("/jinhuo_daijinhuo_list.md", jinhuo_daijinhuo_list);
app.post("/:jinhuo_id/jinhuo_investigative_process.md", jinhuo_investigative_process);
app.get("/jinhuo_count_info.md", jinhuo_count_info);
app.get("/jinhuo_investigative_list.md", jinhuo_investigative_list);
app.post("/:jinhuo_id/jinhuo_investigative.md", jinhuo_investigative);
app.get("/:jinhuo_id/jinhuo_investigative_page.md", jinhuo_investigative_page);
app.get("/:jinhuo_id/jinhuo_remark_page.md", jinhuo_remark_page);
app.post("/:jinhuo_id/jinhuo_remark.md", jinhuo_remark);
app.get("/:code_or_sku/jinhuo_code_sku_query.md", jinhuo_code_sku_query);
app.post("/jinhuo_history_fba_daohuo_list.md", jinhuo_history_fba_daohuo_list);
app.get("/:cur_page_num/jinhuo_history_fba_daohuo_list.md", jinhuo_history_fba_daohuo_list);
app.post("/jinhuo_history_daohuo_list.md", jinhuo_history_daohuo_list);
app.get("/:cur_page_num/jinhuo_history_daohuo_list.md", jinhuo_history_daohuo_list);
app.get("/jinhuo_today_fba_daohuo_list.md", jinhuo_today_fba_daohuo_list);
app.get("/jinhuo_today_daohuo_list.md", jinhuo_today_daohuo_list);
app.post("/jinhuo_shouhuo.md", jinhuo_shouhuo);
app.get("/:jinhuo_id/jinhuo_shouhuo_page.md", jinhuo_shouhuo_page);
app.get("/jinhuo_weidaohuo_list.md", jinhuo_weidaohuo_list);
app.get("/jinhuo.md", jinhuo);

//-----------------
app.get("/user_role_auth.css", user_role_auth);

app.get("/:action/user_role_update_owner.md", user_role_update_owner);
app.post("/:user_id/user_role_display.md", user_role_display);
app.get("/:user_id/user_role_to_display.md", user_role_to_display);
app.get("/:role_id/user_role_delete_role.md", user_role_delete_role);
app.get("/:user_id/user_role_to_edit_role.md", user_role_to_edit_role);
app.post("/user_role_edit_role.md", user_role_edit_role);
app.get("/user_role_to_add_role.md", user_role_to_add_role);
app.post("/user_role_add_role.md", user_role_add_role);
app.get("/user_role_userlist.md", user_role_userlist);

//-----------------
app.get("/:user_id/user_role_to_passwd.md", user_role_to_passwd);
app.post("/user_role_passwd.md", user_role_passwd);
app.get("/:user_id/user_role_to_edit_user.md", user_role_to_edit_user);
app.get("/:user_id/user_role_to_set_role.md", user_role_to_set_role);
app.post("/user_role_set_role.md", user_role_set_role);
app.post("/user_role_edit_user.md", user_role_edit_user);
app.get("/:user_id/user_role_active_user.md", user_role_active_user);
app.get("/:user_id/user_role_delete_user.md", user_role_delete_user);
app.post("/user_role_add_user.md", user_role_add_user);
app.get("/user_role_to_add_user.md", user_role_to_add_user);
app.get("/user_role_rolelist.md", user_role_rolelist);
app.get("/user_role.md", user_role);

app.get("/tool_box_price_converter.md", tool_box_price_converter);
app.get("/tool_box_size_translate.md", tool_box_size_translate);
app.get("/tool_box.md", tool_box);

app.post("/keyword_update.md", keyword_update);
app.get("/:id/keyword_remove.md", keyword_remove);
app.get("/:id/keyword_update_page.md", keyword_update_page);
app.post("/keyword_add.md", keyword_add);
app.get("/keyword_add_page.md", keyword_add_page);
app.get("/keyword_list.md", keyword_list);

app.get("/amazon_upload.md", amazon_upload);

app.post("/android_inventory_chuli.adr", android_inventory_chuli);
app.get("/android_inventory.adr", android_inventory);

app.post("/android_eubscan_scan.adr", android_eubscan_scan);
app.get("/android_eubscan_info.adr", android_eubscan_info);
app.get("/android_eubscan.adr", android_eubscan);

app.get("/:id/eubscan_filter_logisticsorder.md", eubscan_filter_logisticsorder);
app.get("/:id/eubscan_view.md", eubscan_view);
app.post("/eubscan_append.md", eubscan_append);
app.get("/:id/eubscan_append_page.md", eubscan_append_page);
app.post("/eubscan_edit.md", eubscan_edit);
app.post("/eubscan_submit.md", eubscan_submit);
app.get("/eubscan_submit_page.md", eubscan_submit_page);
app.get("/eubscan_list.md", eubscan_list);
app.get("/:cur_page_num/eubscan_list.md", eubscan_list);
app.get("/eubscan.md", eubscan);

app.get("/:fba_tid/fba_infomation.md", fba_infomation);
app.get("/:fba_tid/fba_flyta.md", fba_flyta);
app.get("/:fba_tid/:flyt_freight_code/fba_flyta.md", fba_flyta);
app.get("/:fba_tid/fba_flyta_page.md", fba_flyta_page);
app.post("/:fba_tid/fba_customs_info.md", fba_customs_info);
app.get("/:fba_tid/fba_customs_info_page.md", fba_customs_info_page);
app.get("/:fba_tid/:pinfo_index/:actual_amount/fba_product_info_actual_amount.md", fba_product_info_actual_amount);
app.get("/:fba_tid/:pinfo_index/:actual_amount/fba_product_info_actual_amount.md", fba_product_info_actual_amount);
app.post("/fba_import_shipment.md", fba_import_shipment);
app.get("/fba_import_shipment_page.md", fba_import_shipment_page);
app.get("/:fba_id/fba_list_query.md", fba_list_query);
app.get("/:fba_epacket_id/fba_epacket_download_label.md", fba_epacket_download_label);
app.get("/:fba_epacket_id/fba_epacket_generate_label.md", fba_epacket_generate_label);
app.get("/:fba_epacket_id/fba_epacket_edit_page.md", fba_epacket_edit_page);
app.post("/:fba_epacket_id/fba_epacket_edit.md", fba_epacket_edit);
app.post("/fba_epacket_delete.md", fba_epacket_delete);
app.post("/fba_epacket_add.md", fba_epacket_add);
app.get("/fba_epacket_add_page.md", fba_epacket_add_page);
app.get("/:cur_page_num/fba_epacket_list.md", fba_epacket_list);
app.post("/fba_delete.md", fba_delete);
app.get("/:id/fba_pklabel_download.md", fba_pklabel_download);
app.post("/:fba_t_id/fba_pklabel_upload.md", fba_pklabel_upload);
app.get("/:fba_t_id/fba_pklabel_page.md", fba_pklabel_page);
app.get("/fba_pre_clear.md", fba_pre_clear);
app.get("/:product_id/fba_pre_del.md", fba_pre_del);
app.get("/fba_pre_products.md", fba_pre_products);
app.get("/:product_id/fba_pre_add.md", fba_pre_add);
app.get("/:id/fba_track.md", fba_track);
app.get("/:id/fba_print_peihuodan.md", fba_print_peihuodan);
app.get("/:id/fba_kucun_jiaozhun.md", fba_kucun_jiaozhun);
app.get("/:id/fba_product_info.md", fba_product_info);
app.get("/:id/fba_label_download.md", fba_label_download);
app.post("/fba_edit.md", fba_edit);
app.get("/fba.md", fba);
app.get("/fba_label.md", fba_label);
app.get("/fba_list.md", fba_list);
app.get("/:cur_page_num/fba_list.md", fba_list);

app.get("/:filetransform_id/:which/download.xls", download);
app.mount("/amz2eubfile.md", amz2eubfile);
app.mount("/eub2amzfile.md", eub2amzfile);
app.mount("/filetransform_load.md", filetransform_load);
app.mount("/filetransform.md", filetransform);
app.post("/eub2amz.txt", eub2amz);
app.post("/amz2eub.xls", amz2eub);

app.get("/system_config_update_wuliu_data.md", system_config_update_wuliu_data);
app.get("/:config_name/config.md", config);
app.get("/general_config.md", general_config);
app.post("/system_config_update.md", system_config_update);
app.get("/category_config.md", category_config);
app.get("/system_config.md", system_config);
app.get("/account_config.md", account_config);

app.get("/login_user_display_name.md", login_user_display_name);
app.get("/", to_login);
app.get("/index.html", to_login);
app.get("/:redirect_path/index.html", to_login);
app.post("/login.in", login);
app.get("/logout.out", logout);

app.get("/:product_id/product_get.md", product_get);
app.get("/:product_id/:page/product_get.md", product_get);
app.post("/product_quick_add.md", product_quick_add);

app.get("/:product_id/product_yjinhuo_record.md", product_yjinhuo_record);
app.get("/:product_id/product_image_update_result.md", product_image_update_result);
app.get("/:product_id/product_image_update_page.md", product_image_update_page);
app.post("/product_image_update.md", product_image_update);
app.get("/:coder_or_sku/product_image_from.md", product_image_from);
//app.get("/:sku/product_image_from.md", product_image_from);
app.get("/:id/product_supplier_info.md", product_supplier_info);

app.get("/:id/product_mark_as_daijinhuo_page.md", product_mark_as_daijinhuo_page);
app.post("/product_mark_as_daijinhuo.md", product_mark_as_daijinhuo);

app.get("/:id/product_mark_as_yijinhuo_page.md", product_mark_as_yijinhuo_page);
app.post("/product_mark_as_yijinhuo.md", product_mark_as_yijinhuo);
app.get("/:cur_page_num/product_quehuo_list.md", product_quehuo_list);
app.get("/product_quehuo_list.md", product_quehuo_list);
app.post("/product_partial_edit.md", product_partial_edit);
app.mount("/product_category_change.md", product_category_change);
app.get("/:id/:status/product_set_ok_pic_status.md", product_set_ok_pic_status);
app.post("/product_combinate.md", product_combinate);
app.get("/product_print_label.md/:product_code/:label_amount", product_print_label);
app.get("/product_print_fba_product_label.md/:product_id/:label_amount", product_print_fba_product_label);
app.get("/:cur_page_num/product_list.md", product_list);
app.mount("/product_list.md", product_list);
app.post("/product_amount_add.md", product_amount_add);
app.get("/ptoadd.md", ptoadd);
app.post("/product_add.md", product_add);
app.get("/pdel.md/:product_id", pdel);
app.get("/ptoupdate.md/:product_id", ptoupdate);
app.post("/product_update.md", product_update);
app.post("/product_quehuo_search.md", product_quehuo_search);
app.get("/:cur_page_num/:query_str/product_quehuo_search.md", product_quehuo_search);
app.post("/psearch.md", psearch);
app.get("/:cur_page_num/:query_str/psearch.md", psearch);

app.mount("/slist.md", slist);
app.get("/supplier_product_list.md/:supplier_id", supplier_product_list);
app.get("/sdel.md/:supplier_id", sdel);
app.get("/stoupdate.md/:supplier_id", stoupdate);
app.post("/supdate.md", supdate);
app.post("/sadd.md", sadd);
app.get("/stoadd.md", stoadd);
app.post("/scombinate.md", scombinate);
app.get("/splistinner.md/:supplier_id", splistinner);

app.post("/label_bat_download.md", label_bat_download);
app.get("/amz_track_num_download.md/:orderfile_id", amz_track_num_download);
app.get("/amz_track_num.md", amz_track_num);

app.get("/:status/logisticsorder_count.md", logisticsorder_count);
app.get("/:logisticsorder_id/order_deal_logisticsorder_info.md", order_deal_logisticsorder_info);
app.post("/:logisticsorder_id/order_deal_logisticsorder_remark_action.md", order_deal_logisticsorder_remark_action);
app.get("/:logisticsorder_id/order_deal_logisticsorder_remark_page.md", order_deal_logisticsorder_remark_page);

app.get("/:logisticsorder_id/order_deal_mistake_restore.md", order_deal_mistake_restore);
app.get("/:logisticsorder_id/order_deal_marked_as_quehuo.md", order_deal_marked_as_quehuo);
app.get("/:logisticsorder_id/order_deal_investigative_restore_page.md", order_deal_investigative_restore_page);
app.get("/:logisticsorder_id/order_deal_cancel_action_page.md", order_deal_cancel_action_page);
app.post("/:logisticsorder_id/order_deal_investigative_restore_action.md", order_deal_investigative_restore_action);
app.post("/:logisticsorder_id/order_deal_investigative_action.md", order_deal_investigative_action);
app.get("/:logisticsorder_id/order_deal_investigative_action_page.md", order_deal_investigative_action_page);
app.get("/:cur_page_num/order_deal_investigative_list.md", order_deal_investigative_list);
app.get("/:cur_page_num/:start_date/:end_date/:sku_or_code/order_deal_sku_code_search.md", order_deal_sku_code_search);
app.post("/order_deal_sku_code_search.md", order_deal_sku_code_search);
app.get("/:order_ids/order_deal_download_amazon_unshipped_txt.md", order_deal_download_amazon_unshipped_txt);
app.get("/:by_seller_account_id/:by_date/amz_track_num_by_date.md", amz_track_num_by_date);
app.get("/:order_num/re_generate_logisticsorder.md", re_generate_logisticsorder);
app.get("/quehuo_logisticsorder_list.md", quehuo_logisticsorder_list);
app.get("/:id/order_remove.md", order_remove);
app.get("/:id/logisticsorder_remove.md", logisticsorder_remove);
app.get("/:timeout_days/logisticsorder_list_of_timeout.md", logisticsorder_list_of_timeout);
app.get("/not_us_order_list.md", not_us_order_list);
app.get("/:cur_page_num/not_us_history_order_list.md", not_us_history_order_list);
app.get("/not_us_history_order_list.md", not_us_history_order_list);
app.post("/order_deal_order_edit_action.md", order_deal_order_edit_action);
app.get("/:id/order_deal_order_edit_action_page.md", order_deal_order_edit_action_page);
app.post("/order_deal_not_eub_action.md", order_deal_not_eub_action);
app.get("/:id/order_deal_not_eub_action_page.md", order_deal_not_eub_action_page);
app.get("/:cur_page_num/history_order_list.md", history_order_list);
app.get("/history_order_list.md", history_order_list);
app.post("/order_deal_luru.md", order_deal_luru);
app.get("/order_deal_luru_page.md", order_deal_luru_page);
app.get("/:query_str/order_deal_search.md", order_deal_search);
app.post("/order_deal_fendan_action.md", order_deal_fendan_action);
app.get("/:id/order_deal_fendan_action_page.md", order_deal_fendan_action_page);
app.post("/order_deal_bu3fa_action.md", order_deal_bu3fa_action);
app.get("/:id/order_deal_bu3fa_action_page.md", order_deal_bu3fa_action_page);
app.post("/order_deal_fba_action.md", order_deal_fba_action);
app.get("/:id/order_deal_fba_action_page.md", order_deal_fba_action_page);
app.post("/:id/order_deal_cancel_logisticsorder.md", order_deal_cancel_logisticsorder);
app.get("/:cur_page_num/order_deal_fendan_list.md", order_deal_fendan_list);
app.get("/:cur_page_num/order_deal_bu3fa_list.md", order_deal_bu3fa_list);
app.get("/:cur_page_num/order_deal_cancel_list.md", order_deal_cancel_list);
app.get("/:cur_page_num/order_deal_fba_list.md", order_deal_fba_list);
app.get("/count_info.md", count_info);
app.get("/querenjiaoyun_list.md", querenjiaoyun_list);
app.get("/yijiaoyun_list.md", yijiaoyun_list);
app.get("/:cur_page_num/querenjiaoyun_list.md", querenjiaoyun_list);
app.get("/:cur_page_num/yijiaoyun_list.md", yijiaoyun_list);
app.get("/printed_list.md", printed_list);
app.get("/:cur_page_num/printed_list.md", printed_list);
app.post("/printed.md", printed);
app.post("/jiaoyun.md", jiaoyun);
app.get("/filtered_logisticsorder_list.md", filtered_logisticsorder_list);
app.get("/filter_logisticsorder.md", filter_logisticsorder);
app.get("/generate_logisticsorder_json.md/:order_id", generate_logisticsorder_json);
app.get("/generate_logisticsorder.md/:order_id", generate_logisticsorder);
app.get("/logisticsorder_list.md", logisticsorder_list);
app.get("/order_list.md", order_list);
app.get("/generate_orders.md/:orderfile_id", generate_orders);
app.get("/file_list.md", file_list);
app.get("/order_page.md", order_page);
app.post("/file_import.md", file_import);
app.get("/:action/order_deal.md", order_deal);

app.get("/:cur_page_num/:cur_category_id/:query_str/category_v2_search.md", category_v2_search);
app.get("/category_v2_menu_list.md", category_v2_menu_list);
app.post("/category_v2_add.md", category_v2_add);
app.post("/category_v2_edit.md", category_v2_edit);
app.get("/:cur_page_num/:category_id/category_v2_product.md", category_v2_product);
app.mount("/category_v2.md", category_v2);

app.get("/:action/category_update_product_category.md", category_update_product_category);
app.get("/category_generate_customes_info.md", category_generate_customes_info);
app.mount("/clist.md", clist);
app.get("/cdel.md/:category_id", cdel);
app.get("/ctoadd.md", ctoadd);
app.get("/ctoupdate.md/:category_id", ctoupdate);
app.post("/category_add.md", category_add);
app.post("/category_update.md", category_update);

// helper for creating simple dummy pages
function dummyPage(text) {
    return function(req) {
        log.info(text);
        return { status: 200,
                 headers: {"Content-Type": "text/html"},
                 body: new Buffer("<html><body>", text, "</body></html>") };
    }
}

// start server if run as main script
if (require.main === module) {
    require("ringo/httpserver").main(module.id);
}

