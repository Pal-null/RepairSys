package common

import (
	"net/http"
	"encoding/json"
	"io/ioutil"
	"controllers/common"
)

const (
	localService string = "http://127.0.0.1:8186"
	N int = 100	//测试次数
)

var client = http.Client{}
var cookie *http.Cookie

//返回请求结果
func GetTestResult(method string, action string, params	map[string]string) common.ResultData{
	action += "?"
	for key, value := range params{
		action += (key+"="+value+"&")
	}
	request, _ := http.NewRequest(method, localService+"/"+action, nil)
	request.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
	request.Header.Set("Accept-Charset", "GBK,utf-8;q=0.7,*;q=0.3")
	request.Header.Set("Accept-Encoding", "gzip,deflate,sdch")
	request.Header.Set("Accept-Language", "zh-CN,zh;q=0.8")
	request.Header.Set("Cache-Control", "max-age=0")
	request.Header.Set("Connection", "keep-alive")
	if cookie != nil {
		request.AddCookie(cookie)
	}
	response, _ := client.Do(request)
	if cookie == nil {
		cookie = response.Cookies()[0]
	}
	result := common.ResultData {
		IsSuccess : false,
		Reason : "",
		Data : nil,
	}
	if response.StatusCode == 200 {
		body, _ := ioutil.ReadAll(response.Body)
		json.Unmarshal([]byte(body), &result)
	}
	return result
}
