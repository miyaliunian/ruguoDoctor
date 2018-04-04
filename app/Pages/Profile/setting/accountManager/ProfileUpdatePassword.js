/**
 * Created by wufei on 2017/11/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    Alert,
    DeviceEventEmitter
} from 'react-native';

import SubmitBtn from '../../../../Component/SubmitBtn'
import GlobalStyles from '../../../../Common/GlobalStyles'
import ViewUtil from '../../../../Common/viewUtil'
import NavigationBar from '../../../../Component/NavigationBar'
import ScreenUtil from '../../../../Common/screenUtil'
import DataRepository from '../../../../Expand/Dao/DataRepository'
import Px2dp from '../../../../Common/px2dp'
import LoadingModal from '../../../../Component/LoadingModal'
import {Config} from "../../../../Expand/Dao/Config";

export default class ProfileUpdatePassword extends Component {

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            showModal: false,
            originalPassword: '',
            newPassword: '',
            conPassword: '',
        }
    }

    componentDidMount() {

        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft
        })
    };

    navigatePressLeft = () => {
        this.textInputsBlur();
        const {state, goBack} = this.props.navigation;
        state.params.callBack(123);
        goBack();
    };

    textInputsBlur() {
        this.refs.originalPasswordTextInput.blur();
        this.refs.newPasswordTextInput.blur();
        this.refs.conPasswordTextInput.blur()
    }

    formSubmit() {

        if (!this.state.originalPassword) {
            DeviceEventEmitter.emit('toastInfo', '请输入密码', 'fail');
            return;
        }
        if (!this.state.newPassword) {
            DeviceEventEmitter.emit('toastInfo', '请输入新密码', 'sad');
            return;
        }
        if (!this.state.conPassword) {
            DeviceEventEmitter.emit('toastInfo', '请输入确认密码', 'sad');
            return;
        }
        if (this.state.newPassword != this.state.conPassword) {
            DeviceEventEmitter.emit('toastInfo', '两次输入的密码不一致', 'sad');
            return;
        }
        if (this.state.newPassword.length < 6 || this.state.newPassword.length > 20) {
            // alert(this.state.newPassword.length);
            DeviceEventEmitter.emit('toastInfo', '请输入新密码(6-20位)', 'sad');
            return;
        }
        const {state, goBack} = this.props.navigation;
        const params = state.params || {};
        this.textInputsBlur();
        this.textInputsBlur();
        // goBack(params.go_back_key);

        this.setState({
            showModal: true
        });
        let obj = {};
        obj.id = '5eebe460bf2b458fb7a0a2101768599b';
        obj.oldPassword = this.state.originalPassword;
        obj.newPassword = this.state.newPassword;
        let url = Config.BASE_URL + Config.API_PROFILE_PASSWORD_UPDATE;
        this.dataRepository.postJsonRepository(url, obj)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    DeviceEventEmitter.emit('toastInfo', response.msg, 'success');
                    goBack(params.go_back_key);
                } else {
                    DeviceEventEmitter.emit('toastInfo', response.msg, 'fail');
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
            })
            .done();

    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'修改密码'}/>
                <View style={{
                    height: Px2dp.getHeight(92),
                    backgroundColor: 'white',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: Px2dp.getHeight(60),
                    borderWidth: 1,
                    borderColor: 'rgb(244,244,244)',
                    marginLeft: Px2dp.getWidth(25),
                    width: ScreenUtil.screenSize.width - Px2dp.getWidth(50)
                }}>
                    <Image style={{marginRight: Px2dp.getWidth(24), marginLeft: Px2dp.getWidth(24)}}
                           source={require('../../../../Resource/Imags/ic_original_password.png')}/>
                    <Image source={require('../../../../Resource/Imags/ic_imaginary_line.png')}/>
                    <TextInput placeholder='请输入原密码' style={{paddingLeft: Px2dp.getWidth(24), flex: 1}}
                               onChangeText={(originalPassword) => this.setState({originalPassword: originalPassword})}
                               secureTextEntry={true}
                               underlineColorAndroid='rgb(255,255,255)'
                               returnKeyType='done'
                               ref="originalPasswordTextInput"
                               maxLength={20}
                    />
                </View>

                <View style={{
                    height: Px2dp.getHeight(92),
                    backgroundColor: 'white',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: Px2dp.getHeight(30),
                    borderWidth: 1,
                    borderColor: 'rgb(244,244,244)',
                    marginLeft: Px2dp.getWidth(25),
                    width: ScreenUtil.screenSize.width - Px2dp.getWidth(50)
                }}>
                    <Image style={{marginRight: Px2dp.getWidth(24), marginLeft: Px2dp.getWidth(24)}}
                           source={require('../../../../Resource/Imags/ic_original_password.png')}/>
                    <Image source={require('../../../../Resource/Imags/ic_imaginary_line.png')}/>
                    <TextInput placeholder='请输入新密码(6-20位)' style={{paddingLeft: Px2dp.getWidth(24), flex: 1}}
                               secureTextEntry={true}
                               onChangeText={(newPassword) => this.setState({newPassword: newPassword})}
                               underlineColorAndroid='rgb(255,255,255)'
                               returnKeyType='done'
                               ref="newPasswordTextInput"
                               maxLength={20}
                    />
                </View>

                <View style={{
                    height: Px2dp.getHeight(92),
                    backgroundColor: 'white',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: Px2dp.getHeight(30),
                    marginBottom: Px2dp.getHeight(30),
                    borderWidth: 1,
                    borderColor: 'rgb(244,244,244)',
                    marginLeft: Px2dp.getWidth(25),
                    width: ScreenUtil.screenSize.width - Px2dp.getWidth(50)
                }}>
                    <Image style={{marginRight: Px2dp.getWidth(24), marginLeft: Px2dp.getWidth(24)}}
                           source={require('../../../../Resource/Imags/ic_conform_newPass.png')}/>
                    <Image source={require('../../../../Resource/Imags/ic_imaginary_line.png')}/>
                    <TextInput placeholder='请确认新密码' style={{paddingLeft: Px2dp.getWidth(24), flex: 1}}
                               onChangeText={(conPassword) => this.setState({conPassword: conPassword})}
                               secureTextEntry={true}
                               underlineColorAndroid='rgb(255,255,255)'
                               returnKeyType='done'
                               ref="conPasswordTextInput"
                               maxLength={20}
                    />
                </View>
                <SubmitBtn onSubmit={() => this.formSubmit()} styles={{backgroundColor: 'rgb(255,208,96)',}}
                           txtTitle='确认修改'/>
                <LoadingModal txtTitle='正在保存' visible={this.state.showModal}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({});

