/**
 * Created by Zf_D on 2014-09-30
 */

/**
 * 菜单点击状态
 * @param arg_index 左边第几个菜单，从0开始
 */
function menuOnClick(arg_index) {
    $('.part a').removeClass('cur');
    $('.part a').eq(arg_index).addClass('cur');
};

/**
 * 注销函数
 */
function logOff() {
    //...
}

/**
 * 信息提示
 * @param arg_text 需要显示的提示内容
 * @param arg_type 提示内容的种类（success, warn, info, error）
 */
function showMsg(arg_text, arg_type) {
    switch (arg_type) {
        //顶部消息提示
        case "success":
            binApp.alert(arg_text, {action:"top"});
            break;
        case "warn":
            binApp.alert("<font color='darkorange'>"+arg_text+"</font>", {action:"top"});
            break;
        //中间消息确认
        case "info":
            binApp.confirm(arg_text, {confirmHdStr:'温馨提示',action:'scale', maskColor:'white'});
            break;
        case "error":
            binApp.confirm("<font color='red'>"+arg_text+"</font>", {confirmHdStr:'错误提示',action:'scale', maskColor:'white'});
            break;
        default :
            binApp.alert(arg_text, {action:"top"});
    }
}
