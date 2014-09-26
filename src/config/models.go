package config

import (
	"github.com/astaxie/beego/orm"
	"models/table"
)

func init() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(table.User))

}
