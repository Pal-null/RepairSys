package demo

import (
	"github.com/astaxie/beego"
	"controllers/common"
	"models/table"
)

// 							[控制器声明]

// 声明添加控制器
type AddDemo struct{
	beego.Controller;
}

// 声明删除控制器
type DeleteDemo struct{
	beego.Controller;
}

// 声明更改控制器
type UpdateDemo struct{
	beego.Controller;
}

// 声明搜索控制器
type SearchDemo struct{
	beego.Controller;
}

// 							[控制器实现]

// 添加 - Post
func (this *AddDemo) AddDemo_Post() {
	beego.Debug("AddDemo")
	// 声明返回前台的数据
	reqData := make(map[string]interface{})
	// 获取前台传过来的数据
	name := this.GetString("Name")
	// 可添加参数检测。。。。。
	// 处理添加事件
	err := addDemoHandle(name)
	// 将数据返回前台
	if err == nil {
		common.OutputJson(this.Ctx.ResponseWriter, true, "添加成功", reqData)
	}else {
		beego.Error(err)
		common.OutputJson(this.Ctx.ResponseWriter, false, "添加失败", reqData)
	}
}

// 删除 - Post
func (this *DeleteDemo) DeleteDemo_Post() {
	beego.Debug("DeleteDemo")
	// 声明返回前台的数据
	reqData := make(map[string]interface{})
	// 获取前台传过来的数据
	id, _ := this.GetInt("Id")
	// 可添加参数检测。。。。。
	// 处理删除事件
	err := deleteDemoHandle(id)
	// 将数据返回前台
	if err == nil {
		common.OutputJson(this.Ctx.ResponseWriter, true, "删除成功", reqData)
	}else {
		beego.Error(err)
		common.OutputJson(this.Ctx.ResponseWriter, false, "删除失败", reqData)
	}
}

// 修改 - Post
func (this *UpdateDemo) UpdateDemo_Post() {
	beego.Debug("UpdateDemo")
	// 声明返回前台的数据
	reqData := make(map[string]interface{})
	// 获取前台传过来的数据
	id, _ := this.GetInt("Id")
	name := this.GetString("Name")
	// 可添加参数检测。。。。。
	// 处理更新数据事件
	err := updateDemoHandle(id, name)
	beego.Debug(err)
	// 将数据返回前台
	if err == nil {
		common.OutputJson(this.Ctx.ResponseWriter, true, "修改成功", reqData)
	}else {
		beego.Error(err)
		common.OutputJson(this.Ctx.ResponseWriter, false, "修改失败", reqData)
	}
}

// 搜索 - Get
func (this *SearchDemo) SearchDemo_Get() {
	beego.Debug("SearchDemo")
	var err error
	// 声明返回前台的数据
	reqData := make(map[string]interface{})
	// 处理获取数据事件
	reqData["users"], err = searcherDemoHandle()
	// 将数据返回前台
	if err == nil {
		common.OutputJson(this.Ctx.ResponseWriter, true, "获取数据成功", reqData)
	}else {
		beego.Error(err)
		common.OutputJson(this.Ctx.ResponseWriter, false, "获取数据失败", reqData)
	}
}

// 							[处理函数]
// 删除 - 处理函数
func deleteDemoHandle(id int64) error {
	user := table.User{
		Id: id,
	}
	return user.DeleteUser()
}

// 更新 - 处理函数
func updateDemoHandle(id int64, name string) error {
	user := table.User{
		Id: id,
		Name: name,
	}
	return user.UpdateUser()
}

// 搜索 - 处理函数
func searcherDemoHandle() ([]table.User, error) {
	return table.SearcherUser()
}

// 添加 - 处理函数
func addDemoHandle(name string) error {
	user := table.User{
		Name: name,
	}
	return user.AddUser()
}
