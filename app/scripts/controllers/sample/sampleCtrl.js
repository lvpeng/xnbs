var user = angular.module("sample.controller",['sample.services']);
user.controller("sampleList",["$scope","$compile","$q","sampleSev","sampleList",function($scope,$compile,$q,sampleSev,sampleList){
        //指定查询集合
        var select = $scope.select = {};
        //查询条件列表，（取值改变后会触发请求后台）
        var condition = $scope.condition = {
            order:"sample_id",
            orderType:true,
            cause:[],
            refresh:false,
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
            {label:"样本编号",name:"sample_id",sortable:true},
            {label:"样本名称",name:"sample_name",sortable:true},
            {label:"样本状态",name:"sample_state",sortable:true},
            {label:"样本优先级",name:"priority",sortable:true},
            {label:"入库用户ID",name:"put_user_id",sortable:true},
            {label:"样本入库时间",name:"put_time",sortable:true},
            {label:"样本存放位置",name:"storage_position",sortable:true},
            {label:"样本处置者ID",name:"disposal_user_id",sortable:true},
            {label:"样本处置方式",name:"disposal_type",sortable:true},
            {label:"样本处置时间",name:"disposal_time",sortable:true},
            {label:"样本分配状态",name:"distribut_state",sortable:true},
            {label:"样本描述",name:"op_flag",sortable:true}
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
        // 获取样本列表、初始化分页
        $scope.getSampleList = function(pageNum,pagesize,require){
            var deferred = $q.defer(),
                whereCause = "";
            // 装载查询参数
            for(var i = 0; i < require.cause.length; i++){
                var cause = require.cause[i];
                for(var key in cause){
                    whereCause += key+" like '"+cause[key]+"'";
                }
                if((i+1) < require.cause.length) whereCause += " and ";
            }
            var query = {
                curPageIdx : pageNum,
                pageSize : pagesize,
                whereCause : whereCause,
                orderConditions : require.order+" "+(require.orderType ? "desc" : "asc")
            };
            sampleList.get(query,function(result){
                console.log(result);
                deferred.resolve(result);
            });
            return deferred.promise;
        }
        // 删除样本
        $scope.showSamplePop = function(){
            $scope.cur_sample = this.sample;
            $('#del_sample_modal').modal('show');
        }
        $scope.delConfirm = function(){
            sampleSev.delete({ id: this.cur_sample.sampleId },function(){
                $('#del_sample_modal').modal('hide');
                 condition.refresh = !condition.refresh;
             });
        }
        // 窗口隐藏 取消当前模型所指向的元素
        $("#del_sample_modal").on("hidden.bs.modal",function(){ $scope.cur_sample = ""; });
    }])/*
    // 修改样本
    .controller("editUserRole",["$scope","$routeParams","$location","$rootScope","sampleSev",function($scope,$routeParams,$location,$rootScope,sampleSev){
           $rootScope.overlay = true;
        sampleSev.get({ id: $routeParams.id},function(res){
            console.log(res);
               $scope.edit_user = res.data;
               $rootScope.overlay = false;
           });
               $scope.updateUser = function(){
               console.log(sampleSev);
                   sampleSev.update($scope.edit_user,function(){
                   $location.path("/user");
               });
           }
    }])*/
    // 新建样本
    .controller("newSample",["$scope","$location","sampleSev",function($scope,$location,sampleSev){
        $scope.saveSample = function(){
            $scope.newSample = {
                "sampleId": "sdfdsfsdf",
                "sampleName": "BVVVS",
                "sampleState": "1",
                "priority": 0,
                "putUserId": "sdfdsfsdfsdsdf",
                "storagePosition": "A",
                "disposalUserId": "A",
                "disposalType": "A",
                "distributState": "4",
                "opFlag": "0"
            }
            sampleSev.save($scope.newSample,function(){
                $location.path("/sample");
            });
        }
    }]);
var ctx = "/xnbs/app";
user.config(["$routeProvider",function($routeProvider) {
    $routeProvider
        .when('/sample', {controller: 'sampleList', templateUrl:ctx+'/views/sample/sample-list.html'})
       // .when('/editUserRole/:id', {controller: 'editUserRole', templateUrl:ctx+'/views/user/edit-user-role.html'})
        .when('/newSample', {controller: 'newSample', templateUrl:ctx+'/views/sample/new-sample.html'});
;}]);