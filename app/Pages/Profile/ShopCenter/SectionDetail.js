/**
 * Created by wufei on 2017/12/9.
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

export default class SectionDetail extends Component {

    static propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        callback: PropTypes.func
    };


    constructor(props) {
        super(props)
    }

    render() {
        let {image, title, subtitle, price,callback} = this.props;
        return (
            <TouchableOpacity onPress={callback}>
                <View style={styles.cellContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.imageStyle} source={{uri: image}}/>
                        <View style={{marginLeft: Px2dp.getWidth(20)}}>
                            <Text style={styles.titleStyle}>{title}</Text>
                            <Text style={styles.subtitleStyle} numberOfLines={2}>{subtitle}</Text>

                                <Text>
                                    <Text style={styles.priceStyle1}>
                                        ¥
                                    </Text>
                                    <Text style={styles.priceStyle}>
                                        {price}
                                    </Text>
                                    <Text style={styles.priceStyle1}>
                                        .00
                                    </Text>
                                </Text>


                        </View>
                    </View>
                    <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: Px2dp.getWidth(30),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageStyle: {
        width: Px2dp.getWidth(200),
        height: Px2dp.getHeight(200),
    },
    titleStyle: {
        fontWeight:'bold'
    },
    subtitleStyle: {
        width:Px2dp.getWidth(380),
        // width: Px2dp.getWidth(380)- (13+42+5+45+11+18+10),
        color: 'rgb(196,196,196)'
    },
    priceStyle: {
        fontSize: 17,
        color: 'rgb(239,94,82)'
    },
    priceStyle1: {
        fontSize: 10,
        color: 'rgb(239,94,82)',
    }

});

