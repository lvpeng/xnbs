/**
 * Created by penglu on 2015/4/26.
 */
'use strict';
/**
 * @ngdoc function
 * @name xnbsApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the xnbsApp
 */
angular.module('xnbsApp.controller',[])
    .controller('orderCtrl', ['$scope', '$location','orderSrvc',function($scope ,$location,orderSrvc) {
        //get api data
        var entries = orderSrvc.query(function() {
            console.log(entries);
            $scope.items = entries.data;
        }); //query() returns all the entries
    }
]);
