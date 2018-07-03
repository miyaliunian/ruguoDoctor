/**
 * Created by wufei on 2018/6/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    DeviceEventEmitter
} from 'react-native';
import px2dp from '../../common/px2dp'
import Theme from '../../config/theme'
import LoginInput from './LoginInput'
import DataRepository from '../../common/dataRepository'
import {Config} from '../../config/config'
import {Button, Toast} from 'teaset';
import LoadingModal from "../../components/LoadingModal";
import LoginMobxStore from './LoginMobxStore'
import {observer,inject} from 'mobx-react/native'
@inject('account')
@observer
export default class SettingPassword extends Component {
    static navigationOptions = ({navigation}) => ( {
        headerLeft: (<View/>),
        headerTitle: '设置密码'
    })

    constructor(props) {
        super(props)
        this.state = {
            isLoginModal: false,
            loadingModalTxt: '正在提交...'
        }
        this.dataRepository = new DataRepository();
        this.mobxStore = new LoginMobxStore();
    }

    componentDidMount() {
        let {account} = this.props;
        this.code = account.code;
    }

    onSubmitBtn() {
        debugger
        let regex = /^\w{6,16}$/;
        let password = this.mobxStore.USER_INFO.user_password;
        if (regex.test(password)) {
            this.setState({
                isLoginModal: true
            });
            //拼接登录参数
            let PARAM = {};
            PARAM.oldPassword = password;
            PARAM.code = this.code
            //发送请求
            this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_SETPASSWORD, PARAM)
                .then((data) => {
                    if (data.status === 'success') {
                        this.setState({
                            isLoginModal: false
                        });
                        this.props.navigation.navigate('App', {memberCode: 'memberCode'})
                    }
                })
                .catch((err) => {
                    this.setState({
                        isLoginModal: false
                    });
                    DeviceEventEmitter.emit('ToastInfo', err.status, 'sad');
                })
                .done()
        } else {
            DeviceEventEmitter.emit('ToastInfo', '密码格式不正确', 'sad');
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1,backgroundColor:'white'}}>
                <View style={[Theme.root_container, {backgroundColor: 'white'}]}>
                    <View style={{justifyContent: 'center', marginLeft: px2dp(110), marginTop: px2dp(92)}}>
                        <Text style={{fontSize: 18, color: 'rgb(51,51,51)'}}>请设置密码:</Text>
                    </View>
                    <LoginView
                        onPress={() => this.onSubmitBtn()}
                        onChangeTopText={(text) => {
                            this.mobxStore.USER_INFO.user_password = text;
                        }}
                        btnSabled={this.mobxStore.btnSettingPasswordEnable}
                    />
                    <LoadingModal txtTitle={this.state.loadingModalTxt} visible={this.state.isLoginModal}/>
                </View>
            </SafeAreaView>
        );
    }
}

const LoginView = (props) => {
    return (
        <View style={styles.loginViewStyle}>
            <LoginInput placeholder='请设置6-16位密码， 不能有空格'
                        icon={require('../../icons/login_icon/icon_mm.png')}
                        onChangeText={props.onChangeTopText}
            />
            <Button title={'确定'}
                    style={props.btnSabled ? styles.loginDisableButtonStyle : styles.loginEnableButtonStyle}
                    titleStyle={{fontSize: 14, color: 'rgb(255,255,255)'}}
                    disabled={props.btnSabled}
                    onPress={props.onPress}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    loginViewStyle: {flex: 1},
    loginEnableButtonStyle: {
        marginLeft: px2dp(108),
        marginRight: px2dp(108),
        height: px2dp(80),
        marginTop: px2dp(86),
        backgroundColor: Theme.buttonColor,
        borderColor: 'transparent',
        borderRadius: 6
    },
    loginDisableButtonStyle: {
        marginLeft: px2dp(108),
        marginRight: px2dp(108),
        height: px2dp(80),
        marginTop: px2dp(86),
        backgroundColor: 'rgb(196,196,196)',
        borderColor: 'transparent',
        borderRadius: 6
    },
});

