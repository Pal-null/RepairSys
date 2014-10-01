package routers

import (
	"controllers/demo"
	"github.com/astaxie/beego"
	"controllers/unitManager"
)

func Init() {
	// 设置静态路径
	beego.SetStaticPath("/html", "html")

	// demo 自动路由
//	beego.AutoRouter(&demo.DemoCtrl{})
	// demo 路由
	beego.Router("/addDemo", &demo.DemoCtrl{}, "post:AddDemo_Post")
	beego.Router("/deleteDemo", &demo.DemoCtrl{}, "post:DeleteDemo_Post")
	beego.Router("/updateDemo", &demo.DemoCtrl{}, "post:UpdateDemo_Post")
	beego.Router("/searchDemo", &demo.DemoCtrl{}, "get:SearchDemo_Get")

	//单位管理员路由
	beego.Router("/unitPjMgrSeach",&unitManager.UnitManagerCtrl{},"post:Searchproject_Post")
}
