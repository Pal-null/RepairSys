package demo

import (
	. "controllers/common"
	"github.com/astaxie/beego"
	"logger"
	"models"
)

// 控制器声明
// 声明一个路由
type DemoCtrl struct {
	beego.Controller
}

//每个请求都会先进来这里
//func (this *DemoCtrl) Prepare() {
//	// 获取前台传过来的数据
//	id, _ := this.GetInt("Id")
//	name := this.GetString("Name")
//	logger.Debug(id, name)
//
//	if name == "end" {
//		OutData(this.Ctx.ResponseWriter, "ok", nil)
//		//终止这个请求
//		this.StopRun()
//	}
//}

// 控制器处理
// 添加 - Post
func (this *DemoCtrl) AddDemo_Post() {
	logger.Debug("--")
	// 参数处理及参数检测
	name := this.GetString("Name")
	// 处理添加事件
	result, _ := AddDemoHandle(name)
	// 将数据返回前台
	OutputJson(this.Ctx.ResponseWriter, result)
}

// 删除 - Post
func (this *DemoCtrl) DeleteDemo_Post() {
	logger.Debug("DeleteDemo")
	// 获取前台传过来的数据
	id, _ := this.GetInt("Id")
	// 可添加参数检测。。。。。
	// 处理删除事件
	result, _ := DeleteDemoHandle(id)
	// 将数据返回前台
	OutputJson(this.Ctx.ResponseWriter, result)
}

// 修改 - Post
func (this *DemoCtrl) UpdateDemo_Post() {
	logger.Debug("UpdateDemo")
	// 获取前台传过来的数据
	id, _ := this.GetInt("Id")
	name := this.GetString("Name")
	// 处理更新数据事件
	result, _ := UpdateDemoHandle(id, name)
	// 将数据返回前台
	OutputJson(this.Ctx.ResponseWriter, result)
}

// 搜索 - Get
func (this *DemoCtrl) SearchDemo_Get() {
	logger.Debug("SearchDemo")
	// 声明返回前台的数据
	// 处理获取数据事件
	result, _ := SearcherDemoHandle()
	// 将数据返回前台
	OutputJson(this.Ctx.ResponseWriter, result)
}

// 处理函数
// 删除 - 处理函数
func DeleteDemoHandle(id int64) (result Result, err error) {
	user := models.User{
		Id: id,
	}
	if user.DeleteUser() != nil {
		result.Reason = "error"
		return
	}
	result.IsSuccess = true
	return
}

// 更新 - 处理函数
func UpdateDemoHandle(id int64, name string) (result Result , err error) {
	user := models.User{
		Id:   id,
		Name: name,
	}
	err = user.UpdateUser()
	if err == nil {
		result.IsSuccess = true
	}else {
		result.Reason = "error"
	}
	return
}

// 搜索 - 处理函数
func SearcherDemoHandle() (result Result, err error) {
	data := make(map[string]interface{})
	data["users"], err = models.SearcherUser()
	result.Data = data
	if err == nil {
		result.IsSuccess = true
	}else {
		result.Reason = "error"
	}
	return
}

// 添加 - 处理函数
func AddDemoHandle(name string) (result Result, err error) {
	var id int64
	data := make(map[string]interface{})
	user := models.User{
		Name: name,
	}
	id, err = user.AddUser()
	data["Id"] = id
	result.Data = data
	if err == nil {
		result.IsSuccess = true
	}else {
		result.Reason = "error"
	}
	return
}
