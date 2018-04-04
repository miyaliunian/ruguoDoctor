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
    DeviceEventEmitter
} from 'react-native';
import Px2dp from '../../../Common/px2dp'
import Account from '../../../store/common/Account'
import LoginInput from './LoginInput'
import DataRepository from '../../../Expand/Dao/DataRepository'
import {Config} from '../../../Expand/Dao/Config'
import {SegmentedView, Button} from 'teaset';
import LoginMobxStore from './LoginMobxStore'
import LoadingModal from "../../../Component/LoadingModal";
import {observer} from 'mobx-react/native'
@observer
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginModal: false,
            btnStatus: false,
        };
        this.dataRepository = new DataRepository();
        this.mobxStore = new LoginMobxStore();
    }

    onAgreeBtn() {
        this.mobxStore.changeStatement();
    }

    onLoginBtn() {
        this.setState({
            isLoginModal: true
        });

        //拼接登录参数
        let PARAM = {};
        let URL='';
        PARAM.mobilePhone = this.mobxStore.USER_INFO.cell_phone;
        PARAM.verificationCode = this.mobxStore.USER_INFO.verification_code.slice()
        PARAM.userName = this.mobxStore.USER_INFO.user_name;
        PARAM.oldPassword = this.mobxStore.USER_INFO.user_password;
        if (PARAM.mobilePhone!=''){
             URL=Config.BASE_URL + Config.API_USER_MOBILE_LOGIN;
        }else {
             PARAM.userName='';
             PARAM.mobilePhone=this.mobxStore.USER_INFO.user_name;
             URL=Config.BASE_URL + Config.API_USER_PASSWORD_LOGIN;
        }

        //发送登录请求
        this.dataRepository.postJsonRepository(URL, PARAM)
            .then((data) => {
                if (data.status === 'success') {
                    console.log(data.data.code);
                    this.setState({
                        isLoginModal: false
                    });
                    this.saveInfo(data);
                    this.props.navigation.navigate('main')
                    return;
                    if (data.data.status === 'login') {
                        this.props.navigation.navigate('main',{userAccount:data.data.code})
                    }
                    if (data.data.status === 'registration') {
                        this.props.navigation.navigate('settingPassword',{userAccount:data.data.code})
                    }
                    if (data.data.status === 'fail'){
                        DeviceEventEmitter.emit('mainToastInfo', '用户名或密码不存在', 'sad');
                    }
                }else{
                    this.setState({
                        isLoginModal: false
                    });
                    DeviceEventEmitter.emit('mainToastInfo', data.msg, 'sad');
                }
            })
            .catch((err) => {

                this.setState({
                    isLoginModal: false
                });
                DeviceEventEmitter.emit('mainToastInfo', err.status, 'sad');
            })
            .done()
    }

    saveInfo(data){
        //缓存主用户数据
        this.account = Account;
        this.account.id = data.data.id;
        this.account.code = data.data.code;
        this.account.mobilePhone = data.data.mobilePhone;
        this.account.wchatOpenId = data.data.wchatOpenId;

        //存储 关系用户标识  start
        this.dataRepository.saveLocalRepository('ACCOUNT', data.data)
            .then(result => {})
            .catch(error => {})
            .done()

        //存储 关系用户标识 end

    }
    onClickText(target) {
        let {navigate} = this.props.navigation;
        navigate(target);
    }

    render() {
        return (
            <View style={[GlobalStyles.root_container, {backgroundColor: 'white'}]}>
                <View style={styles.logo}>
                    <Image source={require('../../../Resource/Imags/icon_logo.png')} resizeMode={'center'}/>
                </View>
                <SegmentedView
                    style={{height: ScreenUtil.screenSize.height - Px2dp.getHeight(404), backgroundColor: 'white'}}
                    type='carousel'
                    indicatorLineColor={'rgb(255,208,96)'}
                >
                    <SegmentedView.Sheet title='手机登录'
                                         titleStyle={{color: 'rgb(155,153,153)', fontSize: 10}}
                                         activeTitleStyle={{color: 'rgb(51,51,51)', fontSize: 19}}
                    >
                        <LoginView isPass={true}
                                   onPress={() => this.onLoginBtn()}
                                   onTextPress={() => this.onClickText('main')}
                                   getVerifyCode={() => {
                                   }}
                                   onChangeTopText={(text) => {
                                       this.mobxStore.USER_INFO.cell_phone = text;
                                   }}
                                   onChangeBottomText={(text) => {
                                       this.mobxStore.USER_INFO.verification_code = text;
                                   }}
                                   btnSabled={this.mobxStore.btnState}
                                   AgreeStatament={this.mobxStore.USER_INFO.statement}
                                   changeStatement={() => this.onAgreeBtn()}
                        />
                    </SegmentedView.Sheet>

                    <SegmentedView.Sheet title='密码登录'
                                         titleStyle={{color: 'rgb(155,153,153)', fontSize: 10}}
                                         activeTitleStyle={{color: 'rgb(51,51,51)', fontSize: 19}}
                    >

                        <LoginView
                            onPress={() => this.onLoginBtn()}
                            onTextPress={() => this.onClickText(MoreMenu.LoginPage.menu_login_forgotPassword)}
                            onChangeTopText={(text) => {
                                this.mobxStore.USER_INFO.user_name = text;
                            }}
                            onChangeBottomText={(text) => {
                                this.mobxStore.USER_INFO.user_password = text;
                            }}
                            btnSabled={this.mobxStore.btnState}
                            AgreeStatament={this.mobxStore.USER_INFO.statement}
                            changeStatement={() => this.onAgreeBtn()}
                        />


                    </SegmentedView.Sheet>
                </SegmentedView>
                <LoadingModal txtTitle={'正在登录...'} visible={this.state.isLoginModal}/>
            </View>
        );
    }
}


