package logger

import (
	"testing"
)

func Test_logger(t *testing.T) {
	for i := 1; i <= 4; i++ {
		SetLogLevel(i)
		Debug(i)
		Info(i)
		Warn(i)
		Error(i)
	}
}
