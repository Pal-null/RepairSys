package demo

import (
	"testing"
	. "github.com/smartystreets/goconvey/convey"
	_ "github.com/go-sql-driver/mysql"
	"test/common"
	"fmt"
)

func init() {
}

// Test Demo
func Test_Demo(t *testing.T) {
	t.Parallel()
	Convey("Test Demo", t, func() {
			Convey("Test AddDemo", func() {
					method := "POST"
					action := "addDemo"
					params := map[string]string{
					"Name": "lmx",
				}
					result := common.GetTestResult(method, action, params)
					So(result.IsSuccess, ShouldEqual, true)
					fmt.Printf("%v\n", result)
				})
			Convey("Test SearchDemo", func() {
					method := "GET"
					action := "searchDemo"
					params := map[string]string{
				}
					result := common.GetTestResult(method, action, params)
					So(result.IsSuccess, ShouldEqual, true)
					fmt.Printf("%v\n", result)
				})
			Convey("Test UpdateDemo", func() {
					method := "POST"
					action := "updateDemo"
					params := map[string]string{
					"Id": "8",
					"Name": "qmx",
				}
					result := common.GetTestResult(method, action, params)
					So(result.IsSuccess, ShouldEqual, true)
					fmt.Printf("%v\n", result)
				})
			Convey("Test DeleteDemo", func() {
					method := "POST"
					action := "deleteDemo"
					params := map[string]string{
					"Id": "7",
				}
					result := common.GetTestResult(method, action, params)
					So(result.IsSuccess, ShouldEqual, true)
					fmt.Printf("%v\n", result)
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
