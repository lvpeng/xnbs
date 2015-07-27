/**
 * Created by penglu on 2015/3/17.
 */
angular.module('xnbsApp.controller',[])
    .controller('loginCtrl', ['$scope', '$location', function($scope, $location){
        // get users login data from form
        var _userName = $scope.userName,
            _password = $scope.password,

            login_user = {
                userName : _userName,
                password: _password
            };

        $scope.login = function(){
            // 业务逻辑处理
            console.log(login_user);
            //loginSrvc.save(login_user);
            //$location.path('/dashboard/order');
        }
    }]);

