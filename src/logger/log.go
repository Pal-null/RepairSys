package logger

import (
	"os"
	"log"
	"fmt"
	"strings"
	"runtime"
)

const (
	//项目内日志文件路径
	fileName string = "log.log"
	//日志写入等级
	debug int = 1
	info int = 2
	warn int = 3
	error int = 4
)

var logLevel = debug
var MyLog = getLogger()

//获取项目路径
func GetProjectPath() string {
	path, _ := os.Getwd()
	pathArr := strings.SplitN(path, "src", -1)
	return pathArr[0]
}

//获取日志
func getLogger() *log.Logger {
	var logFilePath string = GetProjectPath() + "\\" + fileName;
	logFile, err := os.OpenFile(logFilePath, os.O_RDWR | os.O_CREATE, os.ModePerm)
	if err != nil {
		log.Panic(err)
		fmt.Println(logFilePath)
	}
	logFile.Seek(0, os.SEEK_END)
	//3个参数：日志文件，每行信息的前缀，信息携带内容
	return log.New(logFile,"", log.Ldate | log.Ltime)
}

//日志等级
func SetLogLevel(arg_level int) {
	if arg_level < 1 || arg_level > 4 {
		logLevel = debug
	} else {
		logLevel = arg_level
	}
}

//输出格式
func outPut() string {
	pc, file_name, line_num, ok := runtime.Caller(2)
	if !ok { return "" }
	pack_func_name := runtime.FuncForPC(pc).Name()
	short_func_name := pack_func_name[strings.LastIndex(pack_func_name, ".")+1:]
	short_file_name := file_name[strings.LastIndex(file_name, "/")+1:]
	str := fmt.Sprintf("%s:%d %s():",short_file_name, line_num, short_func_name)
	return str
}

func Debug(arg_println ...interface{}) {
	if logLevel == debug {
		fmt.Println(outPut(),"[Debug]",arg_println)
		MyLog.Println(outPut(),"[Debug]", arg_println)
	}
}

func Info(arg_println ...interface{}) {
	if logLevel <= info {
		fmt.Println(outPut(),"[Info]",arg_println)
		MyLog.Println(outPut(),"[Info]", arg_println)
	}
}

func Warn(arg_println ...interface{}) {
	if logLevel <= warn {
		fmt.Println(outPut(),"[Warn]",arg_println)
		MyLog.Println(outPut(),"[Warn]", arg_println)
	}
}

func Error(arg_println ...interface{}) {
	if logLevel <= error {
		fmt.Println(outPut(), "[Error]", arg_println)
		MyLog.Println(outPut(), "[Error]", arg_println)
	}
}
