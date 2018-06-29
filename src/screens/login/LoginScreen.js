/**
 * Created by wufei on 2018/1/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    SafeAreaView,
} from 'react-native';
import px2dp from '../../common/px2dp'
import Theme from '../../config/theme'
import Account from '../../store/common/Account'
import Relationship from '../../store/common/Relationship'
import LoginInput from './LoginInput'
import DataRepository from '../../common/dataRepository'
import {Config} from '../../config/config'
import {Button, Toast} from 'teaset';
import LoginMobxStore from './LoginMobxStore'
import LoadingModal from "../../components/LoadingModal";
import {observer} from 'mobx-react/native'
import {MoreMenu} from '../../config/moreMenu';
@observer
export default class LoginScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null
    })

    constructor(props) {
        super(props);
        this.state = {
            isLoginModal: false,
            btnStatus: false,
            mobileFontSize: 16,
            passwordFontSize: 14
        };
        this.dataRepository = new DataRepository();
        this.mobxStore = new LoginMobxStore();
        this.account = Account;
        this.relationship = Relationship;
    }

    componentDidMount() {
        //Toast
        this.subscription = DeviceEventEmitter.addListener('ToastInfo', (info, type) => {
            if (type === 'success') {
                Toast.success(info, 1500, 'center');
                return
            }
            if (type === 'fail') {
                Toast.fail(info, 1500, 'center');
                return
            }
            if (type === 'smile') {
                Toast.smile(info, 1500, 'center');
                return
            }
            if (type === 'sad') {
                Toast.sad(info, 1500, 'center');
                return
            }
            if (type === 'stop') {
                Toast.stop(info, 1500, 'center');
            }

        })

    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    onAgreeBtn() {
        this.mobxStore.changeStatement();
    }

    onLoginBtn() {
        this.setState({
            isLoginModal: true,
        })
        //拼接登录参数
        let PARAM = {};
        PARAM.mobilePhone = this.mobxStore.USER_INFO.cell_phone;
        PARAM.oldPassword = this.mobxStore.USER_INFO.user_password;
        //发送登录请求
        this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_USER_PASSWORD_LOGIN, PARAM)
            .then((data) => {

                if (data.status === 'success') {
                    this.setState({
                        isLoginModal: false,
                    });
                    if (data.data.status === 'login') {
                        this.saveAccountInfo(data);
                        if (data.data.babyFlag === 'have') {
                            this.saveRelationshipInfo(data);
                            this.props.navigation.navigate('App')
                        } else {
                            //this.props.navigation.navigate(MoreMenu.Profile.Record.menu_add_baby_login,{memberCode: data.data.account_info.memberCode})
                        }
                    }

                    if (data.data.status === 'registration') {
                        this.saveAccountInfo(data)
                        //this.props.navigation.navigate('settingPassword', {userAccount: data.data.account_info.memberCode})

                    }
                }
                if (data.status === 'fail') {
                    this.setState({
                        isLoginModal: false,
                    });
                    DeviceEventEmitter.emit('ToastInfo', data.msg, 'sad');

                }


            })
            .catch((err) => {
                this.setState({
                    isLoginModal: false,
                })
                DeviceEventEmitter.emit('ToastInfo', err.status, 'sad');
            })
            .done()
    }

    saveAccountInfo(data) {
        //缓存主用户数据
        this.account.memberCode = data.data.account_info.memberCode;
        this.account.picUrl = data.data.account_info.picUrl;
        this.account.relaId = data.data.account_info.id;
        this.account.relaPerName = data.data.account_info.relaPerName;
        this.account.relaPerGenderName = data.data.account_info.relaPerGenderName;
        this.account.relaPerGenderCode = data.data.account_info.relaPerGenderCode;
        this.account.relaTypeName = data.data.account_info.relaTypeName;
        this.account.relaTypeCode = data.data.account_info.relaTypeCode;
        this.account.relaPerBirthday = data.data.account_info.relaPerBirthday;
        this.account.relaPerMobilePhone = data.data.account_info.relaPerMobilePhone;
        this.account.isBuyService = data.data.account_info.isBuyService;
        this.account.relaPerCertificateType = data.data.account_info.relaPerCertificateType;
        this.account.relaPerCertificateName = data.data.account_info.relaPerCertificateName;
        this.account.relaPerCertificateNo = data.data.account_info.relaPerCertificateNo;
        //存储 关系用户标识  start
        this.dataRepository.saveLocalRepository('ACCOUNT', data.data.account_info)
            .then(result => {
            })
            .catch(error => {
            })
            .done()
    }

    saveRelationshipInfo(data) {
        //缓存切换用户数据
        this.relationship.re_memberCode = data.data.relationship_info.memberCode;
        this.relationship.re_picUrl = data.data.relationship_info.picUrl;
        this.relationship.re_relaId = data.data.relationship_info.id;
        this.relationship.re_relaPerName = data.data.relationship_info.relaPerName;
        this.relationship.re_relaPerGenderName = data.data.relationship_info.relaPerGenderName;
        this.relationship.re_relaPerGenderCode = data.data.relationship_info.relaPerGenderCode;
        this.relationship.re_relaTypeName = data.data.relationship_info.relaTypeName;
        this.relationship.re_relaTypeCode = data.data.relationship_info.relaTypeCode;
        this.relationship.re_relaPerBirthday = data.data.relationship_info.relaPerBirthday;
        this.relationship.re_relaPerMobilePhone = data.data.relationship_info.relaPerMobilePhone;
        this.relationship.isBuyService = data.data.relationship_info.isBuyService;
        this.relationship.re_relaPerCertificateType = data.data.relationship_info.relaPerCertificateType;
        this.relationship.re_relaPerCertificateName = data.data.relationship_info.relaPerCertificateName;
        this.relationship.re_relaPerCertificateNo = data.data.relationship_info.relaPerCertificateNo;
        this.relationship.re_patientId = data.data.relationship_info.patientId;
        //存储用户标识  start
        this.dataRepository.saveLocalRepository('RELATIONSHIP', data.data.relationship_info)
            .then(result => {
            })
            .catch(error => {
            })
            .done()
        //存储用户标识 end
    }

    onClickText(target) {
        let {navigate} = this.props.navigation;
        navigate(target);
    }

    render() {
        return (
            <SafeAreaView style={[Theme.root_container, {backgroundColor: 'white'}]}>
                <View style={styles.bgPos}>
                    <Image tintColor={'rgb(255,255,255)'} source={require('../../icons/login_icon/icon_ysb.png')}
                           resizeMode={'center'}/>
                </View>
                <LoginView
                    onPress={() => this.onLoginBtn()}
                    onChangeTopText={(text) => {
                        this.mobxStore.USER_INFO.cell_phone = text;
                    }}
                    onChangeBottomText={(text) => {
                        this.mobxStore.USER_INFO.user_password = text;
                    }}
                    onTextPress={() => this.onClickText('SettingPassword')}
                    btnSabled={this.mobxStore.btnState}
                    AgreeStatament={this.mobxStore.USER_INFO.statement}
                    changeStatement={() => this.onAgreeBtn()}
                />
                <LoadingModal txtTitle={'正在登录...'} visible={this.state.isLoginModal}/>
            </SafeAreaView>
        );
    }
}


const LoginView = (props) => {
    return (
        <View style={styles.loginViewStyle}>

            <LoginInput placeholder='手机号'
                        icon={require('../../icons/login_icon/icon_sj.png')}
                        onChangeText={props.onChangeTopText}
            />

            <LoginInput placeholder='密码'
                        icon={require('../../icons/login_icon/icon_mm.png')}
                        onChangeText={props.onChangeBottomText}
            />


            <Button title={'登录'}
                    style={props.btnSabled ? styles.loginDisableButtonStyle : styles.loginEnableButtonStyle}
                    titleStyle={{fontSize: 14, color: 'rgb(255,255,255)'}}
                    disabled={props.btnSabled}
                    onPress={props.onPress}
            />

            <TouchableOpacity onPress={props.onTextPress}>
                <View style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',

                }}>
                    <Text style={styles.forgetPassStyle}>
                        忘记密码?
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{
                flexDirection: 'row', width: Theme.screenWidth, justifyContent: 'space-around', alignItems: 'center',
                height: px2dp(100),
            }}>
                <View style={[Theme.line, {width: px2dp(190)}]}/>
                <Text>第三方平台登录</Text>
                <View style={[Theme.line, {width: px2dp(190)}]}/>
            </View>
            <View style={{width: Theme.screenWidth, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../icons/login_icon/pic_vchat.png')} resizeMode={'center'}/>
                <Text>微信</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={props.changeStatement}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: px2dp(30),
                    height: px2dp(60)
                }}>
                    <Image style={{marginRight: px2dp(10)}}
                           resizeMode={'center'}
                           source={props.AgreeStatament ? require('../../icons/login_icon/choose_o.png') : require('../../icons/login_icon/choose_n.png')}/>
                    <Text style={{fontSize: 14, color: 'rgb(196,196,196)'}}>同意</Text>
                    <Text style={{
                        marginLeft: px2dp(10),
                        fontSize: 14,
                        color: '#43d4d8'
                    }}>《汝果用户服务协议》</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    bgPos: {
        marginTop: px2dp(250),
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginViewStyle: {
        flex:1
    },
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
    forgetPassStyle: {  //忘记密码
        marginTop: px2dp(28),
        marginLeft: px2dp(108),
        height: px2dp(32),
        color: '#36c4ca',
        fontSize: 12,
    },
});

