/**
 * Created by wufei on 2017/11/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Px2dp from './px2dp'

export default class ViewUtil {

    /**
     * 获取设置页面的item
     * @param callback 单击item的回调
     * @param icon 左侧图标
     * @param text 显示的文本
     * @param tintStyle 图标作色
     * @param expandableIcon 右侧图标
     *@param expandableText 右侧文字(用于账号管理页面右边显示"去绑定"或者"右边箭头")
     * */
    // static getSettingItem(callback, icon, text, tintStyle, expandableIcon, expandableText) {
    //     return (
    //         <TouchableOpacity onPress={callback}>
    //             <View style={styles.setting_item_container}>
    //                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //                     {icon ? <Image source={icon} style={[{
    //                         width: Px2dp(48),
    //                         height: Px2dp(48),
    //                         marginRight: Px2dp(40)
    //                     }, tintStyle]}/> : null}
    //                     <Text style={{fontSize: 13, color: '#333333'}}>{text}</Text>
    //                 </View>
    //
    //                 {expandableText ? <View style={{
    //                     width: Px2dp(90),
    //                     height: Px2dp(42),
    //                     backgroundColor: 'rgb(255,208,96)',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     borderRadius: 5
    //                 }}>
    //                     <Text style={{fontSize: 10, color: 'rgb(51,51,51)'}}>{expandableText}</Text>
    //                 </View> : <Image
    //                     source={expandableIcon ? expandableIcon : require('../icons/task_icon/icon_arrow_black.png')}
    //                     style={{
    //                         marginRight: Px2dp(54),
    //                         height: Px2dp(44),
    //                         width: Px2dp(44),
    //                         tintColor: 'rgb(196,196,196)',
    //                     }}/>}
    //
    //
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }


    static getLeftButton(callBack) {
        return (
            <TouchableOpacity onPress={callBack}>
                <View style={{width: Px2dp(100), height: Px2dp(70), justifyContent: 'center'}}>
                    <Image
                        style={{width: Px2dp(44), height: Px2dp(44), marginLeft: Px2dp(30),tintColor:'white'}}
                        source={require('../icons/task_icon/ic_navi_arrow.png')}
                        resizeMethod='scale'
                    />
                </View>
            </TouchableOpacity>
        )

    }


    // static getLeftButton2(callBack) {
    //     return (
    //         <TouchableOpacity onPress={callBack}>
    //             <View style={{width: Px2dp(100), height: Px2dp(70), justifyContent: 'center'}}>
    //                 <Image
    //                     style={{width: Px2dp(44), height: Px2dp(44), marginLeft: Px2dp(30)}}
    //                     source={require('../icons/task_icon/ic_navi_arrow.png')}
    //                     resizeMethod='scale'
    //                 />
    //             </View>
    //         </TouchableOpacity>
    //     )
    //
    // }

    // static getHomeLeftButton(callBack) {
    //     return (
    //         <TouchableOpacity onPress={callBack}>
    //             <View style={{width: Px2dp(70), height: Px2dp(70), justifyContent: 'center'}}>
    //                 <Image
    //                     style={{width: Px2dp(36), height: Px2dp(44), marginLeft: Px2dp(24),tintColor:'black'}}
    //                     source={require('../icons/task_icon/icon_switch.png')}
    //                     resizeMethod='scale'
    //                 />
    //             </View>
    //         </TouchableOpacity>
    //     )
    //
    // }

    // static getRightButton(title, callBack) {
    //     return (
    //         <TouchableOpacity onPress={callBack}>
    //             <View style={{
    //                 width: Px2dp(100),
    //                 height: Px2dp(70),
    //                 marginRight: Px2dp(30),
    //                 justifyContent: 'center'
    //             }}>
    //                 <Text style={{fontSize: 17, textAlign: 'right', color: 'rgb(51,51,51)'}}>{title}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    //
    // }
}


const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        paddingLeft: Px2dp(74),
        height: Px2dp(92),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }

});

