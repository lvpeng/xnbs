var user = angular.module("user.controller",['user.services','user.directives']);
user.controller("userList",["$scope","$compile","$q","userSev","userList",function($scope,$compile,$q,userSevuserList){
        //指定查询集合
        var select = $scope.select = {};
        //查询条件列表，（取值改变后会触发请求后台）
        var condition = $scope.condition = {
            order:"userid",
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
            {label:"ID",name:"userid",sortable:true},
            {label:"账号",name:"login_Id",sortable:true},
            {label:"密码",name:"loginPwd",sortable:true},
            {label:"姓名",name:"userName",sortable:true},
            {label:"联系电话",name:"userMobile",sortable:true},
            {label:"公司名称",name:"userCompany",sortable:true},
            {label:"部门",name:"userDept",sortable:true},
            {label:"职位",name:"userDuty",sortable:true}/*,
            {label:"所属角色",name:"",sortable:true}*/
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
        $scope.getUserList = function(pageNum,pagesize,require){
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
            userList.get(query,function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        }
        // 删除用户
        $scope.showUserPop = function(){
            $scope.cur_user = this.user;
            $('#del_user_modal').modal('show');
        }
        $scope.delConfirm = function(){
             userSev.delete({ id: this.cur_user.userid },function(){
                $('#del_user_modal').modal('hide');
                 condition.refresh = !condition.refresh;
             });
        }
        // 窗口隐藏 取消当前模型所指向的用户
        $("#del_user_modal").on("hidden.bs.modal",function(){ $scope.cur_user = ""; });
    }])
    // 修改用户
    .controller("editUserRole",["$scope","$routeParams","$location","$rootScope","userSev",function($scope,$routeParams,$location,$rootScope,userSev){
           $rootScope.overlay = true;
           userSev.get({ id: $routeParams.id},function(res){
               $scope.edit_user = res.data;
               $rootScope.overlay = false;
           });
               $scope.updateUser = function(){
               console.log(userSev);
               userSev.update($scope.edit_user,function(){
                   $location.path("/user");
               });
           }
    }])
    // 新建用户
    .controller("newUser",["$scope","$location","userSev","userRole",function($scope,$location,userSev,userRole){
        // 获取角色列表
        userRole.get(function(res){
            $scope.roles = res.data;
            $scope.selected = "";
        });
        $scope.saveUser = function(){
            userSev.save($scope.newUser,function(){
                $location.path("/user");
            });
        }
    }]);
var ctx = "/xnbs/app";
user.config(["$routeProvider",function($routeProvider) {
    $routeProvider
        .when('/user', {controller: 'userList', templateUrl:ctx+'/views/user/user-list.html'})
        .when('/editUserRole/:id', {controller: 'editUserRole', templateUrl:ctx+'/views/user/edit-user-role.html'})
        .when('/newUser', {controller: 'newUser', templateUrl:ctx+'/views/user/new-user.html'})
}]);