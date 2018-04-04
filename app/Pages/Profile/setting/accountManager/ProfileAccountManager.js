/**
 * Created by wufei on 2017/11/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    DeviceEventEmitter
} from 'react-native';

import GlobalStyles from '../../../../Common/GlobalStyles'
import ViewUtil from '../../../../Common/viewUtil'
import NavigationBar from '../../../../Component/NavigationBar'
import {MoreMenu} from '../../../../Common/MoreMenu'
export default class ProfileAccountManager extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }


    componentWillUnmount() {

    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    onClick(target) {
        const {state, navigate} = this.props.navigation;
        // navigate(target, {go_back_key: state.key,callBack:(data)=>this.NYGM(data),transition:'forFadeFromBottomAndroid'})
        navigate(target, {go_back_key: state.key,callBack:(data)=>this.NYGM(data)})
    }


    NYGM(data){

    }
    getItem(target, icon, text) {
        return (
            ViewUtil.getSettingItem(() => this.onClick(target), icon, text, null, null, '去更改')
        )
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'账号管理'}/>
                {this.getItem(MoreMenu.Profile.Setting.accountManger.menu_binding_tel, require('../../../../Resource/Imags/ic_accountManager_tel.png'), '手机号')}
                <View style={GlobalStyles.line}/>
                {this.getItem('', require('../../../../Resource/Imags/ic_accountManager_weic.png'), '微信')}
                <View style={GlobalStyles.line_space_13}/>
                {this.getItem(MoreMenu.Profile.Setting.accountManger.menu_modify_password, require('../../../../Resource/Imags/ic_accountManager_mp.png'), '修改密码')}
            </View>
        );
    }
}

const styles = StyleSheet.create({});

