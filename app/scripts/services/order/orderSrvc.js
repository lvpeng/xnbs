/**
 * Created by penglu on 2015/4/27.
 */

'use strict';
//README : MUST　HAVE [] , EVEN IF IT HAS NO DEPENDENCIES
angular.module('xnbsApp.service', ['ngResource']).factory('orderSrvc', ['$resource', function ($resource) {
    var remoteUrl = '/xnbs/api';
    return $resource(remoteUrl+'/order/:orderId', {orderId: '@id'},
        {   'get':    {method:'GET'},
            'query':  {method:'GET',isArray: true},
            'update': {method:'PUT', params: {orderId: '@id'}},
            'save':   {method:'POST'},
            'delete': {method:'DELETE'},params: {orderId: '@id'} }
    ); // Note the full endpoint address
}
]);
