/**
 * Created by penglu on 2015/4/23.
 */

'use strict';
//README : MUST　HAVE [] , EVEN IF IT HAS NO DEPENDENCIES
angular.module('xnbsApp', ['ngResource']).factory('loginSrvc', ['$resource', function ($resource) {
    var apiUrl = '/xnbs/api';
    return $resource(apiUrl+'/login', {id: '@itemId'},
        {   'get':    {method:'GET'},
            'query':  {method:'GET'},
            'update': {method:'PUT', params: {id: '@itemId'}},
            'save':   {method:'POST'},
            'delete': {method:'DELETE'},params: {id: '@itemId'} }
    ); // Note the full endpoint address
}
]);



