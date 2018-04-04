/**
 * Created by wufei on 2017/11/18.
 */


import React, {PureComponent} from 'react';
import {StackNavigator} from 'react-navigation';
import {Platform} from 'react-native'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import ScreenUtil from './app/Common/screenUtil'

//登录
     //欢迎页
import WelcomePage from './app/WelcomePage';
    //登录
import LoginPage from './app/Pages/Login/LoginPage/Login'
    //设置密码
import SettingPassword from './app/Pages/Login/Password/SettingPassword'
    //匹配服务
import Matchmaking from './app/Pages/Login/Matchmaking/Matchmaking'
    //忘记密码
import ForgotPassword from './app/Pages/Login/Password/ForgotPassword'
    //忘记-设置密码
import ForgotSettingPassword from './app/Pages/Login/Password/ForgotSettingPassword'
    //主页面
import Main from './app/Main'

// --------------------------------------首页
   //导航条-左侧
import HealthInfo from './app/Pages/RG/healthInfo/HealthInfo'
//切换成员
import SwitcherList from './app/Pages/RG/switcher/SwitcherList'
import SwitcherAdd from './app/Pages/RG/switcher/SwitcherAdd'
//首页->健康资讯->详情页
import HealthInfoDetail from './app/Pages/RG/healthInfo/HealthInfoDetail'
//首页->搜索
import SearchList from './app/Pages/RG/search/SearchList'
//首页->搜索->商品更多
import GoodsSearchList from './app/Pages/RG/search/GoodsSearchList'
//首页->搜索->资讯更多
import NewsSearchList from './app/Pages/RG/search/NewsSearchList'
//首页->搜索->问卷更多
import QuesSearchList from './app/Pages/RG/search/QuesSearchList'
// --------------------------------------管理


// --------------------------------------我的

// //消息中心
import ProfileMessageCenter from './app/Pages/Profile/messageCenter/ProfileMessageCenter'
import ProfileRecord from './app/Pages/Profile/record/ProfileRecord'
import ProfilePersonInfo from './app/Pages/Profile/record/ProfilePersonInfo'
import CertificateNoModify from './app/Pages/Profile/record/CertificateNoModify'
import CertificateNoEnter from './app/Pages/Profile/record/CertificateNoEnter'
import ProfileCollect from './app/Pages/Profile/ProfileCollect'
import QuestionnaireReport from './app/Pages/Profile/record/QuestionnaireReport'


import OrderList from './app/Pages/Profile/order/OrderList'
import ProfileAddress from './app/Pages/Profile/address/ProfileAddress'
import ProfileAddressAdd from './app/Pages/Profile/address/ProfileAddressAdd'
import ProfileAddressEdit from './app/Pages/Profile/address/ProfileAddressEdit'
//订单
//    订单详情
import OrderToBePay from './app/Pages/Profile/order/OrderToBePay'
import OrderAlreadyPay from './app/Pages/Profile/order/OrderAlreadyPay'
import OrderRefunding from './app/Pages/Profile/order/OrderRefunding'
import OrderPurchase from './app/Pages/Profile/order/OrderPurchase'
import OrderAddress from './app/Pages/Profile/order/OrderAddress'
import OrderPurchaseDoctor from './app/Pages/Profile/order/OrderPurchaseDoctor'

//我的服务
import MyServiceInfoList from './app/Pages/Profile/myService/MyServiceInfoList'

//支付
import PayPage from './app/Pages/Profile/pay/PayPage'
//支付结果
import PayResult from './app/Pages/Profile/pay/PayResultPage'
// 商城
import ProfileShop from './app/Pages/Profile/ShopCenter/ProfileShop'
import ShopSctionDetail from './app/Pages/Profile/ShopCenter/ShopSctionDetail'
import ShopSectionItemDetail from './app/Pages/Profile/ShopCenter/ShopSectionItemDetail'
import ShopDoctorDetail from './app/Pages/Profile/ShopCenter/ShopDoctorDetail'
import ShopDoctorList from './app/Pages/Profile/ShopCenter/ShopDoctorList'
import SelectDoctorList from './app/Pages/Profile/ShopCenter/SelectDoctorList'
import TransferTreatment from './app/Pages/Profile/ShopCenter/TransferTreatment'
import TransferTreatmentPay from './app/Pages/Profile/ShopCenter/TransferTreatmentPay'
import DoctorList from './app/Pages/Profile/ShopCenter/DoctorList'
// 购物车
import ProfileShoppingCartEmpty from './app/Pages/Profile/shoppingCard/ProfileShoppingCartEmpty'
import MobxShoppingCarPage from './app/Pages/Profile/shoppingCard/MobxShoppingCarPage'

//设置
import ProfileSetting from './app/Pages/Profile/setting/ProfileSetting'
//设置->意见反馈
import ProfileFeedBack from './app/Pages/Profile/setting/ProfileFeedBack'
//设置->账号管理
import ProfileAccountManager from './app/Pages/Profile/setting/accountManager/ProfileAccountManager'
//设置->修改密码
import ProfileUpdatePassword from './app/Pages/Profile/setting/accountManager/ProfileUpdatePassword'
//设置->修改手机号
import ProfileUpdateTel from './app/Pages/Profile/setting/accountManager/ProfileUpdateTel'
import ProfileVersionUpdating from './app/Pages/Profile/setting/ProfileVersionUpdating'
import OrderHaveComplete from "./app/Pages/Profile/order/OrderHaveComplete";
import OrderHaveClose from './app/Pages/Profile/order/OrderHaveClose'
import AddServiceObject from "./app/Pages/Profile/order/AddServiceObject";
import CompleteHealthRecord from './app/Pages/Profile/record/CompleteHealthRecord';
import FamilyHistory from './app/Pages/Profile/record/FamilyHistory';

