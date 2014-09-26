package main

import(
	"github.com/astaxie/beego"

	"net/http"
	"logger"
	"config"
	"routers"
)

func main() {
	config.Init();
	var exit = make(chan bool)
	//加载路由
	go func() {
	logger.Debug("初始化环境")
		routers.Init()

		beego.Run()
	}()

	go shutDownServer(exit)
	<-exit
	logger.Info("Service ShutDown")
}


func shutDownServer(exit chan bool) {
	//	logger.Info("shutDownRoute started")
	http.HandleFunc("/exitSrv", func(w http.ResponseWriter, r *http.Request) {
			logger.Info("receive exit command\n")
			exit <- true
		})

	if err := http.ListenAndServe(":8190", nil); err != nil {
		logger.Info(err.Error())
	}
}
