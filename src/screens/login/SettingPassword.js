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
import {observer} from 'mobx-react/native'

@observer
export default class SettingPassword extends Component {
    static navigationOptions = ({navigation}) => ( {
        headerLeft: (<View/>),
        headerTitle: '设置密码'
    })

    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
        this.state = {
            isLoginModal: false,
            loadingModalTxt: '正在提交...'
        }
    }

    componentDidMount() {

    }

    onSubmitBtn() {
        let userAccount = this.props.navigation.state.params.userAccount;
        let regex = /^\w{6,16}$/;
        let password = this.mobx.passBtnInfo.password.slice();
        if (regex.test(password)) {
            this.setState({
                isLoginModal: true
            });
            //拼接登录参数
            let PARAM = {};
            PARAM.oldPassword = password
            PARAM.code = userAccount;
            //发送请求
            this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_USER_LOGIN_SETTINGPASS, PARAM)
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
                    DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
                })
                .done()
        } else {
            DeviceEventEmitter.emit('toastInfo', '密码格式不正确', 'sad');
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
                            this.mobx.passBtnInfo.password = text;
                        }}
                        btnSabled={false}
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
                    style={styles.loginEnableButtonStyle}
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
        marginTop: px2dp(116),
        marginLeft: px2dp(108),
        marginRight: px2dp(108),
        height: px2dp(80),
        backgroundColor: Theme.buttonColor,
        borderColor: 'transparent',
        borderRadius: 6
    }
});

