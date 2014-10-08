package routers

import (
	"controllers/demo"
	"github.com/astaxie/beego"
	"controllers/unitManager"
	"controllers/admin"
	"xlsx/tool"
	"controllers/upload"
	"xlsx/import_modules"
	"controllers/repair"
	"controllers/salesman"
	"controllers/admin/DeviceManager"
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
	beego.AutoRouter(&unitManager.ProjectManagerCtrl{})
	beego.AutoRouter(&unitManager.UserManagerCtrl{})
	beego.Router("/searchRepairForm",&unitManager.RepairFormCtrl{},"post:SearchRepairForm_Get")

	//业务人员
	beego.Router("/salesRepairForm",&salesman.SalesmanFormCtrl{},"post:SalesRepairForm_Get")
	beego.Router("/salesRepairFormInfo",&salesman.SalesmanFormInfoCtrl{},"post:SalesRepairFormInfo_Get")
	//系统管理员 单位管理
	beego.AutoRouter(&admin.UnitMgrCtrl{})
	//系统管理员 参数设置
	beego.AutoRouter(&admin.SysMgrCtrl{})
	//系统管理员 项目管理
	beego.AutoRouter(&admin.PojMgrCtrl{})


	//系统管理员 通用问题路由
	beego.Router("/getProblem", &admin.PrbMgrCtrl{}, "post:Problem_Get")
	beego.Router("/addProblem", &admin.PrbMgrCtrl{}, "post:Problem_Add")
	beego.Router("/updateProblem", &admin.PrbMgrCtrl{}, "post:Problem_Update")
	//报修人员路由
	beego.Router("/createWorkOrder", &repair.RepairCtrl{}, "post:CreateWorkOrder")
	beego.Router("/getcommQu", &repair.RepairCtrl{}, "get:GetCommQu")
	beego.Router("/getProjectList", &repair.RepairCtrl{}, "get:GetProjectList")
	//设备管理员路由
	beego.Router("/getDeviceManagerProject",&DeviceManager.ProjectCtrl{},"get:GetViewProject")
	beego.Router("/SearchDeviceMgrProjByBoth",&DeviceManager.ProjectCtrl{},"post:SearchProjectByBoth")

	beego.Router("/getDMUnitDevice",&DeviceManager.DeviceCtrl{},"post:GetUnitDevice")
	beego.Router("/SearchDeviceMgrDevice",&DeviceManager.DeviceCtrl{},"post:SearchUnitDeviceByName")
	beego.Router("/getProperty",&DeviceManager.PropertyCtrl{},"post:GetProject")
	beego.Router("/UpdateDMUnitDevice",&DeviceManager.DeviceCtrl{},"post:UpdateDevice")

	/*================================================================================================================*/
	//文件上传路由
	beego.Router("/upload",&upload.UploadCtrl{},"post:UploadFile")
	beego.Router("/getcurprogress",&upload.GetCurProgressCtrl{},"post:GetCurProgress")
	tool.Router("uploadusers",&import_modules.M_user{})


	//系统管理员 人员管理路由
	beego.Router("/UserMgrCtrl/GetUsers",&admin.UserMgrCtrl{},"post:GetUsers")
	beego.Router("/UserMgrCtrl/AddUser",&admin.UserMgrCtrl{},"post:AddUser")
	beego.Router("/UserMgrCtrl/GetRoleList",&admin.UserMgrCtrl{},"post:GetRoleList")
	beego.Router("/UserMgrCtrl/UpdateUser",&admin.UserMgrCtrl{},"post:UpdateUser")

}
