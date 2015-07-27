/**
 * Created by penglu on 2015/4/22.
 */
'use strict';
/**
 * @ngdoc function
 * @name xnbsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xnbsApp
 */
angular.module('xnbsApp.controller',[])
    .controller('homeCtrl', ['$scope', '$rootScope',function($scope, $rootScope) {
        $rootScope.currentUser = JSON.parse(window.localStorage['currentUser'] );
    }])
    .controller('orderListCtrl', ['$rootScope', '$scope', '$state','$filter','orderSrvc' ,'createDialog','filteredListService' ,function($rootScope, $scope, $state, $filter,orderSrvc,createDialog, filteredListService) {
        //get order list data
        var entries = orderSrvc.query(function() {
            console.log(entries.data);
            $scope.orders = entries.data;

            $scope.pageSize = 2;

            $scope.reverse = false;
            //reset all data
            $scope.resetAll = function () {
                //$scope.filteredList = $scope.allItems;
                $scope.filteredList = entries.data;
                $scope.ordCollName = '';
                $scope.ordCreateUserId = '';
                $scope.ordCollMobile = '';
                $scope.orderId  = '';
                $scope.createTime = '';
                $scope.searchText = '';
                $scope.currentPage = 0;
                $scope.Header = ['', '', '', ''];
            };

            $scope.search = function () {
                $scope.filteredList =
                    filteredListService.searched(entries.data, $scope.searchText, ['ordCreateUserId','ordCollName', 'ordCollMobile', 'orderId' , 'createTime'] );

                if ($scope.searchText == '') {
                    $scope.filteredList = entries.data;
                }
                $scope.pagination();
            };


            // Calculate Total Number of Pages based on Search Result
            $scope.pagination = function () {
                $scope.ItemsByPage = filteredListService.paged( $scope.filteredList, $scope.pageSize );

            };
//
            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

            $scope.firstPage = function () {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function () {
                $scope.currentPage = $scope.ItemsByPage.length - 1;
            };

            $scope.range = function (input, total) {
                var ret = [];
                if (!total) {
                    total = input;
                    input = 0;
                }
                for (var i = input; i < total; i++) {
                    if (i != 0 && i != total - 1) {
                        ret.push(i);
                    }
                }
                return ret;
            };

            $scope.sort = function(sortBy){
                $scope.resetAll();

                $scope.columnToOrder = sortBy;

                //$Filter - Standard Service
                $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
                var iconName;
                if($scope.reverse)
                    iconName = 'glyphicon glyphicon-chevron-up';
                else
                    iconName = 'glyphicon glyphicon-chevron-down';

                if(sortBy === 'orderId')
                {
                    $scope.Header[0] = iconName;
                }
                else if(sortBy === 'ordCollName')
                {
                    $scope.Header[1] = iconName;
                }else if(sortBy === 'ordCollMobile')
                {
                    $scope.Header[2] = iconName;
                }else if(sortBy == 'createTime')
                {
                    $scope.Header[3] = iconName;
                }

                $scope.reverse = !$scope.reverse;

                $scope.pagination();
            };

            //By Default sort order create time
            $scope.sort ('createTime');

        }); //query() returns all the entries

        //删除订单
        $scope.launchSimpleModal = function(order) { // Delete a movie. Issues a DELETE to /api/movies/:id
            createDialog({
                title: '确定删除?',
                backdrop: true,
                success: {
                    label: '确定',
                    fn: function() {
//                        orderSrvc.delete({orderId: order.orderId}, function(){
//                            console.log('del success!');
//                            //refresh order list
//                            $state.reload();
//                        })
                          order.opFlag = '1'; //删除标志位
                          orderSrvc.update({orderId: order.orderId}, order, function(){
                              console.log('delete success!');
                          })
                    }
                },
                cancel: {label: '取消', fn: function(){
                    return false;
                }}
            });

        };
    }])
//    .controller('orderViewCtrl',['$scope', '$stateParams', 'orderSrvc', function($scope, $stateParams, orderSrvc){
//        var entry = orderSrvc.get({ id: $stateParams.orderId}, function(){  //FIXME: why return  list data
//            console.log(entry);
//            $scope.order = entry;
//        });
//
//
//        $scope.editOrder = function(){
//            // go to order-edit.html
//        }
//    }])
    .controller('orderViewCtrl',['$scope', '$state','$stateParams', 'orderSrvc', 'reqSrvc','utils', 'createDialog',  function($scope, $state ,$stateParams, orderSrvc, reqSrvc,utils, createDialog){
        // 订单单条记录
        var entry_order = orderSrvc.get({ orderId: $stateParams.orderId}, function(){
            //$scope.order = utils.findById(entries_order.data, $stateParams.orderId, 'orderId');
            $scope.order = entry_order.data;

        });

        // 所有工单列表
        var entries_request = reqSrvc.query(function(){
            var all_requests = entries_request.data;
            $scope.requests = utils.findById2(all_requests, $stateParams.orderId, 'orderId');
            //console.log($scope.requests);
        });

        //删除工单
        $scope.launchSimpleModal = function(requestId) { // Delete a movie. Issues a DELETE to /api/movies/:id
            createDialog( {
                title: '确定删除?',
                backdrop: true,
                success: {
                    label: '确定',
                    fn: function () {
                        reqSrvc.delete({requestId: requestId }, function () {
                            console.log('del success!');
                            //refresh order list
                            $state.reload();
                        })
                    }
                },
                cancel: {label: '取消', fn: function () {
                    return false;
                }}
            });

        }
    }])
    .controller('orderEditCtrl', ['$scope', '$state','$stateParams', 'orderSrvc',  'userSrvc','reqSrvc','utils', function($scope, $state, $stateParams, orderSrvc, userSrvc,reqSrvc, utils){
        var entry_order = orderSrvc.get({ orderId: $stateParams.orderId}, function(){
            //$scope.order = utils.findById(entries_order.data, $stateParams.orderId, 'orderId');
            $scope.order = entry_order.data;
            var _ordCreateUserId = $scope.order.ordCreateUserId;
            //下拉列表 选中
            var entries_user = userSrvc.query(function(){
                $scope.users = entries_user.data;
                for (var i =0; i< $scope.users.length; i++){
                    var user = $scope.users[i];
                    if(user.userName == _ordCreateUserId){
                        $scope.user = user;
                    }
                }

            });
        });

        $scope.doHisBack = function(){
            window.history.back();
        }

        // 所有工单列表
        var entries_request = reqSrvc.query(function(){
            var all_requests = entries_request.data;
            $scope.requests = utils.findById2(all_requests, $stateParams.orderId, 'orderId');
            //console.log($scope.requests);
        });
        // 修改完成，保存
        $scope.updateOrder = function () {
            $scope.order.ordCreateUserId = $scope.user.userName;
            orderSrvc.update({orderId: $stateParams.orderId},  $scope.order ,function(){
                console.log('upd ok!');
                $state.go('home.order');
            });
        }
    }])
    .controller('orderAddCtrl', ['$scope','$rootScope','$state','orderSrvc', 'userSrvc', 'utils',function($scope, $rootScope,$state,orderSrvc, userSrvc, utils){
        //订单创建人 下拉列表
        var entries_user = userSrvc.query(function(){
            $scope.users = entries_user.data;
        });
        $scope.saveOrder = function(isValid){
            if(isValid){
                //创建新订单实例
                var new_order = $scope.order;
                //new_order.ordCreateUserId = $scope.user.userName;
                new_order.ordCreateUserId = $rootScope.currentUser.userName; //订单创建人
                new_order.createTime = utils.getCurrntTime();
                //new_order.createTime = '2015-05-27 09:20:00';
                console.log($scope.order);

            orderSrvc.save(JSON.stringify(new_order), function(){
                console.log('save success!');
                $state.go('home.order');// 返回订单列表
            })
            }else{
                alert('form invalid!');
            }
        };
    }])
    .controller('reqAddCtrl', ['$scope','$window','$stateParams', 'reqSrvc','pkgSrvc','req_pkg_Srvc','filterFilter', 'utils',function($scope,$window,$stateParams, reqSrvc,pkgSrvc, req_pkg_Srvc,filterFilter, utils){
            var selected_pkgs = []; //选中的packages
            $scope.orderId = $stateParams.orderId;

            //检测单状态
            $scope.states = [
                {
                    id: 1,
                    name: "未分配"
                },
                {
                    id: 2,
                    name: "已分配"
                },
                {
                    id: 3,
                    name: "完成"
                }
            ];

            $scope.saveReq = function(is){ //所属订单编号,以区别那一个订单下的工单
                //TODO: 1 sample_list , request_sample_rel 表 新增记录
                //新增本工单编号
                var _reqId = utils.uuid();
                //check whether select pkg
                if (selected_pkgs.length <= 0){
                    alert('请选择检测包！');
                    //$scope.reqAddForm.pkgs.$invalid = true;
                    return false;
                }
                for (var i = 0; i< selected_pkgs.length; i++){

                    var pkg_id = selected_pkgs[i].packageId;
                    //console.log(new_req_pkg_rel);
                    var new_req_pkg_rel = {
                        "soid": utils.uuid(),
                        "packageId": pkg_id,
                        "requestId": _reqId
                    };
                    // insert records into request_package_rel
                    req_pkg_Srvc.save(JSON.stringify(new_req_pkg_rel), function(){
                        console.log('检测包保存成功!');
                    });
                }

                var new_req = $scope.req;
                new_req.orderId = $scope.orderId;
                console.log('reqId:'+_reqId);
                new_req.requestId = _reqId;

                //new_req.state = $scope.req.state.name; //工单状态
                new_req.state = '未分配';

                new_req.gender = $scope.req.gender;
                new_req.canCheck = 'Y';
                reqSrvc.save(JSON.stringify(new_req), function(){
                    console.log('工单保存成功!');
                    $window.location.href = '/xnbs/app/index.html#/order/view/'+ $scope.orderId; // 返回所属订单详情
                })
            };
            //list all packages
            var entries_pkg = pkgSrvc.query(function(){
                //console.log(entries_pkg.data);
                $scope.pkgs = entries_pkg.data;
                //遍历所有 pkgs ， 添加 {selected: false} 属性
                for (var i = 0; i< $scope.pkgs.length; i++){
                    var pkg = $scope.pkgs[i];
                    pkg.selected = false;
                }
                //selected pkg
                $scope.selection = [];

                // helper method to get selected pkgs
                $scope.selectedPkgs = function selectedPkgs() {
                    return utils.filterFilter($scope.pkgs, "selected" , true);
                };

                // watch pkgs for changes
                $scope.$watch('pkgs|filter:{selected:true}', function(nv){
                    $scope.selection = nv.map(function(pkg){
                        return pkg;
                    });
                    //console.log($scope.selection);
                    selected_pkgs = $scope.selection;
                }, true);

            });
    }])
    .controller('reqViewCtrl', ['$scope', '$window','$state', '$stateParams','reqSrvc', 'sampleSrvc', 'sam_req_Srvc', 'pkgSrvc','req_pkg_Srvc','utils', 'createDialog','grabTaskSrvc',function($scope,  $window, $state ,$stateParams, reqSrvc, sampleSrvc, sam_req_Srvc,pkgSrvc,req_pkg_Srvc,utils, createDialog,grabTaskSrvc){
        var entry_req = reqSrvc.get({requestId: $stateParams.reqId},function(){
            //console.log(entry_req.data);
            $scope.req = entry_req.data;

        });

        //  样本和工单关联表 , 获取样本列表
        var sampel_req_rel =  sam_req_Srvc.query(function(){
            //从关联表 查找 工单request_id 下的 所有 sample_id
            var all_sampleId = sampel_req_rel.data;
            $scope.sampleIDs = utils.findById2(all_sampleId, $stateParams.reqId, 'requestId');
            //console.log($scope.sampleIDs);

            var entries_sample = sampleSrvc.query(function(){
                var all_samples = entries_sample.data;
                // 查找 工单id 下的 所有样本
                //$scope.samples = utils.findById2(all_samples, $stateParams.reqId, 'sampleId');
                //从所有样本记录里查找 含有 sampleIDs 的记录
                $scope.samples = utils.findById3(all_samples, $scope.sampleIDs, 'sampleId');
                console.log($scope.samples);
            });
        });

        //删除样本
        $scope.launchSimpleModal = function(sampleId){
            createDialog({
                title: '确定删除?',
                backdrop: true,
                success: {
                    label: '确定删除',
                    fn: function() {
                        sampleSrvc.delete({sampleId: sampleId}, function(){
                            console.log('del sucess!');
                            $state.reload(); //刷新工单列表
                        })
                    }
                },
                cancel: {label: '取消', fn: function(){
                    return false;
                }}
            });
        };

        //检测包列表
//        var entry_pkgs = pkgSrvc.query(function(){
//            //console.log(entry_pkgs.data);
//            $scope.pkgs = entry_pkgs.data;
//        })
        //TODO 1 req_pkg_rel
        //全部req_pkg_req记录数据
         var entries_req_pkg_rel = req_pkg_Srvc.query(function(){
             $scope.pkgs = entries_req_pkg_rel.data;
//             console.log($scope.pkgs);
             //获取该工单ID下面的所有检测包ID
             $scope.selectedPkgIds = utils.findById2($scope.pkgs, $stateParams.reqId, "requestId");
             console.log($scope.selectedPkgIds);
             //根据检测包ID 查找对应的检测包记录record
             var all_pkgs = pkgSrvc.query(function(){
                 $scope.pkgs = all_pkgs.data;
                 $scope.selectedPkgs = utils.findById3(all_pkgs.data, $scope.selectedPkgIds, 'packageId');
                 console.log($scope.selectedPkgs);
             })
         });

        //返回按钮 -> 返回 订单详情
        $scope.doBack = function(){
            window.history.back();
        };

        //抢任务
        $scope.grabTask = function(req){
            var json_data = {
                'userId': JSON.parse($window.localStorage['currentUser']).userid,
                'requestId': req.requestId
            };


            grabTaskSrvc.get(json_data,function(data){
                console.log(data.result);
                if (data.result.retcode == '00'){ // 分配成功
                    alert('抢单成功！');
                    //back to 工单列表
                    $state.go('home.myTask');
                }else{ //
                    alert(data.result.errmsg);
                }
            })
        };
    }])
    // 编辑工单
    .controller('reqEditCtrl', ['$scope', '$window','reqSrvc','pkgSrvc', 'req_pkg_Srvc', 'req_pkg_del_Srvc', '$state','$stateParams', 'utils',function($scope, $window,reqSrvc, pkgSrvc, req_pkg_Srvc, req_pkg_del_Srvc,$state,$stateParams, utils){
        var selectedPkgs = [],  //当前选中的检测包
            newSelectedPkgs = []; //点击save , 选中的检测包

        var entry_req = reqSrvc.get({requestId:$stateParams.reqId}, function(){
            // 该工单详情
            $scope.req = entry_req.data;

            //从req_pkg_rel 表中 查询工单requestId 下所有检测包ID
            var entries_req_pkg_rel = req_pkg_Srvc.query(function(){
                $scope.allPkgIDS = utils.findById2(entries_req_pkg_rel.data, $stateParams.reqId, 'requestId');

                //所有检测包 查找匹配 已勾选检测包
                var entries_pkg = pkgSrvc.query(function(){
                    $scope.pkgs = entries_pkg.data;

//                    console.log($scope.pkgs);
                    selectedPkgs = $scope.selectedPKgs = utils.findById3($scope.pkgs, $scope.allPkgIDS, 'packageId');
                    for (var j = 0; j < selectedPkgs.length; j++ ){
                        var currPkg = selectedPkgs[j];
                        currPkg.selected = true;
                    }
                    newSelectedPkgs = selectedPkgs; //引用类型
                    return selectedPkgs;
                })
            });

            //过滤函数
            Array.prototype.diff = function(arr){
                return this.filter(function(ele){
                    return arr.indexOf(ele) < 0 ;
                })
            };
            // 修改更新工单，保存
            $scope.updateReq = function () {

                // 监视检测包 watch pkgs for changes
                $scope.$watch('pkgs|filter:{selected:true}', function(nv){
                    newSelectedPkgs= nv.map(function(pkg){
                        //console.log(pkg);
                        return pkg;
                    });
                }, true);

                $scope.$apply(); //$apply is a function of our $scope (or scope inside a directive’s link function) so calling it will force a $digest loop
//                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
//                    $scope.$apply();
//                }

                if(selectedPkgs !== newSelectedPkgs){
                    if (selectedPkgs.diff(newSelectedPkgs).length >= 1 ){
                        var toremovePKgs = selectedPkgs.diff(newSelectedPkgs);
                        console.log('###'+toremovePKgs);
                        for (var i=0; i< toremovePKgs.length;i++){
                            //对 request_package_rel 表 删除对应记录
                            req_pkg_del_Srvc.delete({
                                'requestId': $stateParams.reqId,
                                'packageId': toremovePKgs[i].packageId
                            }, function(){
                                //console.log('del success!' + toremovePKgs[i-1].packageId);
                                //$window.location.href = '/xnbs/app/index.html#/req/view/' + $stateParams.reqId; // 返回所属工单详情
                            })

                        }
                    }else if (newSelectedPkgs.diff(selectedPkgs).length >= 1){
                        var toAddPkgs = newSelectedPkgs.diff(selectedPkgs);
                        for (var j = 0 ; j< toAddPkgs.length; j++){
                            //对 request_package_rel 表 新增记录
                            var req_pkg_data = {
                                "soid": utils.uuid(),
                                "packageId": toAddPkgs[j].packageId,
                                "requestId": $stateParams.reqId
                            };
                            req_pkg_Srvc.save(req_pkg_data, function(){
                                //console.log('add new pkg' + toAddPkgs[j-1].packageId);
                                //$window.location.href = '/xnbs/app/index.html#/req/view/'+ $stateParams.reqId; // 返回所属工单详情
                            })
                        }
                    }
                }
                var hasPkgFlag = false;
                for (var i = 0; i< $scope.pkgs.length; i++){
                    if ($scope.pkgs[i].selected){
                        hasPkgFlag = true;
                    }
                }
                if(!hasPkgFlag){
                    alert('请选择检测包！');
                    return false;
                }
                //更新该工单
                reqSrvc.update({requestId: $stateParams.reqId},$scope.req, function(){
                    console.log('update request success!');
                    $window.location.href = '/xnbs/app/index.html#/req/view/'+ $stateParams.reqId; // 返回所属工单详情
                })
            };
            //返回按钮 -> 返回 订单详情
            $scope.doBack = function(){
                window.history.back();
            }
        })
    }])
    .controller('sampleViewCtrl', ['$scope', '$stateParams','sampleSrvc', function($scope, $stateParams,sampleSrvc){
        var entry_sample = sampleSrvc.get({sampleId: $stateParams.sampleId},function(){
            //console.log(entry_req.data);
            $scope.sample = entry_sample.data;
        });
    }])
    .controller('sampleAddCtrl', ['$scope', '$stateParams', '$window', 'sampleSrvc', 'sam_req_Srvc', 'utils', function($scope, $stateParams, $window ,sampleSrvc, sam_req_Srvc, utils){
        $scope.reqId = $stateParams.reqId;

        $scope.states = [
            {
                id : -1,
                name: '--请选择--'
            },
            {
                id : 0,
                name: '合格'
            },
            {
                id : 1,
                name: '不合格'
            }
        ];
        $scope.selectedItem = $scope.states[0];
        $scope.sample = {};

        $scope.saveSample = function(){ //所属工单编号,以区别那一个工单下的样本

            //新样本
            var _uuid = utils.uuid(),

            selectId = $scope.selectedItem.id ;
            if (selectId == -1){
                alert('请选择样本状态');
                return;
            }else if ( !$scope.sample.sampleName) {
                alert('请填写样本名称');
                return;
            }

            $scope.sample.sampleId = _uuid;
            $scope.sample.sampleState = selectId;

            sampleSrvc.save(JSON.stringify($scope.sample), function(){
                //console.log(_uuid);
                console.log('save success!');

                // request_sample_rel 插入记录
                var new_req_sam_rel = {
                    "requestId" : $scope.reqId,
                    "sampleId" : _uuid
                };
                sam_req_Srvc.save(new_req_sam_rel);
                $window.location.href = '/xnbs/app/index.html#/req/view/'+ $scope.reqId; // 返回所属工单详情
            })
        }
    }])
    .controller('userListCtrl', ['$scope','userSrvc', '$state','$filter','createDialog','filteredListService',function($scope, userSrvc, $state, $filter,createDialog,filteredListService){
        var entries_user = userSrvc.query(function(){
            console.log(entries_user.data);
            $scope.users = entries_user.data; //all user list

            $scope.pageSize = 5;

            $scope.reverse = false;
            //reset all data
            $scope.resetAll = function () {
                //$scope.filteredList = $scope.allItems;
                $scope.filteredList = entries_user.data;
                $scope.userid = '';
                $scope.userName = '';
                $scope.userMobile = '';
                $scope.roleName = '';
                $scope.searchText = '';
                $scope.currentPage = 0;
                $scope.Header = ['', '', ''];
            };

            $scope.search = function () {
                $scope.filteredList =
                    filteredListService.searched(entries_user.data, $scope.searchText, ['userid','userName', 'userMobile', 'roleName' ] );

                if ($scope.searchText == '') {
                    $scope.filteredList = entries_user.data;
                }
                $scope.pagination();
            };


            // Calculate Total Number of Pages based on Search Result
            $scope.pagination = function () {
                $scope.ItemsByPage = filteredListService.paged( $scope.filteredList, $scope.pageSize );

            };
//
            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

            $scope.firstPage = function () {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function () {
                $scope.currentPage = $scope.ItemsByPage.length - 1;
            };

            $scope.range = function (input, total) {
                var ret = [];
                if (!total) {
                    total = input;
                    input = 0;
                }
                for (var i = input; i < total; i++) {
                    if (i != 0 && i != total - 1) {
                        ret.push(i);
                    }
                }
                return ret;
            };

            $scope.sort = function(sortBy){
                $scope.resetAll();

                $scope.columnToOrder = sortBy;

                //$Filter - Standard Service
                $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
                var iconName;
                if($scope.reverse)
                    iconName = 'glyphicon glyphicon-chevron-up';
                else
                    iconName = 'glyphicon glyphicon-chevron-down';

                if(sortBy === 'userid')
                {
                    $scope.Header[0] = iconName;
                }
                else if(sortBy === 'userName')
                {
                    $scope.Header[1] = iconName;
                }else if(sortBy === 'userMobile')
                {
                    $scope.Header[2] = iconName;
                }else if(sortBy == 'roleName')
                {
                    $scope.Header[3] = iconName;
                }

                $scope.reverse = !$scope.reverse;

                $scope.pagination();
            };
            //By Default sort order create time
            $scope.sort ('userName');
        });
        //删除用户
        $scope.launchSimpleModal = function(userId) { // Delete a movie. Issues a DELETE to /api/movies/:id
            createDialog({
                title: '确定删除?',
                backdrop: true,
                success: {
                    label: '确定删除',
                    fn: function() {
                        userSrvc.delete({userId: userId}, function(){
                            console.log('del success!');
                            //refresh order list
                            $state.reload();
                        })
                    }
                },
                cancel: {label: '取消', fn: function(){
                    return false;
                }}
            });

        }
    }])
    .controller('userViewCtrl', ['$scope','userSrvc', '$stateParams',function($scope, userSrvc, $stateParams){

        var _user = userSrvc.get({userId: $stateParams.userId}, function(){
            $scope.user = _user.data;
        })
    }])
    .controller('userEditCtrl', ['$scope','userSrvc', '$state','$stateParams',function($scope, userSrvc,$state,$stateParams){
        var _user = userSrvc.get({userId: $stateParams.userId}, function(){
            console.log(_user.data);
            $scope.user = _user.data;

            // 角色数据
            $scope.roles = [
                {
                    id : 0,
                    name: '管理员',
                    access:""
                },
                {
                    id : 1,
                    name: '仓管员',
                    access:""
                },
                {
                    id : 2,
                    name: '检测员',
                    access:""
                }
            ];
            //var user_role = $scope.roles[parseInt(_user.data.roleId)];
            //$scope.selectedItem = user_role;
            //$scope.role = user_role;
            $scope.role = $scope.roles[parseInt($scope.user.roleId)];
        });



        // 修改完成，保存
       $scope.updateUser = function () {
           //$scope.user.roleId = $scope.selectedItem.id.toString();
           $scope.user.roleId = $scope.role.id;
            userSrvc.update({userId: $stateParams.userId},  $scope.user ,function(){
                console.log('save user'+ JSON.stringify($scope.user));
                console.log('upd ok!');
                $state.go('home.user');
            });
        };

        //返回到 用户详情
        $scope.doBack = function(){
            window.history.back();
        }
    }])
    .controller('userAddCtrl', ['$scope','$state','userSrvc', function($scope, $state, userSrvc){

        // 角色数据
        $scope.roles = [
            {
                id : 0,
                name: '管理员',
                access:""
            },
            {
                id : 1,
                name: '仓管员',
                access:""
            },
            {
                id : 2,
                name: '检测员',
                access:""
            }
        ];
        //$scope.selectedItem = $scope.roles[0];
//        $scope.saveUser = function(){
//            var new_user = $scope.user;
//            if ($scope.selectedItem.id == -1){
//                alert('请选择用户角色！');
//                return false;
//            }else{
//                new_user.roleId = $scope.selectedItem.id;
//            }
//
//            userSrvc.save(JSON.stringify(new_user), function(){
//                console.log('save success!');
//                $state.go('home.user');// 返回用户列表
//            })
//
//        };

        $scope.saveUser = function(){
            var new_user = $scope.user;
            new_user.roleId = $scope.role.id;
            userSrvc.save(JSON.stringify(new_user), function(){
                console.log('save success!');
                $state.go('home.user');// 返回用户列表
            })

        };
    }])
    .controller('loginCtrl', ['$scope', '$window','$rootScope' ,'$http','$state', function($scope, $window,$rootScope, $http, $state){


        $scope.login = function(){

            // get users login data from form
            var _userName = $scope.userName,
                _password = $scope.password,

                login_user = {
                    userName : _userName,
                    password: _password
                };
            // 业务逻辑处理
            console.log(login_user);
            $http({
                url: '/xnbs/api/login',
                method: 'POST',
                data: login_user
            }).success(function(result){
                console.log(result);
                if (result.result.retcode == '00'){
                    var user = result.data;

                    $window.localStorage['currentUser']= JSON.stringify(user);

                    $rootScope.currentUser = $window.localStorage['currentUser'];

                    $state.go('home.order');
                }else if (result.result.retcode == 'N1'){
                    alert('用户名或者密码错误！');   //666666
                }
            });
        }
    }])
    // 任务列表
    .controller('taskListCtrl', ['$rootScope','$scope', '$window','$state','$stateParams' , '$http', '$filter', 'filteredListService', 'grabTaskSrvc', 'finishTaskSrvc',function($rootScope,$scope, $window,$state,$stateParams, $http, $filter, filteredListService, grabTaskSrvc,finishTaskSrvc){
        //get request list data
            $http({
                url: '/xnbs/api/udf/exeSql',
                method:'POST',
                data:{
                    'selSql': 'SELECT tr.request_id,(select count(1) from xnbs_tab_request_package_rel  trpl ,xnbs_tab_package_list tpl where trpl.package_id = tpl.package_id AND trpl.request_id = tr.request_id) as cnt,(select  SUM(tcil.item_workload) from xnbs_tab_request_package_rel trpl ,xnbs_tab_package_list tpl, xnbs_tab_package_item_rel tpir, xnbs_tab_check_item_list tcil where trpl.request_id = tr.request_id AND trpl.package_id = tpl.package_id AND tpl.package_id = tpir.package_id AND tpir.item_id = tcil.item_id ) as all_workload ,tr.state , tr.person_name , tr.create_time FROM xnbs_tab_request tr where state IN ("未分配")'

                }
            })
            .success(function(result){
                $scope.selectedTasks = [];
                //过滤 by state
                $scope.states = [ {
                    id :1 ,
                    name: '未分配'
                },
                {
                    id :2 ,
                    name: '已分配'
                },
                {
                    id :3 ,
                    name: '完成'
                }
              ];


            $scope.setSelectedTasks = function(){
                var id = this.state.id;
                if (_.contains($scope.selectedTasks, id)) {
                    $scope.selectedTasks = _.without($scope.selectedTasks, id);
                } else {
                    $scope.selectedTasks.push(id);
                }
                return false;
            };

            //过滤 勾选 样式
            $scope.isChecked = function (id) {
                if (_.contains($scope.selectedTasks, id)) {
                    return 'icon-ok pull-right';
                }
                return false;
            };

            $scope.tasks = result.data;

                $scope.pageSize = 5;

                $scope.reverse = false;
                //reset all data
                $scope.resetAll = function () {
                    $scope.filteredList = $scope.tasks;
                    $scope.request_id = '';
                    $scope.person_name = '';
                    $scope.searchText = '';
                    $scope.currentPage = 0;
                    $scope.Header = ['', '', ''];
                };

                $scope.search = function () {
                    $scope.filteredList =
                        filteredListService.searched($scope.tasks, $scope.searchText, ['request_id', 'person_name','create_time' ]);

                    if ($scope.searchText == '') {
                        $scope.filteredList = $scope.tasks;
                    }
                    $scope.pagination();
                };


                // Calculate Total Number of Pages based on Search Result
                $scope.pagination = function () {
                    $scope.ItemsByPage = filteredListService.paged( $scope.filteredList, $scope.pageSize );

                };
//
                $scope.setPage = function () {
                    $scope.currentPage = this.n;
                };

                $scope.firstPage = function () {
                    $scope.currentPage = 0;
                };

                $scope.lastPage = function () {
                    $scope.currentPage = $scope.ItemsByPage.length - 1;
                };

                $scope.range = function (input, total) {
                    var ret = [];
                    if (!total) {
                        total = input;
                        input = 0;
                    }
                    for (var i = input; i < total; i++) {
                        if (i != 0 && i != total - 1) {
                            ret.push(i);
                        }
                    }
                    return ret;
                };

                $scope.sort = function(sortBy){
                    $scope.resetAll();

                    $scope.columnToOrder = sortBy;

                    //$Filter - Standard Service
                    $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
                    var iconName;
                    if($scope.reverse)
                        iconName = 'glyphicon glyphicon-chevron-up';
                    else
                        iconName = 'glyphicon glyphicon-chevron-down';

                    if(sortBy === 'request_id')
                    {
                        $scope.Header[0] = iconName;
                    }
                    else if (sortBy === 'person_name'){
                        $scope.Header[1] = iconName;
                    }
                    else if(sortBy === 'cnt')
                    {
                        $scope.Header[2] = iconName;
                    }
                    else if (sortBy === 'all_workload') {
                        $scope.Header[3] = iconName;
                    }
                    else if (sortBy === 'create_time'){
                        $scope.Header[4] = iconName;
                    }

                    $scope.reverse = !$scope.reverse;

                    $scope.pagination();
                };

                //By Default sort request createtime
                $scope.sort ('create_time');
            });
        //抢任务
        $scope.grabTask = function(task){
            var json_data = {
               //'userId': $rootScope.currentUser.userid,
               // 'userId': '149B62D3FE2411E4917100163E041A03',
               'userId': JSON.parse($window.localStorage['currentUser']).userid,
               'requestId': task.request_id
            };


            grabTaskSrvc.get(json_data,function(data){
                console.log(data.result);
                if (data.result.retcode == '00'){ // 分配成功
                    alert('抢单成功！');
                    //refrsh list
                    $state.reload();
                }else{ //
                    alert(data.result.errmsg);
                }
            })
        };
        //完成任务
        $scope.completeTask = function(task){
            var json_data = {
                //'userId': $rootScope.currentUser.userid,
                //'userId': '149B62D3FE2411E4917100163E041A03', //Fixme
                'userId': JSON.parse($window.localStorage['currentUser']).userid,
                'requestId': task.request_id
            };

            finishTaskSrvc.save(json_data,function(data){
                console.log(data.result);
                if (data.result.retcode == '00'){ // 完成任务
                    alert('完成任务！');
                    $state.reload(); //refresh list
                }else{
                    alert(data.result.errmsg);
                }
            });
        };
    }])
    // 我的任务列表
    .controller('myTaskListCtrl', [ '$window','$rootScope','$scope', '$state' ,'$stateParams' ,'$filter', 'filteredListService', 'myTaskSrvc', 'finishTaskSrvc',function($window,$rootScope,$scope, $state,$stateParams, $filter, filteredListService, myTaskSrvc,finishTaskSrvc){
        //get my task list
        var json_data = {
            //'userId': $rootScope.currentUser.userid
            //'userId': 'F33D70D9FE2511E4917100163E041A12'
            'userId': JSON.parse($window.localStorage['currentUser']).userid
        };
        myTaskSrvc.get(json_data, function(result){
//            console.log(result.data);
            $scope.tasks = result.data;

            $scope.pageSize = 5;

            $scope.reverse = false;
            //reset all data
            $scope.resetAll = function () {
                $scope.filteredList = $scope.tasks;
                $scope.request_id = '';
                $scope.person_name = '';
                $scope.state = '';
                $scope.searchText = '';
                $scope.currentPage = 0;
                $scope.Header = ['', '', ''];
            };

            $scope.search = function () {
                $scope.filteredList =
                    filteredListService.searched($scope.tasks, $scope.searchText, ['request_id','person_name','state','create_time']);

                if ($scope.searchText == '') {
                    $scope.filteredList = $scope.tasks;
                }
                $scope.pagination();
            };


            // Calculate Total Number of Pages based on Search Result
            $scope.pagination = function () {
                $scope.ItemsByPage = filteredListService.paged( $scope.filteredList, $scope.pageSize );

            };
//
            $scope.setPage = function () {
                console.log(this.n);
                $scope.currentPage = this.n;
            };

            $scope.firstPage = function () {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function () {
                $scope.currentPage = $scope.ItemsByPage.length - 1;
            };

            $scope.range = function (input, total) {
                var ret = [];
                if (!total) {
                    total = input;
                    input = 0;
                }
                for (var i = input; i < total; i++) {
                    if (i != 0 && i != total - 1) {
                        ret.push(i);
                    }
                }
                return ret;
            };

            $scope.sort = function(sortBy){
                $scope.resetAll();

                $scope.columnToOrder = sortBy;

                //$Filter - Standard Service
                $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
                var iconName;
                if($scope.reverse)
                    iconName = 'glyphicon glyphicon-chevron-up';
                else
                    iconName = 'glyphicon glyphicon-chevron-down';

                if(sortBy === 'request_id')
                {
                    $scope.Header[0] = iconName;
                }
                else if(sortBy === 'person_name')
                {
                    $scope.Header[1] = iconName;
                }
                else if(sortBy === 'cnt')
                {
                    $scope.Header[2] = iconName;
                }
                else if(sortBy === 'all_workload')
                {
                    $scope.Header[3] = iconName;
                }
                else if(sortBy === 'cust_time')
                {
                    $scope.Header[4] = iconName;
                }
                else if(sortBy === 'state')
                {
                    $scope.Header[5] = iconName;
                }
                else if(sortBy === 'create_time')
                {
                    $scope.Header[6] = iconName;
                }


                $scope.reverse = !$scope.reverse;

                $scope.pagination();
            };

            //By Default sort create_time
            $scope.sort ('create_time');
        });


        //完成任务
        $scope.completeTask = function(task){
            var json_data = {
                //'userId': $rootScope.currentUser.userid,
                'userId': JSON.parse($window.localStorage['currentUser']).userid,
                'requestId': task.request_id
            };

            finishTaskSrvc.save(json_data,function(data){
                console.log(data.result);
                if (data.result.retcode == '00'){ // 完成任务
                    alert('完成任务！');
                    $state.reload(); //refresh list
                }else{
                    alert(data.result.errmsg);
                }
            });
        };
    }])
    .controller('testCtrl', ['$scope','ckItemSrvc', function($scope,ckItemSrvc){
        $scope.test = function(){
            var entry_req = ckItemSrvc.get({ckItemId: '2F1A1DF7CEFB11E4AFEA00163E041A03'},function(){
                console.log(entry_req.data);
            });
        }
    }]);
