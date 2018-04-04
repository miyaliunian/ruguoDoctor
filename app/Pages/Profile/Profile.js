/**
 * Created by wufei on 2017/11/17.
 *
 *
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
} from 'react-native';


import {Badge} from 'teaset'
import Util from '../../Common/screenUtil'
import UserMobxStore from '../../Component/UserMobxStore'
import DataRepository,{FLAG_STORAGE} from '../../Expand/Dao/DataRepository'
import ImagePicker from 'react-native-image-crop-picker';
import viewUtil from '../../Common/viewUtil'
import GlobalStyles from '../../Common/GlobalStyles'
import Px2dp from '../../Common/px2dp'
import {MoreMenu} from '../../Common/MoreMenu'
import ArrowBtn from '../../Component/arrowBtn'
import {observer} from 'mobx-react/native';


@observer
export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.userMobxStore = new UserMobxStore();
        this.state = {
            user:{},
        }
    }


    componentDidMount() {
        this.userMobxStore.addDiscountCoupon(1000);
        this.userMobxStore.addIntegral(1000);
        InteractionManager.runAfterInteractions(()=>{
            // 将网络请求数据放入到这个地方
        })
    }


    onClick(tab) {
         this.props.navigation.navigate(tab, {...this.props})
    }

    getItem(tag, icon, text) {
        return (
            viewUtil.getSettingItem(() => this.onClick(tag), icon, text, null)
        )
    }

    avatarPicker() {
        let user=this.state.user;
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            user.avatar=image.path;
            this.setState({
                user:user
            });
            console.log(image);
        });

    }


    render() {
         let user=this.state.user;
        return (
            <View style={[GlobalStyles.root_container]}>

                {/*顶部*/}
                <ImageBackground style={{width: Util.screenSize.width, height: Util.screenSize.height * 0.22}}
                                 source={require('../../Resource/Imags/my_center_header_bg.png')}>

                    {/*右上角消息提醒*/}
                    <TouchableOpacity onPress={() => this.onClick(MoreMenu.Profile.Record.menu_complete_health_record)}
                        style={{
                            position: 'absolute',
                            top: Px2dp.getHeight(50),
                            width: Util.screenSize.width,
                            height: 33,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingRight: Px2dp.getWidth(30)
                        }}>
                        <Badge count={6} type='capsule' maxCount={99}
                               style={{position: 'absolute', right: 5, top: -0.5}}/>
                        <Image source={require('../../Resource/Imags/ic_message.png')}/>
                    </TouchableOpacity>
                    <Image style={{
                        position: 'absolute',
                        bottom: Px2dp.getHeight(76),
                        right: Px2dp.getWidth(30),
                        width: Px2dp.getWidth(44),
                        height: Px2dp.getHeight(44)
                    }} source={require('../../Resource/Imags/icon_arrow_black.png')}/>
                    <View style={{
                        marginTop: Px2dp.getHeight(128),
                        paddingLeft: Px2dp.getWidth(30),
                        justifyContent: 'center',
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            {user.avatar
                                ?   //有头像
                                <TouchableOpacity onPress={() => this.avatarPicker()}>
                                    <Image style={{width: Px2dp.getWidth(140), height: Px2dp.getHeight(140),borderRadius:Px2dp.getWidth(70),borderWidth:2,borderColor:'rgb(244,244,244)'}}
                                           source={{uri:user.avatar}}/>
                                </TouchableOpacity>
                                :   //没有头像
                                <TouchableOpacity onPress={() => this.avatarPicker()}>
                                    <Image style={{width: Px2dp.getWidth(128), height: Px2dp.getHeight(128)}}
                                           source={require('../../Resource/Imags/res_photo_man.png')}/>
                                </TouchableOpacity>

                            }


                            <View style={{marginLeft: Px2dp.getWidth(20)}}>
                                <Text style={{
                                    backgroundColor: 'transparent',
                                    marginBottom: Px2dp.getHeight(4),
                                    fontSize: 16,
                                    color: 'rgb(51,51,51)'
                                }}>用户13898362261</Text>
                                <View style={{flexDirection: 'row'}}>
                                    {/*优惠券*/}
                                    <ArrowBtn title={this.userMobxStore.discountCoupon}
                                              onClick={() => this.onClick(MoreMenu.menu_discount_coupon)}/>
                                    {/*积分*/}
                                    <ArrowBtn title={this.userMobxStore.integral}
                                              onClick={() => this.onClick(MoreMenu.Profile.menu_my_service_info_list)}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.Record.menu_record, require('../../Resource/Imags/ic_record.png'), '健康档案')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.menu_collect, require('../../Resource/Imags/ic_collect.png'), '我的收藏')}
                    <View style={GlobalStyles.line_space}/>
                    {this.getItem(MoreMenu.Profile.Shop.menu_shop, require('../../Resource/Imags/ic_mycenter_market.png'), '健康商城')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.Order.menu_order_list, require('../../Resource/Imags/ic_order_form.png'), '我的订单')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.menu_address, require('../../Resource/Imags/ic_address.png'), '邮寄地址')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem('', require('../../Resource/Imags/ic_mycenter_recodr.png'), '转诊订单')}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MoreMenu.Profile.menu_customer_service, require('../../Resource/Imags/ic_customer_service.png'), '客服')}
                    <View style={GlobalStyles.line_space}/>
                    {this.getItem(MoreMenu.Profile.Setting.menu_setting, require('../../Resource/Imags/ic_setting.png'), '设置')}
                    <View style={GlobalStyles.line}/>
                    <View style={{width: Util.screenSize.width, alignItems: 'center', marginTop: Px2dp.getHeight(86)}}>
                        <Image resizeMethod='resize' source={require('../../Resource/Imags/mycenter_bg_botton.png')}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


