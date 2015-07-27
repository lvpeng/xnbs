/**
 * Created by penglu on 2015/4/22.
 */
//angular.module('xnbsApp')
//    .directive('order',['$location',function() {
//        return {
//            templateUrl:'views/order/order-list.html',
//            restrict: 'E',
//            replace: true,
//            scope: {
//            },
//            controller:function($scope){
//
//            }
//        }
//    }]);

angular.module('xnbsApp')
    .directive('order',function() {
        return {
            templateUrl:'views/order/order-list.html',
            restrict: 'E',
            replace: false
        }
    });

