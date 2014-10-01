package common

import (
	"encoding/json"
	"logger"
	"net/http"
)

// 返回前台的数据类型
type Result struct {
	IsSuccess bool        // 处理状态
	Reason    string      // 处理状态原因（错误）
	Data      interface{} // 返回前台的数据
}

// 数据发送函数
//func OutData(arg_writer http.ResponseWriter, arg_data interface{}, arg_err error) {
//	result := Result{}
//	if arg_err == nil {
//		result.Data = arg_data
//		result.IsSuccess = true
//	} else {
//		logger.Error(arg_err)
//		result.Reason = ""
//	}
//	OutputJson(arg_writer, result)
//}

// 将数据处理成Json格式，并发送并到前台
func OutputJson(arg_writer http.ResponseWriter, arg_result Result) {
	jResult, err := json.Marshal(arg_result)
	if err != nil {
		logger.Error(err)
		return
	}
	arg_writer.Write(jResult)
}
