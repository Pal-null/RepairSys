package routers

import (
	"github.com/astaxie/beego"
	"controllers/demo"
)

func  Init(){
	beego.SessionOn = true

	beego.SetStaticPath("/html","html")

	// demo 路由
	beego.Router("/addDemo",&demo.AddDemo{}, "post:AddDemo_Post")
	beego.Router("/deleteDemo",&demo.DeleteDemo{}, "post:DeleteDemo_Post")
	beego.Router("/updateDemo",&demo.UpdateDemo{}, "post:UpdateDemo_Post")
	beego.Router("/searchDemo",&demo.SearchDemo{}, "get:SearchDemo_Get")

}
