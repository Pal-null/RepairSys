/**
 * Created by admin on 2014-09-30
 */

/**
 * 改变菜单状态
 * @param arg_index {int} 左边第几个菜单，从0开始
 */
function menuOnClick(arg_index) {
    binApp.tips.$events = {};//清除binApp的事件队列
    $('.part a').removeClass('cur');
    $('.part a').eq(arg_index).addClass('cur');
}

/**
 * 注销
 */
function logOff() {
    //...
}

/**
 * 信息提示
 * @param arg_text {string} 需要显示的提示内容
 * @param arg_type {string} 提示内容的种类（success, warn, info, error）
 * @param arg_callBack {function} 点击确定后的回调函数 （type = info 或 error 时，可用）
 */
function showMsg(arg_text, arg_type, arg_callBack) {
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
            binApp.confirm(arg_text, {confirmHdStr:'温馨提示',action:'scale', maskColor:'white'}, arg_callBack);
            break;
        case "error":
            binApp.confirm("<font color='red'>"+arg_text+"</font>", {confirmHdStr:'错误提示',action:'scale', maskColor:'white'}, arg_callBack);
            break;
        default :
            binApp.alert(arg_text, {action:"top"});
    }
}

/**
 * 错误处理
 * 用户状态已注销
 */
function sessionOut() {
    //直接返回首页
}

/**
 * 错误处理
 * 断网请求发送失败
 */
function actionError() {
    showMsg("网络异常，请重试", "error");
}