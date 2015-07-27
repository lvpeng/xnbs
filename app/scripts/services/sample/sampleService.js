angular.module('sample.services', ['ngResource'])
    .factory("sampleList",['$resource',function($resource){
        return $resource("/xnbs/api/sample/paged/:id",{id: '@itemId'},
            {
                'get':    {method:'post'},
                'query':  {method:'POST'},
                'update': {method:'PUT', params: {id: '@itemId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@itemId'}
            }
        );
    }])
    .factory("sampleSev",['$resource',function($resource){
        return $resource("/xnbs/api/sample/:id",{id: '@itemId'},
            {
                'get':    {method:'get'},
                'query':  {method:'POST'},
                'update': {method:'PUT', params: {id: '@itemId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@itemId'}
            }
        );
    }]);