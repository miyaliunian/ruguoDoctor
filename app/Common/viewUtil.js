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
    static getSettingItem(callback, icon, text, tintStyle, expandableIcon, expandableText) {
        return (
            <TouchableOpacity onPress={callback}>
                <View style={styles.setting_item_container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {icon ? <Image source={icon} style={[{
                            width: Px2dp.getWidth(48),
                            height: Px2dp.getHeight(48),
                            marginRight: 8
                        }, tintStyle]}/> : null}
                        <Text style={{fontSize: 13, color: 'rgb(51,51,51)'}}>{text}</Text>
                    </View>

                    {expandableText ? <View style={{
                        width: Px2dp.getWidth(90),
                        height: Px2dp.getHeight(42),
                        backgroundColor: 'rgb(255,208,96)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5
                    }}>
                        <Text style={{fontSize: 10, color: 'rgb(51,51,51)'}}>{expandableText}</Text>
                    </View> : <Image
                        source={expandableIcon ? expandableIcon : require('../Resource/Imags/icon_arrow_black.png')}
                        style={{
                            marginRight: 5,
                            height: Px2dp.getHeight(44),
                            width: Px2dp.getWidth(44),
                            tintColor: 'rgb(196,196,196)'
                        }}/>}


                </View>
            </TouchableOpacity>
        )
    }


    static getLeftButton(callBack) {
        return (
            <TouchableOpacity onPress={callBack}>
                <View style={{width: Px2dp.getWidth(100), height: Px2dp.getHeight(70), justifyContent: 'center'}}>
                    <Image
                        style={{width: Px2dp.getWidth(44), height: Px2dp.getHeight(44), marginLeft: Px2dp.getWidth(30)}}
                        source={require('../Resource/Imags/ic_navi_arrow.png')}
                        resizeMethod='scale'
                    />
                </View>
            </TouchableOpacity>
        )

    }

    static getRightButton(title, callBack) {
        return (
            <TouchableOpacity onPress={callBack}>
                <View style={{
                    width: Px2dp.getWidth(100),
                    height: Px2dp.getHeight(70),
                    marginRight: Px2dp.getWidth(30),
                    justifyContent: 'center'
                }}>
                    <Text style={{fontSize: 17, textAlign: 'right', color: 'rgb(51,51,51)'}}>{title}</Text>
                </View>
            </TouchableOpacity>
        )

    }
}


const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: Px2dp.getWidth(20),
        height: Px2dp.getHeight(88),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }

});

