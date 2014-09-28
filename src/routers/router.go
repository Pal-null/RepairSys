package routers

import (
	"controllers/demo"
	"github.com/astaxie/beego"
)

func Init() {
	beego.SessionOn = true

	beego.SetStaticPath("/html", "html")

	// demo 路由
	beego.Router("/addDemo", &demo.DemoCtrl{}, "post:AddDemo_Post")
	beego.Router("/deleteDemo", &demo.DemoCtrl{}, "post:DeleteDemo_Post")
	beego.Router("/updateDemo", &demo.DemoCtrl{}, "post:UpdateDemo_Post")
	beego.Router("/searchDemo", &demo.DemoCtrl{}, "get:SearchDemo_Get")
}
