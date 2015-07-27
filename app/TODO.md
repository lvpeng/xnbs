1 Fix the url 
    http://localhost:8090/xnbs/app/index.html#/newCItem 
       ==>  http://localhost:8090/xnbs/#/newCItem
        
2 配置静态文件路由 search Config static    
       <script src="/jiancemanager/app/scripts/services/services.js"></script>
           ==> <script src="/scripts/services/services.js"></script>
           
3 ##用户权限 
       admin , user , asnc 
  ##安全认证             
       login logout 
       
4 安全认证
       1 页面ui
       2 ui-router 路由控制
       
5 路由控制 ui-router

================2015/04/23 TODO====================================
1 修改订单列表样式 resize window not adjust 
2 订单列表页面 集成 分页， 查找， 排序   
3 控制器 loginCtrl 不能 获取 $scope.username
4 ocLazyLoad api -> $ocLazyLoad.load: name
5 ui-router api : url , controller, resolve
6 app.js -> reorgize router
7 login how to get $scope userName , password
8 home -> header - > user info -> modify pwd : ui-sref
9 req.gender : F/M -> 男/女
10 新建订单->表单校验
11 表单列表 -> 排序， 查找，
12 修改完成， timeout  give a tip ,
13 列表-分页 https://github.com/begriffs/angular-paginate-anything




=====================================
1 待检测工单列表 ( ，检测包数目)

2 错误提示 

3 校验

4 UI 优化

5 ModalDialog UI
 
6 任务列表 条件过滤（工单状态...）
    根据不同状态 显示不同 状态button
    
7 任务列表 ， drop down filter list 
http://angularjs4u.com/filters/angularjs-drop-filter/
http://jsfiddle.net/TahmidTanzim/N9Vqk/#run
http://jsfiddle.net/TahmidTanzim/N9Vqk/embedded/result/


8 配置权限
    
    ==========0529===
0 工单列表 返回 被检测人姓名 (done)
  工单列表 按创建时间倒序排序 ('前台传')
  工单详情 页面 给出 返回按钮
  
  工单详情，默认样本 头发 (先按照添加方式)
  
  列表 默认按时间排序
  
  del 更改为 update 方法， 标志位置为1

  表单 性别 -- > radio

===========0601====================
 用户列表 : 分页 ，搜索 （done）
 订单列表 ： 按时间倒序排序(done)， 分页排序（FIXME）


 订单编辑 ：订单创建人 ： 下拉框为空(toFixme)
 订单编辑  返回按钮 (done)

 工单详情： 性别 (done)
           抢单 button (done)
 工单详情： 返回按钮 -> 返回 订单详情(done)

 工单编辑： 性别下拉框(done)
           返回按钮 -> 返回 工单详情 (done)
           添加 工单状态 显示(不可编辑) (done)
           校验 (检测包 必选) (done)

 样本列表：默认头发 (done)
 GET http://42.96.188.236:8180/xnbs/app/null 404 (Not Found)

 工单任务 -> 工单详情 -> 检验 工单状态 变化 (done)
         -> 搜索(done)  排序 (工单创建日期倒排)  
         
 我的任务  -> 搜索 (done)  排序 (工单创建日期倒排)
          -> 验证实际工时 

 用户编辑 -> 联系方式  (done)
         -> 返回按钮   (done)

 搜索 ： 非第一页数据 ，search failed (can not searched)
 清除整理数据

 API： del -> update 

    订单创建人-> 登录人
    订单创建 - > xiniaoId
    样本编号 TODO: 1 sample_list , request_sample_rel 表 新增记录 
    权限 授权
 日期格式化： select request_id,date_format(upd_time,'%Y-%m-%d %T')   from xnbs_tab_request

 角色 ，权限
    FIXME: 一人可有多重角色

 
 
 
 