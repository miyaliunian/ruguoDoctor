/**
 * Created by wufei on 2017/12/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Px2dp from '../../Common/px2dp'


export default class HomeMenuItem extends Component {
    render() {
        let {icon, title, onPress} = this.props;
        if (title == '饮食') {
            icon = require('../../Resource/Imags/icon_home_diet.png')
        }
        if (title == '运动') {
            icon = require('../../Resource/Imags/icon_home_yd.png')
        }
        if (title == '智力') {
            icon = require('../../Resource/Imags/icon_home_zl.png')
        }
        if (title == '睡眠') {
            icon = require('../../Resource/Imags/icon_home_sm.png')
        }
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Image source={icon} resizeMode={'center'}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>{title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginRight: Px2dp.getWidth(88)
    },
    titleContainer: {
        marginTop: Px2dp.getHeight(10)
    },
    titleStyle: {
        fontSize: 11,
        color: 'rgb(51,15,51)'
    }
});

