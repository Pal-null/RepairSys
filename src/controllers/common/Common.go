package common

import (
	"encoding/json"
	"net/http"
)
/*
 * 返回前台的数据类型
 */
type Data struct {
	key string
	val interface {}
}
/*
 * 发送回前台的数据
 */
type ResultData struct{
	IsSuccess bool
	Reason    string
	Data      interface{}
}

/*
 * 获取返回前台的数据
 */
func GetRepData(info string, code string, args ...Data) map[string]interface{}{
	reqData := make(map[string]interface{})
	reqData["Info"] = info
	reqData["Code"] = code
	for _, value := range args{
		reqData[value.key] = value.val
	}
	return reqData
}

/*
 * 将数据处理成Json格式，并发送到前台
 */
func OutputJson(w http.ResponseWriter, IsSuccess bool, reason string, i interface{}) {
	out := &ResultData{IsSuccess, reason, i}
	b, err := json.Marshal(out)
	if err != nil {
		return
	}
	w.Write(b)
}


