/**
 * Created by wufei on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Px2dp from '../Common/px2dp'
export default class arrowBtn extends Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    //     this.userMobxStore.addDiscountCoupon(1000)
    // }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick}>
                <View style={styles.subLeftStyle}>
                    <Text style={styles.subtitle}>{this.props.title}</Text>
                    <Image style={{width: Px2dp.getWidth(20), height: Px2dp.getHeight(20)}} source={require('../Resource/Imags/icon_arrow_gray.png')}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    subLeftStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Px2dp.getHeight(40),
        width: Px2dp.getWidth(140),
        borderRadius: 10,
        borderWidth: 1,
        opacity:0.5,
        borderColor: 'rgb(102,102,102)',
        marginRight: 8
    },
    subtitle: {
        fontSize: 10,
        color: 'rgb(102,102,102)',
        backgroundColor:'transparent'
    }
});