const LoginView = (props) => {
    return (
        <View style={styles.loginViewStyle}>
            { props.isPass ?
                <LoginInput placeholder='手机号'
                            icon={require('../../../Resource/Imags/icon_login_tel_icon.png')}
                            onChangeText={props.onChangeTopText}
                />
                :
                <LoginInput placeholder='用户名'
                            icon={require('../../../Resource/Imags/icon_login_user.png')}
                            onChangeText={props.onChangeTopText}
                />
            }

            {
                props.isPass ?
                    <View >
                        <LoginInput isVerify={true}
                                    placeholder='验证码'
                                    getVerifyCode={props.getVerifyCode}
                                    onChangeText={props.onChangeBottomText}
                                    onFocus={props.verifyFocus}
                                    icon={require('../../../Resource/Imags/icon_login_ver_icon.png')}
                        />
                        <TouchableOpacity onPress={props.onTextPress}>
                            <View style={{
                                backgroundColor: 'transparent',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',

                            }}>
                                <Text style={styles.experienceStyle}>
                                    体验产品
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <LoginInput secureTextEntry={true}
                                    placeholder='密码'
                                    icon={require('../../../Resource/Imags/icon_login_pass.png')}
                                    onChangeText={props.onChangeBottomText}

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
                    </View>
            }

            <Button title={'登录'}
                    style={props.btnSabled ? styles.loginDisableButtonStyle : styles.loginEnableButtonStyle}
                    titleStyle={{fontSize: 14, color: 'rgb(255,255,255)'}}
                    disabled={props.btnSabled}
                    onPress={props.onPress}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={props.changeStatement}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: Px2dp.getWidth(115),
                    marginTop: Px2dp.getHeight(30),
                    height: Px2dp.getHeight(50)
                }}>
                    <Image style={{marginRight: Px2dp.getWidth(10)}}
                           source={props.AgreeStatament ? require('../../../Resource/Imags/icon_logo_sm_sel.png') : require('../../../Resource/Imags/icon_logo_sm_unsel.png')}/>
                    <Text style={{fontSize: 11, color: 'rgb(196,196,196)'}}>同意</Text>
                    <Text style={{
                        marginLeft: Px2dp.getWidth(10),
                        fontSize: 11,
                        color: 'rgb(255,208,96)'
                    }}>《汝果用户服务协议》</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    logo: {
        marginTop: Px2dp.getHeight(176),
        height: Px2dp.getHeight(404 - 176),
        alignItems: 'center',
    },
    loginViewStyle: {
        height: Px2dp.getHeight(200)
    },
    loginEnableButtonStyle: {
        marginLeft: Px2dp.getWidth(108),
        marginRight: Px2dp.getWidth(108),
        height: Px2dp.getHeight(80),
        marginTop: Px2dp.getHeight(86),
        backgroundColor: 'rgb(255,208,96)',
        borderColor: 'transparent',
        borderRadius: 6
    },
    loginDisableButtonStyle: {
        marginLeft: Px2dp.getWidth(108),
        marginRight: Px2dp.getWidth(108),
        height: Px2dp.getHeight(80),
        marginTop: Px2dp.getHeight(86),
        backgroundColor: 'rgb(196,196,196)',
        borderColor: 'transparent',
        borderRadius: 6
    },
    experienceStyle: {  //体验产品
        marginTop: Px2dp.getHeight(28),
        marginRight: Px2dp.getWidth(108),
        height: Px2dp.getHeight(32),
        color: 'rgb(239,94,82)',
        fontSize: 12,
    },
    forgetPassStyle: {  //忘记密码
        marginTop: Px2dp.getHeight(28),
        marginLeft: Px2dp.getWidth(108),
        height: Px2dp.getHeight(32),
        color: 'rgb(239,94,82)',
        fontSize: 12,
    },
    bumpedContainer: {
        marginTop: -200,
        // marginBottom: 210
    },
});

