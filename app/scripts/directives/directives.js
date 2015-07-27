/**
 * Created by pc on 2015/3/10.
 */
'use strict';

var directives = angular.module('jianceApp.directives', []);

directives.directive('butterbar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                element.addClass('hide');

                $rootScope.$on('$routeChangeStart', function() {
                    element.removeClass('hide');
                });

                $rootScope.$on('$routeChangeSuccess', function() {
                    element.addClass('hide');
                });
            }
        };
    }]);

directives.directive('focus',
    function() {
        return {
            link: function(scope, element, attrs) {
                element[0].focus();
            }
        };
    });
