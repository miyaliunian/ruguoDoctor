export const Config ={

    sysCode:"RHMT",
    level:"2",
    homeRequestCount:"3",
    requestCount:"10",
    isRandom:'1',
    API_DICT_LIST:'doctorInfo/getCodelist',


    // dev-local
    // BASE_URL:'http://10.101.2.117:8080/ruguo-bs/', //请求基本路径本地
    // PIC_SERVER_ROOT_URL:'http://10.101.22.250:8899',//图片
    // HOME_Health_URL:"http://10.101.22.202:8091/app/content/", //首页资讯接口跟路径
    // HOME_Health_DETAIL_URL:"http://10.101.22.202:8091/app/content/getContentForAPP",//首页资讯详情页
    // HOME_QMMS_URL:'http://10.101.22.202:8081/qmmsClus/getQuestionNaireInfo',//问卷的路径

    // release
    BASE_URL:'http://test-ftrg.bd-yg.com/ruguo-bs/', //请求基本路径
    PIC_SERVER_ROOT_URL:'http://test-imgcache.bd-yg.com',//图片
    HOME_Health_URL:"http://test-hcmssrv.bd-yg.com/hcms-service-bs/app/content/", //首页资讯接口跟路径
    HOME_Health_DETAIL_URL:"getContentForAPP",//首页资讯详情页
    HOME_QMMS_URL:'http://test-qmmssrv.bd-yg.com/qmmsClus/getQuestionNaireInfo',//问卷的路径
    HOME_QMMS_CLUS_URL:'http://test-qmmssrv.bd-yg.com/qmmsClus/getQmmsClusInfo',//静态问卷的路径
    // beat
    // BASE_URL:'http://beat-ftrg.bd-yg.com/', //请求基本路径
    // PIC_SERVER_ROOT_URL:'http://beat-imgcache.bd-yg.com',//图片
    // HOME_Health_URL:"http://beat-hcmssrv.bd-yg.com/app/content/", //首页资讯接口跟路径
    // HOME_Health_DETAIL_URL:"http://beat-hcmssrv.bd-yg.com/app/content/getContentForAPP",//首页资讯详情页
    // HOME_QMMS_URL:'http://beat-qmmssrv.bd-yg.com/qmmsClus/getQuestionNaireInfo',//问卷的路径
    //HOME_QMMS_CLUS_URL:'http://test-qmmssrv.bd-yg.com/qmmsClus/getQmmsClusInfo',//静态问卷的路径

    GOODS_TYPE_GENE:'1',//基因产品类型
    GOODS_TYPE_SMART:'2',//智能硬件产品类型
    GOODS_TYPE_DOCTOR:'0',//医师服务类型
    GOODS_TYPE_SUBCLASS_DOCTOR:'0#13171',//医生服务下级分类
    VALIDATE_UNIT:{
        '1':'月',
        '0':'次'
    },//有效期单位

    //首页医生接口请求间隔刷新时间
    RefreshTime:5000,

    //接口数据调用
    HOME_DOCTOR_DOT:"mydoctor/mopersonnelinteractivelist/checkNewQuestionNaire", //首页资讯接口跟路径

    API_HOME_BABYICON_IMAGE:'resource/moappresourceinfo/getResourceInfo', // 首页宝宝年龄段IMAGE

    API_HOME_HEALTHINFO_LIST:'getContentForAppIndex',//首页-健康资讯
    API_HOME_HEALTHINFO_DETAIL:'getContentForAppIndex',//首页-健康资讯
    API_HOME_HEALTHINFO_TABS:'getCmsColumnList',//健康Tabs
    API_HOME_HEALTHINFO_TABS_LIST:'getMoreContentForApp',//健康Tabs列表

    API_USER_MOBILE_LOGIN: 'personaldata/momemberbasicinfo/mobilePRPhoneLogin', //手机号登录
    API_USER_PASSWORD_LOGIN: 'personaldata/momemberbasicinfo/passwordPRToLogin', //密码登录
    API_USER_LOGIN_SETTINGPASS: 'personaldata/momemberbasicinfo/settingPassword', //设置密码
    API_USER_CHECK_BABAY:'personaldata/momemberbasicinfo/isHaveBaby',

    API_FORGET_PASSWORD:'personaldata/momemberbasicinfo/forgetPassword', //忘记密码

    //我的医生
    //医生对话
    API_DOCTOR_DIALOGUE:'mydoctor/mopersonnelinteractivelist/tasklist',
    API_DOCTOR_DIALOGUE_INTERACTIVE:'mydoctor/mopersonnelinteractivelist/saveInterActive',
    API_DOCTOR_LIST:'mydoctor/mopersonnelrelationshipinfo/list',
    API_DOCTOR_QUESTIONNAIRE_REPORT_SAVE:'mydoctor/moquestionnairereport/save',
    //提问医生
    API_DOCTOR_QUESTION:'mydoctor/mopersonnelinteractivelist/save',

    //报告:
    API_REPORT_TYPE_LIST:'mydoctor/moquestionnairereport/list',
    //0625覆盖旧接口
    // API_REPORT_TYPE_DETAIL:'http://test-hrscsrv.bd-yg.com/hrscReport/getHrscReportNew',
    API_REPORT_TYPE_DETAIL:'http://test-hrscsrv.bd-yg.com/hrscReport/getHrscReportNewWithReportId',


    API_SHOP_CENTER:'goods/mogoodsbasicinfo/shopcenter', //健康商城接口
    API_SHOP_CENTER_TYPE1:'api/myCaseReport',//健康商城->医生服务接口
    API_SHOP_CENTER_TYPE2:'api/myCaseReport',//健康商城->基因检测接口
    API_SHOP_CENTER_TYPE3:'api/myCaseReport',//健康商城->只能硬件接口-+++++++++++++++++++++++

    API_SHOP_CENTER_SHOPLIST:'goods/mogoodsbasicinfo/list',//健康商城->基因检测接口/智能硬件
    API_SHOP_CENTER_DETAIL:'goods/mogoodsbasicinfo/infor',//健康商城->详情

    API_SHOP_CENTER_SERVICELIST:'goods/mogoodsbasicinfo/doctorList',//健康商城->医生服务列表
    API_SHOP_CENTER_DOCTOR_SUBCLASS:'goods/mogoodsclassinfo/list',//成长卫士子类下拉
    API_SHOP_CENTER_DOCTOR_DETAIL:'goods/mogoodsbasicinfo/doctordetail',//成长卫士详细
    API_DOCTORINFO_LIST:'doctorInfo/list',//选择医生的列表

    //宝宝服务
    API_BABYSERVICE_LIST:'myservicelist/list',//服务列表
    API_BABYSERVICE_LIST_DETAIL:'myservicelist/getServiceInfo',//服务列表详情
    API_BABYSERVICE_LIST_HISTORY:'myservicelist/list',//服务历史查询

    API_ORDER_LIST:'order/moorderinfo/list',//我的订单—订单列表
    API_ORDER_DETAIL:'order/moorderinfo/orderInfo',//我的订单—订单详情
    API_ORDER_SAVEORDER:'order/moorderinfo/saveOrder',//我的订单—订单详情

    API_PROFILE_FEEDBACK:'personaldata/momemberfeedback/save',//提交意见反馈
    API_PROFILE_PASSWORD_UPDATE:'personaldata/momemberbasicinfo/updPassword',//修改密码

    API_FAMILY_LIST:'personaldata/momemberrelationshipinfo/list',//我的家人查询列表
    API_SERVICE_LIST:'personaldata/momemberrelationshipinfo/findAllRelationship',//我的服务对象列表
    API_FAMILY_ADD:'personaldata/momemberrelationshipinfo/saveInfo',//我的家人添加/更新
    API_FAMILY_GET:'personaldata/momemberrelationshipinfo/get',//我的家人获取
    API_FAMILY_DELETE:'personaldata/momemberrelationshipinfo/delete',//我的家人删除


    API_CMS_ADDCOLLECTION:'memberCollection/addCollection',//添加收藏
    API_CMS_REMOVECOLLECTION:'memberCollection/deleteCollection',//删除收藏
    API_CMS_GETCOLLECTION:'memberCollection/getCollection',//根据文章id获取收藏
    API_CMS_COLLECTIONLIST:'memberCollection/list',//收藏列表
    API_QMMS_RECOMMENDGOODS:'qmmsinterface/list',//推荐商品
    API_QMMS_REPORT:'qmmsinterface/getReport',//获取报告

    API_SEARCH_ALLLIST:'search/searchAllList',//搜素所有内容集合接口，商品，资讯，医生
    API_SEARCH_GOODSLIST:'search/searchGoodsList',//搜索商品集合接口
    API_SEARCH_DOCTORLIST:'search/searchDoctorList',//搜索医生列表接口
    API_SEARCH_DOCTORDETAILS:'search/searchDoctorDetails',//搜索医生详情接口
    API_SEARCH_NEWSLIST:'search/searchNewsList',//搜索咨询列表接口

    API_MY_SERVICE_LIST:'myservicelist/getServiceListInfo',//查询我的宝宝服务信息表

    API_RECORD_ITEM: "recordtype/findRecordTypeList",
    API_RECORD_SAVE: "recordcontent/saveRecordContent",
    API_DICT_NORMAL_LIST:'doctorInfo/getCodelistForNormal',//获取字典值
    API_RECORD_LIST:'recordcontent/findByRecordTypeCode',//获取记录列表
    API_SAVE_CUSTORM_FOOD:'meals/morecordmeals/save',//自定义保存
    API_CUSTOM_LIST:'meals/morecordmeals/findByFoodName',//自定义列表
    API_SEARCH_FOOD_LIST:'meals/morecordmeals/SearchFoodList',//搜索接口
    API_CUSTOM_DELETE:'meals/morecordmeals/delete',//自定义列表
    API_CUSTOM_DETAIL:'meals/morecordmeals/findById',//自定义列表
    API_ADD_FREQUENT:'meals/morecordmealsfrequent/saveMoRecordMealsFrequent',//添加辅食常用食物
    API_FREQUENT_LIST:'meals/morecordmealsfrequent/findByRelaPerCode',//常用食物查询
    API_FREQUENT_DELETE:'/meals/morecordmealsfrequent/delete',//常用食物查询
    API_CHOICE_SAVE:'meals/morecordchoicemeals/saveChoiceMeals',//餐食添加
    API_CHOICE_LIST:'meals/morecordchoicemeals/findByMealType ',//餐食列表查询
    API_CHOICE_CUSTOM:'meals/morecordchoicemeals/saveCustom',//餐食添加自定义
    API_CHOICE_DELETE:'meals/morecordchoicemeals/delete',//删除餐食

    API_QMMS_QUESTION_LIST:'qmmsinterface/getQuestionList',//获取静态问卷
};