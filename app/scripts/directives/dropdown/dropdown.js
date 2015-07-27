/**
 * Created by penglu on 2015/5/7.
 */
angular.module('xnbsApp',[]).directive("dropdown", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "templates/dropdown.html",
        scope: {
            placeholder: "@",
            list: "=",
            selected: "=",
            property: "@"
        },
        link: function(scope) {
            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function(item) {
                scope.isPlaceholder = false;
                scope.selected = item;
                if (scope.onChange !== undefined)
                    scope.onChange(item);
            };

            scope.isSelected = function(item) {
                return item[scope.property] === scope.selected[scope.property];
            };

            scope.show = function() {
                scope.listVisible = true;
            };

            $rootScope.$on("documentClicked", function(inner, target) {
                if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
                    scope.$apply(function() {
                        scope.listVisible = false;
                    });
            });

            scope.$watch("selected", function(value) {
                scope.isPlaceholder = scope.selected[scope.property] === undefined;
                scope.display = scope.selected[scope.property];
            });
        }
    }
});