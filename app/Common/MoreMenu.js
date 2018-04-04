/**
 * Created by wufei on 2017/11/20.
 *
 * 用于配置跳转菜单
 *
 *
 */


export const MoreMenu = {

    //登录
    LoginPage: {
        menu_login_forgotPassword: "forgotPassword",
    },

    GTasks: {
        menu_task: 'task',
        menu_task_detail: 'task_detail',
        menu_member_info:'member_info'
    },
    //首页
    HomePage: {
        //导航条左侧item-切换
        Switch: {
            menu_home_switch_list: "switcher_list",
            menu_home_switch_add: "switcher_add",
        },
        //健康资讯
        menu_health_info: 'health_info',
        //健康详情
        menu_health_info_detail: 'health_info_detail',
        //搜索
        menu_search_list: 'search_list',
        //搜索-商品更多
        menu_goods_search_list: 'goods_search_list',
        //搜索-资讯更多
        menu_news_search_list: 'news_search_list',
        //搜索-问卷更多
        menu_ques_search_list: 'ques_search_list',

    },


    // 管理
    Comprehensive: {
        // 优惠券
        menu_discount_coupon: 'discount_coupon',
        // 积分
        menu_integral: 'integral',
        // 健康档案
        menu_record: 'record',
        // 个人资料
        menu_person_info: 'person_info',
        // 我的收藏
        menu_collect: 'collect',
        // 购物车
        menu_shopping_cart: 'shopping_cart',
        // 我的订单
        menu_order_form: 'order_form',
        // 邮寄地址
        menu_address: 'address',
        // 设置
        menu_setting: 'setting'
    },
    // 我的
    Profile: {
        // 聊天
        menu_message_center: 'message_center',
        // 优惠券
        menu_discount_coupon: 'discount_coupon',
        // 积分
        menu_integral: 'integral',
        Record: {
            // 健康档案
            menu_record: 'record',
            // 个人资料
            menu_person_info: 'person_info',
            PersonInfo: {
                // 修改手机号
                menu_phoneNumber_modify: 'phoneNumber_modify',
                // 输入身份证号
                menu_certificateNo_enter: 'certificateNo_enter',
                // 修改身份证号
                menu_certificateNo_modify: 'certificateNo_modify',
            },
            Report: {
                // 问卷报告
                menu_questionnaire_report: 'questionnaire_report'
            },
            menu_complete_health_record: 'complete_health_record',
            menu_family_history: 'family_history',//家族历史

        },
        // 我的收藏
        menu_collect: 'collect',
        // 购物车
        shoppingCart: {
            //空
            menu_shopping_cart_empty: 'shopping_cart_empty',
            //非空
            menu_shopping_cart: 'shopping_cart',
        },

        //健康商城
        Shop: {
            menu_shop: 'shop', //商城首页
            menu_shop_detail: 'shop_section_detail', //商城分组页
            menu_shop_item_detail: 'shop_section_item_detail', //商城分组商品详情页面
            menu_shop_doctor_detail: 'shop_section_doctor_detail', //商城分组医生商品详情页面
            menu_shop_doctor_list: 'shop_doctor_list',//成长卫士列表
            menu_shop_doctor_select_list: 'shop_doctor_select_list',//医生选择列表
            menu_transfer_treatment: 'transfer_treatment',//转诊
            menu_transfer_treatment_pay: 'transfer_treatment_pay',//转诊支付
            menu_doctor_list: 'doctor_list',//医生列表
        },

        //支付
        pay: {
            menu_pay: 'pay', //支付页面
            menu_pay_result: 'pay_result', //支付结果
        },
        //订单
        Order: {
            menu_order_to_be_pay: 'order_to_be_pay',//订单待支付页面
            menu_order_already_pay: 'order_already_pay',//订单已支付页面
            menu_order_list: 'order_list',//我的订单
            menu_order_have_complete: 'order_have_complete',//订单已完成
            menu_order_have_close: 'order_have_close',//订单已关闭
            menu_order_refunding: 'order_refunding',//订单退款中，查看页面
            menu_order_purchase: 'order_purchase',//订单购买页面
            menu_order_address: 'order_address',//订单购买页面选择地址页面
            menu_add_service_object: 'add_service_object',//新增服务对象
            menu_order_purchase_doctor: 'order_purchase_doctor',//订单购买页面购买医生页面

        },

        // 我的订单
        menu_order_form: 'order_form',
        // 邮寄地址
        menu_address: 'address',
        //客服
        menu_customer_service: 'customer_service',
        // 设置
        Setting: {
            //设置一级页面
            menu_setting: 'setting',
            //账号管理
            menu_account: 'account',
            accountManger: {
                //手机号绑定
                menu_binding_tel: 'binding_tel',
                //微信号绑定
                menu_binding_weichart: 'binding_weichart',
                //修改密码
                menu_modify_password: 'modify_password',

            },
            // 意见反馈
            menu_feedback: 'feedback',
            // 检查更新
            menu_upgrade: 'version_updating',
            // 清理缓存
            menu_cache: 'cache',
            // 关于汝果
            menu_aboutRG: 'aboutRG'
        },

        //我的服务
        menu_my_service_info_list:'my_service_info_list'
    },

};

