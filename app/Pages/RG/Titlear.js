/**
 * Created by wufei on 2017/12/23.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';
import Px2dp from '../../Common/px2dp'
import ScreenUtil from '../../Common/screenUtil'

export default class Titlear extends Component {

    static propTypes = {
        txtTitle: PropTypes.string.isRequired,
        rightIcon: PropTypes.bool,
        callback:PropTypes.func
    };

    render() {
        let {txtTitle, rightIcon,callback} = this.props;
        return (
            <View style={styles.recommendHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image resizeMode={'center'} source={require('../../Resource/Imags/icon_home_orange_line.png')}
                           style={{width: Px2dp.getWidth(40), height: Px2dp.getHeight(40)}}/>
                    <Text style={{fontSize: 13, color: 'rgb(196,196,196)'}}>{txtTitle}</Text>
                </View>
                {rightIcon ?
                    <TouchableOpacity onPress={callback}>
                        <View style={{
                            width: Px2dp.getWidth(100),
                            height: Px2dp.getHeight(60),
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Image source={require('../../Resource/Imags/icon_arrow_black.png')}/>
                        </View>
                    </TouchableOpacity>
                    :
                    null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    recommendHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: Px2dp.getWidth(30),
        height: Px2dp.getHeight(60),
        backgroundColor: 'white',
        marginBottom: ScreenUtil.onePixel
    }
});

