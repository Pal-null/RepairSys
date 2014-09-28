@echo off

Echo add workplace to gopath ...
set wp=%~dp0
set wp=%wp:~0,-10%
set gopath=%gopath%;%wp%
Echo ______________________________

Echo gopath: %gopath%
Echo ______________________________

Echo build goconvey.exe ...
go build "github.com/smartystreets/goconvey"
Echo ______________________________

Echo build gocov.exe ...
go build "github.com/axw/gocov/gocov"
Echo ______________________________

Echo build gocov-html.exe ...
go build "github.com/matm/gocov-html"
Echo ______________________________

Echo call src_package.bat ...
call src_package.bat
Echo ______________________________

Echo delete gocov.exe ...
del gocov.exe
Echo ______________________________

Echo delete gocov-html.exe ...
del gocov-html.exe
Echo ______________________________

Echo delete goconvey.exe ...
del goconvey.exe
Echo ______________________________

pause