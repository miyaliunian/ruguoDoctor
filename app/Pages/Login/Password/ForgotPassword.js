/**
 * Created by wufei on 2018/1/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {Button} from 'teaset';
import LoginInput from '../LoginPage/LoginInput'
import Px2dp from '../../../Common/px2dp'
import MobxStore from './mobxStore'
import {observer} from 'mobx-react/native';
@observer
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.mobx=new MobxStore();
    }


    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };


    onSubmitBtn(){
        this.props.navigation.navigate('forgotSettingPassword',{mobilePhone:this.mobx.info.cell_phone});
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'忘记密码'}
                />
                <LoginView
                           onPress={() => this.onSubmitBtn()}
                           onTextPress={() => this.onClickText('main')}
                           getVerifyCode={() => {
                           }}
                           onChangeTopText={(text) => {
                               this.mobx.info.cell_phone=text;
                           }}
                           onChangeBottomText={(text) => {
                               this.mobx.info.verification_code=text;

                           }}
                           btnSabled={this.mobx.btnState}
                />

            </View>
        );
    }
}

const LoginView = (props) => {
    return (
        <View style={styles.loginViewStyle}>

            <LoginInput placeholder='注册手机号'
                        icon={require('../../../Resource/Imags/icon_login_tel_icon.png')}
                        onChangeText={props.onChangeTopText}
            />
            <LoginInput isVerify={true}
                        placeholder='验证码'
                        getVerifyCode={props.getVerifyCode}
                        onChangeText={props.onChangeBottomText}
                        onFocus={props.verifyFocus}
                        icon={require('../../../Resource/Imags/icon_login_ver_icon.png')}
            />

            <Button title={'确定'}
                    style={styles.loginEnableButtonStyle}
                    titleStyle={{fontSize: 14, color: 'rgb(255,255,255)'}}
                    disabled={props.btnSabled}
                    onPress={props.onPress}
            />
        </View>
    )
};


const styles = StyleSheet.create({
    loginViewStyle: {
        marginTop:Px2dp.getHeight(92),
        height: Px2dp.getHeight(200)
    },
    loginEnableButtonStyle: {
        marginTop:Px2dp.getHeight(136),
        marginLeft: Px2dp.getWidth(108),
        marginRight: Px2dp.getWidth(108),
        height: Px2dp.getHeight(80),
        backgroundColor: 'rgb(255,208,96)',
        borderColor: 'transparent',
        borderRadius: 6
    }
});

