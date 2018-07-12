import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    AsyncStorage
} from 'react-native';

import theme from '../../config/theme';
import px2dp from '../../common/px2dp';
import Account from '../../store/common/Account'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextFix from "../../common/TextFix";
import ActionSheet from 'react-native-actionsheet'

// ActionSheet常量定义
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = ['是', '否'];
const title = '确定退出登录?';


export default class MyPage extends Component<{}> {
    static navigationOptions =({navigation})=>({
        header: null
    })

    constructor(props) {
        super(props);
        this.state = {}
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        debugger
        if (i == 0) {
            //退出登录:清除本地缓存
            AsyncStorage.clear()
            //清除App注入缓存
            this.removeRepository()
            this.props.navigation.navigate('Auth');

        }
    }

    removeRepository() {
        this.account = Account;
        this.account.ID = '';
        this.account.code = '';
        this.account.mobilePhone = '';
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={Platform.OS === 'ios' ? require('../../icons/profile_icon/my_ios.png') : require('../../icons/profile_icon/my_android.png')}
                    style={styles.imgTabBar}>
                    <View
                        style={{flexDirection: 'row-reverse'}}>
                        <TouchableOpacity style={{paddingRight: px2dp(20), paddingTop: px2dp(16)}}>
                            <Ionicons
                                name={'ios-settings-outline'}
                                size={28}
                                color={'#666'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: px2dp(24)}}>
                        <Image source={require('../../icons/profile_icon/default_portrait.png')}
                               style={{height: px2dp(120), width: px2dp(120), borderRadius: px2dp(60)}}/>
                        <View style={{marginLeft: px2dp(32)}}>
                            <TextFix style={{fontSize: px2dp(34), color: '#333333'}}>张小盒</TextFix>
                            <View style={styles.roundButton}>
                                <TextFix style={{fontSize: px2dp(18), color: '#fff'}}>每日签到</TextFix>
                            </View>
                        </View>
                    </View>
                    <View style={styles.countView}>
                        <View style={styles.countItem}>
                            <TextFix style={{fontSize: px2dp(30), color: '#333333'}}>我的收藏</TextFix>
                            <TextFix style={{fontSize: px2dp(30), color: '#333333', marginTop: px2dp(8)}}>20</TextFix>
                        </View>
                        <View style={styles.countItem}>
                            <TextFix style={{fontSize: px2dp(30), color: '#333333'}}>关注店铺</TextFix>
                            <TextFix style={{fontSize: px2dp(30), color: '#333333', marginTop: px2dp(8)}}>210</TextFix>
                        </View>
                        <View style={styles.countItem}>
                            <TextFix style={{fontSize: px2dp(30), color: '#333333'}}>浏览足迹</TextFix>
                            <TextFix style={{fontSize: px2dp(30), color: '#333333', marginTop: px2dp(8)}}>210</TextFix>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={[styles.rowItem, {height: px2dp(100), marginTop: px2dp(32)}]}>
                        <TextFix style={{fontSize: px2dp(30), color: '#333333', flex: 1}}>购买的订单</TextFix>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextFix
                                style={{fontSize: px2dp(24), color: '#999999', marginRight: px2dp(24)}}>购买的订单</TextFix>
                            <SimpleLineIcons
                                name={'arrow-right'}
                                size={16}
                                color={'#999'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.rowItem, {height: px2dp(140)}]}>
                        <TouchableOpacity style={styles.countItem}>
                            <Image source={require('../../icons/profile_icon/to_pay.png')}/>
                            <TextFix style={{fontSize: px2dp(24), color: '#333333', marginTop: px2dp(12)}}>待付款</TextFix>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.countItem}>
                            <Image source={require('../../icons/profile_icon/to_ship.png')}/>
                            <TextFix style={{fontSize: px2dp(24), color: '#333333', marginTop: px2dp(12)}}>待发货</TextFix>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.countItem}>
                            <Image source={require('../../icons/profile_icon/to_receive.png')}/>
                            <TextFix style={{fontSize: px2dp(24), color: '#333333', marginTop: px2dp(12)}}>待收货</TextFix>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.countItem}>
                            <Image source={require('../../icons/profile_icon/to_finish.png')}/>
                            <TextFix style={{fontSize: px2dp(24), color: '#333333', marginTop: px2dp(12)}}>未评价</TextFix>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.countItem}>
                            <Image source={require('../../icons/profile_icon/to_issue.png')}/>
                            <TextFix style={{fontSize: px2dp(24), color: '#333333', marginTop: px2dp(12)}}>退换货</TextFix>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.rowItem, styles.topBorder, {height: px2dp(120)}]}>
                        <TextFix style={{fontSize: px2dp(32), color: '#333333', flex: 1}}>我的地址</TextFix>
                        <SimpleLineIcons
                            name={'arrow-right'}
                            size={20}
                            color={'#999'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rowItem, styles.topBorder, {height: px2dp(120)}]}>
                        <TextFix style={{fontSize: px2dp(32), color: '#333333', flex: 1}}>账户与安全</TextFix>
                        <SimpleLineIcons
                            name={'arrow-right'}
                            size={20}
                            color={'#999'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rowItem, styles.topBorder, {height: px2dp(120)}]}>
                        <TextFix style={{fontSize: px2dp(32), color: '#333333', flex: 1}}>客服与帮助</TextFix>
                        <SimpleLineIcons
                            name={'arrow-right'}
                            size={20}
                            color={'#999'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.rowItem, styles.topBorder, {height: px2dp(120)}]} onPress = {() => this.showActionSheet()}>
                        <TextFix style={{fontSize: px2dp(32), color: '#333333', flex: 1}}>退出登录</TextFix>
                        <SimpleLineIcons
                            name={'arrow-right'}
                            size={20}
                            color={'#999'}/>
                    </TouchableOpacity>
                </ScrollView>


                //底部UIAlertController
                <ActionSheet
                    ref={actionSheet => this.ActionSheet = actionSheet}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={async (i) => this.handlePress(i)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imgTabBar: {
        height: px2dp(410) + (Platform.OS === 'android' ? 0 : theme.barContentPad),
        paddingTop: theme.barContentPad,
    },
    countView: {
        marginHorizontal: px2dp(24),
        height: px2dp(140),
        backgroundColor: '#fff',
        borderRadius: px2dp(12),
        flexDirection: 'row',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowColor: '#999999',
        elevation: 4
    },
    countItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    roundButton: {
        height: px2dp(36),
        width: px2dp(120),
        borderRadius: px2dp(18),
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: px2dp(16)
    },
    rowItem: {
        marginHorizontal: px2dp(24),
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBorder: {
        borderTopWidth: px2dp(1),
        borderTopColor: '#f5f5f5'
    }
});

