/**
 * Created by penglu on 2015/4/28.
 */
angular.module('xnbsApp.directive',[])
    .directive('header',function(){
        return {
            templateUrl:'views/header/header.html',
            restrict: 'E',
            replace: true
        }
    })
    .directive('headerNotification',function(){
        return {
            templateUrl:'views/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true
        }
    })
    .directive('sidebar',['$location',function() {
        return {
            templateUrl:'views/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;

                $scope.check = function(x){

                    if(x==$scope.collapseVar)
                        $scope.collapseVar = 0;
                    else
                        $scope.collapseVar = x;
                };

                $scope.multiCheck = function(y){

                    if(y==$scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };
            }
        }
    }])
    .directive('sidebarSearch',function() {
        return {
            templateUrl:'views/sidebar/sidebar-search/sidebar-search.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'home';
            }
        }
    });
//    .directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
//        // contains
//        function contains(arr, item, comparator) {
//            if (angular.isArray(arr)) {
//                for (var i = arr.length; i--;) {
//                    if (comparator(arr[i], item)) {
//                        return true;
//                    }
//                }
//            }
//            return false;
//        }
//
//        // add
//        function add(arr, item, comparator) {
//            arr = angular.isArray(arr) ? arr : [];
//            if(!contains(arr, item, comparator)) {
//                arr.push(item);
//            }
//            return arr;
//        }
//
//        // remove
//        function remove(arr, item, comparator) {
//            if (angular.isArray(arr)) {
//                for (var i = arr.length; i--;) {
//                    if (comparator(arr[i], item)) {
//                        arr.splice(i, 1);
//                        break;
//                    }
//                }
//            }
//            return arr;
//        }
//
//        // http://stackoverflow.com/a/19228302/1458162
//        function postLinkFn(scope, elem, attrs) {
//            // compile with `ng-model` pointing to `checked`
//            $compile(elem)(scope);
//
//            // getter / setter for original model
//            var getter = $parse(attrs.checklistModel);
//            var setter = getter.assign;
//            var checklistChange = $parse(attrs.checklistChange);
//
//            // value added to list
//            var value = $parse(attrs.checklistValue)(scope.$parent);
//
//
//            var comparator = angular.equals;
//
//            if (attrs.hasOwnProperty('checklistComparator')){
//                comparator = $parse(attrs.checklistComparator)(scope.$parent);
//            }
//
//            // watch UI checked change
//            scope.$watch('checked', function(newValue, oldValue) {
//                if (newValue === oldValue) {
//                    return;
//                }
//                var current = getter(scope.$parent);
//                if (newValue === true) {
//                    setter(scope.$parent, add(current, value, comparator));
//                } else {
//                    setter(scope.$parent, remove(current, value, comparator));
//                }
//
//                if (checklistChange) {
//                    checklistChange(scope);
//                }
//            });
//
//            // declare one function to be used for both $watch functions
//            function setChecked(newArr, oldArr) {
//                scope.checked = contains(newArr, value, comparator);
//            }
//
//            // watch original model change
//            // use the faster $watchCollection method if it's available
//            if (angular.isFunction(scope.$parent.$watchCollection)) {
//                scope.$parent.$watchCollection(attrs.checklistModel, setChecked);
//            } else {
//                scope.$parent.$watch(attrs.checklistModel, setChecked, true);
//            }
//        }
//
//        return {
//            restrict: 'A',
//            priority: 1000,
//            terminal: true,
//            scope: true,
//            compile: function(tElement, tAttrs) {
//                if (tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') {
//                    throw 'checklist-model should be applied to `input[type="checkbox"]`.';
//                }
//
//                if (!tAttrs.checklistValue) {
//                    throw 'You should provide `checklist-value`.';
//                }
//
//                // exclude recursion
//                tElement.removeAttr('checklist-model');
//
//                // local scope var storing individual checkbox model
//                tElement.attr('ng-model', 'checked');
//
//                return postLinkFn;
//            }
//        };
//    }]);