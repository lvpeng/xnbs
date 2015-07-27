angular.module('packagelist.directives',[])
    // 分页
    .directive('pagination',function() {
        return {
            restrict: 'EA',
            replace: true,
            scope:{conf:'='},
            template: "<div class='pagination'>"
                        +"<ul>"
                            +"<li><a ng-click='firstPage()'>首页</a></li>"
                            +"<li><a ng-click='prevPage()'>上一页</a></li>"
                            +"<li ng-repeat='item in pagelis' ng-class='{active:item == pindex.currpage}'><a ng-click='jumpToPage(item)'>{{item}}</a></li>"
                            +"<li><a ng-click='nextPage()'>下一页</a></li>"
                            +"<li><a ng-click='lastPage()'>尾页</a></li>"
                            +"<li>每页"
                                +"<select ng-model='pindex.pagesize'  ng-options='option for option in perPageOptions' style='width:42px;padding:0px;margin:0px;border-radius:3px;'></select>"
                                +"条/共<em style='font-style: normal;'>{{pindex.totalpage}}</em>页"
                            +"</li>"
                        +"</ul>"
                    +"</div>",
            link: function (scope, element, attrs){
                //当前页，总页数，页码显示个数。
                var getPageList = function(currpage,totalpage,len){
                    var array = new Array();
                    var creatlis = function(a,b){
                        var lis = new Array();
                        for(var i = a;i<=b;i++){
                            lis.push(i);
                        }
                        return lis;
                    }
                    if(totalpage > len){
                        var tip = Math.floor(len/2);
                        var max = currpage + tip;
                        var min = currpage - tip;
                        if(max>totalpage){
                            min = min - (max - totalpage);
                            max = totalpage;
                        }
                        if(min<1){
                            max = max + (1 - min);
                            min = 1;
                        }
                        min = min>0?min:1;
                        array = creatlis(min,max);
                    }else{
                        array = creatlis(1,totalpage);
                    }
                    return array;
                };
                
                //页码列表
                scope.pagelis = {};
                //页面条数可选列表
                if(!scope.perPageOptions){
                    scope.perPageOptions = [5,10,20,30,50];
                }
                //页面信息：当前页，页码项数，页面显示条数。
                scope.pindex = {"currpage":1,"pagesize":Number(attrs.size)};
                function getData(){
                    scope.$root.overlay = true;
                    var arfun = scope.$parent[attrs.datacallback];
                    var promise = arfun(scope.pindex.currpage,scope.pindex.pagesize,scope.$parent.condition);
                    promise.then(function(result){
                        scope.$root.overlay = false;
                        scope.$parent[attrs.data] = result.data;
                        scope.pindex.totalpage = Math.ceil(result.page.totalNums/scope.pindex.pagesize);
                        scope.pagelis = getPageList(scope.pindex.currpage,scope.pindex.totalpage,5);
                    },function(reason){console.log("error");},function(message){console.log("always");});
                }
                scope.prevPage = function(){
                    if(scope.pindex.currpage > 1){
                        scope.pindex.currpage -=1;
                    }
                };
                scope.nextPage = function(){
                    if(scope.pindex.currpage < scope.pindex.totalpage){
                        scope.pindex.currpage +=1;
                    }
                };
                scope.firstPage = function(){
                    scope.pindex.currpage = 1;
                }
                scope.lastPage = function(){
                    scope.pindex.currpage = scope.pindex.totalpage;
                }
                scope.jumpToPage = function(item){
                    scope.pindex.currpage = item;
                };
                scope.$watch(function(){
                    var newValue = scope.pindex.currpage + ' ' + scope.pindex.pagesize + ' ' + JSON.stringify(scope.$parent.condition);
                    return newValue;
                },getData);

            }
        };
    });

