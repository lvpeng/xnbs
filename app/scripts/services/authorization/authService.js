/**
 * Created by Peng lu on 2015/6/5.
 */
angular.module('xnbsApp.authorSrvc',[])
    .factory('authService', ['$window', function ($window) {
    var _roleId = JSON.parse($window.localStorage['currentUser']).roleId;
    var userRole = [];// obtained from backend fixme : one peerson may have multi role
    var role_map = [{
            roleId: 0,
            roleName: 'super_admin'
        },
        {
            roleId: 1,
            roleName: 'admin'
        },
        {
            roleId: 2,
            roleName: 'user'
        }
    ];

    for(var i = 0 ; i < role_map.length; i++){
        if(role_map[i].roleId == _roleId){
            userRole.push(role_map[i].roleName);
        }
    }

    var userRoleRouteMap = {
        'super_admin': [ '/login', '/order', '/order/view/','/user', '/authError'],
        'admin': [ '/login', '/order', '/order/view/FA54071205AD11E5A0AC00163E041A03', '/authError'],
        'user': [ '/login','/order',  '/authError']
    };

    return {

        userHasRole: function (role) {
            for (var j = 0; j < userRole.length; j++) {
                if (role == userRole[j]) {
                    return true;
                }
            }
            return false;
        },

        isUrlAccessibleForUser: function (route) {
            for (var i = 0; i < userRole.length; i++) {
                var role = userRole[i];
                var validUrlsForRole = userRoleRouteMap[role];
                if (validUrlsForRole) {
                    for (var j = 0; j < validUrlsForRole.length; j++) {
                        if (validUrlsForRole[j] == route)
                            return true;
                    }
                }
            }
            return false;
        }
    };
}]);