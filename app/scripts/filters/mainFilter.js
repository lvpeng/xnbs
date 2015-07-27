/**
 * Created by penglu on 2015/5/25.
 */
angular.module('xnbsApp.filters', [])
    .filter('taskFilter', [function () {
    return function (tasks, selectedTasks) {
        console.log(tasks + ',' + selectedTasks);
        if (!angular.isUndefined(tasks) && !angular.isUndefined(selectedTasks) && selectedTasks.length > 0) {
            var tempTasks = [];
            angular.forEach(selectedTasks, function (id) {
                angular.forEach(tasks, function (task) {
                    if (angular.equals(tasks.state.id, id)) {
                        tempTasks.push(task);
                    }
                });
            });
            return tempTasks;
        } else {
            return tasks;
        }
    };
    }])
    .filter('gender', function(gender){
         var gender_c ;
         gender_zh =  gender=== 'F' ? '女':'男';
        return gender_zh;
    });
