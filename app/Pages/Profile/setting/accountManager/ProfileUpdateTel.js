/**
 * Created by wufei on 2017/11/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';

import SubmitBtn from '../../../../Component/SubmitBtn'
import UserMobxStore from '../../../../Component/UserMobxStore'
import GlobalStyles from '../../../../Common/GlobalStyles'
import ViewUtil from '../../../../Common/viewUtil'
import NavigationBar from '../../../../Component/NavigationBar'
import ScreenUtil from '../../../../Common/screenUtil'
import DataRepository from '../../../../Expand/Dao/DataRepository'
import Px2dp from '../../../../Common/px2dp'
import LoadingModal from '../../../../Component/LoadingModal'

export default class ProfileUpdateTel extends Component {
    // static navigationOptions = ({navigation}) => ({
    //     headerStyle: {backgroundColor: 'rgb(255,208,96)'},
    //     headerTitle: '修改手机号',
    //     headerTitleStyle: {alignSelf: 'center', color: 'rgb(51,51,51)'},
    //     headerTintColor: GlobalStyles.headerTintColor,
    //     headerLeft: (ViewUtil.getLeftButton(navigation.state.params.navigatePressLeft)),
    // });

    constructor(props) {
        super(props);
        this.formData = new FormData();
        this.dataRepository = new DataRepository();
        this.state = {
            originalTelNumber: '',
            verificationCode: '',
            showModal:false
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft
        })
    };

    navigatePressLeft = () => {
        this.textInputsBlur();
        this.props.navigation.goBack();
    };

    textInputsBlur() {
        this.refs.originalTelNumberTextInput.blur();
        this.refs.verificationCodeTextInput.blur()
    }

    formSubmit() {
        if (!this.state.originalTelNumber) {
            Alert.alert('请输入手机号码');
            return;
        }
        if (!this.state.verificationCode) {
            Alert.alert('请输入短信验证码');
            
        }
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'修改手机号'}/>
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
                    <Text style={{marginRight: Px2dp.getWidth(24), marginLeft: Px2dp.getWidth(24)}}>原手机号</Text>
                    <Image source={require('../../../../Resource/Imags/ic_imaginary_line.png')}/>
                    <TextInput placeholder='请输原手机号码' style={{paddingLeft: Px2dp.getWidth(24), flex: 1}}
                               onChangeText={(text) => this.setState({originalTelNumber: text})}
                               secureTextEntry={true}
                               underlineColorAndroid='rgb(255,255,255)'
                               returnKeyType='done'
                               ref="originalTelNumberTextInput"
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
                    <Text style={{marginRight: Px2dp.getWidth(24), marginLeft: Px2dp.getWidth(24)}}>验证码   </Text>
                    <Image source={require('../../../../Resource/Imags/ic_imaginary_line.png')}/>
                    <TextInput placeholder='请输入短信验证' style={{paddingLeft: Px2dp.getWidth(24), flex: 1}}
                               secureTextEntry={true}
                               onChangeText={(text) => this.setState({verificationCode: text})}
                               underlineColorAndroid='rgb(255,255,255)'
                               returnKeyType='done'
                               ref="verificationCodeTextInput"
                               maxLength={20}
                    />
                    <TouchableOpacity>
                        <View style={{width:Px2dp.getWidth(120),height:Px2dp.getHeight(40),backgroundColor:'rgb(255,208,96)',borderRadius:3,alignItems:'center',justifyContent:'center',marginRight:Px2dp.getWidth(20)}}>
                            <Text style={{color:'rgb(51,51,51)',fontSize:10}}>点击获取</Text>
                        </View>
                    </TouchableOpacity>


                </View>

                <SubmitBtn onSubmit={() => this.formSubmit()} styles={{backgroundColor: 'rgb(255,208,96)',marginTop:Px2dp.getHeight(50)}}
                           txtTitle='下一步'/>
                {/*<Modal visible={this.state.showModal}><Text style={{fontSize:100}}>磨脚</Text></Modal>*/}
                <LoadingModal txtTitle='正在加载 ...' visible={this.state.showModal}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({});

