/**
 * Created by wufei on 2017/12/30.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'
import Px2dp from '../../../Common/px2dp'
export default class HealthInfoCell extends Component {

    static propTypes = {
        callback: PropTypes.func.isRequired,
    };

    render() {
        let {item, callback} = this.props;
        return (
            <TouchableOpacity onPress={callback}>
                <View style={styles.container}>
                    <Image
                        style={{width: Px2dp.getWidth(140), height: Px2dp.getHeight(140)}}
                        source={{uri: item.item.thumb}}/>
                    <View style={styles.txtContainer}>
                        <Text style={styles.titleStyle} numberOfLines={4}>{item.item.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.keyWord}>{item.item.keyword1}</Text>
                            <Text style={styles.keyWord}>{item.item.keyword2}</Text>
                            <Text style={styles.keyWord}>{item.item.keyword3}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Px2dp.getHeight(20),
        paddingLeft: Px2dp.getWidth(30),
        paddingRight: Px2dp.getWidth(30),
        paddingBottom: Px2dp.getHeight(20),
    },
    txtContainer: {
        marginLeft: Px2dp.getWidth(30)
    },
    titleStyle: {
        fontSize: 17,
        color: 'rgb(51,51,51)',
        marginBottom: Px2dp.getHeight(52),
        width:Px2dp.getWidth(500),
    },
    keyWord: {
        fontSize: 11,
        color: 'rgb(255,208,96)',
        marginRight: Px2dp.getWidth(20)
    }
});