import Task from './app/Pages/Gtasks/Task';
import TaskDetail from './app/Pages/Gtasks/TaskDetail';
import MemberInfo from './app/Pages/Gtasks/MemberInfo';
//MODAL入栈

//modal入栈
const MainModalNavigator = StackNavigator(
    {
        welcome: {screen: WelcomePage},
        login: {screen: LoginPage},
        settingPassword: {screen: SettingPassword},
        matchmaking:{screen: Matchmaking},
        forgotPassword:{screen:ForgotPassword},
        forgotSettingPassword:{screen:ForgotSettingPassword},
        main: {screen: Main},
        search_list: {screen: SearchList},
        //设置
        setting: {screen: ProfileSetting},
    },
    {
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
        headerMode: 'screen',
        mode: 'modal',
    },
);
// 从右边入栈
const MainCardNavigator = StackNavigator(
    {
        MainModalNavigator: {screen: MainModalNavigator},

        //待办任务
        task:{
            screen: Task,
        },
        //待办任务
        task_detail:{
            screen: TaskDetail,
        },
        //会员基本信息
        member_info:{
            screen: MemberInfo,
        },

        // 首页
        //导航条左侧item
        switcher_list: {
            screen: SwitcherList,
        },
        //导航条左侧item
        switcher_add: {
            screen: SwitcherAdd,
        },
        //首页->健康-资讯
        health_info: {
            screen: HealthInfo,
        },

        health_info_detail: {
            screen: HealthInfoDetail,
        },


        //管理




        //我的
        record: {//健康档案
            screen: ProfileRecord,
        },
        message_center: {//消息通知
            screen: ProfileMessageCenter,
        },

        person_info: {//个人资料
            screen: ProfilePersonInfo,
        },

        certificateNo_enter: {//输入身份证号
            screen: CertificateNoEnter,
        },

        certificateNo_modify: {//修改身份证号
            screen: CertificateNoModify,
        },
        questionnaire_report: {//问卷报告
            screen: QuestionnaireReport,
        },
        complete_health_record: {//完善健康档案
            screen: CompleteHealthRecord,
        },
        family_history: {//完善健康档案
            screen: FamilyHistory,
        },
        collect: {//我的收藏
            screen: ProfileCollect,
        },

        shopping_cart_empty: {  //购物车-空
            screen: ProfileShoppingCartEmpty,
        },
        //商城
        shop: { //商城
            screen: ProfileShop,
        },//商城分组页面
        shop_section_detail: {
            screen: ShopSctionDetail,
        },//商城分组商品详情页面
        shop_section_item_detail: {
            screen: ShopSectionItemDetail,
        },
        //安全卫士列表
        shop_doctor_list: {
            screen: ShopDoctorList,
        },
        //商品医生详情页面
        shop_section_doctor_detail: {
            screen: ShopDoctorDetail,
        },

        //选择医生列表
        shop_doctor_select_list: {
            screen: SelectDoctorList,
        },

        //医生列表
        doctor_list: {
            screen: DoctorList,
        },

        //转诊
        transfer_treatment: {
            screen: TransferTreatment,
        },


        //转诊支付
        transfer_treatment_pay: {
            screen: TransferTreatmentPay,
        },
        pay: { //支付
            screen: PayPage,
        },


        pay_result: {//支付结果
            screen: PayResult,
        },

        shopping_cart: {  //购物车
            screen: MobxShoppingCarPage,
        },

        order_list: {//我的订单
            screen: OrderList,
        },
        order_to_be_pay: {//订单待支付页面
            screen: OrderToBePay,
        },
        order_have_complete: {//订单已完成
            screen: OrderHaveComplete,
        },
        order_have_close: {//订单已关闭
            screen: OrderHaveClose,
        },
        order_already_pay: {//订单已支付页面
            screen: OrderAlreadyPay,
        },
        add_service_object: {//新增服务对象页面
            screen: AddServiceObject,
        },
        order_purchase_doctor: {//新增服务对象页面
            screen: OrderPurchaseDoctor,
        },

        order_refunding: {//订单退款中，查看页面
            screen: OrderRefunding,
        },
        order_purchase: {//订单购买页面
            screen: OrderPurchase,
        },
        order_address: {//订单购买页面选择地址页面
            screen: OrderAddress,
        },
        my_service_info_list: {//新增服务对象页面
            screen: MyServiceInfoList,
        },
        address: {//邮寄地址
            screen: ProfileAddress,
        },

        addressAdd: {//邮寄地址添加
            screen: ProfileAddressAdd,
        },

        addressEdit: {//邮寄地址编辑
            screen: ProfileAddressEdit,
        },

        customer_service: {//客服
            screen: ProfileMessageCenter,
        },

        // //设置
        // setting: {//设置
        //     screen: ProfileSetting,
        // },

        account: {//账号管理
            screen: ProfileAccountManager,
        },

        binding_tel: {//修改手机号
            screen: ProfileUpdateTel,
        },

        feedback: {//意见反馈
            screen: ProfileFeedBack,
        },

        modify_password: {//修改密码
            screen: ProfileUpdatePassword,

        },
        version_updating: {//检查更新
            screen: ProfileVersionUpdating,

        },
        goods_search_list: {//首页-搜索-商品更多
            screen: GoodsSearchList,
        },
        news_search_list: {//首页-搜索-资讯更多
            screen: NewsSearchList,
        },
        ques_search_list: {//首页-搜索-问卷更多
            screen: QuesSearchList,
        },
    },
    {
        // mode: 'card',
        headerMode: 'none',
        navigationOptions: {
            header: null,
            gesturesEnabled: true,
            gestureResponseDistance: {horizontal: ScreenUtil.screenSize.width * 0.33},
        },
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
        }),
    },
);


export default MainCardNavigator;