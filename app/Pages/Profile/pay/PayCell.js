/**
 * Created by wufei on 2017/12/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Px2dp  from '../../../Common/px2dp'
import {observer} from 'mobx-react/native';
import {action, observe} from 'mobx';
@observer
export default class PayCell extends Component {
    render() {
        let {iconLeft, title, iconRight, callback} = this.props;
        return (

            <View style={styles.container}>
                <View style={styles.leftStyle}>
                    <Image style={{marginRight: Px2dp.getWidth(30)}} source={iconLeft} resizeMode={'stretch'}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity onPress={callback}>
                    <Image style={{width: Px2dp.getWidth(50), height: Px2dp.getHeight(50)}}
                           source={iconRight ? require('../../../Resource/Imags/ic_pay_sed.png') : require('../../../Resource/Imags/ic_pay_nor.png')}
                           resizeMode={'stretch'}/>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: Px2dp.getWidth(30),
        paddingRight: Px2dp.getWidth(40),
        justifyContent: 'space-between',
        height: Px2dp.getHeight(92),
        backgroundColor: 'white',
        marginBottom: 1
    },
    leftStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 15,
        color: 'rgb(51,51,51)'
    }
});

