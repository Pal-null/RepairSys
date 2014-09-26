package config

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"fmt"
)

const (
//	mysqluser = "root"
//	mysqlpass =" 51026"
//	mysqlurls = "172.22.71.130:3306"
//	mysqldb   = "repairesys"


	mysqluser = "root"
	mysqlpass = "51026"
	mysqlurls = "172.22.71.130:3306"
	mysqldb   = "repairesys"

)

func Init() {

	//数据库初始化
	orm.RegisterDriver("mysql", orm.DR_MySQL)

	maxIdle := 30
	//最大连接数
	maxConn := 30

	beego.Debug(mysqluser + "===============" + mysqlpass)

	orm.RegisterDataBase("default", "mysql", mysqluser+":"+ mysqlpass +"@tcp("+ mysqlurls + ")/" + mysqldb +"?charset=utf8", maxIdle, maxConn)

	orm.RunSyncdb("default", false, true)


	//项目运行模式
	runMode := beego.AppConfig.String("abcd::runmode")
	fmt.Println(runMode)
	if runMode == "dev" {
		orm.Debug = true
	}

	//开启session
	beego.SessionOn = true
	//系统session保留时间
	beego.SessionGCMaxLifetime = 1800;
}

