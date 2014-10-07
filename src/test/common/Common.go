package common

/**
 * Created by Zf_D on 2014-10-04
 */
import (
	"config"
	"net/http"
	"net/http/httptest"
	"github.com/astaxie/beego"
)

const (
	N int = 100 //压力测试次数
)

func init() {
	config.Init()
}

/**
	测试前调用此函数
 */
func InitTest() {
	//这是空函数，用来避免同一个包下多次初始化 config.Init()
}

/**
	测试控制器的请求
	@param arg_method {string} “POST” 或 “GET”
	@param arg_action {string} 如 “/UnitMgrCtrl/GetUnits”
	@param arg_ctrl {ControllerInterface} 如 UnitMgrCtrl
 */
func TestRouter(arg_method string, arg_action string, arg_ctrl beego.ControllerInterface) (code int) {
	r, _ := http.NewRequest(arg_method, arg_action, nil)
	w := httptest.NewRecorder()
	handler := beego.NewControllerRegister()
	handler.AddAuto(arg_ctrl)
	beego.SessionOn = false
	handler.ServeHTTP(w, r)
	code =  w.Code
	return
}
