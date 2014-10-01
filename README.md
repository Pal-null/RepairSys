# 项目说明

## 环境配置

全局npm安装  (C:\Users\%UserName%\AppData\Roaming\npm)

    npm install -g grunt  
    npm install -g grunt-cli  
    npm install -g grunt-shell  
    npm install -g karma  
    npm install -g karma-cli  
    npm install -g karma-coverage  
    npm install -g karma-jasmine  
    npm install -g karma-junit-reporter  
    npm install -g protractor  
    
或者复制共享目录 `\\D\\npm`

项目下安装 (%RepairSys%\\node_modules)

    npm install grunt  
    npm install grunt-shell  
    npm install protractor


或者复制共享目录 `\\D\RepairSys\node_modules`

## 运行测试

右击目录下 gruntfile.js 选择 Open Grunt Console 打开  
双击 Alias tasks 下的对应任务运行  

- unit 为karma的单元测试  
- e2e 为protractor的端对端测试（需要先开启服务器）  
- default 为所有测试

##文件放置说明

###conf 中的 app.conf为beego项目的配置文件 

###html 为放置相应的HTML文件以及js文件

- css，font，imgs暂时不需要更改
- js 根据角色分包放置js文件
- lib 是js文件的library，放置公用js文件
- test 放置前端测试js文件  
- conf放置前端测试的配置文件，基本不用修改，或直接添加测试文件到flie中
- e2e 中放置e2e的测试文件，分包放置
- unit中放置js代码单元测试的代码  
- tpl 中放置每个角色的view文件，分包放置
- 所有角色的主页面文件直接放置在html目录下

###scr
- controller放置控制器
- model放置数据库表的结构以及相对应函数
- router 放置路由
- test放置go的测试文件