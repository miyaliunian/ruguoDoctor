/**
 * Created by wufei on 2017/12/15.
 * 后台接口对应规则
 *
 */

export const Config ={
    BASE_URL:'http://test-ftrg.bd-yg.com/ruguo-bs/', //请求基本路径
    // BASE_URL:'http://10.101.2.226:8080/ruguo-bs/', //请求基本路径
    API_USER_MOBILE_LOGIN: 'personaldata/momemberbasicinfo/mobilePhoneLogin', //手机号登录
    API_USER_PASSWORD_LOGIN: 'mydoctor/modoctoraccountinfo/passwordToLogin', //密码登录
    API_USER_LOGIN_SETTINGPASS: 'personaldata/momemberbasicinfo/settingPassword', //设置密码
    API_USER_CASE_REPORT:'',//病例信息接口
    API_SHOP_CENTER:'goods/mogoodsbasicinfo/shopcenter', //健康商城接口
    API_SHOP_CENTER_TYPE1:'api/myCaseReport',//健康商城->医生服务接口
    API_SHOP_CENTER_TYPE2:'api/myCaseReport',//健康商城->基因检测接口
    API_SHOP_CENTER_TYPE3:'api/myCaseReport',//健康商城->只能硬件接口-+++++++++++++++++++++++

    API_SHOP_CENTER_SHOPLIST:'goods/mogoodsbasicinfo/list',//健康商城->基因检测接口/智能硬件
    API_SHOP_CENTER_DETAIL:'goods/mogoodsbasicinfo/infor',//健康商城->详情

    API_SHOP_CENTER_SERVICELIST:'goods/mogoodsbasicinfo/doctorList',//健康商城->医生服务列表
    API_SHOP_CENTER_DOCTOR_SUBCLASS:'goods/mogoodsclassinfo/list',//成长卫士子类下拉
    API_SHOP_CENTER_DOCTOR_DETAIL:'goods/mogoodsbasicinfo/doctordetail',//成长卫士详细

    API_ORDER_LIST:'order/moorderinfo/list',//我的订单—订单列表
    API_ORDER_DETAIL:'order/moorderinfo/orderInfo',//我的订单—订单详情

    API_PROFILE_FEEDBACK:'personaldata/momemberfeedback/save',//提交意见反馈
    API_PROFILE_PASSWORD_UPDATE:'personaldata/momemberbasicinfo/updPassword',//修改密码

    API_GTASKS_LIST:'mydoctor/mopersonnelinteractivelist/gtasksList',//待办任务列表
    API_TASK_LIST:'mydoctor/mopersonnelinteractivelist/tasklist',//某个任务列表

    API_SERVICE_TARGET_LIST:'mydoctor/mopersonnelrelationshipinfo/list',//服务对象列表

    API_MEMBER_GET:'personaldata/momemberrelationshipinfo/get',//获取会员基本资料
};

