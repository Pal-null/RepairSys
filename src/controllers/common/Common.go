package common

import (
	"encoding/json"
	"logger"
	"net/http"
	"os"
	"strconv"
	"github.com/astaxie/beego/orm"

)

// 返回前台的数据类型
type Result struct {
	IsSuccess bool        // 处理状态
	Reason    string      // 处理状态原因（错误）
	Data      interface{} // 返回前台的数据
}

// 将数据处理成Json格式，并发送并到前台
func OutputJson(arg_writer http.ResponseWriter, arg_result Result) {
	jResult, err := json.Marshal(arg_result)
	if err != nil {
		logger.Error(err)
		return
	}
	arg_writer.Write(jResult)
}

//  递归创建目录
func CreateDirectory(dir string)(string,error){
	if Exist(dir) {
		return dir,nil
	}
	err := os.MkdirAll(dir, 0777);
	return dir,err
}
// 判断路径是否存在
func Exist(path string) bool {
	_, err := os.Stat(path)
	return err == nil || os.IsExist(err)
}

/**
	获取总页数
	@author Zf.D
	@params 数据总条数 int64，每页数据条数 int64
	@return 数据总页数 int64
 */
func GetTotalPage(arg_totalCount, arg_perPage int64) (totalPage int64) {
	if arg_totalCount % arg_perPage == 0 {
		totalPage = arg_totalCount / arg_perPage
	} else {
		totalPage = arg_totalCount / arg_perPage  +  1
	}
	return
}
/**
 * ZhengQinyu
 * 分页函数，适用任何单表
 * 返回 总记录条数,总页数,数据RawSeter
 * 参数：表名，当前页数，页面大小，条件（查询条件,格式为 " and name='name' and age=12 [order by t_id desc]"）
 */
func GetPagesInfo(tableName string, cur_page int64, page_size int64, conditions string) (int64, int64, orm.RawSeter, error) {
	var rs orm.RawSeter
	o := orm.NewOrm()
	var total_Item, total_pages int64 = 0, 0   			//总条数,总页数
	err := o.Raw("SELECT count(*) FROM " + tableName + "  where 1>0 " + conditions).QueryRow(&total_Item) //获取总条数
	if err != nil ||total_Item <= 0|| page_size<=0 {
		return 0, 0, rs,err
	}
	total_pages = GetTotalPage(total_Item,page_size)	//获得总页数
	rs = o.Raw("select *  from  " + tableName + "  where 1>0 " + conditions + " LIMIT " + strconv.FormatInt((cur_page-1)*page_size,10) + "," + strconv.FormatInt(page_size,10))
	return total_Item, total_pages, rs,err
}


