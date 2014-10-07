adminApp.controller('pjMgrCtrl', ['$scope', '$http', function ($scope, $http) {

    //:::::::::::::::::::::::::::::公用:::::::::::::::::::::::::::::::::::
    menuOnClick(1);// 左栏菜单样式

    //导航栏集合
    $scope.ngts = [];
    $scope.showDiv = null;//显示的div
    $scope.ngt = null;//导航栏
    $scope.reqData = null;//返回前台的数据

    // =.= 模板映射函数
    $scope.tplMap = function (arg_tplId) {
        for (var tpl in $scope.templates) {
            if ($scope.templates[tpl].Id == arg_tplId) {
                return $scope.templates[tpl];
            }
        }
    };
    // =.= 更换模板函数
    $scope.chooseImportTab = function (arg_tabId) {
        $scope.template = $scope.tplMap(arg_tabId);
    };
    // =.= 从数组中移除元素
    $scope.moveFormArr = function (arg_elem, arg_arr) {
        var tempArr = [];
        for (var ele in arg_arr) {
            if (arg_arr[ele] != arg_elem) {
                if (typeof arg_arr[ele] == 'object')
                    tempArr.push(arg_arr[ele])
            }
        }
        return tempArr;
    };
    // =.= 导航栏点击事件
    $scope.ngtClk = function (arg_ngtId) {
        $scope.showDiv = arg_ngtId;
        var tempNgts = [];
        for (var tpl in $scope.ngts) {
            tempNgts.push($scope.ngts[tpl]);
            if ($scope.ngts[tpl].Id == arg_ngtId) {
                break;
            }
        }
        $scope.ngts = tempNgts;
    };

    //:::::::::::::::::::::::::::::项目管理::::::::::::::::::::::::::::::::

    $scope.perPagePoj = 3;// 每页记录数
    $scope.curPagePoj = 1;// 当前页数
    $scope.totalPagePoj = 1;// 总页数
    $scope.totalCountPoj = 0;// 总记录数
    $scope.goPagePoj = "";// 跳到第几页
    $scope.pojNumFormat = /^[0-9]{6,12}$/;//项目编号正则
    $scope.addPojNumRep = false;//添加的项目编号是否重复
    $scope.addPojNameRep = false;//添加的项目名是否重复
    $scope.probPojName = "";//问题窗口标题-项目名
    $scope.probAll = null;//系统所有问题记录
    $scope.probAlls = [];//系统所有问题记录集合
    $scope.probPoj = null;//已配置问题记录
    $scope.probPojs = [];//已配置问题记录集合
    $scope.addProbName = "";//添加的问题名称
    $scope.addPojNum = "";//添加的项目编号
    $scope.addPojName = "";//添加的项目名称
    $scope.poj = null;//项目列表记录
    $scope.pojs = [];//项目列表记录集合
    $scope.searchPojNum = "";//搜索的项目编号
    $scope.searchPojName = "";//搜索的项目名
    $scope.salesman = null;//业务员记录
    $scope.salesmans = [];//业务员集合
    $scope.salesmanC = null;//已选义务员记录
    $scope.salesmanCs = [];//已选业务员集合

    // =.= 分页函数
    $scope.toPagePoj = function (arg_page) {
        $scope.goPagePoj = "";
        arg_page = parseInt(arg_page);
        if (isNaN(arg_page) ||
            arg_page < 1 ||
            arg_page == $scope.curPagePoj ||
            arg_page > $scope.totalPagePoj) {
            return;
        }
        $scope.curPagePoj = arg_page;
        $scope.getPojList();

    };
    // =.= 获取项目列表
    $scope.getPojList = function () {
        $scope.reqData = {
            perPage: $scope.perPagePoj,
            curPage: $scope.curPagePoj,
            searchPojNum: $scope.searchPojNum,
            searchPojName: $scope.searchPojName
        };
        $http.post("/PojMgrCtrl/GetPojList", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.pojs = data.Data["pojs"];
                $scope.totalPagePoj = data.Data["totalPage"];
                $scope.totalCountPoj = data.Data["totalCount"];
                $scope.salesmans = data.Data["salesmans"];
                $scope.addPojNumRep = false;
                $scope.addPojNameRep = false;
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 搜索函数
    $scope.findPojList = function () {
        $scope.curPagePoj = 1;
        $scope.getPojList();
    };
    // =.= 添加项目前数据初始化
    $scope.addPojInit = function () {
        $scope.addPojNum = "";
        $scope.addPojName = "";
        $scope.salesmanCs = [];
    };
    // =.= 检测项目编号是否重复
    $scope.chkAddPojNum = function () {
        $scope.addPojNumRep = false;
        $scope.reqData = {
            addPojNum: $scope.addPojNum
        };
        $http.post("/PojMgrCtrl/ChkAddPojNum", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.addPojNumRep = data.Data["isRepeat"];
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 检测项目名是否重复
    $scope.chkAddPojName = function () {
        $scope.addPojNameRep = false;
        $scope.reqData = {
            addPojName: $scope.addPojName
        };
        $http.post("/PojMgrCtrl/ChkAddPojName", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.addPojNameRep = data.Data["isRepeat"];
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 添加项目
    $scope.addPoj = function () {
        var salesmanCsId = "";
        for (var sm in $scope.salesmanCs) {
            if (typeof $scope.salesmanCs[sm] == 'object')
                salesmanCsId += $scope.salesmanCs[sm].Id + ",";
        }
        salesmanCsId = salesmanCsId.substring(0, salesmanCsId.length - 1);
        $scope.reqData = {
            addPojNum: $scope.addPojNum,
            addPojName: $scope.addPojName,
            salesmanCsId: salesmanCsId
        };
        $http.post("/PojMgrCtrl/AddPoj", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.getPojList();
                showMsg(data.Reason, "success");
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });

    };
    // =.= 查看单位
    $scope.showUintList = function (arg_poj) {
        $scope.showDiv = "unitList";
        $scope.curPoj = arg_poj;
        $scope.ngts.push({Id: "unitList", Ctx: "单位管理"});
        $scope.getUnits();
    };
    // =.= 业务员被选中状态改变
    $scope.checkChgSM = function (arg_salesman) {
        var id = "#" + arg_salesman.Id;
        var ischeck = $(id).is(':checked');
        if (ischeck == true) {
            $scope.salesmanCs.push(arg_salesman)
        } else {
            $scope.removeSM(arg_salesman);
        }
    };
    // =.= 业务员移除
    $scope.removeSM = function (arg_salesman) {
        var tempSalesmanCs = [];
        for (var sm in $scope.salesmanCs) {
            if ($scope.salesmanCs[sm].Id != arg_salesman.Id) {
                if (typeof $scope.salesmanCs[sm] == 'object')
                    tempSalesmanCs.push($scope.salesmanCs[sm])
            } else {
                var sm = $('input[name="' + arg_salesman.Id + '"]');
                sm.attr('checked', false);
            }
        }
        $scope.salesmanCs = tempSalesmanCs;
    };
    // =.= 初始化问题列表
    $scope.initProbForm = function (arg_poj) {
        $scope.probPojName = arg_poj.Name;
        $scope.reqData = {
            pName: arg_poj.Name
        };
        $http.post("/PojMgrCtrl/GetProbList", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.probAlls = data.Data["probAlls"];
                $scope.probPojs = data.Data["probPojs"];
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 问题列表问题记录点击事件
    $scope.probClick = function (arg_prob) {
        if (arg_prob.Is_check == "0") {
            $scope.probAlls = $scope.moveFormArr(arg_prob, $scope.probAlls);
            arg_prob.Is_check = "1";
            $scope.probPojs.push(arg_prob);
        } else {
            $scope.probPojs = $scope.moveFormArr(arg_prob, $scope.probPojs);
            arg_prob.Is_check = "0";
            $scope.probAlls.push(arg_prob);
        }
    };
    // =.= 初始化添加问题数据
    $scope.initAddProbName = function () {
//        $scope.addProbName = "";
    };
    // =.= 添加项目问题
    $scope.addPojProb = function () {
        var temp = {};
        temp.Is_check = 1;
        temp.Problem = $scope.addProbName;
        $scope.probPojs.push(temp);

    };

    //:::::::::::::::::::::::::::::单位管理::::::::::::::::::::::::::::::::

    $scope.perPageUnit = 3;// 每页记录数
    $scope.curPageUnit = 1; //当前页数
    $scope.totalPageUnit = 1; //总页数
    $scope.totalCountUnit = 0;//总记录数
    $scope.goPageUnit = "";//跳到第几页
    $scope.findUnitName = ""; //搜索的单位名
    $scope.curPoj = null;//当前项目
    $scope.pojUnit = null;//项目列表记录
    $scope.pojUnits = [];//项目列表记录集合
    $scope.bindUnit = null;//项目绑定单位记录
    $scope.bindUnits = [];//项目绑定单位记录集合
    $scope.bindUnitCs = [];//要绑定的单位集合
    $scope.sBindUnitC = "";//要绑定的单位集合字符串

    // =.= 分页函数
    $scope.toPageUnit = function (arg_page) {
        $scope.goPageUnit = "";
        arg_page = parseInt(arg_page);
        if (isNaN(arg_page) ||
            arg_page < 1 ||
            arg_page == $scope.curPageUnit ||
            arg_page > $scope.totalPageUnit) {
            return;
        }
        $scope.curPageUnit = arg_page;
        $scope.getUnits();

    };
    // =.= 获取项目单位列表
    $scope.getUnits = function () {
        $scope.reqData = {
            perPage: $scope.perPageUnit,
            curPage: $scope.curPageUnit,
            unitName: $scope.findUnitName,
            pojId: $scope.curPoj.Proid
        };
        $http.post("/PojMgrCtrl/GetPojUnitList", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.pojUnits = data.Data["pojUnits"];
                $scope.totalPageUnit = data.Data["totalPage"];
                $scope.totalCountUnit = data.Data["totalCount"];
//                showMsg(data.Reason, "success");
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 查找项目单位
    $scope.findUnit = function () {
        $scope.perPageUnit = 3;
        $scope.curPageUnit = 1;
        $scope.getUnits();
    };
    // =.= 查看设备
    $scope.showEqmList = function (arg_unit) {
        $scope.curUnit = arg_unit;
        $scope.showDiv = "eqmList";
        $scope.ngts.push({Id: "eqmList", Ctx: "设备管理"});
        $scope.getEqms();
    };
    // =.= 绑定项目点击事件
    $scope.bindUnitClk = function (arg_unit) {
        var id = "#bind_" + arg_unit.T_id;
        var ischeck = $(id).is(':checked');
        if (ischeck == true) {
            $scope.bindUnitCs.push(arg_unit);
        } else {
            $scope.bindUnitCs = $scope.moveFormArr(arg_unit, $scope.bindUnitCs);
        }
    };
    // =.= 初始化绑定数据
    $scope.initBandUnit = function () {
        $scope.bindUnitCs = [];
        $scope.reqData = {
            pojId: $scope.curPoj.Proid
        };
        $http.post("/PojMgrCtrl/GetUnitList", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.bindUnits = data.Data["units"];
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 项目绑定单位确定按钮点击事件
    $scope.bindPojUnits = function () {
        $scope.sBindUnitC = "";
        for (var bs in $scope.bindUnitCs) {
            if (typeof $scope.bindUnitCs[bs] == 'object') {
                $scope.sBindUnitC += $scope.bindUnitCs[bs].T_id + ",";
            }
        }
        $scope.sBindUnitC = $scope.sBindUnitC.substring(0, $scope.sBindUnitC.length - 1);
        $scope.reqData = {
            pojId: $scope.curPoj.Proid,
            sBindUnitC: $scope.sBindUnitC
        };
        $http.post("/PojMgrCtrl/BandUnit", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.findUnit();
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 项目取消绑定单位
    $scope.delPojUnit = function (arg_pojUnit) {
        var arg_text = "是否取消项目： <p style='color:red;'>" + arg_pojUnit.Pname +
            "</p> 与单位：<p style='color:red;'>" + arg_pojUnit.Uname +
            "</p> 的绑定？";
        showMsg(arg_text, "info", function(){
            $scope.reqData = {
                puid: arg_pojUnit.Puid
            };
            $http.post("/PojMgrCtrl/DelPojUnit", $scope.reqData).success(function (data) {
                if (data.IsSuccess) {
                    $scope.findUnit();
                    showMsg(data.Reason, "success");
                } else {
                    showMsg(data.Reason, "error");
                }
            }, "json").error(function () {
                actionError();
            });

        });
    };

    //:::::::::::::::::::::::::::::设备管理::::::::::::::::::::::::::::::::

    $scope.perPageEqm = 3;//每页条数
    $scope.curPageEqm = 1;// 当前页数
    $scope.totalPageEqm = 1;// 总页数
    $scope.totalCountEqm = 0;// 总记录数
    $scope.goPageEqm = "";// 跳到第几页
    $scope.findEmqName = "";//设备名
    $scope.curUnit = null;//当前单位
    $scope.eqm = null;//设备列表记录
    $scope.eqms = [];//设备列表记录集合
    $scope.mdfEqm = null;//编辑的设备表记录
    $scope.findEqmName = "";//搜素设备的名称
    $scope.warrantyFormat="/^[1-9]\\d*|0$/";//保修期正则

    // =.= 设备管理分页函数
    $scope.toPageEqm = function (arg_page) {
        $scope.goPageEqm = "";
        arg_page = parseInt(arg_page);
        if (isNaN(arg_page) ||
            arg_page < 1 ||
            arg_page == $scope.curPageEqm ||
            arg_page > $scope.totalPageEqm) {
            return;
        }
        $scope.curPageEqm = arg_page;
        $scope.getEqms();
    };
    // =.= 获取设备列表
    $scope.getEqms = function () {
        $scope.reqData = {
            perPage: $scope.perPageEqm,
            curPage: $scope.curPageEqm,
            emqName: $scope.findEmqName,
            puId: $scope.curUnit.Puid
        };
        $http.post("/PojMgrCtrl/GetEqmList", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.eqms = data.Data["eqms"];
                $scope.totalPageEqm = data.Data["totalPage"];
                $scope.totalCountEqm = data.Data["totalCount"];
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });
    };
    // =.= 查看设备详情
    $scope.showEqmDetails = function (arg_eqm) {
        $scope.showDiv = "eqmDetails";
        $scope.ngts.push({Id: "eqmDetails", Ctx: "设备详情"});
        $scope.curEqm = arg_eqm;
        $scope.getEqmPpt();
    };
    // =.= 查找设备
    $scope.findEqm = function () {
        $scope.curPageEqm = 1;
        $scope.getEqms();
    };
    // =.= 初始化编辑设备数据
    $scope.initMdfEqmFunc = function (arg_eqm) {
        $scope.mdfEqm={T_id:"",Name:"",Starttime:"",Warranty:""};
        $scope.mdfEqm.T_id = arg_eqm.T_id;
        $scope.mdfEqm.Name = arg_eqm.Name;
        $scope.mdfEqm.Starttime = arg_eqm.Starttime;
        $scope.mdfEqm.Warranty = arg_eqm.Warranty;
    };
    // =.= 编辑设备
    $scope.mdfEqmFunc = function () {
        $scope.reqData = {
            T_id: $scope.mdfEqm.T_id,
            Name: $scope.mdfEqm.Name,
            Starttime: $scope.mdfEqm.Starttime,
            Warranty: $scope.mdfEqm.Warranty
        };
        $http.post("/PojMgrCtrl/MdfEqm", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                showMsg(data.Reason, "success", null);
                $scope.findEqm();
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });

    };

    //:::::::::::::::::::::::::::::设备属性管理::::::::::::::::::::::::::::

    $scope.curEqm = null;//当前设备
    $scope.eqmPpt = null;//设备属性记录
    $scope.eqmPpts = [];//设备属性记录集合

    // =.= 获取设备属性
    $scope.getEqmPpt = function () {
        $scope.reqData = {
            T_id: $scope.curEqm.T_id
        };
        $http.post("/PojMgrCtrl/GetEqmPpt", $scope.reqData).success(function (data) {
            if (data.IsSuccess) {
                $scope.eqmPpts = data.Data["eqmPpts"];
            } else {
                showMsg(data.Reason, "error");
            }
        }, "json").error(function () {
            actionError();
        });

    };

    //:::::::::::::::::::::::::::::初始化页面数据::::::::::::::::::::::::::::

    // =.= 初始化函数
    $scope.initFunc = function () {
        $scope.showDiv = "pojList";
        $scope.ngts.push({Id: "pojList", Ctx: "项目管理"});
        $scope.getPojList();
    };
    // =.= 执行初始化函数
    $scope.initFunc();
}]);
