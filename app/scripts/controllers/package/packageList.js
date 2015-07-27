var packageApp = angular.module("packagelist.controller",['packagelist.services']);
packageApp.controller("packageList",["$scope","$q","$rootScope","packageListSrvc",function($scope,$q,$rootScope,packageSev){
    //指定查询集合
    var select = $scope.select = {};
    //查询条件列表，（取值改变后会触发请求后台）
    var condition = $scope.condition = {
        order:"packageId",
        orderType:true,
        cause:[],
        toggle:function(column){
            if(!column.sortable){return;}
            if(this.order == column.name){
                this.orderType = !this.orderType;
            }else{
                this.orderType = true;
                this.order = column.name;
            }
        }
    };
    //表格头，不传sortable列时默认不会进行列排序。
    $scope.titles = [
        {label:"检测包编号",name:"packageId",sortable:true},
        {label:"名称",name:"packageName",sortable:true},
        {label:"类型",name:"packageType",sortable:true},
        {label:"售价",name:"packagePrice",sortable:true},   
        {label:"所需样本类型",name:"sampleType",sortable:false},
        {label:"开关",name:"rswitch",sortable:true},
        {label:"操作标识",name:"opFlag",sortable:true},
        {label:"创建时间",name:"createTime",sortable:true},
        {label:"更新时间",name:"updTime",sortable:true}
    ];
    //指定列查询方法。
    $scope.searchItem = function(){
        if(select.length == 0) return ;
        var lis = new Array();
        angular.forEach(select,function(value,key){
            if(value){
                var op = new Object();
                op[key] = value;
                lis.push(op);
            }
        });
        condition.cause = lis;
    }
    // 获取用户列表、初始化分页
    $scope.getPackageList = function(pageNum,pagesize,require){
        console.log(pageNum,pagesize,require);

        var deferred = $q.defer();
        var trs = setTimeout(function(){
            $scope.$apply(function(){
                var result = {"pageNum":pageNum,"pagesize":pagesize,"totalpage":7,"data":[{"createTime":1425307031001,"opFlag":null,"packageId":"d5e283ecb89ddaf2a6feb2e275d69523","packageName":"测试检查包","packagePrice":1000,"packageType":"B","rswitch":"1","sampleType":"M","updTime":1425307453000},{"createTime":1425307031000,"opFlag":null,"packageId":"d5e283ecb89ddaf2a6feb2e275d69535","packageName":"测试检查包","packagePrice":1000,"packageType":"B","rswitch":"1","sampleType":"M","updTime":1425307453000},{"createTime":1425307031000,"opFlag":null,"packageId":"d5e283ecb89ddaf2a6feb2e275d6952b","packageName":"测试检查包","packagePrice":1000,"packageType":"B","rswitch":"1","sampleType":"M","updTime":1425307453000},{"createTime":1425307031000,"opFlag":null,"packageId":"dre283ecb89ddaf2a6feb2e275d6952a","packageName":"测试检查包","packagePrice":1000,"packageType":"B","rswitch":"1","sampleType":"M","updTime":1425307453000},{"createTime":1425307031000,"opFlag":null,"packageId":"d5e283ecb89ddaf2a6feb2e275d695ya","packageName":"测试检查包","packagePrice":1000,"packageType":"B","rswitch":"1","sampleType":"M","updTime":1425307453000},{"createTime":1425307031000,"opFlag":null,"packageId":"d5e283ecb89ddadra6feb2e275d6952a","packageName":"测试检查包","packagePrice":1000,"packageType":"B","rswitch":"1","sampleType":"M","updTime":1425307453000}]};
                deferred.resolve(result);
            });
        },1000);
        return deferred.promise;
    }
    /*$scope.getPackageList().then(function(result){console.log("ceshi");});*/
    /*packageSev.get(function(res){
        $scope.packages = res.data;
    });*/
    /*// 展开模态框
    $scope.showUserPop = function(){
        // 获取当前用户数据
        $scope.detail = this.user;
        $('#user_edit_modal').modal('show');
    }*/
}]);
var ctx = "/xnbs/app";
packageApp.config(["$routeProvider",function($routeProvider) {
    $routeProvider
        .when('/package', {controller: 'packageList', templateUrl:ctx+'/views/package/package-list.html'})
}]);