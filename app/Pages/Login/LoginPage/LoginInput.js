/**
 * Created by Rabbit on 2017/11/3.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    TouchableOpacity,
    TextInput
} from 'react-native';

import { Input } from 'teaset';
import Px2dp from '../../../Common/px2dp'
const LoginInput = (props) => {


    return(
        <View style={iStyle.inputViewStyle}>
            <Image source={props.icon}/>
            <TextInput placeholder={props.placeholder}
                   style={iStyle.inputStyle}
                   textAlignVertical={'center'}
                   secureTextEntry={props.secureTextEntry}
                   onChangeText={props.onChangeText}
                   onFocus={props.onFocus}
                   onBlur={props.onBlur}
                   maxLength={props.maxLength}
                   autoCapitalize='none'
                   clearButtonMode={'always'}
                   underlineColorAndroid='transparent'
            />
            {
                props.isVerify ?
                    <TouchableOpacity onPress={props.getVerifyCode}>
                        <View style={iStyle.inputTitleContain}>
                            <Text style={iStyle.inputTitleStyle}>获取验证码</Text>
                        </View>

                    </TouchableOpacity>
                    :null
            }

        </View>
    )
};

export default LoginInput;

const iStyle = StyleSheet.create({
    inputViewStyle:{
        height:Px2dp.getHeight(88),
        marginTop:Px2dp.getHeight(20),
        marginLeft:Px2dp.getWidth(108),
        marginRight:Px2dp.getWidth(108),
        borderBottomColor:'#d1d1d1',
        borderBottomWidth:1/PixelRatio.get(),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    inputStyle:{
        marginLeft:Px2dp.getWidth(15),
        borderColor:'transparent',
        borderRadius:0,
        height:Px2dp.getWidth(86),
        flex:1,
        backgroundColor:'transparent',
    },
    inputTitleContain:{
        backgroundColor:'rgb(255,208,96)',
        width:Px2dp.getWidth(120),
        height:Px2dp.getHeight(40),
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
    },
    inputTitleStyle:{
        fontSize:10,
        color:'rgb(51,51,51)'
    }
});