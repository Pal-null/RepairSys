package config

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"logger"
)

const (
		/*mysqluser = "root"
		mysqlpass = "mysql"
		mysqlurls = "172.22.71.121:3306"
		mysqldb   = "test"*/

	mysqluser = "csm_d"
	mysqlpass = "123"
	mysqlurls = "qnear.org:3306"
	mysqldb   = "csm_d"
)

func Init() {
	//日志输出等级
	logger.SetLogLevel(logger.Level_D)

	//项目运行模式
	runMode := beego.AppConfig.String("runmode")
	if runMode == "dev" {
		orm.Debug = true
	}

	//开启session
	beego.SessionOn = true
	//系统session保留时间
	beego.SessionGCMaxLifetime = 1800

	//数据库初始化
	orm.RegisterDriver("mysql", orm.DR_MySQL)

	//最大闲连接数
	maxIdle := 30
	//最大总连接数
	maxConn := 30

	logger.Debug("mysqluser=", mysqluser, "mysqlpass=", mysqlpass)

	orm.RegisterDataBase("default", "mysql", mysqluser+":"+mysqlpass+"@tcp("+mysqlurls+")/"+mysqldb+"?charset=utf8", maxIdle, maxConn)

	orm.RunSyncdb("default", false, true)
}
