'use strict';
/**
 * @ngdoc overview
 * @name xnbsApp
 * @description
 * # xnbsApp
 *
 * Main module of the application.
 */
angular
    .module('xnbsApp', [
        'ui.router',
        'ngAnimate',
        'ngResource',
        //'xnbsApp.filters',
        'xnbsApp.directive',
        'xnbsApp.service',
        'xnbsApp.controller',
        'fundoo.services',
        'ui.select',
        'xnbsApp.authorSrvc'
    ])
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/login');

        // Application routes
        $stateProvider
            .state('home', {
                url:'',
                abstract: true,
                controller: 'homeCtrl',
                templateUrl: 'views/home.html',
                data: {
                    requireLogin: true
                }
            })
            // ------订单列表 --------
            .state('home.order',{
                url:'/order',
                controller: 'orderListCtrl',
                templateUrl: 'views/order/order-list.html'
                //templateUrl: 'views/order/order-list-tst.html'
            })
            // ------订单详细 --------
            .state('home.orderDetail',{
                url:'/order/view/:orderId',
                controller: 'orderViewCtrl',
                templateUrl: 'views/order/order-detail.html'
            })
            // ------订单编辑 --------
            .state('home.orderEdit',{
                url:'/order/edit/:orderId',
                controller: 'orderEditCtrl',
                templateUrl: 'views/order/order-edit.html'
            })
            // ------订单创建 --------
            .state('home.orderAdd',{
                url:'/order/add/',
                controller: 'orderAddCtrl',
                templateUrl: 'views/order/order-add.html'
            })
            // ------工单列表 --------
            .state('home.req', {
                url: '/req',
                controller: 'reqListCtrl',
                templateUrl : 'views/req/req-list.html'
            })
            // ------工单创建 --------
            .state('home.reqAdd', {
                url: '/request/add/:orderId',
                controller: 'reqAddCtrl',
                templateUrl : 'views/request/req-add.html'
            })
            // ------工单详情 --------
            .state('home.reqDetail',{
                url:'/req/view/:reqId',
                controller: 'reqViewCtrl',
                templateUrl: 'views/request/req-detail.html'
            })
            // ------工单编辑 --------
            .state('home.reqEdit',{
                url:'/req/edit/:reqId',
                controller: 'reqEditCtrl',
                templateUrl: 'views/request/req-edit.html'
            })
            // ------样本详情 --------
            .state('home.sampleDetail',{
                url:'/sample/view/:sampleId',
                controller: 'sampleViewCtrl',
                templateUrl: 'views/sample/sample-detail.html'
            })
            // ------样本添加 --------
            .state('home.sampleAdd',{
                url:'/sample/add/:reqId',
                controller: 'sampleAddCtrl',
                templateUrl: 'views/sample/sample-add.html'
            })
            // ------用户列表 --------
            .state('home.user',{
                url:'/user/',
                controller: 'userListCtrl',
                templateUrl: 'views/user/user-list.html'
            })
            // ------用户详情 --------
            .state('home.userDetail',{
                url: '/user/view/:userId',
                controller: 'userViewCtrl',
                templateUrl: 'views/user/user-detail.html'
            })
            // ------用户编辑 --------
            .state('home.userEdit',{
                url: '/user/edit/:userId',
                controller: 'userEditCtrl',
                templateUrl: 'views/user/user-edit.html'
            })
            // ------用户添加 --------
            .state('home.userAdd',{
                url: '/user/add/',
                controller: 'userAddCtrl',
                templateUrl: 'views/user/user-add.html'
            })
            // ------工单任务列表 --------
            .state('home.taskList',{
                url: "/task",
                controller: 'taskListCtrl',
                templateUrl: 'views/task/task-list.html'
                //templateUrl: 'views/task/task-list-abandon.html'
            })
            // ------我的工单任务 --------
            .state('home.myTask',{
                url:'/myTask',
                controller: 'myTaskListCtrl',
                templateUrl: 'views/task/myTask.html'
            })
            // ------工单任务详情 --------
//            .state('home.taskView',{
//                url: "/task/view/:detectUserId",
//                controller: 'taskViewCtrl',
//                templateUrl: 'views/task/task-detail.html'
//            })
            // ------工单任务领取 --------
//            .state('home.taskAssign',{
//                url: "/task/assign",
//                controller: 'taskAssignCtrl',
//                templateUrl: 'views/task/task-assign.html'
//            })
            // ------登录 --------
            .state('login',{
                url:'/login',
                controller: 'loginCtrl',
                templateUrl: 'views/login.html',
                data : {
                    requireLogin: true
                }
            })
            // ------401 --------
            .state('authError',{
                url:'/401',
                //controller: 'authErrorCtrl',
                templateUrl: 'views/401.html'
            })
    }])
//    .run(function ($state, $rootScope,authService, $location) {
//
//        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//            var requireLogin = toState.data.requireLogin;
//
//            if (requireLogin && typeof window.localStorage.currentUser === 'undefined') {
//                event.preventDefault();
//                //$location.path('/login'); // go to login page
//                $state.go('login');
//            }else if(!authService.isUrlAccessibleForUser(toState.url)){
//                event.preventDefault();
//                //$location.path('/authError');// go to 401 page
//                $state.go('authError')
//            }
//        })
//    });
//    .run(function($rootScope, $location, authService){
//        $rootScope.$on("$routeChangeStart", function(event, next, current) {
//            if(!authService.isUrlAccessibleForUser(next.originalPath))
//                $location.path('/authError');
//        });
//    })



