/**
 * Created by wufei on 2017/12/8.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Px2dp from '../../../Common/px2dp'
export default class ShopItemCommonCell extends Component {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)
    }

    render() {
        let {icon, title, price,callback} = this.props;
        return (
            <TouchableOpacity onPress={callback}>
                <View style={styles.container}>
                    <Image style={styles.imageStyle} source={{uri: icon}}/>
                    <Text style={styles.TitleStyle}>{title}</Text>
                    <Text style={styles.priceStyle}>¥ {price}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: Px2dp.getWidth(25),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Px2dp.getHeight(20),
        height: Px2dp.getHeight(280),
        width: Px2dp.getWidth(220),
        borderWidth: 1,
        borderColor: 'rgb(196,196,196)',
        backgroundColor: 'white',
    },
    imageStyle: {
        width: Px2dp.getWidth(150),
        height: Px2dp.getHeight(150)
    },
    TitleStyle: {
        marginTop: Px2dp.getHeight(10),
        fontSize: 13,
        color: 'rgb(51,51,51)',
        textAlign: 'center'
    },
    priceStyle: {
        marginTop: Px2dp.getHeight(10),
        fontSize: 17,
        color: 'rgb(239,94,82)'
    }
});

