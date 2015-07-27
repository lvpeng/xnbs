http://www.html-js.com/article/2090
https://ruby-china.org/topics/15396

###
    1 read $q defer Promise API
    2


login 安全认证 实现机制
    #1 authSrvc 服务 ：



=============2015/5/2=======================

1 采用模板：  SB Admin Angular
            http://startangular.com/product/sb-admin-angular-theme/
2 列表分页 ：1)http://www.jitendrazaa.com/blog/webtech/web/pagination-and-sorting-of-data-table-using-angularjs/
              http://jsfiddle.net/ilovenagpur/wPnxy/
            2) http://stackoverflow.com/questions/10816073/how-to-do-paging-in-angularjs
                https://github.com/angular-ui/bootstrap/tree/master/src/pagination
                后台分页
                https://github.com/begriffs/angular-paginate-anything
3 bootstrap+angularjs 下拉框 ： http://chrisharrington.github.io/demos/dropdown.html
                                https://github.com/chrisharrington/demos/blob/master/dropdown.html
                                http://angularjs4u.com/demos/angularjs-bootstrap-ui-drop-demo/
            
                Fixme : initial value after load select dropdown
                    1 ) http://stackoverflow.com/questions/13754642/how-to-set-the-initial-value-of-a-select-created-using-ng-options-with-an-object
                    2 ) use track by
                    3 ) http://stackoverflow.com/questions/13754642/how-to-set-the-initial-value-of-a-select-created-using-ng-options-with-an-object
                    
4 see ui router sample code when in home 
            http://angular-ui.github.io/ui-router/sample/#/contacts/1/item/a

            
            5 2015/02/01
5 添加工单 性别 下拉框, 工单创建时间

6 checkbox list 选中回显， 
  修改更新 
  借鉴 demo http://jaykanakiya.com/demos/angular-js-todolist/# 
  http://angularjs4u.com/demos/10-angularjs-crud-app-demos/
  
7 id :　080215102604
  password: 123456
  
8 among two select list move item :
        ## http://stackoverflow.com/questions/24558091/angularjs-moving-items-between-two-select-list
        
9 http://42.96.188.236:8180/xnbs/api/udf/task/paged　这个接口就是返回检测任务　里面含检查人的ID　姓名啊


10 http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html

11 http://stackoverflow.com/questions/25155531/angularjs-ng-disabled-is-disabling-all-of-my-buttons

12 sql:
统计一个检查工单包含多少检查包和　所需时间
SELECT tr.request_id,
(select count(1) from xnbs_tab_request_package_rel  trpl ,xnbs_tab_package_list tpl
where trpl.package_id = tpl.package_id AND trpl.request_id = tr.request_id) as cnt,
(select  SUM(tcil.item_workload) from xnbs_tab_request_package_rel trpl ,xnbs_tab_package_list tpl, xnbs_tab_package_item_rel tpir, xnbs_tab_check_item_list tcil
where trpl.request_id = tr.request_id AND trpl.package_id = tpl.package_id AND tpl.package_id = tpir.package_id AND tpir.item_id = tcil.item_id ) as all_workload
 FROM xnbs_tab_request tr
 
 
 
  
 过滤 查询 所有待检测和 待分配的工单任务 （工单的状态 ： 1 未分配 2 未检测 3 完成） 
 SELECT tr.request_id,
 (select count(1) from xnbs_tab_request_package_rel  trpl ,xnbs_tab_package_list tpl
 where trpl.package_id = tpl.package_id AND trpl.request_id = tr.request_id) as cnt,
 (select  SUM(tcil.item_workload) from xnbs_tab_request_package_rel trpl ,xnbs_tab_package_list tpl, xnbs_tab_package_item_rel tpir, xnbs_tab_check_item_list tcil
 where trpl.request_id = tr.request_id AND trpl.package_id = tpl.package_id AND tpl.package_id = tpir.package_id AND tpir.item_id = tcil.item_id ) as all_workload
  FROM xnbs_tab_request tr where state NOT IN ('完成')

           
13
28648C80179E26412C7AAE0406DA4C3A  pkg1
9E698B44D95647471E2BCCFD429DE421  pkg2
258D9A05767E8541DB3A2BE65112E343  pkg3

5a5d96797bf889a694ea1a99edb407f5  item1
ac70a0a9be9511e4b76900163e041a03  item2
8B18437BDF4A11E4898A00163E041A03  item3
F3CB7CB6E0B411E4898A00163E041A03  item4



14 use local Storage after login 
    http://learn.ionicframework.com/formulas/localstorage/


