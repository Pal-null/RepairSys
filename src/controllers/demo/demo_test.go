package demo

import (
	"config"
	"testing"
	. "github.com/smartystreets/goconvey/convey"
)

var(
	 id int64
)

func init() {
	config.Init()
}

// Test Demo
func Test_Demo(t *testing.T) {
	Convey("Test Demo", t, func() {
		Convey("Test AddDemoHandle", func() {
			result, err := AddDemoHandle("lmx")
			id = result.Data.(map[string]interface{})["Id"].(int64)
			So(err, ShouldBeNil)
		})
		Convey("Test UpdateDemoHandle", func() {
			_, err := UpdateDemoHandle(id, "lmx")
			So(err, ShouldBeNil)
		})
		Convey("Test SearcherDemoHandle", func() {
			_, err := SearcherDemoHandle()
			So(err, ShouldBeNil)
		})
		Convey("Test DeleteDemoHandle", func() {
			_, err := DeleteDemoHandle(1)
			So(err, ShouldBeNil)
		})
	})

}

//func Benchmark_Demo(b *testing.B) {
//	b.N = common.N
//	for i := 0; i < b.N; i++ {
//		Convey("Test AddDemo", b, func() {
//				method := "POST"
//				action := "addDemo"
//				params := map[string]string{
//				"Id": "1",
//				"Name": "lmx",
//			}
//				result := common.GetTestResult(method, action, params)
//				So(result.IsSuccess, ShouldEqual, true)
//			})
//	}
//}
