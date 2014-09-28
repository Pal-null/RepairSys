package main

import (
	"config"
	"github.com/astaxie/beego"
	"logger"
	"net/http"
	"routers"
)

func main() {
	//初始化设置
	config.Init()
	var exit = make(chan bool)
	//加载路由
	go func() {
		logger.Info("初始化环境")
		routers.Init()
		beego.Run()
	}()

	go shutDownServer(exit)
	<-exit
	logger.Info("Service ShutDown")
}

func shutDownServer(exit chan bool) {
	logger.Info("shutDownRoute started")
	http.HandleFunc("/exitSrv", func(w http.ResponseWriter, r *http.Request) {
		logger.Info("receive exit command\n")
		exit <- true
	})

	if err := http.ListenAndServe(":8190", nil); err != nil {
		logger.Error(err.Error())
	}
}