期望所需要的接口 
### 功能 =============输入参数  ==============返回值 ======================期望操作方法=== 
1 '完成任务'      {用户id，工单id}              状态码（是否完成）            UPDATE
2 '个人任务列表'   用户id                       个人工单列表                 GET
3 '/xnbs/api/login'                           添加userId字段       

2 工单任务列表 -- 可以根据 不同 状态(未分配，已分配，，分配未完成，已完成) 查询 过滤列表


反馈： 
1、 登录后的返回报文中增加 userid 已经添加
2、@RequestMapping(method=RequestMethod.POST, value="/udf/request/{user_id}/{request_id}")     用于检查人员检查完成后  更新工单状态
3、@RequestMapping(method=RequestMethod.GET, value="/udf/request/{user_id}")  根据检查人员ID 获取用户的所有工单








236 server restart 
     cd 到目录/home/xnbs/webapp/xnbsweb/bin
     唐希元 19:11:55 
     执行：./startup.sh 
     
     
     
     
     
     
     
     
==创建工单=====================
/xnbs/api/ord 



{
    "ordAttrib": {
        "nbfsOrderId": "nbfs_order_idsssw",
        "fromSysId": "sys",
        "ordCreateTime": 1426088508000,
        "ordCreateUserId": "txy",
        "ordPayAmt": 10000,
        "ordPayType": "ATM",
        "ordMailType": "S",
        "ordCollName": "txy@kscloud.com",
        "ordCollMobile": "18000516329",
        "ordCollAddr": "成都",
        "ordCheckState": "0",
        "ordSalePrice": 10000
    },
    "reqs": [
        {
            "req": {
                "personId": "AA",
                "personName": "BB",
                "age": 12,
                "gender": "F"
            },
            "packageIds": [
                {
                    "pkgid": "AABS"
                },
                {
                    "pkgid": "AABCS"
                }
            ]
        },
        {
            "req": {
                "personId": "AA",
                "personName": "BB",
                "age": 12,
                "gender": "F"
            },
            "packageIds": [
                {
                    "pkgid": "KKAABS"
                },
                {
                    "pkgid": "KKAABCS"
                }
            ]
        }
    ]
}


无创检测后台管理系统
 模块组成
 1 登陆模块：
    ### url : http://115.28.138.92:8080/xnbs/app/index.html#/login
    ### 初始账户： admin , 密码 ：666666
 2 订单管理模块： 该模块的操作包括
    ### 查看全部订单列表，并且可以按照不同字段进行搜索排序， 并具有分页功能
    ### 订单新增，删除
    ### 订单查看具体详情，在详情页面可以对订单进行修改操作
    ### 在订单详情页面下 添加工单， 添加完成之后 返回详情可以查看全部工单列表(点击可以跳转到工单详情页面查看)
    ### 在工单创建页面可以 勾选不同检测包，并且完成之后可以对其修改
    ### 注明： 检测包和检测项的需要到数据库对应表中手工录入维护。

3 用户模块：(此模块只对管理员工等级用户可见)
   ### 显示当前系统所有使用用户的list列表
   ### 用户新增, 删除创建(只有管理员拥有此操作权限)
   ### 普通用户可以进入个人中心修改个人信息和密码

4 工单任务分配模块：

   ### 该模块会列出所有在工单任务(未分配)列表 . ps: 工单会有三种状态: 未分配，已分配，完成
   ### 列表会显示被检查人姓名，检测包数量，所需工时，工单创建日期等多个字段， 可根据不同字段进行搜索，排序操作，并带分页功能
   ### 使用人员可以根据工作 点击‘抢单’挑选不同工单任务，每人一次最多挑选5个，可以点击'工单详情'进入详情页面查看任务


4 我的任务模块：

   ### 该模块会列出我的工单(已分配和完成的)列表 .
   ### 列表会显示被检查人姓名，检测包数量，所需工时，实际工时,工单创建日期等多个字段， 可根据不同字段进行搜索，排序操作，并带分页功能
   ### 当使用人员完成检测任务之后 通过点击对应'已完成'按钮来完成工单任务， 完成的工单会显示'完成啦'按钮
   ### 还可以进入工单详情 ，查看自己的任务详情

5 所有模块的表单操作(新增,修改)都已完成录入校验功能

6 附件是 115.28.138.92 服务器上 最新的程序打包和数据库文件：
    前端的代码都在 /xiniao/xnbs/webapp/xnbsweb/webapps/xnbs/app 目录下

    具体的详情也可以查看 README.md 文件。





