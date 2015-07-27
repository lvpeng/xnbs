/**
 * Created by penglu on 2015/3/10.
 */
//README : MUST　HAVE [] , EVEN IF IT HAS NO DEPENDENCIES
angular.module('jianceApp.controllers',[])
    //检测项列表控制器Controller
    .controller('itemListCtrl', function($scope, $location,CheckItemSrvc){
        //get api data
        var entries = CheckItemSrvc.query(function() {
            console.log(entries);
            $scope.items = entries.data;
        }); //query() returns all the entries
        //创建新检测项 addNewItem
        $scope.addNewItem  = function(){
            $location.path('/newCItem');
        };
        //编辑检测项函数    editItem
        $scope.editItem = function(itemId){
            $location.path('/edit/' + itemId);   
        };
        // callback for ng-click 'deleteUser':
        $scope.deleteItem = function (itemId) {
            CheckItemSrvc.delete({ id: itemId });

            var entries = CheckItemSrvc.query(function() {
                console.log(entries);
                $scope.items = entries.data;
        }); //query() returns all the entries
        };
})
    //检测项创建控制器Controller
    .controller('itemCreateCtrl',function($scope, $location ,CheckItemSrvc){
        $scope.items = [   // get from server
            {type:'black',desc: 'desc1'},
            {type:'white',desc: 'desc2'},
            {type:'red',desc: 'desc3'}
        ];

        // edit button
        $scope.addNemItem = function(){
            console.log($scope.item);
            CheckItemSrvc.save($scope.item);
            $location.path('/');
        }

})
    //检测项编辑控制器Controller
    .controller('itemEditCtrl', function($scope, $routeParams, $location, CheckItemSrvc){
        //$scope.item = CheckItemSrvc.get({id: $routeParams.itemId});

        var entry = CheckItemSrvc.get({ id: $routeParams.itemId }, function() {
            $scope.item = entry.data;
        }); // get() returns a single entry

            // callback for ng-click 'updateUser':
        $scope.updateItem = function () {
            console.log($scope.item);
            CheckItemSrvc.update($scope.item);
            $location.path('/');
        };
            
         // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/');
        };
  });
