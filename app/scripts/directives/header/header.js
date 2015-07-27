'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('xnbsApp.directive',[])
	.directive('header',function(){
		return {
        templateUrl:'views/header/header.html',
        restrict: 'E',
        replace: true
    	}
	});


