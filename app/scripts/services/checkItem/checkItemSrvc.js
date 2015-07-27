/**
 * Created by penglu on 2015/3/10.
*/
'use strict';
//README : MUST　HAVE [] , EVEN IF IT HAS NO DEPENDENCIES
angular.module('jianceApp.services', ['ngResource']).factory('CheckItemSrvc', ['$resource', function ($resource) {
    var remoteUrl = '/xnbs/api';
    return $resource(remoteUrl+'/checkItem/:id', {id: '@itemId'},
            { 'get':    {method:'GET'},
              'query':  {method:'GET'},
              'update': {method:'PUT', params: {id: '@itemId'}},
              'save':   {method:'POST'},
              'delete': {method:'DELETE'},params: {id: '@itemId'} }
        ); // Note the full endpoint address
    }
]);
