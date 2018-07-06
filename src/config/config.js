
export const Config ={
    //分页数据
    rowCount : '10',

    //Debug
    // BASE_URL:'http://10.101.2.115:8080/ruguo-bs/', //请求基本路径

    //Release
    BASE_URL:'http://test-ftrg.bd-yg.com/ruguo-bs/', //请求基本路径

    API_LOGIN: 'mydoctor/modoctoraccountinfo/login', //登录
    API_SETPASSWORD: 'mydoctor/modoctoraccountinfo/settingPassword', //设置密码
    //医生对话
    API_DOCTOR_DIALOGUE:'mydoctor/mopersonnelinteractivelist/tasklist',
    API_DOCTOR_DIALOGUE_INTERACTIVE:'mydoctor/mopersonnelinteractivelist/saveInterActive',
    API_DOCTOR_LIST:'mydoctor/mopersonnelrelationshipinfo/list',
    API_DOCTOR_QUESTIONNAIRE_REPORT_SAVE:'mydoctor/moquestionnairereport/save',
    //提问医生
    API_DOCTOR_QUESTION:'mydoctor/mopersonnelinteractivelist/save',
    API_MY_SERVICE_LIST:'myservicelist/getServiceListInfo',//查询我的宝宝服务信息表
    //报告:
    API_REPORT_TYPE_LIST:'mydoctor/moquestionnairereport/list',


    //服务对象列表
    API_ServiceSearchList:'/doctorContainer/findMoMberRelationshipInfos',
    API_ServiceAllList:'/doctorContainer/findMoMberRelationshipInfos',


};