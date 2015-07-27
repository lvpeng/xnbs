/**
 * Created by penglu on 2015/4/23.
 */
angular.module('xnbsApp',[])
    .controller('userCtrl', ['$scope', '$location', 'userSrvc', function($scope, $location, userSrvc){
        // get users list data from api
        var user_entries = userSrvc.query(function(){
            console.log(user_entries);
            $scope.items = user_entries.data;
        });
}]);