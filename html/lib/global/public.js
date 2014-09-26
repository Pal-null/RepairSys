/**
 * Created by Zf_D on 2014-09-26
 */

//左边菜单激活状态
function menuOnClick(arg_index) {
    $('.part a').removeClass('cur');
    $('.part a').eq(arg_index).addClass('cur');
};