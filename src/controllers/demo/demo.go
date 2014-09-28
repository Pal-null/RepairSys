package demo

import (
	. "controllers/common"
	"errors"
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
	// 参数声明
	var name string
	data := make(map[string]interface{})
	var err error
	// 参数处理及参数检测
	name = this.GetString("Name")
	// 处理添加事件
	data, err = AddDemoHandle(name)
	// 将数据返回前台
	OutData(this.Ctx.ResponseWriter, data, err)
}

// 删除 - Post
func (this *DemoCtrl) DeleteDemo_Post() {
	logger.Debug("DeleteDemo")
	// 声明返回前台的数据
	data := make(map[string]interface{})
	var err error
	var id int64
	// 获取前台传过来的数据
	id, err = this.GetInt("Id")
	// 可添加参数检测。。。。。
	// 处理删除事件
	data, err = DeleteDemoHandle(id)
	// 将数据返回前台
	OutData(this.Ctx.ResponseWriter, data, err)
}

// 修改 - Post
func (this *DemoCtrl) UpdateDemo_Post() {
	logger.Debug("UpdateDemo")
	// 声明返回前台的数据
	data := make(map[string]interface{})
	var id int64
	var name string
	var err error
	// 获取前台传过来的数据
	id, err = this.GetInt("Id")
	name = this.GetString("Name")
	// 处理更新数据事件
	data, err = UpdateDemoHandle(id, name)
	// 将数据返回前台
	OutData(this.Ctx.ResponseWriter, data, err)
}

// 搜索 - Get
func (this *DemoCtrl) SearchDemo_Get() {
	logger.Debug("SearchDemo")
	//	var err error
	// 声明返回前台的数据
	data := make(map[string]interface{})
	// 处理获取数据事件
	data, err := SearcherDemoHandle()
	// 将数据返回前台
	OutData(this.Ctx.ResponseWriter, data, err)
}

// 处理函数
// 删除 - 处理函数
func DeleteDemoHandle(id int64) (reqData map[string]interface{}, err error) {
	reqData = make(map[string]interface{})
	user := models.User{
		Id: id,
	}
	if user.DeleteUser() != nil {
		err = errors.New("删除失败")
		return
	}
	return
}

// 更新 - 处理函数
func UpdateDemoHandle(id int64, name string) (reqData map[string]interface{}, err error) {
	reqData = make(map[string]interface{})
	user := models.User{
		Id:   id,
		Name: name,
	}
	err = user.UpdateUser()
	return
}

// 搜索 - 处理函数
func SearcherDemoHandle() (reqData map[string]interface{}, err error) {
	reqData = make(map[string]interface{})
	reqData["users"], err = models.SearcherUser()
	return
}

// 添加 - 处理函数
func AddDemoHandle(name string) (reqData map[string]interface{}, err error) {
	reqData = make(map[string]interface{})
	user := models.User{
		Name: name,
	}
	err = user.AddUser()
	return
}
