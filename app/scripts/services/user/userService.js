angular.module('user.services', ['ngResource'])
    .factory("userList",['$resource',function($resource){
        return $resource("/xnbs/api/user/paged/:id",{id: '@itemId'},
            {
                'get':    {method:'POST'},
                'query':  {method:'POST'},
                'update': {method:'PUT', params: {id: '@itemId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@itemId'}
            }
        );
    }])
    .factory("userSev",['$resource',function($resource){
        return $resource("/xnbs/api/user/:id",{id: '@itemId'},
            {
                'get':    {method:'get'},
                'query':  {method:'POST'},
                'update': {method:'PUT', params: {id: '@itemId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@itemId'}
            }
        );
    }])
    .factory("userRole",['$resource',function($resource){
        return $resource("/xnbs/api/role/:id",{id: '@itemId'},
            {
                'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@itemId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@itemId'}
            }
        );
    }])