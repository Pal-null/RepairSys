package models

import (
	"github.com/astaxie/beego/orm"
)

// 声明表模型 - User
type User struct {
	Id int64 `orm:"auto"`
	Name string `orm:"null"`
}

func init() {
	orm.RegisterModel(new(User))
}

// User表的添加方法
func (user *User) AddUser() (id int64, err error) {
	o := orm.NewOrm()
	id, err = o.Insert(user)
	return
}

// User表的搜索方法
func SearcherUser() (users []User, err error) { //
	o := orm.NewOrm()
	sql := "SELECT * FROM user ORDER BY id DESC"
	_, err = o.Raw(sql).QueryRows(&users)
	return
}

// User表的更新方法
func (user *User) UpdateUser() error {
	o := orm.NewOrm()
	tempUser := User{
		user.Id,
		user.Name,
	}
	err := o.Read(user)
	if err == nil {
		user.Name = tempUser.Name
		_, err := o.Update(user)
		return err
	} else {
		return err
	}
	return err
}

// User表的删除方法
func (user *User) DeleteUser() error {
	o := orm.NewOrm()
	_, err := o.Delete(user)
	return err
}
