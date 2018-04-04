/**
 * Created by wufei on 2018/1/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import Px2dp from '../../../Common/px2dp'
import {Button} from 'teaset';
import {observer} from 'mobx-react/native';
import MobxStore from './mobxStore'
import {NavigationActions} from 'react-navigation'

@observer
export default class Matchmaking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            txtCode: ''
        }
        this.mobx = new MobxStore();
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    onRadioBtn(tab){
        if (tab===0){
            this.mobx.changeOnStatement();
        }
        if (tab===1){
            this.mobx.changeOffStatement();
        }
    }

    onSubmitBtn() {
        //主页栈
        let resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'main'})
            ]
        });


        //匹配服务器选中否时，点击确定 进入主页
        if (this.mobx.is_Off_statement == true){
            this.props.navigation.dispatch(resetAction)
        } else {
            Alert.alert('服务编码不能为空')
        }
    }

    render() {
        // let title = this.props.navigation.state.params.title;
        return (
            <View style={styles.container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    // title={title}
                    title={'匹配服务'}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Px2dp.getHeight(100),
                    backgroundColor: 'white'
                }}>
                    <Text style={{fontSize: 15, color: 'rgb(51,51,51)', fontWeight: '900',}}>是否已经购买服务</Text>
                    <TouchableOpacity activeOpacity={0.99} onPress={() => this.onRadioBtn(0)}>
                        <View style={{flexDirection: 'row', marginLeft: Px2dp.getWidth(112)}}>
                            <Image resizeMode={'stretch'}
                                   style={{width: 15, height: 15, marginRight: Px2dp.getWidth(20)}}
                                   source={this.mobx.is_On_statement ? require('../../../Resource/Imags/icon_logo_sm_sel.png') : require('../../../Resource/Imags/icon_logo_sm_unsel.png')}/>
                            <Text style={{fontSize: 15, color: 'rgb(153,153,153)'}}>是</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.99} onPress={() => this.onRadioBtn(1)}>
                        <View style={{flexDirection: 'row', marginLeft: Px2dp.getWidth(50)}}>
                            <Image resizeMode={'stretch'}
                                   style={{width: 15, height: 15, marginRight: Px2dp.getWidth(20)}}
                                   source={this.mobx.is_Off_statement ? require('../../../Resource/Imags/icon_logo_sm_sel.png') : require('../../../Resource/Imags/icon_logo_sm_unsel.png')}/>
                            <Text style={{fontSize: 15, color: 'rgb(153,153,153)'}}>否</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={GlobalStyles.line}/>
                <LoginView
                    onPress={() => this.onSubmitBtn()}
                    onChangeTopText={(text) => {
                        this.state.txtCode = text;
                    }}
                    btnSabled={false}
                    editabled={true}
                />
            </View>
        );
    }
}


const LoginView = (props) => {
    return (
        <View style={styles.loginViewStyle}>
            <TextInput
                placeholder={'请输入服务编码'}
                style={{
                    width: Px2dp.getWidth(600),
                    height: Px2dp.getHeight(60),
                    borderRadius: 3,
                    borderWidth: 0.5,
                    borderColor: 'rgb(153,153,153)',
                    marginTop:Px2dp.getHeight(20)
                }}
                onChangeText={props.onChangeTopText}
                autoCapitalize='none'
                clearButtonMode={'always'}
                editable={props.editabled}
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
    container: {flex: 1},
    loginViewStyle: {
        alignItems: 'center',
        height: Px2dp.getHeight(100),
        backgroundColor:'white',
    },
    loginEnableButtonStyle: {
        marginLeft: Px2dp.getWidth(108),
        marginRight: Px2dp.getWidth(108),
        height: Px2dp.getHeight(80),
        marginTop: Px2dp.getHeight(92),
        backgroundColor: 'rgb(255,208,96)',
        borderColor: 'transparent',
        borderRadius: 6,
        width: Px2dp.getWidth(600)
    }
});

