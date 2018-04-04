/**
 * Created by wufei on 2018/1/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';

import {Config} from '../../../Expand/Dao/Config'
import {Button} from 'teaset';
import Px2dp from '../../../Common/px2dp'
import LoginInput from '../LoginPage/LoginInput'
import MobxStore from './mobxStore'
import {observer} from 'mobx-react/native';
import LoadingModal from "../../../Component/LoadingModal";
import DataRepository from '../../../Expand/Dao/DataRepository'

@observer
export default class ForgotSettingPassword extends Component {

    constructor(props) {
        super(props)
        this.mobx=new MobxStore();
        this.dataRepository = new DataRepository();
        this.state={
            isLoginModal: false,
            loadingModalTxt: '正在提交...'
        }

    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {

    }


    onSubmitBtn(){
        let userAccount=this.props.navigation.state.params.userAccount;
        let regex = /^\w{6,16}$/;
        let password=this.mobx.passBtnInfo.password.slice();
        if (regex.test(password)){
            this.setState({
                isLoginModal: true
            });
            //拼接登录参数
            let PARAM = {};
            PARAM.oldPassword = password
            PARAM.code=userAccount;
            //发送请求
            this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_USER_LOGIN_SETTINGPASS, PARAM)
                .then((data) => {
                    if (data.status === 'success') {
                        this.setState({
                            isLoginModal: false
                        });

                        this.props.navigation.navigate('matchmaking',{title:'匹配服务'})
                    }
                })
                .catch((err) => {
                    this.setState({
                        isLoginModal: false
                    });
                    DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
                })
                .done()
        }
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'设置密码'}
                />
                <View style={{justifyContent:'center',alignItems:'center',marginTop:Px2dp.getHeight(92)}}>
                    <Text style={{fontSize:15,color:'rgb(51,51,51)'}}>请设置6-16位密码,不能有空格</Text>
                </View>

                <LoginView
                    onPress={() => this.onSubmitBtn()}
                    onChangeTopText={(text) => {
                        this.mobx.passBtnInfo.password=text;
                    }}
                    btnSabled={false}
                />
                <LoadingModal txtTitle={this.state.loadingModalTxt} visible={this.state.isLoginModal}/>
            </View>
        );
    }
}

const LoginView = (props) => {
    return (
        <View style={styles.loginViewStyle}>

            <LoginInput placeholder='密码'
                        icon={require('../../../Resource/Imags/icon_login_pass.png')}
                        onChangeText={props.onChangeTopText}
            />
            <Button title={'确定'}
                    style={styles.loginEnableButtonStyle}
                    titleStyle={{fontSize: 14, color: 'black'}}
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
        marginTop:Px2dp.getHeight(116),
        marginLeft: Px2dp.getWidth(108),
        marginRight: Px2dp.getWidth(108),
        height: Px2dp.getHeight(80),
        backgroundColor: 'rgb(255,208,96)',
        borderColor: 'transparent',
        borderRadius: 6
    }
});

