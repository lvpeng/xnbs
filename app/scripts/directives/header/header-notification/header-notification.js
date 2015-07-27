'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('xnbsApp.directive',[])
	.directive('headerNotification',function(){
		return {
        templateUrl:'views/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true
    	}
	});


