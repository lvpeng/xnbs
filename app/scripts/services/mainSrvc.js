/**
 * Created by penglu on 2015/4/28.
 */
//README : MUST　HAVE [] , EVEN IF IT HAS NO DEPENDENCIES
angular.module('xnbsApp.service', ['ngResource'])
    .factory('orderSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/order/:orderId', {orderId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@orderId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@orderId'}
            }
        );
    }])
    .factory('reqSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/request/:requestId', {requestId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@requestId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@requestId'}
            }
        );
    }])
    .factory('sampleSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/sample/:sampleId', {sampleId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@sampleId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@sampleId'}
            }
        );
    }])
    .factory('sam_req_Srvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/request/sample/rel/:relId', {relId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@relId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@relId'}
            }
        )
    }])
    .factory('req_pkg_Srvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/request/package/rel/:relId', {relId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@relId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@relId'}
            }
        )
    }])
    .factory('req_pkg_del_Srvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/request/package/rel/:requestId/:packageId', {requestId: '@requestId', packageId:'@packageId'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {requestId: '@requestId', packageId:'@packageId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE',params: {requestId: '@requestId', packageId:'@packageId'}}
            }
        )
    }])
    //抢任务
    .factory('grabTaskSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/udf/grab/request/:userId/:requestId', {userId: '@userId', requestId:'@requestId'},
            {
                'get':    {method:'GET', params: {userId:'@userId' ,requestId: '@requestId'}}
            }
        )
    }])
    //完成任务
    .factory('finishTaskSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/udf/request/:userId/:requestId', {userId: '@userId', requestId:'@requestId'},
            {
                'save': {method:'POST', params: {userId:'@userId' ,requestId: '@requestId'}}
            }
        )
    }])
    //我的任务列表
    .factory('myTaskSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/udf/request/:userId/', {userId: '@userId'},
            {
                'get': {method:'GET', params: {userId:'@userId'}}
            }
        )
    }])
    .factory('pkgSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/package/:pkgId', {pkgId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@pkgId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@pkgId'}
            }
        );
    }])
    .factory('ckItemSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/checkItem/:ckItemId', {ckItemId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@ckItemId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@ckItemId'}
            }
        );
    }])
    .factory('userSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/user/:userId', {userId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@userId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@userId'}
            }
        );
    }])
    .factory('taskSrvc', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/task/:taskId', {taskId: '@id'},
            {   'get':    {method:'GET'},
                'query':  {method:'GET'},
                'update': {method:'PUT', params: {id: '@taskId'}},
                'save':   {method:'POST'},
                'delete': {method:'DELETE'},params: {id: '@taskId'}
            }
        );
    }])
    //检测任务查询条件
    .factory('getTasksByUserId', ['$resource', function ($resource) {
        var remoteUrl = '/xnbs/api';
        return $resource(remoteUrl+'/udf/task/paged/',
            {
                'post': {method:'POST'}
            }
        );
    }])
    .factory('utils', [function () {
        return {
            // Util for finding an object by its 'id' property among an array
            findById: function (a, id, field) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i][field] == id) return a[i];
                }
                return null;
            },
            // return array list
            findById2: function (a, id, field) {
                var arr = [];
                for (var i = 0; i < a.length; i++) {
                    if (a[i][field] == id) {
                        arr.push(a[i]);
                    }
                }
                return arr;
            },
            // return array list
            findById3: function (a, ids, field) {
                var arr = [];
                for (var i = 0; i < a.length; i++) {
                    for (var j = 0 ; j < ids.length; j++){
                        if(a[i][field] == ids[j][field] ){
                            arr.push(a[i]);
                        }
                    }
                }
                return arr;
            },
            uuid: function(len, radix){
                var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var chars = CHARS, uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
                } else {
                    // rfc4122, version 4 form
                    var r;
                    // rfc4122 requires these characters
                    //uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 32; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random()*16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            },
            searchUtil: function(item,toSearch, fields ){
                var search_result = false;
                /* Search Text in all fields */
                for (var i =  0 ; i < fields.length; i++ ){
                    if((item[fields[i]].toLowerCase()).indexOf(toSearch.toLowerCase()) > -1){
                        search_result = true;
                    }
                }
                return search_result;
            },
            filterFilter: function(objArr, key, value){
                var res = [];
                for (var i =0 ; i< objArr.length; i++){
                    var obj = objArr[i];
                    for(var prop in obj) {
                        if(obj.hasOwnProperty(key)) {
                            if(obj[prop] == value) {
                                res.push(obj);
                            }
                        }
                    }
                }
                return res;
            },
            getCurrntTime: function() {
                now = new Date();
                year = "" + now.getFullYear();
                month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
                day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
                hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
                minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
                second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
                return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
//                return year + "-" + month + "-" + day ;
            }
        };
    }])
    .factory('filteredListService', ['utils', function(utils){
        return {
            searched :function (valLists,toSearch,fields) {
                return _.filter(valLists,
                    function (i) {
                        /* Search Text in all fields */
                        return utils.searchUtil(i, toSearch, fields);
                    });
            },

            paged : function(valLists, pageSize){
                retVal = []; //list result per page
                for (var i= 0; i< valLists.length; i++){
                    if(i % pageSize == 0){
                        retVal[Math.floor(i / pageSize) ] = [valLists[i]];
                    }else{
                        retVal[Math.floor(i / pageSize)].push(valLists[i]);
                    }
                }
                return retVal;
            }

        }
    }]);


