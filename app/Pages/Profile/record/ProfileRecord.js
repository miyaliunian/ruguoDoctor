/**
 * Created by wufei on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles';
import {MoreMenu} from '../../../Common/MoreMenu';
import ViewUtil from '../../../Common/viewUtil';
import Px2dp from '../../../Common/px2dp'
import DataRepository from '../../../Expand/Dao/DataRepository'
import ProfileRecordTab from './ProfileReacordTab'
import NavigationBar from '../../../Component/NavigationBar'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Picker from "react-native-picker/index";

let personId = '5eebe460bf2b458fb7a0a2101768599b';

export default class ProfileRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
        })
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    onClick(tab) {
        this.props.navigation.navigate(tab)
    }

    getItem(tag, icon, text) {
        return (
            viewUtil.getSettingItem(() => this.onClick(tag), icon, text, null)
        )
    }

    toPersonInfo() {
        this.props.navigation.navigate(MoreMenu.Profile.Record.menu_person_info, {title: '个人资料', personId: personId});

    }

    delStorge() {
        this.dataRepository.removeLocalRepository('personInfo');
    }

    render() {
        let itemRightArrow = <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                                    style={styles.imgRight}/>;
        return (
            <View style={[styles.container]}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title='健康档案'/>
                <TouchableOpacity onPress={() => this.toPersonInfo()}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Image source={require('../../../Resource/Imags/res_photo_man.png')}
                                   style={styles.AvatarStyle}/>

                            <View style={styles.rowInfo}>
                                <View>
                                    {/*<View style={{borderWidth: 1}}>*/}
                                    <Text style={{
                                        fontSize: Px2dp.getHeight(36),
                                        color: 'rgb(51,51,51)'
                                    }}>张三</Text>
                                    {/*</View>*/}
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.rowInfoLabel}>38岁 | </Text>
                                        <Text style={styles.rowInfoLabel}>180cm | </Text>
                                        <Text style={styles.rowInfoLabel}>78kg</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                        {itemRightArrow}
                    </View>
                </TouchableOpacity>
                <View style={GlobalStyles.line}/>

                <ScrollableTabView style={{height: 120}}
                                   tabBarInactiveTextColor="rgb(196,196,196)"
                                   tabBarActiveTextColor="rgb(51,51,51)"
                                   tabBarTextStyle={{fontSize: Px2dp.getHeight(32), marginTop: Px2dp.getHeight(20)}}
                                   tabBarUnderlineStyle={{backgroundColor: 'rgb(255,208,96)', height: 2}}
                                   rendertabBar={() => <ScrollableTabBar/>}>
                    <ProfileRecordTab tabLabel='检测数据' tabId='0' {...this.props} personId={personId}/>
                    <ProfileRecordTab tabLabel='我的报告' tabId='1' {...this.props} personId={personId}/>
                    <ProfileRecordTab tabLabel='我的病例' tabId='2' {...this.props} personId={personId}/>
                </ScrollableTabView>


                <TouchableOpacity onPress={() => this.delStorge()}>
                    <Text style={{
                        height: 20,
                        width: '100%',
                        alignItems: 'center',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        backgroundColor: 'rgb(155,255,255)',
                    }}>清除缓存</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
        backgroundColor: 'rgb(255,255,255)',
    },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(192),
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLeft: {
        flexDirection: 'row',
    },
    AvatarStyle: {
        height: Px2dp.getHeight(128),
        width: Px2dp.getWidth(128),
        borderRadius: Px2dp.getHeight(64),
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        borderWidth: 5,
        borderColor: 'rgb(254,232,181)'
    },
    imgRight: {
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(32),
        width: Px2dp.getWidth(32),
        tintColor: 'rgb(196,196,196)'
    },
    rowInfo: {
        width: Px2dp.getWidth(400),
        justifyContent: 'center',
        flexDirection: 'column',
    },
    rowInfoLabel: {
        fontSize: Px2dp.getHeight(22),
        color: 'rgb(153,153,153)'
    },
    rowLabel: {
        width: 100,
        marginLeft: Px2dp.getWidth(30)
    },
    fontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
    },
    fontText: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',

    }
});

